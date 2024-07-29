import {AbstractGenerator} from "./AbstractGenerator";
import {OrderedObservable} from "evg_observable/src/outLib/OrderedObservable";
import {EState} from "./Env";
import {ICallback, IOrderedSubscriptionLike} from "evg_observable/src/outLib/Types";

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
