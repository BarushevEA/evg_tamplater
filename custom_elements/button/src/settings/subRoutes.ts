import {APP_SUB_ROUTE, REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";
import {E_SUB_ROUTE, PAGE} from "./subRoutesEnums";
import {View_button} from "../modules/elements/view_button/view_button";
import {View_image} from "../modules/elements/view_image/view_image";

export const START_SUB_ROUTES_REGISTRATION = () => true;

export const app_sub_route = new APP_SUB_ROUTE(E_SUB_ROUTE.VIEW, PAGE.BUTTON);
app_sub_route
    .addPage(PAGE.BUTTON, View_button)
    .addPage(PAGE.IMAGE, View_image);

REGISTER_SUB_ROUTES(app_sub_route);

// <qsi-subroute name="SubRoute1"></qsi-subroute>
// <qsi-subroute name="SubRoute2"></qsi-subroute>
