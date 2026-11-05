(()=>{var N="openchamber.sdk",W=1;var OT=`
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
`;function SS(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let E=new WeakMap;_.addEventListener("scroll",(M)=>{let R=M.target===_?S:M.target;if(!(R instanceof Element))return;if(!R.hasAttribute("data-oc-scrolling"))R.setAttribute("data-oc-scrolling","");let X=E.get(R);if(X!==void 0)clearTimeout(X);E.set(R,setTimeout(()=>{E.delete(R),R.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var oS=`(${SS.toString()})(document);`;var ET=128,UT=65536;var w_=128;var x_=65536;var AS=/^[a-z][a-z0-9-]{0,39}$/;var OS=(_)=>Object(_)===_&&!Array.isArray(_),AT=(_,S)=>Object.keys(_).every((E)=>S.includes(E)),ES=(_)=>String(_)===_&&_.length>=1&&_.length<=60,US=(_)=>String(_)===_&&_.length>=1&&_.length<=80,MS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let E of _){if(!OS(E)||!AS.test(E.id)||!ES(E.label))return!1;if(E.disabled!==void 0&&E.disabled!==!0&&E.disabled!==!1)return!1;if(S.has(E.id))return!1;if(S.add(E.id),E.kind==="button"){if(!AT(E,["kind","id","label","disabled"]))return!1;continue}if(E.kind!=="select"||!AT(E,["kind","id","label","value","options","disabled"]))return!1;if(!US(E.value)||!Array.isArray(E.options)||E.options.length<1||E.options.length>16)return!1;let M=new Set;for(let R of E.options){if(!OS(R)||!AT(R,["value","label"])||!US(R.value)||!ES(R.label)||M.has(R.value))return!1;M.add(R.value)}if(!M.has(E.value))return!1}return!0};var RS=["{id}","{segment}","{segments+}"];var yO=new Set(RS);var GS=["turn-finished","turn-failed","permission-asked","question-asked"];var gO=new Set(GS);var b_=20000000,q_=256;var MT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,DS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let E=0;E<_.bytes.byteLength;E+=1)if(_.bytes[E]!==S.bytes[E])return!1;return!0};var XS=/^[A-Za-z0-9_-]{1,80}$/;var CS=["left","right","top","bottom"];var IS=(_,S=0,E={remaining:16000})=>{if(--E.remaining<0||S>=32)return!1;if(_===null)return!0;let M=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let R of M)if(!IS(R,S+1,E))return!1;return!0},RT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(RT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(RT)}return String(_)===_||Number.isFinite(_)},GT=(_)=>{try{if(String(_.id)!==_.id||!XS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!CS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!IS(_.data)||!RT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var NS=["file","directory","other","missing"],XT=(_)=>Boolean(_&&"sessionId"in _),CT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var WS=/^[0-9a-f]{7,64}$/i,IT=(_)=>WS.test(_),y_=500,h_=32000,PS=16000,YS=128,QS=200,ZS=2000,kS=16000,zS=80,$S=200,FS=16000;var JS=2000;var VT=20000,g_=1024,m_=2000000;var c_=64000,p_=8000,NT=4000;var WT=960000;var LS=999,BS=1e4,$_=500,KS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],jS=["stopped","starting","ready","failed"],sS=new Set(KS),fS=(_)=>sS.has(_),HS=(_)=>_&&fS(_)?_:"HOST_REJECTED",C_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(C_);if(Object(_)===_)return Object.values(_).every(C_);return!1},wS=(_)=>C_(_)&&JSON.stringify(_).length<=FS,VS=(_)=>_?.trim().slice(0,$S)??"",I_=(_)=>{let S=_.id.trim().slice(0,YS),E=_.title.trim().slice(0,QS),M=_.url.trim().slice(0,ZS),R=_.text?.trim().slice(0,kS),X=_.author?.trim().slice(0,zS),Q=_.kind==="pull"?"pull":"issue",P={providerId:_.providerId.trim(),id:S,title:E||S,url:M,kind:Q};if(R)P.text=R;if(X)P.author=X;if(Q==="pull"){let H=VS(_.branches?.head),U=VS(_.branches?.base);if(H&&U)P.branches={head:H,base:U}}if(wS(_.data))P.data=_.data;return P},PT=(_)=>{let S=I_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},YT=(_)=>{let S={text:_.text.trim().slice(0,PS)};if(_.send)S.send=!0;return S},QT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(LS,Math.max(0,Math.round(_)))},ZT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(BS,Math.max(0,Math.ceil(_)))};var V_=(_)=>_.length>0&&_.length<=g_&&!_.includes("\x00")&&!_.includes("\\");var d_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>JS)return!1;return!_.split("/").some((E)=>E==="."||E==="..")},tS=new Set(jS),kT=(_)=>Boolean(_&&"status"in _&&tS.has(String(_.status))&&!("body"in _)),v_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),zT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),$T=(_)=>Boolean(_&&"written"in _&&_.written===!0),FT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),eS=new Set(NS),JT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&eS.has(String(_.kind))&&Number.isFinite(_.size)),LT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),_O=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),TO=(_)=>Object(_)===_?_:null,DT=(_)=>String(_)===_&&_.length>0,SO=(_)=>{if(!DT(_.id))return null;if(_.ok===!0){let S={channel:N,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&DT(_.error))return{channel:N,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:HS(DT(_.code)?_.code:void 0)};return null},BT=(_)=>{let S=TO(_);if(!S||S.channel!==N||S.v!==W)return null;if(S.type==="result")return SO(S);if(!_O.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var xS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),OO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class D extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var bS=()=>Promise.reject(new D("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),u_=()=>Promise.reject(new D("BAD_PATH",`File path must be 1 to ${g_} characters without NUL or backslash.`)),l_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new D("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},V=(_)=>{return _.value+=1,`oc-${_.value}`},KT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new D("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let E=_.acceptSource??((T)=>T===S.parent),M=_.requestTimeoutMs??VT,R=new Set,X=new Set,Q=new Set,P=new Set,H=new Set,U=new Set,w=new Set,S_=new Set,p=new Set,n=new Set,y=[],O_=null,E_=null,r=new Set,Q_=new Set,d=null,G_=null,Z_=!1,a=new Map,D_=new Map,X_=new Map,o=!1,I={value:0},C=null,s=null,k_=!1,z_=!1,uT=null,lT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},v=(T)=>{S.parent.postMessage(T,"*")},nT=()=>{if(o||S.parent===S||n.size===0||C?.features?.lateGenerateResults!==!0)return;v({channel:N,v:W,type:"generate-late-listen"})},J=(T,O)=>{for(let A of T)try{A(O)}catch(G){console.error(G)}},aT=(T)=>{if(!(T instanceof MessageEvent))return;if(!E(T.source))return;let O=BT(T.data);if(!O)return;if(O.type==="workspace"){let G=D_.get(O.payload.subscriptionId);if(G)J([G],O.payload.snapshot);return}if(O.type==="shells"){let G=X_.get(O.payload.subscriptionId);if(G)J([G],O.payload.snapshot);return}if(O.type==="ready"){if(C=O.payload,s=lT(O.payload.session),J(R,O.payload),J(X,O.payload.directory),J(Q,O.payload.session),s)J(P,s);J(H,O.payload.connection),J(U,O.payload.settings),J(w,O.payload.item),nT();return}if(O.type==="generate-late"){if(n.size===0)y.push(O.payload);else J(n,O.payload);return}if(O.type==="directory"){if(C)C={...C,directory:O.payload.directory};J(X,O.payload.directory);return}if(O.type==="session"){if(C)C={...C,session:O.payload.session};if(!O.payload.session)s=null;else if(s?.sessionId!==O.payload.session.id)s=lT(O.payload.session);J(Q,O.payload.session);return}if(O.type==="session-lifecycle"){s=O.payload,J(P,O.payload);return}if(O.type==="connection"){if(C)C={...C,connection:O.payload.connection};J(H,O.payload.connection);return}if(O.type==="settings"){if(C)C={...C,settings:O.payload.settings};J(U,O.payload.settings);return}if(O.type==="item"){if(C)C={...C,item:O.payload.item};J(w,O.payload.item);return}if(O.type==="status-control-event"){J(S_,O.payload);return}if(O.type==="popover-closed"){J(p,O.payload);return}if(O.type==="action"){let G=(Z)=>{if(!o)v({channel:N,v:W,type:"action-result",id:O.id,payload:Z})},k=E_;if(!k){G({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>k(O.payload)).then(()=>G({ok:!0}),(Z)=>{let K=(Z instanceof Error?Z.message:String(Z)).trim();G({ok:!1,error:(K||"Action failed.").slice(0,$_)})});return}if(O.type==="file-open"){let G=O.payload;if(G_&&DS(G_,G))return;G_=G,J(r,O.payload);return}if(O.type==="file-saved"){J(Q_,O.payload.version);return}if(O.type==="file-snapshot"){let G=(K)=>{if(!o)v({channel:N,v:W,type:"file-snapshot-result",id:O.id,payload:K})},k=(K)=>G({error:(K.trim()||"Could not read the edited file.").slice(0,$_)}),Z=d;if(!Z){k("This extension does not edit files.");return}Promise.resolve().then(()=>Z(O.payload.purpose)).then((K)=>{if(MT(K)>b_){k(`The file is over ${b_} ${"bytes"in K?"bytes":"characters"}.`);return}if(K.version.length>q_){k(`The snapshot version is over ${q_} characters.`);return}G({snapshot:"bytes"in K?{bytes:K.bytes,version:K.version}:{content:K.content,version:K.version}})},(K)=>k(K instanceof Error?K.message:String(K)));return}if(O.type==="resolve"){let G=(Z)=>{v({channel:N,v:W,type:"resolve-result",id:O.id,payload:Z})},k=O_;if(!k){G({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>k(O.payload)).then((Z)=>G({item:Z?I_(Z):null}),(Z)=>{let K=(Z instanceof Error?Z.message:String(Z)).trim();G({error:(K||"Command failed.").slice(0,$_)})});return}let A=a.get(O.id);if(!A)return;if(clearTimeout(A.timer),a.delete(O.id),O.ok){A.resolve(O.payload);return}A.reject(new D(O.code,O.error))};S.addEventListener("message",aT),v({channel:N,v:W,type:"hello"});let x=(T,O=M)=>{if(o||S.parent===S)return Promise.reject(new D("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,G)=>{let k=setTimeout(()=>{a.delete(T.id),G(new D("HOST_TIMEOUT","Host did not answer in time."))},O);a.set(T.id,{resolve:A,reject:G,timer:k}),v(T)})},L=(T)=>x(T).then(()=>{return}),B={channel:N,v:W},_T=(T)=>{if(!o&&S.parent!==S)v(T)},iT=()=>_T({...B,type:"file-save"}),oT=(T)=>{if(!xS(T)||!OO(T))return;T.preventDefault(),iT()},rT=(T)=>{if(!xS(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),_S(C.popover.id,"escape").catch(()=>{return})},j_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let O=k_||z_;if(uT===O)return;uT=O,TS(T.id,O).catch(()=>{return})},f_=()=>{if(C?.surface!=="popover"||k_)return;k_=!0,j_()},sT=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!k_)return;k_=!1,j_()},tT=()=>{if(C?.surface!=="popover"||z_)return;z_=!0,j_()},eT=()=>{if(C?.surface!=="popover"||!z_)return;z_=!1,j_()},i=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new D("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},TT=async(T)=>{if(T.kind!=="projects")i(T.projectId);let O=await x({...B,type:"workspace-read",id:V(I),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new D("HOST_REJECTED","Host did not return workspace data.");return O},ST=async(T,O)=>{if(T.kind!=="projects")i(T.projectId);let A=V(I);D_.set(A,O);try{await L({...B,type:"workspace-subscribe",id:V(I),payload:{subscriptionId:A,query:T}})}catch(G){if(D_.delete(A),!o)v({...B,type:"workspace-unsubscribe",id:V(I),payload:{subscriptionId:A}});throw G}return()=>{if(!D_.delete(A)||o)return;v({...B,type:"workspace-unsubscribe",id:V(I),payload:{subscriptionId:A}})}},iS=async(T,O)=>{if(T.kind==="session")i(T.sessionId);if(T.kind==="project")i(T.projectId);let A=V(I);X_.set(A,O);try{await L({...B,type:"shells-subscribe",id:V(I),payload:{subscriptionId:A,scope:T}})}catch(G){if(X_.delete(A),!o)v({...B,type:"shells-unsubscribe",id:V(I),payload:{subscriptionId:A}});throw G}return()=>{if(!X_.delete(A)||o)return;v({...B,type:"shells-unsubscribe",id:V(I),payload:{subscriptionId:A}})}},H_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>ET))throw new D("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!C_(T.value))throw new D("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>UT)throw new D("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new D("UNSUPPORTED","This host does not support device storage.");let O=await x({...B,type:"storage",id:V(I),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new D("HOST_REJECTED","Host did not return storage data.");return O},_S=(T,O)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new D("UNSUPPORTED","This host does not support popovers.")):L({...B,type:"popover-close",id:V(I),payload:O?{id:T,reason:O}:{id:T}}),TS=(T,O)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new D("UNSUPPORTED","This host does not support popovers.")):L({...B,type:"popover-anchor",id:V(I),payload:{id:T,active:O}});return S.addEventListener("keydown",rT,!0),S.addEventListener("pointerover",f_),S.addEventListener("pointermove",f_),S.addEventListener("pointerout",sT),S.addEventListener("focus",tT),S.addEventListener("blur",eT),{onAction:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},listProjects:async()=>{let T=await TT({kind:"projects"});if(T.kind!=="projects")throw new D("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await TT({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new D("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await TT({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new D("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>ST({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>ST({kind:"worktrees",projectId:T},(A)=>{if(A.kind==="worktrees")O(A)}),onSessions:(T,O)=>ST({kind:"sessions",projectId:T},(A)=>{if(A.kind==="sessions")O(A)}),onRunningShells:(T,O)=>iS(T,O),readShellOutput:async(T,O)=>{i(T,w_);let A=O?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new D("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let G=O?.tailBytes;if(G!==void 0&&(!Number.isInteger(G)||G<1||G>x_))throw new D("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${x_}.`);let Z=await x({...B,type:"shell-output",id:V(I),payload:{shellId:T,cursor:A,tailBytes:G}});if(!Z||typeof Z.output!=="string"||!Number.isFinite(Z.cursor))throw new D("HOST_REJECTED","Host did not return shell output.");return Z},stopShell:async(T)=>{if(i(T,w_),(await x({...B,type:"shell-stop",id:V(I),payload:{shellId:T}}))?.stopped!==!0)throw new D("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{i(T),await L({...B,type:"open-session",id:V(I),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let A=l_(O),G={op:"get",key:T};if(A)G.scope=A;let k=await H_(G);return k.op==="get"&&k.found?k.value:void 0},set:async(T,O,A)=>{let G=l_(A),k={op:"set",key:T,value:O};if(G)k.scope=G;await H_(k)},delete:async(T,O)=>{let A=l_(O),G={op:"delete",key:T};if(A)G.scope=A;await H_(G)},keys:async(T)=>{let O=l_(T),A={op:"keys"};if(O)A.scope=O;let G=await H_(A);if(G.op!=="keys")throw new D("HOST_REJECTED","Expected storage keys.");return G.keys}},onReady:(T)=>{if(R.add(T),C)T(C);return()=>{R.delete(T)}},onDirectory:(T)=>{if(X.add(T),C)T(C.directory);return()=>{X.delete(T)}},onSession:(T)=>{if(Q.add(T),C)T(C.session);return()=>{Q.delete(T)}},onSessionLifecycle:(T)=>{if(P.add(T),s)T(s);return()=>{P.delete(T)}},onConnection:(T)=>{if(H.add(T),C)T(C.connection);return()=>{H.delete(T)}},onSettings:(T)=>{if(U.add(T),C)T(C.settings);return()=>{U.delete(T)}},onItem:(T)=>{if(w.add(T),C)T(C.item);return()=>{w.delete(T)}},onStatusControl:(T)=>{return S_.add(T),()=>{S_.delete(T)}},onPopoverClosed:(T)=>{return p.add(T),()=>{p.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new D("UNSUPPORTED","This host does not support status controls."));if(!MS(T))return Promise.reject(new D("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return L({...B,type:"status-controls",id:V(I),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new D("UNSUPPORTED","This host does not support popovers."));if(!GT(T))return Promise.reject(new D("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return L({...B,type:"popover-open",id:V(I),payload:T})},closePopover:_S,setPopoverAnchorActive:TS,onResolve:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>y_)return Promise.reject(new D("HOST_REJECTED",`Toast message must contain 1 to ${y_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>h_))return Promise.reject(new D("HOST_REJECTED",`Toast copy text must contain 1 to ${h_} characters.`));return L({channel:N,v:W,type:"toast",id:V(I),payload:{...T,message:O}})},openUrl:(T)=>L({channel:N,v:W,type:"open-url",id:V(I),payload:{url:T}}),openCommit:(T)=>IT(T)?L({channel:N,v:W,type:"open-commit",id:V(I),payload:{sha:T}}):Promise.reject(new D("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>L({channel:N,v:W,type:"open-surface",id:V(I),payload:{surfaceId:T}}),writeClipboard:(T)=>L({channel:N,v:W,type:"clipboard-write",id:V(I),payload:{text:T}}),compose:(T)=>L({channel:N,v:W,type:"compose",id:V(I),payload:T}),attach:(T)=>L({channel:N,v:W,type:"attach",id:V(I),payload:I_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)i(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")i(O.directory);else{if(O.name!==void 0)i(O.name,200);if(O.baseBranch!==void 0)i(O.baseBranch,200)}let A=await x({channel:N,v:W,type:"start-session",id:V(I),payload:PT(T)},_.requestTimeoutMs??180000);if(!XT(A))throw new D("HOST_REJECTED","Host did not return a session.");return A},prompt:(T)=>x({channel:N,v:W,type:"prompt",id:V(I),payload:YT(T)}).then((O)=>{if(!CT(O))throw new D("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>L({channel:N,v:W,type:"session-link",id:V(I),payload:I_(T)}),close:()=>L({channel:N,v:W,type:"close",id:V(I)}),oauthStart:()=>L({channel:N,v:W,type:"oauth-start",id:V(I)}),oauthDisconnect:()=>L({channel:N,v:W,type:"oauth-disconnect",id:V(I)}),request:(T)=>(d_(T.path)?x({channel:N,v:W,type:"request",id:V(I),payload:T}):bS()).then((O)=>{if(!v_(O))throw new D("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(d_(T.path)?x({channel:N,v:W,type:"service-request",id:V(I),payload:T}):bS()).then((O)=>{if(!v_(O))throw new D("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>x({channel:N,v:W,type:"service-status",id:V(I)}).then((T)=>{if(!kT(T))throw new D("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(V_(T)?x({channel:N,v:W,type:"file-read",id:V(I),payload:{path:T}}):u_()).then((O)=>{if(!zT(O))throw new D("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!V_(T))return u_();if(O.length>m_)return Promise.reject(new D("FILE_TOO_LARGE",`Content is over ${m_} characters.`));return x({channel:N,v:W,type:"file-write",id:V(I),payload:{path:T,content:O}}).then((A)=>{if(!$T(A))throw new D("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(T)=>(V_(T)?x({channel:N,v:W,type:"file-list",id:V(I),payload:{path:T}}):u_()).then((O)=>{if(!FT(O))throw new D("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(V_(T)?x({channel:N,v:W,type:"file-stat",id:V(I),payload:{path:T}}):u_()).then((O)=>{if(!JT(O))throw new D("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),A=T.system?.trim();if(O.length===0||O.length>c_)return Promise.reject(new D("HOST_REJECTED",`Prompt must be 1 to ${c_} characters.`));if(A!==void 0&&(A.length===0||A.length>p_))return Promise.reject(new D("HOST_REJECTED",`System prompt must be 1 to ${p_} characters.`));let G=T.maxOutputTokens===void 0?void 0:Math.min(NT,Math.max(1,Math.floor(T.maxOutputTokens)));if(G!==void 0&&!Number.isFinite(G))return Promise.reject(new D("HOST_REJECTED","maxOutputTokens must be a number."));let k={prompt:O};if(A!==void 0)k.system=A;if(G!==void 0)k.maxOutputTokens=G;return x({channel:N,v:W,type:"generate",id:V(I),payload:k},_.requestTimeoutMs??WT).then((Z)=>{if(!LT(Z))throw new D("HOST_REJECTED","Host did not return generated text.");return Z})},onLateGenerateResult:(T)=>{n.add(T);for(let O of y.splice(0))J([T],O);return nT(),()=>{n.delete(T)}},setBadge:(T)=>L({channel:N,v:W,type:"badge",id:V(I),payload:{count:QT(T)}}),setHeight:(T)=>L({channel:N,v:W,type:"resize",id:V(I),payload:{height:ZT(T)}}),onFileOpen:(T)=>{if(r.add(T),!Z_)Z_=!0,S.addEventListener("keydown",oT,!0);if(G_)T(G_);return()=>{r.delete(T)}},onFileSnapshot:(T)=>{return d=T,()=>{if(d===T)d=null}},onFileSaved:(T)=>{return Q_.add(T),()=>{Q_.delete(T)}},reportFileChange:(T)=>_T({...B,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:iT,reportFileUnsupported:()=>_T({...B,type:"file-unsupported"}),dispose:()=>{for(let T of D_.keys())v({...B,type:"workspace-unsubscribe",id:V(I),payload:{subscriptionId:T}});D_.clear();for(let T of X_.keys())v({...B,type:"shells-unsubscribe",id:V(I),payload:{subscriptionId:T}});if(X_.clear(),o=!0,O_=null,E_=null,d=null,r.clear(),Q_.clear(),Z_)S.removeEventListener("keydown",oT,!0);S.removeEventListener("message",aT),S.removeEventListener("keydown",rT,!0),S.removeEventListener("pointerover",f_),S.removeEventListener("pointermove",f_),S.removeEventListener("pointerout",sT),S.removeEventListener("focus",tT),S.removeEventListener("blur",eT);for(let T of a.values())clearTimeout(T.timer),T.reject(new D("HOST_UNAVAILABLE","Host client was disposed."));a.clear(),R.clear(),X.clear(),Q.clear(),P.clear(),H.clear(),U.clear(),w.clear(),S_.clear(),p.clear(),n.clear(),y.length=0}}};var qS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var tO=new Set(qS);var yS=["none","agent","user"];var _E=new Set(yS);var EO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],UO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],hS=(_,S)=>{S.style.colorScheme=_.mode;for(let[E,M]of EO)S.style.setProperty(E,_.tokens[M]);for(let[E,M,R]of UO){let X=_.tokens[R]??"";S.style.setProperty(E,X),S.style.setProperty(M,X)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},jT=(_,S)=>{if(hS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var AO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},z=(_,S)=>`var(--${_}, var(--oc-${AO[_]}, ${S}))`,e=z("surface-background","transparent"),a_=z("surface-elevated","transparent"),N_=z("surface-elevated-foreground","inherit"),u=z("surface-foreground","inherit"),$=z("surface-muted-foreground","gray"),MO=z("surface-muted","transparent"),U_=z("interactive-border","currentColor"),h=z("interactive-hover","transparent"),A_=z("interactive-active","transparent"),fT=z("interactive-selection","transparent"),HT=z("interactive-selection-foreground","inherit"),t=z("primary","currentColor"),wT=z("primary-text","inherit"),xT=z("error-text","inherit"),RO=z("font-sans","inherit"),bT=z("font-mono","monospace"),pS=z("radius","9px"),qT=`calc(${pS} - 2px)`,gS=`calc(${pS} - 4px)`,F=(_,S,E="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${E})`,mS=`background-image: linear-gradient(${h}, ${h});`,yT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,hT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",cS="box-shadow: var(--oc-sdk-lit);",gT=`inset 0 0.5px 0 0 ${F(u,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,GO=`
:root {
  --oc-sdk-edge: ${F(u,16)};
  --oc-sdk-field-bg: ${a_};
  --oc-sdk-raised-bg: ${e};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${F(u,14)};
  --oc-sdk-field-bg: ${F(e,50,a_)};
  --oc-sdk-raised-bg: ${a_};
  --oc-sdk-field-lift: ${gT};
  --oc-sdk-raised-lift: ${gT};
  --oc-sdk-lit: ${gT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,n_=(_)=>{let S=z(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${z(`${_}-text`,"inherit")}; }`},DO=`
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
`,dS=`${GO}
.oc-sdk { color: ${u}; font-family: ${RO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${mS} }
.oc-sdk-mono { font-family: ${bT}; }
.oc-sdk-muted { color: ${$}; }
${n_("success")}${n_("warning")}${n_("error")}${n_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${wT}; }

.oc-sdk-btn { border-radius: ${qT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${gS}; }
.oc-sdk-btn[data-variant="default"] { color: ${wT}; background: ${F(t,10,e)}; border-color: ${F(t,12)}; ${cS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${F(t,16,e)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${F(t,22,e)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${MO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${N_}; ${hT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${h}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${z("status-error","red")}; color: ${xT}; background: ${F("var(--oc-sdk-tone)",7,e)}; border-color: ${F("var(--oc-sdk-tone)",12)}; ${cS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${F("var(--oc-sdk-tone)",9,e)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${F("var(--oc-sdk-tone)",11,e)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${xT}; }
.oc-sdk-input { border-radius: ${qT}; background: var(--oc-sdk-field-bg); color: ${N_}; ${yT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${yT(F(u,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${yT(z("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${bT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${t}; }
.oc-sdk-search-clear { border-radius: ${gS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${h}; color: ${u}; }

.oc-sdk-trigger { border-radius: ${qT}; background: var(--oc-sdk-raised-bg); color: ${N_}; ${hT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${N_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${a_}; background-clip: padding-box; color: ${N_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${h}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fT}; color: ${HT}; }
.oc-sdk-option-check { color: ${u}; }
.oc-sdk-option[data-destructive="true"] { color: ${xT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${F(z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${U_}; border-radius: 4px; color: ${u}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${F(u,60,U_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${U_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${e}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${t}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${mS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${F(u,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${u}; }
.oc-sdk-tab[aria-selected="true"] { color: ${HT}; background: ${fT}; border-color: ${U_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${N_}; background: var(--oc-sdk-raised-bg); ${hT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${F(u,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${F("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${h}; }
.oc-sdk-row[aria-selected="true"] { background: ${fT}; color: ${HT}; }
.oc-sdk-row-lead { font-family: ${bT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${U_}; border-top-color: ${t}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${F("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${F(U_,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${F(u,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${t}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${z("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${z("success-text","inherit")}; }

.oc-sdk-text a { color: ${wT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${F(U_,60)}; }
`,b=`
${OT}
${DO}
${dS}`;var Y_=KT(),uS=document.querySelector("#root");if(!uS)throw Error("Missing #root");uS.innerHTML=`
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
input[type=checkbox]{width:19px;height:19px;accent-color:var(--primary,#3574f0);cursor:pointer;flex:none;margin:0}
.selbar{display:flex;gap:10px;align-items:center;background:#8881;border-radius:8px;padding:7px 10px;cursor:pointer;user-select:none}
.selbar:hover{background:#8882}
.selbar span{font-size:12px}
.file .p{cursor:pointer}
.file .p:hover{text-decoration:underline}
button.ai{background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;color:#fff;font-weight:700;padding:6px 14px}
button.ai:hover{filter:brightness(1.12)}
button.icon{padding:4px 10px;font-size:13px}
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
    <button id="btn-ai" class="ai" title="按勾选文件 AI 生成提交信息">✨ AI 生成</button>
    <span style="flex:1"></span>
    <button id="btn-commit" class="primary">提交并推送</button>
  </div>
  <div id="out" class="mut"></div>
</div>
`;var j=(_)=>document.querySelector(`#${_}`),T_=j("branch"),q=j("sync"),t_=j("remote"),J_=j("local"),e_=j("msg"),l=j("out"),NO=j("topbar"),WO=j("h-remote"),PO=j("h-local"),YO=j("nongit"),QO=j("commitBox"),L_=j("done"),pT=new Set,lS=j("conflict"),vS=j("conflict-list"),ZO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),cT="",nS=(_)=>{let S=ZO(_);if(S.length===0){cT="";return}let E=S.join(`
`);if(E===cT)return;cT=E,vS.innerHTML="";for(let M of S.slice(0,20)){let R=document.createElement("tr"),X=document.createElement("td");X.className="mono ellipsis",X.textContent=M,R.appendChild(X),vS.appendChild(R)}lS.hidden=!1},dT=(_)=>{YO.hidden=!_,NO.style.display=_?"none":"",q.style.display=_?"none":"",WO.style.display=_?"none":"",t_.style.display=_?"none":"",PO.style.display=_?"none":"",J_.style.display=_?"none":"",QO.style.display=_?"none":""},Y=null,P_=!1,f=(_,S,E)=>Y_.serviceRequest({method:_,path:S,body:E===void 0?void 0:JSON.stringify(E)});var kO=async(_,S)=>{try{let E=await f("GET",`/branches?dir=${encodeURIComponent(_)}`),M=JSON.parse(E.body);if(!M.ok||!M.branches)return;if(T_.value&&T_.value===S&&T_.options.length>0)return;pT.clear();for(let X of M.remotes??[])pT.add(X.name);T_.innerHTML="";let R=document.createElement("optgroup");R.label="本地分支";for(let X of M.branches){let Q=document.createElement("option");if(Q.value=X.name,Q.textContent=X.name,X.current)Q.selected=!0;R.appendChild(Q)}if(T_.appendChild(R),M.remotes&&M.remotes.length>0){let X=document.createElement("optgroup");X.label="远程分支";for(let Q of M.remotes){let P=document.createElement("option");P.value=Q.name,P.textContent=Q.name,X.appendChild(P)}T_.appendChild(X)}}catch{}},vT=(_)=>{t_.innerHTML="";let S=_.incoming??[];if(S.length===0){t_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let E=document.createElement("table");for(let M of S){let R=document.createElement("tr"),X=document.createElement("td");X.className="mono ellipsis",X.textContent=`${M.sha} ${M.subject}`,X.title=`${M.sha} ${M.subject} · ${M.author} ${M.date}`,R.appendChild(X),E.appendChild(R)}t_.appendChild(E)},c={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},zO=(_,S)=>{if(`${_}${S}`==="??")return c.purple;if(_==="U"||S==="U")return c.red;if(_==="D"||S==="D")return c.red;if(_==="A"||S==="A")return c.green;if(_==="R"||S==="R"||_==="C"||S==="C")return c.blue;if(_==="M"||S==="M")return c.amber;return c.gray},$O=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let M="改动";if(_==="A"||S==="A")M="新增";else if(_==="D"||S==="D")M="删除";else if(_==="R"||S==="R")M="重命名";else if(_==="C"||S==="C")M="复制";else if(_==="T"||S==="T")M="类型变更";else if(_==="M"||S==="M")M="修改";return _!==" "&&_!=="?"&&_!=="!"?`${M}·已暂存`:M},aS=(_)=>{J_.innerHTML="";let S=_.files??[];if(S.length===0){let U=document.createElement("div");U.className="empty",U.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',J_.appendChild(U);return}let E=(U)=>U.trim()!==""&&U!=="?"&&U!==" ",M=S.every((U)=>E(U.staged)),R=document.createElement("div");R.className="selbar",R.onclick=(U)=>{if(U.target.tagName!=="INPUT")X.click()};let X=document.createElement("input");X.type="checkbox",X.checked=M,X.title=M?"全不选：取消全部暂存":"全选：暂存全部",X.onchange=async()=>{if(!Y){X.checked=!X.checked;return}if(X.checked){let U=S.filter((w)=>!E(w.staged)).map((w)=>w.path);if(U.length>0)await f("POST","/stage",{dir:Y,paths:U})}else{let U=S.filter((w)=>E(w.staged)).map((w)=>w.path);if(U.length>0)await f("POST","/unstage",{dir:Y,paths:U})}B_()};let Q=document.createElement("span");Q.className="mut";let P=S.filter((U)=>E(U.staged)).length;Q.textContent=`全选 ${P}/${S.length}`,R.append(X,Q),J_.appendChild(R);let H=document.createElement("table");for(let U of S){let w=document.createElement("tr"),S_=document.createElement("td");S_.style.width="28px";let p=document.createElement("input");p.type="checkbox",p.checked=U.staged.trim()!==""&&U.staged!=="?"&&U.staged!==" ",p.title=p.checked?"已暂存点取消":"未暂存点暂存",p.onchange=async()=>{if(!Y)return;await f("POST",p.checked?"/stage":"/unstage",{dir:Y,paths:[U.path]}),B_()},S_.appendChild(p);let n=document.createElement("td");n.className="mono ellipsis",n.textContent=U.path,n.title=`${U.path}（点切换勾选）`,n.onclick=()=>p.click();let y=document.createElement("td");y.style.width="92px",y.style.minWidth="92px",y.style.textAlign="right",y.style.whiteSpace="nowrap",y.style.fontSize="11px",y.className="mut";let O_=U.binary?`<span style="color:${c.gray}">二进制</span>`:U.add!==void 0?`<span style="color:${c.green}">+${U.add}</span> <span style="color:${c.red}">-${U.del??0}</span> `:"",E_=$O(U.staged,U.unstaged);y.innerHTML=`${O_}<span style="color:${zO(U.staged,U.unstaged)}">${E_}</span>`,y.title=y.textContent??"";let r=document.createElement("td");if(r.style.width="30px",r.style.textAlign="right",!(U.staged==="U"||U.unstaged==="U")){let d=document.createElement("button");d.textContent="↩ 还原",d.title="还原：丢弃该文件本地改动",d.className="icon",d.onclick=async()=>{if(!Y)return;if((U.staged==="?"||U.staged==="A")&&!confirm(`确定丢弃 ${U.path} 的本地内容吗？`))return;d.disabled=!0;let Z_=await f("POST","/restore",{dir:Y,paths:[U.path],confirmed:!0}),a=JSON.parse(Z_.body);if(!a.ok&&a.error==="need-confirm"){if(confirm(`确定删除未跟踪的 ${U.path} 吗？`))await f("POST","/restore",{dir:Y,paths:[U.path],confirmed:!0})}else if(!a.ok)l.textContent=a.error||"还原失败";d.disabled=!1,B_()},r.appendChild(d)}w.append(S_,n,y,r),H.appendChild(w)}J_.appendChild(H)},FO=(_,S)=>{kO(S,_.branch??"")},JO=(_)=>{let S=_.ahead??0,E=_.behind??0;if(E>0&&S>0)q.textContent=`远程 ${E} 个新，本地超前 ${S}`,q.style.color=c.amber;else if(E>0)q.textContent=`远程有 ${E} 个新提交，可下载`,q.style.color=c.amber;else if(S>0)q.textContent=`本地超前 ${S}可推送`,q.style.color=c.blue;else q.textContent="已是最新",q.style.color=c.green;Y_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},K_=async()=>{if(!Y||P_)return;P_=!0;let _=Y;q.textContent="同步中…";try{await f("POST","/fetch",{dir:_}).catch(()=>{return});let S=await f("GET",`/status?dir=${encodeURIComponent(_)}`),E=JSON.parse(S.body);if(!E.ok||E.branch===void 0){dT(!0);return}dT(!1),JO(E),FO(E,_),vT(E),aS(E),nS(E)}catch(S){q.textContent=S instanceof D?`${S.code}`:"同步失败"}finally{P_=!1}},B_=async()=>{if(!Y||P_||document.hidden)return;P_=!0;try{let _=await f("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body);if(!S.ok)return;aS(S),nS(S),Y_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{P_=!1}};j("btn-refresh").onclick=()=>void K_();j("btn-pull").onclick=async()=>{if(!Y)return;q.textContent="下载中…";try{await f("POST","/pull",{dir:Y})}catch{}K_()};T_.onchange=async()=>{if(!Y||!T_.value)return;let _=T_.value,S=pT.has(_),E=S?_.slice(_.indexOf("/")+1):_;q.textContent=S?`新建跟踪分支 ${E}…`:`切换到 ${_}…`;let M=await f("POST","/checkout",S?{dir:Y,branch:E,create:!0,base:_}:{dir:Y,branch:_}),R=JSON.parse(M.body);if(!R.ok)q.textContent=R.output||R.error||"切换失败";K_()};var M_=j("btn-commit");M_.onclick=async()=>{if(!Y||M_.disabled)return;let _=e_.value.trim();if(!_){l.textContent="先写提交信息";return}M_.disabled=!0;let S=M_.textContent;M_.innerHTML='<span class="spin">↻</span> 提交中…';try{await f("POST","/fetch",{dir:Y}).catch(()=>{return});let E=await f("GET",`/status?dir=${encodeURIComponent(Y)}`),M=JSON.parse(E.body),R=M.behind??0;if(R>0){l.textContent=`远程有 ${R} 个新提交，先点下载合并后再提交`,q.textContent=`远程有 ${R} 个新提交可下载`,vT(M);return}l.textContent="提交…";let X=await f("POST","/commit",{dir:Y,message:_,push:!0}),Q=JSON.parse(X.body);if(!Q.ok){l.textContent=Q.error||"提交失败";return}l.textContent="跟远程核验中…",await f("POST","/fetch",{dir:Y}).catch(()=>{return});let P=await f("GET",`/status?dir=${encodeURIComponent(Y)}`),H=JSON.parse(P.body),U=H.ahead??0;if(U>0){l.textContent=`已提交但远程核验本地仍超前 ${U}推送可能没完全成功请检查`,vT(H);return}e_.value="",l.textContent="已提交并推送远程核验一致",LO()}catch(E){l.textContent=E instanceof D?`${E.code}`:"提交失败"}finally{M_.disabled=!1,M_.textContent=S,K_()}};j("btn-ai").onclick=async()=>{if(!Y)return;l.textContent="AI 生成中…";try{let _=await f("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body),E=(P)=>P.trim()!==""&&P!=="?"&&P!==" ",M=(S.files??[]).filter((P)=>E(P.staged));if(M.length===0){l.textContent="先勾选要提交的文件";return}let R="";for(let P of M.slice(0,3)){try{let H=await f("GET",`/diff?dir=${encodeURIComponent(Y)}&file=${encodeURIComponent(P.path)}&staged=1`),U=JSON.parse(H.body);if(U.ok&&U.diff)R+=`
--- ${P.path} ---
${U.diff.slice(0,2000)}`}catch{}if(R.length>6000)break}let X=M.map((P)=>`${P.staged}${P.unstaged} ${P.path}`).join(`
`).slice(0,1000),{text:Q}=await Y_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${X}${R.slice(0,6000)}`,maxOutputTokens:100});e_.value=Q.trim(),l.textContent=`已按 ${M.length} 个勾选文件生成`}catch{l.textContent="无小模型或未授权 model"}};var R_=null;j("btn-again").onclick=()=>{if(R_)clearTimeout(R_),R_=null;L_.hidden=!0};var LO=()=>{if(R_)clearTimeout(R_);L_.hidden=!1,R_=setTimeout(()=>{L_.hidden=!0,R_=null},2200),L_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let E=document.createElement("div");E.className="confetti",E.style.left=`${4+Math.random()*92}%`,E.style.background=_[S%_.length],E.style.animationDelay=`${Math.random()*0.5}s`,L_.appendChild(E)}};j("btn-conflict-ok").onclick=()=>{lS.hidden=!0};Y_.onResolve(async({args:_})=>{if(_.trim())e_.value=_.trim();return null});setInterval(()=>void B_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)B_()});Y_.onReady((_)=>{jT(_,document.documentElement);let S=_.directory??null;if(S!==Y){if(Y=S,!Y){dT(!0);return}K_()}});})();
