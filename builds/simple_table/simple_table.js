(()=>{"use strict";var e={512:(e,t,s)=>{t.g=void 0;const n=s(951);t.g=class{list=[];_isDestroyed=!1;collect(...e){this._isDestroyed||this.list.push(...e)}unsubscribe(e){this._isDestroyed||(e?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,e))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},401:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterSwitchCase=t.Filter=void 0,t.Filter=class{chainHandlers=[];pipeData={isBreakChain:!1,isAvailable:!1,payload:null};errorHandler;get isEmpty(){return 0===this.chainHandlers.length}filter(e){const t=this.pipeData;return this.chainHandlers.push((()=>{e(t.payload)&&(t.isAvailable=!0)})),this}switch(){return new s(this)}processChain(e){const t=this.chainHandlers,s=this.pipeData,n={isOK:!1,payload:void 0};s.payload=e,s.isBreakChain=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](),!s.isAvailable)return n;if(s.isBreakChain)break}}catch(e){return this.errorHandler?this.errorHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errorHandler=e}};class s{pipe;caseCounter;constructor(e){this.pipe=e,this.caseCounter=e.chainHandlers.length?e.chainHandlers.length:0}case(e){this.caseCounter++;const t=this.caseCounter,s=this.pipe.pipeData,n=this.pipe.chainHandlers;return n.push((()=>{s.isAvailable=!0,e(s.payload)&&(s.isBreakChain=!0),t!==n.length||s.isBreakChain||(s.isAvailable=!1)})),this}}t.FilterSwitchCase=s},951:(e,t)=>{function s(e){return"next"in e?t=>e.next(t):e}Object.defineProperty(t,"__esModule",{value:!0}),t.getListener=t.quickDeleteFromArray=t.deleteFromArray=t.sortDescending=t.sortAscending=void 0,t.sortAscending=(e,t)=>e.order>t.order?1:e.order<t.order?-1:0,t.sortDescending=(e,t)=>e.order>t.order?-1:e.order<t.order?1:0,t.deleteFromArray=function(e,t){const s=e.indexOf(t);return-1!==s&&(e.splice(s,1),!0)},t.quickDeleteFromArray=function(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)},t.getListener=function(e){if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++)t.push(s(e[n]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return s(e)}},390:(e,t,s)=>{t.c=void 0;const n=s(951),i=s(528),a=s(401);t.c=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];filterCase=new a.Filter;constructor(e){this.value=e}addFilter(e){return e&&this.filterCase.addErrorHandler(e),this.filterCase}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable&&(this.filterCase.isEmpty||this.filterCase.processChain(e).isOK)){this.isNextProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++)this.unSubscribe(this.listenersForUnsubscribe[t]);this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,e)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(!this.isSubsValid(e))return;const s=new i.SubscribeObject(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.listeners.push(e)}isSubsValid(e){return!this._isDestroyed&&!!e}pipe(){if(this._isDestroyed)return;const e=new i.SubscribeObject(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}},375:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SwitchCase=t.Pipe=void 0,t.Pipe=class{chainHandlers=[];pipeData={isBreakChain:!1,isNeedUnsubscribe:!1,isAvailable:!1,payload:null};setOnce(){const e=this.pipeData;return this.chainHandlers.push((()=>{this.listener(e.payload),e.isNeedUnsubscribe=!0})),this}unsubscribeByNegative(e){const t=this.pipeData;return this.chainHandlers.push((()=>{t.isAvailable=!0,e(t.payload)||(t.isNeedUnsubscribe=!0)})),this}unsubscribeByPositive(e){const t=this.pipeData;return this.chainHandlers.push((()=>{t.isAvailable=!0,e(t.payload)&&(t.isNeedUnsubscribe=!0)})),this}emitByNegative(e){const t=this.pipeData;return this.chainHandlers.push((()=>{e(t.payload)||(t.isAvailable=!0)})),this}emitByPositive(e){const t=this.pipeData;return this.chainHandlers.push((()=>{e(t.payload)&&(t.isAvailable=!0)})),this}emitMatch(e){const t=this.pipeData;return this.chainHandlers.push((()=>{e(t.payload)==t.payload&&(t.isAvailable=!0)})),this}switch(){return new s(this)}processChain(e){const t=this.chainHandlers,s=this.pipeData;for(let e=0;e<t.length;e++){if(s.isNeedUnsubscribe=!1,s.isAvailable=!1,t[e](),s.isNeedUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreakChain)break}return e(s.payload)}};class s{pipe;caseCounter;constructor(e){this.pipe=e,this.caseCounter=e.chainHandlers.length?e.chainHandlers.length:0}subscribe(e,t){return this.pipe.subscribe(e,t)}case(e){this.caseCounter++;const t=this.caseCounter,s=this.pipe.pipeData,n=this.pipe.chainHandlers;return n.push((()=>{s.isAvailable=!0,e(s.payload)&&(s.isBreakChain=!0),t!==n.length||s.isBreakChain||(s.isAvailable=!1)})),this}}t.SwitchCase=s},528:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SubscribeObject=void 0;const n=s(375),i=s(951);class a extends n.Pipe{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)};_order=0;isPaused=!1;isPipe=!1;constructor(e,t){super(),this.observable=e,this.isPipe=!!t}subscribe(e,t){return this.listener=(0,i.getListener)(e),t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chainHandlers.length=0)}send(e){try{this.pipeData.payload=e,this.pipeData.isBreakChain=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}get order(){return this._order}set order(e){this._order=e}processValue(e){const t=this.listener;return t&&this.observable?this.isPaused?void 0:this.isPipe?this.processChain(t):t(e):this.unsubscribe()}}t.SubscribeObject=a}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,s),a.exports}(()=>{var e=s(390),t=s(951);const n=window,i=document;var a;!function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(a||(a={}));const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,o=(function(){const e=navigator.userAgentData;if(e&&e.mobile)return!0;if(e&&r.test(e.platform))return!0;if(r.test(navigator.userAgent)||r.test(navigator.platform))return!0;const t=n.matchMedia;t&&t("(pointer:coarse)").matches}(),n.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),h=":",l=(Object.keys(a),"_______$$bool"),c=[0],u=[],d=100;var _,b;function m(e){return`qsi-${e}`}function p(e,t){return e?e.getAttribute(m(t)):""}function f(e,t,s){e&&e.setAttribute(m(t),s)}function g(e,t){e&&e.removeAttribute(m(t))}function C(e,t){if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=E(e,i),f(i,a.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];!function(e,t){if(t.tagName!==b.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=A(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:o}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:o}),!0)}(e,n)?function(e,t){if(t.tagName!==b.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=A(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:o}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:o}),!0)}(e,n)?f(n,a.INFO,s+"bind]"):(s+=function(e,t){const s=F(t,a.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""}(e,n),s+=function(e,t){const s=F(t,a.CHANNEL);return s&&t.isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""}(e,n),s+=function(e,t){const s=F(t,a.SOURCE);if(!s)return"";const n=A(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")}(e,n),s+=function(e,t){const s=O(e,t,a.ON_CLICK);return s?(t.onclick=t=>L(e,s,t),"clk "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>L(e,s,t),"mlv "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>L(e,s,t),"mer "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_MOUSE_UP);return s?(t.onmouseup=t=>L(e,s,t),"mup "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>L(e,s,t),"mdn "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>L(e,s,t),"mmv "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_KEY_DOWN);return s?(t.onkeydown=t=>L(e,s,t),"kdn "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_KEY_UP);return s?(t.onkeyup=t=>L(e,s,t),"kup "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>L(e,s,t),"dbc "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_SCROLL);return s?(t.onscroll=t=>L(e,s,t),"scl "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_WHEEL);return s?(t.onwheel=t=>L(e,s,t),"whl "):""}(e,n),s+=function(e,t){const s=O(e,t,a.ON_CHANGE);return s?(t.onchange=t=>L(e,s,t),"chg "):""}(e,n),s+=function(e,t){const s=p(t,a.ON_HANDLE);return s?(I(e,s,t),g(t,a.ON_HANDLE),"elt "):""}(e,n),s+=E(e,n),s+=function(e,t){let s=p(t,a.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=A(e,t[0]),a=t[1].split(h);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:_.UNDEFINED,firstClassName:a[0],secondClassName:a[1]})}else if(s.includes(h)){const t=s.split(h),n=A(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:_.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:_.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(r),g(t,a.CLASS_IF),"cls "}(e,n),f(n,a.INFO,s.trim()+"]"),n.isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e))):f(n,a.INFO,s+"var]")}function E(e,t){let s=p(t,a.ON_IF);if(!s)return"";const n=N(),i=t.parentElement,r=A(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,t),X(i,t),g(t,a.ON_IF),f(n,a.INFO,"[ifp]"),"ifc "}function N(){return u.length?u.pop():k(b.TEXT_VALUE)}function D(e,t){if(t.tagName===b.TEXT_VALUE)return(c[0]=t)&&c;if(t.tagName===b.QSI_BIND)return(c[0]=t)&&c;if(!e.isAppElement(t))return(c[0]=t)&&c;const s=p(t,a.FOR);if(!s)return(c[0]=t)&&c;const n=e.ahe_cmt[s];if(!n)return(c[0]=t)&&c;const i=N(),r=t.parentElement,o=y(e,[],n,i,t);return f(i,a.INFO,"[for-of]"),r.insertBefore(i,t),X(r,t),g(t,a.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:o,valueName:s}),o}function v(e,t,s){s.isAppElement(t)&&t.sendMessage(e)}function y(e,s,n,i,r){const o=[],h=s.length,l=n.length;let c=l-h;if(!(l+h))return o;if(c>0){for(let t=0;t<c;t++){const h=k(r.tagName);s.push(h),o.push(h);const u=p(r,a.ON_IF);u&&f(h,a.ON_IF,u),j(i,h),v(n[l-c+t],h,e)}for(let t=0;t<l-c;t++)v(n[t],s[t],e)}else{c*=-1;for(let n=0;n<c;n++){const n=s.pop(),a=e.ahe_IfLst;let r;for(let e=0;e<a.length;e++){const t=a[e];if(t.ifElement===n){r=t;break}}r?((0,t.quickDeleteFromArray)(a,r),X(i,r.ifParent)):X(i,n)}for(let t=0;t<l;t++)v(n[t],s[t],e)}return o}function A(e,t){const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}}function L(e,t,s){e.ahe_cmt[t](s)}function O(e,t,s){const n=p(t,s);return n?(I(e,n,t),g(t,s),n):""}function F(e,t){const s=p(e,t);return s?(g(e,t),s):""}function I(e,t,s){const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))}function T(e){e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""}!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(_||(_={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND"}(b||(b={})),function(){for(let e=0;e<d;e++)u.push(k(b.TEXT_VALUE))}();var $=s(512);let M=0;function P(t){class s extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.ahe_nmr=M,M++,this.tagName!==b.TEXT_VALUE&&this.tagName!==b.QSI_BIND&&(this.ahe_clr=new $.g,this.ahe_onAdt$=new e.c(!1),this.ahe_bfrIni$=new e.c(!1),this.ahe_bfrDst$=new e.c(!1),this.ahe_atrChd$=new e.c(void 0),this.ahe_bfrDctChg$=new e.c(!1),this.ahe_onChgDtd$=new e.c(!1),this.ahe_onMsg$=new e.c(void 0),this.ahe_onPChlRdy$=new e.c(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],this.ahe_opts=t,this.ahe_cmt=new t.element(this),"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate())}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==b.TEXT_VALUE&&this.tagName!==b.QSI_BIND&&(p(this,a.ON_IF)&&!this.ahe_cmt[l]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),function(e){const t=e.querySelectorAll(`*:not([${m(a.INFO)}])`);for(let s=0;s<t.length;s++)C(e,D(e,t[s]))}(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)))}disconnectedCallback(){if(this.tagName!==b.TEXT_VALUE)this.tagName!==b.QSI_BIND&&(!p(this,a.ON_IF)||this.ahe_cmt[l]?(this.ahe_bfrDst$.next(!0),T(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[l]=!0);else{if(u.length>=d)return;""==this.innerHTML&&(g(this,a.INFO),u.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&function(e){const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n];C(e,y(e,i.children,s[i.valueName],i.parent,i.template))}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const a=n.ifParent.contains(n.ifElement);i?a||j(n.ifParent,n.ifElement):a&&X(n.ifParent,n.ifElement)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let a;if(s.isConditionDisabled)a=_.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),a=e?_.TRUE:_.FALSE}if(a===s.oldCondition)continue;s.oldCondition=a;const{firstClassName:r,secondClassName:o}=s;o?a===_.TRUE?(V(i,[r]),R(i,[o])):(V(i,[o]),R(i,[r])):s.isConditionDisabled||a===_.TRUE?V(i,[r]):R(i,[r])}}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),function(e){const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e){if(e.isCustomAppElement)return e;if(e.ahe_cmt&&e.sendMessage)return e.isCustomAppElement=!0,e}}transferToChannel(e,t){this.onMessage$().pipe().emitByPositive((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!this.getChannel(e)}collect(...e){this.ahe_clr.collect(...e)}destroy(){T(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return s}const w="{display: contents !important;}",U=[`html-block ${w}`];function H(e){for(let t=0;t<e.length;t++)U.push(`${e[t].tagName} ${w}`);J((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].targetElement)}))}function x(e,t,s){return{tagName:t,targetElement:P({template:s,element:e})}}let S;function k(e){return i.createElement(e)}function B(e){const t=k("style");return t.innerHTML=e,t}function R(e,t){if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])}function V(e,t){if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])}function j(e,t){e&&t&&e.appendChild(t)}function X(e,t){e&&t&&e.removeChild(t)}function K(e,t){e&&(e.value=t)}const q=new e.c(!1);let Q,Y,W,z,G=!1;function J(e){q.pipe().setOnce().subscribe((t=>t&&e())),function(){if(i.body)return void q.next(!0);if(G)return;G=!0;const e=()=>{q.next(!0),i.removeEventListener("DOMContentLoaded",e),G=!1};i.addEventListener("DOMContentLoaded",e)}()}const Z=new class{constructor(e,t,s,n){Q=e,Y=t,W=s,z=n,S=this}set major(e){Y=e}set minor(e){W=e}set patch(e){z=e}set name(e){Q=e}get version(){return`${Y}.${W}.${z}`}get name(){return Q}get description(){return`[${Q} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){S?console.log(S.description,...e):console.log("APP",...e)}("STARTED")}}("simple_table",1,1,0),ee=new e.c(0),te=new e.c(0),se=S.name;let ne="";for(let e=0;e<se.length;e++){const t=se[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}ne+=s||"-"}const ie="app-"+ne;class ae{constructor(e,t){this.tableTag=e,this.tableName=t}injectToElement(e){return new re(this.tableTag,this.tableName,e)}injectToId(e){return this.injectToElement(i.getElementById(e))}}class re{constructor(e,t,s){this.tableTag=e,this.tableName=t,this.parent=s}waitTable(){return new Promise(((e,t)=>{this.tableName?this.tableTag?this.parent?(ee.pipe().emitByPositive((e=>!!e&&e.getTableName()===this.tableName)).subscribe((t=>{const s=new oe(t);e(s)})),J((()=>{this.parent.innerHTML=this.tableTag}))):t("parent is not present"):t("tableTag is not present"):t("tableName is not present")}))}}class oe{constructor(e){this.table=e}setData(e){this.table.setOptions(e)}setListener(e){e&&(this.cellListener=e,te.pipe().emitByPositive((e=>!!e&&e.tableName===this.table.getTableName())).subscribe((e=>{this.cellListener(e)})))}}var he;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(he||(he={}));const le=new e.c(he.EN),ce=new class{get currentLocation(){return le.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return le.subscribe(e)}setLocation(e){le.next(e)}destroy(){le.destroy()}},ue=[x(class{constructor(e){var t;this.root=e,this.name=e.tagName,this.tableName=("table-name",(t=e)?t.getAttribute("table-name"):"")}onCreate(){}onInit(){this.handleMainChanel(),ee.next(this)}handleMainChanel(){this.mainChanel=this.root.getChannel(this.main)}onDestroy(){}setOptions(e){e.tableName=this.tableName,this.root.sendToChannel(this.mainChanel,e)}getTableName(){return this.tableName}},ie,"<app-main qsi-inject_to='main'></app-main>"),x(class{constructor(e){this.root=e,this.name=e.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((e=>{this.rows.length=0,this.rows.push(...e),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-header","<header class='u2gM5RZ-t cH2Hb_m_i'><app-row qsi-for='rows'></app-row></header>"),x(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.transferToChannel((()=>this.headerChanel),(e=>[{id:0,isEditDisabled:!0,arr:e.header}])),this.root.transferToChannel((()=>this.bodyChanel),(e=>{const t=[];for(let s=0;s<e.body.length;s++){const n=e.body[s];t.push({id:s+1,arr:n,tableName:e.tableName})}return t})),this.root.transferToChannel((()=>this.footerChanel),(e=>e.footer))}onInit(){this.initHeaderChanel(),this.initBodyChanel(),this.initFooterChanel()}initHeaderChanel(){this.headerChanel=this.root.getChannel(this.header)}initBodyChanel(){this.bodyChanel=this.root.getChannel(this.body)}initFooterChanel(){this.footerChanel=this.root.getChannel(this.footer)}onDestroy(){}},"app-main","<main class='jguxW_WRww'><app-header qsi-inject_to='header'></app-header><app-body qsi-inject_to='body'></app-body><app-footer qsi-inject_to='footer'></app-footer></main>"),x(class{constructor(e){this.root=e,this.name=e.tagName,this.text=""}onCreate(){this.root.onMessage$().subscribe((e=>{this.text=e,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-footer","<footer class='J0YBC_PKy'><qsi-bind>text</qsi-bind></footer>"),x(class{constructor(e){this.root=e,this.name=e.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((e=>{this.rows.length=0,this.rows.push(...e),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-body","<div class='l0okt-Ruo'><app-row qsi-for='rows'></app-row></div>"),x(class{constructor(e){this.root=e,this.name=e.tagName,this.cells=[]}onCreate(){this.root.onMessage$().subscribe((e=>{this.cells.length=0,this.id=e.id;for(let t=0;t<e.arr.length;t++){const s=e.arr[t];this.cells.push({id:{x:t,y:this.id,tableName:e.tableName},isEditDisabled:!!e.isEditDisabled,value:s})}this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-row","<div class='Kph-NXz-we'><app-cell qsi-for='cells'></app-cell></div>"),x(class{constructor(e){this.root=e,this.name=e.tagName,this.data="",this.isEdit=!1}onCreate(){this.root.onMessage$().subscribe((e=>{this.isEditDisabled=!!e.isEditDisabled,this.id=e.id,this.id.data=e.value,this.data=e.value,K(this.input,this.data),this.root.title=this.data,this.root.detectChanges()}))}onInit(){}onDestroy(){}onDblClick(){this.isEditDisabled||(this.isEdit=!0,K(this.input,this.data),this.root.detectChanges(),this.input.focus())}onKeyDown(e){"enter"===e.key.toLowerCase()&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}onChange(){this.isEdit=!1,this.setData(),this.root.detectChanges()}onMouseLeave(){this.isEdit&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}setData(){this.data=function(e){if(e&&e.value)return e.value}(this.input),this.data=this.data?this.data:"",this.id.data!==this.data&&(this.root.title=this.data,this.id.data=this.data,te.next(this.id))}isPointer(){return!this.isEdit&&!this.isEditDisabled}},"app-cell","<div class='e-XDl-rVp B-h8xN6-e d-Su5_6-r' qsi-cls='VrvUiJSpq:isPointer' qsi-dblclick='onDblClick' qsi-mouseleave='onMouseLeave'><div class='z-H-Etg0wq'><label qsi-if='isEdit'><input class='rhC_k_F_u cH2Hb_m_i' qsi-change='onChange' qsi-inject_to='input' qsi-keydown='onKeyDown'></label><div qsi-if='!isEdit'><qsi-bind>data</qsi-bind></div></div></div>")],de=P({template:"",element:class{}}),_e=P({template:"",element:class{}});H([{tagName:b.TEXT_VALUE.toLowerCase(),targetElement:de},{tagName:b.QSI_BIND.toLowerCase(),targetElement:_e}]);const be=new class{constructor(){this.isComponentMode=!1}register(e){H(e)}run(e){this.isComponentMode=!!e,J((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=k(ie))}start(){const e=B(U.join("")),t=B(".jguxW_WRww {position: relative;padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;border: solid 1px;}.jguxW_WRww * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.jguxW_WRww .u2gM5RZ-t {width: 100%;height: 80px;font-weight: bold;border-top: solid 1px;user-select: none;}.jguxW_WRww .l0okt-Ruo {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;}.jguxW_WRww .J0YBC_PKy {width: 100%;height: 80px;}.jguxW_WRww .Kph-NXz-we {width: 100%;height: 60px;min-height: 40px;display: flex;flex-flow: row nowrap;border-left: solid 1px;border-bottom: solid 1px;}.jguxW_WRww .e-XDl-rVp {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;border-right: solid 1px;padding: 5px;}.jguxW_WRww .rhC_k_F_u {width: 100%;height: 100%;border: none;outline: 0;}.jguxW_WRww .z-H-Etg0wq {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}.jguxW_WRww .cH2Hb_m_i {background: rgba(0, 0, 0, 0.1);}.jguxW_WRww .B-h8xN6-e {justify-content: center;}.jguxW_WRww .d-Su5_6-r {align-items: center;}.jguxW_WRww .VrvUiJSpq {cursor: pointer;}");j(i.head,e),j(i.head,t),!this.isComponentMode&&j(i.body,this.appElement)}};Z.init(),ce.setLocation(he.EN),be.register(ue),be.run(!0),n.TableController=new class{createTable(e){return new ae(`<${ie} table-name='${e}'></${ie}>`,e)}}})()})();