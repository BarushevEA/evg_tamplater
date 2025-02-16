
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";

// Component tag example: <app-view_button></app-view_button>
export class View_button implements OnInit, OnCreate, OnDestroy, OnMessage {
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