import {AppWindow} from "../../env/browserVariables";
import {ICallback, IDestroy, IObserver, ISubscriptionLike} from "../../Observables/Types";
import {Observable} from "../../Observables";

export type IBrowserPath = {
    setWithoutHistory(url: string): void;
    set(url: string): void;
    subscribe(listener: ICallback<string>): ISubscriptionLike;
};

class BrowserPath implements IBrowserPath, IDestroy {
    isDestroyed: boolean;
    private readonly popstate: any;
    private state$: IObserver<string>;

    constructor() {
        this.isDestroyed = false;
        this.popstate = this.popState.bind(this);
        this.state$ = new Observable("");
        AppWindow.addEventListener("popstate", this.popstate);

        this.popState();
    }

    set(url: string) {
        if (this.isDestroyed) return;

        AppWindow.history.pushState({}, "", url);
        this.popState();
    }

    setWithoutHistory(url: string) {
        if (this.isDestroyed) return;

        AppWindow.history.replaceState({}, "", url);
        this.popState();
    }

    subscribe(listener: ICallback<string>): ISubscriptionLike {
        if (this.isDestroyed) return undefined;
        return this.state$.subscribe(listener);
    }

    destroy(): void {
        AppWindow.removeEventListener("popstate", this.popstate);
        this.state$.destroy();
        this.isDestroyed = true;
    }

    private popState() {
        const path = AppWindow.location.pathname;
        this.state$.next(path);
    }
}

export const BROWSER_PATH = new BrowserPath();
