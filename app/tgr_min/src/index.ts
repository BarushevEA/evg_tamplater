import {
    GAnimationFrame,
    GAnimationFrameOrdered,
    GInterval,
    GIntervalOrdered,
    GMeter,
    GTimeout,
    GTimeoutOrdered,
    TickCounter
} from "../../../libs/TickGenerator";

const parent = (<any>window);
parent.GTimeout = GTimeout;
parent.GTimeoutOrdered = GTimeoutOrdered;

parent.GInterval = GInterval;
parent.GIntervalOrdered = GIntervalOrdered;

parent.GAnimationFrame = GAnimationFrame;
parent.GAnimationFrameOrdered = GAnimationFrameOrdered;

parent.TickCounter = TickCounter;
parent.GMeter = GMeter;
