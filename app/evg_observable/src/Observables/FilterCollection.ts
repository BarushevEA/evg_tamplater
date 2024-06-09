import {
    ICallback,
    IChainCallback,
    IErrorCallback,
    IFilter,
    IFilterCase,
    IFilterPayload,
    IFilterResponse,
    IFilterSetup,
    IFilterSwitch
} from "./Types";

export class FilterCollection<T> implements IFilter<T>, IFilterSwitch<T> {
    chainHandlers: IChainCallback [] = [];
    pipeData: IFilterPayload = {isBreakChain: false, isAvailable: false, payload: null};
    response: IFilterResponse = {isOK: false, payload: undefined};
    private errorHandler: IErrorCallback | undefined;

    get isEmpty(): boolean {
        return !this.chainHandlers.length;
    }

    filter(condition: ICallback<any>): IFilterSetup<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                if (condition(data.payload)) data.isAvailable = true;
            }
        );
        return this;
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
        const chain = this.chainHandlers;
        const data = this.pipeData;
        const response = this.response;
        response.isOK = false;
        response.payload = undefined;
        data.payload = value;
        data.isBreakChain = false;

        try {
            for (let i = 0; i < chain.length; i++) {
                data.isAvailable = false;

                chain[i]();
                if (!data.isAvailable) return response;
                if (data.isBreakChain) break;
            }
        } catch (err) {
            if (this.errorHandler) {
                this.errorHandler(err, "Filter.processChain ERROR:");
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
        this.errorHandler = errorHandler;
    }
}

export class FilterSwitchCase<T> implements IFilterCase<T> {
    private pipe: FilterCollection<T>;
    private caseCounter: number;

    constructor(pipe: FilterCollection<T>) {
        this.pipe = pipe;
        this.caseCounter = pipe.chainHandlers.length ? pipe.chainHandlers.length : 0;
    }

    case(condition: ICallback<any>): IFilterCase<T> {
        this.caseCounter++;
        const id = this.caseCounter;
        const data = this.pipe.pipeData;
        const chain = this.pipe.chainHandlers;
        chain.push(
            (): void => {
                data.isAvailable = true
                if (condition(data.payload)) data.isBreakChain = true;
                if (id === chain.length && !data.isBreakChain) data.isAvailable = false;
            }
        );
        return this;
    }

    pushCases(conditions: ICallback<any>[]): IFilterCase<T> {
        if (!Array.isArray(conditions)) return this;
        for (let i = 0; i < conditions.length; i++) this.case(conditions[i]);
        return this;
    }
}
