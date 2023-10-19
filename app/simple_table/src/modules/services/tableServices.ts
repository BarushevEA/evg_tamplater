import {Observable} from "evg_observable/src/outLib/Observable";
import {CellId, OptionsCollector} from "../env/types";

export const IsTableReady$: Observable<OptionsCollector> = new Observable<OptionsCollector>(<any>0);
export const CellChange$: Observable<CellId> = new Observable<CellId>(<any>0);
