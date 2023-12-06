import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask} from "../../../env/taskEnv/types";
import {currentTaskList$, taskList$} from "../../../services/observables";
import {E_TASK_LIST, E_TASK_TYPE} from "../../../env/taskEnv/enums";
import {APP_LOCALE} from "../../../../../../../libs/elements/AppLocalization/LocationManager";

export class Task_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    viewList: ITask[];
    currentView: E_TASK_LIST;
    searchText: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.currentView = E_TASK_LIST.TASKS;
        this.viewList = [];
        this.searchText = "";
    }

    onCreate(): void {
        this.root.collect(
            taskList$.subscribe(() => {
                this.handleCurrentView();
                this.root.detectChanges();
            }),
            currentTaskList$.subscribe(view => {
                this.currentView = view;
                this.handleCurrentView();
                this.root.detectChanges();
            })
        );
        this.root
            .dataCatch$()
            .subscribe(() => {
                this.handleCurrentView();
                this.root.detectChanges();
            });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    private handleCurrentView(): void {
        const tasks = taskList$.getValue();
        const fillViewListByCondition = (callback: (task: ITask) => boolean) => {
            for (const task of tasks) {
                if (this.searchText) {
                    const taskName = APP_LOCALE.getCurrentText(task.name);
                    if (!(taskName.toLowerCase())
                        .includes(this.searchText.toLowerCase())) continue;
                }
                if (callback(task)) this.viewList.push(task);
            }
        };

        this.viewList.length = 0;

        switch (this.currentView) {
            case E_TASK_LIST.FAVORITE:
                fillViewListByCondition(task => task.isFavorite);
                break;
            case E_TASK_LIST.FOOD:
                fillViewListByCondition(task => task.type === E_TASK_TYPE.FOOD);
                break;
            case E_TASK_LIST.GOODS:
                fillViewListByCondition(task => task.type === E_TASK_TYPE.GOODS);
                break;
            case E_TASK_LIST.TASKS:
                fillViewListByCondition(task => task.isSelected);
                break;
        }
    }
}
