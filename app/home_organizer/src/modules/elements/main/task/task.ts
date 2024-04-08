import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask} from "../../../env/taskEnv/types";
import {E_TASK_ACTION, E_TASK_TYPE} from "../../../env/taskEnv/enums";
import {TASK_SERVICE} from "../../../services/taskService";
import {ILocalizedText} from "../../../../../../../libs/elements/AppLocalization/types";
import {APP_LOCALE, location$} from "../../../../../../../libs/elements/AppLocalization/LocationManager";
import {taskFieldTxt} from "../../../env/Languages/task";

export class Task implements OnInit, OnCreate, OnDestroy, ITask {
    readonly root;
    readonly tagName: string;
    readonly hover: HTMLElement;
    isEditMode: boolean;

    comment: ILocalizedText;
    commentTxt: string;
    commentFieldTxt: string;

    cost: number;
    costFieldTxt: string;

    count: number;
    countFieldTxt: string;

    description: ILocalizedText;
    descriptionTxt: string;
    descriptionFieldTxt: string;

    name: ILocalizedText;
    nameTxt: string;
    nameFieldTxt: string;

    price: number;
    priceFieldTxt: string;

    type: E_TASK_TYPE;
    typeFieldTxt: string;

    id: string;
    isFail: boolean;
    isFavorite: boolean;
    isSelected: boolean;

    startDate: number;
    endDate: number;

    constructor(root: RootBehavior) {
        this.root = root;
        this.tagName = root.tagName;

        this.defaultInit();
    }

    onCreate(): void {
        this.root
            .onMessage$()
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
        TASK_SERVICE.clickHandler(event, this.id, E_TASK_ACTION.FAVORITE_CLICK);
    }

    private setTexts(): void {
        this.nameTxt = APP_LOCALE.getLocalizedTextByLocation(this.name);
        this.descriptionTxt = APP_LOCALE.getLocalizedTextByLocation(this.description);
        this.commentTxt = APP_LOCALE.getLocalizedTextByLocation(this.comment);

        this.nameFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.name);
        this.descriptionFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.description);
        this.commentFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.comment);
        this.costFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.cost);
        this.countFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.count);
        this.priceFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.price);
        this.typeFieldTxt = APP_LOCALE.getLocalizedTextByLocation(taskFieldTxt.type);

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
