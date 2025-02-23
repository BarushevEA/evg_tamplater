import {ButtonState} from "../../../../../custom_elements/button/distribution/modules/env/enums";
import {ButtonOptions} from "../../../../../custom_elements/button/distribution/modules/env/types";
import {TYPE} from "../../../../../custom_elements/button/distribution/settings/subRoutesEnums";
import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {log} from "../../../../../libs/utils/utils";
import {parseCssBlock} from "../../../../../libs/utils/cssParser";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    buttons: ButtonOptions<TYPE.BUTTON>[];

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
    }

    onMessage(message: any): void {
        console.log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {

    }

    onDestroy(): void {
    }
}
