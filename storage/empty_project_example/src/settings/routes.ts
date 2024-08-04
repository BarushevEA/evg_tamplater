import {BROWSER_ROUTING, REGISTER_ROUTES, setBrowserRoutingMode} from "../../../../libs/elements/rootElements/appRoute";

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

REGISTER_ROUTES(

);

setBrowserRoutingMode(BROWSER_ROUTING.SHOW);
