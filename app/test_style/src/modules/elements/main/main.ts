import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";

export class Main implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    div: HTMLDivElement;
    image: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.div.style.backgroundColor = "red";
        this.div.style.color = "white";
        this.div.style.width = "100px";
        this.div.style.height = "100px";
        this.div.style.position = "absolute";

        this.image = "assets/car-min.png";
    }

    onDestroy(): void {
    }
}
