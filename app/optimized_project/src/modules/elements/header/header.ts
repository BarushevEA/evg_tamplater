import {NextMain$} from "../../services/headerService";

import {OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Header implements OnInit {
    readonly root;
    text = "SERG header start after:";
    name = this.text;
    buttonName = "NEXT MAIN";
    isRed = true;
    btnRed = "red_css";
    btnBlue = "blue_css";

    constructor(root: RootBehavior) {
        this.root = root;
    }

    nextMain(evt: MouseEvent): void {
        evt.stopPropagation();
        evt.preventDefault();

        const elements = this.root.getElementsBoundToMethod(this.nextMain);
        for (const element of elements) {
            element.classList.toggle(this.btnBlue);
            element.classList.toggle(this.btnRed);
        }

        this.isRed = !this.isRed;

        NextMain$.next(true);
        this.root.detectChanges();
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
