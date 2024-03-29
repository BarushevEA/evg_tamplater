import {IMeter, IMeterData, Metrics, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {GInterval} from "./GInterval";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractGenerator} from "./AbstractGenerator";


export class GMeter implements IMeter {
    private metrics: Metrics;
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

    private _state: EState;

    get state(): EState {
        return this._state;
    }

    get length(): number {
        return Object.keys(this.metrics).length;
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

        return getPositiveStatus(EState.STOPPED);
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
            useTime: 0,
            countOfUsesPerSecond: 0,
            countOfUsesPerMinute: 0,
            countOfUsesPerHour: 0,
            countOfUsesPerDay: 0,
            _deleteObj: deleteObj,
            _counter: counter,
        };

        this.addTimers(deleteObj, funcName);

        return async (...args: any[]) => {
            if (deleteObj.isDeleted) return await func(...args);

            const start = Date.now();
            this.metrics[funcName].countOfUses++;
            this.metrics[funcName]._counter.seconds++;
            this.metrics[funcName]._counter.minutes++;
            this.metrics[funcName]._counter.hours++;
            this.metrics[funcName]._counter.days++;

            try {
                return await func(...args);
            } catch (error) {
                if (!deleteObj.isDeleted) this.metrics[funcName].countOfErrors++;
                throw error;
            } finally {
                if (!deleteObj.isDeleted) {
                    this.metrics[funcName].useTime += Date.now() - start;
                }
            }
        };
    }

    getMetrics(funcName: string): IMeterData {
        return this.metrics[funcName];
    }

    getAll(): Metrics {
        return this.metrics;
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

    private addTimers(deleteObj: { isDeleted: boolean }, funcName: string) {
        const counter = this.metrics[funcName]._counter;

        this.addTimer(deleteObj, this.perSecondTimer, () => {
            this.metrics[funcName].countOfUsesPerSecond = counter.seconds;
            counter.seconds = 0;
        });

        this.addTimer(deleteObj, this.perMinuteTimer, () => {
            this.metrics[funcName].countOfUsesPerMinute = counter.minutes;
            counter.minutes = 0;
        });

        this.addTimer(deleteObj, this.perHourTimer, () => {
            this.metrics[funcName].countOfUsesPerHour = counter.hours;
            counter.hours = 0;
        });

        this.addTimer(deleteObj, this.perDayTimer, () => {
            this.metrics[funcName].countOfUsesPerDay = counter.days;
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
}
