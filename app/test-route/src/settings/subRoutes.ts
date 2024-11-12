import {APP_SUB_ROUTE, REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";
import {Header} from "../modules/elements/header/header";
import {Additional_header} from "../modules/elements/additional_header/additional_header";
import {E_SUB_ROUTE, SUB_ROUTE_PAGE} from "./subRoutesEnums";
import {Main_footer} from "../modules/elements/main_footer/main_footer";
import {Additional_footer} from "../modules/elements/additional_footer/additional_footer";

export const START_SUB_ROUTES_REGISTRATION = () => true;

const header = new APP_SUB_ROUTE(E_SUB_ROUTE.HEADER, SUB_ROUTE_PAGE.Header);
header
    .addPage(SUB_ROUTE_PAGE.Header, Header)
    .addPage(SUB_ROUTE_PAGE.AdditionalHeader, Additional_header);

const footer = new APP_SUB_ROUTE(E_SUB_ROUTE.FOOTER, SUB_ROUTE_PAGE.MainFooter);
footer
    .addPage(SUB_ROUTE_PAGE.MainFooter, Main_footer)
    .addPage(SUB_ROUTE_PAGE.AdditionalFooter, Additional_footer);

REGISTER_SUB_ROUTES(header, footer);

// <qsi-subroute name="header"></qsi-subroute>
// <qsi-subroute name="footer"></qsi-subroute>
