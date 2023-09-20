import {APP_INFO} from "../../../settings/info";
import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Main implements OnCreate, OnInit, OnDestroy {
    readonly root;
    name: string;
    appInfo = APP_INFO.description;
    someText = "Hello world !!!";
    ag = "17";
    test = "<app-test></app-test>";
    isTest = true;
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

    onCreate(): void {
        // this.root.collect(
        //     this.root.parentChanelReady$().subscribe(chanel => {
        //         console.log("Main registered:", (<HTMLElement><any>chanel).tagName);
        //     })
        // );
    }

    onInit(): void {
        console.log("dataCatch$.value:", this.root.dataCatch$().getValue());
        const chanel = this.root.parentChanelReady$().getValue();
        if (chanel) {
            chanel.sendData("Main sendData");
        }

        this.root.collect(
            this.root.dataCatch$<string>().subscribe(data => {
                console.log("Main data catch:", data);
            }),
        );
    }

    onDestroy(): void {
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
