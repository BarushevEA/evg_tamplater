
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Meat implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Meat recipes";
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