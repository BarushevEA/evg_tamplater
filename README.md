# evg_tamplater
## simple html page templater
data attributes markers: "data-" + marker
```ts
export enum E_DATA_MARKER {
    INJECT_TO = "inject_to",
    ON_CLICK = "click",
    ON_CHANGE = "change",
    ON_KEY_DOWN = "keydown",
    ON_KEY_UP = "keyup",
    ON_KEY_DBL_CLICK = "dblclick",
    ON_SCROLL = "scroll",
    ON_WHEEL = "wheel",
    ON_MOUSE_LEAVE = "mouseleave",
    ON_MOUSE_ENTER = "mouseenter",
    ON_MOUSE_UP = "mouseup",
    ON_MOUSE_DOWN = "mousedown",
    ON_MOUSE_MOVE = "mousemove",
    ON_HANDLE = "handle",
    ON_IF = "if",
    CLASS_IF = "cls"
}
```
HTML app components
```html
<txt-val>componentVariable</txt-val>
```
## Examples
### root
```ts
export class AppRoot implements OnInit {
    name: string;
    isShow = true;
    mains: string[] = [
        "<app-main></app-main>",
        "<app-main_1></app-main_1>"
    ];
    mainsCounter = 0;
    currentMain = this.mains[this.mainsCounter];
    root;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.root.collect(
            NextMain$.subscribe(() => {
                this.mainsCounter++;
                if (this.mainsCounter >= this.mains.length) {
                    this.mainsCounter = 0;
                }

                this.currentMain = this.mains[this.mainsCounter];
                this.root.detectChanges();
            })
        );
    }
}
```
```html
<div class="app">
    <app-header></app-header>
    <txt-val>currentMain</txt-val>
    <app-footer></app-footer>
</div>
```
### root
```ts
export class Header implements OnInit {
    text = "SERG header start after:";
    name = this.text;
    buttonName = "NEXT MAIN";
    counter1 = 0;
    root;
    btnRed = "red_css";
    btnBlue = "blue_css";

    constructor(root: RootBehavior) {
        this.root = root;
    }

    clickHeader(evt: MouseEvent): void {
        this.counter1++;
        console.log("clickHeader(evt: MouseEvent): void " + this.counter1);
        evt.stopPropagation();
        evt.preventDefault();
    }

    nextMain(evt: MouseEvent): void {
        evt.stopPropagation();
        evt.preventDefault();

        const elements = this.root.getElementsBoundToMethod(this.nextMain);
        for (const element of elements) {
            element.classList.toggle(this.btnBlue);
            element.classList.toggle(this.btnRed);
        }

        NextMain$.next(true);
    }

    onInit(): void {
        let counter = 0;

        const timer = setInterval(() => {
            this.name = this.text + " " + counter + " ";
            this.root.detectChanges();
            counter++;
            if (counter > 5) {
                clearInterval(timer);
            }
        }, 1000);
    }
}
```
```html
<header class="app_header colored" data-click="clickHeader">
    <txt-val>name</txt-val>
    <br>
    <button class="cursor_pointer blue_css" style="
        width: 200px;
        height: 20px;" data-click="nextMain">
        <txt-val>buttonName</txt-val>
    </button>
</header>
```
### main
```ts
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
```
```html
<main class="app_main">
    <txt-val>name</txt-val>
    <br>
    <txt-val>appInfo</txt-val>
    <br>
    <txt-val>someText</txt-val>
    <br>
    Sergey is my son, he is <txt-val>ag</txt-val> years old.
    <br>
    <br>
    Receipts:
    <br>
    <button data-click="nestReceipt">NEXT Receipt</button>
    <br>
    <br>
    <pre>
        <txt-val>currentReceipt</txt-val>
    </pre>
    <txt-val>test</txt-val>
    <txt-val>test</txt-val>
</main>
```
### main_1
```ts
```
```html
<main class="app_main">
    <txt-val>name</txt-val>
    <button data-click="clickHandler">
        Show HELLO
        <txt-val>counter</txt-val>
    </button>
    <div data-if="isShowHello">
        <txt-val>showedTxt</txt-val>
    </div>
    <div data-handle="handleElement">1</div>
    <div data-handle="handleElement">2</div>
    <div data-handle="handleElementExtra">3</div>
    <div data-handle="handleElementExtra">
        <txt-val>name</txt-val>
    </div>
    <div>
        <txt-val>name</txt-val>
        <span data-handle="handleElementExtra"></span>
    </div>
    <label>
        <input data-keydown="keyDownInput" data-change="changeInput">
    </label>
    <div>
        input key:
        <txt-val>inputKey</txt-val>
    </div>
    <div>
        input change:
        <txt-val>inputChange</txt-val>
    </div>
    <div>
        test function:
        <txt-val>test</txt-val>
    </div>
</main>
```
### footer
```ts
export class Footer implements OnInit{
    name: string;
    readonly root;
    readonly span: HTMLElement;

    constructor(root: RootBehavior) {
        this.root = root;
        this.name = root.tagName;
    }

    onInit(): void {
        this.span.innerHTML = "Test injection ";
    }
}
```
```html
<footer class="app_footer">
    <span data-inject_to="span"></span><txt-val>name</txt-val>
</footer>
```
# modules
```ts
export const MODULES: REG_OPTIONS = [
    getOption(AppRoot, APP_TAG_NAME, "APP_EXAMPLE_____ROOT"),
    getOption(Header, "app-header", "APP_EXAMPLE_____HEADER"),
    getOption(Main, "app-main", "APP_EXAMPLE_____MAIN"),
    getOption(Main_1, "app-main_1", "APP_EXAMPLE_____MAIN_1"),
    getOption(Footer, "app-footer", "APP_EXAMPLE_____FOOTER"),
];
```
