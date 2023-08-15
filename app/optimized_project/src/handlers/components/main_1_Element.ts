import {Event$} from "evg_event_history/src/outLib/env";
import {getCustomElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {OnInit, RootBehavior} from "../../../../../libs/env/types";

class Main_1 implements OnInit {
    name: string;
    isShowHello = false;
    showedTxt = "---HELLO WORLD !!!---";
    root;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.root.collect(
            this.root.onChangesDetected$.subscribe(() => {
                this.handleElement();
                this.handleElementExtra();
            })
        );
    }

    clickHandler(evt: MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();

        this.isShowHello = !this.isShowHello;
        this.root.detectChanges();
    }

    keyDownInput(evt: KeyboardEvent): void {
        console.log("keyDownInput(evt: KeyboardEvent)", evt.key);
    }

    changeInput(evt: Event): void {
        console.log("changeInput(evt: KeyboardEvent)", (<any>evt.target).value);
    }

    handleElement() {
        const elements = this.root.getElementsBoundToMethod(this.handleElement);

        for (const element of elements) {
            element.innerHTML += " handled";
        }
    }

    handleElementExtra() {
        const elements = this.root.getElementsBoundToMethod(this.handleElementExtra);

        for (const element of elements) {
            element.innerHTML += " handled extra";
        }
    }
}

export const Main_1_Element = getCustomElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.MAIN_1),
        startEvent: Event$.UNDEFINED,
        className: Main_1,
    }
);
