import {Container} from "../modules/elements/container/container";
import {View_image} from "../modules/elements/view_image/view_image";
import {View_button} from "../modules/elements/view_button/view_button";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(View_button, "app-view_button", "APP_EXAMPLE_____MARKER_VIEW_BUTTON"),
    getOption(View_image, "app-view_image", "APP_EXAMPLE_____MARKER_VIEW_IMAGE"),
    getOption(Container, "app-container", "APP_EXAMPLE_____MARKER_CONTAINER"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
