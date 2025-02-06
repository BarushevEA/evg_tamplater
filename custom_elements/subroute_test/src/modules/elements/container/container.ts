import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {SUB_ROUTE} from "../../../../../../libs/elements/rootElements/appSubRout";
import {E_SUB_ROUTE, E_SUB_ROUTE_PAGE} from "../../../settings/subRoutesEnums";

// Component tag example: <app-container></app-container>
export class Container implements OnInit, OnCreate, OnDestroy, OnMessage {
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

    clickMain(): void {
        SUB_ROUTE(E_SUB_ROUTE.TEST).SHOW_PAGE(E_SUB_ROUTE_PAGE.MAIN);
    }

    clickFooter(): void {
        SUB_ROUTE(E_SUB_ROUTE.TEST).SHOW_PAGE(E_SUB_ROUTE_PAGE.FOOTER);
    }

    clickHeader(): void {
        SUB_ROUTE(E_SUB_ROUTE.TEST).SHOW_PAGE(E_SUB_ROUTE_PAGE.HEADER);
    }
}