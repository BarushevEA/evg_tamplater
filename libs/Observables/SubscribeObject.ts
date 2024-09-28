import {IErrorCallback, IListener, IObserver, ISubscribeGroup, ISubscribeObject, ISubscriptionLike} from "./Types";
import {Pipe} from "./Pipe";
import {getListener} from "./FunctionLibs";

export class SubscribeObject<T> extends Pipe<T> implements ISubscribeObject<T> {
    observer: IObserver<T> | undefined;
    listener: IListener<T> | undefined;
    paused = false;
    _order = 0;

    get order(): number {
        return this._order;
    }
    piped = false;

    constructor(observable?: IObserver<T>, isPipe?: boolean) {
        super();
        this.observer = observable;
        this.piped = !!isPipe;
    }

    subscribe(observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback): ISubscriptionLike {
        this.listener = getListener(observer);
        errorHandler && (this.errorHandler = errorHandler);
        return this;
    }

    errorHandler: IErrorCallback = (errorData: any, errorMessage: any) => {
        console.log(`(Unit of SubscribeObject).send(${errorData}) ERROR:`, errorMessage);
    };

    send(value: T): void {
        try {
            this.flow.payload = value;
            this.flow.isBreak = false;
            this.processValue(value);
        } catch (err) {
            this.errorHandler(value, err);
        }
    }

    resume(): void {
        this.paused = false;
    }

    pause(): void {
        this.paused = true;
    }

    public unsubscribe(): void {
        if (!this.observer) return;
        this.observer.unSubscribe(this);
        this.observer = <any>null;
        this.listener = <any>null;
        this.chain.length = 0;
    }

    set order(value: number) {
        this._order = value;
    }

    processValue<T>(value: T): void {
        const listener = this.listener;
        if (!listener) return this.unsubscribe();
        if (!this.observer) return;
        if (this.paused) return;
        if (!this.piped) return listener(<any>value);

        return this.processChain(listener);
    }
}
