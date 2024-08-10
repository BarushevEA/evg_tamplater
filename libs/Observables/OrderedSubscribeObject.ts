import {SubscribeObject} from "./SubscribeObject";
import {
    IErrorCallback,
    IListener,
    IObserver,
    IOrdered,
    IOrderedObservable,
    IOrderedSetup,
    IOrderedSubscribe,
    IOrderedSubscriptionLike,
    ISetObservableValue
} from "./Types";
import {OrderedObservable} from "./OrderedObservable";

export class OrderedSubscribeObject<T> extends SubscribeObject<T> implements IOrderedSetup<T> {
    constructor(observable: OrderedObservable<T> | IOrdered<T>, isPipe?: boolean) {
        super(<IObserver<T>>observable, isPipe);
    }

    get order(): number {
        return this._order;
    }

    set order(value: number) {
        if (!this.observer ||
            (this.observer && this.observer.isDestroyed)) {
            this._order = <any>undefined;
            return
        }
        this._order = value;
        (<IOrderedObservable><any>this.observer).sortByOrder();
    }

    subscribe(observer: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): IOrderedSubscriptionLike {
        super.subscribe(observer, errorHandler)
        return this;
    }

    setOnce(): IOrderedSubscribe<T> {
        return <any>super.setOnce();
    }
}
