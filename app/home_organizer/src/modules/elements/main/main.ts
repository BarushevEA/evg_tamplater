import {IChannel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Main implements OnInit, OnCreate, OnDestroy {
    readonly root: RootBehavior;
    name: string;
    taskList: HTMLElement;
    taskListChanel: IChannel;

    // isMenuShow: boolean = menuService$.getValue().isShow;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root.transferToChannel<any, any>(
            () => this.taskListChanel,
            data => data
        );
    }

    onInit(): void {
        this.initTaskListChanel();
    }

    onDestroy(): void {
    }

    private initTaskListChanel(): void {
        this.taskListChanel = this.root.getChannel(this.taskList);
    }
}
