import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {ROW} from "../../env/types";

export class Main implements OnCreate, OnInit, OnDestroy {
    readonly root;
    name: string;
    header: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {

    }

    onInit(): void {
        this.handleHeaderChanel();
        this.handleBodyChanel();
        this.handleFooterChanel();
    }

    private handleHeaderChanel() {
        const headerChanel = this.root.getChanel(this.header);
        if (!headerChanel) return;

        const rows: ROW[] = [{id: 0, isEditDisabled: true, arr: ["one-1", "two-2", "three-3", "four-4", "five-5"]}];
        headerChanel.sendData<ROW[]>(rows);
    }

    private handleBodyChanel() {
        const bodyChanel = this.root.getChanel(this.body);
        if (!bodyChanel) return;

        const rows: ROW[] = [];
        let longField = "";

        for (let i = 0; i < 10; i++) {
            longField += " long text";
            rows.push({id: i + 1, arr: ["1", "2", "3", "4", longField]});
        }

        bodyChanel.sendData<ROW[]>(rows);

        setTimeout(() => {
            rows.length = 0;

            for (let i = 0; i < 11; i++) {
                longField += " long text";
                rows.push({id: i + 1, arr: ["5", "6", "7", "8", longField]});
            }

            bodyChanel.sendData<ROW[]>(rows);
        }, 5000);
    }

    private handleFooterChanel() {
        const footerChanel = this.root.getChanel(this.footer);
        if (!footerChanel) return;

        footerChanel.sendData<string>("TEST FOOTER");
    }

    onDestroy(): void {
    }
}
