
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Main implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    header: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;

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
