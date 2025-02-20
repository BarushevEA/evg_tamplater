
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {buttonService$} from "../../services/service";
import {ButtonOptions} from "../../env/types";
import {TYPE} from "../../../settings/subRoutesEnums";

// Component tag example: <app-container></app-container>
export class Container implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    container: HTMLElement;
    buttonOption: ButtonOptions<TYPE>;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
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
        this.buttonOption = buttonOption;
    }
}