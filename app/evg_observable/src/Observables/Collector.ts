import {ICollector, ISubscriptionLike} from "./Types";
import {quickDeleteFromArray} from "./FunctionLibs";

export class Collector implements ICollector {
    protected list: ISubscriptionLike[] = [];
    private _isDestroyed = false;

    collect(...subscriptionLikeList: ISubscriptionLike[]): void {
        if (!this._isDestroyed) this.list.push(...subscriptionLikeList);
    }

    unsubscribe(subscriptionLike: ISubscriptionLike | undefined): void {
        if (this._isDestroyed) return;
        subscriptionLike?.unsubscribe();
        quickDeleteFromArray(this.list, subscriptionLike);
    }

    unsubscribeAll(): void | null {
        if (this._isDestroyed) return;
        while (this.list.length > 0) this.unsubscribe(this.list.pop());
    }

    size(): number {
        if (this._isDestroyed) return 0;
        return this.list.length;
    }

    destroy(): void {
        this.unsubscribeAll();
        this.list.length = 0;
        this.list = <any>0;
        this._isDestroyed = true;
    }

    get isDestroyed(): boolean {
        return this._isDestroyed;
    }
}
