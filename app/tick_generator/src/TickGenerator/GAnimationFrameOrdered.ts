import {ERROR, EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {IRequestAnimationFrame, Status} from "./Types";
import {AbstractOrderedGenerator} from "./AbstractOrderedGenerator";

export class GAnimationFrameOrdered extends AbstractOrderedGenerator implements IRequestAnimationFrame {
    private rafId: number | null = null;
    private fps: number = 60;

    constructor(rafId: number | null) {
        super();
        this.rafId = rafId;
    }

    setFPS(num: number): Status {
        const state = this.state;
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (state === EState.STARTED) return getNegativeStatus(state);
        if (num < 1) return getNegativeStatus(ERROR.NEGATIVE_DELAY);

        this.fps = num;
        return getPositiveStatus(this.state);
    }

    set60fps(): Status {
        return this.setFPS(60);
    }

    set30fps(): Status {
        return this.setFPS(30);
    }

    setDefault(): Status {
        return this.setFPS(60);
    }

    startProcess(): Status {
        if (this.rafId) return getNegativeStatus(EState.STARTED);

        let lastUpdate = Math.floor(performance.now());
        const frameInterval = Math.floor(1000 / this.fps);

        const animateFrame = (currentTimestamp: number) => {
            currentTimestamp = Math.floor(currentTimestamp);
            this.rafId = requestAnimationFrame(animateFrame);
            const timeElapsed = currentTimestamp - lastUpdate;

            if (timeElapsed >= frameInterval) {
                lastUpdate = currentTimestamp - (timeElapsed % frameInterval);
                this.state$.next(EState.PROCESS);
            }
        };

        this.rafId = requestAnimationFrame(animateFrame);

        return getPositiveStatus(EState.STARTED)
    }

    stopProcess(): Status {
        if (!this.rafId) return getNegativeStatus(ERROR.NEGATIVE_DELAY);
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
        return getPositiveStatus(EState.STOPPED)
    }
}
