import {IChannel, OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../libs/elements/types";
import {OptionsCollector, TableOptions} from "../env/types";
import {IsTableReady$} from "../services/tableServices";
import {getAttrNative} from "../../../../../libs/elements/utils";

export class AppRoot implements OnInit, OnCreate, OnDestroy, OptionsCollector {
    readonly root: RootBehavior;
    name: string;
    main: HTMLElement;
    tableName: string;

    mainChanel: IChannel;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.tableName = getAttrNative(root, "table-name");
    }

    onCreate(): void {
    }

    onInit(): void {
        this.handleMainChanel();
        IsTableReady$.next(this);
    }

    private handleMainChanel() {
        this.mainChanel = this.root.getChannel(this.main);
    }

    onDestroy(): void {
    }

    setOptions(options: TableOptions): void {
        options.tableName = this.tableName;
        this.root.sendToChannel(this.mainChanel, options);
    }

    getTableName(): string {
        return this.tableName;
    }
}
