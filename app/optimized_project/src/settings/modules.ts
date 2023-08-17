import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {Header} from "../modules/elements/header";
import {Footer} from "../modules/elements/footer";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {Main_1} from "../modules/elements/main_1";
import {Main} from "../modules/elements/main";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE__CONTAINER"),
    getOption(Header, "app-header", "APP_EXAMPLE__HEADER"),
    getOption(Main, "app-main", "APP_EXAMPLE__MAIN"),
    getOption(Main_1, "app-main_1", "APP_EXAMPLE__MAIN_1"),
    getOption(Footer, "app-footer", "APP_EXAMPLE__FOOTER"),
];
