import {MainEvents$} from "../../services/service";
import {IMassage} from "../../env/types";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Listener1 implements OnInit, OnCreate, OnDestroy {
    name: string;
    message: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
        this.message = "";
    }

    onCreate(): void {
        this.root.collect(
            MainEvents$
                .pipe()
                .unsubscribeByPositive((msg: IMassage) => (msg.number > 11))
                .subscribe(msg => {
                    if (!msg) return;
                    console.log(msg.number);

                    this.message = "Listener1 catch: " + msg.text + msg.number;

                    if (msg.number > 10) {
                        this.message = "Да задобал кликать !!!"
                    }

                    this.root.detectChanges();
                })
        );
    }

    onInit(): void {
    }

    onDestroy(): void {

    }
}
