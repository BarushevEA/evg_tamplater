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
* `qsi-channel="variableName"`- Injection IChildChannel element to the variable.
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
* `qsi-src="urlLink"` - This attribute contains the name of url source field.

* `<qsi-bind>fieldName</qsi-bind>` - This tag contains the name of text field.
* `{{fieldName}}` - This the same of qsi-bind.
* `<txt-val>fieldName</txt-val>` - This tag contains the name of HTML text field.

## Routing Functionality

We've added routing functionality in our project for smoother transitions between views.

### Setting Up Routing

Routing settings are located in the <projectName>/src/settings/routes.ts file.

### User-friendly Route Management

For a more user-friendly way of managing routing, we recommend using the ROUTE_COMMAND enum. Its values are set
according to the names of views, which makes scoping and navigating through your views easier and more intuitive.

### Registering Routes

To register routes, use the REGISTER_ROUTES function, which accepts two arguments:

1. Setup of the route, used as a starting point.
2. An array with the registered routes. Routes are specified following the format: label/route/component.

### Routing Mode

Choose the routing mode with the setBrowserRoutingMode function. This mode can be in one of three states:

1. BROWSER_ROUTING.SHOW - routes are displayed in the browser line. When navigating in the browser using history arrows,
   the route will be indicated according to history, and a command to display the view corresponding to this route will
   be generated.
2. BROWSER_ROUTING.SHOW_WITHOUT_HISTORY - history arrows won't work, but routes will be displayed in the browser line
   when navigating to the registered views through routing.
3. BROWSER_ROUTING.HIDDEN - you can navigate through views using routing and command labels, but the browser line will
   only indicate the route with which the application was loaded. The application will react to history arrows according
   to the default browser settings.

### Navigation Between Views

To navigate to the relevant view, use ROUTE_COMMAND$.next, e.g., ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN);.

### Example of the routes settings file:

Initial look:

```typescript
import {BROWSER_ROUTING, REGISTER_ROUTES, setBrowserRoutingMode} from "../../../../libs/elements/rootElements/appRoute";

export const START_ROUTES_REGISTRATION = () => true;

export enum ROUTE_COMMAND {

}

REGISTER_ROUTES(

);

setBrowserRoutingMode(BROWSER_ROUTING.SHOW);
```

Configured look:

```typescript
import {
    BROWSER_ROUTING,
    makeRoute,
    REGISTER_ROUTES,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {Main} from "../modules/elements/main/main";
import {Page1} from "../modules/elements/page1/page1";
import {Page2} from "../modules/elements/page2/page2";
import {Page3} from "../modules/elements/page3/page3";

export const START_ROUTES_REGISTRATION = () => true;

export enum ROUTE_COMMAND {
    MAIN = "MAIN",
    PAGE1 = "PAGE1",
    PAGE2 = "PAGE2",
    PAGE3 = "PAGE3",
}

REGISTER_ROUTES(
    ROUTE_COMMAND.MAIN,
    [
        makeRoute(ROUTE_COMMAND.MAIN, "/main", Main),
        makeRoute(ROUTE_COMMAND.PAGE1, "/page1", Page1),
        makeRoute(ROUTE_COMMAND.PAGE2, "/page2", Page2),
        makeRoute(ROUTE_COMMAND.PAGE3, "/page3", Page3),
    ]
);

setBrowserRoutingMode(BROWSER_ROUTING.SHOW);
```
