import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {IRecipe} from "../../env/types";
import {serviceRecipe$} from "../../services/service";

export class Recipe implements OnInit, OnCreate, OnDestroy, OnMessage, IRecipe {
    name: string;

    image: string;
    ingredients: string[];
    steps: string[];
    time: string;

    constructor(readonly root: RootBehavior) {

    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        const currentRecipe = serviceRecipe$.getValue();
        this.name = currentRecipe.name;
        this.image = currentRecipe.image;
        this.ingredients = currentRecipe.ingredients;
        this.steps = currentRecipe.steps;
        this.time = currentRecipe.time;

        this.root.collect(
            serviceRecipe$.subscribe(
                (recipe) => {
                    this.name = recipe.name;
                    this.image = recipe.image;
                    this.ingredients = recipe.ingredients;
                    this.steps = recipe.steps;
                    this.time = recipe.time;
                    this.root.detectChanges();
                })
        );
    }

    onDestroy(): void {
    }
}
