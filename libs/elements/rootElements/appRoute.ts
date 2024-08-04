import {IRouteModel, IRouteOption, OnDestroy, OnInit, RootBehavior} from "../../env/types";
import {Collector, Observable} from "evg_observable";
import {QSI_APP_COMPONENT} from "../registrator/registrator";
import {getDefaultMeasureMeter, Measure} from "evg_tick_generator";
import {log} from "../../utils/utils";
import {BROWSER_PATH} from "../routing/BrowserPath";

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

export function REGISTER_ROUTES(defaultCommand?: string, routes?: IRouteModel[]): void {
    routes$.next({
        defaultCommand: defaultCommand,
        routes: routes,
    });
}

const collector = new Collector();

export class QSI_APP_ROOT_AppRoute implements OnInit, OnDestroy {
    private routesByCommand: { [command: string]: IRouteModel } = {};
    private routesByPath: { [command: string]: IRouteModel } = {};

    constructor(private readonly root: RootBehavior) {
    }

    @Measure()
    onInit(): void {
        this.process();
        return;
    }

    @Measure()
    onDestroy(): void {
        collector.unsubscribeAll();
    }

    @Measure()
    private process(): void {
        collector.collect(
            ROUTE_COMMAND$.pipe()
                .refine(command => !!command)
                .subscribe(command => this.setRouteByCommand(command)),
            BROWSER_PATH.subscribe((path: string) => this.setRouteByHistory(path))
        )

        if (routes$.getValue()) {
            this.initOptions();
        } else {
            routes$.pipe()
                .refine(option => !!option)
                .setOnce()
                .subscribe(() => this.initOptions());
        }
    }

    @Measure()
    private initOptions(): void {
        let option = routes$.getValue();
        defaultCommand = option.defaultCommand;
        const routes = option.routes;
        for (let i = 0; i < routes.length; i++) {
            this.routesByCommand[routes[i].command] = routes[i];
            this.routesByPath[routes[i].path] = routes[i];
        }

        this.setRouteByCommand(defaultCommand);
    }

    @Measure()
    private setRouteByCommand(command: string): void {
        this.setRoute(this.routesByCommand[command]);

        log("METRICS", getDefaultMeasureMeter().getAll());

        switch (browserRouting) {
            case BROWSER_ROUTING.HIDDEN:
                break;
            case BROWSER_ROUTING.SHOW:
                BROWSER_PATH.set(this.routesByCommand[command].path);
                break;
            case BROWSER_ROUTING.SHOW_WITHOUT_HISTORY:
                BROWSER_PATH.setWithoutHistory(this.routesByCommand[command].path);
        }
    }

    @Measure()
    private setRouteByHistory(historyPath: string): void {
        if (!(historyPath in this.routesByPath)) return;
        this.setRoute(this.routesByPath[historyPath]);
    }

    @Measure()
    private setRoute(routeModel: IRouteModel): void {
        const tagName = routeModel.component.qsi_app_tag_name;
        this.root.innerHTML = `<${tagName}></${tagName}>`;
    }
}
