import {Task_controls} from "../modules/elements/main/task_controls/task_controls";
import {Settings_lang} from "../modules/elements/main/menu_list/menu_item/settings_lang/settings_lang";
import {Menu_item} from "../modules/elements/main/menu_list/menu_item/menu_item";
import {Menu_list} from "../modules/elements/main/menu_list/menu_list";
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
import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";

/**
 * The MODULES variable contains an array of options for various modules in the application.
 * Each option is obtained using the getOption function, which takes three parameters:
 * - Class: The class/component name of the module.
 * - Tag: The tag/marker name associated with the module.
 * - Default: The default value to be used if the option is not available.
 *
 * Example usage:
 *
 * const options = MODULES.REG_OPTIONS;
 *
 * options.forEach((option) => {
 *   // Use the module option here
 *   console.log(option);
 * });
 */
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
    getOption(Menu_list, "app-menu_list", "APP_EXAMPLE_____MARKER_MENU_LIST"),
    getOption(Menu_item, "app-menu_item", "APP_EXAMPLE_____MARKER_MENU_ITEM"),
    getOption(Settings_lang, "app-settings_lang", "APP_EXAMPLE_____MARKER_SETTINGS_LANG"),
    getOption(Task_controls, "app-task_controls", "APP_EXAMPLE_____MARKER_TASK_CONTROLS"),
];
