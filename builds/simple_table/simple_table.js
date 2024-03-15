(()=>{"use strict";var t={512:(t,e,n)=>{e.g=void 0;const s=n(951);e.g=class{list=[];_isDestroyed=!1;collect(...t){this._isDestroyed||this.list.push(...t)}unsubscribe(t){this._isDestroyed||(t?.unsubscribe(),(0,s.quickDeleteFromArray)(this.list,t))}unsubscribeAll(){if(!this._isDestroyed)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},951:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomCallback=e.positiveCallback=e.negativeCallback=e.quickDeleteFromArray=e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const n=t.indexOf(e);return-1!==n&&(t.splice(n,1),!0)},e.quickDeleteFromArray=function(t,e){const n=t.indexOf(e);return-1!==n&&(t[n]=t[t.length-1],t.length=t.length-1,!0)},e.negativeCallback=()=>!1,e.positiveCallback=()=>!0,e.randomCallback=()=>"772716b8-e6e2-47ac-95e9-e8d99ce35124"},390:(t,e,n)=>{e.cP=void 0;const s=n(951);class i{isMarkedForUnsubscribe=!1;observable;listener;errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)};_order=0;isListenPaused=!1;once={isOnce:!1,isFinished:!1};unsubscribeByNegativeCondition=null;unsubscribeByPositiveCondition=null;emitByNegativeCondition=null;emitByPositiveCondition=null;emitMatchCondition=null;isPipe=!1;constructor(t,e){this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const n=e.listener;return n&&e.observable?e.isListenPaused?void 0:e.isPipe?e.emitByPositiveCondition&&e.emitByPositiveCondition(t)||e.emitByNegativeCondition&&!e.emitByNegativeCondition(t)?n(t):e.once.isOnce?(e.once.isFinished=!0,n(t),e.unsubscribe()):e.unsubscribeByNegativeCondition?e.unsubscribeByNegativeCondition(t)?n(t):(e.unsubscribeByNegativeCondition=null,e.unsubscribe()):e.unsubscribeByPositiveCondition?e.unsubscribeByPositiveCondition(t)?(e.unsubscribeByPositiveCondition=null,e.unsubscribe()):n(t):e.emitMatchCondition&&e.emitMatchCondition(t)===t?n(t):void 0:n(t):e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return this.unsubscribeByNegativeCondition=t??s.negativeCallback,this}unsubscribeByPositive(t){return this.unsubscribeByPositiveCondition=t??s.positiveCallback,this}emitByNegative(t){return this.emitByNegativeCondition=t??s.positiveCallback,this}emitByPositive(t){return this.emitByPositiveCondition=t??s.negativeCallback,this}emitMatch(t){return this.emitMatchCondition=t??s.randomCallback,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.cP=class{value;listeners=[];_isEnable=!0;_isDestroyed=!1;isNextProcess=!1;listenersForUnsubscribe=[];constructor(t){this.value=t}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(!this._isDestroyed&&this._isEnable){this.isNextProcess=!0,this.value=t;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++)this.unSubscribe(this.listenersForUnsubscribe[e]);this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.quickDeleteFromArray)(this.listeners,t)}}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const n=new i(this,!1);return n.subscribe(t,e),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,n),o.exports}(()=>{var t,e,s,i=n(390);function o(t){return`data-${t}`}function r(t,e){return t?t.getAttribute(o(e)):""}function a(t,e,n){t&&t.setAttribute(o(e),n)}function h(t,e){t&&t.removeAttribute(o(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val"}(e||(e={})),function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(s||(s={}));var l=n(512),c=n(951);const u=":",d="_______$$bool";function b(n){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.cP(!1),this.onInit$=new i.cP(!1),this.onDestroy$=new i.cP(!1),this.attributeChanged$=new i.cP(void 0),this.beforeDetectChanges$=new i.cP(!1),this.onChangesDetected$=new i.cP(!1),this.onDataCatch$=new i.cP(void 0),this.onParentChanelReady$=new i.cP(void 0),this.ahe_clr=new l.g,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,t.ON_IF)&&!this.ahe_component[d]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&(function(e){const n=(s=e,Array.from(s.querySelectorAll(`*:not([${o(t.INFO)}])`)));var s;for(let t=0;t<n.length;t++)m(e,f(e,n[t]))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,t.ON_IF)||this.ahe_component[d]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[d]=!0}attributeChangedCallback(t,e,n){this.attributeChanged$.next({name:t,oldValue:e,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&this.ahe_ForOfList.length&&function(t){const e=t.ahe_ForOfList;for(let n=0;n<e.length;n++){const s=e[n];m(t,p(t,s.children,t.ahe_component[s.valueName],s.parent,s.template))}}(this),function(t){if(t)for(let e=0;e<t.ahe_IfList.length;e++){const n=t.ahe_IfList[e];let s=n.isFunction?!!t.ahe_component[n.valueName]():!!t.ahe_component[n.valueName];if(n.isInversion&&(s=!s),s===n.oldCondition)continue;n.oldCondition=s;const i=n.ifParent.contains(n.ifElement);s?i||M(n.ifParent,n.ifElement):i&&U(n.ifParent,n.ifElement)}}(this),function(t){if(t)for(let e=0;e<t.ahe_ClsIfList.length;e++){const n=t.ahe_ClsIfList[e],i=n.classConditions,o=n.element,r=t.ahe_component;for(let t=0;t<i.length;t++){const e=i[t];let n;if(e.isConditionDisabled)n=s.TRUE;else{let t=e.isFunction?!!r[e.conditionName]():!!r[e.conditionName];e.isInversion&&(t=!t),n=t?s.TRUE:s.FALSE}if(n===e.oldCondition)continue;e.oldCondition=n;const a=e.firstClassName,h=e.secondClassName;h?n===s.TRUE?(w(o,[a]),I(o,[h])):(w(o,[h]),I(o,[a])):e.isConditionDisabled||n===s.TRUE?w(o,[a]):I(o,[a])}}}(this),function(t){if(t)for(let e=0;e<t.ahe_nValues.length;e++){const n=t.ahe_nValues[e],s=""+t.ahe_component[n.valueName];n.textElement.innerHTML!==s&&(n.textElement.innerHTML=s)}}(this),function(t){if(t)for(let e=0;e<t.ahe_nFunctions.length;e++){const n=t.ahe_nFunctions[e],s=""+t.ahe_component[n.valueName]();n.textElement.innerHTML!==s&&(n.textElement.innerHTML=s)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t){if(t.isCustomAppElement)return t;if(t.ahe_component&&t.sendData)return t}}transferToChanel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((n=>{t().sendData(e(n))}))}sendToChanel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function m(n,i){if(!i.length)return;let o="[";if(i.length>1){for(let e=0;e<i.length;e++){const s=i[e];o+=_(n,s),a(s,t.INFO,o.trim()+"]"),s.ahe_parent_chanel=n.getChanel(n),s.onParentChanelReady$.next(s.ahe_parent_chanel)}return}const l=i[0];!function(t,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE){if(!n.innerHTML)return!1;const e=E(t,n.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:n,valueName:e.valueName}),!0):(t.ahe_nValues.push({textElement:n,valueName:e.valueName}),!0)}return!1}(n,l)?(o+=function(e,n){const s=function(t,e,n){const s=r(e,n);return s&&t?(h(e,n),s):""}(e,n,t.INJECT_TO);return s?(e.ahe_component[s]=n,"inj "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_CLICK);return s?(n.onclick=t=>g(e,s,t),"clk "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_MOUSE_LEAVE);return s?(n.onmouseleave=t=>g(e,s,t),"mlv "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_MOUSE_ENTER);return s?(n.onmouseenter=t=>g(e,s,t),"mer "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_MOUSE_UP);return s?(n.onmouseup=t=>g(e,s,t),"mup "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_MOUSE_DOWN);return s?(n.onmousedown=t=>g(e,s,t),"mdn "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_MOUSE_MOVE);return s?(n.onmousemove=t=>g(e,s,t),"mmv "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_KEY_DOWN);return s?(n.onkeydown=t=>g(e,s,t),"kdn "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_KEY_UP);return s?(n.onkeyup=t=>g(e,s,t),"kup "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_KEY_DBL_CLICK);return s?(n.ondblclick=t=>g(e,s,t),"dbc "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_SCROLL);return s?(n.onscroll=t=>g(e,s,t),"scl "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_WHEEL);return s?(n.onwheel=t=>g(e,s,t),"whl "):""}(n,l),o+=function(e,n){const s=N(e,n,t.ON_CHANGE);return s?(n.onchange=t=>g(e,s,t),"chg "):""}(n,l),o+=function(e,n){const s=r(n,t.ON_HANDLE);return s&&e?(v(e,s,n),h(n,t.ON_HANDLE),"elt "):""}(n,l),o+=_(n,l),o+=function(e,n){let i=r(n,t.CLASS_IF);if(!i)return"";const o=i.split(" "),a=[],l={element:n,classConditions:a};for(let t=0;t<o.length;t++){const n=o[t];if(n.includes("?")){const t=n.split("?"),i=E(e,t[0]),o=t[1].split(u);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(n.includes(u)){const t=n.split(u),i=E(e,t[1]);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:t[0],secondClassName:""})}else a.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:s.UNDEFINED,firstClassName:n,secondClassName:""})}return e.ahe_ClsIfList.push(l),h(n,t.CLASS_IF),"cls "}(n,l),a(l,t.INFO,o.trim()+"]")):a(l,t.INFO,o+"var]"),l.isCustomAppElement&&(l.ahe_parent_chanel=n.getChanel(n),l.onParentChanelReady$.next(l.ahe_parent_chanel))}function _(n,s){let i=r(s,t.ON_IF);if(!i)return"";const o=F(e.TEXT_VALUE),l=s.parentElement,c=E(n,i);return n.ahe_IfList.push({ifElement:s,valueName:c.valueName,ifParent:o,oldCondition:!1,isInversion:c.isInversion,isFunction:c.isFunction}),l.insertBefore(o,s),U(l,s),h(s,t.ON_IF),a(o,t.INFO,"[ifp]"),"ifc "}const C=[0];function f(n,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE)return(C[0]=s)&&C;if(s.isCustomAppElement=n.isAppElement(s),!s.isCustomAppElement)return(C[0]=s)&&C;const i=r(s,t.FOR);if(!i)return(C[0]=s)&&C;const o=n.ahe_component[i];if(!o)return(C[0]=s)&&C;const l=F(e.TEXT_VALUE),c=s.parentElement,u=p(n,[],o,l,s);return a(l,t.INFO,"[for-of]"),c.insertBefore(l,s),U(c,s),h(s,t.FOR),n.ahe_ForOfList.push({parent:l,template:s,children:u,valueName:i}),u}function p(e,n,s,i,o){const h=[],l=n.length,u=s.length;let d=u-l;if(d>0)for(let e=0;e<d;e++){const e=F(o.tagName);n.push(e),h.push(e);const s=r(o,t.ON_IF);s&&a(e,t.ON_IF,s),M(i,e)}else{d*=-1;for(let t=0;t<d;t++){const t=n.pop(),s=e.ahe_IfList;let o;for(let e=0;e<s.length;e++){const n=s[e];if(n.ifElement===t){o=n;break}}o?((0,c.quickDeleteFromArray)(s,o),U(i,o.ifParent)):U(i,t)}}for(let t=0;t<u;t++){const i=s[t],o=n[t],r=e.getChanel(o);r&&r.sendData(i)}return h}function E(t,e){const n="!"===e[0],s=n?e.substring(1):e;return{isInversion:n,valueName:s,isFunction:"function"==typeof t.ahe_component[s]}}function g(t,e,n){t.ahe_component[e](n)}function N(t,e,n){const s=r(e,n);return s&&t?(v(t,s,e),h(e,n),s):""}function v(t,e,n){const s=t.ahe_component[e];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[t.ahe_number]||(s.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(s.htmlElements={})))),s.htmlElements[t.ahe_number].push(n))}const y="{display: contents !important;}",L=[`html-block ${y}`];function D(t){for(let e=0;e<t.length;e++)L.push(`${t[e].tagName} ${y}`);X((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].targetElement)}))}function O(t,e,n){return{tagName:e,targetElement:b({template:n,element:t})}}const A=window,P=document;let T;function F(t){return P.createElement(t)}function $(t){const e=F("style");return e.innerHTML=t,e}function I(t,e){if(t)for(let n=0;n<e.length;n++)t.classList.remove(e[n])}function w(t,e){if(t)for(let n=0;n<e.length;n++)t.classList.add(e[n])}function M(t,e){t&&e&&t.appendChild(e)}function U(t,e){t&&e&&t.removeChild(e)}function k(t,e){t&&(t.value=e)}const B=new i.cP(!1);let x,S,R,H,V=!1;function X(t){B.pipe().setOnce().subscribe((e=>e&&t())),P.body?B.next(!0):V||(V=!0,P.addEventListener("DOMContentLoaded",(()=>{B.next(!0)})))}const j=new class{constructor(t,e,n,s){x=t,S=e,R=n,H=s,T=this}set major(t){S=t}set minor(t){R=t}set patch(t){H=t}set name(t){x=t}get version(){return`${S}.${R}.${H}`}get name(){return x}get description(){return`[${x} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){T?console.log(T.description,...t):console.log("APP",...t)}("STARTED")}}("simple_table",1,1,0),K=new i.cP(0),Y=new i.cP(0),q=T.name;let W="";for(let t=0;t<q.length;t++){const e=q[t];let n="";for(let t=0;t<26;t++){const s="abcdefghijklmnopqrstuvwxyz"[t];if(s===e.toLowerCase()){n=s;break}}W+=n||"-"}const z="app-"+W;class G{constructor(t,e){this.tableTag=t,this.tableName=e}injectToElement(t){return new J(this.tableTag,this.tableName,t)}injectToId(t){return this.injectToElement(P.getElementById(t))}}class J{constructor(t,e,n){this.tableTag=t,this.tableName=e,this.parent=n}waitTable(){return new Promise(((t,e)=>{this.tableName?this.tableTag?this.parent?(K.pipe().emitByPositive((t=>!!t&&t.getTableName()===this.tableName)).subscribe((e=>{const n=new Q(e);t(n)})),X((()=>{this.parent.innerHTML=this.tableTag}))):e("parent is not present"):e("tableTag is not present"):e("tableName is not present")}))}}class Q{constructor(t){this.table=t}setData(t){this.table.setOptions(t)}setListener(t){t&&(this.cellListener=t,Y.pipe().emitByPositive((t=>!!t&&t.tableName===this.table.getTableName())).subscribe((t=>{this.cellListener(t)})))}}var Z;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(Z||(Z={}));const tt=new i.cP(Z.EN),et=new class{get currentLocation(){return tt.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return tt.subscribe(t)}setLocation(t){tt.next(t)}destroy(){tt.destroy()}},nt=[O(class{constructor(t){var e;this.root=t,this.name=t.tagName,this.tableName=("table-name",(e=t)?e.getAttribute("table-name"):"")}onCreate(){}onInit(){this.handleMainChanel(),K.next(this)}handleMainChanel(){this.mainChanel=this.root.getChanel(this.main)}onDestroy(){}setOptions(t){t.tableName=this.tableName,this.root.sendToChanel(this.mainChanel,t)}getTableName(){return this.tableName}},z,"<app-main data-inject_to='main'></app-main>"),O(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.dataCatch$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-header","<header class='NBnXW-BEt S_3f2_IOi'><app-row data-for='rows'></app-row></header>"),O(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.transferToChanel((()=>this.headerChanel),(t=>[{id:0,isEditDisabled:!0,arr:t.header}])),this.root.transferToChanel((()=>this.bodyChanel),(t=>{const e=[];for(let n=0;n<t.body.length;n++){const s=t.body[n];e.push({id:n+1,arr:s,tableName:t.tableName})}return e})),this.root.transferToChanel((()=>this.footerChanel),(t=>t.footer))}onInit(){this.initHeaderChanel(),this.initBodyChanel(),this.initFooterChanel()}initHeaderChanel(){this.headerChanel=this.root.getChanel(this.header)}initBodyChanel(){this.bodyChanel=this.root.getChanel(this.body)}initFooterChanel(){this.footerChanel=this.root.getChanel(this.footer)}onDestroy(){}},"app-main","<main class='qJL2d_j-ww'><app-header data-inject_to='header'></app-header><app-body data-inject_to='body'></app-body><app-footer data-inject_to='footer'></app-footer></main>"),O(class{constructor(t){this.root=t,this.name=t.tagName,this.text=""}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text=t,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-footer","<footer class='F-ICjzFAy'><txt-val>text</txt-val></footer>"),O(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.dataCatch$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-body","<div class='uGDfq-D_o'><app-row data-for='rows'></app-row></div>"),O(class{constructor(t){this.root=t,this.name=t.tagName,this.cells=[]}onCreate(){this.root.dataCatch$().subscribe((t=>{this.cells.length=0,this.id=t.id;for(let e=0;e<t.arr.length;e++){const n=t.arr[e];this.cells.push({id:{x:e,y:this.id,tableName:t.tableName},isEditDisabled:!!t.isEditDisabled,value:n})}this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-row","<div class='h-d_Xl3cwe'><app-cell data-for='cells'></app-cell></div>"),O(class{constructor(t){this.root=t,this.name=t.tagName,this.data="",this.isEdit=!1}onCreate(){this.root.dataCatch$().subscribe((t=>{this.isEditDisabled=!!t.isEditDisabled,this.id=t.id,this.id.data=t.value,this.data=t.value,k(this.input,this.data),this.root.title=this.data,this.root.detectChanges()}))}onInit(){}onDestroy(){}onDblClick(){this.isEditDisabled||(this.isEdit=!0,k(this.input,this.data),this.root.detectChanges(),this.input.focus())}onKeyDown(t){"enter"===t.key.toLowerCase()&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}onChange(){this.isEdit=!1,this.setData(),this.root.detectChanges()}onMouseLeave(){this.isEdit&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}setData(){this.data=function(t){if(t&&t.value)return t.value}(this.input),this.data=this.data?this.data:"",this.id.data!==this.data&&(this.root.title=this.data,this.id.data=this.data,Y.next(this.id))}isPointer(){return!this.isEdit&&!this.isEditDisabled}},"app-cell","<div class='JgjIx-F-p manEA-i-e Z_G-Lq2_r' data-dblclick='onDblClick' data-cls='cV5_HlU_q:isPointer' data-mouseleave='onMouseLeave'><div class='acn-yO5Hwq'><label data-if='isEdit'><input class='j-0Cg-ypu S_3f2_IOi' data-inject_to='input' data-keydown='onKeyDown' data-change='onChange'></label><div data-if='!isEdit'><txt-val>data</txt-val></div></div></div>")],st=b({template:"",element:class{}});D([{tagName:e.TEXT_VALUE,targetElement:st}]);const it=new class{constructor(){this.isComponentMode=!1}register(t){D(t)}run(t){this.isComponentMode=!!t,X((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=F(z))}start(){const t=$(L.join("")),e=$(".qJL2d_j-ww {position: relative;padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;border: solid 1px;}.qJL2d_j-ww * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.qJL2d_j-ww .NBnXW-BEt {width: 100%;height: 80px;font-weight: bold;border-top: solid 1px;user-select: none;}.qJL2d_j-ww .uGDfq-D_o {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;}.qJL2d_j-ww .F-ICjzFAy {width: 100%;height: 80px;}.qJL2d_j-ww .h-d_Xl3cwe {width: 100%;height: 60px;min-height: 40px;display: flex;flex-flow: row nowrap;border-left: solid 1px;border-bottom: solid 1px;}.qJL2d_j-ww .JgjIx-F-p {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;border-right: solid 1px;padding: 5px;}.qJL2d_j-ww .j-0Cg-ypu {width: 100%;height: 100%;border: none;outline: 0;}.qJL2d_j-ww .acn-yO5Hwq {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}.qJL2d_j-ww .S_3f2_IOi {background: rgba(0, 0, 0, 0.1);}.qJL2d_j-ww .manEA-i-e {justify-content: center;}.qJL2d_j-ww .Z_G-Lq2_r {align-items: center;}.qJL2d_j-ww .cV5_HlU_q {cursor: pointer;}");M(P.head,t),M(P.head,e),!this.isComponentMode&&M(P.body,this.appElement)}};j.init(),et.setLocation(Z.EN),it.register(nt),it.run(!0),A.TableController=new class{createTable(t){return new G(`<${z} table-name='${t}'></${z}>`,t)}}})()})();