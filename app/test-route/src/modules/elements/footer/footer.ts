import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";

export class Footer implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    footerMsg: string = "This is footer";

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.footerMsg = "HELLO SERHII !!!";
    }

    onDestroy(): void {
    }
}
