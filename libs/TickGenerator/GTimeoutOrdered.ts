import {ITimeout, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {getNegative, getPositive} from "./Utils";
import {AbstractOrderedGenerator} from "./AbstractOrderedGenerator";

export class GTimeoutOrdered extends AbstractOrderedGenerator implements ITimeout {
    private delay: milliseconds = 0;
    private id: any = 0;

    constructor() {
        super();
    }

    setTimeout(delay: milliseconds): Status {
        if (this.isDestroyed()) return getNegative(EState.DESTROYED);
        if (this.id) return getNegative(EState.STARTED);
        if (delay < 0) return getNegative(ERROR.NEGATIVE_DELAY);

        this.delay = delay;

        this.state$.next(EState.INIT);
        return getPositive(EState.INIT);
    }

    startProcess(): Status {
        this.id = setTimeout(() => {
            this.state$.next(EState.PROCESS);
            this.state$.next(EState.STOPPED);
        }, this.delay);

        this.state$.next(EState.STARTED);
        return getPositive(EState.STARTED);
    }

    stopProcess(): Status {
        clearTimeout(this.id);
        this.id = 0;

        this.state$.next(EState.STOPPED);
        return getPositive(EState.STOPPED);
    }
}
