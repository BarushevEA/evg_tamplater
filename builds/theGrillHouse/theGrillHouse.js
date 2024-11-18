(()=>{"use strict";let e,t,s,i,n;function r(...t){e?console.log(e.description,...t):console.log("APP",...t)}const a=new class{constructor(r,a,o,h){t=r,s=a,i=o,n=h,e=this}set major(e){s=e}set minor(e){i=e}set patch(e){n=e}set name(e){t=e}get version(){return`${s}.${i}.${n}`}get name(){return t}get description(){return`[${t} version: ${this.version}]`.toUpperCase()}init(e){e||r("STARTED")}}("theGrillHouse",1,0,0);var o;function h(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)}function l(e){return"next"in e?t=>e.next(t):e}!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(o||(o={}));class c{constructor(e){this.pipe=e,this.counter=e.chain.length?e.chain.length:0}case(e){this.counter++;const t=this.counter,s=this.pipe.chain;return s.push((i=>{i.isAvailable=!0,e(i.payload)&&(i.isBreak=!0),t!==s.length||i.isBreak||(i.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}setOnce(){return this.push((e=>{this.listener(e.payload),e.isUnsubscribe=!0}))}unsubscribeBy(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isUnsubscribe=!0)}))}processChain(e){const t=this.chain,s=this.flow;for(let e=0;e<t.length;e++){if(s.isUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return e(s.payload)}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.refine(e[t]);return this}switch(){return new m(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}push(e){return this.chain.push(e),this}}class m extends c{subscribe(e,t){return this.pipe.subscribe(e,t)}}class d extends u{get order(){return this._order}constructor(e,t){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this.observer=e,this.piped=!!t}subscribe(e,t){return this.listener=function(e){if(Array.isArray(e)){const t=[];for(let s=0;s<e.length;s++)t.push(l(e[s]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return l(e)}(e),t&&(this.errorHandler=t),this}send(e){try{this.flow.payload=e,this.flow.isBreak=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observer&&!this.paused?this.piped?this.processChain(t):t(e):void 0:this.unsubscribe()}}class _{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(e){return this.chain.push(e),this}filter(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}switch(){return new p(this)}processChain(e){const t=this.chain,s=this.flow,i=this.response;i.isOK=!1,i.payload=void 0,s.payload=e,s.isBreak=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return i;if(s.isBreak)break}}catch(e){return this.errHandler?this.errHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),i}return i.isOK=!0,i.payload=s.payload,i}addErrorHandler(e){this.errHandler=e}}class p extends c{}class g{constructor(e){this.value=e,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new _}addFilter(e){return e&&this.filters.addErrorHandler(e),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(e){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(e).isOK)){this.process=!0,this.value=e;for(let t=0;t<this.subs.length;t++)this.subs[t].send(e);this.process=!1,this.trash.length&&this.clearTrash()}}stream(e){if(!this.killed&&this.enabled)for(let t=0;t<e.length;t++)this.next(e[t])}get isDestroyed(){return this.killed}unSubscribe(e){this.killed||(this.process&&e?this.trash.push(e):this.subs&&h(this.subs,e))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const e=setInterval((()=>{this.process||(clearInterval(e),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(e,t){if(this.killed)return;if(!this.isListener(e))return;const s=new d(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.subs.push(e)}isListener(e){return!this.killed&&!!e}pipe(){if(this.killed)return;const e=new d(this,!0);return this.subs.push(e),e}clearTrash(){const e=this.trash.length;for(let t=0;t<e;t++)this.unSubscribe(this.trash[t]);this.trash.length=0}}class E{constructor(){this.arr=[],this.killed=!1}collect(...e){this.killed||this.arr.push(...e)}unsubscribe(e){this.killed||(e?.unsubscribe(),h(this.arr,e))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const b=new g(o.EN),f=new class{get currentLocation(){return b.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return b.subscribe(e)}setLocation(e){b.next(e)}destroy(){b.destroy()}},N=window,A=document,C=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new g(""),N.addEventListener("popstate",this.popstate),this.popState()}set(e){this.isDestroyed||(N.history.pushState({},"",e),this.popState())}setWithoutHistory(e){this.isDestroyed||(N.history.replaceState({},"",e),this.popState())}subscribe(e){if(!this.isDestroyed)return this.state$.subscribe(e)}destroy(){N.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const e=N.location.pathname;this.state$.next(e)}};var M;!function(e){e.SHOW="SHOW",e.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",e.HIDDEN="HIDDEN"}(M||(M={}));let O=M.SHOW;const I=new g(""),R=new g(null);let v;function y(e,t,s){return{path:t,command:e,component:s}}class L{constructor(e,t,s){this.routes=[],this.rootRoute=y(e,t,s),this.validateRoute(this.rootRoute,!0),this.add(e,t,s,!0)}add(e,t,s,i){const n=y(e,t,s);return this.validateRoute(n),!i&&(n.path=this.rootRoute.path+n.path),this.routes.push(n),this}addCollection(e){const t=e.getRoutes();for(let e=0;e<t.length;e++)this.addRouteModel(t[e]);return this}addRouteModel(e){this.validateRoute(e),e.path=this.rootRoute.path+e.path,this.routes.push(e)}getRoutes(){return this.routes}validateRoute(e,t){const s=t?"Root route":"Route";if(!e)throw new Error(`${s} is not defined`);if(!e.path)throw new Error(`${s} path is not defined`);if(!e.command)throw new Error(`${s} command is not defined`);if(!e.component)throw new Error(`${s} component is not defined`)}}const D=new E;var P;!function(e){e.MAIN="MAINPAGE",e.FISH="FISH",e.MEAT="MEAT",e.MUSHROOM="MUSHROOM",e.VEGETABLE="VEGETABLE",e.RECIPEPAGE="RECIPEPAGE"}(P||(P={}));class S{constructor(e){this.root=e,this.new=[{recipeName:"VegeSzaszlyk",url:"assets/images/main/recipes/vegetables/grilledVegetables0.png",ingredients:["Vegetables"]},{recipeName:"Smoked Salmon",url:"assets/images/main/recipes/fish/grilledFish0.jpg",ingredients:["Salmon"]}],this.popular=[{recipeName:"Grilled Ribs",url:"assets/images/main/recipes/meat/grilledMeat2.jpg",ingredients:["Ribs"]},{recipeName:"Chanterelles on a skewer",url:"assets/images/main/recipes/mushrooms/grilledMushrooms1.jpg",ingredients:["Chanterelles"]}],this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class T{constructor(e){this.root=e,this.bannerText="Fish recipes",this.recipes=[{recipeName:"Smoked Salmon",url:"assets/images/main/recipes/fish/grilledFish0.jpg",ingredients:["Salmon"]},{recipeName:"Smoked Perch",url:"assets/images/main/recipes/fish/grilledFish1.jpg",ingredients:["Perch"]},{recipeName:"Smoked Shark",url:"assets/images/main/recipes/fish/grilledFish2.png",ingredients:["Shark"]},{recipeName:"Smoked Tuna",url:"assets/images/main/recipes/fish/grilledFish3.JPG",ingredients:["Tuna"]}],this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){this.root.detectChanges()}onDestroy(){}}class ${constructor(e){this.root=e,this.bannerText="Vegetables recipes",this.recipes=[{recipeName:"VegeSzaszlyk",url:"assets/images/main/recipes/vegetables/grilledVegetables0.png",ingredients:["Vegetables"]},{recipeName:"Potatoes",url:"assets/images/main/recipes/vegetables/grilledVegetables1.jpg",ingredients:["Vegetables"]},{recipeName:"Stew",url:"assets/images/main/recipes/vegetables/grilledVegetables2.jpg",ingredients:["Vegetables"]},{recipeName:"Stew with Cabbage",url:"assets/images/main/recipes/vegetables/grilledVegetables3.jpg",ingredients:["Vegetables"]}],this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class w{constructor(e){this.root=e,this.bannerText="Meat recipes",this.recipes=[{recipeName:"Beef steaks",url:"assets/images/main/recipes/meat/grilledMeat0.jpg",ingredients:["Beef"]},{recipeName:"Grilled Chicken Legs",url:"assets/images/main/recipes/meat/grilledMeat1.jpg",ingredients:["Chicken Legs"]},{recipeName:"Grilled Ribs",url:"assets/images/main/recipes/meat/grilledMeat2.jpg",ingredients:["Ribs"]},{recipeName:"Steak Tomahawk",url:"assets/images/main/recipes/meat/grilledMeat3.jpg",ingredients:["Steak"]}],this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class F{constructor(e){this.root=e,this.bannerText="Mushrooms recipes",this.recipes=[{recipeName:"Mushrooms Shashlyk",url:"assets/images/main/recipes/mushrooms/grilledMushrooms0.jpg",ingredients:["Mushrooms"]},{recipeName:"Chanterelles on a skewer",url:"assets/images/main/recipes/mushrooms/grilledMushrooms1.jpg",ingredients:["Chanterelles"]},{recipeName:"Mushrooms on a skewer",url:"assets/images/main/recipes/mushrooms/grilledMushrooms2.jpg",ingredients:["Mushrooms"]},{recipeName:"Stuffed mushrooms",url:"assets/images/main/recipes/mushrooms/grilledMushrooms3.jpg",ingredients:["Mushrooms"]}],this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}let U=new Uint8Array(16);N.top;const k=`${N.crypto.getRandomValues(U),Array.from(U,(function(e){return`0${e.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,H="_______$$bool",V=[0];let x=[];var B,K,X;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(B||(B={})),function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(K||(K={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND",e.APP_ROUTE="QSI-ROUTE",e.APP_SUB_ROUTE="QSI-SUBROUTE"}(X||(X={}));const j=e=>A.createElement(e),W=e=>{const t=j("style");return t.innerHTML=e,t},G=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])},z=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])},Q=(e,t)=>{t&&e?.appendChild(t)},Y=e=>{e?.remove()},q=new g(null),J=e=>{q.pipe().refine((e=>!!e)).setOnce().subscribe(e),q.pipe().unsubscribeBy((e=>!!e)).setOnce().subscribe((()=>{const e=()=>{q.next(A.body),A.removeEventListener("DOMContentLoaded",e)};A.addEventListener("DOMContentLoaded",e)})),q.next(A.body)},Z=e=>`qsi-${e}`,ee=(e,t)=>e?e.getAttribute(Z(t)):"",te=(e,t,s)=>{e&&e.setAttribute(Z(t),s)},se=(e,t)=>{e&&e.removeAttribute(Z(t))},ie=(e,t)=>{if(!t.length)return;let s="[";if(t.length>1){for(let i=0;i<t.length;i++){const n=t[i];s+=re(e,n),te(n,K.INFO,s.trim()+"]"),n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e)}return}const i=t[0];ue(e,i)?te(i,K.INFO,s+"var]"):me(e,i)?te(i,K.INFO,s+"bind]"):(s+=pe(e,i),s+=ge(e,i),s+=_e(e,i),s+=Ee(e,i),s+=be(e,i),s+=fe(e,i),s+=Ne(e,i),s+=Ae(e,i),s+=Ce(e,i),s+=Me(e,i),s+=Oe(e,i),s+=Ie(e,i),s+=Re(e,i),s+=ve(e,i),s+=ye(e,i),s+=Pe(e,i),s+=re(e,i),s+=ne(e,i),te(i,K.INFO,s.trim()+"]"),i.ahe_isCustomAppElement&&(i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)))},ne=(e,t)=>{let s=ee(t,K.CLASS_IF);if(!s)return"";const i=s.split(" "),n=[],r={element:t,classConditions:n};for(let t=0;t<i.length;t++){const s=i[t];if(s.includes("?")){const t=s.split("?"),i=ce(e,t[0]),r=t[1].split(":");n.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:B.UNDEFINED,firstClassName:r[0],secondClassName:r[1]})}else if(s.includes(":")){const t=s.split(":"),i=ce(e,t[1]);n.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:B.UNDEFINED,firstClassName:t[0],secondClassName:""})}else n.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:B.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(r),se(t,K.CLASS_IF),"cls "},re=(e,t)=>{let s=ee(t,K.ON_IF);if(!s)return"";const i=ae(),n=t.parentElement,r=ce(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:r.valueName,ifParent:i,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),n.insertBefore(i,t),Y(t),se(t,K.ON_IF),te(i,K.INFO,"[ifp]"),"ifc "};(()=>{for(let e=0;e<1e4;e++)x.push(j(X.TEXT_VALUE))})();const ae=()=>x.length?x.pop():j(X.TEXT_VALUE),oe=(e,t)=>{if(t.tagName===X.TEXT_VALUE)return(V[0]=t)&&V;if(t.tagName===X.QSI_BIND)return(V[0]=t)&&V;if(!e.isAppElement(t))return(V[0]=t)&&V;const s=ee(t,K.FOR);if(!s)return(V[0]=t)&&V;const i=e.ahe_cmt[s];if(!i)return(V[0]=t)&&V;const n=ae(),r=t.parentElement,a=le(e,[],i,n,t);return te(n,K.INFO,"[for-of]"),r.insertBefore(n,t),Y(t),se(t,K.FOR),e.ahe_ForOfLst.push({parent:n,template:t,children:a,valueName:s}),a},he=(e,t,s)=>{s.isAppElement(t)&&t.sendMessage(e)},le=(e,t,s,i,n)=>{const r=[],a=t.length,o=s.length;let l=o-a;if(!(o+a))return r;if(l>0){for(let a=0;a<l;a++){const h=j(n.tagName);t.push(h),r.push(h);const c=ee(n,K.ON_IF);c&&te(h,K.ON_IF,c),Q(i,h),he(s[o-l+a],h,e)}for(let i=0;i<o-l;i++)he(s[i],t[i],e)}else{l*=-1;for(let s=0;s<l;s++){const s=t.pop(),i=e.ahe_IfLst;let n;for(let e=0;e<i.length;e++){const t=i[e];if(t.ifElement===s){n=t;break}}n?(h(i,n),Y(n.ifParent)):Y(s)}for(let i=0;i<o;i++)he(s[i],t[i],e)}return r},ce=(e,t)=>{const s="!"===t[0],i=s?t.substring(1):t;return{isInversion:s,valueName:i,isFunction:"function"==typeof e.ahe_cmt[i]}},ue=(e,t)=>{if(t.tagName!==X.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=ce(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:k}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:k}),!0)},me=(e,t)=>{if(t.tagName!==X.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=ce(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:k}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:k}),!0)},de=(e,t,s)=>{e.ahe_cmt[t](s)},_e=(e,t)=>{const s=De(t,K.SOURCE);if(!s)return"";const i=ce(e,s);return i.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:i.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")},pe=(e,t)=>{const s=De(t,K.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""},ge=(e,t)=>{const s=De(t,K.CHANNEL);return s&&t.ahe_isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""},Ee=(e,t)=>{const s=Le(e,t,K.ON_CLICK);return s?(t.onclick=t=>de(e,s,t),"clk "):""},be=(e,t)=>{const s=Le(e,t,K.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>de(e,s,t),"mlv "):""},fe=(e,t)=>{const s=Le(e,t,K.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>de(e,s,t),"mer "):""},Ne=(e,t)=>{const s=Le(e,t,K.ON_MOUSE_UP);return s?(t.onmouseup=t=>de(e,s,t),"mup "):""},Ae=(e,t)=>{const s=Le(e,t,K.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>de(e,s,t),"mdn "):""},Ce=(e,t)=>{const s=Le(e,t,K.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>de(e,s,t),"mmv "):""},Me=(e,t)=>{const s=Le(e,t,K.ON_KEY_DOWN);return s?(t.onkeydown=t=>de(e,s,t),"kdn "):""},Oe=(e,t)=>{const s=Le(e,t,K.ON_KEY_UP);return s?(t.onkeyup=t=>de(e,s,t),"kup "):""},Ie=(e,t)=>{const s=Le(e,t,K.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>de(e,s,t),"dbc "):""},Re=(e,t)=>{const s=Le(e,t,K.ON_SCROLL);return s?(t.onscroll=t=>de(e,s,t),"scl "):""},ve=(e,t)=>{const s=Le(e,t,K.ON_WHEEL);return s?(t.onwheel=t=>de(e,s,t),"whl "):""},ye=(e,t)=>{const s=Le(e,t,K.ON_CHANGE);return s?(t.onchange=t=>de(e,s,t),"chg "):""},Le=(e,t,s)=>{const i=ee(t,s);return i?(Se(e,i,t),se(t,s),i):""},De=(e,t)=>{const s=ee(e,t);return s?(se(e,t),s):""},Pe=(e,t)=>{const s=ee(t,K.ON_HANDLE);return s?(Se(e,s,t),se(t,K.ON_HANDLE),"elt "):""},Se=(e,t,s)=>{const i=e.ahe_cmt[t];i&&(i.htmlElements||(i.htmlElements={}),i.htmlElements[e.ahe_nmr]||(i.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(i.htmlElements={})))),i.htmlElements[e.ahe_nmr].push(s))},Te=e=>{e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""};let $e=0;function we(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==X.TEXT_VALUE&&this.tagName!==X.QSI_BIND&&(this.ahe_opts=e,this.ahe_cmt=new e.element(this),this.tagName!==X.APP_ROUTE&&this.tagName!==X.APP_SUB_ROUTE&&(this.ahe_nmr=$e,$e++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new E,this.ahe_onAdt$=new g(!1),this.ahe_bfrIni$=new g(!1),this.ahe_bfrDst$=new g(!1),this.ahe_atrChd$=new g(void 0),this.ahe_bfrDctChg$=new g(!1),this.ahe_onChgDtd$=new g(!1),this.ahe_onMsg$=new g(void 0),this.ahe_onPChlRdy$=new g(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==X.TEXT_VALUE&&this.tagName!==X.QSI_BIND&&(this.tagName!==X.APP_ROUTE&&this.tagName!==X.APP_SUB_ROUTE?ee(this,K.ON_IF)&&!this.ahe_cmt[H]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(e=>{const t=e.querySelectorAll(`*:not([${Z(K.INFO)}])`);for(let s=0;s<t.length;s++)ie(e,oe(e,t[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges()):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==X.TEXT_VALUE)this.tagName!==X.QSI_BIND&&this.tagName!==X.APP_ROUTE&&this.tagName!==X.APP_SUB_ROUTE&&(!ee(this,K.ON_IF)||this.ahe_cmt[H]?(this.ahe_bfrDst$.next(!0),Te(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[H]=!0);else{if(x.length>=1e4)return;""==this.innerHTML&&(se(this,K.INFO),x.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&(e=>{const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let i=0;i<t.length;i++){const n=t[i],r=le(e,n.children,s[n.valueName],n.parent,n.template);ie(e,r)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const i=e.ahe_IfLst[s];let n=i.isFunction?!!t[i.valueName]():!!t[i.valueName];if(i.isInversion&&(n=!n),n===i.oldCondition)continue;i.oldCondition=n;const r=i.ifParent.contains(i.ifElement);n?r||Q(i.ifParent,i.ifElement):r&&Y(i.ifElement)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:i,element:n}=e.ahe_ClsIfLst[s];for(let e=0;e<i.length;e++){const s=i[e];let r;if(s.isConditionDisabled)r=B.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),r=e?B.TRUE:B.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:a,secondClassName:o}=s;o?r===B.TRUE?(z(n,[a]),G(n,[o])):(z(n,[o]),G(n,[a])):s.isConditionDisabled||r===B.TRUE?z(n,[a]):G(n,[a])}}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const i=e.ahe_bndVls[s],n=t[i.valueName];i.lastData!==n&&(i.textElement.textContent=n,i.lastData=n)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const i=e.ahe_srcCms[s],n=t[i.valueName]??"";i.lastData!==n&&(i.textElement.src=n,i.lastData=n)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const i=e.ahe_srcCmsFns[s],n=t[i.valueName]()??"";i.lastData!==n&&(i.textElement.src=n,i.lastData=n)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const i=e.ahe_bndFns[s],n=t[i.valueName]();i.lastData!==n&&(i.textElement.textContent=n,i.lastData=n)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const i=e.ahe_nVls[s],n=t[i.valueName];i.lastData!==n&&(i.textElement.innerHTML=n,i.lastData=n)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const i=e.ahe_nFns[s],n=t[i.valueName]();i.lastData!==n&&(i.textElement.innerHTML=n,i.lastData=n)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e&&e.ahe_isCustomAppElement)return e}transferToChannel(e,t){this.onMessage$().pipe().refine((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!e?.ahe_isCustomAppElement}collect(...e){this.ahe_clr.collect(...e)}destroy(){Te(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const Fe="{display: contents !important;}",Ue=[`html-block ${Fe}`],ke=new g(!1),He=(e,t)=>{for(let t=0;t<e.length;t++)Ue.push(`${e[t].tagName} ${Fe}`),e[t].element.qsi_app_tag_name=e[t].tagName;J((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].target);t&&ke.next(!0)}))},Ve=(e,t,s)=>({tagName:t,target:we({template:s,element:e}),element:e}),xe=e.name;let Be="";for(let e=0;e<xe.length;e++){const t=xe[e];let s="";for(let e=0;e<26;e++){const i="abcdefghijklmnopqrstuvwxyz"[e];if(i===t.toLowerCase()){s=i;break}}Be+=s||"-"}const Ke="app-"+Be,Xe=new L(P.MAIN,"/main",S),je=new L(P.FISH,"/fish",T),We=new L(P.MEAT,"/meat",w),Ge=new L(P.MUSHROOM,"/mushroom",F),ze=new L(P.VEGETABLE,"/vegetable",$);var Qe;!function(e,t){R.next({defaultCmd:e,routes:t}),I.next(e)}(P.MAIN,function(...e){const t=[];for(let s=0;s<e.length;s++)t.push(...e[s].getRoutes());return t}(Xe,je,We,Ge,ze)),Qe=M.HIDDEN,O=Qe;const Ye=[Ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){console.log(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},Ke,"<div class='V_e_ksjqtr'><app-header></app-header><app-main></app-main><app-footer></app-footer></div>"),Ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}goMainPage(){I.next(P.MAIN)}},"app-header","<div class='w-q_ELATri'><div class='l-5Bo-c-rw' qsi-click='goMainPage'><div class='Z-YYje1-tw'></div><div>The Grill House</div></div><app-nav></app-nav><app-search></app-search><div class='S-u1FV0_re'></div></div>"),Ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-main","<div class='Llu_R-z-te'><qsi-route></qsi-route></div>"),Ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){setInterval((()=>{this.time=`${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`,this.root.detectChanges()}))}onDestroy(){}},"app-footer","<div class='EhT_YJ4cro'><div><qsi-bind>time</qsi-bind></div><section class='A90ASTd-ew'> E-mail: sveni2021@gmail.com;<br> Phone: +48 788-745-507;<br> Pseudonym: Strife; </section></div>"),Ve(class{constructor(e){this.root=e,this.isShowed=!1,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}search(){this.isShowed=!this.isShowed,this.root.detectChanges()}},"app-search","<div class='B_hhR-C_rp'><label><input class='lGyHthy0ee' type='text' placeholder='Search' qsi-cls='isShowed?D_U-C_Pzey:eGV-4MWhwo'></label><div class='vMdIBJY_eu' qsi-click='search'></div></div>"),Ve(class{constructor(e){this.root=e,this.pages=[{name:"Mushrooms",route:P.MUSHROOM},{name:"Vegetables",route:P.VEGETABLE},{name:"Meat",route:P.MEAT},{name:"Fish",route:P.FISH}],this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-nav","<div class='i_Y-1-u-tt'><app-navElement qsi-for='pages' ></app-navElement></div>"),Ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){r(this.root.tagName,"message:",e),this.setProperties(e)}onCreate(){}onInit(){}onDestroy(){}changePage(){I.next(this.route)}setProperties(e){this.name=e.name,this.route=e.route,this.root.detectChanges()}},"app-navelement","<div qsi-click='changePage' class='tPC-lqM-eo'> <qsi-bind>name</qsi-bind></div>"),Ve(F,"app-mushroom","<div class='ZD0_5PZ-wr'><section class='PPG_A-k3o'><div class='CiC-QXX-u E_yAX_nxer'><div class='JTaDW0Ngw'></div><div class='LGAW5fn_y'><qsi-bind>bannerText</qsi-bind></div></div></section><section class='YIc6WNo_i'><div class='ZSW-DayGe'><app-recipelink qsi-for='recipes'></app-recipelink></div></section></div>"),Ve(w,"app-meat","<div class='ZD0_5PZ-wr'><section class='PPG_A-k3o'><div class='CiC-QXX-u Ns6-g-9Crr'><div class='JTaDW0Ngw'></div><div class='LGAW5fn_y'><qsi-bind>bannerText</qsi-bind></div></div></section><section class='YIc6WNo_i'><div class='ZSW-DayGe'><app-recipelink qsi-for='recipes'></app-recipelink></div></section></div>"),Ve($,"app-vegetable","<div class='ZD0_5PZ-wr'><section class='PPG_A-k3o'><div class='CiC-QXX-u xWC-B-Ekwp'><div class='JTaDW0Ngw'></div><div class='LGAW5fn_y'><qsi-bind>bannerText</qsi-bind></div></div></section><section class='YIc6WNo_i'><div class='ZSW-DayGe'><app-recipelink qsi-for='recipes'></app-recipelink></div></section></div>"),Ve(T,"app-fish","<div class='ZD0_5PZ-wr'><section class='PPG_A-k3o'><div class='CiC-QXX-u d_0_EN5_rt'><div class='JTaDW0Ngw'></div><div class='LGAW5fn_y'><qsi-bind>bannerText</qsi-bind></div></div></section><section class='YIc6WNo_i'><div class='ZSW-DayGe'><app-recipelink qsi-for='recipes'></app-recipelink></div></section></div>"),Ve(S,"app-mainpage","<div class='UoK-KyGFrq'><section class='o-q_8_XJtq'><div class='iSb_e-n-ep'><div class='OHqlR1C_we'></div><h2 class='lM8_Gjdlei'>Enjoy better food with the grill</h2><br><h3 class='o_Zuy-E_wu'>Try, take a risk, relax, enjoy<br> with our grill recipe</h3></div></section><section class='O5K_C-g_et'><div class='A-m_RsT_ru'><h2 class='X3vSdgFIeq'>Popular recipes</h2><div class='G-fkS-4zwi'><app-recipelink qsi-for='popular'></app-recipelink></div></div><div class='A-m_RsT_ru'><h2 class='X3vSdgFIeq'>New recipes</h2><div class='G-fkS-4zwi'><app-recipelink qsi-for='new'></app-recipelink></div></div><div class='A-m_RsT_ru F-b_dqkjry'><h2 class='X3vSdgFIeq'>About me</h2><div class='fxm-kOjBwt'><div class='I-7So1oLr'><div class='D8W-sCQ-q'></div></div><div class='h-D-qXZ_wq'> Hello dear user. I have a pseudonym Strife, I am 18 y.o., and I'm glad to see you are here. That's my first project, so I hope you won't criticize me so much, but it doesn't mean that you can't contact me to tell what is wrong with website.<br><br> I promise, you won't be upset cause, this is only the first version of website. You can observe how I improve my skills and upgrade this project <br><br> Thanks for visiting us! </div></div></div></section></div>"),Ve(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){this.setProperties(e),this.root.detectChanges()}onCreate(){}onInit(){}onDestroy(){}setProperties(e){this.recipeName=e.recipeName,this.photo=e.url,this.ingredients=e.ingredients,r(this.ingredients,this.photo,this.recipeName)}goRecipe(){I.next(P.RECIPEPAGE)}},"app-recipelink","<div qsi-click='goRecipe' class='t-aue-c6wy'><div class='rGM_XVOdww'><qsi-bind>recipeName</qsi-bind></div><div class='i_f-e_79p'><img qsi-src='photo' alt='fish.png' class='D-klP_xst'> Ingredients: <qsi-bind>ingredients</qsi-bind> </div></div>")];const qe=new g(null),Je={};qe.pipe().refine((e=>e)).subscribe((e=>{const t=Je[e.name];t&&t.subRoute?t.subRoute.setPage(e.page):console.log("ERROR:",`Subroute "${e.name}" is not registered or does not have an active instance.`)})),He([Ve(class{},X.TEXT_VALUE.toLowerCase(),""),Ve(class{},X.QSI_BIND.toLowerCase(),""),Ve(class{constructor(e){this.root=e,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){D.unsubscribeAll()}process(){D.collect(I.pipe().refine((e=>!!e)).subscribe((e=>this.setCommand(e))),C.subscribe((e=>this.setHistory(e)))),R.getValue()?this.init():R.pipe().refine((e=>!!e)).setOnce().subscribe((()=>this.init()))}init(){let e=R.getValue();v=e.defaultCmd;const t=e.routes;for(let e=0;e<t.length;e++)this.cmd[t[e].command]=t[e],this.path[t[e].path]=t[e];this.setCommand(v)}setCommand(e){switch(this.setRoute(this.cmd[e]),O){case M.HIDDEN:break;case M.SHOW:C.set(this.cmd[e].path);break;case M.SHOW_WITHOUT_HISTORY:C.setWithoutHistory(this.cmd[e].path)}}setHistory(e){e in this.path&&this.setRoute(this.path[e])}setRoute(e){const t=e.component.qsi_app_tag_name;this.root.innerHTML=`<${t}></${t}>`}},X.APP_ROUTE.toLowerCase(),""),Ve(class{constructor(e){if(this.root=e,this.isDestroyed=!0,this.name=e.getAttribute("name")||"",this.registered=Je[this.name],!this.registered)throw new Error(`Subroute with the name "${this.name}" not found`);this.registered.subRoute=this}onInit(){this.isDestroyed=!1,this.setPage(this.registered.defaultPage)}onDestroy(){this.isDestroyed=!0}setPage(e){if(this.isDestroyed)return;const t=this.registered.pages[e];if(!t)return void console.error(`Page with name "${e}" not found in subroute "${this.name}"`);const s=t.qsi_app_tag_name;this.root.innerHTML=`<${s}></${s}>`}},X.APP_SUB_ROUTE.toLowerCase(),"")]);const Ze=new class{constructor(){this.isComponentMode=!1}register(e){He(e,!0)}run(e){this.isComponentMode=!!e,J((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=j(Ke))}start(){const e=W(Ue.join("")),t=W("@keyframes search-field-show {0% {display: none;width: 0;}100% {display: flex;width: 9vw;}}@keyframes search-field-hidden {0% {display: flex;width: 9vw;}100% {display: none;width: 0;}}* {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}body {overflow: hidden;}.V_e_ksjqtr {display: flex;flex-flow: column nowrap;min-width: 100vw;min-height: 100vh;align-items: center;max-width: fit-content;background: #4A4A4A;justify-content: space-between;}.V_e_ksjqtr .w-q_ELATri {display: flex;flex-flow: row nowrap;justify-content: space-between;width: 100%;height: 110px;position: relative;background-color: #171717;align-items: center;}.V_e_ksjqtr .w-q_ELATri .l-5Bo-c-rw {margin-left: 15px;display: flex;flex-flow: row nowrap;width: fit-content;height: 80px;align-items: center;justify-content: space-between;font-size: 2rem;font-weight: bold;color: #ffffff;text-shadow: 0 0 2px #f84e0f;text-transform: uppercase;cursor: pointer;}.V_e_ksjqtr .w-q_ELATri .l-5Bo-c-rw .Z-YYje1-tw {width: 70px;height: 70px;margin-right: 15px;background-image: url('assets/images/header/logo.jpg');background-repeat: no-repeat;background-size: cover;border-radius: 100%;}.V_e_ksjqtr .w-q_ELATri .S-u1FV0_re {width: 70px;height: 70px;margin-left: 15px;background-image: url('assets/images/header/book.png');background-size: cover;background-repeat: no-repeat;}.V_e_ksjqtr .w-q_ELATri .i_Y-1-u-tt {width: fit-content;height: 40px;display: flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;top: 100px;}.V_e_ksjqtr .w-q_ELATri .i_Y-1-u-tt .tPC-lqM-eo {font-size: 1.5rem;font-weight: bold;text-transform: uppercase;background: linear-gradient(0, #ff2f00 33%, #ff5b09 66%, #f1bd54);-webkit-background-clip: text;-webkit-text-fill-color: transparent;margin: 0 7.5px;border-bottom: 1px solid transparent;transition-duration: 200ms;cursor: pointer;}.V_e_ksjqtr .w-q_ELATri .i_Y-1-u-tt .tPC-lqM-eo:hover {border-color: #ff2f00;}.V_e_ksjqtr .w-q_ELATri .B_hhR-C_rp {width: fit-content;height: 80px;display: flex;flex-flow: row nowrap;align-items: center;cursor: pointer;}.V_e_ksjqtr .w-q_ELATri .B_hhR-C_rp .vMdIBJY_eu {margin-left: 10px;width: 70px;height: 70px;background-image: url('assets/images/header/search.png');background-size: cover;background-repeat: no-repeat;}.V_e_ksjqtr .w-q_ELATri .D_U-C_Pzey {animation: search-field-show 0.5s forwards;}.V_e_ksjqtr .w-q_ELATri .eGV-4MWhwo {animation: search-field-hidden 0.5s forwards;}.V_e_ksjqtr .w-q_ELATri .B_hhR-C_rp .lGyHthy0ee {height: 30px;background: transparent;border: 0;padding: 5px;color: #ffffff;font-size: 1.2rem;text-shadow: 0 0 2px #f84e0f;}.V_e_ksjqtr .w-q_ELATri .B_hhR-C_rp .lGyHthy0ee:hover {border-bottom: solid 1px #ffffff;}.V_e_ksjqtr .EhT_YJ4cro {display: flex;flex-flow: row nowrap;justify-content: space-between;padding: 15px;width: 100%;min-height: 70px;max-height: fit-content;background-color: #242424;color: #e0e0e0;font-size: 1.5rem;font-weight: bolder;}.V_e_ksjqtr .A90ASTd-ew {text-align: right;}.V_e_ksjqtr .Llu_R-z-te {width: 100vw;height: fit-content;max-width: 1400px;}.V_e_ksjqtr .Llu_R-z-te .t-aue-c6wy {width: 470px;height: 250px;display: flex;flex-flow: column nowrap;background: #5e5e5e;margin: 10px;font-family: 'Rubik', 'Verdana', Tahoma, serif;color: #171717;}.V_e_ksjqtr .Llu_R-z-te .rGM_XVOdww {width: 100%;height: 30px;display: flex;flex-direction: row;align-items: center;padding-left: 20px;font-size: 1.5rem;font-weight: bolder;}.V_e_ksjqtr .Llu_R-z-te .i_f-e_79p {width: 100%;height: 220px;margin-top: 10px;margin-bottom: 10px;display: flex;flex-flow: row wrap;font-size: 1.3rem;}.V_e_ksjqtr .Llu_R-z-te .D-klP_xst {width: 200px;height: 200px;margin: 0 10px;background-repeat: no-repeat;background-position: center center;background-size: cover;}.V_e_ksjqtr .Llu_R-z-te .o-q_8_XJtq {position: relative;overflow: hidden;width: 100%;height: fit-content;}.V_e_ksjqtr .Llu_R-z-te .o-q_8_XJtq .iSb_e-n-ep {position: relative;width: 100%;height: 800px;background-image: url('assets/images/main/banner.jpg');background-size: cover;background-repeat: no-repeat;z-index: 0;padding-left: 50px;padding-top: 100px;color: #ffffff;text-shadow: 0 0 10px #171717;}.V_e_ksjqtr .Llu_R-z-te .o-q_8_XJtq .OHqlR1C_we {position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: linear-gradient(0rad, rgba(25, 25, 25, 0.9), rgba(25, 25, 25, 0.5));z-index: 1;}.V_e_ksjqtr .Llu_R-z-te .o-q_8_XJtq .iSb_e-n-ep .lM8_Gjdlei {position: relative;font-size: 3rem;font-weight: 700;text-transform: uppercase;z-index: 2;}.V_e_ksjqtr .Llu_R-z-te .o-q_8_XJtq .iSb_e-n-ep .o_Zuy-E_wu {position: relative;font-size: 1.5rem;z-index: 2;}.V_e_ksjqtr .Llu_R-z-te .A-m_RsT_ru {width: 100%;height: 360px;background: #4d4d4d;margin-top: 10px;padding: 10px;color: white;}.V_e_ksjqtr .Llu_R-z-te .X3vSdgFIeq {font-size: 2rem;margin-left: 20px;text-transform: uppercase;}.V_e_ksjqtr .Llu_R-z-te .G-fkS-4zwi {width: 100%;height: 270px;display: flex;flex-flow: row nowrap;justify-content: space-around;margin-top: 20px;}.V_e_ksjqtr .Llu_R-z-te .F-b_dqkjry {width: 100%;height: fit-content;}.V_e_ksjqtr .Llu_R-z-te .fxm-kOjBwt {display: flex;flex-flow: row nowrap;padding: 10px;}.V_e_ksjqtr .Llu_R-z-te .I-7So1oLr {width: 400px;height: 500px;display: flex;flex-flow: row nowrap;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden;}.V_e_ksjqtr .Llu_R-z-te .D8W-sCQ-q {width: 100%;height: 100%;background-image: url('assets/images/main/Papa.jpg');background-size: cover;background-repeat: no-repeat;background-position: center center;}.V_e_ksjqtr .Llu_R-z-te .h-D-qXZ_wq {max-width: 60%;max-height: 100%;margin: 20px;font-size: 1.2rem;}.V_e_ksjqtr .Llu_R-z-te .d_0_EN5_rt {background-image: url('assets/images/main/fish.jpg');}.V_e_ksjqtr .Llu_R-z-te .Ns6-g-9Crr {background-image: url('assets/images/main/meat.jpg');}.V_e_ksjqtr .Llu_R-z-te .xWC-B-Ekwp {background-image: url('assets/images/main/vegetable.jpg');}.V_e_ksjqtr .Llu_R-z-te .E_yAX_nxer {background-image: url('assets/images/main/mushroom.jpg');}.V_e_ksjqtr .PPG_A-k3o {width: 100%;height: 400px;}.V_e_ksjqtr .CiC-QXX-u {position: relative;width: 100%;height: 100%;background-size: cover;background-repeat: no-repeat;background-position: center center;z-index: 0;}.V_e_ksjqtr .JTaDW0Ngw {position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: linear-gradient(0rad, rgba(25, 25, 25, 0.9), rgba(25, 25, 25, 0.5));z-index: 1;}.V_e_ksjqtr .LGAW5fn_y {margin-left: 50px;margin-top: 75px;position: relative;color: white;font-size: 3rem;font-weight: 700;text-transform: uppercase;z-index: 2;}.V_e_ksjqtr .YIc6WNo_i {width: 100%;height: fit-content;display: flex;flex-direction: row;justify-content: center;}.V_e_ksjqtr .ZSW-DayGe {width: 70%;height: fit-content;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;}* {font-family: 'Rubik', 'Verdana', Tahoma, serif;}");Q(A.head,e),Q(A.head,t),!this.isComponentMode&&Q(A.body,this.appElement)}};a.init(),f.setLocation(o.EN),Ze.register(Ye),Ze.run()})();