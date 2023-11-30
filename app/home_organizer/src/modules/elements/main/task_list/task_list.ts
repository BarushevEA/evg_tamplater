import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../../libs/elements/types";
import {ITask} from "../../../env/taskEnv/types";
import {MOCK_TASKS} from "../../../env/taskEnv/mockData";

export class Task_list implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    tasks: ITask[];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.tasks = MOCK_TASKS;
    }

    onCreate(): void {
        this.root
            .dataCatch$()
            .subscribe(data => {
                console.log("====>", this.name, data);
            });
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
