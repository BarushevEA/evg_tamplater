import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Child4 implements OnInit, OnCreate, OnDestroy {
    name: string;
    message: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root.collect(
            this.root.onMessage$<string>()
                .pipe()
                .emitByPositive(msg => !!msg)
                .subscribe((msg: string) => {
                    console.log(msg);
                    this.message = msg;
                    this.root.detectChanges();
                })
        );
    }

    onInit(): void {
        this.message = this.name;
    }

    onDestroy(): void {
    }
}
