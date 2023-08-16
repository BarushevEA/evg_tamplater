import {ELEMENT_REG_OPTION, REG_OPTIONS} from "../../../../libs/elements/registrator";
import {AppRoot} from "../modules/elements/appRoot";
import {Header} from "../modules/elements/header";
import {Footer} from "../modules/elements/footer";
import {APP_TAG_NAME} from "../../../../libs/elements/rootElements/managers/APP_TAG_NAME";
import {getCustomElement} from "../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "./templates";
import {Main_1} from "../modules/elements/main_1";
import {Main} from "../modules/elements/main";

const root: ELEMENT_REG_OPTION = {
    tagName: APP_TAG_NAME,
    targetElement: getCustomElement({
        template: customTemplate.get(E_SUBS_TEMPLATE.CONTAINER),
        element: AppRoot,
    })
};

const header: ELEMENT_REG_OPTION = {
    tagName: "app-header",
    targetElement: getCustomElement({
        template: customTemplate.get(E_SUBS_TEMPLATE.HEADER),
        element: Header,
    })
};

const main: ELEMENT_REG_OPTION = {
    tagName: "app-main",
    targetElement: getCustomElement({
        template: customTemplate.get(E_SUBS_TEMPLATE.MAIN),
        element: Main,
    })
};

const main_1: ELEMENT_REG_OPTION = {
    tagName: "app-main_1",
    targetElement: getCustomElement({
        template: customTemplate.get(E_SUBS_TEMPLATE.MAIN_1),
        element: Main_1,
    })
};

const footer: ELEMENT_REG_OPTION = {
    tagName: "app-footer",
    targetElement: getCustomElement({
        template: customTemplate.get(E_SUBS_TEMPLATE.FOOTER),
        element: Footer,
    })
};

export const MODULES: REG_OPTIONS = [
    root,
    header,
    main,
    main_1,
    footer,
];
