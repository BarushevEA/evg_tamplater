import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {currentTaskList$, taskList$} from "../../../services/observables";
import {TASK_SERVICE} from "../../../services/taskService";
import {ILocalizedText} from "../../../../../../../libs/elements/AppLocalization/types";
import {APP_LOCALE, location$} from "../../../../../../../libs/elements/AppLocalization/LocationManager";
import {bannerFieldsTxt} from "../../../env/Languages/banner";

export class Baner implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    selectedSum: ILocalizedText;
    selectedSumTxt: string;
    selectedTasksSum: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;

        this.init();
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
            location$.subscribe(() => {
                this.setTexts();

                this.root.detectChanges();
            })
        );
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    private getSelectedTasksSum() {
        return TASK_SERVICE.getSelectedTasksSum() + "";
    }

    private setTexts(): void {
        this.selectedSumTxt = APP_LOCALE.getLocalizedTextByLocation(this.selectedSum);
    }

    private init() {
        this.selectedSum = bannerFieldsTxt.selectedSum;
        this.selectedSumTxt = "";
        this.selectedTasksSum = this.getSelectedTasksSum();

        this.setTexts();
    }
}
