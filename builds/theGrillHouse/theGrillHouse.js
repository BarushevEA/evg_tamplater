(()=>{"use strict";let e,t,s,n,i;function a(...t){e?console.log(e.description,...t):console.log("APP",...t)}const r=new class{constructor(a,r,o,h){t=a,s=r,n=o,i=h,e=this}set major(e){s=e}set minor(e){n=e}set patch(e){i=e}set name(e){t=e}get version(){return`${s}.${n}.${i}`}get name(){return t}get description(){return`[${t} version: ${this.version}]`.toUpperCase()}init(e){e||a("STARTED")}}("theGrillHouse",1,0,0);var o;function h(e,t){const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)}function l(e){return"next"in e?t=>e.next(t):e}!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(o||(o={}));class c{constructor(e){this.pipe=e,this.counter=e.chain.length?e.chain.length:0}case(e){this.counter++;const t=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreak=!0),t!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}setOnce(){return this.push((e=>{this.listener(e.payload),e.isUnsubscribe=!0}))}unsubscribeBy(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isUnsubscribe=!0)}))}processChain(e){const t=this.chain,s=this.flow;for(let e=0;e<t.length;e++){if(s.isUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return e(s.payload)}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.refine(e[t]);return this}switch(){return new _(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}push(e){return this.chain.push(e),this}}class _ extends c{subscribe(e,t){return this.pipe.subscribe(e,t)}}class m extends u{get order(){return this._order}constructor(e,t){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this.observer=e,this.piped=!!t}subscribe(e,t){return this.listener=function(e){if(Array.isArray(e)){const t=[];for(let s=0;s<e.length;s++)t.push(l(e[s]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return l(e)}(e),t&&(this.errorHandler=t),this}send(e){try{this.flow.payload=e,this.flow.isBreak=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observer&&!this.paused?this.piped?this.processChain(t):t(e):void 0:this.unsubscribe()}}class d{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(e){return this.chain.push(e),this}filter(e){return this.push((t=>e(t.payload)&&(t.isAvailable=!0)))}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}switch(){return new p(this)}processChain(e){const t=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=e,s.isBreak=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(e){return this.errHandler?this.errHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errHandler=e}}class p extends c{}class E{constructor(e){this.value=e,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new d}addFilter(e){return e&&this.filters.addErrorHandler(e),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(e){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(e).isOK)){this.process=!0,this.value=e;for(let t=0;t<this.subs.length;t++)this.subs[t].send(e);this.process=!1,this.trash.length&&this.clearTrash()}}stream(e){if(!this.killed&&this.enabled)for(let t=0;t<e.length;t++)this.next(e[t])}get isDestroyed(){return this.killed}unSubscribe(e){this.killed||(this.process&&e?this.trash.push(e):this.subs&&h(this.subs,e))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const e=setInterval((()=>{this.process||(clearInterval(e),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(e,t){if(this.killed)return;if(!this.isListener(e))return;const s=new m(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.subs.push(e)}isListener(e){return!this.killed&&!!e}pipe(){if(this.killed)return;const e=new m(this,!0);return this.subs.push(e),e}clearTrash(){const e=this.trash.length;for(let t=0;t<e;t++)this.unSubscribe(this.trash[t]);this.trash.length=0}}class g{constructor(){this.arr=[],this.killed=!1}collect(...e){this.killed||this.arr.push(...e)}unsubscribe(e){this.killed||(e?.unsubscribe(),h(this.arr,e))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const b=new E(o.EN),f=new class{get currentLocation(){return b.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return b.subscribe(e)}setLocation(e){b.next(e)}destroy(){b.destroy()}};class N{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class A{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class C{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class O{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}class I{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}}const M=window,L=document,y=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new E(""),M.addEventListener("popstate",this.popstate),this.popState()}set(e){this.isDestroyed||(M.history.pushState({},"",e),this.popState())}setWithoutHistory(e){this.isDestroyed||(M.history.replaceState({},"",e),this.popState())}subscribe(e){if(!this.isDestroyed)return this.state$.subscribe(e)}destroy(){M.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const e=M.location.pathname;this.state$.next(e)}};var v;!function(e){e.SHOW="SHOW",e.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",e.HIDDEN="HIDDEN"}(v||(v={}));let D=v.SHOW;const T=new E(""),R=new E(null);let $;function F(e,t,s){return{path:t,command:e,component:s}}const P=new g;var S,H;!function(e){e.MAIN="MAINPAGE",e.FISH="FISH",e.MEAT="MEAT",e.MUSHROOM="MUSHROOM",e.VEGETABLE="VEGETABLE"}(S||(S={})),function(e,t){R.next({defaultCmd:e,routes:t})}(S.MAIN,[F(S.MAIN,"/main",N),F(S.FISH,"/fish",A),F(S.MEAT,"/meat",O),F(S.MUSHROOM,"/mushroom",I),F(S.VEGETABLE,"/vegetable",C)]),H=v.SHOW,D=H;let U=new Uint8Array(16);M.top;const w=`${M.crypto.getRandomValues(U),Array.from(U,(function(e){return`0${e.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,k="_______$$bool",x=[0];let V=[];var B,K,X;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(B||(B={})),function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(K||(K={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND",e.APP_ROUTE="QSI-ROUTE"}(X||(X={}));const W=e=>L.createElement(e),G=e=>{const t=W("style");return t.innerHTML=e,t},Y=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])},Q=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])},j=(e,t)=>{t&&e?.appendChild(t)},z=e=>{e?.remove()},q=new E(null),J=e=>{q.pipe().refine((e=>!!e)).setOnce().subscribe(e),q.pipe().unsubscribeBy((e=>!!e)).setOnce().subscribe((()=>{const e=()=>{q.next(L.body),L.removeEventListener("DOMContentLoaded",e)};L.addEventListener("DOMContentLoaded",e)})),q.next(L.body)},Z=e=>`qsi-${e}`,ee=(e,t)=>e?e.getAttribute(Z(t)):"",te=(e,t,s)=>{e&&e.setAttribute(Z(t),s)},se=(e,t)=>{e&&e.removeAttribute(Z(t))},ne=(e,t)=>{if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=ae(e,i),te(i,K.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];ue(e,n)?te(n,K.INFO,s+"var]"):_e(e,n)?te(n,K.INFO,s+"bind]"):(s+=pe(e,n),s+=Ee(e,n),s+=de(e,n),s+=ge(e,n),s+=be(e,n),s+=fe(e,n),s+=Ne(e,n),s+=Ae(e,n),s+=Ce(e,n),s+=Oe(e,n),s+=Ie(e,n),s+=Me(e,n),s+=Le(e,n),s+=ye(e,n),s+=ve(e,n),s+=Re(e,n),s+=ae(e,n),s+=ie(e,n),te(n,K.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e)))},ie=(e,t)=>{let s=ee(t,K.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],a={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=ce(e,t[0]),a=t[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:B.UNDEFINED,firstClassName:a[0],secondClassName:a[1]})}else if(s.includes(":")){const t=s.split(":"),n=ce(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:B.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:B.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(a),se(t,K.CLASS_IF),"cls "},ae=(e,t)=>{let s=ee(t,K.ON_IF);if(!s)return"";const n=re(),i=t.parentElement,a=ce(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:a.valueName,ifParent:n,oldCondition:!1,isInversion:a.isInversion,isFunction:a.isFunction}),i.insertBefore(n,t),z(t),se(t,K.ON_IF),te(n,K.INFO,"[ifp]"),"ifc "};(()=>{for(let e=0;e<1e4;e++)V.push(W(X.TEXT_VALUE))})();const re=()=>V.length?V.pop():W(X.TEXT_VALUE),oe=(e,t)=>{if(t.tagName===X.TEXT_VALUE)return(x[0]=t)&&x;if(t.tagName===X.QSI_BIND)return(x[0]=t)&&x;if(!e.isAppElement(t))return(x[0]=t)&&x;const s=ee(t,K.FOR);if(!s)return(x[0]=t)&&x;const n=e.ahe_cmt[s];if(!n)return(x[0]=t)&&x;const i=re(),a=t.parentElement,r=le(e,[],n,i,t);return te(i,K.INFO,"[for-of]"),a.insertBefore(i,t),z(t),se(t,K.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:r,valueName:s}),r},he=(e,t,s)=>{s.isAppElement(t)&&t.sendMessage(e)},le=(e,t,s,n,i)=>{const a=[],r=t.length,o=s.length;let l=o-r;if(!(o+r))return a;if(l>0){for(let r=0;r<l;r++){const h=W(i.tagName);t.push(h),a.push(h);const c=ee(i,K.ON_IF);c&&te(h,K.ON_IF,c),j(n,h),he(s[o-l+r],h,e)}for(let n=0;n<o-l;n++)he(s[n],t[n],e)}else{l*=-1;for(let s=0;s<l;s++){const s=t.pop(),n=e.ahe_IfLst;let i;for(let e=0;e<n.length;e++){const t=n[e];if(t.ifElement===s){i=t;break}}i?(h(n,i),z(i.ifParent)):z(s)}for(let n=0;n<o;n++)he(s[n],t[n],e)}return a},ce=(e,t)=>{const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}},ue=(e,t)=>{if(t.tagName!==X.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=ce(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:w}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:w}),!0)},_e=(e,t)=>{if(t.tagName!==X.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=ce(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:w}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:w}),!0)},me=(e,t,s)=>{e.ahe_cmt[t](s)},de=(e,t)=>{const s=Te(t,K.SOURCE);if(!s)return"";const n=ce(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")},pe=(e,t)=>{const s=Te(t,K.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""},Ee=(e,t)=>{const s=Te(t,K.CHANNEL);return s&&t.ahe_isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""},ge=(e,t)=>{const s=De(e,t,K.ON_CLICK);return s?(t.onclick=t=>me(e,s,t),"clk "):""},be=(e,t)=>{const s=De(e,t,K.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>me(e,s,t),"mlv "):""},fe=(e,t)=>{const s=De(e,t,K.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>me(e,s,t),"mer "):""},Ne=(e,t)=>{const s=De(e,t,K.ON_MOUSE_UP);return s?(t.onmouseup=t=>me(e,s,t),"mup "):""},Ae=(e,t)=>{const s=De(e,t,K.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>me(e,s,t),"mdn "):""},Ce=(e,t)=>{const s=De(e,t,K.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>me(e,s,t),"mmv "):""},Oe=(e,t)=>{const s=De(e,t,K.ON_KEY_DOWN);return s?(t.onkeydown=t=>me(e,s,t),"kdn "):""},Ie=(e,t)=>{const s=De(e,t,K.ON_KEY_UP);return s?(t.onkeyup=t=>me(e,s,t),"kup "):""},Me=(e,t)=>{const s=De(e,t,K.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>me(e,s,t),"dbc "):""},Le=(e,t)=>{const s=De(e,t,K.ON_SCROLL);return s?(t.onscroll=t=>me(e,s,t),"scl "):""},ye=(e,t)=>{const s=De(e,t,K.ON_WHEEL);return s?(t.onwheel=t=>me(e,s,t),"whl "):""},ve=(e,t)=>{const s=De(e,t,K.ON_CHANGE);return s?(t.onchange=t=>me(e,s,t),"chg "):""},De=(e,t,s)=>{const n=ee(t,s);return n?($e(e,n,t),se(t,s),n):""},Te=(e,t)=>{const s=ee(e,t);return s?(se(e,t),s):""},Re=(e,t)=>{const s=ee(t,K.ON_HANDLE);return s?($e(e,s,t),se(t,K.ON_HANDLE),"elt "):""},$e=(e,t,s)=>{const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))},Fe=e=>{e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""};let Pe=0;function Se(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==X.TEXT_VALUE&&this.tagName!==X.QSI_BIND&&(this.ahe_opts=e,this.ahe_cmt=new e.element(this),this.tagName!==X.APP_ROUTE&&(this.ahe_nmr=Pe,Pe++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new g,this.ahe_onAdt$=new E(!1),this.ahe_bfrIni$=new E(!1),this.ahe_bfrDst$=new E(!1),this.ahe_atrChd$=new E(void 0),this.ahe_bfrDctChg$=new E(!1),this.ahe_onChgDtd$=new E(!1),this.ahe_onMsg$=new E(void 0),this.ahe_onPChlRdy$=new E(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==X.TEXT_VALUE&&this.tagName!==X.QSI_BIND&&(this.tagName!==X.APP_ROUTE?ee(this,K.ON_IF)&&!this.ahe_cmt[k]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(e=>{const t=e.querySelectorAll(`*:not([${Z(K.INFO)}])`);for(let s=0;s<t.length;s++)ne(e,oe(e,t[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==X.TEXT_VALUE)this.tagName!==X.QSI_BIND&&this.tagName!==X.APP_ROUTE&&(!ee(this,K.ON_IF)||this.ahe_cmt[k]?(this.ahe_bfrDst$.next(!0),Fe(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[k]=!0);else{if(V.length>=1e4)return;""==this.innerHTML&&(se(this,K.INFO),V.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&(e=>{const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n],a=le(e,i.children,s[i.valueName],i.parent,i.template);ne(e,a)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const a=n.ifParent.contains(n.ifElement);i?a||j(n.ifParent,n.ifElement):a&&z(n.ifElement)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let a;if(s.isConditionDisabled)a=B.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),a=e?B.TRUE:B.FALSE}if(a===s.oldCondition)continue;s.oldCondition=a;const{firstClassName:r,secondClassName:o}=s;o?a===B.TRUE?(Q(i,[r]),Y(i,[o])):(Q(i,[o]),Y(i,[r])):s.isConditionDisabled||a===B.TRUE?Q(i,[r]):Y(i,[r])}}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),(e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e&&e.ahe_isCustomAppElement)return e}transferToChannel(e,t){this.onMessage$().pipe().refine((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!e?.ahe_isCustomAppElement}collect(...e){this.ahe_clr.collect(...e)}destroy(){Fe(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const He="{display: contents !important;}",Ue=[`html-block ${He}`],we=new E(!1),ke=(e,t)=>{for(let t=0;t<e.length;t++)Ue.push(`${e[t].tagName} ${He}`),e[t].element.qsi_app_tag_name=e[t].tagName;J((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].target);t&&we.next(!0)}))},xe=(e,t,s)=>({tagName:t,target:Se({template:s,element:e}),element:e}),Ve=e.name;let Be="";for(let e=0;e<Ve.length;e++){const t=Ve[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}Be+=s||"-"}const Ke="app-"+Be,Xe=[xe(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){console.log(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},Ke,"<div class='xV5th-jPw'><app-header></app-header><app-main></app-main><app-footer></app-footer></div>"),xe(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}goMainPage(){T.next(S.MAIN)}},"app-header","<div class='ggY_o_B_q'><div qsi-click='goMainPage'><img src='' alt='Logo.png'><div>Title</div></div><app-search></app-search><img src='' alt='Favorite.png'><app-nav></app-nav></div>"),xe(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-main","<div><qsi-route></qsi-route></div>"),xe(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-footer","<div>Hello footer.html</div>"),xe(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-search","<div>Hello search.html</div>"),xe(class{constructor(e){this.root=e,this.pages=[{name:"Mushrooms",route:S.MUSHROOM},{name:"Vegetables",route:S.VEGETABLE},{name:"Meat",route:S.MEAT},{name:"Fish",route:S.FISH}],this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},"app-nav","<div><app-navElement qsi-for='pages' ></app-navElement></div>"),xe(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){a(this.root.tagName,"message:",e)}onCreate(){this.root.collect(this.root.onMessage$().pipe().refine((e=>!!e)).subscribe((e=>{this.setProperties(e)})))}onInit(){}onDestroy(){}changePage(){T.next(this.route)}setProperties(e){this.name=e.name,this.route=e.route,this.root.detectChanges()}},"app-navelement","<div qsi-click='changePage'> <qsi-bind>name</qsi-bind></div>"),xe(I,"app-mushroom","<div>Hello mushroom.html</div>"),xe(O,"app-meat","<div>Hello meat.html</div>"),xe(C,"app-vegetable","<div>Hello vegetable.html</div>"),xe(A,"app-fish","<div>Hello fish.html</div>"),xe(N,"app-mainpage","<div>Hello mainpage.html</div>")];ke([xe(class{},X.TEXT_VALUE.toLowerCase(),""),xe(class{},X.QSI_BIND.toLowerCase(),""),xe(class{constructor(e){this.root=e,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){P.unsubscribeAll()}process(){P.collect(T.pipe().refine((e=>!!e)).subscribe((e=>this.setCommand(e))),y.subscribe((e=>this.setHistory(e)))),R.getValue()?this.init():R.pipe().refine((e=>!!e)).setOnce().subscribe((()=>this.init()))}init(){let e=R.getValue();$=e.defaultCmd;const t=e.routes;for(let e=0;e<t.length;e++)this.cmd[t[e].command]=t[e],this.path[t[e].path]=t[e];this.setCommand($)}setCommand(e){switch(this.setRoute(this.cmd[e]),D){case v.HIDDEN:break;case v.SHOW:y.set(this.cmd[e].path);break;case v.SHOW_WITHOUT_HISTORY:y.setWithoutHistory(this.cmd[e].path)}}setHistory(e){e in this.path&&this.setRoute(this.path[e])}setRoute(e){const t=e.component.qsi_app_tag_name;this.root.innerHTML=`<${t}></${t}>`}},X.APP_ROUTE.toLowerCase(),"")]);const We=new class{constructor(){this.isComponentMode=!1}register(e){ke(e,!0)}run(e){this.isComponentMode=!!e,J((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=W(Ke))}start(){const e=G(Ue.join("")),t=G("");j(L.head,e),j(L.head,t),!this.isComponentMode&&j(L.body,this.appElement)}};r.init(),f.setLocation(o.EN),We.register(Xe),We.run()})();