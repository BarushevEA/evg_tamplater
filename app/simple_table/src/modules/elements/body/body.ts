import {ROW} from "../../env/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Body implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    rows: ROW[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.rows = [];
    }

    onCreate(): void {
        this.root.onMessage$<ROW[]>()
            .subscribe(rows => {
                this.rows.length = 0;
                this.rows.push(...rows);
                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
