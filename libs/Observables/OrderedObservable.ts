import {Observable} from "./Observable";
import {
    IErrorCallback,
    IOrdered,
    IOrderedSetup,
    IOrderedSubscriptionLike,
    ISubscribeGroup,
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
        if (this.isKilled) return false;
        this.listeners.sort(this.sortDirection);
        return true;
    }

    subscribe(listener: ISubscribeGroup<T>, errorHandler?: IErrorCallback): IOrderedSubscriptionLike | undefined {
        if (!this.isListener(listener)) return undefined;
        const subscribeObject = new OrderedSubscribeObject(this, false);
        this.addObserver(<any>subscribeObject, listener, errorHandler);
        return subscribeObject;
    }

    pipe(): IOrderedSetup<T> | undefined {
        if (this.isKilled) return undefined;
        const subscribeObject = new OrderedSubscribeObject(this, true);
        this.listeners.push(<any>subscribeObject);
        return subscribeObject;
    }

    public unSubscribe(listener: ISubscriptionLike): void {
        if (this.isKilled) return;
        if (this.isProcess && listener) {
            this.trash.push(listener);
            return;
        }
        this.listeners && !deleteFromArray(this.listeners, listener);
    }
}
