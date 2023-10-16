import {IChanel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {ROW, TableOptions} from "../../env/types";

export class Main implements OnCreate, OnInit, OnDestroy {
    readonly root;
    name: string;
    header: HTMLElement;
    body: HTMLElement;
    footer: HTMLElement;

    headerChanel: IChanel;
    bodyChanel: IChanel;
    footerChanel: IChanel;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onCreate(): void {
        this.root.dataCatch$<TableOptions>()
            .pipe()
            .emitByPositive(() => this.headerChanel && this.bodyChanel && this.footerChanel)
            .subscribe(data => {
                this.headerChanel.sendData<ROW[]>(
                    [{id: 0, isEditDisabled: true, arr: data.header}]
                );

                const rows: ROW[] = [];

                for (let i = 0; i < data.body.length; i++) {
                    const row = data.body[i];
                    rows.push({id: i + 1, arr: row});
                }

                this.bodyChanel.sendData<ROW[]>(rows);

                this.footerChanel.sendData<string>(data.footer);
            });
    }

    onInit(): void {
        this.handleHeaderChanel();
        this.handleBodyChanel();
        this.handleFooterChanel();
    }

    private handleHeaderChanel() {
        this.headerChanel = this.root.getChanel(this.header);
    }

    private handleBodyChanel() {
        this.bodyChanel = this.root.getChanel(this.body);
    }

    private handleFooterChanel() {
        this.footerChanel = this.root.getChanel(this.footer);
    }

    onDestroy(): void {
    }
}
