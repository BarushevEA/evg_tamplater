import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {ROW} from "../../env/types";

export class Header implements OnCreate, OnInit, OnDestroy {
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
