import {Main} from "../modules/elements/main/main";
import {Page1} from "../modules/elements/page1/page1";
import {Page2} from "../modules/elements/page2/page2";
import {Page3} from "../modules/elements/page3/page3";
import {REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";

export const START_SUB_ROUTES_REGISTRATION = () => true;

export enum SUB_ROUTE {
    SubRoute1 = "SubRoute1",
    SubRoute2 = "SubRoute2"
}

export enum SUB_ROUTE_PAGE {
    Main = "Main",
    Page1 = "Page1",
    Page2 = "Page2",
    Page3 = "Page3"
}

REGISTER_SUB_ROUTES(
    {
        name: SUB_ROUTE.SubRoute1,
        defaultPage: SUB_ROUTE_PAGE.Main,
        pages: [
            {
                name: SUB_ROUTE_PAGE.Main,
                page: Main
            },
            {
                name: SUB_ROUTE_PAGE.Page1,
                page: Page1
            }
        ]
    },
    {
        name: SUB_ROUTE.SubRoute2,
        defaultPage: SUB_ROUTE_PAGE.Page2,
        pages: [
            {
                name: SUB_ROUTE_PAGE.Page2,
                page: Page2
            },
            {
                name: SUB_ROUTE_PAGE.Page3,
                page: Page3
            }
        ]
    }
);

// <qsi-subroute name="SubRoute1"></qsi-subroute>
// <qsi-subroute name="SubRoute2"></qsi-subroute>
