import {OnCreate, OnDestroy, OnInit, OnMessage, RootBehavior} from "../../../../../../libs/env/types";
import {log} from "../../../../../../libs/utils/utils";
import {IRecipe} from "../../env/types";
import {serviceRecipe$} from "../../services/service";

export class Page_recipe implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }

    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        const recipes: IRecipe[] = [
            {
                name: "RECIPE1",
                ingredients: ["1", "2", "3"],
                steps: ["1)", "2)", "3)"],
                time: "15 minutes",
                image: "my image link",
            },
            {
                name: "RECIPE2",
                ingredients: ["1", "2", "3"],
                steps: ["1)", "2)", "3)"],
                time: "15 minutes",
                image: "my image link",
            },
            {
                name: "RECIPE3",
                ingredients: ["1", "2", "3"],
                steps: ["1)", "2)", "3)"],
                time: "15 minutes",
                image: "my image link",
            },
            {
                name: "RECIPE4",
                ingredients: ["1", "2", "3"],
                steps: ["1)", "2)", "3)"],
                time: "15 minutes",
                image: "my image link",
            }
        ];

        setInterval(() => {
            const recipe = recipes[Math.floor(Math.random() * recipes.length)];
            serviceRecipe$.next(recipe);
            this.root.detectChanges();
        }, 1000);
    }

    onDestroy(): void {
    }
}
