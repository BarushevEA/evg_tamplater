import {Recipelink} from "../modules/elements/main/recipelink/recipelink";
import {Mainpage} from "../modules/elements/main/mainpage/mainpage";
import {Fish} from "../modules/elements/main/fish/fish";
import {Vegetable} from "../modules/elements/main/vegetable/vegetable";
import {Meat} from "../modules/elements/main/meat/meat";
import {Mushroom} from "../modules/elements/main/mushroom/mushroom";
import {Navelement} from "../modules/elements/header/nav/navelement/navelement";
import {Nav} from "../modules/elements/header/nav/nav";
import {Search} from "../modules/elements/header/search/search";
import {Footer} from "../modules/elements/footer/footer";
import {Main} from "../modules/elements/main/main";
import {Header} from "../modules/elements/header/header";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
    getOption(Search, "app-search", "APP_EXAMPLE_____MARKER_SEARCH"),
    getOption(Nav, "app-nav", "APP_EXAMPLE_____MARKER_NAV"),
    getOption(Navelement, "app-navelement", "APP_EXAMPLE_____MARKER_NAVELEMENT"),
    getOption(Mushroom, "app-mushroom", "APP_EXAMPLE_____MARKER_MUSHROOM"),
    getOption(Meat, "app-meat", "APP_EXAMPLE_____MARKER_MEAT"),
    getOption(Vegetable, "app-vegetable", "APP_EXAMPLE_____MARKER_VEGETABLE"),
    getOption(Fish, "app-fish", "APP_EXAMPLE_____MARKER_FISH"),
    getOption(Mainpage, "app-mainpage", "APP_EXAMPLE_____MARKER_MAINPAGE"),
    getOption(Recipelink, "app-recipelink", "APP_EXAMPLE_____MARKER_RECIPELINK"),
];

START_ROUTES_REGISTRATION();
