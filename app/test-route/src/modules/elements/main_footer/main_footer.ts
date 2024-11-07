import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {subRoute} from "../../../../../../libs/elements/rootElements/appSubRout";
import {SUB_ROUTE, SUB_ROUTE_PAGE} from "../../../settings/subRoutesEnums";

export class Main_footer implements OnInit, OnCreate, OnDestroy, OnMessage {
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

    setAdditional() {
        subRoute(SUB_ROUTE.FOOTER).showPage(SUB_ROUTE_PAGE.AdditionalFooter);
    }
}
