import {
    BROWSER_ROUTING,
    makeRoute,
    REGISTER_ROUTES,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {Main} from "../modules/elements/main/main";
import {About} from "../modules/elements/about/about";
import {Contacts} from "../modules/elements/contacts/contacts";

export const START_ROUTES_REGISTRATION = () => true;

export enum ROUTE_COMMAND {
    MAIN = "MAIN",
    ABOUT = "ABOUT",
    CONTACTS = "CONTACTS",
}

REGISTER_ROUTES(
    ROUTE_COMMAND.MAIN,
    [
        makeRoute(ROUTE_COMMAND.MAIN, "/main", Main),
        makeRoute(ROUTE_COMMAND.ABOUT, "/about", About),
        makeRoute(ROUTE_COMMAND.CONTACTS, "/contacts", Contacts),
    ]
);

setBrowserRoutingMode(BROWSER_ROUTING.HIDDEN);
