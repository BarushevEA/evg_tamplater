import {SwitchCase} from "./Pipe";
import {FilterSwitchCase} from "./Filter";

export type ICallback<T> = (value?: T) => any;
export type IErrorCallback = (errorData: any, errorMessage: any) => void;
export type ISubscribe<T> = {
    subscribe(listener: ISubscribeGroup<T>, errorHandler?: IErrorCallback): ISubscriptionLike | undefined;
};
export type IListener<T> = ICallback<T>;
export type IDestroy = {
    destroy(): void;
    isDestroyed: boolean;
};
export type IOrder = {
    order: number;
};
export type ISwitch<T> = {
    switch(): SwitchCase<T>;
};
export type IOrderedSwitch<T> = {
    switch(): SwitchCase<T>;
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
    ISwitch<T> &
    ISubscribe<T>;
export type IOrderedSetup<T> =
    IOrderedUnsubscribeByNegative<T> &
    IOrderedUnsubscribeByPositive<T> &
    IOrderedEmitByNegative<T> &
    IOrderedEmitByPositive<T> &
    IOrderedEmitMatchCondition<T> &
    IOrderedOnce<T> &
    IOrderedSwitch<T> &
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
export type IOrderedObservablePipe<T> = {
    pipe(): ISetup<T> | undefined
};
export type ISend<T> = {
    send(value: T): void;
};
export type IUnsubscribeByNegative<T> = {
    unsubscribeByNegative(condition: ICallback<any>): ISetup<T>;
};
export type IOrderedUnsubscribeByNegative<T> = {
    unsubscribeByNegative(condition: ICallback<any>): IOrderedSetup<T>;
};
export type IUnsubscribeByPositive<T> = {
    unsubscribeByPositive(condition: ICallback<any>): ISetup<T>;
};
export type IOrderedUnsubscribeByPositive<T> = {
    unsubscribeByPositive(condition: ICallback<any>): IOrderedSetup<T>;
};
export type IEmitByNegative<T> = {
    emitByNegative(condition: ICallback<any>): ISetup<T>;
};
export type IOrderedEmitByNegative<T> = {
    emitByNegative(condition: ICallback<any>): IOrderedSetup<T>;
};
export type IEmitByPositive<T> = {
    emitByPositive(condition: ICallback<any>): ISetup<T>;
};
export type IOrderedEmitByPositive<T> = {
    emitByPositive(condition: ICallback<any>): IOrderedSetup<T>;
};
export type IEmitMatchCondition<T> = {
    emitMatch(condition: ICallback<any>): ISetup<T>;
};
export type IOrderedEmitMatchCondition<T> = {
    emitMatch(condition: ICallback<any>): IOrderedSetup<T>;
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
export type IOrdered<T> = IObserver<T> & IOrderedObservable & IOrderedObservablePipe<T>;
export type IOrderedSubscriptionLike = (ISubscriptionLike & IOrder);
export type IOrderedSubscribe<T> = {
    subscribe(listener: IListener<T>, errorHandler?: IErrorCallback): IOrderedSubscriptionLike;
};

export type IPipePayload = { isBreakChain: boolean, isNeedUnsubscribe: boolean, isAvailable: boolean, payload: any };
export type IChainCallback = () => void;
export type IPipeCase<T> = {
    case(condition: ICallback<any>): IPipeCase<T> & ISubscribe<T>;
};
export type ICombinedSubscriber<T> = IListener<T> | ISetObservableValue;
export type ISubscribeGroup<T> =
    ICombinedSubscriber<T> |
    ICombinedSubscriber<T>[];

export type IAddFilter<T> = {
    addFilter(): IFilterSetup<T>;
}
export type IFilterSetup<T> = IFilter<T> & IFilterSwitch<T>;
export type IFilter<T> = {
    filter(condition: ICallback<any>): IFilterSetup<T>;
};
export type IFilterSwitch<T> = {
    switch(): FilterSwitchCase<T>;
};
export type IFilterCase<T> = {
    case(condition: ICallback<any>): IFilterCase<T>;
};
export type IFilterPayload = { isBreakChain: boolean, isAvailable: boolean, payload: any };
export type IFilterResponse = {
    isOK: boolean;
    payload: any;
};
