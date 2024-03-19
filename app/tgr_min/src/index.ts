import {GTimeout} from "./TickGenerator/GTimeout";
import {GInterval} from "./TickGenerator/GInterval";
import {GAnimationFrame} from "./TickGenerator/GAnimationFrame";

const parent = (<any>window);
parent.GTimeout = GTimeout;
parent.GInterval = GInterval;
parent.GAnimationFrame = GAnimationFrame;
