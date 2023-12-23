import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";

export class Task_controls implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
