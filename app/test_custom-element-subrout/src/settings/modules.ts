import {CSM_SUBROUTE_TEST} from "../../../../custom_elements/subroute_test/distribution/settings/modules";
import {Footer} from "../modules/elements/footer/footer";
import {Header} from "../modules/elements/header/header";
import {Main} from "../modules/elements/main/main";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

// <csm-subroute-test></csm-subroute-test> Custom element for sharing
export const MODULES: REG_OPTIONS = [
    ...CSM_SUBROUTE_TEST,
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
