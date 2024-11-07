import {Additional_header} from "../modules/elements/additional_header/additional_header";
import {Header} from "../modules/elements/header/header";
import {Page3} from "../modules/elements/page3/page3";
import {Page2} from "../modules/elements/page2/page2";
import {Page1} from "../modules/elements/page1/page1";
import {Main} from "../modules/elements/main/main";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Page1, "app-page1", "APP_EXAMPLE_____MARKER_PAGE1"),
    getOption(Page2, "app-page2", "APP_EXAMPLE_____MARKER_PAGE2"),
    getOption(Page3, "app-page3", "APP_EXAMPLE_____MARKER_PAGE3"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Additional_header, "app-additional_header", "APP_EXAMPLE_____MARKER_ADDITIONAL_HEADER"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
