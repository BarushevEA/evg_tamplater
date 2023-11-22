import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../../libs/elements/types";

export class Menu_item implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    text: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root
            .dataCatch$<Menu_item>()
            .subscribe(data => {
                this.text = data.text;

                this.root.detectChanges();
            });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
