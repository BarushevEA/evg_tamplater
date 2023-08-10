import {Event$} from "evg_event_history/src/outLib/env";
import {AbstractHtmlElement} from "../../../../../libs/elements/rootElements/AbstractHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {ELEMENT_OPTIONS} from "../../../../../libs/elements/utils";

const options: ELEMENT_OPTIONS<Event$> = {
    htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.MAIN_1),
    startEvent: Event$.UNDEFINED
}

export class Main_1_Element extends AbstractHtmlElement<Event$> {
    name = this.tagName;
    isShowHello = false;
    showedTxt = "---HELLO WORLD !!!---";

    constructor() {
        super(options);
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;

        this.collect(
            this.onChangesDetected$.subscribe(() => {
                this.handleElement();
                this.handleElementExtra();
            })
        );
    }

    clickHandler(evt: MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();

        this.isShowHello = !this.isShowHello;
        this.detectChanges();
    }

    keyDownInput(evt: KeyboardEvent): void {
        console.log("keyDownInput(evt: KeyboardEvent)", evt.key);
    }

    changeInput(evt: Event): void {
        console.log("changeInput(evt: KeyboardEvent)", (<any>evt.target).value);
    }

    handleElement() {
        const elements = this.getElementsBoundToMethod(this.handleElement);

        for (const element of elements) {
            element.innerHTML += " handled";
        }
    }

    handleElementExtra() {
        const elements = this.getElementsBoundToMethod(this.handleElementExtra);

        for (const element of elements) {
            element.innerHTML += " handled extra";
        }
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}
