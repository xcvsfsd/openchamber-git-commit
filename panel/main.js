(()=>{var V="openchamber.sdk",N=1;var ST=`
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
`;function _S(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let E=new WeakMap;_.addEventListener("scroll",(U)=>{let C=U.target===_?S:U.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let I=E.get(C);if(I!==void 0)clearTimeout(I);E.set(C,setTimeout(()=>{E.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var nS=`(${_S.toString()})(document);`;var OT=128,ET=65536;var K_=128;var f_=65536;var ES=/^[a-z][a-z0-9-]{0,39}$/;var TS=(_)=>Object(_)===_&&!Array.isArray(_),UT=(_,S)=>Object.keys(_).every((E)=>S.includes(E)),SS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,OS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,US=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let E of _){if(!TS(E)||!ES.test(E.id)||!SS(E.label))return!1;if(E.disabled!==void 0&&E.disabled!==!0&&E.disabled!==!1)return!1;if(S.has(E.id))return!1;if(S.add(E.id),E.kind==="button"){if(!UT(E,["kind","id","label","disabled"]))return!1;continue}if(E.kind!=="select"||!UT(E,["kind","id","label","value","options","disabled"]))return!1;if(!OS(E.value)||!Array.isArray(E.options)||E.options.length<1||E.options.length>16)return!1;let U=new Set;for(let C of E.options){if(!TS(C)||!UT(C,["value","label"])||!OS(C.value)||!SS(C.label)||U.has(C.value))return!1;U.add(C.value)}if(!U.has(E.value))return!1}return!0};var AS=["{id}","{segment}","{segments+}"];var xO=new Set(AS);var MS=["turn-finished","turn-failed","permission-asked","question-asked"];var qO=new Set(MS);var j_=20000000,H_=256;var AT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,RS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let E=0;E<_.bytes.byteLength;E+=1)if(_.bytes[E]!==S.bytes[E])return!1;return!0};var CS=/^[A-Za-z0-9_-]{1,80}$/;var GS=["left","right","top","bottom"];var DS=(_,S=0,E={remaining:16000})=>{if(--E.remaining<0||S>=32)return!1;if(_===null)return!0;let U=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of U)if(!DS(C,S+1,E))return!1;return!0},MT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(MT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(MT)}return String(_)===_||Number.isFinite(_)},RT=(_)=>{try{if(String(_.id)!==_.id||!CS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!GS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!DS(_.data)||!MT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var IS=["file","directory","other","missing"],GT=(_)=>Boolean(_&&"sessionId"in _),DT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var VS=/^[0-9a-f]{7,64}$/i,XT=(_)=>VS.test(_),w_=500,x_=32000,NS=16000,WS=128,PS=200,YS=2000,QS=16000,ZS=80,kS=200,zS=16000;var LS=2000;var IT=20000,b_=1024,q_=2000000;var y_=64000,h_=8000,VT=4000;var NT=960000;var $S=999,FS=1e4,Q_=500,JS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],BS=["stopped","starting","ready","failed"],oS=new Set(JS),KS=(_)=>oS.has(_),fS=(_)=>_&&KS(_)?_:"HOST_REJECTED",U_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(U_);if(Object(_)===_)return Object.values(_).every(U_);return!1},jS=(_)=>U_(_)&&JSON.stringify(_).length<=zS,XS=(_)=>_?.trim().slice(0,kS)??"",A_=(_)=>{let S=_.id.trim().slice(0,WS),E=_.title.trim().slice(0,PS),U=_.url.trim().slice(0,YS),C=_.text?.trim().slice(0,QS),I=_.author?.trim().slice(0,ZS),$=_.kind==="pull"?"pull":"issue",W={providerId:_.providerId.trim(),id:S,title:E||S,url:U,kind:$};if(C)W.text=C;if(I)W.author=I;if($==="pull"){let k=XS(_.branches?.head),J=XS(_.branches?.base);if(k&&J)W.branches={head:k,base:J}}if(jS(_.data))W.data=_.data;return W},WT=(_)=>{let S=A_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},PT=(_)=>{let S={text:_.text.trim().slice(0,NS)};if(_.send)S.send=!0;return S},YT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min($S,Math.max(0,Math.round(_)))},QT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(FS,Math.max(0,Math.ceil(_)))};var M_=(_)=>_.length>0&&_.length<=b_&&!_.includes("\x00")&&!_.includes("\\");var g_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>LS)return!1;return!_.split("/").some((E)=>E==="."||E==="..")},rS=new Set(BS),ZT=(_)=>Boolean(_&&"status"in _&&rS.has(String(_.status))&&!("body"in _)),m_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),kT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),zT=(_)=>Boolean(_&&"written"in _&&_.written===!0),LT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),sS=new Set(IS),$T=(_)=>Boolean(_&&"kind"in _&&"size"in _&&sS.has(String(_.kind))&&Number.isFinite(_.size)),FT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),tS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),eS=(_)=>Object(_)===_?_:null,CT=(_)=>String(_)===_&&_.length>0,_O=(_)=>{if(!CT(_.id))return null;if(_.ok===!0){let S={channel:V,v:N,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&CT(_.error))return{channel:V,v:N,type:"result",id:_.id,ok:!1,error:_.error,code:fS(CT(_.code)?_.code:void 0)};return null},JT=(_)=>{let S=eS(_);if(!S||S.channel!==V||S.v!==N)return null;if(S.type==="result")return _O(S);if(!tS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var HS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),TO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var wS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),c_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${b_} characters without NUL or backslash.`)),p_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},BT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let E=_.acceptSource??((T)=>T===S.parent),U=_.requestTimeoutMs??IT,C=new Set,I=new Set,$=new Set,W=new Set,k=new Set,J=new Set,T_=new Set,c=new Set,X_=new Set,o=new Set,r=[],I_=null,V_=null,L_=new Set,$_=new Set,N_=null,W_=null,t_=!1,S_=new Map,O_=new Map,E_=new Map,v=!1,D={value:0},G=null,u=null,P_=!1,Y_=!1,dT=null,vT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},h=(T)=>{S.parent.postMessage(T,"*")},uT=()=>{if(v||S.parent===S||o.size===0||G?.features?.lateGenerateResults!==!0)return;h({channel:V,v:N,type:"generate-late-listen"})},F=(T,O)=>{for(let A of T)try{A(O)}catch(M){console.error(M)}},lT=(T)=>{if(!(T instanceof MessageEvent))return;if(!E(T.source))return;let O=JT(T.data);if(!O)return;if(O.type==="workspace"){let M=O_.get(O.payload.subscriptionId);if(M)F([M],O.payload.snapshot);return}if(O.type==="shells"){let M=E_.get(O.payload.subscriptionId);if(M)F([M],O.payload.snapshot);return}if(O.type==="ready"){if(G=O.payload,u=vT(O.payload.session),F(C,O.payload),F(I,O.payload.directory),F($,O.payload.session),u)F(W,u);F(k,O.payload.connection),F(J,O.payload.settings),F(T_,O.payload.item),uT();return}if(O.type==="generate-late"){if(o.size===0)r.push(O.payload);else F(o,O.payload);return}if(O.type==="directory"){if(G)G={...G,directory:O.payload.directory};F(I,O.payload.directory);return}if(O.type==="session"){if(G)G={...G,session:O.payload.session};if(!O.payload.session)u=null;else if(u?.sessionId!==O.payload.session.id)u=vT(O.payload.session);F($,O.payload.session);return}if(O.type==="session-lifecycle"){u=O.payload,F(W,O.payload);return}if(O.type==="connection"){if(G)G={...G,connection:O.payload.connection};F(k,O.payload.connection);return}if(O.type==="settings"){if(G)G={...G,settings:O.payload.settings};F(J,O.payload.settings);return}if(O.type==="item"){if(G)G={...G,item:O.payload.item};F(T_,O.payload.item);return}if(O.type==="status-control-event"){F(c,O.payload);return}if(O.type==="popover-closed"){F(X_,O.payload);return}if(O.type==="action"){let M=(P)=>{if(!v)h({channel:V,v:N,type:"action-result",id:O.id,payload:P})},Q=V_;if(!Q){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Q(O.payload)).then(()=>M({ok:!0}),(P)=>{let f=(P instanceof Error?P.message:String(P)).trim();M({ok:!1,error:(f||"Action failed.").slice(0,Q_)})});return}if(O.type==="file-open"){let M=O.payload;if(W_&&RS(W_,M))return;W_=M,F(L_,O.payload);return}if(O.type==="file-saved"){F($_,O.payload.version);return}if(O.type==="file-snapshot"){let M=(f)=>{if(!v)h({channel:V,v:N,type:"file-snapshot-result",id:O.id,payload:f})},Q=(f)=>M({error:(f.trim()||"Could not read the edited file.").slice(0,Q_)}),P=N_;if(!P){Q("This extension does not edit files.");return}Promise.resolve().then(()=>P(O.payload.purpose)).then((f)=>{if(AT(f)>j_){Q(`The file is over ${j_} ${"bytes"in f?"bytes":"characters"}.`);return}if(f.version.length>H_){Q(`The snapshot version is over ${H_} characters.`);return}M({snapshot:"bytes"in f?{bytes:f.bytes,version:f.version}:{content:f.content,version:f.version}})},(f)=>Q(f instanceof Error?f.message:String(f)));return}if(O.type==="resolve"){let M=(P)=>{h({channel:V,v:N,type:"resolve-result",id:O.id,payload:P})},Q=I_;if(!Q){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Q(O.payload)).then((P)=>M({item:P?A_(P):null}),(P)=>{let f=(P instanceof Error?P.message:String(P)).trim();M({error:(f||"Command failed.").slice(0,Q_)})});return}let A=S_.get(O.id);if(!A)return;if(clearTimeout(A.timer),S_.delete(O.id),O.ok){A.resolve(O.payload);return}A.reject(new R(O.code,O.error))};S.addEventListener("message",lT),h({channel:V,v:N,type:"hello"});let w=(T,O=U)=>{if(v||S.parent===S)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,M)=>{let Q=setTimeout(()=>{S_.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},O);S_.set(T.id,{resolve:A,reject:M,timer:Q}),h(T)})},B=(T)=>w(T).then(()=>{return}),K={channel:V,v:N},e_=(T)=>{if(!v&&S.parent!==S)h(T)},aT=()=>e_({...K,type:"file-save"}),nT=(T)=>{if(!HS(T)||!TO(T))return;T.preventDefault(),aT()},iT=(T)=>{if(!HS(T)||T.key!=="Escape"||G?.surface!=="popover"||!G.popover)return;T.preventDefault(),tT(G.popover.id,"escape").catch(()=>{return})},F_=()=>{let T=G?.surface==="popover"?G.popover:void 0;if(!T)return;let O=P_||Y_;if(dT===O)return;dT=O,eT(T.id,O).catch(()=>{return})},J_=()=>{if(G?.surface!=="popover"||P_)return;P_=!0,F_()},oT=(T)=>{if(G?.surface!=="popover"||T.relatedTarget!==null||!P_)return;P_=!1,F_()},rT=()=>{if(G?.surface!=="popover"||Y_)return;Y_=!0,F_()},sT=()=>{if(G?.surface!=="popover"||!Y_)return;Y_=!1,F_()},p=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new R("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},_T=async(T)=>{if(T.kind!=="projects")p(T.projectId);let O=await w({...K,type:"workspace-read",id:X(D),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return O},TT=async(T,O)=>{if(T.kind!=="projects")p(T.projectId);let A=X(D);O_.set(A,O);try{await B({...K,type:"workspace-subscribe",id:X(D),payload:{subscriptionId:A,query:T}})}catch(M){if(O_.delete(A),!v)h({...K,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:A}});throw M}return()=>{if(!O_.delete(A)||v)return;h({...K,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:A}})}},aS=async(T,O)=>{if(T.kind==="session")p(T.sessionId);if(T.kind==="project")p(T.projectId);let A=X(D);E_.set(A,O);try{await B({...K,type:"shells-subscribe",id:X(D),payload:{subscriptionId:A,scope:T}})}catch(M){if(E_.delete(A),!v)h({...K,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:A}});throw M}return()=>{if(!E_.delete(A)||v)return;h({...K,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:A}})}},B_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>OT))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!U_(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>ET)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&G?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let O=await w({...K,type:"storage",id:X(D),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return O},tT=(T,O)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):B({...K,type:"popover-close",id:X(D),payload:O?{id:T,reason:O}:{id:T}}),eT=(T,O)=>G?.features?.popovers!==!0&&!(G?.surface==="popover"&&G.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):B({...K,type:"popover-anchor",id:X(D),payload:{id:T,active:O}});return S.addEventListener("keydown",iT,!0),S.addEventListener("pointerover",J_),S.addEventListener("pointermove",J_),S.addEventListener("pointerout",oT),S.addEventListener("focus",rT),S.addEventListener("blur",sT),{onAction:(T)=>{return V_=T,()=>{if(V_===T)V_=null}},listProjects:async()=>{let T=await _T({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await _T({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await _T({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>TT({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>TT({kind:"worktrees",projectId:T},(A)=>{if(A.kind==="worktrees")O(A)}),onSessions:(T,O)=>TT({kind:"sessions",projectId:T},(A)=>{if(A.kind==="sessions")O(A)}),onRunningShells:(T,O)=>aS(T,O),readShellOutput:async(T,O)=>{p(T,K_);let A=O?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=O?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>f_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${f_}.`);let P=await w({...K,type:"shell-output",id:X(D),payload:{shellId:T,cursor:A,tailBytes:M}});if(!P||typeof P.output!=="string"||!Number.isFinite(P.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async(T)=>{if(p(T,K_),(await w({...K,type:"shell-stop",id:X(D),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{p(T),await B({...K,type:"open-session",id:X(D),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let A=p_(O),M={op:"get",key:T};if(A)M.scope=A;let Q=await B_(M);return Q.op==="get"&&Q.found?Q.value:void 0},set:async(T,O,A)=>{let M=p_(A),Q={op:"set",key:T,value:O};if(M)Q.scope=M;await B_(Q)},delete:async(T,O)=>{let A=p_(O),M={op:"delete",key:T};if(A)M.scope=A;await B_(M)},keys:async(T)=>{let O=p_(T),A={op:"keys"};if(O)A.scope=O;let M=await B_(A);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(C.add(T),G)T(G);return()=>{C.delete(T)}},onDirectory:(T)=>{if(I.add(T),G)T(G.directory);return()=>{I.delete(T)}},onSession:(T)=>{if($.add(T),G)T(G.session);return()=>{$.delete(T)}},onSessionLifecycle:(T)=>{if(W.add(T),u)T(u);return()=>{W.delete(T)}},onConnection:(T)=>{if(k.add(T),G)T(G.connection);return()=>{k.delete(T)}},onSettings:(T)=>{if(J.add(T),G)T(G.settings);return()=>{J.delete(T)}},onItem:(T)=>{if(T_.add(T),G)T(G.item);return()=>{T_.delete(T)}},onStatusControl:(T)=>{return c.add(T),()=>{c.delete(T)}},onPopoverClosed:(T)=>{return X_.add(T),()=>{X_.delete(T)}},setStatusControls:(T)=>{if(G?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!US(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return B({...K,type:"status-controls",id:X(D),payload:{controls:T}})},openPopover:(T)=>{if(G?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!RT(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return B({...K,type:"popover-open",id:X(D),payload:T})},closePopover:tT,setPopoverAnchorActive:eT,onResolve:(T)=>{return I_=T,()=>{if(I_===T)I_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>w_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${w_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>x_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${x_} characters.`));return B({channel:V,v:N,type:"toast",id:X(D),payload:{...T,message:O}})},openUrl:(T)=>B({channel:V,v:N,type:"open-url",id:X(D),payload:{url:T}}),openCommit:(T)=>XT(T)?B({channel:V,v:N,type:"open-commit",id:X(D),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>B({channel:V,v:N,type:"open-surface",id:X(D),payload:{surfaceId:T}}),writeClipboard:(T)=>B({channel:V,v:N,type:"clipboard-write",id:X(D),payload:{text:T}}),compose:(T)=>B({channel:V,v:N,type:"compose",id:X(D),payload:T}),attach:(T)=>B({channel:V,v:N,type:"attach",id:X(D),payload:A_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)p(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")p(O.directory);else{if(O.name!==void 0)p(O.name,200);if(O.baseBranch!==void 0)p(O.baseBranch,200)}let A=await w({channel:V,v:N,type:"start-session",id:X(D),payload:WT(T)},_.requestTimeoutMs??180000);if(!GT(A))throw new R("HOST_REJECTED","Host did not return a session.");return A},prompt:(T)=>w({channel:V,v:N,type:"prompt",id:X(D),payload:PT(T)}).then((O)=>{if(!DT(O))throw new R("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>B({channel:V,v:N,type:"session-link",id:X(D),payload:A_(T)}),close:()=>B({channel:V,v:N,type:"close",id:X(D)}),oauthStart:()=>B({channel:V,v:N,type:"oauth-start",id:X(D)}),oauthDisconnect:()=>B({channel:V,v:N,type:"oauth-disconnect",id:X(D)}),request:(T)=>(g_(T.path)?w({channel:V,v:N,type:"request",id:X(D),payload:T}):wS()).then((O)=>{if(!m_(O))throw new R("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(g_(T.path)?w({channel:V,v:N,type:"service-request",id:X(D),payload:T}):wS()).then((O)=>{if(!m_(O))throw new R("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>w({channel:V,v:N,type:"service-status",id:X(D)}).then((T)=>{if(!ZT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(M_(T)?w({channel:V,v:N,type:"file-read",id:X(D),payload:{path:T}}):c_()).then((O)=>{if(!kT(O))throw new R("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!M_(T))return c_();if(O.length>q_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${q_} characters.`));return w({channel:V,v:N,type:"file-write",id:X(D),payload:{path:T,content:O}}).then((A)=>{if(!zT(A))throw new R("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(T)=>(M_(T)?w({channel:V,v:N,type:"file-list",id:X(D),payload:{path:T}}):c_()).then((O)=>{if(!LT(O))throw new R("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(M_(T)?w({channel:V,v:N,type:"file-stat",id:X(D),payload:{path:T}}):c_()).then((O)=>{if(!$T(O))throw new R("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),A=T.system?.trim();if(O.length===0||O.length>y_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${y_} characters.`));if(A!==void 0&&(A.length===0||A.length>h_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${h_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(VT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let Q={prompt:O};if(A!==void 0)Q.system=A;if(M!==void 0)Q.maxOutputTokens=M;return w({channel:V,v:N,type:"generate",id:X(D),payload:Q},_.requestTimeoutMs??NT).then((P)=>{if(!FT(P))throw new R("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:(T)=>{o.add(T);for(let O of r.splice(0))F([T],O);return uT(),()=>{o.delete(T)}},setBadge:(T)=>B({channel:V,v:N,type:"badge",id:X(D),payload:{count:YT(T)}}),setHeight:(T)=>B({channel:V,v:N,type:"resize",id:X(D),payload:{height:QT(T)}}),onFileOpen:(T)=>{if(L_.add(T),!t_)t_=!0,S.addEventListener("keydown",nT,!0);if(W_)T(W_);return()=>{L_.delete(T)}},onFileSnapshot:(T)=>{return N_=T,()=>{if(N_===T)N_=null}},onFileSaved:(T)=>{return $_.add(T),()=>{$_.delete(T)}},reportFileChange:(T)=>e_({...K,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:aT,reportFileUnsupported:()=>e_({...K,type:"file-unsupported"}),dispose:()=>{for(let T of O_.keys())h({...K,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:T}});O_.clear();for(let T of E_.keys())h({...K,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:T}});if(E_.clear(),v=!0,I_=null,V_=null,N_=null,L_.clear(),$_.clear(),t_)S.removeEventListener("keydown",nT,!0);S.removeEventListener("message",lT),S.removeEventListener("keydown",iT,!0),S.removeEventListener("pointerover",J_),S.removeEventListener("pointermove",J_),S.removeEventListener("pointerout",oT),S.removeEventListener("focus",rT),S.removeEventListener("blur",sT);for(let T of S_.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));S_.clear(),C.clear(),I.clear(),$.clear(),W.clear(),k.clear(),J.clear(),T_.clear(),c.clear(),X_.clear(),o.clear(),r.length=0}}};var xS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var oO=new Set(xS);var bS=["none","agent","user"];var sO=new Set(bS);var SO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],OO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qS=(_,S)=>{S.style.colorScheme=_.mode;for(let[E,U]of SO)S.style.setProperty(E,_.tokens[U]);for(let[E,U,C]of OO){let I=_.tokens[C]??"";S.style.setProperty(E,I),S.style.setProperty(U,I)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},KT=(_,S)=>{if(qS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var EO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Z=(_,S)=>`var(--${_}, var(--oc-${EO[_]}, ${S}))`,a=Z("surface-background","transparent"),v_=Z("surface-elevated","transparent"),R_=Z("surface-elevated-foreground","inherit"),g=Z("surface-foreground","inherit"),z=Z("surface-muted-foreground","gray"),UO=Z("surface-muted","transparent"),s=Z("interactive-border","currentColor"),b=Z("interactive-hover","transparent"),t=Z("interactive-active","transparent"),fT=Z("interactive-selection","transparent"),jT=Z("interactive-selection-foreground","inherit"),l=Z("primary","currentColor"),HT=Z("primary-text","inherit"),wT=Z("error-text","inherit"),AO=Z("font-sans","inherit"),xT=Z("font-mono","monospace"),mS=Z("radius","9px"),bT=`calc(${mS} - 2px)`,yS=`calc(${mS} - 4px)`,L=(_,S,E="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${E})`,hS=`background-image: linear-gradient(${b}, ${b});`,qT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,yT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",gS="box-shadow: var(--oc-sdk-lit);",hT=`inset 0 0.5px 0 0 ${L(g,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,MO=`
:root {
  --oc-sdk-edge: ${L(g,16)};
  --oc-sdk-field-bg: ${v_};
  --oc-sdk-raised-bg: ${a};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(g,14)};
  --oc-sdk-field-bg: ${L(a,50,v_)};
  --oc-sdk-raised-bg: ${v_};
  --oc-sdk-field-lift: ${hT};
  --oc-sdk-raised-lift: ${hT};
  --oc-sdk-lit: ${hT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,d_=(_)=>{let S=Z(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${Z(`${_}-text`,"inherit")}; }`},RO=`
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
`,cS=`${MO}
.oc-sdk { color: ${g}; font-family: ${AO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${hS} }
.oc-sdk-mono { font-family: ${xT}; }
.oc-sdk-muted { color: ${z}; }
${d_("success")}${d_("warning")}${d_("error")}${d_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${l}; --oc-sdk-tone-text: ${HT}; }

.oc-sdk-btn { border-radius: ${bT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${yS}; }
.oc-sdk-btn[data-variant="default"] { color: ${HT}; background: ${L(l,10,a)}; border-color: ${L(l,12)}; ${gS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(l,16,a)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(l,22,a)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${UO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${t}, ${t}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${R_}; ${yT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${t}, ${t}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${b}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${t}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Z("status-error","red")}; color: ${wT}; background: ${L("var(--oc-sdk-tone)",7,a)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${gS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,a)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,a)}; box-shadow: none; }

.oc-sdk-field-note { color: ${z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${wT}; }
.oc-sdk-input { border-radius: ${bT}; background: var(--oc-sdk-field-bg); color: ${R_}; ${qT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${qT(L(g,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${qT(Z("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${xT}; }

.oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${l}; }
.oc-sdk-search-clear { border-radius: ${yS}; color: ${z}; }
.oc-sdk-search-clear:hover { background: ${b}; color: ${g}; }

.oc-sdk-trigger { border-radius: ${bT}; background: var(--oc-sdk-raised-bg); color: ${R_}; ${yT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${b}, ${b}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${t}, ${t}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${z}; }
.oc-sdk-trigger-chevron { color: ${z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${R_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${v_}; background-clip: padding-box; color: ${R_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${b}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fT}; color: ${jT}; }
.oc-sdk-option-check { color: ${g}; }
.oc-sdk-option[data-destructive="true"] { color: ${wT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(Z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${z}; }
.oc-sdk-popup-empty { color: ${z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${s}; border-radius: 4px; color: ${g}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(g,60,s)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${s}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${a}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${l}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${hS} }
.oc-sdk-check-desc { color: ${z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(g,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${g}; }
.oc-sdk-tab[aria-selected="true"] { color: ${jT}; background: ${fT}; border-color: ${s}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${R_}; background: var(--oc-sdk-raised-bg); ${yT} }
.oc-sdk-tab-count { color: ${z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(g,6)}; color: ${z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${b}; }
.oc-sdk-row[aria-selected="true"] { background: ${fT}; color: ${jT}; }
.oc-sdk-row-lead { font-family: ${xT}; color: ${z}; }
.oc-sdk-row-sub { color: ${z}; }
.oc-sdk-row-meta { color: ${z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${z}; }

.oc-sdk-empty-body { color: ${z}; }

.oc-sdk-spinner { color: ${z}; }
.oc-sdk-spinner-ring { border-color: ${s}; border-top-color: ${l}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${z}; }

.oc-sdk-separator { color: ${z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(s,40)}; }

.oc-sdk-progress-label { color: ${z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(g,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${l}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Z("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Z("success-text","inherit")}; }

.oc-sdk-text a { color: ${HT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(s,60)}; }
`,x=`
${ST}
${RO}
${cS}`;var D_=BT(),dS=document.querySelector("#root");if(!dS)throw Error("Missing #root");dS.innerHTML=`
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
`;var j=(_)=>document.querySelector(`#${_}`),i=j("branch"),d=j("sync"),i_=j("remote"),o_=j("local"),r_=j("msg"),m=j("out"),IO=j("topbar"),VO=j("h-remote"),NO=j("h-local"),WO=j("nongit"),PO=j("commitBox"),k_=j("done"),vS=j("conflict"),pS=j("conflict-list"),YO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),mT="",uS=(_)=>{let S=YO(_);if(S.length===0){mT="";return}let E=S.join(`
`);if(E===mT)return;mT=E,pS.innerHTML="";for(let U of S.slice(0,20)){let C=document.createElement("tr"),I=document.createElement("td");I.className="mono ellipsis",I.textContent=U,C.appendChild(I),pS.appendChild(C)}vS.hidden=!1},cT=(_)=>{WO.hidden=!_,IO.style.display=_?"none":"",d.style.display=_?"none":"",VO.style.display=_?"none":"",i_.style.display=_?"none":"",NO.style.display=_?"none":"",o_.style.display=_?"none":"",PO.style.display=_?"none":""},Y=null,G_=!1,H=(_,S,E)=>D_.serviceRequest({method:_,path:S,body:E===void 0?void 0:JSON.stringify(E)});var QO=async(_,S)=>{try{let E=await H("GET",`/branches?dir=${encodeURIComponent(_)}`),U=JSON.parse(E.body);if(!U.ok||!U.branches)return;if(i.value&&i.value===S&&i.options.length>0)return;i.innerHTML="";for(let C of U.branches){let I=document.createElement("option");if(I.value=C.name,I.textContent=C.name,C.current)I.selected=!0;i.appendChild(I)}}catch{}},pT=(_)=>{i_.innerHTML="";let S=_.incoming??[];if(S.length===0){i_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let E=document.createElement("table");for(let U of S){let C=document.createElement("tr"),I=document.createElement("td");I.className="mono ellipsis",I.textContent=`${U.sha} ${U.subject}`,I.title=`${U.sha} ${U.subject} · ${U.author} ${U.date}`,C.appendChild(I),E.appendChild(C)}i_.appendChild(E)},ZO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let U="改动";if(_==="A"||S==="A")U="新增";else if(_==="D"||S==="D")U="删除";else if(_==="R"||S==="R")U="重命名";else if(_==="C"||S==="C")U="复制";else if(_==="T"||S==="T")U="类型变更";else if(_==="M"||S==="M")U="修改";return _!==" "&&_!=="?"&&_!=="!"?`${U}·已暂存`:U},lS=(_)=>{o_.innerHTML="";let S=_.files??[];if(S.length===0){let U=document.createElement("div");U.className="empty",U.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',o_.appendChild(U);return}let E=document.createElement("table");for(let U of S){let C=document.createElement("tr"),I=document.createElement("td");I.style.width="28px";let $=document.createElement("input");$.type="checkbox",$.checked=U.staged.trim()!==""&&U.staged!=="?"&&U.staged!==" ",$.title=$.checked?"已暂存点取消":"未暂存点暂存",$.onchange=async()=>{if(!Y)return;await H("POST",$.checked?"/stage":"/unstage",{dir:Y,paths:[U.path]}),s_()},I.appendChild($);let W=document.createElement("td");W.className="mono ellipsis",W.textContent=U.path,W.title=U.path;let k=document.createElement("td");k.style.width="92px",k.style.minWidth="92px",k.style.textAlign="right",k.style.whiteSpace="nowrap",k.style.fontSize="11px",k.className="mut",k.textContent=ZO(U.staged,U.unstaged);let J=document.createElement("td");if(J.style.width="30px",J.style.textAlign="right",!(U.staged==="U"||U.unstaged==="U")){let c=document.createElement("button");c.textContent="↩",c.title="还原：丢弃该文件本地改动",c.style.padding="2px 7px",c.onclick=async()=>{if(!Y)return;if((U.staged==="?"||U.staged==="A")&&!confirm(`确定丢弃 ${U.path} 的本地内容吗？`))return;c.disabled=!0;let o=await H("POST","/restore",{dir:Y,paths:[U.path],confirmed:!0}),r=JSON.parse(o.body);if(!r.ok&&r.error==="need-confirm"){if(confirm(`确定删除未跟踪的 ${U.path} 吗？`))await H("POST","/restore",{dir:Y,paths:[U.path],confirmed:!0})}else if(!r.ok)m.textContent=r.error||"还原失败";c.disabled=!1,s_()},J.appendChild(c)}C.append(I,W,k,J),E.appendChild(C)}o_.appendChild(E)},kO=(_,S)=>{QO(S,_.branch??"")},zO=(_)=>{let S=_.ahead??0,E=_.behind??0;if(E>0&&S>0)d.textContent=`远程 ${E} 个新，本地超前 ${S}`;else if(E>0)d.textContent=`远程有 ${E} 个新提交，可下载`;else if(S>0)d.textContent=`本地超前 ${S}可推送`;else d.textContent="已是最新";D_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},z_=async()=>{if(!Y||G_)return;G_=!0;let _=Y;d.textContent="同步中…";try{await H("POST","/fetch",{dir:_}).catch(()=>{return});let S=await H("GET",`/status?dir=${encodeURIComponent(_)}`),E=JSON.parse(S.body);if(!E.ok||E.branch===void 0){cT(!0);return}cT(!1),zO(E),kO(E,_),pT(E),lS(E),uS(E)}catch(S){d.textContent=S instanceof R?`${S.code}`:"同步失败"}finally{G_=!1}},s_=async()=>{if(!Y||G_||document.hidden)return;G_=!0;try{let _=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body);if(!S.ok)return;lS(S),uS(S),D_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{G_=!1}};j("btn-refresh").onclick=()=>void z_();j("btn-pull").onclick=async()=>{if(!Y)return;d.textContent="下载中…";try{await H("POST","/pull",{dir:Y})}catch{}z_()};i.onchange=async()=>{if(!Y||!i.value)return;d.textContent=`切换到 ${i.value}…`;let _=await H("POST","/checkout",{dir:Y,branch:i.value}),S=JSON.parse(_.body);if(!S.ok)d.textContent=S.output||S.error||"切换失败";z_()};var e=j("btn-commit");e.onclick=async()=>{if(!Y||e.disabled)return;let _=r_.value.trim();if(!_){m.textContent="先写提交信息";return}e.disabled=!0;let S=e.textContent;e.innerHTML='<span class="spin">↻</span> 提交中…';try{await H("POST","/fetch",{dir:Y}).catch(()=>{return});let E=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),U=JSON.parse(E.body),C=U.behind??0;if(C>0){m.textContent=`远程有 ${C} 个新提交，先点下载合并后再提交`,d.textContent=`远程有 ${C} 个新提交可下载`,pT(U);return}m.textContent="提交…";let I=await H("POST","/commit",{dir:Y,message:_,push:!0}),$=JSON.parse(I.body);if(!$.ok){m.textContent=$.error||"提交失败";return}m.textContent="跟远程核验中…",await H("POST","/fetch",{dir:Y}).catch(()=>{return});let W=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),k=JSON.parse(W.body),J=k.ahead??0;if(J>0){m.textContent=`已提交但远程核验本地仍超前 ${J}推送可能没完全成功请检查`,pT(k);return}r_.value="",m.textContent="已提交并推送远程核验一致",LO()}catch(E){m.textContent=E instanceof R?`${E.code}`:"提交失败"}finally{e.disabled=!1,e.textContent=S,z_()}};j("btn-ai").onclick=async()=>{if(!Y)return;m.textContent="AI 生成中…";try{let _=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body),E=(W)=>W.trim()!==""&&W!=="?"&&W!==" ",U=(S.files??[]).filter((W)=>E(W.staged));if(U.length===0){m.textContent="先勾选要提交的文件";return}let C="";for(let W of U.slice(0,3)){try{let k=await H("GET",`/diff?dir=${encodeURIComponent(Y)}&file=${encodeURIComponent(W.path)}&staged=1`),J=JSON.parse(k.body);if(J.ok&&J.diff)C+=`
--- ${W.path} ---
${J.diff.slice(0,2000)}`}catch{}if(C.length>6000)break}let I=U.map((W)=>`${W.staged}${W.unstaged} ${W.path}`).join(`
`).slice(0,1000),{text:$}=await D_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${I}${C.slice(0,6000)}`,maxOutputTokens:100});r_.value=$.trim(),m.textContent=`已按 ${U.length} 个勾选文件生成`}catch{m.textContent="无小模型或未授权 model"}};var __=null;j("btn-again").onclick=()=>{if(__)clearTimeout(__),__=null;k_.hidden=!0};var LO=()=>{if(__)clearTimeout(__);k_.hidden=!1,__=setTimeout(()=>{k_.hidden=!0,__=null},2200),k_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let E=document.createElement("div");E.className="confetti",E.style.left=`${4+Math.random()*92}%`,E.style.background=_[S%_.length],E.style.animationDelay=`${Math.random()*0.5}s`,k_.appendChild(E)}};j("btn-conflict-ok").onclick=()=>{vS.hidden=!0};D_.onResolve(async({args:_})=>{if(_.trim())r_.value=_.trim();return null});setInterval(()=>void s_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)s_()});D_.onReady((_)=>{KT(_,document.documentElement);let S=_.directory??null;if(S!==Y){if(Y=S,!Y){cT(!0);return}z_()}});})();
