import {Test3} from "../modules/elements/test3/test3";
import {Test2} from "../modules/elements/test2/test2";
import {Test1} from "../modules/elements/test1/test1";
import {Main} from "../modules/elements/main/main";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Test1, "app-test1", "APP_EXAMPLE_____MARKER_TEST1"),
    getOption(Test2, "app-test2", "APP_EXAMPLE_____MARKER_TEST2"),
    getOption(Test3, "app-test3", "APP_EXAMPLE_____MARKER_TEST3"),
];
