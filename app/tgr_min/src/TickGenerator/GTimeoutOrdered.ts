import {ITimeout, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractOrderedGenerator} from "./AbstractOrderedGenerator";

export class GTimeoutOrdered extends AbstractOrderedGenerator implements ITimeout {
    private delay: milliseconds = 0;
    private timerId: any = 0;

    constructor() {
        super();
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

    startProcess(): Status {
        this.timerId = setTimeout(() => {
            this.state$.next(EState.PROCESS);
            this.state$.next(EState.STOPPED);
        }, this.delay);

        return getPositiveStatus(EState.STARTED);
    }

    stopProcess(): Status {
        clearTimeout(this.timerId);
        return getPositiveStatus(EState.STOPPED);
    }
}
