
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {ROUTE_COMMAND$} from "../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../settings/routeEnum";

export class Header implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    title: string = "The Grill House";

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        if (window.innerWidth < 1201){
            this.title = "TGH";
            this.root.detectChanges();
        }
    }

    onDestroy(): void {
    }

    goMainPage(): void {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN);
    }
}