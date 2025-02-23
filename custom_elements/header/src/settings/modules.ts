import {Language} from "../modules/elements/container/language/language";
import {Themes} from "../modules/elements/container/themes/themes";
import {Navigation} from "../modules/elements/container/navigation/navigation";
import {Logo} from "../modules/elements/container/logo/logo";
import {Container} from "../modules/elements/container/container";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {START_ROUTES_REGISTRATION} from "./routes";
import {START_SUB_ROUTES_REGISTRATION} from "./subRoutes";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Container, "app-container", "APP_EXAMPLE_____MARKER_CONTAINER"),
    getOption(Logo, "app-logo", "APP_EXAMPLE_____MARKER_LOGO"),
    getOption(Navigation, "app-navigation", "APP_EXAMPLE_____MARKER_NAVIGATION"),
    getOption(Themes, "app-themes", "APP_EXAMPLE_____MARKER_THEMES"),
    getOption(Language, "app-language", "APP_EXAMPLE_____MARKER_LANGUAGE"),
];

START_ROUTES_REGISTRATION();
START_SUB_ROUTES_REGISTRATION();
