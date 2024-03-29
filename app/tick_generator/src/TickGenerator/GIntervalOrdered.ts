import {IInterval, milliseconds, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {AbstractOrderedGenerator} from "./AbstractOrderedGenerator";

export class GIntervalOrdered extends AbstractOrderedGenerator implements IInterval {
    private intervalId: any = 0;
    private delay: milliseconds = 0;

    constructor() {
        super();
    }

    setInterval(delay: milliseconds): Status {
        const state = this.state;
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (state === EState.STARTED) return getNegativeStatus(state);
        if (delay < 0) return getNegativeStatus(ERROR.NEGATIVE_DELAY);

        this.delay = delay;
        this.state$.next(EState.INIT);
        return getPositiveStatus(EState.INIT);
    }

    startProcess(): Status {
        this.intervalId = setInterval(() => {
            this.state$.next(EState.PROCESS);
        }, this.delay);

        return getPositiveStatus(EState.STARTED);
    }

    stopProcess(): Status {
        clearInterval(this.intervalId);
        return getPositiveStatus(EState.STOPPED);
    }
}
