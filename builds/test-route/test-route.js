(()=>{"use strict";const t=window,e=document;let s=new Uint8Array(16);t.top;const n=`${t.crypto.getRandomValues(s),Array.from(s,(function(t){return`0${t.toString(16)}`.slice(-2)})).join("")}${Date.now()}`,i=":",r="_______$$bool",a=[0];let o=[];const h=1e4;var l,c,u;function _(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)}function m(t){return"next"in t?e=>t.next(e):t}!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(l||(l={})),function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.CHANNEL="channel",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(c||(c={})),function(t){t.TEXT_VALUE="TXT-VAL",t.QSI_BIND="QSI-BIND",t.APP_ROUTE="QSI-ROUTE"}(u||(u={}));class d{constructor(t){this.pipe=t,this.counter=t.chain.length?t.chain.length:0}case(t){this.counter++;const e=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,t(n.payload)&&(n.isBreak=!0),e!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.case(t[e]);return this}}class f{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}push(t){return this.chain.push(t),this}setOnce(){return this.push((t=>{this.listener(t.payload),t.isUnsubscribe=!0}))}unsubscribeBy(t){return this.push((e=>{e.isAvailable=!0,t(e.payload)&&(e.isUnsubscribe=!0)}))}refine(t){return this.push((e=>{t(e.payload)&&(e.isAvailable=!0)}))}pushRefiners(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.refine(t[e]);return this}switch(){return new p(this)}then(t){return this.push((e=>{e.payload=t(e.payload),e.isAvailable=!0}))}serialize(){return this.push((t=>{t.payload=JSON.stringify(t.payload),t.isAvailable=!0}))}deserialize(){return this.push((t=>{t.payload=JSON.parse(t.payload),t.isAvailable=!0}))}processChain(t){const e=this.chain,s=this.flow;for(let t=0;t<e.length;t++){if(s.isUnsubscribe=!1,s.isAvailable=!1,e[t](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return t(s.payload)}}class p extends d{subscribe(t,e){return this.pipe.subscribe(t,e)}}class b extends f{constructor(t,e){super(),this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this._order=0,this.isPaused=!1,this.isPipe=!1,this.observable=t,this.isPipe=!!e}subscribe(t,e){return this.listener=function(t){if(Array.isArray(t)){const e=[];for(let s=0;s<t.length;s++)e.push(m(t[s]));return t=>{for(let s=0;s<e.length;s++)e[s](t)}}return m(t)}(t),e&&(this.errorHandler=e),this}unsubscribe(){this.observable&&(this.observable.unSubscribe(this),this.observable=null,this.listener=null,this.chain.length=0)}send(t){try{this.flow.payload=t,this.flow.isBreak=!1,this.processValue(t)}catch(e){this.errorHandler(t,e)}}resume(){this.isPaused=!1}pause(){this.isPaused=!0}get order(){return this._order}set order(t){this._order=t}processValue(t){const e=this.listener;return e?this.observable&&!this.isPaused?this.isPipe?this.processChain(e):e(t):void 0:this.unsubscribe()}}class E{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(t){return this.chain.push(t),this}filter(t){return this.push((e=>{t(e.payload)&&(e.isAvailable=!0)}))}pushFilters(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.filter(t[e]);return this}switch(){return new g(this)}processChain(t){const e=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=t,s.isBreak=!1;try{for(let t=0;t<e.length;t++){if(s.isAvailable=!1,e[t](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(t){return this.errHandler?this.errHandler(t,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",t),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(t){this.errHandler=t}}class g extends d{}class N{constructor(t){this.value=t,this.listeners=[],this.isStop=!0,this.isKilled=!1,this.isProcess=!1,this.trash=[],this.filters=new E}addFilter(t){return t&&this.filters.addErrorHandler(t),this.filters}disable(){this.isStop=!1}enable(){this.isStop=!0}get isEnable(){return this.isStop}next(t){if(!this.isKilled&&this.isStop&&(this.filters.isEmpty||this.filters.processChain(t).isOK)){this.isProcess=!0,this.value=t;for(let e=0;e<this.listeners.length;e++)this.listeners[e].send(t);this.isProcess=!1,this.trash.length&&this.handleListenersForUnsubscribe()}}stream(t){if(!this.isKilled&&this.isStop)for(let e=0;e<t.length;e++)this.next(t[e])}handleListenersForUnsubscribe(){const t=this.trash.length;for(let e=0;e<t;e++)this.unSubscribe(this.trash[e]);this.trash.length=0}unSubscribe(t){this.isKilled||(this.isProcess&&t?this.trash.push(t):this.listeners&&_(this.listeners,t))}destroy(){this.value=null,this.unsubscribeAll(),this.listeners=null,this.isKilled=!0}unsubscribeAll(){this.isKilled||(this.listeners.length=0)}getValue(){if(!this.isKilled)return this.value}size(){return this.isKilled?0:this.listeners.length}subscribe(t,e){if(!this.isListener(t))return;const s=new b(this,!1);return this.addObserver(s,t,e),s}addObserver(t,e,s){t.subscribe(e,s),this.listeners.push(t)}isListener(t){return!this.isKilled&&!!t}pipe(){if(this.isKilled)return;const t=new b(this,!0);return this.listeners.push(t),t}get isDestroyed(){return this.isKilled}}class C{constructor(){this.list=[],this.isKilled=!1}collect(...t){this.isKilled||this.list.push(...t)}unsubscribe(t){this.isKilled||(t?.unsubscribe(),_(this.list,t))}unsubscribeAll(){if(!this.isKilled)for(;this.list.length>0;)this.unsubscribe(this.list.pop())}size(){return this.isKilled?0:this.list.length}destroy(){this.unsubscribeAll(),this.list.length=0,this.list=0,this.isKilled=!0}get isDestroyed(){return this.isKilled}}function A(t){return`qsi-${t}`}function O(t,e){return t?t.getAttribute(A(e)):""}function y(t,e,s){t&&t.setAttribute(A(e),s)}function I(t,e){t&&t.removeAttribute(A(e))}function L(t,e){if(!e.length)return;let s="[";if(e.length>1){for(let n=0;n<e.length;n++){const i=e[n];s+=D(t,i),y(i,c.INFO,s.trim()+"]"),i.ahe_pnt_chl=t,i.ahe_onPChlRdy$.next(t)}return}const r=e[0];!function(t,e){if(e.tagName!==u.TEXT_VALUE)return!1;if(!e.innerHTML)return!1;const s=T(t,e.innerHTML);return s.isFunction?(t.ahe_nFns.push({textElement:e,valueName:s.valueName,lastData:n}),!0):(t.ahe_nVls.push({textElement:e,valueName:s.valueName,lastData:n}),!0)}(t,r)?function(t,e){if(e.tagName!==u.QSI_BIND)return!1;if(!e.innerHTML)return!1;const s=T(t,e.innerHTML);return s.isFunction?(t.ahe_bndFns.push({textElement:e,valueName:s.valueName,lastData:n}),!0):(t.ahe_bndVls.push({textElement:e,valueName:s.valueName,lastData:n}),!0)}(t,r)?y(r,c.INFO,s+"bind]"):(s+=function(t,e){const s=R(e,c.INJECT_TO);return s?(t.ahe_cmt[s]=e,"inj "):""}(t,r),s+=function(t,e){const s=R(e,c.CHANNEL);return s&&e.ahe_isCustomAppElement?(t.ahe_cmt[s]=e,"cnl "):""}(t,r),s+=function(t,e){const s=R(e,c.SOURCE);if(!s)return"";const n=T(t,s);return n.isFunction?(t.ahe_srcCmsFns.push({textElement:e,valueName:n.valueName,lastData:""}),"src "):(t.ahe_srcCms.push({textElement:e,valueName:s,lastData:""}),"src ")}(t,r),s+=function(t,e){const s=S(t,e,c.ON_CLICK);return s?(e.onclick=e=>F(t,s,e),"clk "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>F(t,s,e),"mlv "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>F(t,s,e),"mer "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_MOUSE_UP);return s?(e.onmouseup=e=>F(t,s,e),"mup "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>F(t,s,e),"mdn "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>F(t,s,e),"mmv "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_KEY_DOWN);return s?(e.onkeydown=e=>F(t,s,e),"kdn "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_KEY_UP);return s?(e.onkeyup=e=>F(t,s,e),"kup "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>F(t,s,e),"dbc "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_SCROLL);return s?(e.onscroll=e=>F(t,s,e),"scl "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_WHEEL);return s?(e.onwheel=e=>F(t,s,e),"whl "):""}(t,r),s+=function(t,e){const s=S(t,e,c.ON_CHANGE);return s?(e.onchange=e=>F(t,s,e),"chg "):""}(t,r),s+=function(t,e){const s=O(e,c.ON_HANDLE);return s?(U(t,s,e),I(e,c.ON_HANDLE),"elt "):""}(t,r),s+=D(t,r),s+=function(t,e){let s=O(e,c.CLASS_IF);if(!s)return"";const n=s.split(" "),r=[],a={element:e,classConditions:r};for(let e=0;e<n.length;e++){const s=n[e];if(s.includes("?")){const e=s.split("?"),n=T(t,e[0]),a=e[1].split(i);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:l.UNDEFINED,firstClassName:a[0],secondClassName:a[1]})}else if(s.includes(i)){const e=s.split(i),n=T(t,e[1]);r.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:l.UNDEFINED,firstClassName:e[0],secondClassName:""})}else r.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:l.UNDEFINED,firstClassName:s,secondClassName:""})}return t.ahe_ClsIfLst.push(a),I(e,c.CLASS_IF),"cls "}(t,r),y(r,c.INFO,s.trim()+"]"),r.ahe_isCustomAppElement&&(r.ahe_pnt_chl=t,r.ahe_onPChlRdy$.next(t))):y(r,c.INFO,s+"var]")}function D(t,e){let s=O(e,c.ON_IF);if(!s)return"";const n=v(),i=e.parentElement,r=T(t,s);return t.ahe_IfLst.push({ifElement:e,valueName:r.valueName,ifParent:n,oldCondition:!1,isInversion:r.isInversion,isFunction:r.isFunction}),i.insertBefore(n,e),J(e),I(e,c.ON_IF),y(n,c.INFO,"[ifp]"),"ifc "}function v(){return o.length?o.pop():Y(u.TEXT_VALUE)}function P(t,e){if(e.tagName===u.TEXT_VALUE)return(a[0]=e)&&a;if(e.tagName===u.QSI_BIND)return(a[0]=e)&&a;if(!t.isAppElement(e))return(a[0]=e)&&a;const s=O(e,c.FOR);if(!s)return(a[0]=e)&&a;const n=t.ahe_cmt[s];if(!n)return(a[0]=e)&&a;const i=v(),r=e.parentElement,o=M(t,[],n,i,e);return y(i,c.INFO,"[for-of]"),r.insertBefore(i,e),J(e),I(e,c.FOR),t.ahe_ForOfLst.push({parent:i,template:e,children:o,valueName:s}),o}function $(t,e,s){s.isAppElement(e)&&e.sendMessage(t)}function M(t,e,s,n,i){const r=[],a=e.length,o=s.length;let h=o-a;if(!(o+a))return r;if(h>0){for(let a=0;a<h;a++){const l=Y(i.tagName);e.push(l),r.push(l);const u=O(i,c.ON_IF);u&&y(l,c.ON_IF,u),q(n,l),$(s[o-h+a],l,t)}for(let n=0;n<o-h;n++)$(s[n],e[n],t)}else{h*=-1;for(let s=0;s<h;s++){const s=e.pop(),n=t.ahe_IfLst;let i;for(let t=0;t<n.length;t++){const e=n[t];if(e.ifElement===s){i=e;break}}i?(_(n,i),J(i.ifParent)):J(s)}for(let n=0;n<o;n++)$(s[n],e[n],t)}return r}function T(t,e){const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_cmt[n]}}function F(t,e,s){t.ahe_cmt[e](s)}function S(t,e,s){const n=O(e,s);return n?(U(t,n,e),I(e,s),n):""}function R(t,e){const s=O(t,e);return s?(I(t,e),s):""}function U(t,e,s){const n=t.ahe_cmt[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_nmr]||(n.htmlElements[t.ahe_nmr]=[]),t.ahe_clr.collect(t.beforeDestroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_nmr].push(s))}function H(t){t.ahe_nFns.length=0,t.ahe_srcCmsFns.length=0,t.ahe_srcCms.length=0,t.ahe_nVls.length=0,t.ahe_bndFns.length=0,t.ahe_bndVls.length=0,t.ahe_IfLst.length=0,t.ahe_ClsIfLst.length=0,t.ahe_ForOfLst.length=0,t.innerHTML=""}!function(){for(let t=0;t<h;t++)o.push(Y(u.TEXT_VALUE))}();let w=0;function x(t){class e extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==u.TEXT_VALUE&&this.tagName!==u.QSI_BIND&&(this.ahe_opts=t,this.ahe_cmt=new t.element(this),this.tagName!==u.APP_ROUTE&&(this.ahe_nmr=w,w++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new C,this.ahe_onAdt$=new N(!1),this.ahe_bfrIni$=new N(!1),this.ahe_bfrDst$=new N(!1),this.ahe_atrChd$=new N(void 0),this.ahe_bfrDctChg$=new N(!1),this.ahe_onChgDtd$=new N(!1),this.ahe_onMsg$=new N(void 0),this.ahe_onPChlRdy$=new N(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==u.TEXT_VALUE&&this.tagName!==u.QSI_BIND&&(this.tagName!==u.APP_ROUTE?O(this,c.ON_IF)&&!this.ahe_cmt[r]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),function(t){const e=t.querySelectorAll(`*:not([${A(c.INFO)}])`);for(let s=0;s<e.length;s++)L(t,P(t,e[s]))}(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((t=>this.ahe_cmt.onMessage(t)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges(!0)):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==u.TEXT_VALUE)this.tagName!==u.QSI_BIND&&this.tagName!==u.APP_ROUTE&&(!O(this,c.ON_IF)||this.ahe_cmt[r]?(this.ahe_bfrDst$.next(!0),H(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[r]=!0);else{if(o.length>=h)return;""==this.innerHTML&&(I(this,c.INFO),o.push(this))}}attributeChangedCallback(t,e,s){this.ahe_atrChd$?.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_nmr]?t.htmlElements[this.ahe_nmr]:[]}detectChanges(t){this.ahe_bfrDctChg$.next(!0),!t&&this.ahe_ForOfLst.length&&function(t){const e=t.ahe_ForOfLst,s=t.ahe_cmt;for(let n=0;n<e.length;n++){const i=e[n];L(t,M(t,i.children,s[i.valueName],i.parent,i.template))}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_IfLst.length;s++){const n=t.ahe_IfLst[s];let i=n.isFunction?!!e[n.valueName]():!!e[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const r=n.ifParent.contains(n.ifElement);i?r||q(n.ifParent,n.ifElement):r&&J(n.ifElement)}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=t.ahe_ClsIfLst[s];for(let t=0;t<n.length;t++){const s=n[t];let r;if(s.isConditionDisabled)r=l.TRUE;else{let t=s.isFunction?!!e[s.conditionName]():!!e[s.conditionName];s.isInversion&&(t=!t),r=t?l.TRUE:l.FALSE}if(r===s.oldCondition)continue;s.oldCondition=r;const{firstClassName:a,secondClassName:o}=s;o?r===l.TRUE?(z(i,[a]),j(i,[o])):(z(i,[o]),j(i,[a])):s.isConditionDisabled||r===l.TRUE?z(i,[a]):j(i,[a])}}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndVls.length;s++){const n=t.ahe_bndVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCms.length;s++){const n=t.ahe_srcCms[s],i=e[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCmsFns.length;s++){const n=t.ahe_srcCmsFns[s],i=e[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndFns.length;s++){const n=t.ahe_bndFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_nVls.length;s++){const n=t.ahe_nVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),function(t){const e=t.ahe_cmt;for(let s=0;s<t.ahe_nFns.length;s++){const n=t.ahe_nFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}}(this),this.ahe_onChgDtd$.next(!0)}sendMessage(t){this.ahe_onMsg$.next(t)}sendMessageToParent(t){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(t),!0)}getChannel(t){if(t&&t.ahe_isCustomAppElement)return t}transferToChannel(t,e){this.onMessage$().pipe().refine((()=>t())).subscribe((s=>{t().sendMessage(e(s))}))}sendToChannel(t,e){t?.sendMessage(e)}isAppElement(t){return!!t?.ahe_isCustomAppElement}collect(...t){this.ahe_clr.collect(...t)}destroy(){H(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return e}const K="{display: contents !important;}",k=[`html-block ${K}`],V=new N(!1);function B(t,e){for(let e=0;e<t.length;e++)k.push(`${t[e].tagName} ${K}`),t[e].element.qsi_app_tag_name=t[e].tagName;tt((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].target);e&&V.next(!0)}))}function W(t,e,s){return{tagName:e,target:x({template:s,element:t}),element:t}}let G;function X(...t){G?console.log(G.description,...t):console.log("APP",...t)}function Y(t){return e.createElement(t)}function Q(t){const e=Y("style");return e.innerHTML=t,e}function j(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])}function z(t,e){if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])}function q(t,e){e&&t?.appendChild(e)}function J(t){t?.remove()}const Z=new N(null);function tt(t){Z.pipe().refine((t=>!!t)).setOnce().subscribe(t),Z.pipe().unsubscribeBy((t=>!!t)).setOnce().subscribe((()=>{const t=()=>{Z.next(e.body),e.removeEventListener("DOMContentLoaded",t)};e.addEventListener("DOMContentLoaded",t)})),Z.next(e.body)}let et,st,nt,it;const rt=new class{constructor(t,e,s,n){et=t,st=e,nt=s,it=n,G=this}set major(t){st=t}set minor(t){nt=t}set patch(t){it=t}set name(t){et=t}get version(){return`${st}.${nt}.${it}`}get name(){return et}get description(){return`[${et} version: ${this.version}]`.toUpperCase()}init(t){t||X("STARTED")}}("test-route",1,0,0);var at;!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(at||(at={}));const ot=new N(at.EN),ht=new class{get currentLocation(){return ot.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return ot.subscribe(t)}setLocation(t){ot.next(t)}destroy(){ot.destroy()}},lt=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new N(""),t.addEventListener("popstate",this.popstate),this.popState()}set(e){this.isDestroyed||(t.history.pushState({},"",e),this.popState())}setWithoutHistory(e){this.isDestroyed||(t.history.replaceState({},"",e),this.popState())}subscribe(t){if(!this.isDestroyed)return this.state$.subscribe(t)}destroy(){t.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const e=t.location.pathname;this.state$.next(e)}};var ct;!function(t){t.SHOW="SHOW",t.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",t.HIDDEN="HIDDEN"}(ct||(ct={}));let ut=ct.SHOW;const _t=new N(""),mt=new N(null);let dt;function ft(t,e,s){return{path:e,command:t,component:s}}const pt=new C;class bt{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){X(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}class Et{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){X(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}class gt{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){X(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}class Nt{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){X(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}}var Ct,At;!function(t){t.MAIN="MAIN",t.PAGE1="PAGE1",t.PAGE2="PAGE2",t.PAGE3="PAGE3"}(Ct||(Ct={})),function(t,e){mt.next({defaultCmd:t,routes:e})}(Ct.MAIN,[ft(Ct.MAIN,"/main",bt),ft(Ct.PAGE1,"/page1",Et),ft(Ct.PAGE2,"/page2",gt),ft(Ct.PAGE3,"/page3",Nt)]),At=ct.SHOW,ut=At;const Ot=G.name;let yt="";for(let t=0;t<Ot.length;t++){const e=Ot[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}yt+=s||"-"}const It="app-"+yt,Lt=[W(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){console.log(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}},It,"<app-header></app-header><qsi-route></qsi-route>"),W(bt,"app-main","<div>Hello main.html</div>"),W(Et,"app-page1","<div>Hello page1.html</div>"),W(gt,"app-page2","<div>Hello page2.html</div>"),W(Nt,"app-page3","<div>Hello page3.html</div>"),W(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){X(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}clickMain(){_t.next(Ct.MAIN)}clickPage1(){_t.next(Ct.PAGE1)}clickPage2(){_t.next(Ct.PAGE2)}clickPage3(){_t.next(Ct.PAGE3)}},"app-header","<div class='s-6pGkVJq'><button class='o-L_3_d-w' qsi-click='clickMain'>Main</button><button class='o-L_3_d-w' qsi-click='clickPage1'>Page1</button><button class='o-L_3_d-w' qsi-click='clickPage2'>Page2</button><button class='o-L_3_d-w' qsi-click='clickPage3'>Page3</button></div>")];B([W(class{},u.TEXT_VALUE.toLowerCase(),""),W(class{},u.QSI_BIND.toLowerCase(),""),W(class{constructor(t){this.root=t,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){pt.unsubscribeAll()}process(){pt.collect(_t.pipe().refine((t=>!!t)).subscribe((t=>this.setCommand(t))),lt.subscribe((t=>this.setHistory(t)))),mt.getValue()?this.init():mt.pipe().refine((t=>!!t)).setOnce().subscribe((()=>this.init()))}init(){let t=mt.getValue();dt=t.defaultCmd;const e=t.routes;for(let t=0;t<e.length;t++)this.cmd[e[t].command]=e[t],this.path[e[t].path]=e[t];this.setCommand(dt)}setCommand(t){switch(this.setRoute(this.cmd[t]),ut){case ct.HIDDEN:break;case ct.SHOW:lt.set(this.cmd[t].path);break;case ct.SHOW_WITHOUT_HISTORY:lt.setWithoutHistory(this.cmd[t].path)}}setHistory(t){t in this.path&&this.setRoute(this.path[t])}setRoute(t){const e=t.component.qsi_app_tag_name;this.root.innerHTML=`<${e}></${e}>`}},u.APP_ROUTE.toLowerCase(),"")]);const Dt=new class{constructor(){this.isComponentMode=!1}register(t){B(t,!0)}run(t){this.isComponentMode=!!t,tt((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=Y(It))}start(){const t=Q(k.join("")),s=Q(".s-6pGkVJq {width: 600px;height: 100px;display: flex;align-items: center;justify-content: center;background: #69b2e4;}.o-L_3_d-w {width: 100px;height: 40px;background: #e4a269;margin: 5px;}");q(e.head,t),q(e.head,s),!this.isComponentMode&&q(e.body,this.appElement)}};rt.init(),ht.setLocation(at.EN),Dt.register(Lt),Dt.run()})();