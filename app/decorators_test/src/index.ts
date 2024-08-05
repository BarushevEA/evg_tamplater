// import {APP_INFO} from "./settings/info";
// import {APP_LOCALE} from "../../../libs/elements/AppLocalization/LocationManager";
// import {LOCATION} from "../../../libs/elements/AppLocalization/location";
// import {MODULES} from "./settings/modules";
// import {RENDER_MANAGER} from "../../../libs/elements/rootElements/managers/RenderManager";
//
// APP_INFO.init();
// APP_LOCALE.setLocation(LOCATION.EN);
// RENDER_MANAGER.register(MODULES);
// RENDER_MANAGER.run();

// ДЕКОРАТОР МЕТОДА

// function timing(classNameOriginal: string) {
//     return function (target: any, key: string, descriptor: any) {
//         const originalMethod = descriptor.value;
//
//         descriptor.value = function (...args: any[]) {
//             console.log(`Class name is: [original: ${classNameOriginal}] [minified: ${target.name}]`);
//             console.log(`Starting [method: ${key}] at ${new Date().toISOString()}`);
//
//             const start = performance.now();
//             const result = originalMethod.apply(this, args);
//             const finish = performance.now();
//
//             console.log(`Finished [method: ${key}] at ${new Date().toISOString()} took ${(finish - start).toFixed(2)}`);
//
//             return result;
//         };
//
//         return descriptor;
//     };
// }
//
// class Test {
//     @timing('Test')  // notice the use of arguments in decorator here
//     public static test() {
//         let a = 0;
//         for (let i = 0; i < 1000000000; i++) {
//             a++;
//         }
//
//         console.log(a);
//     }
// }
//
// Test.test();
//
// // ДЕКОРАТОР КЛАССА
// function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         newProperty = "new property";
//     }
// }
//
// @classDecorator
// class MyClass {
//     property = "property";
// }
//
// const myInstance = new MyClass();
// //@ts-ignore
// console.log(myInstance.newProperty);  // Выводит: "new property"
//
// function classDecorator1<T extends { new(...args: any[]): {} }>(originalConstructor: T) {
//     // Сохраняем ссылку на оригинальный конструктор
//     let newConstructor: any = function (...args: any[]) {
//         console.log("Arguments for the constructor: ", args.join(", "));
//         new originalConstructor(...args);
//     }
//
//     newConstructor.prototype = originalConstructor.prototype;
//     return newConstructor as T;
// }
//
// @classDecorator1
// class MyClass1 {
//     constructor(public property: string) {
//     }
// }
//
// new MyClass1("Some value");
//
// // ДЕКОРАТОР ПАРАМЕТРОВ
// function logParameter(target: any, propertyKey: string, parameterIndex: number) {
//     let metadataKey = `__log_${propertyKey}_parameters`;
//     if (Array.isArray(target[metadataKey])) {
//         target[metadataKey].push(parameterIndex);
//     } else {
//         target[metadataKey] = [parameterIndex];
//     }
//     console.log(`Logging parameter for method: ${propertyKey}, at index: ${parameterIndex}`);
// }
//
// class C {
//     [key: string]: any;  // Добавляем строку для динамических ключей
//
//     greet(@logParameter message: string, @logParameter message1: string): number {
//         let metadataKey = `__log_${"greet"}_parameters`;
//         console.log('Logged parameters:', this[metadataKey]);
//         console.log(message, message1);
//         return 42;
//     }
// }
//
// let c1 = new C();
// c1.greet("HELLO1", "WORLD1");
// c1.greet("HELLO2", "WORLD2");

// class MyExtraService {
//     // какой-то код
// }
//
// export const myExtraService = new MyExtraService();
//
// let service = myExtraService;
//
// class MyExtraServiceMoc {
//     // какой-то код
// }
// service = new MyExtraServiceMoc();

// const gMeter = new GMeter();
//
// export function Measure(classNameOriginal?: string, gMeterOptional?: GMeter) {
//     const meter = gMeterOptional ? gMeterOptional : gMeter;
//     meter.start();
//
//     return function (
//         target: any,
//         propertyKey: string,
//         descriptor: PropertyDescriptor
//     ) {
//         const originalMethod = descriptor.value;
//         let className = classNameOriginal || target.name || "";
//
//         const funcType1 = Object.prototype.toString.call(originalMethod);
//         const funcType2 = originalMethod[Symbol.toStringTag];
//         const isAsync = funcType1 === '[object AsyncFunction]' || funcType2 === 'AsyncFunction';
//
//         if (isAsync) {
//             descriptor.value = meter.decorateAsync(`Async method: ${className}.${propertyKey}`, originalMethod);
//         } else {
//             descriptor.value = meter.decorate(`Sync method: ${className}.${propertyKey}`, originalMethod);
//         }
//     };
// }

// Пример использования
import {getDefaultMeasureMeter, Measure} from "../../../libs/TickGenerator";

class Example {
    @Measure()
    someMethod1() {
        console.log('someMethod1: This method is metered');
        let a = 0;
        for (let i = 0; i < 1000000000; i++) {
            a++;
        }
    }

    @Measure()
    async someMethod2() {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log('someMethod2: This method is metered');
    }
}

const gMeter = getDefaultMeasureMeter();
const example = new Example();
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod2().finally(() => true);
example.someMethod1();
example.someMethod1();
example.someMethod1();
example.someMethod1();
example.someMethod1();
example.someMethod1();
example.someMethod1();

setTimeout(() => {
    console.log(gMeter.getAll());
    gMeter.destroy();
}, 10000);
