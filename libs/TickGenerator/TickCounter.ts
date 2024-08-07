import {ITickCounter, Status} from "./Types";
import {ERROR, EState} from "./Env";
import {AbstractGenerator} from "./AbstractGenerator";
import {getNegativeStatus, getPositiveStatus} from "./Utils";
import {ICallback, ISubscriptionLike} from "../Observables/Types";
import {Observable} from "../Observables";

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

    resetPeriod(): Status {
        if (this.isDestroyed()) getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this.state === EState.STARTED) getNegativeStatus(this.state);

        this.periodMs = this.defaultPeriodMs;
        return getPositiveStatus(this.state);
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

    subscribe(callback: ICallback<number>): ISubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;
        return this.counter$.subscribe(callback);
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

    private init() {
        this._state = EState.INIT;
        this.resetPeriod();
    }

    start(): Status {
        if (this.isDestroyed()) getNegativeStatus(ERROR.INSTANCE_DESTROYED);
        if (this.state === EState.STARTED) getNegativeStatus(EState.STARTED);

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
