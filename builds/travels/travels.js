(()=>{"use strict";var e={909:(e,t,n)=>{t.P=void 0;const s=n(594);t.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...e){if(this._isDestroyed)return null;for(let t=0;t<e.length;t++){const n=e[t];n&&this.list.push(n)}}unsubscribe(e){if(this._isDestroyed)return null;e&&e.unsubscribe(),(0,s.deleteFromArray)(this.list,e)}unsubscribeAll(){if(this._isDestroyed)return null;const e=this.list.length;for(let t=0;t<e;t++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deleteFromArray=void 0,t.deleteFromArray=function(e,t){const n=e.indexOf(t);if(-1===n)return!1;const s=e.length-1;for(let t=n;t<s;)e[t++]=e[t];return e.length=s,!0}},637:(e,t,n)=>{t.y$=void 0;const s=n(594);class i{constructor(e,t){this.isMarkedForUnsubscribe=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=e,this.isPipe=!!t}static callbackSend(e,t){const n=t.listener;if(n)switch(!0){case!t.observable:return void t.unsubscribe();case t.isListenPaused:return;case!t.isPipe:return void n(e);case t.once.isOnce:t.once.isFinished=!0,n(e),t.unsubscribe();break;case!!t.unsubscribeByNegativeCondition:if(!t.unsubscribeByNegativeCondition(e))return t.unsubscribeByNegativeCondition=null,void t.unsubscribe();n(e);break;case!!t.unsubscribeByPositiveCondition:if(t.unsubscribeByPositiveCondition(e))return t.unsubscribeByPositiveCondition=null,void t.unsubscribe();n(e);break;case!!t.emitByNegativeCondition:!t.emitByNegativeCondition(e)&&n(e);break;case!!t.emitByPositiveCondition:t.emitByPositiveCondition(e)&&n(e);break;case!!t.emitMatchCondition:t.emitMatchCondition(e)===e&&n(e)}else t.unsubscribe()}subscribe(e,t){return this.listener=e,t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(e){try{i.callbackSend(e,this)}catch(t){this.errorHandler(e,t)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return"function"!=typeof e&&(e=()=>!1),this.unsubscribeByNegativeCondition=e,this}unsubscribeByPositive(e){return"function"!=typeof e&&(e=()=>!0),this.unsubscribeByPositiveCondition=e,this}emitByNegative(e){return"function"!=typeof e&&(e=()=>!0),this.emitByNegativeCondition=e,this}emitByPositive(e){return"function"!=typeof e&&(e=()=>!1),this.emitByPositiveCondition=e,this}emitMatch(e){return"function"!=typeof e&&(e=()=>`ERROR CONDITION TYPE ${typeof e},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=e,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}t.y$=class{constructor(e){this.value=e,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=e;const t=this.listeners.length;for(let n=0;n<t;n++)this.listeners[n].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++){const e=this.listenersForUnsubscribe[t];this.unSubscribe(e)}this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.deleteFromArray)(this.listeners,e)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(this._isDestroyed)return;if(!e)return;const n=new i(this,!1);return n.subscribe(e,t),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const e=new i(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}(()=>{var e,t,s,i=n(637);function o(e){return`data-${e}`}function r(e,t){return e?e.getAttribute(o(t)):""}function a(e,t,n){e&&e.setAttribute(o(t),n)}function c(e,t){e&&e.removeAttribute(o(t))}!function(e){e.INFO="i",e.INJECT_TO="inject_to",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(e||(e={})),Object.keys(e),function(e){e.TEXT_VALUE="txt-val"}(t||(t={})),function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(s||(s={}));var h=n(909),u=n(594);const l=":",d="_______$$bool";function _(n){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.y$(!1),this.onInit$=new i.y$(!1),this.onDestroy$=new i.y$(!1),this.attributeChanged$=new i.y$(void 0),this.beforeDetectChanges$=new i.y$(!1),this.onChangesDetected$=new i.y$(!1),this.onDataCatch$=new i.y$(void 0),this.onParentChanelReady$=new i.y$(void 0),this.ahe_clr=new h.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,e.ON_IF)&&!this.ahe_component[d]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==t.TEXT_VALUE&&(function(t){const n=(s=t,Array.from(s.querySelectorAll(`*:not([${o(e.INFO)}])`)));var s;for(const e of n)f(t,E(t,e))}(this),this.detectChanges(),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,e.ON_IF)||this.ahe_component[d]?this.tagName.toLowerCase()!==t.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[d]=!0}attributeChangedCallback(e,t,n){this.attributeChanged$.next({name:e,oldValue:t,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_number]?e.htmlElements[this.ahe_number]:[]}detectChanges(){this.beforeDetectChanges$.next(!0),function(e){const t=e.ahe_ForOfList;for(const n of t)f(e,p(e,n.children,e.ahe_component[n.valueName],n.parent,n.template))}(this),function(e){if(e)for(const t of e.ahe_IfList){let n=t.isFunction?!!e.ahe_component[t.valueName]():!!e.ahe_component[t.valueName];if(t.isInversion&&(n=!n),n===t.oldCondition)continue;t.oldCondition=n;const s=t.ifParent.contains(t.ifElement);n?s||M(t.ifParent,t.ifElement):s&&U(t.ifParent,t.ifElement)}}(this),function(e){if(e)for(const t of e.ahe_ClsIfList){const n=t.classConditions,i=t.element,o=e.ahe_component;for(const e of n){let t;if(e.isConditionDisabled)t=s.TRUE;else{let n=e.isFunction?!!o[e.conditionName]():!!o[e.conditionName];e.isInversion&&(n=!n),t=n?s.TRUE:s.FALSE}if(t===e.oldCondition)continue;e.oldCondition=t;const n=e.firstClassName,r=e.secondClassName;r?t===s.TRUE?(T(i,[n]),I(i,[r])):(T(i,[r]),I(i,[n])):e.isConditionDisabled||t===s.TRUE?T(i,[n]):I(i,[n])}}}(this),function(e){if(e)for(const t of e.ahe_nValues){const n=""+e.ahe_component[t.valueName];t.textElement.innerHTML!==n&&(t.textElement.innerHTML=n)}}(this),function(e){if(e)for(const t of e.ahe_nFunctions){const n=""+e.ahe_component[t.valueName]();t.textElement.innerHTML!==n&&(t.textElement.innerHTML=n)}}(this),this.onChangesDetected$.next(!0)}sendData(e){this.onDataCatch$.next(e)}getChanel(e){if(e&&e.ahe_component&&e.sendData)return e}isAppElement(e){return!!this.getChanel(e)}collect(...e){this.ahe_clr.collect(...e)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function f(n,i){if(!i.length)return;let o="[";if(i.length>1){for(const t of i)o+=m(n,t),a(t,e.INFO,o.trim()+"]"),t.ahe_parent_chanel=n.getChanel(n),t.onParentChanelReady$.next(t.ahe_parent_chanel);return}const h=i[0];!function(e,n){if(n.tagName.toLowerCase()===t.TEXT_VALUE){if(!n.innerHTML)return!1;const t=C(e,n.innerHTML);return t.isFunction?(e.ahe_nFunctions.push({textElement:n,valueName:t.valueName}),!0):(e.ahe_nValues.push({textElement:n,valueName:t.valueName}),!0)}return!1}(n,h)?(o+=function(t,n){const s=function(e,t,n){const s=r(t,n);return s&&e?(c(t,n),s):""}(t,n,e.INJECT_TO);return s?(t.ahe_component[s]=n,"inj "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_CLICK);return s?(n.onclick=e=>N(t,s,e),"clk "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_MOUSE_LEAVE);return s?(n.onmouseleave=e=>N(t,s,e),"mlv "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_MOUSE_ENTER);return s?(n.onmouseenter=e=>N(t,s,e),"mer "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_MOUSE_UP);return s?(n.onmouseup=e=>N(t,s,e),"mup "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_MOUSE_DOWN);return s?(n.onmousedown=e=>N(t,s,e),"mdn "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_MOUSE_MOVE);return s?(n.onmousemove=e=>N(t,s,e),"mmv "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_KEY_DOWN);return s?(n.onkeydown=e=>N(t,s,e),"kdn "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_KEY_UP);return s?(n.onkeyup=e=>N(t,s,e),"kup "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_KEY_DBL_CLICK);return s?(n.ondblclick=e=>N(t,s,e),"dbc "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_SCROLL);return s?(n.onscroll=e=>N(t,s,e),"scl "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_WHEEL);return s?(n.onwheel=e=>N(t,s,e),"whl "):""}(n,h),o+=function(t,n){const s=y(t,n,e.ON_CHANGE);return s?(n.onchange=e=>N(t,s,e),"chg "):""}(n,h),o+=function(t,n){const s=r(n,e.ON_HANDLE);return s&&t?(g(t,s,n),c(n,e.ON_HANDLE),"elt "):""}(n,h),o+=m(n,h),o+=function(t,n){let i=r(n,e.CLASS_IF);if(!i)return"";const o=i.split(" "),a=[],h={element:n,classConditions:a};for(const e of o)if(e.includes("?")){const n=e.split("?"),i=C(t,n[0]),o=n[1].split(l);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(e.includes(l)){const n=e.split(l),i=C(t,n[1]);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:n[0],secondClassName:""})}else a.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:s.UNDEFINED,firstClassName:e,secondClassName:""});return t.ahe_ClsIfList.push(h),c(n,e.CLASS_IF),"cls "}(n,h),a(h,e.INFO,o.trim()+"]")):a(h,e.INFO,o+"var]"),n.isAppElement(h)&&(h.ahe_parent_chanel=n.getChanel(n),h.onParentChanelReady$.next(h.ahe_parent_chanel))}function m(n,s){let i=r(s,e.ON_IF);if(!i)return"";const o=F(t.TEXT_VALUE),h=s.parentElement,u=C(n,i);return n.ahe_IfList.push({ifElement:s,valueName:u.valueName,ifParent:o,oldCondition:!1,isInversion:u.isInversion,isFunction:u.isFunction}),h.insertBefore(o,s),U(h,s),c(s,e.ON_IF),a(o,e.INFO,"[ifp]"),"ifc "}const b=[0];function E(n,s){if(s.tagName.toLowerCase()===t.TEXT_VALUE)return(b[0]=s)&&b;if(!n.isAppElement(s))return(b[0]=s)&&b;const i=r(s,e.FOR);if(!i)return(b[0]=s)&&b;const o=n.ahe_component[i];if(!o)return(b[0]=s)&&b;const h=F(t.TEXT_VALUE),u=s.parentElement;u.insertBefore(h,s),U(u,s),c(s,e.FOR),a(h,e.INFO,"[for-of]");const l=p(n,[],o,h,s);return n.ahe_ForOfList.push({parent:h,template:s,children:l,valueName:i}),l}function p(t,n,s,i,o){const c=[],h=n.length,l=s.length;let d=l-h;if(d>0)for(let t=0;t<d;t++){const t=F(o.tagName);n.push(t),c.push(t);const s=r(o,e.ON_IF);s&&a(t,e.ON_IF,s),M(i,t)}else{d*=-1;for(let e=0;e<d;e++){const e=n.pop(),s=t.ahe_IfList;let o;for(const t of s)if(t.ifElement===e){o=t;break}o?((0,u.deleteFromArray)(s,o),U(i,o.ifParent)):U(i,e)}}for(let e=0;e<l;e++){const i=s[e],o=n[e],r=t.getChanel(o);r&&r.sendData(i)}return c}function C(e,t){const n="!"===t[0],s=n?t.substring(1):t;return{isInversion:n,valueName:s,isFunction:"function"==typeof e.ahe_component[s]}}function N(e,t,n){e.ahe_component[t](n)}function y(e,t,n){const s=r(t,n);return s&&e?(g(e,s,t),c(t,n),s):""}function g(e,t,n){const s=e.ahe_component[t];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[e.ahe_number]||(s.htmlElements[e.ahe_number]=[]),e.ahe_clr.collect(e.destroy$().subscribe((e=>e&&(s.htmlElements={})))),s.htmlElements[e.ahe_number].push(n))}const v="{display: contents !important;}",O=[`html-block ${v}`];function L(e){for(const t of e)O.push(`${t.tagName} ${v}`);H((()=>{for(const t of e)customElements.define(t.tagName,t.targetElement)}))}function A(e,t,n){return{tagName:t,targetElement:_({template:n,element:e})}}const D=document;let $;function F(e){return D.createElement(e)}function P(e){const t=F("style");return t.innerHTML=e,t}function I(e,t){if(e)for(const n of t)e.classList.remove(n)}function T(e,t){if(e)for(const n of t)e.classList.add(n)}function M(e,t){e&&t&&e.appendChild(t)}function U(e,t){e&&t&&e.removeChild(t)}const R=new i.y$(!1);let x,w,S,k,B=!1;function H(e){R.pipe().setOnce().subscribe((t=>t&&e())),D.body?R.next(!0):B||(B=!0,D.addEventListener("DOMContentLoaded",(()=>{R.next(!0)})))}const V=new class{constructor(e,t,n,s){x=e,w=t,S=n,k=s,$=this}set major(e){w=e}set minor(e){S=e}set patch(e){k=e}set name(e){x=e}get version(){return`${w}.${S}.${k}`}get name(){return x}get description(){return`[${x} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){$?console.log($.description,...e):console.log("APP",...e)}("STARTED")}}("travels",1,0,0);var K;let X;!function(e){e[e.EN=0]="EN",e[e.UA=1]="UA",e[e.HE=2]="HE"}(K||(K={}));class Y extends h.P{constructor(e){super(),X=new i.y$(e)}get current(){return X.getValue()}getText(e,t){return e[t]}onChange(e){this.collect(X.subscribe(e))}set(e){X.next(e)}destroy(){super.destroy(),X.destroy()}}const j=new Y(K.EN),W=$.name;let z="";for(let e=0;e<W.length;e++){const t=W[e];let n="";for(let e=0;e<26;e++){const s="abcdefghijklmnopqrstuvwxyz"[e];if(s===t.toLowerCase()){n=s;break}}z+=n||"-"}const q="app-"+z,G=[A(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},q,"<div class='G_c-L-tct'><app-main data-inject_to='main'></app-main></div>"),A(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-main","<main class='sZe_a_N-e'><app-header data-inject_to='header'></app-header><app-body data-inject_to='body'></app-body><app-footer data-inject_to='footer'></app-footer></main>"),A(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-header","<div class='x_z-kSeEq'> Hello header.html</div>"),A(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-body","<div class='cL7_T_8_r'> Hello body.html</div>"),A(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-footer","<div class='r-z_YUsSw'> Hello footer.html</div>")],J=_({template:"",element:class{}});L([{tagName:t.TEXT_VALUE,targetElement:J}]);const Q=new class{constructor(){this.isComponentMode=!1}register(e){L(e)}run(e){this.isComponentMode=!!e,H((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=F(q))}start(){const e=P(O.join("")),t=P("body {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.G_c-L-tct {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100vw;height: 100vh;min-width: 100vw;min-height: 100vh;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.G_c-L-tct * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.G_c-L-tct * {background: rgba(0, 250, 250, 0.2);}.G_c-L-tct .sZe_a_N-e {width: 100%;height: 100%;min-width: 100%;min-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.G_c-L-tct .x_z-kSeEq {width: 100%;height: 60px;}.G_c-L-tct .cL7_T_8_r {width: 100%;height: 100%;}.G_c-L-tct .r-z_YUsSw {width: 100%;height: 60px;}");M(D.head,e),M(D.head,t),!this.isComponentMode&&M(D.body,this.appElement)}};V.init(),j.set(K.EN),Q.register(G),Q.run()})()})();