import {ICollector, ISubscriptionLike} from "./Types";
import {quickDeleteFromArray} from "./FunctionLibs";

export class Collector implements ICollector {
    protected list: ISubscriptionLike[] = [];
    private isKilled = false;

    collect(...subscriptionLikeList: ISubscriptionLike[]): void {
        if (!this.isKilled) this.list.push(...subscriptionLikeList);
    }

    unsubscribe(subscriptionLike: ISubscriptionLike | undefined): void {
        if (this.isKilled) return;
        subscriptionLike?.unsubscribe();
        quickDeleteFromArray(this.list, subscriptionLike);
    }

    unsubscribeAll(): void | null {
        if (this.isKilled) return;
        while (this.list.length > 0) this.unsubscribe(this.list.pop());
    }

    size(): number {
        if (this.isKilled) return 0;
        return this.list.length;
    }

    destroy(): void {
        this.unsubscribeAll();
        this.list.length = 0;
        this.list = <any>0;
        this.isKilled = true;
    }

    get isDestroyed(): boolean {
        return this.isKilled;
    }
}
