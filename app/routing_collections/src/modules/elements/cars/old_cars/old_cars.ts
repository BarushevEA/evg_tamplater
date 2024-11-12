import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";

export class Old_cars implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
