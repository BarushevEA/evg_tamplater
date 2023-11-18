import {IChanel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../libs/elements/types";

export class AppRoot implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;

    main: HTMLElement;
    mainChanel: IChanel;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
    }

    onInit(): void {
        this.initMainChanel();
        this.root.sendToChanel(this.mainChanel, "TEST APP CHANEL");
    }

    onDestroy(): void {
    }

    private initMainChanel(): void {
        this.mainChanel = this.root.getChanel(this.main);
    }
}
