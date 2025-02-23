import {ButtonImageState, ButtonState} from "../../../../../custom_elements/button/distribution/modules/env/enums";
import {ButtonOptions} from "../../../../../custom_elements/button/distribution/modules/env/types";
import {TYPE} from "../../../../../custom_elements/button/distribution/settings/subRoutesEnums";
import {IChannel, OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {log} from "../../../../../libs/utils/utils";
import {parseCssBlock} from "../../../../../libs/utils/cssParser";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    buttons: ButtonOptions<TYPE.BUTTON>[];
    images: ButtonOptions<TYPE.IMAGE>[];
    separateButton: IChannel;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
        this.init();
    }

    private init() {
        this.buttons = [
            {
                actionCallback: () => {
                    log("CLOSE");
                },
                type: TYPE.BUTTON,
                state: ButtonState.CLOSE,
            },
            {
                actionCallback: () => {
                    log("CLOSE MINI");
                },
                type: TYPE.BUTTON,
                state: ButtonState.CLOSE,
                extension: {
                    containerStyle: {
                        width: "48px",
                        height: "48px",
                    }
                }
            },
            {
                actionCallback: () => {
                    log("CLOSE MICRO");
                },
                type: TYPE.BUTTON,
                state: ButtonState.CLOSE,
                extension: {
                    containerStyle: {
                        width: "32px",
                        height: "32px",
                        borderRadius: "5px",
                    }
                }
            },
            {
                actionCallback: () => {
                    log("CLICK ME 1");
                },
                type: TYPE.BUTTON,
                state: ButtonState.DEFAULT,
                text: "CLICK ME 1",
            },
            {
                actionCallback: () => {
                    log("CLICK ME 2");
                },
                extension: {
                    containerStyle: parseCssBlock(`
.extension-container {
    background: rgb(255 56 56);
}
                  `)
                },
                type: TYPE.BUTTON,
                state: ButtonState.DEFAULT,
                text: "CLICK ME 2",
            },
            {
                actionCallback: () => {
                    log("CLICK ME 3");
                },
                extension: {
                    containerStyle: parseCssBlock(`
.extension-container {
    margin: 5px;
    width: 160px;
    height: 60px;
    border: none;
    border-radius: 7px;
    background: rgb(56 165 255);
}
                  `)
                },
                type: TYPE.BUTTON,
                state: ButtonState.DEFAULT,
                text: "CLICK ME 3",
            },
            {
                actionCallback: () => {
                    log("CLICK ME 4");
                },
                extension: {
                    containerStyle: parseCssBlock(`
.extension-container {
    margin: 5px;
    width: 160px;
    height: 60px;
    border: none;
    border-radius: 7px;
    background: rgb(13 12 148);
}
                  `),
                    textBlockStyle: parseCssBlock(`
    font-size: 20px;
    font-weight: bold;
    font-family: Arial;
    color: #afafaf;
                    `)
                },
                type: TYPE.BUTTON,
                state: ButtonState.DEFAULT,
                text: "CLICK ME 4",
            },
            {
                actionCallback: () => {
                    log("WARNING");
                },
                type: TYPE.BUTTON,
                state: ButtonState.WARNING,
                text: "WARNING",
            },
            {
                actionCallback: () => {
                    log("INFO");
                },
                type: TYPE.BUTTON,
                state: ButtonState.INFO,
                text: "INFO",
            },
            {
                actionCallback: () => {
                    log("INFO MINI");
                },
                type: TYPE.BUTTON,
                state: ButtonState.INFO,
                text: "i",
                extension: {
                    containerStyle: parseCssBlock(`
    width: 32px;
    height: 32px;
                    `),
                    textBlockStyle: {
                        display: "block",
                        fontSize: "28px",
                    },
                    imageStyle: {
                        style: {
                            display: "none"
                        }
                    }
                }
            },
            {
                actionCallback: () => {
                    log("SUCCESS");
                },
                type: TYPE.BUTTON,
                state: ButtonState.SUCCESS,
                text: "SUCCESS",
            },
            {
                actionCallback: () => {
                    log("DANGER");
                },
                type: TYPE.BUTTON,
                state: ButtonState.DANGER,
                text: "DANGER",
            },
            {
                actionCallback: () => {
                    log("MINIMIZE");
                },
                type: TYPE.BUTTON,
                state: ButtonState.MINIMIZE,
                text: "MINIMIZE",
            },
            {
                actionCallback: () => {
                    log("MAXIMIZE");
                },
                type: TYPE.BUTTON,
                state: ButtonState.MAXIMIZE,
                text: "MAXIMIZE",
            },
            {
                actionCallback: () => {
                    log("LINK");
                },
                type: TYPE.BUTTON,
                state: ButtonState.LINK,
                text: "LINK",
            }
        ];
        this.images = [
            {
                actionCallback: () => {
                    log("IMAGE DEFAULT 1");
                },
                type: TYPE.IMAGE,
                state: ButtonImageState.DEFAULT,
                text: "IMAGE 1",
            },
            {
                actionCallback: () => {
                    log("IMAGE DEFAULT 2");
                },
                type: TYPE.IMAGE,
                state: ButtonImageState.DEFAULT,
                text: "IMAGE 2",
            },
            {
                actionCallback: () => {
                    log("CAT");
                },
                extension: {
                    imageStyle:{
                        style: {
                            objectFit: "contain",
                        },
                        src: "https://www.cats.org.uk/media/13139/220325case013.jpg",
                    }
                },
                type: TYPE.IMAGE,
                state: ButtonImageState.DEFAULT,
                text: "CAT",
            },
            {
                actionCallback: () => {
                    log("DOG");
                },
                extension: {
                    imageStyle:{
                        style: {
                            objectFit: "contain",
                        },
                        src: "https://cdn.create.vista.com/api/media/small/160958954/stock-photo-cute-beagle-dog",
                    }
                },
                type: TYPE.IMAGE,
                state: ButtonImageState.DEFAULT,
                text: "DOG",
            },
            {
                actionCallback: () => {
                    log("CHICKEN");
                },
                extension: {
                    containerStyle: {
                        width: "268px",
                        height: "300px",
                    },
                    imageStyle:{
                        style: {
                            objectFit: "contain",
                        },
                        src: "https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg",
                    }
                },
                type: TYPE.IMAGE,
                state: ButtonImageState.DEFAULT,
                text: "CHICKEN",
            },
        ]
    }

    onMessage(message: any): void {
        console.log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.separateButton.sendMessage<ButtonOptions<TYPE.BUTTON>>(
            {
                type: TYPE.BUTTON,
                state: ButtonState.DEFAULT,
                text: "Separate Button",
            }
        );
    }

    onDestroy(): void {
    }

    separateButtonClick(): void {
        log("separateButtonClick");
    }
}
