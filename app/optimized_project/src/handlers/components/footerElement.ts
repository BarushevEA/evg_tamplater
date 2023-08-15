import {Event$} from "evg_event_history/src/outLib/env";
import {getElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {RootBehavior} from "../../../../../libs/env/types";

class Footer {
    name: string;
    root;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

}

export const FooterElement = getElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.FOOTER),
        startEvent: Event$.UNDEFINED,
        className: Footer,
    }
);
