import {Observable} from "./Observables/Observable";
import {Collector} from "./Observables/Collector";
import {OrderedObservable} from "./Observables/OrderedObservable";

const parent = (<any>window);

parent.Observable = Observable;
parent.Collector = Collector;
parent.OrderedObservable = OrderedObservable;
