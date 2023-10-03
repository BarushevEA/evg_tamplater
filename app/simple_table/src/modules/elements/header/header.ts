import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {ROW} from "../../env/types";

export class Header implements OnCreate, OnInit, OnDestroy {
    readonly root;
    name: string;
    rows: ROW[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.rows = [
            {
                id: 0,
                arr: ["one", "two", "three", "four", "five"]
            }];
    }

    onCreate(): void {

    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
