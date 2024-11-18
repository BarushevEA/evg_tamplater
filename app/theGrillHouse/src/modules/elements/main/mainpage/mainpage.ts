
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Mainpage implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    new: IRecipeLink[] = [
        {
            recipeName: "VegeSzaszlyk",
            url: "assets/images/main/recipes/vegetables/grilledVegetables0.png",
            ingredients: ['Vegetables']
        },
        {
            recipeName: "Smoked Salmon",
            url: "assets/images/main/recipes/fish/grilledFish0.jpg",
            ingredients: ['Salmon']
        }
    ]

    popular: IRecipeLink[] = [
        {
            recipeName: "Grilled Ribs",
            url: "assets/images/main/recipes/meat/grilledMeat2.jpg",
            ingredients: ['Ribs']
        },
        {
            recipeName: "Chanterelles on a skewer",
            url: "assets/images/main/recipes/mushrooms/grilledMushrooms1.jpg",
            ingredients: ['Chanterelles']
        }
    ]

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