
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {BUTTON_DEFAULT_STYLES, ButtonOptions} from "../../env/types";
import {TYPE} from "../../../settings/subRoutesEnums";

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
        this.generalStyle = BUTTON_DEFAULT_STYLES.generalStyle;
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

    private setGeneralStyle(): void {
        for (const [key, value] of Object.entries(this.generalStyle)) {
            this.container.style[<any>key] = value as string;
        }
    }

    setButtonOption(buttonOption: ButtonOptions<TYPE>): void {
        this.buttonOption = buttonOption;
    }

    click(): void {
        this.buttonOption.actionCallback();
    }
}