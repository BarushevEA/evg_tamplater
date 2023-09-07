(()=>{"use strict";var e={909:(e,t,n)=>{t.P=void 0;const s=n(594);t.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...e){if(this._isDestroyed)return null;for(let t=0;t<e.length;t++){const n=e[t];n&&this.list.push(n)}}unsubscribe(e){if(this._isDestroyed)return null;e&&e.unsubscribe(),s.deleteFromArray(this.list,e)}unsubscribeAll(){if(this._isDestroyed)return null;const e=this.list.length;for(let t=0;t<e;t++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deleteFromArray=void 0,t.deleteFromArray=function(e,t){const n=e.indexOf(t);if(-1===n)return!1;const s=e.length-1;for(let t=n;t<s;)e[t++]=e[t];return e.length=s,!0}},637:(e,t,n)=>{t.y$=void 0;const s=n(594);class i{constructor(e,t){this.isMarkedForUnsubscribe=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=e,this.isPipe=!!t}static callbackSend(e,t){const n=t.listener;if(n)switch(!0){case!t.observable:return void t.unsubscribe();case t.isListenPaused:return;case!t.isPipe:return void n(e);case t.once.isOnce:t.once.isFinished=!0,n(e),t.unsubscribe();break;case!!t.unsubscribeByNegativeCondition:if(!t.unsubscribeByNegativeCondition())return t.unsubscribeByNegativeCondition=null,void t.unsubscribe();n(e);break;case!!t.unsubscribeByPositiveCondition:if(t.unsubscribeByPositiveCondition())return t.unsubscribeByPositiveCondition=null,void t.unsubscribe();n(e);break;case!!t.emitByNegativeCondition:!t.emitByNegativeCondition()&&n(e);break;case!!t.emitByPositiveCondition:t.emitByPositiveCondition()&&n(e);break;case!!t.emitMatchCondition:t.emitMatchCondition()===e&&n(e)}else t.unsubscribe()}subscribe(e,t){return this.listener=e,t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(e){try{i.callbackSend(e,this)}catch(t){this.errorHandler(e,t)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return"function"!=typeof e&&(e=()=>!1),this.unsubscribeByNegativeCondition=e,this}unsubscribeByPositive(e){return"function"!=typeof e&&(e=()=>!0),this.unsubscribeByPositiveCondition=e,this}emitByNegative(e){return"function"!=typeof e&&(e=()=>!0),this.emitByNegativeCondition=e,this}emitByPositive(e){return"function"!=typeof e&&(e=()=>!1),this.emitByPositiveCondition=e,this}emitMatch(e){return"function"!=typeof e&&(e=()=>`ERROR CONDITION TYPE ${typeof e},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=e,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}t.y$=class{constructor(e){this.value=e,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=e;const t=this.listeners.length;for(let n=0;n<t;n++)this.listeners[n].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++){const e=this.listenersForUnsubscribe[t];this.unSubscribe(e)}this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&s.deleteFromArray(this.listeners,e)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(this._isDestroyed)return;if(!e)return;const n=new i(this,!1);return n.subscribe(e,t),this.listeners.push(n),n}pipe(){if(this._isDestroyed)return;const e=new i(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}(()=>{var e,t,s=n(637);function i(e){return`data-${e}`}function o(e,t){return e?e.getAttribute(i(t)):""}function r(e,t){e&&e.removeAttribute(i(t))}!function(e){e.ROLE="0",e.INJECT_TO="inject_to",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if"}(e||(e={})),function(e){e.TEXT_VALUE="txt-val",e.TEXT_FUNCTION="txt-func"}(t||(t={}));var h=n(909);const c=document;function a(n){class o extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=o.ahe_Counter,o.ahe_Counter++,this.onAdopted$=new s.y$(!1),this.attributeChanged$=new s.y$(void 0),this.beforeDetectChanges$=new s.y$(!1),this.onChangesDetected$=new s.y$(!1),this.ahe_clr=new h.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_opts=n,this.ahe_component=new n.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}connectedCallback(){this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==t.TEXT_VALUE&&(function(t){const n=function(t){const n=Array.from(t.querySelectorAll(`*:not([${i(e.ROLE)}])`));return console.log(n),n}(t);for(const h of n)s=h,o=e.ROLE,r=t.tagName.toLowerCase(),s&&s.setAttribute(i(o),r),u(t,h),b(t,h),m(t,h),_(t,h),f(t,h),p(t,h),E(t,h),g(t,h),y(t,h),v(t,h),N(t,h),C(t,h),O(t,h),L(t,h),M(t,h),l(t,h);var s,o,r;t.detectChanges()}(this),this.ahe_component.onInit&&this.ahe_component.onInit())}disconnectedCallback(){this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll()}attributeChangedCallback(e,t,n){this.attributeChanged$.next({name:e,oldValue:t,newValue:n})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_number]?e.htmlElements[this.ahe_number]:[]}detectChanges(){this.beforeDetectChanges$.next(!0),function(e){if(e)for(const t of e.ahe_IfList){const n=!!e.ahe_component[t.valueName];if(n===t.oldCondition)continue;const s=t.ifParent.contains(t.ifElement);n?s||H(t.ifParent,t.ifElement):s&&S(t.ifParent,t.ifElement),t.oldCondition=n}}(this),function(e){if(e)for(const t of e.ahe_nValues){const n=""+e.ahe_component[t.valueName];t.textElement.innerHTML!==n&&(t.textElement.innerHTML=n)}}(this),function(e){if(e)for(const t of e.ahe_nFunctions){const n=""+e.ahe_component[t.valueName]();t.textElement.innerHTML!==n&&(t.textElement.innerHTML=n)}}(this),this.onChangesDetected$.next(!0)}collect(...e){this.ahe_clr.collect(...e)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return o.ahe_Counter=0,o}function l(n,s){const i=o(s,e.ON_IF);if(!i)return;const h=c.createElement(t.TEXT_VALUE),a=s.parentElement;n.ahe_IfList.push({ifElement:s,valueName:i,ifParent:h,oldCondition:!1}),a.insertBefore(h,s),S(a,s),r(s,e.ON_IF)}function u(e,n){if(n.tagName.toLowerCase()===t.TEXT_VALUE&&n.innerHTML){const t=n.innerHTML;if("function"==typeof e.ahe_component[t])return void e.ahe_nFunctions.push({textElement:n,valueName:n.innerHTML});e.ahe_nValues.push({textElement:n,valueName:n.innerHTML})}}function d(e,t,n){e.ahe_component[t](n)}function b(t,n){const s=function(e,t,n){const s=o(t,n);return s&&e?(r(t,n),s):""}(t,n,e.INJECT_TO);t.ahe_component[s]=n}function m(t,n){const s=T(t,n,e.ON_CLICK);s&&(n.onclick=e=>d(t,s,e))}function _(t,n){const s=T(t,n,e.ON_MOUSE_LEAVE);s&&(n.onmouseleave=e=>d(t,s,e))}function f(t,n){const s=T(t,n,e.ON_MOUSE_ENTER);s&&(n.onmouseenter=e=>d(t,s,e))}function p(t,n){const s=T(t,n,e.ON_MOUSE_UP);s&&(n.onmouseup=e=>d(t,s,e))}function E(t,n){const s=T(t,n,e.ON_MOUSE_DOWN);s&&(n.onmousedown=e=>d(t,s,e))}function g(t,n){const s=T(t,n,e.ON_MOUSE_MOVE);s&&(n.onmousemove=e=>d(t,s,e))}function y(t,n){const s=T(t,n,e.ON_KEY_DOWN);s&&(n.onkeydown=e=>d(t,s,e))}function v(t,n){const s=T(t,n,e.ON_KEY_UP);s&&(n.onkeyup=e=>d(t,s,e))}function N(t,n){const s=T(t,n,e.ON_KEY_DBL_CLICK);s&&(n.ondblclick=e=>d(t,s,e))}function C(t,n){const s=T(t,n,e.ON_SCROLL);s&&(n.onscroll=e=>d(t,s,e))}function O(t,n){const s=T(t,n,e.ON_WHEEL);s&&(n.onwheel=e=>d(t,s,e))}function L(t,n){const s=T(t,n,e.ON_CHANGE);s&&(n.onchange=e=>d(t,s,e))}function T(e,t,n){const s=o(t,n);return s&&e?(P(e,s,t),r(t,n),s):""}function M(t,n){const s=o(n,e.ON_HANDLE);s&&t&&(P(t,s,n),r(n,e.ON_HANDLE))}function P(e,t,n){const s=e.ahe_component[t];s&&(s.htmlElements||(s.htmlElements={}),s.htmlElements[e.ahe_number]||(s.htmlElements[e.ahe_number]=[]),s.htmlElements[e.ahe_number].push(n))}const w=["html-block {display: contents !important;}"];function A(e){for(const t of e)w.push(`${t.tagName} {display: contents !important;}`);V((()=>{for(const t of e)customElements.define(t.tagName,t.targetElement)}))}function k(e,t,n){return{tagName:t,targetElement:a({template:n,element:e})}}let D;function x(e){const t=c.createElement("style");return t.innerHTML=e,t}function H(e,t){e&&t&&e.appendChild(t)}function S(e,t){e&&t&&e.removeChild(t)}const U=new s.y$(!1);let $,B,I,F,R=!1;function V(e){U.pipe().setOnce().subscribe((t=>t&&e())),c.body?U.next(!0):R||(R=!0,c.addEventListener("DOMContentLoaded",(()=>{U.next(!0)})))}const K=new class{constructor(e,t,n,s){$=e,B=t,I=n,F=s,D=this}set major(e){B=e}set minor(e){I=e}set patch(e){F=e}set name(e){$=e}get version(){return`${B}.${I}.${F}`}get name(){return $}get description(){return`[${$} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){D?console.log(D.description,...e):console.log("APP",...e)}("STARTED")}}("optimized_project",1,0,0);var X;let j;!function(e){e[e.EN=0]="EN",e[e.UA=1]="UA",e[e.HE=2]="HE"}(X||(X={}));class W extends h.P{constructor(e){super(),j=new s.y$(e)}get current(){return j.getValue()}getText(e,t){return e[t]}onChange(e){this.collect(j.subscribe(e))}set(e){j.next(e)}destroy(){super.destroy(),j.destroy()}}const Y=new W(X.EN),z=new s.y$(!1),q=D.name;let G="";for(let e=0;e<q.length;e++){const t=q[e];let n="";for(let e=0;e<26;e++){const s="abcdefghijklmnopqrstuvwxyz"[e];if(s===t.toLowerCase()){n=s;break}}G+=n||"-"}const J="app-"+G,Q=[k(class{constructor(e){this.isShowMain=!0,this.isShowMain1=!1,this.root=e,this.name=e.tagName}onInit(){this.root.collect(z.subscribe((()=>{this.isShowMain=!this.isShowMain,this.isShowMain1=!this.isShowMain1,this.root.detectChanges()})))}},J,"<div class='i'><app-header></app-header><app-main data-if='isShowMain'></app-main><app-main_1 data-if='isShowMain1'></app-main_1><app-footer></app-footer></div>"),k(class{constructor(e){this.text="SERG header start after:",this.name=this.text,this.buttonName="NEXT MAIN",this.counter1=0,this.btnRed="y",this.btnBlue="r",this.root=e}clickHeader(e){this.counter1++,console.log("clickHeader(evt: MouseEvent): void "+this.counter1),e.stopPropagation(),e.preventDefault()}nextMain(e){e.stopPropagation(),e.preventDefault();const t=this.root.getElementsBoundToMethod(this.nextMain);for(const e of t)e.classList.toggle(this.btnBlue),e.classList.toggle(this.btnRed);z.next(!0)}onInit(){let e=0;const t=setInterval((()=>{this.name=this.text+" "+e+" ",this.root.detectChanges(),e++,e>5&&clearInterval(t)}),1e3);this.root.detectChanges()}},"app-header","<header class='w u' data-click='clickHeader'><txt-val>name</txt-val><br><button class='q r' style=' width: 200px; height: 20px;' data-click='nextMain'><txt-val>buttonName</txt-val></button></header>"),k(class{constructor(e){this.appInfo=K.description,this.someText="Hello world !!!",this.ag="17",this.test="<app-test></app-test>",this.receipts=[" \nHow to cook perfect Bagels\n  \n10 Tips for Making Schmear-Worthy Homemade Bagels\nMoisture: Wetter dough means crispier bagels. ...\nWater temp: The colder the better. ...\nDry active yeast: Let it chill. ...\nFlour: Embrace the gluten. ...\nMixing: Low and slow is the way to go. ...\nThe rise: Your kitchen climate is A-okay. ...\nFlavor kick: After the proof.\n        ","\nHow to cook perfect fish\n\nA juicy, perfectly cooked fillet of fish with crisp \nskin that crackles when cut is a thing of beauty – but \none that can be tough to achieve. Follow these simple \nsteps, whatever fish you’re cooking, avoid the \npotential pitfalls, and you’ll get it right, every time.\n        ","\nHow to cook perfect meat\n\nThis dish has everything we’re looking for when it comes \nto a weeknight dinner: it’s filling, requires only simple \ningredients, and comes together in under an hour. If you’re \nlooking for a bright summer dinner that still delivers on \nthe comfort food factor, then this creamy lemon Parmesan \nchicken should be next on your weeknight dinner rotation.\nTrust us—one bite, and you’ll realize why this is one of\nour most popular chicken recipes of all time. \n        "],this.receiptCounter=0,this.currentReceipt=this.receipts[this.receiptCounter],this.root=e,this.name=e.tagName}nestReceipt(){this.receiptCounter++,this.receiptCounter>=this.receipts.length&&(this.receiptCounter=0),this.currentReceipt=this.receipts[this.receiptCounter],this.root.detectChanges()}},"app-main","<main class='t'><txt-val>name</txt-val><br><txt-val>appInfo</txt-val><br><txt-val>someText</txt-val><br> Sergey is my son, he is <txt-val>ag</txt-val> years old. <br><br> Receipts: <br><button data-click='nestReceipt'>NEXT Receipt</button><br><br><pre><txt-val>currentReceipt</txt-val></pre><div><app-test></app-test><app-test></app-test></div><txt-val>test</txt-val><txt-val>test</txt-val></main>"),k(class{constructor(e){this.isShowHello=!1,this.showedTxt="---HELLO WORLD !!!---",this.counter=0,this.inputKey="",this.inputChange="",this.root=e,this.name=e.tagName}onInit(){this.counter=0,this.root.collect(this.root.beforeDetectChanges$.subscribe((()=>{this.counter++})),this.root.onChangesDetected$.subscribe((()=>{this.handleElement(),this.handleElementExtra()})))}clickHandler(e){e.preventDefault(),e.stopPropagation(),this.isShowHello=!this.isShowHello,this.root.detectChanges()}keyDownInput(e){console.log("keyDownInput(evt: KeyboardEvent)",e.key),this.inputKey=e.key,this.root.detectChanges()}changeInput(e){console.log("changeInput(evt: KeyboardEvent)",e.target.value),this.inputChange=e.target.value,this.root.detectChanges()}handleElement(){const e=this.root.getElementsBoundToMethod(this.handleElement);for(const t of e)t.innerHTML=` handled ${this.counter}`}handleElementExtra(){const e=this.root.getElementsBoundToMethod(this.handleElementExtra);for(const t of e)t.innerHTML=` handled extra ${this.counter}`}test(){return`TEST ${this.counter}`}},"app-main_1","<main class='t'><txt-val>name</txt-val><button data-click='clickHandler'> Show HELLO <txt-val>counter</txt-val></button><div data-if='isShowHello'><txt-val>showedTxt</txt-val></div><div data-handle='handleElement'>1</div><div data-handle='handleElement'>2</div><div data-handle='handleElementExtra'>3</div><div data-handle='handleElementExtra'><txt-val>name</txt-val></div><div><txt-val>name</txt-val><span data-handle='handleElementExtra'></span></div><label><input data-keydown='keyDownInput' data-change='changeInput'></label><div> input key: <txt-val>inputKey</txt-val></div><div> input change: <txt-val>inputChange</txt-val></div><div> test function: <txt-val>test</txt-val></div></main>"),k(class{constructor(e){this.root=e,this.name=e.tagName}onInit(){this.span.innerHTML="Test injection ",this.myDiv.innerHTML="Test injection div"}},"app-footer","<footer class='e'><span data-inject_to='span'></span><txt-val>name</txt-val><div data-inject_to='myDiv'></div></footer>"),k(class{constructor(){this.test1="TEST1",this.test2="TEST2"}},"app-test","<div><txt-val>test1</txt-val>:<txt-val>test2</txt-val></div>")],Z=a({template:"",element:class{}});A([{tagName:t.TEXT_VALUE,targetElement:Z}]);const ee=new class{constructor(){}register(e){A(e)}run(){V((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.appElement=c.createElement(J)}start(){const e=x(w.join("")),t=x("* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;border: 1px solid rgba(0, 250, 250, 0.5);}html-block {display: contents !important;}.i {position: fixed;top: 0;left: 0;font-weight: bold;width: 100%;height: 66vh;display: flex;flex-flow: column nowrap;justify-content: flex-start;align-items: flex-start;z-index: 2147483647;}.i .app_blur {position: absolute;top: 0;left: 0;width: 100%;height: 100%;backdrop-filter: blur(5px);z-index: -2147483647;}.i .w {width: 100%;height: 40px;min-width: 100%;min-height: 40px;}.i .u {background: #69b2e4;}.i .t {width: 100%;height: 100%;flex-grow: 1;}.i .e {width: 100%;height: 60px;min-width: 100%;min-height: 60px;}.i .q {cursor: pointer;}.i .y {background: #e469a0;}.i .r {background: #69b2e4;}");H(c.head,e),H(c.head,t),H(c.body,this.appElement)}};K.init(),Y.set(X.EN),ee.register(Q),ee.run()})()})();