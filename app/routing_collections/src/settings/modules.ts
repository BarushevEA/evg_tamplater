import {Popular_cars_details} from "../modules/elements/cars/popular_cars/popular_cars_details/popular_cars_details";
import {Popular_cars_list} from "../modules/elements/cars/popular_cars/popular_cars_list/popular_cars_list";
import {Contentelement} from "../modules/elements/main/contentelement/contentelement";
import {Button} from "../modules/elements/left_sidebar/button/button";
import {Left_sidebar} from "../modules/elements/left_sidebar/left_sidebar";
import {Footer} from "../modules/elements/footer/footer";
import {Header} from "../modules/elements/header/header";
import {Popular_cars} from "../modules/elements/cars/popular_cars/popular_cars";
import {New_cars} from "../modules/elements/cars/new_cars/new_cars";
import {Old_cars} from "../modules/elements/cars/old_cars/old_cars";
import {About} from "../modules/elements/main/about/about";
import {Home} from "../modules/elements/main/home/home";
import {Contact} from "../modules/elements/main/contact/contact";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Contact, "app-contact", "APP_EXAMPLE_____MARKER_CONTACT"),
    getOption(Home, "app-home", "APP_EXAMPLE_____MARKER_HOME"),
    getOption(About, "app-about", "APP_EXAMPLE_____MARKER_ABOUT"),
    getOption(Old_cars, "app-old_cars", "APP_EXAMPLE_____MARKER_OLD_CARS"),
    getOption(New_cars, "app-new_cars", "APP_EXAMPLE_____MARKER_NEW_CARS"),
    getOption(Popular_cars, "app-popular_cars", "APP_EXAMPLE_____MARKER_POPULAR_CARS"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
    getOption(Left_sidebar, "app-left_sidebar", "APP_EXAMPLE_____MARKER_LEFT_SIDEBAR"),
    getOption(Button, "app-button", "APP_EXAMPLE_____MARKER_BUTTON"),
    getOption(Contentelement, "app-contentelement", "APP_EXAMPLE_____MARKER_CONTENTELEMENT"),
    getOption(Popular_cars_list, "app-popular_cars_list", "APP_EXAMPLE_____MARKER_POPULAR_CARS_LIST"),
    getOption(Popular_cars_details, "app-popular_cars_details", "APP_EXAMPLE_____MARKER_POPULAR_CARS_DETAILS"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
