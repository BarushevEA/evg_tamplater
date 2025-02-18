import {Container} from "../modules/elements/container/container";
import {View_image} from "../modules/elements/view_image/view_image";
import {View_button} from "../modules/elements/view_button/view_button";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const CSM_BUTTON: REG_OPTIONS = [
    getOption(AppRoot, "csm-button", " <csmbutton-container></csmbutton-container>", false, true),
    getOption(View_button, "csmbutton-view_button", "<div>Hello view_button.html</div>", true, false),
    getOption(View_image, "csmbutton-view_image", "<div>Hello view_image.html</div>", true, false),
    getOption(Container, "csmbutton-container", "<qsi-subroute name='view'></qsi-subroute>", true, false),
];

START_SUB_ROUTES_REGISTRATION();
