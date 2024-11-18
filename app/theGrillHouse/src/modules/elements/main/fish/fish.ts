
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {IRecipeLink} from "../../../env/types";

export class Fish implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    bannerText:string = "Fish recipes";
    recipes: IRecipeLink[] = [
        {
            recipeName: "Smoked Salmon",
            url: "assets/images/main/recipes/fish/grilledFish0.jpg",
            ingredients: ['Salmon']
        },
        {
            recipeName: "Smoked Perch",
            url: "assets/images/main/recipes/fish/grilledFish1.jpg",
            ingredients: ['Perch']
        },
        {
            recipeName: "Smoked Shark",
            url: "assets/images/main/recipes/fish/grilledFish2.png",
            ingredients: ['Shark']
        },
        {
            recipeName: "Smoked Tuna",
            url: "assets/images/main/recipes/fish/grilledFish3.JPG",
            ingredients: ['Tuna']
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
        this.root.detectChanges();
    }

    onDestroy(): void {
    }
}