import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        console.log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
