import { ButtonState } from "../../../../../custom_elements/button/distribution/modules/env/enums";
import {ButtonOptions} from "../../../../../custom_elements/button/distribution/modules/env/types";
import {TYPE} from "../../../../../custom_elements/button/distribution/settings/subRoutesEnums";
import {IChannel, OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../libs/env/types";
import {log} from "../../../../../libs/utils/utils";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    csmButton: IChannel;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        console.log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.csmButton.sendMessage<ButtonOptions<TYPE.BUTTON>>({
            actionCallback: () => {
                log("AppRoot")
            },
            type: TYPE.BUTTON,
            state: ButtonState.CLOSE,
        });

        setTimeout(() => {
            this.csmButton.sendMessage<ButtonOptions<TYPE.BUTTON>>({
                actionCallback: () => {
                    log("AppRoot 2")
                },
                type: TYPE.BUTTON,
                state: ButtonState.DEFAULT,
            });
        }, 5000);
    }

    onDestroy(): void {
    }
}
