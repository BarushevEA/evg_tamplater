import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../libs/elements/types";

export class AppRoot implements OnInit, OnCreate, OnDestroy {
    name: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
