import {AppWindow} from "../env/browserVariables";
import {ICallback, IDestroy, IObserver, ISubscriptionLike} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";

export type IBrowserPath = {
    setWithoutHistory(url: string): void;
    set(url: string): void;
    subscribe(listener: ICallback<string>): ISubscriptionLike;
};

class BrowserPath implements IBrowserPath, IDestroy {
    isDestroyed: boolean;
    private handleRouteChangeBind: any;
    private routState$: IObserver<string>;

    constructor() {
        this.isDestroyed = false;
        this.handleRouteChangeBind = this.handleRouteChange.bind(this);
        this.routState$ = new Observable("");
        AppWindow.addEventListener("popstate", this.handleRouteChangeBind);

        this.handleRouteChange();
    }

    set(url: string) {
        if (this.isDestroyed) return;

        AppWindow.history.pushState({}, "", url);
        this.handleRouteChange();
    }

    setWithoutHistory(url: string) {
        if (this.isDestroyed) return;

        AppWindow.history.replaceState({}, "", url);
        this.handleRouteChange();
    }

    subscribe(listener: ICallback<string>): ISubscriptionLike {
        if (this.isDestroyed) return undefined;
        return this.routState$.subscribe(listener);
    }

    destroy(): void {
        AppWindow.removeEventListener("popstate", this.handleRouteChangeBind);
        this.routState$.destroy();
        this.isDestroyed = true;
    }

    private handleRouteChange() {
        const path = AppWindow.location.pathname;
        this.routState$.next(path);
    }
}

export const BROWSER_PATH = new BrowserPath();
