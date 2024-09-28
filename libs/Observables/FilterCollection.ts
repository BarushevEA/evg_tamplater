import {
    ICallback,
    IErrorCallback,
    IFilter,
    IFilterCase,
    IFilterChainCallback,
    IFilterPayload,
    IFilterResponse,
    IFilterSetup,
    IFilterSwitch
} from "./Types";
import {SwitchCase} from "./AbstractSwitchCase";

export class FilterCollection<T> implements IFilter<T>, IFilterSwitch<T> {
    chain: IFilterChainCallback [] = [];
    flow: IFilterPayload = {isBreak: false, isAvailable: false, payload: null};
    response: IFilterResponse = {isOK: false, payload: undefined};
    private errHandler: IErrorCallback | undefined;

    get isEmpty(): boolean {
        return !this.chain.length;
    }

    private push(callback: IFilterChainCallback): IFilterSetup<T> {
        this.chain.push(callback);
        return this;
    }

    filter(condition: ICallback<any>): IFilterSetup<T> {
        return this.push(
            (data: IFilterPayload): void => condition(data.payload) && (data.isAvailable = true) as any
        );
    }

    pushFilters(conditions: ICallback<any>[]): IFilterSetup<T> {
        if (!Array.isArray(conditions)) return this;
        for (let i = 0; i < conditions.length; i++) this.filter(conditions[i]);
        return this;
    }

    switch(): FilterSwitchCase<T> {
        return new FilterSwitchCase<T>(this);
    }

    processChain(value: T): IFilterResponse {
        const chain = this.chain;
        const data = this.flow;
        const response = this.response;
        response.isOK = false;
        response.payload = undefined;
        data.payload = value;
        data.isBreak = false;

        try {
            for (let i = 0; i < chain.length; i++) {
                data.isAvailable = false;
                chain[i](data);
                if (!data.isAvailable) return response;
                if (data.isBreak) break;
            }
        } catch (err) {
            if (this.errHandler) {
                this.errHandler(err, "Filter.processChain ERROR:");
            } else {
                console.log("Filter.processChain ERROR:", err);
            }
            return response;
        }

        response.isOK = true;
        response.payload = data.payload;

        return response;
    }

    addErrorHandler(errorHandler: IErrorCallback) {
        this.errHandler = errorHandler;
    }
}

export class FilterSwitchCase<T> extends SwitchCase<T, FilterCollection<T>, IFilterCase<T>> {
}
