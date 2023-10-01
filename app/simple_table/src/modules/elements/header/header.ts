import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Header implements OnCreate, OnInit, OnDestroy {
    readonly root;
    name: string;
    rows: any[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.rows = [["one", "two", "three", "four", "five"]];
    }

    onCreate(): void {

    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
