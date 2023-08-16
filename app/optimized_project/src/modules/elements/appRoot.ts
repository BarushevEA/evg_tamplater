import {NextMain$} from "../services/headerService";
import {OnInit, RootBehavior} from "../../../../../libs/env/types";

export class AppRoot implements OnInit {
    name: string;
    isShow = true;
    mains: string[] = [
        "<app-main></app-main>",
        "<app-main_1></app-main_1>"
    ];
    mainsCounter = 0;
    currentMain = this.mains[this.mainsCounter];
    root;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.root.collect(
            NextMain$.subscribe(() => {
                this.mainsCounter++;
                if (this.mainsCounter >= this.mains.length) {
                    this.mainsCounter = 0;
                }

                this.currentMain = this.mains[this.mainsCounter];
                this.root.detectChanges();
            })
        );
    }
}
