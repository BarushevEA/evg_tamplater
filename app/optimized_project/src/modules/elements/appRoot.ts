import {NextMain$} from "../services/headerService";
import {OnInit, RootBehavior} from "../../../../../libs/env/types";

export class AppRoot implements OnInit {
    readonly root;
    name: string;
    isShowMain = true;
    isShowMain1 = false;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.root.collect(
            NextMain$.subscribe(() => {
                this.isShowMain = !this.isShowMain;
                this.isShowMain1 = !this.isShowMain1;
                this.root.detectChanges();
            })
        );
    }
}
