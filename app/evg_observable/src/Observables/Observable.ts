import {
    ICallback,
    IErrorCallback,
    IListener,
    IMarkedForUnsubscribe,
    IObserver,
    IOnceMarker,
    ISetup,
    IStream,
    ISubscribe,
    ISubscribeObject,
    ISubscriptionLike
} from "./Types";
import {negativeCallback, positiveCallback, quickDeleteFromArray, randomCallback} from "./FunctionLibs";

export class SubscribeObject<T> implements ISubscribeObject<T>, IMarkedForUnsubscribe {
    isMarkedForUnsubscribe: boolean = false;
    protected observable: IObserver<T> | undefined;
    protected listener: IListener<T> | undefined;
    protected isPipe = false;

    protected _order = 0;
    private isListenPaused = false;
    private once: IOnceMarker = {isOnce: false, isFinished: false};
    private unsubscribeByNegativeCondition: ICallback<T> = <any>null;
    private unsubscribeByPositiveCondition: ICallback<T> = <any>null;
    private emitByNegativeCondition: ICallback<T> = <any>null;
    private emitByPositiveCondition: ICallback<T> = <any>null;
    private emitMatchCondition: ICallback<T> = <any>null;

    get order(): number {
        return this._order;
    }

    constructor(observable?: IObserver<T>, isPipe?: boolean) {
        this.observable = observable;
        this.isPipe = !!isPipe;
    }

    private static callbackSend<T>(value: T, subsObj: SubscribeObject<T>): void {
        const listener = subsObj.listener;
        if (!listener) return subsObj.unsubscribe();
        if (!subsObj.observable) return subsObj.unsubscribe();
        if (subsObj.isListenPaused) return;
        if (!subsObj.isPipe) return listener(value);
        if (subsObj.emitByPositiveCondition && subsObj.emitByPositiveCondition(value)) return listener(value);
        if (subsObj.emitByNegativeCondition && !subsObj.emitByNegativeCondition(value)) return listener(value);
        if (subsObj.once.isOnce) {
            subsObj.once.isFinished = true;
            listener(value);
            return subsObj.unsubscribe();
        }
        if (subsObj.unsubscribeByNegativeCondition) {
            if (!subsObj.unsubscribeByNegativeCondition(value)) {
                subsObj.unsubscribeByNegativeCondition = <any>null;
                return subsObj.unsubscribe();
            }
            return listener(value);
        }
        if (subsObj.unsubscribeByPositiveCondition) {
            if (subsObj.unsubscribeByPositiveCondition(value)) {
                subsObj.unsubscribeByPositiveCondition = <any>null;
                return subsObj.unsubscribe();
            }
            return listener(value);
        }
        if (subsObj.emitMatchCondition && (subsObj.emitMatchCondition(value) === value)) return listener(value);
    }

    subscribe(listener: IListener<T>, errorHandler?: IErrorCallback): ISubscriptionLike {
        this.listener = listener;
        errorHandler && (this.errorHandler = errorHandler);
        return this;
    }

    public unsubscribe(): void {
        if (!this.observable) return;
        this.observable.unSubscribe(this);
        this.observable = <any>null;
        this.listener = <any>null;
    }

    send(value: T): void {
        try {
            SubscribeObject.callbackSend(value, this);
        } catch (err) {
            this.errorHandler(value, err);
        }
    }

    setOnce(): ISubscribe<T> {
        this.once.isOnce = true;
        return this;
    }

    unsubscribeByNegative(condition: ICallback<T>): ISubscribe<T> {
        this.unsubscribeByNegativeCondition = condition ?? negativeCallback;
        return this
    }

    unsubscribeByPositive(condition: ICallback<T>): ISubscribe<T> {
        this.unsubscribeByPositiveCondition = condition ?? positiveCallback;
        return this;
    }

    emitByNegative(condition: ICallback<T>): ISubscribe<T> {
        this.emitByNegativeCondition = condition ?? positiveCallback;
        return this;
    }

    emitByPositive(condition: ICallback<T>): ISubscribe<T> {
        this.emitByPositiveCondition = condition ?? negativeCallback;
        return this;
    }

    emitMatch(condition: ICallback<T>): ISubscribe<T> {
        this.emitMatchCondition = condition ?? randomCallback;
        return this;
    }

    resume(): void {
        this.isListenPaused = false;
    }

    pause(): void {
        this.isListenPaused = true;
    }

    set order(value: number) {
        this._order = value;
    }

    protected errorHandler: IErrorCallback = (errorData: any, errorMessage: any) => {
        console.log(`(Unit of SubscribeObject).send(${errorData}) ERROR:`, errorMessage);
    };
}

export class Observable<T> implements IObserver<T>, IStream<T> {
    protected listeners: ISubscribeObject<T>[] = [];
    private _isEnable: boolean = true;

    get isEnable(): boolean {
        return this._isEnable;
    }
    protected isNextProcess = false;
    protected listenersForUnsubscribe: ISubscriptionLike[] = [];

    constructor(private value: T) {
    }

    disable(): void {
        this._isEnable = false;
    }

    enable(): void {
        this._isEnable = true;
    }

    protected _isDestroyed = false;

    public next(value: T): void {
        if (this._isDestroyed) return;
        if (!this._isEnable) return;
        this.isNextProcess = true;
        this.value = value;

        for (let i = 0; i < this.listeners.length; i++) this.listeners[i].send(value);

        this.isNextProcess = false;
        this.listenersForUnsubscribe.length && this.handleListenersForUnsubscribe();
    }

    stream(values: T[]): void {
        if (this._isDestroyed) return;
        if (!this._isEnable) return;

        for (let i = 0; i < values.length; i++) this.next(values[i]);
    }

    get isDestroyed(): boolean {
        return this._isDestroyed;
    }

    public unSubscribe(listener: ISubscriptionLike): void {
        if (this._isDestroyed) return;
        if (this.isNextProcess && listener) {
            const marker: IMarkedForUnsubscribe = <any>listener;
            !marker.isMarkedForUnsubscribe && this.listenersForUnsubscribe.push(listener);
            marker.isMarkedForUnsubscribe = true;
            return;
        }
        this.listeners && !quickDeleteFromArray(this.listeners, listener);
    }

    public destroy(): void {
        this.value = <any>null;
        this.unsubscribeAll();
        this.listeners = <any>null;
        this._isDestroyed = true;
    }

    public unsubscribeAll(): void {
        if (this._isDestroyed) return;
        this.listeners.length = 0;
    }

    public getValue(): T | undefined {
        if (this._isDestroyed) return undefined;
        return this.value;
    }

    public size(): number {
        if (this._isDestroyed) return 0;
        return this.listeners.length;
    }

    public subscribe(listener: IListener<T>, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        if (this._isDestroyed) return undefined;
        if (!listener) return undefined;
        const subscribeObject = new SubscribeObject(this, false);
        subscribeObject.subscribe(listener, errorHandler);
        this.listeners.push(subscribeObject);
        return subscribeObject;
    }

    pipe(): ISetup<T> | undefined {
        if (this._isDestroyed) return undefined;
        const subscribeObject = new SubscribeObject(this, true);
        this.listeners.push(subscribeObject);
        return subscribeObject;
    }

    private handleListenersForUnsubscribe(): void {
        const length = this.listenersForUnsubscribe.length;

        for (let i = 0; i < length; i++) this.unSubscribe(this.listenersForUnsubscribe[i]);

        this.listenersForUnsubscribe.length = 0;
    }
}
