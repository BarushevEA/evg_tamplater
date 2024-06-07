import {
    IAddFilter,
    IErrorCallback,
    IFilterSetup,
    IObserver,
    ISetup,
    IStream,
    ISubscribeGroup,
    ISubscribeObject,
    ISubscriptionLike
} from "./Types";
import {quickDeleteFromArray} from "./FunctionLibs";
import {SubscribeObject} from "./SubscribeObject";
import {Filter} from "./Filter";

export class Observable<T> implements IObserver<T>, IStream<T>, IAddFilter<T> {
    protected listeners: ISubscribeObject<T>[] = [];
    private _isEnable: boolean = true;
    protected _isDestroyed = false;
    protected isNextProcess = false;
    protected listenersForUnsubscribe: ISubscriptionLike[] = [];
    private filterCase = new Filter<T>();

    constructor(private value: T) {
    }

    get isDestroyed(): boolean {
        return this._isDestroyed;
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
        if (!this.filterCase.isEmpty) {
            if (!this.filterCase.processChain(value).isOK) return;
        }

        this.isNextProcess = true;
        this.value = value;

        for (let i = 0; i < this.listeners.length; i++) this.listeners[i].send(value);

        this.isNextProcess = false;
        this.listenersForUnsubscribe.length && this.handleListenersForUnsubscribe();
    }

    addFilter(errorHandler?: IErrorCallback): IFilterSetup<T> {
        if (errorHandler) {
            this.filterCase.addErrorHandler(errorHandler);
        }
        return this.filterCase;
    }

    stream(values: T[]): void {
        if (this._isDestroyed) return;
        if (!this._isEnable) return;

        for (let i = 0; i < values.length; i++) this.next(values[i]);
    }

    public unSubscribe(listener: ISubscriptionLike): void {
        if (this._isDestroyed) return;
        if (this.isNextProcess && listener) {
            this.listenersForUnsubscribe.push(listener);
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

    public subscribe(observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        if (!this.isSubsValid(observer)) return undefined;
        const subscribeObject = new SubscribeObject(this, false);
        this.addObserver(subscribeObject, observer, errorHandler);
        return subscribeObject;
    }

    protected addObserver(subscribeObject: SubscribeObject<T>, observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback) {
        subscribeObject.subscribe(observer, errorHandler);
        this.listeners.push(subscribeObject);
    }

    protected isSubsValid(listener: ISubscribeGroup<T>): boolean {
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
