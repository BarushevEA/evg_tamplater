import {ERROR, EState} from "./Env";
import {getNegative, getPositive} from "./Utils";
import {IRequestAnimationFrame, Status} from "./Types";
import {AbstractGenerator} from "./AbstractGenerator";

export class GAnimationFrame extends AbstractGenerator implements IRequestAnimationFrame {
    private id: number | null;
    private fps: number;

    constructor() {
        super();
        this.fps = 60;
        this.id = null;
    }

    setFPS(num: number): Status {
        if (this.isDestroyed()) return getNegative(EState.DESTROYED);
        if (this.id) return getNegative(EState.STARTED);
        if (num < 1) return getNegative(ERROR.NEGATIVE_DELAY);

        this.fps = num;
        return getPositive(this.state);
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
        if (this.id) return getNegative(EState.STARTED);

        let lastUpdate = Math.floor(performance.now());
        const frameInterval = Math.floor(1000 / this.fps);

        const animateFrame = (currentTimestamp: number) => {
            currentTimestamp = Math.floor(currentTimestamp);
            this.id = requestAnimationFrame(animateFrame);
            const timeElapsed = currentTimestamp - lastUpdate;

            if (timeElapsed >= frameInterval) {
                lastUpdate = currentTimestamp - (timeElapsed % frameInterval);
                this.state$.next(EState.PROCESS);
            }
        };

        this.id = requestAnimationFrame(animateFrame);

        this.state$.next(EState.STARTED);
        return getPositive(EState.STARTED);
    }

    stopProcess(): Status {
        if (!this.id) return getNegative(ERROR.NEGATIVE_DELAY);
        cancelAnimationFrame(this.id);
        this.id = null;

        this.state$.next(EState.STOPPED);
        return getPositive(EState.STOPPED)
    }
}
