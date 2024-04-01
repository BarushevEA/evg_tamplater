import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {MainEvents$} from "../../services/service";

export class Main implements OnInit, OnCreate, OnDestroy {
    name: string;
    counter: number;

    constructor(readonly root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.counter = 0;
    }

    onCreate(): void {
    }

    onInit(): void {
        MainEvents$.next({text: "Main initialized", number: 0});
        // let counter = 1;
        // const timer = setInterval(() => {
        // setInterval(() => {
        //     MainEvents$.next({text: "I'm Main, i do something ", number: counter});
        //     counter++;
        //     // if (counter > 15) {
        //     //     clearInterval(timer);
        //     // }
        // }, 1000);
    }

    click() {
        this.counter++;
        MainEvents$.next({text: "Main click", number: this.counter});
    }

    onDestroy(): void {
    }
}
