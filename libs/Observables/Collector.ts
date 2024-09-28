import {ICollector, ISubscriptionLike} from "./Types";
import {quickDeleteFromArray} from "./FunctionLibs";

export class Collector implements ICollector {
    protected arr: ISubscriptionLike[] = [];
    private killed = false;

    collect(...subscriptionLikeList: ISubscriptionLike[]): void {
        if (!this.killed) this.arr.push(...subscriptionLikeList);
    }

    unsubscribe(subscriptionLike: ISubscriptionLike | undefined): void {
        if (this.killed) return;
        subscriptionLike?.unsubscribe();
        quickDeleteFromArray(this.arr, subscriptionLike);
    }

    unsubscribeAll(): void | null {
        if (this.killed) return;
        while (this.arr.length > 0) this.unsubscribe(this.arr.pop());
    }

    size(): number {
        if (this.killed) return 0;
        return this.arr.length;
    }

    destroy(): void {
        this.unsubscribeAll();
        this.arr.length = 0;
        this.arr = <any>0;
        this.killed = true;
    }

    get isDestroyed(): boolean {
        return this.killed;
    }
}
