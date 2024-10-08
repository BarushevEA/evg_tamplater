import {IGenerator, Status} from "./Types";
import {EState} from "./Env";
import {getNegative, getPositive} from "./Utils";
import {Observable} from "../Observables";
import {ICallback, ISubscriptionLike} from "../Observables/Types";

export abstract class AbstractGenerator implements IGenerator {
    protected state$ = new Observable<EState>(EState.UNDEFINED);

    get state(): EState {
        if (this.state$.isDestroyed) return EState.DESTROYED;
        const state = this.state$.getValue();
        return state ?? EState.UNDEFINED;
    }

    start(): Status {
        if (this.isDestroyed()) return getNegative(EState.DESTROYED);

        const status = this.startProcess();
        if (!status.isApplied) return status;

        return getPositive(<EState><any>status.state);
    }

    abstract startProcess(): Status;

    stop(): Status {
        if (this.isDestroyed()) return getNegative(EState.DESTROYED);

        const status = this.stopProcess();
        if (!status.isApplied) return status;

        return getPositive(<EState><any>status.state);
    }

    abstract stopProcess(): Status;

    destroy(): Status {
        this.stop();
        this.state$.next(EState.DESTROYED);
        this.state$.destroy();
        return getPositive(EState.DESTROYED);
    }

    subscribeOnState(callback: ICallback<EState>): ISubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;

        return this.state$.subscribe(callback);
    }

    subscribeOnProcess(callback: ICallback<EState>): ISubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;

        return this.state$.pipe()?.refine(state => state === EState.PROCESS).subscribe(callback);
    }

    isDestroyed(): boolean {
        return this.state === EState.DESTROYED;
    }
}
