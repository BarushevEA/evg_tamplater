import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {BaseOptions, ButtonOptions} from "../../env/types";
import {IMAGE_DEFAULT_STYLES} from "../../env/variables";
import {TYPE} from "../../../settings/subRoutesEnums";
import {getDefaultStyles, setStyle} from "../../env/utils";

// Component tag example: <app-view_image></app-view_image>
export class View_image implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    text: string;
    textElement: HTMLElement;
    image: string;
    imageElement: HTMLImageElement;
    generalStyle: BaseOptions;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;

        this.init();
    }

    init(): void {
        this.generalStyle = IMAGE_DEFAULT_STYLES.generalStyle;
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

        setStyle(this.textElement, defaultStyles[buttonOption.state].textBlockStyle);
        setStyle(this.imageElement, defaultStyles[buttonOption.state].imageStyle.style);

        if (buttonOption.text) {
            this.text = buttonOption.text;
        }
        if (defaultStyles[buttonOption.state].imageStyle.src) {
            this.image = defaultStyles[buttonOption.state].imageStyle.src;
        }
        if (defaultStyles[buttonOption.state].imageStyle.altText) {
            this.imageElement.alt = defaultStyles[buttonOption.state].imageStyle.altText;
        }

        this.root.detectChanges();
    }

    private setGeneralStyle(): void {
        setStyle(this.textElement, this.generalStyle.textBlockStyle);
        setStyle(this.imageElement, this.generalStyle.imageStyle.style);
    }
}