import {menuService$} from "../../../services/observables";
import {E_MENU_ACTION, E_MENU_OWNER} from "../../../env/menuEnv/enums";
import {APP_LOCALE} from "../../../../../../../libs/elements/AppLocalization/LocationManager";
import {AppTxt} from "../../../env/types";
import {LOCATION} from "../../../../../../../libs/elements/AppLocalization/location";
import {closeMenu} from "../../../env/menuEnv/utils";
import {MenuEvent, MenuItem} from "../../../env/menuEnv/types";
import {menuAccountLocale, menuChoiceLocale, menuSettingsLocale, menuTitleLocale} from "../../../env/menuEnv/variables";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/env/types";

export class Menu_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    owner: E_MENU_OWNER;
    ownerName: string;
    items: MenuItem[];
    showTimer: any;

    isMenuShow: boolean = false;
    isDisplayNone: boolean = true;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.showTimer = 0;
        this.items = [];
        this.owner = E_MENU_OWNER.NULL;
        this.ownerName = E_MENU_OWNER.NULL;
    }

    onCreate(): void {
        this.showHandler();
        this.changeLanguage();
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    btnClick(): void {
        closeMenu();
    }

    private showHandler() {
        this.root.collect(
            menuService$
                .pipe()
                .refine((event: MenuEvent) => event.menuAction === E_MENU_ACTION.SHOW)
                .subscribe(menu => {
                    this.initOwnerData(menu);
                    this.initItems();
                    this.handleAnimation();

                    this.root.detectChanges();
                }),
        );
    }

    private initOwnerData(menu: MenuEvent) {
        this.owner = menu.owner;
        if (this.owner !== E_MENU_OWNER.NULL) {
            this.ownerName = APP_LOCALE.getLocalizedTextByLocation(menuTitleLocale[this.owner]);
        }
        this.isMenuShow = menu.isShow;
    }

    private handleAnimation() {
        clearTimeout(this.showTimer);

        if (this.isMenuShow) {
            this.isDisplayNone = false;
        } else {
            this.showTimer = setTimeout(() => {
                this.isDisplayNone = true;
                this.root.detectChanges();
            }, 1000);
        }
    }

    private changeLanguage() {
        this.root.collect(
            APP_LOCALE.onLocationChange((locale) => {
                this.handleTitleLocale(locale);
                this.handleItemsLocale(locale);
                this.root.detectChanges();
            })
        );
    }

    private handleTitleLocale(locale: LOCATION) {
        if (this.owner !== E_MENU_OWNER.NULL) {
            this.ownerName = APP_LOCALE.getLocalizedText(menuTitleLocale[this.owner], locale);
        }
    }

    private initItems() {
        this.items.length = 0;

        switch (this.owner) {
            case E_MENU_OWNER.SETTINGS:
                this.fillItems(menuSettingsLocale);
                break;
            case E_MENU_OWNER.ACCOUNT:
                this.fillItems(menuAccountLocale);
                break;
            case E_MENU_OWNER.CHOICE:
                this.fillItems(menuChoiceLocale);
                break;
        }
    }

    private fillItems(appTxt: AppTxt) {
        for (const key in appTxt) {
            const item: MenuItem = {
                owner: this.owner,
                type: key,
                text: APP_LOCALE.getLocalizedTextByLocation(appTxt[key]),
            };
            this.items.push(item);
        }
    }

    private handleItemsLocale(locale: LOCATION) {
        for (const item of this.items) {
            switch (item.owner) {
                case E_MENU_OWNER.SETTINGS:
                    item.text = APP_LOCALE.getLocalizedText(menuSettingsLocale[item.type], locale);
                    break;
                case E_MENU_OWNER.ACCOUNT:
                    item.text = APP_LOCALE.getLocalizedText(menuAccountLocale[item.type], locale);
                    break;
                case E_MENU_OWNER.CHOICE:
                    item.text = APP_LOCALE.getLocalizedText(menuChoiceLocale[item.type], locale);
                    break;
            }
        }
    }
}
