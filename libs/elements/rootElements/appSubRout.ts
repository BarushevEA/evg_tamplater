import {Observable, quickDeleteFromArray} from "../../Observables";
import {OnDestroy, OnInit, RootBehavior} from "../../env/types";
import {QSI_APP_COMPONENT} from "../registrator/registrator";
import {log} from "../../utils/utils";

export type SubRouteCommand = {
    name: string;
    page: string;
} | null;

export type SubRoutePageOption = {
    name: string;
    page: any;
}

export type SubRouteOption = {
    name: string;
    defaultPage: string;
    pages: SubRoutePageOption[];
}

export type ISubRoute = {
    setPage(pageName: string): void;
}

export type SubRouteRegistered = {
    name: string;
    defaultPage: string;
    pages: { [pageName: string]: QSI_APP_COMPONENT };
    subRoute: ISubRoute | null;
};

export type IAddSubRoutePage = {
    addPage(name: string, page: any): IAddSubRoutePage;
};

export const SUB_ROUTE_COMMAND$ = new Observable<SubRouteCommand>(null);
const subRoutesRegistry: { [subRouteName: string]: SubRouteRegistered } = {};

export class APP_SUB_ROUTE implements SubRouteOption, IAddSubRoutePage {
    name: string;
    defaultPage: string;
    pages: SubRoutePageOption[] = [];

    constructor(name: string, defaultPage: string) {
        this.name = name;
        this.defaultPage = defaultPage;
    }

    addPage(name: string, page: any): IAddSubRoutePage {
        this.pages.push({name, page});
        return this;
    }

    getOptions(): SubRouteOption {
        return {
            name: this.name,
            defaultPage: this.defaultPage,
            pages: this.pages
        };
    }
}

export function REGISTER_SUB_ROUTES(...options: SubRouteOption[]): void {
    for (let i = 0; i < options.length; i++) {
        const option = options[i];

        const pages: { [pageName: string]: any } = {};

        for (let j = 0; j < option.pages.length; j++) {
            const pageOption = option.pages[j];
            pages[pageOption.name] = pageOption.page as QSI_APP_COMPONENT;
        }

        subRoutesRegistry[option.name] = {
            name: option.name,
            defaultPage: option.defaultPage,
            pages: pages,
            subRoute: null
        };
    }
}

export class QSI_APP_ROOT_SubRoute implements OnInit, OnDestroy, ISubRoute {
    name: string;
    registered: SubRouteRegistered;
    isDestroyed: boolean = true;
    static names: string[] = [];

    constructor(private readonly root: RootBehavior) {
        this.name = root.getAttribute('name') || '';
        this.registered = subRoutesRegistry[this.name];
        if (!this.registered) {
            throw new Error(`Subroute with the name "${this.name}" not found`);
        }

        this.registered.subRoute = this;
    }

    onInit(): void {
        this.isDestroyed = false;
        this.setPage(this.registered.defaultPage);

        if (!QSI_APP_ROOT_SubRoute.names.includes(this.name)) {
            QSI_APP_ROOT_SubRoute.names.push(this.name);
        } else {
            log(`WARNING: Subroute with the name "${this.name}" already exists. Valid behavior is not guaranteed.`);
        }
    }

    onDestroy(): void {
        this.isDestroyed = true;
        quickDeleteFromArray(QSI_APP_ROOT_SubRoute.names, this.name);
        this.registered.subRoute = null;
    }

    setPage(pageName: string): void {
        if (this.isDestroyed) return;

        const page = this.registered.pages[pageName];
        if (!page) {
            console.error(`Page with name "${pageName}" not found in subroute "${this.name}"`);
            return;
        }
        const tagName = page.qsi_app_tag_name;
        this.root.innerHTML = `<${tagName}></${tagName}>`;
    }
}

SUB_ROUTE_COMMAND$.pipe()
    .refine(command => command)
    .subscribe(command => {
        const registered = subRoutesRegistry[command.name];
        if (!registered || !registered.subRoute) {
            console.log("ERROR:", `Subroute "${command.name}" is not registered or does not have an active instance.`);
            return;
        }

        registered.subRoute.setPage(command.page);
    });

export function SUB_ROUTE(subRouteName: string): { SHOW_PAGE: (pageName: string) => void } {
    return {
        SHOW_PAGE: (pageName: string) => SUB_ROUTE_COMMAND$.next({name: subRouteName, page: pageName})
    };
}

// subRoute('SubRoute1').showPage('Main');
