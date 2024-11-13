import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IContent} from "../../../env/types";

export class Home implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    content: IContent[] = [
        {
            image: "assets/car-min.png",
            label: "AX-7F8 EXTRA"
        },
        {
            image: "assets/car-min.png",
            label: "AX-7F8 EXTRA"
        },
        {
            image: "assets/car-min.png",
            label: "AX-7F8 EXTRA"
        },
        {
            image: "assets/car-min.png",
            label: "AX-7F8 EXTRA"
        }];

    // content: IContent[] = [];

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
