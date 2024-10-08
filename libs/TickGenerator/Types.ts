import {ERROR, EState} from "./Env";
import {ICallback, ISubscriptionLike} from "../Observables/Types";

export type milliseconds = number;

export type Status = {
    isApplied: boolean;
    state: EState | ERROR;
};

export type ILifeCircle = {
    state: EState;
    start(): Status;
    stop(): Status;
    destroy(): Status;
    isDestroyed(): boolean;
}

export type IGenerator = ILifeCircle & {
    subscribeOnState(callback: ICallback<EState>): ISubscriptionLike | undefined;
    subscribeOnProcess(callback: ICallback<EState>): ISubscriptionLike | undefined;
};

export type ITimeout = {
    setTimeout(delay: milliseconds): Status;
};

export type IInterval = {
    setInterval(delay: milliseconds): Status;
};

export type IRequestAnimationFrame = {
    setFPS(num: number): Status;
    set60fps(): Status;
    set30fps(): Status;
    setDefault(): Status;
};

export type IUserMeterData = {
    countOfUses: number;
    countOfErrors: number;
    totalExecutionTime: number;
    timePerCall: number;
    countOfUsesPerSecond: number;
    countOfUsesPerSecondMax: number;
    countOfUsesPerSecondMin: number;
    countOfUsesPerSecondAvg: number;
    countOfUsesPerMinute: number;
    countOfUsesPerMinuteMax: number;
    countOfUsesPerMinuteMin: number;
    countOfUsesPerMinuteAvg: number;
    countOfUsesPerHour: number;
    countOfUsesPerHourMax: number;
    countOfUsesPerHourMin: number;
    countOfUsesPerHourAvg: number;
    countOfUsesPerDay: number;
    countOfUsesPerDayMax: number;
    countOfUsesPerDayMin: number;
    countOfUsesPerDayAvg: number;
}

export type IMeterData = IUserMeterData & {
    _deleteObj: { isDeleted: boolean; };
    _counter: {
        seconds: number;
        minutes: number;
        hours: number;
        days: number;
    };
};

export type Metrics = {
    [funcName: string]: IMeterData;
};

export type IUserMetrics = {
    [funcName: string]: IUserMeterData;
};

export type IMeter = ILifeCircle & {
    length: number;
    decorate<T>(funcName: string, func: (...args: any[]) => T): (...args: any[]) => T;
    decorateAsync<T>(funcName: string, func: (...args: any[]) => Promise<T>): (...args: any[]) => Promise<T>
    deleteFunc(funcName: string): Status;
    getMetrics(funcName: string): IUserMeterData;
    getAll(): IUserMetrics;
};
