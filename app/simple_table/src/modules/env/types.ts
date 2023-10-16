export type ROW = {
    id: number;
    isEditDisabled?: boolean;
    arr: string[];
};

export type CellId = {
    x: number;
    y: number;
}

export type CELL = {
    id: CellId;
    isEditDisabled?: boolean;
    value: string;
}

export type TableOptions = {
    header: string[];
    body: string[][];
    footer: string;
}

export type OptionsCollector = {
    getTableName(): string;
    setOptions(options: TableOptions): void;
}
