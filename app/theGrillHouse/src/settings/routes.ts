import {
    BROWSER_ROUTING,
    makeRoute,
    REGISTER_ROUTES,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {Mainpage} from "../modules/elements/main/mainpage/mainpage";
import {Fish} from "../modules/elements/main/fish/fish";
import {Meat} from "../modules/elements/main/meat/meat";
import {Mushroom} from "../modules/elements/main/mushroom/mushroom";
import {Vegetable} from "../modules/elements/main/vegetable/vegetable";

export const START_ROUTES_REGISTRATION = () => true;

export enum ROUTE_COMMAND {
    MAIN = 'MAINPAGE',
    FISH = 'FISH',
    MEAT = 'MEAT',
    MUSHROOM = 'MUSHROOM',
    VEGETABLE = 'VEGETABLE',
}

REGISTER_ROUTES(
    ROUTE_COMMAND.MAIN,
    [
        makeRoute(ROUTE_COMMAND.MAIN, "/main", Mainpage),
        makeRoute(ROUTE_COMMAND.FISH, "/fish", Fish),
        makeRoute(ROUTE_COMMAND.MEAT, "/meat", Meat),
        makeRoute(ROUTE_COMMAND.MUSHROOM, "/mushroom", Mushroom),
        makeRoute(ROUTE_COMMAND.VEGETABLE, "/vegetable", Vegetable),
    ]
);

setBrowserRoutingMode(BROWSER_ROUTING.SHOW);
