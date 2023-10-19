import {CellId, OptionsCollector, TableOptions} from "../env/types";
import {AppDocument, AppWindow} from "../../../../../libs/env/browserVariables";
import {runWhenDocumentReady} from "../../../../../libs/utils/utils";
import {CellChange$, IsTableReady$} from "./tableServices";

export type IController = {
    createTable(name: string): IInject;
};

export type IInject = {
    injectToId(id: string): ITableWaiter
    injectToElement(element: HTMLElement): ITableWaiter
};

export type ITableWaiter = {
    waitTable(): Promise<ITableExecutor>;
};

export type ITableExecutor = {
    setListener(cellListener: (cell: CellId) => void): void;
    setData(options: TableOptions): void;
};

class TableController implements IController {
    createTable(name: string): IInject {
        return new Injector(`<app-simple-table table-name='${name}'></app-simple-table>`, name);
    }
}

class Injector implements IInject {
    tableTag: string;
    tableName: string;

    constructor(tableTag: string, tableName: string) {
        this.tableTag = tableTag;
        this.tableName = tableName;
    }

    injectToElement(element: HTMLElement): ITableWaiter {
        return new TableWaiter(this.tableTag, this.tableName, element);
    }

    injectToId(id: string): ITableWaiter {
        return this.injectToElement(AppDocument.getElementById(id));
    }
}

class TableWaiter implements ITableWaiter {
    tableTag: string;
    tableName: string;
    parent: HTMLElement;

    constructor(tableTag: string, tableName: string, element: HTMLElement) {
        this.tableTag = tableTag;
        this.tableName = tableName;
        this.parent = element;
    }

    waitTable(): Promise<ITableExecutor> {
        return new Promise((resolve, reject) => {
            if (!this.tableName) {
                reject("tableName is not present");
                return;
            }
            if (!this.tableTag) {
                reject("tableTag is not present");
                return;
            }
            if (!this.parent) {
                reject("parent is not present");
                return;
            }

            IsTableReady$
                .pipe()
                .emitByPositive((table: OptionsCollector) => {
                    if (!table) return false;
                    return table.getTableName() === this.tableName;
                })
                .subscribe(table => {
                    const executor = new TableExecutor(table);
                    resolve(executor);
                });

            runWhenDocumentReady(() => {
                this.parent.innerHTML = this.tableTag;
            });
        });
    }
}

class TableExecutor implements ITableExecutor {
    table: OptionsCollector;
    cellListener: (cell: CellId) => void;

    constructor(table: OptionsCollector) {
        this.table = table;
    }

    setData(options: TableOptions): void {
        this.table.setOptions(options);
    }

    setListener(cellListener: (cell: CellId) => void): void {
        if (!cellListener) return;
        this.cellListener = cellListener;
        CellChange$
            .pipe()
            .emitByPositive((cell: CellId) => {
                if (!cell) return false;
                return cell.tableName === this.table.getTableName();
            })
            .subscribe(cell => {
                this.cellListener(cell);
            });
    }
}

export function INIT_CONTROLLER() {
    (<any>AppWindow[<any>"TableController"]) = new TableController();
}
