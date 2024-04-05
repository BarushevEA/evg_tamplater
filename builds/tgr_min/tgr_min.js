(()=>{"use strict";var e={951:(e,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.sortDescending=s.sortAscending=s.randomCallback=s.positiveCallback=s.negativeCallback=s.quickDeleteFromArray=s.deleteFromArray=void 0,s.deleteFromArray=function(e,s){const t=e.indexOf(s);return-1!==t&&(e.splice(t,1),!0)},s.quickDeleteFromArray=function(e,s){const t=e.indexOf(s);return-1!==t&&(e[t]=e[e.length-1],e.length=e.length-1,!0)},s.negativeCallback=()=>!1,s.positiveCallback=()=>!0,s.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124",s.sortAscending=(e,s)=>e.order>s.order?1:e.order<s.order?-1:0,s.sortDescending=(e,s)=>e.order>s.order?-1:e.order<s.order?1:0},390:(e,s,t)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Observable=s.SubscribeObject=void 0;const i=t(951);class r{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(e,s)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,s)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(e,s){this.observable=e,this.isPipe=!!s}static callbackSend(e,s){const t=s.listener;return t&&s.observable?s.isListenPaused?void 0:s.isPipe?s.emitByPositiveCondition&&s.emitByPositiveCondition(e)||s.emitByNegativeCondition&&!s.emitByNegativeCondition(e)?t(e):s.once.isOnce?(s.once.isFinished=!0,t(e),s.unsubscribe()):s.unsubscribeByNegativeCondition?s.unsubscribeByNegativeCondition(e)?t(e):(s.unsubscribeByNegativeCondition=null,s.unsubscribe()):s.unsubscribeByPositiveCondition?s.unsubscribeByPositiveCondition(e)?(s.unsubscribeByPositiveCondition=null,s.unsubscribe()):t(e):s.emitMatchCondition&&s.emitMatchCondition(e)===e?t(e):void 0:t(e):s.unsubscribe()}subscribe(e,s){return this.listener=e,s&&(this.errorHandler=s),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(e){try{r.callbackSend(e,this)}catch(s){this.errorHandler(e,s)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return this.unsubscribeByNegativeCondition=e??i.negativeCallback,this}unsubscribeByPositive(e){return this.unsubscribeByPositiveCondition=e??i.positiveCallback,this}emitByNegative(e){return this.emitByNegativeCondition=e??i.positiveCallback,this}emitByPositive(e){return this.emitByPositiveCondition=e??i.negativeCallback,this}emitMatch(e){return this.emitMatchCondition=e??i.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}s.SubscribeObject=r,s.Observable=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(e){this.value=e}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=e;for(let s=0;s<this.listeners.length;s++)this.listeners[s].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let s=0;s<e.length;s++)this.next(e[s])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let s=0;s<e;s++)this.unSubscribe(this.listenersForUnsubscribe[s]);this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const s=e;return!s.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(s.isMarkedForUnsubscribe=!0)}this.listeners&&(0,i.quickDeleteFromArray)(this.listeners,e)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,s){if(this._isDestroyed)return;if(!e)return;const t=new r(this,!1);return t.subscribe(e,s),this.listeners.push(t),t}pipe(){if(this._isDestroyed)return;const e=new r(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}},735:(e,s,t)=>{s.z6=void 0;const i=t(390),r=t(951);class n extends i.SubscribeObject{constructor(e,s){super(e,s)}get order(){return this._order}set order(e){!this.observable||this.observable&&this.observable.isDestroyed?this._order=void 0:(this._order=e,this.observable.sortByOrder())}subscribe(e,s){return this.listener=e,s&&(this.errorHandler=s),this}setOnce(){return super.setOnce()}unsubscribeByNegative(e){return super.unsubscribeByNegative(e)}unsubscribeByPositive(e){return super.unsubscribeByPositive(e)}emitByNegative(e){return super.emitByNegative(e)}emitByPositive(e){return super.emitByPositive(e)}emitMatch(e){return super.emitMatch(e)}}class o extends i.Observable{sortDirection=r.sortAscending;setAscendingSort(){return this.sortDirection=r.sortAscending,this.sortByOrder()}setDescendingSort(){return this.sortDirection=r.sortDescending,this.sortByOrder()}sortByOrder(){return!this._isDestroyed&&(this.listeners.sort(this.sortDirection),!0)}subscribe(e,s){if(this._isDestroyed)return;if(!e)return;const t=new n(this,!1);return t.subscribe(e,s),this.listeners.push(t),t}pipe(){if(this._isDestroyed)return;const e=new n(this,!0);return this.listeners.push(e),e}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const s=e;return!s.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(s.isMarkedForUnsubscribe=!0)}this.listeners&&(0,r.deleteFromArray)(this.listeners,e)}}}s.z6=o}},s={};function t(i){var r=s[i];if(void 0!==r)return r.exports;var n=s[i]={exports:{}};return e[i](n,n.exports,t),n.exports}(()=>{var e,s;function i(e){return{isApplied:!0,state:e}}function r(e){return{isApplied:!1,state:e}}!function(e){e.INIT="INIT",e.STARTED="STARTED",e.STOPPED="STOPPED",e.PROCESS="PROCESS",e.DESTROYED="DESTROYED",e.UNDEFINED="UNDEFINED",e.DELETED="DELETED",e.READY="READY"}(e||(e={})),function(e){e.NEGATIVE_DELAY="Delay must be a positive number.",e.TYPE_INVALID="TYPE_INVALID",e.NAME_IS_NOT_PRESENT="NAME_IS_NOT_PRESENT",e.INSTANCE_DESTROYED="INSTANCE_DESTROYED"}(s||(s={}));var n=t(390);class o{constructor(){this.state$=new n.Observable(e.UNDEFINED)}get state(){return this.state$.isDestroyed?e.DESTROYED:this.state$.getValue()??e.UNDEFINED}start(){if(this.isDestroyed())return r(e.DESTROYED);const s=this.startProcess();return s.isApplied?this.getPositive(s):s}stop(){if(this.isDestroyed())return r(e.DESTROYED);const s=this.stopProcess();return s.isApplied?this.getPositive(s):s}destroy(){return this.stop(),this.state$.next(e.DESTROYED),this.state$.destroy(),i(e.DESTROYED)}subscribeOnState(e){if(!this.isDestroyed())return this.state$.subscribe(e)}subscribeOnProcess(s){if(!this.isDestroyed())return this.state$.pipe()?.emitByPositive((s=>s===e.PROCESS)).subscribe(s)}isDestroyed(){return this.state===e.DESTROYED}getPositive(e){return this.state$.next(e.state),i(e.state)}}var u=t(735);class a extends o{constructor(){super(...arguments),this.state$=new u.z6(e.UNDEFINED)}subscribeOnState(e){if(!this.isDestroyed())return this.state$.subscribe(e)}subscribeOnProcess(s){if(!this.isDestroyed())return this.state$.pipe()?.emitByPositive((s=>s===e.PROCESS)).subscribe(s)}}const h=window;h.GTimeout=class extends o{constructor(){super(),this.delay=0,this.timerId=0}setTimeout(t){const n=this.state;return this.isDestroyed()?r(e.DESTROYED):n===e.STARTED?r(n):t<0?r(s.NEGATIVE_DELAY):(this.delay=t,this.state$.next(e.INIT),i(e.INIT))}startProcess(){return this.timerId=setTimeout((()=>{this.state$.next(e.PROCESS),this.state$.next(e.STOPPED)}),this.delay),i(e.STARTED)}stopProcess(){return clearTimeout(this.timerId),i(e.STOPPED)}},h.GInterval=class extends o{constructor(){super(),this.intervalId=0,this.delay=0}setInterval(t){const n=this.state;return this.isDestroyed()?r(e.DESTROYED):n===e.STARTED?r(n):t<0?r(s.NEGATIVE_DELAY):(this.delay=t,this.state$.next(e.INIT),i(e.INIT))}startProcess(){return this.intervalId=setInterval((()=>{this.state$.next(e.PROCESS)}),this.delay),i(e.STARTED)}stopProcess(){return clearInterval(this.intervalId),i(e.STOPPED)}},h.GAnimationFrame=class extends o{constructor(e){super(),this.rafId=null,this.fps=60,this.rafId=e}setFPS(t){const n=this.state;return this.isDestroyed()?r(e.DESTROYED):n===e.STARTED?r(n):t<1?r(s.NEGATIVE_DELAY):(this.fps=t,i(this.state))}set60fps(){return this.setFPS(60)}set30fps(){return this.setFPS(30)}setDefault(){return this.setFPS(60)}startProcess(){if(this.rafId)return r(e.STARTED);let s=Math.floor(performance.now());const t=Math.floor(1e3/this.fps),n=i=>{i=Math.floor(i),this.rafId=requestAnimationFrame(n);const r=i-s;r>=t&&(s=i-r%t,this.state$.next(e.PROCESS))};return this.rafId=requestAnimationFrame(n),i(e.STARTED)}stopProcess(){return this.rafId?(cancelAnimationFrame(this.rafId),this.rafId=null,i(e.STOPPED)):r(s.NEGATIVE_DELAY)}},h.GTimeoutOrdered=class extends a{constructor(){super(),this.delay=0,this.timerId=0}setTimeout(t){const n=this.state;return this.isDestroyed()?r(e.DESTROYED):n===e.STARTED?r(n):t<0?r(s.NEGATIVE_DELAY):(this.delay=t,this.state$.next(e.INIT),i(e.INIT))}startProcess(){return this.timerId=setTimeout((()=>{this.state$.next(e.PROCESS),this.state$.next(e.STOPPED)}),this.delay),i(e.STARTED)}stopProcess(){return clearTimeout(this.timerId),i(e.STOPPED)}},h.GIntervalOrdered=class extends a{constructor(){super(),this.intervalId=0,this.delay=0}setInterval(t){const n=this.state;return this.isDestroyed()?r(e.DESTROYED):n===e.STARTED?r(n):t<0?r(s.NEGATIVE_DELAY):(this.delay=t,this.state$.next(e.INIT),i(e.INIT))}startProcess(){return this.intervalId=setInterval((()=>{this.state$.next(e.PROCESS)}),this.delay),i(e.STARTED)}stopProcess(){return clearInterval(this.intervalId),i(e.STOPPED)}},h.qwe=class extends a{constructor(e){super(),this.rafId=null,this.fps=60,this.rafId=e}setFPS(t){const n=this.state;return this.isDestroyed()?r(e.DESTROYED):n===e.STARTED?r(n):t<1?r(s.NEGATIVE_DELAY):(this.fps=t,i(this.state))}set60fps(){return this.setFPS(60)}set30fps(){return this.setFPS(30)}setDefault(){return this.setFPS(60)}startProcess(){if(this.rafId)return r(e.STARTED);let s=Math.floor(performance.now());const t=Math.floor(1e3/this.fps),n=i=>{i=Math.floor(i),this.rafId=requestAnimationFrame(n);const r=i-s;r>=t&&(s=i-r%t,this.state$.next(e.PROCESS))};return this.rafId=requestAnimationFrame(n),i(e.STARTED)}stopProcess(){return this.rafId?(cancelAnimationFrame(this.rafId),this.rafId=null,i(e.STOPPED)):r(s.NEGATIVE_DELAY)}}})()})();