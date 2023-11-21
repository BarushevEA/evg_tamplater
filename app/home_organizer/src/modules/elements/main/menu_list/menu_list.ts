import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {menuService$} from "../../../services/observables";
import {E_MENU_OWNER} from "../../../env/enums";
import {menuTitleLocale} from "../../../env/variables";
import {APP_LOCALE} from "../../../../../../../libs/elements/AppLocalization/LocationManager";

export class Menu_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    owner: E_MENU_OWNER;
    ownerName: string;

    isMenuShow: boolean = false;
    isDisplayNone: boolean = true;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.showHandler();
        this.changeLanguage();
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    private showHandler() {
        let showTimer: any = 0;
        this.root.collect(
            menuService$.subscribe(menu => {
                clearTimeout(showTimer);

                this.owner = menu.owner;
                if (this.owner !== E_MENU_OWNER.NULL) {
                    this.ownerName = APP_LOCALE.getCurrentText(menuTitleLocale[this.owner]);
                }

                this.isMenuShow = menu.isShow;

                if (this.isMenuShow) {
                    this.isDisplayNone = false;
                } else {
                    showTimer = setTimeout(() => {
                        this.isDisplayNone = true;
                        this.root.detectChanges();
                    }, 1000);
                }

                this.root.detectChanges();
            }),
        );
    }

    private changeLanguage() {
        this.root.collect(
            APP_LOCALE.onChange((locale) => {
                if (this.owner !== E_MENU_OWNER.NULL) {
                    this.ownerName = APP_LOCALE.getText(menuTitleLocale[this.owner], locale);
                }

                this.root.detectChanges();
            })
        );
    }
}
