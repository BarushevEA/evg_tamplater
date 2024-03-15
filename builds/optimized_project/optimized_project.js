(()=>{"use strict";var e={512:(e,t,n)=>{t.g=void 0;const s=n(951);t.g=class{list=[];_isDestroyed=!1;collect(...e){this._isDestroyed||this.list.push(...e)}unsubscribe(e){this._isDestroyed||(e?.unsubscribe(),(0,s.quickDeleteFromArray)(this.list,e))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomCallback=t.positiveCallback=t.negativeCallback=t.quickDeleteFromArray=t.deleteFromArray=void 0,t.deleteFromArray=function(e,t){const n=e.indexOf(t);return-1!==n&&(e.splice(n,1),!0)},t.quickDeleteFromArray=function(e,t){const n=e.indexOf(t);return-1!==n&&(e[n]=e[e.length-1],e.length=e.length-1,!0)},t.negativeCallback=()=>!1,t.positiveCallback=()=>!0,t.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124"},390:(e,t,n)=>{t.cP=void 0;const s=n(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(e,t){this.observable=e,this.isPipe=!!t}static callbackSend(e,t){const n=t.listener;return n&&t.observable?t.isListenPaused?void 0:t.isPipe?t.emitByPositiveCondition&&t.emitByPositiveCondition(e)||t.emitByNegativeCondition&&!t.emitByNegativeCondition(e)?n(e):t.once.isOnce?(t.once.isFinished=!0,n(e),t.unsubscribe()):t.unsubscribeByNegativeCondition?t.unsubscribeByNegativeCondition(e)?n(e):(t.unsubscribeByNegativeCondition=null,t.unsubscribe()):t.unsubscribeByPositiveCondition?t.unsubscribeByPositiveCondition(e)?(t.unsubscribeByPositiveCondition=null,t.unsubscribe()):n(e):t.emitMatchCondition&&t.emitMatchCondition(e)===e?n(e):void 0:n(e):t.unsubscribe()}subscribe(e,t){return this.listener=e,t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(e){try{i.callbackSend(e,this)}catch(t){this.errorHandler(e,t)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return this.unsubscribeByNegativeCondition=e??s.negativeCallback,this}unsubscribeByPositive(e){return this.unsubscribeByPositiveCondition=e??s.positiveCallback,this}emitByNegative(e){return this.emitByNegativeCondition=e??s.positiveCallback,this}emitByPositive(e){return this.emitByPositiveCondition=e??s.negativeCallback,this}emitMatch(e){return this.emitMatchCondition=e??s.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}t.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(e){this.value=e}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++)this.unSubscribe(this.listenersForUnsubscribe[t]);this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.quickDeleteFromArray)(this.listeners,e)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(this._isDestroyed)return;if(!e)return;const n=new i(this,!1);return n.subscribe(e,t),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const e=new i(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}(()=>{var e,t,s,i=n(390);function o(e){return`data-${e}`}function r(e,t){return e?e.getAttribute(o(t)):""}function a(e,t,n){e&&e.setAttribute(o(t),n)}function h(e,t){e&&e.removeAttribute(o(t))}!function(e){e.INFO="i",e.INJECT_TO="inject_to",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(e||(e={})),Object.keys(e),function(e){e.TEXT_VALUE="txt-val"}(t||(t={})),function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(s||(s={}));var c=n(512),l=n(951);const u=":",d="_______$$bool";function m(n){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.cP(!1),this.onInit$=new i.cP(!1),this.onDestroy$=new i.cP(!1),this.attributeChanged$=new i.cP(void 0),this.beforeDetectChanges$=new i.cP(!1),this.onChangesDetected$=new i.cP(!1),this.onDataCatch$=new i.cP(void 0),this.onParentChanelReady$=new i.cP(void 0),this.ahe_clr=new c.g,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,e.ON_IF)&&!this.ahe_component[d]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==t.TEXT_VALUE&&(function(t){const n=(s=t,Array.from(s.querySelectorAll(`*:not([${o(e.INFO)}])`)));var s;for(let e=0;e<n.length;e++){const s=n[e];s.isCustomAppElement=t.isAppElement(s),_(t,f(t,s))}}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,e.ON_IF)||this.ahe_component[d]?this.tagName.toLowerCase()!==t.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[d]=!0}attributeChangedCallback(e,t,n){this.attributeChanged$.next({name:e,oldValue:t,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_number]?e.htmlElements[this.ahe_number]:[]}detectChanges(e){this.beforeDetectChanges$.next(!0),!e&&function(e){const t=e.ahe_ForOfList;for(let n=0;n<t.length;n++){const s=t[n];_(e,g(e,s.children,e.ahe_component[s.valueName],s.parent,s.template))}}(this),function(e){if(e)for(let t=0;t<e.ahe_IfList.length;t++){const n=e.ahe_IfList[t];let s=n.isFunction?!!e.ahe_component[n.valueName]():!!e.ahe_component[n.valueName];if(n.isInversion&&(s=!s),s===n.oldCondition)continue;n.oldCondition=s;const i=n.ifParent.contains(n.ifElement);s?i||M(n.ifParent,n.ifElement):i&&k(n.ifParent,n.ifElement)}}(this),function(e){if(e)for(let t=0;t<e.ahe_ClsIfList.length;t++){const n=e.ahe_ClsIfList[t],i=n.classConditions,o=n.element,r=e.ahe_component;for(let e=0;e<i.length;e++){const t=i[e];let n;if(t.isConditionDisabled)n=s.TRUE;else{let e=t.isFunction?!!r[t.conditionName]():!!r[t.conditionName];t.isInversion&&(e=!e),n=e?s.TRUE:s.FALSE}if(n===t.oldCondition)continue;t.oldCondition=n;const a=t.firstClassName,h=t.secondClassName;h?n===s.TRUE?($(o,[a]),I(o,[h])):($(o,[h]),I(o,[a])):t.isConditionDisabled||n===s.TRUE?$(o,[a]):I(o,[a])}}}(this),function(e){if(e)for(let t=0;t<e.ahe_nValues.length;t++){const n=e.ahe_nValues[t],s=""+e.ahe_component[n.valueName];n.textElement.innerHTML!==s&&(n.textElement.innerHTML=s)}}(this),function(e){if(e)for(let t=0;t<e.ahe_nFunctions.length;t++){const n=e.ahe_nFunctions[t],s=""+e.ahe_component[n.valueName]();n.textElement.innerHTML!==s&&(n.textElement.innerHTML=s)}}(this),this.onChangesDetected$.next(!0)}sendData(e){this.onDataCatch$.next(e)}getChanel(e){if(e){if(e.isCustomAppElement)return e;if(e.ahe_component&&e.sendData)return e}}transferToChanel(e,t){this.dataCatch$().pipe().emitByPositive((()=>e())).subscribe((n=>{e().sendData(t(n))}))}sendToChanel(e,t){e&&e.sendData(t)}isAppElement(e){return!!this.getChanel(e)}collect(...e){this.ahe_clr.collect(...e)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function _(n,i){if(!i.length)return;let o="[";if(i.length>1){for(let t=0;t<i.length;t++){const s=i[t];o+=b(n,s),a(s,e.INFO,o.trim()+"]"),s.ahe_parent_chanel=n.getChanel(n),s.onParentChanelReady$.next(s.ahe_parent_chanel)}return}const c=i[0];!function(e,n){if(n.tagName.toLowerCase()===t.TEXT_VALUE){if(!n.innerHTML)return!1;const t=C(e,n.innerHTML);return t.isFunction?(e.ahe_nFunctions.push({textElement:n,valueName:t.valueName}),!0):(e.ahe_nValues.push({textElement:n,valueName:t.valueName}),!0)}return!1}(n,c)?(o+=function(t,n){const s=function(e,t,n){const s=r(t,n);return s&&e?(h(t,n),s):""}(t,n,e.INJECT_TO);return s?(t.ahe_component[s]=n,"inj "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_CLICK);return s?(n.onclick=e=>E(t,s,e),"clk "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_MOUSE_LEAVE);return s?(n.onmouseleave=e=>E(t,s,e),"mlv "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_MOUSE_ENTER);return s?(n.onmouseenter=e=>E(t,s,e),"mer "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_MOUSE_UP);return s?(n.onmouseup=e=>E(t,s,e),"mup "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_MOUSE_DOWN);return s?(n.onmousedown=e=>E(t,s,e),"mdn "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_MOUSE_MOVE);return s?(n.onmousemove=e=>E(t,s,e),"mmv "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_KEY_DOWN);return s?(n.onkeydown=e=>E(t,s,e),"kdn "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_KEY_UP);return s?(n.onkeyup=e=>E(t,s,e),"kup "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_KEY_DBL_CLICK);return s?(n.ondblclick=e=>E(t,s,e),"dbc "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_SCROLL);return s?(n.onscroll=e=>E(t,s,e),"scl "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_WHEEL);return s?(n.onwheel=e=>E(t,s,e),"whl "):""}(n,c),o+=function(t,n){const s=N(t,n,e.ON_CHANGE);return s?(n.onchange=e=>E(t,s,e),"chg "):""}(n,c),o+=function(t,n){const s=r(n,e.ON_HANDLE);return s&&t?(v(t,s,n),h(n,e.ON_HANDLE),"elt "):""}(n,c),o+=b(n,c),o+=function(t,n){let i=r(n,e.CLASS_IF);if(!i)return"";const o=i.split(" "),a=[],c={element:n,classConditions:a};for(let e=0;e<o.length;e++){const n=o[e];if(n.includes("?")){const e=n.split("?"),i=C(t,e[0]),o=e[1].split(u);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(n.includes(u)){const e=n.split(u),i=C(t,e[1]);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:e[0],secondClassName:""})}else a.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:s.UNDEFINED,firstClassName:n,secondClassName:""})}return t.ahe_ClsIfList.push(c),h(n,e.CLASS_IF),"cls "}(n,c),a(c,e.INFO,o.trim()+"]")):a(c,e.INFO,o+"var]"),c.isCustomAppElement&&(c.ahe_parent_chanel=n.getChanel(n),c.onParentChanelReady$.next(c.ahe_parent_chanel))}function b(n,s){let i=r(s,e.ON_IF);if(!i)return"";const o=T(t.TEXT_VALUE),c=s.parentElement,l=C(n,i);return n.ahe_IfList.push({ifElement:s,valueName:l.valueName,ifParent:o,oldCondition:!1,isInversion:l.isInversion,isFunction:l.isFunction}),c.insertBefore(o,s),k(c,s),h(s,e.ON_IF),a(o,e.INFO,"[ifp]"),"ifc "}const p=[0];function f(n,s){if(s.tagName.toLowerCase()===t.TEXT_VALUE)return(p[0]=s)&&p;if(!s.isCustomAppElement)return(p[0]=s)&&p;const i=r(s,e.FOR);if(!i)return(p[0]=s)&&p;const o=n.ahe_component[i];if(!o)return(p[0]=s)&&p;const c=T(t.TEXT_VALUE),l=s.parentElement,u=g(n,[],o,c,s);return a(c,e.INFO,"[for-of]"),l.insertBefore(c,s),k(l,s),h(s,e.FOR),n.ahe_ForOfList.push({parent:c,template:s,children:u,valueName:i}),u}function g(t,n,s,i,o){const h=[],c=n.length,u=s.length;let d=u-c;if(d>0)for(let t=0;t<d;t++){const t=T(o.tagName);n.push(t),h.push(t);const s=r(o,e.ON_IF);s&&a(t,e.ON_IF,s),M(i,t)}else{console.log("delta < 0"),d*=-1;for(let e=0;e<d;e++){const e=n.pop(),s=t.ahe_IfList;let o;for(let t=0;t<s.length;t++){const n=s[t];if(n.ifElement===e){o=n;break}}o?((0,l.quickDeleteFromArray)(s,o),k(i,o.ifParent)):k(i,e)}}for(let e=0;e<u;e++){const i=s[e],o=n[e],r=t.getChanel(o);r&&r.sendData(i)}return h}function C(e,t){const n="!"===t[0],s=n?t.substring(1):t;return{isInversion:n,valueName:s,isFunction:"function"==typeof e.ahe_component[s]}}function E(e,t,n){e.ahe_component[t](n)}function N(e,t,n){const s=r(t,n);return s&&e?(v(e,s,t),h(t,n),s):""}function v(e,t,n){const s=e.ahe_component[t];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[e.ahe_number]||(s.htmlElements[e.ahe_number]=[]),e.ahe_clr.collect(e.destroy$().subscribe((e=>e&&(s.htmlElements={})))),s.htmlElements[e.ahe_number].push(n))}const y="{display: contents !important;}",L=[`html-block ${y}`];function A(e){for(let t=0;t<e.length;t++)L.push(`${e[t].tagName} ${y}`);H((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].targetElement)}))}function D(e,t,n){return{tagName:t,targetElement:m({template:n,element:e})}}const O=document;let P;function T(e){return O.createElement(e)}function F(e){const t=T("style");return t.innerHTML=e,t}function I(e,t){if(e)for(let n=0;n<t.length;n++)e.classList.remove(t[n])}function $(e,t){if(e)for(let n=0;n<t.length;n++)e.classList.add(t[n])}function M(e,t){e&&t&&e.appendChild(t)}function k(e,t){e&&t&&e.removeChild(t)}const w=new i.cP(!1);let x,U,S,R,B=!1;function H(e){w.pipe().setOnce().subscribe((t=>t&&e())),O.body?w.next(!0):B||(B=!0,O.addEventListener("DOMContentLoaded",(()=>{w.next(!0)})))}const V=new class{constructor(e,t,n,s){x=e,U=t,S=n,R=s,P=this}set major(e){U=e}set minor(e){S=e}set patch(e){R=e}set name(e){x=e}get version(){return`${U}.${S}.${R}`}get name(){return x}get description(){return`[${x} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){P?console.log(P.description,...e):console.log("APP",...e)}("STARTED")}}("optimized_project",1,0,0);var X;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(X||(X={}));const K=new i.cP(X.EN),j=new class{get currentLocation(){return K.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return K.subscribe(e)}setLocation(e){K.next(e)}destroy(){K.destroy()}},W=new i.cP(!1),q=P.name;let Y="";for(let e=0;e<q.length;e++){const t=q[e];let n="";for(let e=0;e<26;e++){const s="abcdefghijklmnopqrstuvwxyz"[e];if(s===t.toLowerCase()){n=s;break}}Y+=n||"-"}const z="app-"+Y,G=[D(class{constructor(e){this.isShowMain=!0,this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.dataCatch$().subscribe((e=>{console.log("AppRoot dataCatch$:",e)})))}onInit(){this.root.collect(W.subscribe((()=>{this.isShowMain=!this.isShowMain,this.root.detectChanges()})));const e=this.root.getChanel(this.main);e&&e.sendData("Message by AppRoot")}isShowFooter(){return this.isShowMain}},z,"<div class='e-respg_ww'><app-header></app-header><app-main data-if='isShowMain' data-inject_to='main'></app-main><app-main_1 data-if='!isShowMain'></app-main_1><app-footer data-if='isShowFooter'></app-footer></div>"),D(class{constructor(e){this.text="SERG header start after:",this.name=this.text,this.buttonName="NEXT MAIN",this.isRed=!0,this.btnRed="b-kd3egvp",this.btnBlue="VDB9QDb6i",this.root=e}nextMain(e){e.stopPropagation(),e.preventDefault();const t=this.root.getElementsBoundToMethod(this.nextMain);for(const e of t)e.classList.toggle(this.btnBlue),e.classList.toggle(this.btnRed);this.isRed=!this.isRed,W.next(!0),this.root.detectChanges()}onInit(){let e=0;const t=setInterval((()=>{this.name=this.text+" "+e+" ",this.root.detectChanges(),e++,e>5&&clearInterval(t)}),1e3)}},"app-header","<header class='QziDa-LBr' data-cls='isRed?b-kd3egvp:VDB9QDb6i !isRed?rHGu966-y:N_Qb9rDre'><txt-val>name</txt-val><br><button class='WTK-Lk06q VDB9QDb6i' style='width: 200px; height: 20px;' data-cls='Q-i1K-h-wq rHGu966-y:isRed' data-click='nextMain'><txt-val>buttonName</txt-val></button></header>"),D(class{constructor(e){this.appInfo=V.description,this.someText="Hello world !!!",this.ag="17",this.test="<app-test></app-test>",this.isTest=!0,this.isFor=!0,this.testArr=[1,2,3,4,5,6,7],this.receipts=[" \nHow to cook perfect Bagels\n  \n10 Tips for Making Schmear-Worthy Homemade Bagels\nMoisture: Wetter dough means crispier bagels. ...\nWater temp: The colder the better. ...\nDry active yeast: Let it chill. ...\nFlour: Embrace the gluten. ...\nMixing: Low and slow is the way to go. ...\nThe rise: Your kitchen climate is A-okay. ...\nFlavor kick: After the proof.\n        ","\nHow to cook perfect fish\n\nA juicy, perfectly cooked fillet of fish with crisp \nskin that crackles when cut is a thing of beauty – but \none that can be tough to achieve. Follow these simple \nsteps, whatever fish you’re cooking, avoid the \npotential pitfalls, and you’ll get it right, every time.\n        ","\nHow to cook perfect meat\n\nThis dish has everything we’re looking for when it comes \nto a weeknight dinner: it’s filling, requires only simple \ningredients, and comes together in under an hour. If you’re \nlooking for a bright summer dinner that still delivers on \nthe comfort food factor, then this creamy lemon Parmesan \nchicken should be next on your weeknight dinner rotation.\nTrust us—one bite, and you’ll realize why this is one of\nour most popular chicken recipes of all time. \n        "],this.receiptCounter=0,this.currentReceipt=this.receipts[this.receiptCounter],this.root=e,this.name=e.tagName}onCreate(){}onInit(){console.log("dataCatch$.value:",this.root.dataCatch$().getValue());const e=this.root.parentChanelReady$().getValue();e&&e.sendData("Main sendData"),this.root.collect(this.root.dataCatch$().subscribe((e=>{console.log("Main data catch:",e)}))),setTimeout((()=>{this.testArr.push(-1),this.testArr.push(-2),this.testArr.push(-3),this.root.detectChanges(),setTimeout((()=>{this.testArr.shift(),this.testArr.shift(),this.testArr.shift(),this.root.detectChanges()}),5e3)}),5e3)}onDestroy(){}nestReceipt(){this.receiptCounter++,this.receiptCounter>=this.receipts.length&&(this.receiptCounter=0),this.currentReceipt=this.receipts[this.receiptCounter],this.root.detectChanges()}},"app-main","<main class='OL5-J-fao'><txt-val>name</txt-val><br><txt-val>appInfo</txt-val><br><txt-val>someText</txt-val><br> Sergey is my son, he is <txt-val>ag</txt-val> years old. <br><br> Receipts: <br><button data-click='nestReceipt'>NEXT Receipt</button><br><br><pre><txt-val>currentReceipt</txt-val></pre><div><app-test></app-test><app-test></app-test></div><txt-val>test</txt-val><txt-val>test</txt-val><app-test data-if='isTest' data-cls='b-kd3egvp'></app-test><app-test data-for='testArr' data-if='isFor'></app-test></main>"),D(class{constructor(e){this.isShowHello=!1,this.showedTxt="---HELLO WORLD !!!---",this.counter=0,this.inputKey="",this.inputChange="",this.root=e,this.name=e.tagName}onInit(){this.counter=0,this.root.collect(this.root.beforeChanges$().subscribe((()=>{this.counter++})),this.root.changesDetected$().subscribe((()=>{this.handleElement(),this.handleElementExtra()})))}clickHandler(e){e.preventDefault(),e.stopPropagation(),this.isShowHello=!this.isShowHello,this.root.detectChanges()}keyDownInput(e){console.log("keyDownInput(evt: KeyboardEvent)",e.key),this.inputKey=e.key,this.root.detectChanges()}changeInput(e){console.log("changeInput(evt: KeyboardEvent)",e.target.value),this.inputChange=e.target.value,this.root.detectChanges()}handleElement(){const e=this.root.getElementsBoundToMethod(this.handleElement);for(const t of e)t.innerHTML=` handled ${this.counter}`}handleElementExtra(){const e=this.root.getElementsBoundToMethod(this.handleElementExtra);for(const t of e)t.innerHTML=` handled extra ${this.counter}`}test(){return`TEST ${this.counter}`}onDestroy(){this.inputChange="",this.counter=0}},"app-main_1","<main class='OL5-J-fao'><txt-val>name</txt-val><button data-click='clickHandler'> Show HELLO <txt-val>counter</txt-val></button><div data-if='isShowHello'><txt-val>showedTxt</txt-val></div><div data-handle='handleElement'>1</div><div data-handle='handleElement'>2</div><div data-handle='handleElementExtra'>3</div><div data-handle='handleElementExtra'><txt-val>name</txt-val></div><div><txt-val>name</txt-val><span data-handle='handleElementExtra'></span></div><label><input data-keydown='keyDownInput' data-change='changeInput'></label><div> input key: <txt-val>inputKey</txt-val></div><div> input change: <txt-val>inputChange</txt-val></div><div> test function: <txt-val>test</txt-val></div></main>"),D(class{constructor(e){this.root=e,this.name=e.tagName}onInit(){this.span.innerHTML="Test injection ",this.myDiv.innerHTML="Test injection div"}},"app-footer","<footer class='M-Xf5_Gut'><span data-inject_to='span'></span><txt-val>name</txt-val><div data-inject_to='myDiv'></div></footer>"),D(class{constructor(e){this.test1="TEST1",this.test2="TEST2",this.isRed=!1,this.isBlue=!1,this.isGreen=!1,this.num=0,this.root=e}onCreate(){this.root.dataCatch$().subscribe((e=>{this.num=e,this.isRed=e>0&&e<4,this.isBlue=e>3,this.isGreen=e<0,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-test","<div data-cls='rHGu966-y:isRed N_Qb9rDre:isBlue TkpfTinfw:isGreen'><txt-val>test1</txt-val>:<txt-val>test2</txt-val>-<txt-val>num</txt-val></div>")],J=m({template:"",element:class{}});A([{tagName:t.TEXT_VALUE,targetElement:J}]);const Q=new class{constructor(){this.isComponentMode=!1}register(e){A(e)}run(e){this.isComponentMode=!!e,H((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=T(z))}start(){const e=F(L.join("")),t=F("* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;background: rgba(0, 250, 250, 0.1);}.e-respg_ww {position: fixed;top: 0;left: 0;font-weight: bold;width: 100%;height: 100vh;display: flex;flex-flow: column nowrap;justify-content: flex-start;align-items: flex-start;z-index: 2147483647;}.e-respg_ww .h-VrV_zpu {position: absolute;top: 0;left: 0;width: 100%;height: 100%;backdrop-filter: blur(5px);z-index: -2147483647;}.e-respg_ww .QziDa-LBr {width: 100%;height: 40px;min-width: 100%;min-height: 40px;}.e-respg_ww .OL5-J-fao {width: 100%;height: 100%;flex-grow: 1;}.e-respg_ww .M-Xf5_Gut {width: 100%;height: 60px;min-width: 100%;min-height: 60px;}.e-respg_ww .WTK-Lk06q {cursor: pointer;}.e-respg_ww .b-kd3egvp {background: #e469a0;}.e-respg_ww .VDB9QDb6i {background: #69b2e4;}.e-respg_ww .N_Qb9rDre {color: #0294f9;}.e-respg_ww .TkpfTinfw {color: #108b55;}.e-respg_ww .rHGu966-y {color: #802b51;}.e-respg_ww .Q-i1K-h-wq {font-weight: bold;}");M(O.head,e),M(O.head,t),!this.isComponentMode&&M(O.body,this.appElement)}};V.init(),j.setLocation(X.EN),Q.register(G),Q.run()})()})();