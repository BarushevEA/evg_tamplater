(()=>{"use strict";let t,e,s,i,n;const a=new class{constructor(a,r,h,o){e=a,s=r,i=h,n=o,t=this}set major(t){s=t}set minor(t){i=t}set patch(t){n=t}set name(t){e=t}get version(){return`${s}.${i}.${n}`}get name(){return e}get description(){return`[${e} version: ${this.version}]`.toUpperCase()}init(e){e||function(...e){t?console.log(t.description,...e):console.log("APP",...e)}("STARTED")}}("simple_table",1,1,0),r=window,h=document;function o(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)}function l(t){return"next"in t?e=>t.next(e):t}class c{constructor(t){this.pipe=t,this.counter=t.chain.length?t.chain.length:0}case(t){this.counter++;const e=this.counter,s=this.pipe.chain;return s.push((i=>{i.isAvailable=!0,t(i.payload)&&(i.isBreak=!0),e!==s.length||i.isBreak||(i.isAvailable=!1)})),this}pushCases(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.case(t[e]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}setOnce(){return this.push((t=>{this.listener(t.payload),t.isUnsubscribe=!0}))}unsubscribeBy(t){return this.push((e=>{e.isAvailable=!0,t(e.payload)&&(e.isUnsubscribe=!0)}))}processChain(t){const e=this.chain,s=this.flow;for(let t=0;t<e.length;t++){if(s.isUnsubscribe=!1,s.isAvailable=!1,e[t](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return t(s.payload)}pushRefiners(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.refine(t[e]);return this}switch(){return new d(this)}then(t){return this.push((e=>{e.payload=t(e.payload),e.isAvailable=!0}))}serialize(){return this.push((t=>{t.payload=JSON.stringify(t.payload),t.isAvailable=!0}))}deserialize(){return this.push((t=>{t.payload=JSON.parse(t.payload),t.isAvailable=!0}))}push(t){return this.chain.push(t),this}}class d extends c{subscribe(t,e){return this.pipe.subscribe(t,e)}}class _ extends u{get order(){return this._order}constructor(t,e){super(),this.paused=!1,this._order=0,this.piped=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this.observer=t,this.piped=!!e}subscribe(t,e){return this.listener=function(t){if(Array.isArray(t)){const e=[];for(let s=0;s<t.length;s++)e.push(l(t[s]));return t=>{for(let s=0;s<e.length;s++)e[s](t)}}return l(t)}(t),e&&(this.errorHandler=e),this}send(t){try{this.flow.payload=t,this.flow.isBreak=!1,this.processValue(t)}catch(e){this.errorHandler(t,e)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(t){this._order=t}processValue(t){const e=this.listener;return e?this.observer&&!this.paused?this.piped?this.processChain(e):e(t):void 0:this.unsubscribe()}}class m{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(t){return this.chain.push(t),this}filter(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}pushFilters(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.filter(t[e]);return this}switch(){return new b(this)}processChain(t){const e=this.chain,s=this.flow,i=this.response;i.isOK=!1,i.payload=void 0,s.payload=t,s.isBreak=!1;try{for(let t=0;t<e.length;t++){if(s.isAvailable=!1,e[t](s),!s.isAvailable)return i;if(s.isBreak)break}}catch(t){return this.errHandler?this.errHandler(t,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",t),i}return i.isOK=!0,i.payload=s.payload,i}addErrorHandler(t){this.errHandler=t}}class b extends c{}class p{constructor(t){this.value=t,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new m}addFilter(t){return t&&this.filters.addErrorHandler(t),this.filters}get isEnable(){return this.enabled}get isDestroyed(){return this.killed}disable(){this.enabled=!1}enable(){this.enabled=!0}next(t){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(t).isOK)){this.process=!0,this.value=t;for(let e=0;e<this.subs.length;e++)this.subs[e].send(t);this.process=!1,this.trash.length&&this.clearTrash()}}stream(t){if(!this.killed&&this.enabled)for(let e=0;e<t.length;e++)this.next(t[e])}unSubscribe(t){this.killed||(this.process&&t?this.trash.push(t):this.subs&&o(this.subs,t))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,this.unsubscribeAll(),void(this.subs.length=0);const t=setInterval((()=>{this.process||(clearInterval(t),this.value=null,this.unsubscribeAll(),this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(t,e){if(!this.isListener(t))return;const s=new _(this,!1);return this.addObserver(s,t,e),s}addObserver(t,e,s){t.subscribe(e,s),this.subs.push(t)}isListener(t){return!this.killed&&!!t}pipe(){if(this.killed)return;const t=new _(this,!0);return this.subs.push(t),t}clearTrash(){const t=this.trash.length;for(let e=0;e<t;e++)this.unSubscribe(this.trash[e]);this.trash.length=0}}class f{constructor(){this.arr=[],this.killed=!1}collect(...t){this.killed||this.arr.push(...t)}unsubscribe(t){this.killed||(t?.unsubscribe(),o(this.arr,t))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const g=new p(0),E=new p(0),C=t.name;let N="";for(let t=0;t<C.length;t++){const e=C[t];let s="";for(let t=0;t<26;t++){const i="abcdefghijklmnopqrstuvwxyz"[t];if(i===e.toLowerCase()){s=i;break}}N+=s||"-"}const O="app-"+N;let A=new Uint8Array(16);r.top;const y=`${r.crypto.getRandomValues(A),Array.from(A,(function(t){return`0${t.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,D="_______$$bool",L=[0];let v=[];var I,T,$;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(I||(I={})),function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.CHANNEL="channel",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(T||(T={})),function(t){t.TEXT_VALUE="TXT-VAL",t.QSI_BIND="QSI-BIND",t.APP_ROUTE="QSI-ROUTE"}($||($={}));let w=0;function F(t){class e extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==$.TEXT_VALUE&&this.tagName!==$.QSI_BIND&&(this.ahe_opts=t,this.ahe_cmt=new t.element(this),this.tagName!==$.APP_ROUTE&&(this.ahe_nmr=w,w++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new f,this.ahe_onAdt$=new p(!1),this.ahe_bfrIni$=new p(!1),this.ahe_bfrDst$=new p(!1),this.ahe_atrChd$=new p(void 0),this.ahe_bfrDctChg$=new p(!1),this.ahe_onChgDtd$=new p(!1),this.ahe_onMsg$=new p(void 0),this.ahe_onPChlRdy$=new p(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==$.TEXT_VALUE&&this.tagName!==$.QSI_BIND&&(this.tagName!==$.APP_ROUTE?Q(this,T.ON_IF)&&!this.ahe_cmt[D]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),J(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((t=>this.ahe_cmt.onMessage(t)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==$.TEXT_VALUE)this.tagName!==$.QSI_BIND&&this.tagName!==$.APP_ROUTE&&(!Q(this,T.ON_IF)||this.ahe_cmt[D]?(this.ahe_bfrDst$.next(!0),kt(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[D]=!0);else{if(v.length>=1e4)return;""==this.innerHTML&&(q(this,T.INFO),v.push(this))}}attributeChangedCallback(t,e,s){this.ahe_atrChd$?.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_nmr]?t.htmlElements[this.ahe_nmr]:[]}detectChanges(t){this.ahe_bfrDctChg$.next(!0),!t&&this.ahe_ForOfLst.length&&Pt(this),Ut(this),Ht(this),$t(this),wt(this),Ft(this),St(this),Tt(this),Mt(this),this.ahe_onChgDtd$.next(!0)}sendMessage(t){this.ahe_onMsg$.next(t)}sendMessageToParent(t){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(t),!0)}getChannel(t){if(t&&t.ahe_isCustomAppElement)return t}transferToChannel(t,e){this.onMessage$().pipe().refine((()=>t())).subscribe((s=>{t().sendMessage(e(s))}))}sendToChannel(t,e){t?.sendMessage(e)}isAppElement(t){return!!t?.ahe_isCustomAppElement}collect(...t){this.ahe_clr.collect(...t)}destroy(){kt(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return e}const M="{display: contents !important;}",S=[`html-block ${M}`],U=new p(!1),H=(t,e)=>{for(let e=0;e<t.length;e++)S.push(`${t[e].tagName} ${M}`),t[e].element.qsi_app_tag_name=t[e].tagName;Y((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].target);e&&U.next(!0)}))},P=(t,e,s)=>({tagName:e,target:F({template:s,element:t}),element:t}),k=t=>h.createElement(t),R=t=>{const e=k("style");return e.innerHTML=t,e},x=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])},B=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])},V=(t,e)=>{e&&t?.appendChild(e)},W=t=>{t?.remove()},X=(t,e)=>{t&&(t.value=e)},K=new p(null),Y=t=>{K.pipe().refine((t=>!!t)).setOnce().subscribe(t),K.pipe().unsubscribeBy((t=>!!t)).setOnce().subscribe((()=>{const t=()=>{K.next(h.body),h.removeEventListener("DOMContentLoaded",t)};h.addEventListener("DOMContentLoaded",t)})),K.next(h.body)},j=t=>`qsi-${t}`,Q=(t,e)=>t?t.getAttribute(j(e)):"",z=(t,e,s)=>{t&&t.setAttribute(j(e),s)},q=(t,e)=>{t&&t.removeAttribute(j(e))},J=t=>{const e=rt(t);for(let s=0;s<e.length;s++)G(t,st(t,e[s]))},G=(t,e)=>{if(!e.length)return;let s="[";if(e.length>1){for(let i=0;i<e.length;i++){const n=e[i];s+=tt(t,n),z(n,T.INFO,s.trim()+"]"),n.ahe_pnt_chl=t,n.ahe_onPChlRdy$.next(t)}return}const i=e[0];ht(t,i)?z(i,T.INFO,s+"var]"):ot(t,i)?z(i,T.INFO,s+"bind]"):(s+=ut(t,i),s+=dt(t,i),s+=ct(t,i),s+=_t(t,i),s+=mt(t,i),s+=bt(t,i),s+=pt(t,i),s+=ft(t,i),s+=gt(t,i),s+=Et(t,i),s+=Ct(t,i),s+=Nt(t,i),s+=Ot(t,i),s+=At(t,i),s+=yt(t,i),s+=vt(t,i),s+=tt(t,i),s+=Z(t,i),z(i,T.INFO,s.trim()+"]"),i.ahe_isCustomAppElement&&(i.ahe_pnt_chl=t,i.ahe_onPChlRdy$.next(t)))},Z=(t,e)=>{let s=Q(e,T.CLASS_IF);if(!s)return"";const i=s.split(" "),n=[],a={element:e,classConditions:n};for(let e=0;e<i.length;e++){const s=i[e];if(s.includes("?")){const e=s.split("?"),i=at(t,e[0]),a=e[1].split(":");n.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:I.UNDEFINED,firstClassName:a[0],secondClassName:a[1]})}else if(s.includes(":")){const e=s.split(":"),i=at(t,e[1]);n.push({conditionName:i.valueName,isFunction:i.isFunction,isInversion:i.isInversion,isConditionDisabled:!1,oldCondition:I.UNDEFINED,firstClassName:e[0],secondClassName:""})}else n.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:I.UNDEFINED,firstClassName:s,secondClassName:""})}return t.ahe_ClsIfLst.push(a),q(e,T.CLASS_IF),"cls "},tt=(t,e)=>{let s=Q(e,T.ON_IF);if(!s)return"";const i=et(),n=e.parentElement,a=at(t,s);return t.ahe_IfLst.push({ifElement:e,valueName:a.valueName,ifParent:i,oldCondition:!1,isInversion:a.isInversion,isFunction:a.isFunction}),n.insertBefore(i,e),W(e),q(e,T.ON_IF),z(i,T.INFO,"[ifp]"),"ifc "};(()=>{for(let t=0;t<1e4;t++)v.push(k($.TEXT_VALUE))})();const et=()=>v.length?v.pop():k($.TEXT_VALUE),st=(t,e)=>{if(e.tagName===$.TEXT_VALUE)return(L[0]=e)&&L;if(e.tagName===$.QSI_BIND)return(L[0]=e)&&L;if(!t.isAppElement(e))return(L[0]=e)&&L;const s=Q(e,T.FOR);if(!s)return(L[0]=e)&&L;const i=t.ahe_cmt[s];if(!i)return(L[0]=e)&&L;const n=et(),a=e.parentElement,r=nt(t,[],i,n,e);return z(n,T.INFO,"[for-of]"),a.insertBefore(n,e),W(e),q(e,T.FOR),t.ahe_ForOfLst.push({parent:n,template:e,children:r,valueName:s}),r},it=(t,e,s)=>{s.isAppElement(e)&&e.sendMessage(t)},nt=(t,e,s,i,n)=>{const a=[],r=e.length,h=s.length;let l=h-r;if(!(h+r))return a;if(l>0){for(let r=0;r<l;r++){const o=k(n.tagName);e.push(o),a.push(o);const c=Q(n,T.ON_IF);c&&z(o,T.ON_IF,c),V(i,o),it(s[h-l+r],o,t)}for(let i=0;i<h-l;i++)it(s[i],e[i],t)}else{l*=-1;for(let s=0;s<l;s++){const s=e.pop(),i=t.ahe_IfLst;let n;for(let t=0;t<i.length;t++){const e=i[t];if(e.ifElement===s){n=e;break}}n?(o(i,n),W(n.ifParent)):W(s)}for(let i=0;i<h;i++)it(s[i],e[i],t)}return a},at=(t,e)=>{const s="!"===e[0],i=s?e.substring(1):e;return{isInversion:s,valueName:i,isFunction:"function"==typeof t.ahe_cmt[i]}},rt=t=>t.querySelectorAll(`*:not([${j(T.INFO)}])`),ht=(t,e)=>{if(e.tagName!==$.TEXT_VALUE)return!1;if(!e.innerHTML)return!1;const s=at(t,e.innerHTML);return s.isFunction?(t.ahe_nFns.push({textElement:e,valueName:s.valueName,lastData:y}),!0):(t.ahe_nVls.push({textElement:e,valueName:s.valueName,lastData:y}),!0)},ot=(t,e)=>{if(e.tagName!==$.QSI_BIND)return!1;if(!e.innerHTML)return!1;const s=at(t,e.innerHTML);return s.isFunction?(t.ahe_bndFns.push({textElement:e,valueName:s.valueName,lastData:y}),!0):(t.ahe_bndVls.push({textElement:e,valueName:s.valueName,lastData:y}),!0)},lt=(t,e,s)=>{t.ahe_cmt[e](s)},ct=(t,e)=>{const s=Lt(e,T.SOURCE);if(!s)return"";const i=at(t,s);return i.isFunction?(t.ahe_srcCmsFns.push({textElement:e,valueName:i.valueName,lastData:""}),"src "):(t.ahe_srcCms.push({textElement:e,valueName:s,lastData:""}),"src ")},ut=(t,e)=>{const s=Lt(e,T.INJECT_TO);return s?(t.ahe_cmt[s]=e,"inj "):""},dt=(t,e)=>{const s=Lt(e,T.CHANNEL);return s&&e.ahe_isCustomAppElement?(t.ahe_cmt[s]=e,"cnl "):""},_t=(t,e)=>{const s=Dt(t,e,T.ON_CLICK);return s?(e.onclick=e=>lt(t,s,e),"clk "):""},mt=(t,e)=>{const s=Dt(t,e,T.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>lt(t,s,e),"mlv "):""},bt=(t,e)=>{const s=Dt(t,e,T.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>lt(t,s,e),"mer "):""},pt=(t,e)=>{const s=Dt(t,e,T.ON_MOUSE_UP);return s?(e.onmouseup=e=>lt(t,s,e),"mup "):""},ft=(t,e)=>{const s=Dt(t,e,T.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>lt(t,s,e),"mdn "):""},gt=(t,e)=>{const s=Dt(t,e,T.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>lt(t,s,e),"mmv "):""},Et=(t,e)=>{const s=Dt(t,e,T.ON_KEY_DOWN);return s?(e.onkeydown=e=>lt(t,s,e),"kdn "):""},Ct=(t,e)=>{const s=Dt(t,e,T.ON_KEY_UP);return s?(e.onkeyup=e=>lt(t,s,e),"kup "):""},Nt=(t,e)=>{const s=Dt(t,e,T.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>lt(t,s,e),"dbc "):""},Ot=(t,e)=>{const s=Dt(t,e,T.ON_SCROLL);return s?(e.onscroll=e=>lt(t,s,e),"scl "):""},At=(t,e)=>{const s=Dt(t,e,T.ON_WHEEL);return s?(e.onwheel=e=>lt(t,s,e),"whl "):""},yt=(t,e)=>{const s=Dt(t,e,T.ON_CHANGE);return s?(e.onchange=e=>lt(t,s,e),"chg "):""},Dt=(t,e,s)=>{const i=Q(e,s);return i?(It(t,i,e),q(e,s),i):""},Lt=(t,e)=>{const s=Q(t,e);return s?(q(t,e),s):""},vt=(t,e)=>{const s=Q(e,T.ON_HANDLE);return s?(It(t,s,e),q(e,T.ON_HANDLE),"elt "):""},It=(t,e,s)=>{const i=t.ahe_cmt[e];i&&(i.htmlElements||(i.htmlElements={}),i.htmlElements[t.ahe_nmr]||(i.htmlElements[t.ahe_nmr]=[]),t.ahe_clr.collect(t.beforeDestroy$().subscribe((t=>t&&(i.htmlElements={})))),i.htmlElements[t.ahe_nmr].push(s))},Tt=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nVls.length;s++){const i=t.ahe_nVls[s],n=e[i.valueName];i.lastData!==n&&(i.textElement.innerHTML=n,i.lastData=n)}},$t=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndVls.length;s++){const i=t.ahe_bndVls[s],n=e[i.valueName];i.lastData!==n&&(i.textElement.textContent=n,i.lastData=n)}},wt=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCms.length;s++){const i=t.ahe_srcCms[s],n=e[i.valueName]??"";i.lastData!==n&&(i.textElement.src=n,i.lastData=n)}},Ft=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCmsFns.length;s++){const i=t.ahe_srcCmsFns[s],n=e[i.valueName]()??"";i.lastData!==n&&(i.textElement.src=n,i.lastData=n)}},Mt=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nFns.length;s++){const i=t.ahe_nFns[s],n=e[i.valueName]();i.lastData!==n&&(i.textElement.innerHTML=n,i.lastData=n)}},St=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndFns.length;s++){const i=t.ahe_bndFns[s],n=e[i.valueName]();i.lastData!==n&&(i.textElement.textContent=n,i.lastData=n)}},Ut=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_IfLst.length;s++){const i=t.ahe_IfLst[s];let n=i.isFunction?!!e[i.valueName]():!!e[i.valueName];if(i.isInversion&&(n=!n),n===i.oldCondition)continue;i.oldCondition=n;const a=i.ifParent.contains(i.ifElement);n?a||V(i.ifParent,i.ifElement):a&&W(i.ifElement)}},Ht=t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_ClsIfLst.length;s++){const{classConditions:i,element:n}=t.ahe_ClsIfLst[s];for(let t=0;t<i.length;t++){const s=i[t];let a;if(s.isConditionDisabled)a=I.TRUE;else{let t=s.isFunction?!!e[s.conditionName]():!!e[s.conditionName];s.isInversion&&(t=!t),a=t?I.TRUE:I.FALSE}if(a===s.oldCondition)continue;s.oldCondition=a;const{firstClassName:r,secondClassName:h}=s;h?a===I.TRUE?(B(n,[r]),x(n,[h])):(B(n,[h]),x(n,[r])):s.isConditionDisabled||a===I.TRUE?B(n,[r]):x(n,[r])}}},Pt=t=>{const e=t.ahe_ForOfLst,s=t.ahe_cmt;for(let i=0;i<e.length;i++){const n=e[i],a=nt(t,n.children,s[n.valueName],n.parent,n.template);G(t,a)}},kt=t=>{t.ahe_nFns.length=0,t.ahe_srcCmsFns.length=0,t.ahe_srcCms.length=0,t.ahe_nVls.length=0,t.ahe_bndFns.length=0,t.ahe_bndVls.length=0,t.ahe_IfLst.length=0,t.ahe_ClsIfLst.length=0,t.ahe_ForOfLst.length=0,t.innerHTML=""};class Rt{constructor(t,e){this.tableTag=t,this.tableName=e}injectToElement(t){return new xt(this.tableTag,this.tableName,t)}injectToId(t){return this.injectToElement(h.getElementById(t))}}class xt{constructor(t,e,s){this.tableTag=t,this.tableName=e,this.parent=s}waitTable(){return new Promise(((t,e)=>{this.tableName?this.tableTag?this.parent?(g.pipe().refine((t=>!!t&&t.getTableName()===this.tableName)).subscribe((e=>{const s=new Bt(e);t(s)})),Y((()=>{this.parent.innerHTML=this.tableTag}))):e("parent is not present"):e("tableTag is not present"):e("tableName is not present")}))}}class Bt{constructor(t){this.table=t}setData(t){this.table.setOptions(t)}setListener(t){t&&(this.cellListener=t,E.pipe().refine((t=>!!t&&t.tableName===this.table.getTableName())).subscribe((t=>{this.cellListener(t)})))}}var Vt;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(Vt||(Vt={}));const Wt=new p(Vt.EN),Xt=new class{get currentLocation(){return Wt.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return Wt.subscribe(t)}setLocation(t){Wt.next(t)}destroy(){Wt.destroy()}},Kt=[P(class{constructor(t){var e;this.root=t,this.name=t.tagName,this.tableName=(e=t)?e.getAttribute("table-name"):""}onCreate(){}onInit(){this.handleMainChanel(),g.next(this)}handleMainChanel(){this.mainChanel=this.root.getChannel(this.main)}onDestroy(){}setOptions(t){t.tableName=this.tableName,this.root.sendToChannel(this.mainChanel,t)}getTableName(){return this.tableName}},O,"<app-main qsi-inject_to='main'></app-main>"),P(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-header","<header class='c-F-G5E_t xVHgISTwi'><app-row qsi-for='rows'></app-row></header>"),P(class{constructor(t){this.root=t,this.name=t.tagName}onCreate(){this.root.transferToChannel((()=>this.headerChanel),(t=>[{id:0,isEditDisabled:!0,arr:t.header}])),this.root.transferToChannel((()=>this.bodyChanel),(t=>{const e=[];for(let s=0;s<t.body.length;s++){const i=t.body[s];e.push({id:s+1,arr:i,tableName:t.tableName})}return e})),this.root.transferToChannel((()=>this.footerChanel),(t=>t.footer))}onInit(){this.initHeaderChanel(),this.initBodyChanel(),this.initFooterChanel()}initHeaderChanel(){this.headerChanel=this.root.getChannel(this.header)}initBodyChanel(){this.bodyChanel=this.root.getChannel(this.body)}initFooterChanel(){this.footerChanel=this.root.getChannel(this.footer)}onDestroy(){}},"app-main","<main class='YznW6Wz4ww'><app-header qsi-inject_to='header'></app-header><app-body qsi-inject_to='body'></app-body><app-footer qsi-inject_to='footer'></app-footer></main>"),P(class{constructor(t){this.root=t,this.name=t.tagName,this.text=""}onCreate(){this.root.onMessage$().subscribe((t=>{this.text=t,this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-footer","<footer class='j_1-bGczy'><qsi-bind>text</qsi-bind></footer>"),P(class{constructor(t){this.root=t,this.name=t.tagName,this.rows=[]}onCreate(){this.root.onMessage$().subscribe((t=>{this.rows.length=0,this.rows.push(...t),this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-body","<div class='a_MsTs0Io'><app-row qsi-for='rows'></app-row></div>"),P(class{constructor(t){this.root=t,this.name=t.tagName,this.cells=[]}onCreate(){this.root.onMessage$().subscribe((t=>{this.cells.length=0,this.id=t.id;for(let e=0;e<t.arr.length;e++){const s=t.arr[e];this.cells.push({id:{x:e,y:this.id,tableName:t.tableName},isEditDisabled:!!t.isEditDisabled,value:s})}this.root.detectChanges()}))}onInit(){}onDestroy(){}},"app-row","<div class='W_mcjtu-we'><app-cell qsi-for='cells'></app-cell></div>"),P(class{constructor(t){this.root=t,this.name=t.tagName,this.data="",this.isEdit=!1}onCreate(){this.root.onMessage$().subscribe((t=>{this.isEditDisabled=!!t.isEditDisabled,this.id=t.id,this.id.data=t.value,this.data=t.value,X(this.input,this.data),this.root.title=this.data,this.root.detectChanges()}))}onInit(){}onDestroy(){}onDblClick(){this.isEditDisabled||(this.isEdit=!0,X(this.input,this.data),this.root.detectChanges(),this.input.focus())}onKeyDown(t){"enter"===t.key.toLowerCase()&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}onChange(){this.isEdit=!1,this.setData(),this.root.detectChanges()}onMouseLeave(){this.isEdit&&(this.isEdit=!1,this.setData(),this.root.detectChanges())}setData(){var t;this.data=(t=this.input,t?.value),this.data=this.data?this.data:"",this.id.data!==this.data&&(this.root.title=this.data,this.id.data=this.data,E.next(this.id))}isPointer(){return!this.isEdit&&!this.isEditDisabled}},"app-cell","<div class='fdQeAyh-p Or4cz0YAe pVfg0-b-r' qsi-cls='tSX9Hpz_q:isPointer' qsi-dblclick='onDblClick' qsi-mouseleave='onMouseLeave'><div class='uA3-0_9iwq'><label qsi-if='isEdit'><input class='Xmb_Sg1ju xVHgISTwi' qsi-change='onChange' qsi-inject_to='input' qsi-keydown='onKeyDown'></label><div qsi-if='!isEdit'><qsi-bind>data</qsi-bind></div></div></div>")];const Yt=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new p(""),r.addEventListener("popstate",this.popstate),this.popState()}set(t){this.isDestroyed||(r.history.pushState({},"",t),this.popState())}setWithoutHistory(t){this.isDestroyed||(r.history.replaceState({},"",t),this.popState())}subscribe(t){if(!this.isDestroyed)return this.state$.subscribe(t)}destroy(){r.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const t=r.location.pathname;this.state$.next(t)}};var jt;!function(t){t.SHOW="SHOW",t.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",t.HIDDEN="HIDDEN"}(jt||(jt={}));let Qt=jt.SHOW;const zt=new p(""),qt=new p(null);let Jt;const Gt=new f;H([P(class{},$.TEXT_VALUE.toLowerCase(),""),P(class{},$.QSI_BIND.toLowerCase(),""),P(class{constructor(t){this.root=t,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){Gt.unsubscribeAll()}process(){Gt.collect(zt.pipe().refine((t=>!!t)).subscribe((t=>this.setCommand(t))),Yt.subscribe((t=>this.setHistory(t)))),qt.getValue()?this.init():qt.pipe().refine((t=>!!t)).setOnce().subscribe((()=>this.init()))}init(){let t=qt.getValue();Jt=t.defaultCmd;const e=t.routes;for(let t=0;t<e.length;t++)this.cmd[e[t].command]=e[t],this.path[e[t].path]=e[t];this.setCommand(Jt)}setCommand(t){switch(this.setRoute(this.cmd[t]),Qt){case jt.HIDDEN:break;case jt.SHOW:Yt.set(this.cmd[t].path);break;case jt.SHOW_WITHOUT_HISTORY:Yt.setWithoutHistory(this.cmd[t].path)}}setHistory(t){t in this.path&&this.setRoute(this.path[t])}setRoute(t){const e=t.component.qsi_app_tag_name;this.root.innerHTML=`<${e}></${e}>`}},$.APP_ROUTE.toLowerCase(),"")]);const Zt=new class{constructor(){this.isComponentMode=!1}register(t){H(t,!0)}run(t){this.isComponentMode=!!t,Y((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=k(O))}start(){const t=R(S.join("")),e=R(".YznW6Wz4ww {position: relative;padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 100%;height: 100%;display: flex;flex-flow: column nowrap;border: solid 1px;}.YznW6Wz4ww * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.YznW6Wz4ww .c-F-G5E_t {width: 100%;height: 80px;font-weight: bold;border-top: solid 1px;user-select: none;}.YznW6Wz4ww .a_MsTs0Io {width: 100%;height: 100%;display: flex;flex-flow: column nowrap;}.YznW6Wz4ww .j_1-bGczy {width: 100%;height: 80px;}.YznW6Wz4ww .W_mcjtu-we {width: 100%;height: 60px;min-height: 40px;display: flex;flex-flow: row nowrap;border-left: solid 1px;border-bottom: solid 1px;}.YznW6Wz4ww .fdQeAyh-p {width: 100%;height: 100%;display: flex;flex-flow: row nowrap;border-right: solid 1px;padding: 5px;}.YznW6Wz4ww .Xmb_Sg1ju {width: 100%;height: 100%;border: none;outline: 0;}.YznW6Wz4ww .uA3-0_9iwq {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}.YznW6Wz4ww .xVHgISTwi {background: rgba(0, 0, 0, 0.1);}.YznW6Wz4ww .Or4cz0YAe {justify-content: center;}.YznW6Wz4ww .pVfg0-b-r {align-items: center;}.YznW6Wz4ww .tSX9Hpz_q {cursor: pointer;}");V(h.head,t),V(h.head,e),!this.isComponentMode&&V(h.body,this.appElement)}};a.init(),Xt.setLocation(Vt.EN),Zt.register(Kt),Zt.run(!0),r.TableController=new class{createTable(t){return new Rt(`<${O} table-name='${t}'></${O}>`,t)}}})();