import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {ButtonOptions} from "../../env/types";
import {TYPE} from "../../../settings/subRoutesEnums";
import {getDefaultStyles, setStyle} from "../../env/utils";

// Component tag example: <app-container></app-container>
export class Container implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    container: HTMLElement;
    id: string;
    callback: () => void;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.setGeneralStyle();

        this.root.collect(
            buttonService$
                .pipe()
                .refine(buttonOption => {
                    if (!this.id) {
                        const parentShadow = this.root.getRootNode() as ShadowRoot;
                        this.id = (parentShadow as any)["shadowId"];
                    }
                    return this.id === buttonOption.id;
                })
                .subscribe(buttonOption => {
                    this.setButtonOption(buttonOption);
                })
        );
    }

    onDestroy(): void {
    }

    setButtonOption(buttonOption: ButtonOptions<TYPE>): void {
        const {defaultStyles, error} = getDefaultStyles(<any>this, buttonOption);
        if (error) {
            log(error);
            return;
        }

        this.callback = buttonOption.actionCallback;

        if (buttonOption.state === "custom") {
            if (buttonOption.customOptions && buttonOption.customOptions.containerStyle) {
                setStyle(this.container, buttonOption.customOptions.containerStyle);
            }
        } else {
            setStyle(this.container, defaultStyles[buttonOption.state].containerStyle);
        }
    }

    click(): void {
        this.callback();
    }

    private setGeneralStyle(): void {
        const baseOption = buttonService$.getValue();
        const {defaultStyles, error} = getDefaultStyles(<any>this, baseOption);
        if (error) {
            log(error);
            return;
        }

        setStyle(this.container, defaultStyles.generalStyle.containerStyle);
    }
}