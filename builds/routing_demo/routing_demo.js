(()=>{"use strict";let t,e,s,n,i;function r(...e){t?console.log(t.description,...e):console.log("APP",...e)}const a=new class{constructor(r,a,h,o){e=r,s=a,n=h,i=o,t=this}set major(t){s=t}set minor(t){n=t}set patch(t){i=t}set name(t){e=t}get version(){return`${s}.${n}.${i}`}get name(){return e}get description(){return`[${e} version: ${this.version}]`.toUpperCase()}init(t){t||r("STARTED")}}("routing_demo",1,0,0);var h;function o(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)}function l(t){return"next"in t?e=>t.next(e):t}!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(h||(h={}));class c{constructor(t){this.pipe=t,this.counter=t.chain.length?t.chain.length:0}case(t){this.counter++;const e=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,t(n.payload)&&(n.isBreak=!0),e!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.case(t[e]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}setOnce(){return this.push((t=>{this.listener(t.payload),t.isUnsubscribe=!0}))}unsubscribeBy(t){return this.push((e=>{e.isAvailable=!0,t(e.payload)&&(e.isUnsubscribe=!0)}))}processChain(t){const e=this.chain,s=this.flow;for(let t=0;t<e.length;t++){if(s.isUnsubscribe=!1,s.isAvailable=!1,e[t](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return t(s.payload)}pushRefiners(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.refine(t[e]);return this}switch(){return new _(this)}then(t){return this.push((e=>{e.payload=t(e.payload),e.isAvailable=!0}))}serialize(){return this.push((t=>{t.payload=JSON.stringify(t.payload),t.isAvailable=!0}))}deserialize(){return this.push((t=>{t.payload=JSON.parse(t.payload),t.isAvailable=!0}))}push(t){return this.chain.push(t),this}}class _ extends c{subscribe(t,e){return this.pipe.subscribe(t,e)}}class d extends u{get order(){return this._order}constructor(t,e){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this.observer=t,this.piped=!!e}subscribe(t,e){return this.listener=function(t){if(Array.isArray(t)){const e=[];for(let s=0;s<t.length;s++)e.push(l(t[s]));return t=>{for(let s=0;s<e.length;s++)e[s](t)}}return l(t)}(t),e&&(this.errorHandler=e),this}send(t){try{this.flow.payload=t,this.flow.isBreak=!1,this.processValue(t)}catch(e){this.errorHandler(t,e)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(t){this._order=t}processValue(t){const e=this.listener;return e?this.observer&&!this.paused?this.piped?this.processChain(e):e(t):void 0:this.unsubscribe()}}class m{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(t){return this.chain.push(t),this}filter(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}pushFilters(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.filter(t[e]);return this}switch(){return new p(this)}processChain(t){const e=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=t,s.isBreak=!1;try{for(let t=0;t<e.length;t++){if(s.isAvailable=!1,e[t](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(t){return this.errHandler?this.errHandler(t,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",t),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(t){this.errHandler=t}}class p extends c{}class b{constructor(t){this.value=t,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new m}addFilter(t){return t&&this.filters.addErrorHandler(t),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(t){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(t).isOK)){this.process=!0,this.value=t;for(let e=0;e<this.subs.length;e++)this.subs[e].send(t);this.process=!1,this.trash.length&&this.clearTrash()}}stream(t){if(!this.killed&&this.enabled)for(let e=0;e<t.length;e++)this.next(t[e])}get isDestroyed(){return this.killed}unSubscribe(t){this.killed||(this.process&&t?this.trash.push(t):this.subs&&o(this.subs,t))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const t=setInterval((()=>{this.process||(clearInterval(t),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(t,e){if(this.killed)return;if(!this.isListener(t))return;const s=new d(this,!1);return this.addObserver(s,t,e),s}addObserver(t,e,s){t.subscribe(e,s),this.subs.push(t)}isListener(t){return!this.killed&&!!t}pipe(){if(this.killed)return;const t=new d(this,!0);return this.subs.push(t),t}clearTrash(){const t=this.trash.length;for(let e=0;e<t;e++)this.unSubscribe(this.trash[e]);this.trash.length=0}}class f{constructor(){this.arr=[],this.killed=!1}collect(...t){this.killed||this.arr.push(...t)}unsubscribe(t){this.killed||(t?.unsubscribe(),o(this.arr,t))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const E=new b(h.EN),g=new class{get currentLocation(){return E.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return E.subscribe(t)}setLocation(t){E.next(t)}destroy(){E.destroy()}};class N{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}class C{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}class A{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}const O=window,I=document,y=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new b(""),O.addEventListener("popstate",this.popstate),this.popState()}set(t){this.isDestroyed||(O.history.pushState({},"",t),this.popState())}setWithoutHistory(t){this.isDestroyed||(O.history.replaceState({},"",t),this.popState())}subscribe(t){if(!this.isDestroyed)return this.state$.subscribe(t)}destroy(){O.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const t=O.location.pathname;this.state$.next(t)}};var D;!function(t){t.SHOW="SHOW",t.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",t.HIDDEN="HIDDEN"}(D||(D={}));let L=D.SHOW;const v=new b(""),M=new b(null);let $;function T(t,e,s){return{path:e,command:t,component:s}}const R=new f;var F,k,U;!function(t){t.MAIN_1="main_1",t.MAIN_2="main_2",t.MAIN_3="main_3"}(F||(F={})),function(t,e){M.next({defaultCmd:t,routes:e})}(F.MAIN_1,[T(F.MAIN_1,"/main_1",A),T(F.MAIN_2,"/main_2",C),T(F.MAIN_3,"/main_3",N)]),k=D.HIDDEN,L=k,function(t){t.RED="red",t.GREEN="green",t.BLUE="blue"}(U||(U={}));const S=new b(U.BLUE);let w=new Uint8Array(16);O.top;const H=`${O.crypto.getRandomValues(w),Array.from(w,(function(t){return`0${t.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,P="_______$$bool",x=[0];let B=[];var V,K,W;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(V||(V={})),function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.CHANNEL="channel",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(K||(K={})),function(t){t.TEXT_VALUE="TXT-VAL",t.QSI_BIND="QSI-BIND",t.APP_ROUTE="QSI-ROUTE"}(W||(W={}));const X=t=>I.createElement(t),Y=t=>{const e=X("style");return e.innerHTML=t,e},Q=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])},G=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])},j=(t,e)=>{e&&t?.appendChild(e)},z=t=>{t?.remove()},q=new b(null),J=t=>{q.pipe().refine((t=>!!t)).setOnce().subscribe(t),q.pipe().unsubscribeBy((t=>!!t)).setOnce().subscribe((()=>{const t=()=>{q.next(I.body),I.removeEventListener("DOMContentLoaded",t)};I.addEventListener("DOMContentLoaded",t)})),q.next(I.body)},Z=t=>`qsi-${t}`,tt=(t,e)=>t?t.getAttribute(Z(e)):"",et=(t,e,s)=>{t&&t.setAttribute(Z(e),s)},st=(t,e)=>{t&&t.removeAttribute(Z(e))},nt=(t,e)=>{if(!e.length)return;let s="[";if(e.length>1){for(let n=0;n<e.length;n++){const i=e[n];s+=rt(t,i),et(i,K.INFO,s.trim()+"]"),i.ahe_pnt_chl=t,i.ahe_onPChlRdy$.next(t)}return}const n=e[0];ut(t,n)?et(n,K.INFO,s+"var]"):_t(t,n)?et(n,K.INFO,s+"bind]"):(s+=pt(t,n),s+=bt(t,n),s+=mt(t,n),s+=ft(t,n),s+=Et(t,n),s+=gt(t,n),s+=Nt(t,n),s+=Ct(t,n),s+=At(t,n),s+=Ot(t,n),s+=It(t,n),s+=yt(t,n),s+=Dt(t,n),s+=Lt(t,n),s+=vt(t,n),s+=Tt(t,n),s+=rt(t,n),s+=it(t,n),et(n,K.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=t,n.ahe_onPChlRdy$.next(t)))},it=(t,e)=>{let s=tt(e,K.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:e,classConditions:i};for(let e=0;e<n.length;e++){const s=n[e];if(s.includes("?")){const e=s.split("?"),n=ct(t,e[0]),r=e[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:V.UNDEFINED,firstClassName:r[0],secondClassName:r[1]})}else if(s.includes(":")){const e=s.split(":"),n=ct(t,e[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:V.UNDEFINED,firstClassName:e[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:V.UNDEFINED,firstClassName:s,secondClassName:""})}return t.ahe_ClsIfLst.push(r),st(e,K.CLASS_IF),"cls "},rt=(t,e)=>{let s=tt(e,K.ON_IF);if(!s)return"";const n=at(),i=e.parentElement,r=ct(t,s);return t.ahe_IfLst.push({ifElement:e,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,e),z(e),st(e,K.ON_IF),et(n,K.INFO,"[ifp]"),"ifc "};(()=>{for(let t=0;t<1e4;t++)B.push(X(W.TEXT_VALUE))})();const at=()=>B.length?B.pop():X(W.TEXT_VALUE),ht=(t,e)=>{if(e.tagName===W.TEXT_VALUE)return(x[0]=e)&&x;if(e.tagName===W.QSI_BIND)return(x[0]=e)&&x;if(!t.isAppElement(e))return(x[0]=e)&&x;const s=tt(e,K.FOR);if(!s)return(x[0]=e)&&x;const n=t.ahe_cmt[s];if(!n)return(x[0]=e)&&x;const i=at(),r=e.parentElement,a=lt(t,[],n,i,e);return et(i,K.INFO,"[for-of]"),r.insertBefore(i,e),z(e),st(e,K.FOR),t.ahe_ForOfLst.push({parent:i,template:e,children:a,valueName:s}),a},ot=(t,e,s)=>{s.isAppElement(e)&&e.sendMessage(t)},lt=(t,e,s,n,i)=>{const r=[],a=e.length,h=s.length;let l=h-a;if(!(h+a))return r;if(l>0){for(let a=0;a<l;a++){const o=X(i.tagName);e.push(o),r.push(o);const c=tt(i,K.ON_IF);c&&et(o,K.ON_IF,c),j(n,o),ot(s[h-l+a],o,t)}for(let n=0;n<h-l;n++)ot(s[n],e[n],t)}else{l*=-1;for(let s=0;s<l;s++){const s=e.pop(),n=t.ahe_IfLst;let i;for(let t=0;t<n.length;t++){const e=n[t];if(e.ifElement===s){i=e;break}}i?(o(n,i),z(i.ifParent)):z(s)}for(let n=0;n<h;n++)ot(s[n],e[n],t)}return r},ct=(t,e)=>{const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_cmt[n]}},ut=(t,e)=>{if(e.tagName!==W.TEXT_VALUE)return!1;if(!e.innerHTML)return!1;const s=ct(t,e.innerHTML);return s.isFunction?(t.ahe_nFns.push({textElement:e,valueName:s.valueName,lastData:H}),!0):(t.ahe_nVls.push({textElement:e,valueName:s.valueName,lastData:H}),!0)},_t=(t,e)=>{if(e.tagName!==W.QSI_BIND)return!1;if(!e.innerHTML)return!1;const s=ct(t,e.innerHTML);return s.isFunction?(t.ahe_bndFns.push({textElement:e,valueName:s.valueName,lastData:H}),!0):(t.ahe_bndVls.push({textElement:e,valueName:s.valueName,lastData:H}),!0)},dt=(t,e,s)=>{t.ahe_cmt[e](s)},mt=(t,e)=>{const s=$t(e,K.SOURCE);if(!s)return"";const n=ct(t,s);return n.isFunction?(t.ahe_srcCmsFns.push({textElement:e,valueName:n.valueName,lastData:""}),"src "):(t.ahe_srcCms.push({textElement:e,valueName:s,lastData:""}),"src ")},pt=(t,e)=>{const s=$t(e,K.INJECT_TO);return s?(t.ahe_cmt[s]=e,"inj "):""},bt=(t,e)=>{const s=$t(e,K.CHANNEL);return s&&e.ahe_isCustomAppElement?(t.ahe_cmt[s]=e,"cnl "):""},ft=(t,e)=>{const s=Mt(t,e,K.ON_CLICK);return s?(e.onclick=e=>dt(t,s,e),"clk "):""},Et=(t,e)=>{const s=Mt(t,e,K.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>dt(t,s,e),"mlv "):""},gt=(t,e)=>{const s=Mt(t,e,K.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>dt(t,s,e),"mer "):""},Nt=(t,e)=>{const s=Mt(t,e,K.ON_MOUSE_UP);return s?(e.onmouseup=e=>dt(t,s,e),"mup "):""},Ct=(t,e)=>{const s=Mt(t,e,K.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>dt(t,s,e),"mdn "):""},At=(t,e)=>{const s=Mt(t,e,K.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>dt(t,s,e),"mmv "):""},Ot=(t,e)=>{const s=Mt(t,e,K.ON_KEY_DOWN);return s?(e.onkeydown=e=>dt(t,s,e),"kdn "):""},It=(t,e)=>{const s=Mt(t,e,K.ON_KEY_UP);return s?(e.onkeyup=e=>dt(t,s,e),"kup "):""},yt=(t,e)=>{const s=Mt(t,e,K.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>dt(t,s,e),"dbc "):""},Dt=(t,e)=>{const s=Mt(t,e,K.ON_SCROLL);return s?(e.onscroll=e=>dt(t,s,e),"scl "):""},Lt=(t,e)=>{const s=Mt(t,e,K.ON_WHEEL);return s?(e.onwheel=e=>dt(t,s,e),"whl "):""},vt=(t,e)=>{const s=Mt(t,e,K.ON_CHANGE);return s?(e.onchange=e=>dt(t,s,e),"chg "):""},Mt=(t,e,s)=>{const n=tt(e,s);return n?(Rt(t,n,e),st(e,s),n):""},$t=(t,e)=>{const s=tt(t,e);return s?(st(t,e),s):""},Tt=(t,e)=>{const s=tt(e,K.ON_HANDLE);return s?(Rt(t,s,e),st(e,K.ON_HANDLE),"elt "):""},Rt=(t,e,s)=>{const n=t.ahe_cmt[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_nmr]||(n.htmlElements[t.ahe_nmr]=[]),t.ahe_clr.collect(t.beforeDestroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_nmr].push(s))},Ft=t=>{t.ahe_nFns.length=0,t.ahe_srcCmsFns.length=0,t.ahe_srcCms.length=0,t.ahe_nVls.length=0,t.ahe_bndFns.length=0,t.ahe_bndVls.length=0,t.ahe_IfLst.length=0,t.ahe_ClsIfLst.length=0,t.ahe_ForOfLst.length=0,t.innerHTML=""};let kt=0;function Ut(t){class e extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==W.TEXT_VALUE&&this.tagName!==W.QSI_BIND&&(this.ahe_opts=t,this.ahe_cmt=new t.element(this),this.tagName!==W.APP_ROUTE&&(this.ahe_nmr=kt,kt++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new f,this.ahe_onAdt$=new b(!1),this.ahe_bfrIni$=new b(!1),this.ahe_bfrDst$=new b(!1),this.ahe_atrChd$=new b(void 0),this.ahe_bfrDctChg$=new b(!1),this.ahe_onChgDtd$=new b(!1),this.ahe_onMsg$=new b(void 0),this.ahe_onPChlRdy$=new b(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==W.TEXT_VALUE&&this.tagName!==W.QSI_BIND&&(this.tagName!==W.APP_ROUTE?tt(this,K.ON_IF)&&!this.ahe_cmt[P]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(t=>{const e=t.querySelectorAll(`*:not([${Z(K.INFO)}])`);for(let s=0;s<e.length;s++)nt(t,ht(t,e[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((t=>this.ahe_cmt.onMessage(t)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==W.TEXT_VALUE)this.tagName!==W.QSI_BIND&&this.tagName!==W.APP_ROUTE&&(!tt(this,K.ON_IF)||this.ahe_cmt[P]?(this.ahe_bfrDst$.next(!0),Ft(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[P]=!0);else{if(B.length>=1e4)return;""==this.innerHTML&&(st(this,K.INFO),B.push(this))}}attributeChangedCallback(t,e,s){this.ahe_atrChd$?.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_nmr]?t.htmlElements[this.ahe_nmr]:[]}detectChanges(t){this.ahe_bfrDctChg$.next(!0),!t&&this.ahe_ForOfLst.length&&(t=>{const e=t.ahe_ForOfLst,s=t.ahe_cmt;for(let n=0;n<e.length;n++){const i=e[n],r=lt(t,i.children,s[i.valueName],i.parent,i.template);nt(t,r)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_IfLst.length;s++){const n=t.ahe_IfLst[s];let i=n.isFunction?!!e[n.valueName]():!!e[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const r=n.ifParent.contains(n.ifElement);i?r||j(n.ifParent,n.ifElement):r&&z(n.ifElement)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=t.ahe_ClsIfLst[s];for(let t=0;t<n.length;t++){const s=n[t];let r;if(s.isConditionDisabled)r=V.TRUE;else{let t=s.isFunction?!!e[s.conditionName]():!!e[s.conditionName];s.isInversion&&(t=!t),r=t?V.TRUE:V.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:a,secondClassName:h}=s;h?r===V.TRUE?(G(i,[a]),Q(i,[h])):(G(i,[h]),Q(i,[a])):s.isConditionDisabled||r===V.TRUE?G(i,[a]):Q(i,[a])}}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndVls.length;s++){const n=t.ahe_bndVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCms.length;s++){const n=t.ahe_srcCms[s],i=e[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCmsFns.length;s++){const n=t.ahe_srcCmsFns[s],i=e[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndFns.length;s++){const n=t.ahe_bndFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nVls.length;s++){const n=t.ahe_nVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nFns.length;s++){const n=t.ahe_nFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(t){this.ahe_onMsg$.next(t)}sendMessageToParent(t){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(t),!0)}getChannel(t){if(t&&t.ahe_isCustomAppElement)return t}transferToChannel(t,e){this.onMessage$().pipe().refine((()=>t())).subscribe((s=>{t().sendMessage(e(s))}))}sendToChannel(t,e){t?.sendMessage(e)}isAppElement(t){return!!t?.ahe_isCustomAppElement}collect(...t){this.ahe_clr.collect(...t)}destroy(){Ft(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return e}const St="{display: contents !important;}",wt=[`html-block ${St}`],Ht=new b(!1),Pt=(t,e)=>{for(let e=0;e<t.length;e++)wt.push(`${t[e].tagName} ${St}`),t[e].element.qsi_app_tag_name=t[e].tagName;J((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].target);e&&Ht.next(!0)}))},xt=(t,e,s)=>({tagName:e,target:Ut({template:s,element:t}),element:t}),Bt=t.name;let Vt="";for(let t=0;t<Bt.length;t++){const e=Bt[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}Vt+=s||"-"}const Kt="app-"+Vt,Wt=[xt(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){console.log(this.root.tagName,"message:",t)}onCreate(){}onInit(){this.setColor(),S.subscribe((()=>{this.setColor(),this.root.detectChanges()}))}onDestroy(){}setColor(){switch(S.getValue()){case U.BLUE:this.isBlue=!0,this.isGreen=!1,this.isRed=!1;break;case U.GREEN:this.isBlue=!1,this.isGreen=!0,this.isRed=!1;break;case U.RED:this.isBlue=!1,this.isGreen=!1,this.isRed=!0;break;default:this.isBlue=!0}}},Kt,"<div class='app'><app-header></app-header><div qsi-cls='main main_red:isRed main_green:isGreen main_blue:isBlue '><qsi-route></qsi-route></div><app-footer></app-footer></div>"),xt(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}},"app-footer","<div class='footer'>Hello footer.html</div>"),xt(class{constructor(t){this.root=t,this.isBack=!0,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}click1(){v.next(F.MAIN_1),S.next(U.BLUE),this.isBack=!0,this.root.detectChanges()}click2(){v.next(F.MAIN_2),S.next(U.GREEN),this.isBack=!1,this.root.detectChanges()}click3(){v.next(F.MAIN_3),S.next(U.RED),this.isBack=!1,this.root.detectChanges()}},"app-header","<div class='header'><button class='button' qsi-click='click1'>Main1</button><button class='button' qsi-click='click2'>Main2</button><button class='button' qsi-click='click3'>Main3</button><div qsi-cls='light isBack?light_black:light_white'></div></div>"),xt(A,"app-main1","<div>BLUE</div>"),xt(C,"app-main2","<div>GREEN</div>"),xt(N,"app-main3","<div>RED</div>")];Pt([xt(class{},W.TEXT_VALUE.toLowerCase(),""),xt(class{},W.QSI_BIND.toLowerCase(),""),xt(class{constructor(t){this.root=t,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){R.unsubscribeAll()}process(){R.collect(v.pipe().refine((t=>!!t)).subscribe((t=>this.setCommand(t))),y.subscribe((t=>this.setHistory(t)))),M.getValue()?this.init():M.pipe().refine((t=>!!t)).setOnce().subscribe((()=>this.init()))}init(){let t=M.getValue();$=t.defaultCmd;const e=t.routes;for(let t=0;t<e.length;t++)this.cmd[e[t].command]=e[t],this.path[e[t].path]=e[t];this.setCommand($)}setCommand(t){switch(this.setRoute(this.cmd[t]),L){case D.HIDDEN:break;case D.SHOW:y.set(this.cmd[t].path);break;case D.SHOW_WITHOUT_HISTORY:y.setWithoutHistory(this.cmd[t].path)}}setHistory(t){t in this.path&&this.setRoute(this.path[t])}setRoute(t){const e=t.component.qsi_app_tag_name;this.root.innerHTML=`<${e}></${e}>`}},W.APP_ROUTE.toLowerCase(),"")]);const Xt=new class{constructor(){this.isComponentMode=!1}register(t){Pt(t,!0)}run(t){this.isComponentMode=!!t,J((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=X(Kt))}start(){const t=Y(wt.join("")),e=Y(".app {width: 100%;height: 99vh;display: flex;flex-flow: column nowrap;justify-content: space-between;align-items: center;}.app .main {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;justify-content: space-between;align-items: center;}.app .main_red {background-color: #e46969;}.app .main_blue {background-color: #69b2e4;}.app .main_green {background-color: #69e49a;}.app .header {width: 100%;height: 40px;display: flex;justify-content: center;align-items: center;background: #062c46;}.app .button {width: 100px;height: 30px;}.app .light {width: 30px;height: 30px;border-radius: 50%;margin-left: 5px;}.app .light_white {background: #fff;}.app .light_black {background: #000;}.app .footer {width: 100%;height: 40px;display: flex;justify-content: center;align-items: center;background: #062c46;color: white;}");j(I.head,t),j(I.head,e),!this.isComponentMode&&j(I.body,this.appElement)}};a.init(),g.setLocation(h.EN),Xt.register(Wt),Xt.run()})();