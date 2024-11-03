import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {ILink} from "../../../env/types";
import {ROUTE_COMMAND} from "../../../../settings/routes";

export class Nav implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    pages: ILink[] = [
        {name: "Mushrooms", route: ROUTE_COMMAND.MUSHROOM},
        {name: "Vegetables", route: ROUTE_COMMAND.VEGETABLE},
        {name: "Meat", route: ROUTE_COMMAND.MEAT},
        {name: "Fish", route: ROUTE_COMMAND.FISH},
    ];

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
}