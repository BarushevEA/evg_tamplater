import {makeRoute, REGISTER_ROUTES} from "../../../../libs/elements/rootElements/appRoute";
import {Main} from "../modules/elements/main/main";
import {Page1} from "../modules/elements/page1/page1";
import {Page2} from "../modules/elements/page2/page2";
import {Page3} from "../modules/elements/page3/page3";

export const START_ROUTES_REGISTRATION = () => true;

/**
 * If you are implementing routing, please register your routes following the commented examples below.
 *
 * export enum ROUTE_COMMAND {
 *     MAIN = "MAIN",
 * }
 *
 * REGISTER_ROUTES(
 * ROUTE_COMMAND.MAIN,
 *   [
 *     makeRoute(ROUTE_COMMAND.MAIN, "/main", Main)
 *   ]
 * );
 *
 */

export enum ROUTE_COMMAND {
    MAIN = "MAIN",
    PAGE1 = "PAGE1",
    PAGE2 = "PAGE2",
    PAGE3 = "PAGE3",
}

REGISTER_ROUTES(
    ROUTE_COMMAND.MAIN,
    [
        makeRoute(ROUTE_COMMAND.MAIN, "/main", Main),
        makeRoute(ROUTE_COMMAND.PAGE1, "/page1", Page1),
        makeRoute(ROUTE_COMMAND.PAGE2, "/page2", Page2),
        makeRoute(ROUTE_COMMAND.PAGE3, "/page3", Page3),
    ]
);
