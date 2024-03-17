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

* `qsi-click="functionName"` - The attribute contains the function name of this component, which will handle click
  events on the element.
* `qsi-if="variableName or functionName" ` - The attribute contains the field name of this component, if value of field
  equals true element will show.
* `qsi-handle="functionName" ` The - attribute contains function name of this component. When function is calling, you
  can get related elements and process them.
* `qsi-inject_to="variableName"`- Injection HTML element to the variable.
* `qsi-change="functionName"` - Serving a qsi-change action using function name.
* `qsi-keydown="functionName"` - Serving a qsi-keydown action using function name.
* `qsi-keyup="functionName"` - Serving a qsi-keyup action using function name.
* `qsi-dblclick="functionName"` - Serving a qsi-dblclick action using function name.
* `qsi-scroll="functionName"` - Serving a qsi-scroll action using function name.
* `qsi-wheel="functionName"` - Serving a qsi-wheel action using function name.
* `qsi-mouseleave="functionName"` - Serving a qsi-mouseleave action using function name.
* `qsi-mouseenter="functionName"` - Serving a qsi-mouseenter action using function name.
* `qsi-mouseup="functionName"` - Serving a qsi-mouseup action using function name.
* `qsi-mousedown="functionName"` - Serving a qsi-mousedown action using function name.
* `qsi-cls="classCondition"` - Serving classes based on conditions using variable name or function name.
### !!! IMPORTANT !!! if you want to use css encryption - className != conditionName
```js
<div qsi-cls="class1">=== div.classList.add("class1")
    <div qsi-cls="class1:true">=== div.classList.add("class1")
        <div qsi-cls="class1:false">=== div.classList.remove("class1")
            <div qsi-cls="true?class1:class2">=== div.classList.add("class1") & div.classList.remove("class2")
                <div qsi-cls="false?class1:class2">=== div.classList.add("class2") & div.classList.remove("class1")
```
```html

<div qsi-cls="class1"></div>
<div qsi-cls="class1:condition class2:condition class3:condition"></div>
<div qsi-cls="class1:condition1 class2:condition2 class3:condition3"></div>
<div class="class0" qsi-cls="class1:condition1 class2:condition2 class3:condition3"></div>
<div qsi-cls="condition?class1:class2"></div>
```

* `qsi-for="arrName"` - This attribute contains the name of iterated array.
