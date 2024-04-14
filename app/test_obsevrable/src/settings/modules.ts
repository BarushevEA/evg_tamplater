import {Main} from "../modules/elements/main/main";
import {Listener4} from "../modules/elements/listener4/listener4";
import {Listener3} from "../modules/elements/listener3/listener3";
import {Listener2} from "../modules/elements/listener2/listener2";
import {Listener1} from "../modules/elements/listener1/listener1";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Listener1, "app-listener1", "APP_EXAMPLE_____MARKER_LISTENER1"),
    getOption(Listener2, "app-listener2", "APP_EXAMPLE_____MARKER_LISTENER2"),
    getOption(Listener3, "app-listener3", "APP_EXAMPLE_____MARKER_LISTENER3"),
    getOption(Listener4, "app-listener4", "APP_EXAMPLE_____MARKER_LISTENER4"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
];
