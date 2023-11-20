import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {menuService$} from "../../../services/service";
import {MenuEvent} from "../../../env/types";

export class Menu implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    isArrowBackShow: boolean;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.isArrowBackShow = false;
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
        const event = menuService$.getValue();
        event.isShow = !event.isShow;
        menuService$.next(event);
    }
}
