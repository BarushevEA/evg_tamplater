import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IContent} from "../../../env/types";

export class Home implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    content: IContent[] = [{
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cukety_%282%29.jpg/275px-Cukety_%282%29.jpg",
        label: "My krutyje Kabachki!"
    },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cukety_%282%29.jpg/275px-Cukety_%282%29.jpg",
            label: "My krutyje Kabachki!"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cukety_%282%29.jpg/275px-Cukety_%282%29.jpg",
            label: "My krutyje Kabachki!"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cukety_%282%29.jpg/275px-Cukety_%282%29.jpg",
            label: "My krutyje Kabachki!"
        }];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
