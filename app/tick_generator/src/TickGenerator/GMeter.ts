import {IMeter, IUserMeterData, IUserMetrics, Metrics, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {GInterval} from "./GInterval";
import {getAvgNum, getMaxNum, getMinNumNotZero, getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractGenerator} from "./AbstractGenerator";


export class GMeter implements IMeter {
    private metrics: Metrics;
    private _state: EState;
    private perSecondTimer: GInterval;
    private perMinuteTimer: GInterval;
    private perHourTimer: GInterval;
    private perDayTimer: GInterval;

    constructor() {
        this.metrics = {};
        this._state = EState.STOPPED;

        this.perSecondTimer = new GInterval();
        this.perSecondTimer.setInterval(1000);

        this.perMinuteTimer = new GInterval();
        this.perMinuteTimer.setInterval(60 * 1000);

        this.perHourTimer = new GInterval();
        this.perHourTimer.setInterval(60 * 60 * 1000);

        this.perDayTimer = new GInterval();
        this.perDayTimer.setInterval(24 * 60 * 60 * 1000);
    }

    start(): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);

        this.perSecondTimer.start();
        this.perMinuteTimer.start();
        this.perHourTimer.start();
        this.perDayTimer.start();

        return getPositiveStatus(EState.PROCESS);
    }

    get length(): number {
        return Object.keys(this.metrics).length;
    }

    destroy(): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);

        this.stop();
        this.clearFunc();

        this.perSecondTimer.destroy();
        this.perMinuteTimer.destroy();
        this.perHourTimer.destroy();
        this.perDayTimer.destroy();

        return getPositiveStatus(EState.DESTROYED);
    }

    isDestroyed(): boolean {
        return this._state === EState.DESTROYED;
    }

    deleteFunc(funcName: string): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);

        if (funcName in this.metrics) {
            this.metrics[funcName]._deleteObj.isDeleted = true;
            // @ts-ignore
            this.metrics[funcName]._deleteObj = null
            delete this.metrics[funcName];
            return getPositiveStatus(EState.DELETED);
        }

        return getNegativeStatus(ERROR.NAME_IS_NOT_PRESENT);
    }

    get state(): EState {
        return this._state;
    }

    decorate(funcName: string, func: (...args: any[]) => any): (...args: any[]) => any {
        if (this.isDestroyed()) throw new Error(ERROR.INSTANCE_DESTROYED);
        if (funcName in this.metrics) throw new Error(`A function with the name "${funcName}" is already decorated`);

        const deleteObj = {isDeleted: false}
        const counter = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
        };

        this.metrics[funcName] = {
            countOfUses: 0,
            countOfErrors: 0,
            totalExecutionTime: 0,
            timePerCall: 0,
            countOfUsesPerSecond: 0,
            countOfUsesPerMinute: 0,
            countOfUsesPerHour: 0,
            countOfUsesPerDay: 0,
            countOfUsesPerDayAvg: 0,
            countOfUsesPerDayMax: 0,
            countOfUsesPerDayMin: 0,
            countOfUsesPerHourAvg: 0,
            countOfUsesPerHourMax: 0,
            countOfUsesPerHourMin: 0,
            countOfUsesPerMinuteAvg: 0,
            countOfUsesPerMinuteMax: 0,
            countOfUsesPerMinuteMin: 0,
            countOfUsesPerSecondAvg: 0,
            countOfUsesPerSecondMax: 0,
            countOfUsesPerSecondMin: 0,
            _deleteObj: deleteObj,
            _counter: counter
        };

        this.addTimers(deleteObj, funcName);

        return (...args: any[]) => {
            if (deleteObj.isDeleted) return func(...args);

            const start = Date.now();
            this.metrics[funcName].countOfUses++;
            this.metrics[funcName]._counter.seconds++;
            this.metrics[funcName]._counter.minutes++;
            this.metrics[funcName]._counter.hours++;
            this.metrics[funcName]._counter.days++;

            try {
                return func(...args);
            } catch (error) {
                if (!deleteObj.isDeleted) this.metrics[funcName].countOfErrors++;
                throw error;
            } finally {
                if (!deleteObj.isDeleted) {
                    this.metrics[funcName].timePerCall = Date.now() - start;
                    this.metrics[funcName].totalExecutionTime += this.metrics[funcName].timePerCall;
                }
            }
        };
    }

    private addTimers(deleteObj: { isDeleted: boolean }, funcName: string) {
        const counter = this.metrics[funcName]._counter;

        this.addTimer(deleteObj, this.perSecondTimer, () => {
            this.metrics[funcName].countOfUsesPerSecond = counter.seconds;
            this.metrics[funcName].countOfUsesPerSecondMax = getMaxNum(this.metrics[funcName].countOfUsesPerSecondMax, counter.seconds);
            this.metrics[funcName].countOfUsesPerSecondMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerSecondMin, counter.seconds);
            this.metrics[funcName].countOfUsesPerSecondAvg = getAvgNum(this.metrics[funcName].countOfUsesPerSecondAvg, counter.seconds);
            this.metrics[funcName].countOfUsesPerMinute = counter.minutes;
            this.metrics[funcName].countOfUsesPerMinuteMax = getMaxNum(this.metrics[funcName].countOfUsesPerMinuteMax, counter.minutes);
            this.metrics[funcName].countOfUsesPerMinuteMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerMinuteMin, counter.minutes);
            this.metrics[funcName].countOfUsesPerMinuteAvg = getAvgNum(this.metrics[funcName].countOfUsesPerMinuteAvg, counter.minutes);
            this.metrics[funcName].countOfUsesPerHour = counter.hours;
            this.metrics[funcName].countOfUsesPerHourMax = getMaxNum(this.metrics[funcName].countOfUsesPerHourMax, counter.hours);
            this.metrics[funcName].countOfUsesPerHourMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerHourMin, counter.hours);
            this.metrics[funcName].countOfUsesPerHourAvg = getAvgNum(this.metrics[funcName].countOfUsesPerHourAvg, counter.hours);
            this.metrics[funcName].countOfUsesPerDay = counter.days;
            this.metrics[funcName].countOfUsesPerDayMax = getMaxNum(this.metrics[funcName].countOfUsesPerDayMax, counter.days);
            this.metrics[funcName].countOfUsesPerDayMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerDayMin, counter.days);
            this.metrics[funcName].countOfUsesPerDayAvg = getAvgNum(this.metrics[funcName].countOfUsesPerDayAvg, counter.days);
            counter.seconds = 0;
        });

        this.addTimer(deleteObj, this.perMinuteTimer, () => {
            this.metrics[funcName].countOfUsesPerMinute = counter.minutes;
            this.metrics[funcName].countOfUsesPerMinuteMax = getMaxNum(this.metrics[funcName].countOfUsesPerMinuteMax, counter.minutes);
            this.metrics[funcName].countOfUsesPerMinuteMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerMinuteMin, counter.minutes);
            this.metrics[funcName].countOfUsesPerMinuteAvg = getAvgNum(this.metrics[funcName].countOfUsesPerMinuteAvg, counter.minutes);
            this.metrics[funcName].countOfUsesPerHour = counter.hours;
            this.metrics[funcName].countOfUsesPerHourMax = getMaxNum(this.metrics[funcName].countOfUsesPerHourMax, counter.hours);
            this.metrics[funcName].countOfUsesPerHourMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerHourMin, counter.hours);
            this.metrics[funcName].countOfUsesPerHourAvg = getAvgNum(this.metrics[funcName].countOfUsesPerHourAvg, counter.hours);
            this.metrics[funcName].countOfUsesPerDay = counter.days;
            this.metrics[funcName].countOfUsesPerDayMax = getMaxNum(this.metrics[funcName].countOfUsesPerDayMax, counter.days);
            this.metrics[funcName].countOfUsesPerDayMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerDayMin, counter.days);
            this.metrics[funcName].countOfUsesPerDayAvg = getAvgNum(this.metrics[funcName].countOfUsesPerDayAvg, counter.days);
            counter.minutes = 0;
        });

        this.addTimer(deleteObj, this.perHourTimer, () => {
            this.metrics[funcName].countOfUsesPerHour = counter.hours;
            this.metrics[funcName].countOfUsesPerHourMax = getMaxNum(this.metrics[funcName].countOfUsesPerHourMax, counter.hours);
            this.metrics[funcName].countOfUsesPerHourMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerHourMin, counter.hours);
            this.metrics[funcName].countOfUsesPerHourAvg = getAvgNum(this.metrics[funcName].countOfUsesPerHourAvg, counter.hours);
            this.metrics[funcName].countOfUsesPerDay = counter.days;
            this.metrics[funcName].countOfUsesPerDayMax = getMaxNum(this.metrics[funcName].countOfUsesPerDayMax, counter.days);
            this.metrics[funcName].countOfUsesPerDayMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerDayMin, counter.days);
            this.metrics[funcName].countOfUsesPerDayAvg = getAvgNum(this.metrics[funcName].countOfUsesPerDayAvg, counter.days);
            counter.hours = 0;
        });

        this.addTimer(deleteObj, this.perDayTimer, () => {
            this.metrics[funcName].countOfUsesPerDay = counter.days;
            this.metrics[funcName].countOfUsesPerDayMax = getMaxNum(this.metrics[funcName].countOfUsesPerDayMax, counter.days);
            this.metrics[funcName].countOfUsesPerDayMin = getMinNumNotZero(this.metrics[funcName].countOfUsesPerDayMin, counter.days);
            this.metrics[funcName].countOfUsesPerDayAvg = getAvgNum(this.metrics[funcName].countOfUsesPerDayAvg, counter.days);
            counter.days = 0;
        });
    }

    stop(): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);

        this.perSecondTimer.stop();
        this.perMinuteTimer.stop();
        this.perHourTimer.stop();
        this.perDayTimer.stop();

        for (const metricsKey in this.metrics) {
            this.metrics[metricsKey]._counter.days = 0;
            this.metrics[metricsKey]._counter.hours = 0;
            this.metrics[metricsKey]._counter.minutes = 0;
            this.metrics[metricsKey]._counter.seconds = 0;
        }

        return getPositiveStatus(EState.STOPPED);
    }

    getMetrics(funcName: string): IUserMeterData {
        const metrics: IUserMeterData = {...this.metrics[funcName]};
        delete (<any>metrics)._deleteObj;
        delete (<any>metrics)._counter;
        return metrics;
    }

    getAll(): IUserMetrics {
        const userMetrics: IUserMetrics = {};

        for (const metricsKey in this.metrics) {
            userMetrics[metricsKey] = this.getMetrics(metricsKey);
        }

        return userMetrics;
    }

    private clearFunc(): void {
        const funcListForDelete: string[] = [];
        for (const funcName in this.metrics) {
            funcListForDelete.push(funcName);
        }
        for (const funcName of funcListForDelete) {
            this.deleteFunc(funcName);
        }
    }

    private addTimer(deleteObj: { isDeleted: boolean }, timer: AbstractGenerator, handler: () => void) {
        const subs = timer.subscribeOnProcess(() => {
            if (deleteObj.isDeleted) {
                subs?.unsubscribe();
                return;
            }

            handler();
        });
    }
}
