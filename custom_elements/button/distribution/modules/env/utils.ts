import {log} from "../../../../../libs/utils/utils";
import {ButtonBaseStateStyles, ButtonComponent, ButtonOptions} from "./types";
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

export function getDefaultStyles(component: ButtonComponent, buttonOption: ButtonOptions<TYPE>): {
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

export function setImage(component: ButtonComponent, defaultStyles: ButtonBaseStateStyles, buttonOption: ButtonOptions<TYPE>, isGeneralStyle: boolean = false) {
    setBaseImageOptions(isGeneralStyle, defaultStyles, buttonOption, component);
    setImageExtension(component, buttonOption);
}

function setBaseImageOptions(isGeneralStyle: boolean, defaultStyles: ButtonBaseStateStyles, buttonOption: ButtonOptions<TYPE>, component: ButtonComponent) {
    let imageOption = isGeneralStyle ? defaultStyles.generalStyle.imageStyle : defaultStyles[buttonOption.state].imageStyle;
    if (buttonOption.state === "custom") {
        if (buttonOption.customOptions && buttonOption.customOptions.imageStyle) {
            imageOption = buttonOption.customOptions.imageStyle;
        }
    }

    if (!imageOption) {
        log(`ERROR: ${component.name} - imageOption is not defined!`);
        return;
    }

    if (imageOption.style) {
        setStyle(component.imageElement, defaultStyles[buttonOption.state].imageStyle.style);
    }

    if (imageOption.src) {
        component.image = imageOption.src;
    }

    if (imageOption.altText) {
        component.imageElement.alt = imageOption.altText;
    }
}

function setImageExtension(component: ButtonComponent, buttonOption: ButtonOptions<TYPE>) {
    if (!buttonOption.extension) return;
    if (!buttonOption.extension.imageStyle) return;

    const imageOptions = buttonOption.extension.imageStyle;
    if (imageOptions.style) {
        setStyle(component.imageElement, imageOptions.style);
    }
    if (imageOptions.src) {
        component.image = imageOptions.src;
    }
    if (imageOptions.altText) {
        component.imageElement.alt = imageOptions.altText;
    }
}

export function setText(component: ButtonComponent, defaultStyles: ButtonBaseStateStyles, buttonOption: ButtonOptions<TYPE>, isGeneralStyle: boolean = false) {
    setBaseOptions(isGeneralStyle, component, defaultStyles, buttonOption);
    setExtension(component, buttonOption);
}

function setBaseOptions(isGeneralStyle: boolean, component: ButtonComponent, defaultStyles: ButtonBaseStateStyles, buttonOption: ButtonOptions<TYPE>) {
    switch (true) {
        case isGeneralStyle:
            setStyle(component.textElement, defaultStyles.generalStyle.textBlockStyle);
            break;
        case buttonOption.state === "custom":
            if (buttonOption.customOptions && buttonOption.customOptions.textBlockStyle) {
                setStyle(component.textElement, buttonOption.customOptions.textBlockStyle);
            }
            break;
        case buttonOption.state !== "custom":
            setStyle(component.textElement, defaultStyles[buttonOption.state].textBlockStyle);
            break;
    }

    if (typeof buttonOption.text === "string") {
        component.text = buttonOption.text;
    }
}

function setExtension(component: ButtonComponent, buttonOption: ButtonOptions<TYPE>) {
    if (!buttonOption.extension) return;
    if (!buttonOption.extension.textBlockStyle) return;

    setStyle(component.textElement, buttonOption.extension.textBlockStyle);
}
