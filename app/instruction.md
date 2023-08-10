## Short instruction
Custom element "Main_1_Element" contains a html template

### Template has a service module "<text-value>" which contains a variable "name"  
The "Main_1_Element" component has a same variable. 
When "name" data change need to call function "this.detectChanges()".
Also template has children with data attributes:

### data-click 
- attribute contains function name of this component, which handle when you click on the element;
### data-if 
- attribute that contains field name, if value of field equals true element will be show
### data-handle 
- attribute contains function name of this component. When function is calling, you can get related elements and process them
### data-change
### data-keydown
### data-keyup
### data-dblclick
### data-scroll
### data-wheel
### data-mouseleave
### data-mouseenter
### data-mouseup
### data-mousedown
### data-handle

```html
<main class="app_main">
    <text-value>name</text-value>
    <button data-click="clickHandler">Show HELLO</button>
    <div data-if="isShowHello">HELLO WORLD !!!</div>
    <div data-handle="handleElement">1</div>
    <div data-handle="handleElement">2</div>
    <div data-handle="handleElement">3</div>
</main>
```

```ts
const options: ELEMENT_OPTIONS<Event$> = {
    htmlTemplate: customTemplate.get(E_SUBS_TEMPLATE.MAIN_1),
    startEvent: Event$.UNDEFINED
}

export class Main_1_Element extends AbstractHtmlElement<Event$> {
    name = this.tagName;
    isShowHello = false;

    constructor() {
        super(options);
    }

    onCreate(): void {
        this.state = Event$.BEFORE_INIT;
    }

    onInit(): void {
        this.state = Event$.INIT;

        this.collect(
            this.onChangesDetected$.subscribe(() => {
                this.handleElement();
            })
        );
    }

    clickHandler(evt: MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();

        this.isShowHello = !this.isShowHello;
        this.detectChanges();
    }

    handleElement() {
        const elements = this.getElementsBoundToMethod(this.handleElement);

        for (const element of elements) {
            element.innerHTML += " handled";
        }
    }

    onDestroy(): void {
        this.state = Event$.DESTROY;
    }
}
```
