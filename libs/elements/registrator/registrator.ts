import {runWhenDocumentReady} from "../../utils/utils";
import {getCustomElement} from "../rootElements/RootHtmlElement";

export type ELEMENT_REG_OPTION = {
    tagName: string;
    targetElement: CustomElementConstructor;
}

export type TEMPLATE = string;

export type REG_OPTIONS = ELEMENT_REG_OPTION[];

const ignoreElement = "{display: contents !important;}";
export const HTML_BLOCK = "html-block";
export const ROOT_STYLES: string[] = [`${HTML_BLOCK} ${ignoreElement}`];

export function registerElements(opts: REG_OPTIONS): void {
    for (let i = 0; i < opts.length; i++) ROOT_STYLES.push(`${opts[i].tagName} ${ignoreElement}`);

    runWhenDocumentReady(() => {
        for (let i = 0; i < opts.length; i++) customElements.define(opts[i].tagName, opts[i].targetElement);
    });
}

export function getRootStyles(): string {
    return ROOT_STYLES.join("");
}

export function getOption(element: any, tagName: string, template: TEMPLATE): ELEMENT_REG_OPTION {
    return {
        tagName: tagName,
        targetElement: getCustomElement({
            template: template,
            element: element,
        })
    };
}
