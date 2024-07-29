import {menuService$} from "../../../services/observables";
import {E_MENU_ACTION, E_MENU_OWNER} from "../../../env/menuEnv/enums";
import {closeMenu, openMenu} from "../../../env/menuEnv/utils";
import {MenuEvent} from "../../../env/menuEnv/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/env/types";

export class Menu implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    isArrowBackShow: boolean;
    isMenuOpened: boolean;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.isArrowBackShow = false;
        this.isMenuOpened = false;
    }

    onCreate(): void {
        this.root
            .collect(
                this.menuEventsHandle()
            );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    onClick(): void {
        if (!this.isMenuOpened) {
            if (openMenu(E_MENU_OWNER.SETTINGS)) {
                this.isMenuOpened = true;
                return;
            }
        }

        this.isMenuOpened = false;
        closeMenu();
    }

    private menuEventsHandle() {
        return menuService$
            .pipe()
            .refine(
                (event: MenuEvent) => {
                    if (event.menuAction !== E_MENU_ACTION.SHOW) {
                        this.isMenuOpened = false;
                        return false;
                    }
                    return this.isArrowBackShow !== event.isShow
                })
            .subscribe(
                event => {
                    this.isArrowBackShow = event.isShow;

                    if (!event.isShow) this.isMenuOpened = false;

                    this.root.detectChanges();
                }
            );
    }
}
