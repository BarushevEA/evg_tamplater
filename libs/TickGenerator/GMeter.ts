import {IMeter, IMeterData, IUserMeterData, IUserMetrics, Metrics, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {GInterval} from "./GInterval";
import {getAvgNum, getMaxNum, getMinNumNotZero, getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractGenerator} from "./AbstractGenerator";

function updateMetricsPerSecond(metric: IMeterData) {
    const counter = metric._counter;
    metric.countOfUsesPerSecond = counter.seconds;
    metric.countOfUsesPerSecondMax = getMaxNum(metric.countOfUsesPerSecondMax, counter.seconds);
    metric.countOfUsesPerSecondMin = getMinNumNotZero(metric.countOfUsesPerSecondMin, counter.seconds);
    metric.countOfUsesPerSecondAvg = getAvgNum(metric.countOfUsesPerSecondAvg, counter.seconds);
}

function updateMetricsPerPerMinute(metric: IMeterData) {
    const counter = metric._counter;
    metric.countOfUsesPerMinute = counter.minutes;
    metric.countOfUsesPerMinuteMax = getMaxNum(metric.countOfUsesPerMinuteMax, counter.minutes);
    metric.countOfUsesPerMinuteMin = getMinNumNotZero(metric.countOfUsesPerMinuteMin, counter.minutes);
    metric.countOfUsesPerMinuteAvg = getAvgNum(metric.countOfUsesPerMinuteAvg, counter.minutes);
}

function updateMetricsPerHour(metric: IMeterData) {
    const counter = metric._counter;
    metric.countOfUsesPerHour = counter.hours;
    metric.countOfUsesPerHourMax = getMaxNum(metric.countOfUsesPerHourMax, counter.hours);
    metric.countOfUsesPerHourMin = getMinNumNotZero(metric.countOfUsesPerHourMin, counter.hours);
    metric.countOfUsesPerHourAvg = getAvgNum(metric.countOfUsesPerHourAvg, counter.hours);
}

function updateMetricsPerDay(metric: IMeterData) {
    const counter = metric._counter;
    metric.countOfUsesPerDay = counter.days;
    metric.countOfUsesPerDayMax = getMaxNum(metric.countOfUsesPerDayMax, counter.days);
    metric.countOfUsesPerDayMin = getMinNumNotZero(metric.countOfUsesPerDayMin, counter.days);
    metric.countOfUsesPerDayAvg = getAvgNum(metric.countOfUsesPerDayAvg, counter.days);
}

export class GMeter implements IMeter {
    private readonly metrics: Metrics;
    private _state: EState;
    private readonly perSecondTimer: GInterval;
    private readonly perMinuteTimer: GInterval;
    private readonly perHourTimer: GInterval;
    private readonly perDayTimer: GInterval;

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

    get length(): number {
        return Object.keys(this.metrics).length;
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

        this._state = EState.STOPPED;
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

        this._state = EState.DESTROYED;
        return getPositiveStatus(EState.DESTROYED);
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

    start(): Status {
        if (this.isDestroyed()) return getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this._state === EState.STARTED) return getNegativeStatus(EState.STARTED);

        this.perSecondTimer.start();
        this.perMinuteTimer.start();
        this.perHourTimer.start();
        this.perDayTimer.start();

        this._state = EState.STARTED;
        return getPositiveStatus(EState.STARTED);
    }

    decorate<T>(funcName: string, func: (...args: any[]) => T): (...args: any[]) => T {
        const {deleteObj, metric} = this.createMetric(funcName);

        return (...args: any[]) => {
            if (deleteObj.isDeleted) return func(...args);

            const start = Date.now();
            this.trackMetric(metric);

            try {
                return func(...args);
            } catch (error) {
                if (!deleteObj.isDeleted && (this._state === EState.STARTED)) metric.countOfErrors++;
                throw error;
            } finally {
                if (!deleteObj.isDeleted && (this._state === EState.STARTED)) {
                    metric.timePerCall = Date.now() - start;
                    metric.totalExecutionTime += metric.timePerCall;
                }
            }
        };
    }

    decorateAsync<T>(funcName: string, func: (...args: any[]) => Promise<T>): (...args: any[]) => Promise<T> {
        const {deleteObj, metric} = this.createMetric(funcName);

        return async (...args: any[]): Promise<T> => {
            if (deleteObj.isDeleted) return await func(...args);

            const start = Date.now();
            this.trackMetric(metric);

            try {
                return await func(...args);
            } catch (error) {
                if (!deleteObj.isDeleted && (this._state === EState.STARTED)) metric.countOfErrors++;
                throw error;
            } finally {
                if (!deleteObj.isDeleted && (this._state === EState.STARTED)) {
                    metric.timePerCall = Date.now() - start;
                    metric.totalExecutionTime += metric.timePerCall;
                }
            }
        };
    }

    isDestroyed(): boolean {
        return this._state === EState.DESTROYED;
    }

    private createMetric(funcName: string): { deleteObj: { isDeleted: boolean }, metric: IMeterData } {
        if (funcName in this.metrics) throw new Error(`A function with the name "${funcName}" is already decorated`);
        if (this.isDestroyed()) throw new Error(ERROR.INSTANCE_DESTROYED);

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
        return {deleteObj, metric};
    }

    private addTimers(deleteObj: { isDeleted: boolean }, metric: IMeterData) {
        const counter = metric._counter;

        this.addTimer(deleteObj, this.perSecondTimer, () => {
            updateMetricsPerSecond(metric);
            updateMetricsPerPerMinute(metric);
            updateMetricsPerHour(metric);
            updateMetricsPerDay(metric);
            counter.seconds = 0;
        });

        this.addTimer(deleteObj, this.perMinuteTimer, () => {
            updateMetricsPerPerMinute(metric);
            updateMetricsPerHour(metric);
            updateMetricsPerDay(metric);
            counter.minutes = 0;
        });

        this.addTimer(deleteObj, this.perHourTimer, () => {
            updateMetricsPerHour(metric);
            updateMetricsPerDay(metric);
            counter.hours = 0;
        });

        this.addTimer(deleteObj, this.perDayTimer, () => {
            updateMetricsPerDay(metric);
            counter.days = 0;
        });
    }

    getMetrics(funcName: string): IUserMeterData {
        const metrics: IUserMeterData = {...(<any>this.metrics)[funcName]};
        delete (<any>metrics)._deleteObj;
        delete (<any>metrics)._counter;
        return metrics;
    }

    private clearFunc(): void {
        const listForDelete: string[] = [];
        for (const funcName in this.metrics) listForDelete.push(funcName);
        for (const funcName of listForDelete) this.deleteFunc(funcName);
    }

    getAll(): IUserMetrics {
        const userMetrics: IUserMetrics = {};

        for (const metricsKey in this.metrics) {
            userMetrics[metricsKey] = this.getMetrics(metricsKey);
        }

        return userMetrics;
    }

    private trackMetric(metric: IMeterData) {
        if (this._state === EState.STARTED) {
            metric.countOfUses++;
            metric._counter.seconds++;
            metric._counter.minutes++;
            metric._counter.hours++;
            metric._counter.days++;
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
