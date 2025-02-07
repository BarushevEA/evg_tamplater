## Introduction

This document describes a lightweight web application framework inspired by Angular but focused on performance and minimal final code size. The framework automates many routine development tasks, from project creation to building the final application.

**Key Features:**

* **Component Architecture:** Applications are built from components, each consisting of a JS/TS module, an HTML template, and an SCSS style file.
* **Native Rendering:** Unlike frameworks using a virtual DOM, this framework employs native rendering for optimized performance. Components establish connections during the rendering process, starting from the deepest nodes.
* **Small Size:** The framework ensures a minimal size for the final binary file, which contains compressed JS, HTML, and CSS.
* **Automation:** Scripts like `pm.js`, `cm.js`, `dist.js`, and `addCustomElement.js` automate project creation, component management, and application building.
* **Routing:** A built-in routing system supports primary and nested routes.
* **Data Binding and Conditional Rendering:** Special attributes (`qsi-*`) simplify dynamic component management.
* **Custom Components:**  Supports the development and integration of custom components as standalone projects.

The following sections of this document detail all aspects of working with the framework: creating projects and components, using attributes, configuring routing, and managing custom components.

## Project Instructions

### Creating Projects and Components

This section explains how to create new projects and components using command-line arguments or an interactive guided mode.

#### Creating a Project

To create a project, use the `pm.js` script:

```sh
node pm.js [options] <Name>
```

* `<Name>`: The name of your project or component.
* `[options]`:
    * `p`: Creates a standard project.  This is the default option if no other option is provided.
    * `cstm`: Creates a custom reusable component.

If you run `node pm.js` without any arguments, you'll enter an interactive mode where you can choose the project type and enter the name.

#### Creating a Component

To create a component, use the `cm.js` script:

```sh
node cm.js c <ComponentName> [d <ComponentDirectory>]
```

* `<ComponentName>`: The name of your component.
* `[d <ComponentDirectory>]`:  (Optional) The directory for your component. If omitted, the component will be placed in the default directory.


Running `node cm.js` without any arguments starts an interactive mode to guide you through component creation. You can choose to specify only the component name or both the name and directory.

---
## Attribute Instructions

This section describes the available attributes and their usage.

### Event Handling

* `qsi-click="functionName"`: Calls `functionName` when the element is clicked.
* `qsi-dblclick="functionName"`: Calls `functionName` when the element is double-clicked.
* `qsi-mousedown="functionName"`: Calls `functionName` when the mouse button is pressed down on the element.
* `qsi-mouseup="functionName"`: Calls `functionName` when the mouse button is released over the element.
* `qsi-mouseenter="functionName"`: Calls `functionName` when the mouse pointer enters the element.
* `qsi-mouseleave="functionName"`: Calls `functionName` when the mouse pointer leaves the element.
* `qsi-scroll="functionName"`: Calls `functionName` when the element is scrolled.
* `qsi-wheel="functionName"`: Calls `functionName` when the mouse wheel is rolled over the element.
* `qsi-keydown="functionName"`: Calls `functionName` when a key is pressed down on the element.
* `qsi-keyup="functionName"`: Calls `functionName` when a key is released over the element.
* `qsi-change="functionName"`: Calls `functionName` when the element's value changes.

### Conditional Rendering and Data Binding

* `qsi-if="variableName or functionName"`: Shows the element if the value of `variableName` or the result of `functionName` is true.
* `qsi-for="arrName"`: Iterates over the array `arrName`.
* `qsi-bind` or `{{...}}`:  Binds the element's content to the specified field name. For example:  `<qsi-bind>fieldName</qsi-bind>` or `{{fieldName}}`.
* `<txt-val>fieldName</txt-val>`: Binds the value of `fieldName` to an HTML text field.
* `qsi-src="urlLink"`: Sets the `src` attribute of the element to the value of `urlLink`.

###  Other Attributes

* `qsi-handle="functionName"`: Calls `functionName` and allows access to related elements for processing.
* `qsi-inject_to="variableName"`: Injects the HTML element into the specified variable.
* `qsi-channel="variableName"`: Injects the `IChildChannel` element into the specified variable.

**qsi-handle="functionName"**

This attribute binds an HTML element to the specified function (`functionName`) in the component's controller class. `qsi-handle` provides a way to access all elements associated with this function via the `this.root.getElementsBoundToMethod(this.functionName)` method.

**How it works:**

During component rendering, the framework registers all elements with the `qsi-handle` attribute and links them to the corresponding functions. Calling `this.root.getElementsBoundToMethod(this.functionName)` inside the `functionName` function returns an array of all HTML elements that have `qsi-handle="functionName"`. This allows you to perform operations on a group of elements.

**Example:**

```html
<div qsi-handle="handleDivs">Div 1</div>
<div qsi-handle="handleDivs">Div 2</div>
```

```typescript
handleDivs(): void {
    const elements = this.root.getElementsBoundToMethod(this.handleDivs);
    for (const element of elements) {
        element.style.color = 'red';
    }
}
```

**When to use:**

`qsi-handle` can be useful for performing group operations on elements, especially if these elements are created dynamically. However, for most scenarios, it is recommended to use `qsi-inject_to`, which provides more direct and convenient access to elements.

**Alternatives:**

* **qsi-inject_to="variableName":** This attribute allows you to directly inject an HTML element into the specified variable (`variableName`) of the controller class.  This is the preferred way to access individual elements, as it provides cleaner and more understandable code.

**Note:** `qsi-handle` is part of the framework's legacy functionality. For new projects, it is recommended to use `qsi-inject_to` and other more modern methods.

### Class Manipulation (qsi-cls)

The `qsi-cls` attribute allows dynamic class manipulation based on conditions.

* **Simple Class Toggle:** `qsi-cls="class1"` adds `class1` to the element's class list.
* **Conditional Class Toggle:** `qsi-cls="class1:condition"` adds `class1` if `condition` is true, and removes it if false.  Multiple conditions can be chained: `qsi-cls="class1:condition1 class2:condition2 class3:condition3"`.
* **Ternary Class Toggle:** `qsi-cls="condition?class1:class2"` adds `class1` if `condition` is true and `class2` if false.  The opposing class is removed.

```html
<div qsi-cls="class1"></div>
<div qsi-cls="class1:condition class2:condition class3:condition"></div>
<div qsi-cls="class1:condition1 class2:condition2 class3:condition3"></div>
<div class="class0" qsi-cls="class1:condition1 class2:condition2 class3:condition3"></div>
<div qsi-cls="condition?class1:class2"></div>
```

#### CSS Encryption Note
If using CSS encryption, ensure that `className` is not equal to `conditionName`.

---
## Routing Functionality

This document explains how to implement routing and sub-routing in your project.

### Core Concepts

* `<qsi-route></qsi-route>`:  The main tag that enables routing within your application.
* `<qsi-subroute name="yourSubRoutName"></qsi-subroute>`: Enables nested routing within a specific section of your application.  The `name` attribute corresponds to a defined sub-route name.

### Configuration Files

* **routes.ts:**  (<projectName>/src/settings/routes.ts) - Defines the main application routes.
* **subRoutes.ts:** (<projectName>/src/settings/subRoutes.ts) - Defines sub-routes.
* **subRoutesEnums.ts:** (<projectName>/src/settings/subRoutesEnums.ts) -  Defines enums used for sub-routing configuration.


### Routing Setup

1. **ROUTE_COMMAND Enum:** Define an enum in `routes.ts`  (e.g., `ROUTE_COMMAND`) to represent your main routes.  This provides a user-friendly way to manage and reference your routes.

2. **REGISTER_ROUTES Function:** Use the `REGISTER_ROUTES` function to register your routes. This function takes two arguments:
    * The starting route (a value from your `ROUTE_COMMAND` enum).
    * An array of routes, each defined using `makeRoute(routeCommand, path, component)`.  `routeCommand` is a value from the `ROUTE_COMMAND` enum, `path` is the URL path, and `component` is the component to render for that route.

3. **setBrowserRoutingMode Function:**  Set the routing mode using `setBrowserRoutingMode()`.  Available modes:
    * `BROWSER_ROUTING.SHOW`: Routes are displayed in the browser's address bar, and browser history (back/forward buttons) works as expected.
    * `BROWSER_ROUTING.SHOW_WITHOUT_HISTORY`: Routes are displayed in the address bar, but browser history is disabled for routing.
    * `BROWSER_ROUTING.HIDDEN`: Routing is internal; the address bar only reflects the initial route.


### Sub-Routing Setup

1. **Sub-Route Enums:** Define enums in `subRoutesEnums.ts` to represent your sub-routes and their parent sections (e.g., `E_SUB_ROUTE` for parent sections and `SUB_ROUTE_PAGE` for routes within those sections).

2. **APP_SUB_ROUTE Class:**  Create instances of `APP_SUB_ROUTE` for each parent section, providing the parent section name (`E_SUB_ROUTE` value) and the default sub-route (`SUB_ROUTE_PAGE` value).

3. **addPage Method:** Use the `addPage()` method on `APP_SUB_ROUTE` instances to add sub-routes to each parent section.  Provide the sub-route name (`SUB_ROUTE_PAGE` value) and the corresponding component.

4. **REGISTER_SUB_ROUTES Function:**  Register your sub-routes using the `REGISTER_SUB_ROUTES` function, passing in the `APP_SUB_ROUTE` instances.


### Navigation

* **Main Routes:** Use `ROUTE_COMMAND$.next(routeCommand)` or `ROUTE().SHOW_PAGE(routeCommand)` to navigate between main routes.  `routeCommand` is a value from the `ROUTE_COMMAND` enum.

* **Sub-Routes:**  Use `SUB_ROUTE(parentRoute).SHOW_PAGE(subRoute)` to navigate between sub-routes. `parentRoute` is a value from `E_SUB_ROUTE`, and `subRoute` is a value from `SUB_ROUTE_PAGE`.

### Code Examples

See the provided examples for initial and configured versions of `routes.ts`, `subRoutes.ts`, and `subRoutesEnums.ts`.  The examples demonstrate how to set up both basic routing and more complex nested routing using route collections.


### Routing Collections

For more complex scenarios, you can organize your routes into collections.  This helps manage large numbers of routes and create hierarchical structures.  See the "Routing Collections Example" for a demonstration of how to define, configure, and merge route collections using the `ROUTE_COLLECTION` class and the `mergeRouteCollections` function.

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

Define Enums
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

Configure Routes
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
---
## Developing Custom Components as Standalone Projects

This document explains how to develop, distribute, and integrate custom components as independent projects. These reusable modules enhance code organization and maintainability.

### Development Modes

Two primary modes govern custom component development:

1. **Development Mode:**  Focuses on building and refining the component's functionality within its own project.  This mode allows for iterative development and testing before distribution.

2. **Distribution Mode:**  Prepares the component for seamless integration into other projects. This involves packaging the component into a distributable format, ensuring only necessary files are included.

### Key Considerations

#### Shadow DOM Encapsulation

Custom components reside within a Shadow DOM created by the `AppRoot` container.  Direct interaction with the Shadow DOM's contents from the host application is prohibited.  Employ indirect communication methods like services or emitted messages.

#### Routing within Custom Components

Standard routing is disabled to prevent conflicts with the host application's routing.  However, *sub-routing* is permitted within the component using a specific naming convention:  Prefix sub-route names with the full component name followed by a descriptive suffix. For example:

```html
<qsi-subroute name="custom_component_example_view"></qsi-subroute>
<qsi-subroute name="custom_component_example_settings"></qsi-subroute>
```

### Distribution Process

1. Open your terminal.
2. Navigate to the custom component project's root directory.
3. Execute the `dist.js` script:

   ```bash
   node dist.js
   ```

### Integration Process

Use the `addCustomElement.js` script to integrate the distributed custom component into another project:

1. Place the custom component's distribution folder into your host project (usually handled automatically).
2. Run the following script from the host project's root directory:

   ```bash
   node addCustomElement.js
   ```

**`addCustomElement.js` Actions:**

* Prompts you to select the desired component using `selectCustomElement`.
* Modifies `flags.js` to disable CSS encryption (`isCssEncrypt: false`) and CSS/JS processing (`isJsCssProcess: false`).
* Updates `modules.ts`:
    * Imports the custom component.
    * Adds the component to the `MODULES` export.
    * Includes component metadata using a descriptor comment.
* Copies necessary assets from the distribution package to the host project.


### Example Workflow

1. **Creation:**  Create a new custom component project:

   ```bash
   node pm.js cstm custom_example
   ```

   This generates a project in the `custom_elements/custom_example` directory.

2. **Development:**  Implement the component's logic within the project's `src` directory.

3. **Distribution:**  Prepare the component for distribution:

   ```bash
   node dist.js
   ```

4. **Integration:**  Add the distributed component to your host project:

   ```bash
   node addCustomElement.js
   ```

### `addCustomElement.js` Features

* **Automated Selection:** Uses `selectCustomElement` for component selection.
* **Configuration Updates:** Disables CSS encryption and processing in `flags.js`.
* **Module Integration:**  Adds necessary imports and exports in `modules.ts`.
* **Asset Management:**  Handles the copying of required assets.


### Important Notes

* Always use `dist.js` to prepare your component for integration.
* Use `addCustomElement.js` within the *host* project.
* Automatic disabling of CSS encryption ensures smooth integration.
