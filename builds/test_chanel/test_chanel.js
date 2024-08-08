(()=>{"use strict";let e,t,s,n,i;const a=new class{constructor(a,r,h,o){t=a,s=r,n=h,i=o,e=this}set major(e){s=e}set minor(e){n=e}set patch(e){i=e}set name(e){t=e}get version(){return`${s}.${n}.${i}`}get name(){return t}get description(){return`[${t} version: ${this.version}]`.toUpperCase()}init(t){t||function(...t){e?console.log(e.description,...t):console.log("APP",...t)}("STARTED")}}("test_chanel",1,0,0);var r;!function(e){e.EN="EN",e.UA="UA",e.HE="HE",e.RU="RU"}(r||(r={}));const h=(e,t)=>{const s=e.indexOf(t);return-1!==s&&(e[s]=e[e.length-1],e.length=e.length-1,!0)},o=e=>"next"in e?t=>e.next(t):e;class l{constructor(e){this.pipe=e,this.counter=e.chain.length?e.chain.length:0}case(e){this.counter++;const t=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,e(n.payload)&&(n.isBreak=!0),t!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.case(e[t]);return this}}class c{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}processChain(e){const t=this.chain,s=this.flow;for(let e=0;e<t.length;e++){if(s.isUnsubscribe=!1,s.isAvailable=!1,t[e](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return e(s.payload)}setOnce(){return this.push((e=>{this.listener(e.payload),e.isUnsubscribe=!0}))}unsubscribeBy(e){return this.push((t=>{t.isAvailable=!0,e(t.payload)&&(t.isUnsubscribe=!0)}))}refine(e){return this.push((t=>{e(t.payload)&&(t.isAvailable=!0)}))}pushRefiners(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.refine(e[t]);return this}switch(){return new u(this)}then(e){return this.push((t=>{t.payload=e(t.payload),t.isAvailable=!0}))}serialize(){return this.push((e=>{e.payload=JSON.stringify(e.payload),e.isAvailable=!0}))}deserialize(){return this.push((e=>{e.payload=JSON.parse(e.payload),e.isAvailable=!0}))}push(e){return this.chain.push(e),this}}class u extends l{subscribe(e,t){return this.pipe.subscribe(e,t)}}class _ extends c{get order(){return this._order}constructor(e,t){super(),this._order=0,this.isPaused=!1,this.isPipe=!1,this.errorHandler=(e,t)=>{console.log(`(Unit of SubscribeObject).send(${e}) ERROR:`,t)},this.observable=e,this.isPipe=!!t}subscribe(e,t){return this.listener=(e=>{if(Array.isArray(e)){const t=[];for(let s=0;s<e.length;s++)t.push(o(e[s]));return e=>{for(let s=0;s<t.length;s++)t[s](e)}}return o(e)})(e),t&&(this.errorHandler=t),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chain.length=0)}send(e){try{this.flow.payload=e,this.flow.isBreak=!1,this.processValue(e)}catch(t){this.errorHandler(e,t)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}set order(e){this._order=e}processValue(e){const t=this.listener;return t?this.observable&&!this.isPaused?this.isPipe?this.processChain(t):t(e):void 0:this.unsubscribe()}}class d{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}pushFilters(e){if(!Array.isArray(e))return this;for(let t=0;t<e.length;t++)this.filter(e[t]);return this}filter(e){return this.push((t=>{e(t.payload)&&(t.isAvailable=!0)}))}push(e){return this.chain.push(e),this}switch(){return new m(this)}processChain(e){const t=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=e,s.isBreak=!1;try{for(let e=0;e<t.length;e++){if(s.isAvailable=!1,t[e](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(e){return this.errHandler?this.errHandler(e,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",e),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(e){this.errHandler=e}}class m extends l{}class p{constructor(e){this.value=e,this.listeners=[],this.isStop=!0,this.isKilled=!1,this.isProcess=!1,this.trash=[],this.filters=new d}addFilter(e){return e&&this.filters.addErrorHandler(e),this.filters}disable(){this.isStop=!1}enable(){this.isStop=!0}get isEnable(){return this.isStop}next(e){if(!this.isKilled&&this.isStop&&(this.filters.isEmpty||this.filters.processChain(e).isOK)){this.isProcess=!0,this.value=e;for(let t=0;t<this.listeners.length;t++)this.listeners[t].send(e);this.isProcess=!1,this.trash.length&&this.handleListenersForUnsubscribe()}}stream(e){if(!this.isKilled&&this.isStop)for(let t=0;t<e.length;t++)this.next(e[t])}get isDestroyed(){return this.isKilled}unSubscribe(e){this.isKilled||(this.isProcess&&e?this.trash.push(e):this.listeners&&h(this.listeners,e))}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this.isKilled=!0}unsubscribeAll(){this.isKilled||(this.listeners.length=0)}getValue(){if(!this.isKilled)return this.value}size(){return this.isKilled?0:this.listeners.length}subscribe(e,t){if(!this.isListener(e))return;const s=new _(this,!1);return this.addObserver(s,e,t),s}addObserver(e,t,s){e.subscribe(t,s),this.listeners.push(e)}isListener(e){return!this.isKilled&&!!e}pipe(){if(this.isKilled)return;const e=new _(this,!0);return this.listeners.push(e),e}handleListenersForUnsubscribe(){const e=this.trash.length;for(let t=0;t<e;t++)this.unSubscribe(this.trash[t]);this.trash.length=0}}class g{constructor(){this.list=[],this.isKilled=!1}collect(...e){this.isKilled||this.list.push(...e)}unsubscribe(e){this.isKilled||(e?.unsubscribe(),h(this.list,e))}unsubscribeAll(){if(!this.isKilled)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this.isKilled?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this.isKilled=!0}get isDestroyed(){return this.isKilled}}const b=new p(r.EN),f=new class{get currentLocation(){return b.getValue()}getLocalizedText(e,t){return e[t]}getLocalizedTextByLocation(e){return e[this.currentLocation]}onLocationChange(e){return b.subscribe(e)}setLocation(e){b.next(e)}destroy(){b.destroy()}},E=window,N=document;let C=new Uint8Array(16);E.top;const y=`${E.crypto.getRandomValues(C),Array.from(C,(function(e){return`0${e.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,A="_______$$bool",O=[0];let I=[];const L=1e4;var D,v,S;!function(e){e.UNDEFINED="",e.TRUE="TRUE",e.FALSE="FALSE"}(D||(D={})),function(e){e.INFO="i",e.SOURCE="src",e.INJECT_TO="inject_to",e.CHANNEL="channel",e.ON_CLICK="click",e.ON_CHANGE="change",e.ON_KEY_DOWN="keydown",e.ON_KEY_UP="keyup",e.ON_KEY_DBL_CLICK="dblclick",e.ON_SCROLL="scroll",e.ON_WHEEL="wheel",e.ON_MOUSE_LEAVE="mouseleave",e.ON_MOUSE_ENTER="mouseenter",e.ON_MOUSE_UP="mouseup",e.ON_MOUSE_DOWN="mousedown",e.ON_MOUSE_MOVE="mousemove",e.ON_HANDLE="handle",e.ON_IF="if",e.CLASS_IF="cls",e.FOR="for"}(v||(v={})),function(e){e.TEXT_VALUE="TXT-VAL",e.QSI_BIND="QSI-BIND",e.APP_ROUTE="QSI-ROUTE"}(S||(S={}));const T=e=>N.createElement(e),M=e=>{const t=T("style");return t.innerHTML=e,t},$=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.remove(t[s])},F=(e,t)=>{if(e)for(let s=0;s<t.length;s++)e.classList.add(t[s])},P=(e,t)=>{t&&e?.appendChild(t)},R=e=>{e?.remove()},U=new p(null),H=e=>{U.pipe().refine((e=>!!e)).setOnce().subscribe(e),U.pipe().unsubscribeBy((e=>!!e)).setOnce().subscribe((()=>{const e=()=>{U.next(N.body),N.removeEventListener("DOMContentLoaded",e)};N.addEventListener("DOMContentLoaded",e)})),U.next(N.body)},w=e=>`qsi-${e}`,K=(e,t)=>e?e.getAttribute(w(t)):"",x=(e,t,s)=>{e&&e.setAttribute(w(t),s)},k=(e,t)=>{e&&e.removeAttribute(w(t))},V=e=>{const t=q(e);for(let s=0;s<t.length;s++)B(e,Y(e,t[s]))},B=(e,t)=>{if(!t.length)return;let s="[";if(t.length>1){for(let n=0;n<t.length;n++){const i=t[n];s+=X(e,i),x(i,v.INFO,s.trim()+"]"),i.ahe_pnt_chl=e,i.ahe_onPChlRdy$.next(e)}return}const n=t[0];J(e,n)?x(n,v.INFO,s+"var]"):G(e,n)?x(n,v.INFO,s+"bind]"):(s+=se(e,n),s+=ne(e,n),s+=te(e,n),s+=ie(e,n),s+=ae(e,n),s+=re(e,n),s+=he(e,n),s+=oe(e,n),s+=le(e,n),s+=ce(e,n),s+=ue(e,n),s+=_e(e,n),s+=de(e,n),s+=me(e,n),s+=pe(e,n),s+=fe(e,n),s+=X(e,n),s+=W(e,n),x(n,v.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=e,n.ahe_onPChlRdy$.next(e)))},W=(e,t)=>{let s=K(t,v.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],a={element:t,classConditions:i};for(let t=0;t<n.length;t++){const s=n[t];if(s.includes("?")){const t=s.split("?"),n=j(e,t[0]),a=t[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:D.UNDEFINED,firstClassName:a[0],secondClassName:a[1]})}else if(s.includes(":")){const t=s.split(":"),n=j(e,t[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:D.UNDEFINED,firstClassName:t[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:D.UNDEFINED,firstClassName:s,secondClassName:""})}return e.ahe_ClsIfLst.push(a),k(t,v.CLASS_IF),"cls "},X=(e,t)=>{let s=K(t,v.ON_IF);if(!s)return"";const n=Z(),i=t.parentElement,a=j(e,s);return e.ahe_IfLst.push({ifElement:t,valueName:a.valueName,ifParent:n,oldCondition:!1,isInversion:a.isInversion,isFunction:a.isFunction}),i.insertBefore(n,t),R(t),k(t,v.ON_IF),x(n,v.INFO,"[ifp]"),"ifc "};(()=>{for(let e=0;e<L;e++)I.push(T(S.TEXT_VALUE))})();const Z=()=>I.length?I.pop():T(S.TEXT_VALUE),Y=(e,t)=>{if(t.tagName===S.TEXT_VALUE)return(O[0]=t)&&O;if(t.tagName===S.QSI_BIND)return(O[0]=t)&&O;if(!e.isAppElement(t))return(O[0]=t)&&O;const s=K(t,v.FOR);if(!s)return(O[0]=t)&&O;const n=e.ahe_cmt[s];if(!n)return(O[0]=t)&&O;const i=Z(),a=t.parentElement,r=Q(e,[],n,i,t);return x(i,v.INFO,"[for-of]"),a.insertBefore(i,t),R(t),k(t,v.FOR),e.ahe_ForOfLst.push({parent:i,template:t,children:r,valueName:s}),r},z=(e,t,s)=>{s.isAppElement(t)&&t.sendMessage(e)},Q=(e,t,s,n,i)=>{const a=[],r=t.length,o=s.length;let l=o-r;if(!(o+r))return a;if(l>0){for(let r=0;r<l;r++){const h=T(i.tagName);t.push(h),a.push(h);const c=K(i,v.ON_IF);c&&x(h,v.ON_IF,c),P(n,h),z(s[o-l+r],h,e)}for(let n=0;n<o-l;n++)z(s[n],t[n],e)}else{l*=-1;for(let s=0;s<l;s++){const s=t.pop(),n=e.ahe_IfLst;let i;for(let e=0;e<n.length;e++){const t=n[e];if(t.ifElement===s){i=t;break}}i?(h(n,i),R(i.ifParent)):R(s)}for(let n=0;n<o;n++)z(s[n],t[n],e)}return a},j=(e,t)=>{const s="!"===t[0],n=s?t.substring(1):t;return{isInversion:s,valueName:n,isFunction:"function"==typeof e.ahe_cmt[n]}},q=e=>e.querySelectorAll(`*:not([${w(v.INFO)}])`),J=(e,t)=>{if(t.tagName!==S.TEXT_VALUE)return!1;if(!t.innerHTML)return!1;const s=j(e,t.innerHTML);return s.isFunction?(e.ahe_nFns.push({textElement:t,valueName:s.valueName,lastData:y}),!0):(e.ahe_nVls.push({textElement:t,valueName:s.valueName,lastData:y}),!0)},G=(e,t)=>{if(t.tagName!==S.QSI_BIND)return!1;if(!t.innerHTML)return!1;const s=j(e,t.innerHTML);return s.isFunction?(e.ahe_bndFns.push({textElement:t,valueName:s.valueName,lastData:y}),!0):(e.ahe_bndVls.push({textElement:t,valueName:s.valueName,lastData:y}),!0)},ee=(e,t,s)=>{e.ahe_cmt[t](s)},te=(e,t)=>{const s=be(t,v.SOURCE);if(!s)return"";const n=j(e,s);return n.isFunction?(e.ahe_srcCmsFns.push({textElement:t,valueName:n.valueName,lastData:""}),"src "):(e.ahe_srcCms.push({textElement:t,valueName:s,lastData:""}),"src ")},se=(e,t)=>{const s=be(t,v.INJECT_TO);return s?(e.ahe_cmt[s]=t,"inj "):""},ne=(e,t)=>{const s=be(t,v.CHANNEL);return s&&t.ahe_isCustomAppElement?(e.ahe_cmt[s]=t,"cnl "):""},ie=(e,t)=>{const s=ge(e,t,v.ON_CLICK);return s?(t.onclick=t=>ee(e,s,t),"clk "):""},ae=(e,t)=>{const s=ge(e,t,v.ON_MOUSE_LEAVE);return s?(t.onmouseleave=t=>ee(e,s,t),"mlv "):""},re=(e,t)=>{const s=ge(e,t,v.ON_MOUSE_ENTER);return s?(t.onmouseenter=t=>ee(e,s,t),"mer "):""},he=(e,t)=>{const s=ge(e,t,v.ON_MOUSE_UP);return s?(t.onmouseup=t=>ee(e,s,t),"mup "):""},oe=(e,t)=>{const s=ge(e,t,v.ON_MOUSE_DOWN);return s?(t.onmousedown=t=>ee(e,s,t),"mdn "):""},le=(e,t)=>{const s=ge(e,t,v.ON_MOUSE_MOVE);return s?(t.onmousemove=t=>ee(e,s,t),"mmv "):""},ce=(e,t)=>{const s=ge(e,t,v.ON_KEY_DOWN);return s?(t.onkeydown=t=>ee(e,s,t),"kdn "):""},ue=(e,t)=>{const s=ge(e,t,v.ON_KEY_UP);return s?(t.onkeyup=t=>ee(e,s,t),"kup "):""},_e=(e,t)=>{const s=ge(e,t,v.ON_KEY_DBL_CLICK);return s?(t.ondblclick=t=>ee(e,s,t),"dbc "):""},de=(e,t)=>{const s=ge(e,t,v.ON_SCROLL);return s?(t.onscroll=t=>ee(e,s,t),"scl "):""},me=(e,t)=>{const s=ge(e,t,v.ON_WHEEL);return s?(t.onwheel=t=>ee(e,s,t),"whl "):""},pe=(e,t)=>{const s=ge(e,t,v.ON_CHANGE);return s?(t.onchange=t=>ee(e,s,t),"chg "):""},ge=(e,t,s)=>{const n=K(t,s);return n?(Ee(e,n,t),k(t,s),n):""},be=(e,t)=>{const s=K(e,t);return s?(k(e,t),s):""},fe=(e,t)=>{const s=K(t,v.ON_HANDLE);return s?(Ee(e,s,t),k(t,v.ON_HANDLE),"elt "):""},Ee=(e,t,s)=>{const n=e.ahe_cmt[t];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[e.ahe_nmr]||(n.htmlElements[e.ahe_nmr]=[]),e.ahe_clr.collect(e.beforeDestroy$().subscribe((e=>e&&(n.htmlElements={})))),n.htmlElements[e.ahe_nmr].push(s))},Ne=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nVls.length;s++){const n=e.ahe_nVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}},Ce=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndVls.length;s++){const n=e.ahe_bndVls[s],i=t[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}},ye=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCms.length;s++){const n=e.ahe_srcCms[s],i=t[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}},Ae=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_srcCmsFns.length;s++){const n=e.ahe_srcCmsFns[s],i=t[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}},Oe=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_nFns.length;s++){const n=e.ahe_nFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}},Ie=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_bndFns.length;s++){const n=e.ahe_bndFns[s],i=t[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}},Le=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_IfLst.length;s++){const n=e.ahe_IfLst[s];let i=n.isFunction?!!t[n.valueName]():!!t[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const a=n.ifParent.contains(n.ifElement);i?a||P(n.ifParent,n.ifElement):a&&R(n.ifElement)}},De=e=>{const t=e.ahe_cmt;for(let s=0;s<e.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=e.ahe_ClsIfLst[s];for(let e=0;e<n.length;e++){const s=n[e];let a;if(s.isConditionDisabled)a=D.TRUE;else{let e=s.isFunction?!!t[s.conditionName]():!!t[s.conditionName];s.isInversion&&(e=!e),a=e?D.TRUE:D.FALSE}if(a===s.oldCondition)continue;s.oldCondition=a;const{firstClassName:r,secondClassName:h}=s;h?a===D.TRUE?(F(i,[r]),$(i,[h])):(F(i,[h]),$(i,[r])):s.isConditionDisabled||a===D.TRUE?F(i,[r]):$(i,[r])}}},ve=e=>{const t=e.ahe_ForOfLst,s=e.ahe_cmt;for(let n=0;n<t.length;n++){const i=t[n],a=Q(e,i.children,s[i.valueName],i.parent,i.template);B(e,a)}},Se=e=>{e.ahe_nFns.length=0,e.ahe_srcCmsFns.length=0,e.ahe_srcCms.length=0,e.ahe_nVls.length=0,e.ahe_bndFns.length=0,e.ahe_bndVls.length=0,e.ahe_IfLst.length=0,e.ahe_ClsIfLst.length=0,e.ahe_ForOfLst.length=0,e.innerHTML=""};let Te=0;function Me(e){class t extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==S.TEXT_VALUE&&this.tagName!==S.QSI_BIND&&(this.ahe_opts=e,this.ahe_cmt=new e.element(this),this.tagName!==S.APP_ROUTE&&(this.ahe_nmr=Te,Te++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new g,this.ahe_onAdt$=new p(!1),this.ahe_bfrIni$=new p(!1),this.ahe_bfrDst$=new p(!1),this.ahe_atrChd$=new p(void 0),this.ahe_bfrDctChg$=new p(!1),this.ahe_onChgDtd$=new p(!1),this.ahe_onMsg$=new p(void 0),this.ahe_onPChlRdy$=new p(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==S.TEXT_VALUE&&this.tagName!==S.QSI_BIND&&(this.tagName!==S.APP_ROUTE?K(this,v.ON_IF)&&!this.ahe_cmt[A]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),V(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((e=>this.ahe_cmt.onMessage(e)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==S.TEXT_VALUE)this.tagName!==S.QSI_BIND&&this.tagName!==S.APP_ROUTE&&(!K(this,v.ON_IF)||this.ahe_cmt[A]?(this.ahe_bfrDst$.next(!0),Se(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[A]=!0);else{if(I.length>=L)return;""==this.innerHTML&&(k(this,v.INFO),I.push(this))}}attributeChangedCallback(e,t,s){this.ahe_atrChd$?.next({name:e,oldValue:t,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(e){return e&&e.htmlElements&&e.htmlElements[this.ahe_nmr]?e.htmlElements[this.ahe_nmr]:[]}detectChanges(e){this.ahe_bfrDctChg$.next(!0),!e&&this.ahe_ForOfLst.length&&ve(this),Le(this),De(this),Ce(this),ye(this),Ae(this),Ie(this),Ne(this),Oe(this),this.ahe_onChgDtd$.next(!0)}sendMessage(e){this.ahe_onMsg$.next(e)}sendMessageToParent(e){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(e),!0)}getChannel(e){if(e&&e.ahe_isCustomAppElement)return e}transferToChannel(e,t){this.onMessage$().pipe().refine((()=>e())).subscribe((s=>{e().sendMessage(t(s))}))}sendToChannel(e,t){e?.sendMessage(t)}isAppElement(e){return!!e?.ahe_isCustomAppElement}collect(...e){this.ahe_clr.collect(...e)}destroy(){Se(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return t}const $e="{display: contents !important;}",Fe=[`html-block ${$e}`],Pe=new p(!1);function Re(e,t){for(let t=0;t<e.length;t++)Fe.push(`${e[t].tagName} ${$e}`),e[t].element.qsi_app_tag_name=e[t].tagName;H((()=>{for(let t=0;t<e.length;t++)customElements.define(e[t].tagName,e[t].target);t&&Pe.next(!0)}))}function Ue(e,t,s){return{tagName:t,target:Me({template:s,element:e}),element:e}}const He=e.name;let we="";for(let e=0;e<He.length;e++){const t=He[e];let s="";for(let e=0;e<26;e++){const n="abcdefghijklmnopqrstuvwxyz"[e];if(n===t.toLowerCase()){s=n;break}}we+=s||"-"}const Ke="app-"+we,xe=[Ue(class{constructor(e){this.root=e,this.name=e.tagName}onMessage(e){console.log(this.root.tagName,"message:",e)}onCreate(){}onInit(){}onDestroy(){}},Ke,"<app-main></app-main>"),Ue(class{constructor(e){this.root=e,this.forElements=[{name:"Sergey"},{name:"Andrey"},{name:"Nik"}],this.name=e.tagName}onCreate(){}onInit(){setTimeout((()=>{this.sendMessageToChildren()}),5e3);const e=["./assets/img/photo_2024-04-06_00-29-23.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHvkoW4YAf73Ea3smStZwvrdxi4sUChgm6VOFHyfJ1Q&s","https://media.licdn.com/dms/image/C4E03AQHjm7BY5INpBA/profile-displayphoto-shrink_200_200/0/1660152384175?e=2147483647&v=beta&t=5XDlbq2DvTVNmAuyCtaPfyqvvraRxC_1mK-u4Lh--ZU"];setTimeout((()=>{this.forElements=[{name:"Sergey",isStudying:!0,age:18,class:"3TI",school:"ZSZnr1",photo:e[0]},{name:"Andrey",isStudying:!0,age:21,class:"4TI",school:"ZSZnr1",photo:e[1]},{name:"Nik",isStudying:!0,age:18,class:"1",school:"СШ#76",photo:e[2]},{name:"Kazashka",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka1",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka2",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka3",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"},{name:"Kazashka4",isStudying:!1,age:18,class:"3TI",school:"ZSZnr1"}],this.root.detectChanges();let t=0;setInterval((()=>{this.forElements=[{name:"Sergey",isStudying:!0,age:18,class:"3TI",school:"ZSZnr1",photo:e[t]}],t++,t>=e.length&&(t=0),this.root.detectChanges()}),2e3)}),1e4)}onDestroy(){}sendMessageToChildren(){this.child1Chanel?.sendMessage("Message by main to child1"),this.child2Chanel?.sendMessage("Message by main to child2"),this.child3Chanel?.sendMessage("Message by main to child3"),this.child4Chanel?.sendMessage("Message by main to child4")}onMessage(e){console.log("MAIN MESSAGE:",e)}},"app-main","<app-child1 qsi-channel='child1Chanel'></app-child1><app-child2 qsi-channel='child2Chanel'></app-child2><app-child3 qsi-channel='child3Chanel'></app-child3><app-child4 qsi-channel='child4Chanel'></app-child4><app-for_element qsi-for='forElements'></app-for_element>"),Ue(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){}onInit(){this.message=this.name;let e=0;setInterval((()=>{this.root.sendMessageToParent(`from Child1 message #${e}`),e++}),1e3)}onDestroy(){}onMessage(e){console.log(e),this.message=e,this.root.detectChanges()}},"app-child1","<div><qsi-bind>message</qsi-bind></div>"),Ue(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().refine((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name}onDestroy(){}},"app-child2","<div><qsi-bind>message</qsi-bind></div>"),Ue(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().refine((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name}onDestroy(){}},"app-child3","<div><qsi-bind>message</qsi-bind></div>"),Ue(class{constructor(e){this.root=e,this.name=e.tagName}onCreate(){this.root.collect(this.root.onMessage$().pipe().refine((e=>!!e)).subscribe((e=>{console.log(e),this.message=e,this.root.detectChanges()})))}onInit(){this.message=this.name}onDestroy(){}},"app-child4","<div><qsi-bind>message</qsi-bind></div>"),Ue(class{constructor(e){this.root=e}onCreate(){this.root.collect(this.root.onMessage$().pipe().refine((e=>!!e)).subscribe((e=>{this.setStudent(e)})))}onInit(){}onDestroy(){}setStudent(e){this.name=e.name??"NOT PRESENT YET",this.age=e.age??NaN,this.photo=e.photo??"",this.isStudying=e.isStudying??!1,this.class=e.class??"NOT PRESENT YET",this.school=e.school??"NOT PRESENT YET",this.root.detectChanges()}},"app-for_element","<div class='b-RHbKWeq'><div><qsi-bind>name</qsi-bind></div><div><qsi-bind>age</qsi-bind></div><div><qsi-bind>isStudying</qsi-bind></div><div><qsi-bind>class</qsi-bind></div><div><qsi-bind>school</qsi-bind></div><img alt='not present' class='sUOTi-f-w' qsi-src='photo' src=''></div>")];const ke=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new p(""),E.addEventListener("popstate",this.popstate),this.popState()}set(e){this.isDestroyed||(E.history.pushState({},"",e),this.popState())}setWithoutHistory(e){this.isDestroyed||(E.history.replaceState({},"",e),this.popState())}subscribe(e){if(!this.isDestroyed)return this.state$.subscribe(e)}destroy(){E.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const e=E.location.pathname;this.state$.next(e)}};var Ve;!function(e){e.SHOW="SHOW",e.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",e.HIDDEN="HIDDEN"}(Ve||(Ve={}));let Be=Ve.SHOW;const We=new p(""),Xe=new p(null);let Ze;const Ye=new g;Re([Ue(class{},S.TEXT_VALUE.toLowerCase(),""),Ue(class{},S.QSI_BIND.toLowerCase(),""),Ue(class{constructor(e){this.root=e,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){Ye.unsubscribeAll()}process(){Ye.collect(We.pipe().refine((e=>!!e)).subscribe((e=>this.setCommand(e))),ke.subscribe((e=>this.setHistory(e)))),Xe.getValue()?this.init():Xe.pipe().refine((e=>!!e)).setOnce().subscribe((()=>this.init()))}init(){let e=Xe.getValue();Ze=e.defaultCmd;const t=e.routes;for(let e=0;e<t.length;e++)this.cmd[t[e].command]=t[e],this.path[t[e].path]=t[e];this.setCommand(Ze)}setCommand(e){switch(this.setRoute(this.cmd[e]),Be){case Ve.HIDDEN:break;case Ve.SHOW:ke.set(this.cmd[e].path);break;case Ve.SHOW_WITHOUT_HISTORY:ke.setWithoutHistory(this.cmd[e].path)}}setHistory(e){e in this.path&&this.setRoute(this.path[e])}setRoute(e){const t=e.component.qsi_app_tag_name;this.root.innerHTML=`<${t}></${t}>`}},S.APP_ROUTE.toLowerCase(),"")]);const ze=new class{constructor(){this.isComponentMode=!1}register(e){Re(e,!0)}run(e){this.isComponentMode=!!e,H((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=T(Ke))}start(){const e=M(Fe.join("")),t=M(".b-RHbKWeq {width: 200px;height: 300px;box-sizing: border-box;border: 1px solid #062c46;border-radius: 4px;background-color: rgba(0, 100, 100, 0.2);padding: 10px;margin: 10px;}.sUOTi-f-w {width: 70px;height: 70px;min-width: 70px;min-height: 70px;border: 1px solid #062c46;border-radius: 4px;object-fit: cover;}");P(N.head,e),P(N.head,t),!this.isComponentMode&&P(N.body,this.appElement)}};a.init(),f.setLocation(r.EN),ze.register(xe),ze.run()})();