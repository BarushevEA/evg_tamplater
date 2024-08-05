import {ILocalizedText} from "./types";
import {LOCATION} from "./location";
import {Observable} from "../../Observables";
import {ICallback} from "../../Observables/Types";

export const location$: Observable<LOCATION> = new Observable<LOCATION>(LOCATION.EN);

class AppLocale {
    get currentLocation(): LOCATION {
        return location$.getValue();
    }

    getLocalizedText(textBlock: ILocalizedText, location: LOCATION): string {
        return textBlock[location];
    }

    getLocalizedTextByLocation(textBlock: ILocalizedText): string {
        return textBlock[this.currentLocation];
    }

    onLocationChange(callback: ICallback<LOCATION>) {
        return location$.subscribe(callback);
    }

    setLocation(locale: LOCATION) {
        location$.next(locale);
    }

    destroy() {
        location$.destroy();
    }
}

export const APP_LOCALE = new AppLocale();
