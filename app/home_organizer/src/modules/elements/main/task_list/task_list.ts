import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";

export class Task_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    tasks: any[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.tasks = [1, 2, 3, 4, 5];
    }

    onCreate(): void {
        this.root
            .dataCatch$()
            .subscribe(data => {
                console.log("====>", this.name, data);
            });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
