(()=>{var Y="openchamber.sdk",Q=1;var AT=`
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
`;function RS(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let U=new WeakMap;_.addEventListener("scroll",(E)=>{let A=E.target===_?S:E.target;if(!(A instanceof Element))return;if(!A.hasAttribute("data-oc-scrolling"))A.setAttribute("data-oc-scrolling","");let C=U.get(A);if(C!==void 0)clearTimeout(C);U.set(A,setTimeout(()=>{U.delete(A),A.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var EO=`(${RS.toString()})(document);`;var MT=128,RT=65536;var q_=128;var y_=65536;var IS=/^[a-z][a-z0-9-]{0,39}$/;var GS=(_)=>Object(_)===_&&!Array.isArray(_),GT=(_,S)=>Object.keys(_).every((U)=>S.includes(U)),XS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,DS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,CS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let U of _){if(!GS(U)||!IS.test(U.id)||!XS(U.label))return!1;if(U.disabled!==void 0&&U.disabled!==!0&&U.disabled!==!1)return!1;if(S.has(U.id))return!1;if(S.add(U.id),U.kind==="button"){if(!GT(U,["kind","id","label","disabled"]))return!1;continue}if(U.kind!=="select"||!GT(U,["kind","id","label","value","options","disabled"]))return!1;if(!DS(U.value)||!Array.isArray(U.options)||U.options.length<1||U.options.length>16)return!1;let E=new Set;for(let A of U.options){if(!GS(A)||!GT(A,["value","label"])||!DS(A.value)||!XS(A.label)||E.has(A.value))return!1;E.add(A.value)}if(!E.has(U.value))return!1}return!0};var VS=["{id}","{segment}","{segments+}"];var iO=new Set(VS);var WS=["turn-finished","turn-failed","permission-asked","question-asked"];var rO=new Set(WS);var h_=20000000,g_=256;var XT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,NS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let U=0;U<_.bytes.byteLength;U+=1)if(_.bytes[U]!==S.bytes[U])return!1;return!0};var PS=/^[A-Za-z0-9_-]{1,80}$/;var YS=["left","right","top","bottom"];var QS=(_,S=0,U={remaining:16000})=>{if(--U.remaining<0||S>=32)return!1;if(_===null)return!0;let E=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let A of E)if(!QS(A,S+1,U))return!1;return!0},DT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(DT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(DT)}return String(_)===_||Number.isFinite(_)},IT=(_)=>{try{if(String(_.id)!==_.id||!PS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!YS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!QS(_.data)||!DT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var zS=["file","directory","other","missing"],VT=(_)=>Boolean(_&&"sessionId"in _),WT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var kS=/^[0-9a-f]{7,64}$/i,NT=(_)=>kS.test(_),m_=500,c_=32000,FS=16000,JS=128,$S=200,LS=2000,BS=16000,KS=80,jS=200,fS=16000;var HS=2000;var PT=20000,p_=1024,v_=2000000;var d_=64000,u_=8000,YT=4000;var QT=960000;var wS=999,xS=1e4,L_=500,bS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],qS=["stopped","starting","ready","failed"],MO=new Set(bS),yS=(_)=>MO.has(_),hS=(_)=>_&&yS(_)?_:"HOST_REJECTED",I_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(I_);if(Object(_)===_)return Object.values(_).every(I_);return!1},gS=(_)=>I_(_)&&JSON.stringify(_).length<=fS,ZS=(_)=>_?.trim().slice(0,jS)??"",C_=(_)=>{let S=_.id.trim().slice(0,JS),U=_.title.trim().slice(0,$S),E=_.url.trim().slice(0,LS),A=_.text?.trim().slice(0,BS),C=_.author?.trim().slice(0,KS),V=_.kind==="pull"?"pull":"issue",G={providerId:_.providerId.trim(),id:S,title:U||S,url:E,kind:V};if(A)G.text=A;if(C)G.author=C;if(V==="pull"){let k=ZS(_.branches?.head),M=ZS(_.branches?.base);if(k&&M)G.branches={head:k,base:M}}if(gS(_.data))G.data=_.data;return G},ZT=(_)=>{let S=C_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},zT=(_)=>{let S={text:_.text.trim().slice(0,FS)};if(_.send)S.send=!0;return S},kT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(wS,Math.max(0,Math.round(_)))},FT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(xS,Math.max(0,Math.ceil(_)))};var V_=(_)=>_.length>0&&_.length<=p_&&!_.includes("\x00")&&!_.includes("\\");var l_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>HS)return!1;return!_.split("/").some((U)=>U==="."||U==="..")},RO=new Set(qS),JT=(_)=>Boolean(_&&"status"in _&&RO.has(String(_.status))&&!("body"in _)),n_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),$T=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),LT=(_)=>Boolean(_&&"written"in _&&_.written===!0),BT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),GO=new Set(zS),KT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&GO.has(String(_.kind))&&Number.isFinite(_.size)),jT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),XO=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),DO=(_)=>Object(_)===_?_:null,CT=(_)=>String(_)===_&&_.length>0,IO=(_)=>{if(!CT(_.id))return null;if(_.ok===!0){let S={channel:Y,v:Q,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&CT(_.error))return{channel:Y,v:Q,type:"result",id:_.id,ok:!1,error:_.error,code:hS(CT(_.code)?_.code:void 0)};return null},fT=(_)=>{let S=DO(_);if(!S||S.channel!==Y||S.v!==Q)return null;if(S.type==="result")return IO(S);if(!XO.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var mS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),CO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class D extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var cS=()=>Promise.reject(new D("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),a_=()=>Promise.reject(new D("BAD_PATH",`File path must be 1 to ${p_} characters without NUL or backslash.`)),i_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new D("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},HT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new D("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let U=_.acceptSource??((T)=>T===S.parent),E=_.requestTimeoutMs??PT,A=new Set,C=new Set,V=new Set,G=new Set,k=new Set,M=new Set,K=new Set,T_=new Set,p=new Set,n=new Set,h=[],S_=null,O_=null,r=new Set,k_=new Set,v=null,G_=null,F_=!1,a=new Map,X_=new Map,D_=new Map,o=!1,W={value:0},I=null,s=null,J_=!1,$_=!1,rT=null,sT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},d=(T)=>{S.parent.postMessage(T,"*")},tT=()=>{if(o||S.parent===S||n.size===0||I?.features?.lateGenerateResults!==!0)return;d({channel:Y,v:Q,type:"generate-late-listen"})},j=(T,O)=>{for(let R of T)try{R(O)}catch(X){console.error(X)}},eT=(T)=>{if(!(T instanceof MessageEvent))return;if(!U(T.source))return;let O=fT(T.data);if(!O)return;if(O.type==="workspace"){let X=X_.get(O.payload.subscriptionId);if(X)j([X],O.payload.snapshot);return}if(O.type==="shells"){let X=D_.get(O.payload.subscriptionId);if(X)j([X],O.payload.snapshot);return}if(O.type==="ready"){if(I=O.payload,s=sT(O.payload.session),j(A,O.payload),j(C,O.payload.directory),j(V,O.payload.session),s)j(G,s);j(k,O.payload.connection),j(M,O.payload.settings),j(K,O.payload.item),tT();return}if(O.type==="generate-late"){if(n.size===0)h.push(O.payload);else j(n,O.payload);return}if(O.type==="directory"){if(I)I={...I,directory:O.payload.directory};j(C,O.payload.directory);return}if(O.type==="session"){if(I)I={...I,session:O.payload.session};if(!O.payload.session)s=null;else if(s?.sessionId!==O.payload.session.id)s=sT(O.payload.session);j(V,O.payload.session);return}if(O.type==="session-lifecycle"){s=O.payload,j(G,O.payload);return}if(O.type==="connection"){if(I)I={...I,connection:O.payload.connection};j(k,O.payload.connection);return}if(O.type==="settings"){if(I)I={...I,settings:O.payload.settings};j(M,O.payload.settings);return}if(O.type==="item"){if(I)I={...I,item:O.payload.item};j(K,O.payload.item);return}if(O.type==="status-control-event"){j(T_,O.payload);return}if(O.type==="popover-closed"){j(p,O.payload);return}if(O.type==="action"){let X=(z)=>{if(!o)d({channel:Y,v:Q,type:"action-result",id:O.id,payload:z})},F=O_;if(!F){X({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>F(O.payload)).then(()=>X({ok:!0}),(z)=>{let x=(z instanceof Error?z.message:String(z)).trim();X({ok:!1,error:(x||"Action failed.").slice(0,L_)})});return}if(O.type==="file-open"){let X=O.payload;if(G_&&NS(G_,X))return;G_=X,j(r,O.payload);return}if(O.type==="file-saved"){j(k_,O.payload.version);return}if(O.type==="file-snapshot"){let X=(x)=>{if(!o)d({channel:Y,v:Q,type:"file-snapshot-result",id:O.id,payload:x})},F=(x)=>X({error:(x.trim()||"Could not read the edited file.").slice(0,L_)}),z=v;if(!z){F("This extension does not edit files.");return}Promise.resolve().then(()=>z(O.payload.purpose)).then((x)=>{if(XT(x)>h_){F(`The file is over ${h_} ${"bytes"in x?"bytes":"characters"}.`);return}if(x.version.length>g_){F(`The snapshot version is over ${g_} characters.`);return}X({snapshot:"bytes"in x?{bytes:x.bytes,version:x.version}:{content:x.content,version:x.version}})},(x)=>F(x instanceof Error?x.message:String(x)));return}if(O.type==="resolve"){let X=(z)=>{d({channel:Y,v:Q,type:"resolve-result",id:O.id,payload:z})},F=S_;if(!F){X({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>F(O.payload)).then((z)=>X({item:z?C_(z):null}),(z)=>{let x=(z instanceof Error?z.message:String(z)).trim();X({error:(x||"Command failed.").slice(0,L_)})});return}let R=a.get(O.id);if(!R)return;if(clearTimeout(R.timer),a.delete(O.id),O.ok){R.resolve(O.payload);return}R.reject(new D(O.code,O.error))};S.addEventListener("message",eT),d({channel:Y,v:Q,type:"hello"});let q=(T,O=E)=>{if(o||S.parent===S)return Promise.reject(new D("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,X)=>{let F=setTimeout(()=>{a.delete(T.id),X(new D("HOST_TIMEOUT","Host did not answer in time."))},O);a.set(T.id,{resolve:R,reject:X,timer:F}),d(T)})},H=(T)=>q(T).then(()=>{return}),w={channel:Y,v:Q},OT=(T)=>{if(!o&&S.parent!==S)d(T)},_S=()=>OT({...w,type:"file-save"}),TS=(T)=>{if(!mS(T)||!CO(T))return;T.preventDefault(),_S()},SS=(T)=>{if(!mS(T)||T.key!=="Escape"||I?.surface!=="popover"||!I.popover)return;T.preventDefault(),AS(I.popover.id,"escape").catch(()=>{return})},w_=()=>{let T=I?.surface==="popover"?I.popover:void 0;if(!T)return;let O=J_||$_;if(rT===O)return;rT=O,MS(T.id,O).catch(()=>{return})},x_=()=>{if(I?.surface!=="popover"||J_)return;J_=!0,w_()},OS=(T)=>{if(I?.surface!=="popover"||T.relatedTarget!==null||!J_)return;J_=!1,w_()},US=()=>{if(I?.surface!=="popover"||$_)return;$_=!0,w_()},ES=()=>{if(I?.surface!=="popover"||!$_)return;$_=!1,w_()},i=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new D("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},UT=async(T)=>{if(T.kind!=="projects")i(T.projectId);let O=await q({...w,type:"workspace-read",id:N(W),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new D("HOST_REJECTED","Host did not return workspace data.");return O},ET=async(T,O)=>{if(T.kind!=="projects")i(T.projectId);let R=N(W);X_.set(R,O);try{await H({...w,type:"workspace-subscribe",id:N(W),payload:{subscriptionId:R,query:T}})}catch(X){if(X_.delete(R),!o)d({...w,type:"workspace-unsubscribe",id:N(W),payload:{subscriptionId:R}});throw X}return()=>{if(!X_.delete(R)||o)return;d({...w,type:"workspace-unsubscribe",id:N(W),payload:{subscriptionId:R}})}},UO=async(T,O)=>{if(T.kind==="session")i(T.sessionId);if(T.kind==="project")i(T.projectId);let R=N(W);D_.set(R,O);try{await H({...w,type:"shells-subscribe",id:N(W),payload:{subscriptionId:R,scope:T}})}catch(X){if(D_.delete(R),!o)d({...w,type:"shells-unsubscribe",id:N(W),payload:{subscriptionId:R}});throw X}return()=>{if(!D_.delete(R)||o)return;d({...w,type:"shells-unsubscribe",id:N(W),payload:{subscriptionId:R}})}},b_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>MT))throw new D("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!I_(T.value))throw new D("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>RT)throw new D("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&I?.features?.deviceStorage!==!0)throw new D("UNSUPPORTED","This host does not support device storage.");let O=await q({...w,type:"storage",id:N(W),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new D("HOST_REJECTED","Host did not return storage data.");return O},AS=(T,O)=>I?.features?.popovers!==!0&&!(I?.surface==="popover"&&I.popover?.id===T)?Promise.reject(new D("UNSUPPORTED","This host does not support popovers.")):H({...w,type:"popover-close",id:N(W),payload:O?{id:T,reason:O}:{id:T}}),MS=(T,O)=>I?.features?.popovers!==!0&&!(I?.surface==="popover"&&I.popover?.id===T)?Promise.reject(new D("UNSUPPORTED","This host does not support popovers.")):H({...w,type:"popover-anchor",id:N(W),payload:{id:T,active:O}});return S.addEventListener("keydown",SS,!0),S.addEventListener("pointerover",x_),S.addEventListener("pointermove",x_),S.addEventListener("pointerout",OS),S.addEventListener("focus",US),S.addEventListener("blur",ES),{onAction:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},listProjects:async()=>{let T=await UT({kind:"projects"});if(T.kind!=="projects")throw new D("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await UT({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new D("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await UT({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new D("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>ET({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>ET({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")O(R)}),onSessions:(T,O)=>ET({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")O(R)}),onRunningShells:(T,O)=>UO(T,O),readShellOutput:async(T,O)=>{i(T,q_);let R=O?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new D("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let X=O?.tailBytes;if(X!==void 0&&(!Number.isInteger(X)||X<1||X>y_))throw new D("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${y_}.`);let z=await q({...w,type:"shell-output",id:N(W),payload:{shellId:T,cursor:R,tailBytes:X}});if(!z||typeof z.output!=="string"||!Number.isFinite(z.cursor))throw new D("HOST_REJECTED","Host did not return shell output.");return z},stopShell:async(T)=>{if(i(T,q_),(await q({...w,type:"shell-stop",id:N(W),payload:{shellId:T}}))?.stopped!==!0)throw new D("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{i(T),await H({...w,type:"open-session",id:N(W),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let R=i_(O),X={op:"get",key:T};if(R)X.scope=R;let F=await b_(X);return F.op==="get"&&F.found?F.value:void 0},set:async(T,O,R)=>{let X=i_(R),F={op:"set",key:T,value:O};if(X)F.scope=X;await b_(F)},delete:async(T,O)=>{let R=i_(O),X={op:"delete",key:T};if(R)X.scope=R;await b_(X)},keys:async(T)=>{let O=i_(T),R={op:"keys"};if(O)R.scope=O;let X=await b_(R);if(X.op!=="keys")throw new D("HOST_REJECTED","Expected storage keys.");return X.keys}},onReady:(T)=>{if(A.add(T),I)T(I);return()=>{A.delete(T)}},onDirectory:(T)=>{if(C.add(T),I)T(I.directory);return()=>{C.delete(T)}},onSession:(T)=>{if(V.add(T),I)T(I.session);return()=>{V.delete(T)}},onSessionLifecycle:(T)=>{if(G.add(T),s)T(s);return()=>{G.delete(T)}},onConnection:(T)=>{if(k.add(T),I)T(I.connection);return()=>{k.delete(T)}},onSettings:(T)=>{if(M.add(T),I)T(I.settings);return()=>{M.delete(T)}},onItem:(T)=>{if(K.add(T),I)T(I.item);return()=>{K.delete(T)}},onStatusControl:(T)=>{return T_.add(T),()=>{T_.delete(T)}},onPopoverClosed:(T)=>{return p.add(T),()=>{p.delete(T)}},setStatusControls:(T)=>{if(I?.features?.statusControls!==!0)return Promise.reject(new D("UNSUPPORTED","This host does not support status controls."));if(!CS(T))return Promise.reject(new D("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return H({...w,type:"status-controls",id:N(W),payload:{controls:T}})},openPopover:(T)=>{if(I?.features?.popovers!==!0)return Promise.reject(new D("UNSUPPORTED","This host does not support popovers."));if(!IT(T))return Promise.reject(new D("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return H({...w,type:"popover-open",id:N(W),payload:T})},closePopover:AS,setPopoverAnchorActive:MS,onResolve:(T)=>{return S_=T,()=>{if(S_===T)S_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>m_)return Promise.reject(new D("HOST_REJECTED",`Toast message must contain 1 to ${m_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>c_))return Promise.reject(new D("HOST_REJECTED",`Toast copy text must contain 1 to ${c_} characters.`));return H({channel:Y,v:Q,type:"toast",id:N(W),payload:{...T,message:O}})},openUrl:(T)=>H({channel:Y,v:Q,type:"open-url",id:N(W),payload:{url:T}}),openCommit:(T)=>NT(T)?H({channel:Y,v:Q,type:"open-commit",id:N(W),payload:{sha:T}}):Promise.reject(new D("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>H({channel:Y,v:Q,type:"open-surface",id:N(W),payload:{surfaceId:T}}),writeClipboard:(T)=>H({channel:Y,v:Q,type:"clipboard-write",id:N(W),payload:{text:T}}),compose:(T)=>H({channel:Y,v:Q,type:"compose",id:N(W),payload:T}),attach:(T)=>H({channel:Y,v:Q,type:"attach",id:N(W),payload:C_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)i(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")i(O.directory);else{if(O.name!==void 0)i(O.name,200);if(O.baseBranch!==void 0)i(O.baseBranch,200)}let R=await q({channel:Y,v:Q,type:"start-session",id:N(W),payload:ZT(T)},_.requestTimeoutMs??180000);if(!VT(R))throw new D("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>q({channel:Y,v:Q,type:"prompt",id:N(W),payload:zT(T)}).then((O)=>{if(!WT(O))throw new D("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>H({channel:Y,v:Q,type:"session-link",id:N(W),payload:C_(T)}),close:()=>H({channel:Y,v:Q,type:"close",id:N(W)}),oauthStart:()=>H({channel:Y,v:Q,type:"oauth-start",id:N(W)}),oauthDisconnect:()=>H({channel:Y,v:Q,type:"oauth-disconnect",id:N(W)}),request:(T)=>(l_(T.path)?q({channel:Y,v:Q,type:"request",id:N(W),payload:T}):cS()).then((O)=>{if(!n_(O))throw new D("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(l_(T.path)?q({channel:Y,v:Q,type:"service-request",id:N(W),payload:T}):cS()).then((O)=>{if(!n_(O))throw new D("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>q({channel:Y,v:Q,type:"service-status",id:N(W)}).then((T)=>{if(!JT(T))throw new D("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(V_(T)?q({channel:Y,v:Q,type:"file-read",id:N(W),payload:{path:T}}):a_()).then((O)=>{if(!$T(O))throw new D("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!V_(T))return a_();if(O.length>v_)return Promise.reject(new D("FILE_TOO_LARGE",`Content is over ${v_} characters.`));return q({channel:Y,v:Q,type:"file-write",id:N(W),payload:{path:T,content:O}}).then((R)=>{if(!LT(R))throw new D("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(V_(T)?q({channel:Y,v:Q,type:"file-list",id:N(W),payload:{path:T}}):a_()).then((O)=>{if(!BT(O))throw new D("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(V_(T)?q({channel:Y,v:Q,type:"file-stat",id:N(W),payload:{path:T}}):a_()).then((O)=>{if(!KT(O))throw new D("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),R=T.system?.trim();if(O.length===0||O.length>d_)return Promise.reject(new D("HOST_REJECTED",`Prompt must be 1 to ${d_} characters.`));if(R!==void 0&&(R.length===0||R.length>u_))return Promise.reject(new D("HOST_REJECTED",`System prompt must be 1 to ${u_} characters.`));let X=T.maxOutputTokens===void 0?void 0:Math.min(YT,Math.max(1,Math.floor(T.maxOutputTokens)));if(X!==void 0&&!Number.isFinite(X))return Promise.reject(new D("HOST_REJECTED","maxOutputTokens must be a number."));let F={prompt:O};if(R!==void 0)F.system=R;if(X!==void 0)F.maxOutputTokens=X;return q({channel:Y,v:Q,type:"generate",id:N(W),payload:F},_.requestTimeoutMs??QT).then((z)=>{if(!jT(z))throw new D("HOST_REJECTED","Host did not return generated text.");return z})},onLateGenerateResult:(T)=>{n.add(T);for(let O of h.splice(0))j([T],O);return tT(),()=>{n.delete(T)}},setBadge:(T)=>H({channel:Y,v:Q,type:"badge",id:N(W),payload:{count:kT(T)}}),setHeight:(T)=>H({channel:Y,v:Q,type:"resize",id:N(W),payload:{height:FT(T)}}),onFileOpen:(T)=>{if(r.add(T),!F_)F_=!0,S.addEventListener("keydown",TS,!0);if(G_)T(G_);return()=>{r.delete(T)}},onFileSnapshot:(T)=>{return v=T,()=>{if(v===T)v=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>OT({...w,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:_S,reportFileUnsupported:()=>OT({...w,type:"file-unsupported"}),dispose:()=>{for(let T of X_.keys())d({...w,type:"workspace-unsubscribe",id:N(W),payload:{subscriptionId:T}});X_.clear();for(let T of D_.keys())d({...w,type:"shells-unsubscribe",id:N(W),payload:{subscriptionId:T}});if(D_.clear(),o=!0,S_=null,O_=null,v=null,r.clear(),k_.clear(),F_)S.removeEventListener("keydown",TS,!0);S.removeEventListener("message",eT),S.removeEventListener("keydown",SS,!0),S.removeEventListener("pointerover",x_),S.removeEventListener("pointermove",x_),S.removeEventListener("pointerout",OS),S.removeEventListener("focus",US),S.removeEventListener("blur",ES);for(let T of a.values())clearTimeout(T.timer),T.reject(new D("HOST_UNAVAILABLE","Host client was disposed."));a.clear(),A.clear(),C.clear(),V.clear(),G.clear(),k.clear(),M.clear(),K.clear(),T_.clear(),p.clear(),n.clear(),h.length=0}}};var pS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var XU=new Set(pS);var vS=["none","agent","user"];var IU=new Set(vS);var VO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],WO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],dS=(_,S)=>{S.style.colorScheme=_.mode;for(let[U,E]of VO)S.style.setProperty(U,_.tokens[E]);for(let[U,E,A]of WO){let C=_.tokens[A]??"";S.style.setProperty(U,C),S.style.setProperty(E,C)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},wT=(_,S)=>{if(dS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var NO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},J=(_,S)=>`var(--${_}, var(--oc-${NO[_]}, ${S}))`,e=J("surface-background","transparent"),r_=J("surface-elevated","transparent"),W_=J("surface-elevated-foreground","inherit"),u=J("surface-foreground","inherit"),$=J("surface-muted-foreground","gray"),PO=J("surface-muted","transparent"),U_=J("interactive-border","currentColor"),g=J("interactive-hover","transparent"),E_=J("interactive-active","transparent"),xT=J("interactive-selection","transparent"),bT=J("interactive-selection-foreground","inherit"),t=J("primary","currentColor"),qT=J("primary-text","inherit"),yT=J("error-text","inherit"),YO=J("font-sans","inherit"),hT=J("font-mono","monospace"),aS=J("radius","9px"),gT=`calc(${aS} - 2px)`,uS=`calc(${aS} - 4px)`,L=(_,S,U="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${U})`,lS=`background-image: linear-gradient(${g}, ${g});`,mT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,cT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",nS="box-shadow: var(--oc-sdk-lit);",pT=`inset 0 0.5px 0 0 ${L(u,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,QO=`
:root {
  --oc-sdk-edge: ${L(u,16)};
  --oc-sdk-field-bg: ${r_};
  --oc-sdk-raised-bg: ${e};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(u,14)};
  --oc-sdk-field-bg: ${L(e,50,r_)};
  --oc-sdk-raised-bg: ${r_};
  --oc-sdk-field-lift: ${pT};
  --oc-sdk-raised-lift: ${pT};
  --oc-sdk-lit: ${pT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,o_=(_)=>{let S=J(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${J(`${_}-text`,"inherit")}; }`},ZO=`
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
`,iS=`${QO}
.oc-sdk { color: ${u}; font-family: ${YO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${lS} }
.oc-sdk-mono { font-family: ${hT}; }
.oc-sdk-muted { color: ${$}; }
${o_("success")}${o_("warning")}${o_("error")}${o_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${qT}; }

.oc-sdk-btn { border-radius: ${gT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${uS}; }
.oc-sdk-btn[data-variant="default"] { color: ${qT}; background: ${L(t,10,e)}; border-color: ${L(t,12)}; ${nS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(t,16,e)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(t,22,e)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${PO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${E_}, ${E_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${W_}; ${cT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${E_}, ${E_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${g}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${E_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${J("status-error","red")}; color: ${yT}; background: ${L("var(--oc-sdk-tone)",7,e)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${nS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,e)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,e)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${yT}; }
.oc-sdk-input { border-radius: ${gT}; background: var(--oc-sdk-field-bg); color: ${W_}; ${mT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${mT(L(u,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${mT(J("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${hT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${t}; }
.oc-sdk-search-clear { border-radius: ${uS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${g}; color: ${u}; }

.oc-sdk-trigger { border-radius: ${gT}; background: var(--oc-sdk-raised-bg); color: ${W_}; ${cT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${E_}, ${E_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${W_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${r_}; background-clip: padding-box; color: ${W_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${g}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${xT}; color: ${bT}; }
.oc-sdk-option-check { color: ${u}; }
.oc-sdk-option[data-destructive="true"] { color: ${yT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(J("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${U_}; border-radius: 4px; color: ${u}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(u,60,U_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${U_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${e}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${t}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${lS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(u,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${u}; }
.oc-sdk-tab[aria-selected="true"] { color: ${bT}; background: ${xT}; border-color: ${U_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${W_}; background: var(--oc-sdk-raised-bg); ${cT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(u,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${g}; }
.oc-sdk-row[aria-selected="true"] { background: ${xT}; color: ${bT}; }
.oc-sdk-row-lead { font-family: ${hT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${U_}; border-top-color: ${t}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(U_,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(u,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${t}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${J("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${J("success-text","inherit")}; }

.oc-sdk-text a { color: ${qT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(U_,60)}; }
`,y=`
${AT}
${ZO}
${iS}`;var z_=HT(),sS=document.querySelector("#root");if(!sS)throw Error("Missing #root");sS.innerHTML=`
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
<div class="top">
  <select id="project" title="项目目录，默认当前项目"></select>
  <button id="btn-pull-all" title="逐个拉取上层目录下全部 git 项目">全部拉取</button>
</div>
<div class="top" id="topbar">
  <span id="proj-name" class="mut" title="当前项目"></span>
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
`;var Z=(_)=>document.querySelector(`#${_}`),Y_=Z("project"),Q_=Z("branch"),B=Z("sync"),TT=Z("remote"),K_=Z("local"),ST=Z("msg"),l=Z("out"),$O=Z("topbar"),dT=Z("btn-pull-all"),P_=Z("proj-name"),tS=()=>{let _=(P??"").split("/").filter(Boolean).pop()??"";P_.textContent=_,P_.style.maxWidth="120px",P_.style.overflow="hidden",P_.style.textOverflow="ellipsis",P_.style.whiteSpace="nowrap",P_.style.flex="none"},LO=Z("h-remote"),BO=Z("h-local"),KO=Z("nongit"),jO=Z("commitBox"),j_=Z("done"),nT=new Set,oT=Z("confirm"),fO=Z("confirm-msg"),H_=null,uT=(_)=>{return fO.textContent=_,oT.hidden=!1,new Promise((S)=>{H_=S})};Z("confirm-ok").onclick=()=>{oT.hidden=!0,H_?.(!0),H_=null};Z("confirm-cancel").onclick=()=>{oT.hidden=!0,H_?.(!1),H_=null};var eS=Z("conflict"),oS=Z("conflict-list"),HO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),lT="",_O=(_)=>{let S=HO(_);if(S.length===0){lT="";return}let U=S.join(`
`);if(U===lT)return;lT=U,oS.innerHTML="";for(let E of S.slice(0,20)){let A=document.createElement("tr"),C=document.createElement("td");C.className="mono ellipsis",C.textContent=E,A.appendChild(C),oS.appendChild(A)}eS.hidden=!1},aT=(_)=>{KO.hidden=!_,$O.style.display=_?"none":"",B.style.display=_?"none":"",LO.style.display=_?"none":"",TT.style.display=_?"none":"",BO.style.display=_?"none":"",K_.style.display=_?"none":"",jO.style.display=_?"none":""},P=null,Z_=!1,f=(_,S,U)=>z_.serviceRequest({method:_,path:S,body:U===void 0?void 0:JSON.stringify(U)});var TO=async(_)=>{try{let S=await f("GET",`/projects?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||!U.projects)return;Y_.innerHTML="";for(let E of U.projects){let A=document.createElement("option");if(A.value=E.path,A.textContent=SO(E),E.current)A.selected=!0;Y_.appendChild(A)}}catch{}},rS="",SO=(_)=>{let S=_.behind??0,U=_.ahead??0;return`${_.current?"● ":""}${_.name}${_.branch?` ${_.branch}`:""}${S>0?` ↓${S}`:""}${U>0?` ↑${U}`:""}`},wO=async(_,S)=>{try{let U=await f("GET",`/branches?dir=${encodeURIComponent(_)}`),E=JSON.parse(U.body);if(!E.ok||!E.branches)return;let A=JSON.stringify([S,E.branches,E.remotes]);if(A===rS)return;rS=A,nT.clear();for(let V of E.remotes??[])nT.add(V.name);Q_.innerHTML="";let C=document.createElement("optgroup");C.label="本地分支";for(let V of E.branches){let G=document.createElement("option");if(G.value=V.name,G.textContent=`${V.current?"● ":""}${V.name}${(V.behind??0)>0?` ↓${V.behind}`:""}${!V.current&&(V.ahead??0)>0?` ↑${V.ahead}`:""}`,V.current)G.selected=!0;C.appendChild(G)}if(Q_.appendChild(C),E.remotes&&E.remotes.length>0){let V=document.createElement("optgroup");V.label="远程分支";for(let G of E.remotes){let k=document.createElement("option");k.value=G.name,k.textContent=G.name,V.appendChild(k)}Q_.appendChild(V)}}catch{}},iT=(_)=>{TT.innerHTML="";let U=(_.remoteLog??[]).slice(0,5);if(U.length===0){TT.innerHTML='<div class="mut">无远程分支记录</div>';return}let E=document.createElement("table");E.style.tableLayout="fixed";for(let A of U){let C=document.createElement("tr"),V=document.createElement("td");V.className="mono ellipsis",V.style.fontSize="12px";let G=A.downloaded!==!1,k=document.createElement("span");k.textContent=G?"● ":"○ ",k.style.color=G?b.green:b.amber;let M=document.createElement("span");M.className="mut",M.textContent=`${A.date} ${A.author} `;let K=document.createElement("span");if(K.textContent=A.subject,K.style.color=G?b.gray:"inherit",!G)K.style.fontWeight="700";V.title=`${A.subject} · ${A.author} ${A.date}（${G?"已下载":"未下载"}）`,V.append(k,M,K),C.appendChild(V),E.appendChild(C)}TT.appendChild(E)},b={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},xO=(_,S)=>{if(`${_}${S}`==="??")return b.purple;if(_==="U"||S==="U")return b.red;if(_==="D"||S==="D")return b.red;if(_==="A"||S==="A")return b.green;if(_==="R"||S==="R"||_==="C"||S==="C")return b.blue;if(_==="M"||S==="M")return b.amber;return b.gray},bO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let E="改动";if(_==="A"||S==="A")E="新增";else if(_==="D"||S==="D")E="删除";else if(_==="R"||S==="R")E="重命名";else if(_==="C"||S==="C")E="复制";else if(_==="T"||S==="T")E="类型变更";else if(_==="M"||S==="M")E="修改";return _!==" "&&_!=="?"&&_!=="!"?`${E}·已暂存`:E},OO=(_)=>{K_.innerHTML="";let S=_.files??[];if(S.length===0){let M=document.createElement("div");M.className="empty",M.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',K_.appendChild(M);return}let U=(M)=>M.trim()!==""&&M!=="?"&&M!==" ",E=S.every((M)=>U(M.staged)),A=document.createElement("div");A.className="selbar",A.onclick=(M)=>{if(M.target.tagName!=="INPUT")C.click()};let C=document.createElement("input");C.type="checkbox",C.checked=E,C.title=E?"全不选：取消全部暂存":"全选：暂存全部",C.onchange=async()=>{if(!P){C.checked=!C.checked;return}if(C.checked){let M=S.filter((K)=>!U(K.staged)).map((K)=>K.path);if(M.length>0)await f("POST","/stage",{dir:P,paths:M})}else{let M=S.filter((K)=>U(K.staged)).map((K)=>K.path);if(M.length>0)await f("POST","/unstage",{dir:P,paths:M})}f_()};let V=document.createElement("span");V.className="mut";let G=S.filter((M)=>U(M.staged)).length;V.textContent=`全选 ${G}/${S.length}`,A.append(C,V),K_.appendChild(A);let k=document.createElement("table");for(let M of S){let K=document.createElement("tr"),T_=document.createElement("td");T_.style.width="28px";let p=document.createElement("input");p.type="checkbox",p.checked=M.staged.trim()!==""&&M.staged!=="?"&&M.staged!==" ",p.title=p.checked?"已暂存点取消":"未暂存点暂存",p.onchange=async()=>{if(!P)return;await f("POST",p.checked?"/stage":"/unstage",{dir:P,paths:[M.path]}),f_()},T_.appendChild(p);let n=document.createElement("td");n.className="mono ellipsis",n.textContent=M.path,n.title=`${M.path}（点切换勾选）`,n.onclick=()=>p.click();let h=document.createElement("td");h.style.width="92px",h.style.minWidth="92px",h.style.textAlign="right",h.style.whiteSpace="nowrap",h.style.fontSize="13px",h.className="mut";let S_=M.binary?`<span style="color:${b.gray}">二进制</span>`:M.add!==void 0?`<span style="color:${b.green}">+${M.add}</span> <span style="color:${b.red}">-${M.del??0}</span> `:"",O_=bO(M.staged,M.unstaged);h.innerHTML=`${S_}<span style="color:${xO(M.staged,M.unstaged)}">${O_}</span>`,h.title=h.textContent??"";let r=document.createElement("td");if(r.style.width="30px",r.style.textAlign="right",!(M.staged==="U"||M.unstaged==="U")){let v=document.createElement("button");v.textContent="↩ 还原",v.title="还原：丢弃该文件本地改动",v.className="icon",v.onclick=async()=>{if(!P)return;if(M.staged==="?"||M.staged==="A"){if(!await uT(`确定丢弃 ${M.path} 的本地内容吗？删除后不可恢复`))return;if(!await uT(`再次确认：真的删除 ${M.path} 吗？`))return}v.disabled=!0;let F_=await f("POST","/restore",{dir:P,paths:[M.path],confirmed:!0}),a=JSON.parse(F_.body);if(!a.ok&&a.error==="need-confirm"){if(await uT(`确定删除未跟踪的 ${M.path} 吗？`))await f("POST","/restore",{dir:P,paths:[M.path],confirmed:!0})}else if(!a.ok)l.textContent=a.error||"还原失败";v.disabled=!1,f_()},r.appendChild(v)}K.append(T_,n,h,r),k.appendChild(K)}K_.appendChild(k)},qO=(_,S)=>{wO(S,_.branch??"")},yO=(_)=>{let S=[...Y_.options].find((U)=>U.value===P);if(!S)return;S.textContent=SO({name:S.textContent.replace(/^\u25cf /,"").split(" ")[0]??"",branch:_.branch??void 0,ahead:_.ahead,behind:_.behind,current:!0})},hO=(_)=>{let S=_.ahead??0,U=_.behind??0;if(U>0&&S>0)B.textContent=`远程 ${U} 个新，本地超前 ${S}`,B.style.color=b.amber;else if(U>0)B.textContent=`远程有 ${U} 个新提交，可下载`,B.style.color=b.amber;else if(S>0)B.textContent=`本地超前 ${S}可推送`,B.style.color=b.blue;else B.textContent="已是最新",B.style.color=b.green;z_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},R_=async()=>{if(!P||Z_)return;Z_=!0;let _=P;B.textContent="同步中…";try{await f("POST","/fetch",{dir:_}).catch(()=>{return});let S=await f("GET",`/status?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||U.branch===void 0){aT(!0);return}aT(!1),hO(U),yO(U),qO(U,_),iT(U),OO(U),_O(U)}catch(S){B.textContent=S instanceof D?`${S.code}`:"同步失败"}finally{Z_=!1}},f_=async()=>{if(!P||Z_||document.hidden)return;Z_=!0;try{let _=await f("GET",`/status?dir=${encodeURIComponent(P)}`),S=JSON.parse(_.body);if(!S.ok)return;OO(S),_O(S),z_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{Z_=!1}};Z("btn-refresh").onclick=()=>void R_();Z("btn-pull-all").onclick=async()=>{if(!P||dT.disabled)return;dT.disabled=!0;try{let _=await f("POST","/pull-all",{dir:P}),S=JSON.parse(_.body);if(!S.ok||!S.jobId){B.textContent="全部拉取启动失败";return}for(;;){if(await new Promise((G)=>setTimeout(G,2000)),!P)return;let U=await f("GET",`/pull-all-status?jobId=${encodeURIComponent(S.jobId)}`),E=JSON.parse(U.body);if(!E.ok){B.textContent="全部拉取查询失败";return}if(B.textContent=`全部拉取 ${E.finished}/${E.total}…`,B.style.color=b.amber,!E.done)continue;let A=E.results.filter((G)=>G.ok).length,C=E.results.filter((G)=>G.conflict).map((G)=>G.name),V=E.results.filter((G)=>!G.ok&&!G.conflict).map((G)=>G.name);B.textContent=`全部拉取完成：成功 ${A}/${E.total}${C.length>0?`，冲突 ${C.join("、")} 请自行处理`:""}${V.length>0?`，失败 ${V.join("、")}`:""}`,B.style.color=V.length>0||C.length>0?b.amber:b.green;break}}catch{B.textContent="全部拉取失败"}finally{if(dT.disabled=!1,P)TO(P);R_()}};Z("btn-pull").onclick=async()=>{if(!P)return;B.textContent="下载中…";try{await f("POST","/pull",{dir:P})}catch{}R_()};Q_.onchange=async()=>{if(!P||!Q_.value)return;let _=Q_.value,S=nT.has(_),U=S?_.slice(_.indexOf("/")+1):_;B.textContent=S?`新建跟踪分支 ${U}…`:`切换到 ${_}…`;let E=await f("POST","/checkout",S?{dir:P,branch:U,create:!0,base:_}:{dir:P,branch:_}),A=JSON.parse(E.body);if(!A.ok)B.textContent=A.output||A.error||"切换失败";R_()};var A_=Z("btn-commit");A_.onclick=async()=>{if(!P||A_.disabled)return;let _=ST.value.trim();if(!_){l.textContent="先写提交信息";return}A_.disabled=!0;let S=A_.textContent;A_.innerHTML='<span class="spin">↻</span> 提交中…';try{await f("POST","/fetch",{dir:P}).catch(()=>{return});let U=await f("GET",`/status?dir=${encodeURIComponent(P)}`),E=JSON.parse(U.body),A=E.behind??0;if(A>0){l.textContent=`远程有 ${A} 个新提交，先点下载合并后再提交`,B.textContent=`远程有 ${A} 个新提交可下载`,iT(E);return}l.textContent="提交…";let C=await f("POST","/commit",{dir:P,message:_,push:!0}),V=JSON.parse(C.body);if(!V.ok){l.textContent=V.error||"提交失败";return}l.textContent="跟远程核验中…",await f("POST","/fetch",{dir:P}).catch(()=>{return});let G=await f("GET",`/status?dir=${encodeURIComponent(P)}`),k=JSON.parse(G.body),M=k.ahead??0;if(M>0){l.textContent=`已提交但远程核验本地仍超前 ${M}推送可能没完全成功请检查`,iT(k);return}ST.value="",l.textContent="已提交并推送远程核验一致",gO()}catch(U){l.textContent=U instanceof D?`${U.code}`:"提交失败"}finally{A_.disabled=!1,A_.textContent=S,R_()}};Z("btn-ai").onclick=async()=>{if(!P)return;l.textContent="AI 生成中…";try{let _=await f("GET",`/status?dir=${encodeURIComponent(P)}`),S=JSON.parse(_.body),U=(G)=>G.trim()!==""&&G!=="?"&&G!==" ",E=(S.files??[]).filter((G)=>U(G.staged));if(E.length===0){l.textContent="先勾选要提交的文件";return}let A="";for(let G of E.slice(0,3)){try{let k=await f("GET",`/diff?dir=${encodeURIComponent(P)}&file=${encodeURIComponent(G.path)}&staged=1`),M=JSON.parse(k.body);if(M.ok&&M.diff)A+=`
--- ${G.path} ---
${M.diff.slice(0,2000)}`}catch{}if(A.length>6000)break}let C=E.map((G)=>`${G.staged}${G.unstaged} ${G.path}`).join(`
`).slice(0,1000),{text:V}=await z_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${C}${A.slice(0,6000)}`,maxOutputTokens:100});ST.value=V.trim(),l.textContent=`已按 ${E.length} 个勾选文件生成`}catch{l.textContent="无小模型或未授权 model"}};var M_=null;Z("btn-again").onclick=()=>{if(M_)clearTimeout(M_),M_=null;j_.hidden=!0};var gO=()=>{if(M_)clearTimeout(M_);j_.hidden=!1,M_=setTimeout(()=>{j_.hidden=!0,M_=null},2200),j_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let U=document.createElement("div");U.className="confetti",U.style.left=`${4+Math.random()*92}%`,U.style.background=_[S%_.length],U.style.animationDelay=`${Math.random()*0.5}s`,j_.appendChild(U)}};Z("btn-conflict-ok").onclick=()=>{eS.hidden=!0};z_.onResolve(async({args:_})=>{if(_.trim())ST.value=_.trim();return null});setInterval(()=>void f_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)f_()});Y_.onchange=()=>{if(!Y_.value)return;P=Y_.value,tS(),R_()};z_.onReady((_)=>{wT(_,document.documentElement);let S=_.directory??null;if(S!==P){if(P=S,!P){aT(!0);return}TO(P),tS(),R_()}});})();
