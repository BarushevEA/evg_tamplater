import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {CURRENT_COLOR$} from "../services/service";
import {COLOR} from "../env/enums";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    isBlue: boolean;
    isGreen: boolean;
    isRed: boolean;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        console.log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.setColor();
        CURRENT_COLOR$.subscribe(() => {
            this.setColor();
            this.root.detectChanges();
        });
    }

    onDestroy(): void {
    }

    setColor(): void {
        switch (CURRENT_COLOR$.getValue()) {
            case COLOR.BLUE:
                this.isBlue = true;
                this.isGreen = false;
                this.isRed = false;
                break;
            case COLOR.GREEN:
                this.isBlue = false;
                this.isGreen = true;
                this.isRed = false;
                break;
            case COLOR.RED:
                this.isBlue = false;
                this.isGreen = false;
                this.isRed = true;
                break;
            default:
                this.isBlue = true;
        }
    }
}
