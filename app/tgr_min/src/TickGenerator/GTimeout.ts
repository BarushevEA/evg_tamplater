import {ITimeout, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractGenerator} from "./AbstractGenerator";

export class GTimeout extends AbstractGenerator implements ITimeout {
    private delay: milliseconds = 0;
    private timerId: any = 0;

    constructor() {
        super();
    }

    setTimeout(delay: milliseconds): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (this.timerId) return getNegativeStatus(EState.STARTED);
        if (delay < 0) return getNegativeStatus(ERROR.NEGATIVE_DELAY);

        this.delay = delay;

        this.state$.next(EState.INIT);
        return getPositiveStatus(EState.INIT);
    }

    startProcess(): Status {
        this.timerId = setTimeout(() => {
            this.state$.next(EState.PROCESS);
            this.state$.next(EState.STOPPED);
        }, this.delay);

        this.state$.next(EState.STARTED);
        return getPositiveStatus(EState.STARTED);
    }

    stopProcess(): Status {
        clearTimeout(this.timerId);
        this.timerId = 0;

        this.state$.next(EState.STOPPED);
        return getPositiveStatus(EState.STOPPED);
    }
}
