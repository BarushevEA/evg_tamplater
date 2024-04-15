(()=>{"use strict";var t={512:(t,e,s)=>{e.g=void 0;const n=s(951);e.g=class{list=[];_isDestroyed=!1;collect(...t){this._isDestroyed||this.list.push(...t)}unsubscribe(t){this._isDestroyed||(t?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,t))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sortDescending=e.sortAscending=e.randomCallback=e.positiveCallback=e.negativeCallback=e.quickDeleteFromArray=e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t.splice(s,1),!0)},e.quickDeleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)},e.negativeCallback=()=>!1,e.positiveCallback=()=>!0,e.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124",e.sortAscending=(t,e)=>t.order>e.order?1:t.order<e.order?-1:0,e.sortDescending=(t,e)=>t.order>e.order?-1:t.order<e.order?1:0},390:(t,e,s)=>{e.cP=void 0;const n=s(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(t,e){this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const s=e.listener;return s&&e.observable?e.isListenPaused?void 0:e.isPipe?e.emitByPositiveCondition&&e.emitByPositiveCondition(t)||e.emitByNegativeCondition&&!e.emitByNegativeCondition(t)?s(t):e.once.isOnce?(e.once.isFinished=!0,s(t),e.unsubscribe()):e.unsubscribeByNegativeCondition?e.unsubscribeByNegativeCondition(t)?s(t):(e.unsubscribeByNegativeCondition=null,e.unsubscribe()):e.unsubscribeByPositiveCondition?e.unsubscribeByPositiveCondition(t)?(e.unsubscribeByPositiveCondition=null,e.unsubscribe()):s(t):e.emitMatchCondition&&e.emitMatchCondition(t)===t?s(t):void 0:s(t):e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return this.unsubscribeByNegativeCondition=t??n.negativeCallback,this}unsubscribeByPositive(t){return this.unsubscribeByPositiveCondition=t??n.positiveCallback,this}emitByNegative(t){return this.emitByNegativeCondition=t??n.positiveCallback,this}emitByPositive(t){return this.emitByPositiveCondition=t??n.negativeCallback,this}emitMatch(t){return this.emitMatchCondition=t??n.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(t){this.value=t}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=t;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++)this.unSubscribe(this.listenersForUnsubscribe[e]);this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,t)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const s=new i(this,!1);return s.subscribe(t,e),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}(()=>{var t=s(390),e=s(951);const n=window,i=document;var o;!function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.CHANNEL="channel",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(o||(o={}));const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,a=(function(){const t=navigator.userAgentData;if(t&&t.mobile)return!0;if(t&&r.test(t.platform))return!0;if(r.test(navigator.userAgent)||r.test(navigator.platform))return!0;const e=n.matchMedia;e&&e("(pointer:coarse)").matches}(),n.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),h=":",l=(Object.keys(o),"_______$$bool"),c=[0],u=[],d=100;var _,m;function b(t){return`qsi-${t}`}function f(t,e){return t?t.getAttribute(b(e)):""}function g(t,e,s){t&&t.setAttribute(b(e),s)}function C(t,e){t&&t.removeAttribute(b(e))}function E(t,e){if(!e.length)return;let s="[";if(e.length>1){for(let n=0;n<e.length;n++){const i=e[n];s+=N(t,i),g(i,o.INFO,s.trim()+"]"),i.ahe_pnt_chl=t,i.ahe_onPChlRdy$.next(t)}return}const n=e[0];!function(t,e){if(e.tagName!==m.TEXT_VALUE)return!1;if(!e.innerHTML)return!1;const s=L(t,e.innerHTML);return s.isFunction?(t.ahe_nFns.push({textElement:e,valueName:s.valueName,lastData:a}),!0):(t.ahe_nVls.push({textElement:e,valueName:s.valueName,lastData:a}),!0)}(t,n)?function(t,e){if(e.tagName!==m.QSI_BIND)return!1;if(!e.innerHTML)return!1;const s=L(t,e.innerHTML);return s.isFunction?(t.ahe_bndFns.push({textElement:e,valueName:s.valueName,lastData:a}),!0):(t.ahe_bndVls.push({textElement:e,valueName:s.valueName,lastData:a}),!0)}(t,n)?g(n,o.INFO,s+"bind]"):(s+=function(t,e){const s=P(e,o.INJECT_TO);return s?(t.ahe_cmt[s]=e,"inj "):""}(t,n),s+=function(t,e){const s=P(e,o.CHANNEL);return s&&e.isCustomAppElement?(t.ahe_cmt[s]=e,"cnl "):""}(t,n),s+=function(t,e){const s=P(e,o.SOURCE);if(!s)return"";const n=L(t,s);return n.isFunction?(t.ahe_srcCmsFns.push({textElement:e,valueName:n.valueName,lastData:""}),"src "):(t.ahe_srcCms.push({textElement:e,valueName:s,lastData:""}),"src ")}(t,n),s+=function(t,e){const s=O(t,e,o.ON_CLICK);return s?(e.onclick=e=>A(t,s,e),"clk "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>A(t,s,e),"mlv "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>A(t,s,e),"mer "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_MOUSE_UP);return s?(e.onmouseup=e=>A(t,s,e),"mup "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>A(t,s,e),"mdn "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>A(t,s,e),"mmv "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_KEY_DOWN);return s?(e.onkeydown=e=>A(t,s,e),"kdn "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_KEY_UP);return s?(e.onkeyup=e=>A(t,s,e),"kup "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>A(t,s,e),"dbc "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_SCROLL);return s?(e.onscroll=e=>A(t,s,e),"scl "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_WHEEL);return s?(e.onwheel=e=>A(t,s,e),"whl "):""}(t,n),s+=function(t,e){const s=O(t,e,o.ON_CHANGE);return s?(e.onchange=e=>A(t,s,e),"chg "):""}(t,n),s+=function(t,e){const s=f(e,o.ON_HANDLE);return s?(F(t,s,e),C(e,o.ON_HANDLE),"elt "):""}(t,n),s+=N(t,n),s+=function(t,e){let s=f(e,o.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:e,classConditions:i};for(let e=0;e<n.length;e++){const s=n[e];if(s.includes("?")){const e=s.split("?"),n=L(t,e[0]),o=e[1].split(h);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:_.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(s.includes(h)){const e=s.split(h),n=L(t,e[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:_.UNDEFINED,firstClassName:e[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:_.UNDEFINED,firstClassName:s,secondClassName:""})}return t.ahe_ClsIfLst.push(r),C(e,o.CLASS_IF),"cls "}(t,n),g(n,o.INFO,s.trim()+"]"),n.isCustomAppElement&&(n.ahe_pnt_chl=t,n.ahe_onPChlRdy$.next(t))):g(n,o.INFO,s+"var]")}function N(t,e){let s=f(e,o.ON_IF);if(!s)return"";const n=p(),i=e.parentElement,r=L(t,s);return t.ahe_IfLst.push({ifElement:e,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,e),X(i,e),C(e,o.ON_IF),g(n,o.INFO,"[ifp]"),"ifc "}function p(){return u.length?u.pop():k(m.TEXT_VALUE)}function v(t,e){if(e.tagName===m.TEXT_VALUE)return(c[0]=e)&&c;if(e.tagName===m.QSI_BIND)return(c[0]=e)&&c;if(!t.isAppElement(e))return(c[0]=e)&&c;const s=f(e,o.FOR);if(!s)return(c[0]=e)&&c;const n=t.ahe_cmt[s];if(!n)return(c[0]=e)&&c;const i=p(),r=e.parentElement,a=y(t,[],n,i,e);return g(i,o.INFO,"[for-of]"),r.insertBefore(i,e),X(r,e),C(e,o.FOR),t.ahe_ForOfLst.push({parent:i,template:e,children:a,valueName:s}),a}function D(t,e,s){s.isAppElement(e)&&e.sendMessage(t)}function y(t,s,n,i,r){const a=[],h=s.length,l=n.length;let c=l-h;if(!(l+h))return a;if(c>0){for(let e=0;e<c;e++){const h=k(r.tagName);s.push(h),a.push(h);const u=f(r,o.ON_IF);u&&g(h,o.ON_IF,u),V(i,h),D(n[l-c+e],h,t)}for(let e=0;e<l-c;e++)D(n[e],s[e],t)}else{c*=-1;for(let n=0;n<c;n++){const n=s.pop(),o=t.ahe_IfLst;let r;for(let t=0;t<o.length;t++){const e=o[t];if(e.ifElement===n){r=e;break}}r?((0,e.quickDeleteFromArray)(o,r),X(i,r.ifParent)):X(i,n)}for(let e=0;e<l;e++)D(n[e],s[e],t)}return a}function L(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_cmt[n]}}function A(t,e,s){t.ahe_cmt[e](s)}function O(t,e,s){const n=f(e,s);return n?(F(t,n,e),C(e,s),n):""}function P(t,e){const s=f(t,e);return s?(C(t,e),s):""}function F(t,e,s){const n=t.ahe_cmt[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_nmr]||(n.htmlElements[t.ahe_nmr]=[]),t.ahe_clr.collect(t.beforeDestroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_nmr].push(s))}!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(_||(_={})),function(t){t.TEXT_VALUE="TXT-VAL",t.QSI_BIND="QSI-BIND"}(m||(m={})),function(){for(let t=0;t<d;t++)u.push(k(m.TEXT_VALUE))}();var I=s(512);let T=0;function M(e){class s extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.ahe_nmr=T,T++,this.tagName!==m.TEXT_VALUE&&this.tagName!==m.QSI_BIND&&(this.ahe_onAdt$=new t.cP(!1),this.ahe_bfrIni$=new t.cP(!1),this.ahe_bfrDst$=new t.cP(!1),this.ahe_atrChd$=new t.cP(void 0),this.ahe_bfrDctChg$=new t.cP(!1),this.ahe_onChgDtd$=new t.cP(!1),this.ahe_onMsg$=new t.cP(void 0),this.ahe_onPChlRdy$=new t.cP(void 0),this.ahe_clr=new I.g,this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],this.ahe_opts=e,this.ahe_cmt=new e.element(this),"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate())}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==m.TEXT_VALUE&&this.tagName!==m.QSI_BIND&&(f(this,o.ON_IF)&&!this.ahe_cmt[l]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),function(t){const e=t.querySelectorAll(`*:not([${b(o.INFO)}])`);for(let s=0;s<e.length;s++)E(t,v(t,e[s]))}(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((t=>this.ahe_cmt.onMessage(t)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)))}disconnectedCallback(){if(this.tagName!==m.TEXT_VALUE)this.tagName!==m.QSI_BIND&&(!f(this,o.ON_IF)||this.ahe_cmt[l]?(this.ahe_bfrDst$.next(!0),this.clearProperties(),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[l]=!0);else{if(u.length>=d)return;""==this.innerHTML&&(C(this,o.INFO),u.push(this))}}attributeChangedCallback(t,e,s){this.ahe_atrChd$?.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_nmr]?t.htmlElements[this.ahe_nmr]:[]}detectChanges(t){this.ahe_bfrDctChg$.next(!0),!t&&this.ahe_ForOfLst.length&&function(t){const e=t.ahe_ForOfLst;for(let s=0;s<e.length;s++){const n=e[s];E(t,y(t,n.children,t.ahe_cmt[n.valueName],n.parent,n.template))}}(this),function(t){for(let e=0;e<t.ahe_IfLst.length;e++){const s=t.ahe_IfLst[e];let n=s.isFunction?!!t.ahe_cmt[s.valueName]():!!t.ahe_cmt[s.valueName];if(s.isInversion&&(n=!n),n===s.oldCondition)continue;s.oldCondition=n;const i=s.ifParent.contains(s.ifElement);n?i||V(s.ifParent,s.ifElement):i&&X(s.ifParent,s.ifElement)}}(this),function(t){for(let e=0;e<t.ahe_ClsIfLst.length;e++){const s=t.ahe_ClsIfLst[e],n=s.classConditions,i=s.element,o=t.ahe_cmt;for(let t=0;t<n.length;t++){const e=n[t];let s;if(e.isConditionDisabled)s=_.TRUE;else{let t=e.isFunction?!!o[e.conditionName]():!!o[e.conditionName];e.isInversion&&(t=!t),s=t?_.TRUE:_.FALSE}if(s===e.oldCondition)continue;e.oldCondition=s;const r=e.firstClassName,a=e.secondClassName;a?s===_.TRUE?(H(i,[r]),R(i,[a])):(H(i,[a]),R(i,[r])):e.isConditionDisabled||s===_.TRUE?H(i,[r]):R(i,[r])}}}(this),function(t){for(let e=0;e<t.ahe_bndVls.length;e++){const s=t.ahe_bndVls[e],n=t.ahe_cmt[s.valueName];s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_srcCms.length;e++){const s=t.ahe_srcCms[e],n=t.ahe_cmt[s.valueName]??"";s.lastData!==n&&(s.textElement.src=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_srcCmsFns.length;e++){const s=t.ahe_srcCmsFns[e],n=t.ahe_cmt[s.valueName]()??"";s.lastData!==n&&(s.textElement.src=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_bndFns.length;e++){const s=t.ahe_bndFns[e],n=t.ahe_cmt[s.valueName]();s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nVls.length;e++){const s=t.ahe_nVls[e],n=t.ahe_cmt[s.valueName];s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nFns.length;e++){const s=t.ahe_nFns[e],n=t.ahe_cmt[s.valueName]();s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),this.ahe_onChgDtd$.next(!0)}sendMessage(t){this.ahe_onMsg$.next(t)}sendMessageToParent(t){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(t),!0)}getChannel(t){if(t){if(t.isCustomAppElement)return t;if(t.ahe_cmt&&t.sendMessage)return t.isCustomAppElement=!0,t}}transferToChannel(t,e){this.onMessage$().pipe().emitByPositive((()=>t())).subscribe((s=>{t().sendMessage(e(s))}))}sendToChannel(t,e){t?.sendMessage(e)}isAppElement(t){return!!this.getChannel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.clearProperties(),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}clearProperties(){this.ahe_nFns.length=0,this.ahe_srcCmsFns.length=0,this.ahe_srcCms.length=0,this.ahe_nVls.length=0,this.ahe_bndFns.length=0,this.ahe_bndVls.length=0,this.ahe_IfLst.length=0,this.ahe_ClsIfLst.length=0,this.ahe_ForOfLst.length=0,this.innerHTML=""}}return s}const $="{display: contents !important;}",U=[`html-block ${$}`];function w(t){for(let e=0;e<t.length;e++)U.push(`${t[e].tagName} ${$}`);G((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].targetElement)}))}function B(t,e,s){return{tagName:e,targetElement:M({template:s,element:t})}}let x;function k(t){return i.createElement(t)}function S(t){const e=k("style");return e.innerHTML=t,e}function R(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])}function H(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])}function V(t,e){t&&e&&t.appendChild(e)}function X(t,e){t&&e&&t.removeChild(e)}function j(t,e){t&&(t.value=e)}const K=new t.cP(!1);let q,Q,Y,W,z=!1;function G(t){K.pipe().setOnce().subscribe((e=>e&&t())),function(){if(i.body)return void K.next(!0);if(z)return;z=!0;const t=()=>{K.next(!0),i.removeEventListener("DOMContentLoaded",t),z=!1};i.addEventListener("DOMContentLoaded",t)}()}const J=new class{constructor(t,e,s,n){q=t,Q=e,Y=s,W=n,x=this}set major(t){Q=t}set minor(t){Y=t}set patch(t){W=t}set name(t){q=t}get version(){return`${Q}.${Y}.${W}`}get name(){return q}get description(){return`[${q} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){x?console.log(x.description,...t):console.log("APP",...t)}("STARTED")}}("simple_table",1,1,0),Z=new t.cP(0),tt=new t.cP(0),et=x.name;let st="";for(let t=0;t<et.length;t++){const e=et[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}st+=s||"-"}const nt="app-"+st;class it{constructor(t,e){this.tableTag=t,this.tableName=e}injectToElement(t){return new ot(this.tableTag,this.tableName,t)}injectToId(t){return this.injectToElement(i.getElementById(t))}}class ot{constructor(t,e,s){this.tableTag=t,this.tableName=e,this.parent=s}waitTable(){return new Promise(((t,e)=>{this.tableName?this.tableTag?this.parent?(Z.pipe().emitByPositive((t=>!!t&&t.getTableName()===this.tableName)).subscribe((e=>{const s=new rt(e);t(s)})),G((()=>{this.parent.innerHTML=this.tableTag}))):e("parent is not present"):e("tableTag is not present"):e("tableName is not present")}))}}class rt{constructor(t){this.table=t}setData(t){this.table.setOptions(t)}setListener(t){t&&(this.cellListener=t,tt.pipe().emitByPositive((t=>!!t&&t.tableName===this.table.getTableName())).subscribe((t=>{this.cellListener(t)})))}}var at;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(at||(at={}));const ht=new t.cP(at.EN),lt=new class{get currentLocation(){return ht.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return ht.subscribe(t)}setLocation(t){ht.next(t)}destroy(){ht.destroy()}},ct=[B(class{constructor(t){var e;this.root=t,this.name=t.tagName,this.tableName=("table-name",(e=t)?e.getAttribute("table-name"):"")}onCreate(){}onInit(){this.handleMainChanel(),Z.next(this)}handleMainChanel(){this.mainChanel=this.root.getChannel(this.main)}onDestroy(){}setOptions(t){t.tableName=this.tableName,this.root.sendToChannel(this.mainChanel,t)}getTableName(){return this.tableName}},nt,"<app-main qsi-inject_to='main'></app-main>"),B(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-header","<header class='U-7A9lRNt A_0-9KIFi'><app-row qsi-for='rows'></app-row></header>"),B(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.transferToChannel((()=>this.headerChanel),(t=>[{id:0,isEditDisabled:!0,arr:t.header}])),this.root.transferToChannel((()=>this.bodyChanel),(t=>{const e=[];for(let s=0;s<t.body.length;s++){const n=t.body[s];e.push({id:s+1,arr:n,tableName:t.tableName})}return e})),this.root.transferToChannel((()=>this.footerChanel),(t=>t.footer))}onInit(){this.initHeaderChanel(),this.initBodyChanel(),this.initFooterChanel()}initHeaderChanel(){this.headerChanel=this.root.getChannel(this.header)}initBodyChanel(){this.bodyChanel=this.root.getChannel(this.body)}initFooterChanel(){this.footerChanel=this.root.getChannel(this.footer)}onDestroy(){}},"app-main","<main class='L-xb2_Ajww'><app-header qsi-inject_to='header'></app-header><app-body qsi-inject_to='body'></app-body><app-footer qsi-inject_to='footer'></app-footer></main>"),B(class{constructor(t){this.root=t,this.name=t.tagName,this.text=""}onCreate(){this.root.onMessage$().subscribe((t=>{this.text=t,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-footer","<footer class='mXLnm-X_y'><qsi-bind>text</qsi-bind></footer>"),B(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-body","<div class='u0iqu_Z5o'><app-row qsi-for='rows'></app-row></div>"),B(class{constructor(t){this.root=t,this.name=t.tagName,this.cells=[]}onCreate(){this.root.onMessage$().subscribe((t=>{this.cells.length=0,this.id=t.id;for(let e=0;e<t.arr.length;e++){const s=t.arr[e];this.cells.push({id:{x:e,y:this.id,tableName:t.tableName},isEditDisabled:!!t.isEditDisabled,value:s})}this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-row","<div class='Z_6_ZnCYwe'><app-cell qsi-for='cells'></app-cell></div>"),B(class{constructor(t){this.root=t,this.name=t.tagName,this.data="",this.isEdit=!1}onCreate(){this.root.onMessage$().subscribe((t=>{this.isEditDisabled=!!t.isEditDisabled,this.id=t.id,this.id.data=t.value,this.data=t.value,j(this.input,this.data),this.root.title=this.data,this.root.detectChanges()}))}onInit(){}onDestroy(){}onDblClick(){this.isEditDisabled||(this.isEdit=!0,j(this.input,this.data),this.root.detectChanges(),this.input.focus())}onKeyDown(t){"enter"===t.key.toLowerCase()&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}onChange(){this.isEdit=!1,this.setData(),this.root.detectChanges()}onMouseLeave(){this.isEdit&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}setData(){this.data=function(t){if(t&&t.value)return t.value}(this.input),this.data=this.data?this.data:"",this.id.data!==this.data&&(this.root.title=this.data,this.id.data=this.data,tt.next(this.id))}isPointer(){return!this.isEdit&&!this.isEditDisabled}},"app-cell","<div class='mwD-JS6qp K_e-kMmHe ehE_Wqu-r' qsi-cls='tB4_Ymp-q:isPointer' qsi-dblclick='onDblClick' qsi-mouseleave='onMouseLeave'><div class='S_7-c_2ewq'><label qsi-if='isEdit'><input class='YoF7yJd-u A_0-9KIFi' qsi-change='onChange' qsi-inject_to='input' qsi-keydown='onKeyDown'></label><div qsi-if='!isEdit'><qsi-bind>data</qsi-bind></div></div></div>")],ut=M({template:"",element:class{}}),dt=M({template:"",element:class{}});w([{tagName:m.TEXT_VALUE.toLowerCase(),targetElement:ut},{tagName:m.QSI_BIND.toLowerCase(),targetElement:dt}]);const _t=new class{constructor(){this.isComponentMode=!1}register(t){w(t)}run(t){this.isComponentMode=!!t,G((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=k(nt))}start(){const t=S(U.join("")),e=S(".L-xb2_Ajww {position: relative;padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;border: solid 1px;}.L-xb2_Ajww * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.L-xb2_Ajww .U-7A9lRNt {width: 100%;height: 80px;font-weight: bold;border-top: solid 1px;user-select: none;}.L-xb2_Ajww .u0iqu_Z5o {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;}.L-xb2_Ajww .mXLnm-X_y {width: 100%;height: 80px;}.L-xb2_Ajww .Z_6_ZnCYwe {width: 100%;height: 60px;min-height: 40px;display: flex;flex-flow: row nowrap;border-left: solid 1px;border-bottom: solid 1px;}.L-xb2_Ajww .mwD-JS6qp {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;border-right: solid 1px;padding: 5px;}.L-xb2_Ajww .YoF7yJd-u {width: 100%;height: 100%;border: none;outline: 0;}.L-xb2_Ajww .S_7-c_2ewq {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}.L-xb2_Ajww .A_0-9KIFi {background: rgba(0, 0, 0, 0.1);}.L-xb2_Ajww .K_e-kMmHe {justify-content: center;}.L-xb2_Ajww .ehE_Wqu-r {align-items: center;}.L-xb2_Ajww .tB4_Ymp-q {cursor: pointer;}");V(i.head,t),V(i.head,e),!this.isComponentMode&&V(i.body,this.appElement)}};J.init(),lt.setLocation(at.EN),_t.register(ct),_t.run(!0),n.TableController=new class{createTable(t){return new it(`<${nt} table-name='${t}'></${nt}>`,t)}}})()})();