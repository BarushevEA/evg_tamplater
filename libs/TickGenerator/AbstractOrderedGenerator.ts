import {AbstractGenerator} from "./AbstractGenerator";
import {EState} from "./Env";
import {OrderedObservable} from "../Observables";
import {ICallback, IOrderedSubscriptionLike} from "../Observables/Types";


export abstract class AbstractOrderedGenerator extends AbstractGenerator {
    protected state$ = new OrderedObservable<EState>(EState.UNDEFINED);

    subscribeOnState(callback: ICallback<EState>): IOrderedSubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;
        return this.state$.subscribe(callback);
    }

    subscribeOnProcess(callback: ICallback<EState>): IOrderedSubscriptionLike | undefined {
        if (this.isDestroyed()) return undefined;
        return <IOrderedSubscriptionLike>this.state$.pipe()?.refine(state => state === EState.PROCESS).subscribe(callback);
    }
}
