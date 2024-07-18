import {Observable} from "evg_observable";
import {MenuEvent} from "../env/menuEnv/types";
import {menuObject} from "../env/menuEnv/variables";
import {E_TASK_LIST} from "../env/taskEnv/enums";
import {ITask} from "../env/taskEnv/types";

export const menuService$ = new Observable<MenuEvent>(menuObject);
export const currentTaskList$ = new Observable<E_TASK_LIST>(E_TASK_LIST.TASKS);
export const taskList$ = new Observable<ITask[]>([]);
