
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Mushroom implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Mushrooms recipes";
    recipes: IRecipeLink[] = [
        {recipeName: "", url: ""},{recipeName: "", url: ""},
        {recipeName: "", url: ""},{recipeName: "", url: ""}];

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