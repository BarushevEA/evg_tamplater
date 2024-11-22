
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../../libs/env/types";
import {ILink} from "../../../../env/types";
import {ROUTE_COMMAND$} from "../../../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../../../settings/routeEnum";

export class Navelement implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    route: ROUTE_COMMAND;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: ILink): void {
        this.setProperties(message)
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    changePage(){
        ROUTE_COMMAND$.next(this.route);
    }

    private setProperties(msg:ILink) {
        this.name = msg.name;
        this.route = msg.route;
        this.root.detectChanges();
    }
}