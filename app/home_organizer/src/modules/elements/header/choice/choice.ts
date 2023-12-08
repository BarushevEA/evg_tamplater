import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {E_CHOICE, E_MENU_ACTION, E_MENU_OWNER} from "../../../env/menuEnv/enums";
import {closeMenu, IsMenuShowing, openMenu} from "../../../env/menuEnv/utils";
import {APP_LOCALE, location$} from "../../../../../../../libs/elements/AppLocalization/LocationManager";
import {menuChoiceLocale} from "../../../env/menuEnv/variables";
import {ILocalizedText} from "../../../../../../../libs/elements/AppLocalization/types";
import {menuService$} from "../../../services/observables";
import {MenuEvent} from "../../../env/menuEnv/types";

export class Choice implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    taskName: string;
    currentLocalizedText: ILocalizedText;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.currentLocalizedText = menuChoiceLocale[E_CHOICE.TASKS];
        this.taskName = APP_LOCALE.getLocalizedTextByLocation(this.currentLocalizedText);
    }

    onCreate(): void {
        this.root.collect(
            this.locationChange(),
            this.taskChange()
        );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    onClick(): void {
        if (IsMenuShowing()) {
            closeMenu();
            return;
        }

        openMenu(E_MENU_OWNER.CHOICE);
    }

    private taskChange() {
        return menuService$
            .pipe()
            .emitByPositive((event: MenuEvent) => {
                return (event.owner === E_MENU_OWNER.CHOICE) && (event.menuAction === E_MENU_ACTION.ITEM_CLICK);
            })
            .subscribe(event => {
                this.currentLocalizedText = menuChoiceLocale[event.item];
                this.taskName = APP_LOCALE.getLocalizedTextByLocation(this.currentLocalizedText);
                this.root.detectChanges();
            });
    }

    private locationChange() {
        return location$.subscribe(locale => {
            this.taskName = APP_LOCALE.getLocalizedText(this.currentLocalizedText, locale);
            this.root.detectChanges();
        });
    }
}
