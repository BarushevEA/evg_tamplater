import {PipeSwitchCase} from "./Pipe";
import {FilterSwitchCase} from "./FilterCollection";

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
    switch(): PipeSwitchCase<T>;
};
export type IOrderedSwitch<T> = {
    switch(): PipeSwitchCase<T>;
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
    IUnsubscribeByPositive<T> &
    IEmitByPositive<T> &
    IOnce<T> &
    ISwitch<T> &
    ITransform<T> &
    ISerialisation &
    ISubscribe<T>;
export type IOrderedSetup<T> =
    IOrderedUnsubscribeByPositive<T> &
    IOrderedEmitByPositive<T> &
    IOrderedOnce<T> &
    IOrderedSwitch<T> &
    IOrderedTransform<T> &
    IOrderedSerialisation &
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
    unsubscribeByNegative(condition: ICallback<T>): ISetup<T>;
};
export type IOrderedUnsubscribeByNegative<T> = {
    unsubscribeByNegative(condition: ICallback<T>): IOrderedSetup<T>;
};
export type IUnsubscribeByPositive<T> = {
    unsubscribeBy(condition: ICallback<T>): ISetup<T>;
};
export type IOrderedUnsubscribeByPositive<T> = {
    unsubscribeBy(condition: ICallback<T>): ISetup<T>;
};
export type IEmitByNegative<T> = {
    emitByNegative(condition: ICallback<T>): ISetup<T>;
};
export type IOrderedEmitByNegative<T> = {
    emitByNegative(condition: ICallback<T>): IOrderedSetup<T>;
};
export type IEmitByPositive<T> = {
    refine(condition: ICallback<T>): ISetup<T>;
    pushRefiners(conditions: ICallback<T>[]): ISetup<T>;
};
export type ITransform<T> = {
    then<K>(condition: ICallback<T>): ISetup<K>;
};
export type ISerialisation = {
    serialize(): ISetup<string>;
    deserialize<K>(): ISetup<K>;
};
export type IOrderedEmitByPositive<T> = {
    refine(condition: ICallback<any>): ISetup<T>;
    pushRefiners(conditions: ICallback<any>[]): ISetup<T>;
};
export type IOrderedTransform<T> = {
    then<K>(condition: ICallback<T>): ISetup<K>;
};
export type IOrderedSerialisation = {
    serialize(): ISetup<string>;
    deserialize<K>(): ISetup<K>;
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

export type IChainContainer = {
    chain: any[];
}

export type IPipePayload = { isBreak: boolean, isUnsubscribe: boolean, isAvailable: boolean, payload: any };
export type IChainCallback = (data: IPipePayload) => void;
export type IPipeCase<T> = ISubscribe<T> & {
    case(condition: ICallback<any>): IPipeCase<T> & ISubscribe<T>;
    pushCases(conditions: ICallback<any>[]): IPipeCase<T> & ISubscribe<T>;
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
    pushFilters(conditions: ICallback<any>[]): IFilterSetup<T>;
};
export type IFilterSwitch<T> = {
    switch(): FilterSwitchCase<T>;
};
export type IFilterCase<T> = {
    case(condition: ICallback<any>): IFilterCase<T>;
    pushCases(conditions: ICallback<any>[]): IFilterCase<T>;
};
export type IFilterPayload = { isBreak: boolean, isAvailable: boolean, payload: any };
export type IFilterChainCallback = (data: IFilterPayload) => void;
export type IFilterResponse = {
    isOK: boolean;
    payload: any;
};
