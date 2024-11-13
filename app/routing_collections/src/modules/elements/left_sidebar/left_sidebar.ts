import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {ROUTE_COMMAND$} from "../../../../../../libs/elements/rootElements/appRoute";
import {CARS_ROUTES, MAIN_ROUTES, POPULAR_CARS_ROUTES} from "../../../settings/routesEnums";

export class Left_sidebar implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    pages: string[] = [];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.setButtons(ROUTE_COMMAND$.getValue());

        ROUTE_COMMAND$.subscribe(command => {
            this.setButtons(command);
        })
    }

    onDestroy(): void {
    }

    setButtons(command: string): void {
        switch (command) {
            case MAIN_ROUTES.HOME:
            case MAIN_ROUTES.ABOUT:
            case MAIN_ROUTES.CONTACT:
                this.pages.length = 0;
                this.pages.push(MAIN_ROUTES.HOME);
                this.pages.push(MAIN_ROUTES.ABOUT);
                this.pages.push(MAIN_ROUTES.CONTACT);
                break;
            case CARS_ROUTES.OLD_CARS:
            case CARS_ROUTES.NEW_CARS:
                this.pages.length = 0;
                this.pages.push(CARS_ROUTES.POPULAR_CARS);
                this.pages.push(CARS_ROUTES.NEW_CARS);
                this.pages.push(CARS_ROUTES.OLD_CARS);
                break;
            case CARS_ROUTES.POPULAR_CARS:
                this.pages.length = 0;
                this.pages.push(CARS_ROUTES.POPULAR_CARS);
                this.pages.push(POPULAR_CARS_ROUTES.POPULAR_CARS_LIST);
                this.pages.push(POPULAR_CARS_ROUTES.POPULAR_CARS_DETAILS);
                this.pages.push(CARS_ROUTES.NEW_CARS);
                this.pages.push(CARS_ROUTES.OLD_CARS);
        }
        this.root.detectChanges();
    }
}
