import {GMeter} from "../../../libs/TickGenerator";

const meter = new GMeter();

function testFunc(i: number) {
    return 10 + i;
}

const testArrow = (i: number) => {
    return 10 + i;
};

const delay = 10000000000;

function fnc() {
    for (let i = 0; i < delay; i++) testFunc(i);
}

function arw() {
    for (let i = 0; i < delay; i++) testArrow(i);
}

let fnc1 = meter.decorate("fnc", fnc);
let arw1 = meter.decorate("arw", arw);

meter.start();

fnc1();
arw1();

meter.stop();

console.log(meter.getAll());
