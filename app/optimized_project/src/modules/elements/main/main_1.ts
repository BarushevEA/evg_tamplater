import {OnInit, RootBehavior} from "../../../../../../libs/env/types";

export class Main_1 implements OnInit {
    name: string;
    isShowHello = false;
    showedTxt = "---HELLO WORLD !!!---";
    root;
    counter = 0;
    inputKey = "";
    inputChange = "";

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.counter = 0;

        this.root.collect(
            this.root.beforeDetectChanges$.subscribe(()=>{
                this.counter++;
            }),
            this.root.onChangesDetected$.subscribe(() => {
                this.handleElement();
                this.handleElementExtra();
            })
        );
    }

    clickHandler(evt: MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();

        this.isShowHello = !this.isShowHello;
        this.root.detectChanges();
    }

    keyDownInput(evt: KeyboardEvent): void {
        console.log("keyDownInput(evt: KeyboardEvent)", evt.key);
        this.inputKey = evt.key;
        this.root.detectChanges();
    }

    changeInput(evt: Event): void {
        console.log("changeInput(evt: KeyboardEvent)", (<any>evt.target).value);
        this.inputChange = (<any>evt.target).value;
        this.root.detectChanges();
    }

    handleElement() {
        const elements = this.root.getElementsBoundToMethod(this.handleElement);

        for (const element of elements) {
            element.innerHTML = ` handled ${this.counter}`;
        }
    }

    handleElementExtra() {
        const elements = this.root.getElementsBoundToMethod(this.handleElementExtra);

        for (const element of elements) {
            element.innerHTML = ` handled extra ${this.counter}`;
        }
    }

    test(): string {
        return `TEST ${this.counter}`;
    }
}
