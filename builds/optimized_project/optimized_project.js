(()=>{"use strict";var e={969:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SwitchCase=void 0,t.SwitchCase=class{pipe;counter;constructor(e){this.pipe=e,this.counter=e.chain.length?e.chain.length:0}case(e){this.counter++;const t=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreak=!0),t!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}},512:(e,t,s)=>{t.g=void 0;const n=s(951);t.g=class{list=[];isKilled=!1;collect(...e){this.isKilled||this.list.push(...e)}unsubscribe(e){this.isKilled||(e?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,e))}unsubscribeAll(){if(!this.isKilled)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this.isKilled?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this.isKilled=!0}get isDestroyed(){return this.isKilled}}},817:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterSwitchCase=t.FilterCollection=void 0;const n=s(969);t.FilterCollection=class{chain=[];flow={isBreak:!1,isAvailable:!1,payload:null};response={isOK:!1,payload:void 0};errHandler;get isEmpty(){return!this.chain.length}push(e){return this.chain.push(e),this}filter(e){return this.push((t=>{e(t.payload)&&(t.isAvailable=!0)}))}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}switch(){return new i(this)}processChain(e){const t=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=e,s.isBreak=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(e){return this.errHandler?this.errHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errHandler=e}};class i extends n.SwitchCase{}t.FilterSwitchCase=i},951:(e,t)=>{function s(e){return"next"in e?t=>e.next(t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.getListener=t.quickDeleteFromArray=t.deleteFromArray=t.sortDescending=t.sortAscending=void 0,t.sortAscending=(e,t)=>e.order>t.order?1:e.order<t.order?-1:0,t.sortDescending=(e,t)=>e.order>t.order?-1:e.order<t.order?1:0,t.deleteFromArray=function(e,t){const s=e.indexOf(t);return-1!==s&&(e.splice(s,1),!0)},t.quickDeleteFromArray=function(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)},t.getListener=function(e){if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++)t.push(s(e[n]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return s(e)}},390:(e,t,s)=>{t.c=void 0;const n=s(951),i=s(528),r=s(817);t.c=class{value;listeners=[];isStop=!0;isKilled=!1;isProcess=!1;trash=[];filters=new r.FilterCollection;constructor(e){this.value=e}addFilter(e){return e&&this.filters.addErrorHandler(e),this.filters}disable(){this.isStop=!1}enable(){this.isStop=!0}get isEnable(){return this.isStop}next(e){if(!this.isKilled&&this.isStop&&(this.filters.isEmpty||this.filters.processChain(e).isOK)){this.isProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isProcess=!1,this.trash.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this.isKilled&&this.isStop)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.trash.length;for(let t=0;t<e;t++)this.unSubscribe(this.trash[t]);this.trash.length=0}unSubscribe(e){this.isKilled||(this.isProcess&&e?this.trash.push(e):this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,e))}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this.isKilled=!0}unsubscribeAll(){this.isKilled||(this.listeners.length=0)}getValue(){if(!this.isKilled)return this.value}size(){return this.isKilled?0:this.listeners.length}subscribe(e,t){if(!this.isListener(e))return;const s=new i.SubscribeObject(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.listeners.push(e)}isListener(e){return!this.isKilled&&!!e}pipe(){if(this.isKilled)return;const e=new i.SubscribeObject(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this.isKilled}}},375:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PipeSwitchCase=t.Pipe=void 0;const n=s(969);t.Pipe=class{chain=[];flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null};push(e){return this.chain.push(e),this}setOnce(){return this.push((e=>{this.listener(e.payload),e.isUnsubscribe=!0}))}unsubscribeBy(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isUnsubscribe=!0)}))}refine(e){return this.push((t=>{e(t.payload)&&(t.isAvailable=!0)}))}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.refine(e[t]);return this}switch(){return new i(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}processChain(e){const t=this.chain,s=this.flow;for(let e=0;e<t.length;e++){if(s.isUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return e(s.payload)}};class i extends n.SwitchCase{subscribe(e,t){return this.pipe.subscribe(e,t)}}t.PipeSwitchCase=i},528:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SubscribeObject=void 0;const n=s(375),i=s(951);class r extends n.Pipe{observable;listener;errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)};_order=0;isPaused=!1;isPipe=!1;constructor(e,t){super(),this.observable=e,this.isPipe=!!t}subscribe(e,t){return this.listener=(0,i.getListener)(e),t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chain.length=0)}send(e){try{this.flow.payload=e,this.flow.isBreak=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}get order(){return this._order}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observable&&!this.isPaused?this.isPipe?this.processChain(t):t(e):void 0:this.unsubscribe()}}t.SubscribeObject=r}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}var n=s(390),i=s(951);const r=window,o=document;let h=new Uint8Array(16);r.top;const a=`${r.crypto.getRandomValues(h),Array.from(h,(function(e){return`0${e.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,l=":",c="_______$$bool",u=[0];let d=[];const _=1e4;var m,f,p;function b(e){return`qsi-${e}`}function g(e,t){return e?e.getAttribute(b(t)):""}function E(e,t,s){e&&e.setAttribute(b(t),s)}function C(e,t){e&&e.removeAttribute(b(t))}function N(e,t){if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=v(e,i),E(i,f.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];!function(e,t){if(t.tagName!==p.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=D(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:a}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:a}),!0)}(e,n)?function(e,t){if(t.tagName!==p.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=D(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:a}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:a}),!0)}(e,n)?E(n,f.INFO,s+"bind]"):(s+=function(e,t){const s=M(t,f.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""}(e,n),s+=function(e,t){const s=M(t,f.CHANNEL);return s&&t.ahe_isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""}(e,n),s+=function(e,t){const s=M(t,f.SOURCE);if(!s)return"";const n=D(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")}(e,n),s+=function(e,t){const s=F(e,t,f.ON_CLICK);return s?(t.onclick=t=>I(e,s,t),"clk "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>I(e,s,t),"mlv "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>I(e,s,t),"mer "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_MOUSE_UP);return s?(t.onmouseup=t=>I(e,s,t),"mup "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>I(e,s,t),"mdn "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>I(e,s,t),"mmv "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_KEY_DOWN);return s?(t.onkeydown=t=>I(e,s,t),"kdn "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_KEY_UP);return s?(t.onkeyup=t=>I(e,s,t),"kup "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>I(e,s,t),"dbc "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_SCROLL);return s?(t.onscroll=t=>I(e,s,t),"scl "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_WHEEL);return s?(t.onwheel=t=>I(e,s,t),"whl "):""}(e,n),s+=function(e,t){const s=F(e,t,f.ON_CHANGE);return s?(t.onchange=t=>I(e,s,t),"chg "):""}(e,n),s+=function(e,t){const s=g(t,f.ON_HANDLE);return s?(T(e,s,t),C(t,f.ON_HANDLE),"elt "):""}(e,n),s+=v(e,n),s+=function(e,t){let s=g(t,f.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=D(e,t[0]),r=t[1].split(l);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:m.UNDEFINED,firstClassName:r[0],secondClassName:r[1]})}else if(s.includes(l)){const t=s.split(l),n=D(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:m.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:m.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(r),C(t,f.CLASS_IF),"cls "}(e,n),E(n,f.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e))):E(n,f.INFO,s+"var]")}function v(e,t){let s=g(t,f.ON_IF);if(!s)return"";const n=y(),i=t.parentElement,r=D(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,t),W(t),C(t,f.ON_IF),E(n,f.INFO,"[ifp]"),"ifc "}function y(){return d.length?d.pop():K(p.TEXT_VALUE)}function A(e,t){if(t.tagName===p.TEXT_VALUE)return(u[0]=t)&&u;if(t.tagName===p.QSI_BIND)return(u[0]=t)&&u;if(!e.isAppElement(t))return(u[0]=t)&&u;const s=g(t,f.FOR);if(!s)return(u[0]=t)&&u;const n=e.ahe_cmt[s];if(!n)return(u[0]=t)&&u;const i=y(),r=t.parentElement,o=L(e,[],n,i,t);return E(i,f.INFO,"[for-of]"),r.insertBefore(i,t),W(t),C(t,f.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:o,valueName:s}),o}function O(e,t,s){s.isAppElement(t)&&t.sendMessage(e)}function L(e,t,s,n,r){const o=[],h=t.length,a=s.length;let l=a-h;if(!(a+h))return o;if(l>0){for(let i=0;i<l;i++){const h=K(r.tagName);t.push(h),o.push(h);const c=g(r,f.ON_IF);c&&E(h,f.ON_IF,c),X(n,h),O(s[a-l+i],h,e)}for(let n=0;n<a-l;n++)O(s[n],t[n],e)}else{l*=-1;for(let s=0;s<l;s++){const s=t.pop(),n=e.ahe_IfLst;let r;for(let e=0;e<n.length;e++){const t=n[e];if(t.ifElement===s){r=t;break}}r?((0,i.quickDeleteFromArray)(n,r),W(r.ifParent)):W(s)}for(let n=0;n<a;n++)O(s[n],t[n],e)}return o}function D(e,t){const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}}function I(e,t,s){e.ahe_cmt[t](s)}function F(e,t,s){const n=g(t,s);return n?(T(e,n,t),C(t,s),n):""}function M(e,t){const s=g(e,t);return s?(C(e,t),s):""}function T(e,t,s){const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))}function w(e){e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""}!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(m||(m={})),function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(f||(f={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND"}(p||(p={})),function(){for(let e=0;e<_;e++)d.push(K(p.TEXT_VALUE))}();var $=s(512);let S=0;function P(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.ahe_nmr=S,S++,this.tagName!==p.TEXT_VALUE&&this.tagName!==p.QSI_BIND&&(this.ahe_isCustomAppElement=!0,this.ahe_clr=new $.g,this.ahe_onAdt$=new n.c(!1),this.ahe_bfrIni$=new n.c(!1),this.ahe_bfrDst$=new n.c(!1),this.ahe_atrChd$=new n.c(void 0),this.ahe_bfrDctChg$=new n.c(!1),this.ahe_onChgDtd$=new n.c(!1),this.ahe_onMsg$=new n.c(void 0),this.ahe_onPChlRdy$=new n.c(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],this.ahe_opts=e,this.ahe_cmt=new e.element(this),"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate())}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==p.TEXT_VALUE&&this.tagName!==p.QSI_BIND&&(g(this,f.ON_IF)&&!this.ahe_cmt[c]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),function(e){const t=e.querySelectorAll(`*:not([${b(f.INFO)}])`);for(let s=0;s<t.length;s++)N(e,A(e,t[s]))}(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)))}disconnectedCallback(){if(this.tagName!==p.TEXT_VALUE)this.tagName!==p.QSI_BIND&&(!g(this,f.ON_IF)||this.ahe_cmt[c]?(this.ahe_bfrDst$.next(!0),w(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[c]=!0);else{if(d.length>=_)return;""==this.innerHTML&&(C(this,f.INFO),d.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&function(e){const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n];N(e,L(e,i.children,s[i.valueName],i.parent,i.template))}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const r=n.ifParent.contains(n.ifElement);i?r||X(n.ifParent,n.ifElement):r&&W(n.ifElement)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let r;if(s.isConditionDisabled)r=m.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),r=e?m.TRUE:m.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:o,secondClassName:h}=s;h?r===m.TRUE?(j(i,[o]),V(i,[h])):(j(i,[h]),V(i,[o])):s.isConditionDisabled||r===m.TRUE?j(i,[o]):V(i,[o])}}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e&&e.ahe_isCustomAppElement)return e}transferToChannel(e,t){this.onMessage$().pipe().refine((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!e?.ahe_isCustomAppElement}collect(...e){this.ahe_clr.collect(...e)}destroy(){w(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const k="{display: contents !important;}",x=[`html-block ${k}`];function R(e){for(let t=0;t<e.length;t++)x.push(`${e[t].tagName} ${k}`);z((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].targetElement)}))}function U(e,t,s){return{tagName:t,targetElement:P({template:s,element:e})}}let H;function K(e){return o.createElement(e)}function B(e){const t=K("style");return t.innerHTML=e,t}function V(e,t){if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])}function j(e,t){if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])}function X(e,t){t&&e?.appendChild(t)}function W(e){e?.remove()}const q=new n.c(null);function z(e){q.pipe().refine((e=>!!e)).setOnce().subscribe(e),q.pipe().unsubscribeBy((e=>!!e)).setOnce().subscribe((()=>{const e=()=>{q.next(o.body),o.removeEventListener("DOMContentLoaded",e)};o.addEventListener("DOMContentLoaded",e)})),q.next(o.body)}let Q,Y,G,J;const Z=new class{constructor(e,t,s,n){Q=e,Y=t,G=s,J=n,H=this}set major(e){Y=e}set minor(e){G=e}set patch(e){J=e}set name(e){Q=e}get version(){return`${Y}.${G}.${J}`}get name(){return Q}get description(){return`[${Q} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){H?console.log(H.description,...e):console.log("APP",...e)}("STARTED")}}("optimized_project",1,0,0);var ee;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(ee||(ee={}));const te=new n.c(ee.EN),se=new class{get currentLocation(){return te.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return te.subscribe(e)}setLocation(e){te.next(e)}destroy(){te.destroy()}},ne=new n.c(!1),ie=H.name;let re="";for(let e=0;e<ie.length;e++){const t=ie[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}re+=s||"-"}const oe="app-"+re,he=[U(class{constructor(e){this.isShowMain=!0,this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().subscribe((e=>{console.log("AppRoot dataCatch$:",e)})))}onInit(){this.root.collect(ne.subscribe((()=>{this.isShowMain=!this.isShowMain,this.root.detectChanges()})));const e=this.root.getChannel(this.main);e&&e.sendMessage("Message by AppRoot")}isShowFooter(){return this.isShowMain}},oe,"<div class='s-Q-Yuqyww'><app-header></app-header><app-main qsi-if='isShowMain' qsi-inject_to='main'></app-main><app-main_1 qsi-if='!isShowMain'></app-main_1><app-footer qsi-if='isShowFooter'></app-footer></div>"),U(class{constructor(e){this.text="SERG header start after:",this.name=this.text,this.buttonName="NEXT MAIN",this.isRed=!0,this.btnRed="q_Z6s6mJp",this.btnBlue="tKV_wvkTi",this.root=e}nextMain(e){e.stopPropagation(),e.preventDefault();const t=this.root.getElementsBoundToMethod(this.nextMain);for(const e of t)e.classList.toggle(this.btnBlue),e.classList.toggle(this.btnRed);this.isRed=!this.isRed,ne.next(!0),this.root.detectChanges()}onInit(){let e=0;const t=setInterval((()=>{this.name=this.text+" "+e+" ",this.root.detectChanges(),e++,e>5&&clearInterval(t)}),1e3)}},"app-header","<header class='c_q_aIfar' qsi-cls='isRed?q_Z6s6mJp:tKV_wvkTi !isRed?K-wq5xZWy:Of7_hRJwe'><txt-val>name</txt-val><br><button class='bi7_HYd-q tKV_wvkTi' style='width: 200px; height: 20px;' qsi-click='nextMain' qsi-cls='o-a6d5wXwq K-wq5xZWy:isRed'><txt-val>buttonName</txt-val></button></header>"),U(class{constructor(e){this.appInfo=Z.description,this.someText="Hello world !!!",this.ag="17",this.test="<app-test></app-test>",this.isTest=!0,this.isFor=!0,this.testArr=[1,2,3,4,5,6,7],this.receipts=[" \nHow to cook perfect Bagels\n  \n10 Tips for Making Schmear-Worthy Homemade Bagels\nMoisture: Wetter dough means crispier bagels. ...\nWater temp: The colder the better. ...\nDry active yeast: Let it chill. ...\nFlour: Embrace the gluten. ...\nMixing: Low and slow is the way to go. ...\nThe rise: Your kitchen climate is A-okay. ...\nFlavor kick: After the proof.\n        ","\nHow to cook perfect fish\n\nA juicy, perfectly cooked fillet of fish with crisp \nskin that crackles when cut is a thing of beauty – but \none that can be tough to achieve. Follow these simple \nsteps, whatever fish you’re cooking, avoid the \npotential pitfalls, and you’ll get it right, every time.\n        ","\nHow to cook perfect meat\n\nThis dish has everything we’re looking for when it comes \nto a weeknight dinner: it’s filling, requires only simple \ningredients, and comes together in under an hour. If you’re \nlooking for a bright summer dinner that still delivers on \nthe comfort food factor, then this creamy lemon Parmesan \nchicken should be next on your weeknight dinner rotation.\nTrust us—one bite, and you’ll realize why this is one of\nour most popular chicken recipes of all time. \n        "],this.receiptCounter=0,this.currentReceipt=this.receipts[this.receiptCounter],this.root=e,this.name=e.tagName}onCreate(){}onInit(){console.log("dataCatch$.value:",this.root.onMessage$().getValue());const e=this.root.parentChanelReady$().getValue();e&&e.sendMessage("Main sendData"),this.root.collect(this.root.onMessage$().subscribe((e=>{console.log("Main data catch:",e)}))),setTimeout((()=>{this.testArr.push(-1),this.testArr.push(-2),this.testArr.push(-3),this.root.detectChanges(),setTimeout((()=>{this.testArr.shift(),this.testArr.shift(),this.testArr.shift(),this.root.detectChanges()}),5e3)}),5e3)}onDestroy(){}nestReceipt(){this.receiptCounter++,this.receiptCounter>=this.receipts.length&&(this.receiptCounter=0),this.currentReceipt=this.receipts[this.receiptCounter],this.root.detectChanges()}},"app-main","<main class='h-G-P_wio'><txt-val>name</txt-val><br><txt-val>appInfo</txt-val><br><txt-val>someText</txt-val><br> Sergey is my son, he is <txt-val>ag</txt-val> years old. <br><br> Receipts: <br><button qsi-click='nestReceipt'>NEXT Receipt</button><br><br><pre><txt-val>currentReceipt</txt-val></pre><div><app-test></app-test><app-test></app-test></div><txt-val>test</txt-val><txt-val>test</txt-val><app-test qsi-cls='q_Z6s6mJp' qsi-if='isTest'></app-test><app-test qsi-for='testArr' qsi-if='isFor'></app-test></main>"),U(class{constructor(e){this.isShowHello=!1,this.showedTxt="---HELLO WORLD !!!---",this.counter=0,this.inputKey="",this.inputChange="",this.root=e,this.name=e.tagName}onInit(){this.counter=0,this.root.collect(this.root.beforeChanges$().subscribe((()=>{this.counter++})),this.root.changesDetected$().subscribe((()=>{this.handleElement(),this.handleElementExtra()})))}clickHandler(e){e.preventDefault(),e.stopPropagation(),this.isShowHello=!this.isShowHello,this.root.detectChanges()}keyDownInput(e){console.log("keyDownInput(evt: KeyboardEvent)",e.key),this.inputKey=e.key,this.root.detectChanges()}changeInput(e){console.log("changeInput(evt: KeyboardEvent)",e.target.value),this.inputChange=e.target.value,this.root.detectChanges()}handleElement(){const e=this.root.getElementsBoundToMethod(this.handleElement);for(const t of e)t.innerHTML=` handled ${this.counter}`}handleElementExtra(){const e=this.root.getElementsBoundToMethod(this.handleElementExtra);for(const t of e)t.innerHTML=` handled extra ${this.counter}`}test(){return`TEST ${this.counter}`}onDestroy(){this.inputChange="",this.counter=0}},"app-main_1","<main class='h-G-P_wio'><txt-val>name</txt-val><button qsi-click='clickHandler'> Show HELLO <txt-val>counter</txt-val></button><div qsi-if='isShowHello'><txt-val>showedTxt</txt-val></div><div qsi-handle='handleElement'>1</div><div qsi-handle='handleElement'>2</div><div qsi-handle='handleElementExtra'>3</div><div qsi-handle='handleElementExtra'><txt-val>name</txt-val></div><div><txt-val>name</txt-val><span qsi-handle='handleElementExtra'></span></div><label><input qsi-change='changeInput' qsi-keydown='keyDownInput'></label><div> input key: <txt-val>inputKey</txt-val></div><div> input change: <txt-val>inputChange</txt-val></div><div> test function: <txt-val>test</txt-val></div></main>"),U(class{constructor(e){this.root=e,this.name=e.tagName}onInit(){this.span.innerHTML="Test injection ",this.myDiv.innerHTML="Test injection div"}},"app-footer","<footer class='e-E_HtX_t'><span qsi-inject_to='span'></span><txt-val>name</txt-val><div qsi-inject_to='myDiv'></div></footer>"),U(class{constructor(e){this.test1="TEST1",this.test2="TEST2",this.isRed=!1,this.isBlue=!1,this.isGreen=!1,this.num=0,this.root=e}onCreate(){this.root.onMessage$().subscribe((e=>{this.num=e,this.isRed=e>0&&e<4,this.isBlue=e>3,this.isGreen=e<0,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-test","<div qsi-cls='K-wq5xZWy:isRed Of7_hRJwe:isBlue R-z_A3Q1w:isGreen'><txt-val>test1</txt-val>:<txt-val>test2</txt-val>-<txt-val>num</txt-val></div>")],ae=P({template:"",element:class{}}),le=P({template:"",element:class{}});R([{tagName:p.TEXT_VALUE.toLowerCase(),targetElement:ae},{tagName:p.QSI_BIND.toLowerCase(),targetElement:le}]);const ce=new class{constructor(){this.isComponentMode=!1}register(e){R(e)}run(e){this.isComponentMode=!!e,z((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=K(oe))}start(){const e=B(x.join("")),t=B("* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;background: rgba(0, 250, 250, 0.1);}.s-Q-Yuqyww {position: fixed;top: 0;left: 0;font-weight: bold;width: 100%;height: 100vh;display: flex;flex-flow: column nowrap;justify-content: flex-start;align-items: flex-start;z-index: 2147483647;}.s-Q-Yuqyww .OF4_aTzDu {position: absolute;top: 0;left: 0;width: 100%;height: 100%;backdrop-filter: blur(5px);z-index: -2147483647;}.s-Q-Yuqyww .c_q_aIfar {width: 100%;height: 40px;min-width: 100%;min-height: 40px;}.s-Q-Yuqyww .h-G-P_wio {width: 100%;height: 100%;flex-grow: 1;}.s-Q-Yuqyww .e-E_HtX_t {width: 100%;height: 60px;min-width: 100%;min-height: 60px;}.s-Q-Yuqyww .bi7_HYd-q {cursor: pointer;}.s-Q-Yuqyww .q_Z6s6mJp {background: #e469a0;}.s-Q-Yuqyww .tKV_wvkTi {background: #69b2e4;}.s-Q-Yuqyww .Of7_hRJwe {color: #0294f9;}.s-Q-Yuqyww .R-z_A3Q1w {color: #108b55;}.s-Q-Yuqyww .K-wq5xZWy {color: #802b51;}.s-Q-Yuqyww .o-a6d5wXwq {font-weight: bold;}");X(o.head,e),X(o.head,t),!this.isComponentMode&&X(o.body,this.appElement)}};Z.init(),se.setLocation(ee.EN),ce.register(he),ce.run()})();