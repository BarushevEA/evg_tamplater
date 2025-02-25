import {Utilitybar} from "../modules/elements/container/utilitybar/utilitybar";
import {Navcontainer} from "../modules/elements/container/navcontainer/navcontainer";
import {Logocontainer} from "../modules/elements/container/logocontainer/logocontainer";
import {Container} from "../modules/elements/container/container";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Container, "app-container", "APP_EXAMPLE_____MARKER_CONTAINER"),
    getOption(Logocontainer, "app-logocontainer", "APP_EXAMPLE_____MARKER_LOGOCONTAINER"),
    getOption(Navcontainer, "app-navcontainer", "APP_EXAMPLE_____MARKER_NAVCONTAINER"),
    getOption(Utilitybar, "app-utilitybar", "APP_EXAMPLE_____MARKER_UTILITYBAR"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
