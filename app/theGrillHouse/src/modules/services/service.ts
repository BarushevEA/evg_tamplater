import {Observable} from "../../../../../libs/Observables";
import {IRecipe} from "../env/types";

export const serviceRecipe$ = new Observable<IRecipe>({
    name: "RECIPE1",
    ingredients: ["1", "2", "3"],
    steps: ["1)", "2)", "3)"],
    time: "15 minutes",
    image: "my image link",
})