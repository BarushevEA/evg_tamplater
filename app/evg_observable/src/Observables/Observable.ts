import {
    IErrorCallback,
    IListener,
    IMarkedForUnsubscribe,
    IObserver,
    ISetObservableValue,
    ISetup,
    IStream,
    ISubscribeObject,
    ISubscriptionLike
} from "./Types";
import {quickDeleteFromArray} from "./FunctionLibs";
import {SubscribeObject} from "./SubscribeObject";

export class Observable<T> implements IObserver<T>, IStream<T> {
    protected listeners: ISubscribeObject<T>[] = [];
    private _isEnable: boolean = true;
    protected _isDestroyed = false;
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

    get isEnable(): boolean {
        return this._isEnable;
    }

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

    public subscribe(observer: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        if (!this.isSubsValid(observer)) return undefined;
        const subscribeObject = new SubscribeObject(this, false);
        this.addObserver(subscribeObject, observer, errorHandler);
        return subscribeObject;
    }

    protected addObserver(subscribeObject: SubscribeObject<T>, observer: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback) {
        subscribeObject.subscribe(observer, errorHandler);
        this.listeners.push(subscribeObject);
    }

    protected isSubsValid(listener: IListener<T> | ISetObservableValue): boolean {
        if (this._isDestroyed) return false;
        return !!listener;
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
