import {Observable} from "evg_observable/src/outLib/Observable";
import {TableOptions} from "../env/types";

export const TableData$: Observable<TableOptions> = new Observable<TableOptions>(undefined);
export const IsTableReady$: Observable<boolean> = new Observable<boolean>(false);
