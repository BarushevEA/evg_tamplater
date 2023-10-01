import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Row implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    cells: string[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.cells = [];
    }

    onCreate(): void {
        this.root.dataCatch$<string[]>()
            .subscribe(data => {
                this.cells = data;
                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
