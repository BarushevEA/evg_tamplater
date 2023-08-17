import {runWhenDocumentReady} from "../utils/utils";
import {getCustomElement} from "./rootElements/RootHtmlElement";

export type ELEMENT_REG_OPTION = {
    tagName: string;
    targetElement: CustomElementConstructor;
}

export type TEMPLATE = string;

export type REG_OPTIONS = ELEMENT_REG_OPTION[];

export const HTML_BLOCK = "html-block";
export const ROOT_STYLES: string[] = [`${HTML_BLOCK} {display: contents !important;}`];

export function registerElements(options: REG_OPTIONS): void {
    for (const option of options) {
        ROOT_STYLES.push(`${option.tagName} {display: contents !important;}`);
    }

    runWhenDocumentReady(() => {
        for (const option of options) {
            customElements.define(option.tagName, option.targetElement);
        }
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
