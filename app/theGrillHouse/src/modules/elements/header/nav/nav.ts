import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {ILink} from "../../../env/types";
import {navButtons} from "../../../env/variables";

export class Nav implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    pages: ILink[] = navButtons;

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
