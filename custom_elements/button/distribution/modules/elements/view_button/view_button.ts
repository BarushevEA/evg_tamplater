import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";

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
        this.root.collect(
            buttonService$.subscribe(buttonOption => {
                log(this.root.tagName, "buttonOption:", buttonOption);
            })
        );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}