(()=>{"use strict";const s=(s,e)=>s.order>e.order?1:s.order<e.order?-1:0,e=(s,e)=>s.order>e.order?-1:s.order<e.order?1:0;function i(s,e){const i=s.indexOf(e);return-1!==i&&(s[i]=s[s.length-1],s.length=s.length-1,!0)}function t(s){return"next"in s?e=>s.next(e):s}class r{constructor(){this.chainHandlers=[],this.pipeData={isBreakChain:!1,isNeedUnsubscribe:!1,isAvailable:!1,payload:null}}setOnce(){const s=this.pipeData;return this.chainHandlers.push((()=>{this.listener(s.payload),s.isNeedUnsubscribe=!0})),this}unsubscribeByNegative(s){const e=this.pipeData;return this.chainHandlers.push((()=>{e.isAvailable=!0,s(e.payload)||(e.isNeedUnsubscribe=!0)})),this}unsubscribeByPositive(s){const e=this.pipeData;return this.chainHandlers.push((()=>{e.isAvailable=!0,s(e.payload)&&(e.isNeedUnsubscribe=!0)})),this}emitByNegative(s){const e=this.pipeData;return this.chainHandlers.push((()=>{s(e.payload)||(e.isAvailable=!0)})),this}emitByPositive(s){const e=this.pipeData;return this.chainHandlers.push((()=>{s(e.payload)&&(e.isAvailable=!0)})),this}refine(s){return this.emitByPositive(s)}pushRefiners(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.emitByPositive(s[e]);return this}emitMatch(s){const e=this.pipeData;return this.chainHandlers.push((()=>{s(e.payload)==e.payload&&(e.isAvailable=!0)})),this}switch(){return new n(this)}processChain(s){const e=this.chainHandlers,i=this.pipeData;for(let s=0;s<e.length;s++){if(i.isNeedUnsubscribe=!1,i.isAvailable=!1,e[s](),i.isNeedUnsubscribe)return this.unsubscribe();if(!i.isAvailable)return;if(i.isBreakChain)break}return s(i.payload)}}class n{constructor(s){this.pipe=s,this.caseCounter=s.chainHandlers.length?s.chainHandlers.length:0}subscribe(s,e){return this.pipe.subscribe(s,e)}case(s){this.caseCounter++;const e=this.caseCounter,i=this.pipe.pipeData,t=this.pipe.chainHandlers;return t.push((()=>{i.isAvailable=!0,s(i.payload)&&(i.isBreakChain=!0),e!==t.length||i.isBreakChain||(i.isAvailable=!1)})),this}pushCases(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.case(s[e]);return this}}class h extends r{constructor(s,e){super(),this.errorHandler=(s,e)=>{console.log(`(Unit of SubscribeObject).send(${s}) ERROR:`,e)},this._order=0,this.isPaused=!1,this.isPipe=!1,this.observable=s,this.isPipe=!!e}subscribe(s,e){return this.listener=function(s){if(Array.isArray(s)){const e=[];for(let i=0;i<s.length;i++)e.push(t(s[i]));return s=>{for(let i=0;i<e.length;i++)e[i](s)}}return t(s)}(s),e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chainHandlers.length=0)}send(s){try{this.pipeData.payload=s,this.pipeData.isBreakChain=!1,this.processValue(s)}catch(e){this.errorHandler(s,e)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}get order(){return this._order}set order(s){this._order=s}processValue(s){const e=this.listener;return e&&this.observable?this.isPaused?void 0:this.isPipe?this.processChain(e):e(s):this.unsubscribe()}}class a{constructor(){this.chainHandlers=[],this.pipeData={isBreakChain:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chainHandlers.length}filter(s){const e=this.pipeData;return this.chainHandlers.push((()=>{s(e.payload)&&(e.isAvailable=!0)})),this}pushFilters(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.filter(s[e]);return this}switch(){return new l(this)}processChain(s){const e=this.chainHandlers,i=this.pipeData,t=this.response;t.isOK=!1,t.payload=void 0,i.payload=s,i.isBreakChain=!1;try{for(let s=0;s<e.length;s++){if(i.isAvailable=!1,e[s](),!i.isAvailable)return t;if(i.isBreakChain)break}}catch(s){return this.errorHandler?this.errorHandler(s,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",s),t}return t.isOK=!0,t.payload=i.payload,t}addErrorHandler(s){this.errorHandler=s}}class l{constructor(s){this.pipe=s,this.caseCounter=s.chainHandlers.length?s.chainHandlers.length:0}case(s){this.caseCounter++;const e=this.caseCounter,i=this.pipe.pipeData,t=this.pipe.chainHandlers;return t.push((()=>{i.isAvailable=!0,s(i.payload)&&(i.isBreakChain=!0),e!==t.length||i.isBreakChain||(i.isAvailable=!1)})),this}pushCases(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.case(s[e]);return this}}class o{constructor(s){this.value=s,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[],this.filterCase=new a}addFilter(s){return s&&this.filterCase.addErrorHandler(s),this.filterCase}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(s){if(!this._isDestroyed&&this._isEnable&&(this.filterCase.isEmpty||this.filterCase.processChain(s).isOK)){this.isNextProcess=!0,this.value=s;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(s);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(s){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<s.length;e++)this.next(s[e])}handleListenersForUnsubscribe(){const s=this.listenersForUnsubscribe.length;for(let e=0;e<s;e++)this.unSubscribe(this.listenersForUnsubscribe[e]);this.listenersForUnsubscribe.length=0}unSubscribe(s){this._isDestroyed||(this.isNextProcess&&s?this.listenersForUnsubscribe.push(s):this.listeners&&i(this.listeners,s))}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(s,e){if(!this.isSubsValid(s))return;const i=new h(this,!1);return this.addObserver(i,s,e),i}addObserver(s,e,i){s.subscribe(e,i),this.listeners.push(s)}isSubsValid(s){return!this._isDestroyed&&!!s}pipe(){if(this._isDestroyed)return;const s=new h(this,!0);return this.listeners.push(s),s}get isDestroyed(){return this._isDestroyed}}class u extends h{constructor(s,e){super(s,e)}get order(){return this._order}set order(s){!this.observable||this.observable&&this.observable.isDestroyed?this._order=void 0:(this._order=s,this.observable.sortByOrder())}subscribe(s,e){return super.subscribe(s,e),this}setOnce(){return super.setOnce()}unsubscribeByNegative(s){return super.unsubscribeByNegative(s)}unsubscribeByPositive(s){return super.unsubscribeByPositive(s)}emitByNegative(s){return super.emitByNegative(s)}emitByPositive(s){return super.emitByPositive(s)}refine(s){return super.emitByPositive(s)}pushRefiners(s){return super.pushRefiners(s)}emitMatch(s){return super.emitMatch(s)}}const c=window;c.Observable=o,c.Collector=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...s){this._isDestroyed||this.list.push(...s)}unsubscribe(s){this._isDestroyed||(s?.unsubscribe(),i(this.list,s))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}},c.OrderedObservable=class extends o{constructor(){super(...arguments),this.sortDirection=s}setAscendingSort(){return this.sortDirection=s,this.sortByOrder()}setDescendingSort(){return this.sortDirection=e,this.sortByOrder()}sortByOrder(){return!this._isDestroyed&&(this.listeners.sort(this.sortDirection),!0)}subscribe(s,e){if(!this.isSubsValid(s))return;const i=new u(this,!1);return this.addObserver(i,s,e),i}pipe(){if(this._isDestroyed)return;const s=new u(this,!0);return this.listeners.push(s),s}unSubscribe(s){this._isDestroyed||(this.isNextProcess&&s?this.listenersForUnsubscribe.push(s):this.listeners&&function(s,e){const i=s.indexOf(e);-1!==i&&s.splice(i,1)}(this.listeners,s))}}})();