
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";

export class Search implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    isShowed: boolean = false;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    public search() {
        this.isShowed = !this.isShowed;
        this.root.detectChanges();
    }
}