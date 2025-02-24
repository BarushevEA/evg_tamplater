import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {getDiv} from "../../../../../libs/elements/rootElements/rootUtils";

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
        const div = getDiv();

        while (this.root.firstChild) {
            div.appendChild(this.root.firstChild);
        }

        this.root.append(div);
    }

    onDestroy(): void {
    }
}
