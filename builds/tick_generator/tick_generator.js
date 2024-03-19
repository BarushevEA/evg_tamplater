(()=>{"use strict";var t={512:(t,e,s)=>{e.g=void 0;const n=s(951);e.g=class{list=[];_isDestroyed=!1;collect(...t){this._isDestroyed||this.list.push(...t)}unsubscribe(t){this._isDestroyed||(t?.unsubscribe(),(0,n.quickDeleteFromArray)(this.list,t))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomCallback=e.positiveCallback=e.negativeCallback=e.quickDeleteFromArray=e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t.splice(s,1),!0)},e.quickDeleteFromArray=function(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)},e.negativeCallback=()=>!1,e.positiveCallback=()=>!0,e.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124"},390:(t,e,s)=>{e.cP=void 0;const n=s(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(t,e){this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const s=e.listener;return s&&e.observable?e.isListenPaused?void 0:e.isPipe?e.emitByPositiveCondition&&e.emitByPositiveCondition(t)||e.emitByNegativeCondition&&!e.emitByNegativeCondition(t)?s(t):e.once.isOnce?(e.once.isFinished=!0,s(t),e.unsubscribe()):e.unsubscribeByNegativeCondition?e.unsubscribeByNegativeCondition(t)?s(t):(e.unsubscribeByNegativeCondition=null,e.unsubscribe()):e.unsubscribeByPositiveCondition?e.unsubscribeByPositiveCondition(t)?(e.unsubscribeByPositiveCondition=null,e.unsubscribe()):s(t):e.emitMatchCondition&&e.emitMatchCondition(t)===t?s(t):void 0:s(t):e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return this.unsubscribeByNegativeCondition=t??n.negativeCallback,this}unsubscribeByPositive(t){return this.unsubscribeByPositiveCondition=t??n.positiveCallback,this}emitByNegative(t){return this.emitByNegativeCondition=t??n.positiveCallback,this}emitByPositive(t){return this.emitByPositiveCondition=t??n.negativeCallback,this}emitMatch(t){return this.emitMatchCondition=t??n.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(t){this.value=t}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=t;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++)this.unSubscribe(this.listenersForUnsubscribe[e]);this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.quickDeleteFromArray)(this.listeners,t)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const s=new i(this,!1);return s.subscribe(t,e),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}(()=>{var t,e,n=s(390);function i(t){return`qsi-${t}`}function o(t,e){return t?t.getAttribute(i(e)):""}function r(t,e,s){t&&t.setAttribute(i(e),s)}function a(t,e){t&&t.removeAttribute(i(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val",t.QSI_BIND="qsi-bind"}(e||(e={}));var h=s(512),l=s(951);const c=":";var u;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(u||(u={}));const d=window,m=document,b=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,f=(function(){const t=navigator.userAgentData;if(t&&t.mobile)return!0;if(t&&b.test(t.platform))return!0;if(b.test(navigator.userAgent)||b.test(navigator.platform))return!0;const e=d.matchMedia;e&&e("(pointer:coarse)").matches}(),d.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),_="_______$$bool";function E(s){class r extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=r.ahe_Counter,r.ahe_Counter++,this.onAdopted$=new n.cP(!1),this.onInit$=new n.cP(!1),this.onDestroy$=new n.cP(!1),this.attributeChanged$=new n.cP(void 0),this.beforeDetectChanges$=new n.cP(!1),this.onChangesDetected$=new n.cP(!1),this.onDataCatch$=new n.cP(void 0),this.onParentChanelReady$=new n.cP(void 0),this.ahe_clr=new h.g,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_bindFunctions=[],this.ahe_bindValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=s,this.ahe_component=new s.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){o(this,t.ON_IF)&&!this.ahe_component[_]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&this.tagName.toLowerCase()!==e.QSI_BIND&&(function(e){const s=e.querySelectorAll(`*:not([${i(t.INFO)}])`);for(let t=0;t<s.length;t++)p(e,N(e,s[t]))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!o(this,t.ON_IF)||this.ahe_component[_]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&this.tagName.toLowerCase()!==e.QSI_BIND&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_bindFunctions.length=0,this.ahe_bindValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[_]=!0}attributeChangedCallback(t,e,s){this.attributeChanged$.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&this.ahe_ForOfList.length&&function(t){const e=t.ahe_ForOfList;for(let s=0;s<e.length;s++){const n=e[s];p(t,v(t,n.children,t.ahe_component[n.valueName],n.parent,n.template))}}(this),function(t){for(let e=0;e<t.ahe_IfList.length;e++){const s=t.ahe_IfList[e];let n=s.isFunction?!!t.ahe_component[s.valueName]():!!t.ahe_component[s.valueName];if(s.isInversion&&(n=!n),n===s.oldCondition)continue;s.oldCondition=n;const i=s.ifParent.contains(s.ifElement);n?i||M(s.ifParent,s.ifElement):i&&w(s.ifParent,s.ifElement)}}(this),function(t){for(let e=0;e<t.ahe_ClsIfList.length;e++){const s=t.ahe_ClsIfList[e],n=s.classConditions,i=s.element,o=t.ahe_component;for(let t=0;t<n.length;t++){const e=n[t];let s;if(e.isConditionDisabled)s=u.TRUE;else{let t=e.isFunction?!!o[e.conditionName]():!!o[e.conditionName];e.isInversion&&(t=!t),s=t?u.TRUE:u.FALSE}if(s===e.oldCondition)continue;e.oldCondition=s;const r=e.firstClassName,a=e.secondClassName;a?s===u.TRUE?(x(i,[r]),U(i,[a])):(x(i,[a]),U(i,[r])):e.isConditionDisabled||s===u.TRUE?x(i,[r]):U(i,[r])}}}(this),function(t){for(let e=0;e<t.ahe_bindValues.length;e++){const s=t.ahe_bindValues[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_bindFunctions.length;e++){const s=t.ahe_bindFunctions[e],n=t.ahe_component[s.valueName]();s.lastData!==n&&(s.textElement.textContent=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nValues.length;e++){const s=t.ahe_nValues[e],n=t.ahe_component[s.valueName];s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),function(t){for(let e=0;e<t.ahe_nFunctions.length;e++){const s=t.ahe_nFunctions[e],n=t.ahe_component[s.valueName]();s.lastData!==n&&(s.textElement.innerHTML=n,s.lastData=n)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t){if(t.isCustomAppElement)return t;if(t.ahe_component&&t.sendData)return t.isCustomAppElement=!0,t}}transferToChanel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((s=>{t().sendData(e(s))}))}sendToChanel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return r.ahe_Counter=0,r}function p(s,n){if(!n.length)return;let i="[";if(n.length>1){for(let e=0;e<n.length;e++){const o=n[e];i+=D(s,o),r(o,t.INFO,i.trim()+"]"),o.ahe_parent_chanel=s,o.onParentChanelReady$.next(s)}return}const h=n[0];!function(t,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE){if(!s.innerHTML)return!1;const e=O(t,s.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:s,valueName:e.valueName,lastData:f}),!0):(t.ahe_nValues.push({textElement:s,valueName:e.valueName,lastData:f}),!0)}return!1}(s,h)?function(t,s){if(s.tagName.toLowerCase()===e.QSI_BIND){if(!s.innerHTML)return!1;const e=O(t,s.innerHTML);return e.isFunction?(t.ahe_bindFunctions.push({textElement:s,valueName:e.valueName,lastData:f}),!0):(t.ahe_bindValues.push({textElement:s,valueName:e.valueName,lastData:f}),!0)}return!1}(s,h)?r(h,t.INFO,i+"bind]"):(i+=function(e,s){const n=function(t,e){const s=o(t,e);return s?(a(t,e),s):""}(s,t.INJECT_TO);return n?(e.ahe_component[n]=s,"inj "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_CLICK);return n?(s.onclick=t=>y(e,n,t),"clk "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_LEAVE);return n?(s.onmouseleave=t=>y(e,n,t),"mlv "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_ENTER);return n?(s.onmouseenter=t=>y(e,n,t),"mer "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_UP);return n?(s.onmouseup=t=>y(e,n,t),"mup "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_DOWN);return n?(s.onmousedown=t=>y(e,n,t),"mdn "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_MOUSE_MOVE);return n?(s.onmousemove=t=>y(e,n,t),"mmv "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_KEY_DOWN);return n?(s.onkeydown=t=>y(e,n,t),"kdn "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_KEY_UP);return n?(s.onkeyup=t=>y(e,n,t),"kup "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_KEY_DBL_CLICK);return n?(s.ondblclick=t=>y(e,n,t),"dbc "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_SCROLL);return n?(s.onscroll=t=>y(e,n,t),"scl "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_WHEEL);return n?(s.onwheel=t=>y(e,n,t),"whl "):""}(s,h),i+=function(e,s){const n=F(e,s,t.ON_CHANGE);return n?(s.onchange=t=>y(e,n,t),"chg "):""}(s,h),i+=function(e,s){const n=o(s,t.ON_HANDLE);return n?(I(e,n,s),a(s,t.ON_HANDLE),"elt "):""}(s,h),i+=D(s,h),i+=function(e,s){let n=o(s,t.CLASS_IF);if(!n)return"";const i=n.split(" "),r=[],h={element:s,classConditions:r};for(let t=0;t<i.length;t++){const s=i[t];if(s.includes("?")){const t=s.split("?"),n=O(e,t[0]),i=t[1].split(c);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:u.UNDEFINED,firstClassName:i[0],secondClassName:i[1]})}else if(s.includes(c)){const t=s.split(c),n=O(e,t[1]);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:u.UNDEFINED,firstClassName:t[0],secondClassName:""})}else r.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:u.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfList.push(h),a(s,t.CLASS_IF),"cls "}(s,h),r(h,t.INFO,i.trim()+"]"),h.isCustomAppElement&&(h.ahe_parent_chanel=s,h.onParentChanelReady$.next(s))):r(h,t.INFO,i+"var]")}function D(s,n){let i=o(n,t.ON_IF);if(!i)return"";const h=$(e.TEXT_VALUE),l=n.parentElement,c=O(s,i);return s.ahe_IfList.push({ifElement:n,valueName:c.valueName,ifParent:h,oldCondition:!1,isInversion:c.isInversion,isFunction:c.isFunction}),l.insertBefore(h,n),w(l,n),a(n,t.ON_IF),r(h,t.INFO,"[ifp]"),"ifc "}const C=[0];function N(s,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE)return(C[0]=n)&&C;if(n.tagName.toLowerCase()===e.QSI_BIND)return(C[0]=n)&&C;if(!s.isAppElement(n))return(C[0]=n)&&C;const i=o(n,t.FOR);if(!i)return(C[0]=n)&&C;const h=s.ahe_component[i];if(!h)return(C[0]=n)&&C;const l=$(e.TEXT_VALUE),c=n.parentElement,u=v(s,[],h,l,n);return r(l,t.INFO,"[for-of]"),c.insertBefore(l,n),w(c,n),a(n,t.FOR),s.ahe_ForOfList.push({parent:l,template:n,children:u,valueName:i}),u}function g(t,e,s){s.isAppElement(e)&&e.sendData(t)}function v(e,s,n,i,a){const h=[],c=s.length,u=n.length;let d=u-c;if(!(u+c))return h;if(d>0){for(let l=0;l<d;l++){const c=$(a.tagName);s.push(c),h.push(c);const m=o(a,t.ON_IF);m&&r(c,t.ON_IF,m),M(i,c),g(n[u-d+l],c,e)}for(let t=0;t<u-d;t++)g(n[t],s[t],e)}else{d*=-1;for(let t=0;t<d;t++){const t=s.pop(),n=e.ahe_IfList;let o;for(let e=0;e<n.length;e++){const s=n[e];if(s.ifElement===t){o=s;break}}o?((0,l.quickDeleteFromArray)(n,o),w(i,o.ifParent)):w(i,t)}for(let t=0;t<u;t++)g(n[t],s[t],e)}return h}function O(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_component[n]}}function y(t,e,s){t.ahe_component[e](s)}function F(t,e,s){const n=o(e,s);return n?(I(t,n,e),a(e,s),n):""}function I(t,e,s){const n=t.ahe_component[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_number]||(n.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_number].push(s))}const T="{display: contents !important;}",S=[`html-block ${T}`];function P(t){for(let e=0;e<t.length;e++)S.push(`${t[e].tagName} ${T}`);K((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].targetElement)}))}function A(t,e,s){return{tagName:e,targetElement:E({template:s,element:t})}}let L;function $(t){return m.createElement(t)}function R(t){const e=$("style");return e.innerHTML=t,e}function U(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])}function x(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])}function M(t,e){t&&e&&t.appendChild(e)}function w(t,e){t&&e&&t.removeChild(e)}const k=new n.cP(!1);let B,V,Y,H,q=!1;function K(t){k.pipe().setOnce().subscribe((e=>e&&t())),function(){if(m.body)return void k.next(!0);if(q)return;q=!0;const t=()=>{k.next(!0),m.removeEventListener("DOMContentLoaded",t),q=!1};m.addEventListener("DOMContentLoaded",t)}()}const X=new class{constructor(t,e,s,n){B=t,V=e,Y=s,H=n,L=this}set major(t){V=t}set minor(t){Y=t}set patch(t){H=t}set name(t){B=t}get version(){return`${V}.${Y}.${H}`}get name(){return B}get description(){return`[${B} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){L?console.log(L.description,...t):console.log("APP",...t)}("STARTED")}}("tick_generator",1,0,0);var j;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(j||(j={}));const G=new n.cP(j.EN),Q=new class{get currentLocation(){return G.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return G.subscribe(t)}setLocation(t){G.next(t)}destroy(){G.destroy()}};var W,z;function J(t){return{isApplied:!0,state:t}}function Z(t){return{isApplied:!1,state:t}}!function(t){t.INIT="INIT",t.STARTED="STARTED",t.STOPPED="STOPPED",t.PROCESS="PROCESS",t.DESTROYED="DESTROYED",t.UNDEFINED="UNDEFINED"}(W||(W={})),function(t){t.ERROR_NEGATIVE_DELAY="Delay must be a positive number."}(z||(z={}));class tt{constructor(){this.rafId=null,this.fps=60,this.state$=new n.cP(W.UNDEFINED)}get state(){return this.state$.isDestroyed?W.DESTROYED:this.state$.getValue()??W.UNDEFINED}setFPS(t){const e=this.state;return this.isDestroyed()?Z(W.DESTROYED):e===W.STARTED?Z(e):t<1?Z(z.ERROR_NEGATIVE_DELAY):(this.fps=t,J(this.state))}set60fps(){return this.setFPS(60)}set30fps(){return this.setFPS(30)}setDefault(){return this.setFPS(60)}start(){if(this.isDestroyed())return Z(W.DESTROYED);if(this.rafId)return Z(W.STARTED);let t=Math.floor(performance.now());const e=Math.floor(1e3/this.fps),s=n=>{n=Math.floor(n),this.rafId=requestAnimationFrame(s);const i=n-t;i>=e&&(t=n-i%e,this.state$.next(W.PROCESS))};return this.rafId=requestAnimationFrame(s),this.state$.next(W.STARTED),J(W.STARTED)}stop(){return this.isDestroyed()?Z(W.DESTROYED):this.rafId?(cancelAnimationFrame(this.rafId),this.rafId=null,this.state$.next(W.STOPPED),J(W.STOPPED)):Z(z.ERROR_NEGATIVE_DELAY)}destroy(){return this.stop(),this.state$.next(W.DESTROYED),this.state$.destroy(),J(W.DESTROYED)}subscribeOnState(t){if(!this.isDestroyed())return this.state$.subscribe(t)}subscribeOnProcess(t){if(!this.isDestroyed())return this.state$.pipe()?.emitByPositive((t=>t===W.PROCESS)).subscribe(t)}isDestroyed(){return this.state===W.DESTROYED}}class et{constructor(){this.intervalId=0,this.delay=0,this.state$=new n.cP(W.UNDEFINED)}get state(){return this.state$.isDestroyed?W.DESTROYED:this.state$.getValue()??W.UNDEFINED}setInterval(t){const e=this.state;return this.isDestroyed()?Z(W.DESTROYED):e===W.STARTED?Z(e):t<0?Z(z.ERROR_NEGATIVE_DELAY):(this.delay=t,this.state$.next(W.INIT),J(W.INIT))}start(){return this.isDestroyed()?Z(W.DESTROYED):(this.intervalId=setInterval((()=>{this.state$.next(W.PROCESS)}),this.delay),this.state$.next(W.STARTED),J(W.STARTED))}stop(){return this.isDestroyed()?Z(W.DESTROYED):(clearInterval(this.intervalId),this.state$.next(W.STOPPED),J(W.STOPPED))}destroy(){return this.stop(),this.state$.next(W.DESTROYED),this.state$.destroy(),J(W.DESTROYED)}subscribeOnState(t){if(!this.isDestroyed())return this.state$.subscribe(t)}subscribeOnProcess(t){if(!this.isDestroyed())return this.state$.pipe()?.emitByPositive((t=>t===W.PROCESS)).subscribe(t)}isDestroyed(){return this.state===W.DESTROYED}}const st=L.name;let nt="";for(let t=0;t<st.length;t++){const e=st[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}nt+=s||"-"}const it="app-"+nt,ot=[A(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},it,"<app-main></app-main>"),A(class{constructor(t){this.root=t,this.runningSting="-----------[TEST-FPS-PROCESSING]-----------",this.strArr=this.runningSting.split(""),this.init(t)}onCreate(){}onInit(){this.fpsTxt=this.getFpsTxt(),this.root.detectChanges(),this.animationFrame.setDefault(),this.animationFrame.subscribeOnState((t=>{this.fpsCounter++,this.animationState=t;const e=this.strArr.shift();this.strArr.push(e),this.root.detectChanges(),this.runningSting=this.strArr.join("")})),this.timeInterval.setInterval(1e3),this.timeInterval.subscribeOnProcess((()=>{this.fpsTxt=this.getFpsTxt(),this.isStop=!this.fpsCounter,this.root.detectChanges(),this.fpsCounter=0})),this.animationFrame.start(),this.timeInterval.start()}onDestroy(){this.animationFrame.stop(),this.timeInterval.stop()}set60Fps(){this.animationFrame.set60fps(),this.chosenFps=60}set30Fps(){this.animationFrame.setFPS(30),this.chosenFps=30}start(){this.animationFrame.start()}stop(){this.animationFrame.stop()}setCustomFps(t){this.chosenFps=+t.target.value,"number"==typeof this.chosenFps&&this.animationFrame.setFPS(this.chosenFps)}init(t){this.name=t.tagName,this.fpsCounter=0,this.fpsTxt="",this.animationFrame=new tt,this.timeInterval=new et,this.isStop=!0,this.animationState="",this.chosenFps=60}getFpsTxt(){return`${this.fpsCounter} fps`}},"app-main","<div class='dds_vpx_e'><qsi-bind>runningSting</qsi-bind></div><div class='o-P_x_hXw' qsi-cls='isStop?bg_red:bg_green'><qsi-bind>fpsTxt</qsi-bind></div><div> animation state: <qsi-bind>animationState</qsi-bind></div><div> chosen fps: <qsi-bind>chosenFps</qsi-bind></div><input class='y-IAu_Toq' qsi-change='setCustomFps' placeholder='insert FPS' type='text'><div class='y-IAu_Toq' qsi-click='set60Fps'> set 60 fps</div><div class='y-IAu_Toq' qsi-click='set30Fps'> set 30 fps</div><div class='y-IAu_Toq k0Xbt_nAr' qsi-click='start'> start</div><div class='y-IAu_Toq D-oIZl7Ot' qsi-click='stop'> stop</div>")],rt=E({template:"",element:class{}}),at=E({template:"",element:class{}});P([{tagName:e.TEXT_VALUE,targetElement:rt},{tagName:e.QSI_BIND,targetElement:at}]);const ht=new class{constructor(){this.isComponentMode=!1}register(t){P(t)}run(t){this.isComponentMode=!!t,K((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=$(it))}start(){const t=R(S.join("")),e=R(".o-P_x_hXw {width: 100px;height: 100px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;font-size: 30px;}.k0Xbt_nAr {background: #69e49a;}.D-oIZl7Ot {background: #e46969;}.dds_vpx_e {font-size: 60px;}.y-IAu_Toq {width: 120px;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;border: 1px solid black;margin: 5px;padding: 5px;border-radius: 10px;}.y-IAu_Toq:hover {opacity: 0.5;}");M(m.head,t),M(m.head,e),!this.isComponentMode&&M(m.body,this.appElement)}};X.init(),Q.setLocation(j.EN),ht.register(ot),ht.run()})()})();