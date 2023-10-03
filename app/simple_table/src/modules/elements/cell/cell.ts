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

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.data = "test";
        this.isEdit = false;
    }

    onCreate(): void {
        this.root.dataCatch$<CELL>()
            .subscribe(cell => {
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
        this.isEdit = true;
        setValue(this.input, this.data);
        this.root.detectChanges();
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
        this.root.title = this.data;
    }
}
