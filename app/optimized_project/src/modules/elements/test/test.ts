import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Test implements OnInit, OnDestroy, OnCreate {
    test1 = "TEST1";
    test2 = "TEST2";
    isRed = false;
    isBlue = false;
    isGreen = false;
    num = 0;
    readonly root;

    constructor(root: RootBehavior) {
        this.root = root;
    }

    onCreate(): void {
        this.root.dataCatch$<number>().subscribe(data => {
            this.num = data;
            this.isRed = data > 0 && data < 4;
            this.isBlue = data > 3;
            this.isGreen = data < 0;
            this.root.detectChanges();
        });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
