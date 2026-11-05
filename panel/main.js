(()=>{var V="openchamber.sdk",N=1;var TT=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function _S(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(U)=>{let C=U.target===_?S:U.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let I=O.get(C);if(I!==void 0)clearTimeout(I);O.set(C,setTimeout(()=>{O.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var nS=`(${_S.toString()})(document);`;var ST=128,ET=65536;var B_=128;var K_=65536;var OS=/^[a-z][a-z0-9-]{0,39}$/;var TS=(_)=>Object(_)===_&&!Array.isArray(_),OT=(_,S)=>Object.keys(_).every((O)=>S.includes(O)),SS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,ES=(_)=>String(_)===_&&_.length>=1&&_.length<=80,US=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let O of _){if(!TS(O)||!OS.test(O.id)||!SS(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(S.has(O.id))return!1;if(S.add(O.id),O.kind==="button"){if(!OT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!OT(O,["kind","id","label","value","options","disabled"]))return!1;if(!ES(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let U=new Set;for(let C of O.options){if(!TS(C)||!OT(C,["value","label"])||!ES(C.value)||!SS(C.label)||U.has(C.value))return!1;U.add(C.value)}if(!U.has(O.value))return!1}return!0};var AS=["{id}","{segment}","{segments+}"];var xE=new Set(AS);var MS=["turn-finished","turn-failed","permission-asked","question-asked"];var qE=new Set(MS);var f_=20000000,j_=256;var UT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,RS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==S.bytes[O])return!1;return!0};var CS=/^[A-Za-z0-9_-]{1,80}$/;var GS=["left","right","top","bottom"];var DS=(_,S=0,O={remaining:16000})=>{if(--O.remaining<0||S>=32)return!1;if(_===null)return!0;let U=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of U)if(!DS(C,S+1,O))return!1;return!0},AT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(AT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(AT)}return String(_)===_||Number.isFinite(_)},MT=(_)=>{try{if(String(_.id)!==_.id||!CS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!GS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!DS(_.data)||!AT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var IS=["file","directory","other","missing"],CT=(_)=>Boolean(_&&"sessionId"in _),GT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var VS=/^[0-9a-f]{7,64}$/i,DT=(_)=>VS.test(_),H_=500,w_=32000,NS=16000,WS=128,PS=200,YS=2000,QS=16000,ZS=80,kS=200,zS=16000;var LS=2000;var XT=20000,x_=1024,b_=2000000;var q_=64000,y_=8000,IT=4000;var VT=960000;var $S=999,FS=1e4,W_=500,JS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],BS=["stopped","starting","ready","failed"],oS=new Set(JS),KS=(_)=>oS.has(_),fS=(_)=>_&&KS(_)?_:"HOST_REJECTED",S_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(S_);if(Object(_)===_)return Object.values(_).every(S_);return!1},jS=(_)=>S_(_)&&JSON.stringify(_).length<=zS,XS=(_)=>_?.trim().slice(0,kS)??"",E_=(_)=>{let S=_.id.trim().slice(0,WS),O=_.title.trim().slice(0,PS),U=_.url.trim().slice(0,YS),C=_.text?.trim().slice(0,QS),I=_.author?.trim().slice(0,ZS),$=_.kind==="pull"?"pull":"issue",W={providerId:_.providerId.trim(),id:S,title:O||S,url:U,kind:$};if(C)W.text=C;if(I)W.author=I;if($==="pull"){let Z=XS(_.branches?.head),j=XS(_.branches?.base);if(Z&&j)W.branches={head:Z,base:j}}if(jS(_.data))W.data=_.data;return W},NT=(_)=>{let S=E_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},WT=(_)=>{let S={text:_.text.trim().slice(0,NS)};if(_.send)S.send=!0;return S},PT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min($S,Math.max(0,Math.round(_)))},YT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(FS,Math.max(0,Math.ceil(_)))};var O_=(_)=>_.length>0&&_.length<=x_&&!_.includes("\x00")&&!_.includes("\\");var h_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>LS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},rS=new Set(BS),QT=(_)=>Boolean(_&&"status"in _&&rS.has(String(_.status))&&!("body"in _)),g_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),ZT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),kT=(_)=>Boolean(_&&"written"in _&&_.written===!0),zT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),sS=new Set(IS),LT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&sS.has(String(_.kind))&&Number.isFinite(_.size)),$T=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),tS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),eS=(_)=>Object(_)===_?_:null,RT=(_)=>String(_)===_&&_.length>0,_E=(_)=>{if(!RT(_.id))return null;if(_.ok===!0){let S={channel:V,v:N,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&RT(_.error))return{channel:V,v:N,type:"result",id:_.id,ok:!1,error:_.error,code:fS(RT(_.code)?_.code:void 0)};return null},FT=(_)=>{let S=eS(_);if(!S||S.channel!==V||S.v!==N)return null;if(S.type==="result")return _E(S);if(!tS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var HS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),TE=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var wS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),m_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${x_} characters without NUL or backslash.`)),c_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},JT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===S.parent),U=_.requestTimeoutMs??XT,C=new Set,I=new Set,$=new Set,W=new Set,Z=new Set,j=new Set,C_=new Set,Z_=new Set,k_=new Set,t=new Set,r_=[],G_=null,D_=null,z_=new Set,L_=new Set,X_=null,I_=null,s_=!1,e=new Map,__=new Map,T_=new Map,d=!1,D={value:0},G=null,v=null,V_=!1,N_=!1,dT=null,vT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},h=(T)=>{S.parent.postMessage(T,"*")},uT=()=>{if(d||S.parent===S||t.size===0||G?.features?.lateGenerateResults!==!0)return;h({channel:V,v:N,type:"generate-late-listen"})},F=(T,E)=>{for(let A of T)try{A(E)}catch(M){console.error(M)}},lT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let E=FT(T.data);if(!E)return;if(E.type==="workspace"){let M=__.get(E.payload.subscriptionId);if(M)F([M],E.payload.snapshot);return}if(E.type==="shells"){let M=T_.get(E.payload.subscriptionId);if(M)F([M],E.payload.snapshot);return}if(E.type==="ready"){if(G=E.payload,v=vT(E.payload.session),F(C,E.payload),F(I,E.payload.directory),F($,E.payload.session),v)F(W,v);F(Z,E.payload.connection),F(j,E.payload.settings),F(C_,E.payload.item),uT();return}if(E.type==="generate-late"){if(t.size===0)r_.push(E.payload);else F(t,E.payload);return}if(E.type==="directory"){if(G)G={...G,directory:E.payload.directory};F(I,E.payload.directory);return}if(E.type==="session"){if(G)G={...G,session:E.payload.session};if(!E.payload.session)v=null;else if(v?.sessionId!==E.payload.session.id)v=vT(E.payload.session);F($,E.payload.session);return}if(E.type==="session-lifecycle"){v=E.payload,F(W,E.payload);return}if(E.type==="connection"){if(G)G={...G,connection:E.payload.connection};F(Z,E.payload.connection);return}if(E.type==="settings"){if(G)G={...G,settings:E.payload.settings};F(j,E.payload.settings);return}if(E.type==="item"){if(G)G={...G,item:E.payload.item};F(C_,E.payload.item);return}if(E.type==="status-control-event"){F(Z_,E.payload);return}if(E.type==="popover-closed"){F(k_,E.payload);return}if(E.type==="action"){let M=(P)=>{if(!d)h({channel:V,v:N,type:"action-result",id:E.id,payload:P})},Y=D_;if(!Y){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Y(E.payload)).then(()=>M({ok:!0}),(P)=>{let K=(P instanceof Error?P.message:String(P)).trim();M({ok:!1,error:(K||"Action failed.").slice(0,W_)})});return}if(E.type==="file-open"){let M=E.payload;if(I_&&RS(I_,M))return;I_=M,F(z_,E.payload);return}if(E.type==="file-saved"){F(L_,E.payload.version);return}if(E.type==="file-snapshot"){let M=(K)=>{if(!d)h({channel:V,v:N,type:"file-snapshot-result",id:E.id,payload:K})},Y=(K)=>M({error:(K.trim()||"Could not read the edited file.").slice(0,W_)}),P=X_;if(!P){Y("This extension does not edit files.");return}Promise.resolve().then(()=>P(E.payload.purpose)).then((K)=>{if(UT(K)>f_){Y(`The file is over ${f_} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>j_){Y(`The snapshot version is over ${j_} characters.`);return}M({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>Y(K instanceof Error?K.message:String(K)));return}if(E.type==="resolve"){let M=(P)=>{h({channel:V,v:N,type:"resolve-result",id:E.id,payload:P})},Y=G_;if(!Y){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Y(E.payload)).then((P)=>M({item:P?E_(P):null}),(P)=>{let K=(P instanceof Error?P.message:String(P)).trim();M({error:(K||"Command failed.").slice(0,W_)})});return}let A=e.get(E.id);if(!A)return;if(clearTimeout(A.timer),e.delete(E.id),E.ok){A.resolve(E.payload);return}A.reject(new R(E.code,E.error))};S.addEventListener("message",lT),h({channel:V,v:N,type:"hello"});let H=(T,E=U)=>{if(d||S.parent===S)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,M)=>{let Y=setTimeout(()=>{e.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},E);e.set(T.id,{resolve:A,reject:M,timer:Y}),h(T)})},J=(T)=>H(T).then(()=>{return}),B={channel:V,v:N},t_=(T)=>{if(!d&&S.parent!==S)h(T)},aT=()=>t_({...B,type:"file-save"}),nT=(T)=>{if(!HS(T)||!TE(T))return;T.preventDefault(),aT()},iT=(T)=>{if(!HS(T)||T.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;T.preventDefault(),tT(G.popover.id,"escape").catch(()=>{return})},$_=()=>{let T=G?.surface==="popover"?G.popover:void 0;if(!T)return;let E=V_||N_;if(dT===E)return;dT=E,eT(T.id,E).catch(()=>{return})},F_=()=>{if(G?.surface!=="popover"||V_)return;V_=!0,$_()},oT=(T)=>{if(G?.surface!=="popover"||T.relatedTarget!==null||!V_)return;V_=!1,$_()},rT=()=>{if(G?.surface!=="popover"||N_)return;N_=!0,$_()},sT=()=>{if(G?.surface!=="popover"||!N_)return;N_=!1,$_()},c=(T,E=1024)=>{if(!T.trim()||T.length>E)throw new R("HOST_REJECTED",`Identity must contain 1 to ${E} characters.`)},e_=async(T)=>{if(T.kind!=="projects")c(T.projectId);let E=await H({...B,type:"workspace-read",id:X(D),payload:T});if(!E||!("kind"in E)||!("state"in E)||E.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return E},_T=async(T,E)=>{if(T.kind!=="projects")c(T.projectId);let A=X(D);__.set(A,E);try{await J({...B,type:"workspace-subscribe",id:X(D),payload:{subscriptionId:A,query:T}})}catch(M){if(__.delete(A),!d)h({...B,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:A}});throw M}return()=>{if(!__.delete(A)||d)return;h({...B,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:A}})}},aS=async(T,E)=>{if(T.kind==="session")c(T.sessionId);if(T.kind==="project")c(T.projectId);let A=X(D);T_.set(A,E);try{await J({...B,type:"shells-subscribe",id:X(D),payload:{subscriptionId:A,scope:T}})}catch(M){if(T_.delete(A),!d)h({...B,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:A}});throw M}return()=>{if(!T_.delete(A)||d)return;h({...B,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:A}})}},J_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>ST))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!S_(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>ET)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&G?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let E=await H({...B,type:"storage",id:X(D),payload:T});if(!E||!("storage"in E)||E.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return E},tT=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):J({...B,type:"popover-close",id:X(D),payload:E?{id:T,reason:E}:{id:T}}),eT=(T,E)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):J({...B,type:"popover-anchor",id:X(D),payload:{id:T,active:E}});return S.addEventListener("keydown",iT,!0),S.addEventListener("pointerover",F_),S.addEventListener("pointermove",F_),S.addEventListener("pointerout",oT),S.addEventListener("focus",rT),S.addEventListener("blur",sT),{onAction:(T)=>{return D_=T,()=>{if(D_===T)D_=null}},listProjects:async()=>{let T=await e_({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let E=await e_({kind:"worktrees",projectId:T});if(E.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return E},listSessions:async(T)=>{let E=await e_({kind:"sessions",projectId:T});if(E.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return E},onProjects:(T)=>_T({kind:"projects"},(E)=>{if(E.kind==="projects")T(E)}),onWorktrees:(T,E)=>_T({kind:"worktrees",projectId:T},(A)=>{if(A.kind==="worktrees")E(A)}),onSessions:(T,E)=>_T({kind:"sessions",projectId:T},(A)=>{if(A.kind==="sessions")E(A)}),onRunningShells:(T,E)=>aS(T,E),readShellOutput:async(T,E)=>{c(T,B_);let A=E?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=E?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>K_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${K_}.`);let P=await H({...B,type:"shell-output",id:X(D),payload:{shellId:T,cursor:A,tailBytes:M}});if(!P||typeof P.output!=="string"||!Number.isFinite(P.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async(T)=>{if(c(T,B_),(await H({...B,type:"shell-stop",id:X(D),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{c(T),await J({...B,type:"open-session",id:X(D),payload:{sessionId:T}})},storage:{get:async(T,E)=>{let A=c_(E),M={op:"get",key:T};if(A)M.scope=A;let Y=await J_(M);return Y.op==="get"&&Y.found?Y.value:void 0},set:async(T,E,A)=>{let M=c_(A),Y={op:"set",key:T,value:E};if(M)Y.scope=M;await J_(Y)},delete:async(T,E)=>{let A=c_(E),M={op:"delete",key:T};if(A)M.scope=A;await J_(M)},keys:async(T)=>{let E=c_(T),A={op:"keys"};if(E)A.scope=E;let M=await J_(A);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(C.add(T),G)T(G);return()=>{C.delete(T)}},onDirectory:(T)=>{if(I.add(T),G)T(G.directory);return()=>{I.delete(T)}},onSession:(T)=>{if($.add(T),G)T(G.session);return()=>{$.delete(T)}},onSessionLifecycle:(T)=>{if(W.add(T),v)T(v);return()=>{W.delete(T)}},onConnection:(T)=>{if(Z.add(T),G)T(G.connection);return()=>{Z.delete(T)}},onSettings:(T)=>{if(j.add(T),G)T(G.settings);return()=>{j.delete(T)}},onItem:(T)=>{if(C_.add(T),G)T(G.item);return()=>{C_.delete(T)}},onStatusControl:(T)=>{return Z_.add(T),()=>{Z_.delete(T)}},onPopoverClosed:(T)=>{return k_.add(T),()=>{k_.delete(T)}},setStatusControls:(T)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!US(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return J({...B,type:"status-controls",id:X(D),payload:{controls:T}})},openPopover:(T)=>{if(G?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!MT(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return J({...B,type:"popover-open",id:X(D),payload:T})},closePopover:tT,setPopoverAnchorActive:eT,onResolve:(T)=>{return G_=T,()=>{if(G_===T)G_=null}},toast:(T)=>{let E=T.message.trim();if(!E||E.length>H_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${H_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>w_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${w_} characters.`));return J({channel:V,v:N,type:"toast",id:X(D),payload:{...T,message:E}})},openUrl:(T)=>J({channel:V,v:N,type:"open-url",id:X(D),payload:{url:T}}),openCommit:(T)=>DT(T)?J({channel:V,v:N,type:"open-commit",id:X(D),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>J({channel:V,v:N,type:"open-surface",id:X(D),payload:{surfaceId:T}}),writeClipboard:(T)=>J({channel:V,v:N,type:"clipboard-write",id:X(D),payload:{text:T}}),compose:(T)=>J({channel:V,v:N,type:"compose",id:X(D),payload:T}),attach:(T)=>J({channel:V,v:N,type:"attach",id:X(D),payload:E_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)c(T.projectId);let E=T.worktree;if(E&&E!==!0)if(E.kind==="existing")c(E.directory);else{if(E.name!==void 0)c(E.name,200);if(E.baseBranch!==void 0)c(E.baseBranch,200)}let A=await H({channel:V,v:N,type:"start-session",id:X(D),payload:NT(T)},_.requestTimeoutMs??180000);if(!CT(A))throw new R("HOST_REJECTED","Host did not return a session.");return A},prompt:(T)=>H({channel:V,v:N,type:"prompt",id:X(D),payload:WT(T)}).then((E)=>{if(!GT(E))throw new R("HOST_REJECTED","Host did not return a prompt result.");return E}),sessionLink:(T)=>J({channel:V,v:N,type:"session-link",id:X(D),payload:E_(T)}),close:()=>J({channel:V,v:N,type:"close",id:X(D)}),oauthStart:()=>J({channel:V,v:N,type:"oauth-start",id:X(D)}),oauthDisconnect:()=>J({channel:V,v:N,type:"oauth-disconnect",id:X(D)}),request:(T)=>(h_(T.path)?H({channel:V,v:N,type:"request",id:X(D),payload:T}):wS()).then((E)=>{if(!g_(E))throw new R("HOST_REJECTED","Host request result was empty.");return E}),serviceRequest:(T)=>(h_(T.path)?H({channel:V,v:N,type:"service-request",id:X(D),payload:T}):wS()).then((E)=>{if(!g_(E))throw new R("HOST_REJECTED","Host service request result was empty.");return E}),serviceStatus:()=>H({channel:V,v:N,type:"service-status",id:X(D)}).then((T)=>{if(!QT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(O_(T)?H({channel:V,v:N,type:"file-read",id:X(D),payload:{path:T}}):m_()).then((E)=>{if(!ZT(E))throw new R("HOST_REJECTED","Host did not return file content.");return E}),writeFile:(T,E)=>{if(!O_(T))return m_();if(E.length>b_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${b_} characters.`));return H({channel:V,v:N,type:"file-write",id:X(D),payload:{path:T,content:E}}).then((A)=>{if(!kT(A))throw new R("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(T)=>(O_(T)?H({channel:V,v:N,type:"file-list",id:X(D),payload:{path:T}}):m_()).then((E)=>{if(!zT(E))throw new R("HOST_REJECTED","Host did not return directory entries.");return E}),stat:(T)=>(O_(T)?H({channel:V,v:N,type:"file-stat",id:X(D),payload:{path:T}}):m_()).then((E)=>{if(!LT(E))throw new R("HOST_REJECTED","Host did not return file status.");return E}),generate:(T)=>{let E=T.prompt.trim(),A=T.system?.trim();if(E.length===0||E.length>q_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${q_} characters.`));if(A!==void 0&&(A.length===0||A.length>y_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${y_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(IT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let Y={prompt:E};if(A!==void 0)Y.system=A;if(M!==void 0)Y.maxOutputTokens=M;return H({channel:V,v:N,type:"generate",id:X(D),payload:Y},_.requestTimeoutMs??VT).then((P)=>{if(!$T(P))throw new R("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:(T)=>{t.add(T);for(let E of r_.splice(0))F([T],E);return uT(),()=>{t.delete(T)}},setBadge:(T)=>J({channel:V,v:N,type:"badge",id:X(D),payload:{count:PT(T)}}),setHeight:(T)=>J({channel:V,v:N,type:"resize",id:X(D),payload:{height:YT(T)}}),onFileOpen:(T)=>{if(z_.add(T),!s_)s_=!0,S.addEventListener("keydown",nT,!0);if(I_)T(I_);return()=>{z_.delete(T)}},onFileSnapshot:(T)=>{return X_=T,()=>{if(X_===T)X_=null}},onFileSaved:(T)=>{return L_.add(T),()=>{L_.delete(T)}},reportFileChange:(T)=>t_({...B,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:aT,reportFileUnsupported:()=>t_({...B,type:"file-unsupported"}),dispose:()=>{for(let T of __.keys())h({...B,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:T}});__.clear();for(let T of T_.keys())h({...B,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:T}});if(T_.clear(),d=!0,G_=null,D_=null,X_=null,z_.clear(),L_.clear(),s_)S.removeEventListener("keydown",nT,!0);S.removeEventListener("message",lT),S.removeEventListener("keydown",iT,!0),S.removeEventListener("pointerover",F_),S.removeEventListener("pointermove",F_),S.removeEventListener("pointerout",oT),S.removeEventListener("focus",rT),S.removeEventListener("blur",sT);for(let T of e.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));e.clear(),C.clear(),I.clear(),$.clear(),W.clear(),Z.clear(),j.clear(),C_.clear(),Z_.clear(),k_.clear(),t.clear(),r_.length=0}}};var xS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var oE=new Set(xS);var bS=["none","agent","user"];var sE=new Set(bS);var SE=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],EE=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qS=(_,S)=>{S.style.colorScheme=_.mode;for(let[O,U]of SE)S.style.setProperty(O,_.tokens[U]);for(let[O,U,C]of EE){let I=_.tokens[C]??"";S.style.setProperty(O,I),S.style.setProperty(U,I)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},BT=(_,S)=>{if(qS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var OE={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Q=(_,S)=>`var(--${_}, var(--oc-${OE[_]}, ${S}))`,l=Q("surface-background","transparent"),d_=Q("surface-elevated","transparent"),U_=Q("surface-elevated-foreground","inherit"),g=Q("surface-foreground","inherit"),k=Q("surface-muted-foreground","gray"),UE=Q("surface-muted","transparent"),i=Q("interactive-border","currentColor"),x=Q("interactive-hover","transparent"),o=Q("interactive-active","transparent"),KT=Q("interactive-selection","transparent"),fT=Q("interactive-selection-foreground","inherit"),u=Q("primary","currentColor"),jT=Q("primary-text","inherit"),HT=Q("error-text","inherit"),AE=Q("font-sans","inherit"),wT=Q("font-mono","monospace"),mS=Q("radius","9px"),xT=`calc(${mS} - 2px)`,yS=`calc(${mS} - 4px)`,z=(_,S,O="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${O})`,hS=`background-image: linear-gradient(${x}, ${x});`,bT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,qT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",gS="box-shadow: var(--oc-sdk-lit);",yT=`inset 0 0.5px 0 0 ${z(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ME=`
:root {
  --oc-sdk-edge: ${z(g,16)};
  --oc-sdk-field-bg: ${d_};
  --oc-sdk-raised-bg: ${l};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${z(g,14)};
  --oc-sdk-field-bg: ${z(l,50,d_)};
  --oc-sdk-raised-bg: ${d_};
  --oc-sdk-field-lift: ${yT};
  --oc-sdk-raised-lift: ${yT};
  --oc-sdk-lit: ${yT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,p_=(_)=>{let S=Q(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${Q(`${_}-text`,"inherit")}; }`},RE=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,cS=`${ME}
.oc-sdk { color: ${g}; font-family: ${AE}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${hS} }
.oc-sdk-mono { font-family: ${wT}; }
.oc-sdk-muted { color: ${k}; }
${p_("success")}${p_("warning")}${p_("error")}${p_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${u}; --oc-sdk-tone-text: ${jT}; }

.oc-sdk-btn { border-radius: ${xT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${yS}; }
.oc-sdk-btn[data-variant="default"] { color: ${jT}; background: ${z(u,10,l)}; border-color: ${z(u,12)}; ${gS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${z(u,16,l)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${z(u,22,l)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${UE}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${o}, ${o}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${U_}; ${qT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${o}, ${o}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${x}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${o}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Q("status-error","red")}; color: ${HT}; background: ${z("var(--oc-sdk-tone)",7,l)}; border-color: ${z("var(--oc-sdk-tone)",12)}; ${gS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${z("var(--oc-sdk-tone)",9,l)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${z("var(--oc-sdk-tone)",11,l)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${HT}; }
.oc-sdk-input { border-radius: ${xT}; background: var(--oc-sdk-field-bg); color: ${U_}; ${bT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${bT(z(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${bT(Q("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${wT}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${u}; }
.oc-sdk-search-clear { border-radius: ${yS}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${x}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${xT}; background: var(--oc-sdk-raised-bg); color: ${U_}; ${qT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${o}, ${o}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${U_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${d_}; background-clip: padding-box; color: ${U_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${x}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${KT}; color: ${fT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${HT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${z(Q("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${i}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${z(g,60,i)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${i}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${l}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${u}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${hS} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${z(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fT}; background: ${KT}; border-color: ${i}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${U_}; background: var(--oc-sdk-raised-bg); ${qT} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${z(g,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${x}; }
.oc-sdk-row[aria-selected="true"] { background: ${KT}; color: ${fT}; }
.oc-sdk-row-lead { font-family: ${wT}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${i}; border-top-color: ${u}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${z(i,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${z(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${u}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Q("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Q("success-text","inherit")}; }

.oc-sdk-text a { color: ${jT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${z(i,60)}; }
`,w=`
${TT}
${RE}
${cS}`;var R_=JT(),dS=document.querySelector("#root");if(!dS)throw Error("Missing #root");dS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:12px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.top{display:flex;gap:8px;align-items:center}
select{flex:1;padding:6px 8px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,#fff);color:var(--oc-fg,inherit);color-scheme:light dark}
select option{background:var(--oc-elevated,#fff);color:var(--oc-fg,#111)}
button{padding:6px 12px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5}
.sync{font-size:12px;opacity:.75}
h3{margin:6px 0 0;font-size:12px;opacity:.65;font-weight:600}
table{width:100%;border-collapse:collapse;font-size:12px}
td{padding:5px 4px;border-bottom:1px solid #8882;vertical-align:middle}
.mono{font-family:monospace}
.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:0;width:100%}
.empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:28px 0;opacity:.75}
.empty .ic{font-size:26px;opacity:.4}
#done[hidden],#nongit[hidden],#conflict[hidden]{display:none!important}
#conflict{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,#7f1d1d 92%,transparent);z-index:20;text-align:center;padding:16px}
#conflict .big{font-size:44px}
#conflict table{max-width:100%}
#conflict td{border-bottom:1px solid #fff3}
textarea{width:100%;min-height:64px;padding:8px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:12px;opacity:.65}
.spin{display:inline-block;animation:rot 1s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
#done{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,var(--oc-elevated,#000) 88%,transparent);z-index:10;text-align:center}
#done .big{font-size:52px;animation:pop .45s ease-out}
@keyframes pop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1)}}
.confetti{position:absolute;top:-8px;width:8px;height:12px;opacity:.9;animation:fall 1.6s ease-in forwards}
@keyframes fall{to{transform:translateY(220px) rotate(540deg);opacity:0}}
</style>
<div class="top" id="topbar">
  <select id="branch" title="分支，选中直接切换"></select>
  <button id="btn-pull" title="拉取远程代码 git pull">下载</button>
  <button id="btn-refresh" title="重新对比远程与本地">↻</button>
</div>
<div id="sync" class="sync">等待项目…</div>
<div id="nongit" class="empty" hidden>
  <div class="ic">—○—</div><div>非git项目</div><div class="mut">先打开一个 git 仓库项目</div>
</div>
<h3 id="h-remote">远程新提交</h3>
<div id="remote"><div class="mut">—</div></div>
<h3 id="h-local">本地未提交</h3>
<div id="local"><div class="mut">—</div></div>
<div id="conflict" hidden>
  <div class="big">⛔</div>
  <div style="font-size:15px;font-weight:700">出现合并冲突请自行处理</div>
  <div class="mut" style="color:#fecaca">插件不会自动合并以下文件在外部处理完再回来</div>
  <table id="conflict-list"></table>
  <button id="btn-conflict-ok">我知道了</button>
</div>
<div id="done" hidden>
  <div class="big">\uD83C\uDF89</div>
  <div style="font-size:15px">提交成功</div>
  <button id="btn-again">继续</button>
</div>
<div id="commitBox">
  <textarea id="msg" placeholder="提交信息，如 feat: xxx"></textarea>
  <div class="row" style="margin-top:8px">
    <button id="btn-ai" title="AI 生成提交信息">✨</button>
    <span style="flex:1"></span>
    <button id="btn-commit" class="primary">提交并推送</button>
  </div>
  <div id="out" class="mut"></div>
</div>
`;var f=(_)=>document.querySelector(`#${_}`),n=f("branch"),p=f("sync"),n_=f("remote"),i_=f("local"),o_=f("msg"),m=f("out"),IE=f("topbar"),VE=f("h-remote"),NE=f("h-local"),WE=f("nongit"),PE=f("commitBox"),Y_=f("done"),vS=f("conflict"),pS=f("conflict-list"),YE=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),gT="",uS=(_)=>{let S=YE(_);if(S.length===0){gT="";return}let O=S.join(`
`);if(O===gT)return;gT=O,pS.innerHTML="";for(let U of S.slice(0,20)){let C=document.createElement("tr"),I=document.createElement("td");I.className="mono ellipsis",I.textContent=U,C.appendChild(I),pS.appendChild(C)}vS.hidden=!1},mT=(_)=>{WE.hidden=!_,IE.style.display=_?"none":"",p.style.display=_?"none":"",VE.style.display=_?"none":"",n_.style.display=_?"none":"",NE.style.display=_?"none":"",i_.style.display=_?"none":"",PE.style.display=_?"none":""},L=null,M_=!1,y=(_,S,O)=>R_.serviceRequest({method:_,path:S,body:O===void 0?void 0:JSON.stringify(O)});var QE=async(_,S)=>{try{let O=await y("GET",`/branches?dir=${encodeURIComponent(_)}`),U=JSON.parse(O.body);if(!U.ok||!U.branches)return;if(n.value&&n.value===S&&n.options.length>0)return;n.innerHTML="";for(let C of U.branches){let I=document.createElement("option");if(I.value=C.name,I.textContent=C.name,C.current)I.selected=!0;n.appendChild(I)}}catch{}},cT=(_)=>{n_.innerHTML="";let S=_.incoming??[];if(S.length===0){n_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let O=document.createElement("table");for(let U of S){let C=document.createElement("tr"),I=document.createElement("td");I.className="mono ellipsis",I.textContent=`${U.sha} ${U.subject}`,I.title=`${U.sha} ${U.subject} · ${U.author} ${U.date}`,C.appendChild(I),O.appendChild(C)}n_.appendChild(O)},ZE=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let U="改动";if(_==="A"||S==="A")U="新增";else if(_==="D"||S==="D")U="删除";else if(_==="R"||S==="R")U="重命名";else if(_==="C"||S==="C")U="复制";else if(_==="T"||S==="T")U="类型变更";else if(_==="M"||S==="M")U="修改";return _!==" "&&_!=="?"&&_!=="!"?`${U}·已暂存`:U},lS=(_)=>{i_.innerHTML="";let S=_.files??[];if(S.length===0){let U=document.createElement("div");U.className="empty",U.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',i_.appendChild(U);return}let O=document.createElement("table");for(let U of S){let C=document.createElement("tr"),I=document.createElement("td");I.style.width="28px";let $=document.createElement("input");$.type="checkbox",$.checked=U.staged.trim()!==""&&U.staged!=="?"&&U.staged!==" ",$.title=$.checked?"已暂存点取消":"未暂存点暂存",$.onchange=async()=>{if(!L)return;await y("POST",$.checked?"/stage":"/unstage",{dir:L,paths:[U.path]}),pT()},I.appendChild($);let W=document.createElement("td");W.className="mono ellipsis",W.textContent=U.path,W.title=U.path;let Z=document.createElement("td");Z.style.width="92px",Z.style.minWidth="92px",Z.style.textAlign="right",Z.style.whiteSpace="nowrap",Z.style.fontSize="11px",Z.className="mut",Z.textContent=ZE(U.staged,U.unstaged),C.append(I,W,Z),O.appendChild(C)}i_.appendChild(O)},kE=(_,S)=>{QE(S,_.branch??"")},zE=(_)=>{let S=_.ahead??0,O=_.behind??0;if(O>0&&S>0)p.textContent=`远程 ${O} 个新，本地超前 ${S}`;else if(O>0)p.textContent=`远程有 ${O} 个新提交，可下载`;else if(S>0)p.textContent=`本地超前 ${S}可推送`;else p.textContent="已是最新";R_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},Q_=async()=>{if(!L||M_)return;M_=!0;let _=L;p.textContent="同步中…";try{await y("POST","/fetch",{dir:_}).catch(()=>{return});let S=await y("GET",`/status?dir=${encodeURIComponent(_)}`),O=JSON.parse(S.body);if(!O.ok||O.branch===void 0){mT(!0);return}mT(!1),zE(O),kE(O,_),cT(O),lS(O),uS(O)}catch(S){p.textContent=S instanceof R?`${S.code}`:"同步失败"}finally{M_=!1}},pT=async()=>{if(!L||M_||document.hidden)return;M_=!0;try{let _=await y("GET",`/status?dir=${encodeURIComponent(L)}`),S=JSON.parse(_.body);if(!S.ok)return;lS(S),uS(S),R_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{M_=!1}};f("btn-refresh").onclick=()=>void Q_();f("btn-pull").onclick=async()=>{if(!L)return;p.textContent="下载中…";try{await y("POST","/pull",{dir:L})}catch{}Q_()};n.onchange=async()=>{if(!L||!n.value)return;p.textContent=`切换到 ${n.value}…`;let _=await y("POST","/checkout",{dir:L,branch:n.value}),S=JSON.parse(_.body);if(!S.ok)p.textContent=S.output||S.error||"切换失败";Q_()};var r=f("btn-commit");r.onclick=async()=>{if(!L||r.disabled)return;let _=o_.value.trim();if(!_){m.textContent="先写提交信息";return}r.disabled=!0;let S=r.textContent;r.innerHTML='<span class="spin">↻</span> 提交中…';try{await y("POST","/fetch",{dir:L}).catch(()=>{return});let O=await y("GET",`/status?dir=${encodeURIComponent(L)}`),U=JSON.parse(O.body),C=U.behind??0;if(C>0){m.textContent=`远程有 ${C} 个新提交，先点下载合并后再提交`,p.textContent=`远程有 ${C} 个新提交可下载`,cT(U);return}m.textContent="提交…";let I=await y("POST","/commit",{dir:L,message:_,push:!0}),$=JSON.parse(I.body);if(!$.ok){m.textContent=$.error||"提交失败";return}m.textContent="跟远程核验中…",await y("POST","/fetch",{dir:L}).catch(()=>{return});let W=await y("GET",`/status?dir=${encodeURIComponent(L)}`),Z=JSON.parse(W.body),j=Z.ahead??0;if(j>0){m.textContent=`已提交但远程核验本地仍超前 ${j}推送可能没完全成功请检查`,cT(Z);return}o_.value="",m.textContent="已提交并推送远程核验一致",LE()}catch(O){m.textContent=O instanceof R?`${O.code}`:"提交失败"}finally{r.disabled=!1,r.textContent=S,Q_()}};f("btn-ai").onclick=async()=>{if(!L)return;m.textContent="AI 生成中…";try{let _=await y("GET",`/status?dir=${encodeURIComponent(L)}`),S=JSON.parse(_.body),O=(W)=>W.trim()!==""&&W!=="?"&&W!==" ",U=(S.files??[]).filter((W)=>O(W.staged));if(U.length===0){m.textContent="先勾选要提交的文件";return}let C="";for(let W of U.slice(0,3)){try{let Z=await y("GET",`/diff?dir=${encodeURIComponent(L)}&file=${encodeURIComponent(W.path)}&staged=1`),j=JSON.parse(Z.body);if(j.ok&&j.diff)C+=`
--- ${W.path} ---
${j.diff.slice(0,2000)}`}catch{}if(C.length>6000)break}let I=U.map((W)=>`${W.staged}${W.unstaged} ${W.path}`).join(`
`).slice(0,1000),{text:$}=await R_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${I}${C.slice(0,6000)}`,maxOutputTokens:100});o_.value=$.trim(),m.textContent=`已按 ${U.length} 个勾选文件生成`}catch{m.textContent="无小模型或未授权 model"}};var s=null;f("btn-again").onclick=()=>{if(s)clearTimeout(s),s=null;Y_.hidden=!0};var LE=()=>{if(s)clearTimeout(s);Y_.hidden=!1,s=setTimeout(()=>{Y_.hidden=!0,s=null},2200),Y_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let O=document.createElement("div");O.className="confetti",O.style.left=`${4+Math.random()*92}%`,O.style.background=_[S%_.length],O.style.animationDelay=`${Math.random()*0.5}s`,Y_.appendChild(O)}};f("btn-conflict-ok").onclick=()=>{vS.hidden=!0};R_.onResolve(async({args:_})=>{if(_.trim())o_.value=_.trim();return null});setInterval(()=>void pT(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)pT()});R_.onReady((_)=>{BT(_,document.documentElement);let S=_.directory??null;if(S!==L){if(L=S,!L){mT(!0);return}Q_()}});})();
