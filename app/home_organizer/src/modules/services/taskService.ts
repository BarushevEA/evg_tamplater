import {currentTaskList$, taskList$} from "./observables";
import {ITask} from "../env/taskEnv/types";
import {E_TASK_LIST} from "../env/taskEnv/enums";

class TaskService {
    setTaskList(list: E_TASK_LIST): void {
        currentTaskList$.next(list);
    }

    changeFavorite(id: string, isFavorite: boolean): void {
        const tasks = taskList$.getValue();
        const task = this.getTask(id, tasks);
        if (task) {
            task.isFavorite = isFavorite;
            taskList$.next(tasks);
        }
    }

    private getTask(id: string, tasks: ITask[]): ITask | undefined {
        for (const task of tasks) {
            if (task.id === id) {
                return task;
            }
        }
        return undefined;
    }
}

export const TASK_SERVICE = new TaskService();
