import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {currentTaskList$, taskList$} from "../../../services/observables";
import {TASK_SERVICE} from "../../../services/taskService";

export class Baner implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    selectedSumTxt: string;
    selectedTasksSum: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.selectedSumTxt = "Sum: ";
        this.selectedTasksSum = this.getSelectedTasksSum();
    }

    onCreate(): void {
        this.root.collect(
            taskList$.subscribe(() => {
                this.selectedTasksSum = this.getSelectedTasksSum();
                this.root.detectChanges();
            }),
            currentTaskList$.subscribe(() => {
                this.selectedTasksSum = this.getSelectedTasksSum();
                this.root.detectChanges();
            }),
        );
    }

    private getSelectedTasksSum() {
        return TASK_SERVICE.getSelectedTasksSum() + "";
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
