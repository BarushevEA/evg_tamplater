import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {GAnimationFrame} from "../../../TickGenerator/GAnimationFrame";
import {TickCounter} from "../../../TickGenerator/TickCounter";
import {EState} from "../../../TickGenerator/Env";
import {GMeter} from "../../../TickGenerator/GMeter";

export class Main implements OnInit, OnCreate, OnDestroy {
    name: string;
    fpsCounter: number;
    fpsTxt: string;
    animationFrame: GAnimationFrame;
    animationCounter: TickCounter;
    meter: GMeter;
    isStop: boolean;
    animationState: any;
    chosenFps: number;
    runningSting = "-----------[TEST-FPS-PROCESSING]-----------";
    strArr: string[] = this.runningSting.split("");

    constructor(readonly root: RootBehavior) {
        this.init(root);
    }

    onCreate(): void {
    }

    onInit(): void {
        this.fpsTxt = this.getFpsTxt();
        this.root.detectChanges();

        this.animationFrame.setDefault();
        this.animationFrame.subscribeOnState((state) => this.showText(state));
        this.animationCounter.subscribe(fps => this.showFps(fps));

        this.animationFrame.start();
        this.animationCounter.start();
    }

    onDestroy(): void {
        this.animationFrame.stop();
        this.animationCounter.stop();
    }

    set60Fps(): void {
        this.animationFrame.set60fps();
        this.chosenFps = 60;
    }

    set30Fps(): void {
        this.animationFrame.setFPS(30);
        this.chosenFps = 30;
    }

    start(): void {
        this.animationFrame.start();
        this.animationCounter.start();
        this.meter.start();
    }

    stop(): void {
        this.animationFrame.stop();
        this.animationCounter.stop();
        this.meter.stop();
        this.showFps(0);
        console.log(this.meter.getAll());
    }

    setCustomFps(evt: Event): void {
        this.chosenFps = +(<any>evt.target).value;
        if (typeof this.chosenFps === "number") {
            this.animationFrame.setFPS(this.chosenFps);
        }
    }

    private init(root: RootBehavior) {
        this.name = root.tagName;
        this.fpsCounter = 0;
        this.fpsTxt = "";
        this.animationFrame = new GAnimationFrame();
        this.animationCounter = new TickCounter(this.animationFrame);
        this.meter = new GMeter();
        this.isStop = true;
        this.animationState = "";
        this.chosenFps = 60;
        this.addMetrics();
    }

    private addMetrics() {
        this.onInit = this.meter.decorate("this.onInit", this.onInit.bind(this));
        this.start = this.meter.decorate("this.start", this.start.bind(this));
        this.stop = this.meter.decorate("this.stop", this.stop.bind(this));
        this.getFpsTxt = this.meter.decorate("this.getFpsTxt", this.getFpsTxt.bind(this));
        this.showText = this.meter.decorate("this.showText", this.showText.bind(this));
        this.showFps = this.meter.decorate("this.showFps", this.showFps.bind(this));
        this.meter.start();
    }

    private getFpsTxt(): string {
        return `${this.fpsCounter} fps`;
    }

    private showText(state: EState) {
        this.animationState = state;

        const str = this.strArr.shift();
        this.strArr.push(str);

        this.runningSting = this.strArr.join("");
        this.root.detectChanges();
    }

    private showFps(fps: number) {
        this.fpsCounter = fps;
        this.fpsTxt = this.getFpsTxt();
        this.isStop = !this.fpsCounter;
        this.root.detectChanges();
    }
}
