(()=>{var I="openchamber.sdk",V=1;var TT=`
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
`;function tT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(U)=>{let G=U.target===_?E:U.target;if(!(G instanceof Element))return;if(!G.hasAttribute("data-oc-scrolling"))G.setAttribute("data-oc-scrolling","");let N=O.get(G);if(N!==void 0)clearTimeout(N);O.set(G,setTimeout(()=>{O.delete(G),G.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var vS=`(${tT.toString()})(document);`;var ST=128,ET=65536;var B_=128;var K_=65536;var SS=/^[a-z][a-z0-9-]{0,39}$/;var eT=(_)=>Object(_)===_&&!Array.isArray(_),OT=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),_S=(_)=>String(_)===_&&_.length>=1&&_.length<=60,TS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,ES=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!eT(O)||!SS.test(O.id)||!_S(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!OT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!OT(O,["kind","id","label","value","options","disabled"]))return!1;if(!TS(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let U=new Set;for(let G of O.options){if(!eT(G)||!OT(G,["value","label"])||!TS(G.value)||!_S(G.label)||U.has(G.value))return!1;U.add(G.value)}if(!U.has(O.value))return!1}return!0};var OS=["{id}","{segment}","{segments+}"];var KE=new Set(OS);var US=["turn-finished","turn-failed","permission-asked","question-asked"];var jE=new Set(US);var f_=20000000,j_=256;var UT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,AS=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var MS=/^[A-Za-z0-9_-]{1,80}$/;var RS=["left","right","top","bottom"];var CS=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let U=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let G of U)if(!CS(G,E+1,O))return!1;return!0},AT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(AT);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(AT)}return String(_)===_||Number.isFinite(_)},MT=(_)=>{try{if(String(_.id)!==_.id||!MS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!RS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!CS(_.data)||!AT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var DS=["file","directory","other","missing"],CT=(_)=>Boolean(_&&"sessionId"in _),GT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var XS=/^[0-9a-f]{7,64}$/i,DT=(_)=>XS.test(_),w_=500,H_=32000,IS=16000,VS=128,NS=200,WS=2000,PS=16000,YS=80,QS=200,ZS=16000;var kS=2000;var XT=20000,x_=1024,b_=2000000;var q_=64000,y_=8000,IT=4000;var VT=960000;var LS=999,$S=1e4,W_=500,zS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],FS=["stopped","starting","ready","failed"],lS=new Set(zS),JS=(_)=>lS.has(_),BS=(_)=>_&&JS(_)?_:"HOST_REJECTED",S_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(S_);if(Object(_)===_)return Object.values(_).every(S_);return!1},KS=(_)=>S_(_)&&JSON.stringify(_).length<=ZS,GS=(_)=>_?.trim().slice(0,QS)??"",E_=(_)=>{let E=_.id.trim().slice(0,VS),O=_.title.trim().slice(0,NS),U=_.url.trim().slice(0,WS),G=_.text?.trim().slice(0,PS),N=_.author?.trim().slice(0,YS),L=_.kind==="pull"?"pull":"issue",W={providerId:_.providerId.trim(),id:E,title:O||E,url:U,kind:L};if(G)W.text=G;if(N)W.author=N;if(L==="pull"){let K=GS(_.branches?.head),h=GS(_.branches?.base);if(K&&h)W.branches={head:K,base:h}}if(KS(_.data))W.data=_.data;return W},NT=(_)=>{let E=E_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},WT=(_)=>{let E={text:_.text.trim().slice(0,IS)};if(_.send)E.send=!0;return E},PT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(LS,Math.max(0,Math.round(_)))},YT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min($S,Math.max(0,Math.ceil(_)))};var O_=(_)=>_.length>0&&_.length<=x_&&!_.includes("\x00")&&!_.includes("\\");var h_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>kS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},aS=new Set(FS),QT=(_)=>Boolean(_&&"status"in _&&aS.has(String(_.status))&&!("body"in _)),g_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),ZT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),kT=(_)=>Boolean(_&&"written"in _&&_.written===!0),LT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),nS=new Set(DS),$T=(_)=>Boolean(_&&"kind"in _&&"size"in _&&nS.has(String(_.kind))&&Number.isFinite(_.size)),zT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),iS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),oS=(_)=>Object(_)===_?_:null,RT=(_)=>String(_)===_&&_.length>0,rS=(_)=>{if(!RT(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&RT(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:BS(RT(_.code)?_.code:void 0)};return null},FT=(_)=>{let E=oS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return rS(E);if(!iS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var fS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),sS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var jS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),m_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${x_} characters without NUL or backslash.`)),c_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},JT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),U=_.requestTimeoutMs??XT,G=new Set,N=new Set,L=new Set,W=new Set,K=new Set,h=new Set,C_=new Set,Z_=new Set,k_=new Set,t=new Set,r_=[],G_=null,D_=null,L_=new Set,$_=new Set,X_=null,I_=null,s_=!1,e=new Map,__=new Map,T_=new Map,p=!1,D={value:0},C=null,v=null,V_=!1,N_=!1,cT=null,pT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},q=(T)=>{E.parent.postMessage(T,"*")},dT=()=>{if(p||E.parent===E||t.size===0||C?.features?.lateGenerateResults!==!0)return;q({channel:I,v:V,type:"generate-late-listen"})},$=(T,S)=>{for(let A of T)try{A(S)}catch(M){console.error(M)}},vT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=FT(T.data);if(!S)return;if(S.type==="workspace"){let M=__.get(S.payload.subscriptionId);if(M)$([M],S.payload.snapshot);return}if(S.type==="shells"){let M=T_.get(S.payload.subscriptionId);if(M)$([M],S.payload.snapshot);return}if(S.type==="ready"){if(C=S.payload,v=pT(S.payload.session),$(G,S.payload),$(N,S.payload.directory),$(L,S.payload.session),v)$(W,v);$(K,S.payload.connection),$(h,S.payload.settings),$(C_,S.payload.item),dT();return}if(S.type==="generate-late"){if(t.size===0)r_.push(S.payload);else $(t,S.payload);return}if(S.type==="directory"){if(C)C={...C,directory:S.payload.directory};$(N,S.payload.directory);return}if(S.type==="session"){if(C)C={...C,session:S.payload.session};if(!S.payload.session)v=null;else if(v?.sessionId!==S.payload.session.id)v=pT(S.payload.session);$(L,S.payload.session);return}if(S.type==="session-lifecycle"){v=S.payload,$(W,S.payload);return}if(S.type==="connection"){if(C)C={...C,connection:S.payload.connection};$(K,S.payload.connection);return}if(S.type==="settings"){if(C)C={...C,settings:S.payload.settings};$(h,S.payload.settings);return}if(S.type==="item"){if(C)C={...C,item:S.payload.item};$(C_,S.payload.item);return}if(S.type==="status-control-event"){$(Z_,S.payload);return}if(S.type==="popover-closed"){$(k_,S.payload);return}if(S.type==="action"){let M=(P)=>{if(!p)q({channel:I,v:V,type:"action-result",id:S.id,payload:P})},Y=D_;if(!Y){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Y(S.payload)).then(()=>M({ok:!0}),(P)=>{let J=(P instanceof Error?P.message:String(P)).trim();M({ok:!1,error:(J||"Action failed.").slice(0,W_)})});return}if(S.type==="file-open"){let M=S.payload;if(I_&&AS(I_,M))return;I_=M,$(L_,S.payload);return}if(S.type==="file-saved"){$($_,S.payload.version);return}if(S.type==="file-snapshot"){let M=(J)=>{if(!p)q({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:J})},Y=(J)=>M({error:(J.trim()||"Could not read the edited file.").slice(0,W_)}),P=X_;if(!P){Y("This extension does not edit files.");return}Promise.resolve().then(()=>P(S.payload.purpose)).then((J)=>{if(UT(J)>f_){Y(`The file is over ${f_} ${"bytes"in J?"bytes":"characters"}.`);return}if(J.version.length>j_){Y(`The snapshot version is over ${j_} characters.`);return}M({snapshot:"bytes"in J?{bytes:J.bytes,version:J.version}:{content:J.content,version:J.version}})},(J)=>Y(J instanceof Error?J.message:String(J)));return}if(S.type==="resolve"){let M=(P)=>{q({channel:I,v:V,type:"resolve-result",id:S.id,payload:P})},Y=G_;if(!Y){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Y(S.payload)).then((P)=>M({item:P?E_(P):null}),(P)=>{let J=(P instanceof Error?P.message:String(P)).trim();M({error:(J||"Command failed.").slice(0,W_)})});return}let A=e.get(S.id);if(!A)return;if(clearTimeout(A.timer),e.delete(S.id),S.ok){A.resolve(S.payload);return}A.reject(new R(S.code,S.error))};E.addEventListener("message",vT),q({channel:I,v:V,type:"hello"});let j=(T,S=U)=>{if(p||E.parent===E)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,M)=>{let Y=setTimeout(()=>{e.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},S);e.set(T.id,{resolve:A,reject:M,timer:Y}),q(T)})},z=(T)=>j(T).then(()=>{return}),F={channel:I,v:V},t_=(T)=>{if(!p&&E.parent!==E)q(T)},uT=()=>t_({...F,type:"file-save"}),lT=(T)=>{if(!fS(T)||!sS(T))return;T.preventDefault(),uT()},aT=(T)=>{if(!fS(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),rT(C.popover.id,"escape").catch(()=>{return})},z_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let S=V_||N_;if(cT===S)return;cT=S,sT(T.id,S).catch(()=>{return})},F_=()=>{if(C?.surface!=="popover"||V_)return;V_=!0,z_()},nT=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!V_)return;V_=!1,z_()},iT=()=>{if(C?.surface!=="popover"||N_)return;N_=!0,z_()},oT=()=>{if(C?.surface!=="popover"||!N_)return;N_=!1,z_()},m=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new R("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},e_=async(T)=>{if(T.kind!=="projects")m(T.projectId);let S=await j({...F,type:"workspace-read",id:X(D),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return S},_T=async(T,S)=>{if(T.kind!=="projects")m(T.projectId);let A=X(D);__.set(A,S);try{await z({...F,type:"workspace-subscribe",id:X(D),payload:{subscriptionId:A,query:T}})}catch(M){if(__.delete(A),!p)q({...F,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:A}});throw M}return()=>{if(!__.delete(A)||p)return;q({...F,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:A}})}},dS=async(T,S)=>{if(T.kind==="session")m(T.sessionId);if(T.kind==="project")m(T.projectId);let A=X(D);T_.set(A,S);try{await z({...F,type:"shells-subscribe",id:X(D),payload:{subscriptionId:A,scope:T}})}catch(M){if(T_.delete(A),!p)q({...F,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:A}});throw M}return()=>{if(!T_.delete(A)||p)return;q({...F,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:A}})}},J_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>ST))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!S_(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>ET)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let S=await j({...F,type:"storage",id:X(D),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return S},rT=(T,S)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):z({...F,type:"popover-close",id:X(D),payload:S?{id:T,reason:S}:{id:T}}),sT=(T,S)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):z({...F,type:"popover-anchor",id:X(D),payload:{id:T,active:S}});return E.addEventListener("keydown",aT,!0),E.addEventListener("pointerover",F_),E.addEventListener("pointermove",F_),E.addEventListener("pointerout",nT),E.addEventListener("focus",iT),E.addEventListener("blur",oT),{onAction:(T)=>{return D_=T,()=>{if(D_===T)D_=null}},listProjects:async()=>{let T=await e_({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await e_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await e_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>_T({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>_T({kind:"worktrees",projectId:T},(A)=>{if(A.kind==="worktrees")S(A)}),onSessions:(T,S)=>_T({kind:"sessions",projectId:T},(A)=>{if(A.kind==="sessions")S(A)}),onRunningShells:(T,S)=>dS(T,S),readShellOutput:async(T,S)=>{m(T,B_);let A=S?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=S?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>K_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${K_}.`);let P=await j({...F,type:"shell-output",id:X(D),payload:{shellId:T,cursor:A,tailBytes:M}});if(!P||typeof P.output!=="string"||!Number.isFinite(P.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async(T)=>{if(m(T,B_),(await j({...F,type:"shell-stop",id:X(D),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{m(T),await z({...F,type:"open-session",id:X(D),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let A=c_(S),M={op:"get",key:T};if(A)M.scope=A;let Y=await J_(M);return Y.op==="get"&&Y.found?Y.value:void 0},set:async(T,S,A)=>{let M=c_(A),Y={op:"set",key:T,value:S};if(M)Y.scope=M;await J_(Y)},delete:async(T,S)=>{let A=c_(S),M={op:"delete",key:T};if(A)M.scope=A;await J_(M)},keys:async(T)=>{let S=c_(T),A={op:"keys"};if(S)A.scope=S;let M=await J_(A);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(G.add(T),C)T(C);return()=>{G.delete(T)}},onDirectory:(T)=>{if(N.add(T),C)T(C.directory);return()=>{N.delete(T)}},onSession:(T)=>{if(L.add(T),C)T(C.session);return()=>{L.delete(T)}},onSessionLifecycle:(T)=>{if(W.add(T),v)T(v);return()=>{W.delete(T)}},onConnection:(T)=>{if(K.add(T),C)T(C.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(h.add(T),C)T(C.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(C_.add(T),C)T(C.item);return()=>{C_.delete(T)}},onStatusControl:(T)=>{return Z_.add(T),()=>{Z_.delete(T)}},onPopoverClosed:(T)=>{return k_.add(T),()=>{k_.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!ES(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return z({...F,type:"status-controls",id:X(D),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!MT(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return z({...F,type:"popover-open",id:X(D),payload:T})},closePopover:rT,setPopoverAnchorActive:sT,onResolve:(T)=>{return G_=T,()=>{if(G_===T)G_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>w_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${w_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>H_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${H_} characters.`));return z({channel:I,v:V,type:"toast",id:X(D),payload:{...T,message:S}})},openUrl:(T)=>z({channel:I,v:V,type:"open-url",id:X(D),payload:{url:T}}),openCommit:(T)=>DT(T)?z({channel:I,v:V,type:"open-commit",id:X(D),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>z({channel:I,v:V,type:"open-surface",id:X(D),payload:{surfaceId:T}}),writeClipboard:(T)=>z({channel:I,v:V,type:"clipboard-write",id:X(D),payload:{text:T}}),compose:(T)=>z({channel:I,v:V,type:"compose",id:X(D),payload:T}),attach:(T)=>z({channel:I,v:V,type:"attach",id:X(D),payload:E_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)m(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")m(S.directory);else{if(S.name!==void 0)m(S.name,200);if(S.baseBranch!==void 0)m(S.baseBranch,200)}let A=await j({channel:I,v:V,type:"start-session",id:X(D),payload:NT(T)},_.requestTimeoutMs??180000);if(!CT(A))throw new R("HOST_REJECTED","Host did not return a session.");return A},prompt:(T)=>j({channel:I,v:V,type:"prompt",id:X(D),payload:WT(T)}).then((S)=>{if(!GT(S))throw new R("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>z({channel:I,v:V,type:"session-link",id:X(D),payload:E_(T)}),close:()=>z({channel:I,v:V,type:"close",id:X(D)}),oauthStart:()=>z({channel:I,v:V,type:"oauth-start",id:X(D)}),oauthDisconnect:()=>z({channel:I,v:V,type:"oauth-disconnect",id:X(D)}),request:(T)=>(h_(T.path)?j({channel:I,v:V,type:"request",id:X(D),payload:T}):jS()).then((S)=>{if(!g_(S))throw new R("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(h_(T.path)?j({channel:I,v:V,type:"service-request",id:X(D),payload:T}):jS()).then((S)=>{if(!g_(S))throw new R("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>j({channel:I,v:V,type:"service-status",id:X(D)}).then((T)=>{if(!QT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(O_(T)?j({channel:I,v:V,type:"file-read",id:X(D),payload:{path:T}}):m_()).then((S)=>{if(!ZT(S))throw new R("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!O_(T))return m_();if(S.length>b_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${b_} characters.`));return j({channel:I,v:V,type:"file-write",id:X(D),payload:{path:T,content:S}}).then((A)=>{if(!kT(A))throw new R("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(T)=>(O_(T)?j({channel:I,v:V,type:"file-list",id:X(D),payload:{path:T}}):m_()).then((S)=>{if(!LT(S))throw new R("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(O_(T)?j({channel:I,v:V,type:"file-stat",id:X(D),payload:{path:T}}):m_()).then((S)=>{if(!$T(S))throw new R("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),A=T.system?.trim();if(S.length===0||S.length>q_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${q_} characters.`));if(A!==void 0&&(A.length===0||A.length>y_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${y_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(IT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let Y={prompt:S};if(A!==void 0)Y.system=A;if(M!==void 0)Y.maxOutputTokens=M;return j({channel:I,v:V,type:"generate",id:X(D),payload:Y},_.requestTimeoutMs??VT).then((P)=>{if(!zT(P))throw new R("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:(T)=>{t.add(T);for(let S of r_.splice(0))$([T],S);return dT(),()=>{t.delete(T)}},setBadge:(T)=>z({channel:I,v:V,type:"badge",id:X(D),payload:{count:PT(T)}}),setHeight:(T)=>z({channel:I,v:V,type:"resize",id:X(D),payload:{height:YT(T)}}),onFileOpen:(T)=>{if(L_.add(T),!s_)s_=!0,E.addEventListener("keydown",lT,!0);if(I_)T(I_);return()=>{L_.delete(T)}},onFileSnapshot:(T)=>{return X_=T,()=>{if(X_===T)X_=null}},onFileSaved:(T)=>{return $_.add(T),()=>{$_.delete(T)}},reportFileChange:(T)=>t_({...F,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:uT,reportFileUnsupported:()=>t_({...F,type:"file-unsupported"}),dispose:()=>{for(let T of __.keys())q({...F,type:"workspace-unsubscribe",id:X(D),payload:{subscriptionId:T}});__.clear();for(let T of T_.keys())q({...F,type:"shells-unsubscribe",id:X(D),payload:{subscriptionId:T}});if(T_.clear(),p=!0,G_=null,D_=null,X_=null,L_.clear(),$_.clear(),s_)E.removeEventListener("keydown",lT,!0);E.removeEventListener("message",vT),E.removeEventListener("keydown",aT,!0),E.removeEventListener("pointerover",F_),E.removeEventListener("pointermove",F_),E.removeEventListener("pointerout",nT),E.removeEventListener("focus",iT),E.removeEventListener("blur",oT);for(let T of e.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));e.clear(),G.clear(),N.clear(),L.clear(),W.clear(),K.clear(),h.clear(),C_.clear(),Z_.clear(),k_.clear(),t.clear(),r_.length=0}}};var wS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var uE=new Set(wS);var HS=["none","agent","user"];var aE=new Set(HS);var tS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],eS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],xS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,U]of tS)E.style.setProperty(O,_.tokens[U]);for(let[O,U,G]of eS){let N=_.tokens[G]??"";E.style.setProperty(O,N),E.style.setProperty(U,N)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},BT=(_,E)=>{if(xS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var _E={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Q=(_,E)=>`var(--${_}, var(--oc-${_E[_]}, ${E}))`,l=Q("surface-background","transparent"),d_=Q("surface-elevated","transparent"),U_=Q("surface-elevated-foreground","inherit"),y=Q("surface-foreground","inherit"),Z=Q("surface-muted-foreground","gray"),TE=Q("surface-muted","transparent"),i=Q("interactive-border","currentColor"),H=Q("interactive-hover","transparent"),o=Q("interactive-active","transparent"),KT=Q("interactive-selection","transparent"),fT=Q("interactive-selection-foreground","inherit"),u=Q("primary","currentColor"),jT=Q("primary-text","inherit"),wT=Q("error-text","inherit"),SE=Q("font-sans","inherit"),HT=Q("font-mono","monospace"),hS=Q("radius","9px"),xT=`calc(${hS} - 2px)`,bS=`calc(${hS} - 4px)`,k=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,qS=`background-image: linear-gradient(${H}, ${H});`,bT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,qT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",yS="box-shadow: var(--oc-sdk-lit);",yT=`inset 0 0.5px 0 0 ${k(y,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,EE=`
:root {
  --oc-sdk-edge: ${k(y,16)};
  --oc-sdk-field-bg: ${d_};
  --oc-sdk-raised-bg: ${l};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(y,14)};
  --oc-sdk-field-bg: ${k(l,50,d_)};
  --oc-sdk-raised-bg: ${d_};
  --oc-sdk-field-lift: ${yT};
  --oc-sdk-raised-lift: ${yT};
  --oc-sdk-lit: ${yT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,p_=(_)=>{let E=Q(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${Q(`${_}-text`,"inherit")}; }`},OE=`
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
`,gS=`${EE}
.oc-sdk { color: ${y}; font-family: ${SE}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${qS} }
.oc-sdk-mono { font-family: ${HT}; }
.oc-sdk-muted { color: ${Z}; }
${p_("success")}${p_("warning")}${p_("error")}${p_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${u}; --oc-sdk-tone-text: ${jT}; }

.oc-sdk-btn { border-radius: ${xT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${bS}; }
.oc-sdk-btn[data-variant="default"] { color: ${jT}; background: ${k(u,10,l)}; border-color: ${k(u,12)}; ${yS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(u,16,l)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(u,22,l)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${TE}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${o}, ${o}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${U_}; ${qT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${o}, ${o}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${o}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Q("status-error","red")}; color: ${wT}; background: ${k("var(--oc-sdk-tone)",7,l)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${yS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,l)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,l)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${wT}; }
.oc-sdk-input { border-radius: ${xT}; background: var(--oc-sdk-field-bg); color: ${U_}; ${bT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${bT(k(y,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${bT(Q("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${HT}; }

.oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${u}; }
.oc-sdk-search-clear { border-radius: ${bS}; color: ${Z}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${y}; }

.oc-sdk-trigger { border-radius: ${xT}; background: var(--oc-sdk-raised-bg); color: ${U_}; ${qT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${o}, ${o}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Z}; }
.oc-sdk-trigger-chevron { color: ${Z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${U_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${d_}; background-clip: padding-box; color: ${U_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${KT}; color: ${fT}; }
.oc-sdk-option-check { color: ${y}; }
.oc-sdk-option[data-destructive="true"] { color: ${wT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(Q("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Z}; }
.oc-sdk-popup-empty { color: ${Z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${i}; border-radius: 4px; color: ${y}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(y,60,i)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${i}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${l}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${u}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${qS} }
.oc-sdk-check-desc { color: ${Z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(y,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${y}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fT}; background: ${KT}; border-color: ${i}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${U_}; background: var(--oc-sdk-raised-bg); ${qT} }
.oc-sdk-tab-count { color: ${Z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(y,6)}; color: ${Z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${KT}; color: ${fT}; }
.oc-sdk-row-lead { font-family: ${HT}; color: ${Z}; }
.oc-sdk-row-sub { color: ${Z}; }
.oc-sdk-row-meta { color: ${Z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Z}; }

.oc-sdk-empty-body { color: ${Z}; }

.oc-sdk-spinner { color: ${Z}; }
.oc-sdk-spinner-ring { border-color: ${i}; border-top-color: ${u}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Z}; }

.oc-sdk-separator { color: ${Z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(i,40)}; }

.oc-sdk-progress-label { color: ${Z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(y,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${u}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Q("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Q("success-text","inherit")}; }

.oc-sdk-text a { color: ${jT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(i,60)}; }
`,w=`
${TT}
${OE}
${gS}`;var R_=JT(),mS=document.querySelector("#root");if(!mS)throw Error("Missing #root");mS.innerHTML=`
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
#done[hidden],#nongit[hidden]{display:none!important}
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
`;var f=(_)=>document.querySelector(`#${_}`),n=f("branch"),c=f("sync"),n_=f("remote"),i_=f("local"),o_=f("msg"),d=f("out"),CE=f("topbar"),GE=f("h-remote"),DE=f("h-local"),XE=f("nongit"),IE=f("commitBox"),Y_=f("done"),gT=(_)=>{XE.hidden=!_,CE.style.display=_?"none":"",c.style.display=_?"none":"",GE.style.display=_?"none":"",n_.style.display=_?"none":"",DE.style.display=_?"none":"",i_.style.display=_?"none":"",IE.style.display=_?"none":""},B=null,M_=!1,g=(_,E,O)=>R_.serviceRequest({method:_,path:E,body:O===void 0?void 0:JSON.stringify(O)});var VE=async(_,E)=>{try{let O=await g("GET",`/branches?dir=${encodeURIComponent(_)}`),U=JSON.parse(O.body);if(!U.ok||!U.branches)return;if(n.value&&n.value===E&&n.options.length>0)return;n.innerHTML="";for(let G of U.branches){let N=document.createElement("option");if(N.value=G.name,N.textContent=G.name,G.current)N.selected=!0;n.appendChild(N)}}catch{}},cS=(_)=>{n_.innerHTML="";let E=_.incoming??[];if(E.length===0){n_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let O=document.createElement("table");for(let U of E){let G=document.createElement("tr"),N=document.createElement("td");N.className="mono ellipsis",N.textContent=`${U.sha} ${U.subject}`,N.title=`${U.sha} ${U.subject} · ${U.author} ${U.date}`,G.appendChild(N),O.appendChild(G)}n_.appendChild(O)},NE=(_,E)=>{if(`${_}${E}`==="??")return"未跟踪";if(_==="U"||E==="U")return"冲突";let U="改动";if(_==="A"||E==="A")U="新增";else if(_==="D"||E==="D")U="删除";else if(_==="R"||E==="R")U="重命名";else if(_==="C"||E==="C")U="复制";else if(_==="T"||E==="T")U="类型变更";else if(_==="M"||E==="M")U="修改";return _!==" "&&_!=="?"&&_!=="!"?`${U}·已暂存`:U},pS=(_)=>{i_.innerHTML="";let E=_.files??[];if(E.length===0){let U=document.createElement("div");U.className="empty",U.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',i_.appendChild(U);return}let O=document.createElement("table");for(let U of E){let G=document.createElement("tr"),N=document.createElement("td");N.style.width="28px";let L=document.createElement("input");L.type="checkbox",L.checked=U.staged.trim()!==""&&U.staged!=="?"&&U.staged!==" ",L.title=L.checked?"已暂存点取消":"未暂存点暂存",L.onchange=async()=>{if(!B)return;await g("POST",L.checked?"/stage":"/unstage",{dir:B,paths:[U.path]}),mT()},N.appendChild(L);let W=document.createElement("td");W.className="mono ellipsis",W.textContent=U.path,W.title=U.path;let K=document.createElement("td");K.style.width="92px",K.style.minWidth="92px",K.style.textAlign="right",K.style.whiteSpace="nowrap",K.style.fontSize="11px",K.className="mut",K.textContent=NE(U.staged,U.unstaged),G.append(N,W,K),O.appendChild(G)}i_.appendChild(O)},WE=(_,E)=>{VE(E,_.branch??"")},PE=(_)=>{let E=_.ahead??0,O=_.behind??0;if(O>0&&E>0)c.textContent=`远程 ${O} 个新，本地超前 ${E}`;else if(O>0)c.textContent=`远程有 ${O} 个新提交，可下载`;else if(E>0)c.textContent=`本地超前 ${E}可推送`;else c.textContent="已是最新";R_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},Q_=async()=>{if(!B||M_)return;M_=!0;let _=B;c.textContent="同步中…";try{await g("POST","/fetch",{dir:_}).catch(()=>{return});let E=await g("GET",`/status?dir=${encodeURIComponent(_)}`),O=JSON.parse(E.body);if(!O.ok||O.branch===void 0){gT(!0);return}gT(!1),PE(O),WE(O,_),cS(O),pS(O)}catch(E){c.textContent=E instanceof R?`${E.code}`:"同步失败"}finally{M_=!1}},mT=async()=>{if(!B||M_||document.hidden)return;M_=!0;try{let _=await g("GET",`/status?dir=${encodeURIComponent(B)}`),E=JSON.parse(_.body);if(!E.ok)return;pS(E),R_.setBadge(E.files?.length?E.files.length:null).catch(()=>{return})}catch{}finally{M_=!1}};f("btn-refresh").onclick=()=>void Q_();f("btn-pull").onclick=async()=>{if(!B)return;c.textContent="下载中…";try{await g("POST","/pull",{dir:B})}catch{}Q_()};n.onchange=async()=>{if(!B||!n.value)return;c.textContent=`切换到 ${n.value}…`;let _=await g("POST","/checkout",{dir:B,branch:n.value}),E=JSON.parse(_.body);if(!E.ok)c.textContent=E.output||E.error||"切换失败";Q_()};var r=f("btn-commit");r.onclick=async()=>{if(!B||r.disabled)return;let _=o_.value.trim();if(!_){d.textContent="先写提交信息";return}r.disabled=!0;let E=r.textContent;r.innerHTML='<span class="spin">↻</span> 提交中…';try{await g("POST","/fetch",{dir:B}).catch(()=>{return});let O=await g("GET",`/status?dir=${encodeURIComponent(B)}`),U=JSON.parse(O.body),G=U.behind??0;if(G>0){d.textContent=`远程有 ${G} 个新提交，先点下载合并后再提交`,c.textContent=`远程有 ${G} 个新提交可下载`,cS(U);return}d.textContent="提交…";let N=await g("POST","/commit",{dir:B,message:_,push:!0}),L=JSON.parse(N.body);if(!L.ok){d.textContent=L.error||"提交失败";return}o_.value="",d.textContent="已提交并推送",YE()}catch(O){d.textContent=O instanceof R?`${O.code}`:"提交失败"}finally{r.disabled=!1,r.textContent=E,Q_()}};f("btn-ai").onclick=async()=>{if(!B)return;d.textContent="AI 生成中…";try{let _=await g("GET",`/status?dir=${encodeURIComponent(B)}`),E=JSON.parse(_.body),O=(W)=>W.trim()!==""&&W!=="?"&&W!==" ",U=(E.files??[]).filter((W)=>O(W.staged));if(U.length===0){d.textContent="先勾选要提交的文件";return}let G="";for(let W of U.slice(0,3)){try{let K=await g("GET",`/diff?dir=${encodeURIComponent(B)}&file=${encodeURIComponent(W.path)}&staged=1`),h=JSON.parse(K.body);if(h.ok&&h.diff)G+=`
--- ${W.path} ---
${h.diff.slice(0,2000)}`}catch{}if(G.length>6000)break}let N=U.map((W)=>`${W.staged}${W.unstaged} ${W.path}`).join(`
`).slice(0,1000),{text:L}=await R_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${E.branch}
已选文件：
${N}${G.slice(0,6000)}`,maxOutputTokens:100});o_.value=L.trim(),d.textContent=`已按 ${U.length} 个勾选文件生成`}catch{d.textContent="无小模型或未授权 model"}};var s=null;f("btn-again").onclick=()=>{if(s)clearTimeout(s),s=null;Y_.hidden=!0};var YE=()=>{if(s)clearTimeout(s);Y_.hidden=!1,s=setTimeout(()=>{Y_.hidden=!0,s=null},2200),Y_.querySelectorAll(".confetti").forEach((E)=>E.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let E=0;E<24;E++){let O=document.createElement("div");O.className="confetti",O.style.left=`${4+Math.random()*92}%`,O.style.background=_[E%_.length],O.style.animationDelay=`${Math.random()*0.5}s`,Y_.appendChild(O)}};R_.onResolve(async({args:_})=>{if(_.trim())o_.value=_.trim();return null});setInterval(()=>void mT(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)mT()});R_.onReady((_)=>{BT(_,document.documentElement);let E=_.directory??null;if(E!==B){if(B=E,!B){gT(!0);return}Q_()}});})();
