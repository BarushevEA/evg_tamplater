import {IChannel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../libs/elements/types";
import {menuService$} from "../services/observables";
import {E_MENU_ACTION, E_MENU_OWNER} from "../env/menuEnv/enums";
import {E_TASK_LIST} from "../env/taskEnv/enums";
import {TASK_SERVICE} from "../services/taskService";
import {MenuEvent} from "../env/menuEnv/types";
import {MOCK_TASKS} from "../env/taskEnv/mockData";

export class AppRoot implements OnInit, OnCreate, OnDestroy {
    readonly root: RootBehavior;
    name: string;

    main: HTMLElement;
    mainChanel: IChannel;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;

        this.init();
    }

    onCreate(): void {
        this.root.collect(
            this.handleMenuEvents()
        );
    }

    onInit(): void {
        this.initMainChanel();
        this.root.sendToChanel(this.mainChanel, "INIT COMPLETE");
    }

    onDestroy(): void {
    }

    private init() {
        TASK_SERVICE.update(MOCK_TASKS);
    }

    private initMainChanel(): void {
        this.mainChanel = this.root.getChannel(this.main);
    }

    private handleMenuEvents() {
        return menuService$.subscribe(event => {
            if (this.isChoiceItemClick(event)) {
                switch (event.item) {
                    case E_TASK_LIST.TASKS:
                        TASK_SERVICE.setTaskList(E_TASK_LIST.TASKS);
                        break;
                    case E_TASK_LIST.FAVORITE:
                        TASK_SERVICE.setTaskList(E_TASK_LIST.FAVORITE);
                        break;
                    case E_TASK_LIST.FOOD:
                        TASK_SERVICE.setTaskList(E_TASK_LIST.FOOD);
                        break;
                    case E_TASK_LIST.GOODS:
                        TASK_SERVICE.setTaskList(E_TASK_LIST.GOODS);
                        break;
                }
            }
        });
    }

    private isChoiceItemClick(event: MenuEvent) {
        return event.menuAction === E_MENU_ACTION.ITEM_CLICK &&
            event.owner === E_MENU_OWNER.CHOICE;
    }
}
