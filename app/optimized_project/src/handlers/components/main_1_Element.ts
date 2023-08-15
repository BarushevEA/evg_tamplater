import {Event$} from "evg_event_history/src/outLib/env";
import {getElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {RootElement} from "../../../../../libs/env/types";
import {History} from "evg_event_history/src/outLib/history";

class Main_1 extends History<Event$> {
    name: string;
    isShowHello = false;
    showedTxt = "---HELLO WORLD !!!---";
    root;

    constructor(root: RootElement, startEvent: Event$) {
        super(startEvent);
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;

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

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}

export const Main_1_Element = getElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.MAIN_1),
        startEvent: Event$.UNDEFINED,
        className: Main_1,
    }
);
