import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Footer implements OnCreate, OnInit, OnDestroy {
    readonly root;
    name: string;
    text: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.text = "";
    }

    onCreate(): void {
        this.root.onMessage$<string>()
            .subscribe(text => {
                this.text = text;
                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
