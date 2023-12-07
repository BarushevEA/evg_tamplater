import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask, TaskFilter} from "../../../env/taskEnv/types";
import {currentTaskList$, taskList$} from "../../../services/observables";
import {E_TASK_LIST} from "../../../env/taskEnv/enums";
import {APP_LOCALE} from "../../../../../../../libs/elements/AppLocalization/LocationManager";
import {TASK_FILTERS} from "../../../env/taskEnv/variables";

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
        this.subscribeToObservables();
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    private subscribeToObservables() {
        this.root.collect(
            taskList$.subscribe(() => {
                this.refreshTaskList();
                this.root.detectChanges();
            }),
            currentTaskList$.subscribe(view => {
                this.currentView = view;
                this.refreshTaskList();
                this.root.detectChanges();
            })
        );

        this.root.dataCatch$().subscribe(() => {
            this.refreshTaskList();
            this.root.detectChanges();
        });
    }

    private refreshTaskList(): void {
        const tasks = taskList$.getValue();
        const taskFilter = this.getTaskFilter();

        this.viewList = tasks.filter(task => this.applySearchFilter(task) && taskFilter(task));
    }

    private applySearchFilter(task: ITask): boolean {
        if (!this.searchText) return true;

        const taskName = APP_LOCALE.getCurrentText(task.name);
        return taskName.toLowerCase().includes(this.searchText.toLowerCase());
    }

    private getTaskFilter(): TaskFilter {
        return TASK_FILTERS[this.currentView];
    }
}
