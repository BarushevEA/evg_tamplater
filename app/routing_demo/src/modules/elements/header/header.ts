import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {ROUTE_COMMAND$} from "../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../settings/routes";
import {CURRENT_COLOR$} from "../../services/service";
import {COLOR} from "../../env/enums";

export class Header implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    isBack: boolean = true;

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
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN_1);
        CURRENT_COLOR$.next(COLOR.BLUE);
        this.isBack = true;
        this.root.detectChanges();
    }

    click2(): void {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN_2);
        CURRENT_COLOR$.next(COLOR.GREEN);
        this.isBack = false;
        this.root.detectChanges();
    }

    click3(): void {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN_3);
        CURRENT_COLOR$.next(COLOR.RED);
        this.isBack = false;
        this.root.detectChanges();
    }
}
