import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {ServiceController} from "../../services/service";

export class Main implements OnInit, OnCreate, OnDestroy {
    readonly root;
    name: string;
    controller: ServiceController;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
        this.controller = new ServiceController();
    }

    onCreate(): void {
        this.controller.start();
    }

    onInit(): void {
    }

    onDestroy(): void {
    }
}
