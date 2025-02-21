import {TYPE} from "../../settings/subRoutesEnums";
import {ButtonState} from "./enums";

export type ButtonTypeOptions = {
    style?: Partial<CSSStyleDeclaration>;
    iconOptions?: ImageTypeOptions;
};

export type ImageTypeOptions = {
    style?: Partial<CSSStyleDeclaration>;
    altText?: string;
    src: string;
};

export type ButtonOptions<T extends TYPE> = {
    actionCallback: () => void;
    type: T;
    typeOptionsBeforeClick?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    typeOptionsAfterClick?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    typeOptionsOnClick?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    state: ButtonState;
    text?: string; // Text может быть опциональным для иконок
};

export type ButtonStateStyles = {
    generalStyle: Partial<CSSStyleDeclaration>;
    [ButtonState.DEFAULT]: ButtonTypeOptions;
    [ButtonState.CLOSE]: ButtonTypeOptions;
    [ButtonState.MINIMIZE]: ButtonTypeOptions;
    [ButtonState.MAXIMIZE]: ButtonTypeOptions;
    [ButtonState.DANGER]: ButtonTypeOptions;
    [ButtonState.SUCCESS]: ButtonTypeOptions;
    [ButtonState.INFO]: ButtonTypeOptions;
    [ButtonState.WARNING]: ButtonTypeOptions;
    [ButtonState.LINK]: ButtonTypeOptions;
    [ButtonState.CUSTOM]: ButtonTypeOptions;
};

export const BUTTON_DEFAULT_STYLES: ButtonStateStyles = {
    generalStyle: {
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        width: "160px",
        height: "60px",

        // cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Arial",
        margin: "5px",
    },
    [ButtonState.DEFAULT]: {
        style: {
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
        }
    },
    [ButtonState.CLOSE]: {
        style: {
            backgroundColor: "red",
            color: "white",
        }
    },
    [ButtonState.MINIMIZE]: {
        style: {
            backgroundColor: "green",
            color: "white",
        }
    },
    [ButtonState.MAXIMIZE]: {
        style: {
            backgroundColor: "blue",
            color: "white",
        }
    },
    [ButtonState.DANGER]: {
        style: {
            backgroundColor: "red",
            color: "white",
        }
    },
    [ButtonState.SUCCESS]: {
        style: {
            backgroundColor: "green",
            color: "white",
        }
    },
    [ButtonState.INFO]: {
        style: {
            backgroundColor: "blue",
            color: "white",
        }
    },
    [ButtonState.WARNING]: {
        style: {
            backgroundColor: "yellow",
            color: "black",
        }
    },
    [ButtonState.LINK]: {
        style: {
            backgroundColor: "transparent",
            color: "blue",
        }
    },
    [ButtonState.CUSTOM]: {},
};

export const DEFAULT_BUTTON_OPTIONS: ButtonOptions<TYPE.BUTTON> = {
    actionCallback: () => {
        console.log("DEFAULT_BUTTON_OPTIONS");
    },
    type: TYPE.BUTTON,
    state: ButtonState.DEFAULT,
    text: "Button",
};
