import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {ROUTE} from "../../../../../../../libs/elements/rootElements/appRoute";

export class Button implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    constructor(readonly root: RootBehavior) {

    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
        this.name = message;
        this.root.detectChanges();
    }

    onCreate(): void {
        // log(this.root.tagName, "created");
    }

    onInit(): void {
        // log(this.root.tagName, "initialized");
    }

    onDestroy(): void {
        // log(this.root.tagName, "destroyed");
    }

    onClick(): void {
        ROUTE().SHOW_PAGE(this.name);
    }
}
