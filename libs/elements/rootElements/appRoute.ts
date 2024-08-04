import {IRouteModel, IRouteOption, OnInit, RootBehavior} from "../../env/types";
import {Observable} from "evg_observable";
import {QSI_APP_COMPONENT} from "../registrator/registrator";
import {getDefaultMeasureMeter, Measure} from "evg_tick_generator";
import {log} from "../../utils/utils";

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

export class QSI_APP_ROOT_AppRoute implements OnInit {
    private routes: { [command: string]: IRouteModel } = {};

    constructor(private readonly root: RootBehavior) {
        ROUTE_COMMAND$.pipe()
            .refine(command => !!command)
            .subscribe(command => this.setRoute(command));
    }

    @Measure()
    onInit(): void {
        this.process();
        return;
    }

    @Measure()
    private process(): void {
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
        for (let i = 0; i < routes.length; i++) this.routes[routes[i].command] = routes[i];

        this.setRoute(defaultCommand);
    }

    @Measure()
    private setRoute(command: string): void {
        const tagName = this.routes[command].component.qsi_app_tag_name;
        this.root.innerHTML = `<${tagName}></${tagName}>`;

        log("METRICS", getDefaultMeasureMeter().getAll());
    }
}
