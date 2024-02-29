import {Observable} from "evg_observable/src/outLib/Observable";
import {Collector} from "evg_observable/src/outLib/Collector";
import {OrderedObservable} from "evg_observable/src/outLib/OrderedObservable";

const parent = (<any>window);

parent.Observable = Observable;
parent.Collector = Collector;
parent.OrderedObservable = OrderedObservable;
