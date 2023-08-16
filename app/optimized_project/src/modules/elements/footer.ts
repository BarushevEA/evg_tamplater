import {RootBehavior} from "../../../../../libs/env/types";

export class Footer {
    name: string;
    root;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }
}
