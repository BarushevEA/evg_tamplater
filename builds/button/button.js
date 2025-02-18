(()=>{"use strict";let t,e,s,n,i;function r(...e){t?console.log(t.description,...e):console.log("APP",...e)}const a=new class{constructor(r,a,o,h){e=r,s=a,n=o,i=h,t=this}set major(t){s=t}set minor(t){n=t}set patch(t){i=t}set name(t){e=t}get version(){return`${s}.${n}.${i}`}get name(){return e}get description(){return`[${e} version: ${this.version}]`.toUpperCase()}init(t){t||r("STARTED")}}("button",1,0,0);var o;function h(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)}function l(t){return"next"in t?e=>t.next(e):t}!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(o||(o={}));class c{constructor(t){this.pipe=t,this.counter=t.chain.length?t.chain.length:0}case(t){this.counter++;const e=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,t(n.payload)&&(n.isBreak=!0),e!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.case(t[e]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}setOnce(){return this.push((t=>{this.listener(t.payload),t.isUnsubscribe=!0}))}unsubscribeBy(t){return this.push((e=>{e.isAvailable=!0,t(e.payload)&&(e.isUnsubscribe=!0)}))}processChain(t){const e=this.chain,s=this.flow;for(let t=0;t<e.length;t++){if(s.isUnsubscribe=!1,s.isAvailable=!1,e[t](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return t(s.payload)}pushRefiners(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.refine(t[e]);return this}switch(){return new _(this)}then(t){return this.push((e=>{e.payload=t(e.payload),e.isAvailable=!0}))}serialize(){return this.push((t=>{t.payload=JSON.stringify(t.payload),t.isAvailable=!0}))}deserialize(){return this.push((t=>{t.payload=JSON.parse(t.payload),t.isAvailable=!0}))}push(t){return this.chain.push(t),this}}class _ extends c{subscribe(t,e){return this.pipe.subscribe(t,e)}}class d extends u{get order(){return this._order}constructor(t,e){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this.observer=t,this.piped=!!e}subscribe(t,e){return this.listener=function(t){if(Array.isArray(t)){const e=[];for(let s=0;s<t.length;s++)e.push(l(t[s]));return t=>{for(let s=0;s<e.length;s++)e[s](t)}}return l(t)}(t),e&&(this.errorHandler=e),this}send(t){try{this.flow.payload=t,this.flow.isBreak=!1,this.processValue(t)}catch(e){this.errorHandler(t,e)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(t){this._order=t}processValue(t){const e=this.listener;return e?this.observer&&!this.paused?this.piped?this.processChain(e):e(t):void 0:this.unsubscribe()}}class m{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(t){return this.chain.push(t),this}filter(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}pushFilters(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.filter(t[e]);return this}switch(){return new p(this)}processChain(t){const e=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=t,s.isBreak=!1;try{for(let t=0;t<e.length;t++){if(s.isAvailable=!1,e[t](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(t){return this.errHandler?this.errHandler(t,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",t),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(t){this.errHandler=t}}class p extends c{}class g{constructor(t){this.value=t,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new m}addFilter(t){return t&&this.filters.addErrorHandler(t),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(t){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(t).isOK)){this.process=!0,this.value=t;for(let e=0;e<this.subs.length;e++)this.subs[e].send(t);this.process=!1,this.trash.length&&this.clearTrash()}}stream(t){if(!this.killed&&this.enabled)for(let e=0;e<t.length;e++)this.next(t[e])}get isDestroyed(){return this.killed}unSubscribe(t){this.killed||(this.process&&t?this.trash.push(t):this.subs&&h(this.subs,t))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const t=setInterval((()=>{this.process||(clearInterval(t),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(t,e){if(this.killed)return;if(!this.isListener(t))return;const s=new d(this,!1);return this.addObserver(s,t,e),s}addObserver(t,e,s){t.subscribe(e,s),this.subs.push(t)}isListener(t){return!this.killed&&!!t}pipe(){if(this.killed)return;const t=new d(this,!0);return this.subs.push(t),t}clearTrash(){const t=this.trash.length;for(let e=0;e<t;e++)this.unSubscribe(this.trash[e]);this.trash.length=0}}class b{constructor(){this.arr=[],this.killed=!1}collect(...t){this.killed||this.arr.push(...t)}unsubscribe(t){this.killed||(t?.unsubscribe(),h(this.arr,t))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const f=new g(o.EN),E=new class{get currentLocation(){return f.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return f.subscribe(t)}setLocation(t){f.next(t)}destroy(){f.destroy()}};var N,C,O;!function(t){t.VIEW="view"}(N||(N={})),function(t){t.BUTTON="button",t.IMAGE="image"}(C||(C={})),function(t){t.CLOSE="close",t.MINIMIZE="minimize",t.MAXIMIZE="maximize",t.DEFAULT="default",t.DANGER="danger",t.SUCCESS="success",t.INFO="info",t.WARNING="warning",t.LINK="link",t.CUSTOM="custom"}(O||(O={})),O.DEFAULT,O.CLOSE,O.MINIMIZE,O.MAXIMIZE,O.DANGER,O.SUCCESS,O.INFO,O.WARNING,O.LINK,O.CUSTOM;const A={actionCallback:()=>{console.log("DEFAULT_BUTTON_OPTIONS")},type:C.BUTTON,state:O.DEFAULT,text:"Button"},I=new g(A);class y{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){this.root.collect(I.subscribe((t=>{console.log(this.root.tagName,"buttonOption:",t)})))}onInit(){}onDestroy(){}}class v{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){this.root.collect(I.subscribe((t=>{console.log(this.root.tagName,"buttonOption:",t)})))}onInit(){console.log(this.root.tagName,"onInit")}onDestroy(){}}const L=window,D=document;let T=new Uint8Array(16);L.top;const S=`${L.crypto.getRandomValues(T),Array.from(T,(function(t){return`0${t.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,U="_______$$bool",$=[0];let M=[];var F,R,P;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(F||(F={})),function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.CHANNEL="channel",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(R||(R={})),function(t){t.TEXT_VALUE="TXT-VAL",t.QSI_BIND="QSI-BIND",t.APP_ROUTE="QSI-ROUTE",t.APP_SUB_ROUTE="QSI-SUBROUTE"}(P||(P={}));const w=t=>D.createElement(t),H=t=>{const e=w("style");return e.innerHTML=t,e},k=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])},x=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])},V=(t,e)=>{e&&t?.appendChild(e)},B=t=>{t?.remove()},W=new g(null),K=t=>{W.pipe().refine((t=>!!t)).setOnce().subscribe(t),W.pipe().unsubscribeBy((t=>!!t)).setOnce().subscribe((()=>{const t=()=>{W.next(D.body),D.removeEventListener("DOMContentLoaded",t)};D.addEventListener("DOMContentLoaded",t)})),W.next(D.body)},X=t=>`qsi-${t}`,G=(t,e)=>t?t.getAttribute(X(e)):"",Q=(t,e,s)=>{t&&t.setAttribute(X(e),s)},Y=(t,e)=>{t&&t.removeAttribute(X(e))},z=(t,e)=>{if(!e.length)return;let s="[";if(e.length>1){for(let n=0;n<e.length;n++){const i=e[n];s+=q(t,i),Q(i,R.INFO,s.trim()+"]"),i.ahe_pnt_chl=t,i.ahe_onPChlRdy$.next(t)}return}const n=e[0];nt(t,n)?Q(n,R.INFO,s+"var]"):it(t,n)?Q(n,R.INFO,s+"bind]"):(s+=ot(t,n),s+=ht(t,n),s+=at(t,n),s+=lt(t,n),s+=ct(t,n),s+=ut(t,n),s+=_t(t,n),s+=dt(t,n),s+=mt(t,n),s+=pt(t,n),s+=gt(t,n),s+=bt(t,n),s+=ft(t,n),s+=Et(t,n),s+=Nt(t,n),s+=At(t,n),s+=q(t,n),s+=j(t,n),Q(n,R.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=t,n.ahe_onPChlRdy$.next(t)))},j=(t,e)=>{let s=G(e,R.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],r={element:e,classConditions:i};for(let e=0;e<n.length;e++){const s=n[e];if(s.includes("?")){const e=s.split("?"),n=st(t,e[0]),r=e[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:F.UNDEFINED,firstClassName:r[0],secondClassName:r[1]})}else if(s.includes(":")){const e=s.split(":"),n=st(t,e[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:F.UNDEFINED,firstClassName:e[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:F.UNDEFINED,firstClassName:s,secondClassName:""})}return t.ahe_ClsIfLst.push(r),Y(e,R.CLASS_IF),"cls "},q=(t,e)=>{let s=G(e,R.ON_IF);if(!s)return"";const n=J(),i=e.parentElement,r=st(t,s);return t.ahe_IfLst.push({ifElement:e,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,e),B(e),Y(e,R.ON_IF),Q(n,R.INFO,"[ifp]"),"ifc "};(()=>{for(let t=0;t<1e4;t++)M.push(w(P.TEXT_VALUE))})();const J=()=>M.length?M.pop():w(P.TEXT_VALUE),Z=(t,e)=>{if(e.tagName===P.TEXT_VALUE)return($[0]=e)&&$;if(e.tagName===P.QSI_BIND)return($[0]=e)&&$;if(!t.isAppElement(e))return($[0]=e)&&$;const s=G(e,R.FOR);if(!s)return($[0]=e)&&$;const n=t.ahe_cmt[s];if(!n)return($[0]=e)&&$;const i=J(),r=e.parentElement,a=et(t,[],n,i,e);return Q(i,R.INFO,"[for-of]"),r.insertBefore(i,e),B(e),Y(e,R.FOR),t.ahe_ForOfLst.push({parent:i,template:e,children:a,valueName:s}),a},tt=(t,e,s)=>{s.isAppElement(e)&&e.sendMessage(t)},et=(t,e,s,n,i)=>{const r=[],a=e.length,o=s.length;let l=o-a;if(!(o+a))return r;if(l>0){for(let a=0;a<l;a++){const h=w(i.tagName);e.push(h),r.push(h);const c=G(i,R.ON_IF);c&&Q(h,R.ON_IF,c),V(n,h),tt(s[o-l+a],h,t)}for(let n=0;n<o-l;n++)tt(s[n],e[n],t)}else{l*=-1;for(let s=0;s<l;s++){const s=e.pop(),n=t.ahe_IfLst;let i;for(let t=0;t<n.length;t++){const e=n[t];if(e.ifElement===s){i=e;break}}i?(h(n,i),B(i.ifParent)):B(s)}for(let n=0;n<o;n++)tt(s[n],e[n],t)}return r},st=(t,e)=>{const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_cmt[n]}},nt=(t,e)=>{if(e.tagName!==P.TEXT_VALUE)return!1;if(!e.innerHTML)return!1;const s=st(t,e.innerHTML);return s.isFunction?(t.ahe_nFns.push({textElement:e,valueName:s.valueName,lastData:S}),!0):(t.ahe_nVls.push({textElement:e,valueName:s.valueName,lastData:S}),!0)},it=(t,e)=>{if(e.tagName!==P.QSI_BIND)return!1;if(!e.innerHTML)return!1;const s=st(t,e.innerHTML);return s.isFunction?(t.ahe_bndFns.push({textElement:e,valueName:s.valueName,lastData:S}),!0):(t.ahe_bndVls.push({textElement:e,valueName:s.valueName,lastData:S}),!0)},rt=(t,e,s)=>{t.ahe_cmt[e](s)},at=(t,e)=>{const s=Ot(e,R.SOURCE);if(!s)return"";const n=st(t,s);return n.isFunction?(t.ahe_srcCmsFns.push({textElement:e,valueName:n.valueName,lastData:""}),"src "):(t.ahe_srcCms.push({textElement:e,valueName:s,lastData:""}),"src ")},ot=(t,e)=>{const s=Ot(e,R.INJECT_TO);return s?(t.ahe_cmt[s]=e,"inj "):""},ht=(t,e)=>{const s=Ot(e,R.CHANNEL);return s&&e.ahe_isCustomAppElement?(t.ahe_cmt[s]=e,"cnl "):""},lt=(t,e)=>{const s=Ct(t,e,R.ON_CLICK);return s?(e.onclick=e=>rt(t,s,e),"clk "):""},ct=(t,e)=>{const s=Ct(t,e,R.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>rt(t,s,e),"mlv "):""},ut=(t,e)=>{const s=Ct(t,e,R.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>rt(t,s,e),"mer "):""},_t=(t,e)=>{const s=Ct(t,e,R.ON_MOUSE_UP);return s?(e.onmouseup=e=>rt(t,s,e),"mup "):""},dt=(t,e)=>{const s=Ct(t,e,R.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>rt(t,s,e),"mdn "):""},mt=(t,e)=>{const s=Ct(t,e,R.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>rt(t,s,e),"mmv "):""},pt=(t,e)=>{const s=Ct(t,e,R.ON_KEY_DOWN);return s?(e.onkeydown=e=>rt(t,s,e),"kdn "):""},gt=(t,e)=>{const s=Ct(t,e,R.ON_KEY_UP);return s?(e.onkeyup=e=>rt(t,s,e),"kup "):""},bt=(t,e)=>{const s=Ct(t,e,R.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>rt(t,s,e),"dbc "):""},ft=(t,e)=>{const s=Ct(t,e,R.ON_SCROLL);return s?(e.onscroll=e=>rt(t,s,e),"scl "):""},Et=(t,e)=>{const s=Ct(t,e,R.ON_WHEEL);return s?(e.onwheel=e=>rt(t,s,e),"whl "):""},Nt=(t,e)=>{const s=Ct(t,e,R.ON_CHANGE);return s?(e.onchange=e=>rt(t,s,e),"chg "):""},Ct=(t,e,s)=>{const n=G(e,s);return n?(It(t,n,e),Y(e,s),n):""},Ot=(t,e)=>{const s=G(t,e);return s?(Y(t,e),s):""},At=(t,e)=>{const s=G(e,R.ON_HANDLE);return s?(It(t,s,e),Y(e,R.ON_HANDLE),"elt "):""},It=(t,e,s)=>{const n=t.ahe_cmt[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_nmr]||(n.htmlElements[t.ahe_nmr]=[]),t.ahe_clr.collect(t.beforeDestroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_nmr].push(s))},yt=t=>{t.ahe_nFns.length=0,t.ahe_srcCmsFns.length=0,t.ahe_srcCms.length=0,t.ahe_nVls.length=0,t.ahe_bndFns.length=0,t.ahe_bndVls.length=0,t.ahe_IfLst.length=0,t.ahe_ClsIfLst.length=0,t.ahe_ForOfLst.length=0,t.innerHTML=""};let vt=0;function Lt(t){class e extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==P.TEXT_VALUE&&this.tagName!==P.QSI_BIND&&(this.ahe_opts=t,this.ahe_cmt=new t.element(this),this.tagName!==P.APP_ROUTE&&this.tagName!==P.APP_SUB_ROUTE&&(this.ahe_nmr=vt,vt++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new b,this.ahe_onAdt$=new g(!1),this.ahe_bfrIni$=new g(!1),this.ahe_bfrDst$=new g(!1),this.ahe_atrChd$=new g(void 0),this.ahe_bfrDctChg$=new g(!1),this.ahe_onChgDtd$=new g(!1),this.ahe_onMsg$=new g(void 0),this.ahe_onPChlRdy$=new g(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==P.TEXT_VALUE&&this.tagName!==P.QSI_BIND&&(this.tagName!==P.APP_ROUTE&&this.tagName!==P.APP_SUB_ROUTE?G(this,R.ON_IF)&&!this.ahe_cmt[U]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.isShadow&&this.ahe_opts.template?this.attachShadow({mode:"open"}).innerHTML=this.ahe_opts.template:this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(t=>{const e=t.querySelectorAll(`*:not([${X(R.INFO)}])`);for(let s=0;s<e.length;s++)z(t,Z(t,e[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((t=>this.ahe_cmt.onMessage(t)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges()):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==P.TEXT_VALUE)this.tagName!==P.QSI_BIND&&this.tagName!==P.APP_ROUTE&&this.tagName!==P.APP_SUB_ROUTE&&(!G(this,R.ON_IF)||this.ahe_cmt[U]?(this.ahe_bfrDst$.next(!0),yt(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[U]=!0);else{if(M.length>=1e4)return;""==this.innerHTML&&(Y(this,R.INFO),M.push(this))}}attributeChangedCallback(t,e,s){this.ahe_atrChd$?.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_nmr]?t.htmlElements[this.ahe_nmr]:[]}detectChanges(t){this.ahe_bfrDctChg$.next(!0),!t&&this.ahe_ForOfLst.length&&(t=>{const e=t.ahe_ForOfLst,s=t.ahe_cmt;for(let n=0;n<e.length;n++){const i=e[n],r=et(t,i.children,s[i.valueName],i.parent,i.template);z(t,r)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_IfLst.length;s++){const n=t.ahe_IfLst[s];let i=n.isFunction?!!e[n.valueName]():!!e[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const r=n.ifParent.contains(n.ifElement);i?r||V(n.ifParent,n.ifElement):r&&B(n.ifElement)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=t.ahe_ClsIfLst[s];for(let t=0;t<n.length;t++){const s=n[t];let r;if(s.isConditionDisabled)r=F.TRUE;else{let t=s.isFunction?!!e[s.conditionName]():!!e[s.conditionName];s.isInversion&&(t=!t),r=t?F.TRUE:F.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:a,secondClassName:o}=s;o?r===F.TRUE?(x(i,[a]),k(i,[o])):(x(i,[o]),k(i,[a])):s.isConditionDisabled||r===F.TRUE?x(i,[a]):k(i,[a])}}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndVls.length;s++){const n=t.ahe_bndVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCms.length;s++){const n=t.ahe_srcCms[s],i=e[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCmsFns.length;s++){const n=t.ahe_srcCmsFns[s],i=e[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndFns.length;s++){const n=t.ahe_bndFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nVls.length;s++){const n=t.ahe_nVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nFns.length;s++){const n=t.ahe_nFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(t){this.ahe_onMsg$.next(t)}sendMessageToParent(t){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(t),!0)}getChannel(t){if(t&&t.ahe_isCustomAppElement)return t}transferToChannel(t,e){this.onMessage$().pipe().refine((()=>t())).subscribe((s=>{t().sendMessage(e(s))}))}sendToChannel(t,e){t?.sendMessage(e)}isAppElement(t){return!!t?.ahe_isCustomAppElement}collect(...t){this.ahe_clr.collect(...t)}destroy(){yt(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return e}const Dt="{display: contents !important;}",Tt=[`html-block ${Dt}`],St=new g(!1),Ut=(t,e)=>{for(let e=0;e<t.length;e++)t[e].element.qsi_app_tag_name=t[e].tagName,t[e].isCustomElement||Tt.push(`${t[e].tagName}${Dt}`);K((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].target);e&&St.next(!0)}))},$t=(t,e,s,n,i)=>({isCustomElement:n,tagName:e,target:Lt({template:s,element:t,isShadow:i}),element:t}),Mt=new g(null),Ft={};Mt.pipe().refine((t=>t)).subscribe((t=>{const e=Ft[t.name];e&&e.subRoute?e.subRoute.setPage(t.page):console.log("ERROR:",`Subroute "${t.name}" is not registered or does not have an active instance.`)}));const Rt=t.name;let Pt="";for(let t=0;t<Rt.length;t++){const e=Rt[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}Pt+=s||"-"}const wt="app-"+Pt,Ht=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new g(""),L.addEventListener("popstate",this.popstate),this.popState()}set(t){this.isDestroyed||(L.history.pushState({},"",t),this.popState())}setWithoutHistory(t){this.isDestroyed||(L.history.replaceState({},"",t),this.popState())}subscribe(t){if(!this.isDestroyed)return this.state$.subscribe(t)}destroy(){L.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const t=L.location.pathname;this.state$.next(t)}};var kt;!function(t){t.SHOW="SHOW",t.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",t.HIDDEN="HIDDEN"}(kt||(kt={}));let xt=kt.SHOW;const Vt=new g(""),Bt=new g(null);let Wt;const Kt=new b;var Xt,Gt;Xt||(Xt={}),function(t){Bt.next({defaultCmd:t,routes:void 0}),Vt.next(t)}(),Gt=kt.SHOW,xt=Gt;const Qt=new class{constructor(t,e){this.pages=[],this.name=t,this.defaultPage=e}addPage(t,e){return this.pages.push({name:t,page:e}),this}getOptions(){return{name:this.name,defaultPage:this.defaultPage,pages:this.pages}}}(N.VIEW,C.BUTTON);Qt.addPage(C.BUTTON,v).addPage(C.IMAGE,y),function(...t){for(let e=0;e<t.length;e++){const s=t[e],n={};for(let t=0;t<s.pages.length;t++){const e=s.pages[t];n[e.name]=e.page}Ft[s.name]={name:s.name,defaultPage:s.defaultPage,pages:n,subRoute:null}}}(Qt);const Yt=[$t(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){I.next(t)}onCreate(){this.currentPage=I.getValue().type,I.addFilter().pushFilters([t=>!!t,t=>!!t.type,t=>!!t.actionCallback,t=>t.type===C.BUTTON||t.type===C.IMAGE]),this.root.collect(I.pipe().refine((t=>t.type!==this.currentPage)).subscribe((t=>{var e;(e=N.VIEW,{SHOW_PAGE:t=>Mt.next({name:e,page:t})}).SHOW_PAGE(t.type),this.currentPage=t.type})))}onInit(){I.next(A)}onDestroy(){}},wt,"<app-container></app-container>"),$t(v,"app-view_button","<div>Hello view_button.html</div>"),$t(y,"app-view_image","<div>Hello view_image.html</div>"),$t(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){r(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}},"app-container","<qsi-subroute name='view'></qsi-subroute>")];Ut([$t(class{},P.TEXT_VALUE.toLowerCase(),""),$t(class{},P.QSI_BIND.toLowerCase(),""),$t(class{constructor(t){this.root=t,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){Kt.unsubscribeAll()}process(){Kt.collect(Vt.pipe().refine((t=>!!t)).subscribe((t=>this.setCommand(t))),Ht.subscribe((t=>this.setHistory(t)))),Bt.getValue()?this.init():Bt.pipe().refine((t=>!!t)).setOnce().subscribe((()=>this.init()))}init(){let t=Bt.getValue();Wt=t.defaultCmd;const e=t.routes;for(let t=0;t<e.length;t++)this.cmd[e[t].command]=e[t],this.path[e[t].path]=e[t];this.setCommand(Wt)}setCommand(t){switch(this.setRoute(this.cmd[t]),xt){case kt.HIDDEN:break;case kt.SHOW:Ht.set(this.cmd[t].path);break;case kt.SHOW_WITHOUT_HISTORY:Ht.setWithoutHistory(this.cmd[t].path)}}setHistory(t){t in this.path&&this.setRoute(this.path[t])}setRoute(t){const e=t.component.qsi_app_tag_name;this.root.innerHTML=`<${e}></${e}>`}},P.APP_ROUTE.toLowerCase(),""),$t(class{constructor(t){if(this.root=t,this.isDestroyed=!0,this.name=t.getAttribute("name")||"",this.registered=Ft[this.name],!this.registered)throw new Error(`Subroute with the name "${this.name}" not found`);this.registered.subRoute=this}onInit(){this.isDestroyed=!1,this.setPage(this.registered.defaultPage)}onDestroy(){this.isDestroyed=!0}setPage(t){if(this.isDestroyed)return;const e=this.registered.pages[t];if(!e)return void console.error(`Page with name "${t}" not found in subroute "${this.name}"`);const s=e.qsi_app_tag_name;this.root.innerHTML=`<${s}></${s}>`}},P.APP_SUB_ROUTE.toLowerCase(),"")]);const zt=new class{constructor(){this.isComponentMode=!1}register(t){Ut(t,!0)}run(t){this.isComponentMode=!!t,K((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=w(wt))}start(){const t=H(Tt.join("")),e=H("");V(D.head,t),V(D.head,e),!this.isComponentMode&&V(D.body,this.appElement)}};a.init(),E.setLocation(o.EN),zt.register(Yt),zt.run()})();