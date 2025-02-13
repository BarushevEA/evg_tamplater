import {getCustomElement} from "../rootElements/RootHtmlElement";
import {Observable} from "../../Observables";
import {runWhenDocumentReady} from "../rootElements/rootUtils";

export type QSI_APP_COMPONENT = {
    qsi_app_tag_name: string,
}

export type ELEMENT_REG_OPTION = {
    isCustomElement?: boolean;
    tagName: string;
    target: CustomElementConstructor;
    element: QSI_APP_COMPONENT;
}

export type TEMPLATE = string;

export type REG_OPTIONS = ELEMENT_REG_OPTION[];

const ignoreElement = "{display: contents !important;}";
export const HTML_BLOCK = "html-block";
export const ROOT_STYLES: string[] = [`${HTML_BLOCK} ${ignoreElement}`];

export const IS_ELEMENTS_REGISTERED$ = new Observable<boolean>(false);

export const registerElements = (opts: REG_OPTIONS, isUsersElements?: boolean): void => {
    for (let i = 0; i < opts.length; i++) {
        opts[i].element.qsi_app_tag_name = opts[i].tagName;

        if (opts[i].isCustomElement) continue;
        ROOT_STYLES.push(`${opts[i].tagName}${ignoreElement}`);
    }

    runWhenDocumentReady(() => {
        for (let i = 0; i < opts.length; i++) customElements.define(opts[i].tagName, opts[i].target);
        if (isUsersElements) IS_ELEMENTS_REGISTERED$.next(true);
    });
};

export const getRootStyles = (): string => {
    return ROOT_STYLES.join("");
};

export const getOption = (element: any, tagName: string, template: TEMPLATE, isCustomElement?: boolean, isShadow?: boolean): ELEMENT_REG_OPTION => {
    return {
        isCustomElement: isCustomElement,
        tagName: tagName,
        target: getCustomElement({
            template: template,
            element: element,
            isShadow: isShadow,
        }),
        element: element as QSI_APP_COMPONENT
    };
};
