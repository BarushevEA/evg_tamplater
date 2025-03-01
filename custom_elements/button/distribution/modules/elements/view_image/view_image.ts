import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {ButtonComponent, ButtonOptions} from "../../env/types";
import {IMAGE_DEFAULT_STYLES} from "../../env/variables";
import {TYPE} from "../../../settings/subRoutesEnums";
import {getDefaultStyles, setImage, setText} from "../../env/utils";

// Component tag example: <app-view_image></app-view_image>
export class View_image implements OnInit, OnCreate, OnDestroy, OnMessage, ButtonComponent {
    name: string;
    text: string;
    textElement: HTMLElement;
    image: string;
    imageElement: HTMLImageElement;
    id: string;

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
    }

    private setGeneralStyle(): void {
        const baseOption = buttonService$.getValue();

        setText(this, IMAGE_DEFAULT_STYLES, baseOption, true);
        setImage(this, IMAGE_DEFAULT_STYLES, baseOption, true);
    }
}