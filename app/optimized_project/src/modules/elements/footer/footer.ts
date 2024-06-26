import {OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Footer implements OnInit{
    readonly root;
    readonly span: HTMLElement;
    readonly myDiv: HTMLElement;
    name: string;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.span.innerHTML = "Test injection ";
        this.myDiv.innerHTML = "Test injection div";
    }
}
