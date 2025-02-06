import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {SUB_ROUTE} from "../../../../../libs/elements/rootElements/appSubRout";
import {E_SUB_ROUTE, E_SUB_ROUTE_PAGE} from "../../settings/subRoutesEnums";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        console.log(this.root.tagName, "message:", message);
        switch (message) {
            case "footer":
                SUB_ROUTE(E_SUB_ROUTE.TEST).SHOW_PAGE(E_SUB_ROUTE_PAGE.FOOTER);
                break;
            case "header":
                SUB_ROUTE(E_SUB_ROUTE.TEST).SHOW_PAGE(E_SUB_ROUTE_PAGE.HEADER);
                break;
            case "main":
                SUB_ROUTE(E_SUB_ROUTE.TEST).SHOW_PAGE(E_SUB_ROUTE_PAGE.MAIN);
                break;
        }
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
