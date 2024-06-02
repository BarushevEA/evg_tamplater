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

export class Filter<T> implements IFilter<T>, IFilterSwitch<T> {
    chainHandlers: IChainCallback [] = [];
    pipeData: IFilterPayload = {isBreakChain: false, isAvailable: false, payload: null};
    private errorHandler: IErrorCallback | undefined;

    get isEmpty(): boolean {
        return this.chainHandlers.length === 0;
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

    switch(): FilterSwitchCase<T> {
        return new FilterSwitchCase<T>(this);
    }

    processChain(value: T): IFilterResponse {
        const chain = this.chainHandlers;
        const data = this.pipeData;
        const response: IFilterResponse = {isOK: false, payload: undefined};
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
    private pipe: Filter<T>;
    private caseCounter: number;

    constructor(pipe: Filter<T>) {
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
}
