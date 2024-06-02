import {
    ICallback,
    IChainCallback,
    IErrorCallback,
    IListener,
    IPipeCase,
    IPipePayload,
    ISetObservableValue,
    ISetup,
    ISubscribe,
    ISubscriptionLike
} from "./Types";

export abstract class Pipe<T> implements ISubscribe<T> {
    chainHandlers: IChainCallback [] = [];
    pipeData: IPipePayload = {isBreakChain: false, isNeedUnsubscribe: false, isAvailable: false, payload: null};

    abstract subscribe(listener: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): ISubscriptionLike | undefined;

    setOnce(): ISubscribe<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                (<IListener<T>>(<any>this).listener)(data.payload);
                data.isNeedUnsubscribe = true;
            }
        );
        return this;
    }

    unsubscribeByNegative(condition: ICallback<T>): ISetup<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                data.isAvailable = true;
                if (!condition(data.payload)) data.isNeedUnsubscribe = true;
            }
        );
        return this
    }

    unsubscribeByPositive(condition: ICallback<T>): ISetup<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                data.isAvailable = true;
                if (condition(data.payload)) data.isNeedUnsubscribe = true;
            }
        );
        return this;
    }

    emitByNegative(condition: ICallback<T>): ISetup<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                if (!condition(data.payload)) data.isAvailable = true
            }
        );
        return this;
    }

    emitByPositive(condition: ICallback<T>): ISetup<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                if (condition(data.payload)) data.isAvailable = true;
            }
        );
        return this;
    }

    emitMatch(condition: ICallback<T>): ISetup<T> {
        const data = this.pipeData;
        this.chainHandlers.push(
            (): void => {
                if (condition(data.payload) == data.payload) data.isAvailable = true;
            }
        );
        return this;
    }

    switch(): SwitchCase<T> {
        return new SwitchCase<T>(this);
    }

    processChain(listener: IListener<T>): void {
        const chain = this.chainHandlers;
        const data = this.pipeData;
        for (let i = 0; i < chain.length; i++) {
            data.isNeedUnsubscribe = false;
            data.isAvailable = false;

            chain[i]();
            if (data.isNeedUnsubscribe) return (<any>this).unsubscribe();
            if (!data.isAvailable) return;
            if (data.isBreakChain) break;
        }

        return listener(data.payload);
    }
}

export class SwitchCase<T> implements ISubscribe<T>, IPipeCase<T> {
    private pipe: Pipe<T>;
    private caseCounter: number;

    constructor(pipe: Pipe<T>) {
        this.pipe = pipe;
        this.caseCounter = pipe.chainHandlers.length ? pipe.chainHandlers.length : 0;
    }

    subscribe(listener: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        return this.pipe.subscribe(listener, errorHandler);
    }

    case(condition: ICallback<any>): IPipeCase<T> & ISubscribe<T> {
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
