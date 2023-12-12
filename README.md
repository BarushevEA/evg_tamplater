## Project Instructions

### Creating a Project

1. Open your terminal.
2. Navigate to the `pm.js` directory.
3. Run the command: `node pm.js p <YourProjectName>`
    * Replace `<YourProjectName>` with the name of your project.

### Creating a Component

1. Open your terminal.
2. Navigate to the `cm.js` directory.
3. Run the command: `node cm.js c <YourComponentName> [d <ComponentDirectory>]`
    * Replace `<YourComponentName>` with the name of your component and `<ComponentDirectory>` with the directory of
      your component.
    * The `[d <ComponentDirectory>]` argument is optional.

## Instruction for Actions

* `data-click="functionName"` - The attribute contains the function name of this component, which will handle click
  events on the element.
* `data-if="variableName or functionName" ` - The attribute contains the field name of this component, if value of field
  equals true element will show.
* `data-handle="functionName" ` The - attribute contains function name of this component. When function is calling, you
  can get related elements and process them.
* `data-inject_to="variableName"`- Injection HTML element to the variable.
* `data-change="functionName"` - Serving a data-change action using function name.
* `data-keydown="functionName"` - Serving a data-keydown action using function name.
* `data-keyup="functionName"` - Serving a data-keyup action using function name.
* `data-dblclick="functionName"` - Serving a data-dblclick action using function name.
* `data-scroll="functionName"` - Serving a data-scroll action using function name.
* `data-wheel="functionName"` - Serving a data-wheel action using function name.
* `data-mouseleave="functionName"` - Serving a data-mouseleave action using function name.
* `data-mouseenter="functionName"` - Serving a data-mouseenter action using function name.
* `data-mouseup="functionName"` - Serving a data-mouseup action using function name.
* `data-mousedown="functionName"` - Serving a data-mousedown action using function name.
* `data-cls="classCondition"` - Serving classes based on conditions using variable name or function name.
### !!! IMPORTANT !!! if you want to use css encryption - className != conditionName
```js
<div data-cls="class1"> === div.classList.add("class1")
<div data-cls="class1:true"> === div.classList.add("class1")
<div data-cls="class1:false"> === div.classList.remove("class1")
<div data-cls="true?class1:class2"> === div.classList.add("class1") & div.classList.remove("class2")
<div data-cls="false?class1:class2"> === div.classList.add("class2") & div.classList.remove("class1")
```
```html
<div data-cls="class1"></div>
<div data-cls="class1:condition class2:condition class3:condition"></div>
<div data-cls="class1:condition1 class2:condition2 class3:condition3"></div>
<div class="class0" data-cls="class1:condition1 class2:condition2 class3:condition3"></div>
<div data-cls="condition?class1:class2"></div>
```

* `data-for="arrName"` - This attribute contains the name of iterated array.
