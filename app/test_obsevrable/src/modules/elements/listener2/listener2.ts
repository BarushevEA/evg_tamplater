import {MainEvents$} from "../../services/service";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Listener2 implements OnInit, OnCreate, OnDestroy {
    name: string;
    message: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
        this.message = "";
    }

    onCreate(): void {
        MainEvents$.subscribe(msg => {
            if (!msg) return;
            this.message = "Listener2 catch: " + msg.text + msg.number;
            this.root.detectChanges();
        });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
