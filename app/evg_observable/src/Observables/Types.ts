export type ICallback<T> = (value?: T) => any;
export type IMarkedForUnsubscribe = {
    isMarkedForUnsubscribe: boolean;
};
export type IErrorCallback = (errorData: any, errorMessage: any) => void;
export type ISubscribe<T> = {
    subscribe(listener: IListener<T>, errorHandler?: IErrorCallback): ISubscriptionLike | undefined;
};
export type IListener<T> = ICallback<T>;
export type IDestroy = {
    destroy(): void;
    isDestroyed: boolean;
};
export type IOnceMarker = {
    isOnce: boolean;
    isFinished: boolean;
};
export type IOrder = {
    order: number;
};
export type IOnce<T> = {
    setOnce(): ISubscribe<T>;
};
export type IOrderedOnce<T> = {
    setOnce(): IOrderedSubscribe<T>;
};
export type ISetObservableValue = {
    next(value: any): void;
};
export type ISubscriptionLike = {
    unsubscribe(): void;
};
export type ISetup<T> =
    IUnsubscribeByNegative<T> &
    IUnsubscribeByPositive<T> &
    IEmitByNegative<T> &
    IEmitByPositive<T> &
    IEmitMatchCondition<T> &
    IOnce<T> &
    ISubscribe<T>;
export type IOrderedSetup<T> =
    IOrderedUnsubscribeByNegative<T> &
    IOrderedUnsubscribeByPositive<T> &
    IOrderedEmitByNegative<T> &
    IOrderedEmitByPositive<T> &
    IOrderedEmitMatchCondition<T> &
    IOrderedOnce<T> &
    IOrderedSubscribe<T>;
export type ISubscribeObject<T> =
    ISubscriptionLike &
    IPause &
    IOrder &
    ISend<T> &
    ISetup<T>;
export type ISubscribeCounter = {
    size(): number;
};
export type ISubscriber<T> =
    {
        getValue(): T | undefined,
        isEnable: boolean
    } &
    ISubscribe<T>;
export type IObserver<T> =
    ISetObservableValue &
    ISubscriber<T> &
    IDestroy &
    ISubscribeCounter &
    IObservablePipe<T> &
    {
        unSubscribe(subscriber: ISubscriptionLike): void,
        unsubscribeAll(): void,
        disable(): void,
        enable(): void,
    };
export type IStream<T> = {
    stream(value: T[]): void;
}
export type IPause = {
    pause(): void;
    resume(): void;
};
export type IObservablePipe<T> = {
    pipe(): ISetup<T> | undefined
};
export type ISend<T> = {
    send(value: T): void;
};
export type IUnsubscribeByNegative<T> = {
    unsubscribeByNegative(condition: ICallback<any>): ISubscribe<T>;
};
export type IOrderedUnsubscribeByNegative<T> = {
    unsubscribeByNegative(condition: ICallback<any>): IOrderedSubscribe<T>;
};
export type IUnsubscribeByPositive<T> = {
    unsubscribeByPositive(condition: ICallback<any>): ISubscribe<T>;
};
export type IOrderedUnsubscribeByPositive<T> = {
    unsubscribeByPositive(condition: ICallback<any>): IOrderedSubscribe<T>;
};
export type IEmitByNegative<T> = {
    emitByNegative(condition: ICallback<any>): ISubscribe<T>;
};
export type IOrderedEmitByNegative<T> = {
    emitByNegative(condition: ICallback<any>): IOrderedSubscribe<T>;
};
export type IEmitByPositive<T> = {
    emitByPositive(condition: ICallback<any>): ISubscribe<T>;
};
export type IOrderedEmitByPositive<T> = {
    emitByPositive(condition: ICallback<any>): IOrderedSubscribe<T>;
};
export type IEmitMatchCondition<T> = {
    emitMatch(condition: ICallback<any>): ISubscribe<T>;
};
export type IOrderedEmitMatchCondition<T> = {
    emitMatch(condition: ICallback<any>): IOrderedSubscribe<T>;
};
export type ICollector =
    IDestroy &
    ISubscribeCounter &
    {
        collect(...subscriptionLikeList: ISubscriptionLike[]): void;
        unsubscribe(subscriptionLike: ISubscriptionLike): void;
        unsubscribeAll(): void;
    };
export type IOrderedObservable = {
    sortByOrder(): boolean;
};
export type IOrdered<T> = IObserver<T> & IOrderedObservable;
export type IOrderedSubscriptionLike = (ISubscriptionLike & IOrder);
export type IOrderedSubscribe<T> = {
    subscribe(listener: IListener<T>, errorHandler?: IErrorCallback): IOrderedSubscriptionLike;
};
export type IGroup = ICollector & {
    name: string;
    order: number;
};
