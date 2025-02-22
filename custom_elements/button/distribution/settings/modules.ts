import {Container} from "../modules/elements/container/container";
import {View_image} from "../modules/elements/view_image/view_image";
import {View_button} from "../modules/elements/view_button/view_button";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const CSM_BUTTON: REG_OPTIONS = [
    getOption(AppRoot, "csm-button", "<style>txt-val{display: contents !important;}qsi-bind{display: contents !important;}qsi-subroute{display: contents !important;}csmbutton{display: contents !important;}csmbutton-view_button{display: contents !important;}csmbutton-view_image{display: contents !important;}csmbutton-container{display: contents !important;}.app {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 0;height: 0;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;user-select: none;}.app * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.app:hover {opacity: 0.5;}</style> <csmbutton-container></csmbutton-container>", false, true),
    getOption(View_button, "csmbutton-view_button", "<div>Hello view_button.html</div>", true, false),
    getOption(View_image, "csmbutton-view_image", "<div>Hello view_image.html</div>", true, false),
    getOption(Container, "csmbutton-container", "<div qsi-inject_to='container' class='app' qsi-click='click'><qsi-subroute name='view'></qsi-subroute></div>", true, false),
];

START_SUB_ROUTES_REGISTRATION();
