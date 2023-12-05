import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask} from "../../../env/taskEnv/types";
import {currentTaskList$, taskList$} from "../../../services/observables";
import {E_TASK_LIST, E_TASK_TYPE} from "../../../env/taskEnv/enums";

export class Task_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    viewList: ITask[];
    currentView: E_TASK_LIST;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.currentView = E_TASK_LIST.TASKS;
        this.viewList = [];
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
            .subscribe(data => {
                console.log("====>", this.currentView, data);
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
        this.viewList.length = 0;
        console.log(this);
        switch (this.currentView) {
            case E_TASK_LIST.FAVORITE:
                for (const task of tasks) {
                    if (task.isFavorite) this.viewList.push(task);
                }
                break;
            case E_TASK_LIST.FOOD:
                for (const task of tasks) {
                    if (task.type === E_TASK_TYPE.FOOD) this.viewList.push(task);
                }
                break;
            case E_TASK_LIST.GOODS:
                for (const task of tasks) {
                    if (task.type === E_TASK_TYPE.GOODS) this.viewList.push(task);
                }
                break;
            case E_TASK_LIST.TASKS:
                for (const task of tasks) {
                    if (task.isSelected) this.viewList.push(task);
                }
                break;
        }
    }
}
