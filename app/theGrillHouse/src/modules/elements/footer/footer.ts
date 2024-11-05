
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";

export class Footer implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    time: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        setInterval(()=>{
            this.time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
            this.root.detectChanges();
        });
    }

    onDestroy(): void {
    }
}