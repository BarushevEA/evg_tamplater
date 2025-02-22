import {log} from "../../../../../libs/utils/utils";
import {ButtonBaseStateStyles, ButtonOptions} from "./types";
import {TYPE} from "../../settings/subRoutesEnums";
import {BUTTON_DEFAULT_STYLES, IMAGE_DEFAULT_STYLES} from "./variables";

export function setStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>): void {
    if (!element) {
        log("setStyle ERROR: element is not defined!");
        return;
    }
    if (!style) {
        log("setStyle ERROR: style is not defined!");
        return;
    }

    for (const [key, value] of Object.entries(style)) {
        element.style[<any>key] = value as string;
    }
}

export function getDefaultStyles(component: any, buttonOption: ButtonOptions<TYPE>): {
    defaultStyles: ButtonBaseStateStyles,
    error: string
} {
    const response = {
        defaultStyles: buttonOption.type === TYPE.BUTTON ? BUTTON_DEFAULT_STYLES : IMAGE_DEFAULT_STYLES,
        error: ""
    }

    if (!response.defaultStyles[buttonOption.state as keyof typeof response.defaultStyles]) {
        response.error = `ERROR: ${component.name} - buttonOption.state: ${buttonOption.state} is not defined!`;
    }

    return response;
}