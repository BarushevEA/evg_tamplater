import {ROUTE_COMMAND} from "../../settings/routeEnum";

export type ILink = Required<{
    name: string,
    route: ROUTE_COMMAND,
}>

export type IRecipeLink = Required<{
    recipeName: string,
    url: string,
    ingredients: string[],
}>