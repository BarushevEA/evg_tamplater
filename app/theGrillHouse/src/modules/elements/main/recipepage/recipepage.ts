
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {serviceRecipe$} from "../../../services/service";

export class Recipepage implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;
    recipeName: string;
    photo: string;
    ingredients: string[];
    steps: string[];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        log(this.root.tagName, "message:", message);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.setProperties();
        this.root.detectChanges();
    }

    onDestroy(): void {
    }

    private setProperties (){
        let result = serviceRecipe$.getValue();
        this.recipeName = result.recipeName;
        this.photo = result.url;
        this.ingredients = result.ingredients;
        this.steps = result.steps;
    }
}