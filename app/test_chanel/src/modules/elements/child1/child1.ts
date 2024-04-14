import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";

export class Child1 implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    message: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
        this.message = this.name;
        let counter = 0;
        setInterval(() => {
            this.root.sendMessageToParent<string>(`from Child1 message #${counter}`);
            counter++;
        }, 1000);
    }

    onDestroy(): void {
    }

    onMessage(msg: string): void {
        console.log(msg);
        this.message = msg;
        this.root.detectChanges();
    }
}
