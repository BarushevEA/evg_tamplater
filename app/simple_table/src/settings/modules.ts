import {getOption, REG_OPTIONS} from "../../../../libs/elements/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {Header} from "../modules/elements/header/header";
import {Footer} from "../modules/elements/footer/footer";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {Main} from "../modules/elements/main/main";
import {Body} from "../modules/elements/body/body";
import {Row} from "../modules/elements/row/row";
import {Cell} from "../modules/elements/cell/cell";

export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Header, "app-header", "APP_EXAMPLE_____TABLE_HEADER"),
    getOption(Main, "app-main", "APP_EXAMPLE_____TABLE_MAIN"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____TABLE_FOOTER"),
    getOption(Body, "app-body", "APP_EXAMPLE_____TABLE_BODY"),
    getOption(Row, "app-row", "APP_EXAMPLE_____TABLE_ROW"),
    getOption(Cell, "app-cell", "APP_EXAMPLE_____TABLE_CELL"),
];
