
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {ButtonOptions} from "../../../../../button/distribution/modules/env/types";
import {TYPE} from "../../../../../button/distribution/settings/subRoutesEnums";
import {ButtonState} from "../../../../../button/distribution/modules/env/enums";

// Component tag example: <app-container></app-container>
export class Container implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    buttons: ButtonOptions<TYPE.BUTTON>[];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;

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
                    log("CLOSE");
                },
                type: TYPE.BUTTON,
                state: ButtonState.CLOSE,
            },
        ]
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}