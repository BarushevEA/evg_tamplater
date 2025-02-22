import {ButtonImageState, ButtonState} from "./enums";
import {ButtonOptions, ButtonStateStyles, ImageStateStyles} from "./types";
import {TYPE} from "../../settings/subRoutesEnums";

export const BUTTON_DEFAULT_STYLES: ButtonStateStyles = {
    generalStyle: {
        containerStyle: {
            width: "160px",
            height: "60px",
            margin: "5px",
        },
        textBlockStyle: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Arial",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.DEFAULT]: {
        textBlockStyle: {
        },
        containerStyle: {
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.CLOSE]: {
        textBlockStyle: {
            display: "none",
        },
        containerStyle: {
            width: "60px",
            height: "60px",
            border: "1px solid black",
            borderRadius: "10px",
            flexDirection: "row",
            flexWrap: "nowrap",
            backgroundColor: "red",
            color: "white",
        },
        imageStyle: {
            src: "assets/images/csm_button_close-min.png",
            style:{
                display: "block",
                height: "24px",
                width: "24px",
                margin: "10px",
            },
            altText: "Close",
        },
    },
    [ButtonState.MINIMIZE]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "green",
            color: "white",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.MAXIMIZE]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "blue",
            color: "white",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.DANGER]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "red",
            color: "white",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.SUCCESS]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "green",
            color: "white",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.INFO]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "blue",
            color: "white",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.WARNING]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "yellow",
            color: "black",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.LINK]: {
        textBlockStyle: {
        },
        containerStyle: {
            backgroundColor: "transparent",
            color: "blue",
        },
        imageStyle: {
            style:{
                display: "none",
            }
        },
    },
    [ButtonState.CUSTOM]: {},
};

export const DEFAULT_BUTTON_OPTIONS: ButtonOptions<TYPE.BUTTON> = {
    actionCallback: () => {
        console.log("DEFAULT_BUTTON_OPTIONS");
    },
    type: TYPE.BUTTON,
    state: ButtonState.CLOSE,
    text: "Close",
};

export const IMAGE_DEFAULT_STYLES: ImageStateStyles = {
    generalStyle: {
        containerStyle: {
            width: "160px",
            height: "180px",
            margin: "5px",
        },
        textBlockStyle: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Arial",
        },
        imageStyle: {
            style:{
                display: "block",
            }
        },
    },
    [ButtonImageState.DEFAULT]: {
        textBlockStyle: {
        },
        containerStyle: {
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
        },
        imageStyle: {
            style:{
                display: "block",
            }
        },
    },
    [ButtonImageState.CUSTOM]: {
        textBlockStyle: {
        },
        containerStyle: {
        },
        imageStyle: {
            style:{
                display: "block",
            }
        },
    },
};

export const DEFAULT_IMAGE_OPTIONS: ButtonOptions<TYPE.IMAGE> = {
    actionCallback: () => {
        console.log("DEFAULT_IMAGE_OPTIONS");
    },
    type: TYPE.IMAGE,
    state: ButtonImageState.DEFAULT,
    text: "Button",
};