import {E_TASK_LIST, E_TASK_TYPE} from "./enums";
import {ITask} from "./types";

export const TASK_FILTERS = {
    [E_TASK_LIST.FAVORITE]: (task: ITask) => task.isFavorite,
    [E_TASK_LIST.FOOD]: (task: ITask) => task.type === E_TASK_TYPE.FOOD,
    [E_TASK_LIST.GOODS]: (task: ITask) => task.type === E_TASK_TYPE.GOODS,
    [E_TASK_LIST.TASKS]: (task: ITask) => task.isSelected,
};
