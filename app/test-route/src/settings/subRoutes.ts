import {REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";
import {Header} from "../modules/elements/header/header";
import {Additional_header} from "../modules/elements/additional_header/additional_header";
import {E_SUB_ROUTE, SUB_FOOTER, SUB_HEADER} from "./subRoutesEnums";
import {Main_footer} from "../modules/elements/main_footer/main_footer";
import {Additional_footer} from "../modules/elements/additional_footer/additional_footer";

export const START_SUB_ROUTES_REGISTRATION = () => true;

REGISTER_SUB_ROUTES(
    {
        name: E_SUB_ROUTE.HEADER,
        defaultPage: SUB_HEADER.Header,
        pages: [
            {
                name: SUB_HEADER.Header,
                page: Header
            },
            {
                name: SUB_HEADER.AdditionalHeader,
                page: Additional_header
            }
        ]
    }
);

REGISTER_SUB_ROUTES(
    {
        name: E_SUB_ROUTE.FOOTER,
        defaultPage: SUB_FOOTER.MainFooter,
        pages: [
            {
                name: SUB_FOOTER.MainFooter,
                page: Main_footer
            },
            {
                name: SUB_FOOTER.AdditionalFooter,
                page: Additional_footer
            }
        ]
    },
);

// <qsi-subroute name="SubRoute1"></qsi-subroute>
// <qsi-subroute name="SubRoute2"></qsi-subroute>
