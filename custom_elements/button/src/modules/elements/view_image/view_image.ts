
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";

// Component tag example: <app-view_image></app-view_image>
export class View_image implements OnInit, OnCreate, OnDestroy, OnMessage {
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