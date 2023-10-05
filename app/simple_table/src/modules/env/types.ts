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