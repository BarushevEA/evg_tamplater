import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IContent} from "../../../env/types";

export class Contentelement implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    label: string;
    photo: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
        this.root.collect(
            this.root.onMessage$<IContent>()
                .pipe()
                .refine(msg => !!msg)
                .subscribe(msg => {
                    this.setContent(msg);
                })
        )
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    setContent(content: IContent): void {
        this.label = content.label;
        this.photo = content.image;
    }
}
