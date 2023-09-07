import {OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Footer implements OnInit{
    name: string;
    readonly root;
    readonly span: HTMLElement;
    myDiv: HTMLElement;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.span.innerHTML = "Test injection ";
        this.myDiv.innerHTML = "Test injection div";
    }
}
