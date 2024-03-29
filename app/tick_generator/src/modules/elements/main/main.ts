import {OnCreate, OnDestroy, OnInit, RootBehavior} from "../../../../../../libs/elements/types";
import {GAnimationFrame} from "../../../TickGenerator/GAnimationFrame";
import {TickCounter} from "../../../TickGenerator/TickCounter";

export class Main implements OnInit, OnCreate, OnDestroy {
    name: string;
    fpsCounter: number;
    fpsTxt: string;
    animationFrame: GAnimationFrame;
    counter: TickCounter;
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
        this.animationFrame.subscribeOnState((state) => {
            this.animationState = state;

            const str = this.strArr.shift();
            this.strArr.push(str);

            this.root.detectChanges();
            this.runningSting = this.strArr.join("");
        });

        this.counter.subscribe(fps => this.showFps(fps));

        this.animationFrame.start();
        this.counter.start();
    }

    onDestroy(): void {
        this.animationFrame.stop();
        this.counter.stop();
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
        this.counter.start();
    }

    stop(): void {
        this.animationFrame.stop();
        this.counter.stop();
        this.showFps(0);
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
        this.counter = new TickCounter(this.animationFrame);
        this.isStop = true;
        this.animationState = "";
        this.chosenFps = 60;
    }

    private getFpsTxt(): string {
        return `${this.fpsCounter} fps`;
    }

    private showFps(fps: number) {
        this.fpsCounter = fps;
        this.fpsTxt = this.getFpsTxt();
        this.isStop = !this.fpsCounter;
        this.root.detectChanges();
    }
}
