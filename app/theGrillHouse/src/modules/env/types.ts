import {ROUTE_COMMAND} from "../../settings/routes";

export type ILink = Required<{
    name: string,
    route: ROUTE_COMMAND,
}>