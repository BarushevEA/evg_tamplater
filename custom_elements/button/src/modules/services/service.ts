import {Observable} from "../../../../../libs/Observables";
import {ButtonOptions} from "../env/types";
import {TYPE} from "../../settings/subRoutesEnums";
import {DEFAULT_BUTTON_OPTIONS} from "../env/variables";

export const buttonService$: Observable<ButtonOptions<TYPE>> = new Observable(DEFAULT_BUTTON_OPTIONS);