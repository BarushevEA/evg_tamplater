import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {ROUTE} from "../../../../../../../libs/elements/rootElements/appRoute";
import {POPULAR_CARS_ROUTES} from "../../../../settings/routesEnums";

export class Popular_cars implements OnInit, OnCreate, OnDestroy, OnMessage {
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

    listRoute(): void {
        ROUTE().SHOW_PAGE(POPULAR_CARS_ROUTES.POPULAR_CARS_LIST);
    }

    detailsRoute(): void {
        ROUTE().SHOW_PAGE(POPULAR_CARS_ROUTES.POPULAR_CARS_DETAILS);
    }
}
