import {Observable} from "evg_observable/src/outLib/Observable";
import {TableOptions} from "../env/types";

export const TableData$ = new Observable<TableOptions>(undefined);
export const IsTableReady$ = new Observable<boolean>(false);
