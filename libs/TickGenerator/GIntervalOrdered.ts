import {IInterval, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {getNegative, getPositive} from "./Utils";
import {AbstractOrderedGenerator} from "./AbstractOrderedGenerator";

export class GIntervalOrdered extends AbstractOrderedGenerator implements IInterval {
    private id: any = 0;
    private delay: milliseconds = 0;

    constructor() {
        super();
    }

    setInterval(delay: milliseconds): Status {
        if (this.isDestroyed()) return getNegative(EState.DESTROYED);
        if (this.id) return getNegative(EState.STARTED);
        if (delay < 0) return getNegative(ERROR.NEGATIVE_DELAY);

        this.delay = delay;
        this.state$.next(EState.INIT);
        return getPositive(EState.INIT);
    }

    startProcess(): Status {
        this.id = setInterval(() => {
            this.state$.next(EState.PROCESS);
        }, this.delay);

        this.state$.next(EState.STARTED);
        return getPositive(EState.STARTED);
    }

    stopProcess(): Status {
        clearInterval(this.id);
        this.id = 0;

        this.state$.next(EState.STOPPED);
        return getPositive(EState.STOPPED);
    }
}
