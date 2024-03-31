import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {chanelInput$, chanelOutput$} from "../../services/service";
import {COMMAND_TEST1, ID} from "../../env/types";

export class Test1 implements OnInit, OnCreate, OnDestroy {
    readonly root: RootBehavior;
    name: string;
    testData1: string;
    id: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.testData1 = "testData1";
        this.id = ID.TEST1;
    }

    onCreate(): void {
    }

    onInit(): void {
        setTimeout(() => {
            chanelInput$.next({
                id: this.id,
                command: COMMAND_TEST1.GET_APPLES,
            });
        }, 1000);

        chanelOutput$.subscribe(msg => {
            if (!msg) return;
            if (msg.id != this.id) return;
            this.testData1 = msg.payload;
            this.root.detectChanges();
        });
    }

    onDestroy(): void {
    }
}
