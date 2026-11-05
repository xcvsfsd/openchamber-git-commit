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
`;function TS(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let E=new WeakMap;_.addEventListener("scroll",(G)=>{let D=G.target===_?S:G.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let V=E.get(D);if(V!==void 0)clearTimeout(V);E.set(D,setTimeout(()=>{E.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var iS=`(${TS.toString()})(document);`;var ET=128,UT=65536;var w_=128;var x_=65536;var US=/^[a-z][a-z0-9-]{0,39}$/;var SS=(_)=>Object(_)===_&&!Array.isArray(_),AT=(_,S)=>Object.keys(_).every((E)=>S.includes(E)),OS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,ES=(_)=>String(_)===_&&_.length>=1&&_.length<=80,AS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let E of _){if(!SS(E)||!US.test(E.id)||!OS(E.label))return!1;if(E.disabled!==void 0&&E.disabled!==!0&&E.disabled!==!1)return!1;if(S.has(E.id))return!1;if(S.add(E.id),E.kind==="button"){if(!AT(E,["kind","id","label","disabled"]))return!1;continue}if(E.kind!=="select"||!AT(E,["kind","id","label","value","options","disabled"]))return!1;if(!ES(E.value)||!Array.isArray(E.options)||E.options.length<1||E.options.length>16)return!1;let G=new Set;for(let D of E.options){if(!SS(D)||!AT(D,["value","label"])||!ES(D.value)||!OS(D.label)||G.has(D.value))return!1;G.add(D.value)}if(!G.has(E.value))return!1}return!0};var MS=["{id}","{segment}","{segments+}"];var qO=new Set(MS);var RS=["turn-finished","turn-failed","permission-asked","question-asked"];var hO=new Set(RS);var b_=20000000,q_=256;var MT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,GS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let E=0;E<_.bytes.byteLength;E+=1)if(_.bytes[E]!==S.bytes[E])return!1;return!0};var DS=/^[A-Za-z0-9_-]{1,80}$/;var XS=["left","right","top","bottom"];var CS=(_,S=0,E={remaining:16000})=>{if(--E.remaining<0||S>=32)return!1;if(_===null)return!0;let G=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of G)if(!CS(D,S+1,E))return!1;return!0},RT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(RT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(RT)}return String(_)===_||Number.isFinite(_)},GT=(_)=>{try{if(String(_.id)!==_.id||!DS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!XS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!CS(_.data)||!RT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var VS=["file","directory","other","missing"],XT=(_)=>Boolean(_&&"sessionId"in _),CT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var NS=/^[0-9a-f]{7,64}$/i,IT=(_)=>NS.test(_),y_=500,h_=32000,WS=16000,PS=128,YS=200,QS=2000,ZS=16000,kS=80,zS=200,$S=16000;var LS=2000;var VT=20000,g_=1024,m_=2000000;var c_=64000,p_=8000,NT=4000;var WT=960000;var FS=999,JS=1e4,$_=500,BS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],KS=["stopped","starting","ready","failed"],rS=new Set(BS),jS=(_)=>rS.has(_),fS=(_)=>_&&jS(_)?_:"HOST_REJECTED",C_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(C_);if(Object(_)===_)return Object.values(_).every(C_);return!1},HS=(_)=>C_(_)&&JSON.stringify(_).length<=$S,IS=(_)=>_?.trim().slice(0,zS)??"",I_=(_)=>{let S=_.id.trim().slice(0,PS),E=_.title.trim().slice(0,YS),G=_.url.trim().slice(0,QS),D=_.text?.trim().slice(0,ZS),V=_.author?.trim().slice(0,kS),f=_.kind==="pull"?"pull":"issue",P={providerId:_.providerId.trim(),id:S,title:E||S,url:G,kind:f};if(D)P.text=D;if(V)P.author=V;if(f==="pull"){let H=IS(_.branches?.head),U=IS(_.branches?.base);if(H&&U)P.branches={head:H,base:U}}if(HS(_.data))P.data=_.data;return P},PT=(_)=>{let S=I_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},YT=(_)=>{let S={text:_.text.trim().slice(0,WS)};if(_.send)S.send=!0;return S},QT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(FS,Math.max(0,Math.round(_)))},ZT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(JS,Math.max(0,Math.ceil(_)))};var V_=(_)=>_.length>0&&_.length<=g_&&!_.includes("\x00")&&!_.includes("\\");var d_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>LS)return!1;return!_.split("/").some((E)=>E==="."||E==="..")},sS=new Set(KS),kT=(_)=>Boolean(_&&"status"in _&&sS.has(String(_.status))&&!("body"in _)),v_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),zT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),$T=(_)=>Boolean(_&&"written"in _&&_.written===!0),LT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),tS=new Set(VS),FT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&tS.has(String(_.kind))&&Number.isFinite(_.size)),JT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),eS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),_O=(_)=>Object(_)===_?_:null,DT=(_)=>String(_)===_&&_.length>0,TO=(_)=>{if(!DT(_.id))return null;if(_.ok===!0){let S={channel:N,v:W,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&DT(_.error))return{channel:N,v:W,type:"result",id:_.id,ok:!1,error:_.error,code:fS(DT(_.code)?_.code:void 0)};return null},BT=(_)=>{let S=_O(_);if(!S||S.channel!==N||S.v!==W)return null;if(S.type==="result")return TO(S);if(!eS.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var wS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),SO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var xS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),u_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${g_} characters without NUL or backslash.`)),l_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},I=(_)=>{return _.value+=1,`oc-${_.value}`},KT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let E=_.acceptSource??((T)=>T===S.parent),G=_.requestTimeoutMs??VT,D=new Set,V=new Set,f=new Set,P=new Set,H=new Set,U=new Set,w=new Set,S_=new Set,l=new Set,n=new Set,y=[],O_=null,E_=null,r=new Set,Q_=new Set,p=null,G_=null,Z_=!1,a=new Map,D_=new Map,X_=new Map,o=!1,C={value:0},X=null,s=null,k_=!1,z_=!1,vT=null,uT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},d=(T)=>{S.parent.postMessage(T,"*")},lT=()=>{if(o||S.parent===S||n.size===0||X?.features?.lateGenerateResults!==!0)return;d({channel:N,v:W,type:"generate-late-listen"})},L=(T,O)=>{for(let A of T)try{A(O)}catch(M){console.error(M)}},nT=(T)=>{if(!(T instanceof MessageEvent))return;if(!E(T.source))return;let O=BT(T.data);if(!O)return;if(O.type==="workspace"){let M=D_.get(O.payload.subscriptionId);if(M)L([M],O.payload.snapshot);return}if(O.type==="shells"){let M=X_.get(O.payload.subscriptionId);if(M)L([M],O.payload.snapshot);return}if(O.type==="ready"){if(X=O.payload,s=uT(O.payload.session),L(D,O.payload),L(V,O.payload.directory),L(f,O.payload.session),s)L(P,s);L(H,O.payload.connection),L(U,O.payload.settings),L(w,O.payload.item),lT();return}if(O.type==="generate-late"){if(n.size===0)y.push(O.payload);else L(n,O.payload);return}if(O.type==="directory"){if(X)X={...X,directory:O.payload.directory};L(V,O.payload.directory);return}if(O.type==="session"){if(X)X={...X,session:O.payload.session};if(!O.payload.session)s=null;else if(s?.sessionId!==O.payload.session.id)s=uT(O.payload.session);L(f,O.payload.session);return}if(O.type==="session-lifecycle"){s=O.payload,L(P,O.payload);return}if(O.type==="connection"){if(X)X={...X,connection:O.payload.connection};L(H,O.payload.connection);return}if(O.type==="settings"){if(X)X={...X,settings:O.payload.settings};L(U,O.payload.settings);return}if(O.type==="item"){if(X)X={...X,item:O.payload.item};L(w,O.payload.item);return}if(O.type==="status-control-event"){L(S_,O.payload);return}if(O.type==="popover-closed"){L(l,O.payload);return}if(O.type==="action"){let M=(Q)=>{if(!o)d({channel:N,v:W,type:"action-result",id:O.id,payload:Q})},Z=E_;if(!Z){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Z(O.payload)).then(()=>M({ok:!0}),(Q)=>{let B=(Q instanceof Error?Q.message:String(Q)).trim();M({ok:!1,error:(B||"Action failed.").slice(0,$_)})});return}if(O.type==="file-open"){let M=O.payload;if(G_&&GS(G_,M))return;G_=M,L(r,O.payload);return}if(O.type==="file-saved"){L(Q_,O.payload.version);return}if(O.type==="file-snapshot"){let M=(B)=>{if(!o)d({channel:N,v:W,type:"file-snapshot-result",id:O.id,payload:B})},Z=(B)=>M({error:(B.trim()||"Could not read the edited file.").slice(0,$_)}),Q=p;if(!Q){Z("This extension does not edit files.");return}Promise.resolve().then(()=>Q(O.payload.purpose)).then((B)=>{if(MT(B)>b_){Z(`The file is over ${b_} ${"bytes"in B?"bytes":"characters"}.`);return}if(B.version.length>q_){Z(`The snapshot version is over ${q_} characters.`);return}M({snapshot:"bytes"in B?{bytes:B.bytes,version:B.version}:{content:B.content,version:B.version}})},(B)=>Z(B instanceof Error?B.message:String(B)));return}if(O.type==="resolve"){let M=(Q)=>{d({channel:N,v:W,type:"resolve-result",id:O.id,payload:Q})},Z=O_;if(!Z){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Z(O.payload)).then((Q)=>M({item:Q?I_(Q):null}),(Q)=>{let B=(Q instanceof Error?Q.message:String(Q)).trim();M({error:(B||"Command failed.").slice(0,$_)})});return}let A=a.get(O.id);if(!A)return;if(clearTimeout(A.timer),a.delete(O.id),O.ok){A.resolve(O.payload);return}A.reject(new R(O.code,O.error))};S.addEventListener("message",nT),d({channel:N,v:W,type:"hello"});let x=(T,O=G)=>{if(o||S.parent===S)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,M)=>{let Z=setTimeout(()=>{a.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},O);a.set(T.id,{resolve:A,reject:M,timer:Z}),d(T)})},F=(T)=>x(T).then(()=>{return}),J={channel:N,v:W},_T=(T)=>{if(!o&&S.parent!==S)d(T)},aT=()=>_T({...J,type:"file-save"}),iT=(T)=>{if(!wS(T)||!SO(T))return;T.preventDefault(),aT()},oT=(T)=>{if(!wS(T)||T.key!=="Escape"||X?.surface!=="popover"||!X.popover)return;T.preventDefault(),eT(X.popover.id,"escape").catch(()=>{return})},j_=()=>{let T=X?.surface==="popover"?X.popover:void 0;if(!T)return;let O=k_||z_;if(vT===O)return;vT=O,_S(T.id,O).catch(()=>{return})},f_=()=>{if(X?.surface!=="popover"||k_)return;k_=!0,j_()},rT=(T)=>{if(X?.surface!=="popover"||T.relatedTarget!==null||!k_)return;k_=!1,j_()},sT=()=>{if(X?.surface!=="popover"||z_)return;z_=!0,j_()},tT=()=>{if(X?.surface!=="popover"||!z_)return;z_=!1,j_()},i=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new R("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},TT=async(T)=>{if(T.kind!=="projects")i(T.projectId);let O=await x({...J,type:"workspace-read",id:I(C),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return O},ST=async(T,O)=>{if(T.kind!=="projects")i(T.projectId);let A=I(C);D_.set(A,O);try{await F({...J,type:"workspace-subscribe",id:I(C),payload:{subscriptionId:A,query:T}})}catch(M){if(D_.delete(A),!o)d({...J,type:"workspace-unsubscribe",id:I(C),payload:{subscriptionId:A}});throw M}return()=>{if(!D_.delete(A)||o)return;d({...J,type:"workspace-unsubscribe",id:I(C),payload:{subscriptionId:A}})}},aS=async(T,O)=>{if(T.kind==="session")i(T.sessionId);if(T.kind==="project")i(T.projectId);let A=I(C);X_.set(A,O);try{await F({...J,type:"shells-subscribe",id:I(C),payload:{subscriptionId:A,scope:T}})}catch(M){if(X_.delete(A),!o)d({...J,type:"shells-unsubscribe",id:I(C),payload:{subscriptionId:A}});throw M}return()=>{if(!X_.delete(A)||o)return;d({...J,type:"shells-unsubscribe",id:I(C),payload:{subscriptionId:A}})}},H_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>ET))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!C_(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>UT)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&X?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let O=await x({...J,type:"storage",id:I(C),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return O},eT=(T,O)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):F({...J,type:"popover-close",id:I(C),payload:O?{id:T,reason:O}:{id:T}}),_S=(T,O)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):F({...J,type:"popover-anchor",id:I(C),payload:{id:T,active:O}});return S.addEventListener("keydown",oT,!0),S.addEventListener("pointerover",f_),S.addEventListener("pointermove",f_),S.addEventListener("pointerout",rT),S.addEventListener("focus",sT),S.addEventListener("blur",tT),{onAction:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},listProjects:async()=>{let T=await TT({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await TT({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await TT({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>ST({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>ST({kind:"worktrees",projectId:T},(A)=>{if(A.kind==="worktrees")O(A)}),onSessions:(T,O)=>ST({kind:"sessions",projectId:T},(A)=>{if(A.kind==="sessions")O(A)}),onRunningShells:(T,O)=>aS(T,O),readShellOutput:async(T,O)=>{i(T,w_);let A=O?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=O?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>x_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${x_}.`);let Q=await x({...J,type:"shell-output",id:I(C),payload:{shellId:T,cursor:A,tailBytes:M}});if(!Q||typeof Q.output!=="string"||!Number.isFinite(Q.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return Q},stopShell:async(T)=>{if(i(T,w_),(await x({...J,type:"shell-stop",id:I(C),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{i(T),await F({...J,type:"open-session",id:I(C),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let A=l_(O),M={op:"get",key:T};if(A)M.scope=A;let Z=await H_(M);return Z.op==="get"&&Z.found?Z.value:void 0},set:async(T,O,A)=>{let M=l_(A),Z={op:"set",key:T,value:O};if(M)Z.scope=M;await H_(Z)},delete:async(T,O)=>{let A=l_(O),M={op:"delete",key:T};if(A)M.scope=A;await H_(M)},keys:async(T)=>{let O=l_(T),A={op:"keys"};if(O)A.scope=O;let M=await H_(A);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(D.add(T),X)T(X);return()=>{D.delete(T)}},onDirectory:(T)=>{if(V.add(T),X)T(X.directory);return()=>{V.delete(T)}},onSession:(T)=>{if(f.add(T),X)T(X.session);return()=>{f.delete(T)}},onSessionLifecycle:(T)=>{if(P.add(T),s)T(s);return()=>{P.delete(T)}},onConnection:(T)=>{if(H.add(T),X)T(X.connection);return()=>{H.delete(T)}},onSettings:(T)=>{if(U.add(T),X)T(X.settings);return()=>{U.delete(T)}},onItem:(T)=>{if(w.add(T),X)T(X.item);return()=>{w.delete(T)}},onStatusControl:(T)=>{return S_.add(T),()=>{S_.delete(T)}},onPopoverClosed:(T)=>{return l.add(T),()=>{l.delete(T)}},setStatusControls:(T)=>{if(X?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!AS(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return F({...J,type:"status-controls",id:I(C),payload:{controls:T}})},openPopover:(T)=>{if(X?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!GT(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return F({...J,type:"popover-open",id:I(C),payload:T})},closePopover:eT,setPopoverAnchorActive:_S,onResolve:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>y_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${y_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>h_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${h_} characters.`));return F({channel:N,v:W,type:"toast",id:I(C),payload:{...T,message:O}})},openUrl:(T)=>F({channel:N,v:W,type:"open-url",id:I(C),payload:{url:T}}),openCommit:(T)=>IT(T)?F({channel:N,v:W,type:"open-commit",id:I(C),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>F({channel:N,v:W,type:"open-surface",id:I(C),payload:{surfaceId:T}}),writeClipboard:(T)=>F({channel:N,v:W,type:"clipboard-write",id:I(C),payload:{text:T}}),compose:(T)=>F({channel:N,v:W,type:"compose",id:I(C),payload:T}),attach:(T)=>F({channel:N,v:W,type:"attach",id:I(C),payload:I_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)i(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")i(O.directory);else{if(O.name!==void 0)i(O.name,200);if(O.baseBranch!==void 0)i(O.baseBranch,200)}let A=await x({channel:N,v:W,type:"start-session",id:I(C),payload:PT(T)},_.requestTimeoutMs??180000);if(!XT(A))throw new R("HOST_REJECTED","Host did not return a session.");return A},prompt:(T)=>x({channel:N,v:W,type:"prompt",id:I(C),payload:YT(T)}).then((O)=>{if(!CT(O))throw new R("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>F({channel:N,v:W,type:"session-link",id:I(C),payload:I_(T)}),close:()=>F({channel:N,v:W,type:"close",id:I(C)}),oauthStart:()=>F({channel:N,v:W,type:"oauth-start",id:I(C)}),oauthDisconnect:()=>F({channel:N,v:W,type:"oauth-disconnect",id:I(C)}),request:(T)=>(d_(T.path)?x({channel:N,v:W,type:"request",id:I(C),payload:T}):xS()).then((O)=>{if(!v_(O))throw new R("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(d_(T.path)?x({channel:N,v:W,type:"service-request",id:I(C),payload:T}):xS()).then((O)=>{if(!v_(O))throw new R("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>x({channel:N,v:W,type:"service-status",id:I(C)}).then((T)=>{if(!kT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(V_(T)?x({channel:N,v:W,type:"file-read",id:I(C),payload:{path:T}}):u_()).then((O)=>{if(!zT(O))throw new R("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!V_(T))return u_();if(O.length>m_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${m_} characters.`));return x({channel:N,v:W,type:"file-write",id:I(C),payload:{path:T,content:O}}).then((A)=>{if(!$T(A))throw new R("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(T)=>(V_(T)?x({channel:N,v:W,type:"file-list",id:I(C),payload:{path:T}}):u_()).then((O)=>{if(!LT(O))throw new R("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(V_(T)?x({channel:N,v:W,type:"file-stat",id:I(C),payload:{path:T}}):u_()).then((O)=>{if(!FT(O))throw new R("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),A=T.system?.trim();if(O.length===0||O.length>c_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${c_} characters.`));if(A!==void 0&&(A.length===0||A.length>p_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${p_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(NT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let Z={prompt:O};if(A!==void 0)Z.system=A;if(M!==void 0)Z.maxOutputTokens=M;return x({channel:N,v:W,type:"generate",id:I(C),payload:Z},_.requestTimeoutMs??WT).then((Q)=>{if(!JT(Q))throw new R("HOST_REJECTED","Host did not return generated text.");return Q})},onLateGenerateResult:(T)=>{n.add(T);for(let O of y.splice(0))L([T],O);return lT(),()=>{n.delete(T)}},setBadge:(T)=>F({channel:N,v:W,type:"badge",id:I(C),payload:{count:QT(T)}}),setHeight:(T)=>F({channel:N,v:W,type:"resize",id:I(C),payload:{height:ZT(T)}}),onFileOpen:(T)=>{if(r.add(T),!Z_)Z_=!0,S.addEventListener("keydown",iT,!0);if(G_)T(G_);return()=>{r.delete(T)}},onFileSnapshot:(T)=>{return p=T,()=>{if(p===T)p=null}},onFileSaved:(T)=>{return Q_.add(T),()=>{Q_.delete(T)}},reportFileChange:(T)=>_T({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:aT,reportFileUnsupported:()=>_T({...J,type:"file-unsupported"}),dispose:()=>{for(let T of D_.keys())d({...J,type:"workspace-unsubscribe",id:I(C),payload:{subscriptionId:T}});D_.clear();for(let T of X_.keys())d({...J,type:"shells-unsubscribe",id:I(C),payload:{subscriptionId:T}});if(X_.clear(),o=!0,O_=null,E_=null,p=null,r.clear(),Q_.clear(),Z_)S.removeEventListener("keydown",iT,!0);S.removeEventListener("message",nT),S.removeEventListener("keydown",oT,!0),S.removeEventListener("pointerover",f_),S.removeEventListener("pointermove",f_),S.removeEventListener("pointerout",rT),S.removeEventListener("focus",sT),S.removeEventListener("blur",tT);for(let T of a.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));a.clear(),D.clear(),V.clear(),f.clear(),P.clear(),H.clear(),U.clear(),w.clear(),S_.clear(),l.clear(),n.clear(),y.length=0}}};var bS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var sO=new Set(bS);var qS=["none","agent","user"];var eO=new Set(qS);var OO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],EO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],yS=(_,S)=>{S.style.colorScheme=_.mode;for(let[E,G]of OO)S.style.setProperty(E,_.tokens[G]);for(let[E,G,D]of EO){let V=_.tokens[D]??"";S.style.setProperty(E,V),S.style.setProperty(G,V)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},jT=(_,S)=>{if(yS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var UO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},k=(_,S)=>`var(--${_}, var(--oc-${UO[_]}, ${S}))`,e=k("surface-background","transparent"),a_=k("surface-elevated","transparent"),N_=k("surface-elevated-foreground","inherit"),v=k("surface-foreground","inherit"),z=k("surface-muted-foreground","gray"),AO=k("surface-muted","transparent"),U_=k("interactive-border","currentColor"),h=k("interactive-hover","transparent"),A_=k("interactive-active","transparent"),fT=k("interactive-selection","transparent"),HT=k("interactive-selection-foreground","inherit"),t=k("primary","currentColor"),wT=k("primary-text","inherit"),xT=k("error-text","inherit"),MO=k("font-sans","inherit"),bT=k("font-mono","monospace"),cS=k("radius","9px"),qT=`calc(${cS} - 2px)`,hS=`calc(${cS} - 4px)`,$=(_,S,E="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${E})`,gS=`background-image: linear-gradient(${h}, ${h});`,yT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,hT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",mS="box-shadow: var(--oc-sdk-lit);",gT=`inset 0 0.5px 0 0 ${$(v,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,RO=`
:root {
  --oc-sdk-edge: ${$(v,16)};
  --oc-sdk-field-bg: ${a_};
  --oc-sdk-raised-bg: ${e};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(v,14)};
  --oc-sdk-field-bg: ${$(e,50,a_)};
  --oc-sdk-raised-bg: ${a_};
  --oc-sdk-field-lift: ${gT};
  --oc-sdk-raised-lift: ${gT};
  --oc-sdk-lit: ${gT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,n_=(_)=>{let S=k(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${k(`${_}-text`,"inherit")}; }`},GO=`
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
`,pS=`${RO}
.oc-sdk { color: ${v}; font-family: ${MO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${gS} }
.oc-sdk-mono { font-family: ${bT}; }
.oc-sdk-muted { color: ${z}; }
${n_("success")}${n_("warning")}${n_("error")}${n_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${wT}; }

.oc-sdk-btn { border-radius: ${qT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${hS}; }
.oc-sdk-btn[data-variant="default"] { color: ${wT}; background: ${$(t,10,e)}; border-color: ${$(t,12)}; ${mS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(t,16,e)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(t,22,e)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${AO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${N_}; ${hT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${h}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${k("status-error","red")}; color: ${xT}; background: ${$("var(--oc-sdk-tone)",7,e)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${mS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,e)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,e)}; box-shadow: none; }

.oc-sdk-field-note { color: ${z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${xT}; }
.oc-sdk-input { border-radius: ${qT}; background: var(--oc-sdk-field-bg); color: ${N_}; ${yT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${yT($(v,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${yT(k("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${bT}; }

.oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${t}; }
.oc-sdk-search-clear { border-radius: ${hS}; color: ${z}; }
.oc-sdk-search-clear:hover { background: ${h}; color: ${v}; }

.oc-sdk-trigger { border-radius: ${qT}; background: var(--oc-sdk-raised-bg); color: ${N_}; ${hT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${h}, ${h}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${z}; }
.oc-sdk-trigger-chevron { color: ${z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${N_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${a_}; background-clip: padding-box; color: ${N_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${h}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fT}; color: ${HT}; }
.oc-sdk-option-check { color: ${v}; }
.oc-sdk-option[data-destructive="true"] { color: ${xT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(k("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${z}; }
.oc-sdk-popup-empty { color: ${z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${U_}; border-radius: 4px; color: ${v}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(v,60,U_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${U_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${e}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${t}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${gS} }
.oc-sdk-check-desc { color: ${z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(v,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${v}; }
.oc-sdk-tab[aria-selected="true"] { color: ${HT}; background: ${fT}; border-color: ${U_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${N_}; background: var(--oc-sdk-raised-bg); ${hT} }
.oc-sdk-tab-count { color: ${z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(v,6)}; color: ${z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${h}; }
.oc-sdk-row[aria-selected="true"] { background: ${fT}; color: ${HT}; }
.oc-sdk-row-lead { font-family: ${bT}; color: ${z}; }
.oc-sdk-row-sub { color: ${z}; }
.oc-sdk-row-meta { color: ${z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${z}; }

.oc-sdk-empty-body { color: ${z}; }

.oc-sdk-spinner { color: ${z}; }
.oc-sdk-spinner-ring { border-color: ${U_}; border-top-color: ${t}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${z}; }

.oc-sdk-separator { color: ${z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(U_,40)}; }

.oc-sdk-progress-label { color: ${z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(v,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${t}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${k("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${k("success-text","inherit")}; }

.oc-sdk-text a { color: ${wT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(U_,60)}; }
`,b=`
${OT}
${GO}
${pS}`;var Y_=KT(),vS=document.querySelector("#root");if(!vS)throw Error("Missing #root");vS.innerHTML=`
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
`;var K=(_)=>document.querySelector(`#${_}`),T_=K("branch"),q=K("sync"),t_=K("remote"),F_=K("local"),e_=K("msg"),u=K("out"),VO=K("topbar"),NO=K("h-remote"),WO=K("h-local"),PO=K("nongit"),YO=K("commitBox"),J_=K("done"),uS=K("conflict"),dS=K("conflict-list"),QO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),cT="",lS=(_)=>{let S=QO(_);if(S.length===0){cT="";return}let E=S.join(`
`);if(E===cT)return;cT=E,dS.innerHTML="";for(let G of S.slice(0,20)){let D=document.createElement("tr"),V=document.createElement("td");V.className="mono ellipsis",V.textContent=G,D.appendChild(V),dS.appendChild(D)}uS.hidden=!1},pT=(_)=>{PO.hidden=!_,VO.style.display=_?"none":"",q.style.display=_?"none":"",NO.style.display=_?"none":"",t_.style.display=_?"none":"",WO.style.display=_?"none":"",F_.style.display=_?"none":"",YO.style.display=_?"none":""},Y=null,P_=!1,j=(_,S,E)=>Y_.serviceRequest({method:_,path:S,body:E===void 0?void 0:JSON.stringify(E)});var ZO=async(_,S)=>{try{let E=await j("GET",`/branches?dir=${encodeURIComponent(_)}`),G=JSON.parse(E.body);if(!G.ok||!G.branches)return;if(T_.value&&T_.value===S&&T_.options.length>0)return;T_.innerHTML="";for(let D of G.branches){let V=document.createElement("option");if(V.value=D.name,V.textContent=D.name,D.current)V.selected=!0;T_.appendChild(V)}}catch{}},dT=(_)=>{t_.innerHTML="";let S=_.incoming??[];if(S.length===0){t_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let E=document.createElement("table");for(let G of S){let D=document.createElement("tr"),V=document.createElement("td");V.className="mono ellipsis",V.textContent=`${G.sha} ${G.subject}`,V.title=`${G.sha} ${G.subject} · ${G.author} ${G.date}`,D.appendChild(V),E.appendChild(D)}t_.appendChild(E)},c={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},kO=(_,S)=>{if(`${_}${S}`==="??")return c.purple;if(_==="U"||S==="U")return c.red;if(_==="D"||S==="D")return c.red;if(_==="A"||S==="A")return c.green;if(_==="R"||S==="R"||_==="C"||S==="C")return c.blue;if(_==="M"||S==="M")return c.amber;return c.gray},zO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let G="改动";if(_==="A"||S==="A")G="新增";else if(_==="D"||S==="D")G="删除";else if(_==="R"||S==="R")G="重命名";else if(_==="C"||S==="C")G="复制";else if(_==="T"||S==="T")G="类型变更";else if(_==="M"||S==="M")G="修改";return _!==" "&&_!=="?"&&_!=="!"?`${G}·已暂存`:G},nS=(_)=>{F_.innerHTML="";let S=_.files??[];if(S.length===0){let U=document.createElement("div");U.className="empty",U.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',F_.appendChild(U);return}let E=(U)=>U.trim()!==""&&U!=="?"&&U!==" ",G=S.every((U)=>E(U.staged)),D=document.createElement("div");D.className="row";let V=document.createElement("input");V.type="checkbox",V.checked=G,V.title=G?"全不选：取消全部暂存":"全选：暂存全部",V.onchange=async()=>{if(!Y){V.checked=!V.checked;return}if(V.checked){let U=S.filter((w)=>!E(w.staged)).map((w)=>w.path);if(U.length>0)await j("POST","/stage",{dir:Y,paths:U})}else{let U=S.filter((w)=>E(w.staged)).map((w)=>w.path);if(U.length>0)await j("POST","/unstage",{dir:Y,paths:U})}B_()};let f=document.createElement("span");f.className="mut";let P=S.filter((U)=>E(U.staged)).length;f.textContent=`全选 ${P}/${S.length}`,D.append(V,f),F_.appendChild(D);let H=document.createElement("table");for(let U of S){let w=document.createElement("tr"),S_=document.createElement("td");S_.style.width="28px";let l=document.createElement("input");l.type="checkbox",l.checked=U.staged.trim()!==""&&U.staged!=="?"&&U.staged!==" ",l.title=l.checked?"已暂存点取消":"未暂存点暂存",l.onchange=async()=>{if(!Y)return;await j("POST",l.checked?"/stage":"/unstage",{dir:Y,paths:[U.path]}),B_()},S_.appendChild(l);let n=document.createElement("td");n.className="mono ellipsis",n.textContent=U.path,n.title=U.path;let y=document.createElement("td");y.style.width="92px",y.style.minWidth="92px",y.style.textAlign="right",y.style.whiteSpace="nowrap",y.style.fontSize="11px",y.className="mut";let O_=U.binary?`<span style="color:${c.gray}">二进制</span>`:U.add!==void 0?`<span style="color:${c.green}">+${U.add}</span> <span style="color:${c.red}">-${U.del??0}</span> `:"",E_=zO(U.staged,U.unstaged);y.innerHTML=`${O_}<span style="color:${kO(U.staged,U.unstaged)}">${E_}</span>`,y.title=y.textContent??"";let r=document.createElement("td");if(r.style.width="30px",r.style.textAlign="right",!(U.staged==="U"||U.unstaged==="U")){let p=document.createElement("button");p.textContent="↩",p.title="还原：丢弃该文件本地改动",p.style.padding="2px 7px",p.onclick=async()=>{if(!Y)return;if((U.staged==="?"||U.staged==="A")&&!confirm(`确定丢弃 ${U.path} 的本地内容吗？`))return;p.disabled=!0;let Z_=await j("POST","/restore",{dir:Y,paths:[U.path],confirmed:!0}),a=JSON.parse(Z_.body);if(!a.ok&&a.error==="need-confirm"){if(confirm(`确定删除未跟踪的 ${U.path} 吗？`))await j("POST","/restore",{dir:Y,paths:[U.path],confirmed:!0})}else if(!a.ok)u.textContent=a.error||"还原失败";p.disabled=!1,B_()},r.appendChild(p)}w.append(S_,n,y,r),H.appendChild(w)}F_.appendChild(H)},$O=(_,S)=>{ZO(S,_.branch??"")},LO=(_)=>{let S=_.ahead??0,E=_.behind??0;if(E>0&&S>0)q.textContent=`远程 ${E} 个新，本地超前 ${S}`,q.style.color=c.amber;else if(E>0)q.textContent=`远程有 ${E} 个新提交，可下载`,q.style.color=c.amber;else if(S>0)q.textContent=`本地超前 ${S}可推送`,q.style.color=c.blue;else q.textContent="已是最新",q.style.color=c.green;Y_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},K_=async()=>{if(!Y||P_)return;P_=!0;let _=Y;q.textContent="同步中…";try{await j("POST","/fetch",{dir:_}).catch(()=>{return});let S=await j("GET",`/status?dir=${encodeURIComponent(_)}`),E=JSON.parse(S.body);if(!E.ok||E.branch===void 0){pT(!0);return}pT(!1),LO(E),$O(E,_),dT(E),nS(E),lS(E)}catch(S){q.textContent=S instanceof R?`${S.code}`:"同步失败"}finally{P_=!1}},B_=async()=>{if(!Y||P_||document.hidden)return;P_=!0;try{let _=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body);if(!S.ok)return;nS(S),lS(S),Y_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{P_=!1}};K("btn-refresh").onclick=()=>void K_();K("btn-pull").onclick=async()=>{if(!Y)return;q.textContent="下载中…";try{await j("POST","/pull",{dir:Y})}catch{}K_()};T_.onchange=async()=>{if(!Y||!T_.value)return;q.textContent=`切换到 ${T_.value}…`;let _=await j("POST","/checkout",{dir:Y,branch:T_.value}),S=JSON.parse(_.body);if(!S.ok)q.textContent=S.output||S.error||"切换失败";K_()};var M_=K("btn-commit");M_.onclick=async()=>{if(!Y||M_.disabled)return;let _=e_.value.trim();if(!_){u.textContent="先写提交信息";return}M_.disabled=!0;let S=M_.textContent;M_.innerHTML='<span class="spin">↻</span> 提交中…';try{await j("POST","/fetch",{dir:Y}).catch(()=>{return});let E=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),G=JSON.parse(E.body),D=G.behind??0;if(D>0){u.textContent=`远程有 ${D} 个新提交，先点下载合并后再提交`,q.textContent=`远程有 ${D} 个新提交可下载`,dT(G);return}u.textContent="提交…";let V=await j("POST","/commit",{dir:Y,message:_,push:!0}),f=JSON.parse(V.body);if(!f.ok){u.textContent=f.error||"提交失败";return}u.textContent="跟远程核验中…",await j("POST","/fetch",{dir:Y}).catch(()=>{return});let P=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),H=JSON.parse(P.body),U=H.ahead??0;if(U>0){u.textContent=`已提交但远程核验本地仍超前 ${U}推送可能没完全成功请检查`,dT(H);return}e_.value="",u.textContent="已提交并推送远程核验一致",FO()}catch(E){u.textContent=E instanceof R?`${E.code}`:"提交失败"}finally{M_.disabled=!1,M_.textContent=S,K_()}};K("btn-ai").onclick=async()=>{if(!Y)return;u.textContent="AI 生成中…";try{let _=await j("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body),E=(P)=>P.trim()!==""&&P!=="?"&&P!==" ",G=(S.files??[]).filter((P)=>E(P.staged));if(G.length===0){u.textContent="先勾选要提交的文件";return}let D="";for(let P of G.slice(0,3)){try{let H=await j("GET",`/diff?dir=${encodeURIComponent(Y)}&file=${encodeURIComponent(P.path)}&staged=1`),U=JSON.parse(H.body);if(U.ok&&U.diff)D+=`
--- ${P.path} ---
${U.diff.slice(0,2000)}`}catch{}if(D.length>6000)break}let V=G.map((P)=>`${P.staged}${P.unstaged} ${P.path}`).join(`
`).slice(0,1000),{text:f}=await Y_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${V}${D.slice(0,6000)}`,maxOutputTokens:100});e_.value=f.trim(),u.textContent=`已按 ${G.length} 个勾选文件生成`}catch{u.textContent="无小模型或未授权 model"}};var R_=null;K("btn-again").onclick=()=>{if(R_)clearTimeout(R_),R_=null;J_.hidden=!0};var FO=()=>{if(R_)clearTimeout(R_);J_.hidden=!1,R_=setTimeout(()=>{J_.hidden=!0,R_=null},2200),J_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let E=document.createElement("div");E.className="confetti",E.style.left=`${4+Math.random()*92}%`,E.style.background=_[S%_.length],E.style.animationDelay=`${Math.random()*0.5}s`,J_.appendChild(E)}};K("btn-conflict-ok").onclick=()=>{uS.hidden=!0};Y_.onResolve(async({args:_})=>{if(_.trim())e_.value=_.trim();return null});setInterval(()=>void B_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)B_()});Y_.onReady((_)=>{jT(_,document.documentElement);let S=_.directory??null;if(S!==Y){if(Y=S,!Y){pT(!0);return}K_()}});})();
