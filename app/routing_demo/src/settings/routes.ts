import {
    BROWSER_ROUTING,
    makeRoute,
    REGISTER_ROUTES,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {Main1} from "../modules/elements/main1/main1";
import {Main2} from "../modules/elements/main2/main2";
import {Main3} from "../modules/elements/main3/main3";

export const START_ROUTES_REGISTRATION = () => true;

export enum ROUTE_COMMAND {
    MAIN_1 = 'main_1',
    MAIN_2 = 'main_2',
    MAIN_3 = 'main_3',
}

REGISTER_ROUTES(
    ROUTE_COMMAND.MAIN_1,
    [
        makeRoute(ROUTE_COMMAND.MAIN_1, '/main_1', Main1),
        makeRoute(ROUTE_COMMAND.MAIN_2, '/main_2', Main2),
        makeRoute(ROUTE_COMMAND.MAIN_3, '/main_3', Main3),
    ]
);

setBrowserRoutingMode(BROWSER_ROUTING.HIDDEN);
