import {ERROR, EState} from "./Env";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {IRequestAnimationFrame, Status} from "./Types";
import {AbstractGenerator} from "./AbstractGenerator";

export class GAnimationFrame extends AbstractGenerator implements IRequestAnimationFrame {
    private rafId: number | null;
    private fps: number;

    constructor() {
        super();
        this.fps = 60;
        this.rafId = null;
    }

    setFPS(num: number): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (this.rafId) return getNegativeStatus(EState.STARTED);
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

        this.state$.next(EState.STARTED);
        return getPositiveStatus(EState.STARTED);
    }

    stopProcess(): Status {
        if (!this.rafId) return getNegativeStatus(ERROR.NEGATIVE_DELAY);
        cancelAnimationFrame(this.rafId);
        this.rafId = null;

        this.state$.next(EState.STOPPED);
        return getPositiveStatus(EState.STOPPED)
    }
}
