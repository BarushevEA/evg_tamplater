import {GMeter} from "./GMeter";
import {IMeter} from "./Types";

const gMeter = new GMeter();

export function Measure(measurementName?: string, gMeterOptional?: GMeter) {
    const meter = gMeterOptional ? gMeterOptional : gMeter;
    meter.start();

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        let targetName = target.name || "this";

        const funcType1 = Object.prototype.toString.call(originalMethod);
        const funcType2 = originalMethod[Symbol.toStringTag];
        const isAsync = funcType1 === '[object AsyncFunction]' || funcType2 === 'AsyncFunction';

        let decorated: any;

        if (isAsync) {
            const decorationName = measurementName || `Async method: ${targetName}.${propertyKey}`;
            descriptor.value = function (...args: any[]) {
                !decorated && (decorated = meter.decorateAsync(decorationName, (dataArr) => originalMethod.apply(this, dataArr)));
                return decorated(args);
            };
        } else {
            const decorationName = measurementName || `Sync method: ${targetName}.${propertyKey}`;
            descriptor.value = function (...args: any[]) {
                !decorated && (decorated = meter.decorate(decorationName, (dataArr) => originalMethod.apply(this, dataArr)));
                return decorated(args);
            };
        }
    };
}

export function getDefaultMeasureMeter(): IMeter {
    return gMeter;
}
