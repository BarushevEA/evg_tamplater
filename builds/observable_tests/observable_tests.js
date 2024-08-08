(()=>{"use strict";const s=s=>"next"in s?e=>s.next(e):s;class e{constructor(s){this.pipe=s,this.counter=s.chain.length?s.chain.length:0}case(s){this.counter++;const e=this.counter,i=this.pipe.chain;return i.push((t=>{t.isAvailable=!0,s(t.payload)&&(t.isBreak=!0),e!==i.length||t.isBreak||(t.isAvailable=!1)})),this}pushCases(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.case(s[e]);return this}}class i{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}processChain(s){const e=this.chain,i=this.flow;for(let s=0;s<e.length;s++){if(i.isUnsubscribe=!1,i.isAvailable=!1,e[s](i),i.isUnsubscribe)return this.unsubscribe();if(!i.isAvailable)return;if(i.isBreak)break}return s(i.payload)}setOnce(){return this.push((s=>{this.listener(s.payload),s.isUnsubscribe=!0}))}unsubscribeBy(s){return this.push((e=>{e.isAvailable=!0,s(e.payload)&&(e.isUnsubscribe=!0)}))}refine(s){return this.push((e=>{s(e.payload)&&(e.isAvailable=!0)}))}pushRefiners(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.refine(s[e]);return this}switch(){return new t(this)}then(s){return this.push((e=>{e.payload=s(e.payload),e.isAvailable=!0}))}serialize(){return this.push((s=>{s.payload=JSON.stringify(s.payload),s.isAvailable=!0}))}deserialize(){return this.push((s=>{s.payload=JSON.parse(s.payload),s.isAvailable=!0}))}push(s){return this.chain.push(s),this}}class t extends e{subscribe(s,e){return this.pipe.subscribe(s,e)}}class r extends i{get order(){return this._order}constructor(s,e){super(),this._order=0,this.isPaused=!1,this.isPipe=!1,this.errorHandler=(s,e)=>{console.log(`(Unit of SubscribeObject).send(${s}) ERROR:`,e)},this.observable=s,this.isPipe=!!e}subscribe(e,i){return this.listener=(e=>{if(Array.isArray(e)){const i=[];for(let t=0;t<e.length;t++)i.push(s(e[t]));return s=>{for(let e=0;e<i.length;e++)i[e](s)}}return s(e)})(e),i&&(this.errorHandler=i),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chain.length=0)}send(s){try{this.flow.payload=s,this.flow.isBreak=!1,this.processValue(s)}catch(e){this.errorHandler(s,e)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}set order(s){this._order=s}processValue(s){const e=this.listener;return e?this.observable&&!this.isPaused?this.isPipe?this.processChain(e):e(s):void 0:this.unsubscribe()}}class h{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}pushFilters(s){if(!Array.isArray(s))return this;for(let e=0;e<s.length;e++)this.filter(s[e]);return this}filter(s){return this.push((e=>{s(e.payload)&&(e.isAvailable=!0)}))}push(s){return this.chain.push(s),this}switch(){return new n(this)}processChain(s){const e=this.chain,i=this.flow,t=this.response;t.isOK=!1,t.payload=void 0,i.payload=s,i.isBreak=!1;try{for(let s=0;s<e.length;s++){if(i.isAvailable=!1,e[s](i),!i.isAvailable)return t;if(i.isBreak)break}}catch(s){return this.errHandler?this.errHandler(s,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",s),t}return t.isOK=!0,t.payload=i.payload,t}addErrorHandler(s){this.errHandler=s}}class n extends e{}class l{constructor(s){this.value=s,this.listeners=[],this.isStop=!0,this.isKilled=!1,this.isProcess=!1,this.trash=[],this.filters=new h}addFilter(s){return s&&this.filters.addErrorHandler(s),this.filters}disable(){this.isStop=!1}enable(){this.isStop=!0}get isEnable(){return this.isStop}next(s){if(!this.isKilled&&this.isStop&&(this.filters.isEmpty||this.filters.processChain(s).isOK)){this.isProcess=!0,this.value=s;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(s);this.isProcess=!1,this.trash.length&&this.handleListenersForUnsubscribe()}}stream(s){if(!this.isKilled&&this.isStop)for(let e=0;e<s.length;e++)this.next(s[e])}get isDestroyed(){return this.isKilled}unSubscribe(s){this.isKilled||(this.isProcess&&s?this.trash.push(s):this.listeners&&((s,e)=>{const i=s.indexOf(e);-1!==i&&(s[i]=s[s.length-1],s.length=s.length-1)})(this.listeners,s))}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this.isKilled=!0}unsubscribeAll(){this.isKilled||(this.listeners.length=0)}getValue(){if(!this.isKilled)return this.value}size(){return this.isKilled?0:this.listeners.length}subscribe(s,e){if(!this.isListener(s))return;const i=new r(this,!1);return this.addObserver(i,s,e),i}addObserver(s,e,i){s.subscribe(e,i),this.listeners.push(s)}isListener(s){return!this.isKilled&&!!s}pipe(){if(this.isKilled)return;const s=new r(this,!0);return this.listeners.push(s),s}handleListenersForUnsubscribe(){const s=this.trash.length;for(let e=0;e<s;e++)this.unSubscribe(this.trash[e]);this.trash.length=0}}const a="BLOND",o="BLACK",u="BROWN",c="MAN",b="WOMAN",d="DOCTOR",p="DRIVER",f="CHILD";class g{constructor(s,e,i,t,r){this.name=s,this.age=e,this.gender=i,this.major=t,this.hairColor=r,this.hairColor=r,this.name=s,this.age=e,this.gender=i,this.major=t}}const y=new l(null),A=new l(null),w=new l(null),v=[s=>!!s,s=>"name"in s,s=>"age"in s,s=>"gender"in s,s=>"major"in s,s=>"hairColor"in s];A.addFilter().pushFilters(v).filter((s=>s.gender===c)),w.addFilter().pushFilters(v).filter((s=>s.gender===b)),A.pipe().pushRefiners(v).subscribe((s=>{console.log("MAN ==> is ready to work:",s.name,s.age,s.major)})),w.pipe().pushRefiners(v).subscribe((s=>{console.log("WOMAN ==> is ready to work:",s.name,s.age,s.major)})),y.pipe().refine((s=>s.age>17)).refine((s=>s.age<60)).subscribe([A,w]),y.pipe().switch().case((s=>s.hairColor===o)).case((s=>s.hairColor===a)).subscribe((s=>{console.log("PERSON ==> only black or blond:",s.name,s.age,s.hairColor)})),y.stream([new g("Alex",35,c,d,a),new g("John",45,c,p,o),new g("Alice",30,b,d,u),new g("Sophia",36,b,p,a),new g("Matthew",15,c,f,u),new g("Emily",17,b,f,o),new g("James",40,c,d,a),new g("Emma",35,b,p,u),new g("Michael",15,c,f,o),new g("Olivia",16,b,f,a)])})();