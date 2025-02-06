import {IChannel, OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";

// Component tag example: <app-main></app-main>
export class Main implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    customElementChannel: IChannel;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.customElementChannel.sendMessage("Hello from main");
    }

    onDestroy(): void {
    }

    clickMain(): void {
        this.customElementChannel.sendMessage("main");
    }

    clickFooter(): void {
        this.customElementChannel.sendMessage("footer");
    }

    clickHeader(): void {
        this.customElementChannel.sendMessage("header");
    }
}