import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Body implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    rows: any[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.rows = [];
        for (let i = 0; i < 10; i++) {
            this.rows.push(["1", "2", "3", "4", "12312341231234123412341234123412341234"]);
        }
    }

    onCreate(): void {

    }

    onInit(): void {
        setTimeout(() => {
            this.rows.push(["test-1", "test-2", "test-3", "test-4", "test-5"]);
            this.root.detectChanges();
        }, 5000);
    }

    onDestroy(): void {
    }
}
