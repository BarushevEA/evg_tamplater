import {NextMain$} from "../services/headerService";
import {OnInit, RootBehavior} from "../../../../../libs/env/types";

export class AppRoot implements OnInit {
    readonly root;
    name: string;
    isShowMain = true;
    main: HTMLElement;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.root.collect(
            NextMain$.subscribe(() => {
                this.isShowMain = !this.isShowMain;
                this.root.detectChanges();
            })
        );

        const chanel = this.root.getChanel(this.main);
        if (chanel) {
            chanel.sendData<string>("Message by AppRoot");
        }
    }

    isShowFooter(): boolean {
        return this.isShowMain;
    }
}
