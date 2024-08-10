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
    protected subs: ISubscribeObject<T>[] = [];
    protected killed = false;
    protected process = false;
    private stop: boolean = true;
    protected trash: ISubscriptionLike[] = [];
    private filters = new FilterCollection<T>();

    constructor(private value: T) {
    }

    get isEnable(): boolean {
        return this.stop;
    }

    get isDestroyed(): boolean {
        return this.killed;
    }

    addFilter(errorHandler?: IErrorCallback): IFilterSetup<T> {
        if (errorHandler) this.filters.addErrorHandler(errorHandler);
        return this.filters;
    }

    disable(): void {
        this.stop = false;
    }

    enable(): void {
        this.stop = true;
    }

    public next(value: T): void {
        if (this.killed) return;
        if (!this.stop) return;
        if (!this.filters.isEmpty && !this.filters.processChain(value).isOK) return;

        this.process = true;
        this.value = value;

        for (let i = 0; i < this.subs.length; i++) this.subs[i].send(value);

        this.process = false;
        this.trash.length && this.clearTrash();
    }

    stream(values: T[]): void {
        if (this.killed) return;
        if (!this.stop) return;

        for (let i = 0; i < values.length; i++) this.next(values[i]);
    }

    public unSubscribe(listener: ISubscriptionLike): void {
        if (this.killed) return;
        if (this.process && listener) {
            this.trash.push(listener);
            return;
        }
        this.subs && !quickDeleteFromArray(this.subs, listener);
    }

    public destroy(): void {
        this.value = <any>null;
        this.unsubscribeAll();
        this.subs = <any>null;
        this.killed = true;
    }

    public unsubscribeAll(): void {
        if (this.killed) return;
        this.subs.length = 0;
    }

    public getValue(): T | undefined {
        if (this.killed) return undefined;
        return this.value;
    }

    public size(): number {
        if (this.killed) return 0;
        return this.subs.length;
    }

    public subscribe(observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        if (!this.isListener(observer)) return undefined;
        const subscribeObject = new SubscribeObject(this, false);
        this.addObserver(subscribeObject, observer, errorHandler);
        return subscribeObject;
    }

    pipe(): ISetup<T> | undefined {
        if (this.killed) return undefined;
        const subscribeObject = new SubscribeObject(this, true);
        this.subs.push(subscribeObject);
        return subscribeObject;
    }

    protected addObserver(subscribeObject: SubscribeObject<T>, observer: ISubscribeGroup<T>, errorHandler?: IErrorCallback) {
        subscribeObject.subscribe(observer, errorHandler);
        this.subs.push(subscribeObject);
    }

    protected isListener(listener: ISubscribeGroup<T>): boolean {
        if (this.killed) return false;
        return !!listener;
    }

    private clearTrash(): void {
        const length = this.trash.length;

        for (let i = 0; i < length; i++) this.unSubscribe(this.trash[i]);

        this.trash.length = 0;
    }
}
