import {Contacts} from "../modules/elements/contacts/contacts";
import {About} from "../modules/elements/about/about";
import {Footer} from "../modules/elements/footer/footer";
import {Header} from "../modules/elements/header/header";
import {Main} from "../modules/elements/main/main";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
    getOption(About, "app-about", "APP_EXAMPLE_____MARKER_ABOUT"),
    getOption(Contacts, "app-contacts", "APP_EXAMPLE_____MARKER_CONTACTS"),
];

START_ROUTES_REGISTRATION();
