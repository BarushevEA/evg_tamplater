import {E_TASK_TYPE} from "./enums";
import {ILocalizedText} from "../../../../../../libs/elements/AppLocalization/types";

export type ITask = {
    type: E_TASK_TYPE;
    name: ILocalizedText;
    comment: ILocalizedText;
    description: ILocalizedText;
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

export type TaskFilter = (task: ITask) => boolean;
