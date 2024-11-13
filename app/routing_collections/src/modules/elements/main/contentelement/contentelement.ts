import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {IContent} from "../../../env/types";
import {log} from "../../../../../../../libs/utils/utils";

export class Contentelement implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    label: string;
    photo: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
        this.setContent(message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    setContent(content: IContent): void {
        this.label = content.label;
        this.photo = content.image;
        this.root.detectChanges();
    }
}
