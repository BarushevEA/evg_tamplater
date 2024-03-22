import {GTimeout} from "./TickGenerator/GTimeout";
import {GInterval} from "./TickGenerator/GInterval";
import {GAnimationFrame} from "./TickGenerator/GAnimationFrame";
import {GTimeoutOrdered} from "./TickGenerator/GTimeoutOrdered";
import {GIntervalOrdered} from "./TickGenerator/GIntervalOrdered";
import {GAnimationFrameOrdered} from "./TickGenerator/GAnimationFrameOrdered";

const parent = (<any>window);
parent.GTimeout = GTimeout;
parent.GInterval = GInterval;
parent.GAnimationFrame = GAnimationFrame;
parent.GTimeoutOrdered = GTimeoutOrdered;
parent.GIntervalOrdered = GIntervalOrdered;
parent.qwe = GAnimationFrameOrdered;
