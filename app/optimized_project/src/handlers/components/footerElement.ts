import {Event$} from "evg_event_history/src/outLib/env";
import {getElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {RootElement} from "../../../../../libs/env/types";
import {History} from "evg_event_history/src/outLib/history";

class Footer extends History<Event$> {
    name: string;
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
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}

export const FooterElement = getElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.FOOTER),
        startEvent: Event$.UNDEFINED,
        className: Footer,
    }
);
