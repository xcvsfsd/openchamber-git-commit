(()=>{var P="openchamber.sdk",Y=1;var AT=`
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
`;function MS(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let U=new WeakMap;_.addEventListener("scroll",(M)=>{let E=M.target===_?S:M.target;if(!(E instanceof Element))return;if(!E.hasAttribute("data-oc-scrolling"))E.setAttribute("data-oc-scrolling","");let W=U.get(E);if(W!==void 0)clearTimeout(W);U.set(E,setTimeout(()=>{U.delete(E),E.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var OO=`(${MS.toString()})(document);`;var MT=128,RT=65536;var q_=128;var y_=65536;var DS=/^[a-z][a-z0-9-]{0,39}$/;var RS=(_)=>Object(_)===_&&!Array.isArray(_),GT=(_,S)=>Object.keys(_).every((U)=>S.includes(U)),GS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,XS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,IS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let U of _){if(!RS(U)||!DS.test(U.id)||!GS(U.label))return!1;if(U.disabled!==void 0&&U.disabled!==!0&&U.disabled!==!1)return!1;if(S.has(U.id))return!1;if(S.add(U.id),U.kind==="button"){if(!GT(U,["kind","id","label","disabled"]))return!1;continue}if(U.kind!=="select"||!GT(U,["kind","id","label","value","options","disabled"]))return!1;if(!XS(U.value)||!Array.isArray(U.options)||U.options.length<1||U.options.length>16)return!1;let M=new Set;for(let E of U.options){if(!RS(E)||!GT(E,["value","label"])||!XS(E.value)||!GS(E.label)||M.has(E.value))return!1;M.add(E.value)}if(!M.has(U.value))return!1}return!0};var CS=["{id}","{segment}","{segments+}"];var aO=new Set(CS);var VS=["turn-finished","turn-failed","permission-asked","question-asked"];var oO=new Set(VS);var h_=20000000,g_=256;var XT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,WS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let U=0;U<_.bytes.byteLength;U+=1)if(_.bytes[U]!==S.bytes[U])return!1;return!0};var NS=/^[A-Za-z0-9_-]{1,80}$/;var PS=["left","right","top","bottom"];var YS=(_,S=0,U={remaining:16000})=>{if(--U.remaining<0||S>=32)return!1;if(_===null)return!0;let M=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let E of M)if(!YS(E,S+1,U))return!1;return!0},DT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(DT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(DT)}return String(_)===_||Number.isFinite(_)},IT=(_)=>{try{if(String(_.id)!==_.id||!NS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!PS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!YS(_.data)||!DT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var ZS=["file","directory","other","missing"],VT=(_)=>Boolean(_&&"sessionId"in _),WT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var zS=/^[0-9a-f]{7,64}$/i,NT=(_)=>zS.test(_),m_=500,c_=32000,kS=16000,FS=128,JS=200,$S=2000,LS=16000,BS=80,KS=200,jS=16000;var fS=2000;var PT=20000,p_=1024,d_=2000000;var v_=64000,u_=8000,YT=4000;var QT=960000;var HS=999,wS=1e4,L_=500,xS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],bS=["stopped","starting","ready","failed"],EO=new Set(xS),qS=(_)=>EO.has(_),yS=(_)=>_&&qS(_)?_:"HOST_REJECTED",D_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(D_);if(Object(_)===_)return Object.values(_).every(D_);return!1},hS=(_)=>D_(_)&&JSON.stringify(_).length<=jS,QS=(_)=>_?.trim().slice(0,KS)??"",I_=(_)=>{let S=_.id.trim().slice(0,FS),U=_.title.trim().slice(0,JS),M=_.url.trim().slice(0,$S),E=_.text?.trim().slice(0,LS),W=_.author?.trim().slice(0,BS),N=_.kind==="pull"?"pull":"issue",I={providerId:_.providerId.trim(),id:S,title:U||S,url:M,kind:N};if(E)I.text=E;if(W)I.author=W;if(N==="pull"){let k=QS(_.branches?.head),A=QS(_.branches?.base);if(k&&A)I.branches={head:k,base:A}}if(hS(_.data))I.data=_.data;return I},ZT=(_)=>{let S=I_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},zT=(_)=>{let S={text:_.text.trim().slice(0,kS)};if(_.send)S.send=!0;return S},kT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(HS,Math.max(0,Math.round(_)))},FT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(wS,Math.max(0,Math.ceil(_)))};var C_=(_)=>_.length>0&&_.length<=p_&&!_.includes("\x00")&&!_.includes("\\");var l_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>fS)return!1;return!_.split("/").some((U)=>U==="."||U==="..")},AO=new Set(bS),JT=(_)=>Boolean(_&&"status"in _&&AO.has(String(_.status))&&!("body"in _)),n_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),$T=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),LT=(_)=>Boolean(_&&"written"in _&&_.written===!0),BT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),MO=new Set(ZS),KT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&MO.has(String(_.kind))&&Number.isFinite(_.size)),jT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),RO=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),GO=(_)=>Object(_)===_?_:null,CT=(_)=>String(_)===_&&_.length>0,XO=(_)=>{if(!CT(_.id))return null;if(_.ok===!0){let S={channel:P,v:Y,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&CT(_.error))return{channel:P,v:Y,type:"result",id:_.id,ok:!1,error:_.error,code:yS(CT(_.code)?_.code:void 0)};return null},fT=(_)=>{let S=GO(_);if(!S||S.channel!==P||S.v!==Y)return null;if(S.type==="result")return XO(S);if(!RO.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var gS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),DO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class X extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var mS=()=>Promise.reject(new X("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),a_=()=>Promise.reject(new X("BAD_PATH",`File path must be 1 to ${p_} characters without NUL or backslash.`)),i_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new X("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},V=(_)=>{return _.value+=1,`oc-${_.value}`},HT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new X("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let U=_.acceptSource??((T)=>T===S.parent),M=_.requestTimeoutMs??PT,E=new Set,W=new Set,N=new Set,I=new Set,k=new Set,A=new Set,B=new Set,T_=new Set,p=new Set,n=new Set,h=[],S_=null,O_=null,r=new Set,k_=new Set,d=null,R_=null,F_=!1,a=new Map,G_=new Map,X_=new Map,o=!1,C={value:0},D=null,s=null,J_=!1,$_=!1,oT=null,rT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},v=(T)=>{S.parent.postMessage(T,"*")},sT=()=>{if(o||S.parent===S||n.size===0||D?.features?.lateGenerateResults!==!0)return;v({channel:P,v:Y,type:"generate-late-listen"})},K=(T,O)=>{for(let R of T)try{R(O)}catch(G){console.error(G)}},tT=(T)=>{if(!(T instanceof MessageEvent))return;if(!U(T.source))return;let O=fT(T.data);if(!O)return;if(O.type==="workspace"){let G=G_.get(O.payload.subscriptionId);if(G)K([G],O.payload.snapshot);return}if(O.type==="shells"){let G=X_.get(O.payload.subscriptionId);if(G)K([G],O.payload.snapshot);return}if(O.type==="ready"){if(D=O.payload,s=rT(O.payload.session),K(E,O.payload),K(W,O.payload.directory),K(N,O.payload.session),s)K(I,s);K(k,O.payload.connection),K(A,O.payload.settings),K(B,O.payload.item),sT();return}if(O.type==="generate-late"){if(n.size===0)h.push(O.payload);else K(n,O.payload);return}if(O.type==="directory"){if(D)D={...D,directory:O.payload.directory};K(W,O.payload.directory);return}if(O.type==="session"){if(D)D={...D,session:O.payload.session};if(!O.payload.session)s=null;else if(s?.sessionId!==O.payload.session.id)s=rT(O.payload.session);K(N,O.payload.session);return}if(O.type==="session-lifecycle"){s=O.payload,K(I,O.payload);return}if(O.type==="connection"){if(D)D={...D,connection:O.payload.connection};K(k,O.payload.connection);return}if(O.type==="settings"){if(D)D={...D,settings:O.payload.settings};K(A,O.payload.settings);return}if(O.type==="item"){if(D)D={...D,item:O.payload.item};K(B,O.payload.item);return}if(O.type==="status-control-event"){K(T_,O.payload);return}if(O.type==="popover-closed"){K(p,O.payload);return}if(O.type==="action"){let G=(z)=>{if(!o)v({channel:P,v:Y,type:"action-result",id:O.id,payload:z})},F=O_;if(!F){G({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>F(O.payload)).then(()=>G({ok:!0}),(z)=>{let H=(z instanceof Error?z.message:String(z)).trim();G({ok:!1,error:(H||"Action failed.").slice(0,L_)})});return}if(O.type==="file-open"){let G=O.payload;if(R_&&WS(R_,G))return;R_=G,K(r,O.payload);return}if(O.type==="file-saved"){K(k_,O.payload.version);return}if(O.type==="file-snapshot"){let G=(H)=>{if(!o)v({channel:P,v:Y,type:"file-snapshot-result",id:O.id,payload:H})},F=(H)=>G({error:(H.trim()||"Could not read the edited file.").slice(0,L_)}),z=d;if(!z){F("This extension does not edit files.");return}Promise.resolve().then(()=>z(O.payload.purpose)).then((H)=>{if(XT(H)>h_){F(`The file is over ${h_} ${"bytes"in H?"bytes":"characters"}.`);return}if(H.version.length>g_){F(`The snapshot version is over ${g_} characters.`);return}G({snapshot:"bytes"in H?{bytes:H.bytes,version:H.version}:{content:H.content,version:H.version}})},(H)=>F(H instanceof Error?H.message:String(H)));return}if(O.type==="resolve"){let G=(z)=>{v({channel:P,v:Y,type:"resolve-result",id:O.id,payload:z})},F=S_;if(!F){G({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>F(O.payload)).then((z)=>G({item:z?I_(z):null}),(z)=>{let H=(z instanceof Error?z.message:String(z)).trim();G({error:(H||"Command failed.").slice(0,L_)})});return}let R=a.get(O.id);if(!R)return;if(clearTimeout(R.timer),a.delete(O.id),O.ok){R.resolve(O.payload);return}R.reject(new X(O.code,O.error))};S.addEventListener("message",tT),v({channel:P,v:Y,type:"hello"});let b=(T,O=M)=>{if(o||S.parent===S)return Promise.reject(new X("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,G)=>{let F=setTimeout(()=>{a.delete(T.id),G(new X("HOST_TIMEOUT","Host did not answer in time."))},O);a.set(T.id,{resolve:R,reject:G,timer:F}),v(T)})},j=(T)=>b(T).then(()=>{return}),f={channel:P,v:Y},OT=(T)=>{if(!o&&S.parent!==S)v(T)},eT=()=>OT({...f,type:"file-save"}),_S=(T)=>{if(!gS(T)||!DO(T))return;T.preventDefault(),eT()},TS=(T)=>{if(!gS(T)||T.key!=="Escape"||D?.surface!=="popover"||!D.popover)return;T.preventDefault(),ES(D.popover.id,"escape").catch(()=>{return})},w_=()=>{let T=D?.surface==="popover"?D.popover:void 0;if(!T)return;let O=J_||$_;if(oT===O)return;oT=O,AS(T.id,O).catch(()=>{return})},x_=()=>{if(D?.surface!=="popover"||J_)return;J_=!0,w_()},SS=(T)=>{if(D?.surface!=="popover"||T.relatedTarget!==null||!J_)return;J_=!1,w_()},OS=()=>{if(D?.surface!=="popover"||$_)return;$_=!0,w_()},US=()=>{if(D?.surface!=="popover"||!$_)return;$_=!1,w_()},i=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new X("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},UT=async(T)=>{if(T.kind!=="projects")i(T.projectId);let O=await b({...f,type:"workspace-read",id:V(C),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new X("HOST_REJECTED","Host did not return workspace data.");return O},ET=async(T,O)=>{if(T.kind!=="projects")i(T.projectId);let R=V(C);G_.set(R,O);try{await j({...f,type:"workspace-subscribe",id:V(C),payload:{subscriptionId:R,query:T}})}catch(G){if(G_.delete(R),!o)v({...f,type:"workspace-unsubscribe",id:V(C),payload:{subscriptionId:R}});throw G}return()=>{if(!G_.delete(R)||o)return;v({...f,type:"workspace-unsubscribe",id:V(C),payload:{subscriptionId:R}})}},SO=async(T,O)=>{if(T.kind==="session")i(T.sessionId);if(T.kind==="project")i(T.projectId);let R=V(C);X_.set(R,O);try{await j({...f,type:"shells-subscribe",id:V(C),payload:{subscriptionId:R,scope:T}})}catch(G){if(X_.delete(R),!o)v({...f,type:"shells-unsubscribe",id:V(C),payload:{subscriptionId:R}});throw G}return()=>{if(!X_.delete(R)||o)return;v({...f,type:"shells-unsubscribe",id:V(C),payload:{subscriptionId:R}})}},b_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>MT))throw new X("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!D_(T.value))throw new X("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>RT)throw new X("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&D?.features?.deviceStorage!==!0)throw new X("UNSUPPORTED","This host does not support device storage.");let O=await b({...f,type:"storage",id:V(C),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new X("HOST_REJECTED","Host did not return storage data.");return O},ES=(T,O)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new X("UNSUPPORTED","This host does not support popovers.")):j({...f,type:"popover-close",id:V(C),payload:O?{id:T,reason:O}:{id:T}}),AS=(T,O)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new X("UNSUPPORTED","This host does not support popovers.")):j({...f,type:"popover-anchor",id:V(C),payload:{id:T,active:O}});return S.addEventListener("keydown",TS,!0),S.addEventListener("pointerover",x_),S.addEventListener("pointermove",x_),S.addEventListener("pointerout",SS),S.addEventListener("focus",OS),S.addEventListener("blur",US),{onAction:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},listProjects:async()=>{let T=await UT({kind:"projects"});if(T.kind!=="projects")throw new X("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await UT({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new X("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await UT({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new X("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>ET({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>ET({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")O(R)}),onSessions:(T,O)=>ET({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")O(R)}),onRunningShells:(T,O)=>SO(T,O),readShellOutput:async(T,O)=>{i(T,q_);let R=O?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new X("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let G=O?.tailBytes;if(G!==void 0&&(!Number.isInteger(G)||G<1||G>y_))throw new X("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${y_}.`);let z=await b({...f,type:"shell-output",id:V(C),payload:{shellId:T,cursor:R,tailBytes:G}});if(!z||typeof z.output!=="string"||!Number.isFinite(z.cursor))throw new X("HOST_REJECTED","Host did not return shell output.");return z},stopShell:async(T)=>{if(i(T,q_),(await b({...f,type:"shell-stop",id:V(C),payload:{shellId:T}}))?.stopped!==!0)throw new X("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{i(T),await j({...f,type:"open-session",id:V(C),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let R=i_(O),G={op:"get",key:T};if(R)G.scope=R;let F=await b_(G);return F.op==="get"&&F.found?F.value:void 0},set:async(T,O,R)=>{let G=i_(R),F={op:"set",key:T,value:O};if(G)F.scope=G;await b_(F)},delete:async(T,O)=>{let R=i_(O),G={op:"delete",key:T};if(R)G.scope=R;await b_(G)},keys:async(T)=>{let O=i_(T),R={op:"keys"};if(O)R.scope=O;let G=await b_(R);if(G.op!=="keys")throw new X("HOST_REJECTED","Expected storage keys.");return G.keys}},onReady:(T)=>{if(E.add(T),D)T(D);return()=>{E.delete(T)}},onDirectory:(T)=>{if(W.add(T),D)T(D.directory);return()=>{W.delete(T)}},onSession:(T)=>{if(N.add(T),D)T(D.session);return()=>{N.delete(T)}},onSessionLifecycle:(T)=>{if(I.add(T),s)T(s);return()=>{I.delete(T)}},onConnection:(T)=>{if(k.add(T),D)T(D.connection);return()=>{k.delete(T)}},onSettings:(T)=>{if(A.add(T),D)T(D.settings);return()=>{A.delete(T)}},onItem:(T)=>{if(B.add(T),D)T(D.item);return()=>{B.delete(T)}},onStatusControl:(T)=>{return T_.add(T),()=>{T_.delete(T)}},onPopoverClosed:(T)=>{return p.add(T),()=>{p.delete(T)}},setStatusControls:(T)=>{if(D?.features?.statusControls!==!0)return Promise.reject(new X("UNSUPPORTED","This host does not support status controls."));if(!IS(T))return Promise.reject(new X("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return j({...f,type:"status-controls",id:V(C),payload:{controls:T}})},openPopover:(T)=>{if(D?.features?.popovers!==!0)return Promise.reject(new X("UNSUPPORTED","This host does not support popovers."));if(!IT(T))return Promise.reject(new X("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return j({...f,type:"popover-open",id:V(C),payload:T})},closePopover:ES,setPopoverAnchorActive:AS,onResolve:(T)=>{return S_=T,()=>{if(S_===T)S_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>m_)return Promise.reject(new X("HOST_REJECTED",`Toast message must contain 1 to ${m_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>c_))return Promise.reject(new X("HOST_REJECTED",`Toast copy text must contain 1 to ${c_} characters.`));return j({channel:P,v:Y,type:"toast",id:V(C),payload:{...T,message:O}})},openUrl:(T)=>j({channel:P,v:Y,type:"open-url",id:V(C),payload:{url:T}}),openCommit:(T)=>NT(T)?j({channel:P,v:Y,type:"open-commit",id:V(C),payload:{sha:T}}):Promise.reject(new X("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>j({channel:P,v:Y,type:"open-surface",id:V(C),payload:{surfaceId:T}}),writeClipboard:(T)=>j({channel:P,v:Y,type:"clipboard-write",id:V(C),payload:{text:T}}),compose:(T)=>j({channel:P,v:Y,type:"compose",id:V(C),payload:T}),attach:(T)=>j({channel:P,v:Y,type:"attach",id:V(C),payload:I_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)i(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")i(O.directory);else{if(O.name!==void 0)i(O.name,200);if(O.baseBranch!==void 0)i(O.baseBranch,200)}let R=await b({channel:P,v:Y,type:"start-session",id:V(C),payload:ZT(T)},_.requestTimeoutMs??180000);if(!VT(R))throw new X("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>b({channel:P,v:Y,type:"prompt",id:V(C),payload:zT(T)}).then((O)=>{if(!WT(O))throw new X("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>j({channel:P,v:Y,type:"session-link",id:V(C),payload:I_(T)}),close:()=>j({channel:P,v:Y,type:"close",id:V(C)}),oauthStart:()=>j({channel:P,v:Y,type:"oauth-start",id:V(C)}),oauthDisconnect:()=>j({channel:P,v:Y,type:"oauth-disconnect",id:V(C)}),request:(T)=>(l_(T.path)?b({channel:P,v:Y,type:"request",id:V(C),payload:T}):mS()).then((O)=>{if(!n_(O))throw new X("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(l_(T.path)?b({channel:P,v:Y,type:"service-request",id:V(C),payload:T}):mS()).then((O)=>{if(!n_(O))throw new X("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>b({channel:P,v:Y,type:"service-status",id:V(C)}).then((T)=>{if(!JT(T))throw new X("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(C_(T)?b({channel:P,v:Y,type:"file-read",id:V(C),payload:{path:T}}):a_()).then((O)=>{if(!$T(O))throw new X("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!C_(T))return a_();if(O.length>d_)return Promise.reject(new X("FILE_TOO_LARGE",`Content is over ${d_} characters.`));return b({channel:P,v:Y,type:"file-write",id:V(C),payload:{path:T,content:O}}).then((R)=>{if(!LT(R))throw new X("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(C_(T)?b({channel:P,v:Y,type:"file-list",id:V(C),payload:{path:T}}):a_()).then((O)=>{if(!BT(O))throw new X("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(C_(T)?b({channel:P,v:Y,type:"file-stat",id:V(C),payload:{path:T}}):a_()).then((O)=>{if(!KT(O))throw new X("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),R=T.system?.trim();if(O.length===0||O.length>v_)return Promise.reject(new X("HOST_REJECTED",`Prompt must be 1 to ${v_} characters.`));if(R!==void 0&&(R.length===0||R.length>u_))return Promise.reject(new X("HOST_REJECTED",`System prompt must be 1 to ${u_} characters.`));let G=T.maxOutputTokens===void 0?void 0:Math.min(YT,Math.max(1,Math.floor(T.maxOutputTokens)));if(G!==void 0&&!Number.isFinite(G))return Promise.reject(new X("HOST_REJECTED","maxOutputTokens must be a number."));let F={prompt:O};if(R!==void 0)F.system=R;if(G!==void 0)F.maxOutputTokens=G;return b({channel:P,v:Y,type:"generate",id:V(C),payload:F},_.requestTimeoutMs??QT).then((z)=>{if(!jT(z))throw new X("HOST_REJECTED","Host did not return generated text.");return z})},onLateGenerateResult:(T)=>{n.add(T);for(let O of h.splice(0))K([T],O);return sT(),()=>{n.delete(T)}},setBadge:(T)=>j({channel:P,v:Y,type:"badge",id:V(C),payload:{count:kT(T)}}),setHeight:(T)=>j({channel:P,v:Y,type:"resize",id:V(C),payload:{height:FT(T)}}),onFileOpen:(T)=>{if(r.add(T),!F_)F_=!0,S.addEventListener("keydown",_S,!0);if(R_)T(R_);return()=>{r.delete(T)}},onFileSnapshot:(T)=>{return d=T,()=>{if(d===T)d=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>OT({...f,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:eT,reportFileUnsupported:()=>OT({...f,type:"file-unsupported"}),dispose:()=>{for(let T of G_.keys())v({...f,type:"workspace-unsubscribe",id:V(C),payload:{subscriptionId:T}});G_.clear();for(let T of X_.keys())v({...f,type:"shells-unsubscribe",id:V(C),payload:{subscriptionId:T}});if(X_.clear(),o=!0,S_=null,O_=null,d=null,r.clear(),k_.clear(),F_)S.removeEventListener("keydown",_S,!0);S.removeEventListener("message",tT),S.removeEventListener("keydown",TS,!0),S.removeEventListener("pointerover",x_),S.removeEventListener("pointermove",x_),S.removeEventListener("pointerout",SS),S.removeEventListener("focus",OS),S.removeEventListener("blur",US);for(let T of a.values())clearTimeout(T.timer),T.reject(new X("HOST_UNAVAILABLE","Host client was disposed."));a.clear(),E.clear(),W.clear(),N.clear(),I.clear(),k.clear(),A.clear(),B.clear(),T_.clear(),p.clear(),n.clear(),h.length=0}}};var cS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var GU=new Set(cS);var pS=["none","agent","user"];var DU=new Set(pS);var IO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],CO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],dS=(_,S)=>{S.style.colorScheme=_.mode;for(let[U,M]of IO)S.style.setProperty(U,_.tokens[M]);for(let[U,M,E]of CO){let W=_.tokens[E]??"";S.style.setProperty(U,W),S.style.setProperty(M,W)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},wT=(_,S)=>{if(dS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var VO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},J=(_,S)=>`var(--${_}, var(--oc-${VO[_]}, ${S}))`,e=J("surface-background","transparent"),r_=J("surface-elevated","transparent"),V_=J("surface-elevated-foreground","inherit"),u=J("surface-foreground","inherit"),$=J("surface-muted-foreground","gray"),WO=J("surface-muted","transparent"),U_=J("interactive-border","currentColor"),g=J("interactive-hover","transparent"),E_=J("interactive-active","transparent"),xT=J("interactive-selection","transparent"),bT=J("interactive-selection-foreground","inherit"),t=J("primary","currentColor"),qT=J("primary-text","inherit"),yT=J("error-text","inherit"),NO=J("font-sans","inherit"),hT=J("font-mono","monospace"),nS=J("radius","9px"),gT=`calc(${nS} - 2px)`,vS=`calc(${nS} - 4px)`,L=(_,S,U="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${U})`,uS=`background-image: linear-gradient(${g}, ${g});`,mT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,cT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",lS="box-shadow: var(--oc-sdk-lit);",pT=`inset 0 0.5px 0 0 ${L(u,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,PO=`
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
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${J(`${_}-text`,"inherit")}; }`},YO=`
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
`,aS=`${PO}
.oc-sdk { color: ${u}; font-family: ${NO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${uS} }
.oc-sdk-mono { font-family: ${hT}; }
.oc-sdk-muted { color: ${$}; }
${o_("success")}${o_("warning")}${o_("error")}${o_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${qT}; }

.oc-sdk-btn { border-radius: ${gT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${vS}; }
.oc-sdk-btn[data-variant="default"] { color: ${qT}; background: ${L(t,10,e)}; border-color: ${L(t,12)}; ${lS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(t,16,e)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(t,22,e)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${WO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${E_}, ${E_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${V_}; ${cT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${E_}, ${E_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${g}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${E_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${J("status-error","red")}; color: ${yT}; background: ${L("var(--oc-sdk-tone)",7,e)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${lS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,e)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,e)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${yT}; }
.oc-sdk-input { border-radius: ${gT}; background: var(--oc-sdk-field-bg); color: ${V_}; ${mT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${mT(L(u,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${mT(J("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${hT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${t}; }
.oc-sdk-search-clear { border-radius: ${vS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${g}; color: ${u}; }

.oc-sdk-trigger { border-radius: ${gT}; background: var(--oc-sdk-raised-bg); color: ${V_}; ${cT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${E_}, ${E_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${V_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${r_}; background-clip: padding-box; color: ${V_}; box-shadow: var(--oc-sdk-float); }
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
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${uS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(u,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${u}; }
.oc-sdk-tab[aria-selected="true"] { color: ${bT}; background: ${xT}; border-color: ${U_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${V_}; background: var(--oc-sdk-raised-bg); ${cT} }
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
`,q=`
${AT}
${YO}
${aS}`;var Z_=HT(),rS=document.querySelector("#root");if(!rS)throw Error("Missing #root");rS.innerHTML=`
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
<select id="project" title="项目目录，默认当前项目"></select>
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
`;var Z=(_)=>document.querySelector(`#${_}`),P_=Z("project"),Y_=Z("branch"),y=Z("sync"),TT=Z("remote"),K_=Z("local"),ST=Z("msg"),l=Z("out"),FO=Z("topbar"),N_=Z("proj-name"),sS=()=>{let _=(Q??"").split("/").filter(Boolean).pop()??"";N_.textContent=_,N_.style.maxWidth="120px",N_.style.overflow="hidden",N_.style.textOverflow="ellipsis",N_.style.whiteSpace="nowrap",N_.style.flex="none"},JO=Z("h-remote"),$O=Z("h-local"),LO=Z("nongit"),BO=Z("commitBox"),j_=Z("done"),lT=new Set,iT=Z("confirm"),KO=Z("confirm-msg"),H_=null,vT=(_)=>{return KO.textContent=_,iT.hidden=!1,new Promise((S)=>{H_=S})};Z("confirm-ok").onclick=()=>{iT.hidden=!0,H_?.(!0),H_=null};Z("confirm-cancel").onclick=()=>{iT.hidden=!0,H_?.(!1),H_=null};var tS=Z("conflict"),iS=Z("conflict-list"),jO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),uT="",eS=(_)=>{let S=jO(_);if(S.length===0){uT="";return}let U=S.join(`
`);if(U===uT)return;uT=U,iS.innerHTML="";for(let M of S.slice(0,20)){let E=document.createElement("tr"),W=document.createElement("td");W.className="mono ellipsis",W.textContent=M,E.appendChild(W),iS.appendChild(E)}tS.hidden=!1},nT=(_)=>{LO.hidden=!_,FO.style.display=_?"none":"",y.style.display=_?"none":"",JO.style.display=_?"none":"",TT.style.display=_?"none":"",$O.style.display=_?"none":"",K_.style.display=_?"none":"",BO.style.display=_?"none":""},Q=null,Q_=!1,w=(_,S,U)=>Z_.serviceRequest({method:_,path:S,body:U===void 0?void 0:JSON.stringify(U)});var fO=async(_)=>{try{let S=await w("GET",`/projects?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||!U.projects)return;P_.innerHTML="";for(let M of U.projects){let E=document.createElement("option");if(E.value=M.path,E.textContent=_O(M),M.current)E.selected=!0;P_.appendChild(E)}}catch{}},oS="",_O=(_)=>{let S=_.behind??0,U=_.ahead??0;return`${_.current?"● ":""}${_.name}${_.branch?` ${_.branch}`:""}${S>0?` ↓${S}`:""}${U>0?` ↑${U}`:""}`},HO=async(_,S)=>{try{let U=await w("GET",`/branches?dir=${encodeURIComponent(_)}`),M=JSON.parse(U.body);if(!M.ok||!M.branches)return;let E=JSON.stringify([S,M.branches,M.remotes]);if(E===oS)return;oS=E,lT.clear();for(let N of M.remotes??[])lT.add(N.name);Y_.innerHTML="";let W=document.createElement("optgroup");W.label="本地分支";for(let N of M.branches){let I=document.createElement("option");if(I.value=N.name,I.textContent=`${N.current?"● ":""}${N.name}${(N.behind??0)>0?` ↓${N.behind}`:""}${!N.current&&(N.ahead??0)>0?` ↑${N.ahead}`:""}`,N.current)I.selected=!0;W.appendChild(I)}if(Y_.appendChild(W),M.remotes&&M.remotes.length>0){let N=document.createElement("optgroup");N.label="远程分支";for(let I of M.remotes){let k=document.createElement("option");k.value=I.name,k.textContent=I.name,N.appendChild(k)}Y_.appendChild(N)}}catch{}},aT=(_)=>{TT.innerHTML="";let U=(_.remoteLog??[]).slice(0,5);if(U.length===0){TT.innerHTML='<div class="mut">无远程分支记录</div>';return}let M=document.createElement("table");M.style.tableLayout="fixed";for(let E of U){let W=document.createElement("tr"),N=document.createElement("td");N.className="mono ellipsis",N.style.fontSize="12px";let I=E.downloaded!==!1,k=document.createElement("span");k.textContent=I?"● ":"○ ",k.style.color=I?x.green:x.amber;let A=document.createElement("span");A.className="mut",A.textContent=`${E.date} ${E.author} `;let B=document.createElement("span");if(B.textContent=E.subject,B.style.color=I?x.gray:"inherit",!I)B.style.fontWeight="700";N.title=`${E.subject} · ${E.author} ${E.date}（${I?"已下载":"未下载"}）`,N.append(k,A,B),W.appendChild(N),M.appendChild(W)}TT.appendChild(M)},x={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},wO=(_,S)=>{if(`${_}${S}`==="??")return x.purple;if(_==="U"||S==="U")return x.red;if(_==="D"||S==="D")return x.red;if(_==="A"||S==="A")return x.green;if(_==="R"||S==="R"||_==="C"||S==="C")return x.blue;if(_==="M"||S==="M")return x.amber;return x.gray},xO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let M="改动";if(_==="A"||S==="A")M="新增";else if(_==="D"||S==="D")M="删除";else if(_==="R"||S==="R")M="重命名";else if(_==="C"||S==="C")M="复制";else if(_==="T"||S==="T")M="类型变更";else if(_==="M"||S==="M")M="修改";return _!==" "&&_!=="?"&&_!=="!"?`${M}·已暂存`:M},TO=(_)=>{K_.innerHTML="";let S=_.files??[];if(S.length===0){let A=document.createElement("div");A.className="empty",A.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',K_.appendChild(A);return}let U=(A)=>A.trim()!==""&&A!=="?"&&A!==" ",M=S.every((A)=>U(A.staged)),E=document.createElement("div");E.className="selbar",E.onclick=(A)=>{if(A.target.tagName!=="INPUT")W.click()};let W=document.createElement("input");W.type="checkbox",W.checked=M,W.title=M?"全不选：取消全部暂存":"全选：暂存全部",W.onchange=async()=>{if(!Q){W.checked=!W.checked;return}if(W.checked){let A=S.filter((B)=>!U(B.staged)).map((B)=>B.path);if(A.length>0)await w("POST","/stage",{dir:Q,paths:A})}else{let A=S.filter((B)=>U(B.staged)).map((B)=>B.path);if(A.length>0)await w("POST","/unstage",{dir:Q,paths:A})}f_()};let N=document.createElement("span");N.className="mut";let I=S.filter((A)=>U(A.staged)).length;N.textContent=`全选 ${I}/${S.length}`,E.append(W,N),K_.appendChild(E);let k=document.createElement("table");for(let A of S){let B=document.createElement("tr"),T_=document.createElement("td");T_.style.width="28px";let p=document.createElement("input");p.type="checkbox",p.checked=A.staged.trim()!==""&&A.staged!=="?"&&A.staged!==" ",p.title=p.checked?"已暂存点取消":"未暂存点暂存",p.onchange=async()=>{if(!Q)return;await w("POST",p.checked?"/stage":"/unstage",{dir:Q,paths:[A.path]}),f_()},T_.appendChild(p);let n=document.createElement("td");n.className="mono ellipsis",n.textContent=A.path,n.title=`${A.path}（点切换勾选）`,n.onclick=()=>p.click();let h=document.createElement("td");h.style.width="92px",h.style.minWidth="92px",h.style.textAlign="right",h.style.whiteSpace="nowrap",h.style.fontSize="13px",h.className="mut";let S_=A.binary?`<span style="color:${x.gray}">二进制</span>`:A.add!==void 0?`<span style="color:${x.green}">+${A.add}</span> <span style="color:${x.red}">-${A.del??0}</span> `:"",O_=xO(A.staged,A.unstaged);h.innerHTML=`${S_}<span style="color:${wO(A.staged,A.unstaged)}">${O_}</span>`,h.title=h.textContent??"";let r=document.createElement("td");if(r.style.width="30px",r.style.textAlign="right",!(A.staged==="U"||A.unstaged==="U")){let d=document.createElement("button");d.textContent="↩ 还原",d.title="还原：丢弃该文件本地改动",d.className="icon",d.onclick=async()=>{if(!Q)return;if(A.staged==="?"||A.staged==="A"){if(!await vT(`确定丢弃 ${A.path} 的本地内容吗？删除后不可恢复`))return;if(!await vT(`再次确认：真的删除 ${A.path} 吗？`))return}d.disabled=!0;let F_=await w("POST","/restore",{dir:Q,paths:[A.path],confirmed:!0}),a=JSON.parse(F_.body);if(!a.ok&&a.error==="need-confirm"){if(await vT(`确定删除未跟踪的 ${A.path} 吗？`))await w("POST","/restore",{dir:Q,paths:[A.path],confirmed:!0})}else if(!a.ok)l.textContent=a.error||"还原失败";d.disabled=!1,f_()},r.appendChild(d)}B.append(T_,n,h,r),k.appendChild(B)}K_.appendChild(k)},bO=(_,S)=>{HO(S,_.branch??"")},qO=(_)=>{let S=[...P_.options].find((U)=>U.value===Q);if(!S)return;S.textContent=_O({name:S.textContent.replace(/^\u25cf /,"").split(" ")[0]??"",branch:_.branch??void 0,ahead:_.ahead,behind:_.behind,current:!0})},yO=(_)=>{let S=_.ahead??0,U=_.behind??0;if(U>0&&S>0)y.textContent=`远程 ${U} 个新，本地超前 ${S}`,y.style.color=x.amber;else if(U>0)y.textContent=`远程有 ${U} 个新提交，可下载`,y.style.color=x.amber;else if(S>0)y.textContent=`本地超前 ${S}可推送`,y.style.color=x.blue;else y.textContent="已是最新",y.style.color=x.green;Z_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},z_=async()=>{if(!Q||Q_)return;Q_=!0;let _=Q;y.textContent="同步中…";try{await w("POST","/fetch",{dir:_}).catch(()=>{return});let S=await w("GET",`/status?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||U.branch===void 0){nT(!0);return}nT(!1),yO(U),qO(U),bO(U,_),aT(U),TO(U),eS(U)}catch(S){y.textContent=S instanceof X?`${S.code}`:"同步失败"}finally{Q_=!1}},f_=async()=>{if(!Q||Q_||document.hidden)return;Q_=!0;try{let _=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),S=JSON.parse(_.body);if(!S.ok)return;TO(S),eS(S),Z_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{Q_=!1}};Z("btn-refresh").onclick=()=>void z_();Z("btn-pull").onclick=async()=>{if(!Q)return;y.textContent="下载中…";try{await w("POST","/pull",{dir:Q})}catch{}z_()};Y_.onchange=async()=>{if(!Q||!Y_.value)return;let _=Y_.value,S=lT.has(_),U=S?_.slice(_.indexOf("/")+1):_;y.textContent=S?`新建跟踪分支 ${U}…`:`切换到 ${_}…`;let M=await w("POST","/checkout",S?{dir:Q,branch:U,create:!0,base:_}:{dir:Q,branch:_}),E=JSON.parse(M.body);if(!E.ok)y.textContent=E.output||E.error||"切换失败";z_()};var A_=Z("btn-commit");A_.onclick=async()=>{if(!Q||A_.disabled)return;let _=ST.value.trim();if(!_){l.textContent="先写提交信息";return}A_.disabled=!0;let S=A_.textContent;A_.innerHTML='<span class="spin">↻</span> 提交中…';try{await w("POST","/fetch",{dir:Q}).catch(()=>{return});let U=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),M=JSON.parse(U.body),E=M.behind??0;if(E>0){l.textContent=`远程有 ${E} 个新提交，先点下载合并后再提交`,y.textContent=`远程有 ${E} 个新提交可下载`,aT(M);return}l.textContent="提交…";let W=await w("POST","/commit",{dir:Q,message:_,push:!0}),N=JSON.parse(W.body);if(!N.ok){l.textContent=N.error||"提交失败";return}l.textContent="跟远程核验中…",await w("POST","/fetch",{dir:Q}).catch(()=>{return});let I=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),k=JSON.parse(I.body),A=k.ahead??0;if(A>0){l.textContent=`已提交但远程核验本地仍超前 ${A}推送可能没完全成功请检查`,aT(k);return}ST.value="",l.textContent="已提交并推送远程核验一致",hO()}catch(U){l.textContent=U instanceof X?`${U.code}`:"提交失败"}finally{A_.disabled=!1,A_.textContent=S,z_()}};Z("btn-ai").onclick=async()=>{if(!Q)return;l.textContent="AI 生成中…";try{let _=await w("GET",`/status?dir=${encodeURIComponent(Q)}`),S=JSON.parse(_.body),U=(I)=>I.trim()!==""&&I!=="?"&&I!==" ",M=(S.files??[]).filter((I)=>U(I.staged));if(M.length===0){l.textContent="先勾选要提交的文件";return}let E="";for(let I of M.slice(0,3)){try{let k=await w("GET",`/diff?dir=${encodeURIComponent(Q)}&file=${encodeURIComponent(I.path)}&staged=1`),A=JSON.parse(k.body);if(A.ok&&A.diff)E+=`
--- ${I.path} ---
${A.diff.slice(0,2000)}`}catch{}if(E.length>6000)break}let W=M.map((I)=>`${I.staged}${I.unstaged} ${I.path}`).join(`
`).slice(0,1000),{text:N}=await Z_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${S.branch}
已选文件：
${W}${E.slice(0,6000)}`,maxOutputTokens:100});ST.value=N.trim(),l.textContent=`已按 ${M.length} 个勾选文件生成`}catch{l.textContent="无小模型或未授权 model"}};var M_=null;Z("btn-again").onclick=()=>{if(M_)clearTimeout(M_),M_=null;j_.hidden=!0};var hO=()=>{if(M_)clearTimeout(M_);j_.hidden=!1,M_=setTimeout(()=>{j_.hidden=!0,M_=null},2200),j_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let U=document.createElement("div");U.className="confetti",U.style.left=`${4+Math.random()*92}%`,U.style.background=_[S%_.length],U.style.animationDelay=`${Math.random()*0.5}s`,j_.appendChild(U)}};Z("btn-conflict-ok").onclick=()=>{tS.hidden=!0};Z_.onResolve(async({args:_})=>{if(_.trim())ST.value=_.trim();return null});setInterval(()=>void f_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)f_()});P_.onchange=()=>{if(!P_.value)return;Q=P_.value,sS(),z_()};Z_.onReady((_)=>{wT(_,document.documentElement);let S=_.directory??null;if(S!==Q){if(Q=S,!Q){nT(!0);return}fO(Q),sS(),z_()}});})();
