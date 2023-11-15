import {Task} from "../modules/elements/main/task/task";
import {Task_list} from "../modules/elements/main/task_list/task_list";
import {Baner} from "../modules/elements/main/baner/baner";
import {Current_date} from "../modules/elements/footer/current_date/current_date";
import {Author} from "../modules/elements/footer/author/author";
import {Choice} from "../modules/elements/header/choice/choice";
import {Account} from "../modules/elements/header/account/account";
import {Menu} from "../modules/elements/header/menu/menu";
import {Footer} from "../modules/elements/footer/footer";
import {Main} from "../modules/elements/main/main";
import {Header} from "../modules/elements/header/header";
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Header, "app-header", "APP_EXAMPLE_____MARKER_HEADER"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MARKER_MAIN"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____MARKER_FOOTER"),
    getOption(Menu, "app-menu", "APP_EXAMPLE_____MARKER_MENU"),
    getOption(Account, "app-account", "APP_EXAMPLE_____MARKER_ACCOUNT"),
    getOption(Choice, "app-choice", "APP_EXAMPLE_____MARKER_CHOICE"),
    getOption(Author, "app-author", "APP_EXAMPLE_____MARKER_AUTHOR"),
    getOption(Current_date, "app-current_date", "APP_EXAMPLE_____MARKER_CURRENT_DATE"),
    getOption(Baner, "app-baner", "APP_EXAMPLE_____MARKER_BANER"),
    getOption(Task_list, "app-task_list", "APP_EXAMPLE_____MARKER_TASK_LIST"),
    getOption(Task, "app-task", "APP_EXAMPLE_____MARKER_TASK"),
];
