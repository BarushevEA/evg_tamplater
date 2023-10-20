(()=>{"use strict";var t={909:(t,e,s)=>{e.P=void 0;const n=s(594);e.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...t){if(this._isDestroyed)return null;for(let e=0;e<t.length;e++){const s=t[e];s&&this.list.push(s)}}unsubscribe(t){if(this._isDestroyed)return null;t&&t.unsubscribe(),(0,n.deleteFromArray)(this.list,t)}unsubscribeAll(){if(this._isDestroyed)return null;const t=this.list.length;for(let e=0;e<t;e++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const s=t.indexOf(e);if(-1===s)return!1;const n=t.length-1;for(let e=s;e<n;)t[e++]=t[e];return t.length=n,!0}},637:(t,e,s)=>{e.y$=void 0;const n=s(594);class i{constructor(t,e){this.isMarkedForUnsubscribe=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const s=e.listener;if(s)switch(!0){case!e.observable:return void e.unsubscribe();case e.isListenPaused:return;case!e.isPipe:return void s(t);case e.once.isOnce:e.once.isFinished=!0,s(t),e.unsubscribe();break;case!!e.unsubscribeByNegativeCondition:if(!e.unsubscribeByNegativeCondition(t))return e.unsubscribeByNegativeCondition=null,void e.unsubscribe();s(t);break;case!!e.unsubscribeByPositiveCondition:if(e.unsubscribeByPositiveCondition(t))return e.unsubscribeByPositiveCondition=null,void e.unsubscribe();s(t);break;case!!e.emitByNegativeCondition:!e.emitByNegativeCondition(t)&&s(t);break;case!!e.emitByPositiveCondition:e.emitByPositiveCondition(t)&&s(t);break;case!!e.emitMatchCondition:e.emitMatchCondition(t)===t&&s(t)}else e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return"function"!=typeof t&&(t=()=>!1),this.unsubscribeByNegativeCondition=t,this}unsubscribeByPositive(t){return"function"!=typeof t&&(t=()=>!0),this.unsubscribeByPositiveCondition=t,this}emitByNegative(t){return"function"!=typeof t&&(t=()=>!0),this.emitByNegativeCondition=t,this}emitByPositive(t){return"function"!=typeof t&&(t=()=>!1),this.emitByPositiveCondition=t,this}emitMatch(t){return"function"!=typeof t&&(t=()=>`ERROR CONDITION TYPE ${typeof t},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=t,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.y$=class{constructor(t){this.value=t,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=t;const e=this.listeners.length;for(let s=0;s<e;s++)this.listeners[s].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++){const t=this.listenersForUnsubscribe[e];this.unSubscribe(t)}this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.deleteFromArray)(this.listeners,t)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const s=new i(this,!1);return s.subscribe(t,e),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}(()=>{const t=window,e=document;var n,i,o,r=s(637);function a(t){return`data-${t}`}function h(t,e){return t?t.getAttribute(a(e)):""}function l(t,e,s){t&&t.setAttribute(a(e),s)}function c(t,e){t&&t.removeAttribute(a(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(n||(n={})),Object.keys(n),function(t){t.TEXT_VALUE="txt-val"}(i||(i={})),function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(o||(o={}));var u=s(909),d=s(594);const b=":",m="_______$$bool";function _(t){class e extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=e.ahe_Counter,e.ahe_Counter++,this.onAdopted$=new r.y$(!1),this.onInit$=new r.y$(!1),this.onDestroy$=new r.y$(!1),this.attributeChanged$=new r.y$(void 0),this.beforeDetectChanges$=new r.y$(!1),this.onChangesDetected$=new r.y$(!1),this.onDataCatch$=new r.y$(void 0),this.onParentChanelReady$=new r.y$(void 0),this.ahe_clr=new u.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=t,this.ahe_component=new t.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){h(this,n.ON_IF)&&!this.ahe_component[m]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==i.TEXT_VALUE&&(function(t){const e=(s=t,Array.from(s.querySelectorAll(`*:not([${a(n.INFO)}])`)));var s;for(const s of e)f(t,E(t,s))}(this),this.detectChanges(),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!h(this,n.ON_IF)||this.ahe_component[m]?this.tagName.toLowerCase()!==i.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[m]=!0}attributeChangedCallback(t,e,s){this.attributeChanged$.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(){this.beforeDetectChanges$.next(!0),function(t){const e=t.ahe_ForOfList;for(const s of e)f(t,N(t,s.children,t.ahe_component[s.valueName],s.parent,s.template))}(this),function(t){if(t)for(const e of t.ahe_IfList){let s=e.isFunction?!!t.ahe_component[e.valueName]():!!t.ahe_component[e.valueName];if(e.isInversion&&(s=!s),s===e.oldCondition)continue;e.oldCondition=s;const n=e.ifParent.contains(e.ifElement);s?n||M(e.ifParent,e.ifElement):n&&U(e.ifParent,e.ifElement)}}(this),function(t){if(t)for(const e of t.ahe_ClsIfList){const s=e.classConditions,n=e.element,i=t.ahe_component;for(const t of s){let e;if(t.isConditionDisabled)e=o.TRUE;else{let s=t.isFunction?!!i[t.conditionName]():!!i[t.conditionName];t.isInversion&&(s=!s),e=s?o.TRUE:o.FALSE}if(e===t.oldCondition)continue;t.oldCondition=e;const s=t.firstClassName,r=t.secondClassName;r?e===o.TRUE?(w(n,[s]),I(n,[r])):(w(n,[r]),I(n,[s])):t.isConditionDisabled||e===o.TRUE?w(n,[s]):I(n,[s])}}}(this),function(t){if(t)for(const e of t.ahe_nValues){const s=""+t.ahe_component[e.valueName];e.textElement.innerHTML!==s&&(e.textElement.innerHTML=s)}}(this),function(t){if(t)for(const e of t.ahe_nFunctions){const s=""+t.ahe_component[e.valueName]();e.textElement.innerHTML!==s&&(e.textElement.innerHTML=s)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t&&t.ahe_component&&t.sendData)return t}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return e.ahe_Counter=0,e}function f(t,e){if(!e.length)return;let s="[";if(e.length>1){for(const i of e)s+=C(t,i),l(i,n.INFO,s.trim()+"]"),i.ahe_parent_chanel=t.getChanel(t),i.onParentChanelReady$.next(i.ahe_parent_chanel);return}const r=e[0];!function(t,e){if(e.tagName.toLowerCase()===i.TEXT_VALUE){if(!e.innerHTML)return!1;const s=g(t,e.innerHTML);return s.isFunction?(t.ahe_nFunctions.push({textElement:e,valueName:s.valueName}),!0):(t.ahe_nValues.push({textElement:e,valueName:s.valueName}),!0)}return!1}(t,r)?(s+=function(t,e){const s=function(t,e,s){const n=h(e,s);return n&&t?(c(e,s),n):""}(t,e,n.INJECT_TO);return s?(t.ahe_component[s]=e,"inj "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_CLICK);return s?(e.onclick=e=>y(t,s,e),"clk "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>y(t,s,e),"mlv "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>y(t,s,e),"mer "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_MOUSE_UP);return s?(e.onmouseup=e=>y(t,s,e),"mup "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>y(t,s,e),"mdn "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>y(t,s,e),"mmv "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_KEY_DOWN);return s?(e.onkeydown=e=>y(t,s,e),"kdn "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_KEY_UP);return s?(e.onkeyup=e=>y(t,s,e),"kup "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>y(t,s,e),"dbc "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_SCROLL);return s?(e.onscroll=e=>y(t,s,e),"scl "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_WHEEL);return s?(e.onwheel=e=>y(t,s,e),"whl "):""}(t,r),s+=function(t,e){const s=v(t,e,n.ON_CHANGE);return s?(e.onchange=e=>y(t,s,e),"chg "):""}(t,r),s+=function(t,e){const s=h(e,n.ON_HANDLE);return s&&t?(D(t,s,e),c(e,n.ON_HANDLE),"elt "):""}(t,r),s+=C(t,r),s+=function(t,e){let s=h(e,n.CLASS_IF);if(!s)return"";const i=s.split(" "),r=[],a={element:e,classConditions:r};for(const e of i)if(e.includes("?")){const s=e.split("?"),n=g(t,s[0]),i=s[1].split(b);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:o.UNDEFINED,firstClassName:i[0],secondClassName:i[1]})}else if(e.includes(b)){const s=e.split(b),n=g(t,s[1]);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:o.UNDEFINED,firstClassName:s[0],secondClassName:""})}else r.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:o.UNDEFINED,firstClassName:e,secondClassName:""});return t.ahe_ClsIfList.push(a),c(e,n.CLASS_IF),"cls "}(t,r),l(r,n.INFO,s.trim()+"]")):l(r,n.INFO,s+"var]"),t.isAppElement(r)&&(r.ahe_parent_chanel=t.getChanel(t),r.onParentChanelReady$.next(r.ahe_parent_chanel))}function C(t,e){let s=h(e,n.ON_IF);if(!s)return"";const o=T(i.TEXT_VALUE),r=e.parentElement,a=g(t,s);return t.ahe_IfList.push({ifElement:e,valueName:a.valueName,ifParent:o,oldCondition:!1,isInversion:a.isInversion,isFunction:a.isFunction}),r.insertBefore(o,e),U(r,e),c(e,n.ON_IF),l(o,n.INFO,"[ifp]"),"ifc "}const p=[0];function E(t,e){if(e.tagName.toLowerCase()===i.TEXT_VALUE)return(p[0]=e)&&p;if(!t.isAppElement(e))return(p[0]=e)&&p;const s=h(e,n.FOR);if(!s)return(p[0]=e)&&p;const o=t.ahe_component[s];if(!o)return(p[0]=e)&&p;const r=T(i.TEXT_VALUE),a=e.parentElement;a.insertBefore(r,e),U(a,e),c(e,n.FOR),l(r,n.INFO,"[for-of]");const u=N(t,[],o,r,e);return t.ahe_ForOfList.push({parent:r,template:e,children:u,valueName:s}),u}function N(t,e,s,i,o){const r=[],a=e.length,c=s.length;let u=c-a;if(u>0)for(let t=0;t<u;t++){const t=T(o.tagName);e.push(t),r.push(t);const s=h(o,n.ON_IF);s&&l(t,n.ON_IF,s),M(i,t)}else{u*=-1;for(let s=0;s<u;s++){const s=e.pop(),n=t.ahe_IfList;let o;for(const t of n)if(t.ifElement===s){o=t;break}o?((0,d.deleteFromArray)(n,o),U(i,o.ifParent)):U(i,s)}}for(let n=0;n<c;n++){const i=s[n],o=e[n],r=t.getChanel(o);r&&r.sendData(i)}return r}function g(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_component[n]}}function y(t,e,s){t.ahe_component[e](s)}function v(t,e,s){const n=h(e,s);return n&&t?(D(t,n,e),c(e,s),n):""}function D(t,e,s){const n=t.ahe_component[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_number]||(n.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_number].push(s))}const L="{display: contents !important;}",O=[`html-block ${L}`];function A(t){for(const e of t)O.push(`${e.tagName} ${L}`);R((()=>{for(const e of t)customElements.define(e.tagName,e.targetElement)}))}function $(t,e,s){return{tagName:e,targetElement:_({template:s,element:t})}}let P;function T(t){return e.createElement(t)}function F(t){const e=T("style");return e.innerHTML=t,e}function I(t,e){if(t)for(const s of e)t.classList.remove(s)}function w(t,e){if(t)for(const s of e)t.classList.add(s)}function M(t,e){t&&e&&t.appendChild(e)}function U(t,e){t&&e&&t.removeChild(e)}function B(t,e){t&&(t.value=e)}const x=new r.y$(!1);let k=!1;function R(t){x.pipe().setOnce().subscribe((e=>e&&t())),e.body?x.next(!0):k||(k=!0,e.addEventListener("DOMContentLoaded",(()=>{x.next(!0)})))}const S=new r.y$(0),H=new r.y$(0);class V{constructor(t,e){this.tableTag=t,this.tableName=e}injectToElement(t){return new X(this.tableTag,this.tableName,t)}injectToId(t){return this.injectToElement(e.getElementById(t))}}class X{constructor(t,e,s){this.tableTag=t,this.tableName=e,this.parent=s}waitTable(){return new Promise(((t,e)=>{this.tableName?this.tableTag?this.parent?(S.pipe().emitByPositive((t=>!!t&&t.getTableName()===this.tableName)).subscribe((e=>{const s=new j(e);t(s)})),R((()=>{this.parent.innerHTML=this.tableTag}))):e("parent is not present"):e("tableTag is not present"):e("tableName is not present")}))}}class j{constructor(t){this.table=t}setData(t){this.table.setOptions(t)}setListener(t){t&&(this.cellListener=t,H.pipe().emitByPositive((t=>!!t&&t.tableName===this.table.getTableName())).subscribe((t=>{this.cellListener(t)})))}}let K,Y,W,z;const q=new class{constructor(t,e,s,n){K=t,Y=e,W=s,z=n,P=this}set major(t){Y=t}set minor(t){W=t}set patch(t){z=t}set name(t){K=t}get version(){return`${Y}.${W}.${z}`}get name(){return K}get description(){return`[${K} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){P?console.log(P.description,...t):console.log("APP",...t)}("STARTED")}}("simple_table",1,0,0);var G;let J;!function(t){t[t.EN=0]="EN",t[t.UA=1]="UA",t[t.HE=2]="HE"}(G||(G={}));class Q extends u.P{constructor(t){super(),J=new r.y$(t)}get current(){return J.getValue()}getText(t,e){return t[e]}onChange(t){this.collect(J.subscribe(t))}set(t){J.next(t)}destroy(){super.destroy(),J.destroy()}}const Z=new Q(G.EN),tt=P.name;let et="";for(let t=0;t<tt.length;t++){const e=tt[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}et+=s||"-"}const st="app-"+et,nt=[$(class{constructor(t){var e;this.root=t,this.name=t.tagName,this.tableName=("table-name",(e=t)?e.getAttribute("table-name"):"")}onCreate(){}onInit(){this.handleMainChanel(),S.next(this)}handleMainChanel(){this.mainChanel=this.root.getChanel(this.main)}onDestroy(){}setOptions(t){t.tableName=this.tableName,this.mainChanel&&this.mainChanel.sendData(t)}getTableName(){return this.tableName}},st,"<app-main data-inject_to='main'></app-main>"),$(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.dataCatch$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-header","<header class='L_X-i_Vnt u-K-W_PXi'><app-row data-for='rows'></app-row></header>"),$(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.dataCatch$().pipe().emitByPositive((()=>this.headerChanel&&this.bodyChanel&&this.footerChanel)).subscribe((t=>{this.headerChanel.sendData([{id:0,isEditDisabled:!0,arr:t.header}]);const e=[];for(let s=0;s<t.body.length;s++){const n=t.body[s];e.push({id:s+1,arr:n,tableName:t.tableName})}this.bodyChanel.sendData(e),this.footerChanel.sendData(t.footer)}))}onInit(){this.handleHeaderChanel(),this.handleBodyChanel(),this.handleFooterChanel()}handleHeaderChanel(){this.headerChanel=this.root.getChanel(this.header)}handleBodyChanel(){this.bodyChanel=this.root.getChanel(this.body)}handleFooterChanel(){this.footerChanel=this.root.getChanel(this.footer)}onDestroy(){}},"app-main","<main class='muWo3_q-ww'><app-header data-inject_to='header'></app-header><app-body data-inject_to='body'></app-body><app-footer data-inject_to='footer'></app-footer></main>"),$(class{constructor(t){this.root=t,this.name=t.tagName,this.text=""}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text=t,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-footer","<footer class='l4h-v-O-y'><txt-val>text</txt-val></footer>"),$(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.dataCatch$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-body","<div class='X_H-6_Olo'><app-row data-for='rows'></app-row></div>"),$(class{constructor(t){this.root=t,this.name=t.tagName,this.cells=[]}onCreate(){this.root.dataCatch$().subscribe((t=>{this.cells.length=0,this.id=t.id;for(let e=0;e<t.arr.length;e++){const s=t.arr[e];this.cells.push({id:{x:e,y:this.id,tableName:t.tableName},isEditDisabled:!!t.isEditDisabled,value:s})}this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-row","<div class='V_V-T8r-we'><app-cell data-for='cells'></app-cell></div>"),$(class{constructor(t){this.root=t,this.name=t.tagName,this.data="",this.isEdit=!1}onCreate(){this.root.dataCatch$().subscribe((t=>{this.isEditDisabled=!!t.isEditDisabled,this.id=t.id,this.id.data=t.value,this.data=t.value,B(this.input,this.data),this.root.title=this.data,this.root.detectChanges()}))}onInit(){}onDestroy(){}onDblClick(){this.isEditDisabled||(this.isEdit=!0,B(this.input,this.data),this.root.detectChanges(),this.input.focus())}onKeyDown(t){"enter"===t.key.toLowerCase()&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}onChange(){this.isEdit=!1,this.setData(),this.root.detectChanges()}onMouseLeave(){this.isEdit&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}setData(){this.data=function(t){if(t&&t.value)return t.value}(this.input),this.data=this.data?this.data:"",this.id.data!==this.data&&(this.root.title=this.data,this.id.data=this.data,H.next(this.id))}isPointer(){return!this.isEdit&&!this.isEditDisabled}},"app-cell","<div class='A-e-O_6_p j-ncgW7de F_m_0TG1r' data-dblclick='onDblClick' data-cls='YI8hSaW7q:isPointer' data-mouseleave='onMouseLeave'><div class='Oqe_p_Krwq'><label data-if='isEdit'><input class='E4o-uVP_u u-K-W_PXi' data-inject_to='input' data-keydown='onKeyDown' data-change='onChange'></label><div data-if='!isEdit'><txt-val>data</txt-val></div></div></div>")],it=_({template:"",element:class{}});A([{tagName:i.TEXT_VALUE,targetElement:it}]);const ot=new class{constructor(){this.isComponentMode=!1}register(t){A(t)}run(t){this.isComponentMode=!!t,R((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=T(st))}start(){const t=F(O.join("")),s=F(".muWo3_q-ww {position: relative;padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;border: solid 1px;}.muWo3_q-ww * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.muWo3_q-ww .L_X-i_Vnt {width: 100%;height: 80px;font-weight: bold;border-top: solid 1px;user-select: none;}.muWo3_q-ww .X_H-6_Olo {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;}.muWo3_q-ww .l4h-v-O-y {width: 100%;height: 80px;}.muWo3_q-ww .V_V-T8r-we {width: 100%;height: 60px;min-height: 40px;display: flex;flex-flow: row nowrap;border-left: solid 1px;border-bottom: solid 1px;}.muWo3_q-ww .A-e-O_6_p {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;border-right: solid 1px;padding: 5px;}.muWo3_q-ww .E4o-uVP_u {width: 100%;height: 100%;border: none;outline: 0;}.muWo3_q-ww .Oqe_p_Krwq {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}.muWo3_q-ww .u-K-W_PXi {background: rgba(0, 0, 0, 0.1);}.muWo3_q-ww .j-ncgW7de {justify-content: center;}.muWo3_q-ww .F_m_0TG1r {align-items: center;}.muWo3_q-ww .YI8hSaW7q {cursor: pointer;}");M(e.head,t),M(e.head,s),!this.isComponentMode&&M(e.body,this.appElement)}};q.init(),Z.set(G.EN),ot.register(nt),ot.run(!0),t.TableController=new class{createTable(t){return new V(`<app-simple-table table-name='${t}'></app-simple-table>`,t)}}})()})();