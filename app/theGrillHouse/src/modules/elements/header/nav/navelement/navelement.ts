
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../../libs/env/types";
import {log} from "../../../../../../../../libs/utils/utils";
import {ILink} from "../../../../env/types";
import {ROUTE_COMMAND$} from "../../../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../../../settings/routeEnum";

export class Navelement implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    route: ROUTE_COMMAND;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
        this.root.collect(
            this.root.onMessage$<ILink>()
                .pipe()
                .refine(msg => !!msg)
                .subscribe(msg => {
                    this.setProperties(msg);
                })
        )
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