import {NextMain$} from "../services/headerService";
import {OnInit, RootBehavior} from "../../../../../libs/env/types";

export class Header implements OnInit {
    text = "SERG header start after:";
    name = this.text;
    buttonName = "NEXT MAIN";
    counter1 = 0;
    root

    constructor(root: RootBehavior) {
        this.root = root;
    }

    clickHeader(evt: MouseEvent): void {
        this.counter1++;
        console.log("clickHeader(evt: MouseEvent): void " + this.counter1);
        evt.stopPropagation();
        evt.preventDefault();
    }

    nextMain(evt: MouseEvent): void {
        evt.stopPropagation();
        evt.preventDefault();

        NextMain$.next(true);
    }

    onInit(): void {
        let counter = 0;

        const timer = setInterval(() => {
            this.name = this.text + " " + counter + " ";
            this.root.detectChanges();
            counter++;
            if (counter > 5) {
                clearInterval(timer);
            }
        }, 1000);
    }
}