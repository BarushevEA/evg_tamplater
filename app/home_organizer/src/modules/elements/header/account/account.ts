import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {openMenu} from "../../../env/utils";
import {E_MENU_OWNER} from "../../../env/enums";

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
