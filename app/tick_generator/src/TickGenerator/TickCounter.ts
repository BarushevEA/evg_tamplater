import {ITickCounter, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {AbstractGenerator} from "./AbstractGenerator";
import {ICallback, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {getNegativeStatus, getPositiveStatus} from "./Utils";

export class TickCounter implements ITickCounter {
    private _state = EState.UNDEFINED;
    private defaultPeriodMs = 1000;
    private periodMs = 0;
    private timer: any;
    private sum = 0;
    private counter = 0;
    private counter$ = new Observable(this.counter);
    private subscriber: ISubscriptionLike | undefined;

    constructor(private subject: AbstractGenerator) {
        this.init();
    }

    private init() {
        this._state = EState.INIT;
        this.resetPeriod();
    }

    get state(): EState {
        return this._state;
    }

    getTicksPerPeriod(): number {
        return this.counter;
    }

    getTicksSum(): number {
        return this.sum;
    }

    resetPeriod(): Status {
        if (this.isDestroyed()) getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this.state === EState.STARTED) getNegativeStatus(this.state);

        this.periodMs = this.defaultPeriodMs;
        return getPositiveStatus(this.state);
    }

    setPeriod(period: number): Status {
        if (this.isDestroyed()) getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this.state === EState.STARTED) getNegativeStatus(this.state);

        if ((typeof period !== 'number') || (period < 0)) return {
            isApplied: false,
            state: ERROR.TYPE_INVALID
        };

        this.periodMs = period;
        return getPositiveStatus(this.state);
    }

    subscribe(callback: ICallback<number>): ISubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;
        return this.counter$.subscribe(callback);
    }

    start(): Status {
        if (this.isDestroyed()) getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this.state === EState.STARTED) getNegativeStatus(this.state);

        let innerCounter = 0;
        this.subscriber = this.subject.subscribeOnProcess(() => {
            innerCounter++;
            this.sum++;
        });

        this.timer = setInterval(() => {
            this.counter = innerCounter;
            innerCounter = 0;
            this.counter$.next(this.counter);
            this._state = EState.READY;
        }, this.periodMs);

        this._state = EState.STARTED;
        return getPositiveStatus(this.state);
    }

    stop(): Status {
        if (this.isDestroyed()) getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this.timer) clearInterval(this.timer);

        this.subscriber?.unsubscribe();
        this.counter = 0;
        this.sum = 0;
        this._state = EState.STOPPED;
        return getPositiveStatus(this.state);
    }

    isDestroyed(): boolean {
        return this._state === EState.DESTROYED;
    }

    destroy(): Status {
        this.stop();
        this.counter$.destroy();
        this._state = EState.DESTROYED;
        return getPositiveStatus(this.state);
    }
}
