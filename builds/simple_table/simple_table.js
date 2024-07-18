(()=>{"use strict";var e={512:(e,t,s)=>{t.g=void 0;const n=s(951);t.g=class{list=[];_isDestroyed=!1;collect(...e){this._isDestroyed||this.list.push(...e)}unsubscribe(e){this._isDestroyed||(e?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,e))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},817:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterSwitchCase=t.FilterCollection=void 0,t.FilterCollection=class{chainHandlers=[];pipeData={isBreakChain:!1,isAvailable:!1,payload:null};response={isOK:!1,payload:void 0};errorHandler;get isEmpty(){return!this.chainHandlers.length}push(e){return this.chainHandlers.push(e),this}filter(e){return this.push((t=>{e(t.payload)&&(t.isAvailable=!0)}))}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}switch(){return new s(this)}processChain(e){const t=this.chainHandlers,s=this.pipeData,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=e,s.isBreakChain=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return n;if(s.isBreakChain)break}}catch(e){return this.errorHandler?this.errorHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errorHandler=e}};class s{pipe;caseCounter;constructor(e){this.pipe=e,this.caseCounter=e.chainHandlers.length?e.chainHandlers.length:0}case(e){this.caseCounter++;const t=this.caseCounter,s=this.pipe.chainHandlers;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreakChain=!0),t!==s.length||n.isBreakChain||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}t.FilterSwitchCase=s},951:(e,t)=>{function s(e){return"next"in e?t=>e.next(t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.getListener=t.quickDeleteFromArray=t.deleteFromArray=t.sortDescending=t.sortAscending=void 0,t.sortAscending=(e,t)=>e.order>t.order?1:e.order<t.order?-1:0,t.sortDescending=(e,t)=>e.order>t.order?-1:e.order<t.order?1:0,t.deleteFromArray=function(e,t){const s=e.indexOf(t);return-1!==s&&(e.splice(s,1),!0)},t.quickDeleteFromArray=function(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)},t.getListener=function(e){if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++)t.push(s(e[n]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return s(e)}},390:(e,t,s)=>{t.c=void 0;const n=s(951),i=s(528),r=s(817);t.c=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];filterCase=new r.FilterCollection;constructor(e){this.value=e}addFilter(e){return e&&this.filterCase.addErrorHandler(e),this.filterCase}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable&&(this.filterCase.isEmpty||this.filterCase.processChain(e).isOK)){this.isNextProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++)this.unSubscribe(this.listenersForUnsubscribe[t]);this.listenersForUnsubscribe.length=0}unSubscribe(e){this._isDestroyed||(this.isNextProcess&&e?this.listenersForUnsubscribe.push(e):this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,e))}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(!this.isSubsValid(e))return;const s=new i.SubscribeObject(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.listeners.push(e)}isSubsValid(e){return!this._isDestroyed&&!!e}pipe(){if(this._isDestroyed)return;const e=new i.SubscribeObject(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}},375:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SwitchCase=t.Pipe=void 0,t.Pipe=class{chainHandlers=[];pipeData={isBreakChain:!1,isNeedUnsubscribe:!1,isAvailable:!1,payload:null};push(e){return this.chainHandlers.push(e),this}setOnce(){return this.push((e=>{this.listener(e.payload),e.isNeedUnsubscribe=!0}))}unsubscribeByNegative(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)||(t.isNeedUnsubscribe=!0)}))}unsubscribeByPositive(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isNeedUnsubscribe=!0)}))}unsubscribeBy(e){return this.unsubscribeByPositive(e)}emitByNegative(e){return this.push((t=>{e(t.payload)||(t.isAvailable=!0)}))}emitByPositive(e){return this.push((t=>{e(t.payload)&&(t.isAvailable=!0)}))}refine(e){return this.emitByPositive(e)}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.emitByPositive(e[t]);return this}emitMatch(e){return this.push((t=>{e(t.payload)==t.payload&&(t.isAvailable=!0)}))}switch(){return new s(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}processChain(e){const t=this.chainHandlers,s=this.pipeData;for(let e=0;e<t.length;e++){if(s.isNeedUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isNeedUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreakChain)break}return e(s.payload)}};class s{pipe;caseCounter;constructor(e){this.pipe=e,this.caseCounter=e.chainHandlers.length?e.chainHandlers.length:0}subscribe(e,t){return this.pipe.subscribe(e,t)}case(e){this.caseCounter++;const t=this.caseCounter,s=this.pipe.chainHandlers;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreakChain=!0),t!==s.length||n.isBreakChain||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}t.SwitchCase=s},528:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SubscribeObject=void 0;const n=s(375),i=s(951);class r extends n.Pipe{observable;listener;errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)};_order=0;isPaused=!1;isPipe=!1;constructor(e,t){super(),this.observable=e,this.isPipe=!!t}subscribe(e,t){return this.listener=(0,i.getListener)(e),t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chainHandlers.length=0)}send(e){try{this.pipeData.payload=e,this.pipeData.isBreakChain=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}get order(){return this._order}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observable&&!this.isPaused?this.isPipe?this.processChain(t):t(e):void 0:this.unsubscribe()}}t.SubscribeObject=r}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}var n=s(390),i=s(951);const r=window,a=document;var o;!function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(o||(o={}));const h=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,l=(function(){const e=navigator.userAgentData;if(e&&e.mobile)return!0;if(e&&h.test(e.platform))return!0;if(h.test(navigator.userAgent)||h.test(navigator.platform))return!0;const t=r.matchMedia;t&&t("(pointer:coarse)").matches}(),r.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),c=":",u=(Object.keys(o),"_______$$bool"),d=[0],_=[],b=100;var m,f;function p(e){return`qsi-${e}`}function g(e,t){return e?e.getAttribute(p(t)):""}function C(e,t,s){e&&e.setAttribute(p(t),s)}function E(e,t){e&&e.removeAttribute(p(t))}function N(e,t){if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=y(e,i),C(i,o.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];!function(e,t){if(t.tagName!==f.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=L(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:l}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:l}),!0)}(e,n)?function(e,t){if(t.tagName!==f.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=L(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:l}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:l}),!0)}(e,n)?C(n,o.INFO,s+"bind]"):(s+=function(e,t){const s=T(t,o.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""}(e,n),s+=function(e,t){const s=T(t,o.CHANNEL);return s&&t.isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""}(e,n),s+=function(e,t){const s=T(t,o.SOURCE);if(!s)return"";const n=L(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")}(e,n),s+=function(e,t){const s=I(e,t,o.ON_CLICK);return s?(t.onclick=t=>F(e,s,t),"clk "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>F(e,s,t),"mlv "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>F(e,s,t),"mer "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_MOUSE_UP);return s?(t.onmouseup=t=>F(e,s,t),"mup "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>F(e,s,t),"mdn "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>F(e,s,t),"mmv "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_KEY_DOWN);return s?(t.onkeydown=t=>F(e,s,t),"kdn "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_KEY_UP);return s?(t.onkeyup=t=>F(e,s,t),"kup "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>F(e,s,t),"dbc "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_SCROLL);return s?(t.onscroll=t=>F(e,s,t),"scl "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_WHEEL);return s?(t.onwheel=t=>F(e,s,t),"whl "):""}(e,n),s+=function(e,t){const s=I(e,t,o.ON_CHANGE);return s?(t.onchange=t=>F(e,s,t),"chg "):""}(e,n),s+=function(e,t){const s=g(t,o.ON_HANDLE);return s?(P(e,s,t),E(t,o.ON_HANDLE),"elt "):""}(e,n),s+=y(e,n),s+=function(e,t){let s=g(t,o.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=L(e,t[0]),r=t[1].split(c);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:m.UNDEFINED,firstClassName:r[0],secondClassName:r[1]})}else if(s.includes(c)){const t=s.split(c),n=L(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:m.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:m.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(r),E(t,o.CLASS_IF),"cls "}(e,n),C(n,o.INFO,s.trim()+"]"),n.isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e))):C(n,o.INFO,s+"var]")}function y(e,t){let s=g(t,o.ON_IF);if(!s)return"";const n=v(),i=t.parentElement,r=L(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,t),q(i,t),E(t,o.ON_IF),C(n,o.INFO,"[ifp]"),"ifc "}function v(){return _.length?_.pop():R(f.TEXT_VALUE)}function D(e,t){if(t.tagName===f.TEXT_VALUE)return(d[0]=t)&&d;if(t.tagName===f.QSI_BIND)return(d[0]=t)&&d;if(!e.isAppElement(t))return(d[0]=t)&&d;const s=g(t,o.FOR);if(!s)return(d[0]=t)&&d;const n=e.ahe_cmt[s];if(!n)return(d[0]=t)&&d;const i=v(),r=t.parentElement,a=O(e,[],n,i,t);return C(i,o.INFO,"[for-of]"),r.insertBefore(i,t),q(r,t),E(t,o.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:a,valueName:s}),a}function A(e,t,s){s.isAppElement(t)&&t.sendMessage(e)}function O(e,t,s,n,r){const a=[],h=t.length,l=s.length;let c=l-h;if(!(l+h))return a;if(c>0){for(let i=0;i<c;i++){const h=R(r.tagName);t.push(h),a.push(h);const u=g(r,o.ON_IF);u&&C(h,o.ON_IF,u),K(n,h),A(s[l-c+i],h,e)}for(let n=0;n<l-c;n++)A(s[n],t[n],e)}else{c*=-1;for(let s=0;s<c;s++){const s=t.pop(),r=e.ahe_IfLst;let a;for(let e=0;e<r.length;e++){const t=r[e];if(t.ifElement===s){a=t;break}}a?((0,i.quickDeleteFromArray)(r,a),q(n,a.ifParent)):q(n,s)}for(let n=0;n<l;n++)A(s[n],t[n],e)}return a}function L(e,t){const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}}function F(e,t,s){e.ahe_cmt[t](s)}function I(e,t,s){const n=g(t,s);return n?(P(e,n,t),E(t,s),n):""}function T(e,t){const s=g(e,t);return s?(E(e,t),s):""}function P(e,t,s){const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))}function $(e){e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""}!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(m||(m={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND"}(f||(f={})),function(){for(let e=0;e<b;e++)_.push(R(f.TEXT_VALUE))}();var M=s(512);let w=0;function U(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.ahe_nmr=w,w++,this.tagName!==f.TEXT_VALUE&&this.tagName!==f.QSI_BIND&&(this.ahe_clr=new M.g,this.ahe_onAdt$=new n.c(!1),this.ahe_bfrIni$=new n.c(!1),this.ahe_bfrDst$=new n.c(!1),this.ahe_atrChd$=new n.c(void 0),this.ahe_bfrDctChg$=new n.c(!1),this.ahe_onChgDtd$=new n.c(!1),this.ahe_onMsg$=new n.c(void 0),this.ahe_onPChlRdy$=new n.c(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],this.ahe_opts=e,this.ahe_cmt=new e.element(this),"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate())}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==f.TEXT_VALUE&&this.tagName!==f.QSI_BIND&&(g(this,o.ON_IF)&&!this.ahe_cmt[u]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),function(e){const t=e.querySelectorAll(`*:not([${p(o.INFO)}])`);for(let s=0;s<t.length;s++)N(e,D(e,t[s]))}(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)))}disconnectedCallback(){if(this.tagName!==f.TEXT_VALUE)this.tagName!==f.QSI_BIND&&(!g(this,o.ON_IF)||this.ahe_cmt[u]?(this.ahe_bfrDst$.next(!0),$(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[u]=!0);else{if(_.length>=b)return;""==this.innerHTML&&(E(this,o.INFO),_.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&function(e){const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n];N(e,O(e,i.children,s[i.valueName],i.parent,i.template))}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const r=n.ifParent.contains(n.ifElement);i?r||K(n.ifParent,n.ifElement):r&&q(n.ifParent,n.ifElement)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let r;if(s.isConditionDisabled)r=m.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),r=e?m.TRUE:m.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:a,secondClassName:o}=s;o?r===m.TRUE?(X(i,[a]),j(i,[o])):(X(i,[o]),j(i,[a])):s.isConditionDisabled||r===m.TRUE?X(i,[a]):j(i,[a])}}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e){if(e.isCustomAppElement)return e;if(e.ahe_cmt&&e.sendMessage)return e.isCustomAppElement=!0,e}}transferToChannel(e,t){this.onMessage$().pipe().emitByPositive((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!this.getChannel(e)}collect(...e){this.ahe_clr.collect(...e)}destroy(){$(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const S="{display: contents !important;}",x=[`html-block ${S}`];function B(e){for(let t=0;t<e.length;t++)x.push(`${e[t].tagName} ${S}`);z((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].targetElement)}))}function H(e,t,s){return{tagName:t,targetElement:U({template:s,element:e})}}let k;function R(e){return a.createElement(e)}function V(e){const t=R("style");return t.innerHTML=e,t}function j(e,t){if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])}function X(e,t){if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])}function K(e,t){e&&t&&e.appendChild(t)}function q(e,t){e&&t&&e.removeChild(t)}function Q(e,t){e&&(e.value=t)}const Y=new n.c(null);function z(e){Y.pipe().emitByPositive((e=>!!e)).setOnce().subscribe(e),Y.pipe().emitByPositive((e=>!e)).setOnce().subscribe((()=>{const e=()=>{Y.next(a.body),a.removeEventListener("DOMContentLoaded",e)};a.addEventListener("DOMContentLoaded",e)})),Y.next(a.body)}let W,J,G,Z;const ee=new class{constructor(e,t,s,n){W=e,J=t,G=s,Z=n,k=this}set major(e){J=e}set minor(e){G=e}set patch(e){Z=e}set name(e){W=e}get version(){return`${J}.${G}.${Z}`}get name(){return W}get description(){return`[${W} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){k?console.log(k.description,...e):console.log("APP",...e)}("STARTED")}}("simple_table",1,1,0),te=new n.c(0),se=new n.c(0),ne=k.name;let ie="";for(let e=0;e<ne.length;e++){const t=ne[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}ie+=s||"-"}const re="app-"+ie;class ae{constructor(e,t){this.tableTag=e,this.tableName=t}injectToElement(e){return new oe(this.tableTag,this.tableName,e)}injectToId(e){return this.injectToElement(a.getElementById(e))}}class oe{constructor(e,t,s){this.tableTag=e,this.tableName=t,this.parent=s}waitTable(){return new Promise(((e,t)=>{this.tableName?this.tableTag?this.parent?(te.pipe().emitByPositive((e=>!!e&&e.getTableName()===this.tableName)).subscribe((t=>{const s=new he(t);e(s)})),z((()=>{this.parent.innerHTML=this.tableTag}))):t("parent is not present"):t("tableTag is not present"):t("tableName is not present")}))}}class he{constructor(e){this.table=e}setData(e){this.table.setOptions(e)}setListener(e){e&&(this.cellListener=e,se.pipe().emitByPositive((e=>!!e&&e.tableName===this.table.getTableName())).subscribe((e=>{this.cellListener(e)})))}}var le;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(le||(le={}));const ce=new n.c(le.EN),ue=new class{get currentLocation(){return ce.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return ce.subscribe(e)}setLocation(e){ce.next(e)}destroy(){ce.destroy()}},de=[H(class{constructor(e){var t;this.root=e,this.name=e.tagName,this.tableName=(t=e)?t.getAttribute("table-name"):""}onCreate(){}onInit(){this.handleMainChanel(),te.next(this)}handleMainChanel(){this.mainChanel=this.root.getChannel(this.main)}onDestroy(){}setOptions(e){e.tableName=this.tableName,this.root.sendToChannel(this.mainChanel,e)}getTableName(){return this.tableName}},re,"<app-main qsi-inject_to='main'></app-main>"),H(class{constructor(e){this.root=e,this.name=e.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((e=>{this.rows.length=0,this.rows.push(...e),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-header","<header class='v-idZCL-t dPY-j5a_i'><app-row qsi-for='rows'></app-row></header>"),H(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.transferToChannel((()=>this.headerChanel),(e=>[{id:0,isEditDisabled:!0,arr:e.header}])),this.root.transferToChannel((()=>this.bodyChanel),(e=>{const t=[];for(let s=0;s<e.body.length;s++){const n=e.body[s];t.push({id:s+1,arr:n,tableName:e.tableName})}return t})),this.root.transferToChannel((()=>this.footerChanel),(e=>e.footer))}onInit(){this.initHeaderChanel(),this.initBodyChanel(),this.initFooterChanel()}initHeaderChanel(){this.headerChanel=this.root.getChannel(this.header)}initBodyChanel(){this.bodyChanel=this.root.getChannel(this.body)}initFooterChanel(){this.footerChanel=this.root.getChannel(this.footer)}onDestroy(){}},"app-main","<main class='FT2MrRZ-ww'><app-header qsi-inject_to='header'></app-header><app-body qsi-inject_to='body'></app-body><app-footer qsi-inject_to='footer'></app-footer></main>"),H(class{constructor(e){this.root=e,this.name=e.tagName,this.text=""}onCreate(){this.root.onMessage$().subscribe((e=>{this.text=e,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-footer","<footer class='E_a_1_P_y'><qsi-bind>text</qsi-bind></footer>"),H(class{constructor(e){this.root=e,this.name=e.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((e=>{this.rows.length=0,this.rows.push(...e),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-body","<div class='Z-vfA81zo'><app-row qsi-for='rows'></app-row></div>"),H(class{constructor(e){this.root=e,this.name=e.tagName,this.cells=[]}onCreate(){this.root.onMessage$().subscribe((e=>{this.cells.length=0,this.id=e.id;for(let t=0;t<e.arr.length;t++){const s=e.arr[t];this.cells.push({id:{x:t,y:this.id,tableName:e.tableName},isEditDisabled:!!e.isEditDisabled,value:s})}this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-row","<div class='HlT_bd4_we'><app-cell qsi-for='cells'></app-cell></div>"),H(class{constructor(e){this.root=e,this.name=e.tagName,this.data="",this.isEdit=!1}onCreate(){this.root.onMessage$().subscribe((e=>{this.isEditDisabled=!!e.isEditDisabled,this.id=e.id,this.id.data=e.value,this.data=e.value,Q(this.input,this.data),this.root.title=this.data,this.root.detectChanges()}))}onInit(){}onDestroy(){}onDblClick(){this.isEditDisabled||(this.isEdit=!0,Q(this.input,this.data),this.root.detectChanges(),this.input.focus())}onKeyDown(e){"enter"===e.key.toLowerCase()&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}onChange(){this.isEdit=!1,this.setData(),this.root.detectChanges()}onMouseLeave(){this.isEdit&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}setData(){this.data=function(e){if(e&&e.value)return e.value}(this.input),this.data=this.data?this.data:"",this.id.data!==this.data&&(this.root.title=this.data,this.id.data=this.data,se.next(this.id))}isPointer(){return!this.isEdit&&!this.isEditDisabled}},"app-cell","<div class='D_b_lpX-p W-m-t_gRe p_aZ4AD_r' qsi-cls='u-X_B-GCq:isPointer' qsi-dblclick='onDblClick' qsi-mouseleave='onMouseLeave'><div class='Q_hsJ-i-wq'><label qsi-if='isEdit'><input class='xCd2whXLu dPY-j5a_i' qsi-change='onChange' qsi-inject_to='input' qsi-keydown='onKeyDown'></label><div qsi-if='!isEdit'><qsi-bind>data</qsi-bind></div></div></div>")],_e=U({template:"",element:class{}}),be=U({template:"",element:class{}});B([{tagName:f.TEXT_VALUE.toLowerCase(),targetElement:_e},{tagName:f.QSI_BIND.toLowerCase(),targetElement:be}]);const me=new class{constructor(){this.isComponentMode=!1}register(e){B(e)}run(e){this.isComponentMode=!!e,z((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=R(re))}start(){const e=V(x.join("")),t=V(".FT2MrRZ-ww {position: relative;padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;border: solid 1px;}.FT2MrRZ-ww * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.FT2MrRZ-ww .v-idZCL-t {width: 100%;height: 80px;font-weight: bold;border-top: solid 1px;user-select: none;}.FT2MrRZ-ww .Z-vfA81zo {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;}.FT2MrRZ-ww .E_a_1_P_y {width: 100%;height: 80px;}.FT2MrRZ-ww .HlT_bd4_we {width: 100%;height: 60px;min-height: 40px;display: flex;flex-flow: row nowrap;border-left: solid 1px;border-bottom: solid 1px;}.FT2MrRZ-ww .D_b_lpX-p {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;border-right: solid 1px;padding: 5px;}.FT2MrRZ-ww .xCd2whXLu {width: 100%;height: 100%;border: none;outline: 0;}.FT2MrRZ-ww .Q_hsJ-i-wq {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}.FT2MrRZ-ww .dPY-j5a_i {background: rgba(0, 0, 0, 0.1);}.FT2MrRZ-ww .W-m-t_gRe {justify-content: center;}.FT2MrRZ-ww .p_aZ4AD_r {align-items: center;}.FT2MrRZ-ww .u-X_B-GCq {cursor: pointer;}");K(a.head,e),K(a.head,t),!this.isComponentMode&&K(a.body,this.appElement)}};ee.init(),ue.setLocation(le.EN),me.register(de),me.run(!0),r.TableController=new class{createTable(e){return new ae(`<${re} table-name='${e}'></${re}>`,e)}}})();