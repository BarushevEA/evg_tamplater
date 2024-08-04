import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
];

START_ROUTES_REGISTRATION();
