import {IRouteModel, IRouteOption, OnDestroy, OnInit, RootBehavior} from "../../env/types";
import {QSI_APP_COMPONENT} from "../registrator/registrator";
import {BROWSER_PATH} from "../routing/BrowserPath";
import {Collector, Observable} from "../../Observables";

export enum BROWSER_ROUTING {
    SHOW = "SHOW",
    SHOW_WITHOUT_HISTORY = "SHOW_WITHOUT_HISTORY",
    HIDDEN = "HIDDEN",
}

let browserRouting = BROWSER_ROUTING.SHOW;

export function setBrowserRoutingMode(mode: BROWSER_ROUTING) {
    browserRouting = mode;
}

export const ROUTE_COMMAND$ = new Observable<string>("");
const routes$ = new Observable<IRouteOption>(null);
let defaultCommand: string;

export function makeRoute(command: string, path: string, component: any): IRouteModel {
    return {
        path: path,
        command: command,
        component: component as QSI_APP_COMPONENT
    };
}

export type IAddRoute = { add(route: IRouteModel, isRoot?: boolean): IAddRoute };
export type IAddRouteCollection = { addCollection(collection: ROUTE_COLLECTION): IAddRouteCollection };

export class ROUTE_COLLECTION implements IAddRouteCollection, IAddRoute {
    private routes: IRouteModel[] = [];

    constructor(private rootRoute: IRouteModel) {
        this.validateRoute(rootRoute, true);
        this.add(rootRoute, true);
    }

    add(route: IRouteModel, isRoot?: boolean): IAddRoute {
        this.validateRoute(route);

        !isRoot && (route.path = this.rootRoute.path + route.path);
        this.routes.push(route);
        return this;
    }

    addCollection(collection: ROUTE_COLLECTION): IAddRouteCollection {
        const routes = collection.getRoutes();
        for (let i = 0; i < routes.length; i++) {
            this.add(routes[i]);
        }

        return this;
    }

    getRoutes(): IRouteModel[] {
        return this.routes;
    }

    private validateRoute(route: IRouteModel, isRoot?: boolean): void {
        const prefix = isRoot ? "Root route" : "Route";

        if (!route) {
            throw new Error(`${prefix} is not defined`);
        }
        if (!route.path) {
            throw new Error(`${prefix} path is not defined`);
        }
        if (!route.command) {
            throw new Error(`${prefix} command is not defined`);
        }
        if (!route.component) {
            throw new Error(`${prefix} component is not defined`);
        }
    }
}

export function mergeRouteCollections(...collections: ROUTE_COLLECTION[]): IRouteModel[] {
    const routes: IRouteModel[] = [];
    for (let i = 0; i < collections.length; i++) {
        routes.push(...collections[i].getRoutes());
    }
    return routes;
}

export function REGISTER_ROUTES(defaultCommand?: string, routes?: IRouteModel[]): void {
    routes$.next({
        defaultCmd: defaultCommand,
        routes: routes,
    });

    ROUTE_COMMAND$.next(defaultCommand);
}

const collector = new Collector();

export class QSI_APP_ROOT_AppRoute implements OnInit, OnDestroy {
    private cmd: { [command: string]: IRouteModel } = {};
    private path: { [path: string]: IRouteModel } = {};

    constructor(private readonly root: RootBehavior) {
    }

    onInit(): void {
        this.process();
        return;
    }

    onDestroy(): void {
        collector.unsubscribeAll();
    }

    private process(): void {
        collector.collect(
            ROUTE_COMMAND$.pipe()
                .refine(command => !!command)
                .subscribe(command => this.setCommand(command)),
            BROWSER_PATH.subscribe((historyPath: string) => this.setHistory(historyPath))
        )

        if (routes$.getValue()) {
            this.init();
        } else {
            routes$.pipe()
                .refine(option => !!option)
                .setOnce()
                .subscribe(() => this.init());
        }
    }

    private init(): void {
        let option = routes$.getValue();
        defaultCommand = option.defaultCmd;
        const routes = option.routes;
        for (let i = 0; i < routes.length; i++) {
            this.cmd[routes[i].command] = routes[i];
            this.path[routes[i].path] = routes[i];
        }

        this.setCommand(defaultCommand);
    }

    private setCommand(command: string): void {
        this.setRoute(this.cmd[command]);

        switch (browserRouting) {
            case BROWSER_ROUTING.HIDDEN:
                break;
            case BROWSER_ROUTING.SHOW:
                BROWSER_PATH.set(this.cmd[command].path);
                break;
            case BROWSER_ROUTING.SHOW_WITHOUT_HISTORY:
                BROWSER_PATH.setWithoutHistory(this.cmd[command].path);
        }
    }

    private setHistory(historyPath: string): void {
        if (!(historyPath in this.path)) return;
        this.setRoute(this.path[historyPath]);
    }

    private setRoute(routeModel: IRouteModel): void {
        const tagName = routeModel.component.qsi_app_tag_name;
        this.root.innerHTML = `<${tagName}></${tagName}>`;
    }
}

export function ROUTE(): { SHOW_PAGE: (pageName: string) => void } {
    return {
        SHOW_PAGE: (pageName: string) => {
            const currentPageName = ROUTE_COMMAND$.getValue();
            (currentPageName != pageName) && ROUTE_COMMAND$.next(pageName);
        }
    };
}
