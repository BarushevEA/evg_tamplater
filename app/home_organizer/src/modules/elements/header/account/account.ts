import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {E_MENU_OWNER} from "../../../env/enums";
import {openMenu} from "../../../services/menu/utils";

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
        openMenu(E_MENU_OWNER.ACCOUNT);
    }
}
