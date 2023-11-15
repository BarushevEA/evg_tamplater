import {Menu} from "../modules/elements/header/menu/menu";
import {Footer} from "../modules/elements/footer/footer";
import {Main} from "../modules/elements/main/main";
import {Header} from "../modules/elements/header/header";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
    getOption(Menu, "app-menu", "APP_EXAMPLE_____MARKER_MENU"),
];
