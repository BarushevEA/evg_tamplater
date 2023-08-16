import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {Header} from "../modules/elements/header";
import {Footer} from "../modules/elements/footer";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {E_SUBS_TEMPLATE} from "./templates";
import {Main_1} from "../modules/elements/main_1";
import {Main} from "../modules/elements/main";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, E_SUBS_TEMPLATE.CONTAINER),
    getOption(Header, "app-header", E_SUBS_TEMPLATE.HEADER),
    getOption(Main, "app-main", E_SUBS_TEMPLATE.MAIN),
    getOption(Main_1, "app-main_1", E_SUBS_TEMPLATE.MAIN_1),
    getOption(Footer, "app-footer", E_SUBS_TEMPLATE.FOOTER),
];
