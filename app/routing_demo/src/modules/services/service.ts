import {Observable} from "../../../../../libs/Observables";
import {COLOR} from "../env/enums";

export const CURRENT_COLOR$ = new Observable<COLOR>(COLOR.BLUE);
