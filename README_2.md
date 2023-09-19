## Short actions instruction

### data-click 
- attribute contains function name of this component, which handle when you click on the element;
### data-if 
- attribute that contains field name, if value of field equals true element will be show
### data-handle 
- attribute contains function name of this component. When function is calling, you can get related elements and process them
### data-inject_to
- injection HTML element to the variable
### data-change
- serving a data-change action using function name
### data-keydown
- serving a data-keydown action using function name
### data-keyup
- serving a data-keyup action using function name
### data-dblclick
- serving a data-dblclick action using function name
### data-scroll
- serving a data-scroll action using function name 
### data-wheel
- serving a data-wheel action using function name
### data-mouseleave
- serving a data-mouseleave action using function name 
### data-mouseenter
- serving a data-mouseenter action using function name
### data-mouseup
- serving a data-mouseup action using function name 
### data-mousedown
- serving a data-mousedown action using function name
### data-handle
- serving a data-handle action using function name 
### data-cls
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
