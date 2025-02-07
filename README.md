## Project Instructions

### Creating a Project

#### Method 1: Command-Line Arguments

1. Open your terminal.
2. Navigate to the directory containing `pm.js`.
3. Run one of the following commands:

```sh
# For creating a standard project:
node pm.js p <ProjectName>

# For creating a custom reusable component:
node pm.js cstm <CustomComponentName>
```

- Replace `<ProjectName>` or `<CustomComponentName>` with the desired name for your project or custom component.

#### Method 2: Interactive Step-by-Step Mode

If you run the `pm.js` script **without any arguments**, an interactive mode will guide you through the steps of project creation:

1. Choose the project type:
    - `1`: Create a standard project.
    - `2`: Create a reusable custom component project.
    - `3`: Exit.

2. After selecting the project type, enter the **name of the new project** or custom component when prompted.

3. The script will automatically generate the project structure, replacing placeholders with the project/component name.


### Creating a Component

#### Method 1: Command-Line Arguments

1. Open your terminal.
2. Navigate to the `cm.js` directory.
3. Run the command:

```sh
node cm.js c <YourComponentName> [d <ComponentDirectory>]
```

- Replace `<YourComponentName>` with the name of your component.
- Replace `<ComponentDirectory>` with the directory for your component.
- The `[d <ComponentDirectory>]` argument is optional. If not specified, the component will be placed in the default directory.

#### Method 2: Step-by-Step Guide

If you run `cm.js` **without any parameters**, an interactive step-by-step guide will be activated to help you set up the component.

1. Open your terminal.
2. Navigate to the `cm.js` directory.
3. Run the command:

```sh
node cm.js
```

4. Follow these steps displayed in the terminal:
    - Choose an action for the component:
        - `1` – Enter the component name.
        - `2` – Enter the component name and directory.
        - `3` – Exit.
    - In case of selecting `2`, you'll be prompted to:
        - Specify the component directory.
            - You can choose between the default directory or define a custom one.

5. Once all required inputs are provided, the component will be created automatically with proper registration in the templates and styles.

---
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

## CSS Encryption Note

If you want to use CSS encryption, ensure that className is not equal to conditionName.

### Examples
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

### Bindings
* `<qsi-bind>fieldName</qsi-bind>` - This tag contains the name of text field.
* `{{fieldName}}` - This is the same as qsi-bind.
* `<txt-val>fieldName</txt-val>` - This tag contains the name of HTML text field.
---
## Routing Functionality

We've added routing functionality in our project for smoother transitions between views.

* `<qsi-route></qsi-route>` - This tag implements routing.
* `<qsi-subroute name="yourSubRoutName"></qsi-subroute>` - This tag implements subrouting and contains the name of the
  subroute.

### Setting Up Routing

Routing settings are located in the <projectName>/src/settings/routes.ts file.
SubRouting settings are located in the <projectName>/src/settings/subRoutes.ts file.
SubRouting additional settings are located in the <projectName>/src/settings/subRoutesEnums.ts file.

### User-friendly Route Management

For a more user-friendly way of managing routing, we recommend using the ROUTE_COMMAND enum.
Its values are set according to the names of views, which makes scoping and navigating through your views easier and
more intuitive.

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

To navigate to the relevant view, use ROUTE_COMMAND$.next, e.g., ROUTE_COMMAND$.next(ROUTE_COMMAND.MAIN).
Or alternatively, use ROUTE().SHOW_PAGE(ROUTE_COMMAND.MAIN).

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
## Custom Component Development as Separate Projects

Custom components are standalone projects that can be developed, tested, and distributed independently. They are reusable modules that can be integrated into other projects as external dependencies.

### Two Main Modes of Custom Component Development

Custom component development revolves around the following two main modes:

1. **Development Mode**:
    - Focused on actively developing and editing the custom component.
    - Allows iterating over features and functionality.
    - Includes the option to test and validate the component in isolation before preparing it for external use.

2. **Distribution Mode**:
    - Prepares the project into a **distribution package** for integration into other projects.
    - Ensures the resulting module contains only the required files and avoids potential conflicts.
---
### Key Considerations for Custom Components

When developing custom components as separate projects, the following aspects are crucial to ensure compatibility and ease of integration:

#### 1. Shadow DOM and Interaction
- Custom components are isolated inside a `Shadow DOM` created by the `AppRoot` container.
- Interaction with the component's Shadow DOM content is not allowed.
- Use indirect methods (e.g., services or emitted messages) for communication.

#### 2. Routing
- Standard routing is disabled for custom components to avoid potential conflicts during integration with host applications.
- Subrouting is permitted but requires a unique naming convention:
    - Use the full name of the custom component as the base name and add descriptive suffixes for each subroute.
    - For example:
      ```html
      <qsi-subroute name="custom_component_example_view"></qsi-subroute>
      <qsi-subroute name="custom_component_example_settings"></qsi-subroute>
      ```
---
### Preparing the Custom Component for Distribution

Once the development process is complete, and functionality is tested, you can prepare the custom component for sharing with other projects by following these steps:

1. Open the terminal.
2. Navigate to the root of the custom component project.
3. Run the `dist.js` script:

```sh
node dist.js
```
---

### Adding a Custom Component to Another Project

Once your custom component has been prepared as a distribution package, you can integrate it into another project using the **automated script** `addCustomElement.js`. Follow these steps:

1. Place the **custom component's distribution folder** in the appropriate directory.
    - Typically, the folder structure is handled through automation.

2. Run the `addCustomElement.js` script:

```sh
node addCustomElement.js
```

What this script does:
- Prompts you to **select the custom component** to be added to your project using `selectCustomElement`.
- Automatically updates the `flags.js` file to:
    - Disable CSS encryption (`isCssEncrypt: false`).
    - Disable JS and CSS processing (`isJsCssProcess: false`).
- Writes the component’s configuration into `modules.ts`:
    - Adds an import statement for the custom component.
    - Updates the `MODULES` export to include the new custom component.
    - Inserts metadata with a descriptor comment for the custom component.
- Copies necessary assets from the custom component’s distribution package to the host project.

This eliminates the need for manual integration steps and ensures consistency.

---

### Example Workflow for Developing a Custom Component

#### Step 1: Create a New Custom Component
Run the following command to create a new custom component project:
```sh
node pm.js cstm custom_example
```

The project is created in the directory:
```plaintext
custom_elements/custom_example
```

#### Step 2: Develop the Component
Add functionality and logic to the `src` directory of the new project.

#### Step 3: Prepare the Component for Distribution
After the development process, run:
```sh
node dist.js
```

The ready-to-use distribution package is generated.

#### Step 4: Add the Component to Another Project
Transfer the distribution package to the host project. Then, run:
```sh
node addCustomElement.js
```

The `addCustomElement.js` script will handle all steps of integration automatically.

---

### Key Features of the `addCustomElement.js` Script

1. **Automated Selection**:
    - Uses `selectCustomElement` to prompt you with a list of available custom components for integration.

2. **CSS Encryption Disabled**:
    - Updates the `flags.js` file to disable CSS encryption (`isCssEncrypt: false`) and CSS/JS post-processing (`isJsCssProcess: false`).

3. **Tag and Module Additions**:
    - Adds a descriptive tag for the custom component in `modules.ts`.
    - Imports the custom component module into the host project.

4. **Asset Management**:
    - Ensures all required assets (e.g., styles) are copied from the custom component's distribution package to the appropriate directories in the host project.

---

### Final Notes

- The process of adding a custom component to a project is fully automated, minimizing errors and reducing manual steps.
- Always use the `dist.js` script in your custom component project to prepare it for integration.
- Run the `addCustomElement.js` script in the **host project** to add the component effortlessly.
- Safeguarding measures such as the automatic disabling of CSS encryption ensure smooth integration without conflicts.
