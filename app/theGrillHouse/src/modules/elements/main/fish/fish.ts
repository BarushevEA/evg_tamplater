
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Fish implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Fish recipes";
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
        this.root.detectChanges();
    }

    onDestroy(): void {
    }
}