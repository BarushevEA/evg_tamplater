import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {chanelInput$, chanelOutput$} from "../../services/service";
import {COMMAND_TEST3, ID} from "../../env/types";

export class Test3 implements OnInit, OnCreate, OnDestroy {
    name: string;
    testData3: string;
    id: string;

    constructor(readonly root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.testData3 = "testData3";
        this.id = ID.TEST3;
    }

    onCreate(): void {
    }

    onInit(): void {
        setTimeout(() => {
            chanelInput$.next({
                id: this.id,
                command: COMMAND_TEST3.GET_COOKIE,
            });
        }, 5000);

        this.root.collect(
            chanelOutput$
                .pipe()
                .emitByPositive(msg => msg && (msg.id === this.id))
                .subscribe(msg => {
                    this.testData3 = msg.payload;
                    this.root.detectChanges();
                })
        );
    }

    onDestroy(): void {
    }
}
