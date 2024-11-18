import {Observable} from "../../../../../libs/Observables";
import {IRecipe} from "../env/types";

export const serviceRecipe$ = new Observable<IRecipe>(
    {
        recipeName: "",
        url: "",
        steps: [""],
        ingredients: [""],
    }
)