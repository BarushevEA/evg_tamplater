import {Main3} from "../modules/elements/main3/main3";
import {Main2} from "../modules/elements/main2/main2";
import {Main1} from "../modules/elements/main1/main1";
import {Header} from "../modules/elements/header/header";
import {Footer} from "../modules/elements/footer/footer";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Main1, "app-main1", "APP_EXAMPLE_____MARKER_MAIN1"),
    getOption(Main2, "app-main2", "APP_EXAMPLE_____MARKER_MAIN2"),
    getOption(Main3, "app-main3", "APP_EXAMPLE_____MARKER_MAIN3"),
];

START_ROUTES_REGISTRATION();
