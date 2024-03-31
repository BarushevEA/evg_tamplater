import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {chanelInput$, chanelOutput$} from "../../services/service";
import {COMMAND_TEST2, ID} from "../../env/types";

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

        chanelOutput$.subscribe(msg => {
            if (!msg) return;
            if (msg.id != this.id) return;
            this.testData2 = msg.payload;
            this.root.detectChanges();
        });
    }

    onDestroy(): void {
    }
}
