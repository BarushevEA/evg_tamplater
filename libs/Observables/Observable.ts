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
import {FilterCollection} from "./FilterCollection";

export class Observable<T> implements IObserver<T>, IStream<T>, IAddFilter<T> {
    protected listeners: ISubscribeObject<T>[] = [];
    private isStop: boolean = true;
    protected isKilled = false;
    protected isProcess = false;
    protected trash: ISubscriptionLike[] = [];
    private filters = new FilterCollection<T>();

    constructor(private value: T) {
    }

    addFilter(errorHandler?: IErrorCallback): IFilterSetup<T> {
        if (errorHandler) {
            this.filters.addErrorHandler(errorHandler);
        }
        return this.filters;
    }

    disable(): void {
        this.isStop = false;
    }

    enable(): void {
        this.isStop = true;
    }

    get isEnable(): boolean {
        return this.isStop;
    }

    public next(value: T): void {
        if (this.isKilled) return;
        if (!this.isStop) return;
        if (!this.filters.isEmpty) {
            if (!this.filters.processChain(value).isOK) return;
        }

        this.isProcess = true;
        this.value = value;

        for (let i = 0; i < this.listeners.length; i++) this.listeners[i].send(value);

        this.isProcess = false;
        this.trash.length && this.handleListenersForUnsubscribe();
    }

    stream(values: T[]): void {
        if (this.isKilled) return;
        if (!this.isStop) return;

        for (let i = 0; i < values.length; i++) this.next(values[i]);
    }

    get isDestroyed(): boolean {
        return this.isKilled;
    }

    public unSubscribe(listener: ISubscriptionLike): void {
        if (this.isKilled) return;
        if (this.isProcess && listener) {
            this.trash.push(listener);
            return;
        }
        this.listeners && !quickDeleteFromArray(this.listeners, listener);
    }

    public destroy(): void {
        this.value = <any>null;
        this.unsubscribeAll();
        this.listeners = <any>null;
        this.isKilled = true;
    }

    public unsubscribeAll(): void {
        if (this.isKilled) return;
        this.listeners.length = 0;
    }

    public getValue(): T | undefined {
        if (this.isKilled) return undefined;
        return this.value;
    }

    public size(): number {
        if (this.isKilled) return 0;
        return this.listeners.length;
    }

    public subscribe(observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        if (!this.isListener(observer)) return undefined;
        const subscribeObject = new SubscribeObject(this, false);
        this.addObserver(subscribeObject, observer, errorHandler);
        return subscribeObject;
    }

    protected addObserver(subscribeObject: SubscribeObject<T>, observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback) {
        subscribeObject.subscribe(observer, errorHandler);
        this.listeners.push(subscribeObject);
    }

    protected isListener(listener: ISubscribeGroup<T>): boolean {
        if (this.isKilled) return false;
        return !!listener;
    }

    pipe(): ISetup<T> | undefined {
        if (this.isKilled) return undefined;
        const subscribeObject = new SubscribeObject(this, true);
        this.listeners.push(subscribeObject);
        return subscribeObject;
    }

    private handleListenersForUnsubscribe(): void {
        const length = this.trash.length;

        for (let i = 0; i < length; i++) this.unSubscribe(this.trash[i]);

        this.trash.length = 0;
    }
}
