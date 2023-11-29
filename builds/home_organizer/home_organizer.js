(()=>{"use strict";var t={909:(t,e,n)=>{e.P=void 0;const s=n(594);e.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...t){if(this._isDestroyed)return null;for(let e=0;e<t.length;e++){const n=t[e];n&&this.list.push(n)}}unsubscribe(t){if(this._isDestroyed)return null;t&&t.unsubscribe(),(0,s.deleteFromArray)(this.list,t)}unsubscribeAll(){if(this._isDestroyed)return null;const t=this.list.length;for(let e=0;e<t;e++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const n=t.indexOf(e);if(-1===n)return!1;const s=t.length-1;for(let e=n;e<s;)t[e++]=t[e];return t.length=s,!0}},637:(t,e,n)=>{e.y$=void 0;const s=n(594);class i{constructor(t,e){this.isMarkedForUnsubscribe=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const n=e.listener;if(n)switch(!0){case!e.observable:return void e.unsubscribe();case e.isListenPaused:return;case!e.isPipe:return void n(t);case e.once.isOnce:e.once.isFinished=!0,n(t),e.unsubscribe();break;case!!e.unsubscribeByNegativeCondition:if(!e.unsubscribeByNegativeCondition(t))return e.unsubscribeByNegativeCondition=null,void e.unsubscribe();n(t);break;case!!e.unsubscribeByPositiveCondition:if(e.unsubscribeByPositiveCondition(t))return e.unsubscribeByPositiveCondition=null,void e.unsubscribe();n(t);break;case!!e.emitByNegativeCondition:!e.emitByNegativeCondition(t)&&n(t);break;case!!e.emitByPositiveCondition:e.emitByPositiveCondition(t)&&n(t);break;case!!e.emitMatchCondition:e.emitMatchCondition(t)===t&&n(t)}else e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return"function"!=typeof t&&(t=()=>!1),this.unsubscribeByNegativeCondition=t,this}unsubscribeByPositive(t){return"function"!=typeof t&&(t=()=>!0),this.unsubscribeByPositiveCondition=t,this}emitByNegative(t){return"function"!=typeof t&&(t=()=>!0),this.emitByNegativeCondition=t,this}emitByPositive(t){return"function"!=typeof t&&(t=()=>!1),this.emitByPositiveCondition=t,this}emitMatch(t){return"function"!=typeof t&&(t=()=>`ERROR CONDITION TYPE ${typeof t},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=t,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.y$=class{constructor(t){this.value=t,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=t;const e=this.listeners.length;for(let n=0;n<e;n++)this.listeners[n].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++){const t=this.listenersForUnsubscribe[e];this.unSubscribe(t)}this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.deleteFromArray)(this.listeners,t)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const n=new i(this,!1);return n.subscribe(t,e),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,n),o.exports}(()=>{var t,e,s,i=n(637);function o(t){return`data-${t}`}function r(t,e){return t?t.getAttribute(o(e)):""}function a(t,e,n){t&&t.setAttribute(o(e),n)}function h(t,e){t&&t.removeAttribute(o(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val"}(e||(e={})),function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(s||(s={}));var c=n(909),u=n(594);const l=":",_="_______$$bool";function d(n){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.y$(!1),this.onInit$=new i.y$(!1),this.onDestroy$=new i.y$(!1),this.attributeChanged$=new i.y$(void 0),this.beforeDetectChanges$=new i.y$(!1),this.onChangesDetected$=new i.y$(!1),this.onDataCatch$=new i.y$(void 0),this.onParentChanelReady$=new i.y$(void 0),this.ahe_clr=new c.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,t.ON_IF)&&!this.ahe_component[_]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&(function(e){const n=(s=e,Array.from(s.querySelectorAll(`*:not([${o(t.INFO)}])`)));var s;for(const t of n)m(e,f(e,t))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,t.ON_IF)||this.ahe_component[_]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[_]=!0}attributeChangedCallback(t,e,n){this.attributeChanged$.next({name:t,oldValue:e,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&function(t){const e=t.ahe_ForOfList;for(const n of e)m(t,N(t,n.children,t.ahe_component[n.valueName],n.parent,n.template))}(this),function(t){if(t)for(const e of t.ahe_IfList){let n=e.isFunction?!!t.ahe_component[e.valueName]():!!t.ahe_component[e.valueName];if(e.isInversion&&(n=!n),n===e.oldCondition)continue;e.oldCondition=n;const s=e.ifParent.contains(e.ifElement);n?s||w(e.ifParent,e.ifElement):s&&M(e.ifParent,e.ifElement)}}(this),function(t){if(t)for(const e of t.ahe_ClsIfList){const n=e.classConditions,i=e.element,o=t.ahe_component;for(const t of n){let e;if(t.isConditionDisabled)e=s.TRUE;else{let n=t.isFunction?!!o[t.conditionName]():!!o[t.conditionName];t.isInversion&&(n=!n),e=n?s.TRUE:s.FALSE}if(e===t.oldCondition)continue;t.oldCondition=e;const n=t.firstClassName,r=t.secondClassName;r?e===s.TRUE?(P(i,[n]),v(i,[r])):(P(i,[r]),v(i,[n])):t.isConditionDisabled||e===s.TRUE?P(i,[n]):v(i,[n])}}}(this),function(t){if(t)for(const e of t.ahe_nValues){const n=""+t.ahe_component[e.valueName];e.textElement.innerHTML!==n&&(e.textElement.innerHTML=n)}}(this),function(t){if(t)for(const e of t.ahe_nFunctions){const n=""+t.ahe_component[e.valueName]();e.textElement.innerHTML!==n&&(e.textElement.innerHTML=n)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t&&t.ahe_component&&t.sendData)return t}transferToChanel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((n=>{t().sendData(e(n))}))}sendToChanel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function m(n,i){if(!i.length)return;let o="[";if(i.length>1){for(const e of i)o+=E(n,e),a(e,t.INFO,o.trim()+"]"),e.ahe_parent_chanel=n.getChanel(n),e.onParentChanelReady$.next(e.ahe_parent_chanel);return}const c=i[0];!function(t,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE){if(!n.innerHTML)return!1;const e=b(t,n.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:n,valueName:e.valueName}),!0):(t.ahe_nValues.push({textElement:n,valueName:e.valueName}),!0)}return!1}(n,c)?(o+=function(e,n){const s=function(t,e,n){const s=r(e,n);return s&&t?(h(e,n),s):""}(e,n,t.INJECT_TO);return s?(e.ahe_component[s]=n,"inj "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_CLICK);return s?(n.onclick=t=>g(e,s,t),"clk "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_MOUSE_LEAVE);return s?(n.onmouseleave=t=>g(e,s,t),"mlv "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_MOUSE_ENTER);return s?(n.onmouseenter=t=>g(e,s,t),"mer "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_MOUSE_UP);return s?(n.onmouseup=t=>g(e,s,t),"mup "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_MOUSE_DOWN);return s?(n.onmousedown=t=>g(e,s,t),"mdn "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_MOUSE_MOVE);return s?(n.onmousemove=t=>g(e,s,t),"mmv "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_KEY_DOWN);return s?(n.onkeydown=t=>g(e,s,t),"kdn "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_KEY_UP);return s?(n.onkeyup=t=>g(e,s,t),"kup "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_KEY_DBL_CLICK);return s?(n.ondblclick=t=>g(e,s,t),"dbc "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_SCROLL);return s?(n.onscroll=t=>g(e,s,t),"scl "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_WHEEL);return s?(n.onwheel=t=>g(e,s,t),"whl "):""}(n,c),o+=function(e,n){const s=p(e,n,t.ON_CHANGE);return s?(n.onchange=t=>g(e,s,t),"chg "):""}(n,c),o+=function(e,n){const s=r(n,t.ON_HANDLE);return s&&e?(A(e,s,n),h(n,t.ON_HANDLE),"elt "):""}(n,c),o+=E(n,c),o+=function(e,n){let i=r(n,t.CLASS_IF);if(!i)return"";const o=i.split(" "),a=[],c={element:n,classConditions:a};for(const t of o)if(t.includes("?")){const n=t.split("?"),i=b(e,n[0]),o=n[1].split(l);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(t.includes(l)){const n=t.split(l),i=b(e,n[1]);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:n[0],secondClassName:""})}else a.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:s.UNDEFINED,firstClassName:t,secondClassName:""});return e.ahe_ClsIfList.push(c),h(n,t.CLASS_IF),"cls "}(n,c),a(c,t.INFO,o.trim()+"]")):a(c,t.INFO,o+"var]"),n.isAppElement(c)&&(c.ahe_parent_chanel=n.getChanel(n),c.onParentChanelReady$.next(c.ahe_parent_chanel))}function E(n,s){let i=r(s,t.ON_IF);if(!i)return"";const o=D(e.TEXT_VALUE),c=s.parentElement,u=b(n,i);return n.ahe_IfList.push({ifElement:s,valueName:u.valueName,ifParent:o,oldCondition:!1,isInversion:u.isInversion,isFunction:u.isFunction}),c.insertBefore(o,s),M(c,s),h(s,t.ON_IF),a(o,t.INFO,"[ifp]"),"ifc "}const C=[0];function f(n,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE)return(C[0]=s)&&C;if(!n.isAppElement(s))return(C[0]=s)&&C;const i=r(s,t.FOR);if(!i)return(C[0]=s)&&C;const o=n.ahe_component[i];if(!o)return(C[0]=s)&&C;const c=D(e.TEXT_VALUE),u=s.parentElement;u.insertBefore(c,s),M(u,s),h(s,t.FOR),a(c,t.INFO,"[for-of]");const l=N(n,[],o,c,s);return n.ahe_ForOfList.push({parent:c,template:s,children:l,valueName:i}),l}function N(e,n,s,i,o){const h=[],c=n.length,l=s.length;let _=l-c;if(_>0)for(let e=0;e<_;e++){const e=D(o.tagName);n.push(e),h.push(e);const s=r(o,t.ON_IF);s&&a(e,t.ON_IF,s),w(i,e)}else{_*=-1;for(let t=0;t<_;t++){const t=n.pop(),s=e.ahe_IfList;let o;for(const e of s)if(e.ifElement===t){o=e;break}o?((0,u.deleteFromArray)(s,o),M(i,o.ifParent)):M(i,t)}}for(let t=0;t<l;t++){const i=s[t],o=n[t],r=e.getChanel(o);r&&r.sendData(i)}return h}function b(t,e){const n="!"===e[0],s=n?e.substring(1):e;return{isInversion:n,valueName:s,isFunction:"function"==typeof t.ahe_component[s]}}function g(t,e,n){t.ahe_component[e](n)}function p(t,e,n){const s=r(e,n);return s&&t?(A(t,s,e),h(e,n),s):""}function A(t,e,n){const s=t.ahe_component[e];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[t.ahe_number]||(s.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(s.htmlElements={})))),s.htmlElements[t.ahe_number].push(n))}const L="{display: contents !important;}",T=[`html-block ${L}`];function O(t){for(const e of t)T.push(`${e.tagName} ${L}`);G((()=>{for(const e of t)customElements.define(e.tagName,e.targetElement)}))}function I(t,e,n){return{tagName:e,targetElement:d({template:n,element:t})}}const y=document;let U;function D(t){return y.createElement(t)}function S(t){const e=D("style");return e.innerHTML=t,e}function v(t,e){if(t)for(const n of e)t.classList.remove(n)}function P(t,e){if(t)for(const n of e)t.classList.add(n)}function w(t,e){t&&e&&t.appendChild(e)}function M(t,e){t&&e&&t.removeChild(e)}const R=new i.y$(!1);let $,F,x,k,H=!1;function G(t){R.pipe().setOnce().subscribe((e=>e&&t())),y.body?R.next(!0):H||(H=!0,y.addEventListener("DOMContentLoaded",(()=>{R.next(!0)})))}const B=new class{constructor(t,e,n,s){$=t,F=e,x=n,k=s,U=this}set major(t){F=t}set minor(t){x=t}set patch(t){k=t}set name(t){$=t}get version(){return`${F}.${x}.${k}`}get name(){return $}get description(){return`[${$} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){U?console.log(U.description,...t):console.log("APP",...t)}("STARTED")}}("home_organizer",1,0,0);var K;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(K||(K={}));const V=new i.y$(K.EN);class X extends c.P{constructor(){super()}get current(){return V.getValue()}getText(t,e){return t[e]}getCurrentText(t){return t[V.getValue()]}onChange(t){return V.subscribe(t)}set(t){V.next(t)}destroy(){super.destroy(),V.destroy()}}const W=new X;var z,Y,j,q,J,Q,Z;!function(t){t.NULL="NULL",t.SETTINGS="SETTINGS",t.ACCOUNT="ACCOUNT",t.CHOICE="CHOICE"}(z||(z={})),function(t){t.NULL="NULL",t.SHOW="SHOW",t.ITEM_CLICK="ITEM_CLICK"}(Y||(Y={})),function(t){t.LIGHT="LIGHT",t.DARK="DARK"}(j||(j={})),function(t){t.DEFAULT="DEFAULT"}(q||(q={})),function(t){t.LANGUAGE="LANGUAGE",t.THEME="THEME",t.TIME_OPTION="TIME_OPTION"}(J||(J={})),function(t){t.TASKS="TASKS",t.FAVORITE="FAVORITE",t.FOOD="FOOD",t.GOODS="GOODS"}(Q||(Q={})),function(t){t.SIGN_IN="SIGN_IN",t.REGISTER="REGISTER",t.EDIT="EDIT",t.SIGN_OUT="SIGN_OUT",t.DELETE="DELETE"}(Z||(Z={}));const tt=[K.EN,K.UA,K.RU],et={language:{[K.EN]:"Language",[K.RU]:"Язык",[K.UA]:"Мова"},theme:{[K.EN]:"Theme",[K.RU]:"Тема",[K.UA]:"Тема"},timeOption:{[K.EN]:"Time option",[K.RU]:"Настройка времени",[K.UA]:"Налаштування часу"}},nt={tasks:{[K.EN]:"Current tasks",[K.RU]:"Текущие задачи",[K.UA]:"Поточні завдання"},favorite:{[K.EN]:"Favorite",[K.RU]:"Избранное",[K.UA]:"Обране"},food:{[K.EN]:"Food",[K.RU]:"Продукты питания",[K.UA]:"Продукти харчування"},goods:{[K.EN]:"Goods",[K.RU]:"Непродовольственные товары",[K.UA]:"Непродовольчі товари"}},st={signIn:{[K.EN]:"Sign in",[K.RU]:"Войти",[K.UA]:"Увійти"},register:{[K.EN]:"Register",[K.RU]:"Зарегистрировать",[K.UA]:"Зрареєструвати"},edit:{[K.EN]:"Edit",[K.RU]:"Редактировать",[K.UA]:"Редагувати"},signOut:{[K.EN]:"Sign out",[K.RU]:"Выйти",[K.UA]:"Вийти"},delete:{[K.EN]:"Delete",[K.RU]:"Удалить",[K.UA]:"Видалити"}},it={choice:{[K.EN]:"User tasks",[K.RU]:"Пользовательские задачи",[K.UA]:"Завдання користувача"},account:{[K.EN]:"Account settings",[K.RU]:"Настройки аккаунта",[K.UA]:"Налаштування акаунту"},settings:{[K.EN]:"Settings",[K.RU]:"Настройки",[K.UA]:"Налаштування"}},ot={isShow:!1,owner:z.NULL,menuAction:Y.NULL,item:""},rt={[z.SETTINGS]:it.settings,[z.ACCOUNT]:it.account,[z.CHOICE]:it.choice},at={[J.LANGUAGE]:et.language,[J.THEME]:et.theme,[J.TIME_OPTION]:et.timeOption},ht={[Q.FAVORITE]:nt.favorite,[Q.FOOD]:nt.food,[Q.GOODS]:nt.goods,[Q.TASKS]:nt.tasks},ct={[Z.SIGN_IN]:st.signIn,[Z.SIGN_OUT]:st.signOut,[Z.REGISTER]:st.register,[Z.EDIT]:st.edit,[Z.DELETE]:st.delete},ut=new i.y$(ot);function lt(){const t=ut.getValue();t.isShow&&(t.isShow=!1,t.owner=z.NULL,t.menuAction=Y.SHOW,ut.next(t))}function _t(t){const e=ut.getValue();return!!function(t,e){return t.menuAction!==Y.SHOW||t.owner===z.NULL||t.owner===e}(e,t)&&(e.isShow=!0,e.owner=t,e.menuAction=Y.SHOW,ut.next(e),!0)}function dt(t){let e=""+t;return e.length<2&&(e="0"+e),e}const mt=U.name;let Et="";for(let t=0;t<mt.length;t++){const e=mt[t];let n="";for(let t=0;t<26;t++){const s="abcdefghijklmnopqrstuvwxyz"[t];if(s===e.toLowerCase()){n=s;break}}Et+=n||"-"}const Ct="app-"+Et,ft=[I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){this.initMainChanel(),this.root.sendToChanel(this.mainChanel,"TEST APP CHANEL")}onDestroy(){}initMainChanel(){this.mainChanel=this.root.getChanel(this.main)}},Ct,"<div class='app'><div class='app-wrapper'><app-header></app-header><app-main data-inject_to='main'></app-main><app-footer></app-footer></div></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-header","<div class='header'><app-choice></app-choice><app-account></app-account><app-menu></app-menu></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.transferToChanel((()=>this.taskListChanel),(t=>t))}onInit(){this.initTaskListChanel()}onDestroy(){}initTaskListChanel(){this.taskListChanel=this.root.getChanel(this.taskList)}},"app-main","<div class='main'><app-baner></app-baner><div class='main-wrapper'><app-task_list data-inject_to='taskList'></app-task_list></div><app-menu_list></app-menu_list></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-footer","<div class='footer'><app-author></app-author><app-current_date></app-current_date></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.isArrowBackShow=!1,this.isMenuOpened=!1}onCreate(){this.root.collect(this.menuEventsHandle())}onInit(){}onDestroy(){}onClick(){this.isMenuOpened||!_t(z.SETTINGS)?(this.isMenuOpened=!1,lt()):this.isMenuOpened=!0}menuEventsHandle(){return ut.pipe().emitByPositive((t=>t.menuAction!==Y.SHOW?(this.isMenuOpened=!1,!1):this.isArrowBackShow!==t.isShow)).subscribe((t=>{this.isArrowBackShow=t.isShow,t.isShow||(this.isMenuOpened=!1),this.root.detectChanges()}))}},"app-menu","<div class='header-menu' data-cls='isArrowBackShow?header-menu-arrow_back:header-menu_icon' data-click='onClick'></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}onClick(){_t(z.ACCOUNT)}},"app-account","<div class='header-account header-account_icon' data-click='onClick'></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.currentLocalizedText=ht[Q.TASKS],this.taskName=W.getCurrentText(this.currentLocalizedText)}onCreate(){this.root.collect(this.locationChange(),this.taskChange())}onInit(){}onDestroy(){}onClick(){_t(z.CHOICE)}taskChange(){return ut.pipe().emitByPositive((t=>t.owner===z.CHOICE&&t.menuAction===Y.ITEM_CLICK)).subscribe((t=>{this.currentLocalizedText=ht[t.item],this.taskName=W.getCurrentText(this.currentLocalizedText),this.root.detectChanges()}))}locationChange(){return V.subscribe((t=>{this.taskName=W.getText(this.currentLocalizedText,t),this.root.detectChanges()}))}},"app-choice","<div class='header-choice' data-click='onClick'><txt-val>taskName</txt-val></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-author","<div class='footer-author'> Hello author.html</div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.separator=":",this.updateDate()}onCreate(){}onInit(){this.handleTime()}onDestroy(){}handleTime(){this.timer=setInterval((()=>{this.updateDate(),this.root.detectChanges()}),500)}updateDate(){const t=this.separator;this.isShowSecondSeparator=!this.isShowSecondSeparator;const e=new Date,n=dt(e.getSeconds()),s=dt(e.getMinutes()),i=dt(e.getHours()),o=dt(e.getDate()),r=dt(e.getMonth()+1),a=dt(e.getFullYear());this.date=`${a}${t}${r}${t}${o} `,this.time=`${i}${t}${s} `,this.second=`${n}`}},"app-current_date","<div class='footer-current_date'><span><txt-val>date</txt-val></span><span><txt-val>time</txt-val></span><span data-cls='hidden:isShowSecondSeparator'><txt-val>separator</txt-val></span><span><txt-val>second</txt-val></span></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-baner","<div class='main-banner'> Hello baner.html</div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.tasks=[1,2,3,4,5]}onCreate(){this.root.dataCatch$().subscribe((t=>{console.log("====>",this.name,t)}))}onInit(){}onDestroy(){}},"app-task_list","<div class='main-tasklist'><app-task data-for='tasks'></app-task></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.text=""}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text="TASK "+t,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-task","<div class='main-task'><div class='main-task-hover'></div><txt-val>text</txt-val></div>"),I(class{constructor(t){this.isMenuShow=!1,this.isDisplayNone=!0,this.root=t,this.name=t.tagName,this.showTimer=0,this.items=[],this.owner=z.NULL,this.ownerName=z.NULL}onCreate(){this.showHandler(),this.changeLanguage()}onInit(){}onDestroy(){}btnClick(){lt()}showHandler(){this.root.collect(ut.pipe().emitByPositive((t=>t.menuAction===Y.SHOW)).subscribe((t=>{this.initOwnerData(t),this.initItems(),this.handleAnimation(),this.root.detectChanges()})))}initOwnerData(t){this.owner=t.owner,this.owner!==z.NULL&&(this.ownerName=W.getCurrentText(rt[this.owner])),this.isMenuShow=t.isShow}handleAnimation(){clearTimeout(this.showTimer),this.isMenuShow?this.isDisplayNone=!1:this.showTimer=setTimeout((()=>{this.isDisplayNone=!0,this.root.detectChanges()}),1e3)}changeLanguage(){this.root.collect(W.onChange((t=>{this.handleTitleLocale(t),this.handleItemsLocale(t),this.root.detectChanges()})))}handleTitleLocale(t){this.owner!==z.NULL&&(this.ownerName=W.getText(rt[this.owner],t))}initItems(){switch(this.items.length=0,this.owner){case z.SETTINGS:this.fillItems(at);break;case z.ACCOUNT:this.fillItems(ct);break;case z.CHOICE:this.fillItems(ht)}}fillItems(t){for(const e in t){const n={owner:this.owner,type:e,text:W.getCurrentText(t[e])};this.items.push(n)}}handleItemsLocale(t){for(const e of this.items)switch(e.owner){case z.SETTINGS:e.text=W.getText(at[e.type],t);break;case z.ACCOUNT:e.text=W.getText(ct[e.type],t);break;case z.CHOICE:e.text=W.getText(ht[e.type],t)}}},"app-menu_list","<div class='main-menu_list' data-cls='display_none:isDisplayNone isMenuShow?menu_list-show:menu_list-hidden'><div class='menu_list-block'><div class='menu_list-header' data-click='btnClick'><div class='menu_list-header-hover'></div><txt-val>ownerName</txt-val><div class='menu_list-button menu_list-button-icon'></div></div><div class='menu_list-container'><app-menu_item data-for='items'></app-menu_item></div></div></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName,this.currentLang=V.getValue(),this.owner=z.NULL,this.setting="",this.langList=tt,this.isShowLangViewBox=!1}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text=t.text,this.owner=t.owner,this.setting=t.type,this.root.detectChanges()})),this.root.collect(this.handleLocationChange())}onInit(){}onDestroy(){}onClick(t){switch(t.preventDefault(),t.stopPropagation(),function(t,e){if(t===z.SETTINGS&&e===J.LANGUAGE)return;lt();const n=ut.getValue();n.item=e,n.owner=t,n.menuAction=Y.ITEM_CLICK,ut.next(n)}(this.owner,this.setting),this.owner){case z.SETTINGS:this.handleSettingsClick();case z.CHOICE:case z.ACCOUNT:}}isSettingLang(){return this.owner===z.SETTINGS&&this.setting===J.LANGUAGE}handleSettingsClick(){switch(this.setting){case J.LANGUAGE:this.settingLangClick();case J.THEME:case J.TIME_OPTION:}}settingLangClick(){this.isShowLangViewBox=!this.isShowLangViewBox,this.root.detectChanges()}handleLocationChange(){return V.subscribe((t=>{this.isShowLangViewBox=!1,this.currentLang=t,this.root.detectChanges()}))}},"app-menu_item","<div class='main-menu_item' data-click='onClick'><txt-val>text</txt-val><div class='main-menu_item-hover'></div><div class='main-lang_view' data-if='isSettingLang'><div class='main-lang_view-hover'></div><txt-val>currentLang</txt-val><div class='main-lang_view_box' data-if='isShowLangViewBox'><app-settings_lang data-for='langList'></app-settings_lang></div></div></div>"),I(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.dataCatch$().subscribe((t=>{this.localeTxt=t,this.root.detectChanges()}))}onInit(){}onDestroy(){}onClick(t){t.preventDefault(),t.stopPropagation(),V.next(this.localeTxt)}},"app-settings_lang","<div class='lang_item' data-click='onClick'><div class='lang_item-hover'></div><txt-val>localeTxt</txt-val></div>")],Nt=d({template:"",element:class{}});O([{tagName:e.TEXT_VALUE,targetElement:Nt}]);const bt=new class{constructor(){this.isComponentMode=!1}register(t){O(t)}run(t){this.isComponentMode=!!t,G((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=D(Ct))}start(){const t=S(T.join("")),e=S("@font-face {font-family: Tahoma;src: url('assets/fonts/tahoma.ttf') format('truetype');}@keyframes button-animation {}@keyframes menu_list_animation_show {0% {display: none;width: 0;}100% {display: flex;width: 360px;}}@keyframes menu_list_animation_hidden {0% {display: flex;width: 360px;}100% {width: 0;display: none;}}* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}body {overflow: hidden;}.app {width: 100vw;height: 100vh;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 100vw;min-height: 100vh;font-family: Tahoma, serif;font-size: 24px;letter-spacing: 1px;}.app .header {width: 100%;height: 100px;min-width: 100%;min-height: 100px;padding: 10px;display: flex;flex-flow: row nowrap;justify-content: space-between;align-items: center;overflow: hidden;}.app .header-menu {width: 85px;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;min-width: 85px;min-height: 85px;margin-right: 5px;margin-left: 5px;}.app .header-menu:hover {animation: button-animation 1s;}.app .header-menu-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .header-menu-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .header-menu_icon {background: url('assets/images/menu.png') no-repeat center;background-size: 50%;}.app .header-menu-arrow_back {background: url('assets/images/arrow_back.png') no-repeat center;background-size: 30%;}.app .header-choice {width: 100%;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;margin-right: 5px;margin-left: 5px;text-transform: uppercase;font-size: 20px;font-weight: bold;text-align: center;color: #802b51;}.app .header-choice:hover {animation: button-animation 1s;}.app .header-choice-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .header-choice-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .header-account {width: 85px;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;min-width: 85px;min-height: 85px;margin-right: 5px;margin-left: 5px;}.app .header-account:hover {animation: button-animation 1s;}.app .header-account-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .header-account-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .header-account_icon {background: url('assets/images/account.png') no-repeat;background-size: cover;}.app .main {position: relative;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;flex-grow: 1;}.app .main-wrapper {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;flex-grow: 1;}.app .main-banner {width: 100%;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;background: #f5f5f5;border-top: 1px solid rgba(0, 0, 0, 0.2);border-bottom: 1px solid rgba(0, 0, 0, 0.2);overflow: hidden;}.app .main-menu_list {position: absolute;top: 0;left: 0;height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;background: #fff;}.app .main .menu_list-show {overflow: hidden;animation: menu_list_animation_show 0.5s forwards;}.app .main .menu_list-hidden {overflow: hidden;animation: menu_list_animation_hidden 0.5s forwards;}.app .main .menu_list-block {position: absolute;top: 0;right: 0;border: 1px solid rgba(0, 0, 0, 0.2);width: 360px;height: 100%;min-width: 360px;min-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.app .main .menu_list-header {width: 100%;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;display: flex;flex-flow: row nowrap;justify-content: space-between;padding: 4px 10px;border-bottom: 1px solid rgba(0, 0, 0, 0.2);user-select: none;cursor: pointer;overflow: hidden;}.app .main .menu_list-header:hover {animation: button-animation 1s;}.app .main .menu_list-header-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .main .menu_list-header-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .main .menu_list-button {width: 30px;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;}.app .main .menu_list-button:hover {animation: button-animation 1s;}.app .main .menu_list-button-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .main .menu_list-button-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .main .menu_list-button-icon {background: url('assets/images/arrow_back.png') no-repeat center;background-size: 80%;}.app .main .menu_list-container {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;padding-right: 10px;padding-left: 10px;}.app .main .display_none {display: none;}.app .main-menu_item {width: 100%;height: 60px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;align-items: flex-start;justify-content: center;padding-left: 10px;margin-top: 0px;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07);overflow: visible;}.app .main-menu_item:hover {animation: button-animation 1s;}.app .main-menu_item-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .main-menu_item-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .main-menu_item * {overflow: visible;}.app .main-lang_view {width: 50px;height: 50px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;position: absolute;right: 10px;overflow: visible;}.app .main-lang_view:hover {animation: button-animation 1s;}.app .main-lang_view-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .main-lang_view-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .main-lang_view_box {position: absolute;top: 0;cursor: default;width: 50px;height: fit-content;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 50px;min-height: fit-content;background: #f5f5f5;z-index: 10;}.app .main .lang_item {width: 40px;height: 50px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;margin: 5px;background: #fbfbfb;}.app .main .lang_item:hover {animation: button-animation 1s;}.app .main .lang_item-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .main .lang_item-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .main-tasklist {width: 100%;height: 100%;max-width: 100%;max-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.app .main-task {width: 100%;height: 100px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;user-select: none;overflow: hidden;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07);overflow: hidden;}.app .main-task:hover {animation: button-animation 1s;}.app .main-task-hover {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.app .main-task-hover:hover {background: rgba(0, 0, 0, 0.05);}.app .footer {width: 100%;height: 100px;min-width: 100%;min-height: 100px;display: flex;flex-flow: column nowrap;justify-content: space-between;align-items: center;border-top: 1px solid rgba(0, 0, 0, 0.2);overflow: hidden;}.app .footer-author {width: 100%;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 100%;min-height: 30px;overflow: hidden;}.app .footer-current_date {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;align-items: center;justify-content: center;overflow: hidden;}.app .footer-current_date span {margin-left: 10px;font-weight: bold;}.app .footer .hidden {visibility: hidden;}.app-wrapper {width: 100%;height: 100%;max-width: 800px;max-height: 100%;background: #fbfbfb;border: 1px solid rgba(0, 0, 0, 0.2);display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;overflow: hidden;}");w(y.head,t),w(y.head,e),!this.isComponentMode&&w(y.body,this.appElement)}};B.init(),W.set(K.EN),bt.register(ft),bt.run()})()})();