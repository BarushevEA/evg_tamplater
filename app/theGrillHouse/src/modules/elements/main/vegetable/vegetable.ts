
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Vegetable implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Vegetables recipes";
    recipes: IRecipeLink[] = [
        {
            recipeName: "VegeSzaszlyk",
            url: "assets/images/main/recipes/vegetables/grilledVegetables0.png",
            ingredients: ['Vegetables']
        },
        {
            recipeName: "Potatoes",
            url: "assets/images/main/recipes/vegetables/grilledVegetables1.jpg",
            ingredients: ['Vegetables']
        },
        {
            recipeName: "Stew",
            url: "assets/images/main/recipes/vegetables/grilledVegetables2.jpg",
            ingredients: ['Vegetables']
        },
        {
            recipeName: "Stew with Cabbage",
            url: "assets/images/main/recipes/vegetables/grilledVegetables3.jpg",
            ingredients: ['Vegetables']
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