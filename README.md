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
* `{{fieldName}}` - This is the same as qsi-bind.
* `<txt-val>fieldName</txt-val>` - This tag contains the name of HTML text field.

## Routing Functionality

We've added routing functionality in our project for smoother transitions between views.

* `<qsi-route></qsi-route>` - This tag implements routing.
* `<qsi-subroute name="yourSubRoutName"></qsi-subroute>` - This tag implements subrouting and contains the name of
  subroute.

### Setting Up Routing

Routing settings are located in the <projectName>/src/settings/routes.ts file.
SubRouting settings are located in the <projectName>/src/settings/subRoutes.ts file.
SubRouting additional settings are located in the <projectName>/src/settings/subRoutesEnums.ts file.

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
Or alternative ROUTE().SHOW_PAGE(ROUTE_COMMAND.MAIN);

To navigate by subRoute use SUB_ROUTE(E_SUB_ROUTE.NAME).SHOW_PAGE(SUB_ROUTE_PAGE.NAME).

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

```typescript
import {REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";

export const START_SUB_ROUTES_REGISTRATION = () => true;

REGISTER_SUB_ROUTES(

);
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
```typescript
export enum E_SUB_ROUTE {
    HEADER = "header",
    FOOTER = "footer"
}

export enum SUB_ROUTE_PAGE {
    Header = "Header",
    AdditionalHeader = "AdditionalHeader",
    MainFooter = "MainFooter",
    AdditionalFooter = "AdditionalFooter"
}
```
```typescript
import {REGISTER_SUB_ROUTES} from "../../../../libs/elements/rootElements/appSubRout";
import {Header} from "../modules/elements/header/header";
import {Additional_header} from "../modules/elements/additional_header/additional_header";
import {E_SUB_ROUTE, SUB_ROUTE_PAGE} from "./subRoutesEnums";
import {Main_footer} from "../modules/elements/main_footer/main_footer";
import {Additional_footer} from "../modules/elements/additional_footer/additional_footer";

export const START_SUB_ROUTES_REGISTRATION = () => true;

const header = new APP_SUB_ROUTE(E_SUB_ROUTE.HEADER, SUB_ROUTE_PAGE.Header);
header
    .addPage(SUB_ROUTE_PAGE.Header, Header)
    .addPage(SUB_ROUTE_PAGE.AdditionalHeader, Additional_header);

const footer = new APP_SUB_ROUTE(E_SUB_ROUTE.FOOTER, SUB_ROUTE_PAGE.MainFooter);
footer
    .addPage(SUB_ROUTE_PAGE.MainFooter, Main_footer)
    .addPage(SUB_ROUTE_PAGE.AdditionalFooter, Additional_footer);

REGISTER_SUB_ROUTES(header, footer);

// <qsi-subroute name="header"></qsi-subroute>
// <qsi-subroute name="footer"></qsi-subroute>
```

### Routing Collections example

```typescript
export enum MAIN_ROUTES {
    HOME = "HOME",
    ABOUT = "ABOUT",
    CONTACT = "CONTACT",
}

export enum CARS_ROUTES {
    OLD_CARS = "OLD_CARS",
    NEW_CARS = "NEW_CARS",
    POPULAR_CARS = "POPULAR_CARS",
}

export enum POPULAR_CARS_ROUTES {
    POPULAR_CARS_LIST = "POPULAR_CARS_LIST",
    POPULAR_CARS_DETAILS = "POPULAR_CARS_DETAILS",
}
```

```typescript
import {
    BROWSER_ROUTING,
    mergeRouteCollections,
    REGISTER_ROUTES,
    ROUTE_COLLECTION,
    setBrowserRoutingMode
} from "../../../../libs/elements/rootElements/appRoute";
import {CARS_ROUTES, MAIN_ROUTES, POPULAR_CARS_ROUTES} from "./routesEnums";
import {Home} from "../modules/elements/main/home/home";
import {About} from "../modules/elements/main/about/about";
import {Contact} from "../modules/elements/main/contact/contact";
import {Popular_cars} from "../modules/elements/cars/popular_cars/popular_cars";
import {New_cars} from "../modules/elements/cars/new_cars/new_cars";
import {Old_cars} from "../modules/elements/cars/old_cars/old_cars";
import {Popular_cars_list} from "../modules/elements/cars/popular_cars/popular_cars_list/popular_cars_list";
import {Popular_cars_details} from "../modules/elements/cars/popular_cars/popular_cars_details/popular_cars_details";

export const START_ROUTES_REGISTRATION = () => true;

const main = new ROUTE_COLLECTION(MAIN_ROUTES.HOME, "/main", Home);
main.add(MAIN_ROUTES.ABOUT, "/about", About)
    .add(MAIN_ROUTES.CONTACT, "/contact", Contact);

const cars = new ROUTE_COLLECTION(CARS_ROUTES.POPULAR_CARS, "/cars", Popular_cars);
cars.add(CARS_ROUTES.NEW_CARS, "/new", New_cars)
    .add(CARS_ROUTES.OLD_CARS, "/old", Old_cars);

const popular_cars = new ROUTE_COLLECTION(POPULAR_CARS_ROUTES.POPULAR_CARS_LIST, "/popular/list", Popular_cars_list);
popular_cars.add(POPULAR_CARS_ROUTES.POPULAR_CARS_DETAILS, "/popular/details", Popular_cars_details);

cars.addCollection(popular_cars);

REGISTER_ROUTES(MAIN_ROUTES.HOME, mergeRouteCollections(main, cars));

setBrowserRoutingMode(BROWSER_ROUTING.SHOW);
```
