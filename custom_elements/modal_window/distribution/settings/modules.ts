import {CSM_BUTTON} from "../../../../custom_elements/button/distribution/settings/modules";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

// <csm-button></csm-button> Custom element for sharing
export const CSM_MODAL_WINDOW: REG_OPTIONS = [
    getOption(AppRoot, "csm-modal-window", "<style>txt-val{display: contents !important;}qsi-bind{display: contents !important;}qsi-subroute{display: contents !important;}csmmodalwindow{display: contents !important;}</style> <csm-button></csm-button>", false, true),
    ...CSM_BUTTON,
];

START_SUB_ROUTES_REGISTRATION();
