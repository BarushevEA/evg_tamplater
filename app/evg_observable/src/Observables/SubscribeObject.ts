import {
    IErrorCallback,
    IListener,
    IMarkedForUnsubscribe,
    IObserver,
    ISubscribeGroup,
    ISubscribeObject,
    ISubscriptionLike
} from "./Types";
import {Pipe} from "./Pipe";
import {getListener} from "./FunctionLibs";

export class SubscribeObject<T> extends Pipe<T> implements ISubscribeObject<T>, IMarkedForUnsubscribe {
    isMarkedForUnsubscribe: boolean = false;
    observable: IObserver<T> | undefined;
    listener: IListener<T> | undefined;
    get order(): number {
        return this._order;
    }
    _order = 0;
    isPaused = false;
    isPipe = false;

    constructor(observable?: IObserver<T>, isPipe?: boolean) {
        super();
        this.observable = observable;
        this.isPipe = !!isPipe;
    }

    errorHandler: IErrorCallback = (errorData: any, errorMessage: any) => {
        console.log(`(Unit of SubscribeObject).send(${errorData}) ERROR:`, errorMessage);
    };

    public unsubscribe(): void {
        if (!this.observable) return;
        this.observable.unSubscribe(this);
        this.observable = <any>null;
        this.listener = <any>null;
        this.chainHandlers.length = 0;
    }

    subscribe(observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback): ISubscriptionLike {
        this.listener = getListener(observer);
        errorHandler && (this.errorHandler = errorHandler);
        return this;
    }

    resume(): void {
        this.isPaused = false;
    }

    pause(): void {
        this.isPaused = true;
    }

    send(value: T): void {
        try {
            this.pipeData.payload = value;
            this.pipeData.isBreakChain = false;
            this.processValue(value);
        } catch (err) {
            this.errorHandler(value, err);
        }
    }

    set order(value: number) {
        this._order = value;
    }

    processValue<T>(value: T): void {
        const listener = this.listener;
        if (!listener) return this.unsubscribe();
        if (!this.observable) return this.unsubscribe();
        if (this.isPaused) return;
        if (!this.isPipe) return listener(<any>value);

        return this.processChain(listener);
    }
}
