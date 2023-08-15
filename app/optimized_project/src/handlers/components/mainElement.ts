import {Event$} from "evg_event_history/src/outLib/env";
import {getCustomElement} from "../../../../../libs/elements/rootElements/RootHtmlElement";
import {customTemplate, E_SUBS_TEMPLATE} from "../../templates/templateMarkers";
import {APP_INFO} from "../../APP_INFO";
import {RootBehavior} from "../../../../../libs/env/types";

export class Main {
    name: string;
    root;
    appInfo = APP_INFO.description;
    someText = "Hello world !!!";
    ag = "17";
    receipts: string[] = [
        ` 
How to cook perfect Bagels
  
10 Tips for Making Schmear-Worthy Homemade Bagels
Moisture: Wetter dough means crispier bagels. ...
Water temp: The colder the better. ...
Dry active yeast: Let it chill. ...
Flour: Embrace the gluten. ...
Mixing: Low and slow is the way to go. ...
The rise: Your kitchen climate is A-okay. ...
Flavor kick: After the proof.
        `,
        `
How to cook perfect fish

A juicy, perfectly cooked fillet of fish with crisp 
skin that crackles when cut is a thing of beauty – but 
one that can be tough to achieve. Follow these simple 
steps, whatever fish you’re cooking, avoid the 
potential pitfalls, and you’ll get it right, every time.
        `,
        `
How to cook perfect meat

This dish has everything we’re looking for when it comes 
to a weeknight dinner: it’s filling, requires only simple 
ingredients, and comes together in under an hour. If you’re 
looking for a bright summer dinner that still delivers on 
the comfort food factor, then this creamy lemon Parmesan 
chicken should be next on your weeknight dinner rotation.
Trust us—one bite, and you’ll realize why this is one of
our most popular chicken recipes of all time. 
        `
    ];
    receiptCounter = 0;
    currentReceipt = this.receipts[this.receiptCounter];

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    nestReceipt(): void {
        this.receiptCounter++;
        if (this.receiptCounter >= this.receipts.length) {
            this.receiptCounter = 0;
        }

        this.currentReceipt = this.receipts[this.receiptCounter];
        this.root.detectChanges();
    }
}

export const MainElement = getCustomElement<Event$>(
    {
        htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.MAIN),
        startEvent: Event$.UNDEFINED,
        className: Main,
    }
);
