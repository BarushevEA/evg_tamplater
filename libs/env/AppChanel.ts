import {IAppChanelMap, IChanelListener} from "./types";
import {AppWindow} from "./browserVariables";
import {AppChanelName} from "./env";
import {Observable} from "evg_observable/src/outLib/Observable";

export type ILoadedChanel<T> = {
    chanel: IChanelListener<T>
};

export type IAppChannelListener<T> = {
    chanel$(): IChanelListener<ILoadedChanel<T>>;
}

export type IAppChannelOwner<T> = {
    send(data: T): void;
    addChanel(name: string): void;
}

export type IAppChannel<T> = IAppChannelListener<T> & IAppChannelOwner<T>;

const delay = 17;
let APP_CHANEL_MAP: Observable<IAppChanelMap>;

function initChanelMap() {
    APP_CHANEL_MAP = new Observable<IAppChanelMap>(undefined);

    if (AppWindow[AppChanelName]) {
        APP_CHANEL_MAP.next(AppWindow[AppChanelName]);
    } else {
        const timer = setInterval(() => {
            if (AppWindow[AppChanelName]) {
                APP_CHANEL_MAP.next(AppWindow[AppChanelName]);
                clearInterval(timer);
            }
        }, delay);
    }
}

initChanelMap();

class AppChanel<T> implements IAppChannel<T> {
    private chanelListener$ = new Observable<ILoadedChanel<T>>(undefined);
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    chanel$(): IChanelListener<ILoadedChanel<T>> {
        let chanelMap = APP_CHANEL_MAP.getValue();
        if (chanelMap) {
            this.getLoadedChanel(this.name, chanelMap);
        } else {
            APP_CHANEL_MAP
                .pipe()
                .setOnce()
                .subscribe(chanelMap => {
                    this.getLoadedChanel(this.name, chanelMap);
                });
        }

        return this.chanelListener$;
    }

    private getLoadedChanel(name: string, chanelMap: IAppChanelMap): void {
        if (chanelMap[name]) {
            this.chanelListener$.next({chanel: chanelMap[name]});
            return;
        }

        const timer = setInterval(() => {
            if (chanelMap[name]) {
                this.chanelListener$.next({chanel: chanelMap[name]});
                clearInterval(timer);
            }
        }, delay);
    }

    send(data: T): void {
        const chanelMap = APP_CHANEL_MAP.getValue();
        if (chanelMap) {
            this.sendToChanel(this.name, chanelMap, data);
            return;
        }

        APP_CHANEL_MAP
            .pipe()
            .setOnce()
            .subscribe(chanelMap => {
                this.sendToChanel(this.name, chanelMap, data);
            });
    }

    private sendToChanel(name: string, chanelMap: IAppChanelMap, data: T) {
        if (chanelMap[name]) {
            chanelMap[name].next(data);
            return;
        }

        const timer = setInterval(() => {
            if (chanelMap[name]) {
                chanelMap[name].next(data);
                clearInterval(timer);
            }
        }, delay);
    }

    addChanel(name: string): void {
        AppWindow[AppChanelName] = AppWindow[AppChanelName] ? AppWindow[AppChanelName] : {};
        const chanel = AppWindow[AppChanelName];
        chanel[name] = new Observable<T>(undefined);
    }
}

export function getAppChanelListener<T>(name: string): IAppChannelListener<T> {
    return new AppChanel(name);
}

export function getAppChanelOwner<T>(name: string): IAppChannelOwner<T> {
    return new AppChanel(name);
}
