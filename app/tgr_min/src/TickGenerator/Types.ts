import {ERROR, EState} from "./Env";
import {ICallback, ISubscriptionLike} from "evg_observable/src/outLib/Types";

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

export type ITickCounter = ILifeCircle & {
    getTicksPerPeriod(): number;
    getTicksSum(): number;
    setPeriod(period: number): Status;
    resetPeriod(): Status;
    subscribe(callback: ICallback<number>): ISubscriptionLike | undefined;
};

export type IMeterData = {
    countOfUses: number;
    countOfErrors: number;
    useTime: number;
    countOfUsesPerSecond: number;
    countOfUsesPerMinute: number;
    countOfUsesPerHour: number;
    countOfUsesPerDay: number;
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

export type IMeter = ILifeCircle & {
    length: number;
    decorate(funcName: string, func: (...args: any[]) => any): (...args: any[]) => any;
    deleteFunc(funcName: string): Status;
    getMetrics(funcName: string): IMeterData;
    getAll(): Metrics;
};
