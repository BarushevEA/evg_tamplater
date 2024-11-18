
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Mushroom implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Mushrooms recipes";
    recipes: IRecipeLink[] = [
        {
            recipeName: "Mushrooms Shashlyk",
            url: "assets/images/main/recipes/mushrooms/grilledMushrooms0.jpg",
            ingredients: ['Mushrooms']
        },
        {
            recipeName: "Chanterelles on a skewer",
            url: "assets/images/main/recipes/mushrooms/grilledMushrooms1.jpg",
            ingredients: ['Chanterelles']
        },
        {
            recipeName: "Mushrooms on a skewer",
            url: "assets/images/main/recipes/mushrooms/grilledMushrooms2.jpg",
            ingredients: ['Mushrooms']
        },
        {
            recipeName: "Stuffed mushrooms",
            url: "assets/images/main/recipes/mushrooms/grilledMushrooms3.jpg",
            ingredients: ['Mushrooms']
        }
        ];

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