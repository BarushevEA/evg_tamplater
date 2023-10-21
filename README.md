## Short project instruction
### for create project:
- open terminal
- go to *pm.js* directory
- run the command: *node pm.js p yourProjectName* 
### for create component:
- open terminal
- select the project
- go to *cm.js* directory
- run the command: *node cm.js c yourComponentName*

## Short actions instruction

### data-click="functionName"
- attribute contains function name of this component, which handle when you click on the element;
### data-if="variableName or functionName" 
- attribute that contains field name, if value of field equals true element will be show
### data-handle="functionName" 
- attribute contains function name of this component. When function is calling, you can get related elements and process them
### data-inject_to="variableName"
- injection HTML element to the variable
### data-change="functionName"
- serving a data-change action using function name
### data-keydown="functionName"
- serving a data-keydown action using function name
### data-keyup="functionName"
- serving a data-keyup action using function name
### data-dblclick="functionName"
- serving a data-dblclick action using function name
### data-scroll="functionName"
- serving a data-scroll action using function name 
### data-wheel="functionName"
- serving a data-wheel action using function name
### data-mouseleave="functionName"
- serving a data-mouseleave action using function name 
### data-mouseenter="functionName"
- serving a data-mouseenter action using function name
### data-mouseup="functionName"
- serving a data-mouseup action using function name 
### data-mousedown="functionName"
- serving a data-mousedown action using function name
### data-cls="classCondition"
- serving classes based on conditions using variable name or function name
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
### data-for="arrName"
