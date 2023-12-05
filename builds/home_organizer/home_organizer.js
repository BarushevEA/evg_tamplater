(()=>{"use strict";var t={909:(t,e,s)=>{e.P=void 0;const n=s(594);e.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...t){if(this._isDestroyed)return null;for(let e=0;e<t.length;e++){const s=t[e];s&&this.list.push(s)}}unsubscribe(t){if(this._isDestroyed)return null;t&&t.unsubscribe(),(0,n.deleteFromArray)(this.list,t)}unsubscribeAll(){if(this._isDestroyed)return null;const t=this.list.length;for(let e=0;e<t;e++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const s=t.indexOf(e);if(-1===s)return!1;const n=t.length-1;for(let e=s;e<n;)t[e++]=t[e];return t.length=n,!0}},637:(t,e,s)=>{e.y$=void 0;const n=s(594);class i{constructor(t,e){this.isMarkedForUnsubscribe=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const s=e.listener;if(s)switch(!0){case!e.observable:return void e.unsubscribe();case e.isListenPaused:return;case!e.isPipe:return void s(t);case e.once.isOnce:e.once.isFinished=!0,s(t),e.unsubscribe();break;case!!e.unsubscribeByNegativeCondition:if(!e.unsubscribeByNegativeCondition(t))return e.unsubscribeByNegativeCondition=null,void e.unsubscribe();s(t);break;case!!e.unsubscribeByPositiveCondition:if(e.unsubscribeByPositiveCondition(t))return e.unsubscribeByPositiveCondition=null,void e.unsubscribe();s(t);break;case!!e.emitByNegativeCondition:!e.emitByNegativeCondition(t)&&s(t);break;case!!e.emitByPositiveCondition:e.emitByPositiveCondition(t)&&s(t);break;case!!e.emitMatchCondition:e.emitMatchCondition(t)===t&&s(t)}else e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return"function"!=typeof t&&(t=()=>!1),this.unsubscribeByNegativeCondition=t,this}unsubscribeByPositive(t){return"function"!=typeof t&&(t=()=>!0),this.unsubscribeByPositiveCondition=t,this}emitByNegative(t){return"function"!=typeof t&&(t=()=>!0),this.emitByNegativeCondition=t,this}emitByPositive(t){return"function"!=typeof t&&(t=()=>!1),this.emitByPositiveCondition=t,this}emitMatch(t){return"function"!=typeof t&&(t=()=>`ERROR CONDITION TYPE ${typeof t},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=t,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.y$=class{constructor(t){this.value=t,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=t;const e=this.listeners.length;for(let s=0;s<e;s++)this.listeners[s].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++){const t=this.listenersForUnsubscribe[e];this.unSubscribe(t)}this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,n.deleteFromArray)(this.listeners,t)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const s=new i(this,!1);return s.subscribe(t,e),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function s(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}(()=>{var t,e,n,i=s(637);function o(t){return`data-${t}`}function r(t,e){return t?t.getAttribute(o(e)):""}function a(t,e,s){t&&t.setAttribute(o(e),s)}function h(t,e){t&&t.removeAttribute(o(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val"}(e||(e={})),function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(n||(n={}));var c=s(909),u=s(594);const l=":",d="_______$$bool";function m(s){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.y$(!1),this.onInit$=new i.y$(!1),this.onDestroy$=new i.y$(!1),this.attributeChanged$=new i.y$(void 0),this.beforeDetectChanges$=new i.y$(!1),this.onChangesDetected$=new i.y$(!1),this.onDataCatch$=new i.y$(void 0),this.onParentChanelReady$=new i.y$(void 0),this.ahe_clr=new c.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=s,this.ahe_component=new s.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,t.ON_IF)&&!this.ahe_component[d]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&(function(e){const s=(n=e,Array.from(n.querySelectorAll(`*:not([${o(t.INFO)}])`)));var n;for(const t of s)_(e,f(e,t))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,t.ON_IF)||this.ahe_component[d]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[d]=!0}attributeChangedCallback(t,e,s){this.attributeChanged$.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&function(t){const e=t.ahe_ForOfList;for(const s of e)_(t,p(t,s.children,t.ahe_component[s.valueName],s.parent,s.template))}(this),function(t){if(t)for(const e of t.ahe_IfList){let s=e.isFunction?!!t.ahe_component[e.valueName]():!!t.ahe_component[e.valueName];if(e.isInversion&&(s=!s),s===e.oldCondition)continue;e.oldCondition=s;const n=e.ifParent.contains(e.ifElement);s?n||M(e.ifParent,e.ifElement):n&&F(e.ifParent,e.ifElement)}}(this),function(t){if(t)for(const e of t.ahe_ClsIfList){const s=e.classConditions,i=e.element,o=t.ahe_component;for(const t of s){let e;if(t.isConditionDisabled)e=n.TRUE;else{let s=t.isFunction?!!o[t.conditionName]():!!o[t.conditionName];t.isInversion&&(s=!s),e=s?n.TRUE:n.FALSE}if(e===t.oldCondition)continue;t.oldCondition=e;const s=t.firstClassName,r=t.secondClassName;r?e===n.TRUE?(U(i,[s]),w(i,[r])):(U(i,[r]),w(i,[s])):t.isConditionDisabled||e===n.TRUE?U(i,[s]):w(i,[s])}}}(this),function(t){if(t)for(const e of t.ahe_nValues){const s=""+t.ahe_component[e.valueName];e.textElement.innerHTML!==s&&(e.textElement.innerHTML=s)}}(this),function(t){if(t)for(const e of t.ahe_nFunctions){const s=""+t.ahe_component[e.valueName]();e.textElement.innerHTML!==s&&(e.textElement.innerHTML=s)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t&&t.ahe_component&&t.sendData)return t}transferToChanel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((s=>{t().sendData(e(s))}))}sendToChanel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function _(s,i){if(!i.length)return;let o="[";if(i.length>1){for(const e of i)o+=E(s,e),a(e,t.INFO,o.trim()+"]"),e.ahe_parent_chanel=s.getChanel(s),e.onParentChanelReady$.next(e.ahe_parent_chanel);return}const c=i[0];!function(t,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE){if(!s.innerHTML)return!1;const e=b(t,s.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:s,valueName:e.valueName}),!0):(t.ahe_nValues.push({textElement:s,valueName:e.valueName}),!0)}return!1}(s,c)?(o+=function(e,s){const n=function(t,e,s){const n=r(e,s);return n&&t?(h(e,s),n):""}(e,s,t.INJECT_TO);return n?(e.ahe_component[n]=s,"inj "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_CLICK);return n?(s.onclick=t=>g(e,n,t),"clk "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_MOUSE_LEAVE);return n?(s.onmouseleave=t=>g(e,n,t),"mlv "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_MOUSE_ENTER);return n?(s.onmouseenter=t=>g(e,n,t),"mer "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_MOUSE_UP);return n?(s.onmouseup=t=>g(e,n,t),"mup "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_MOUSE_DOWN);return n?(s.onmousedown=t=>g(e,n,t),"mdn "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_MOUSE_MOVE);return n?(s.onmousemove=t=>g(e,n,t),"mmv "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_KEY_DOWN);return n?(s.onkeydown=t=>g(e,n,t),"kdn "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_KEY_UP);return n?(s.onkeyup=t=>g(e,n,t),"kup "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_KEY_DBL_CLICK);return n?(s.ondblclick=t=>g(e,n,t),"dbc "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_SCROLL);return n?(s.onscroll=t=>g(e,n,t),"scl "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_WHEEL);return n?(s.onwheel=t=>g(e,n,t),"whl "):""}(s,c),o+=function(e,s){const n=N(e,s,t.ON_CHANGE);return n?(s.onchange=t=>g(e,n,t),"chg "):""}(s,c),o+=function(e,s){const n=r(s,t.ON_HANDLE);return n&&e?(O(e,n,s),h(s,t.ON_HANDLE),"elt "):""}(s,c),o+=E(s,c),o+=function(e,s){let i=r(s,t.CLASS_IF);if(!i)return"";const o=i.split(" "),a=[],c={element:s,classConditions:a};for(const t of o)if(t.includes("?")){const s=t.split("?"),i=b(e,s[0]),o=s[1].split(l);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:n.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(t.includes(l)){const s=t.split(l),i=b(e,s[1]);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:n.UNDEFINED,firstClassName:s[0],secondClassName:""})}else a.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:n.UNDEFINED,firstClassName:t,secondClassName:""});return e.ahe_ClsIfList.push(c),h(s,t.CLASS_IF),"cls "}(s,c),a(c,t.INFO,o.trim()+"]")):a(c,t.INFO,o+"var]"),s.isAppElement(c)&&(c.ahe_parent_chanel=s.getChanel(s),c.onParentChanelReady$.next(c.ahe_parent_chanel))}function E(s,n){let i=r(n,t.ON_IF);if(!i)return"";const o=y(e.TEXT_VALUE),c=n.parentElement,u=b(s,i);return s.ahe_IfList.push({ifElement:n,valueName:u.valueName,ifParent:o,oldCondition:!1,isInversion:u.isInversion,isFunction:u.isFunction}),c.insertBefore(o,n),F(c,n),h(n,t.ON_IF),a(o,t.INFO,"[ifp]"),"ifc "}const C=[0];function f(s,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE)return(C[0]=n)&&C;if(!s.isAppElement(n))return(C[0]=n)&&C;const i=r(n,t.FOR);if(!i)return(C[0]=n)&&C;const o=s.ahe_component[i];if(!o)return(C[0]=n)&&C;const c=y(e.TEXT_VALUE),u=n.parentElement;u.insertBefore(c,n),F(u,n),h(n,t.FOR),a(c,t.INFO,"[for-of]");const l=p(s,[],o,c,n);return s.ahe_ForOfList.push({parent:c,template:n,children:l,valueName:i}),l}function p(e,s,n,i,o){const h=[],c=s.length,l=n.length;let d=l-c;if(d>0)for(let e=0;e<d;e++){const e=y(o.tagName);s.push(e),h.push(e);const n=r(o,t.ON_IF);n&&a(e,t.ON_IF,n),M(i,e)}else{d*=-1;for(let t=0;t<d;t++){const t=s.pop(),n=e.ahe_IfList;let o;for(const e of n)if(e.ifElement===t){o=e;break}o?((0,u.deleteFromArray)(n,o),F(i,o.ifParent)):F(i,t)}}for(let t=0;t<l;t++){const i=n[t],o=s[t],r=e.getChanel(o);r&&r.sendData(i)}return h}function b(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_component[n]}}function g(t,e,s){t.ahe_component[e](s)}function N(t,e,s){const n=r(e,s);return n&&t?(O(t,n,e),h(e,s),n):""}function O(t,e,s){const n=t.ahe_component[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_number]||(n.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_number].push(s))}const A="{display: contents !important;}",T=[`html-block ${A}`];function L(t){for(const e of t)T.push(`${e.tagName} ${A}`);G((()=>{for(const e of t)customElements.define(e.tagName,e.targetElement)}))}function I(t,e,s){return{tagName:e,targetElement:m({template:s,element:t})}}const D=document;let S;function y(t){return D.createElement(t)}function v(t){const e=y("style");return e.innerHTML=t,e}function w(t,e){if(t)for(const s of e)t.classList.remove(s)}function U(t,e){if(t)for(const s of e)t.classList.add(s)}function M(t,e){t&&e&&t.appendChild(e)}function F(t,e){t&&e&&t.removeChild(e)}const P=new i.y$(!1);let R,$,k,x,H=!1;function G(t){P.pipe().setOnce().subscribe((e=>e&&t())),D.body?P.next(!0):H||(H=!0,D.addEventListener("DOMContentLoaded",(()=>{P.next(!0)})))}const V=new class{constructor(t,e,s,n){R=t,$=e,k=s,x=n,S=this}set major(t){$=t}set minor(t){k=t}set patch(t){x=t}set name(t){R=t}get version(){return`${$}.${k}.${x}`}get name(){return R}get description(){return`[${R} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){S?console.log(S.description,...t):console.log("APP",...t)}("STARTED")}}("home_organizer",1,0,0);var K;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(K||(K={}));const B=new i.y$(K.EN);class X extends c.P{constructor(){super()}get current(){return B.getValue()}getText(t,e){return t[e]}getCurrentText(t){return t[B.getValue()]}onChange(t){return B.subscribe(t)}set(t){B.next(t)}destroy(){super.destroy(),B.destroy()}}const W=new X;var z,Y,j,q,J,Q,Z;!function(t){t.NULL="NULL",t.SETTINGS="SETTINGS",t.ACCOUNT="ACCOUNT",t.CHOICE="CHOICE"}(z||(z={})),function(t){t.NULL="NULL",t.SHOW="SHOW",t.ITEM_CLICK="ITEM_CLICK"}(Y||(Y={})),function(t){t.LIGHT="LIGHT",t.DARK="DARK"}(j||(j={})),function(t){t.DEFAULT="DEFAULT"}(q||(q={})),function(t){t.LANGUAGE="LANGUAGE",t.THEME="THEME",t.TIME_OPTION="TIME_OPTION"}(J||(J={})),function(t){t.TASKS="TASKS",t.FAVORITE="FAVORITE",t.FOOD="FOOD",t.GOODS="GOODS"}(Q||(Q={})),function(t){t.SIGN_IN="SIGN_IN",t.REGISTER="REGISTER",t.EDIT="EDIT",t.SIGN_OUT="SIGN_OUT",t.DELETE="DELETE"}(Z||(Z={}));const tt=[K.EN,K.UA,K.RU],et={language:{[K.EN]:"Language",[K.RU]:"Язык",[K.UA]:"Мова"},theme:{[K.EN]:"Theme",[K.RU]:"Тема",[K.UA]:"Тема"},timeOption:{[K.EN]:"Time option",[K.RU]:"Настройка времени",[K.UA]:"Налаштування часу"}},st={tasks:{[K.EN]:"Current tasks",[K.RU]:"Текущие задачи",[K.UA]:"Поточні завдання"},favorite:{[K.EN]:"Favorite",[K.RU]:"Избранное",[K.UA]:"Обране"},food:{[K.EN]:"Food",[K.RU]:"Продукты питания",[K.UA]:"Продукти харчування"},goods:{[K.EN]:"Goods",[K.RU]:"Непродовольственные товары",[K.UA]:"Непродовольчі товари"}},nt={signIn:{[K.EN]:"Sign in",[K.RU]:"Войти",[K.UA]:"Увійти"},register:{[K.EN]:"Register",[K.RU]:"Зарегистрировать",[K.UA]:"Зрареєструвати"},edit:{[K.EN]:"Edit",[K.RU]:"Редактировать",[K.UA]:"Редагувати"},signOut:{[K.EN]:"Sign out",[K.RU]:"Выйти",[K.UA]:"Вийти"},delete:{[K.EN]:"Delete",[K.RU]:"Удалить",[K.UA]:"Видалити"}},it={choice:{[K.EN]:"User tasks",[K.RU]:"Задачи пользователя",[K.UA]:"Завдання користувача"},account:{[K.EN]:"Account settings",[K.RU]:"Настройки аккаунта",[K.UA]:"Налаштування акаунту"},settings:{[K.EN]:"Settings",[K.RU]:"Настройки",[K.UA]:"Налаштування"}},ot={isShow:!1,owner:z.NULL,menuAction:Y.NULL,item:""},rt={[z.SETTINGS]:it.settings,[z.ACCOUNT]:it.account,[z.CHOICE]:it.choice},at={[J.LANGUAGE]:et.language,[J.THEME]:et.theme,[J.TIME_OPTION]:et.timeOption},ht={[Q.FAVORITE]:st.favorite,[Q.FOOD]:st.food,[Q.GOODS]:st.goods,[Q.TASKS]:st.tasks},ct={[Z.SIGN_IN]:nt.signIn,[Z.SIGN_OUT]:nt.signOut,[Z.REGISTER]:nt.register,[Z.EDIT]:nt.edit,[Z.DELETE]:nt.delete};var ut,lt;!function(t){t.TASKS="TASKS",t.FAVORITE="FAVORITE",t.FOOD="FOOD",t.GOODS="GOODS"}(ut||(ut={})),function(t){t.NULL="NULL",t.FOOD="FOOD",t.GOODS="GOODS"}(lt||(lt={}));const dt="01234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",mt=()=>((t,e)=>{e=Math.round(e/2);let s="id# ";s+="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"[Math.round(51*Math.random())]+(Math.round(Math.random())?":-."[Math.round(2*Math.random())]:dt[Math.round(62*Math.random())]);for(let t=1;t<e;t++)s+=dt[Math.round(62*Math.random())]+(Math.round(Math.random())?":-."[Math.round(2*Math.random())]:dt[Math.round(62*Math.random())]);return s})(0,32),_t=[{type:lt.FOOD,name:"Bread",comment:"Don't eat it for dinner",description:"White Ukrainian bread",isFavorite:!0,isFail:!1,isSelected:!0,id:mt(),count:1,price:10,cost:10,startDate:0,endDate:0},{type:lt.FOOD,name:"Apple",comment:"Very useful",description:"Red apple",isFavorite:!0,isFail:!1,isSelected:!1,id:mt(),count:1,price:15,cost:15,startDate:0,endDate:0},{type:lt.FOOD,name:"Cupcake",comment:"Very sweet",description:"Cupcake with chocolate",isFavorite:!1,isFail:!1,isSelected:!0,id:mt(),count:1,price:40,cost:40,startDate:0,endDate:0},{type:lt.GOODS,name:"Knife",comment:"Dangerous",description:"Iron knife",isFavorite:!1,isFail:!1,isSelected:!1,id:mt(),count:1,price:100,cost:100,startDate:0,endDate:0},{type:lt.GOODS,name:"Table",comment:"New desktop",description:"Brown table",isFavorite:!1,isFail:!1,isSelected:!0,id:mt(),count:1,price:1e3,cost:1e3,startDate:0,endDate:0}],Et=new i.y$(ot),Ct=new i.y$(ut.TASKS),ft=new i.y$(_t);function pt(){const t=Et.getValue();t.isShow&&(t.isShow=!1,t.owner=z.NULL,t.menuAction=Y.SHOW,Et.next(t))}function bt(t){const e=Et.getValue();return!!function(t,e){return t.menuAction!==Y.SHOW||t.owner===z.NULL||t.owner===e}(e,t)&&(e.isShow=!0,e.owner=t,e.menuAction=Y.SHOW,Et.next(e),!0)}const gt=new class{setTaskList(t){Ct.next(t)}changeFavorite(t,e){const s=ft.getValue(),n=this.getTask(t,s);n&&(n.isFavorite=e,ft.next(s))}getTask(t,e){for(const s of e)if(s.id===t)return s}};function Nt(t){let e=""+t;return e.length<2&&(e="0"+e),e}const Ot=S.name;let At="";for(let t=0;t<Ot.length;t++){const e=Ot[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}At+=s||"-"}const Tt="app-"+At,Lt=[I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.collect(this.handleMenuEvents())}onInit(){this.initMainChanel(),this.root.sendToChanel(this.mainChanel,"INIT COMPLETE")}onDestroy(){}initMainChanel(){this.mainChanel=this.root.getChanel(this.main)}handleMenuEvents(){return Et.subscribe((t=>{if(this.isChoiceItemClick(t))switch(t.item){case ut.TASKS:gt.setTaskList(ut.TASKS);break;case ut.FAVORITE:gt.setTaskList(ut.FAVORITE);break;case ut.FOOD:gt.setTaskList(ut.FOOD);break;case ut.GOODS:gt.setTaskList(ut.GOODS)}}))}isChoiceItemClick(t){return t.menuAction===Y.ITEM_CLICK&&t.owner===z.CHOICE}},Tt,"<div class='mwR-3_e_rp'><div class='UU4z3-BGrq'><app-header></app-header><app-main data-inject_to='main'></app-main><app-footer></app-footer></div></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-header","<div class='KJFK5xe_ru'><app-choice></app-choice><app-account></app-account><app-menu></app-menu></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.transferToChanel((()=>this.taskListChanel),(t=>t))}onInit(){this.initTaskListChanel()}onDestroy(){}initTaskListChanel(){this.taskListChanel=this.root.getChanel(this.taskList)}},"app-main","<div class='j-LOyH9Pro'><app-baner></app-baner><div class='QgNaC-f-ep'><app-task_list data-inject_to='taskList'></app-task_list></div><app-menu_list></app-menu_list></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-footer","<div class='M-n-v-Rjri'><app-author></app-author><app-current_date></app-current_date></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.isArrowBackShow=!1,this.isMenuOpened=!1}onCreate(){this.root.collect(this.menuEventsHandle())}onInit(){}onDestroy(){}onClick(){this.isMenuOpened||!bt(z.SETTINGS)?(this.isMenuOpened=!1,pt()):this.isMenuOpened=!0}menuEventsHandle(){return Et.pipe().emitByPositive((t=>t.menuAction!==Y.SHOW?(this.isMenuOpened=!1,!1):this.isArrowBackShow!==t.isShow)).subscribe((t=>{this.isArrowBackShow=t.isShow,t.isShow||(this.isMenuOpened=!1),this.root.detectChanges()}))}},"app-menu","<div class='LeXcdQH-rw' data-cls='isArrowBackShow?m_h-F_r_e:L8I_Cou-we' data-click='onClick'></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}onClick(){bt(z.ACCOUNT)}},"app-account","<div class='kcQav-mneq eUjc4ddhi' data-click='onClick'></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.currentLocalizedText=ht[Q.TASKS],this.taskName=W.getCurrentText(this.currentLocalizedText)}onCreate(){this.root.collect(this.locationChange(),this.taskChange())}onInit(){}onDestroy(){}onClick(){bt(z.CHOICE)}taskChange(){return Et.pipe().emitByPositive((t=>t.owner===z.CHOICE&&t.menuAction===Y.ITEM_CLICK)).subscribe((t=>{this.currentLocalizedText=ht[t.item],this.taskName=W.getCurrentText(this.currentLocalizedText),this.root.detectChanges()}))}locationChange(){return B.subscribe((t=>{this.taskName=W.getText(this.currentLocalizedText,t),this.root.detectChanges()}))}},"app-choice","<div class='H-L6h-c_ey' data-click='onClick'><txt-val>taskName</txt-val></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-author","<div class='VF6nk-U-eu'> Hello author.html</div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.separator=":",this.updateDate()}onCreate(){}onInit(){this.handleTime()}onDestroy(){}handleTime(){this.timer=setInterval((()=>{this.updateDate(),this.root.detectChanges()}),500)}updateDate(){const t=this.separator;this.isShowSecondSeparator=!this.isShowSecondSeparator;const e=new Date,s=Nt(e.getSeconds()),n=Nt(e.getMinutes()),i=Nt(e.getHours()),o=Nt(e.getDate()),r=Nt(e.getMonth()+1),a=Nt(e.getFullYear());this.date=`${a}${t}${r}${t}${o} `,this.time=`${i}${t}${n} `,this.second=`${s}`}},"app-current_date","<div class='e-wjYyT7o'><span><txt-val>date</txt-val></span><span><txt-val>time</txt-val></span><span data-cls='PE3_THt-ry:isShowSecondSeparator'><txt-val>separator</txt-val></span><span><txt-val>second</txt-val></span></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-baner","<div class='t-V_M-q_re'> Hello baner.html</div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.currentView=ut.TASKS,this.viewList=[]}onCreate(){this.root.collect(ft.subscribe((()=>{this.handleCurrentView(),this.root.detectChanges()})),Ct.subscribe((t=>{this.currentView=t,this.handleCurrentView(),this.root.detectChanges()}))),this.root.dataCatch$().subscribe((t=>{console.log("====>",this.currentView,t),this.handleCurrentView(),this.root.detectChanges()}))}onInit(){}onDestroy(){}handleCurrentView(){const t=ft.getValue();switch(this.viewList.length=0,console.log(this),this.currentView){case ut.FAVORITE:for(const e of t)e.isFavorite&&this.viewList.push(e);break;case ut.FOOD:for(const e of t)e.type===lt.FOOD&&this.viewList.push(e);break;case ut.GOODS:for(const e of t)e.type===lt.GOODS&&this.viewList.push(e);break;case ut.TASKS:for(const e of t)e.isSelected&&this.viewList.push(e)}}},"app-task_list","<div class='LyNXVfN-ei'><app-task data-for='viewList'></app-task></div>"),I(class{constructor(t){this.root=t,this.tagName=t.tagName,this.defaultInit()}onCreate(){this.root.dataCatch$().subscribe((t=>{for(const e in t)this[e]=t[e];console.log(this.id),this.setTitle(),this.root.detectChanges()}))}onInit(){this.setTitle()}onDestroy(){}favoriteClick(t){t.stopPropagation(),t.preventDefault(),this.isFavorite=!this.isFavorite,console.log("favoriteClick(event: MouseEvent)",this.id,this.isFavorite),gt.changeFavorite(this.id,this.isFavorite),this.root.detectChanges()}defaultInit(){this.comment="",this.cost=0,this.count=0,this.description="",this.endDate=0,this.id="",this.isFail=!1,this.isFavorite=!1,this.isSelected=!1,this.name="",this.price=0,this.startDate=0,this.type=lt.NULL}setTitle(){this.root.title=this.comment,this.hover&&(this.hover.title=this.comment)}},"app-task","<div class='p-TQz_t_rr K-ImI_T-wu' data-inject_to='hover'><div data-click='favoriteClick' data-cls='W_t_qpp_wq isFavorite?etIC2Sx1w:d_B_4cj8q'></div><div class='D-n_6-0-ew'><div><txt-val>name</txt-val><txt-val>count</txt-val></div><div><txt-val>price</txt-val><txt-val>cost</txt-val></div></div></div>"),I(class{constructor(t){this.isMenuShow=!1,this.isDisplayNone=!0,this.root=t,this.name=t.tagName,this.showTimer=0,this.items=[],this.owner=z.NULL,this.ownerName=z.NULL}onCreate(){this.showHandler(),this.changeLanguage()}onInit(){}onDestroy(){}btnClick(){pt()}showHandler(){this.root.collect(Et.pipe().emitByPositive((t=>t.menuAction===Y.SHOW)).subscribe((t=>{this.initOwnerData(t),this.initItems(),this.handleAnimation(),this.root.detectChanges()})))}initOwnerData(t){this.owner=t.owner,this.owner!==z.NULL&&(this.ownerName=W.getCurrentText(rt[this.owner])),this.isMenuShow=t.isShow}handleAnimation(){clearTimeout(this.showTimer),this.isMenuShow?this.isDisplayNone=!1:this.showTimer=setTimeout((()=>{this.isDisplayNone=!0,this.root.detectChanges()}),1e3)}changeLanguage(){this.root.collect(W.onChange((t=>{this.handleTitleLocale(t),this.handleItemsLocale(t),this.root.detectChanges()})))}handleTitleLocale(t){this.owner!==z.NULL&&(this.ownerName=W.getText(rt[this.owner],t))}initItems(){switch(this.items.length=0,this.owner){case z.SETTINGS:this.fillItems(at);break;case z.ACCOUNT:this.fillItems(ct);break;case z.CHOICE:this.fillItems(ht)}}fillItems(t){for(const e in t){const s={owner:this.owner,type:e,text:W.getCurrentText(t[e])};this.items.push(s)}}handleItemsLocale(t){for(const e of this.items)switch(e.owner){case z.SETTINGS:e.text=W.getText(at[e.type],t);break;case z.ACCOUNT:e.text=W.getText(ct[e.type],t);break;case z.CHOICE:e.text=W.getText(ht[e.type],t)}}},"app-menu_list","<div class='pyOwn-j_ee' data-cls='t-v_1aT_eo:isDisplayNone isMenuShow?mMxvnIc7wp:h-7_k_xmwr'><div class='d1D-O_sDwi'><div class='Bnowqez3wt' data-click='btnClick'><div class='zQOyHCV_r'></div><txt-val>ownerName</txt-val><div class='O-Bf4rTwwy NH1-f-2ct'></div></div><div class='L_h-w-B_p'><app-menu_item data-for='items'></app-menu_item></div></div></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.currentLang=B.getValue(),this.owner=z.NULL,this.setting="",this.langList=tt,this.isShowLangViewBox=!1}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text=t.text,this.owner=t.owner,this.setting=t.type,this.root.detectChanges()})),this.root.collect(this.handleLocationChange())}onInit(){}onDestroy(){}onClick(t){switch(t.preventDefault(),t.stopPropagation(),function(t,e){if(t===z.SETTINGS&&e===J.LANGUAGE)return;pt();const s=Et.getValue();s.item=e,s.owner=t,s.menuAction=Y.ITEM_CLICK,Et.next(s)}(this.owner,this.setting),this.owner){case z.SETTINGS:this.handleSettingsClick();case z.CHOICE:case z.ACCOUNT:}}isSettingLang(){return this.owner===z.SETTINGS&&this.setting===J.LANGUAGE}handleSettingsClick(){switch(this.setting){case J.LANGUAGE:this.settingLangClick();case J.THEME:case J.TIME_OPTION:}}settingLangClick(){this.isShowLangViewBox=!this.isShowLangViewBox,this.root.detectChanges()}handleLocationChange(){return B.subscribe((t=>{this.isShowLangViewBox=!1,this.currentLang=t,this.root.detectChanges()}))}},"app-menu_item","<div class='m_X_c_f6er' data-click='onClick'><txt-val>text</txt-val><div class='MYX-YS0_y'></div><div class='YQNwpcv-et' data-if='isSettingLang'><div class='y_T8lRsqu'></div><txt-val>currentLang</txt-val><div class='P-9_a-j-ww' data-if='isShowLangViewBox'><app-settings_lang data-for='langList'></app-settings_lang></div></div></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.dataCatch$().subscribe((t=>{this.localeTxt=t,this.root.detectChanges()}))}onInit(){}onDestroy(){}onClick(t){t.preventDefault(),t.stopPropagation(),B.next(this.localeTxt)}},"app-settings_lang","<div class='lXt88udUrt' data-click='onClick'><div class='l_DFPT9-wo'></div><txt-val>localeTxt</txt-val></div>")],It=m({template:"",element:class{}});L([{tagName:e.TEXT_VALUE,targetElement:It}]);const Dt=new class{constructor(){this.isComponentMode=!1}register(t){L(t)}run(t){this.isComponentMode=!!t,G((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=y(Tt))}start(){const t=v(T.join("")),e=v("@font-face {font-family: Tahoma;src: url('assets/fonts/tahoma.ttf') format('truetype');}@keyframes button-animation {}@keyframes menu_list_animation_show {0% {display: none;width: 0;}100% {display: flex;width: 358px;}}@keyframes menu_list_animation_hidden {0% {display: flex;width: 358px;}100% {width: 0;display: none;}}* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}body {overflow: hidden;}.mwR-3_e_rp {width: 100vw;height: 100vh;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 100vw;min-height: 100vh;font-family: Tahoma, serif;font-size: 24px;letter-spacing: 1px;}.mwR-3_e_rp .KJFK5xe_ru {width: 100%;height: 100px;min-width: 100%;min-height: 100px;padding: 10px;display: flex;flex-flow: row nowrap;justify-content: space-between;align-items: center;overflow: hidden;}.mwR-3_e_rp .LeXcdQH-rw {width: 85px;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;min-width: 85px;min-height: 85px;margin-right: 5px;margin-left: 5px;}.mwR-3_e_rp .LeXcdQH-rw:hover {animation: button-animation 1s;}.mwR-3_e_rp .header-menu-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .header-menu-hover:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .L8I_Cou-we {background: url('assets/images/menu.png') no-repeat center;background-size: 50%;}.mwR-3_e_rp .m_h-F_r_e {background: url('assets/images/arrow_back.png') no-repeat center;background-size: 30%;}.mwR-3_e_rp .H-L6h-c_ey {width: 100%;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;margin-right: 5px;margin-left: 5px;text-transform: uppercase;font-size: 20px;font-weight: bold;text-align: center;color: #802b51;}.mwR-3_e_rp .H-L6h-c_ey:hover {animation: button-animation 1s;}.mwR-3_e_rp .header-choice-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .header-choice-hover:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .kcQav-mneq {width: 85px;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;min-width: 85px;min-height: 85px;margin-right: 5px;margin-left: 5px;}.mwR-3_e_rp .kcQav-mneq:hover {animation: button-animation 1s;}.mwR-3_e_rp .header-account-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .header-account-hover:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .eUjc4ddhi {background: url('assets/images/account.png') no-repeat;background-size: cover;}.mwR-3_e_rp .j-LOyH9Pro {position: relative;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;flex-grow: 1;}.mwR-3_e_rp .QgNaC-f-ep {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;flex-grow: 1;}.mwR-3_e_rp .t-V_M-q_re {width: 100%;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;background: #f5f5f5;border-top: 1px solid rgba(0, 0, 0, 0.2);border-bottom: 1px solid rgba(0, 0, 0, 0.2);overflow: hidden;}.mwR-3_e_rp .pyOwn-j_ee {position: absolute;top: 0;left: 0;height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;background: #fff;}.mwR-3_e_rp .j-LOyH9Pro .mMxvnIc7wp {overflow: hidden;animation: menu_list_animation_show 0.5s forwards;}.mwR-3_e_rp .j-LOyH9Pro .h-7_k_xmwr {overflow: hidden;animation: menu_list_animation_hidden 0.5s forwards;}.mwR-3_e_rp .j-LOyH9Pro .d1D-O_sDwi {position: absolute;top: 0;right: 0;border: 1px solid rgba(0, 0, 0, 0.2);width: 360px;height: 100%;min-width: 360px;min-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.mwR-3_e_rp .j-LOyH9Pro .Bnowqez3wt {width: 100%;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;display: flex;flex-flow: row nowrap;justify-content: space-between;padding: 4px 10px;border-bottom: 1px solid rgba(0, 0, 0, 0.2);user-select: none;cursor: pointer;overflow: hidden;}.mwR-3_e_rp .j-LOyH9Pro .Bnowqez3wt:hover {animation: button-animation 1s;}.mwR-3_e_rp .j-LOyH9Pro .zQOyHCV_r {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .j-LOyH9Pro .zQOyHCV_r:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .j-LOyH9Pro .O-Bf4rTwwy {width: 30px;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;}.mwR-3_e_rp .j-LOyH9Pro .O-Bf4rTwwy:hover {animation: button-animation 1s;}.mwR-3_e_rp .j-LOyH9Pro .menu_list-button-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .j-LOyH9Pro .menu_list-button-hover:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .j-LOyH9Pro .NH1-f-2ct {background: url('assets/images/arrow_back.png') no-repeat center;background-size: 80%;}.mwR-3_e_rp .j-LOyH9Pro .L_h-w-B_p {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;padding-right: 10px;padding-left: 10px;}.mwR-3_e_rp .j-LOyH9Pro .t-v_1aT_eo {display: none;}.mwR-3_e_rp .m_X_c_f6er {width: 100%;height: 60px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;align-items: flex-start;justify-content: center;padding-left: 10px;margin-top: 0px;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07);overflow: visible;}.mwR-3_e_rp .m_X_c_f6er:hover {animation: button-animation 1s;}.mwR-3_e_rp .MYX-YS0_y {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .MYX-YS0_y:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .m_X_c_f6er * {overflow: visible;}.mwR-3_e_rp .YQNwpcv-et {width: 50px;height: 50px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;position: absolute;right: 10px;overflow: visible;}.mwR-3_e_rp .YQNwpcv-et:hover {animation: button-animation 1s;}.mwR-3_e_rp .y_T8lRsqu {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .y_T8lRsqu:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .P-9_a-j-ww {position: absolute;top: 0;cursor: default;width: 50px;height: fit-content;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 50px;min-height: fit-content;background: #f5f5f5;z-index: 10;}.mwR-3_e_rp .j-LOyH9Pro .lXt88udUrt {width: 40px;height: 50px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;margin: 5px;background: #fbfbfb;}.mwR-3_e_rp .j-LOyH9Pro .lXt88udUrt:hover {animation: button-animation 1s;}.mwR-3_e_rp .j-LOyH9Pro .l_DFPT9-wo {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.mwR-3_e_rp .j-LOyH9Pro .l_DFPT9-wo:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .LyNXVfN-ei {width: 100%;height: 100%;max-width: 100%;max-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.mwR-3_e_rp .p-TQz_t_rr {width: 100%;height: 100px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;display: flex;flex-flow: row nowrap;justify-content: flex-start;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07);position: relative;cursor: pointer;user-select: none;padding: 10px;}.mwR-3_e_rp .K-ImI_T-wu:hover {background: rgba(0, 0, 0, 0.05);}.mwR-3_e_rp .W_t_qpp_wq {width: 80px;height: 80px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;}.mwR-3_e_rp .etIC2Sx1w {background: url('assets/images/favorite32.png') no-repeat center;background-size: 70%;}.mwR-3_e_rp .D-n_6-0-ew {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;justify-content: center;align-items: flex-start;}.mwR-3_e_rp .M-n-v-Rjri {width: 100%;height: 100px;min-width: 100%;min-height: 100px;display: flex;flex-flow: column nowrap;justify-content: space-between;align-items: center;border-top: 1px solid rgba(0, 0, 0, 0.2);overflow: hidden;}.mwR-3_e_rp .VF6nk-U-eu {width: 100%;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 100%;min-height: 30px;overflow: hidden;}.mwR-3_e_rp .e-wjYyT7o {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;align-items: center;justify-content: center;overflow: hidden;}.mwR-3_e_rp .e-wjYyT7o span {margin-left: 10px;font-weight: bold;}.mwR-3_e_rp .M-n-v-Rjri .PE3_THt-ry {visibility: hidden;}.UU4z3-BGrq {width: 100%;height: 100%;max-width: 800px;max-height: 100%;background: #fbfbfb;border: 1px solid rgba(0, 0, 0, 0.2);display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;overflow: hidden;}");M(D.head,t),M(D.head,e),!this.isComponentMode&&M(D.body,this.appElement)}};V.init(),W.set(K.EN),Dt.register(Lt),Dt.run()})()})();