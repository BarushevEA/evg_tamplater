import {chanelInput$, chanelOutput$} from "../../services/service";
import {COMMAND_TEST2, ID} from "../../env/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Test2 implements OnInit, OnCreate, OnDestroy {
    name: string;
    testData2: string;
    id: string;

    constructor(readonly root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.testData2 = "testData2";
        this.id = ID.TEST2;
    }

    onCreate(): void {
    }

    onInit(): void {
        setTimeout(() => {
            chanelInput$.next({
                id: this.id,
                command: COMMAND_TEST2.GET_CAR,
            });
        }, 3000);

        this.root.collect(
            chanelOutput$
                .pipe()
                .refine(msg => msg && (msg.id === this.id))
                .subscribe(msg => {
                    this.testData2 = msg.payload;
                    this.root.detectChanges();
                })
        );
    }

    onDestroy(): void {
    }
}
