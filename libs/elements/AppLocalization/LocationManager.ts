import {ILocalizedText} from "./types";
import {Collector} from "evg_observable/src/outLib/Collector";
import {ICallback} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {LOCATION} from "./location";

let location$: Observable<LOCATION>;

class AppLocale extends Collector {
    constructor(locale: LOCATION) {
        super();
        location$ = new Observable<LOCATION>(locale)
    }

    get current(): LOCATION {
        return location$.getValue();
    }

    getText(textBlock: ILocalizedText, location: LOCATION): string {
        return textBlock[location];
    }

    onChange(callback: ICallback<LOCATION>) {
        this.collect(location$.subscribe(callback));
    }

    set(locale: LOCATION) {
        location$.next(locale);
    }

    destroy() {
        super.destroy();
        location$.destroy();
    }
}

export const APP_LOCALE = new AppLocale(LOCATION.EN);
