import {getCustomElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
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

export const FooterElement = getCustomElement<any>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.FOOTER),
        startEvent: 0,
        className: Footer,
    }
);
