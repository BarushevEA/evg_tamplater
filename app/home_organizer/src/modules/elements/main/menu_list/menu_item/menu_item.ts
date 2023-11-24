import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../../libs/elements/types";
import {location$} from "../../../../../../../../libs/elements/AppLocalization/LocationManager";
import {E_MENU_OWNER, E_SETTINGS} from "../../../../env/enums";
import {MenuItem} from "../../../../env/types";
import {LANG_LIST} from "../../../../env/variables";

export class Menu_item implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    text: string;
    currentLang: string;
    owner: E_MENU_OWNER;
    setting: string;
    langList: string[];
    isShowLangViewBox: boolean;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.currentLang = location$.getValue();
        this.owner = E_MENU_OWNER.NULL;
        this.setting = "";
        this.langList = LANG_LIST;
        this.isShowLangViewBox = false;
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

    onClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        console.log("============> Menu_item click:", this.owner, this.setting);

        switch (this.owner) {
            case E_MENU_OWNER.SETTINGS:
                this.handleSettingsClick();
                break;
            case E_MENU_OWNER.CHOICE:
                break;
            case E_MENU_OWNER.ACCOUNT:
                break;
        }
    }

    isSettingLang(): boolean {
        return (this.owner === E_MENU_OWNER.SETTINGS) && (this.setting === E_SETTINGS.LANGUAGE);
    }

    private handleSettingsClick() {
        switch (this.setting) {
            case E_SETTINGS.LANGUAGE:
                this.settingLangClick();
                break;
            case E_SETTINGS.THEME:
                break;
            case E_SETTINGS.TIME_OPTION:
                break;
        }
    }

    private settingLangClick() {

        this.isShowLangViewBox = !this.isShowLangViewBox;
        this.root.detectChanges();
    }

    private handleLocationChange() {
        return location$
            .subscribe(location => {
                this.isShowLangViewBox = false;
                this.currentLang = location;

                this.root.detectChanges();
            });
    }
}
