
import {OnCreate, OnDestroy, OnInit, RootBehavior, OnMessage} from "../../../../../../../libs/env/types";
import {IRecipeLink} from "../../../env/types";
import {log} from "../../../../../../../libs/utils/utils";
import {ROUTE_COMMAND$} from "../../../../../../../libs/elements/rootElements/appRoute";
import {ROUTE_COMMAND} from "../../../../settings/routeEnum";

export class Recipelink implements OnInit, OnCreate, OnDestroy, OnMessage {
    name: string;

    recipeName: string;
    photo: string;
    ingredients: string[];

    constructor(readonly root: RootBehavior) {
        this.name = root.tagName;
    }
    
    onMessage(message: any): void {
        this.setProperties(message);
        this.root.detectChanges();
    }

    onCreate(): void {
    }

    onInit(): void {
    }

    onDestroy(): void {
    }

    setProperties (msg: IRecipeLink) {
        this.recipeName = msg.recipeName;
        this.photo = msg.url;
        this.ingredients = msg.ingredients;
        log(this.ingredients, this.photo, this.recipeName);
    }

    goRecipe() {
        ROUTE_COMMAND$.next(ROUTE_COMMAND.RECIPEPAGE);
    }
}