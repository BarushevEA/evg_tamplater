import {IMeter, IMeterData, IUserMeterData, IUserMetrics, Metrics, Status} from "./Types";
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

    stop(): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);

        this.perSecondTimer.stop();
        this.perMinuteTimer.stop();
        this.perHourTimer.stop();
        this.perDayTimer.stop();

        for (const metricsKey in this.metrics) {
            const metric = this.metrics[metricsKey];
            metric._counter.days = 0;
            metric._counter.hours = 0;
            metric._counter.minutes = 0;
            metric._counter.seconds = 0;
        }

        return getPositiveStatus(EState.STOPPED);
    }

    get length(): number {
        return Object.keys(this.metrics).length;
    }

    get state(): EState {
        return this._state;
    }

    deleteFunc(funcName: string): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);

        if (funcName in this.metrics) {
            const metric = this.metrics[funcName];
            metric._deleteObj.isDeleted = true;
            // @ts-ignore
            metric._deleteObj = null
            delete this.metrics[funcName];
            return getPositiveStatus(EState.DELETED);
        }

        return getNegativeStatus(ERROR.NAME_IS_NOT_PRESENT);
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

        const metric = this.metrics[funcName];
        this.addTimers(deleteObj, metric);

        return (...args: any[]) => {
            if (deleteObj.isDeleted) return func(...args);

            const start = Date.now();
            metric.countOfUses++;
            metric._counter.seconds++;
            metric._counter.minutes++;
            metric._counter.hours++;
            metric._counter.days++;

            try {
                return func(...args);
            } catch (error) {
                if (!deleteObj.isDeleted) metric.countOfErrors++;
                throw error;
            } finally {
                if (!deleteObj.isDeleted) {
                    metric.timePerCall = Date.now() - start;
                    metric.totalExecutionTime += metric.timePerCall;
                }
            }
        };
    }

    private addTimers(deleteObj: { isDeleted: boolean }, metric: IMeterData) {
        const counter = metric._counter;

        this.addTimer(deleteObj, this.perSecondTimer, () => {
            metric.countOfUsesPerSecond = counter.seconds;
            metric.countOfUsesPerSecondMax = getMaxNum(metric.countOfUsesPerSecondMax, counter.seconds);
            metric.countOfUsesPerSecondMin = getMinNumNotZero(metric.countOfUsesPerSecondMin, counter.seconds);
            metric.countOfUsesPerSecondAvg = getAvgNum(metric.countOfUsesPerSecondAvg, counter.seconds);
            metric.countOfUsesPerMinute = counter.minutes;
            metric.countOfUsesPerMinuteMax = getMaxNum(metric.countOfUsesPerMinuteMax, counter.minutes);
            metric.countOfUsesPerMinuteMin = getMinNumNotZero(metric.countOfUsesPerMinuteMin, counter.minutes);
            metric.countOfUsesPerMinuteAvg = getAvgNum(metric.countOfUsesPerMinuteAvg, counter.minutes);
            metric.countOfUsesPerHour = counter.hours;
            metric.countOfUsesPerHourMax = getMaxNum(metric.countOfUsesPerHourMax, counter.hours);
            metric.countOfUsesPerHourMin = getMinNumNotZero(metric.countOfUsesPerHourMin, counter.hours);
            metric.countOfUsesPerHourAvg = getAvgNum(metric.countOfUsesPerHourAvg, counter.hours);
            metric.countOfUsesPerDay = counter.days;
            metric.countOfUsesPerDayMax = getMaxNum(metric.countOfUsesPerDayMax, counter.days);
            metric.countOfUsesPerDayMin = getMinNumNotZero(metric.countOfUsesPerDayMin, counter.days);
            metric.countOfUsesPerDayAvg = getAvgNum(metric.countOfUsesPerDayAvg, counter.days);
            counter.seconds = 0;
        });

        this.addTimer(deleteObj, this.perMinuteTimer, () => {
            metric.countOfUsesPerMinute = counter.minutes;
            metric.countOfUsesPerMinuteMax = getMaxNum(metric.countOfUsesPerMinuteMax, counter.minutes);
            metric.countOfUsesPerMinuteMin = getMinNumNotZero(metric.countOfUsesPerMinuteMin, counter.minutes);
            metric.countOfUsesPerMinuteAvg = getAvgNum(metric.countOfUsesPerMinuteAvg, counter.minutes);
            metric.countOfUsesPerHour = counter.hours;
            metric.countOfUsesPerHourMax = getMaxNum(metric.countOfUsesPerHourMax, counter.hours);
            metric.countOfUsesPerHourMin = getMinNumNotZero(metric.countOfUsesPerHourMin, counter.hours);
            metric.countOfUsesPerHourAvg = getAvgNum(metric.countOfUsesPerHourAvg, counter.hours);
            metric.countOfUsesPerDay = counter.days;
            metric.countOfUsesPerDayMax = getMaxNum(metric.countOfUsesPerDayMax, counter.days);
            metric.countOfUsesPerDayMin = getMinNumNotZero(metric.countOfUsesPerDayMin, counter.days);
            metric.countOfUsesPerDayAvg = getAvgNum(metric.countOfUsesPerDayAvg, counter.days);
            counter.minutes = 0;
        });

        this.addTimer(deleteObj, this.perHourTimer, () => {
            metric.countOfUsesPerHour = counter.hours;
            metric.countOfUsesPerHourMax = getMaxNum(metric.countOfUsesPerHourMax, counter.hours);
            metric.countOfUsesPerHourMin = getMinNumNotZero(metric.countOfUsesPerHourMin, counter.hours);
            metric.countOfUsesPerHourAvg = getAvgNum(metric.countOfUsesPerHourAvg, counter.hours);
            metric.countOfUsesPerDay = counter.days;
            metric.countOfUsesPerDayMax = getMaxNum(metric.countOfUsesPerDayMax, counter.days);
            metric.countOfUsesPerDayMin = getMinNumNotZero(metric.countOfUsesPerDayMin, counter.days);
            metric.countOfUsesPerDayAvg = getAvgNum(metric.countOfUsesPerDayAvg, counter.days);
            counter.hours = 0;
        });

        this.addTimer(deleteObj, this.perDayTimer, () => {
            metric.countOfUsesPerDay = counter.days;
            metric.countOfUsesPerDayMax = getMaxNum(metric.countOfUsesPerDayMax, counter.days);
            metric.countOfUsesPerDayMin = getMinNumNotZero(metric.countOfUsesPerDayMin, counter.days);
            metric.countOfUsesPerDayAvg = getAvgNum(metric.countOfUsesPerDayAvg, counter.days);
            counter.days = 0;
        });
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

    isDestroyed(): boolean {
        return this._state === EState.DESTROYED;
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
}
