import {ERROR, EState} from "./Env";
import {ICallback, ISubscriptionLike} from "evg_observable/src/outLib/Types";

export type milliseconds = number;

export type Status = {
    isApplied: boolean;
    state: EState | ERROR;
};

export type IGenerator = {
    state: EState;
    subscribeOnState(callback: ICallback<EState>): ISubscriptionLike | undefined;
    subscribeOnProcess(callback: ICallback<EState>): ISubscriptionLike | undefined;
    start(): Status;
    stop(): Status;
    destroy(): Status;
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
