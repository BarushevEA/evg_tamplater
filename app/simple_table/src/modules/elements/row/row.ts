import {CELL, ROW} from "../../env/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Row implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    cells: CELL[];
    id: number;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.cells = [];
    }

    onCreate(): void {
        this.root.onMessage$<ROW>()
            .subscribe(row => {
                this.cells.length = 0;
                this.id = row.id;

                for (let i = 0; i < row.arr.length; i++) {
                    const value = row.arr[i];
                    this.cells.push({
                        id: {x: i, y: this.id, tableName: row.tableName},
                        isEditDisabled: !!row.isEditDisabled,
                        value: value,
                    })
                }

                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
