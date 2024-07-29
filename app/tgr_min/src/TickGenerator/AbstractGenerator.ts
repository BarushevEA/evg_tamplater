import {IGenerator, Status} from "./Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {ICallback, ISubscriptionLike} from "evg_observable/src/outLib/Types";

export abstract class AbstractGenerator implements IGenerator {
    protected state$ = new Observable<EState>(EState.UNDEFINED);

    get state(): EState {
        if (this.state$.isDestroyed) return EState.DESTROYED;
        const state = this.state$.getValue();
        return state ?? EState.UNDEFINED;
    }

    start(): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);

        const status = this.startProcess();
        if (!status.isApplied) return status;

        return this.getPositive(status);
    }

    abstract startProcess(): Status;

    stop(): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);

        const status = this.stopProcess();
        if (!status.isApplied) return status;

        return this.getPositive(status);
    }

    abstract stopProcess(): Status;

    destroy(): Status {
        this.stop();
        this.state$.next(EState.DESTROYED);
        this.state$.destroy();
        return getPositiveStatus(EState.DESTROYED);
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

    private getPositive(status: Status) {
        this.state$.next(<EState><any>status.state);
        return getPositiveStatus(<EState><any>status.state);
    }
}
