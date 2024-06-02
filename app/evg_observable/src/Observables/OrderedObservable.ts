import {Observable} from "./Observable";
import {
    IErrorCallback,
    IListener,
    IMarkedForUnsubscribe,
    IOrdered,
    IOrderedSetup,
    IOrderedSubscriptionLike,
    ISetObservableValue,
    ISubscriptionLike
} from "./Types";
import {deleteFromArray, sortAscending, sortDescending} from "./FunctionLibs";
import {OrderedSubscribeObject} from "./OrderedSubscribeObject";

export class OrderedObservable<T>
    extends Observable<T> implements IOrdered<T> {
    private sortDirection = sortAscending;

    public setAscendingSort(): boolean {
        this.sortDirection = sortAscending;
        return this.sortByOrder();
    }

    public setDescendingSort(): boolean {
        this.sortDirection = sortDescending;
        return this.sortByOrder();
    }

    sortByOrder(): boolean {
        if (this._isDestroyed) return false;
        this.listeners.sort(this.sortDirection);
        return true;
    }

    subscribe(listener: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): IOrderedSubscriptionLike | undefined {
        if (!this.isSubsValid(listener)) return undefined;
        const subscribeObject = new OrderedSubscribeObject(this, false);
        this.addObserver(<any>subscribeObject, listener, errorHandler);
        return subscribeObject;
    }

    pipe(): IOrderedSetup<T> | undefined {
        if (this._isDestroyed) return undefined;
        const subscribeObject = new OrderedSubscribeObject(this, true);
        this.listeners.push(<any>subscribeObject);
        return subscribeObject;
    }

    public unSubscribe(listener: ISubscriptionLike): void {
        if (this._isDestroyed) return;
        if (this.isNextProcess && listener) {
            const marker: IMarkedForUnsubscribe = <any>listener;
            !marker.isMarkedForUnsubscribe && this.listenersForUnsubscribe.push(listener);
            marker.isMarkedForUnsubscribe = true;
            return;
        }
        this.listeners && !deleteFromArray(this.listeners, listener);
    }
}
