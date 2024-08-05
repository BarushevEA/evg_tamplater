import {CellId, OptionsCollector} from "../env/types";
import {Observable} from "../../../../../libs/Observables";

export const IsTableReady$: Observable<OptionsCollector> = new Observable<OptionsCollector>(<any>0);
export const CellChange$: Observable<CellId> = new Observable<CellId>(<any>0);
