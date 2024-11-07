import {REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";
import {Header} from "../modules/elements/header/header";
import {Additional_header} from "../modules/elements/additional_header/additional_header";
import {SUB_ROUTE, SUB_ROUTE_PAGE} from "./subRoutesEnums";

export const START_SUB_ROUTES_REGISTRATION = () => true;

REGISTER_SUB_ROUTES(
    {
        name: SUB_ROUTE.HEADER,
        defaultPage: SUB_ROUTE_PAGE.Header,
        pages: [
            {
                name: SUB_ROUTE_PAGE.Header,
                page: Header
            },
            {
                name: SUB_ROUTE_PAGE.AdditionalHeader,
                page: Additional_header
            }
        ]
    }
);

// <qsi-subroute name="SubRoute1"></qsi-subroute>
// <qsi-subroute name="SubRoute2"></qsi-subroute>
