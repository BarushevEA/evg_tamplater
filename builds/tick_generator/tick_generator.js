(()=>{"use strict";var t={512:(t,e,s)=>{e.g=void 0;const n=s(951);e.g=class{list=[];_isDestroyed=!1;collect(...t){this._isDestroyed||this.list.push(...t)}unsubscribe(t){this._isDestroyed||(t?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,t))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sortDescending=e.sortAscending=e.randomCallback=e.positiveCallback=e.negativeCallback=e.quickDeleteFromArray=e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t.splice(s,1),!0)},e.quickDeleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)},e.negativeCallback=()=>!1,e.positiveCallback=()=>!0,e.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124",e.sortAscending=(t,e)=>t.order>e.order?1:t.order<e.order?-1:0,e.sortDescending=(t,e)=>t.order>e.order?-1:t.order<e.order?1:0},390:(t,e,s)=>{e.cP=void 0;const n=s(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(t,e){this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const s=e.listener;return s&&e.observable?e.isListenPaused?void 0:e.isPipe?e.emitByPositiveCondition&&e.emitByPositiveCondition(t)||e.emitByNegativeCondition&&!e.emitByNegativeCondition(t)?s(t):e.once.isOnce?(e.once.isFinished=!0,s(t),e.unsubscribe()):e.unsubscribeByNegativeCondition?e.unsubscribeByNegativeCondition(t)?s(t):(e.unsubscribeByNegativeCondition=null,e.unsubscribe()):e.unsubscribeByPositiveCondition?e.unsubscribeByPositiveCondition(t)?(e.unsubscribeByPositiveCondition=null,e.unsubscribe()):s(t):e.emitMatchCondition&&e.emitMatchCondition(t)===t?s(t):void 0:s(t):e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return this.unsubscribeByNegativeCondition=t??n.negativeCallback,this}unsubscribeByPositive(t){return this.unsubscribeByPositiveCondition=t??n.positiveCallback,this}emitByNegative(t){return this.emitByNegativeCondition=t??n.positiveCallback,this}emitByPositive(t){return this.emitByPositiveCondition=t??n.negativeCallback,this}emitMatch(t){return this.emitMatchCondition=t??n.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(t){this.value=t}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=t;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++)this.unSubscribe(this.listenersForUnsubscribe[e]);this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,t)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const s=new i(this,!1);return s.subscribe(t,e),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,s),r.exports}(()=>{var t,e,n=s(390);function i(t){return`qsi-${t}`}function r(t,e){return t?t.getAttribute(i(e)):""}function o(t,e,s){t&&t.setAttribute(i(e),s)}function a(t,e){t&&t.removeAttribute(i(e))}!function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val",t.QSI_BIND="qsi-bind"}(e||(e={}));var u=s(512),c=s(951);const h=":";var l;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(l||(l={}));const d=window,m=document,f=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,p=(function(){const t=navigator.userAgentData;if(t&&t.mobile)return!0;if(t&&f.test(t.platform))return!0;if(f.test(navigator.userAgent)||f.test(navigator.platform))return!0;const e=d.matchMedia;e&&e("(pointer:coarse)").matches}(),d.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),E="_______$$bool";function b(s){class o extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=o.ahe_Counter,o.ahe_Counter++,this.onAdopted$=new n.cP(!1),this.onInit$=new n.cP(!1),this.onDestroy$=new n.cP(!1),this.attributeChanged$=new n.cP(void 0),this.beforeDetectChanges$=new n.cP(!1),this.onChangesDetected$=new n.cP(!1),this.onDataCatch$=new n.cP(void 0),this.onParentChanelReady$=new n.cP(void 0),this.ahe_clr=new u.g,this.ahe_nFunctions=[],this.ahe_sourceComponents=[],this.ahe_nValues=[],this.ahe_bindFunctions=[],this.ahe_bindValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=s,this.ahe_component=new s.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,t.ON_IF)&&!this.ahe_component[E]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&this.tagName.toLowerCase()!==e.QSI_BIND&&(function(e){const s=e.querySelectorAll(`*:not([${i(t.INFO)}])`);for(let t=0;t<s.length;t++)_(e,P(e,s[t]))}(this),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit(),this.detectChanges(!0)))}disconnectedCallback(){!r(this,t.ON_IF)||this.ahe_component[E]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&this.tagName.toLowerCase()!==e.QSI_BIND&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_sourceComponents.length=0,this.ahe_nValues.length=0,this.ahe_bindFunctions.length=0,this.ahe_bindValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[E]=!0}attributeChangedCallback(t,e,s){this.attributeChanged$.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&this.ahe_ForOfList.length&&function(t){const e=t.ahe_ForOfList;for(let s=0;s<e.length;s++){const n=e[s];_(t,y(t,n.children,t.ahe_component[n.valueName],n.parent,n.template))}}(this),function(t){for(let e=0;e<t.ahe_IfList.length;e++){const s=t.ahe_IfList[e];let n=s.isFunction?!!t.ahe_component[s.valueName]():!!t.ahe_component[s.valueName];if(s.isInversion&&(n=!n),n===s.oldCondition)continue;s.oldCondition=n;const i=s.ifParent.contains(s.ifElement);n?i||$(s.ifParent,s.ifElement):i&&H(s.ifParent,s.ifElement)}}(this),function(t){for(let e=0;e<t.ahe_ClsIfList.length;e++){const s=t.ahe_ClsIfList[e],n=s.classConditions,i=s.element,r=t.ahe_component;for(let t=0;t<n.length;t++){const e=n[t];let s;if(e.isConditionDisabled)s=l.TRUE;else{let t=e.isFunction?!!r[e.conditionName]():!!r[e.conditionName];e.isInversion&&(t=!t),s=t?l.TRUE:l.FALSE}if(s===e.oldCondition)continue;e.oldCondition=s;const o=e.firstClassName,a=e.secondClassName;a?s===l.TRUE?(R(i,[o]),w(i,[a])):(R(i,[a]),w(i,[o])):e.isConditionDisabled||s===l.TRUE?R(i,[o]):w(i,[o])}}}(this),function(t){for(let e=0;e<t.ahe_bindValues.length;e++){const s=t.ahe_bindValues[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_sourceComponents.length;e++){const s=t.ahe_sourceComponents[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.src=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_bindFunctions.length;e++){const s=t.ahe_bindFunctions[e],n=t.ahe_component[s.valueName]();s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nValues.length;e++){const s=t.ahe_nValues[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nFunctions.length;e++){const s=t.ahe_nFunctions[e],n=t.ahe_component[s.valueName]();s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChannel(t){if(t){if(t.isCustomAppElement)return t;if(t.ahe_component&&t.sendData)return t.isCustomAppElement=!0,t}}transferToChannel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((s=>{t().sendData(e(s))}))}sendToChannel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChannel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return o.ahe_Counter=0,o}function _(s,n){if(!n.length)return;let i="[";if(n.length>1){for(let e=0;e<n.length;e++){const r=n[e];i+=D(s,r),o(r,t.INFO,i.trim()+"]"),r.ahe_parent_chanel=s,r.onParentChanelReady$.next(s)}return}const u=n[0];!function(t,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE){if(!s.innerHTML)return!1;const e=N(t,s.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:s,valueName:e.valueName,lastData:p}),!0):(t.ahe_nValues.push({textElement:s,valueName:e.valueName,lastData:p}),!0)}return!1}(s,u)?function(t,s){if(s.tagName.toLowerCase()===e.QSI_BIND){if(!s.innerHTML)return!1;const e=N(t,s.innerHTML);return e.isFunction?(t.ahe_bindFunctions.push({textElement:s,valueName:e.valueName,lastData:p}),!0):(t.ahe_bindValues.push({textElement:s,valueName:e.valueName,lastData:p}),!0)}return!1}(s,u)?o(u,t.INFO,i+"bind]"):(i+=function(e,s){const n=v(s,t.INJECT_TO);return n?(e.ahe_component[n]=s,"inj "):""}(s,u),i+=function(e,s){const n=v(s,t.SOURCE);if(!n)return"";if(!(n in e.ahe_component))return"";const i=e.ahe_component[n];return e.ahe_sourceComponents.push({textElement:s,valueName:n,lastData:i??p}),s.src=i,"src "}(s,u),i+=function(e,s){const n=T(e,s,t.ON_CLICK);return n?(s.onclick=t=>C(e,n,t),"clk "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_MOUSE_LEAVE);return n?(s.onmouseleave=t=>C(e,n,t),"mlv "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_MOUSE_ENTER);return n?(s.onmouseenter=t=>C(e,n,t),"mer "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_MOUSE_UP);return n?(s.onmouseup=t=>C(e,n,t),"mup "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_MOUSE_DOWN);return n?(s.onmousedown=t=>C(e,n,t),"mdn "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_MOUSE_MOVE);return n?(s.onmousemove=t=>C(e,n,t),"mmv "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_KEY_DOWN);return n?(s.onkeydown=t=>C(e,n,t),"kdn "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_KEY_UP);return n?(s.onkeyup=t=>C(e,n,t),"kup "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_KEY_DBL_CLICK);return n?(s.ondblclick=t=>C(e,n,t),"dbc "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_SCROLL);return n?(s.onscroll=t=>C(e,n,t),"scl "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_WHEEL);return n?(s.onwheel=t=>C(e,n,t),"whl "):""}(s,u),i+=function(e,s){const n=T(e,s,t.ON_CHANGE);return n?(s.onchange=t=>C(e,n,t),"chg "):""}(s,u),i+=function(e,s){const n=r(s,t.ON_HANDLE);return n?(S(e,n,s),a(s,t.ON_HANDLE),"elt "):""}(s,u),i+=D(s,u),i+=function(e,s){let n=r(s,t.CLASS_IF);if(!n)return"";const i=n.split(" "),o=[],u={element:s,classConditions:o};for(let t=0;t<i.length;t++){const s=i[t];if(s.includes("?")){const t=s.split("?"),n=N(e,t[0]),i=t[1].split(h);o.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:l.UNDEFINED,firstClassName:i[0],secondClassName:i[1]})}else if(s.includes(h)){const t=s.split(h),n=N(e,t[1]);o.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:l.UNDEFINED,firstClassName:t[0],secondClassName:""})}else o.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:l.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfList.push(u),a(s,t.CLASS_IF),"cls "}(s,u),o(u,t.INFO,i.trim()+"]"),u.isCustomAppElement&&(u.ahe_parent_chanel=s,u.onParentChanelReady$.next(s))):o(u,t.INFO,i+"var]")}function D(s,n){let i=r(n,t.ON_IF);if(!i)return"";const u=L(e.TEXT_VALUE),c=n.parentElement,h=N(s,i);return s.ahe_IfList.push({ifElement:n,valueName:h.valueName,ifParent:u,oldCondition:!1,isInversion:h.isInversion,isFunction:h.isFunction}),c.insertBefore(u,n),H(c,n),a(n,t.ON_IF),o(u,t.INFO,"[ifp]"),"ifc "}const O=[0];function P(s,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE)return(O[0]=n)&&O;if(n.tagName.toLowerCase()===e.QSI_BIND)return(O[0]=n)&&O;if(!s.isAppElement(n))return(O[0]=n)&&O;const i=r(n,t.FOR);if(!i)return(O[0]=n)&&O;const u=s.ahe_component[i];if(!u)return(O[0]=n)&&O;const c=L(e.TEXT_VALUE),h=n.parentElement,l=y(s,[],u,c,n);return o(c,t.INFO,"[for-of]"),h.insertBefore(c,n),H(h,n),a(n,t.FOR),s.ahe_ForOfList.push({parent:c,template:n,children:l,valueName:i}),l}function g(t,e,s){s.isAppElement(e)&&e.sendData(t)}function y(e,s,n,i,a){const u=[],h=s.length,l=n.length;let d=l-h;if(!(l+h))return u;if(d>0){for(let c=0;c<d;c++){const h=L(a.tagName);s.push(h),u.push(h);const m=r(a,t.ON_IF);m&&o(h,t.ON_IF,m),$(i,h),g(n[l-d+c],h,e)}for(let t=0;t<l-d;t++)g(n[t],s[t],e)}else{d*=-1;for(let t=0;t<d;t++){const t=s.pop(),n=e.ahe_IfList;let r;for(let e=0;e<n.length;e++){const s=n[e];if(s.ifElement===t){r=s;break}}r?((0,c.quickDeleteFromArray)(n,r),H(i,r.ifParent)):H(i,t)}for(let t=0;t<l;t++)g(n[t],s[t],e)}return u}function N(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_component[n]}}function C(t,e,s){t.ahe_component[e](s)}function T(t,e,s){const n=r(e,s);return n?(S(t,n,e),a(e,s),n):""}function v(t,e){const s=r(t,e);return s?(a(t,e),s):""}function S(t,e,s){const n=t.ahe_component[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_number]||(n.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_number].push(s))}const M="{display: contents !important;}",A=[`html-block ${M}`];function U(t){for(let e=0;e<t.length;e++)A.push(`${t[e].tagName} ${M}`);K((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].targetElement)}))}function I(t,e,s){return{tagName:e,targetElement:b({template:s,element:t})}}let F;function L(t){return m.createElement(t)}function x(t){const e=L("style");return e.innerHTML=t,e}function w(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])}function R(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])}function $(t,e){t&&e&&t.appendChild(e)}function H(t,e){t&&e&&t.removeChild(e)}const k=new n.cP(!1);let Y,B,V,j,q=!1;function K(t){k.pipe().setOnce().subscribe((e=>e&&t())),function(){if(m.body)return void k.next(!0);if(q)return;q=!0;const t=()=>{k.next(!0),m.removeEventListener("DOMContentLoaded",t),q=!1};m.addEventListener("DOMContentLoaded",t)}()}const X=new class{constructor(t,e,s,n){Y=t,B=e,V=s,j=n,F=this}set major(t){B=t}set minor(t){V=t}set patch(t){j=t}set name(t){Y=t}get version(){return`${B}.${V}.${j}`}get name(){return Y}get description(){return`[${Y} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){F?console.log(F.description,...t):console.log("APP",...t)}("STARTED")}}("tick_generator",1,0,0);var G;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(G||(G={}));const Q=new n.cP(G.EN),W=new class{get currentLocation(){return Q.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return Q.subscribe(t)}setLocation(t){Q.next(t)}destroy(){Q.destroy()}};var z,J;function Z(t){return{isApplied:!0,state:t}}function tt(t){return{isApplied:!1,state:t}}function et(t,e){return t>e?t:e}function st(t,e){return 0===t?e:0===e?t:t>e?e:t}function nt(t,e){return Math.round((t+e)/2)}!function(t){t.INIT="INIT",t.STARTED="STARTED",t.STOPPED="STOPPED",t.PROCESS="PROCESS",t.DESTROYED="DESTROYED",t.UNDEFINED="UNDEFINED",t.DELETED="DELETED",t.READY="READY"}(z||(z={})),function(t){t.NEGATIVE_DELAY="Delay must be a positive number.",t.TYPE_INVALID="TYPE_INVALID",t.NAME_IS_NOT_PRESENT="NAME_IS_NOT_PRESENT",t.INSTANCE_DESTROYED="INSTANCE_DESTROYED"}(J||(J={}));class it{constructor(){this.state$=new n.cP(z.UNDEFINED)}get state(){return this.state$.isDestroyed?z.DESTROYED:this.state$.getValue()??z.UNDEFINED}start(){if(this.isDestroyed())return tt(z.DESTROYED);const t=this.startProcess();return t.isApplied?this.getPositive(t):t}stop(){if(this.isDestroyed())return tt(z.DESTROYED);const t=this.stopProcess();return t.isApplied?this.getPositive(t):t}destroy(){return this.stop(),this.state$.next(z.DESTROYED),this.state$.destroy(),Z(z.DESTROYED)}subscribeOnState(t){if(!this.isDestroyed())return this.state$.subscribe(t)}subscribeOnProcess(t){if(!this.isDestroyed())return this.state$.pipe()?.emitByPositive((t=>t===z.PROCESS)).subscribe(t)}isDestroyed(){return this.state===z.DESTROYED}getPositive(t){return this.state$.next(t.state),Z(t.state)}}class rt extends it{constructor(){super(),this.fps=60,this.rafId=null}setFPS(t){const e=this.state;return this.isDestroyed()?tt(z.DESTROYED):e===z.STARTED?tt(e):t<1?tt(J.NEGATIVE_DELAY):(this.fps=t,Z(this.state))}set60fps(){return this.setFPS(60)}set30fps(){return this.setFPS(30)}setDefault(){return this.setFPS(60)}startProcess(){if(this.rafId)return tt(z.STARTED);let t=Math.floor(performance.now());const e=Math.floor(1e3/this.fps),s=n=>{n=Math.floor(n),this.rafId=requestAnimationFrame(s);const i=n-t;i>=e&&(t=n-i%e,this.state$.next(z.PROCESS))};return this.rafId=requestAnimationFrame(s),Z(z.STARTED)}stopProcess(){return this.rafId?(cancelAnimationFrame(this.rafId),this.rafId=null,Z(z.STOPPED)):tt(J.NEGATIVE_DELAY)}}class ot{constructor(t){this.subject=t,this._state=z.UNDEFINED,this.defaultPeriodMs=1e3,this.periodMs=0,this.sum=0,this.counter=0,this.counter$=new n.cP(this.counter),this.init()}init(){this._state=z.INIT,this.resetPeriod()}get state(){return this._state}getTicksPerPeriod(){return this.counter}getTicksSum(){return this.sum}resetPeriod(){return this.isDestroyed()&&tt(J.INSTANCE_DESTROYED),this.state===z.STARTED&&tt(this.state),this.periodMs=this.defaultPeriodMs,Z(this.state)}setPeriod(t){return this.isDestroyed()&&tt(J.INSTANCE_DESTROYED),this.state===z.STARTED&&tt(this.state),"number"!=typeof t||t<0?{isApplied:!1,state:J.TYPE_INVALID}:(this.periodMs=t,Z(this.state))}subscribe(t){if(!this.isDestroyed())return this.counter$.subscribe(t)}start(){this.isDestroyed()&&tt(J.INSTANCE_DESTROYED),this.state===z.STARTED&&tt(this.state);let t=0;return this.subscriber=this.subject.subscribeOnProcess((()=>{t++,this.sum++})),this.timer=setInterval((()=>{this.counter=t,t=0,this.counter$.next(this.counter),this._state=z.READY}),this.periodMs),this._state=z.STARTED,Z(this.state)}stop(){return this.isDestroyed()&&tt(J.INSTANCE_DESTROYED),this.timer&&clearInterval(this.timer),this.subscriber?.unsubscribe(),this.counter=0,this.sum=0,this._state=z.STOPPED,Z(this.state)}isDestroyed(){return this._state===z.DESTROYED}destroy(){return this.stop(),this.counter$.destroy(),this._state=z.DESTROYED,Z(this.state)}}function at(t){return at="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},at(t)}function ut(t){var e=function(t,e){if("object"!=at(t)||!t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var n=s.call(t,"string");if("object"!=at(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==at(e)?e:String(e)}class ct extends it{constructor(){super(),this.intervalId=0,this.delay=0}setInterval(t){const e=this.state;return this.isDestroyed()?tt(z.DESTROYED):e===z.STARTED?tt(e):t<0?tt(J.NEGATIVE_DELAY):(this.delay=t,this.state$.next(z.INIT),Z(z.INIT))}startProcess(){return this.intervalId=setInterval((()=>{this.state$.next(z.PROCESS)}),this.delay),Z(z.STARTED)}stopProcess(){return clearInterval(this.intervalId),Z(z.STOPPED)}}function ht(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,n)}return s}class lt{constructor(){this.metrics={},this._state=z.STOPPED,this.perSecondTimer=new ct,this.perSecondTimer.setInterval(1e3),this.perMinuteTimer=new ct,this.perMinuteTimer.setInterval(6e4),this.perHourTimer=new ct,this.perHourTimer.setInterval(36e5),this.perDayTimer=new ct,this.perDayTimer.setInterval(864e5)}start(){return this.isDestroyed()?tt(J.INSTANCE_DESTROYED):(this.perSecondTimer.start(),this.perMinuteTimer.start(),this.perHourTimer.start(),this.perDayTimer.start(),Z(z.PROCESS))}get length(){return Object.keys(this.metrics).length}destroy(){return this.isDestroyed()?tt(J.INSTANCE_DESTROYED):(this.stop(),this.clearFunc(),this.perSecondTimer.destroy(),this.perMinuteTimer.destroy(),this.perHourTimer.destroy(),this.perDayTimer.destroy(),Z(z.DESTROYED))}isDestroyed(){return this._state===z.DESTROYED}get state(){return this._state}stop(){if(this.isDestroyed())return tt(J.INSTANCE_DESTROYED);this.perSecondTimer.stop(),this.perMinuteTimer.stop(),this.perHourTimer.stop(),this.perDayTimer.stop();for(const t in this.metrics){const e=this.metrics[t];e._counter.days=0,e._counter.hours=0,e._counter.minutes=0,e._counter.seconds=0}return Z(z.STOPPED)}deleteFunc(t){if(this.isDestroyed())return tt(J.INSTANCE_DESTROYED);if(t in this.metrics){const e=this.metrics[t];return e._deleteObj.isDeleted=!0,e._deleteObj=null,delete this.metrics[t],Z(z.DELETED)}return tt(J.NAME_IS_NOT_PRESENT)}decorate(t,e){if(this.isDestroyed())throw new Error(J.INSTANCE_DESTROYED);if(t in this.metrics)throw new Error(`A function with the name "${t}" is already decorated`);const s={isDeleted:!1};this.metrics[t]={countOfUses:0,countOfErrors:0,totalExecutionTime:0,timePerCall:0,countOfUsesPerSecond:0,countOfUsesPerMinute:0,countOfUsesPerHour:0,countOfUsesPerDay:0,countOfUsesPerDayAvg:0,countOfUsesPerDayMax:0,countOfUsesPerDayMin:0,countOfUsesPerHourAvg:0,countOfUsesPerHourMax:0,countOfUsesPerHourMin:0,countOfUsesPerMinuteAvg:0,countOfUsesPerMinuteMax:0,countOfUsesPerMinuteMin:0,countOfUsesPerSecondAvg:0,countOfUsesPerSecondMax:0,countOfUsesPerSecondMin:0,_deleteObj:s,_counter:{seconds:0,minutes:0,hours:0,days:0}};const n=this.metrics[t];return this.addTimers(s,n),(...t)=>{if(s.isDeleted)return e(...t);const i=Date.now();n.countOfUses++,n._counter.seconds++,n._counter.minutes++,n._counter.hours++,n._counter.days++;try{return e(...t)}catch(t){throw s.isDeleted||n.countOfErrors++,t}finally{s.isDeleted||(n.timePerCall=Date.now()-i,n.totalExecutionTime+=n.timePerCall)}}}clearFunc(){const t=[];for(const e in this.metrics)t.push(e);for(const e of t)this.deleteFunc(e)}getMetrics(t){const e=function(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?ht(Object(s),!0).forEach((function(e){var n,i,r;n=t,i=e,r=s[e],(i=ut(i))in n?Object.defineProperty(n,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[i]=r})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):ht(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}({},this.metrics[t]);return delete e._deleteObj,delete e._counter,e}getAll(){const t={};for(const e in this.metrics)t[e]=this.getMetrics(e);return t}addTimers(t,e){const s=e._counter;this.addTimer(t,this.perSecondTimer,(()=>{e.countOfUsesPerSecond=s.seconds,e.countOfUsesPerSecondMax=et(e.countOfUsesPerSecondMax,s.seconds),e.countOfUsesPerSecondMin=st(e.countOfUsesPerSecondMin,s.seconds),e.countOfUsesPerSecondAvg=nt(e.countOfUsesPerSecondAvg,s.seconds),e.countOfUsesPerMinute=s.minutes,e.countOfUsesPerMinuteMax=et(e.countOfUsesPerMinuteMax,s.minutes),e.countOfUsesPerMinuteMin=st(e.countOfUsesPerMinuteMin,s.minutes),e.countOfUsesPerMinuteAvg=nt(e.countOfUsesPerMinuteAvg,s.minutes),e.countOfUsesPerHour=s.hours,e.countOfUsesPerHourMax=et(e.countOfUsesPerHourMax,s.hours),e.countOfUsesPerHourMin=st(e.countOfUsesPerHourMin,s.hours),e.countOfUsesPerHourAvg=nt(e.countOfUsesPerHourAvg,s.hours),e.countOfUsesPerDay=s.days,e.countOfUsesPerDayMax=et(e.countOfUsesPerDayMax,s.days),e.countOfUsesPerDayMin=st(e.countOfUsesPerDayMin,s.days),e.countOfUsesPerDayAvg=nt(e.countOfUsesPerDayAvg,s.days),s.seconds=0})),this.addTimer(t,this.perMinuteTimer,(()=>{e.countOfUsesPerMinute=s.minutes,e.countOfUsesPerMinuteMax=et(e.countOfUsesPerMinuteMax,s.minutes),e.countOfUsesPerMinuteMin=st(e.countOfUsesPerMinuteMin,s.minutes),e.countOfUsesPerMinuteAvg=nt(e.countOfUsesPerMinuteAvg,s.minutes),e.countOfUsesPerHour=s.hours,e.countOfUsesPerHourMax=et(e.countOfUsesPerHourMax,s.hours),e.countOfUsesPerHourMin=st(e.countOfUsesPerHourMin,s.hours),e.countOfUsesPerHourAvg=nt(e.countOfUsesPerHourAvg,s.hours),e.countOfUsesPerDay=s.days,e.countOfUsesPerDayMax=et(e.countOfUsesPerDayMax,s.days),e.countOfUsesPerDayMin=st(e.countOfUsesPerDayMin,s.days),e.countOfUsesPerDayAvg=nt(e.countOfUsesPerDayAvg,s.days),s.minutes=0})),this.addTimer(t,this.perHourTimer,(()=>{e.countOfUsesPerHour=s.hours,e.countOfUsesPerHourMax=et(e.countOfUsesPerHourMax,s.hours),e.countOfUsesPerHourMin=st(e.countOfUsesPerHourMin,s.hours),e.countOfUsesPerHourAvg=nt(e.countOfUsesPerHourAvg,s.hours),e.countOfUsesPerDay=s.days,e.countOfUsesPerDayMax=et(e.countOfUsesPerDayMax,s.days),e.countOfUsesPerDayMin=st(e.countOfUsesPerDayMin,s.days),e.countOfUsesPerDayAvg=nt(e.countOfUsesPerDayAvg,s.days),s.hours=0})),this.addTimer(t,this.perDayTimer,(()=>{e.countOfUsesPerDay=s.days,e.countOfUsesPerDayMax=et(e.countOfUsesPerDayMax,s.days),e.countOfUsesPerDayMin=st(e.countOfUsesPerDayMin,s.days),e.countOfUsesPerDayAvg=nt(e.countOfUsesPerDayAvg,s.days),s.days=0}))}addTimer(t,e,s){const n=e.subscribeOnProcess((()=>{t.isDeleted?n?.unsubscribe():s()}))}}const dt=F.name;let mt="";for(let t=0;t<dt.length;t++){const e=dt[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}mt+=s||"-"}const ft="app-"+mt,pt=[I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},ft,"<app-main></app-main>"),I(class{constructor(t){this.root=t,this.runningSting="-----------[TEST-FPS-PROCESSING]-----------",this.strArr=this.runningSting.split(""),this.init(t)}onCreate(){}onInit(){this.fpsTxt=this.getFpsTxt(),this.animationFrame.setDefault(),this.animationFrame.subscribeOnState((t=>this.showText(t))),this.animationCounter.subscribe((t=>{this.showFps(t),this.showMetrics()})),this.animationFrame.start(),this.animationCounter.start()}onDestroy(){this.animationFrame.stop(),this.animationCounter.stop()}set60Fps(){this.animationFrame.set60fps(),this.chosenFps=60}set30Fps(){this.animationFrame.setFPS(30),this.chosenFps=30}start(){this.animationFrame.start(),this.animationCounter.start(),this.meter.start()}stop(){this.animationFrame.stop(),this.animationCounter.stop(),this.meter.stop(),this.showFps(0),console.log(this.meter.getAll())}setCustomFps(t){this.chosenFps=+t.target.value,"number"==typeof this.chosenFps&&this.animationFrame.setFPS(this.chosenFps)}init(t){this.name=t.tagName,this.fpsCounter=0,this.fpsTxt="",this.animationFrame=new rt,this.animationCounter=new ot(this.animationFrame),this.meter=new lt,this.isStop=!0,this.animationState="",this.chosenFps=60,this.addMetrics()}addMetrics(){this.onInit=this.meter.decorate("this.onInit",this.onInit.bind(this)),this.start=this.meter.decorate("this.start",this.start.bind(this)),this.stop=this.meter.decorate("this.stop",this.stop.bind(this)),this.getFpsTxt=this.meter.decorate("this.getFpsTxt",this.getFpsTxt.bind(this)),this.showText=this.meter.decorate("this.showText",this.showText.bind(this)),this.showFps=this.meter.decorate("this.showFps",this.showFps.bind(this)),this.meter.start(),this.metricName="this.showText",this.metricSeconds="0",this.metricSecondsMin="0",this.metricSecondsMax="0",this.metricSecondsAvg="0",this.metricMinutes="0",this.metricMinutesMin="0",this.metricMinutesMax="0",this.metricMinutesAvg="0",this.metricHours="0",this.metricHoursMin="0",this.metricHoursMax="0",this.metricHoursAvg="0"}getFpsTxt(){return`${this.fpsCounter} fps`}showText(t){this.animationState=t;const e=this.strArr.shift();this.strArr.push(e),this.runningSting=this.strArr.join(""),this.root.detectChanges()}showFps(t){this.fpsCounter=t,this.fpsTxt=this.getFpsTxt(),this.isStop=!this.fpsCounter,this.root.detectChanges()}showMetrics(){const t=this.meter.getMetrics(this.metricName);this.metricSeconds=""+t.countOfUsesPerSecond,this.metricSecondsMin=""+t.countOfUsesPerSecondMin,this.metricSecondsMax=""+t.countOfUsesPerSecondMax,this.metricSecondsAvg=""+t.countOfUsesPerSecondAvg,this.metricMinutes=""+t.countOfUsesPerMinute,this.metricMinutesMin=""+t.countOfUsesPerMinuteMin,this.metricMinutesMax=""+t.countOfUsesPerMinuteMax,this.metricMinutesAvg=""+t.countOfUsesPerMinuteAvg,this.metricHours=""+t.countOfUsesPerHour,this.metricHoursMin=""+t.countOfUsesPerHourMin,this.metricHoursMax=""+t.countOfUsesPerHourMax,this.metricHoursAvg=""+t.countOfUsesPerHourAvg,this.root.detectChanges()}},"app-main","<div class='p-n_s_ygt'><qsi-bind>runningSting</qsi-bind></div><div class='E-q_lKioe' qsi-cls='isStop?Rwd_veNOy:PG5IK67Jr'><qsi-bind>fpsTxt</qsi-bind></div><div class='t-S-FNd3q'><div>METRICS:</div><div><qsi-bind>metricName</qsi-bind></div><div>seconds: <qsi-bind>metricSeconds</qsi-bind></div><div>seconds min: <qsi-bind>metricSecondsMin</qsi-bind></div><div>seconds max: <qsi-bind>metricSecondsMax</qsi-bind></div><div>seconds avg: <qsi-bind>metricSecondsAvg</qsi-bind></div><div>minutes: <qsi-bind>metricMinutes</qsi-bind></div><div>minutes min: <qsi-bind>metricMinutesMin</qsi-bind></div><div>minutes max: <qsi-bind>metricMinutesMax</qsi-bind></div><div>minutes avg: <qsi-bind>metricMinutesAvg</qsi-bind></div><div>hours: <qsi-bind>metricHours</qsi-bind></div><div>hours min: <qsi-bind>metricHoursMin</qsi-bind></div><div>hours max: <qsi-bind>metricHoursMax</qsi-bind></div><div>hours avg: <qsi-bind>metricHoursAvg</qsi-bind></div></div><div> animation state: <qsi-bind>animationState</qsi-bind></div><div> chosen fps: <qsi-bind>chosenFps</qsi-bind></div><input class='x_xrxuE-w' placeholder='insert FPS' qsi-change='setCustomFps' type='text'><div class='x_xrxuE-w' qsi-click='set60Fps'> set 60 fps</div><div class='x_xrxuE-w' qsi-click='set30Fps'> set 30 fps</div><div class='x_xrxuE-w PG5IK67Jr' qsi-click='start'> start</div><div class='x_xrxuE-w Rwd_veNOy' qsi-click='stop'> stop</div>")],Et=b({template:"",element:class{}}),bt=b({template:"",element:class{}});U([{tagName:e.TEXT_VALUE,targetElement:Et},{tagName:e.QSI_BIND,targetElement:bt}]);const _t=new class{constructor(){this.isComponentMode=!1}register(t){U(t)}run(t){this.isComponentMode=!!t,K((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=L(ft))}start(){const t=x(A.join("")),e=x(".E-q_lKioe {width: 100px;height: 100px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;font-size: 30px;border-radius: 50%;}.t-S-FNd3q {position: absolute;top: 100px;right: 100px;width: 300px;height: 600px;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;font-size: 30px;border: 1px solid #108b55;padding: 10px;}.PG5IK67Jr {background: #69e49a;}.Rwd_veNOy {background: #e46969;}.p-n_s_ygt {font-size: 60px;}.x_xrxuE-w {width: 120px;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;border: 1px solid black;margin: 5px;padding: 5px;border-radius: 10px;}.x_xrxuE-w:hover {opacity: 0.5;}");$(m.head,t),$(m.head,e),!this.isComponentMode&&$(m.body,this.appElement)}};X.init(),W.setLocation(G.EN),_t.register(pt),_t.run()})()})();