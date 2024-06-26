import {NextMain$} from "../services/headerService";

import {OnCreate, OnInit, RootBehavior} from "../../../../../libs/env/types";

export class AppRoot implements OnInit, OnCreate {
    readonly root: RootBehavior;
    name: string;
    isShowMain = true;
    main: HTMLElement;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root.collect(
            this.root.onMessage$<string>().subscribe(data => {
                console.log("AppRoot dataCatch$:", data);
            }),
        );
    }

    onInit(): void {
        this.root.collect(
            NextMain$.subscribe(() => {
                this.isShowMain = !this.isShowMain;
                this.root.detectChanges();
            }),
        );

        const chanel = this.root.getChannel(this.main);
        if (chanel) {
            chanel.sendMessage<string>("Message by AppRoot");
        }
    }

    isShowFooter(): boolean {
        return this.isShowMain;
    }
}
