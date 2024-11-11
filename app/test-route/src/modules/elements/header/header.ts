import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {ROUTE} from "../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../settings/routes";
import {E_SUB_ROUTE, SUB_HEADER} from "../../../settings/subRoutesEnums";
import {SUB_ROUTE} from "../../../../../../libs/elements/rootElements/appSubRout";

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

    clickMain() {
        ROUTE().SHOW_PAGE(ROUTE_COMMAND.MAIN);
    }

    clickPage1() {
        ROUTE().SHOW_PAGE(ROUTE_COMMAND.PAGE1);
    }

    clickPage2() {
        ROUTE().SHOW_PAGE(ROUTE_COMMAND.PAGE2);
    }

    clickPage3() {
        ROUTE().SHOW_PAGE(ROUTE_COMMAND.PAGE3);
    }

    clickPage4() {
        SUB_ROUTE(E_SUB_ROUTE.HEADER).SHOW_PAGE(SUB_HEADER.AdditionalHeader);
    }
}
