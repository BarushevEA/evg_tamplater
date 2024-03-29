(()=>{"use strict";var t={512:(t,e,s)=>{e.g=void 0;const n=s(951);e.g=class{list=[];_isDestroyed=!1;collect(...t){this._isDestroyed||this.list.push(...t)}unsubscribe(t){this._isDestroyed||(t?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,t))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sortDescending=e.sortAscending=e.randomCallback=e.positiveCallback=e.negativeCallback=e.quickDeleteFromArray=e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t.splice(s,1),!0)},e.quickDeleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)},e.negativeCallback=()=>!1,e.positiveCallback=()=>!0,e.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124",e.sortAscending=(t,e)=>t.order>e.order?1:t.order<e.order?-1:0,e.sortDescending=(t,e)=>t.order>e.order?-1:t.order<e.order?1:0},390:(t,e,s)=>{e.cP=void 0;const n=s(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(t,e){this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const s=e.listener;return s&&e.observable?e.isListenPaused?void 0:e.isPipe?e.emitByPositiveCondition&&e.emitByPositiveCondition(t)||e.emitByNegativeCondition&&!e.emitByNegativeCondition(t)?s(t):e.once.isOnce?(e.once.isFinished=!0,s(t),e.unsubscribe()):e.unsubscribeByNegativeCondition?e.unsubscribeByNegativeCondition(t)?s(t):(e.unsubscribeByNegativeCondition=null,e.unsubscribe()):e.unsubscribeByPositiveCondition?e.unsubscribeByPositiveCondition(t)?(e.unsubscribeByPositiveCondition=null,e.unsubscribe()):s(t):e.emitMatchCondition&&e.emitMatchCondition(t)===t?s(t):void 0:s(t):e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return this.unsubscribeByNegativeCondition=t??n.negativeCallback,this}unsubscribeByPositive(t){return this.unsubscribeByPositiveCondition=t??n.positiveCallback,this}emitByNegative(t){return this.emitByNegativeCondition=t??n.positiveCallback,this}emitByPositive(t){return this.emitByPositiveCondition=t??n.negativeCallback,this}emitMatch(t){return this.emitMatchCondition=t??n.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(t){this.value=t}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=t;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++)this.unSubscribe(this.listenersForUnsubscribe[e]);this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,t)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const s=new i(this,!1);return s.subscribe(t,e),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}(()=>{var t,e,n=s(390);function i(t){return`qsi-${t}`}function o(t,e){return t?t.getAttribute(i(e)):""}function r(t,e,s){t&&t.setAttribute(i(e),s)}function a(t,e){t&&t.removeAttribute(i(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val",t.QSI_BIND="qsi-bind"}(e||(e={}));var h=s(512),u=s(951);const c=":";var l;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(l||(l={}));const d=window,m=document,_=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,b=(function(){const t=navigator.userAgentData;if(t&&t.mobile)return!0;if(t&&_.test(t.platform))return!0;if(_.test(navigator.userAgent)||_.test(navigator.platform))return!0;const e=d.matchMedia;e&&e("(pointer:coarse)").matches}(),d.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),E="_______$$bool";function f(s){class r extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=r.ahe_Counter,r.ahe_Counter++,this.onAdopted$=new n.cP(!1),this.onInit$=new n.cP(!1),this.onDestroy$=new n.cP(!1),this.attributeChanged$=new n.cP(void 0),this.beforeDetectChanges$=new n.cP(!1),this.onChangesDetected$=new n.cP(!1),this.onDataCatch$=new n.cP(void 0),this.onParentChanelReady$=new n.cP(void 0),this.ahe_clr=new h.g,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_bindFunctions=[],this.ahe_bindValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=s,this.ahe_component=new s.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){o(this,t.ON_IF)&&!this.ahe_component[E]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&this.tagName.toLowerCase()!==e.QSI_BIND&&(function(e){const s=e.querySelectorAll(`*:not([${i(t.INFO)}])`);for(let t=0;t<s.length;t++)p(e,C(e,s[t]))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!o(this,t.ON_IF)||this.ahe_component[E]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&this.tagName.toLowerCase()!==e.QSI_BIND&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_bindFunctions.length=0,this.ahe_bindValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[E]=!0}attributeChangedCallback(t,e,s){this.attributeChanged$.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&this.ahe_ForOfList.length&&function(t){const e=t.ahe_ForOfList;for(let s=0;s<e.length;s++){const n=e[s];p(t,v(t,n.children,t.ahe_component[n.valueName],n.parent,n.template))}}(this),function(t){for(let e=0;e<t.ahe_IfList.length;e++){const s=t.ahe_IfList[e];let n=s.isFunction?!!t.ahe_component[s.valueName]():!!t.ahe_component[s.valueName];if(s.isInversion&&(n=!n),n===s.oldCondition)continue;s.oldCondition=n;const i=s.ifParent.contains(s.ifElement);n?i||x(s.ifParent,s.ifElement):i&&w(s.ifParent,s.ifElement)}}(this),function(t){for(let e=0;e<t.ahe_ClsIfList.length;e++){const s=t.ahe_ClsIfList[e],n=s.classConditions,i=s.element,o=t.ahe_component;for(let t=0;t<n.length;t++){const e=n[t];let s;if(e.isConditionDisabled)s=l.TRUE;else{let t=e.isFunction?!!o[e.conditionName]():!!o[e.conditionName];e.isInversion&&(t=!t),s=t?l.TRUE:l.FALSE}if(s===e.oldCondition)continue;e.oldCondition=s;const r=e.firstClassName,a=e.secondClassName;a?s===l.TRUE?(U(i,[r]),M(i,[a])):(U(i,[a]),M(i,[r])):e.isConditionDisabled||s===l.TRUE?U(i,[r]):M(i,[r])}}}(this),function(t){for(let e=0;e<t.ahe_bindValues.length;e++){const s=t.ahe_bindValues[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_bindFunctions.length;e++){const s=t.ahe_bindFunctions[e],n=t.ahe_component[s.valueName]();s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nValues.length;e++){const s=t.ahe_nValues[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nFunctions.length;e++){const s=t.ahe_nFunctions[e],n=t.ahe_component[s.valueName]();s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t){if(t.isCustomAppElement)return t;if(t.ahe_component&&t.sendData)return t.isCustomAppElement=!0,t}}transferToChanel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((s=>{t().sendData(e(s))}))}sendToChanel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return r.ahe_Counter=0,r}function p(s,n){if(!n.length)return;let i="[";if(n.length>1){for(let e=0;e<n.length;e++){const o=n[e];i+=D(s,o),r(o,t.INFO,i.trim()+"]"),o.ahe_parent_chanel=s,o.onParentChanelReady$.next(s)}return}const h=n[0];!function(t,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE){if(!s.innerHTML)return!1;const e=T(t,s.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:s,valueName:e.valueName,lastData:b}),!0):(t.ahe_nValues.push({textElement:s,valueName:e.valueName,lastData:b}),!0)}return!1}(s,h)?function(t,s){if(s.tagName.toLowerCase()===e.QSI_BIND){if(!s.innerHTML)return!1;const e=T(t,s.innerHTML);return e.isFunction?(t.ahe_bindFunctions.push({textElement:s,valueName:e.valueName,lastData:b}),!0):(t.ahe_bindValues.push({textElement:s,valueName:e.valueName,lastData:b}),!0)}return!1}(s,h)?r(h,t.INFO,i+"bind]"):(i+=function(e,s){const n=function(t,e){const s=o(t,e);return s?(a(t,e),s):""}(s,t.INJECT_TO);return n?(e.ahe_component[n]=s,"inj "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_CLICK);return n?(s.onclick=t=>O(e,n,t),"clk "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_LEAVE);return n?(s.onmouseleave=t=>O(e,n,t),"mlv "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_ENTER);return n?(s.onmouseenter=t=>O(e,n,t),"mer "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_UP);return n?(s.onmouseup=t=>O(e,n,t),"mup "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_DOWN);return n?(s.onmousedown=t=>O(e,n,t),"mdn "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_MOVE);return n?(s.onmousemove=t=>O(e,n,t),"mmv "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_KEY_DOWN);return n?(s.onkeydown=t=>O(e,n,t),"kdn "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_KEY_UP);return n?(s.onkeyup=t=>O(e,n,t),"kup "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_KEY_DBL_CLICK);return n?(s.ondblclick=t=>O(e,n,t),"dbc "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_SCROLL);return n?(s.onscroll=t=>O(e,n,t),"scl "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_WHEEL);return n?(s.onwheel=t=>O(e,n,t),"whl "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_CHANGE);return n?(s.onchange=t=>O(e,n,t),"chg "):""}(s,h),i+=function(e,s){const n=o(s,t.ON_HANDLE);return n?(A(e,n,s),a(s,t.ON_HANDLE),"elt "):""}(s,h),i+=D(s,h),i+=function(e,s){let n=o(s,t.CLASS_IF);if(!n)return"";const i=n.split(" "),r=[],h={element:s,classConditions:r};for(let t=0;t<i.length;t++){const s=i[t];if(s.includes("?")){const t=s.split("?"),n=T(e,t[0]),i=t[1].split(c);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:l.UNDEFINED,firstClassName:i[0],secondClassName:i[1]})}else if(s.includes(c)){const t=s.split(c),n=T(e,t[1]);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:l.UNDEFINED,firstClassName:t[0],secondClassName:""})}else r.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:l.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfList.push(h),a(s,t.CLASS_IF),"cls "}(s,h),r(h,t.INFO,i.trim()+"]"),h.isCustomAppElement&&(h.ahe_parent_chanel=s,h.onParentChanelReady$.next(s))):r(h,t.INFO,i+"var]")}function D(s,n){let i=o(n,t.ON_IF);if(!i)return"";const h=$(e.TEXT_VALUE),u=n.parentElement,c=T(s,i);return s.ahe_IfList.push({ifElement:n,valueName:c.valueName,ifParent:h,oldCondition:!1,isInversion:c.isInversion,isFunction:c.isFunction}),u.insertBefore(h,n),w(u,n),a(n,t.ON_IF),r(h,t.INFO,"[ifp]"),"ifc "}const N=[0];function C(s,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE)return(N[0]=n)&&N;if(n.tagName.toLowerCase()===e.QSI_BIND)return(N[0]=n)&&N;if(!s.isAppElement(n))return(N[0]=n)&&N;const i=o(n,t.FOR);if(!i)return(N[0]=n)&&N;const h=s.ahe_component[i];if(!h)return(N[0]=n)&&N;const u=$(e.TEXT_VALUE),c=n.parentElement,l=v(s,[],h,u,n);return r(u,t.INFO,"[for-of]"),c.insertBefore(u,n),w(c,n),a(n,t.FOR),s.ahe_ForOfList.push({parent:u,template:n,children:l,valueName:i}),l}function g(t,e,s){s.isAppElement(e)&&e.sendData(t)}function v(e,s,n,i,a){const h=[],c=s.length,l=n.length;let d=l-c;if(!(l+c))return h;if(d>0){for(let u=0;u<d;u++){const c=$(a.tagName);s.push(c),h.push(c);const m=o(a,t.ON_IF);m&&r(c,t.ON_IF,m),x(i,c),g(n[l-d+u],c,e)}for(let t=0;t<l-d;t++)g(n[t],s[t],e)}else{d*=-1;for(let t=0;t<d;t++){const t=s.pop(),n=e.ahe_IfList;let o;for(let e=0;e<n.length;e++){const s=n[e];if(s.ifElement===t){o=s;break}}o?((0,u.quickDeleteFromArray)(n,o),w(i,o.ifParent)):w(i,t)}for(let t=0;t<l;t++)g(n[t],s[t],e)}return h}function T(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_component[n]}}function O(t,e,s){t.ahe_component[e](s)}function F(t,e,s){const n=o(e,s);return n?(A(t,n,e),a(e,s),n):""}function A(t,e,s){const n=t.ahe_component[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_number]||(n.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_number].push(s))}const y="{display: contents !important;}",P=[`html-block ${y}`];function I(t){for(let e=0;e<t.length;e++)P.push(`${t[e].tagName} ${y}`);q((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].targetElement)}))}function S(t,e,s){return{tagName:e,targetElement:f({template:s,element:t})}}let L;function $(t){return m.createElement(t)}function R(t){const e=$("style");return e.innerHTML=t,e}function M(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])}function U(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])}function x(t,e){t&&e&&t.appendChild(e)}function w(t,e){t&&e&&t.removeChild(e)}const k=new n.cP(!1);let B,V,Y,H,j=!1;function q(t){k.pipe().setOnce().subscribe((e=>e&&t())),function(){if(m.body)return void k.next(!0);if(j)return;j=!0;const t=()=>{k.next(!0),m.removeEventListener("DOMContentLoaded",t),j=!1};m.addEventListener("DOMContentLoaded",t)}()}const K=new class{constructor(t,e,s,n){B=t,V=e,Y=s,H=n,L=this}set major(t){V=t}set minor(t){Y=t}set patch(t){H=t}set name(t){B=t}get version(){return`${V}.${Y}.${H}`}get name(){return B}get description(){return`[${B} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){L?console.log(L.description,...t):console.log("APP",...t)}("STARTED")}}("tick_generator",1,0,0);var X;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(X||(X={}));const G=new n.cP(X.EN),Q=new class{get currentLocation(){return G.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return G.subscribe(t)}setLocation(t){G.next(t)}destroy(){G.destroy()}};var W,z;function J(t){return{isApplied:!0,state:t}}function Z(t){return{isApplied:!1,state:t}}!function(t){t.INIT="INIT",t.STARTED="STARTED",t.STOPPED="STOPPED",t.PROCESS="PROCESS",t.DESTROYED="DESTROYED",t.UNDEFINED="UNDEFINED",t.DELETED="DELETED",t.READY="READY"}(W||(W={})),function(t){t.NEGATIVE_DELAY="Delay must be a positive number.",t.TYPE_INVALID="TYPE_INVALID",t.NAME_IS_NOT_PRESENT="NAME_IS_NOT_PRESENT",t.INSTANCE_DESTROYED="INSTANCE_DESTROYED"}(z||(z={}));class tt{constructor(){this.state$=new n.cP(W.UNDEFINED)}get state(){return this.state$.isDestroyed?W.DESTROYED:this.state$.getValue()??W.UNDEFINED}start(){if(this.isDestroyed())return Z(W.DESTROYED);const t=this.startProcess();return t.isApplied?this.getPositive(t):t}stop(){if(this.isDestroyed())return Z(W.DESTROYED);const t=this.stopProcess();return t.isApplied?this.getPositive(t):t}destroy(){return this.stop(),this.state$.next(W.DESTROYED),this.state$.destroy(),J(W.DESTROYED)}subscribeOnState(t){if(!this.isDestroyed())return this.state$.subscribe(t)}subscribeOnProcess(t){if(!this.isDestroyed())return this.state$.pipe()?.emitByPositive((t=>t===W.PROCESS)).subscribe(t)}isDestroyed(){return this.state===W.DESTROYED}getPositive(t){return this.state$.next(t.state),J(t.state)}}class et extends tt{constructor(){super(),this.fps=60,this.rafId=null}setFPS(t){const e=this.state;return this.isDestroyed()?Z(W.DESTROYED):e===W.STARTED?Z(e):t<1?Z(z.NEGATIVE_DELAY):(this.fps=t,J(this.state))}set60fps(){return this.setFPS(60)}set30fps(){return this.setFPS(30)}setDefault(){return this.setFPS(60)}startProcess(){if(this.rafId)return Z(W.STARTED);let t=Math.floor(performance.now());const e=Math.floor(1e3/this.fps),s=n=>{n=Math.floor(n),this.rafId=requestAnimationFrame(s);const i=n-t;i>=e&&(t=n-i%e,this.state$.next(W.PROCESS))};return this.rafId=requestAnimationFrame(s),J(W.STARTED)}stopProcess(){return this.rafId?(cancelAnimationFrame(this.rafId),this.rafId=null,J(W.STOPPED)):Z(z.NEGATIVE_DELAY)}}class st{constructor(t){this.subject=t,this.defaultPeriodMs=1e3,this.periodMs=0,this.sum=0,this.counter=0,this.counter$=new n.cP(this.counter),this._state=W.UNDEFINED,this.init()}get state(){return this._state}getTicksPerPeriod(){return this.counter}getTicksSum(){return this.sum}resetPeriod(){return this.isDestroyed()&&Z(z.INSTANCE_DESTROYED),this.state===W.STARTED&&Z(this.state),this.periodMs=this.defaultPeriodMs,J(this.state)}setPeriod(t){return this.isDestroyed()&&Z(z.INSTANCE_DESTROYED),this.state===W.STARTED&&Z(this.state),"number"!=typeof t||t<0?{isApplied:!1,state:z.TYPE_INVALID}:(this.periodMs=t,J(this.state))}subscribe(t){if(!this.isDestroyed())return this.counter$.subscribe(t)}start(){this.isDestroyed()&&Z(z.INSTANCE_DESTROYED),this.state===W.STARTED&&Z(this.state);let t=0;return this.subscriber=this.subject.subscribeOnProcess((()=>{t++,this.sum++})),this.timer=setInterval((()=>{this.counter=t,t=0,this.counter$.next(this.counter),this._state=W.READY}),this.periodMs),this._state=W.STARTED,J(this.state)}stop(){return this.isDestroyed()&&Z(z.INSTANCE_DESTROYED),this.timer&&clearInterval(this.timer),this.subscriber?.unsubscribe(),this.counter=0,this.sum=0,this._state=W.STOPPED,J(this.state)}isDestroyed(){return this._state===W.DESTROYED}destroy(){return this.stop(),this.counter$.destroy(),this._state=W.DESTROYED,J(this.state)}init(){this._state=W.INIT,this.resetPeriod()}}const nt=L.name;let it="";for(let t=0;t<nt.length;t++){const e=nt[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}it+=s||"-"}const ot="app-"+it,rt=[S(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},ot,"<app-main></app-main>"),S(class{constructor(t){this.root=t,this.runningSting="-----------[TEST-FPS-PROCESSING]-----------",this.strArr=this.runningSting.split(""),this.init(t)}onCreate(){}onInit(){this.fpsTxt=this.getFpsTxt(),this.root.detectChanges(),this.animationFrame.setDefault(),this.animationFrame.subscribeOnState((t=>this.showText(t))),this.counter.subscribe((t=>this.showFps(t))),this.animationFrame.start(),this.counter.start()}onDestroy(){this.animationFrame.stop(),this.counter.stop()}set60Fps(){this.animationFrame.set60fps(),this.chosenFps=60}set30Fps(){this.animationFrame.setFPS(30),this.chosenFps=30}start(){this.animationFrame.start(),this.counter.start()}stop(){this.animationFrame.stop(),this.counter.stop(),this.showFps(0)}setCustomFps(t){this.chosenFps=+t.target.value,"number"==typeof this.chosenFps&&this.animationFrame.setFPS(this.chosenFps)}init(t){this.name=t.tagName,this.fpsCounter=0,this.fpsTxt="",this.animationFrame=new et,this.counter=new st(this.animationFrame),this.isStop=!0,this.animationState="",this.chosenFps=60}getFpsTxt(){return`${this.fpsCounter} fps`}showText(t){this.animationState=t;const e=this.strArr.shift();this.strArr.push(e),this.runningSting=this.strArr.join(""),this.root.detectChanges()}showFps(t){this.fpsCounter=t,this.fpsTxt=this.getFpsTxt(),this.isStop=!this.fpsCounter,this.root.detectChanges()}},"app-main","<div class='L-9_F-fJr'><qsi-bind>runningSting</qsi-bind></div><div class='J31PIZO3w' qsi-cls='isStop?j66JxXyvt:y_9hlQL_e'><qsi-bind>fpsTxt</qsi-bind></div><div> animation state: <qsi-bind>animationState</qsi-bind></div><div> chosen fps: <qsi-bind>chosenFps</qsi-bind></div><input class='L_6WG0cSq' placeholder='insert FPS' qsi-change='setCustomFps' type='text'><div class='L_6WG0cSq' qsi-click='set60Fps'> set 60 fps</div><div class='L_6WG0cSq' qsi-click='set30Fps'> set 30 fps</div><div class='L_6WG0cSq y_9hlQL_e' qsi-click='start'> start</div><div class='L_6WG0cSq j66JxXyvt' qsi-click='stop'> stop</div>")],at=f({template:"",element:class{}}),ht=f({template:"",element:class{}});I([{tagName:e.TEXT_VALUE,targetElement:at},{tagName:e.QSI_BIND,targetElement:ht}]);const ut=new class{constructor(){this.isComponentMode=!1}register(t){I(t)}run(t){this.isComponentMode=!!t,q((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=$(ot))}start(){const t=R(P.join("")),e=R(".J31PIZO3w {width: 100px;height: 100px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;font-size: 30px;border-radius: 50%;}.y_9hlQL_e {background: #69e49a;}.j66JxXyvt {background: #e46969;}.L-9_F-fJr {font-size: 60px;}.L_6WG0cSq {width: 120px;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;border: 1px solid black;margin: 5px;padding: 5px;border-radius: 10px;}.L_6WG0cSq:hover {opacity: 0.5;}");x(m.head,t),x(m.head,e),!this.isComponentMode&&x(m.body,this.appElement)}};K.init(),Q.setLocation(X.EN),ut.register(rt),ut.run()})()})();