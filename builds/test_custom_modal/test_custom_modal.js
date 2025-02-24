(()=>{"use strict";let t,e,s,n,i;function o(...e){t?console.log(t.description,...e):console.log("APP",...e)}const r=new class{constructor(o,r,a,l){e=o,s=r,n=a,i=l,t=this}set major(t){s=t}set minor(t){n=t}set patch(t){i=t}set name(t){e=t}get version(){return`${s}.${n}.${i}`}get name(){return e}get description(){return`[${e} version: ${this.version}]`.toUpperCase()}init(t){t||o("STARTED")}}("test_custom_modal",1,0,0);var a;function l(t,e){const s=t.indexOf(e);return-1!==s&&(t[s]=t[t.length-1],t.length=t.length-1,!0)}function h(t){return"next"in t?e=>t.next(e):t}!function(t){t.EN="EN",t.UA="UA",t.HE="HE",t.RU="RU"}(a||(a={}));class c{constructor(t){this.pipe=t,this.counter=t.chain.length?t.chain.length:0}case(t){this.counter++;const e=this.counter,s=this.pipe.chain;return s.push((n=>{n.isAvailable=!0,t(n.payload)&&(n.isBreak=!0),e!==s.length||n.isBreak||(n.isAvailable=!1)})),this}pushCases(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.case(t[e]);return this}}class u{constructor(){this.chain=[],this.flow={isBreak:!1,isUnsubscribe:!1,isAvailable:!1,payload:null}}refine(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}setOnce(){return this.push((t=>{this.listener(t.payload),t.isUnsubscribe=!0}))}unsubscribeBy(t){return this.push((e=>{e.isAvailable=!0,t(e.payload)&&(e.isUnsubscribe=!0)}))}processChain(t){const e=this.chain,s=this.flow;for(let t=0;t<e.length;t++){if(s.isUnsubscribe=!1,s.isAvailable=!1,e[t](s),s.isUnsubscribe)return this.unsubscribe();if(!s.isAvailable)return;if(s.isBreak)break}return t(s.payload)}pushRefiners(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.refine(t[e]);return this}switch(){return new d(this)}then(t){return this.push((e=>{e.payload=t(e.payload),e.isAvailable=!0}))}serialize(){return this.push((t=>{t.payload=JSON.stringify(t.payload),t.isAvailable=!0}))}deserialize(){return this.push((t=>{t.payload=JSON.parse(t.payload),t.isAvailable=!0}))}push(t){return this.chain.push(t),this}}class d extends c{subscribe(t,e){return this.pipe.subscribe(t,e)}}class m extends u{get order(){return this._order}constructor(t,e){super(),this._order=0,this.paused=!1,this.piped=!1,this.errorHandler=(t,e)=>{console.log(`(Unit of SubscribeObject).send(${t}) ERROR:`,e)},this.observer=t,this.piped=!!e}subscribe(t,e){return this.listener=function(t){if(Array.isArray(t)){const e=[];for(let s=0;s<t.length;s++)e.push(h(t[s]));return t=>{for(let s=0;s<e.length;s++)e[s](t)}}return h(t)}(t),e&&(this.errorHandler=e),this}send(t){try{this.flow.payload=t,this.flow.isBreak=!1,this.processValue(t)}catch(e){this.errorHandler(t,e)}}resume(){this.paused=!1}pause(){this.paused=!0}unsubscribe(){this.observer&&(this.observer.unSubscribe(this),this.observer=null,this.listener=null,this.chain.length=0)}set order(t){this._order=t}processValue(t){const e=this.listener;return e?this.observer&&!this.paused?this.piped?this.processChain(e):e(t):void 0:this.unsubscribe()}}class p{constructor(){this.chain=[],this.flow={isBreak:!1,isAvailable:!1,payload:null},this.response={isOK:!1,payload:void 0}}get isEmpty(){return!this.chain.length}push(t){return this.chain.push(t),this}filter(t){return this.push((e=>t(e.payload)&&(e.isAvailable=!0)))}pushFilters(t){if(!Array.isArray(t))return this;for(let e=0;e<t.length;e++)this.filter(t[e]);return this}switch(){return new g(this)}processChain(t){const e=this.chain,s=this.flow,n=this.response;n.isOK=!1,n.payload=void 0,s.payload=t,s.isBreak=!1;try{for(let t=0;t<e.length;t++){if(s.isAvailable=!1,e[t](s),!s.isAvailable)return n;if(s.isBreak)break}}catch(t){return this.errHandler?this.errHandler(t,"Filter.processChain ERROR:"):console.log("Filter.processChain ERROR:",t),n}return n.isOK=!0,n.payload=s.payload,n}addErrorHandler(t){this.errHandler=t}}class g extends c{}class b{constructor(t){this.value=t,this.subs=[],this.enabled=!0,this.killed=!1,this.process=!1,this.trash=[],this.filters=new p}addFilter(t){return t&&this.filters.addErrorHandler(t),this.filters}disable(){this.enabled=!1}enable(){this.enabled=!0}get isEnable(){return this.enabled}next(t){if(!this.killed&&this.enabled&&(this.filters.isEmpty||this.filters.processChain(t).isOK)){this.process=!0,this.value=t;for(let e=0;e<this.subs.length;e++)this.subs[e].send(t);this.process=!1,this.trash.length&&this.clearTrash()}}stream(t){if(!this.killed&&this.enabled)for(let e=0;e<t.length;e++)this.next(t[e])}get isDestroyed(){return this.killed}unSubscribe(t){this.killed||(this.process&&t?this.trash.push(t):this.subs&&l(this.subs,t))}destroy(){if(this.killed)return;if(this.killed=!0,!this.process)return this.value=null,void(this.subs.length=0);const t=setInterval((()=>{this.process||(clearInterval(t),this.value=null,this.subs.length=0)}),10)}unsubscribeAll(){this.killed||(this.subs.length=0)}getValue(){if(!this.killed)return this.value}size(){return this.killed?0:this.subs.length}subscribe(t,e){if(this.killed)return;if(!this.isListener(t))return;const s=new m(this,!1);return this.addObserver(s,t,e),s}addObserver(t,e,s){t.subscribe(e,s),this.subs.push(t)}isListener(t){return!this.killed&&!!t}pipe(){if(this.killed)return;const t=new m(this,!0);return this.subs.push(t),t}clearTrash(){const t=this.trash.length;for(let e=0;e<t;e++)this.unSubscribe(this.trash[e]);this.trash.length=0}}class _{constructor(){this.arr=[],this.killed=!1}collect(...t){this.killed||this.arr.push(...t)}unsubscribe(t){this.killed||(t?.unsubscribe(),l(this.arr,t))}unsubscribeAll(){if(!this.killed)for(;this.arr.length>0;)this.unsubscribe(this.arr.pop())}size(){return this.killed?0:this.arr.length}destroy(){this.unsubscribeAll(),this.arr.length=0,this.arr=0,this.killed=!0}get isDestroyed(){return this.killed}}const f=new b(a.EN),y=new class{get currentLocation(){return f.getValue()}getLocalizedText(t,e){return t[e]}getLocalizedTextByLocation(t){return t[this.currentLocation]}onLocationChange(t){return f.subscribe(t)}setLocation(t){f.next(t)}destroy(){f.destroy()}};var E,N,x,C;!function(t){t.CLOSE="close",t.MINIMIZE="minimize",t.MAXIMIZE="maximize",t.DEFAULT="default",t.DANGER="danger",t.SUCCESS="success",t.INFO="info",t.WARNING="warning",t.LINK="link",t.CUSTOM="custom"}(E||(E={})),function(t){t.DEFAULT="default",t.CUSTOM="custom"}(N||(N={})),function(t){t.VIEW="view"}(x||(x={})),function(t){t.BUTTON="button",t.IMAGE="image"}(C||(C={}));const S="rgba(0, 0, 0, 0.25)",O={generalStyle:{containerStyle:{margin:"5px"},textBlockStyle:{fontSize:"20px",fontWeight:"bold",fontFamily:"Arial"},imageStyle:{style:{display:"none"}}},[E.DEFAULT]:{textBlockStyle:{color:"black"},containerStyle:{width:"160px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",backgroundColor:"white"},imageStyle:{style:{display:"none"}}},[E.CLOSE]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"rgb(255 56 56)"},imageStyle:{src:"assets/images/csm_button_close-min.png",style:{display:"block",height:"50%",width:"50%"},altText:"Close"}},[E.MINIMIZE]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"rgb(255,255,255)"},imageStyle:{src:"assets/images/csm_button_minimize-min.png",style:{display:"block",height:"50%",width:"50%"},altText:"Close"}},[E.MAXIMIZE]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"rgb(255,255,255)"},imageStyle:{src:"assets/images/csm_button_maximize-min.png",style:{display:"block",height:"50%",width:"50%"},altText:"Close"}},[E.DANGER]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"rgb(255 56 56)"},imageStyle:{src:"assets/images/csm_button_danger-min.png",style:{display:"block",height:"65%",width:"65%"},altText:"Close"}},[E.SUCCESS]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"rgb(94 190 122)"},imageStyle:{src:"assets/images/csm_button_succes-min.png",style:{display:"block",height:"65%",width:"65%"},altText:"Close"}},[E.INFO]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"#546eff"},imageStyle:{src:"assets/images/csm_button_info-min.png",style:{display:"block",height:"65%",width:"65%"},altText:"Close"}},[E.WARNING]:{textBlockStyle:{display:"none"},containerStyle:{width:"60px",height:"60px",border:`1px solid ${S}`,borderRadius:"10px",flexDirection:"row",flexWrap:"nowrap",backgroundColor:"orange"},imageStyle:{src:"assets/images/csm_button_warning-min.png",style:{display:"block",height:"65%",width:"65%"},altText:"Close"}},[E.LINK]:{textBlockStyle:{color:"black"},containerStyle:{width:"160px",height:"60px",borderTop:"none",borderRight:"none",borderLeft:"none",borderBottom:`1px solid ${S}`},imageStyle:{style:{display:"none"}}},[E.CUSTOM]:{}},v={actionCallback:()=>{console.log("DEFAULT_BUTTON_OPTIONS")},type:C.BUTTON,state:E.CLOSE,text:"Close"},w={generalStyle:{containerStyle:{},textBlockStyle:{},imageStyle:{style:{}}},[N.DEFAULT]:{containerStyle:{width:"200px",height:"250px",margin:"5px",padding:"10px",border:`1px solid ${S}`,borderRadius:"10px",backgroundColor:"white",display:"flex",flexDirection:"column",flexWrap:"nowrap",justifyContent:"center",alignItems:"center"},textBlockStyle:{fontSize:"20px",fontWeight:"bold",fontFamily:"Arial"},imageStyle:{style:{display:"block",width:"100%",height:"90%",backgroundColor:"#f6e8b2",border:`1px solid ${S}`,borderRadius:"10px"}}},[N.CUSTOM]:{textBlockStyle:{},containerStyle:{},imageStyle:{style:{display:"block"}}}},I=(C.IMAGE,N.DEFAULT,new b(v));function A(t,e){if(t)if(e)for(const[s,n]of Object.entries(e))t.style[s]=n;else o("setStyle ERROR: style is not defined!");else o("setStyle ERROR: element is not defined!")}function D(t,e){const s={defaultStyles:e.type===C.BUTTON?O:w,error:""};return s.defaultStyles[e.state]||(s.error=`ERROR: ${t.name} - buttonOption.state: ${e.state} is not defined!`),s}function T(t,e,s,n=!1){!function(t,e,s,n){let i=t?e.generalStyle.imageStyle:e[s.state].imageStyle;"custom"===s.state&&s.customOptions&&s.customOptions.imageStyle&&(i=s.customOptions.imageStyle),i?(i.style&&A(n.imageElement,i.style),i.src&&(n.image=i.src),i.altText&&(n.imageElement.alt=i.altText)):o(`ERROR: ${n.name} - imageOption is not defined!`)}(n,e,s,t),function(t,e){if(!e.extension)return;if(!e.extension.imageStyle)return;const s=e.extension.imageStyle;s.style&&A(t.imageElement,s.style),s.src&&(t.image=s.src),s.altText&&(t.imageElement.alt=s.altText)}(t,s)}function L(t,e,s,n=!1){!function(t,e,s,n){switch(!0){case t:A(e.textElement,s.generalStyle.textBlockStyle);break;case"custom"===n.state:n.customOptions&&n.customOptions.textBlockStyle&&A(e.textElement,n.customOptions.textBlockStyle);break;case"custom"!==n.state:A(e.textElement,s[n.state].textBlockStyle)}"string"==typeof n.text&&(e.text=n.text)}(n,t,e,s),function(t,e){e.extension&&e.extension.textBlockStyle&&A(t.textElement,e.extension.textBlockStyle)}(t,s)}const k=window,R=document;let $=new Uint8Array(16);function U(t){return`0${t.toString(16)}`.slice(-2)}function F(){return k.crypto.getRandomValues($),Array.from($,U).join("")}k.top;const M=`${F()}${Date.now()}`,B="_______$$bool",H=[0];let P=[];var V,W,q;!function(t){t.UNDEFINED="",t.TRUE="TRUE",t.FALSE="FALSE"}(V||(V={})),function(t){t.INFO="i",t.SOURCE="src",t.INJECT_TO="inject_to",t.CHANNEL="channel",t.ON_CLICK="click",t.ON_CHANGE="change",t.ON_KEY_DOWN="keydown",t.ON_KEY_UP="keyup",t.ON_KEY_DBL_CLICK="dblclick",t.ON_SCROLL="scroll",t.ON_WHEEL="wheel",t.ON_MOUSE_LEAVE="mouseleave",t.ON_MOUSE_ENTER="mouseenter",t.ON_MOUSE_UP="mouseup",t.ON_MOUSE_DOWN="mousedown",t.ON_MOUSE_MOVE="mousemove",t.ON_HANDLE="handle",t.ON_IF="if",t.CLASS_IF="cls",t.FOR="for"}(W||(W={})),function(t){t.TEXT_VALUE="TXT-VAL",t.QSI_BIND="QSI-BIND",t.APP_ROUTE="QSI-ROUTE",t.APP_SUB_ROUTE="QSI-SUBROUTE"}(q||(q={}));const z=t=>R.createElement(t),G=t=>{const e=z("style");return e.innerHTML=t,e},K=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.remove(e[s])},j=(t,e)=>{if(t)for(let s=0;s<e.length;s++)t.classList.add(e[s])},X=(t,e)=>{e&&t?.appendChild(e)},Q=t=>{t?.remove()},Y=new b(null),J=t=>{Y.pipe().refine((t=>!!t)).setOnce().subscribe(t),Y.pipe().unsubscribeBy((t=>!!t)).setOnce().subscribe((()=>{const t=()=>{Y.next(R.body),R.removeEventListener("DOMContentLoaded",t)};R.addEventListener("DOMContentLoaded",t)})),Y.next(R.body)},Z=t=>`qsi-${t}`,tt=(t,e)=>t?t.getAttribute(Z(e)):"",et=(t,e,s)=>{t&&t.setAttribute(Z(e),s)},st=(t,e)=>{t&&t.removeAttribute(Z(e))},nt=(t,e)=>{if(!e.length)return;let s="[";if(e.length>1){for(let n=0;n<e.length;n++){const i=e[n];s+=ot(t,i),et(i,W.INFO,s.trim()+"]"),i.ahe_pnt_chl=t,i.ahe_onPChlRdy$.next(t)}return}const n=e[0];ut(t,n)?et(n,W.INFO,s+"var]"):dt(t,n)?et(n,W.INFO,s+"bind]"):(s+=gt(t,n),s+=bt(t,n),s+=pt(t,n),s+=_t(t,n),s+=ft(t,n),s+=yt(t,n),s+=Et(t,n),s+=Nt(t,n),s+=xt(t,n),s+=Ct(t,n),s+=St(t,n),s+=Ot(t,n),s+=vt(t,n),s+=wt(t,n),s+=It(t,n),s+=Tt(t,n),s+=ot(t,n),s+=it(t,n),et(n,W.INFO,s.trim()+"]"),n.ahe_isCustomAppElement&&(n.ahe_pnt_chl=t,n.ahe_onPChlRdy$.next(t)))},it=(t,e)=>{let s=tt(e,W.CLASS_IF);if(!s)return"";const n=s.split(" "),i=[],o={element:e,classConditions:i};for(let e=0;e<n.length;e++){const s=n[e];if(s.includes("?")){const e=s.split("?"),n=ct(t,e[0]),o=e[1].split(":");i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:V.UNDEFINED,firstClassName:o[0],secondClassName:o[1]})}else if(s.includes(":")){const e=s.split(":"),n=ct(t,e[1]);i.push({conditionName:n.valueName,isFunction:n.isFunction,isInversion:n.isInversion,isConditionDisabled:!1,oldCondition:V.UNDEFINED,firstClassName:e[0],secondClassName:""})}else i.push({conditionName:"",isFunction:!1,isInversion:!1,isConditionDisabled:!0,oldCondition:V.UNDEFINED,firstClassName:s,secondClassName:""})}return t.ahe_ClsIfLst.push(o),st(e,W.CLASS_IF),"cls "},ot=(t,e)=>{let s=tt(e,W.ON_IF);if(!s)return"";const n=rt(),i=e.parentElement,o=ct(t,s);return t.ahe_IfLst.push({ifElement:e,valueName:o.valueName,ifParent:n,oldCondition:!1,isInversion:o.isInversion,isFunction:o.isFunction}),i.insertBefore(n,e),Q(e),st(e,W.ON_IF),et(n,W.INFO,"[ifp]"),"ifc "};(()=>{for(let t=0;t<1e4;t++)P.push(z(q.TEXT_VALUE))})();const rt=()=>P.length?P.pop():z(q.TEXT_VALUE),at=(t,e)=>{if(e.tagName===q.TEXT_VALUE)return(H[0]=e)&&H;if(e.tagName===q.QSI_BIND)return(H[0]=e)&&H;if(!t.isAppElement(e))return(H[0]=e)&&H;const s=tt(e,W.FOR);if(!s)return(H[0]=e)&&H;const n=t.ahe_cmt[s];if(!n)return(H[0]=e)&&H;const i=rt(),o=e.parentElement,r=ht(t,[],n,i,e);return et(i,W.INFO,"[for-of]"),o.insertBefore(i,e),Q(e),st(e,W.FOR),t.ahe_ForOfLst.push({parent:i,template:e,children:r,valueName:s}),r},lt=(t,e,s)=>{s.isAppElement(e)&&e.sendMessage(t)},ht=(t,e,s,n,i)=>{const o=[],r=e.length,a=s.length;let h=a-r;if(!(a+r))return o;if(h>0){for(let r=0;r<h;r++){const l=z(i.tagName);e.push(l),o.push(l);const c=tt(i,W.ON_IF);c&&et(l,W.ON_IF,c),X(n,l),lt(s[a-h+r],l,t)}for(let n=0;n<a-h;n++)lt(s[n],e[n],t)}else{h*=-1;for(let s=0;s<h;s++){const s=e.pop(),n=t.ahe_IfLst;let i;for(let t=0;t<n.length;t++){const e=n[t];if(e.ifElement===s){i=e;break}}i?(l(n,i),Q(i.ifParent)):Q(s)}for(let n=0;n<a;n++)lt(s[n],e[n],t)}return o},ct=(t,e)=>{const s="!"===e[0],n=s?e.substring(1):e;return{isInversion:s,valueName:n,isFunction:"function"==typeof t.ahe_cmt[n]}},ut=(t,e)=>{if(e.tagName!==q.TEXT_VALUE)return!1;if(!e.innerHTML)return!1;const s=ct(t,e.innerHTML);return s.isFunction?(t.ahe_nFns.push({textElement:e,valueName:s.valueName,lastData:M}),!0):(t.ahe_nVls.push({textElement:e,valueName:s.valueName,lastData:M}),!0)},dt=(t,e)=>{if(e.tagName!==q.QSI_BIND)return!1;if(!e.innerHTML)return!1;const s=ct(t,e.innerHTML);return s.isFunction?(t.ahe_bndFns.push({textElement:e,valueName:s.valueName,lastData:M}),!0):(t.ahe_bndVls.push({textElement:e,valueName:s.valueName,lastData:M}),!0)},mt=(t,e,s)=>{t.ahe_cmt[e](s)},pt=(t,e)=>{const s=Dt(e,W.SOURCE);if(!s)return"";const n=ct(t,s);return n.isFunction?(t.ahe_srcCmsFns.push({textElement:e,valueName:n.valueName,lastData:""}),"src "):(t.ahe_srcCms.push({textElement:e,valueName:s,lastData:""}),"src ")},gt=(t,e)=>{const s=Dt(e,W.INJECT_TO);return s?(t.ahe_cmt[s]=e,"inj "):""},bt=(t,e)=>{const s=Dt(e,W.CHANNEL);return s&&e.ahe_isCustomAppElement?(t.ahe_cmt[s]=e,"cnl "):""},_t=(t,e)=>{const s=At(t,e,W.ON_CLICK);return s?(e.onclick=e=>mt(t,s,e),"clk "):""},ft=(t,e)=>{const s=At(t,e,W.ON_MOUSE_LEAVE);return s?(e.onmouseleave=e=>mt(t,s,e),"mlv "):""},yt=(t,e)=>{const s=At(t,e,W.ON_MOUSE_ENTER);return s?(e.onmouseenter=e=>mt(t,s,e),"mer "):""},Et=(t,e)=>{const s=At(t,e,W.ON_MOUSE_UP);return s?(e.onmouseup=e=>mt(t,s,e),"mup "):""},Nt=(t,e)=>{const s=At(t,e,W.ON_MOUSE_DOWN);return s?(e.onmousedown=e=>mt(t,s,e),"mdn "):""},xt=(t,e)=>{const s=At(t,e,W.ON_MOUSE_MOVE);return s?(e.onmousemove=e=>mt(t,s,e),"mmv "):""},Ct=(t,e)=>{const s=At(t,e,W.ON_KEY_DOWN);return s?(e.onkeydown=e=>mt(t,s,e),"kdn "):""},St=(t,e)=>{const s=At(t,e,W.ON_KEY_UP);return s?(e.onkeyup=e=>mt(t,s,e),"kup "):""},Ot=(t,e)=>{const s=At(t,e,W.ON_KEY_DBL_CLICK);return s?(e.ondblclick=e=>mt(t,s,e),"dbc "):""},vt=(t,e)=>{const s=At(t,e,W.ON_SCROLL);return s?(e.onscroll=e=>mt(t,s,e),"scl "):""},wt=(t,e)=>{const s=At(t,e,W.ON_WHEEL);return s?(e.onwheel=e=>mt(t,s,e),"whl "):""},It=(t,e)=>{const s=At(t,e,W.ON_CHANGE);return s?(e.onchange=e=>mt(t,s,e),"chg "):""},At=(t,e,s)=>{const n=tt(e,s);return n?(Lt(t,n,e),st(e,s),n):""},Dt=(t,e)=>{const s=tt(t,e);return s?(st(t,e),s):""},Tt=(t,e)=>{const s=tt(e,W.ON_HANDLE);return s?(Lt(t,s,e),st(e,W.ON_HANDLE),"elt "):""},Lt=(t,e,s)=>{const n=t.ahe_cmt[e];n&&(n.htmlElements||(n.htmlElements={}),n.htmlElements[t.ahe_nmr]||(n.htmlElements[t.ahe_nmr]=[]),t.ahe_clr.collect(t.beforeDestroy$().subscribe((t=>t&&(n.htmlElements={})))),n.htmlElements[t.ahe_nmr].push(s))},kt=t=>{t.ahe_nFns.length=0,t.ahe_srcCmsFns.length=0,t.ahe_srcCms.length=0,t.ahe_nVls.length=0,t.ahe_bndFns.length=0,t.ahe_bndVls.length=0,t.ahe_IfLst.length=0,t.ahe_ClsIfLst.length=0,t.ahe_ForOfLst.length=0,t.innerHTML=""};let Rt=0;function $t(t){class e extends HTMLElement{constructor(){super(),this.ahe_nmr=0,this.tagName!==q.TEXT_VALUE&&this.tagName!==q.QSI_BIND&&(this.ahe_opts=t,this.ahe_cmt=new t.element(this),this.tagName!==q.APP_ROUTE&&this.tagName!==q.APP_SUB_ROUTE&&(this.ahe_nmr=Rt,Rt++,this.ahe_isCustomAppElement=!0,this.ahe_clr=new _,this.ahe_onAdt$=new b(!1),this.ahe_bfrIni$=new b(!1),this.ahe_bfrDst$=new b(!1),this.ahe_atrChd$=new b(void 0),this.ahe_bfrDctChg$=new b(!1),this.ahe_onChgDtd$=new b(!1),this.ahe_onMsg$=new b(void 0),this.ahe_onPChlRdy$=new b(void 0),this.ahe_nFns=[],this.ahe_srcCmsFns=[],this.ahe_srcCms=[],this.ahe_nVls=[],this.ahe_bndFns=[],this.ahe_bndVls=[],this.ahe_IfLst=[],this.ahe_ClsIfLst=[],this.ahe_ForOfLst=[],"onCreate"in this.ahe_cmt&&this.ahe_cmt.onCreate()))}parentChanelReady$(){return this.ahe_onPChlRdy$}adopted$(){return this.ahe_onAdt$}beforeInit$(){return this.ahe_bfrIni$}beforeDestroy$(){return this.ahe_bfrDst$}attributeChange$(){return this.ahe_atrChd$}beforeChanges$(){return this.ahe_bfrDctChg$}changesDetected$(){return this.ahe_onChgDtd$}onMessage$(){return this.ahe_onMsg$}connectedCallback(){this.tagName!==q.TEXT_VALUE&&this.tagName!==q.QSI_BIND&&(this.tagName!==q.APP_ROUTE&&this.tagName!==q.APP_SUB_ROUTE?tt(this,W.ON_IF)&&!this.ahe_cmt[B]||(this.ahe_bfrIni$.next(!0),this.ahe_opts.isShadow&&this.ahe_opts.template?this.attachShadow({mode:"open"}).innerHTML=this.ahe_opts.template:this.ahe_opts.template&&(this.innerHTML=this.ahe_opts.template),(t=>{const e=t.querySelectorAll(`*:not([${Z(W.INFO)}])`);for(let s=0;s<e.length;s++)nt(t,at(t,e[s]))})(this),"onMessage"in this.ahe_cmt&&this.collect(this.ahe_onMsg$.subscribe((t=>this.ahe_cmt.onMessage(t)))),"onInit"in this.ahe_cmt&&this.ahe_cmt.onInit(),this.detectChanges()):this.ahe_cmt.onInit())}disconnectedCallback(){if(this.tagName!==q.TEXT_VALUE)this.tagName!==q.QSI_BIND&&this.tagName!==q.APP_ROUTE&&this.tagName!==q.APP_SUB_ROUTE&&(!tt(this,W.ON_IF)||this.ahe_cmt[B]?(this.ahe_bfrDst$.next(!0),kt(this),this.ahe_clr.unsubscribeAll(),this.ahe_onAdt$.unsubscribeAll(),this.ahe_bfrIni$.unsubscribeAll(),this.ahe_bfrDst$.unsubscribeAll(),this.ahe_atrChd$.unsubscribeAll(),this.ahe_bfrDctChg$.unsubscribeAll(),this.ahe_onChgDtd$.unsubscribeAll(),this.ahe_onMsg$.unsubscribeAll(),this.ahe_onPChlRdy$.unsubscribeAll(),"onDestroy"in this.ahe_cmt&&this.ahe_cmt.onDestroy()):this.ahe_cmt[B]=!0);else{if(P.length>=1e4)return;""==this.innerHTML&&(st(this,W.INFO),P.push(this))}}attributeChangedCallback(t,e,s){this.ahe_atrChd$?.next({name:t,oldValue:e,newValue:s})}adoptedCallback(){this.ahe_onAdt$?.next(!0)}getElementsBoundToMethod(t){return t&&t.htmlElements&&t.htmlElements[this.ahe_nmr]?t.htmlElements[this.ahe_nmr]:[]}detectChanges(t){this.ahe_bfrDctChg$.next(!0),!t&&this.ahe_ForOfLst.length&&(t=>{const e=t.ahe_ForOfLst,s=t.ahe_cmt;for(let n=0;n<e.length;n++){const i=e[n],o=ht(t,i.children,s[i.valueName],i.parent,i.template);nt(t,o)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_IfLst.length;s++){const n=t.ahe_IfLst[s];let i=n.isFunction?!!e[n.valueName]():!!e[n.valueName];if(n.isInversion&&(i=!i),i===n.oldCondition)continue;n.oldCondition=i;const o=n.ifParent.contains(n.ifElement);i?o||X(n.ifParent,n.ifElement):o&&Q(n.ifElement)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_ClsIfLst.length;s++){const{classConditions:n,element:i}=t.ahe_ClsIfLst[s];for(let t=0;t<n.length;t++){const s=n[t];let o;if(s.isConditionDisabled)o=V.TRUE;else{let t=s.isFunction?!!e[s.conditionName]():!!e[s.conditionName];s.isInversion&&(t=!t),o=t?V.TRUE:V.FALSE}if(o===s.oldCondition)continue;s.oldCondition=o;const{firstClassName:r,secondClassName:a}=s;a?o===V.TRUE?(j(i,[r]),K(i,[a])):(j(i,[a]),K(i,[r])):s.isConditionDisabled||o===V.TRUE?j(i,[r]):K(i,[r])}}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndVls.length;s++){const n=t.ahe_bndVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCms.length;s++){const n=t.ahe_srcCms[s],i=e[n.valueName]??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_srcCmsFns.length;s++){const n=t.ahe_srcCmsFns[s],i=e[n.valueName]()??"";n.lastData!==i&&(n.textElement.src=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_bndFns.length;s++){const n=t.ahe_bndFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.textContent=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nVls.length;s++){const n=t.ahe_nVls[s],i=e[n.valueName];n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),(t=>{const e=t.ahe_cmt;for(let s=0;s<t.ahe_nFns.length;s++){const n=t.ahe_nFns[s],i=e[n.valueName]();n.lastData!==i&&(n.textElement.innerHTML=i,n.lastData=i)}})(this),this.ahe_onChgDtd$.next(!0)}sendMessage(t){this.ahe_onMsg$.next(t)}sendMessageToParent(t){return!!this.ahe_pnt_chl&&(this.ahe_pnt_chl.sendMessage(t),!0)}getChannel(t){if(t&&t.ahe_isCustomAppElement)return t}transferToChannel(t,e){this.onMessage$().pipe().refine((()=>t())).subscribe((s=>{t().sendMessage(e(s))}))}sendToChannel(t,e){t?.sendMessage(e)}isAppElement(t){return!!t?.ahe_isCustomAppElement}collect(...t){this.ahe_clr.collect(...t)}destroy(){kt(this),this.ahe_onAdt$.destroy(),this.ahe_bfrIni$.destroy(),this.ahe_bfrDst$.destroy(),this.ahe_atrChd$.destroy(),this.ahe_bfrDctChg$.destroy(),this.ahe_onChgDtd$.destroy(),this.ahe_onMsg$.destroy(),this.ahe_onPChlRdy$.destroy(),this.ahe_clr.destroy()}}return e}const Ut="{display: contents !important;}",Ft=[`html-block ${Ut}`],Mt=new b(!1),Bt=(t,e)=>{for(let e=0;e<t.length;e++)t[e].element.qsi_app_tag_name=t[e].tagName,t[e].isCustomElement||Ft.push(`${t[e].tagName}${Ut}`);J((()=>{for(let e=0;e<t.length;e++)customElements.define(t[e].tagName,t[e].target);e&&Mt.next(!0)}))},Ht=(t,e,s,n,i)=>({isCustomElement:n,tagName:e,target:$t({template:s,element:t,isShadow:i}),element:t}),Pt=[Ht(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){t.id=this.id,I.next(t),this.currentPage=I.getValue().type}onCreate(){this.id=F(),I.addFilter().pushFilters([t=>!!t,t=>!!t.type,t=>!!t.state,t=>t.type===C.BUTTON||t.type===C.IMAGE])}onInit(){this.root.shadowRoot.shadowId=this.id}onDestroy(){}},"csm-button","<style>txt-val{display: contents !important;}qsi-bind{display: contents !important;}qsi-subroute{display: contents !important;}csmbutton{display: contents !important;}csmbutton-view_button{display: contents !important;}csmbutton-view_image{display: contents !important;}csmbutton-container{display: contents !important;}.app {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;width: 0;height: 0;display: flex;flex-flow: column nowrap;align-items: center;justify-content: center;position: relative;cursor: pointer;overflow: hidden;user-select: none;box-sizing: border-box;}.app * {padding: 0;margin: 0;box-sizing: border-box;overflow: auto;}.app:hover {opacity: 0.5;}</style> <csmbutton-container></csmbutton-container>",!1,!0),Ht(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){o(this.root.tagName,"message:",t)}onCreate(){}onInit(){this.setGeneralStyle(),this.root.collect(I.pipe().refine((t=>{if(!this.id){const t=this.root.getRootNode();this.id=t.shadowId}return this.id===t.id})).subscribe((t=>{this.setButtonOption(t),this.text=t.text,this.root.detectChanges()})))}onDestroy(){}setButtonOption(t){const{defaultStyles:e,error:s}=D(this,t);s?o(s):(L(this,e,t),T(this,e,t),this.root.detectChanges())}setGeneralStyle(){const t=I.getValue();L(this,O,t,!0),T(this,O,t,!0)}},"csmbutton-view_button","<div qsi-inject_to='textElement'><qsi-bind>text</qsi-bind></div><img qsi-src='image' qsi-inject_to='imageElement'>",!0,!1),Ht(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){o(this.root.tagName,"message:",t)}onCreate(){}onInit(){this.setGeneralStyle(),this.root.collect(I.pipe().refine((t=>{if(!this.id){const t=this.root.getRootNode();this.id=t.shadowId}return this.id===t.id})).subscribe((t=>{this.setButtonOption(t),this.text=t.text,this.root.detectChanges()})))}onDestroy(){}setButtonOption(t){const{defaultStyles:e,error:s}=D(this,t);s?o(s):(L(this,e,t),T(this,e,t),this.root.detectChanges())}setGeneralStyle(){const t=I.getValue();L(this,w,t,!0),T(this,w,t,!0)}},"csmbutton-view_image","<img qsi-src='image' qsi-inject_to='imageElement'><div qsi-inject_to='textElement'><qsi-bind>text</qsi-bind></div>",!0,!1),Ht(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){o(this.root.tagName,"message:",t)}onCreate(){}onInit(){this.setGeneralStyle(),this.root.collect(I.pipe().refine((t=>{if(!this.id){const t=this.root.getRootNode();this.id=t.shadowId}return this.id===t.id})).subscribe((t=>{this.isButton=t.type===C.BUTTON,this.setButtonOption(t),this.root.detectChanges()})))}onDestroy(){}setButtonOption(t){const{defaultStyles:e,error:s}=D(this,t);s?o(s):(this.callback=t.actionCallback,this.setBaseOptions(t,e),this.setExtension(t))}click(t){this.callback&&(t.preventDefault(),t.stopPropagation(),this.callback())}setBaseOptions(t,e){"custom"===t.state?t.customOptions&&t.customOptions.containerStyle&&A(this.container,t.customOptions.containerStyle):A(this.container,e[t.state].containerStyle)}setExtension(t){t.extension&&t.extension.containerStyle&&A(this.container,t.extension.containerStyle)}setGeneralStyle(){const t=I.getValue(),{defaultStyles:e,error:s}=D(this,t);s?o(s):A(this.container,e.generalStyle.containerStyle)}},"csmbutton-container","<div qsi-inject_to='container' class='app' qsi-click='click'><csmbutton-view_button qsi-if='isButton'></csmbutton-view_button><csmbutton-view_image qsi-if='!isButton'></csmbutton-view_image></div>",!0,!1)],Vt=new b(null),Wt={};function qt(...t){for(let e=0;e<t.length;e++){const s=t[e],n={};for(let t=0;t<s.pages.length;t++){const e=s.pages[t];n[e.name]=e.page}Wt[s.name]={name:s.name,defaultPage:s.defaultPage,pages:n,subRoute:null}}}class zt{constructor(t){if(this.root=t,this.isDestroyed=!0,this.name=t.getAttribute("name")||"",this.registered=Wt[this.name],!this.registered)throw new Error(`Subroute with the name "${this.name}" not found`);this.registered.subRoute=this}onInit(){this.isDestroyed=!1,this.setPage(this.registered.defaultPage),zt.names.includes(this.name)?o(`WARNING: Subroute with the name "${this.name}" already exists. Valid behavior is not guaranteed.`):zt.names.push(this.name)}onDestroy(){this.isDestroyed=!0,l(zt.names,this.name),this.registered.subRoute=null}setPage(t){if(this.isDestroyed)return;const e=this.registered.pages[t];if(!e)return void console.error(`Page with name "${t}" not found in subroute "${this.name}"`);const s=e.qsi_app_tag_name;this.root.innerHTML=`<${s}></${s}>`}}zt.names=[],Vt.pipe().refine((t=>t)).subscribe((t=>{const e=Wt[t.name];e&&e.subRoute?e.subRoute.setPage(t.page):console.log("ERROR:",`Subroute "${t.name}" is not registered or does not have an active instance.`)})),qt();const Gt=[Ht(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){console.log(this.root.tagName,"message:",t)}onCreate(){}onInit(){const t=z("div");for(;this.root.firstChild;)t.appendChild(this.root.firstChild);this.root.append(t)}onDestroy(){}},"csm-modal-window","<style>txt-val{display: contents !important;}qsi-bind{display: contents !important;}qsi-subroute{display: contents !important;}csmmodalwindow{display: contents !important;}</style> <csm-button></csm-button>",!1,!0),...Pt],Kt=t.name;let jt="";for(let t=0;t<Kt.length;t++){const e=Kt[t];let s="";for(let t=0;t<26;t++){const n="abcdefghijklmnopqrstuvwxyz"[t];if(n===e.toLowerCase()){s=n;break}}jt+=s||"-"}const Xt="app-"+jt,Qt=new class{constructor(){this.isDestroyed=!1,this.popstate=this.popState.bind(this),this.state$=new b(""),k.addEventListener("popstate",this.popstate),this.popState()}set(t){this.isDestroyed||(k.history.pushState({},"",t),this.popState())}setWithoutHistory(t){this.isDestroyed||(k.history.replaceState({},"",t),this.popState())}subscribe(t){if(!this.isDestroyed)return this.state$.subscribe(t)}destroy(){k.removeEventListener("popstate",this.popstate),this.state$.destroy(),this.isDestroyed=!0}popState(){const t=k.location.pathname;this.state$.next(t)}};var Yt;!function(t){t.SHOW="SHOW",t.SHOW_WITHOUT_HISTORY="SHOW_WITHOUT_HISTORY",t.HIDDEN="HIDDEN"}(Yt||(Yt={}));let Jt=Yt.SHOW;const Zt=new b(""),te=new b(null);let ee;const se=new _;var ne,ie;ne||(ne={}),function(t){te.next({defaultCmd:t,routes:void 0}),Zt.next(t)}(),ie=Yt.SHOW,Jt=ie,qt();const oe=[...Gt,Ht(class{constructor(t){this.root=t,this.name=t.tagName}onMessage(t){console.log(this.root.tagName,"message:",t)}onCreate(){}onInit(){}onDestroy(){}},Xt,"<csm-modal-window> 123</csm-modal-window>")];Bt([Ht(class{},q.TEXT_VALUE.toLowerCase(),""),Ht(class{},q.QSI_BIND.toLowerCase(),""),Ht(class{constructor(t){this.root=t,this.cmd={},this.path={}}onInit(){this.process()}onDestroy(){se.unsubscribeAll()}process(){se.collect(Zt.pipe().refine((t=>!!t)).subscribe((t=>this.setCommand(t))),Qt.subscribe((t=>this.setHistory(t)))),te.getValue()?this.init():te.pipe().refine((t=>!!t)).setOnce().subscribe((()=>this.init()))}init(){let t=te.getValue();ee=t.defaultCmd;const e=t.routes;for(let t=0;t<e.length;t++)this.cmd[e[t].command]=e[t],this.path[e[t].path]=e[t];this.setCommand(ee)}setCommand(t){switch(this.setRoute(this.cmd[t]),Jt){case Yt.HIDDEN:break;case Yt.SHOW:Qt.set(this.cmd[t].path);break;case Yt.SHOW_WITHOUT_HISTORY:Qt.setWithoutHistory(this.cmd[t].path)}}setHistory(t){t in this.path&&this.setRoute(this.path[t])}setRoute(t){const e=t.component.qsi_app_tag_name;this.root.innerHTML=`<${e}></${e}>`}},q.APP_ROUTE.toLowerCase(),""),Ht(zt,q.APP_SUB_ROUTE.toLowerCase(),"")]);const re=new class{constructor(){this.isComponentMode=!1}register(t){Bt(t,!0)}run(t){this.isComponentMode=!!t,J((()=>{this.process()}))}process(){this.init(),this.start()}init(){this.isComponentMode||(this.appElement=z(Xt))}start(){const t=G(Ft.join("")),e=G("");X(R.head,t),X(R.head,e),!this.isComponentMode&&X(R.body,this.appElement)}};r.init(),y.setLocation(a.EN),re.register(oe),re.run()})();