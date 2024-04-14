import {E_MENU_OWNER} from "../../../env/menuEnv/enums";
import {closeMenu, IsMenuShowing, openMenu} from "../../../env/menuEnv/utils";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/env/types";

export class Account implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
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

        openMenu(E_MENU_OWNER.ACCOUNT);
    }
}
