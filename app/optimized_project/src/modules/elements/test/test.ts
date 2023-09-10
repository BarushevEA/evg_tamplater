import {OnInit} from "../../../../../../libs/env/types";

export class Test implements OnInit {
    test1 = "TEST1";
    test2 = "TEST2";

    onInit(): void {
        console.log("TEST APP_TEST INIT");
    }
}
