(()=>{"use strict";let e,t,s,n,i;function a(...t){e?console.log(e.description,...t):console.log("APP",...t)}const r=new class{constructor(a,r,o,h){t=a,s=r,n=o,i=h,e=this}set major(e){s=e}set minor(e){n=e}set patch(e){i=e}set name(e){t=e}get version(){return`${s}.${n}.${i}`}get name(){return t}get description(){return`[${t} version: ${this.version}]`.toUpperCase()}init(e){e||a("STARTED")}}("test-route",1,0,0);var o;function h(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)}function l(e){return"next"in e?t=>e.next(t):e}!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(o||(o={}));class c{constructor(e){this.pipe=e,this.counter=e.chain.length?e.chain.length:0}case(e){this.counter++;const t=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreak=!0),t!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}setOnce(){return this.push((e=>{this.listener(e.payload),e.isUnsubscribe=!0}))}unsubscribeBy(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isUnsubscribe=!0)}))}processChain(e){const t=this.chain,s=this.flow;for(let e=0;e<t.length;e++){if(s.isUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return e(s.payload)}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.refine(e[t]);return this}switch(){return new _(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}push(e){return this.chain.push(e),this}}class _ extends c{subscribe(e,t){return this.pipe.subscribe(e,t)}}class d extends u{get order(){return this._order}constructor(e,t){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this.observer=e,this.piped=!!t}subscribe(e,t){return this.listener=function(e){if(Array.isArray(e)){const t=[];for(let s=0;s<e.length;s++)t.push(l(e[s]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return l(e)}(e),t&&(this.errorHandler=t),this}send(e){try{this.flow.payload=e,this.flow.isBreak=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observer&&!this.paused?this.piped?this.processChain(t):t(e):void 0:this.unsubscribe()}}class m{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(e){return this.chain.push(e),this}filter(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}switch(){return new p(this)}processChain(e){const t=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=e,s.isBreak=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(e){return this.errHandler?this.errHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errHandler=e}}class p extends c{}class g{constructor(e){this.value=e,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new m}addFilter(e){return e&&this.filters.addErrorHandler(e),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(e){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(e).isOK)){this.process=!0,this.value=e;for(let t=0;t<this.subs.length;t++)this.subs[t].send(e);this.process=!1,this.trash.length&&this.clearTrash()}}stream(e){if(!this.killed&&this.enabled)for(let t=0;t<e.length;t++)this.next(e[t])}get isDestroyed(){return this.killed}unSubscribe(e){this.killed||(this.process&&e?this.trash.push(e):this.subs&&h(this.subs,e))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const e=setInterval((()=>{this.process||(clearInterval(e),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(e,t){if(this.killed)return;if(!this.isListener(e))return;const s=new d(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.subs.push(e)}isListener(e){return!this.killed&&!!e}pipe(){if(this.killed)return;const e=new d(this,!0);return this.subs.push(e),e}clearTrash(){const e=this.trash.length;for(let t=0;t<e;t++)this.unSubscribe(this.trash[t]);this.trash.length=0}}class E{constructor(){this.arr=[],this.killed=!1}collect(...e){this.killed||this.arr.push(...e)}unsubscribe(e){this.killed||(e?.unsubscribe(),h(this.arr,e))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const f=new g(o.EN),b=new class{get currentLocation(){return f.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return f.subscribe(e)}setLocation(e){f.next(e)}destroy(){f.destroy()}},A=new g(null),N={};function O(...e){for(let t=0;t<e.length;t++){const s=e[t],n={};for(let e=0;e<s.pages.length;e++){const t=s.pages[e];n[t.name]=t.page}N[s.name]={name:s.name,defaultPage:s.defaultPage,pages:n,subRoute:null}}}function C(e){return{SHOW_PAGE:t=>A.next({name:e,page:t})}}var D,I,P;A.pipe().refine((e=>e)).subscribe((e=>{const t=N[e.name];t&&t.subRoute?t.subRoute.setPage(e.page):console.log("ERROR:",`Subroute "${e.name}" is not registered or does not have an active instance.`)})),function(e){e.HEADER="header",e.FOOTER="footer"}(D||(D={})),function(e){e.Header="Header",e.AdditionalHeader="AdditionalHeader"}(I||(I={})),function(e){e.MainFooter="MainFooter",e.AdditionalFooter="AdditionalFooter"}(P||(P={}));class y{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}setMain(){C(D.FOOTER).SHOW_PAGE(P.MainFooter)}}class L{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}setAdditional(){C(D.FOOTER).SHOW_PAGE(P.AdditionalFooter)}}const v=window,M=document,R=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new g(""),v.addEventListener("popstate",this.popstate),this.popState()}set(e){this.isDestroyed||(v.history.pushState({},"",e),this.popState())}setWithoutHistory(e){this.isDestroyed||(v.history.replaceState({},"",e),this.popState())}subscribe(e){if(!this.isDestroyed)return this.state$.subscribe(e)}destroy(){v.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const e=v.location.pathname;this.state$.next(e)}};var T;!function(e){e.SHOW="SHOW",e.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",e.HIDDEN="HIDDEN"}(T||(T={}));let F=T.SHOW;const $=new g(""),H=new g(null);let S;function U(e,t,s){return{path:t,command:e,component:s}}const k=new E;function w(){return{SHOW_PAGE:e=>$.next(e)}}class x{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class V{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class B{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class G{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}var W,K;!function(e){e.MAIN="MAIN",e.PAGE1="PAGE1",e.PAGE2="PAGE2",e.PAGE3="PAGE3"}(W||(W={})),function(e,t){H.next({defaultCmd:e,routes:t})}(W.MAIN,[U(W.MAIN,"/main",x),U(W.PAGE1,"/page1",V),U(W.PAGE2,"/page2",B),U(W.PAGE3,"/page3",G)]),K=T.HIDDEN,F=K;class X{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}clickMain(){$.next(W.MAIN)}clickPage1(){$.next(W.PAGE1)}clickPage2(){$.next(W.PAGE2)}clickPage3(){$.next(W.PAGE3)}clickPage4(){C(D.HEADER).SHOW_PAGE(I.Header)}}class Q{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}clickMain(){w().SHOW_PAGE(W.MAIN)}clickPage1(){w().SHOW_PAGE(W.PAGE1)}clickPage2(){w().SHOW_PAGE(W.PAGE2)}clickPage3(){w().SHOW_PAGE(W.PAGE3)}clickPage4(){C(D.HEADER).SHOW_PAGE(I.AdditionalHeader)}}let Y=new Uint8Array(16);v.top;const j=`${v.crypto.getRandomValues(Y),Array.from(Y,(function(e){return`0${e.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,z="_______$$bool",q=[0];let J=[];var Z,ee,te;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(Z||(Z={})),function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(ee||(ee={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND",e.APP_ROUTE="QSI-ROUTE",e.APP_SUB_ROUTE="QSI-SUBROUTE"}(te||(te={}));const se=e=>M.createElement(e),ne=e=>{const t=se("style");return t.innerHTML=e,t},ie=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])},ae=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])},re=(e,t)=>{t&&e?.appendChild(t)},oe=e=>{e?.remove()},he=new g(null),le=e=>{he.pipe().refine((e=>!!e)).setOnce().subscribe(e),he.pipe().unsubscribeBy((e=>!!e)).setOnce().subscribe((()=>{const e=()=>{he.next(M.body),M.removeEventListener("DOMContentLoaded",e)};M.addEventListener("DOMContentLoaded",e)})),he.next(M.body)},ce=e=>`qsi-${e}`,ue=(e,t)=>e?e.getAttribute(ce(t)):"",_e=(e,t,s)=>{e&&e.setAttribute(ce(t),s)},de=(e,t)=>{e&&e.removeAttribute(ce(t))},me=(e,t)=>{if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=ge(e,i),_e(i,ee.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];Oe(e,n)?_e(n,ee.INFO,s+"var]"):Ce(e,n)?_e(n,ee.INFO,s+"bind]"):(s+=Pe(e,n),s+=ye(e,n),s+=Ie(e,n),s+=Le(e,n),s+=ve(e,n),s+=Me(e,n),s+=Re(e,n),s+=Te(e,n),s+=Fe(e,n),s+=$e(e,n),s+=He(e,n),s+=Se(e,n),s+=Ue(e,n),s+=ke(e,n),s+=we(e,n),s+=Be(e,n),s+=ge(e,n),s+=pe(e,n),_e(n,ee.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e)))},pe=(e,t)=>{let s=ue(t,ee.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],a={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=Ne(e,t[0]),a=t[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:Z.UNDEFINED,firstClassName:a[0],secondClassName:a[1]})}else if(s.includes(":")){const t=s.split(":"),n=Ne(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:Z.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:Z.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(a),de(t,ee.CLASS_IF),"cls "},ge=(e,t)=>{let s=ue(t,ee.ON_IF);if(!s)return"";const n=Ee(),i=t.parentElement,a=Ne(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:a.valueName,ifParent:n,oldCondition:!1,isInversion:a.isInversion,isFunction:a.isFunction}),i.insertBefore(n,t),oe(t),de(t,ee.ON_IF),_e(n,ee.INFO,"[ifp]"),"ifc "};(()=>{for(let e=0;e<1e4;e++)J.push(se(te.TEXT_VALUE))})();const Ee=()=>J.length?J.pop():se(te.TEXT_VALUE),fe=(e,t)=>{if(t.tagName===te.TEXT_VALUE)return(q[0]=t)&&q;if(t.tagName===te.QSI_BIND)return(q[0]=t)&&q;if(!e.isAppElement(t))return(q[0]=t)&&q;const s=ue(t,ee.FOR);if(!s)return(q[0]=t)&&q;const n=e.ahe_cmt[s];if(!n)return(q[0]=t)&&q;const i=Ee(),a=t.parentElement,r=Ae(e,[],n,i,t);return _e(i,ee.INFO,"[for-of]"),a.insertBefore(i,t),oe(t),de(t,ee.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:r,valueName:s}),r},be=(e,t,s)=>{s.isAppElement(t)&&t.sendMessage(e)},Ae=(e,t,s,n,i)=>{const a=[],r=t.length,o=s.length;let l=o-r;if(!(o+r))return a;if(l>0){for(let r=0;r<l;r++){const h=se(i.tagName);t.push(h),a.push(h);const c=ue(i,ee.ON_IF);c&&_e(h,ee.ON_IF,c),re(n,h),be(s[o-l+r],h,e)}for(let n=0;n<o-l;n++)be(s[n],t[n],e)}else{l*=-1;for(let s=0;s<l;s++){const s=t.pop(),n=e.ahe_IfLst;let i;for(let e=0;e<n.length;e++){const t=n[e];if(t.ifElement===s){i=t;break}}i?(h(n,i),oe(i.ifParent)):oe(s)}for(let n=0;n<o;n++)be(s[n],t[n],e)}return a},Ne=(e,t)=>{const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}},Oe=(e,t)=>{if(t.tagName!==te.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=Ne(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:j}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:j}),!0)},Ce=(e,t)=>{if(t.tagName!==te.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=Ne(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:j}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:j}),!0)},De=(e,t,s)=>{e.ahe_cmt[t](s)},Ie=(e,t)=>{const s=Ve(t,ee.SOURCE);if(!s)return"";const n=Ne(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")},Pe=(e,t)=>{const s=Ve(t,ee.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""},ye=(e,t)=>{const s=Ve(t,ee.CHANNEL);return s&&t.ahe_isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""},Le=(e,t)=>{const s=xe(e,t,ee.ON_CLICK);return s?(t.onclick=t=>De(e,s,t),"clk "):""},ve=(e,t)=>{const s=xe(e,t,ee.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>De(e,s,t),"mlv "):""},Me=(e,t)=>{const s=xe(e,t,ee.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>De(e,s,t),"mer "):""},Re=(e,t)=>{const s=xe(e,t,ee.ON_MOUSE_UP);return s?(t.onmouseup=t=>De(e,s,t),"mup "):""},Te=(e,t)=>{const s=xe(e,t,ee.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>De(e,s,t),"mdn "):""},Fe=(e,t)=>{const s=xe(e,t,ee.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>De(e,s,t),"mmv "):""},$e=(e,t)=>{const s=xe(e,t,ee.ON_KEY_DOWN);return s?(t.onkeydown=t=>De(e,s,t),"kdn "):""},He=(e,t)=>{const s=xe(e,t,ee.ON_KEY_UP);return s?(t.onkeyup=t=>De(e,s,t),"kup "):""},Se=(e,t)=>{const s=xe(e,t,ee.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>De(e,s,t),"dbc "):""},Ue=(e,t)=>{const s=xe(e,t,ee.ON_SCROLL);return s?(t.onscroll=t=>De(e,s,t),"scl "):""},ke=(e,t)=>{const s=xe(e,t,ee.ON_WHEEL);return s?(t.onwheel=t=>De(e,s,t),"whl "):""},we=(e,t)=>{const s=xe(e,t,ee.ON_CHANGE);return s?(t.onchange=t=>De(e,s,t),"chg "):""},xe=(e,t,s)=>{const n=ue(t,s);return n?(Ge(e,n,t),de(t,s),n):""},Ve=(e,t)=>{const s=ue(e,t);return s?(de(e,t),s):""},Be=(e,t)=>{const s=ue(t,ee.ON_HANDLE);return s?(Ge(e,s,t),de(t,ee.ON_HANDLE),"elt "):""},Ge=(e,t,s)=>{const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))},We=e=>{e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""};let Ke=0;function Xe(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==te.TEXT_VALUE&&this.tagName!==te.QSI_BIND&&(this.ahe_opts=e,this.ahe_cmt=new e.element(this),this.tagName!==te.APP_ROUTE&&this.tagName!==te.APP_SUB_ROUTE&&(this.ahe_nmr=Ke,Ke++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new E,this.ahe_onAdt$=new g(!1),this.ahe_bfrIni$=new g(!1),this.ahe_bfrDst$=new g(!1),this.ahe_atrChd$=new g(void 0),this.ahe_bfrDctChg$=new g(!1),this.ahe_onChgDtd$=new g(!1),this.ahe_onMsg$=new g(void 0),this.ahe_onPChlRdy$=new g(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==te.TEXT_VALUE&&this.tagName!==te.QSI_BIND&&(this.tagName!==te.APP_ROUTE&&this.tagName!==te.APP_SUB_ROUTE?ue(this,ee.ON_IF)&&!this.ahe_cmt[z]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(e=>{const t=e.querySelectorAll(`*:not([${ce(ee.INFO)}])`);for(let s=0;s<t.length;s++)me(e,fe(e,t[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==te.TEXT_VALUE)this.tagName!==te.QSI_BIND&&this.tagName!==te.APP_ROUTE&&this.tagName!==te.APP_SUB_ROUTE&&(!ue(this,ee.ON_IF)||this.ahe_cmt[z]?(this.ahe_bfrDst$.next(!0),We(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[z]=!0);else{if(J.length>=1e4)return;""==this.innerHTML&&(de(this,ee.INFO),J.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&(e=>{const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n],a=Ae(e,i.children,s[i.valueName],i.parent,i.template);me(e,a)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const a=n.ifParent.contains(n.ifElement);i?a||re(n.ifParent,n.ifElement):a&&oe(n.ifElement)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let a;if(s.isConditionDisabled)a=Z.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),a=e?Z.TRUE:Z.FALSE}if(a===s.oldCondition)continue;s.oldCondition=a;const{firstClassName:r,secondClassName:o}=s;o?a===Z.TRUE?(ae(i,[r]),ie(i,[o])):(ae(i,[o]),ie(i,[r])):s.isConditionDisabled||a===Z.TRUE?ae(i,[r]):ie(i,[r])}}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e&&e.ahe_isCustomAppElement)return e}transferToChannel(e,t){this.onMessage$().pipe().refine((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!e?.ahe_isCustomAppElement}collect(...e){this.ahe_clr.collect(...e)}destroy(){We(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const Qe="{display: contents !important;}",Ye=[`html-block ${Qe}`],je=new g(!1),ze=(e,t)=>{for(let t=0;t<e.length;t++)Ye.push(`${e[t].tagName} ${Qe}`),e[t].element.qsi_app_tag_name=e[t].tagName;le((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].target);t&&je.next(!0)}))},qe=(e,t,s)=>({tagName:t,target:Xe({template:s,element:e}),element:e}),Je=e.name;let Ze="";for(let e=0;e<Je.length;e++){const t=Je[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}Ze+=s||"-"}const et="app-"+Ze;O({name:D.HEADER,defaultPage:I.Header,pages:[{name:I.Header,page:Q},{name:I.AdditionalHeader,page:X}]}),O({name:D.FOOTER,defaultPage:P.MainFooter,pages:[{name:P.MainFooter,page:L},{name:P.AdditionalFooter,page:y}]});const tt=[qe(class{constructor(e){this.root=e,this.isHeader=!0,this.name=e.tagName}onMessage(e){console.log(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},et,"<qsi-subroute name='header' qsi-if='isHeader'></qsi-subroute><qsi-route></qsi-route><qsi-subroute name='footer'></qsi-subroute>"),qe(x,"app-main","<div>Hello main.html</div>"),qe(V,"app-page1","<div>Hello page1.html</div>"),qe(B,"app-page2","<div>Hello page2.html</div>"),qe(G,"app-page3","<div>Hello page3.html</div>"),qe(Q,"app-header","<div class='buttons_bar'><button class='button' qsi-click='clickMain'>Main</button><button class='button' qsi-click='clickPage1'>Page1</button><button class='button' qsi-click='clickPage2'>Page2</button><button class='button' qsi-click='clickPage3'>Page3</button><button class='button' qsi-click='clickPage4'>Additional Header</button></div>"),qe(X,"app-additional_header","<div class='additional_buttons_bar thin_black'><div class='additional_button gray'>NEW</div><div class='additional_button gray'>HEADER</div></div><div class='additional_buttons_bar'><button class='additional_button' qsi-click='clickMain'>Main</button><button class='additional_button' qsi-click='clickPage1'>Page1</button><button class='additional_button' qsi-click='clickPage2'>Page2</button><button class='additional_button' qsi-click='clickPage3'>Page3</button><button class='additional_button' qsi-click='clickPage4'>Header</button></div>"),qe(L,"app-main_footer","<div qsi-click='setAdditional'>Hello main_footer.html</div>"),qe(y,"app-additional_footer","<div qsi-click='setMain'>Hello additional_footer.html</div>")];ze([qe(class{},te.TEXT_VALUE.toLowerCase(),""),qe(class{},te.QSI_BIND.toLowerCase(),""),qe(class{constructor(e){this.root=e,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){k.unsubscribeAll()}process(){k.collect($.pipe().refine((e=>!!e)).subscribe((e=>this.setCommand(e))),R.subscribe((e=>this.setHistory(e)))),H.getValue()?this.init():H.pipe().refine((e=>!!e)).setOnce().subscribe((()=>this.init()))}init(){let e=H.getValue();S=e.defaultCmd;const t=e.routes;for(let e=0;e<t.length;e++)this.cmd[t[e].command]=t[e],this.path[t[e].path]=t[e];this.setCommand(S)}setCommand(e){switch(this.setRoute(this.cmd[e]),F){case T.HIDDEN:break;case T.SHOW:R.set(this.cmd[e].path);break;case T.SHOW_WITHOUT_HISTORY:R.setWithoutHistory(this.cmd[e].path)}}setHistory(e){e in this.path&&this.setRoute(this.path[e])}setRoute(e){const t=e.component.qsi_app_tag_name;this.root.innerHTML=`<${t}></${t}>`}},te.APP_ROUTE.toLowerCase(),""),qe(class{constructor(e){if(this.root=e,this.isDestroyed=!0,this.name=e.getAttribute("name")||"",this.registered=N[this.name],!this.registered)throw new Error(`Subroute with the name "${this.name}" not found`);this.registered.subRoute=this}onInit(){this.isDestroyed=!1,this.setPage(this.registered.defaultPage)}onDestroy(){this.isDestroyed=!0}setPage(e){if(this.isDestroyed)return;const t=this.registered.pages[e];if(!t)return void console.error(`Page with name "${e}" not found in subroute "${this.name}"`);const s=t.qsi_app_tag_name;this.root.innerHTML=`<${s}></${s}>`}},te.APP_SUB_ROUTE.toLowerCase(),"")]);const st=new class{constructor(){this.isComponentMode=!1}register(e){ze(e,!0)}run(e){this.isComponentMode=!!e,le((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=se(et))}start(){const e=ne(Ye.join("")),t=ne(".buttons_bar {width: 600px;height: 100px;display: flex;align-items: center;justify-content: center;background: #69b2e4;}.button {width: 100px;height: 40px;background: #e4a269;margin: 5px;}.additional_buttons_bar {width: 600px;height: 100px;display: flex;align-items: center;justify-content: center;background: #ffffff;box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);margin: 5px;border-top: none;border-left: none;border-right: none;}.thin_black {height: 50px;background: #000;}.gray {color: #9f9f9f;font-weight: bold;}.additional_button {width: 100px;height: 40px;display: flex;align-items: center;justify-content: center;background: #ffffff;margin: 5px;border-top: none;border-left: none;border-right: none;border-bottom: 1px solid rgba(0, 0, 0, 0.1);}.additional_button:hover {background: rgba(0, 0, 0, 0.03);}");re(M.head,e),re(M.head,t),!this.isComponentMode&&re(M.body,this.appElement)}};r.init(),b.setLocation(o.EN),st.register(tt),st.run()})();