import {
    BROWSER_ROUTING,
    makeRoute,
    mergeRouteCollections,
    REGISTER_ROUTES,
    ROUTE_COLLECTION,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {CARS_ROUTES, MAIN_ROUTES} from "./routesEnums";
import {Home} from "../modules/elements/main/home/home";
import {About} from "../modules/elements/main/about/about";
import {Contact} from "../modules/elements/main/contact/contact";
import {Popular_cars} from "../modules/elements/cars/popular_cars/popular_cars";
import {New_cars} from "../modules/elements/cars/new_cars/new_cars";
import {Old_cars} from "../modules/elements/cars/old_cars/old_cars";

export const START_ROUTES_REGISTRATION = () => true;

const main = new ROUTE_COLLECTION(makeRoute(MAIN_ROUTES.HOME, "/main", Home));
main.add(makeRoute(MAIN_ROUTES.ABOUT, "/about", About))
    .add(makeRoute(MAIN_ROUTES.CONTACT, "/contact", Contact));

const cars = new ROUTE_COLLECTION(makeRoute(CARS_ROUTES.POPULAR_CARS, "/cars", Popular_cars));
cars.add(makeRoute(CARS_ROUTES.NEW_CARS, "/new", New_cars))
    .add(makeRoute(CARS_ROUTES.OLD_CARS, "/old", Old_cars));

REGISTER_ROUTES(MAIN_ROUTES.HOME, mergeRouteCollections(main, cars));

setBrowserRoutingMode(BROWSER_ROUTING.SHOW);
