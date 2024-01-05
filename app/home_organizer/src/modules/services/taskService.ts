import {currentTaskList$, taskList$} from "./observables";
import {ITask} from "../env/taskEnv/types";
import {E_TASK_ACTION, E_TASK_LIST} from "../env/taskEnv/enums";
import {TASK_FILTERS} from "../env/taskEnv/variables";

class TaskService {
    setTaskList(list: E_TASK_LIST): void {
        currentTaskList$.next(list);
    }

    getCurrentTaskList(): E_TASK_LIST {
        return currentTaskList$.getValue();
    }

    getTasks(): ITask[] {
        return taskList$.getValue();
    }

    getTasksByList(list: E_TASK_LIST): ITask[] {
        const tasks = this.getTasks();
        const taskFilter = TASK_FILTERS[list];
        return tasks.filter(task => taskFilter(task));
    }

    getSelectedTasks(): ITask[] {
        return this.getTasksByList(E_TASK_LIST.TASKS);
    }

    getSelectedTasksSum(): number {
        const selectedTasks = this.getSelectedTasks();
        if (selectedTasks.length === 0) return 0;

        return selectedTasks.reduce(
            (accumulator, task) => accumulator + task.count * task.price
            , 0
        );
    }

    clickHandler(event: MouseEvent, taskId: string, action: E_TASK_ACTION): void {
        event.stopPropagation();
        event.preventDefault();

        const currentTaskList = this.getCurrentTaskList();

        switch (currentTaskList) {
            case E_TASK_LIST.FAVORITE:
                this.setFavoriteViewAction(taskId, action);
                break;
            case E_TASK_LIST.TASKS:
                this.setTasksViewAction(taskId, action);
                break;
            case E_TASK_LIST.FOOD:
                this.setFoodViewAction(taskId, action);
                break;
            case E_TASK_LIST.GOODS:
                this.setGoodsViewAction(taskId, action);
                break;
        }

    }

    private setFavoriteViewAction(taskId: string, action: E_TASK_ACTION): void {
        console.log("setFavoriteViewAction", action, taskId);

        switch (action) {
            case E_TASK_ACTION.FAVORITE_CLICK:
                this.changeFavorite(taskId);
                break;
        }
    }

    private setTasksViewAction(taskId: string, action: E_TASK_ACTION): void {
        console.log("setTasksViewAction", action, taskId);

        switch (action) {
        }
    }

    private setFoodViewAction(taskId: string, action: E_TASK_ACTION): void {
        console.log("setFoodViewAction", action, taskId);

        switch (action) {
            case E_TASK_ACTION.FAVORITE_CLICK:
                this.changeFavorite(taskId);
                break;
        }
    }

    private setGoodsViewAction(taskId: string, action: E_TASK_ACTION): void {
        console.log("setGoodsViewAction", action, taskId);

        switch (action) {
            case E_TASK_ACTION.FAVORITE_CLICK:
                this.changeFavorite(taskId);
                break;
        }
    }

    private changeFavorite(id: string): void {
        const task = this.getTask(id);
        if (task) {
            task.isFavorite = !task.isFavorite;
            this.update();
        }
    }

    public update(tasks?: ITask[]): void {
        let updatedTasks = tasks ? tasks : this.getTasks();

        for (const updatedTask of updatedTasks) {
            updatedTask.cost = updatedTask.count * updatedTask.price;
        }

        taskList$.next(updatedTasks);
    }

    private getTask(id: string): ITask | undefined {
        const tasks = this.getTasks();

        for (const task of tasks) {
            if (task.id === id) {
                return task;
            }
        }

        return undefined;
    }
}

export const TASK_SERVICE = new TaskService();
