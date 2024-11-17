import {ROUTE_COMMAND} from "../../settings/routeEnum";

export type ILink = Required<{
    name: string,
    route: ROUTE_COMMAND,
}>

export type IRecipeLink = Required<{
    recipeName: string,
    url: string
}>

export type IRecipe = {
    name: string,
    ingredients: string[],
    steps: string[],
    time: string,
    image: string,
};
