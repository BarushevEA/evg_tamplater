import {Collector, Observable, OrderedObservable} from "../../../libs/Observables";

const parent = (<any>window);

parent.Observable = Observable;
parent.Collector = Collector;
parent.OrderedObservable = OrderedObservable;
