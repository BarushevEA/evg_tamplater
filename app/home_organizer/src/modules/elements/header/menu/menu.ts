import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {menuService$} from "../../../services/service";
import {MenuEvent} from "../../../env/types";
import {closeMenu, openMenu} from "../../../env/utils";
import {E_MENU_OWNER} from "../../../env/enums";

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
                menuService$
                    .pipe()
                    .emitByPositive(
                        (event: MenuEvent) => this.isArrowBackShow !== event.isShow
                    )
                    .subscribe(
                        event => {
                            this.isArrowBackShow = event.isShow;
                            this.root.detectChanges();
                        }
                    )
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
}
