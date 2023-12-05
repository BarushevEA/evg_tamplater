import {E_TASK_TYPE} from "./enums";

export type ITask = {
    type: E_TASK_TYPE;
    name: string;
    comment: string;
    description: string;
    isFavorite: boolean;
    isFail: boolean;
    isSelected: boolean;
    id: string;
    count: number;
    price: number;
    cost: number;
    startDate: number;
    endDate: number;
};
