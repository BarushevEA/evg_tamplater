(()=>{"use strict";var e={909:(e,t,s)=>{t.P=void 0;const n=s(594);t.P=class{constructor(){this.list=[],this._isDestroyed=!1}collect(...e){if(this._isDestroyed)return null;for(let t=0;t<e.length;t++){const s=e[t];s&&this.list.push(s)}}unsubscribe(e){if(this._isDestroyed)return null;e&&e.unsubscribe(),n.deleteFromArray(this.list,e)}unsubscribeAll(){if(this._isDestroyed)return null;const e=this.list.length;for(let t=0;t<e;t++)this.unsubscribe(this.list.pop())}size(){return this._isDestroyed?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this._isDestroyed=!0}get isDestroyed(){return this._isDestroyed}}},594:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deleteFromArray=void 0,t.deleteFromArray=function(e,t){const s=e.indexOf(t);if(-1===s)return!1;const n=e.length-1;for(let t=s;t<n;)e[t++]=e[t];return e.length=n,!0}},637:(e,t,s)=>{t.y$=void 0;const n=s(594);class i{constructor(e,t){this.isMarkedForUnsubscribe=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this._order=0,this.isListenPaused=!1,this.once={isOnce:!1,isFinished:!1},this.unsubscribeByNegativeCondition=null,this.unsubscribeByPositiveCondition=null,this.emitByNegativeCondition=null,this.emitByPositiveCondition=null,this.emitMatchCondition=null,this.isPipe=!1,this.observable=e,this.isPipe=!!t}static callbackSend(e,t){const s=t.listener;if(s)switch(!0){case!t.observable:return void t.unsubscribe();case t.isListenPaused:return;case!t.isPipe:return void s(e);case t.once.isOnce:t.once.isFinished=!0,s(e),t.unsubscribe();break;case!!t.unsubscribeByNegativeCondition:if(!t.unsubscribeByNegativeCondition())return t.unsubscribeByNegativeCondition=null,void t.unsubscribe();s(e);break;case!!t.unsubscribeByPositiveCondition:if(t.unsubscribeByPositiveCondition())return t.unsubscribeByPositiveCondition=null,void t.unsubscribe();s(e);break;case!!t.emitByNegativeCondition:!t.emitByNegativeCondition()&&s(e);break;case!!t.emitByPositiveCondition:t.emitByPositiveCondition()&&s(e);break;case!!t.emitMatchCondition:t.emitMatchCondition()===e&&s(e)}else t.unsubscribe()}subscribe(e,t){return this.listener=e,t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=0,this.listener=0)}send(e){try{i.callbackSend(e,this)}catch(t){this.errorHandler(e,t)}}setOnce(){return this.once.isOnce=!0,this}unsubscribeByNegative(e){return"function"!=typeof e&&(e=()=>!1),this.unsubscribeByNegativeCondition=e,this}unsubscribeByPositive(e){return"function"!=typeof e&&(e=()=>!0),this.unsubscribeByPositiveCondition=e,this}emitByNegative(e){return"function"!=typeof e&&(e=()=>!0),this.emitByNegativeCondition=e,this}emitByPositive(e){return"function"!=typeof e&&(e=()=>!1),this.emitByPositiveCondition=e,this}emitMatch(e){return"function"!=typeof e&&(e=()=>`ERROR CONDITION TYPE ${typeof e},  CONTROL STATE ${this.observable&&!this.observable.getValue()}`),this.emitMatchCondition=e,this}resume(){this.isListenPaused=!1}pause(){this.isListenPaused=!0}get order(){return this._order}set order(e){this._order=e}}t.y$=class{constructor(e){this.value=e,this.listeners=[],this._isEnable=!0,this._isDestroyed=!1,this.isNextProcess=!1,this.listenersForUnsubscribe=[]}disable(){this._isEnable=!1}enable(){this._isEnable=!0}get isEnable(){return this._isEnable}next(e){if(this._isDestroyed)return;if(!this._isEnable)return;this.isNextProcess=!0,this.value=e;const t=this.listeners.length;for(let s=0;s<t;s++)this.listeners[s].send(e);this.isNextProcess=!1,this.listenersForUnsubscribe.length&&this.handleListenersForUnsubscribe()}stream(e){if(!this._isDestroyed&&this._isEnable)for(let t=0;t<e.length;t++)this.next(e[t])}handleListenersForUnsubscribe(){const e=this.listenersForUnsubscribe.length;for(let t=0;t<e;t++){const e=this.listenersForUnsubscribe[t];this.unSubscribe(e)}this.listenersForUnsubscribe.length=0}unSubscribe(e){if(!this._isDestroyed){if(this.isNextProcess&&e){const t=e;return!t.isMarkedForUnsubscribe&&this.listenersForUnsubscribe.push(e),void(t.isMarkedForUnsubscribe=!0)}this.listeners&&n.deleteFromArray(this.listeners,e)}}destroy(){this.value=0,this.unsubscribeAll(),this.listeners=0,this._isDestroyed=!0}unsubscribeAll(){this._isDestroyed||(this.listeners.length=0)}getValue(){if(!this._isDestroyed)return this.value}size(){return this._isDestroyed?0:this.listeners.length}subscribe(e,t){if(this._isDestroyed)return;if(!e)return;const s=new i(this,!1);return s.subscribe(e,t),this.listeners.push(s),s}pipe(){if(this._isDestroyed)return;const e=new i(this,!0);return this.listeners.push(e),e}get isDestroyed(){return this._isDestroyed}}}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,s),o.exports}(()=>{var e,t,n,i=s(637);function o(e){return`data-${e}`}function r(e,t){return e?e.getAttribute(o(t)):""}function h(e,t,s){e&&e.setAttribute(o(t),s)}function a(e,t){e&&e.removeAttribute(o(t))}!function(e){e.INFO="i",e.INJECT_TO="inject_to",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls"}(e||(e={})),function(e){e.TEXT_VALUE="txt-val"}(t||(t={})),function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(n||(n={}));var c=s(909);const l=window,u=document,d=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i,m=(function(){const e=navigator.userAgentData;if(e&&e.mobile)return!0;if(e&&d.test(e.platform))return!0;if(d.test(navigator.userAgent)||d.test(navigator.platform))return!0;const t=l.matchMedia;t&&t("(pointer:coarse)").matches}(),l.top,":"),_="_______$$bool";function f(s){class a extends HTMLElement{constructor(){super(),this.ahe_number=0,this.ahe_number=a.ahe_Counter,a.ahe_Counter++,this.onAdopted$=new i.y$(!1),this.onInit$=new i.y$(!1),this.onDestroy$=new i.y$(!1),this.attributeChanged$=new i.y$(void 0),this.beforeDetectChanges$=new i.y$(!1),this.onChangesDetected$=new i.y$(!1),this.ahe_clr=new c.P,this.ahe_nFunctions=[],this.ahe_nValues=[],this.ahe_IfList=[],this.ahe_ClsIfList=[],this.ahe_opts=s,this.ahe_component=new s.element(this),this.ahe_component.onCreate&&this.ahe_component.onCreate()}connectedCallback(){r(this,e.ON_IF)&&!this.ahe_component[_]||(this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),this.tagName.toLowerCase()!==t.TEXT_VALUE&&(function(t){const s=(n=t,Array.from(n.querySelectorAll(`*:not([${o(e.INFO)}])`)));var n;for(const n of s){let s="[";g(t,n)?h(n,e.INFO,s+"var]"):(s+=y(t,n),s+=C(t,n),s+=v(t,n),s+=L(t,n),s+=O(t,n),s+=T(t,n),s+=D(t,n),s+=A(t,n),s+=P(t,n),s+=I(t,n),s+=M(t,n),s+=w(t,n),s+=F(t,n),s+=S(t,n),s+=p(t,n),s+=b(t,n),h(n,e.INFO,s.trim()+"]"))}}(this),this.detectChanges(),this.onInit$.next(!0),this.ahe_component.onInit&&this.ahe_component.onInit()))}disconnectedCallback(){!r(this,e.ON_IF)||this.ahe_component[_]?this.tagName.toLowerCase()!==t.TEXT_VALUE&&(this.onDestroy$.next(!0),this.ahe_component.onDestroy&&this.ahe_component.onDestroy(),this.ahe_clr.unsubscribeAll(),this.ahe_nFunctions.length=0,this.ahe_nValues.length=0,this.ahe_IfList.length=0,this.ahe_ClsIfList.length=0,this.innerHTML=""):this.ahe_component[_]=!0}attributeChangedCallback(e,t,s){this.attributeChanged$.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.onAdopted$.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_number]?e.htmlElements[this.ahe_number]:[]}detectChanges(){this.beforeDetectChanges$.next(!0),function(e){if(e)for(const t of e.ahe_IfList){let s=t.isFunction?!!e.ahe_component[t.valueName]():!!e.ahe_component[t.valueName];if(t.isInversion&&(s=!s),s===t.oldCondition)continue;const n=t.ifParent.contains(t.ifElement);s?n||K(t.ifParent,t.ifElement):n&&X(t.ifParent,t.ifElement),t.oldCondition=s}}(this),function(e){if(e)for(const t of e.ahe_ClsIfList){const s=t.classConditions,i=t.element,o=e.ahe_component;for(const e of s){let t;if(e.isConditionDisabled)t=n.TRUE;else{let s=e.isFunction?!!o[e.conditionName]():!!o[e.conditionName];e.isInversion&&(s=!s),t=s?n.TRUE:n.FALSE}t!==e.oldCondition&&(e.oldCondition=t,e.secondClassName?t===n.TRUE?(i.classList.add(e.firstClassName),i.classList.remove(e.secondClassName)):(i.classList.add(e.secondClassName),i.classList.remove(e.firstClassName)):e.isConditionDisabled||t===n.TRUE?i.classList.add(e.firstClassName):i.classList.remove(e.firstClassName))}}}(this),function(e){if(e)for(const t of e.ahe_nValues){const s=""+e.ahe_component[t.valueName];t.textElement.innerHTML!==s&&(t.textElement.innerHTML=s)}}(this),function(e){if(e)for(const t of e.ahe_nFunctions){const s=""+e.ahe_component[t.valueName]();t.textElement.innerHTML!==s&&(t.textElement.innerHTML=s)}}(this),this.onChangesDetected$.next(!0)}collect(...e){this.ahe_clr.collect(...e)}destroy(){this.onAdopted$.destroy(),this.attributeChanged$.destroy(),this.ahe_clr.destroy()}}return a.ahe_Counter=0,a}function b(t,s){let i=r(s,e.CLASS_IF);if(!i)return"";const o=i.split(" "),h=[],c={element:s,classConditions:h};for(const e of o)if(e.includes("?")){const s=e.split("?"),i=E(t,s[0]),o=s[1].split(m);h.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:n.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(e.includes(m)){const s=e.split(m),i=E(t,s[1]);h.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:n.UNDEFINED,firstClassName:s[0],secondClassName:""})}else h.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:n.UNDEFINED,firstClassName:e,secondClassName:""});return t.ahe_ClsIfList.push(c),a(s,e.CLASS_IF),"cls "}function p(s,n){let i=r(n,e.ON_IF);if(!i)return"";const o=u.createElement(t.TEXT_VALUE),c=n.parentElement,l=E(s,i);return s.ahe_IfList.push({ifElement:n,valueName:l.valueName,ifParent:o,oldCondition:!1,isInversion:l.isInversion,isFunction:l.isFunction}),c.insertBefore(o,n),X(c,n),a(n,e.ON_IF),h(o,e.INFO,"[ifp]"),"ifc "}function E(e,t){const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_component[n]}}function g(e,s){if(s.tagName.toLowerCase()===t.TEXT_VALUE){if(!s.innerHTML)return!1;const t=E(e,s.innerHTML);return t.isFunction?(e.ahe_nFunctions.push({textElement:s,valueName:t.valueName}),!0):(e.ahe_nValues.push({textElement:s,valueName:t.valueName}),!0)}return!1}function N(e,t,s){e.ahe_component[t](s)}function y(t,s){const n=function(e,t,s){const n=r(t,s);return n&&e?(a(t,s),n):""}(t,s,e.INJECT_TO);return n?(t.ahe_component[n]=s,"inj "):""}function C(t,s){const n=k(t,s,e.ON_CLICK);return n?(s.onclick=e=>N(t,n,e),"clk "):""}function v(t,s){const n=k(t,s,e.ON_MOUSE_LEAVE);return n?(s.onmouseleave=e=>N(t,n,e),"mlv "):""}function L(t,s){const n=k(t,s,e.ON_MOUSE_ENTER);return n?(s.onmouseenter=e=>N(t,n,e),"mer "):""}function O(t,s){const n=k(t,s,e.ON_MOUSE_UP);return n?(s.onmouseup=e=>N(t,n,e),"mup "):""}function T(t,s){const n=k(t,s,e.ON_MOUSE_DOWN);return n?(s.onmousedown=e=>N(t,n,e),"mdn "):""}function D(t,s){const n=k(t,s,e.ON_MOUSE_MOVE);return n?(s.onmousemove=e=>N(t,n,e),"mmv "):""}function A(t,s){const n=k(t,s,e.ON_KEY_DOWN);return n?(s.onkeydown=e=>N(t,n,e),"kdn "):""}function P(t,s){const n=k(t,s,e.ON_KEY_UP);return n?(s.onkeyup=e=>N(t,n,e),"kup "):""}function I(t,s){const n=k(t,s,e.ON_KEY_DBL_CLICK);return n?(s.ondblclick=e=>N(t,n,e),"dbc "):""}function M(t,s){const n=k(t,s,e.ON_SCROLL);return n?(s.onscroll=e=>N(t,n,e),"scl "):""}function w(t,s){const n=k(t,s,e.ON_WHEEL);return n?(s.onwheel=e=>N(t,n,e),"whl "):""}function F(t,s){const n=k(t,s,e.ON_CHANGE);return n?(s.onchange=e=>N(t,n,e),"chg "):""}function k(e,t,s){const n=r(t,s);return n&&e?($(e,n,t),a(t,s),n):""}function S(t,s){const n=r(s,e.ON_HANDLE);return n&&t?($(t,n,s),a(s,e.ON_HANDLE),"elt "):""}function $(e,t,s){const n=e.ahe_component[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_number]||(n.htmlElements[e.ahe_number]=[]),e.ahe_clr.collect(e.onDestroy$.subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_number].push(s))}const x="{display: contents !important;}",U=[`html-block ${x}`];function H(e){for(const t of e)U.push(`${t.tagName} ${x}`);J((()=>{for(const t of e)customElements.define(t.tagName,t.targetElement)}))}function B(e,t,s){return{tagName:t,targetElement:f({template:s,element:e})}}let R;function V(e){const t=u.createElement("style");return t.innerHTML=e,t}function K(e,t){e&&t&&e.appendChild(t)}function X(e,t){e&&t&&e.removeChild(t)}const j=new i.y$(!1);let W,Y,z,q,G=!1;function J(e){j.pipe().setOnce().subscribe((t=>t&&e())),u.body?j.next(!0):G||(G=!0,u.addEventListener("DOMContentLoaded",(()=>{j.next(!0)})))}const Q=new class{constructor(e,t,s,n){W=e,Y=t,z=s,q=n,R=this}set major(e){Y=e}set minor(e){z=e}set patch(e){q=e}set name(e){W=e}get version(){return`${Y}.${z}.${q}`}get name(){return W}get description(){return`[${W} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){R?console.log(R.description,...e):console.log("APP",...e)}("STARTED")}}("optimized_project",1,0,0);var Z;let ee;!function(e){e[e.EN=0]="EN",e[e.UA=1]="UA",e[e.HE=2]="HE"}(Z||(Z={}));class te extends c.P{constructor(e){super(),ee=new i.y$(e)}get current(){return ee.getValue()}getText(e,t){return e[t]}onChange(e){this.collect(ee.subscribe(e))}set(e){ee.next(e)}destroy(){super.destroy(),ee.destroy()}}const se=new te(Z.EN),ne=new i.y$(!1),ie=R.name;let oe="";for(let e=0;e<ie.length;e++){const t=ie[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}oe+=s||"-"}const re="app-"+oe,he=[B(class{constructor(e){this.isShowMain=!0,this.root=e,this.name=e.tagName}onInit(){this.root.collect(ne.subscribe((()=>{this.isShowMain=!this.isShowMain,this.root.detectChanges()})))}isShowFooter(){return this.isShowMain}},re,"<div class='wq'><app-header></app-header><app-main data-if='isShowMain'></app-main><app-main_1 data-if='!isShowMain'></app-main_1><app-footer data-if='isShowFooter'></app-footer></div>"),B(class{constructor(e){this.text="SERG header start after:",this.name=this.text,this.buttonName="NEXT MAIN",this.isRed=!0,this.btnRed="o",this.btnBlue="u",this.root=e}nextMain(e){e.stopPropagation(),e.preventDefault();const t=this.root.getElementsBoundToMethod(this.nextMain);for(const e of t)e.classList.toggle(this.btnBlue),e.classList.toggle(this.btnRed);this.isRed=!this.isRed,ne.next(!0),this.root.detectChanges()}onInit(){let e=0;const t=setInterval((()=>{this.name=this.text+" "+e+" ",this.root.detectChanges(),e++,e>5&&clearInterval(t)}),1e3)}},"app-header","<header class='e' data-cls='isRed?o:u !isRed?t:w'><txt-val>name</txt-val><br><button class='q u' style='width: 200px; height: 20px;' data-cls='p t:isRed' data-click='nextMain'><txt-val>buttonName</txt-val></button></header>"),B(class{constructor(e){this.appInfo=Q.description,this.someText="Hello world !!!",this.ag="17",this.test="<app-test></app-test>",this.isTest=!0,this.receipts=[" \nHow to cook perfect Bagels\n  \n10 Tips for Making Schmear-Worthy Homemade Bagels\nMoisture: Wetter dough means crispier bagels. ...\nWater temp: The colder the better. ...\nDry active yeast: Let it chill. ...\nFlour: Embrace the gluten. ...\nMixing: Low and slow is the way to go. ...\nThe rise: Your kitchen climate is A-okay. ...\nFlavor kick: After the proof.\n        ","\nHow to cook perfect fish\n\nA juicy, perfectly cooked fillet of fish with crisp \nskin that crackles when cut is a thing of beauty – but \none that can be tough to achieve. Follow these simple \nsteps, whatever fish you’re cooking, avoid the \npotential pitfalls, and you’ll get it right, every time.\n        ","\nHow to cook perfect meat\n\nThis dish has everything we’re looking for when it comes \nto a weeknight dinner: it’s filling, requires only simple \ningredients, and comes together in under an hour. If you’re \nlooking for a bright summer dinner that still delivers on \nthe comfort food factor, then this creamy lemon Parmesan \nchicken should be next on your weeknight dinner rotation.\nTrust us—one bite, and you’ll realize why this is one of\nour most popular chicken recipes of all time. \n        "],this.receiptCounter=0,this.currentReceipt=this.receipts[this.receiptCounter],this.root=e,this.name=e.tagName}onCreate(){}onInit(){}onDestroy(){}nestReceipt(){this.receiptCounter++,this.receiptCounter>=this.receipts.length&&(this.receiptCounter=0),this.currentReceipt=this.receipts[this.receiptCounter],this.root.detectChanges()}},"app-main","<main class='i'><txt-val>name</txt-val><br><txt-val>appInfo</txt-val><br><txt-val>someText</txt-val><br> Sergey is my son, he is <txt-val>ag</txt-val> years old. <br><br> Receipts: <br><button data-click='nestReceipt'>NEXT Receipt</button><br><br><pre><txt-val>currentReceipt</txt-val></pre><div><app-test></app-test><app-test></app-test></div><txt-val>test</txt-val><txt-val>test</txt-val><app-test data-if='isTest'></app-test></main>"),B(class{constructor(e){this.isShowHello=!1,this.showedTxt="---HELLO WORLD !!!---",this.counter=0,this.inputKey="",this.inputChange="",this.root=e,this.name=e.tagName}onInit(){this.counter=0,this.root.collect(this.root.beforeDetectChanges$.subscribe((()=>{this.counter++})),this.root.onChangesDetected$.subscribe((()=>{this.handleElement(),this.handleElementExtra()})))}clickHandler(e){e.preventDefault(),e.stopPropagation(),this.isShowHello=!this.isShowHello,this.root.detectChanges()}keyDownInput(e){console.log("keyDownInput(evt: KeyboardEvent)",e.key),this.inputKey=e.key,this.root.detectChanges()}changeInput(e){console.log("changeInput(evt: KeyboardEvent)",e.target.value),this.inputChange=e.target.value,this.root.detectChanges()}handleElement(){const e=this.root.getElementsBoundToMethod(this.handleElement);for(const t of e)t.innerHTML=` handled ${this.counter}`}handleElementExtra(){const e=this.root.getElementsBoundToMethod(this.handleElementExtra);for(const t of e)t.innerHTML=` handled extra ${this.counter}`}test(){return`TEST ${this.counter}`}onDestroy(){this.inputChange="",this.counter=0}},"app-main_1","<main class='i'><txt-val>name</txt-val><button data-click='clickHandler'> Show HELLO <txt-val>counter</txt-val></button><div data-if='isShowHello'><txt-val>showedTxt</txt-val></div><div data-handle='handleElement'>1</div><div data-handle='handleElement'>2</div><div data-handle='handleElementExtra'>3</div><div data-handle='handleElementExtra'><txt-val>name</txt-val></div><div><txt-val>name</txt-val><span data-handle='handleElementExtra'></span></div><label><input data-keydown='keyDownInput' data-change='changeInput'></label><div> input key: <txt-val>inputKey</txt-val></div><div> input change: <txt-val>inputChange</txt-val></div><div> test function: <txt-val>test</txt-val></div></main>"),B(class{constructor(e){this.root=e,this.name=e.tagName}onInit(){this.span.innerHTML="Test injection ",this.myDiv.innerHTML="Test injection div"}},"app-footer","<footer class='r'><span data-inject_to='span'></span><txt-val>name</txt-val><div data-inject_to='myDiv'></div></footer>"),B(class{constructor(){this.test1="TEST1",this.test2="TEST2"}onInit(){}onDestroy(){}},"app-test","<div><txt-val>test1</txt-val>:<txt-val>test2</txt-val></div>")],ae=f({template:"",element:class{}});H([{tagName:t.TEXT_VALUE,targetElement:ae}]);const ce=new class{constructor(){}register(e){H(e)}run(){J((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.appElement=u.createElement(re)}start(){const e=V(U.join("")),t=V("* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;border: 1px solid rgba(0, 250, 250, 0.5);}.wq {position: fixed;top: 0;left: 0;font-weight: bold;width: 100%;height: 66vh;display: flex;flex-flow: column nowrap;justify-content: flex-start;align-items: flex-start;z-index: 2147483647;}.wq .y {position: absolute;top: 0;left: 0;width: 100%;height: 100%;backdrop-filter: blur(5px);z-index: -2147483647;}.wq .e {width: 100%;height: 40px;min-width: 100%;min-height: 40px;}.wq .i {width: 100%;height: 100%;flex-grow: 1;}.wq .r {width: 100%;height: 60px;min-width: 100%;min-height: 60px;}.wq .q {cursor: pointer;}.wq .o {background: #e469a0;}.wq .u {background: #69b2e4;}.wq .w {color: #29475c;}.wq .t {color: #802b51;}.wq .p {font-weight: bold;}");K(u.head,e),K(u.head,t),K(u.body,this.appElement)}};Q.init(),se.set(Z.EN),ce.register(he),ce.run()})()})();