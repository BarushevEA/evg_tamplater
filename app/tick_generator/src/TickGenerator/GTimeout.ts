import {IGenerator, ITimeout, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {ICallback, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {getNegativeStatus, getPositiveStatus} from "./Utils";

export class GTimeout implements IGenerator, ITimeout {
    private state$ = new Observable<EState>(EState.UNDEFINED);
    private delay: milliseconds = 0;
    private timerId: any = 0;

    get state(): EState {
        if (this.state$.isDestroyed) return EState.DESTROYED;
        const state = this.state$.getValue();
        return state ?? EState.UNDEFINED;
    }

    destroy(): Status {
        this.stop();
        this.state$.next(EState.DESTROYED);
        this.state$.destroy();
        return getPositiveStatus(EState.DESTROYED);
    }

    setTimeout(delay: milliseconds): Status {
        const state = this.state;
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (state === EState.STARTED) return getNegativeStatus(state);
        if (delay < 0) return getNegativeStatus(ERROR.ERROR_NEGATIVE_DELAY);

        this.delay = delay;

        this.state$.next(EState.INIT);
        return getPositiveStatus(EState.INIT);
    }

    start(): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);

        this.timerId = setTimeout(() => {
            this.state$.next(EState.PROCESS);
            this.state$.next(EState.STOPPED);
        }, this.delay);

        this.state$.next(EState.STARTED);
        return getPositiveStatus(EState.STARTED);
    }

    stop(): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);

        clearTimeout(this.timerId);

        this.state$.next(EState.STOPPED);
        return getPositiveStatus(EState.STOPPED);
    }

    subscribeOnState(callback: ICallback<EState>): ISubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;

        return this.state$.subscribe(callback);
    }

    subscribeOnProcess(callback: ICallback<EState>): ISubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;

        return this.state$.pipe()?.emitByPositive(state => state === EState.PROCESS).subscribe(callback);
    }

    isDestroyed(): boolean {
        return this.state === EState.DESTROYED;
    }
}
