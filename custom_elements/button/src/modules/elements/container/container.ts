import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {ButtonOptions} from "../../env/types";
import {TYPE} from "../../../settings/subRoutesEnums";
import {BUTTON_DEFAULT_STYLES} from "../../env/variables";

// Component tag example: <app-container></app-container>
export class Container implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    buttonOption: ButtonOptions<TYPE>;
    generalStyle: Partial<CSSStyleDeclaration>;
    container: HTMLElement;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;

        this.init();
    }

    init(): void {
        this.generalStyle = BUTTON_DEFAULT_STYLES.generalStyle.containerStyle;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.setGeneralStyle();
        this.setButtonOption(buttonService$.getValue());

        this.root.collect(
            buttonService$.subscribe(buttonOption => {
                this.setButtonOption(buttonOption);
            })
        );
    }

    onDestroy(): void {
    }

    setButtonOption(buttonOption: ButtonOptions<TYPE>): void {
        if (!BUTTON_DEFAULT_STYLES[buttonOption.state]) {
            log(`ERROR: ${this.name} - buttonOption.state: ${buttonOption.state} is not defined!`);
            return;
        }

        this.buttonOption = buttonOption;
        this.setStyle(BUTTON_DEFAULT_STYLES[buttonOption.state].containerStyle);
    }

    click(): void {
        this.buttonOption.actionCallback();
    }

    private setGeneralStyle(): void {
        this.setStyle(this.generalStyle);
    }

    private setStyle(style: Partial<CSSStyleDeclaration>): void {
        for (const [key, value] of Object.entries(style)) {
            this.container.style[<any>key] = value as string;
        }
    }
}