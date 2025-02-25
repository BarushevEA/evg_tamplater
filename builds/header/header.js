(()=>{"use strict";let e,t,s,n,i;function r(...t){e?console.log(e.description,...t):console.log("APP",...t)}const a=new class{constructor(r,a,h,o){t=r,s=a,n=h,i=o,e=this}set major(e){s=e}set minor(e){n=e}set patch(e){i=e}set name(e){t=e}get version(){return`${s}.${n}.${i}`}get name(){return t}get description(){return`[${t} version: ${this.version}]`.toUpperCase()}init(e){e||r("STARTED")}}("header",1,0,0);var h;function o(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)}function l(e){return"next"in e?t=>e.next(t):e}!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(h||(h={}));class c{constructor(e){this.pipe=e,this.counter=e.chain.length?e.chain.length:0}case(e){this.counter++;const t=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreak=!0),t!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}setOnce(){return this.push((e=>{this.listener(e.payload),e.isUnsubscribe=!0}))}unsubscribeBy(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isUnsubscribe=!0)}))}processChain(e){const t=this.chain,s=this.flow;for(let e=0;e<t.length;e++){if(s.isUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return e(s.payload)}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.refine(e[t]);return this}switch(){return new _(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}push(e){return this.chain.push(e),this}}class _ extends c{subscribe(e,t){return this.pipe.subscribe(e,t)}}class d extends u{get order(){return this._order}constructor(e,t){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this.observer=e,this.piped=!!t}subscribe(e,t){return this.listener=function(e){if(Array.isArray(e)){const t=[];for(let s=0;s<e.length;s++)t.push(l(e[s]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return l(e)}(e),t&&(this.errorHandler=t),this}send(e){try{this.flow.payload=e,this.flow.isBreak=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observer&&!this.paused?this.piped?this.processChain(t):t(e):void 0:this.unsubscribe()}}class m{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(e){return this.chain.push(e),this}filter(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}switch(){return new p(this)}processChain(e){const t=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=e,s.isBreak=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(e){return this.errHandler?this.errHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errHandler=e}}class p extends c{}class g{constructor(e){this.value=e,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new m}addFilter(e){return e&&this.filters.addErrorHandler(e),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(e){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(e).isOK)){this.process=!0,this.value=e;for(let t=0;t<this.subs.length;t++)this.subs[t].send(e);this.process=!1,this.trash.length&&this.clearTrash()}}stream(e){if(!this.killed&&this.enabled)for(let t=0;t<e.length;t++)this.next(e[t])}get isDestroyed(){return this.killed}unSubscribe(e){this.killed||(this.process&&e?this.trash.push(e):this.subs&&o(this.subs,e))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const e=setInterval((()=>{this.process||(clearInterval(e),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(e,t){if(this.killed)return;if(!this.isListener(e))return;const s=new d(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.subs.push(e)}isListener(e){return!this.killed&&!!e}pipe(){if(this.killed)return;const e=new d(this,!0);return this.subs.push(e),e}clearTrash(){const e=this.trash.length;for(let t=0;t<e;t++)this.unSubscribe(this.trash[t]);this.trash.length=0}}class b{constructor(){this.arr=[],this.killed=!1}collect(...e){this.killed||this.arr.push(...e)}unsubscribe(e){this.killed||(e?.unsubscribe(),o(this.arr,e))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const f=new g(h.EN),E=new class{get currentLocation(){return f.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return f.subscribe(e)}setLocation(e){f.next(e)}destroy(){f.destroy()}},N=window,C=document;let O=new Uint8Array(16);N.top;const A=`${N.crypto.getRandomValues(O),Array.from(O,(function(e){return`0${e.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,y="_______$$bool",v=[0];let I=[];var L,D,T;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(L||(L={})),function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(D||(D={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND",e.APP_ROUTE="QSI-ROUTE",e.APP_SUB_ROUTE="QSI-SUBROUTE"}(T||(T={}));const $=e=>C.createElement(e),R=e=>{const t=$("style");return t.innerHTML=e,t},S=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])},U=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])},M=(e,t)=>{t&&e?.appendChild(t)},F=e=>{e?.remove()},P=new g(null),w=e=>{P.pipe().refine((e=>!!e)).setOnce().subscribe(e),P.pipe().unsubscribeBy((e=>!!e)).setOnce().subscribe((()=>{const e=()=>{P.next(C.body),C.removeEventListener("DOMContentLoaded",e)};C.addEventListener("DOMContentLoaded",e)})),P.next(C.body)},H=e=>`qsi-${e}`,k=(e,t)=>e?e.getAttribute(H(t)):"",x=(e,t,s)=>{e&&e.setAttribute(H(t),s)},V=(e,t)=>{e&&e.removeAttribute(H(t))},B=(e,t)=>{if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=W(e,i),x(i,D.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];q(e,n)?x(n,D.INFO,s+"var]"):G(e,n)?x(n,D.INFO,s+"bind]"):(s+=ee(e,n),s+=te(e,n),s+=Z(e,n),s+=se(e,n),s+=ne(e,n),s+=ie(e,n),s+=re(e,n),s+=ae(e,n),s+=he(e,n),s+=oe(e,n),s+=le(e,n),s+=ce(e,n),s+=ue(e,n),s+=_e(e,n),s+=de(e,n),s+=ge(e,n),s+=W(e,n),s+=K(e,n),x(n,D.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e)))},K=(e,t)=>{let s=k(t,D.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=z(e,t[0]),r=t[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:L.UNDEFINED,firstClassName:r[0],secondClassName:r[1]})}else if(s.includes(":")){const t=s.split(":"),n=z(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:L.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:L.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(r),V(t,D.CLASS_IF),"cls "},W=(e,t)=>{let s=k(t,D.ON_IF);if(!s)return"";const n=X(),i=t.parentElement,r=z(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,t),F(t),V(t,D.ON_IF),x(n,D.INFO,"[ifp]"),"ifc "};(()=>{for(let e=0;e<1e4;e++)I.push($(T.TEXT_VALUE))})();const X=()=>I.length?I.pop():$(T.TEXT_VALUE),Q=(e,t)=>{if(t.tagName===T.TEXT_VALUE)return(v[0]=t)&&v;if(t.tagName===T.QSI_BIND)return(v[0]=t)&&v;if(!e.isAppElement(t))return(v[0]=t)&&v;const s=k(t,D.FOR);if(!s)return(v[0]=t)&&v;const n=e.ahe_cmt[s];if(!n)return(v[0]=t)&&v;const i=X(),r=t.parentElement,a=j(e,[],n,i,t);return x(i,D.INFO,"[for-of]"),r.insertBefore(i,t),F(t),V(t,D.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:a,valueName:s}),a},Y=(e,t,s)=>{s.isAppElement(t)&&t.sendMessage(e)},j=(e,t,s,n,i)=>{const r=[],a=t.length,h=s.length;let l=h-a;if(!(h+a))return r;if(l>0){for(let a=0;a<l;a++){const o=$(i.tagName);t.push(o),r.push(o);const c=k(i,D.ON_IF);c&&x(o,D.ON_IF,c),M(n,o),Y(s[h-l+a],o,e)}for(let n=0;n<h-l;n++)Y(s[n],t[n],e)}else{l*=-1;for(let s=0;s<l;s++){const s=t.pop(),n=e.ahe_IfLst;let i;for(let e=0;e<n.length;e++){const t=n[e];if(t.ifElement===s){i=t;break}}i?(o(n,i),F(i.ifParent)):F(s)}for(let n=0;n<h;n++)Y(s[n],t[n],e)}return r},z=(e,t)=>{const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}},q=(e,t)=>{if(t.tagName!==T.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=z(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:A}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:A}),!0)},G=(e,t)=>{if(t.tagName!==T.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=z(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:A}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:A}),!0)},J=(e,t,s)=>{e.ahe_cmt[t](s)},Z=(e,t)=>{const s=pe(t,D.SOURCE);if(!s)return"";const n=z(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")},ee=(e,t)=>{const s=pe(t,D.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""},te=(e,t)=>{const s=pe(t,D.CHANNEL);return s&&t.ahe_isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""},se=(e,t)=>{const s=me(e,t,D.ON_CLICK);return s?(t.onclick=t=>J(e,s,t),"clk "):""},ne=(e,t)=>{const s=me(e,t,D.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>J(e,s,t),"mlv "):""},ie=(e,t)=>{const s=me(e,t,D.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>J(e,s,t),"mer "):""},re=(e,t)=>{const s=me(e,t,D.ON_MOUSE_UP);return s?(t.onmouseup=t=>J(e,s,t),"mup "):""},ae=(e,t)=>{const s=me(e,t,D.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>J(e,s,t),"mdn "):""},he=(e,t)=>{const s=me(e,t,D.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>J(e,s,t),"mmv "):""},oe=(e,t)=>{const s=me(e,t,D.ON_KEY_DOWN);return s?(t.onkeydown=t=>J(e,s,t),"kdn "):""},le=(e,t)=>{const s=me(e,t,D.ON_KEY_UP);return s?(t.onkeyup=t=>J(e,s,t),"kup "):""},ce=(e,t)=>{const s=me(e,t,D.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>J(e,s,t),"dbc "):""},ue=(e,t)=>{const s=me(e,t,D.ON_SCROLL);return s?(t.onscroll=t=>J(e,s,t),"scl "):""},_e=(e,t)=>{const s=me(e,t,D.ON_WHEEL);return s?(t.onwheel=t=>J(e,s,t),"whl "):""},de=(e,t)=>{const s=me(e,t,D.ON_CHANGE);return s?(t.onchange=t=>J(e,s,t),"chg "):""},me=(e,t,s)=>{const n=k(t,s);return n?(be(e,n,t),V(t,s),n):""},pe=(e,t)=>{const s=k(e,t);return s?(V(e,t),s):""},ge=(e,t)=>{const s=k(t,D.ON_HANDLE);return s?(be(e,s,t),V(t,D.ON_HANDLE),"elt "):""},be=(e,t,s)=>{const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))},fe=e=>{e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""};let Ee=0;function Ne(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==T.TEXT_VALUE&&this.tagName!==T.QSI_BIND&&(this.ahe_opts=e,this.ahe_cmt=new e.element(this),this.tagName!==T.APP_ROUTE&&this.tagName!==T.APP_SUB_ROUTE&&(this.ahe_nmr=Ee,Ee++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new b,this.ahe_onAdt$=new g(!1),this.ahe_bfrIni$=new g(!1),this.ahe_bfrDst$=new g(!1),this.ahe_atrChd$=new g(void 0),this.ahe_bfrDctChg$=new g(!1),this.ahe_onChgDtd$=new g(!1),this.ahe_onMsg$=new g(void 0),this.ahe_onPChlRdy$=new g(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==T.TEXT_VALUE&&this.tagName!==T.QSI_BIND&&(this.tagName!==T.APP_ROUTE&&this.tagName!==T.APP_SUB_ROUTE?k(this,D.ON_IF)&&!this.ahe_cmt[y]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.isShadow&&this.ahe_opts.template?this.attachShadow({mode:"open"}).innerHTML=this.ahe_opts.template:this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(e=>{const t=e.querySelectorAll(`*:not([${H(D.INFO)}])`);for(let s=0;s<t.length;s++)B(e,Q(e,t[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges()):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==T.TEXT_VALUE)this.tagName!==T.QSI_BIND&&this.tagName!==T.APP_ROUTE&&this.tagName!==T.APP_SUB_ROUTE&&(!k(this,D.ON_IF)||this.ahe_cmt[y]?(this.ahe_bfrDst$.next(!0),fe(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[y]=!0);else{if(I.length>=1e4)return;""==this.innerHTML&&(V(this,D.INFO),I.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&(e=>{const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n],r=j(e,i.children,s[i.valueName],i.parent,i.template);B(e,r)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const r=n.ifParent.contains(n.ifElement);i?r||M(n.ifParent,n.ifElement):r&&F(n.ifElement)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let r;if(s.isConditionDisabled)r=L.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),r=e?L.TRUE:L.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:a,secondClassName:h}=s;h?r===L.TRUE?(U(i,[a]),S(i,[h])):(U(i,[h]),S(i,[a])):s.isConditionDisabled||r===L.TRUE?U(i,[a]):S(i,[a])}}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e&&e.ahe_isCustomAppElement)return e}transferToChannel(e,t){this.onMessage$().pipe().refine((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!e?.ahe_isCustomAppElement}collect(...e){this.ahe_clr.collect(...e)}destroy(){fe(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const Ce="{display: contents !important;}",Oe=[`html-block ${Ce}`],Ae=new g(!1),ye=(e,t)=>{for(let t=0;t<e.length;t++)e[t].element.qsi_app_tag_name=e[t].tagName,e[t].isCustomElement||Oe.push(`${e[t].tagName}${Ce}`);w((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].target);t&&Ae.next(!0)}))},ve=(e,t,s,n,i)=>({isCustomElement:n,tagName:t,target:Ne({template:s,element:e,isShadow:i}),element:e}),Ie=e.name;let Le="";for(let e=0;e<Ie.length;e++){const t=Ie[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}Le+=s||"-"}const De="app-"+Le,Te=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new g(""),N.addEventListener("popstate",this.popstate),this.popState()}set(e){this.isDestroyed||(N.history.pushState({},"",e),this.popState())}setWithoutHistory(e){this.isDestroyed||(N.history.replaceState({},"",e),this.popState())}subscribe(e){if(!this.isDestroyed)return this.state$.subscribe(e)}destroy(){N.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const e=N.location.pathname;this.state$.next(e)}};var $e;!function(e){e.SHOW="SHOW",e.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",e.HIDDEN="HIDDEN"}($e||($e={}));let Re=$e.SHOW;const Se=new g(""),Ue=new g(null);let Me;const Fe=new b;var Pe,we;Pe||(Pe={}),function(e){Ue.next({defaultCmd:e,routes:void 0}),Se.next(e)}(),we=$e.SHOW,Re=we;const He=new g(null),ke={};He.pipe().refine((e=>e)).subscribe((e=>{const t=ke[e.name];t&&t.subRoute?t.subRoute.setPage(e.page):console.log("ERROR:",`Subroute "${e.name}" is not registered or does not have an active instance.`)})),function(...e){for(let t=0;t<e.length;t++){const s=e[t],n={};for(let e=0;e<s.pages.length;e++){const t=s.pages[e];n[t.name]=t.page}ke[s.name]={name:s.name,defaultPage:s.defaultPage,pages:n,subRoute:null}}}();const xe=[ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){console.log(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},De,"<div class='LU1_W-HUr'><app-container></app-container></div>"),ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-container","<header id='header'><app-logo></app-logo><app-navigation></app-navigation><app-language></app-language><app-themes></app-themes></header>"),ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-logo","<div class='K6F_e6P_e'><div qsi-inject_to='logoImage' class='c_we9_o-w'></div><p qsi-inject_to='logoText' class='N_z_mUx-q'></p></div>"),ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-navigation","<div>Hello navigation.html</div>"),ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-themes","<div>Hello themes.html</div>"),ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-language","<div>Hello language.html</div>")];ye([ve(class{},T.TEXT_VALUE.toLowerCase(),""),ve(class{},T.QSI_BIND.toLowerCase(),""),ve(class{constructor(e){this.root=e,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){Fe.unsubscribeAll()}process(){Fe.collect(Se.pipe().refine((e=>!!e)).subscribe((e=>this.setCommand(e))),Te.subscribe((e=>this.setHistory(e)))),Ue.getValue()?this.init():Ue.pipe().refine((e=>!!e)).setOnce().subscribe((()=>this.init()))}init(){let e=Ue.getValue();Me=e.defaultCmd;const t=e.routes;for(let e=0;e<t.length;e++)this.cmd[t[e].command]=t[e],this.path[t[e].path]=t[e];this.setCommand(Me)}setCommand(e){switch(this.setRoute(this.cmd[e]),Re){case $e.HIDDEN:break;case $e.SHOW:Te.set(this.cmd[e].path);break;case $e.SHOW_WITHOUT_HISTORY:Te.setWithoutHistory(this.cmd[e].path)}}setHistory(e){e in this.path&&this.setRoute(this.path[e])}setRoute(e){const t=e.component.qsi_app_tag_name;this.root.innerHTML=`<${t}></${t}>`}},T.APP_ROUTE.toLowerCase(),""),ve(class{constructor(e){if(this.root=e,this.isDestroyed=!0,this.name=e.getAttribute("name")||"",this.registered=ke[this.name],!this.registered)throw new Error(`Subroute with the name "${this.name}" not found`);this.registered.subRoute=this}onInit(){this.isDestroyed=!1,this.setPage(this.registered.defaultPage)}onDestroy(){this.isDestroyed=!0}setPage(e){if(this.isDestroyed)return;const t=this.registered.pages[e];if(!t)return void console.error(`Page with name "${e}" not found in subroute "${this.name}"`);const s=t.qsi_app_tag_name;this.root.innerHTML=`<${s}></${s}>`}},T.APP_SUB_ROUTE.toLowerCase(),"")]);const Ve=new class{constructor(){this.isComponentMode=!1}register(e){ye(e,!0)}run(e){this.isComponentMode=!!e,w((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=$(De))}start(){const e=R(Oe.join("")),t=R("* {background-color: rgba(125, 200, 255, 0.3);border: 1px solid rgba(200, 125, 255, 0.5);}* * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}* body {overflow: hidden;}.LU1_W-HUr {width: 100vw;height: 100px;}.LU1_W-HUr #header {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;justify-content: space-between;align-items: center;}");M(C.head,e),M(C.head,t),!this.isComponentMode&&M(C.body,this.appElement)}};a.init(),E.setLocation(h.EN),Ve.register(xe),Ve.run()})();