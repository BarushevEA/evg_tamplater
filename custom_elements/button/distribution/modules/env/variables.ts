import {ButtonState} from "./enums";
import {ButtonOptions, ButtonStateStyles} from "./types";
import {TYPE} from "../../settings/subRoutesEnums";

export const BUTTON_DEFAULT_STYLES: ButtonStateStyles = {
    generalStyle: {
        containerStyle:{
            width: "160px",
            height: "60px",

            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Arial",
            margin: "5px",
        },
        textBlockStyle:{
        },
        imageStyle: {
        },
    },
    [ButtonState.DEFAULT]: {
        containerStyle: {
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
        }
    },
    [ButtonState.CLOSE]: {
        containerStyle: {
            backgroundColor: "red",
            color: "white",
        }
    },
    [ButtonState.MINIMIZE]: {
        containerStyle: {
            backgroundColor: "green",
            color: "white",
        }
    },
    [ButtonState.MAXIMIZE]: {
        containerStyle: {
            backgroundColor: "blue",
            color: "white",
        }
    },
    [ButtonState.DANGER]: {
        containerStyle: {
            backgroundColor: "red",
            color: "white",
        }
    },
    [ButtonState.SUCCESS]: {
        containerStyle: {
            backgroundColor: "green",
            color: "white",
        }
    },
    [ButtonState.INFO]: {
        containerStyle: {
            backgroundColor: "blue",
            color: "white",
        }
    },
    [ButtonState.WARNING]: {
        containerStyle: {
            backgroundColor: "yellow",
            color: "black",
        }
    },
    [ButtonState.LINK]: {
        containerStyle: {
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