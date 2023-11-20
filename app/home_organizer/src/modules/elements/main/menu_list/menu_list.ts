import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {menuService$} from "../../../services/service";

export class Menu_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    isMenuShow: boolean = false;
    isDisplayNone: boolean = true;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.showHandler();
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
}
