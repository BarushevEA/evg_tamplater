(()=>{"use strict";var t={909:(t,e,n)=>{e.P=void 0;const s=n(594);e.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...t){if(this._isDestroyed)return null;for(let e=0;e<t.length;e++){const n=t[e];n&&this.list.push(n)}}unsubscribe(t){if(this._isDestroyed)return null;t&&t.unsubscribe(),(0,s.deleteFromArray)(this.list,t)}unsubscribeAll(){if(this._isDestroyed)return null;const t=this.list.length;for(let e=0;e<t;e++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.deleteFromArray=void 0,e.deleteFromArray=function(t,e){const n=t.indexOf(e);if(-1===n)return!1;const s=t.length-1;for(let e=n;e<s;)t[e++]=t[e];return t.length=s,!0}},637:(t,e,n)=>{e.y$=void 0;const s=n(594);class i{constructor(t,e){this.isMarkedForUnsubscribe=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=t,this.isPipe=!!e}static callbackSend(t,e){const n=e.listener;if(n)switch(!0){case!e.observable:return void e.unsubscribe();case e.isListenPaused:return;case!e.isPipe:return void n(t);case e.once.isOnce:e.once.isFinished=!0,n(t),e.unsubscribe();break;case!!e.unsubscribeByNegativeCondition:if(!e.unsubscribeByNegativeCondition(t))return e.unsubscribeByNegativeCondition=null,void e.unsubscribe();n(t);break;case!!e.unsubscribeByPositiveCondition:if(e.unsubscribeByPositiveCondition(t))return e.unsubscribeByPositiveCondition=null,void e.unsubscribe();n(t);break;case!!e.emitByNegativeCondition:!e.emitByNegativeCondition(t)&&n(t);break;case!!e.emitByPositiveCondition:e.emitByPositiveCondition(t)&&n(t);break;case!!e.emitMatchCondition:e.emitMatchCondition(t)===t&&n(t)}else e.unsubscribe()}subscribe(t,e){return this.listener=t,e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(t){try{i.callbackSend(t,this)}catch(e){this.errorHandler(t,e)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(t){return"function"!=typeof t&&(t=()=>!1),this.unsubscribeByNegativeCondition=t,this}unsubscribeByPositive(t){return"function"!=typeof t&&(t=()=>!0),this.unsubscribeByPositiveCondition=t,this}emitByNegative(t){return"function"!=typeof t&&(t=()=>!0),this.emitByNegativeCondition=t,this}emitByPositive(t){return"function"!=typeof t&&(t=()=>!1),this.emitByPositiveCondition=t,this}emitMatch(t){return"function"!=typeof t&&(t=()=>`ERROR CONDITION TYPE ${typeof t},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=t,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(t){this._order=t}}e.y$=class{constructor(t){this.value=t,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(t){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=t;const e=this.listeners.length;for(let n=0;n<e;n++)this.listeners[n].send(t);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(t){if(!this._isDestroyed&&this._isEnable)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.listenersForUnsubscribe.length;for(let e=0;e<t;e++){const t=this.listenersForUnsubscribe[e];this.unSubscribe(t)}this.listenersForUnsubscribe.length=0}unSubscribe(t){if(!this._isDestroyed){if(this.isNextProcess&&t){const e=t;return!e.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(t),void(e.isMarkedForUnsubscribe=!0)}this.listeners&&(0,s.deleteFromArray)(this.listeners,t)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(t,e){if(this._isDestroyed)return;if(!t)return;const n=new i(this,!1);return n.subscribe(t,e),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const t=new i(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this._isDestroyed}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,n),o.exports}(()=>{var t,e,s,i=n(637);function o(t){return`data-${t}`}function r(t,e){return t?t.getAttribute(o(e)):""}function a(t,e,n){t&&t.setAttribute(o(e),n)}function h(t,e){t&&t.removeAttribute(o(e))}!function(t){t.INFO="i",t.INJECT_TO="inject_to",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(t||(t={})),Object.keys(t),function(t){t.TEXT_VALUE="txt-val"}(e||(e={})),function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(s||(s={}));var c=n(909),l=n(594);const u=":",_="_______$$bool";function d(n){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.y$(!1),this.onInit$=new i.y$(!1),this.onDestroy$=new i.y$(!1),this.attributeChanged$=new i.y$(void 0),this.beforeDetectChanges$=new i.y$(!1),this.onChangesDetected$=new i.y$(!1),this.onDataCatch$=new i.y$(void 0),this.onParentChanelReady$=new i.y$(void 0),this.ahe_clr=new c.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_ForOfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}parentChanelReady$(){return this.onParentChanelReady$}adopted$(){return this.onAdopted$}init$(){return this.onInit$}destroy$(){return this.onDestroy$}attributeChange$(){return this.attributeChanged$}beforeChanges$(){return this.beforeDetectChanges$}changesDetected$(){return this.onChangesDetected$}dataCatch$(){return this.onDataCatch$}connectedCallback(){r(this,t.ON_IF)&&!this.ahe_component[_]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==e.TEXT_VALUE&&(function(e){const n=(s=e,Array.from(s.querySelectorAll(`*:not([${o(t.INFO)}])`)));var s;for(const t of n)m(e,b(e,t))}(this),this.detectChanges(!0),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,t.ON_IF)||this.ahe_component[_]?this.tagName.toLowerCase()!==e.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.ahe_ForOfList.length=0,this.innerHTML="",this.onAdopted$.unsubscribeAll(),this.onInit$.unsubscribeAll(),this.onDestroy$.unsubscribeAll(),this.attributeChanged$.unsubscribeAll(),this.beforeDetectChanges$.unsubscribeAll(),this.onChangesDetected$.unsubscribeAll(),this.onDataCatch$.unsubscribeAll(),this.onParentChanelReady$.unsubscribeAll()):this.ahe_component[_]=!0}attributeChangedCallback(t,e,n){this.attributeChanged$.next({name:t,oldValue:e,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_number]?t.htmlElements[this.ahe_number]:[]}detectChanges(t){this.beforeDetectChanges$.next(!0),!t&&function(t){const e=t.ahe_ForOfList;for(const n of e)m(t,C(t,n.children,t.ahe_component[n.valueName],n.parent,n.template))}(this),function(t){if(t)for(const e of t.ahe_IfList){let n=e.isFunction?!!t.ahe_component[e.valueName]():!!t.ahe_component[e.valueName];if(e.isInversion&&(n=!n),n===e.oldCondition)continue;e.oldCondition=n;const s=e.ifParent.contains(e.ifElement);n?s||R(e.ifParent,e.ifElement):s&&M(e.ifParent,e.ifElement)}}(this),function(t){if(t)for(const e of t.ahe_ClsIfList){const n=e.classConditions,i=e.element,o=t.ahe_component;for(const t of n){let e;if(t.isConditionDisabled)e=s.TRUE;else{let n=t.isFunction?!!o[t.conditionName]():!!o[t.conditionName];t.isInversion&&(n=!n),e=n?s.TRUE:s.FALSE}if(e===t.oldCondition)continue;t.oldCondition=e;const n=t.firstClassName,r=t.secondClassName;r?e===s.TRUE?(S(i,[n]),P(i,[r])):(S(i,[r]),P(i,[n])):t.isConditionDisabled||e===s.TRUE?S(i,[n]):P(i,[n])}}}(this),function(t){if(t)for(const e of t.ahe_nValues){const n=""+t.ahe_component[e.valueName];e.textElement.innerHTML!==n&&(e.textElement.innerHTML=n)}}(this),function(t){if(t)for(const e of t.ahe_nFunctions){const n=""+t.ahe_component[e.valueName]();e.textElement.innerHTML!==n&&(e.textElement.innerHTML=n)}}(this),this.onChangesDetected$.next(!0)}sendData(t){this.onDataCatch$.next(t)}getChanel(t){if(t&&t.ahe_component&&t.sendData)return t}transferToChanel(t,e){this.dataCatch$().pipe().emitByPositive((()=>t())).subscribe((n=>{t().sendData(e(n))}))}sendToChanel(t,e){t&&t.sendData(e)}isAppElement(t){return!!this.getChanel(t)}collect(...t){this.ahe_clr.collect(...t)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function m(n,i){if(!i.length)return;let o="[";if(i.length>1){for(const e of i)o+=E(n,e),a(e,t.INFO,o.trim()+"]"),e.ahe_parent_chanel=n.getChanel(n),e.onParentChanelReady$.next(e.ahe_parent_chanel);return}const c=i[0];!function(t,n){if(n.tagName.toLowerCase()===e.TEXT_VALUE){if(!n.innerHTML)return!1;const e=N(t,n.innerHTML);return e.isFunction?(t.ahe_nFunctions.push({textElement:n,valueName:e.valueName}),!0):(t.ahe_nValues.push({textElement:n,valueName:e.valueName}),!0)}return!1}(n,c)?(o+=function(e,n){const s=function(t,e,n){const s=r(e,n);return s&&t?(h(e,n),s):""}(e,n,t.INJECT_TO);return s?(e.ahe_component[s]=n,"inj "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_CLICK);return s?(n.onclick=t=>p(e,s,t),"clk "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_MOUSE_LEAVE);return s?(n.onmouseleave=t=>p(e,s,t),"mlv "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_MOUSE_ENTER);return s?(n.onmouseenter=t=>p(e,s,t),"mer "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_MOUSE_UP);return s?(n.onmouseup=t=>p(e,s,t),"mup "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_MOUSE_DOWN);return s?(n.onmousedown=t=>p(e,s,t),"mdn "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_MOUSE_MOVE);return s?(n.onmousemove=t=>p(e,s,t),"mmv "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_KEY_DOWN);return s?(n.onkeydown=t=>p(e,s,t),"kdn "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_KEY_UP);return s?(n.onkeyup=t=>p(e,s,t),"kup "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_KEY_DBL_CLICK);return s?(n.ondblclick=t=>p(e,s,t),"dbc "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_SCROLL);return s?(n.onscroll=t=>p(e,s,t),"scl "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_WHEEL);return s?(n.onwheel=t=>p(e,s,t),"whl "):""}(n,c),o+=function(e,n){const s=g(e,n,t.ON_CHANGE);return s?(n.onchange=t=>p(e,s,t),"chg "):""}(n,c),o+=function(e,n){const s=r(n,t.ON_HANDLE);return s&&e?(A(e,s,n),h(n,t.ON_HANDLE),"elt "):""}(n,c),o+=E(n,c),o+=function(e,n){let i=r(n,t.CLASS_IF);if(!i)return"";const o=i.split(" "),a=[],c={element:n,classConditions:a};for(const t of o)if(t.includes("?")){const n=t.split("?"),i=N(e,n[0]),o=n[1].split(u);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(t.includes(u)){const n=t.split(u),i=N(e,n[1]);a.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:s.UNDEFINED,firstClassName:n[0],secondClassName:""})}else a.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:s.UNDEFINED,firstClassName:t,secondClassName:""});return e.ahe_ClsIfList.push(c),h(n,t.CLASS_IF),"cls "}(n,c),a(c,t.INFO,o.trim()+"]")):a(c,t.INFO,o+"var]"),n.isAppElement(c)&&(c.ahe_parent_chanel=n.getChanel(n),c.onParentChanelReady$.next(c.ahe_parent_chanel))}function E(n,s){let i=r(s,t.ON_IF);if(!i)return"";const o=U(e.TEXT_VALUE),c=s.parentElement,l=N(n,i);return n.ahe_IfList.push({ifElement:s,valueName:l.valueName,ifParent:o,oldCondition:!1,isInversion:l.isInversion,isFunction:l.isFunction}),c.insertBefore(o,s),M(c,s),h(s,t.ON_IF),a(o,t.INFO,"[ifp]"),"ifc "}const f=[0];function b(n,s){if(s.tagName.toLowerCase()===e.TEXT_VALUE)return(f[0]=s)&&f;if(!n.isAppElement(s))return(f[0]=s)&&f;const i=r(s,t.FOR);if(!i)return(f[0]=s)&&f;const o=n.ahe_component[i];if(!o)return(f[0]=s)&&f;const c=U(e.TEXT_VALUE),l=s.parentElement;l.insertBefore(c,s),M(l,s),h(s,t.FOR),a(c,t.INFO,"[for-of]");const u=C(n,[],o,c,s);return n.ahe_ForOfList.push({parent:c,template:s,children:u,valueName:i}),u}function C(e,n,s,i,o){const h=[],c=n.length,u=s.length;let _=u-c;if(_>0)for(let e=0;e<_;e++){const e=U(o.tagName);n.push(e),h.push(e);const s=r(o,t.ON_IF);s&&a(e,t.ON_IF,s),R(i,e)}else{_*=-1;for(let t=0;t<_;t++){const t=n.pop(),s=e.ahe_IfList;let o;for(const e of s)if(e.ifElement===t){o=e;break}o?((0,l.deleteFromArray)(s,o),M(i,o.ifParent)):M(i,t)}}for(let t=0;t<u;t++){const i=s[t],o=n[t],r=e.getChanel(o);r&&r.sendData(i)}return h}function N(t,e){const n="!"===e[0],s=n?e.substring(1):e;return{isInversion:n,valueName:s,isFunction:"function"==typeof t.ahe_component[s]}}function p(t,e,n){t.ahe_component[e](n)}function g(t,e,n){const s=r(e,n);return s&&t?(A(t,s,e),h(e,n),s):""}function A(t,e,n){const s=t.ahe_component[e];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[t.ahe_number]||(s.htmlElements[t.ahe_number]=[]),t.ahe_clr.collect(t.destroy$().subscribe((t=>t&&(s.htmlElements={})))),s.htmlElements[t.ahe_number].push(n))}const O="{display: contents !important;}",T=[`html-block ${O}`];function L(t){for(const e of t)T.push(`${e.tagName} ${O}`);B((()=>{for(const e of t)customElements.define(e.tagName,e.targetElement)}))}function y(t,e,n){return{tagName:e,targetElement:d({template:n,element:t})}}const I=document;let D;function U(t){return I.createElement(t)}function v(t){const e=U("style");return e.innerHTML=t,e}function P(t,e){if(t)for(const n of e)t.classList.remove(n)}function S(t,e){if(t)for(const n of e)t.classList.add(n)}function R(t,e){t&&e&&t.appendChild(e)}function M(t,e){t&&e&&t.removeChild(e)}const $=new i.y$(!1);let w,F,k,x,H=!1;function B(t){$.pipe().setOnce().subscribe((e=>e&&t())),I.body?$.next(!0):H||(H=!0,I.addEventListener("DOMContentLoaded",(()=>{$.next(!0)})))}const K=new class{constructor(t,e,n,s){w=t,F=e,k=n,x=s,D=this}set major(t){F=t}set minor(t){k=t}set patch(t){x=t}set name(t){w=t}get version(){return`${F}.${k}.${x}`}get name(){return w}get description(){return`[${w} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){D?console.log(D.description,...t):console.log("APP",...t)}("STARTED")}}("home_organizer",1,0,0);var G;!function(t){t[t.EN=0]="EN",t[t.UA=1]="UA",t[t.HE=2]="HE",t[t.RU=3]="RU"}(G||(G={}));const V=new i.y$(G.EN);class X extends c.P{constructor(){super()}get current(){return V.getValue()}getText(t,e){return t[e]}getCurrentText(t){return t[V.getValue()]}onChange(t){return V.subscribe(t)}set(t){V.next(t)}destroy(){super.destroy(),V.destroy()}}const Y=new X;var j,W,z,q,J,Q;!function(t){t.NULL="NULL",t.SETTINGS="SETTINGS",t.ACCOUNT="ACCOUNT",t.CHOICE="CHOICE"}(j||(j={})),function(t){t.LIGHT="LIGHT",t.DARK="DARK"}(W||(W={})),function(t){t.DEFAULT="DEFAULT"}(z||(z={})),function(t){t.LANGUAGE="LANGUAGE",t.THEME="THEME",t.TIME_OPTION="TIME_OPTION"}(q||(q={})),function(t){t.TASKS="TASKS",t.FAVORITE="FAVORITE",t.FOOD="FOOD",t.GOODS="GOODS"}(J||(J={})),function(t){t.SIGN_IN="SIGN_IN",t.REGISTER="REGISTER",t.EDIT="EDIT",t.SIGN_OUT="SIGN_OUT",t.DELETE="DELETE"}(Q||(Q={}));const Z={language:{[G.EN]:"Language",[G.RU]:"Язык",[G.UA]:"Мова"},theme:{[G.EN]:"Theme",[G.RU]:"Тема",[G.UA]:"Тема"},timeOption:{[G.EN]:"Time option",[G.RU]:"Настройка времени",[G.UA]:"Налаштування часу"}},tt={tasks:{[G.EN]:"Current tasks",[G.RU]:"Текущие задачи",[G.UA]:"Поточні завдання"},favorite:{[G.EN]:"Favorite",[G.RU]:"Избранное",[G.UA]:"Обране"},food:{[G.EN]:"Food",[G.RU]:"Продукты питания",[G.UA]:"Продукти харчування"},goods:{[G.EN]:"Goods",[G.RU]:"Непродовольственные товары",[G.UA]:"Непродовольчі товари"}},et={signIn:{[G.EN]:"Sign in",[G.RU]:"Войти",[G.UA]:"Увійти"},register:{[G.EN]:"Register",[G.RU]:"Зарегистрировать",[G.UA]:"Зрареєструвати"},edit:{[G.EN]:"Edit",[G.RU]:"Редактировать",[G.UA]:"Редагувати"},signOut:{[G.EN]:"Sign out",[G.RU]:"Выйти",[G.UA]:"Вийти"},delete:{[G.EN]:"Delete",[G.RU]:"Удалить",[G.UA]:"Видалити"}},nt={choice:{[G.EN]:"User tasks",[G.RU]:"Пользовательские задачи",[G.UA]:"Завдання користувача"},account:{[G.EN]:"Account settings",[G.RU]:"Настройки аккаунта",[G.UA]:"Налаштування акаунту"},settings:{[G.EN]:"Settings",[G.RU]:"Настройки",[G.UA]:"Налаштування"}},st={isShow:!1,owner:j.NULL},it={[j.SETTINGS]:nt.settings,[j.ACCOUNT]:nt.account,[j.CHOICE]:nt.choice},ot={[q.LANGUAGE]:Z.language,[q.THEME]:Z.theme,[q.TIME_OPTION]:Z.timeOption},rt={[J.FAVORITE]:tt.favorite,[J.FOOD]:tt.food,[J.GOODS]:tt.goods,[J.TASKS]:tt.tasks},at={[Q.SIGN_IN]:et.signIn,[Q.SIGN_OUT]:et.signOut,[Q.REGISTER]:et.register,[Q.EDIT]:et.edit,[Q.DELETE]:et.delete},ht=new i.y$(st);function ct(){const t=ht.getValue();t.isShow&&(t.isShow=!1,t.owner=j.NULL,ht.next(t))}function lt(t){const e=ht.getValue();return!!function(t,e){return t.owner===j.NULL||t.owner===e}(e,t)&&(e.isShow=!0,e.owner=t,ht.next(e),!0)}function ut(t){let e=""+t;return e.length<2&&(e="0"+e),e}const _t=D.name;let dt="";for(let t=0;t<_t.length;t++){const e=_t[t];let n="";for(let t=0;t<26;t++){const s="abcdefghijklmnopqrstuvwxyz"[t];if(s===e.toLowerCase()){n=s;break}}dt+=n||"-"}const mt="app-"+dt,Et=[y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){this.initMainChanel(),this.root.sendToChanel(this.mainChanel,"TEST APP CHANEL")}onDestroy(){}initMainChanel(){this.mainChanel=this.root.getChanel(this.main)}},mt,"<div class='app'><div class='app-wrapper'><app-header></app-header><app-main data-inject_to='main'></app-main><app-footer></app-footer></div></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-header","<div class='header'><app-choice></app-choice><app-account></app-account><app-menu></app-menu></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.transferToChanel((()=>this.taskListChanel),(t=>t))}onInit(){this.initTaskListChanel()}onDestroy(){}initTaskListChanel(){this.taskListChanel=this.root.getChanel(this.taskList)}},"app-main","<div class='main'><app-baner></app-baner><app-menu_list></app-menu_list><div class='main-wrapper'><app-task_list data-inject_to='taskList'></app-task_list></div></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-footer","<div class='footer'><app-author></app-author><app-current_date></app-current_date></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName,this.isArrowBackShow=!1,this.isMenuOpened=!1}onCreate(){this.root.collect(this.menuEventsHandle())}onInit(){}onDestroy(){}onClick(){this.isMenuOpened||!lt(j.SETTINGS)?(this.isMenuOpened=!1,ct()):this.isMenuOpened=!0}menuEventsHandle(){return ht.pipe().emitByPositive((t=>this.isArrowBackShow!==t.isShow)).subscribe((t=>{this.isArrowBackShow=t.isShow,t.isShow||(this.isMenuOpened=!1),this.root.detectChanges()}))}},"app-menu","<div class='header-menu' data-cls='isArrowBackShow?header-menu-arrow_back:header-menu_icon' data-click='onClick'></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}onClick(){lt(j.ACCOUNT)}},"app-account","<div class='header-account header-account_icon' data-click='onClick'></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}onClick(){lt(j.CHOICE)}},"app-choice","<div class='header-choice' data-click='onClick'> Hello choice.html</div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-author","<div class='footer-author'> Hello author.html</div>"),y(class{constructor(t){this.root=t,this.name=t.tagName,this.separator=":",this.updateDate()}onCreate(){}onInit(){this.handleTime()}onDestroy(){}handleTime(){this.timer=setInterval((()=>{this.updateDate(),this.root.detectChanges()}),500)}updateDate(){const t=this.separator;this.isShowSecondSeparator=!this.isShowSecondSeparator;const e=new Date,n=ut(e.getSeconds()),s=ut(e.getMinutes()),i=ut(e.getHours()),o=ut(e.getDate()),r=ut(e.getMonth()+1),a=ut(e.getFullYear());this.date=`${a}${t}${r}${t}${o} `,this.time=`${i}${t}${s} `,this.second=`${n}`}},"app-current_date","<div class='footer-current_date'><span><txt-val>date</txt-val></span><span><txt-val>time</txt-val></span><span data-cls='hidden:isShowSecondSeparator'><txt-val>separator</txt-val></span><span><txt-val>second</txt-val></span></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){}onInit(){}onDestroy(){}},"app-baner","<div class='main-banner'> Hello baner.html</div>"),y(class{constructor(t){this.root=t,this.name=t.tagName,this.tasks=[1,2,3,4,5]}onCreate(){this.root.dataCatch$().subscribe((t=>{console.log("====>",this.name,t)}))}onInit(){}onDestroy(){}},"app-task_list","<div class='main-tasklist'><app-task data-for='tasks'></app-task></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName,this.text=""}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text="TASK "+t,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-task","<div class='main-task'><txt-val>text</txt-val></div>"),y(class{constructor(t){this.isMenuShow=!1,this.isDisplayNone=!0,this.root=t,this.name=t.tagName,this.showTimer=0,this.items=[]}onCreate(){this.showHandler(),this.changeLanguage()}onInit(){}onDestroy(){}btnClick(){ct()}showHandler(){this.root.collect(ht.subscribe((t=>{this.initOwnerData(t),this.initItems(),this.handleAnimation(),this.root.detectChanges()})))}initOwnerData(t){this.owner=t.owner,this.owner!==j.NULL&&(this.ownerName=Y.getCurrentText(it[this.owner])),this.isMenuShow=t.isShow}handleAnimation(){clearTimeout(this.showTimer),this.isMenuShow?this.isDisplayNone=!1:this.showTimer=setTimeout((()=>{this.isDisplayNone=!0,this.root.detectChanges()}),1e3)}changeLanguage(){this.root.collect(Y.onChange((t=>{this.handleTitleLocale(t),this.handleItemsLocale(t),this.root.detectChanges()})))}handleTitleLocale(t){this.owner!==j.NULL&&(this.ownerName=Y.getText(it[this.owner],t))}initItems(){switch(this.items.length=0,this.owner){case j.SETTINGS:this.fillItems(ot);break;case j.ACCOUNT:this.fillItems(at);break;case j.CHOICE:this.fillItems(rt)}}fillItems(t){for(const e in t){const n={owner:this.owner,locale:e,text:Y.getCurrentText(t[e])};this.items.push(n)}}handleItemsLocale(t){for(const e of this.items)switch(e.owner){case j.SETTINGS:e.text=Y.getText(ot[e.locale],t);break;case j.ACCOUNT:e.text=Y.getText(at[e.locale],t);break;case j.CHOICE:e.text=Y.getText(rt[e.locale],t)}}},"app-menu_list","<div class='main-menu_list' data-cls='display_none:isDisplayNone isMenuShow?menu_list-show:menu_list-hidden'><div class='menu_list-block'><div class='menu_list-header' data-click='btnClick'><txt-val>ownerName</txt-val><div class='menu_list-button menu_list-button-icon'></div></div><app-menu_item data-for='items'></app-menu_item></div></div>"),y(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.dataCatch$().subscribe((t=>{this.text=t.text,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-menu_item","<div class='main-menu_item'><txt-val>text</txt-val></div>")],ft=d({template:"",element:class{}});L([{tagName:e.TEXT_VALUE,targetElement:ft}]);const bt=new class{constructor(){this.isComponentMode=!1}register(t){L(t)}run(t){this.isComponentMode=!!t,B((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=U(mt))}start(){const t=v(T.join("")),e=v("@font-face {font-family: Tahoma;src: url('assets/fonts/tahoma.ttf') format('truetype');}@keyframes button-animation {}@keyframes menu_list_animation_show {0% {display: none;width: 0;}100% {display: flex;width: 360px;}}@keyframes menu_list_animation_hidden {0% {display: flex;width: 360px;}100% {width: 0;display: none;}}* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}body {overflow: hidden;}.app {width: 100vw;height: 100vh;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 100vw;min-height: 100vh;font-family: Tahoma, serif;font-size: 24px;}.app * {background: rgba(0, 250, 250, 0.2);}.app * {border: 1px solid rgba(0, 250, 250, 0.5);}.app .header {width: 100%;height: 100px;min-width: 100%;min-height: 100px;padding: 10px;display: flex;flex-flow: row nowrap;justify-content: space-between;align-items: center;overflow: hidden;}.app .header-menu {width: 85px;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;min-width: 85px;min-height: 85px;margin-right: 5px;margin-left: 5px;}.app .header-menu:hover {animation: button-animation 1s;}.app .header-menu_icon {background: url('assets/images/menu.png') no-repeat center;background-size: 50%;}.app .header-menu-arrow_back {background: url('assets/images/arrow_back.png') no-repeat center;background-size: 30%;}.app .header-choice {width: 100%;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;margin-right: 5px;margin-left: 5px;}.app .header-choice:hover {animation: button-animation 1s;}.app .header-account {width: 85px;height: 85px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;min-width: 85px;min-height: 85px;margin-right: 5px;margin-left: 5px;}.app .header-account:hover {animation: button-animation 1s;}.app .header-account_icon {background: url('assets/images/account.png') no-repeat;background-size: cover;}.app .main {position: relative;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;flex-grow: 1;}.app .main-wrapper {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;flex-grow: 1;}.app .main-banner {width: 100%;height: 40px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;overflow: hidden;}.app .main-menu_list {position: absolute;top: 0;left: 0;height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;background: #69b2e4;}.app .main .menu_list-show {overflow: hidden;animation: menu_list_animation_show 0.5s forwards;}.app .main .menu_list-hidden {overflow: hidden;animation: menu_list_animation_hidden 0.5s forwards;}.app .main .menu_list-block {position: absolute;top: 0;right: 0;width: 360px;height: 100%;min-width: 360px;min-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.app .main .menu_list-header {width: 100%;height: 40px;padding: 4px;display: flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;overflow: hidden;}.app .main .menu_list-button {width: 30px;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;}.app .main .menu_list-button:hover {animation: button-animation 1s;}.app .main .menu_list-button-icon {background: url('assets/images/arrow_back.png') no-repeat center;background-size: 80%;}.app .main .display_none {display: none;}.app .main-menu_item {width: 100%;height: 60px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;margin-top: 10px;}.app .main-menu_item:hover {animation: button-animation 1s;}.app .main-tasklist {width: 100%;height: 100%;max-width: 100%;max-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;}.app .main-task {width: 100%;height: 100px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;overflow: hidden;}.app .footer {width: 100%;height: 100px;min-width: 100%;min-height: 100px;display: flex;flex-flow: column nowrap;justify-content: space-between;align-items: center;overflow: hidden;}.app .footer-author {width: 100%;height: 30px;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;min-width: 100%;min-height: 30px;overflow: hidden;}.app .footer-current_date {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;align-items: center;justify-content: center;overflow: hidden;}.app .footer-current_date span {margin-left: 10px;font-weight: bold;}.app .footer .hidden {visibility: hidden;}.app-wrapper {width: 100%;height: 100%;max-width: 800px;max-height: 100%;display: flex;flex-flow: column nowrap;align-items: flex-start;justify-content: flex-start;overflow: hidden;}");R(I.head,t),R(I.head,e),!this.isComponentMode&&R(I.body,this.appElement)}};K.init(),Y.set(G.EN),bt.register(Et),bt.run()})()})();