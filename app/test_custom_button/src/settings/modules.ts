import {CSM_BUTTON} from "../../../../custom_elements/button/distribution/settings/modules";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

// <csm-button></csm-button> Custom element for sharing
export const MODULES: REG_OPTIONS = [
    ...CSM_BUTTON,
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
