(()=>{var W="openchamber.sdk",P=1;var ET=`
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
`;function US(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let E=new WeakMap;_.addEventListener("scroll",(R)=>{let A=R.target===_?S:R.target;if(!(A instanceof Element))return;if(!A.hasAttribute("data-oc-scrolling"))A.setAttribute("data-oc-scrolling","");let I=E.get(A);if(I!==void 0)clearTimeout(I);E.set(A,setTimeout(()=>{E.delete(A),A.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var tS=`(${US.toString()})(document);`;var UT=128,AT=65536;var x_=128;var b_=65536;var GS=/^[a-z][a-z0-9-]{0,39}$/;var AS=(_)=>Object(_)===_&&!Array.isArray(_),MT=(_,S)=>Object.keys(_).every((E)=>S.includes(E)),MS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,RS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,DS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let E of _){if(!AS(E)||!GS.test(E.id)||!MS(E.label))return!1;if(E.disabled!==void 0&&E.disabled!==!0&&E.disabled!==!1)return!1;if(S.has(E.id))return!1;if(S.add(E.id),E.kind==="button"){if(!MT(E,["kind","id","label","disabled"]))return!1;continue}if(E.kind!=="select"||!MT(E,["kind","id","label","value","options","disabled"]))return!1;if(!RS(E.value)||!Array.isArray(E.options)||E.options.length<1||E.options.length>16)return!1;let R=new Set;for(let A of E.options){if(!AS(A)||!MT(A,["value","label"])||!RS(A.value)||!MS(A.label)||R.has(A.value))return!1;R.add(A.value)}if(!R.has(E.value))return!1}return!0};var XS=["{id}","{segment}","{segments+}"];var cO=new Set(XS);var IS=["turn-finished","turn-failed","permission-asked","question-asked"];var dO=new Set(IS);var q_=20000000,y_=256;var RT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,CS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let E=0;E<_.bytes.byteLength;E+=1)if(_.bytes[E]!==S.bytes[E])return!1;return!0};var VS=/^[A-Za-z0-9_-]{1,80}$/;var NS=["left","right","top","bottom"];var WS=(_,S=0,E={remaining:16000})=>{if(--E.remaining<0||S>=32)return!1;if(_===null)return!0;let R=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let A of R)if(!WS(A,S+1,E))return!1;return!0},GT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(GT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(GT)}return String(_)===_||Number.isFinite(_)},DT=(_)=>{try{if(String(_.id)!==_.id||!VS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!NS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!WS(_.data)||!GT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var YS=["file","directory","other","missing"],IT=(_)=>Boolean(_&&"sessionId"in _),CT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var QS=/^[0-9a-f]{7,64}$/i,VT=(_)=>QS.test(_),h_=500,g_=32000,ZS=16000,zS=128,kS=200,FS=2000,$S=16000,JS=80,LS=200,BS=16000;var KS=2000;var NT=20000,m_=1024,c_=2000000;var p_=64000,d_=8000,WT=4000;var PT=960000;var jS=999,fS=1e4,F_=500,HS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],wS=["stopped","starting","ready","failed"],_O=new Set(HS),xS=(_)=>_O.has(_),bS=(_)=>_&&xS(_)?_:"HOST_REJECTED",I_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(I_);if(Object(_)===_)return Object.values(_).every(I_);return!1},qS=(_)=>I_(_)&&JSON.stringify(_).length<=BS,PS=(_)=>_?.trim().slice(0,LS)??"",C_=(_)=>{let S=_.id.trim().slice(0,zS),E=_.title.trim().slice(0,kS),R=_.url.trim().slice(0,FS),A=_.text?.trim().slice(0,$S),I=_.author?.trim().slice(0,JS),Y=_.kind==="pull"?"pull":"issue",N={providerId:_.providerId.trim(),id:S,title:E||S,url:R,kind:Y};if(A)N.text=A;if(I)N.author=I;if(Y==="pull"){let K=PS(_.branches?.head),U=PS(_.branches?.base);if(K&&U)N.branches={head:K,base:U}}if(qS(_.data))N.data=_.data;return N},YT=(_)=>{let S=C_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},QT=(_)=>{let S={text:_.text.trim().slice(0,ZS)};if(_.send)S.send=!0;return S},ZT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(jS,Math.max(0,Math.round(_)))},zT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(fS,Math.max(0,Math.ceil(_)))};var V_=(_)=>_.length>0&&_.length<=m_&&!_.includes("\x00")&&!_.includes("\\");var v_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>KS)return!1;return!_.split("/").some((E)=>E==="."||E==="..")},TO=new Set(wS),kT=(_)=>Boolean(_&&"status"in _&&TO.has(String(_.status))&&!("body"in _)),u_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),FT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),$T=(_)=>Boolean(_&&"written"in _&&_.written===!0),JT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),SO=new Set(YS),LT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&SO.has(String(_.kind))&&Number.isFinite(_.size)),BT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),OO=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),EO=(_)=>Object(_)===_?_:null,XT=(_)=>String(_)===_&&_.length>0,UO=(_)=>{if(!XT(_.id))return null;if(_.ok===!0){let S={channel:W,v:P,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&XT(_.error))return{channel:W,v:P,type:"result",id:_.id,ok:!1,error:_.error,code:bS(XT(_.code)?_.code:void 0)};return null},KT=(_)=>{let S=EO(_);if(!S||S.channel!==W||S.v!==P)return null;if(S.type==="result")return UO(S);if(!OO.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var yS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),AO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class D extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var hS=()=>Promise.reject(new D("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),l_=()=>Promise.reject(new D("BAD_PATH",`File path must be 1 to ${m_} characters without NUL or backslash.`)),n_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new D("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},V=(_)=>{return _.value+=1,`oc-${_.value}`},jT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new D("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let E=_.acceptSource??((T)=>T===S.parent),R=_.requestTimeoutMs??NT,A=new Set,I=new Set,Y=new Set,N=new Set,K=new Set,U=new Set,L=new Set,S_=new Set,p=new Set,n=new Set,h=[],O_=null,E_=null,r=new Set,Q_=new Set,d=null,G_=null,Z_=!1,a=new Map,D_=new Map,X_=new Map,o=!1,C={value:0},X=null,s=null,z_=!1,k_=!1,aT=null,iT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},v=(T)=>{S.parent.postMessage(T,"*")},oT=()=>{if(o||S.parent===S||n.size===0||X?.features?.lateGenerateResults!==!0)return;v({channel:W,v:P,type:"generate-late-listen"})},B=(T,O)=>{for(let M of T)try{M(O)}catch(G){console.error(G)}},rT=(T)=>{if(!(T instanceof MessageEvent))return;if(!E(T.source))return;let O=KT(T.data);if(!O)return;if(O.type==="workspace"){let G=D_.get(O.payload.subscriptionId);if(G)B([G],O.payload.snapshot);return}if(O.type==="shells"){let G=X_.get(O.payload.subscriptionId);if(G)B([G],O.payload.snapshot);return}if(O.type==="ready"){if(X=O.payload,s=iT(O.payload.session),B(A,O.payload),B(I,O.payload.directory),B(Y,O.payload.session),s)B(N,s);B(K,O.payload.connection),B(U,O.payload.settings),B(L,O.payload.item),oT();return}if(O.type==="generate-late"){if(n.size===0)h.push(O.payload);else B(n,O.payload);return}if(O.type==="directory"){if(X)X={...X,directory:O.payload.directory};B(I,O.payload.directory);return}if(O.type==="session"){if(X)X={...X,session:O.payload.session};if(!O.payload.session)s=null;else if(s?.sessionId!==O.payload.session.id)s=iT(O.payload.session);B(Y,O.payload.session);return}if(O.type==="session-lifecycle"){s=O.payload,B(N,O.payload);return}if(O.type==="connection"){if(X)X={...X,connection:O.payload.connection};B(K,O.payload.connection);return}if(O.type==="settings"){if(X)X={...X,settings:O.payload.settings};B(U,O.payload.settings);return}if(O.type==="item"){if(X)X={...X,item:O.payload.item};B(L,O.payload.item);return}if(O.type==="status-control-event"){B(S_,O.payload);return}if(O.type==="popover-closed"){B(p,O.payload);return}if(O.type==="action"){let G=(Z)=>{if(!o)v({channel:W,v:P,type:"action-result",id:O.id,payload:Z})},z=E_;if(!z){G({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>z(O.payload)).then(()=>G({ok:!0}),(Z)=>{let H=(Z instanceof Error?Z.message:String(Z)).trim();G({ok:!1,error:(H||"Action failed.").slice(0,F_)})});return}if(O.type==="file-open"){let G=O.payload;if(G_&&CS(G_,G))return;G_=G,B(r,O.payload);return}if(O.type==="file-saved"){B(Q_,O.payload.version);return}if(O.type==="file-snapshot"){let G=(H)=>{if(!o)v({channel:W,v:P,type:"file-snapshot-result",id:O.id,payload:H})},z=(H)=>G({error:(H.trim()||"Could not read the edited file.").slice(0,F_)}),Z=d;if(!Z){z("This extension does not edit files.");return}Promise.resolve().then(()=>Z(O.payload.purpose)).then((H)=>{if(RT(H)>q_){z(`The file is over ${q_} ${"bytes"in H?"bytes":"characters"}.`);return}if(H.version.length>y_){z(`The snapshot version is over ${y_} characters.`);return}G({snapshot:"bytes"in H?{bytes:H.bytes,version:H.version}:{content:H.content,version:H.version}})},(H)=>z(H instanceof Error?H.message:String(H)));return}if(O.type==="resolve"){let G=(Z)=>{v({channel:W,v:P,type:"resolve-result",id:O.id,payload:Z})},z=O_;if(!z){G({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>z(O.payload)).then((Z)=>G({item:Z?C_(Z):null}),(Z)=>{let H=(Z instanceof Error?Z.message:String(Z)).trim();G({error:(H||"Command failed.").slice(0,F_)})});return}let M=a.get(O.id);if(!M)return;if(clearTimeout(M.timer),a.delete(O.id),O.ok){M.resolve(O.payload);return}M.reject(new D(O.code,O.error))};S.addEventListener("message",rT),v({channel:W,v:P,type:"hello"});let b=(T,O=R)=>{if(o||S.parent===S)return Promise.reject(new D("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((M,G)=>{let z=setTimeout(()=>{a.delete(T.id),G(new D("HOST_TIMEOUT","Host did not answer in time."))},O);a.set(T.id,{resolve:M,reject:G,timer:z}),v(T)})},j=(T)=>b(T).then(()=>{return}),f={channel:W,v:P},TT=(T)=>{if(!o&&S.parent!==S)v(T)},sT=()=>TT({...f,type:"file-save"}),tT=(T)=>{if(!yS(T)||!AO(T))return;T.preventDefault(),sT()},eT=(T)=>{if(!yS(T)||T.key!=="Escape"||X?.surface!=="popover"||!X.popover)return;T.preventDefault(),OS(X.popover.id,"escape").catch(()=>{return})},f_=()=>{let T=X?.surface==="popover"?X.popover:void 0;if(!T)return;let O=z_||k_;if(aT===O)return;aT=O,ES(T.id,O).catch(()=>{return})},H_=()=>{if(X?.surface!=="popover"||z_)return;z_=!0,f_()},_S=(T)=>{if(X?.surface!=="popover"||T.relatedTarget!==null||!z_)return;z_=!1,f_()},TS=()=>{if(X?.surface!=="popover"||k_)return;k_=!0,f_()},SS=()=>{if(X?.surface!=="popover"||!k_)return;k_=!1,f_()},i=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new D("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},ST=async(T)=>{if(T.kind!=="projects")i(T.projectId);let O=await b({...f,type:"workspace-read",id:V(C),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new D("HOST_REJECTED","Host did not return workspace data.");return O},OT=async(T,O)=>{if(T.kind!=="projects")i(T.projectId);let M=V(C);D_.set(M,O);try{await j({...f,type:"workspace-subscribe",id:V(C),payload:{subscriptionId:M,query:T}})}catch(G){if(D_.delete(M),!o)v({...f,type:"workspace-unsubscribe",id:V(C),payload:{subscriptionId:M}});throw G}return()=>{if(!D_.delete(M)||o)return;v({...f,type:"workspace-unsubscribe",id:V(C),payload:{subscriptionId:M}})}},sS=async(T,O)=>{if(T.kind==="session")i(T.sessionId);if(T.kind==="project")i(T.projectId);let M=V(C);X_.set(M,O);try{await j({...f,type:"shells-subscribe",id:V(C),payload:{subscriptionId:M,scope:T}})}catch(G){if(X_.delete(M),!o)v({...f,type:"shells-unsubscribe",id:V(C),payload:{subscriptionId:M}});throw G}return()=>{if(!X_.delete(M)||o)return;v({...f,type:"shells-unsubscribe",id:V(C),payload:{subscriptionId:M}})}},w_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>UT))throw new D("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!I_(T.value))throw new D("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>AT)throw new D("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&X?.features?.deviceStorage!==!0)throw new D("UNSUPPORTED","This host does not support device storage.");let O=await b({...f,type:"storage",id:V(C),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new D("HOST_REJECTED","Host did not return storage data.");return O},OS=(T,O)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new D("UNSUPPORTED","This host does not support popovers.")):j({...f,type:"popover-close",id:V(C),payload:O?{id:T,reason:O}:{id:T}}),ES=(T,O)=>X?.features?.popovers!==!0&&!(X?.surface==="popover"&&X.popover?.id===T)?Promise.reject(new D("UNSUPPORTED","This host does not support popovers.")):j({...f,type:"popover-anchor",id:V(C),payload:{id:T,active:O}});return S.addEventListener("keydown",eT,!0),S.addEventListener("pointerover",H_),S.addEventListener("pointermove",H_),S.addEventListener("pointerout",_S),S.addEventListener("focus",TS),S.addEventListener("blur",SS),{onAction:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},listProjects:async()=>{let T=await ST({kind:"projects"});if(T.kind!=="projects")throw new D("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await ST({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new D("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await ST({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new D("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>OT({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>OT({kind:"worktrees",projectId:T},(M)=>{if(M.kind==="worktrees")O(M)}),onSessions:(T,O)=>OT({kind:"sessions",projectId:T},(M)=>{if(M.kind==="sessions")O(M)}),onRunningShells:(T,O)=>sS(T,O),readShellOutput:async(T,O)=>{i(T,x_);let M=O?.cursor;if(M!==void 0&&(!Number.isInteger(M)||M<0))throw new D("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let G=O?.tailBytes;if(G!==void 0&&(!Number.isInteger(G)||G<1||G>b_))throw new D("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${b_}.`);let Z=await b({...f,type:"shell-output",id:V(C),payload:{shellId:T,cursor:M,tailBytes:G}});if(!Z||typeof Z.output!=="string"||!Number.isFinite(Z.cursor))throw new D("HOST_REJECTED","Host did not return shell output.");return Z},stopShell:async(T)=>{if(i(T,x_),(await b({...f,type:"shell-stop",id:V(C),payload:{shellId:T}}))?.stopped!==!0)throw new D("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{i(T),await j({...f,type:"open-session",id:V(C),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let M=n_(O),G={op:"get",key:T};if(M)G.scope=M;let z=await w_(G);return z.op==="get"&&z.found?z.value:void 0},set:async(T,O,M)=>{let G=n_(M),z={op:"set",key:T,value:O};if(G)z.scope=G;await w_(z)},delete:async(T,O)=>{let M=n_(O),G={op:"delete",key:T};if(M)G.scope=M;await w_(G)},keys:async(T)=>{let O=n_(T),M={op:"keys"};if(O)M.scope=O;let G=await w_(M);if(G.op!=="keys")throw new D("HOST_REJECTED","Expected storage keys.");return G.keys}},onReady:(T)=>{if(A.add(T),X)T(X);return()=>{A.delete(T)}},onDirectory:(T)=>{if(I.add(T),X)T(X.directory);return()=>{I.delete(T)}},onSession:(T)=>{if(Y.add(T),X)T(X.session);return()=>{Y.delete(T)}},onSessionLifecycle:(T)=>{if(N.add(T),s)T(s);return()=>{N.delete(T)}},onConnection:(T)=>{if(K.add(T),X)T(X.connection);return()=>{K.delete(T)}},onSettings:(T)=>{if(U.add(T),X)T(X.settings);return()=>{U.delete(T)}},onItem:(T)=>{if(L.add(T),X)T(X.item);return()=>{L.delete(T)}},onStatusControl:(T)=>{return S_.add(T),()=>{S_.delete(T)}},onPopoverClosed:(T)=>{return p.add(T),()=>{p.delete(T)}},setStatusControls:(T)=>{if(X?.features?.statusControls!==!0)return Promise.reject(new D("UNSUPPORTED","This host does not support status controls."));if(!DS(T))return Promise.reject(new D("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return j({...f,type:"status-controls",id:V(C),payload:{controls:T}})},openPopover:(T)=>{if(X?.features?.popovers!==!0)return Promise.reject(new D("UNSUPPORTED","This host does not support popovers."));if(!DT(T))return Promise.reject(new D("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return j({...f,type:"popover-open",id:V(C),payload:T})},closePopover:OS,setPopoverAnchorActive:ES,onResolve:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>h_)return Promise.reject(new D("HOST_REJECTED",`Toast message must contain 1 to ${h_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>g_))return Promise.reject(new D("HOST_REJECTED",`Toast copy text must contain 1 to ${g_} characters.`));return j({channel:W,v:P,type:"toast",id:V(C),payload:{...T,message:O}})},openUrl:(T)=>j({channel:W,v:P,type:"open-url",id:V(C),payload:{url:T}}),openCommit:(T)=>VT(T)?j({channel:W,v:P,type:"open-commit",id:V(C),payload:{sha:T}}):Promise.reject(new D("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>j({channel:W,v:P,type:"open-surface",id:V(C),payload:{surfaceId:T}}),writeClipboard:(T)=>j({channel:W,v:P,type:"clipboard-write",id:V(C),payload:{text:T}}),compose:(T)=>j({channel:W,v:P,type:"compose",id:V(C),payload:T}),attach:(T)=>j({channel:W,v:P,type:"attach",id:V(C),payload:C_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)i(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")i(O.directory);else{if(O.name!==void 0)i(O.name,200);if(O.baseBranch!==void 0)i(O.baseBranch,200)}let M=await b({channel:W,v:P,type:"start-session",id:V(C),payload:YT(T)},_.requestTimeoutMs??180000);if(!IT(M))throw new D("HOST_REJECTED","Host did not return a session.");return M},prompt:(T)=>b({channel:W,v:P,type:"prompt",id:V(C),payload:QT(T)}).then((O)=>{if(!CT(O))throw new D("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>j({channel:W,v:P,type:"session-link",id:V(C),payload:C_(T)}),close:()=>j({channel:W,v:P,type:"close",id:V(C)}),oauthStart:()=>j({channel:W,v:P,type:"oauth-start",id:V(C)}),oauthDisconnect:()=>j({channel:W,v:P,type:"oauth-disconnect",id:V(C)}),request:(T)=>(v_(T.path)?b({channel:W,v:P,type:"request",id:V(C),payload:T}):hS()).then((O)=>{if(!u_(O))throw new D("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(v_(T.path)?b({channel:W,v:P,type:"service-request",id:V(C),payload:T}):hS()).then((O)=>{if(!u_(O))throw new D("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>b({channel:W,v:P,type:"service-status",id:V(C)}).then((T)=>{if(!kT(T))throw new D("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(V_(T)?b({channel:W,v:P,type:"file-read",id:V(C),payload:{path:T}}):l_()).then((O)=>{if(!FT(O))throw new D("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!V_(T))return l_();if(O.length>c_)return Promise.reject(new D("FILE_TOO_LARGE",`Content is over ${c_} characters.`));return b({channel:W,v:P,type:"file-write",id:V(C),payload:{path:T,content:O}}).then((M)=>{if(!$T(M))throw new D("HOST_REJECTED","Host did not confirm the write.");return M})},listDir:(T)=>(V_(T)?b({channel:W,v:P,type:"file-list",id:V(C),payload:{path:T}}):l_()).then((O)=>{if(!JT(O))throw new D("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(V_(T)?b({channel:W,v:P,type:"file-stat",id:V(C),payload:{path:T}}):l_()).then((O)=>{if(!LT(O))throw new D("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),M=T.system?.trim();if(O.length===0||O.length>p_)return Promise.reject(new D("HOST_REJECTED",`Prompt must be 1 to ${p_} characters.`));if(M!==void 0&&(M.length===0||M.length>d_))return Promise.reject(new D("HOST_REJECTED",`System prompt must be 1 to ${d_} characters.`));let G=T.maxOutputTokens===void 0?void 0:Math.min(WT,Math.max(1,Math.floor(T.maxOutputTokens)));if(G!==void 0&&!Number.isFinite(G))return Promise.reject(new D("HOST_REJECTED","maxOutputTokens must be a number."));let z={prompt:O};if(M!==void 0)z.system=M;if(G!==void 0)z.maxOutputTokens=G;return b({channel:W,v:P,type:"generate",id:V(C),payload:z},_.requestTimeoutMs??PT).then((Z)=>{if(!BT(Z))throw new D("HOST_REJECTED","Host did not return generated text.");return Z})},onLateGenerateResult:(T)=>{n.add(T);for(let O of h.splice(0))B([T],O);return oT(),()=>{n.delete(T)}},setBadge:(T)=>j({channel:W,v:P,type:"badge",id:V(C),payload:{count:ZT(T)}}),setHeight:(T)=>j({channel:W,v:P,type:"resize",id:V(C),payload:{height:zT(T)}}),onFileOpen:(T)=>{if(r.add(T),!Z_)Z_=!0,S.addEventListener("keydown",tT,!0);if(G_)T(G_);return()=>{r.delete(T)}},onFileSnapshot:(T)=>{return d=T,()=>{if(d===T)d=null}},onFileSaved:(T)=>{return Q_.add(T),()=>{Q_.delete(T)}},reportFileChange:(T)=>TT({...f,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:sT,reportFileUnsupported:()=>TT({...f,type:"file-unsupported"}),dispose:()=>{for(let T of D_.keys())v({...f,type:"workspace-unsubscribe",id:V(C),payload:{subscriptionId:T}});D_.clear();for(let T of X_.keys())v({...f,type:"shells-unsubscribe",id:V(C),payload:{subscriptionId:T}});if(X_.clear(),o=!0,O_=null,E_=null,d=null,r.clear(),Q_.clear(),Z_)S.removeEventListener("keydown",tT,!0);S.removeEventListener("message",rT),S.removeEventListener("keydown",eT,!0),S.removeEventListener("pointerover",H_),S.removeEventListener("pointermove",H_),S.removeEventListener("pointerout",_S),S.removeEventListener("focus",TS),S.removeEventListener("blur",SS);for(let T of a.values())clearTimeout(T.timer),T.reject(new D("HOST_UNAVAILABLE","Host client was disposed."));a.clear(),A.clear(),I.clear(),Y.clear(),N.clear(),K.clear(),U.clear(),L.clear(),S_.clear(),p.clear(),n.clear(),h.length=0}}};var gS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var SE=new Set(gS);var mS=["none","agent","user"];var EE=new Set(mS);var MO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],RO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],cS=(_,S)=>{S.style.colorScheme=_.mode;for(let[E,R]of MO)S.style.setProperty(E,_.tokens[R]);for(let[E,R,A]of RO){let I=_.tokens[A]??"";S.style.setProperty(E,I),S.style.setProperty(R,I)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},fT=(_,S)=>{if(cS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var GO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},k=(_,S)=>`var(--${_}, var(--oc-${GO[_]}, ${S}))`,e=k("surface-background","transparent"),i_=k("surface-elevated","transparent"),N_=k("surface-elevated-foreground","inherit"),u=k("surface-foreground","inherit"),$=k("surface-muted-foreground","gray"),DO=k("surface-muted","transparent"),U_=k("interactive-border","currentColor"),g=k("interactive-hover","transparent"),A_=k("interactive-active","transparent"),HT=k("interactive-selection","transparent"),wT=k("interactive-selection-foreground","inherit"),t=k("primary","currentColor"),xT=k("primary-text","inherit"),bT=k("error-text","inherit"),XO=k("font-sans","inherit"),qT=k("font-mono","monospace"),uS=k("radius","9px"),yT=`calc(${uS} - 2px)`,pS=`calc(${uS} - 4px)`,J=(_,S,E="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${E})`,dS=`background-image: linear-gradient(${g}, ${g});`,hT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,gT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",vS="box-shadow: var(--oc-sdk-lit);",mT=`inset 0 0.5px 0 0 ${J(u,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,IO=`
:root {
  --oc-sdk-edge: ${J(u,16)};
  --oc-sdk-field-bg: ${i_};
  --oc-sdk-raised-bg: ${e};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${J(u,14)};
  --oc-sdk-field-bg: ${J(e,50,i_)};
  --oc-sdk-raised-bg: ${i_};
  --oc-sdk-field-lift: ${mT};
  --oc-sdk-raised-lift: ${mT};
  --oc-sdk-lit: ${mT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,a_=(_)=>{let S=k(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${k(`${_}-text`,"inherit")}; }`},CO=`
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
`,lS=`${IO}
.oc-sdk { color: ${u}; font-family: ${XO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${dS} }
.oc-sdk-mono { font-family: ${qT}; }
.oc-sdk-muted { color: ${$}; }
${a_("success")}${a_("warning")}${a_("error")}${a_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${xT}; }

.oc-sdk-btn { border-radius: ${yT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${pS}; }
.oc-sdk-btn[data-variant="default"] { color: ${xT}; background: ${J(t,10,e)}; border-color: ${J(t,12)}; ${vS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${J(t,16,e)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${J(t,22,e)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${DO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${N_}; ${gT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${g}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${k("status-error","red")}; color: ${bT}; background: ${J("var(--oc-sdk-tone)",7,e)}; border-color: ${J("var(--oc-sdk-tone)",12)}; ${vS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${J("var(--oc-sdk-tone)",9,e)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${J("var(--oc-sdk-tone)",11,e)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${bT}; }
.oc-sdk-input { border-radius: ${yT}; background: var(--oc-sdk-field-bg); color: ${N_}; ${hT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${hT(J(u,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${hT(k("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${qT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${t}; }
.oc-sdk-search-clear { border-radius: ${pS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${g}; color: ${u}; }

.oc-sdk-trigger { border-radius: ${yT}; background: var(--oc-sdk-raised-bg); color: ${N_}; ${gT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${N_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${i_}; background-clip: padding-box; color: ${N_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${g}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${HT}; color: ${wT}; }
.oc-sdk-option-check { color: ${u}; }
.oc-sdk-option[data-destructive="true"] { color: ${bT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${J(k("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${U_}; border-radius: 4px; color: ${u}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${J(u,60,U_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${U_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${e}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${t}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${dS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${J(u,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${u}; }
.oc-sdk-tab[aria-selected="true"] { color: ${wT}; background: ${HT}; border-color: ${U_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${N_}; background: var(--oc-sdk-raised-bg); ${gT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${J(u,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${J("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${g}; }
.oc-sdk-row[aria-selected="true"] { background: ${HT}; color: ${wT}; }
.oc-sdk-row-lead { font-family: ${qT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${U_}; border-top-color: ${t}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${J("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${J(U_,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${J(u,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${t}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${k("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${k("success-text","inherit")}; }

.oc-sdk-text a { color: ${xT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${J(U_,60)}; }
`,q=`
${ET}
${CO}
${lS}`;var Y_=jT(),aS=document.querySelector("#root");if(!aS)throw Error("Missing #root");aS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:15px/1.6 system-ui,sans-serif}
#root{padding:12px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.top{display:flex;gap:8px;align-items:center}
select{flex:1;padding:8px 10px;font-size:15px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,#fff);color:var(--oc-fg,inherit);color-scheme:light dark}
select option{background:var(--oc-elevated,#fff);color:var(--oc-fg,#111)}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5}
.sync{font-size:13.5px;opacity:.8}
h3{margin:6px 0 0;font-size:14px;opacity:.65;font-weight:600}
table{width:100%;border-collapse:collapse;font-size:14.5px}
td{padding:8px 6px;border-bottom:1px solid #8882;vertical-align:middle}
input[type=checkbox]{width:19px;height:19px;accent-color:var(--primary,#3574f0);cursor:pointer;flex:none;margin:0}
.selbar{display:flex;gap:10px;align-items:center;background:#8881;border-radius:8px;padding:7px 10px;cursor:pointer;user-select:none}
.selbar:hover{background:#8882}
.selbar span{font-size:14px}
.file .p{cursor:pointer}
.file .p:hover{text-decoration:underline}
button.ai{font-size:14px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;color:#fff;font-weight:700;padding:6px 14px}
button.ai:hover{filter:brightness(1.12)}
button.icon{padding:4px 10px;font-size:13px}
.mono{font-family:monospace}
.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:0;width:100%}
.empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:28px 0;opacity:.75}
.empty .ic{font-size:26px;opacity:.4}
#done[hidden],#nongit[hidden],#conflict[hidden],#confirm[hidden]{display:none!important}
#confirm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:30;padding:20px}
#confirm .box{background:var(--oc-elevated,#1c1c1e);border:1px solid var(--oc-border,#8888);border-radius:12px;padding:16px;max-width:100%;display:flex;flex-direction:column;gap:12px}
#confirm .msg{font-size:14px;word-break:break-all}
#conflict{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,#7f1d1d 92%,transparent);z-index:20;text-align:center;padding:16px}
#conflict .big{font-size:44px}
#conflict table{max-width:100%}
#conflict td{border-bottom:1px solid #fff3}
textarea{width:100%;min-height:76px;padding:10px;font-size:14.5px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:13.5px;opacity:.7}
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
<div id="confirm" hidden>
  <div class="box">
    <div class="msg" id="confirm-msg"></div>
    <div class="row" style="justify-content:flex-end">
      <button id="confirm-cancel">取消</button>
      <button id="confirm-ok" class="primary">确定删除</button>
    </div>
  </div>
</div>
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
`;var F=(_)=>document.querySelector(`#${_}`),T_=F("branch"),y=F("sync"),e_=F("remote"),J_=F("local"),_T=F("msg"),l=F("out"),YO=F("topbar"),QO=F("h-remote"),ZO=F("h-local"),zO=F("nongit"),kO=F("commitBox"),L_=F("done"),vT=new Set,nT=F("confirm"),FO=F("confirm-msg"),K_=null,pT=(_)=>{return FO.textContent=_,nT.hidden=!1,new Promise((S)=>{K_=S})};F("confirm-ok").onclick=()=>{nT.hidden=!0,K_?.(!0),K_=null};F("confirm-cancel").onclick=()=>{nT.hidden=!0,K_?.(!1),K_=null};var iS=F("conflict"),nS=F("conflict-list"),$O=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),dT="",oS=(_)=>{let S=$O(_);if(S.length===0){dT="";return}let E=S.join(`
`);if(E===dT)return;dT=E,nS.innerHTML="";for(let R of S.slice(0,20)){let A=document.createElement("tr"),I=document.createElement("td");I.className="mono ellipsis",I.textContent=R,A.appendChild(I),nS.appendChild(A)}iS.hidden=!1},uT=(_)=>{zO.hidden=!_,YO.style.display=_?"none":"",y.style.display=_?"none":"",QO.style.display=_?"none":"",e_.style.display=_?"none":"",ZO.style.display=_?"none":"",J_.style.display=_?"none":"",kO.style.display=_?"none":""},Q=null,P_=!1,w=(_,S,E)=>Y_.serviceRequest({method:_,path:S,body:E===void 0?void 0:JSON.stringify(E)});var JO=async(_,S)=>{try{let E=await w("GET",`/branches?dir=${encodeURIComponent(_)}`),R=JSON.parse(E.body);if(!R.ok||!R.branches)return;if(T_.value&&T_.value===S&&T_.options.length>0)return;vT.clear();for(let I of R.remotes??[])vT.add(I.name);T_.innerHTML="";let A=document.createElement("optgroup");A.label="本地分支";for(let I of R.branches){let Y=document.createElement("option");if(Y.value=I.name,Y.textContent=I.name,I.current)Y.selected=!0;A.appendChild(Y)}if(T_.appendChild(A),R.remotes&&R.remotes.length>0){let I=document.createElement("optgroup");I.label="远程分支";for(let Y of R.remotes){let N=document.createElement("option");N.value=Y.name,N.textContent=Y.name,I.appendChild(N)}T_.appendChild(I)}}catch{}},lT=(_)=>{e_.innerHTML="";let E=(_.remoteLog??[]).slice(0,5);if(E.length===0){e_.innerHTML='<div class="mut">无远程分支记录</div>';return}let R=document.createElement("table");R.style.tableLayout="fixed";for(let A of E){let I=document.createElement("tr"),Y=document.createElement("td");Y.className="mono ellipsis",Y.style.fontSize="12px";let N=A.downloaded!==!1,K=document.createElement("span");K.textContent=N?"● ":"○ ",K.style.color=N?x.green:x.amber;let U=document.createElement("span");U.className="mut",U.textContent=`${A.date} ${A.author} `;let L=document.createElement("span");if(L.textContent=A.subject,L.style.color=N?x.gray:"inherit",!N)L.style.fontWeight="700";Y.title=`${A.subject} · ${A.author} ${A.date}（${N?"已下载":"未下载"}）`,Y.append(K,U,L),I.appendChild(Y),R.appendChild(I)}e_.appendChild(R)},x={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},LO=(_,S)=>{if(`${_}${S}`==="??")return x.purple;if(_==="U"||S==="U")return x.red;if(_==="D"||S==="D")return x.red;if(_==="A"||S==="A")return x.green;if(_==="R"||S==="R"||_==="C"||S==="C")return x.blue;if(_==="M"||S==="M")return x.amber;return x.gray},BO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let R="改动";if(_==="A"||S==="A")R="新增";else if(_==="D"||S==="D")R="删除";else if(_==="R"||S==="R")R="重命名";else if(_==="C"||S==="C")R="复制";else if(_==="T"||S==="T")R="类型变更";else if(_==="M"||S==="M")R="修改";return _!==" "&&_!=="?"&&_!=="!"?`${R}·已暂存`:R},rS=(_)=>{J_.innerHTML="";let S=_.files??[];if(S.length===0){let U=document.createElement("div");U.className="empty",U.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',J_.appendChild(U);return}let E=(U)=>U.trim()!==""&&U!=="?"&&U!==" ",R=S.every((U)=>E(U.staged)),A=document.createElement("div");A.className="selbar",A.onclick=(U)=>{if(U.target.tagName!=="INPUT")I.click()};let I=document.createElement("input");I.type="checkbox",I.checked=R,I.title=R?"全不选：取消全部暂存":"全选：暂存全部",I.onchange=async()=>{if(!Q){I.checked=!I.checked;return}if(I.checked){let U=S.filter((L)=>!E(L.staged)).map((L)=>L.path);if(U.length>0)await w("POST","/stage",{dir:Q,paths:U})}else{let U=S.filter((L)=>E(L.staged)).map((L)=>L.path);if(U.length>0)await w("POST","/unstage",{dir:Q,paths:U})}B_()};let Y=document.createElement("span");Y.className="mut";let N=S.filter((U)=>E(U.staged)).length;Y.textContent=`全选 ${N}/${S.length}`,A.append(I,Y),J_.appendChild(A);let K=document.createElement("table");for(let U of S){let L=document.createElement("tr"),S_=document.createElement("td");S_.style.width="28px";let p=document.createElement("input");p.type="checkbox",p.checked=U.staged.trim()!==""&&U.staged!=="?"&&U.staged!==" ",p.title=p.checked?"已暂存点取消":"未暂存点暂存",p.onchange=async()=>{if(!Q)return;await w("POST",p.checked?"/stage":"/unstage",{dir:Q,paths:[U.path]}),B_()},S_.appendChild(p);let n=document.createElement("td");n.className="mono ellipsis",n.textContent=U.path,n.title=`${U.path}（点切换勾选）`,n.onclick=()=>p.click();let h=document.createElement("td");h.style.width="92px",h.style.minWidth="92px",h.style.textAlign="right",h.style.whiteSpace="nowrap",h.style.fontSize="13px",h.className="mut";let O_=U.binary?`<span style="color:${x.gray}">二进制</span>`:U.add!==void 0?`<span style="color:${x.green}">+${U.add}</span> <span style="color:${x.red}">-${U.del??0}</span> `:"",E_=BO(U.staged,U.unstaged);h.innerHTML=`${O_}<span style="color:${LO(U.staged,U.unstaged)}">${E_}</span>`,h.title=h.textContent??"";let r=document.createElement("td");if(r.style.width="30px",r.style.textAlign="right",!(U.staged==="U"||U.unstaged==="U")){let d=document.createElement("button");d.textContent="↩ 还原",d.title="还原：丢弃该文件本地改动",d.className="icon",d.onclick=async()=>{if(!Q)return;if(U.staged==="?"||U.staged==="A"){if(!await pT(`确定丢弃 ${U.path} 的本地内容吗？删除后不可恢复`))return;if(!await pT(`再次确认：真的删除 ${U.path} 吗？`))return}d.disabled=!0;let Z_=await w("POST","/restore",{dir:Q,paths:[U.path],confirmed:!0}),a=JSON.parse(Z_.body);if(!a.ok&&a.error==="need-confirm"){if(await pT(`确定删除未跟踪的 ${U.path} 吗？`))await w("POST","/restore",{dir:Q,paths:[U.path],confirmed:!0})}else if(!a.ok)l.textContent=a.error||"还原失败";d.disabled=!1,B_()},r.appendChild(d)}L.append(S_,n,h,r),K.appendChild(L)}J_.appendChild(K)},KO=(_,S)=>{JO(S,_.branch??"")},jO=(_)=>{let S=_.ahead??0,E=_.behind??0;if(E>0&&S>0)y.textContent=`远程 ${E} 个新，本地超前 ${S}`,y.style.color=x.amber;else if(E>0)y.textContent=`远程有 ${E} 个新提交，可下载`,y.style.color=x.amber;else if(S>0)y.textContent=`本地超前 ${S}可推送`,y.style.color=x.blue;else y.textContent="已是最新",y.style.color=x.green;Y_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},j_=async()=>{if(!Q||P_)return;P_=!0;let _=Q;y.textContent="同步中…";try{await w("POST","/fetch",{dir:_}).catch(()=>{return});let S=await w("GET",`/status?dir=${encodeURIComponent(_)}`),E=JSON.parse(S.body);if(!E.ok||E.branch===void 0){uT(!0);return}uT(!1),jO(E),KO(E,_),lT(E),rS(E),oS(E)}catch(S){y.textContent=S instanceof D?`${S.code}`:"同步失败"}finally{P_=!1}},B_=async()=>{if(!Q||P_||document.hidden)return;P_=!0;try{let _=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),S=JSON.parse(_.body);if(!S.ok)return;rS(S),oS(S),Y_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{P_=!1}};F("btn-refresh").onclick=()=>void j_();F("btn-pull").onclick=async()=>{if(!Q)return;y.textContent="下载中…";try{await w("POST","/pull",{dir:Q})}catch{}j_()};T_.onchange=async()=>{if(!Q||!T_.value)return;let _=T_.value,S=vT.has(_),E=S?_.slice(_.indexOf("/")+1):_;y.textContent=S?`新建跟踪分支 ${E}…`:`切换到 ${_}…`;let R=await w("POST","/checkout",S?{dir:Q,branch:E,create:!0,base:_}:{dir:Q,branch:_}),A=JSON.parse(R.body);if(!A.ok)y.textContent=A.output||A.error||"切换失败";j_()};var M_=F("btn-commit");M_.onclick=async()=>{if(!Q||M_.disabled)return;let _=_T.value.trim();if(!_){l.textContent="先写提交信息";return}M_.disabled=!0;let S=M_.textContent;M_.innerHTML='<span class="spin">↻</span> 提交中…';try{await w("POST","/fetch",{dir:Q}).catch(()=>{return});let E=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),R=JSON.parse(E.body),A=R.behind??0;if(A>0){l.textContent=`远程有 ${A} 个新提交，先点下载合并后再提交`,y.textContent=`远程有 ${A} 个新提交可下载`,lT(R);return}l.textContent="提交…";let I=await w("POST","/commit",{dir:Q,message:_,push:!0}),Y=JSON.parse(I.body);if(!Y.ok){l.textContent=Y.error||"提交失败";return}l.textContent="跟远程核验中…",await w("POST","/fetch",{dir:Q}).catch(()=>{return});let N=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),K=JSON.parse(N.body),U=K.ahead??0;if(U>0){l.textContent=`已提交但远程核验本地仍超前 ${U}推送可能没完全成功请检查`,lT(K);return}_T.value="",l.textContent="已提交并推送远程核验一致",fO()}catch(E){l.textContent=E instanceof D?`${E.code}`:"提交失败"}finally{M_.disabled=!1,M_.textContent=S,j_()}};F("btn-ai").onclick=async()=>{if(!Q)return;l.textContent="AI 生成中…";try{let _=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),S=JSON.parse(_.body),E=(N)=>N.trim()!==""&&N!=="?"&&N!==" ",R=(S.files??[]).filter((N)=>E(N.staged));if(R.length===0){l.textContent="先勾选要提交的文件";return}let A="";for(let N of R.slice(0,3)){try{let K=await w("GET",`/diff?dir=${encodeURIComponent(Q)}&file=${encodeURIComponent(N.path)}&staged=1`),U=JSON.parse(K.body);if(U.ok&&U.diff)A+=`
--- ${N.path} ---
${U.diff.slice(0,2000)}`}catch{}if(A.length>6000)break}let I=R.map((N)=>`${N.staged}${N.unstaged} ${N.path}`).join(`
`).slice(0,1000),{text:Y}=await Y_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${I}${A.slice(0,6000)}`,maxOutputTokens:100});_T.value=Y.trim(),l.textContent=`已按 ${R.length} 个勾选文件生成`}catch{l.textContent="无小模型或未授权 model"}};var R_=null;F("btn-again").onclick=()=>{if(R_)clearTimeout(R_),R_=null;L_.hidden=!0};var fO=()=>{if(R_)clearTimeout(R_);L_.hidden=!1,R_=setTimeout(()=>{L_.hidden=!0,R_=null},2200),L_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let E=document.createElement("div");E.className="confetti",E.style.left=`${4+Math.random()*92}%`,E.style.background=_[S%_.length],E.style.animationDelay=`${Math.random()*0.5}s`,L_.appendChild(E)}};F("btn-conflict-ok").onclick=()=>{iS.hidden=!0};Y_.onResolve(async({args:_})=>{if(_.trim())_T.value=_.trim();return null});setInterval(()=>void B_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)B_()});Y_.onReady((_)=>{fT(_,document.documentElement);let S=_.directory??null;if(S!==Q){if(Q=S,!Q){uT(!0);return}j_()}});})();
