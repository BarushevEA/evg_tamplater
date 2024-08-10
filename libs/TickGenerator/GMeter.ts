import {IMeter, IMeterData, IUserMeterData, IUserMetrics, Metrics, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {GInterval} from "./GInterval";
import {getAvg, getMax, getMinNumNotZero, getNegative, getPositive} from "./Utils";
import {AbstractGenerator} from "./AbstractGenerator";

const updateMetricsPerSecond = (metric: IMeterData) => {
    const counter = metric._counter;
    metric.countOfUsesPerSecond = counter.seconds;
    metric.countOfUsesPerSecondMax = getMax(metric.countOfUsesPerSecondMax, counter.seconds);
    metric.countOfUsesPerSecondMin = getMinNumNotZero(metric.countOfUsesPerSecondMin, counter.seconds);
    metric.countOfUsesPerSecondAvg = getAvg(metric.countOfUsesPerSecondAvg, counter.seconds);
};

const updateMetricsPerPerMinute = (metric: IMeterData) => {
    const counter = metric._counter;
    metric.countOfUsesPerMinute = counter.minutes;
    metric.countOfUsesPerMinuteMax = getMax(metric.countOfUsesPerMinuteMax, counter.minutes);
    metric.countOfUsesPerMinuteMin = getMinNumNotZero(metric.countOfUsesPerMinuteMin, counter.minutes);
    metric.countOfUsesPerMinuteAvg = getAvg(metric.countOfUsesPerMinuteAvg, counter.minutes);
};

const updateMetricsPerHour = (metric: IMeterData) => {
    const counter = metric._counter;
    metric.countOfUsesPerHour = counter.hours;
    metric.countOfUsesPerHourMax = getMax(metric.countOfUsesPerHourMax, counter.hours);
    metric.countOfUsesPerHourMin = getMinNumNotZero(metric.countOfUsesPerHourMin, counter.hours);
    metric.countOfUsesPerHourAvg = getAvg(metric.countOfUsesPerHourAvg, counter.hours);
};

const updateMetricsPerDay = (metric: IMeterData) => {
    const counter = metric._counter;
    metric.countOfUsesPerDay = counter.days;
    metric.countOfUsesPerDayMax = getMax(metric.countOfUsesPerDayMax, counter.days);
    metric.countOfUsesPerDayMin = getMinNumNotZero(metric.countOfUsesPerDayMin, counter.days);
    metric.countOfUsesPerDayAvg = getAvg(metric.countOfUsesPerDayAvg, counter.days);
};

export class GMeter implements IMeter {
    private readonly metrics: Metrics;
    private _state: EState;
    private readonly perSecond: GInterval;
    private readonly perMinute: GInterval;
    private readonly perHour: GInterval;
    private readonly perDay: GInterval;

    constructor() {
        this.metrics = {};
        this._state = EState.STOPPED;

        this.perSecond = new GInterval();
        this.perSecond.setInterval(1000);

        this.perMinute = new GInterval();
        this.perMinute.setInterval(60 * 1000);

        this.perHour = new GInterval();
        this.perHour.setInterval(60 * 60 * 1000);

        this.perDay = new GInterval();
        this.perDay.setInterval(24 * 60 * 60 * 1000);
    }

    get length(): number {
        return Object.keys(this.metrics).length;
    }

    get state(): EState {
        return this._state;
    }

    start(): Status {
        if (this.isDestroyed()) return getNegative(ERROR.INSTANCE_DESTROYED);
        if (this._state === EState.STARTED) return getNegative(EState.STARTED);

        this.perSecond.start();
        this.perMinute.start();
        this.perHour.start();
        this.perDay.start();

        this._state = EState.STARTED;
        return getPositive(EState.STARTED);
    }

    stop(): Status {
        if (this.isDestroyed()) return getNegative(ERROR.INSTANCE_DESTROYED);

        this.perSecond.stop();
        this.perMinute.stop();
        this.perHour.stop();
        this.perDay.stop();

        for (const metricsKey in this.metrics) {
            const metric = this.metrics[metricsKey];
            metric._counter.days = 0;
            metric._counter.hours = 0;
            metric._counter.minutes = 0;
            metric._counter.seconds = 0;
        }

        this._state = EState.STOPPED;
        return getPositive(EState.STOPPED);
    }

    destroy(): Status {
        if (this.isDestroyed()) return getNegative(ERROR.INSTANCE_DESTROYED);

        this.stop();
        this.clearFunc();

        this.perSecond.destroy();
        this.perMinute.destroy();
        this.perHour.destroy();
        this.perDay.destroy();

        this._state = EState.DESTROYED;
        return getPositive(EState.DESTROYED);
    }

    isDestroyed(): boolean {
        return this._state === EState.DESTROYED;
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

    deleteFunc(funcName: string): Status {
        if (this.isDestroyed()) return getNegative(ERROR.INSTANCE_DESTROYED);

        if (funcName in this.metrics) {
            const metric = this.metrics[funcName];
            metric._deleteObj.isDeleted = true;
            // @ts-ignore
            metric._deleteObj = null
            delete this.metrics[funcName];
            return getPositive(EState.DELETED);
        }

        return getNegative(ERROR.NAME_IS_NOT_PRESENT);
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

    private clearFunc(): void {
        const listForDelete: string[] = [];
        for (const funcName in this.metrics) listForDelete.push(funcName);
        for (const funcName of listForDelete) this.deleteFunc(funcName);
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

    getMetrics(funcName: string): IUserMeterData {
        const metrics: IUserMeterData = {...(<any>this.metrics)[funcName]};
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

    private addTimers(deleteObj: { isDeleted: boolean }, metric: IMeterData) {
        const counter = metric._counter;

        this.addTimer(deleteObj, this.perSecond, () => {
            updateMetricsPerSecond(metric);
            updateMetricsPerPerMinute(metric);
            updateMetricsPerHour(metric);
            updateMetricsPerDay(metric);
            counter.seconds = 0;
        });

        this.addTimer(deleteObj, this.perMinute, () => {
            updateMetricsPerPerMinute(metric);
            updateMetricsPerHour(metric);
            updateMetricsPerDay(metric);
            counter.minutes = 0;
        });

        this.addTimer(deleteObj, this.perHour, () => {
            updateMetricsPerHour(metric);
            updateMetricsPerDay(metric);
            counter.hours = 0;
        });

        this.addTimer(deleteObj, this.perDay, () => {
            updateMetricsPerDay(metric);
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
