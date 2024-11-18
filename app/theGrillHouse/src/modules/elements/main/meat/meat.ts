
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Meat implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Meat recipes";
    recipes: IRecipeLink[] = [
        {
            recipeName: "Beef steaks",
            url: "assets/images/main/recipes/meat/grilledMeat0.jpg",
            ingredients: ['Beef']
        },
        {
            recipeName: "Grilled Chicken Legs",
            url: "assets/images/main/recipes/meat/grilledMeat1.jpg",
            ingredients: ['Chicken Legs']
        },
        {
            recipeName: "Grilled Ribs",
            url: "assets/images/main/recipes/meat/grilledMeat2.jpg",
            ingredients: ['Ribs']
        },
        {
            recipeName: "Steak Tomahawk",
            url: "assets/images/main/recipes/meat/grilledMeat3.jpg",
            ingredients: ['Steak']
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