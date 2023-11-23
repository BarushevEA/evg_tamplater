import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../../../libs/elements/types";
import {LOCATION} from "../../../../../../../../../libs/elements/AppLocalization/location";
import {location$} from "../../../../../../../../../libs/elements/AppLocalization/LocationManager";

export class Settings_lang implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    localeTxt: LOCATION;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root
            .dataCatch$<LOCATION>()
            .subscribe(locale => {
                this.localeTxt = locale;
                this.root.detectChanges();
            });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    onClick(event:MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        location$.next(this.localeTxt);
    }
}
