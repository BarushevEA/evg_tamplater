import {TemplateMap, TemplatesHandler} from "../../../../libs/utils/Templater";


export enum E_SUBS_TEMPLATE {
    STYLE,
    CONTAINER,
    HEADER,
    MAIN,
    FOOTER,
}

const templateMap: TemplateMap = {
    [E_SUBS_TEMPLATE.STYLE]: "APP_EXAMPLE__STYLE",
    [E_SUBS_TEMPLATE.CONTAINER]: "APP_EXAMPLE__CONTAINER",
    [E_SUBS_TEMPLATE.HEADER]: "APP_EXAMPLE__HEADER",
    [E_SUBS_TEMPLATE.MAIN]: "APP_EXAMPLE__MAIN",
    [E_SUBS_TEMPLATE.FOOTER]: "APP_EXAMPLE__FOOTER",
}

export const customTemplate = new TemplatesHandler(templateMap);
