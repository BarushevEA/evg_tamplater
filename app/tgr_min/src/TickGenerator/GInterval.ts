import {IInterval, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractGenerator} from "./AbstractGenerator";

export class GInterval extends AbstractGenerator implements IInterval {
    private intervalId: any = 0;
    private delay: milliseconds = 0;

    constructor() {
        super();
    }

    setInterval(delay: milliseconds): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (this.intervalId) return getNegativeStatus(EState.STARTED);
        if (delay < 0) return getNegativeStatus(ERROR.NEGATIVE_DELAY);

        this.delay = delay;
        this.state$.next(EState.INIT);
        return getPositiveStatus(EState.INIT);
    }

    startProcess(): Status {
        this.intervalId = setInterval(() => {
            this.state$.next(EState.PROCESS);
        }, this.delay);

        this.state$.next(EState.STARTED);
        return getPositiveStatus(EState.STARTED);
    }

    stopProcess(): Status {
        clearInterval(this.intervalId);
        this.intervalId = 0;

        this.state$.next(EState.STOPPED);
        return getPositiveStatus(EState.STOPPED);
    }
}
