import {
    IErrorCallback,
    IListener,
    IMarkedForUnsubscribe,
    IObserver,
    ISetObservableValue,
    ISubscribeObject,
    ISubscriptionLike
} from "./Types";
import {Pipe} from "./Pipe";
import {getListener} from "./FunctionLibs";

export class SubscribeObject<T> extends Pipe<T> implements ISubscribeObject<T>, IMarkedForUnsubscribe {
    isMarkedForUnsubscribe: boolean = false;
    observable: IObserver<T> | undefined;
    listener: IListener<T> | undefined;
    _order = 0;

    get order(): number {
        return this._order;
    }
    isPaused = false;
    isPipe = false;

    constructor(observable?: IObserver<T>, isPipe?: boolean) {
        super();
        this.observable = observable;
        this.isPipe = !!isPipe;
    }

    subscribe(observer: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): ISubscriptionLike {
        this.listener = getListener(observer);
        errorHandler && (this.errorHandler = errorHandler);
        return this;
    }

    public unsubscribe(): void {
        if (!this.observable) return;
        this.observable.unSubscribe(this);
        this.observable = <any>null;
        this.listener = <any>null;
        this.chainHandlers.length = 0;
    }

    send(value: T): void {
        try {
            this.pipeData.payload = value;
            this.pipeData.isBreakChain = false;
            processValue(value, this);
        } catch (err) {
            this.errorHandler(value, err);
        }
    }

    resume(): void {
        this.isPaused = false;
    }

    pause(): void {
        this.isPaused = true;
    }

    set order(value: number) {
        this._order = value;
    }

    errorHandler: IErrorCallback = (errorData: any, errorMessage: any) => {
        console.log(`(Unit of SubscribeObject).send(${errorData}) ERROR:`, errorMessage);
    };
}

function processValue<T>(value: T, subsObj: SubscribeObject<T>): void {
    const listener = subsObj.listener;
    if (!listener) return subsObj.unsubscribe();
    if (!subsObj.observable) return subsObj.unsubscribe();
    if (subsObj.isPaused) return;
    if (!subsObj.isPipe) return listener(value);

    for (let i = 0; i < subsObj.chainHandlers.length; i++) {
        subsObj.pipeData.isNeedUnsubscribe = false;
        subsObj.pipeData.isAvailable = false;

        subsObj.chainHandlers[i]();
        if (subsObj.pipeData.isNeedUnsubscribe) return subsObj.unsubscribe();
        if (!subsObj.pipeData.isAvailable) return;
        if (subsObj.pipeData.isBreakChain) break;
    }

    return listener(subsObj.pipeData.payload);
}
