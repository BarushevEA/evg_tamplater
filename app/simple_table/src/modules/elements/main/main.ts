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
        this.root.transferToChanel<TableOptions, ROW[]>(
            () => this.headerChanel,
            data => [{id: 0, isEditDisabled: true, arr: data.header}]);

        this.root.transferToChanel<TableOptions, ROW[]>(
            () => this.bodyChanel,
            data => {
                const rows: ROW[] = [];

                for (let i = 0; i < data.body.length; i++) {
                    const row = data.body[i];
                    rows.push({id: i + 1, arr: row, tableName: data.tableName});
                }

                return rows;
            });

        this.root.transferToChanel<TableOptions, string>(
            () => this.footerChanel,
            data => data.footer);
    }

    onInit(): void {
        this.initHeaderChanel();
        this.initBodyChanel();
        this.initFooterChanel();
    }

    private initHeaderChanel() {
        this.headerChanel = this.root.getChanel(this.header);
    }

    private initBodyChanel() {
        this.bodyChanel = this.root.getChanel(this.body);
    }

    private initFooterChanel() {
        this.footerChanel = this.root.getChanel(this.footer);
    }

    onDestroy(): void {
    }
}
