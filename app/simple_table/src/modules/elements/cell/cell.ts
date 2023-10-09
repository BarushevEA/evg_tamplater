import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {getValue, setValue} from "../../../../../../libs/utils/utils";
import {CELL, CellId} from "../../env/types";

export class Cell implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    data: string;
    input: HTMLElement;
    isEdit: boolean;
    id: CellId;
    isEditDisabled: boolean;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.data = "";
        this.isEdit = false;
    }

    onCreate(): void {
        this.root.dataCatch$<CELL>()
            .subscribe(cell => {
                this.isEditDisabled = !!cell.isEditDisabled;
                this.data = cell.value;
                this.id = cell.id;
                setValue(this.input, this.data);
                this.root.title = this.data;
                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }

    onDblClick(): void {
        if (this.isEditDisabled) return;

        this.isEdit = true;
        setValue(this.input, this.data);
        this.root.detectChanges();
        this.input.focus()
    }

    onKeyDown(evt: KeyboardEvent): void {
        if (evt.key.toLowerCase() === "enter") {
            this.isEdit = false;
            this.setData();
            this.root.detectChanges();
        }
    }

    onChange(): void {
        this.isEdit = false;
        this.setData();
        this.root.detectChanges();
    }

    onMouseLeave(): void {
        if (this.isEdit) {
            this.isEdit = false;

            this.setData();
            this.root.detectChanges();
        }
    }

    setData(): void {
        this.data = getValue(this.input);
        this.data = this.data ? this.data : "";
        this.root.title = this.data;
    }

    isPointer():boolean{
        return !this.isEdit && !this.isEditDisabled;
    }
}
