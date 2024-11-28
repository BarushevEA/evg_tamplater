
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../../libs/env/types";
import {log} from "../../../../../../../../libs/utils/utils";
import {isShowMenu$} from "../../../../services/service";

export class Menucontent implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    isHidden: boolean = true;
    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.root.collect(
            isShowMenu$
                .subscribe(msg=>{
                    log(msg," message");
                    this.isHidden = !msg;
                    this.root.detectChanges();
                })
        )
    }

    onDestroy(): void {
    }
}