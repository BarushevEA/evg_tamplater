import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {menuService$} from "../../../services/service";

export class Menu implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    isArrowBackShow: boolean;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
        this.isArrowBackShow = true;
    }

    onDestroy(): void {
    }

    onClick(): void {
        const event = menuService$.getValue();
        event.isShow = !event.isShow;

        this.isArrowBackShow = event.isShow;
        this.root.detectChanges();

        menuService$.next(event);
    }
}
