import {chanelInput$, chanelOutput$} from "../../services/service";
import {COMMAND_TEST1, ID} from "../../env/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Test1 implements OnInit, OnCreate, OnDestroy {
    name: string;
    testData1: string;
    id: string;

    constructor(readonly root: RootBehavior) {
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

        this.root.collect(
            chanelOutput$
                .pipe()
                .emitByPositive(msg => msg && (msg.id === this.id))
                .subscribe(msg => {
                    this.testData1 = msg.payload;
                    this.root.detectChanges();
                })
        );
    }

    onDestroy(): void {
    }
}
