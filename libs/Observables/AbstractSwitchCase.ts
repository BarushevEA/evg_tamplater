import {ICallback, IChainContainer, IPipePayload} from "./Types";

export abstract class SwitchCase<T, P extends IChainContainer, W> {
    protected pipe: P;
    protected counter: number;

    constructor(pipe: P) {
        this.pipe = pipe;
        this.counter = pipe.chain.length ? pipe.chain.length : 0;
    }

    case(condition: ICallback<any>): W {
        this.counter++;
        const id = this.counter;
        const chain = this.pipe.chain;
        chain.push(
            (data: IPipePayload): void => {
                data.isAvailable = true
                if (condition(data.payload as T)) data.isBreak = true;
                if (id === chain.length && !data.isBreak) data.isAvailable = false;
            }
        );
        return this as any;
    }

    pushCases(conditions: ICallback<any>[]): W {
        if (!Array.isArray(conditions)) return this as any;
        for (let i = 0; i < conditions.length; i++) this.case(conditions[i]);
        return this as any;
    }
}
