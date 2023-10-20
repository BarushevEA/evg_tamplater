export type ROW = {
    tableName?: string;
    id: number;
    isEditDisabled?: boolean;
    arr: string[];
};

export type CellId = {
    tableName?: string;
    x: number;
    y: number;
    data?: string;
}

export type CELL = {
    id: CellId;
    isEditDisabled?: boolean;
    value: string;
}

export type TableOptions = {
    tableName?: string;
    header: string[];
    body: string[][];
    footer: string;
}

export type OptionsCollector = {
    getTableName(): string;
    setOptions(options: TableOptions): void;
}
