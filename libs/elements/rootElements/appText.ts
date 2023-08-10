import {AbstractHtmlElement} from "./AbstractHtmlElement";
import {Event$} from "evg_event_history/src/outLib/env";
import {ELEMENT_OPTIONS} from "../utils";

const options: ELEMENT_OPTIONS<Event$> = {
    htmlTemplate: "",
    startEvent: Event$.UNDEFINED
}

export class AppText extends AbstractHtmlElement<Event$> {
    constructor() {
        super(options);
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}
