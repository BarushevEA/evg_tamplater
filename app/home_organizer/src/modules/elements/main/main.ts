import {IChanel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Main implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    taskList: HTMLElement;
    taskListChanel: IChanel;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root
            .dataCatch$()
            .pipe()
            .emitByPositive(() => this.taskListChanel)
            .subscribe(data => {
                this.taskListChanel
                    .sendData(
                        data
                    );
            });
    }

    onInit(): void {
        this.initTaskListChanel();
    }

    onDestroy(): void {
    }

    private initTaskListChanel(): void {
        this.taskListChanel = this.root.getChanel(this.taskList);
    }
}
