import {For_element} from "../modules/elements/for_element/for_element";
import {Child4} from "../modules/elements/child4/child4";
import {Child3} from "../modules/elements/child3/child3";
import {Child2} from "../modules/elements/child2/child2";
import {Child1} from "../modules/elements/child1/child1";
import {Main} from "../modules/elements/main/main";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Child1, "app-child1", "APP_EXAMPLE_____MARKER_CHILD1"),
    getOption(Child2, "app-child2", "APP_EXAMPLE_____MARKER_CHILD2"),
    getOption(Child3, "app-child3", "APP_EXAMPLE_____MARKER_CHILD3"),
    getOption(Child4, "app-child4", "APP_EXAMPLE_____MARKER_CHILD4"),
    getOption(For_element, "app-for_element", "APP_EXAMPLE_____MARKER_FOR_ELEMENT"),
];
