(()=>{"use strict";var e={512:(e,t,n)=>{t.g=void 0;const s=n(951);t.g=class{list=[];_isDestroyed=!1;collect(...e){this._isDestroyed||this.list.push(...e)}unsubscribe(e){this._isDestroyed||(e?.unsubscribe(),(0,s.quickDeleteFromArray)(this.list,e))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sortDescending=t.sortAscending=t.randomCallback=t.positiveCallback=t.negativeCallback=t.quickDeleteFromArray=t.deleteFromArray=void 0,t.deleteFromArray=function(e,t){const n=e.indexOf(t);return-1!==n&&(e.splice(n,1),!0)},t.quickDeleteFromArray=function(e,t){const n=e.indexOf(t);return-1!==n&&(e[n]=e[e.length-1],e.length=e.length-1,!0)},t.negativeCallback=()=>!1,t.positiveCallback=()=>!0,t.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124",t.sortAscending=(e,t)=>e.order>t.order?1:e.order<t.order?-1:0,t.sortDescending=(e,t)=>e.order>t.order?-1:e.order<t.order?1:0},390:(e,t,n)=>{t.cP=void 0;const s=n(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(e,t){this.observable=e,this.isPipe=!!t}static callbackSend(e,t){const n=t.listener;return n&&t.observable?t.isListenPaused?void 0:t.isPipe?t.emitByPositiveCondition&&t.emitByPositiveCondition(e)||t.emitByNegativeCondition&&!t.emitByNegativeCondition(e)?n(e):t.once.isOnce?(t.once.isFinished=!0,n(e),t.unsubscribe()):t.unsubscribeByNegativeCondition?t.unsubscribeByNegativeCondition(e)?n(e):(t.unsubscribeByNegativeCondition=null,t.unsubscribe()):t.unsubscribeByPositiveCondition?t.unsubscribeByPositiveCondition(e)?(t.unsubscribeByPositiveCondition=null,t.unsubscribe()):n(e):t.emitMatchCondition&&t.emitMatchCondition(e)===e?n(e):void 0:n(e):t.unsubscribe()}subscribe(e,t){return this.listener=e,t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(e){try{i.callbackSend(e,this)}catch(t){this.errorHandler(e,t)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return this.unsubscribeByNegativeCondition=e??s.negativeCallback,this}unsubscribeByPositive(e){return this.unsubscribeByPositiveCondition=e??s.positiveCallback,this}emitByNegative(e){return this.emitByNegativeCondition=e??s.positiveCallback,this}emitByPositive(e){return this.emitByPositiveCondition=e??s.negativeCallback,this}emitMatch(e){return this.emitMatchCondition=e??s.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}t.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(e){this.value=e}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++)this.unSubscribe(this.listenersForUnsubscribe[t]);this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.quickDeleteFromArray)(this.listeners,e)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(this._isDestroyed)return;if(!e)return;const n=new i(this,!1);return n.subscribe(e,t),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const e=new i(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}(()=>{var e,t,s=n(390);function i(e){return`qsi-${e}`}function o(e,t){return e?e.getAttribute(i(t)):""}function r(e,t,n){e&&e.setAttribute(i(t),n)}function a(e,t){e&&e.removeAttribute(i(t))}!function(e){e.INFO="i",e.INJECT_TO="inject_to",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(e||(e={})),Object.keys(e),function(e){e.TEXT_VALUE="txt-val",e.QSI_BIND="qsi-bind"}(t||(t={}));var l=n(512),c=n(951);const h=":";var u;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(u||(u={}));const d=window,m=document,_=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,b=(function(){const e=navigator.userAgentData;if(e&&e.mobile)return!0;if(e&&_.test(e.platform))return!0;if(_.test(navigator.userAgent)||_.test(navigator.platform))return!0;const t=d.matchMedia;t&&t("(pointer:coarse)").matches}(),d.top,"APP_$$$_dfohirglkbjwefoi"+Date.now()),f="_______$$bool";function C(n){class r extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=r.ahe_Counter,r.ahe_Counter++,this.onAdopted$=new s.cP(!1),this.onInit$=new s.cP(!1),this.onDestroy$=new s.cP(!1),this.attributeChanged$=new s.cP(void 0),this.beforeDetectChanges$=new s.cP(!1),this.onChangesDetected$=new s.cP(!1),this.onDataCatch$=new s.cP(void 0),this.onParentChanelReady$=new s.cP(void 0),this.ahe_clr=new l.g,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_bindFunctions=[],this.ahe_bindValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){o(this,e.ON_IF)&&!this.ahe_component[f]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==t.TEXT_VALUE&&this.tagName.toLowerCase()!==t.QSI_BIND&&(function(t){const n=t.querySelectorAll(`*:not([${i(e.INFO)}])`);for(let e=0;e<n.length;e++)E(t,N(t,n[e]))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!o(this,e.ON_IF)||this.ahe_component[f]?this.tagName.toLowerCase()!==t.TEXT_VALUE&&this.tagName.toLowerCase()!==t.QSI_BIND&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_bindFunctions.length=0,this.ahe_bindValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[f]=!0}attributeChangedCallback(e,t,n){this.attributeChanged$.next({name:e,oldValue:t,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_number]?e.htmlElements[this.ahe_number]:[]}detectChanges(e){this.beforeDetectChanges$.next(!0),!e&&this.ahe_ForOfList.length&&function(e){const t=e.ahe_ForOfList;for(let n=0;n<t.length;n++){const s=t[n];E(e,D(e,s.children,e.ahe_component[s.valueName],s.parent,s.template))}}(this),function(e){for(let t=0;t<e.ahe_IfList.length;t++){const n=e.ahe_IfList[t];let s=n.isFunction?!!e.ahe_component[n.valueName]():!!e.ahe_component[n.valueName];if(n.isInversion&&(s=!s),s===n.oldCondition)continue;n.oldCondition=s;const i=n.ifParent.contains(n.ifElement);s?i||w(n.ifParent,n.ifElement):i&&S(n.ifParent,n.ifElement)}}(this),function(e){for(let t=0;t<e.ahe_ClsIfList.length;t++){const n=e.ahe_ClsIfList[t],s=n.classConditions,i=n.element,o=e.ahe_component;for(let e=0;e<s.length;e++){const t=s[e];let n;if(t.isConditionDisabled)n=u.TRUE;else{let e=t.isFunction?!!o[t.conditionName]():!!o[t.conditionName];t.isInversion&&(e=!e),n=e?u.TRUE:u.FALSE}if(n===t.oldCondition)continue;t.oldCondition=n;const r=t.firstClassName,a=t.secondClassName;a?n===u.TRUE?(k(i,[r]),x(i,[a])):(k(i,[a]),x(i,[r])):t.isConditionDisabled||n===u.TRUE?k(i,[r]):x(i,[r])}}}(this),function(e){for(let t=0;t<e.ahe_bindValues.length;t++){const n=e.ahe_bindValues[t],s=e.ahe_component[n.valueName];n.lastData!==s&&(n.textElement.textContent=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_bindFunctions.length;t++){const n=e.ahe_bindFunctions[t],s=e.ahe_component[n.valueName]();n.lastData!==s&&(n.textElement.textContent=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_nValues.length;t++){const n=e.ahe_nValues[t],s=e.ahe_component[n.valueName];n.lastData!==s&&(n.textElement.innerHTML=s,n.lastData=s)}}(this),function(e){for(let t=0;t<e.ahe_nFunctions.length;t++){const n=e.ahe_nFunctions[t],s=e.ahe_component[n.valueName]();n.lastData!==s&&(n.textElement.innerHTML=s,n.lastData=s)}}(this),this.onChangesDetected$.next(!0)}sendData(e){this.onDataCatch$.next(e)}getChannel(e){if(e){if(e.isCustomAppElement)return e;if(e.ahe_component&&e.sendData)return e.isCustomAppElement=!0,e}}transferToChannel(e,t){this.onMessage$().pipe().emitByPositive((()=>e())).subscribe((n=>{e().sendData(t(n))}))}sendToChannel(e,t){e&&e.sendData(t)}isAppElement(e){return!!this.getChannel(e)}collect(...e){this.ahe_clr.collect(...e)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return r.ahe_Counter=0,r}function E(n,s){if(!s.length)return;let i="[";if(s.length>1){for(let t=0;t<s.length;t++){const o=s[t];i+=g(n,o),r(o,e.INFO,i.trim()+"]"),o.ahe_parent_chanel=n,o.onParentChanelReady$.next(n)}return}const l=s[0];!function(e,n){if(n.tagName.toLowerCase()===t.TEXT_VALUE){if(!n.innerHTML)return!1;const t=L(e,n.innerHTML);return t.isFunction?(e.ahe_nFunctions.push({textElement:n,valueName:t.valueName,lastData:b}),!0):(e.ahe_nValues.push({textElement:n,valueName:t.valueName,lastData:b}),!0)}return!1}(n,l)?function(e,n){if(n.tagName.toLowerCase()===t.QSI_BIND){if(!n.innerHTML)return!1;const t=L(e,n.innerHTML);return t.isFunction?(e.ahe_bindFunctions.push({textElement:n,valueName:t.valueName,lastData:b}),!0):(e.ahe_bindValues.push({textElement:n,valueName:t.valueName,lastData:b}),!0)}return!1}(n,l)?r(l,e.INFO,i+"bind]"):(i+=function(t,n){const s=function(e,t){const n=o(e,t);return n?(a(e,t),n):""}(n,e.INJECT_TO);return s?(t.ahe_component[s]=n,"inj "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_CLICK);return s?(n.onclick=e=>y(t,s,e),"clk "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_MOUSE_LEAVE);return s?(n.onmouseleave=e=>y(t,s,e),"mlv "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_MOUSE_ENTER);return s?(n.onmouseenter=e=>y(t,s,e),"mer "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_MOUSE_UP);return s?(n.onmouseup=e=>y(t,s,e),"mup "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_MOUSE_DOWN);return s?(n.onmousedown=e=>y(t,s,e),"mdn "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_MOUSE_MOVE);return s?(n.onmousemove=e=>y(t,s,e),"mmv "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_KEY_DOWN);return s?(n.onkeydown=e=>y(t,s,e),"kdn "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_KEY_UP);return s?(n.onkeyup=e=>y(t,s,e),"kup "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_KEY_DBL_CLICK);return s?(n.ondblclick=e=>y(t,s,e),"dbc "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_SCROLL);return s?(n.onscroll=e=>y(t,s,e),"scl "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_WHEEL);return s?(n.onwheel=e=>y(t,s,e),"whl "):""}(n,l),i+=function(t,n){const s=A(t,n,e.ON_CHANGE);return s?(n.onchange=e=>y(t,s,e),"chg "):""}(n,l),i+=function(t,n){const s=o(n,e.ON_HANDLE);return s?(O(t,s,n),a(n,e.ON_HANDLE),"elt "):""}(n,l),i+=g(n,l),i+=function(t,n){let s=o(n,e.CLASS_IF);if(!s)return"";const i=s.split(" "),r=[],l={element:n,classConditions:r};for(let e=0;e<i.length;e++){const n=i[e];if(n.includes("?")){const e=n.split("?"),s=L(t,e[0]),i=e[1].split(h);r.push({conditionName:s.valueName,isFunction:s.isFunction,isInversion:s.isInversion,isConditionDisabled:!1,oldCondition:u.UNDEFINED,firstClassName:i[0],secondClassName:i[1]})}else if(n.includes(h)){const e=n.split(h),s=L(t,e[1]);r.push({conditionName:s.valueName,isFunction:s.isFunction,isInversion:s.isInversion,isConditionDisabled:!1,oldCondition:u.UNDEFINED,firstClassName:e[0],secondClassName:""})}else r.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:u.UNDEFINED,firstClassName:n,secondClassName:""})}return t.ahe_ClsIfList.push(l),a(n,e.CLASS_IF),"cls "}(n,l),r(l,e.INFO,i.trim()+"]"),l.isCustomAppElement&&(l.ahe_parent_chanel=n,l.onParentChanelReady$.next(n))):r(l,e.INFO,i+"var]")}function g(n,s){let i=o(s,e.ON_IF);if(!i)return"";const l=T(t.TEXT_VALUE),c=s.parentElement,h=L(n,i);return n.ahe_IfList.push({ifElement:s,valueName:h.valueName,ifParent:l,oldCondition:!1,isInversion:h.isInversion,isFunction:h.isFunction}),c.insertBefore(l,s),S(c,s),a(s,e.ON_IF),r(l,e.INFO,"[ifp]"),"ifc "}const p=[0];function N(n,s){if(s.tagName.toLowerCase()===t.TEXT_VALUE)return(p[0]=s)&&p;if(s.tagName.toLowerCase()===t.QSI_BIND)return(p[0]=s)&&p;if(!n.isAppElement(s))return(p[0]=s)&&p;const i=o(s,e.FOR);if(!i)return(p[0]=s)&&p;const l=n.ahe_component[i];if(!l)return(p[0]=s)&&p;const c=T(t.TEXT_VALUE),h=s.parentElement,u=D(n,[],l,c,s);return r(c,e.INFO,"[for-of]"),h.insertBefore(c,s),S(h,s),a(s,e.FOR),n.ahe_ForOfList.push({parent:c,template:s,children:u,valueName:i}),u}function v(e,t,n){n.isAppElement(t)&&t.sendData(e)}function D(t,n,s,i,a){const l=[],h=n.length,u=s.length;let d=u-h;if(!(u+h))return l;if(d>0){for(let c=0;c<d;c++){const h=T(a.tagName);n.push(h),l.push(h);const m=o(a,e.ON_IF);m&&r(h,e.ON_IF,m),w(i,h),v(s[u-d+c],h,t)}for(let e=0;e<u-d;e++)v(s[e],n[e],t)}else{d*=-1;for(let e=0;e<d;e++){const e=n.pop(),s=t.ahe_IfList;let o;for(let t=0;t<s.length;t++){const n=s[t];if(n.ifElement===e){o=n;break}}o?((0,c.quickDeleteFromArray)(s,o),S(i,o.ifParent)):S(i,e)}for(let e=0;e<u;e++)v(s[e],n[e],t)}return l}function L(e,t){const n="!"===t[0],s=n?t.substring(1):t;return{isInversion:n,valueName:s,isFunction:"function"==typeof e.ahe_component[s]}}function y(e,t,n){e.ahe_component[t](n)}function A(e,t,n){const s=o(t,n);return s?(O(e,s,t),a(t,n),s):""}function O(e,t,n){const s=e.ahe_component[t];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[e.ahe_number]||(s.htmlElements[e.ahe_number]=[]),e.ahe_clr.collect(e.destroy$().subscribe((e=>e&&(s.htmlElements={})))),s.htmlElements[e.ahe_number].push(n))}const P="{display: contents !important;}",I=[`html-block ${P}`];function F(e){for(let t=0;t<e.length;t++)I.push(`${e[t].tagName} ${P}`);j((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].targetElement)}))}function $(e,t,n){return{tagName:t,targetElement:C({template:n,element:e})}}let M;function T(e){return m.createElement(e)}function U(e){const t=T("style");return t.innerHTML=e,t}function x(e,t){if(e)for(let n=0;n<t.length;n++)e.classList.remove(t[n])}function k(e,t){if(e)for(let n=0;n<t.length;n++)e.classList.add(t[n])}function w(e,t){e&&t&&e.appendChild(t)}function S(e,t){e&&t&&e.removeChild(t)}const R=new s.cP(!1);let B,V,H,K,X=!1;function j(e){R.pipe().setOnce().subscribe((t=>t&&e())),function(){if(m.body)return void R.next(!0);if(X)return;X=!0;const e=()=>{R.next(!0),m.removeEventListener("DOMContentLoaded",e),X=!1};m.addEventListener("DOMContentLoaded",e)}()}const q=new class{constructor(e,t,n,s){B=e,V=t,H=n,K=s,M=this}set major(e){V=e}set minor(e){H=e}set patch(e){K=e}set name(e){B=e}get version(){return`${V}.${H}.${K}`}get name(){return B}get description(){return`[${B} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){M?console.log(M.description,...e):console.log("APP",...e)}("STARTED")}}("test_obsevrable",1,0,0);var Y;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(Y||(Y={}));const z=new s.cP(Y.EN),Q=new class{get currentLocation(){return z.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return z.subscribe(e)}setLocation(e){z.next(e)}destroy(){z.destroy()}},W=new s.cP(void 0),G=M.name;let J="";for(let e=0;e<G.length;e++){const t=G[e];let n="";for(let e=0;e<26;e++){const s="abcdefghijklmnopqrstuvwxyz"[e];if(s===t.toLowerCase()){n=s;break}}J+=n||"-"}const Z="app-"+J,ee=[$(class{constructor(e){this.root=e,this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},Z,"<app-main></app-main>"),$(class{constructor(e){this.root=e,this.name=e.tagName,this.message=""}onCreate(){this.root.collect(W.pipe().unsubscribeByPositive((e=>e.number>11)).subscribe((e=>{e&&(console.log(e.number),this.message="Listener1 catch: "+e.text+e.number,e.number>10&&(this.message="Да задобал кликать !!!"),this.root.detectChanges())})))}onInit(){}onDestroy(){}},"app-listener1","<div><qsi-bind>message</qsi-bind></div>"),$(class{constructor(e){this.root=e,this.name=e.tagName,this.message=""}onCreate(){W.subscribe((e=>{e&&(this.message="Listener2 catch: "+e.text+e.number,this.root.detectChanges())}))}onInit(){}onDestroy(){}},"app-listener2","<div><qsi-bind>message</qsi-bind></div>"),$(class{constructor(e){this.root=e,this.name=e.tagName,this.message=""}onCreate(){W.subscribe((e=>{e&&(this.message="Listener3 catch: "+e.text+e.number,this.root.detectChanges())}))}onInit(){}onDestroy(){}},"app-listener3","<div><qsi-bind>message</qsi-bind></div>"),$(class{constructor(e){this.root=e,this.name=e.tagName,this.message=""}onCreate(){W.subscribe((e=>{e&&(this.message="Listener4 catch: "+e.text+e.number,this.root.detectChanges())}))}onInit(){}onDestroy(){}},"app-listener4","<div><qsi-bind>message</qsi-bind></div>"),$(class{constructor(e){this.root=e,this.root=e,this.name=e.tagName,this.counter=0}onCreate(){}onInit(){W.next({text:"Main initialized",number:0})}click(){this.counter++,W.next({text:"Main click",number:this.counter})}onDestroy(){}},"app-main","<div class='mas_l_hWq' qsi-click='click'>CLICK ME</div><app-listener1></app-listener1><app-listener2></app-listener2><app-listener3></app-listener3><app-listener4></app-listener4>")],te=C({template:"",element:class{}}),ne=C({template:"",element:class{}});F([{tagName:t.TEXT_VALUE,targetElement:te},{tagName:t.QSI_BIND,targetElement:ne}]);const se=new class{constructor(){this.isComponentMode=!1}register(e){F(e)}run(e){this.isComponentMode=!!e,j((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=T(Z))}start(){const e=U(I.join("")),t=U(".mas_l_hWq {width: 100px;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;background: #108b55;border-radius: 20px;}.mas_l_hWq:hover {opacity: 0.5;}");w(m.head,e),w(m.head,t),!this.isComponentMode&&w(m.body,this.appElement)}};q.init(),Q.setLocation(Y.EN),se.register(ee),se.run()})()})();
