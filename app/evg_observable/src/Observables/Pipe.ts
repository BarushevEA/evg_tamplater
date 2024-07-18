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
        return this.push(
            (data: IPipePayload): void => {
                (<IListener<T>>(<any>this).listener)(data.payload);
                data.isNeedUnsubscribe = true;
            }
        );
    }

    unsubscribeByNegative(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                data.isAvailable = true;
                if (!condition(data.payload)) data.isNeedUnsubscribe = true;
            }
        );
    }

    unsubscribeByPositive(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                data.isAvailable = true;
                if (condition(data.payload)) data.isNeedUnsubscribe = true;
            }
        );
    }

    emitByNegative(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                if (!condition(data.payload)) data.isAvailable = true
            }
        );
    }

    unsubscribeBy(condition: ICallback<T>): ISetup<T> {
        return this.unsubscribeByPositive(condition);
    }

    emitByPositive(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                if (condition(data.payload)) data.isAvailable = true;
            }
        );
    }

    emitMatch(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                if (condition(data.payload) == data.payload) data.isAvailable = true;
            }
        );
    }

    refine(condition: ICallback<T>): ISetup<T> {
        return this.emitByPositive(condition);
    }

    pushRefiners(conditions: ICallback<any>[]): ISetup<T> {
        if (!Array.isArray(conditions)) return this;
        for (let i = 0; i < conditions.length; i++) this.emitByPositive(conditions[i]);
        return this;
    }

    then<K>(condition: ICallback<T>): ISetup<K> {
        return <any>this.push(
            (data: IPipePayload): void => {
                data.payload = condition(data.payload);
                data.isAvailable = true;
            }
        ) as ISetup<K>;
    }

    switch(): SwitchCase<T> {
        return new SwitchCase<T>(this);
    }

    serialize(): ISetup<string> {
        return <any>this.push(
            (data: IPipePayload): void => {
                data.payload = JSON.stringify(data.payload);
                data.isAvailable = true;
            }
        ) as ISetup<string>;
    }

    deserialize<K>(): ISetup<K> {
        return <any>this.push(
            (data: IPipePayload): void => {
                data.payload = JSON.parse(data.payload);
                data.isAvailable = true;
            }
        ) as ISetup<K>;
    }

    processChain(listener: IListener<T>): void {
        const chain = this.chainHandlers;
        const data = this.pipeData;
        for (let i = 0; i < chain.length; i++) {
            data.isNeedUnsubscribe = false;
            data.isAvailable = false;

            chain[i](data);
            if (data.isNeedUnsubscribe) return (<any>this).unsubscribe();
            if (!data.isAvailable) return;
            if (data.isBreakChain) break;
        }

        return listener(data.payload);
    }

    private push(callback: IChainCallback): ISetup<T> {
        this.chainHandlers.push(callback);
        return this;
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
        const chain = this.pipe.chainHandlers;
        chain.push(
            (data: IPipePayload): void => {
                data.isAvailable = true
                if (condition(data.payload)) data.isBreakChain = true;
                if (id === chain.length && !data.isBreakChain) data.isAvailable = false;
            }
        );
        return this;
    }

    pushCases(conditions: ICallback<any>[]): IPipeCase<T> & ISubscribe<T> {
        if (!Array.isArray(conditions)) return this;
        for (let i = 0; i < conditions.length; i++) this.case(conditions[i]);
        return this;
    }
}
