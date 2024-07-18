import {GTimeout} from "./TickGenerator/GTimeout";
import {GInterval} from "./TickGenerator/GInterval";
import {GAnimationFrame} from "./TickGenerator/GAnimationFrame";
import {GTimeoutOrdered} from "./TickGenerator/GTimeoutOrdered";
import {GIntervalOrdered} from "./TickGenerator/GIntervalOrdered";
import {GAnimationFrameOrdered} from "./TickGenerator/GAnimationFrameOrdered";
import {TickCounter} from "./TickGenerator/TickCounter";
import {GMeter} from "./TickGenerator/GMeter";

const parent = (<any>window);
parent.GTimeout = GTimeout;
parent.GTimeoutOrdered = GTimeoutOrdered;

parent.GInterval = GInterval;
parent.GIntervalOrdered = GIntervalOrdered;

parent.GAnimationFrame = GAnimationFrame;
parent.GAnimationFrameOrdered = GAnimationFrameOrdered;

parent.TickCounter = TickCounter;
parent.GMeter = GMeter;
