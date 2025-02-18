import {Observable} from "../../../../../libs/Observables";
import {ButtonOptions, DEFAULT_BUTTON_OPTIONS} from "../env/types";
import {TYPE} from "../../settings/subRoutesEnums";

export const buttonService$: Observable<ButtonOptions<TYPE>> = new Observable(DEFAULT_BUTTON_OPTIONS);