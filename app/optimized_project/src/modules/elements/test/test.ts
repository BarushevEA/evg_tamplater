import {OnDestroy, OnInit} from "../../../../../../libs/env/types";

export class Test implements OnInit, OnDestroy {
    test1 = "TEST1";
    test2 = "TEST2";

    onInit(): void {
        console.log("TEST APP_TEST INIT");
    }

    onDestroy(): void {
        console.log("TEST APP_TEST DESTROY");
    }
}
