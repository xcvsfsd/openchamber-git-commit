(()=>{var N="openchamber.sdk",W=1;var ST=`
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
`;function _S(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let E=new WeakMap;_.addEventListener("scroll",(G)=>{let C=G.target===_?S:G.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let V=E.get(C);if(V!==void 0)clearTimeout(V);E.set(C,setTimeout(()=>{E.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var aS=`(${_S.toString()})(document);`;var OT=128,ET=65536;var H_=128;var w_=65536;var ES=/^[a-z][a-z0-9-]{0,39}$/;var TS=(_)=>Object(_)===_&&!Array.isArray(_),UT=(_,S)=>Object.keys(_).every((E)=>S.includes(E)),SS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,OS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,US=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let E of _){if(!TS(E)||!ES.test(E.id)||!SS(E.label))return!1;if(E.disabled!==void 0&&E.disabled!==!0&&E.disabled!==!1)return!1;if(S.has(E.id))return!1;if(S.add(E.id),E.kind==="button"){if(!UT(E,["kind","id","label","disabled"]))return!1;continue}if(E.kind!=="select"||!UT(E,["kind","id","label","value","options","disabled"]))return!1;if(!OS(E.value)||!Array.isArray(E.options)||E.options.length<1||E.options.length>16)return!1;let G=new Set;for(let C of E.options){if(!TS(C)||!UT(C,["value","label"])||!OS(C.value)||!SS(C.label)||G.has(C.value))return!1;G.add(C.value)}if(!G.has(E.value))return!1}return!0};var AS=["{id}","{segment}","{segments+}"];var xO=new Set(AS);var MS=["turn-finished","turn-failed","permission-asked","question-asked"];var qO=new Set(MS);var x_=20000000,b_=256;var AT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,RS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let E=0;E<_.bytes.byteLength;E+=1)if(_.bytes[E]!==S.bytes[E])return!1;return!0};var GS=/^[A-Za-z0-9_-]{1,80}$/;var CS=["left","right","top","bottom"];var DS=(_,S=0,E={remaining:16000})=>{if(--E.remaining<0||S>=32)return!1;if(_===null)return!0;let G=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of G)if(!DS(C,S+1,E))return!1;return!0},MT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(MT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(MT)}return String(_)===_||Number.isFinite(_)},RT=(_)=>{try{if(String(_.id)!==_.id||!GS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!CS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!DS(_.data)||!MT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var IS=["file","directory","other","missing"],CT=(_)=>Boolean(_&&"sessionId"in _),DT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var VS=/^[0-9a-f]{7,64}$/i,XT=(_)=>VS.test(_),q_=500,y_=32000,NS=16000,WS=128,PS=200,YS=2000,QS=16000,ZS=80,kS=200,zS=16000;var $S=2000;var IT=20000,h_=1024,g_=2000000;var m_=64000,c_=8000,VT=4000;var NT=960000;var LS=999,FS=1e4,z_=500,JS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],BS=["stopped","starting","ready","failed"],oS=new Set(JS),KS=(_)=>oS.has(_),jS=(_)=>_&&KS(_)?_:"HOST_REJECTED",X_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(X_);if(Object(_)===_)return Object.values(_).every(X_);return!1},fS=(_)=>X_(_)&&JSON.stringify(_).length<=zS,XS=(_)=>_?.trim().slice(0,kS)??"",I_=(_)=>{let S=_.id.trim().slice(0,WS),E=_.title.trim().slice(0,PS),G=_.url.trim().slice(0,YS),C=_.text?.trim().slice(0,QS),V=_.author?.trim().slice(0,ZS),f=_.kind==="pull"?"pull":"issue",P={providerId:_.providerId.trim(),id:S,title:E||S,url:G,kind:f};if(C)P.text=C;if(V)P.author=V;if(f==="pull"){let H=XS(_.branches?.head),A=XS(_.branches?.base);if(H&&A)P.branches={head:H,base:A}}if(fS(_.data))P.data=_.data;return P},WT=(_)=>{let S=I_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},PT=(_)=>{let S={text:_.text.trim().slice(0,NS)};if(_.send)S.send=!0;return S},YT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(LS,Math.max(0,Math.round(_)))},QT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(FS,Math.max(0,Math.ceil(_)))};var V_=(_)=>_.length>0&&_.length<=h_&&!_.includes("\x00")&&!_.includes("\\");var p_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>$S)return!1;return!_.split("/").some((E)=>E==="."||E==="..")},rS=new Set(BS),ZT=(_)=>Boolean(_&&"status"in _&&rS.has(String(_.status))&&!("body"in _)),d_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),kT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),zT=(_)=>Boolean(_&&"written"in _&&_.written===!0),$T=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),sS=new Set(IS),LT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&sS.has(String(_.kind))&&Number.isFinite(_.size)),FT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),tS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),eS=(_)=>Object(_)===_?_:null,GT=(_)=>String(_)===_&&_.length>0,_O=(_)=>{if(!GT(_.id))return null;if(_.ok===!0){let S={channel:N,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&GT(_.error))return{channel:N,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:jS(GT(_.code)?_.code:void 0)};return null},JT=(_)=>{let S=eS(_);if(!S||S.channel!==N||S.v!==W)return null;if(S.type==="result")return _O(S);if(!tS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var HS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),TO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var wS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),v_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${h_} characters without NUL or backslash.`)),u_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},I=(_)=>{return _.value+=1,`oc-${_.value}`},BT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let E=_.acceptSource??((T)=>T===S.parent),G=_.requestTimeoutMs??IT,C=new Set,V=new Set,f=new Set,P=new Set,H=new Set,A=new Set,w=new Set,__=new Set,d=new Set,u=new Set,g=[],T_=null,a=null,Q_=new Set,v=new Set,R_=null,O_=null,S_=!1,G_=new Map,C_=new Map,D_=new Map,i=!1,X={value:0},D=null,o=null,Z_=!1,k_=!1,dT=null,vT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},m=(T)=>{S.parent.postMessage(T,"*")},uT=()=>{if(i||S.parent===S||u.size===0||D?.features?.lateGenerateResults!==!0)return;m({channel:N,v:W,type:"generate-late-listen"})},L=(T,O)=>{for(let U of T)try{U(O)}catch(M){console.error(M)}},lT=(T)=>{if(!(T instanceof MessageEvent))return;if(!E(T.source))return;let O=JT(T.data);if(!O)return;if(O.type==="workspace"){let M=C_.get(O.payload.subscriptionId);if(M)L([M],O.payload.snapshot);return}if(O.type==="shells"){let M=D_.get(O.payload.subscriptionId);if(M)L([M],O.payload.snapshot);return}if(O.type==="ready"){if(D=O.payload,o=vT(O.payload.session),L(C,O.payload),L(V,O.payload.directory),L(f,O.payload.session),o)L(P,o);L(H,O.payload.connection),L(A,O.payload.settings),L(w,O.payload.item),uT();return}if(O.type==="generate-late"){if(u.size===0)g.push(O.payload);else L(u,O.payload);return}if(O.type==="directory"){if(D)D={...D,directory:O.payload.directory};L(V,O.payload.directory);return}if(O.type==="session"){if(D)D={...D,session:O.payload.session};if(!O.payload.session)o=null;else if(o?.sessionId!==O.payload.session.id)o=vT(O.payload.session);L(f,O.payload.session);return}if(O.type==="session-lifecycle"){o=O.payload,L(P,O.payload);return}if(O.type==="connection"){if(D)D={...D,connection:O.payload.connection};L(H,O.payload.connection);return}if(O.type==="settings"){if(D)D={...D,settings:O.payload.settings};L(A,O.payload.settings);return}if(O.type==="item"){if(D)D={...D,item:O.payload.item};L(w,O.payload.item);return}if(O.type==="status-control-event"){L(__,O.payload);return}if(O.type==="popover-closed"){L(d,O.payload);return}if(O.type==="action"){let M=(Q)=>{if(!i)m({channel:N,v:W,type:"action-result",id:O.id,payload:Q})},Z=a;if(!Z){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Z(O.payload)).then(()=>M({ok:!0}),(Q)=>{let B=(Q instanceof Error?Q.message:String(Q)).trim();M({ok:!1,error:(B||"Action failed.").slice(0,z_)})});return}if(O.type==="file-open"){let M=O.payload;if(O_&&RS(O_,M))return;O_=M,L(Q_,O.payload);return}if(O.type==="file-saved"){L(v,O.payload.version);return}if(O.type==="file-snapshot"){let M=(B)=>{if(!i)m({channel:N,v:W,type:"file-snapshot-result",id:O.id,payload:B})},Z=(B)=>M({error:(B.trim()||"Could not read the edited file.").slice(0,z_)}),Q=R_;if(!Q){Z("This extension does not edit files.");return}Promise.resolve().then(()=>Q(O.payload.purpose)).then((B)=>{if(AT(B)>x_){Z(`The file is over ${x_} ${"bytes"in B?"bytes":"characters"}.`);return}if(B.version.length>b_){Z(`The snapshot version is over ${b_} characters.`);return}M({snapshot:"bytes"in B?{bytes:B.bytes,version:B.version}:{content:B.content,version:B.version}})},(B)=>Z(B instanceof Error?B.message:String(B)));return}if(O.type==="resolve"){let M=(Q)=>{m({channel:N,v:W,type:"resolve-result",id:O.id,payload:Q})},Z=T_;if(!Z){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Z(O.payload)).then((Q)=>M({item:Q?I_(Q):null}),(Q)=>{let B=(Q instanceof Error?Q.message:String(Q)).trim();M({error:(B||"Command failed.").slice(0,z_)})});return}let U=G_.get(O.id);if(!U)return;if(clearTimeout(U.timer),G_.delete(O.id),O.ok){U.resolve(O.payload);return}U.reject(new R(O.code,O.error))};S.addEventListener("message",lT),m({channel:N,v:W,type:"hello"});let x=(T,O=G)=>{if(i||S.parent===S)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,M)=>{let Z=setTimeout(()=>{G_.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},O);G_.set(T.id,{resolve:U,reject:M,timer:Z}),m(T)})},F=(T)=>x(T).then(()=>{return}),J={channel:N,v:W},e_=(T)=>{if(!i&&S.parent!==S)m(T)},nT=()=>e_({...J,type:"file-save"}),aT=(T)=>{if(!HS(T)||!TO(T))return;T.preventDefault(),nT()},iT=(T)=>{if(!HS(T)||T.key!=="Escape"||D?.surface!=="popover"||!D.popover)return;T.preventDefault(),tT(D.popover.id,"escape").catch(()=>{return})},K_=()=>{let T=D?.surface==="popover"?D.popover:void 0;if(!T)return;let O=Z_||k_;if(dT===O)return;dT=O,eT(T.id,O).catch(()=>{return})},j_=()=>{if(D?.surface!=="popover"||Z_)return;Z_=!0,K_()},oT=(T)=>{if(D?.surface!=="popover"||T.relatedTarget!==null||!Z_)return;Z_=!1,K_()},rT=()=>{if(D?.surface!=="popover"||k_)return;k_=!0,K_()},sT=()=>{if(D?.surface!=="popover"||!k_)return;k_=!1,K_()},l=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new R("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},_T=async(T)=>{if(T.kind!=="projects")l(T.projectId);let O=await x({...J,type:"workspace-read",id:I(X),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return O},TT=async(T,O)=>{if(T.kind!=="projects")l(T.projectId);let U=I(X);C_.set(U,O);try{await F({...J,type:"workspace-subscribe",id:I(X),payload:{subscriptionId:U,query:T}})}catch(M){if(C_.delete(U),!i)m({...J,type:"workspace-unsubscribe",id:I(X),payload:{subscriptionId:U}});throw M}return()=>{if(!C_.delete(U)||i)return;m({...J,type:"workspace-unsubscribe",id:I(X),payload:{subscriptionId:U}})}},nS=async(T,O)=>{if(T.kind==="session")l(T.sessionId);if(T.kind==="project")l(T.projectId);let U=I(X);D_.set(U,O);try{await F({...J,type:"shells-subscribe",id:I(X),payload:{subscriptionId:U,scope:T}})}catch(M){if(D_.delete(U),!i)m({...J,type:"shells-unsubscribe",id:I(X),payload:{subscriptionId:U}});throw M}return()=>{if(!D_.delete(U)||i)return;m({...J,type:"shells-unsubscribe",id:I(X),payload:{subscriptionId:U}})}},f_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>OT))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!X_(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>ET)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&D?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let O=await x({...J,type:"storage",id:I(X),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return O},tT=(T,O)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):F({...J,type:"popover-close",id:I(X),payload:O?{id:T,reason:O}:{id:T}}),eT=(T,O)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):F({...J,type:"popover-anchor",id:I(X),payload:{id:T,active:O}});return S.addEventListener("keydown",iT,!0),S.addEventListener("pointerover",j_),S.addEventListener("pointermove",j_),S.addEventListener("pointerout",oT),S.addEventListener("focus",rT),S.addEventListener("blur",sT),{onAction:(T)=>{return a=T,()=>{if(a===T)a=null}},listProjects:async()=>{let T=await _T({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await _T({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await _T({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>TT({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>TT({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")O(U)}),onSessions:(T,O)=>TT({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")O(U)}),onRunningShells:(T,O)=>nS(T,O),readShellOutput:async(T,O)=>{l(T,H_);let U=O?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=O?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>w_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${w_}.`);let Q=await x({...J,type:"shell-output",id:I(X),payload:{shellId:T,cursor:U,tailBytes:M}});if(!Q||typeof Q.output!=="string"||!Number.isFinite(Q.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return Q},stopShell:async(T)=>{if(l(T,H_),(await x({...J,type:"shell-stop",id:I(X),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{l(T),await F({...J,type:"open-session",id:I(X),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let U=u_(O),M={op:"get",key:T};if(U)M.scope=U;let Z=await f_(M);return Z.op==="get"&&Z.found?Z.value:void 0},set:async(T,O,U)=>{let M=u_(U),Z={op:"set",key:T,value:O};if(M)Z.scope=M;await f_(Z)},delete:async(T,O)=>{let U=u_(O),M={op:"delete",key:T};if(U)M.scope=U;await f_(M)},keys:async(T)=>{let O=u_(T),U={op:"keys"};if(O)U.scope=O;let M=await f_(U);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(C.add(T),D)T(D);return()=>{C.delete(T)}},onDirectory:(T)=>{if(V.add(T),D)T(D.directory);return()=>{V.delete(T)}},onSession:(T)=>{if(f.add(T),D)T(D.session);return()=>{f.delete(T)}},onSessionLifecycle:(T)=>{if(P.add(T),o)T(o);return()=>{P.delete(T)}},onConnection:(T)=>{if(H.add(T),D)T(D.connection);return()=>{H.delete(T)}},onSettings:(T)=>{if(A.add(T),D)T(D.settings);return()=>{A.delete(T)}},onItem:(T)=>{if(w.add(T),D)T(D.item);return()=>{w.delete(T)}},onStatusControl:(T)=>{return __.add(T),()=>{__.delete(T)}},onPopoverClosed:(T)=>{return d.add(T),()=>{d.delete(T)}},setStatusControls:(T)=>{if(D?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!US(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return F({...J,type:"status-controls",id:I(X),payload:{controls:T}})},openPopover:(T)=>{if(D?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!RT(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return F({...J,type:"popover-open",id:I(X),payload:T})},closePopover:tT,setPopoverAnchorActive:eT,onResolve:(T)=>{return T_=T,()=>{if(T_===T)T_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>q_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${q_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>y_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${y_} characters.`));return F({channel:N,v:W,type:"toast",id:I(X),payload:{...T,message:O}})},openUrl:(T)=>F({channel:N,v:W,type:"open-url",id:I(X),payload:{url:T}}),openCommit:(T)=>XT(T)?F({channel:N,v:W,type:"open-commit",id:I(X),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>F({channel:N,v:W,type:"open-surface",id:I(X),payload:{surfaceId:T}}),writeClipboard:(T)=>F({channel:N,v:W,type:"clipboard-write",id:I(X),payload:{text:T}}),compose:(T)=>F({channel:N,v:W,type:"compose",id:I(X),payload:T}),attach:(T)=>F({channel:N,v:W,type:"attach",id:I(X),payload:I_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)l(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")l(O.directory);else{if(O.name!==void 0)l(O.name,200);if(O.baseBranch!==void 0)l(O.baseBranch,200)}let U=await x({channel:N,v:W,type:"start-session",id:I(X),payload:WT(T)},_.requestTimeoutMs??180000);if(!CT(U))throw new R("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>x({channel:N,v:W,type:"prompt",id:I(X),payload:PT(T)}).then((O)=>{if(!DT(O))throw new R("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>F({channel:N,v:W,type:"session-link",id:I(X),payload:I_(T)}),close:()=>F({channel:N,v:W,type:"close",id:I(X)}),oauthStart:()=>F({channel:N,v:W,type:"oauth-start",id:I(X)}),oauthDisconnect:()=>F({channel:N,v:W,type:"oauth-disconnect",id:I(X)}),request:(T)=>(p_(T.path)?x({channel:N,v:W,type:"request",id:I(X),payload:T}):wS()).then((O)=>{if(!d_(O))throw new R("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(p_(T.path)?x({channel:N,v:W,type:"service-request",id:I(X),payload:T}):wS()).then((O)=>{if(!d_(O))throw new R("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>x({channel:N,v:W,type:"service-status",id:I(X)}).then((T)=>{if(!ZT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(V_(T)?x({channel:N,v:W,type:"file-read",id:I(X),payload:{path:T}}):v_()).then((O)=>{if(!kT(O))throw new R("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!V_(T))return v_();if(O.length>g_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${g_} characters.`));return x({channel:N,v:W,type:"file-write",id:I(X),payload:{path:T,content:O}}).then((U)=>{if(!zT(U))throw new R("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(V_(T)?x({channel:N,v:W,type:"file-list",id:I(X),payload:{path:T}}):v_()).then((O)=>{if(!$T(O))throw new R("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(V_(T)?x({channel:N,v:W,type:"file-stat",id:I(X),payload:{path:T}}):v_()).then((O)=>{if(!LT(O))throw new R("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),U=T.system?.trim();if(O.length===0||O.length>m_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${m_} characters.`));if(U!==void 0&&(U.length===0||U.length>c_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${c_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(VT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let Z={prompt:O};if(U!==void 0)Z.system=U;if(M!==void 0)Z.maxOutputTokens=M;return x({channel:N,v:W,type:"generate",id:I(X),payload:Z},_.requestTimeoutMs??NT).then((Q)=>{if(!FT(Q))throw new R("HOST_REJECTED","Host did not return generated text.");return Q})},onLateGenerateResult:(T)=>{u.add(T);for(let O of g.splice(0))L([T],O);return uT(),()=>{u.delete(T)}},setBadge:(T)=>F({channel:N,v:W,type:"badge",id:I(X),payload:{count:YT(T)}}),setHeight:(T)=>F({channel:N,v:W,type:"resize",id:I(X),payload:{height:QT(T)}}),onFileOpen:(T)=>{if(Q_.add(T),!S_)S_=!0,S.addEventListener("keydown",aT,!0);if(O_)T(O_);return()=>{Q_.delete(T)}},onFileSnapshot:(T)=>{return R_=T,()=>{if(R_===T)R_=null}},onFileSaved:(T)=>{return v.add(T),()=>{v.delete(T)}},reportFileChange:(T)=>e_({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:nT,reportFileUnsupported:()=>e_({...J,type:"file-unsupported"}),dispose:()=>{for(let T of C_.keys())m({...J,type:"workspace-unsubscribe",id:I(X),payload:{subscriptionId:T}});C_.clear();for(let T of D_.keys())m({...J,type:"shells-unsubscribe",id:I(X),payload:{subscriptionId:T}});if(D_.clear(),i=!0,T_=null,a=null,R_=null,Q_.clear(),v.clear(),S_)S.removeEventListener("keydown",aT,!0);S.removeEventListener("message",lT),S.removeEventListener("keydown",iT,!0),S.removeEventListener("pointerover",j_),S.removeEventListener("pointermove",j_),S.removeEventListener("pointerout",oT),S.removeEventListener("focus",rT),S.removeEventListener("blur",sT);for(let T of G_.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));G_.clear(),C.clear(),V.clear(),f.clear(),P.clear(),H.clear(),A.clear(),w.clear(),__.clear(),d.clear(),u.clear(),g.length=0}}};var xS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var oO=new Set(xS);var bS=["none","agent","user"];var sO=new Set(bS);var SO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],OO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qS=(_,S)=>{S.style.colorScheme=_.mode;for(let[E,G]of SO)S.style.setProperty(E,_.tokens[G]);for(let[E,G,C]of OO){let V=_.tokens[C]??"";S.style.setProperty(E,V),S.style.setProperty(G,V)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},KT=(_,S)=>{if(qS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var EO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},k=(_,S)=>`var(--${_}, var(--oc-${EO[_]}, ${S}))`,s=k("surface-background","transparent"),n_=k("surface-elevated","transparent"),N_=k("surface-elevated-foreground","inherit"),c=k("surface-foreground","inherit"),z=k("surface-muted-foreground","gray"),UO=k("surface-muted","transparent"),E_=k("interactive-border","currentColor"),q=k("interactive-hover","transparent"),U_=k("interactive-active","transparent"),jT=k("interactive-selection","transparent"),fT=k("interactive-selection-foreground","inherit"),r=k("primary","currentColor"),HT=k("primary-text","inherit"),wT=k("error-text","inherit"),AO=k("font-sans","inherit"),xT=k("font-mono","monospace"),mS=k("radius","9px"),bT=`calc(${mS} - 2px)`,yS=`calc(${mS} - 4px)`,$=(_,S,E="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${E})`,hS=`background-image: linear-gradient(${q}, ${q});`,qT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,yT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",gS="box-shadow: var(--oc-sdk-lit);",hT=`inset 0 0.5px 0 0 ${$(c,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,MO=`
:root {
  --oc-sdk-edge: ${$(c,16)};
  --oc-sdk-field-bg: ${n_};
  --oc-sdk-raised-bg: ${s};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(c,14)};
  --oc-sdk-field-bg: ${$(s,50,n_)};
  --oc-sdk-raised-bg: ${n_};
  --oc-sdk-field-lift: ${hT};
  --oc-sdk-raised-lift: ${hT};
  --oc-sdk-lit: ${hT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,l_=(_)=>{let S=k(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${k(`${_}-text`,"inherit")}; }`},RO=`
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
.oc-sdk { color: ${c}; font-family: ${AO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${hS} }
.oc-sdk-mono { font-family: ${xT}; }
.oc-sdk-muted { color: ${z}; }
${l_("success")}${l_("warning")}${l_("error")}${l_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${HT}; }

.oc-sdk-btn { border-radius: ${bT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${yS}; }
.oc-sdk-btn[data-variant="default"] { color: ${HT}; background: ${$(r,10,s)}; border-color: ${$(r,12)}; ${gS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(r,16,s)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(r,22,s)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${UO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${U_}, ${U_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${N_}; ${yT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${U_}, ${U_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${q}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${U_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${k("status-error","red")}; color: ${wT}; background: ${$("var(--oc-sdk-tone)",7,s)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${gS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,s)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,s)}; box-shadow: none; }

.oc-sdk-field-note { color: ${z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${wT}; }
.oc-sdk-input { border-radius: ${bT}; background: var(--oc-sdk-field-bg); color: ${N_}; ${qT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${qT($(c,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${qT(k("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${xT}; }

.oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${r}; }
.oc-sdk-search-clear { border-radius: ${yS}; color: ${z}; }
.oc-sdk-search-clear:hover { background: ${q}; color: ${c}; }

.oc-sdk-trigger { border-radius: ${bT}; background: var(--oc-sdk-raised-bg); color: ${N_}; ${yT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${U_}, ${U_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${z}; }
.oc-sdk-trigger-chevron { color: ${z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${N_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${n_}; background-clip: padding-box; color: ${N_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${q}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${jT}; color: ${fT}; }
.oc-sdk-option-check { color: ${c}; }
.oc-sdk-option[data-destructive="true"] { color: ${wT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(k("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${z}; }
.oc-sdk-popup-empty { color: ${z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${E_}; border-radius: 4px; color: ${c}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(c,60,E_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${E_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${s}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${r}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${hS} }
.oc-sdk-check-desc { color: ${z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(c,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${c}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fT}; background: ${jT}; border-color: ${E_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${N_}; background: var(--oc-sdk-raised-bg); ${yT} }
.oc-sdk-tab-count { color: ${z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(c,6)}; color: ${z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${q}; }
.oc-sdk-row[aria-selected="true"] { background: ${jT}; color: ${fT}; }
.oc-sdk-row-lead { font-family: ${xT}; color: ${z}; }
.oc-sdk-row-sub { color: ${z}; }
.oc-sdk-row-meta { color: ${z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${z}; }

.oc-sdk-empty-body { color: ${z}; }

.oc-sdk-spinner { color: ${z}; }
.oc-sdk-spinner-ring { border-color: ${E_}; border-top-color: ${r}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${z}; }

.oc-sdk-separator { color: ${z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(E_,40)}; }

.oc-sdk-progress-label { color: ${z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(c,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${r}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${k("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${k("success-text","inherit")}; }

.oc-sdk-text a { color: ${HT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(E_,60)}; }
`,b=`
${ST}
${RO}
${cS}`;var Y_=BT(),dS=document.querySelector("#root");if(!dS)throw Error("Missing #root");dS.innerHTML=`
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
`;var K=(_)=>document.querySelector(`#${_}`),e=K("branch"),n=K("sync"),s_=K("remote"),L_=K("local"),t_=K("msg"),p=K("out"),IO=K("topbar"),VO=K("h-remote"),NO=K("h-local"),WO=K("nongit"),PO=K("commitBox"),F_=K("done"),vS=K("conflict"),pS=K("conflict-list"),YO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),mT="",uS=(_)=>{let S=YO(_);if(S.length===0){mT="";return}let E=S.join(`
`);if(E===mT)return;mT=E,pS.innerHTML="";for(let G of S.slice(0,20)){let C=document.createElement("tr"),V=document.createElement("td");V.className="mono ellipsis",V.textContent=G,C.appendChild(V),pS.appendChild(C)}vS.hidden=!1},cT=(_)=>{WO.hidden=!_,IO.style.display=_?"none":"",n.style.display=_?"none":"",VO.style.display=_?"none":"",s_.style.display=_?"none":"",NO.style.display=_?"none":"",L_.style.display=_?"none":"",PO.style.display=_?"none":""},Y=null,P_=!1,j=(_,S,E)=>Y_.serviceRequest({method:_,path:S,body:E===void 0?void 0:JSON.stringify(E)});var QO=async(_,S)=>{try{let E=await j("GET",`/branches?dir=${encodeURIComponent(_)}`),G=JSON.parse(E.body);if(!G.ok||!G.branches)return;if(e.value&&e.value===S&&e.options.length>0)return;e.innerHTML="";for(let C of G.branches){let V=document.createElement("option");if(V.value=C.name,V.textContent=C.name,C.current)V.selected=!0;e.appendChild(V)}}catch{}},pT=(_)=>{s_.innerHTML="";let S=_.incoming??[];if(S.length===0){s_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let E=document.createElement("table");for(let G of S){let C=document.createElement("tr"),V=document.createElement("td");V.className="mono ellipsis",V.textContent=`${G.sha} ${G.subject}`,V.title=`${G.sha} ${G.subject} · ${G.author} ${G.date}`,C.appendChild(V),E.appendChild(C)}s_.appendChild(E)},ZO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let G="改动";if(_==="A"||S==="A")G="新增";else if(_==="D"||S==="D")G="删除";else if(_==="R"||S==="R")G="重命名";else if(_==="C"||S==="C")G="复制";else if(_==="T"||S==="T")G="类型变更";else if(_==="M"||S==="M")G="修改";return _!==" "&&_!=="?"&&_!=="!"?`${G}·已暂存`:G},lS=(_)=>{L_.innerHTML="";let S=_.files??[];if(S.length===0){let A=document.createElement("div");A.className="empty",A.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',L_.appendChild(A);return}let E=(A)=>A.trim()!==""&&A!=="?"&&A!==" ",G=S.every((A)=>E(A.staged)),C=document.createElement("div");C.className="row";let V=document.createElement("input");V.type="checkbox",V.checked=G,V.title=G?"全不选：取消全部暂存":"全选：暂存全部",V.onchange=async()=>{if(!Y){V.checked=!V.checked;return}if(V.checked){let A=S.filter((w)=>!E(w.staged)).map((w)=>w.path);if(A.length>0)await j("POST","/stage",{dir:Y,paths:A})}else{let A=S.filter((w)=>E(w.staged)).map((w)=>w.path);if(A.length>0)await j("POST","/unstage",{dir:Y,paths:A})}J_()};let f=document.createElement("span");f.className="mut";let P=S.filter((A)=>E(A.staged)).length;f.textContent=`全选 ${P}/${S.length}`,C.append(V,f),L_.appendChild(C);let H=document.createElement("table");for(let A of S){let w=document.createElement("tr"),__=document.createElement("td");__.style.width="28px";let d=document.createElement("input");d.type="checkbox",d.checked=A.staged.trim()!==""&&A.staged!=="?"&&A.staged!==" ",d.title=d.checked?"已暂存点取消":"未暂存点暂存",d.onchange=async()=>{if(!Y)return;await j("POST",d.checked?"/stage":"/unstage",{dir:Y,paths:[A.path]}),J_()},__.appendChild(d);let u=document.createElement("td");u.className="mono ellipsis",u.textContent=A.path,u.title=A.path;let g=document.createElement("td");g.style.width="92px",g.style.minWidth="92px",g.style.textAlign="right",g.style.whiteSpace="nowrap",g.style.fontSize="11px",g.className="mut";let T_=A.binary?"二进制":(A.add!==void 0?`+${A.add} -${A.del??0} `:"")+ZO(A.staged,A.unstaged);g.textContent=T_,g.title=T_;let a=document.createElement("td");if(a.style.width="30px",a.style.textAlign="right",!(A.staged==="U"||A.unstaged==="U")){let v=document.createElement("button");v.textContent="↩",v.title="还原：丢弃该文件本地改动",v.style.padding="2px 7px",v.onclick=async()=>{if(!Y)return;if((A.staged==="?"||A.staged==="A")&&!confirm(`确定丢弃 ${A.path} 的本地内容吗？`))return;v.disabled=!0;let O_=await j("POST","/restore",{dir:Y,paths:[A.path],confirmed:!0}),S_=JSON.parse(O_.body);if(!S_.ok&&S_.error==="need-confirm"){if(confirm(`确定删除未跟踪的 ${A.path} 吗？`))await j("POST","/restore",{dir:Y,paths:[A.path],confirmed:!0})}else if(!S_.ok)p.textContent=S_.error||"还原失败";v.disabled=!1,J_()},a.appendChild(v)}w.append(__,u,g,a),H.appendChild(w)}L_.appendChild(H)},kO=(_,S)=>{QO(S,_.branch??"")},zO=(_)=>{let S=_.ahead??0,E=_.behind??0;if(E>0&&S>0)n.textContent=`远程 ${E} 个新，本地超前 ${S}`;else if(E>0)n.textContent=`远程有 ${E} 个新提交，可下载`;else if(S>0)n.textContent=`本地超前 ${S}可推送`;else n.textContent="已是最新";Y_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},B_=async()=>{if(!Y||P_)return;P_=!0;let _=Y;n.textContent="同步中…";try{await j("POST","/fetch",{dir:_}).catch(()=>{return});let S=await j("GET",`/status?dir=${encodeURIComponent(_)}`),E=JSON.parse(S.body);if(!E.ok||E.branch===void 0){cT(!0);return}cT(!1),zO(E),kO(E,_),pT(E),lS(E),uS(E)}catch(S){n.textContent=S instanceof R?`${S.code}`:"同步失败"}finally{P_=!1}},J_=async()=>{if(!Y||P_||document.hidden)return;P_=!0;try{let _=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body);if(!S.ok)return;lS(S),uS(S),Y_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{P_=!1}};K("btn-refresh").onclick=()=>void B_();K("btn-pull").onclick=async()=>{if(!Y)return;n.textContent="下载中…";try{await j("POST","/pull",{dir:Y})}catch{}B_()};e.onchange=async()=>{if(!Y||!e.value)return;n.textContent=`切换到 ${e.value}…`;let _=await j("POST","/checkout",{dir:Y,branch:e.value}),S=JSON.parse(_.body);if(!S.ok)n.textContent=S.output||S.error||"切换失败";B_()};var A_=K("btn-commit");A_.onclick=async()=>{if(!Y||A_.disabled)return;let _=t_.value.trim();if(!_){p.textContent="先写提交信息";return}A_.disabled=!0;let S=A_.textContent;A_.innerHTML='<span class="spin">↻</span> 提交中…';try{await j("POST","/fetch",{dir:Y}).catch(()=>{return});let E=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),G=JSON.parse(E.body),C=G.behind??0;if(C>0){p.textContent=`远程有 ${C} 个新提交，先点下载合并后再提交`,n.textContent=`远程有 ${C} 个新提交可下载`,pT(G);return}p.textContent="提交…";let V=await j("POST","/commit",{dir:Y,message:_,push:!0}),f=JSON.parse(V.body);if(!f.ok){p.textContent=f.error||"提交失败";return}p.textContent="跟远程核验中…",await j("POST","/fetch",{dir:Y}).catch(()=>{return});let P=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),H=JSON.parse(P.body),A=H.ahead??0;if(A>0){p.textContent=`已提交但远程核验本地仍超前 ${A}推送可能没完全成功请检查`,pT(H);return}t_.value="",p.textContent="已提交并推送远程核验一致",$O()}catch(E){p.textContent=E instanceof R?`${E.code}`:"提交失败"}finally{A_.disabled=!1,A_.textContent=S,B_()}};K("btn-ai").onclick=async()=>{if(!Y)return;p.textContent="AI 生成中…";try{let _=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body),E=(P)=>P.trim()!==""&&P!=="?"&&P!==" ",G=(S.files??[]).filter((P)=>E(P.staged));if(G.length===0){p.textContent="先勾选要提交的文件";return}let C="";for(let P of G.slice(0,3)){try{let H=await j("GET",`/diff?dir=${encodeURIComponent(Y)}&file=${encodeURIComponent(P.path)}&staged=1`),A=JSON.parse(H.body);if(A.ok&&A.diff)C+=`
--- ${P.path} ---
${A.diff.slice(0,2000)}`}catch{}if(C.length>6000)break}let V=G.map((P)=>`${P.staged}${P.unstaged} ${P.path}`).join(`
`).slice(0,1000),{text:f}=await Y_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${V}${C.slice(0,6000)}`,maxOutputTokens:100});t_.value=f.trim(),p.textContent=`已按 ${G.length} 个勾选文件生成`}catch{p.textContent="无小模型或未授权 model"}};var M_=null;K("btn-again").onclick=()=>{if(M_)clearTimeout(M_),M_=null;F_.hidden=!0};var $O=()=>{if(M_)clearTimeout(M_);F_.hidden=!1,M_=setTimeout(()=>{F_.hidden=!0,M_=null},2200),F_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let E=document.createElement("div");E.className="confetti",E.style.left=`${4+Math.random()*92}%`,E.style.background=_[S%_.length],E.style.animationDelay=`${Math.random()*0.5}s`,F_.appendChild(E)}};K("btn-conflict-ok").onclick=()=>{vS.hidden=!0};Y_.onResolve(async({args:_})=>{if(_.trim())t_.value=_.trim();return null});setInterval(()=>void J_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)J_()});Y_.onReady((_)=>{KT(_,document.documentElement);let S=_.directory??null;if(S!==Y){if(Y=S,!Y){cT(!0);return}B_()}});})();
