import {IChanel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Main implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    taskList: HTMLElement;
    taskListChanel: IChanel;

    // isMenuShow: boolean = menuService$.getValue().isShow;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root.transferToChanel<any, any>(
            () => this.taskListChanel,
            data => data
        );

        // this.root.collect(
        //     menuService$.subscribe(menu => {
        //         this.isMenuShow = menu.isShow;
        //         this.root.detectChanges();
        //     }),
        // );
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
