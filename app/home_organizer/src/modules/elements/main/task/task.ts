
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";

export class Task implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    text: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.text = "TASK ";
    }

    onCreate(): void {
        this.root
            .dataCatch$()
            .subscribe(data => {
                console.log(data);
                this.text += data;
                this.root.detectChanges();
            });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
