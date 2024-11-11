import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {leftSideBar$} from "../../services/service";
import {ROUTE_COMMAND$} from "../../../../../../libs/elements/rootElements/appRoute";

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
        leftSideBar$.pipe()
            .refine(pages => pages && pages.length > 0)
            .subscribe((pages) => {
                this.pages.length = 0;
                this.pages.push(...pages);
                log(this.root.tagName, "pages:", this.pages);
                this.root.detectChanges();
            });
    }

    onInit(): void {
        this.pages.push(...leftSideBar$.getValue());
        this.setButtons();

        log(this.root.tagName, "command:", ROUTE_COMMAND$.getValue());

        ROUTE_COMMAND$.subscribe(() => {
            this.setButtons();
        })
    }

    onDestroy(): void {
    }

    setButtons(): void {
        switch (ROUTE_COMMAND$.getValue()) {
            case "HOME":
            case "ABOUT":
            case "CONTACT":
                this.pages.length = 0;
                this.pages.push("HOME");
                this.pages.push("ABOUT");
                this.pages.push("CONTACT");
                break;
            case "OLD_CARS":
            case "NEW_CARS":
            case "POPULAR_CARS":
                this.pages.length = 0;
                this.pages.push("OLD_CARS");
                this.pages.push("NEW_CARS");
                this.pages.push("POPULAR_CARS");
        }
        this.root.detectChanges();
    }
}
