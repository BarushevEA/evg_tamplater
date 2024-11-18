import {
    BROWSER_ROUTING, mergeRouteCollections,
    REGISTER_ROUTES, ROUTE_COLLECTION,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {Mainpage} from "../modules/elements/main/mainpage/mainpage";
import {Fish} from "../modules/elements/main/fish/fish";
import {Meat} from "../modules/elements/main/meat/meat";
import {Mushroom} from "../modules/elements/main/mushroom/mushroom";
import {Vegetable} from "../modules/elements/main/vegetable/vegetable";
import {ROUTE_COMMAND} from "./routeEnum";
import {Recipepage} from "../modules/elements/main/recipepage/recipepage";

export const START_ROUTES_REGISTRATION = () => true;

const main = new ROUTE_COLLECTION(ROUTE_COMMAND.MAIN, "/main", Mainpage);
const fish = new ROUTE_COLLECTION(ROUTE_COMMAND.FISH, "/fish", Fish);
const meat = new ROUTE_COLLECTION(ROUTE_COMMAND.MEAT, "/meat", Meat);
const mushroom = new ROUTE_COLLECTION(ROUTE_COMMAND.MUSHROOM, "/mushroom", Mushroom);
const vegetable = new ROUTE_COLLECTION(ROUTE_COMMAND.VEGETABLE, "/vegetable", Vegetable);
const recipePage = new ROUTE_COLLECTION(ROUTE_COMMAND.RECIPEPAGE, "/recipepage", Recipepage)

REGISTER_ROUTES(
    ROUTE_COMMAND.MAIN,
    mergeRouteCollections(main, fish, meat, mushroom, vegetable, recipePage)
);

setBrowserRoutingMode(BROWSER_ROUTING.HIDDEN);

