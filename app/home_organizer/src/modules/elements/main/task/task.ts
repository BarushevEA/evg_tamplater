import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask} from "../../../env/taskEnv/types";
import {E_TASK_TYPE} from "../../../env/taskEnv/enums";
import {TASK_SERVICE} from "../../../services/taskService";

export class Task implements OnInit, OnCreate, OnDestroy, ITask {
    readonly root;
    readonly tagName: string;
    readonly hover: HTMLElement;
    isEditMode: boolean;

    comment: string;
    cost: number;
    count: number;
    description: string;
    endDate: number;
    id: string;
    isFail: boolean;
    isFavorite: boolean;
    isSelected: boolean;
    name: string;
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

                console.log(this.id);

                this.setTitle();

                this.root.detectChanges();
            });
    }

    onInit(): void {
        this.setTitle();
    }

    onDestroy(): void {
    }

    favoriteClick(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();

        this.isFavorite = !this.isFavorite;

        console.log("favoriteClick(event: MouseEvent)", this.id, this.isFavorite);
        TASK_SERVICE.changeFavorite(this.id, this.isFavorite);
        this.root.detectChanges();
    }

    private defaultInit() {
        this.comment = "";
        this.cost = 0;
        this.count = 0;
        this.description = "";
        this.endDate = 0;
        this.id = "";
        this.isFail = false;
        this.isFavorite = false;
        this.isSelected = false;
        this.name = "";
        this.price = 0;
        this.startDate = 0;
        this.type = E_TASK_TYPE.NULL;
    }

    private setTitle() {
        this.root.title = this.comment;
        if (this.hover) this.hover.title = this.comment;
    }
}
