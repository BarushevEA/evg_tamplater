import {ButtonImageState, ButtonState} from "./enums";
import {ButtonOptions, ButtonStateStyles, ImageStateStyles} from "./types";
import {TYPE} from "../../settings/subRoutesEnums";

export const BUTTON_DEFAULT_STYLES: ButtonStateStyles = {
    generalStyle: {
        containerStyle: {
            margin: "5px",
        },
        textBlockStyle: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Arial",
        },
        imageStyle: {
            style: {
                display: "none",
            }
        },
    },
    [ButtonState.DEFAULT]: {
        textBlockStyle: {},
        containerStyle: {
            width: "160px",
            height: "60px",
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
        },
        imageStyle: {
            style: {
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
            backgroundColor: "rgb(255 56 56)",
            color: "white",
        },
        imageStyle: {
            src: "assets/images/csm_button_close-min.png",
            style: {
                display: "block",
                height: "50%",
                width: "50%",
            },
            altText: "Close",
        },
    },
    [ButtonState.MINIMIZE]: {
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
            backgroundColor: "rgb(255,255,255)",
        },
        imageStyle: {
            src: "assets/images/csm_button_minimize-min.png",
            style: {
                display: "block",
                height: "50%",
                width: "50%",
            },
            altText: "Close",
        },
    },
    [ButtonState.MAXIMIZE]: {
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
            backgroundColor: "rgb(255,255,255)",
        },
        imageStyle: {
            src: "assets/images/csm_button_maximize-min.png",
            style: {
                display: "block",
                height: "50%",
                width: "50%",
            },
            altText: "Close",
        },
    },
    [ButtonState.DANGER]: {
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
            backgroundColor: "rgb(255 56 56)",
        },
        imageStyle: {
            src: "assets/images/csm_button_danger-min.png",
            style: {
                display: "block",
                height: "65%",
                width: "65%",
            },
            altText: "Close",
        },
    },
    [ButtonState.SUCCESS]: {
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
            backgroundColor: "rgb(94 190 122)",
        },
        imageStyle: {
            src: "assets/images/csm_button_succes-min.png",
            style: {
                display: "block",
                height: "65%",
                width: "65%",
            },
            altText: "Close",
        },
    },
    [ButtonState.INFO]: {
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
            backgroundColor: "#546eff",
        },
        imageStyle: {
            src: "assets/images/csm_button_info-min.png",
            style: {
                display: "block",
                height: "65%",
                width: "65%",
            },
            altText: "Close",
        },
    },
    [ButtonState.WARNING]: {
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
            backgroundColor: "orange",
        },
        imageStyle: {
            src: "assets/images/csm_button_warning-min.png",
            style: {
                display: "block",
                height: "65%",
                width: "65%",
            },
            altText: "Close",
        },
    },
    [ButtonState.LINK]: {
        textBlockStyle: {},
        containerStyle: {
            width: "160px",
            height: "60px",
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
            borderBottom: "1px solid black",
            color: "black",
        },
        imageStyle: {
            style: {
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
            style: {
                display: "block",
            }
        },
    },
    [ButtonImageState.DEFAULT]: {
        textBlockStyle: {},
        containerStyle: {
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
        },
        imageStyle: {
            style: {
                display: "block",
            }
        },
    },
    [ButtonImageState.CUSTOM]: {
        textBlockStyle: {},
        containerStyle: {},
        imageStyle: {
            style: {
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