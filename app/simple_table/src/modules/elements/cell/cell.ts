import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";

export class Cell implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    data: string;
    input: HTMLElement;
    isEdit: boolean;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.data = "test";
        this.isEdit = false;
    }

    onCreate(): void {
        this.root.dataCatch$<string>()
            .subscribe(data => {
                this.data = data;
                // @ts-ignore
                this.input.value = data;
                this.root.title = data;
                this.root.detectChanges();
            });
    }

    onInit(): void {

    }

    onDestroy(): void {
    }

    onDblClick(): void {
        this.isEdit = true;
        this.root.detectChanges();
    }

    onKeyDown(evt: KeyboardEvent): void {
        if (!this.isEdit) return;

        if (evt.key.toLowerCase()==="enter") {
            this.isEdit = false;
            // @ts-ignore
            this.data = this.input.value;
            this.root.detectChanges();
        }
    }

    onChange(): void {
        if (!this.isEdit) return;

        this.isEdit = false;
        // @ts-ignore
        this.data = this.input.value;
        this.root.detectChanges();
    }
}
