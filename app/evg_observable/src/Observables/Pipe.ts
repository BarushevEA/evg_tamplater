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
import {SwitchCase} from "./AbstractSwitchCase";

export abstract class Pipe<T> implements ISubscribe<T> {
    chain: IChainCallback [] = [];
    flow: IPipePayload = {isBreak: false, isUnsubscribe: false, isAvailable: false, payload: null};

    abstract subscribe(listener: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): ISubscriptionLike | undefined;

    setOnce(): ISubscribe<T> {
        return this.push(
            (data: IPipePayload): void => {
                (<IListener<T>>(<any>this).listener)(data.payload);
                data.isUnsubscribe = true;
            }
        );
    }

    unsubscribeBy(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                data.isAvailable = true;
                if (condition(data.payload)) data.isUnsubscribe = true;
            }
        );
    }

    refine(condition: ICallback<T>): ISetup<T> {
        return this.push(
            (data: IPipePayload): void => {
                if (condition(data.payload)) data.isAvailable = true;
            }
        );
    }

    pushRefiners(conditions: ICallback<any>[]): ISetup<T> {
        if (!Array.isArray(conditions)) return this;
        for (let i = 0; i < conditions.length; i++) this.refine(conditions[i]);
        return this;
    }

    switch(): PipeSwitchCase<T> {
        return new PipeSwitchCase<T>(this);
    }

    processChain(listener: IListener<T>): void {
        const chain = this.chain;
        const data = this.flow;
        for (let i = 0; i < chain.length; i++) {
            data.isUnsubscribe = false;
            data.isAvailable = false;

            chain[i](data);
            if (data.isUnsubscribe) return (<any>this).unsubscribe();
            if (!data.isAvailable) return;
            if (data.isBreak) break;
        }

        return listener(data.payload);
    }

    then<K>(condition: ICallback<T>): ISetup<K> {
        return <any>this.push(
            (data: IPipePayload): void => {
                data.payload = condition(data.payload);
                data.isAvailable = true;
            }
        ) as ISetup<K>;
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

    private push(callback: IChainCallback): ISetup<T> {
        this.chain.push(callback);
        return this;
    }
}

export class PipeSwitchCase<T> extends SwitchCase<T, Pipe<T>, IPipeCase<T>> implements ISubscribe<T> {
    subscribe(listener: IListener<T> | ISetObservableValue, errorHandler?: IErrorCallback): ISubscriptionLike | undefined {
        return this.pipe.subscribe(listener, errorHandler);
    }
}
