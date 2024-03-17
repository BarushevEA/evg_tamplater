import {ERROR, EState} from "./Env";
import {ICallback, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {IGenerator, IRequestAnimationFrame, Status} from "./Types";

export class GAnimationFrame implements IGenerator, IRequestAnimationFrame {
    private rafId: number | null = null;
    private fps: number = 60;
    private state$ = new Observable<EState>(EState.UNDEFINED);

    get state(): EState {
        if (this.state$.isDestroyed) return EState.DESTROYED;
        const state = this.state$.getValue();
        return state ?? EState.UNDEFINED;
    }

    setFPS(num: number): Status {
        const state = this.state;
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (state === EState.STARTED) return getNegativeStatus(state);
        if (num < 1) return getNegativeStatus(ERROR.ERROR_NEGATIVE_DELAY);

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

    start(): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
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

    stop(): Status {
        if (this.isDestroyed()) return getNegativeStatus(EState.DESTROYED);
        if (!this.rafId) return getNegativeStatus(ERROR.ERROR_NEGATIVE_DELAY);

        cancelAnimationFrame(this.rafId);
        this.rafId = null;
        this.state$.next(EState.STOPPED);

        return getPositiveStatus(EState.STOPPED);
    }

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

        return this.state$.pipe()?.emitByPositive(state => state === EState.PROCESS).subscribe(callback);
    }

    isDestroyed(): boolean {
        return this.state === EState.DESTROYED;
    }
}
