
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";

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
        this.root.collect(
            buttonService$.subscribe(buttonOption => {
                console.log(this.root.tagName, "buttonOption:", buttonOption);
            })
        );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}