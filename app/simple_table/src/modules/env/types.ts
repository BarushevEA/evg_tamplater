export type ROW = {
    id: number;
    arr: string[];
};

export type CellId = {
    x: number;
    y: number;
}

export type CELL = {
    id: CellId;
    value: string;
}
