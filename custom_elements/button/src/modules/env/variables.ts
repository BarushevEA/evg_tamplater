import {ButtonState} from "./enums";
import {ButtonOptions, ButtonStateStyles} from "./types";
import {TYPE} from "../../settings/subRoutesEnums";

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