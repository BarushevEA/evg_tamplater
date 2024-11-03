import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {ROUTE_COMMAND$} from "../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../settings/routes";

export class Header implements OnInit, OnCreate, OnDestroy, OnMessage {
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

    click1(): void {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN_1)
    }

    click2(): void {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN_2)
    }

    click3(): void {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN_3)
    }
}
