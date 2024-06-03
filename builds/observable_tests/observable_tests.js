(()=>{"use strict";var e={401:(e,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.FilterSwitchCase=s.Filter=void 0,s.Filter=class{chainHandlers=[];pipeData={isBreakChain:!1,isAvailable:!1,payload:null};errorHandler;get isEmpty(){return 0===this.chainHandlers.length}filter(e){const s=this.pipeData;return this.chainHandlers.push((()=>{e(s.payload)&&(s.isAvailable=!0)})),this}switch(){return new i(this)}processChain(e){const s=this.chainHandlers,i=this.pipeData,r={isOK:!1,payload:void 0};i.payload=e,i.isBreakChain=!1;try{for(let e=0;e<s.length;e++){if(i.isAvailable=!1,s[e](),!i.isAvailable)return r;if(i.isBreakChain)break}}catch(e){return this.errorHandler?this.errorHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),r}return r.isOK=!0,r.payload=i.payload,r}addErrorHandler(e){this.errorHandler=e}};class i{pipe;caseCounter;constructor(e){this.pipe=e,this.caseCounter=e.chainHandlers.length?e.chainHandlers.length:0}case(e){this.caseCounter++;const s=this.caseCounter,i=this.pipe.pipeData,r=this.pipe.chainHandlers;return r.push((()=>{i.isAvailable=!0,e(i.payload)&&(i.isBreakChain=!0),s!==r.length||i.isBreakChain||(i.isAvailable=!1)})),this}}s.FilterSwitchCase=i},951:(e,s)=>{function i(e){return"next"in e?s=>e.next(s):e}Object.defineProperty(s,"__esModule",{value:!0}),s.getListener=s.quickDeleteFromArray=s.deleteFromArray=s.sortDescending=s.sortAscending=void 0,s.sortAscending=(e,s)=>e.order>s.order?1:e.order<s.order?-1:0,s.sortDescending=(e,s)=>e.order>s.order?-1:e.order<s.order?1:0,s.deleteFromArray=function(e,s){const i=e.indexOf(s);return-1!==i&&(e.splice(i,1),!0)},s.quickDeleteFromArray=function(e,s){const i=e.indexOf(s);return-1!==i&&(e[i]=e[e.length-1],e.length=e.length-1,!0)},s.getListener=function(e){if(Array.isArray(e)){const s=[];for(let r=0;r<e.length;r++)s.push(i(e[r]));return e=>{for(let i=0;i<s.length;i++)s[i](e)}}return i(e)}},390:(e,s,i)=>{s.c=void 0;const r=i(951),t=i(528),n=i(401);s.c=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];filterCase=new n.Filter;constructor(e){this.value=e}addFilter(e){return e&&this.filterCase.addErrorHandler(e),this.filterCase}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable&&(this.filterCase.isEmpty||this.filterCase.processChain(e).isOK)){this.isNextProcess=!0,this.value=e;for(let s=0;s<this.listeners.length;s++)this.listeners[s].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let s=0;s<e.length;s++)this.next(e[s])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let s=0;s<e;s++)this.unSubscribe(this.listenersForUnsubscribe[s]);this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const s=e;return!s.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(s.isMarkedForUnsubscribe=!0)}this.listeners&&(0,r.quickDeleteFromArray)(this.listeners,e)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,s){if(!this.isSubsValid(e))return;const i=new t.SubscribeObject(this,!1);return this.addObserver(i,e,s),i}addObserver(e,s,i){e.subscribe(s,i),this.listeners.push(e)}isSubsValid(e){return!this._isDestroyed&&!!e}pipe(){if(this._isDestroyed)return;const e=new t.SubscribeObject(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}},375:(e,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.SwitchCase=s.Pipe=void 0,s.Pipe=class{chainHandlers=[];pipeData={isBreakChain:!1,isNeedUnsubscribe:!1,isAvailable:!1,payload:null};setOnce(){const e=this.pipeData;return this.chainHandlers.push((()=>{this.listener(e.payload),e.isNeedUnsubscribe=!0})),this}unsubscribeByNegative(e){const s=this.pipeData;return this.chainHandlers.push((()=>{s.isAvailable=!0,e(s.payload)||(s.isNeedUnsubscribe=!0)})),this}unsubscribeByPositive(e){const s=this.pipeData;return this.chainHandlers.push((()=>{s.isAvailable=!0,e(s.payload)&&(s.isNeedUnsubscribe=!0)})),this}emitByNegative(e){const s=this.pipeData;return this.chainHandlers.push((()=>{e(s.payload)||(s.isAvailable=!0)})),this}emitByPositive(e){const s=this.pipeData;return this.chainHandlers.push((()=>{e(s.payload)&&(s.isAvailable=!0)})),this}emitMatch(e){const s=this.pipeData;return this.chainHandlers.push((()=>{e(s.payload)==s.payload&&(s.isAvailable=!0)})),this}switch(){return new i(this)}processChain(e){const s=this.chainHandlers,i=this.pipeData;for(let e=0;e<s.length;e++){if(i.isNeedUnsubscribe=!1,i.isAvailable=!1,s[e](),i.isNeedUnsubscribe)return this.unsubscribe();if(!i.isAvailable)return;if(i.isBreakChain)break}return e(i.payload)}};class i{pipe;caseCounter;constructor(e){this.pipe=e,this.caseCounter=e.chainHandlers.length?e.chainHandlers.length:0}subscribe(e,s){return this.pipe.subscribe(e,s)}case(e){this.caseCounter++;const s=this.caseCounter,i=this.pipe.pipeData,r=this.pipe.chainHandlers;return r.push((()=>{i.isAvailable=!0,e(i.payload)&&(i.isBreakChain=!0),s!==r.length||i.isBreakChain||(i.isAvailable=!1)})),this}}s.SwitchCase=i},528:(e,s,i)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.SubscribeObject=void 0;const r=i(375),t=i(951);class n extends r.Pipe{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(e,s)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,s)};_order=0;isPaused=!1;isPipe=!1;constructor(e,s){super(),this.observable=e,this.isPipe=!!s}subscribe(e,s){return this.listener=(0,t.getListener)(e),s&&(this.errorHandler=s),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chainHandlers.length=0)}send(e){try{this.pipeData.payload=e,this.pipeData.isBreakChain=!1,this.processValue(e)}catch(s){this.errorHandler(e,s)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}get order(){return this._order}set order(e){this._order=e}processValue(e){const s=this.listener;return s&&this.observable?this.isPaused?void 0:this.isPipe?this.processChain(s):s(e):this.unsubscribe()}}s.SubscribeObject=n}},s={};function i(r){var t=s[r];if(void 0!==t)return t.exports;var n=s[r]={exports:{}};return e[r](n,n.exports,i),n.exports}(()=>{var e=i(390);const s="BLOND",r="BLACK",t="BROWN",n="MAN",a="WOMAN",l="DOCTOR",h="DRIVER",o="CHILD";class c{constructor(e,s,i,r,t){this.name=e,this.age=s,this.gender=i,this.major=r,this.hairColor=t,this.hairColor=t,this.name=e,this.age=s,this.gender=i,this.major=r}}const u=new e.c(null),d=new e.c(null),b=new e.c(null);d.addFilter().filter((e=>e.gender===n)),b.addFilter().filter((e=>e.gender===a)),d.subscribe((e=>{console.log("MAN ==> is ready to work:",e.name,e.age,e.major)})),b.subscribe((e=>{console.log("WOMAN ==> is ready to work:",e.name,e.age,e.major)})),u.pipe().emitByPositive((e=>e.age>17)).emitByPositive((e=>e.age<60)).subscribe([d,b]),u.pipe().switch().case((e=>e.hairColor===r)).case((e=>e.hairColor===s)).subscribe((e=>{console.log("PERSON ==> only black or blond:",e.name,e.age,e.hairColor)})),u.stream([new c("Alex",35,n,l,s),new c("John",45,n,h,r),new c("Alice",30,a,l,t),new c("Sophia",36,a,h,s),new c("Matthew",15,n,o,t),new c("Emily",17,a,o,r),new c("James",40,n,l,s),new c("Emma",35,a,h,t),new c("Michael",15,n,o,r),new c("Olivia",16,a,o,s)])})()})();