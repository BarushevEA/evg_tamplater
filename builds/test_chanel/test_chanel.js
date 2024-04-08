(()=>{"use strict";var e={512:(e,t,n)=>{t.g=void 0;const s=n(951);t.g=class{list=[];_isDestroyed=!1;collect(...e){this._isDestroyed||this.list.push(...e)}unsubscribe(e){this._isDestroyed||(e?.unsubscribe(),(0,s.quickDeleteFromArray)(this.list,e))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sortDescending=t.sortAscending=t.randomCallback=t.positiveCallback=t.negativeCallback=t.quickDeleteFromArray=t.deleteFromArray=void 0,t.deleteFromArray=function(e,t){const n=e.indexOf(t);return-1!==n&&(e.splice(n,1),!0)},t.quickDeleteFromArray=function(e,t){const n=e.indexOf(t);return-1!==n&&(e[n]=e[e.length-1],e.length=e.length-1,!0)},t.negativeCallback=()=>!1,t.positiveCallback=()=>!0,t.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124",t.sortAscending=(e,t)=>e.order>t.order?1:e.order<t.order?-1:0,t.sortDescending=(e,t)=>e.order>t.order?-1:e.order<t.order?1:0},390:(e,t,n)=>{t.cP=void 0;const s=n(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(e,t){this.observable=e,this.isPipe=!!t}static callbackSend(e,t){const n=t.listener;return n&&t.observable?t.isListenPaused?void 0:t.isPipe?t.emitByPositiveCondition&&t.emitByPositiveCondition(e)||t.emitByNegativeCondition&&!t.emitByNegativeCondition(e)?n(e):t.once.isOnce?(t.once.isFinished=!0,n(e),t.unsubscribe()):t.unsubscribeByNegativeCondition?t.unsubscribeByNegativeCondition(e)?n(e):(t.unsubscribeByNegativeCondition=null,t.unsubscribe()):t.unsubscribeByPositiveCondition?t.unsubscribeByPositiveCondition(e)?(t.unsubscribeByPositiveCondition=null,t.unsubscribe()):n(e):t.emitMatchCondition&&t.emitMatchCondition(e)===e?n(e):void 0:n(e):t.unsubscribe()}subscribe(e,t){return this.listener=e,t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(e){try{i.callbackSend(e,this)}catch(t){this.errorHandler(e,t)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return this.unsubscribeByNegativeCondition=e??s.negativeCallback,this}unsubscribeByPositive(e){return this.unsubscribeByPositiveCondition=e??s.positiveCallback,this}emitByNegative(e){return this.emitByNegativeCondition=e??s.positiveCallback,this}emitByPositive(e){return this.emitByPositiveCondition=e??s.negativeCallback,this}emitMatch(e){return this.emitMatchCondition=e??s.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}t.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(e){this.value=e}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++)this.unSubscribe(this.listenersForUnsubscribe[t]);this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.quickDeleteFromArray)(this.listeners,e)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(this._isDestroyed)return;if(!e)return;const n=new i(this,!1);return n.subscribe(e,t),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const e=new i(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}(()=>{var e=n(390),t=n(951);const s=window,i=document,o=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,r=(function(){const e=navigator.userAgentData;if(e&&e.mobile)return!0;if(e&&o.test(e.platform))return!0;if(o.test(navigator.userAgent)||o.test(navigator.platform))return!0;const t=s.matchMedia;t&&t("(pointer:coarse)").matches}(),s.top,"APP_$$$_dfohirglkbjwefoi"+Date.now());var a;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(a||(a={}));const l=":";var c,h;function u(e){return`qsi-${e}`}function m(e,t){return e?e.getAttribute(u(t)):""}function d(e,t,n){e&&e.setAttribute(u(t),n)}function _(e,t){e&&e.removeAttribute(u(t))}!function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(c||(c={})),Object.keys(c),function(e){e.TEXT_VALUE="txt-val",e.QSI_BIND="qsi-bind"}(h||(h={}));const g="_______$$bool";function b(e,t){if(!t.length)return;let n="[";if(t.length>1){for(let s=0;s<t.length;s++){const i=t[s];n+=f(e,i),d(i,c.INFO,n.trim()+"]"),i.ahe_parent_chanel=e,i.onParentChanelReady$.next(e)}return}const s=t[0];!function(e,t){if(t.tagName.toLowerCase()!==h.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const n=v(e,t.innerHTML);return n.isFunction?(e.ahe_nFunctions.push({textElement:t,valueName:n.valueName,lastData:r}),!0):(e.ahe_nValues.push({textElement:t,valueName:n.valueName,lastData:r}),!0)}(e,s)?function(e,t){if(t.tagName.toLowerCase()!==h.QSI_BIND)return!1;if(!t.innerHTML)return!1;const n=v(e,t.innerHTML);return n.isFunction?(e.ahe_bindFunctions.push({textElement:t,valueName:n.valueName,lastData:r}),!0):(e.ahe_bindValues.push({textElement:t,valueName:n.valueName,lastData:r}),!0)}(e,s)?d(s,c.INFO,n+"bind]"):(n+=function(e,t){const n=L(t,c.INJECT_TO);return n?(e.ahe_component[n]=t,"inj "):""}(e,s),n+=function(e,t){const n=L(t,c.CHANNEL);return n&&t.isCustomAppElement?(e.ahe_component[n]=t,"cnl "):""}(e,s),n+=function(e,t){const n=L(t,c.SOURCE);if(!n)return"";const s=v(e,n);return s.isFunction?(e.ahe_sourceComponentsFunctions.push({textElement:t,valueName:s.valueName,lastData:""}),"src "):(e.ahe_sourceComponents.push({textElement:t,valueName:n,lastData:""}),"src ")}(e,s),n+=function(e,t){const n=D(e,t,c.ON_CLICK);return n?(t.onclick=t=>y(e,n,t),"clk "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_MOUSE_LEAVE);return n?(t.onmouseleave=t=>y(e,n,t),"mlv "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_MOUSE_ENTER);return n?(t.onmouseenter=t=>y(e,n,t),"mer "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_MOUSE_UP);return n?(t.onmouseup=t=>y(e,n,t),"mup "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_MOUSE_DOWN);return n?(t.onmousedown=t=>y(e,n,t),"mdn "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_MOUSE_MOVE);return n?(t.onmousemove=t=>y(e,n,t),"mmv "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_KEY_DOWN);return n?(t.onkeydown=t=>y(e,n,t),"kdn "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_KEY_UP);return n?(t.onkeyup=t=>y(e,n,t),"kup "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_KEY_DBL_CLICK);return n?(t.ondblclick=t=>y(e,n,t),"dbc "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_SCROLL);return n?(t.onscroll=t=>y(e,n,t),"scl "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_WHEEL);return n?(t.onwheel=t=>y(e,n,t),"whl "):""}(e,s),n+=function(e,t){const n=D(e,t,c.ON_CHANGE);return n?(t.onchange=t=>y(e,n,t),"chg "):""}(e,s),n+=function(e,t){const n=m(t,c.ON_HANDLE);return n?(A(e,n,t),_(t,c.ON_HANDLE),"elt "):""}(e,s),n+=f(e,s),n+=function(e,t){let n=m(t,c.CLASS_IF);if(!n)return"";const s=n.split(" "),i=[],o={element:t,classConditions:i};for(let t=0;t<s.length;t++){const n=s[t];if(n.includes("?")){const t=n.split("?"),s=v(e,t[0]),o=t[1].split(l);i.push({conditionName:s.valueName,isFunction:s.isFunction,isInversion:s.isInversion,isConditionDisabled:!1,oldCondition:a.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(n.includes(l)){const t=n.split(l),s=v(e,t[1]);i.push({conditionName:s.valueName,isFunction:s.isFunction,isInversion:s.isInversion,isConditionDisabled:!1,oldCondition:a.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:a.UNDEFINED,firstClassName:n,secondClassName:""})}return e.ahe_ClsIfList.push(o),_(t,c.CLASS_IF),"cls "}(e,s),d(s,c.INFO,n.trim()+"]"),s.isCustomAppElement&&(s.ahe_parent_chanel=e,s.onParentChanelReady$.next(e))):d(s,c.INFO,n+"var]")}function f(e,t){let n=m(t,c.ON_IF);if(!n)return"";const s=$(h.TEXT_VALUE),i=t.parentElement,o=v(e,n);return e.ahe_IfList.push({ifElement:t,valueName:o.valueName,ifParent:s,oldCondition:!1,isInversion:o.isInversion,isFunction:o.isFunction}),i.insertBefore(s,t),B(i,t),_(t,c.ON_IF),d(s,c.INFO,"[ifp]"),"ifc "}const p=[0];function C(e,t){if(t.tagName.toLowerCase()===h.TEXT_VALUE)return(p[0]=t)&&p;if(t.tagName.toLowerCase()===h.QSI_BIND)return(p[0]=t)&&p;if(!e.isAppElement(t))return(p[0]=t)&&p;const n=m(t,c.FOR);if(!n)return(p[0]=t)&&p;const s=e.ahe_component[n];if(!s)return(p[0]=t)&&p;const i=$(h.TEXT_VALUE),o=t.parentElement,r=N(e,[],s,i,t);return d(i,c.INFO,"[for-of]"),o.insertBefore(i,t),B(o,t),_(t,c.FOR),e.ahe_ForOfList.push({parent:i,template:t,children:r,valueName:n}),r}function E(e,t,n){n.isAppElement(t)&&t.sendMessage(e)}function N(e,n,s,i,o){const r=[],a=n.length,l=s.length;let h=l-a;if(!(l+a))return r;if(h>0){for(let t=0;t<h;t++){const a=$(o.tagName);n.push(a),r.push(a);const u=m(o,c.ON_IF);u&&d(a,c.ON_IF,u),R(i,a),E(s[l-h+t],a,e)}for(let t=0;t<l-h;t++)E(s[t],n[t],e)}else{h*=-1;for(let s=0;s<h;s++){const s=n.pop(),o=e.ahe_IfList;let r;for(let e=0;e<o.length;e++){const t=o[e];if(t.ifElement===s){r=t;break}}r?((0,t.quickDeleteFromArray)(o,r),B(i,r.ifParent)):B(i,s)}for(let t=0;t<l;t++)E(s[t],n[t],e)}return r}function v(e,t){const n="!"===t[0],s=n?t.substring(1):t;return{isInversion:n,valueName:s,isFunction:"function"==typeof e.ahe_component[s]}}function y(e,t,n){e.ahe_component[t](n)}function D(e,t,n){const s=m(t,n);return s?(A(e,s,t),_(t,n),s):""}function L(e,t){const n=m(e,t);return n?(_(e,t),n):""}function A(e,t,n){const s=e.ahe_component[t];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[e.ahe_number]||(s.htmlElements[e.ahe_number]=[]),e.ahe_clr.collect(e.destroy$().subscribe((e=>e&&(s.htmlElements={})))),s.htmlElements[e.ahe_number].push(n))}var O=n(512);function P(t){class n extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=n.ahe_Counter,n.ahe_Counter++,this.onAdopted$=new e.cP(!1),this.onInit$=new e.cP(!1),this.onDestroy$=new e.cP(!1),this.attributeChanged$=new e.cP(void 0),this.beforeDetectChanges$=new e.cP(!1),this.onChangesDetected$=new e.cP(!1),this.onMsg$=new e.cP(void 0),this.onParentChanelReady$=new e.cP(void 0),this.ahe_clr=new O.g,this.ahe_nFunctions=[],this.ahe_sourceComponentsFunctions=[],this.ahe_sourceComponents=[],this.ahe_nValues=[],this.ahe_bindFunctions=[],this.ahe_bindValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=t,this.ahe_component=new t.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}onMessage$(){return this.onMsg$}connectedCallback(){m(this,c.ON_IF)&&!this.ahe_component[g]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==h.TEXT_VALUE&&this.tagName.toLowerCase()!==h.QSI_BIND&&(function(e){const t=e.querySelectorAll(`*:not([${u(c.INFO)}])`);for(let n=0;n<t.length;n++)b(e,C(e,t[n]))}(this),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit(),this.detectChanges(!0)))}disconnectedCallback(){!m(this,c.ON_IF)||this.ahe_component[g]?this.tagName.toLowerCase()!==h.TEXT_VALUE&&this.tagName.toLowerCase()!==h.QSI_BIND&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_sourceComponentsFunctions.length=0,this.ahe_sourceComponents.length=0,this.ahe_nValues.length=0,this.ahe_bindFunctions.length=0,this.ahe_bindValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onMsg$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[g]=!0}attributeChangedCallback(e,t,n){this.attributeChanged$.next({name:e,oldValue:t,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_number]?e.htmlElements[this.ahe_number]:[]}detectChanges(e){this.beforeDetectChanges$.next(!0),!e&&this.ahe_ForOfList.length&&function(e){const t=e.ahe_ForOfList;for(let n=0;n<t.length;n++){const s=t[n];b(e,N(e,s.children,e.ahe_component[s.valueName],s.parent,s.template))}}(this),function(e){for(let t=0;t<e.ahe_IfList.length;t++){const n=e.ahe_IfList[t];let s=n.isFunction?!!e.ahe_component[n.valueName]():!!e.ahe_component[n.valueName];if(n.isInversion&&(s=!s),s===n.oldCondition)continue;n.oldCondition=s;const i=n.ifParent.contains(n.ifElement);s?i||R(n.ifParent,n.ifElement):i&&B(n.ifParent,n.ifElement)}}(this),function(e){for(let t=0;t<e.ahe_ClsIfList.length;t++){const n=e.ahe_ClsIfList[t],s=n.classConditions,i=n.element,o=e.ahe_component;for(let e=0;e<s.length;e++){const t=s[e];let n;if(t.isConditionDisabled)n=a.TRUE;else{let e=t.isFunction?!!o[t.conditionName]():!!o[t.conditionName];t.isInversion&&(e=!e),n=e?a.TRUE:a.FALSE}if(n===t.oldCondition)continue;t.oldCondition=n;const r=t.firstClassName,l=t.secondClassName;l?n===a.TRUE?(x(i,[r]),k(i,[l])):(x(i,[l]),k(i,[r])):t.isConditionDisabled||n===a.TRUE?x(i,[r]):k(i,[r])}}}(this),function(e){for(let t=0;t<e.ahe_bindValues.length;t++){const n=e.ahe_bindValues[t],s=e.ahe_component[n.valueName];n.lastData!==s&&(n.textElement.textContent=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_sourceComponents.length;t++){const n=e.ahe_sourceComponents[t],s=e.ahe_component[n.valueName]??"";n.lastData!==s&&(n.textElement.src=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_sourceComponentsFunctions.length;t++){const n=e.ahe_sourceComponentsFunctions[t],s=e.ahe_component[n.valueName]()??"";n.lastData!==s&&(n.textElement.src=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_bindFunctions.length;t++){const n=e.ahe_bindFunctions[t],s=e.ahe_component[n.valueName]();n.lastData!==s&&(n.textElement.textContent=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_nValues.length;t++){const n=e.ahe_nValues[t],s=e.ahe_component[n.valueName];n.lastData!==s&&(n.textElement.innerHTML=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_nFunctions.length;t++){const n=e.ahe_nFunctions[t],s=e.ahe_component[n.valueName]();n.lastData!==s&&(n.textElement.innerHTML=s,n.lastData=s)}}(this),this.onChangesDetected$.next(!0)}sendMessage(e){this.onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_parent_chanel&&(this.ahe_parent_chanel.sendMessage(e),!0)}getChannel(e){if(e){if(e.isCustomAppElement)return e;if(e.ahe_component&&e.sendMessage)return e.isCustomAppElement=!0,e}}transferToChannel(e,t){this.onMessage$().pipe().emitByPositive((()=>e())).subscribe((n=>{e().sendMessage(t(n))}))}sendToChannel(e,t){e&&e.sendMessage(t)}isAppElement(e){return!!this.getChannel(e)}collect(...e){this.ahe_clr.collect(...e)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return n.ahe_Counter=0,n}const I="{display: contents !important;}",M=[`html-block ${I}`];function F(e){for(let t=0;t<e.length;t++)M.push(`${e[t].tagName} ${I}`);q((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].targetElement)}))}function T(e,t,n){return{tagName:t,targetElement:P({template:n,element:e})}}let S;function $(e){return i.createElement(e)}function U(e){const t=$("style");return t.innerHTML=e,t}function k(e,t){if(e)for(let n=0;n<t.length;n++)e.classList.remove(t[n])}function x(e,t){if(e)for(let n=0;n<t.length;n++)e.classList.add(t[n])}function R(e,t){e&&t&&e.appendChild(t)}function B(e,t){e&&t&&e.removeChild(t)}const w=new e.cP(!1);let H,V,K,Z,X=!1;function q(e){w.pipe().setOnce().subscribe((t=>t&&e())),function(){if(i.body)return void w.next(!0);if(X)return;X=!0;const e=()=>{w.next(!0),i.removeEventListener("DOMContentLoaded",e),X=!1};i.addEventListener("DOMContentLoaded",e)}()}const Y=new class{constructor(e,t,n,s){H=e,V=t,K=n,Z=s,S=this}set major(e){V=e}set minor(e){K=e}set patch(e){Z=e}set name(e){H=e}get version(){return`${V}.${K}.${Z}`}get name(){return H}get description(){return`[${H} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){S?console.log(S.description,...e):console.log("APP",...e)}("STARTED")}}("test_chanel",1,0,0);var j;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(j||(j={}));const z=new e.cP(j.EN),Q=new class{get currentLocation(){return z.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return z.subscribe(e)}setLocation(e){z.next(e)}destroy(){z.destroy()}},W=S.name;let G="";for(let e=0;e<W.length;e++){const t=W[e];let n="";for(let e=0;e<26;e++){const s="abcdefghijklmnopqrstuvwxyz"[e];if(s===t.toLowerCase()){n=s;break}}G+=n||"-"}const J="app-"+G,ee=[T(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},J,"<app-main></app-main>"),T(class{constructor(e){this.root=e,this.forElements=[{name:"Sergey"},{name:"Andrey"},{name:"Nik"}],this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().subscribe((e=>{console.log("MAIN MESSAGE:",e)})))}onInit(){setTimeout((()=>{this.sendMessageToChildren()}),5e3);const e=["./assets/img/photo_2024-04-06_00-29-23.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHvkoW4YAf73Ea3smStZwvrdxi4sUChgm6VOFHyfJ1Q&s","https://media.licdn.com/dms/image/C4E03AQHjm7BY5INpBA/profile-displayphoto-shrink_200_200/0/1660152384175?e=2147483647&v=beta&t=5XDlbq2DvTVNmAuyCtaPfyqvvraRxC_1mK-u4Lh--ZU"];setTimeout((()=>{this.forElements=[{name:"Sergey",isStudying:!0,age:18,class:"3TI",school:"ZSZnr1",photo:e[0]},{name:"Andrey",isStudying:!0,age:21,class:"4TI",school:"ZSZnr1",photo:e[1]},{name:"Nik",isStudying:!0,age:18,class:"1",school:"СШ#76",photo:e[2]},{name:"Kazashka",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka1",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka2",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka3",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka4",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"}],this.root.detectChanges();let t=0;setInterval((()=>{this.forElements=[{name:"Sergey",isStudying:!0,age:18,class:"3TI",school:"ZSZnr1",photo:e[t]}],t++,t>=e.length&&(t=0),this.root.detectChanges()}),2e3)}),1e4)}onDestroy(){}sendMessageToChildren(){this.child1Chanel?.sendMessage("Message by main to child1"),this.child2Chanel?.sendMessage("Message by main to child2"),this.child3Chanel?.sendMessage("Message by main to child3"),this.child4Chanel?.sendMessage("Message by main to child4")}},"app-main","<app-child1 qsi-channel='child1Chanel'></app-child1><app-child2 qsi-channel='child2Chanel'></app-child2><app-child3 qsi-channel='child3Chanel'></app-child3><app-child4 qsi-channel='child4Chanel'></app-child4><app-for_element qsi-for='forElements'></app-for_element>"),T(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().emitByPositive((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name;let e=0;setInterval((()=>{this.root.sendMessageToParent(`from Child1 message #${e}`),e++}),1e3)}onDestroy(){}},"app-child1","<div><qsi-bind>message</qsi-bind></div>"),T(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().emitByPositive((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name}onDestroy(){}},"app-child2","<div><qsi-bind>message</qsi-bind></div>"),T(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().emitByPositive((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name}onDestroy(){}},"app-child3","<div><qsi-bind>message</qsi-bind></div>"),T(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().emitByPositive((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name}onDestroy(){}},"app-child4","<div><qsi-bind>message</qsi-bind></div>"),T(class{constructor(e){this.root=e}onCreate(){this.root.collect(this.root.onMessage$().pipe().emitByPositive((e=>!!e)).subscribe((e=>{this.setStudent(e)})))}onInit(){}onDestroy(){}setStudent(e){this.name=e.name??"NOT PRESENT YET",this.age=e.age??NaN,this.photo=e.photo??"",this.isStudying=e.isStudying??!1,this.class=e.class??"NOT PRESENT YET",this.school=e.school??"NOT PRESENT YET",this.root.detectChanges()}},"app-for_element","<div class='hel-0_Bwq'><div><qsi-bind>name</qsi-bind></div><div><qsi-bind>age</qsi-bind></div><div><qsi-bind>isStudying</qsi-bind></div><div><qsi-bind>class</qsi-bind></div><div><qsi-bind>school</qsi-bind></div><img alt='not present' class='L-K_YEg_w' qsi-src='photo' src=''></div>")],te=P({template:"",element:class{}}),ne=P({template:"",element:class{}});F([{tagName:h.TEXT_VALUE,targetElement:te},{tagName:h.QSI_BIND,targetElement:ne}]);const se=new class{constructor(){this.isComponentMode=!1}register(e){F(e)}run(e){this.isComponentMode=!!e,q((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=$(J))}start(){const e=U(M.join("")),t=U(".hel-0_Bwq {width: 200px;height: 300px;box-sizing: border-box;border: 1px solid #062c46;border-radius: 4px;background-color: rgba(0, 100, 100, 0.2);padding: 10px;margin: 10px;}.L-K_YEg_w {width: 70px;height: 70px;min-width: 70px;min-height: 70px;border: 1px solid #062c46;border-radius: 4px;object-fit: cover;}");R(i.head,e),R(i.head,t),!this.isComponentMode&&R(i.body,this.appElement)}};Y.init(),Q.setLocation(j.EN),se.register(ee),se.run()})()})();