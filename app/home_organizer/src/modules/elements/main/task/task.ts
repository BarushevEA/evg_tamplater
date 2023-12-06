import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask} from "../../../env/taskEnv/types";
import {E_TASK_TYPE} from "../../../env/taskEnv/enums";
import {TASK_SERVICE} from "../../../services/taskService";
import {ILocalizedText} from "../../../../../../../libs/elements/AppLocalization/types";
import {APP_LOCALE, location$} from "../../../../../../../libs/elements/AppLocalization/LocationManager";

export class Task implements OnInit, OnCreate, OnDestroy, ITask {
    readonly root;
    readonly tagName: string;
    readonly hover: HTMLElement;
    isEditMode: boolean;

    comment: ILocalizedText;
    commentTxt: string;
    cost: number;
    count: number;
    description: ILocalizedText;
    descriptionTxt: string;
    endDate: number;
    id: string;
    isFail: boolean;
    isFavorite: boolean;
    isSelected: boolean;
    name: ILocalizedText;
    nameTxt: string;
    price: number;
    startDate: number;
    type: E_TASK_TYPE;

    constructor(root: RootBehavior) {
        this.root = root;
        this.tagName = root.tagName;

        this.defaultInit();
    }

    onCreate(): void {
        this.root
            .dataCatch$()
            .subscribe((data: ITask) => {
                for (const dataKey in data) {
                    (<any>this)[dataKey] = (<any>data)[dataKey];
                }

                this.setTexts();

                this.root.detectChanges();
            });
        this.root.collect(
            location$.subscribe(() => {
                this.setTexts();

                this.root.detectChanges();
            })
        );
    }

    onInit(): void {
        this.setTexts();
    }

    onDestroy(): void {
    }

    favoriteClick(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();

        this.isFavorite = !this.isFavorite;

        TASK_SERVICE.changeFavorite(this.id, this.isFavorite);
        this.root.detectChanges();
    }

    private setTexts(): void {
        this.nameTxt = APP_LOCALE.getCurrentText(this.name);
        this.descriptionTxt = APP_LOCALE.getCurrentText(this.description);
        this.commentTxt = APP_LOCALE.getCurrentText(this.comment);

        this.setTitle();
    }

    private defaultInit() {
        this.comment = {};
        this.commentTxt = "";
        this.cost = 0;
        this.count = 0;
        this.description = {};
        this.descriptionTxt = "";
        this.endDate = 0;
        this.id = "";
        this.isFail = false;
        this.isFavorite = false;
        this.isSelected = false;
        this.name = {};
        this.nameTxt = "";
        this.price = 0;
        this.startDate = 0;
        this.type = E_TASK_TYPE.NULL;
    }

    private setTitle() {
        this.root.title = this.commentTxt;
        if (this.hover) this.hover.title = this.commentTxt;
    }
}
