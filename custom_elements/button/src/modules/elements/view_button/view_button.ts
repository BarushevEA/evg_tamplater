import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {ButtonBaseStateStyles, ButtonOptions} from "../../env/types";
import {TYPE} from "../../../settings/subRoutesEnums";
import {BUTTON_DEFAULT_STYLES} from "../../env/variables";
import {getDefaultStyles, setStyle} from "../../env/utils";

// Component tag example: <app-view_button></app-view_button>
export class View_button implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    text: string;
    textElement: HTMLElement;
    image: string;
    imageElement: HTMLImageElement;

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
        this.setButtonOption(buttonService$.getValue());

        this.root.collect(
            buttonService$.subscribe(buttonOption => {
                // log(this.root.tagName, "buttonOption:", buttonOption);
                this.text = buttonOption.text;
                this.root.detectChanges();
            })
        );
    }

    onDestroy(): void {
    }

    setButtonOption(buttonOption: ButtonOptions<TYPE>): void {
        const {defaultStyles, error} = getDefaultStyles(this, buttonOption);
        if (error) {
            log(error);
            return;
        }

        this.setText(defaultStyles, buttonOption);
        this.setImage(defaultStyles, buttonOption);

        this.root.detectChanges();
    }

    private setImage(defaultStyles: ButtonBaseStateStyles, buttonOption: ButtonOptions<TYPE>, isGeneralStyle: boolean = false) {
        const imageOption = isGeneralStyle ? defaultStyles.generalStyle.imageStyle : defaultStyles[buttonOption.state].imageStyle;
        if (!imageOption) {
            log(`ERROR: ${this.name} - imageOption is not defined!`);
            return;
        }

        if (imageOption.style) {
            setStyle(this.imageElement, defaultStyles[buttonOption.state].imageStyle.style);
        }

        if (imageOption.src) {
            this.image = imageOption.src;
        }

        if (imageOption.altText) {
            this.imageElement.alt = imageOption.altText;
        }
    }

    private setText(defaultStyles: ButtonBaseStateStyles, buttonOption: ButtonOptions<TYPE>, isGeneralStyle: boolean = false) {
        if (isGeneralStyle) {
            setStyle(this.textElement, defaultStyles.generalStyle.textBlockStyle);
        } else {
            setStyle(this.textElement, defaultStyles[buttonOption.state].textBlockStyle);
        }

        if (typeof buttonOption.text === "string") {
            this.text = buttonOption.text;
        }
    }

    private setGeneralStyle(): void {
        const baseOption = buttonService$.getValue();
        log(this.name, "baseOption:", baseOption);
        this.setText(BUTTON_DEFAULT_STYLES, baseOption, true);
        this.setImage(BUTTON_DEFAULT_STYLES, baseOption, true);
    }
}