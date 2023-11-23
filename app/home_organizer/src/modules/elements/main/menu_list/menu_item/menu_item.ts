import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../../libs/elements/types";
import {location$} from "../../../../../../../../libs/elements/AppLocalization/LocationManager";
import {E_MENU_OWNER, E_SETTINGS} from "../../../../env/enums";
import {MenuItem} from "../../../../env/types";

export class Menu_item implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    text: string;
    currentLang: string;
    owner: E_MENU_OWNER;
    setting: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.currentLang = location$.getValue();
        this.owner = E_MENU_OWNER.NULL;
        this.setting = "";
    }

    onCreate(): void {
        this.root
            .dataCatch$<MenuItem>()
            .subscribe(data => {
                this.text = data.text;
                this.owner = data.owner;
                this.setting = data.type;

                this.root.detectChanges();
            });
        this.root
            .collect(
                this.handleLocationChange()
            );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    isSettingLang(): boolean {
        return (this.owner === E_MENU_OWNER.SETTINGS) && (this.setting === E_SETTINGS.LANGUAGE);
    }

    private handleLocationChange() {
        return location$
            .subscribe(location => {
                this.currentLang = location;

                this.root.detectChanges();
            });
    }
}
