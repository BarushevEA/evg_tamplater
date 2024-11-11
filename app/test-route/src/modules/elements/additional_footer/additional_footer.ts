import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {SUB_ROUTE} from "../../../../../../libs/elements/rootElements/appSubRout";
import {E_SUB_ROUTE, SUB_FOOTER} from "../../../settings/subRoutesEnums";

export class Additional_footer implements OnInit, OnCreate, OnDestroy, OnMessage {
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

    setMain() {
        SUB_ROUTE(E_SUB_ROUTE.FOOTER).SHOW_PAGE(SUB_FOOTER.MainFooter);
    }
}
