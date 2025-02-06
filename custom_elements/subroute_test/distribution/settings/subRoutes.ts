import {APP_SUB_ROUTE, REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";
import {E_SUB_ROUTE, E_SUB_ROUTE_PAGE} from "./subRoutesEnums";
import {Main} from "../modules/elements/main/main";
import {Header} from "../modules/elements/header/header";
import {Footer} from "../modules/elements/footer/footer";

export const START_SUB_ROUTES_REGISTRATION = () => true;

export const app_sub_route = new APP_SUB_ROUTE(E_SUB_ROUTE.TEST, E_SUB_ROUTE_PAGE.MAIN);
app_sub_route
    .addPage(E_SUB_ROUTE_PAGE.MAIN, Main)
    .addPage(E_SUB_ROUTE_PAGE.HEADER, Header)
    .addPage(E_SUB_ROUTE_PAGE.FOOTER, Footer);

REGISTER_SUB_ROUTES(app_sub_route);

// <qsi-subroute name="SubRoute1"></qsi-subroute>
// <qsi-subroute name="SubRoute2"></qsi-subroute>
