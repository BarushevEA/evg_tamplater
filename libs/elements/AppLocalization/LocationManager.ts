import {ILocalizedText} from "./types";
import {Collector} from "evg_observable/src/outLib/Collector";
import {ICallback} from "evg_observable/src/outLib/Types";
import {Observable} from "evg_observable/src/outLib/Observable";
import {LOCATION} from "./location";

export const location$: Observable<LOCATION>=new Observable<LOCATION>(LOCATION.EN);

class AppLocale extends Collector {
    constructor() {
        super();
    }

    get current(): LOCATION {
        return location$.getValue();
    }

    getText(textBlock: ILocalizedText, location: LOCATION): string {
        return textBlock[location];
    }

    getCurrentText(textBlock: ILocalizedText): string{
        return textBlock[location$.getValue()];
    }

    onChange(callback: ICallback<LOCATION>) {
        return location$.subscribe(callback);
    }

    set(locale: LOCATION) {
        location$.next(locale);
    }

    destroy() {
        super.destroy();
        location$.destroy();
    }
}

export const APP_LOCALE = new AppLocale();
