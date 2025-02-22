import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {ButtonComponent, ButtonOptions} from "../../env/types";
import {TYPE} from "../../../settings/subRoutesEnums";
import {BUTTON_DEFAULT_STYLES} from "../../env/variables";
import {getDefaultStyles, setImage, setText} from "../../env/utils";

// Component tag example: <app-view_button></app-view_button>
export class View_button implements OnInit, OnCreate, OnDestroy, OnMessage, ButtonComponent {
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

        setText(this, defaultStyles, buttonOption);
        setImage(this, defaultStyles, buttonOption);

        this.root.detectChanges();
    }

    private setGeneralStyle(): void {
        const baseOption = buttonService$.getValue();

        setText(this, BUTTON_DEFAULT_STYLES, baseOption, true);
        setImage(this, BUTTON_DEFAULT_STYLES, baseOption, true);
    }
}