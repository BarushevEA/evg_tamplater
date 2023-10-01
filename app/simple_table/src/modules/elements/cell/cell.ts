import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Cell implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    data: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.data = "test";
    }

    onCreate(): void {
        this.root.dataCatch$<string>()
            .subscribe(data => {
                this.data = data;
                this.root.title = data;
                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
