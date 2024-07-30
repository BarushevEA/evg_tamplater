import {GMeter} from "./GMeter";
import {IMeter} from "./Types";

const gMeter = new GMeter();

export function Measure(classNameOriginal?: string, gMeterOptional?: GMeter) {
    const meter = gMeterOptional ? gMeterOptional : gMeter;
    meter.start();

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        let className = classNameOriginal || target.name || "";

        const funcType1 = Object.prototype.toString.call(originalMethod);
        const funcType2 = originalMethod[Symbol.toStringTag];
        const isAsync = funcType1 === '[object AsyncFunction]' || funcType2 === 'AsyncFunction';

        if (isAsync) {
            descriptor.value = meter.decorateAsync(`Async method: ${className}.${propertyKey}`, originalMethod);
        } else {
            descriptor.value = meter.decorate(`Sync method: ${className}.${propertyKey}`, originalMethod);
        }
    };
}

export function getDefaultMeasureMeter(): IMeter {
    return gMeter;
}
