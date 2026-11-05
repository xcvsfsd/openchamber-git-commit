(()=>{var P="openchamber.sdk",Q=1;var AT=`
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
`;function XS(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let U=new WeakMap;_.addEventListener("scroll",(E)=>{let M=E.target===_?S:E.target;if(!(M instanceof Element))return;if(!M.hasAttribute("data-oc-scrolling"))M.setAttribute("data-oc-scrolling","");let I=U.get(M);if(I!==void 0)clearTimeout(I);U.set(M,setTimeout(()=>{U.delete(M),M.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var MO=`(${XS.toString()})(document);`;var MT=128,RT=65536;var y_=128;var h_=65536;var VS=/^[a-z][a-z0-9-]{0,39}$/;var DS=(_)=>Object(_)===_&&!Array.isArray(_),GT=(_,S)=>Object.keys(_).every((U)=>S.includes(U)),IS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,CS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,WS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let U of _){if(!DS(U)||!VS.test(U.id)||!IS(U.label))return!1;if(U.disabled!==void 0&&U.disabled!==!0&&U.disabled!==!1)return!1;if(S.has(U.id))return!1;if(S.add(U.id),U.kind==="button"){if(!GT(U,["kind","id","label","disabled"]))return!1;continue}if(U.kind!=="select"||!GT(U,["kind","id","label","value","options","disabled"]))return!1;if(!CS(U.value)||!Array.isArray(U.options)||U.options.length<1||U.options.length>16)return!1;let E=new Set;for(let M of U.options){if(!DS(M)||!GT(M,["value","label"])||!CS(M.value)||!IS(M.label)||E.has(M.value))return!1;E.add(M.value)}if(!E.has(U.value))return!1}return!0};var NS=["{id}","{segment}","{segments+}"];var rO=new Set(NS);var YS=["turn-finished","turn-failed","permission-asked","question-asked"];var tO=new Set(YS);var g_=20000000,m_=256;var XT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,PS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let U=0;U<_.bytes.byteLength;U+=1)if(_.bytes[U]!==S.bytes[U])return!1;return!0};var QS=/^[A-Za-z0-9_-]{1,80}$/;var ZS=["left","right","top","bottom"];var zS=(_,S=0,U={remaining:16000})=>{if(--U.remaining<0||S>=32)return!1;if(_===null)return!0;let E=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let M of E)if(!zS(M,S+1,U))return!1;return!0},DT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(DT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(DT)}return String(_)===_||Number.isFinite(_)},IT=(_)=>{try{if(String(_.id)!==_.id||!QS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!ZS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!zS(_.data)||!DT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var FS=["file","directory","other","missing"],VT=(_)=>Boolean(_&&"sessionId"in _),WT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var JS=/^[0-9a-f]{7,64}$/i,NT=(_)=>JS.test(_),c_=500,p_=32000,$S=16000,LS=128,BS=200,KS=2000,fS=16000,jS=80,HS=200,wS=16000;var xS=2000;var YT=20000,v_=1024,d_=2000000;var u_=64000,l_=8000,PT=4000;var QT=960000;var bS=999,qS=1e4,L_=500,yS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],hS=["stopped","starting","ready","failed"],GO=new Set(yS),gS=(_)=>GO.has(_),mS=(_)=>_&&gS(_)?_:"HOST_REJECTED",C_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(C_);if(Object(_)===_)return Object.values(_).every(C_);return!1},cS=(_)=>C_(_)&&JSON.stringify(_).length<=wS,kS=(_)=>_?.trim().slice(0,HS)??"",V_=(_)=>{let S=_.id.trim().slice(0,LS),U=_.title.trim().slice(0,BS),E=_.url.trim().slice(0,KS),M=_.text?.trim().slice(0,fS),I=_.author?.trim().slice(0,jS),C=_.kind==="pull"?"pull":"issue",V={providerId:_.providerId.trim(),id:S,title:U||S,url:E,kind:C};if(M)V.text=M;if(I)V.author=I;if(C==="pull"){let z=kS(_.branches?.head),A=kS(_.branches?.base);if(z&&A)V.branches={head:z,base:A}}if(cS(_.data))V.data=_.data;return V},ZT=(_)=>{let S=V_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},zT=(_)=>{let S={text:_.text.trim().slice(0,$S)};if(_.send)S.send=!0;return S},kT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(bS,Math.max(0,Math.round(_)))},FT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(qS,Math.max(0,Math.ceil(_)))};var W_=(_)=>_.length>0&&_.length<=v_&&!_.includes("\x00")&&!_.includes("\\");var n_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>xS)return!1;return!_.split("/").some((U)=>U==="."||U==="..")},XO=new Set(hS),JT=(_)=>Boolean(_&&"status"in _&&XO.has(String(_.status))&&!("body"in _)),a_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),$T=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),LT=(_)=>Boolean(_&&"written"in _&&_.written===!0),BT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),DO=new Set(FS),KT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&DO.has(String(_.kind))&&Number.isFinite(_.size)),fT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),IO=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),CO=(_)=>Object(_)===_?_:null,CT=(_)=>String(_)===_&&_.length>0,VO=(_)=>{if(!CT(_.id))return null;if(_.ok===!0){let S={channel:P,v:Q,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&CT(_.error))return{channel:P,v:Q,type:"result",id:_.id,ok:!1,error:_.error,code:mS(CT(_.code)?_.code:void 0)};return null},jT=(_)=>{let S=CO(_);if(!S||S.channel!==P||S.v!==Q)return null;if(S.type==="result")return VO(S);if(!IO.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var pS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),WO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class X extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var vS=()=>Promise.reject(new X("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),i_=()=>Promise.reject(new X("BAD_PATH",`File path must be 1 to ${v_} characters without NUL or backslash.`)),o_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new X("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},N=(_)=>{return _.value+=1,`oc-${_.value}`},HT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new X("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let U=_.acceptSource??((T)=>T===S.parent),E=_.requestTimeoutMs??YT,M=new Set,I=new Set,C=new Set,V=new Set,z=new Set,A=new Set,k=new Set,n=new Set,v=new Set,a=new Set,h=[],O_=null,U_=null,s=new Set,k_=new Set,d=null,X_=null,F_=!1,i=new Map,D_=new Map,I_=new Map,r=!1,W={value:0},D=null,t=null,J_=!1,$_=!1,tT=null,eT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},u=(T)=>{S.parent.postMessage(T,"*")},_S=()=>{if(r||S.parent===S||a.size===0||D?.features?.lateGenerateResults!==!0)return;u({channel:P,v:Q,type:"generate-late-listen"})},f=(T,O)=>{for(let R of T)try{R(O)}catch(G){console.error(G)}},TS=(T)=>{if(!(T instanceof MessageEvent))return;if(!U(T.source))return;let O=jT(T.data);if(!O)return;if(O.type==="workspace"){let G=D_.get(O.payload.subscriptionId);if(G)f([G],O.payload.snapshot);return}if(O.type==="shells"){let G=I_.get(O.payload.subscriptionId);if(G)f([G],O.payload.snapshot);return}if(O.type==="ready"){if(D=O.payload,t=eT(O.payload.session),f(M,O.payload),f(I,O.payload.directory),f(C,O.payload.session),t)f(V,t);f(z,O.payload.connection),f(A,O.payload.settings),f(k,O.payload.item),_S();return}if(O.type==="generate-late"){if(a.size===0)h.push(O.payload);else f(a,O.payload);return}if(O.type==="directory"){if(D)D={...D,directory:O.payload.directory};f(I,O.payload.directory);return}if(O.type==="session"){if(D)D={...D,session:O.payload.session};if(!O.payload.session)t=null;else if(t?.sessionId!==O.payload.session.id)t=eT(O.payload.session);f(C,O.payload.session);return}if(O.type==="session-lifecycle"){t=O.payload,f(V,O.payload);return}if(O.type==="connection"){if(D)D={...D,connection:O.payload.connection};f(z,O.payload.connection);return}if(O.type==="settings"){if(D)D={...D,settings:O.payload.settings};f(A,O.payload.settings);return}if(O.type==="item"){if(D)D={...D,item:O.payload.item};f(k,O.payload.item);return}if(O.type==="status-control-event"){f(n,O.payload);return}if(O.type==="popover-closed"){f(v,O.payload);return}if(O.type==="action"){let G=(F)=>{if(!r)u({channel:P,v:Q,type:"action-result",id:O.id,payload:F})},J=U_;if(!J){G({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>J(O.payload)).then(()=>G({ok:!0}),(F)=>{let b=(F instanceof Error?F.message:String(F)).trim();G({ok:!1,error:(b||"Action failed.").slice(0,L_)})});return}if(O.type==="file-open"){let G=O.payload;if(X_&&PS(X_,G))return;X_=G,f(s,O.payload);return}if(O.type==="file-saved"){f(k_,O.payload.version);return}if(O.type==="file-snapshot"){let G=(b)=>{if(!r)u({channel:P,v:Q,type:"file-snapshot-result",id:O.id,payload:b})},J=(b)=>G({error:(b.trim()||"Could not read the edited file.").slice(0,L_)}),F=d;if(!F){J("This extension does not edit files.");return}Promise.resolve().then(()=>F(O.payload.purpose)).then((b)=>{if(XT(b)>g_){J(`The file is over ${g_} ${"bytes"in b?"bytes":"characters"}.`);return}if(b.version.length>m_){J(`The snapshot version is over ${m_} characters.`);return}G({snapshot:"bytes"in b?{bytes:b.bytes,version:b.version}:{content:b.content,version:b.version}})},(b)=>J(b instanceof Error?b.message:String(b)));return}if(O.type==="resolve"){let G=(F)=>{u({channel:P,v:Q,type:"resolve-result",id:O.id,payload:F})},J=O_;if(!J){G({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>J(O.payload)).then((F)=>G({item:F?V_(F):null}),(F)=>{let b=(F instanceof Error?F.message:String(F)).trim();G({error:(b||"Command failed.").slice(0,L_)})});return}let R=i.get(O.id);if(!R)return;if(clearTimeout(R.timer),i.delete(O.id),O.ok){R.resolve(O.payload);return}R.reject(new X(O.code,O.error))};S.addEventListener("message",TS),u({channel:P,v:Q,type:"hello"});let q=(T,O=E)=>{if(r||S.parent===S)return Promise.reject(new X("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,G)=>{let J=setTimeout(()=>{i.delete(T.id),G(new X("HOST_TIMEOUT","Host did not answer in time."))},O);i.set(T.id,{resolve:R,reject:G,timer:J}),u(T)})},w=(T)=>q(T).then(()=>{return}),x={channel:P,v:Q},OT=(T)=>{if(!r&&S.parent!==S)u(T)},SS=()=>OT({...x,type:"file-save"}),OS=(T)=>{if(!pS(T)||!WO(T))return;T.preventDefault(),SS()},US=(T)=>{if(!pS(T)||T.key!=="Escape"||D?.surface!=="popover"||!D.popover)return;T.preventDefault(),RS(D.popover.id,"escape").catch(()=>{return})},x_=()=>{let T=D?.surface==="popover"?D.popover:void 0;if(!T)return;let O=J_||$_;if(tT===O)return;tT=O,GS(T.id,O).catch(()=>{return})},b_=()=>{if(D?.surface!=="popover"||J_)return;J_=!0,x_()},ES=(T)=>{if(D?.surface!=="popover"||T.relatedTarget!==null||!J_)return;J_=!1,x_()},AS=()=>{if(D?.surface!=="popover"||$_)return;$_=!0,x_()},MS=()=>{if(D?.surface!=="popover"||!$_)return;$_=!1,x_()},o=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new X("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},UT=async(T)=>{if(T.kind!=="projects")o(T.projectId);let O=await q({...x,type:"workspace-read",id:N(W),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new X("HOST_REJECTED","Host did not return workspace data.");return O},ET=async(T,O)=>{if(T.kind!=="projects")o(T.projectId);let R=N(W);D_.set(R,O);try{await w({...x,type:"workspace-subscribe",id:N(W),payload:{subscriptionId:R,query:T}})}catch(G){if(D_.delete(R),!r)u({...x,type:"workspace-unsubscribe",id:N(W),payload:{subscriptionId:R}});throw G}return()=>{if(!D_.delete(R)||r)return;u({...x,type:"workspace-unsubscribe",id:N(W),payload:{subscriptionId:R}})}},AO=async(T,O)=>{if(T.kind==="session")o(T.sessionId);if(T.kind==="project")o(T.projectId);let R=N(W);I_.set(R,O);try{await w({...x,type:"shells-subscribe",id:N(W),payload:{subscriptionId:R,scope:T}})}catch(G){if(I_.delete(R),!r)u({...x,type:"shells-unsubscribe",id:N(W),payload:{subscriptionId:R}});throw G}return()=>{if(!I_.delete(R)||r)return;u({...x,type:"shells-unsubscribe",id:N(W),payload:{subscriptionId:R}})}},q_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>MT))throw new X("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!C_(T.value))throw new X("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>RT)throw new X("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&D?.features?.deviceStorage!==!0)throw new X("UNSUPPORTED","This host does not support device storage.");let O=await q({...x,type:"storage",id:N(W),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new X("HOST_REJECTED","Host did not return storage data.");return O},RS=(T,O)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new X("UNSUPPORTED","This host does not support popovers.")):w({...x,type:"popover-close",id:N(W),payload:O?{id:T,reason:O}:{id:T}}),GS=(T,O)=>D?.features?.popovers!==!0&&!(D?.surface==="popover"&&D.popover?.id===T)?Promise.reject(new X("UNSUPPORTED","This host does not support popovers.")):w({...x,type:"popover-anchor",id:N(W),payload:{id:T,active:O}});return S.addEventListener("keydown",US,!0),S.addEventListener("pointerover",b_),S.addEventListener("pointermove",b_),S.addEventListener("pointerout",ES),S.addEventListener("focus",AS),S.addEventListener("blur",MS),{onAction:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},listProjects:async()=>{let T=await UT({kind:"projects"});if(T.kind!=="projects")throw new X("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await UT({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new X("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await UT({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new X("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>ET({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>ET({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")O(R)}),onSessions:(T,O)=>ET({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")O(R)}),onRunningShells:(T,O)=>AO(T,O),readShellOutput:async(T,O)=>{o(T,y_);let R=O?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new X("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let G=O?.tailBytes;if(G!==void 0&&(!Number.isInteger(G)||G<1||G>h_))throw new X("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${h_}.`);let F=await q({...x,type:"shell-output",id:N(W),payload:{shellId:T,cursor:R,tailBytes:G}});if(!F||typeof F.output!=="string"||!Number.isFinite(F.cursor))throw new X("HOST_REJECTED","Host did not return shell output.");return F},stopShell:async(T)=>{if(o(T,y_),(await q({...x,type:"shell-stop",id:N(W),payload:{shellId:T}}))?.stopped!==!0)throw new X("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{o(T),await w({...x,type:"open-session",id:N(W),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let R=o_(O),G={op:"get",key:T};if(R)G.scope=R;let J=await q_(G);return J.op==="get"&&J.found?J.value:void 0},set:async(T,O,R)=>{let G=o_(R),J={op:"set",key:T,value:O};if(G)J.scope=G;await q_(J)},delete:async(T,O)=>{let R=o_(O),G={op:"delete",key:T};if(R)G.scope=R;await q_(G)},keys:async(T)=>{let O=o_(T),R={op:"keys"};if(O)R.scope=O;let G=await q_(R);if(G.op!=="keys")throw new X("HOST_REJECTED","Expected storage keys.");return G.keys}},onReady:(T)=>{if(M.add(T),D)T(D);return()=>{M.delete(T)}},onDirectory:(T)=>{if(I.add(T),D)T(D.directory);return()=>{I.delete(T)}},onSession:(T)=>{if(C.add(T),D)T(D.session);return()=>{C.delete(T)}},onSessionLifecycle:(T)=>{if(V.add(T),t)T(t);return()=>{V.delete(T)}},onConnection:(T)=>{if(z.add(T),D)T(D.connection);return()=>{z.delete(T)}},onSettings:(T)=>{if(A.add(T),D)T(D.settings);return()=>{A.delete(T)}},onItem:(T)=>{if(k.add(T),D)T(D.item);return()=>{k.delete(T)}},onStatusControl:(T)=>{return n.add(T),()=>{n.delete(T)}},onPopoverClosed:(T)=>{return v.add(T),()=>{v.delete(T)}},setStatusControls:(T)=>{if(D?.features?.statusControls!==!0)return Promise.reject(new X("UNSUPPORTED","This host does not support status controls."));if(!WS(T))return Promise.reject(new X("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...x,type:"status-controls",id:N(W),payload:{controls:T}})},openPopover:(T)=>{if(D?.features?.popovers!==!0)return Promise.reject(new X("UNSUPPORTED","This host does not support popovers."));if(!IT(T))return Promise.reject(new X("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...x,type:"popover-open",id:N(W),payload:T})},closePopover:RS,setPopoverAnchorActive:GS,onResolve:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>c_)return Promise.reject(new X("HOST_REJECTED",`Toast message must contain 1 to ${c_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>p_))return Promise.reject(new X("HOST_REJECTED",`Toast copy text must contain 1 to ${p_} characters.`));return w({channel:P,v:Q,type:"toast",id:N(W),payload:{...T,message:O}})},openUrl:(T)=>w({channel:P,v:Q,type:"open-url",id:N(W),payload:{url:T}}),openCommit:(T)=>NT(T)?w({channel:P,v:Q,type:"open-commit",id:N(W),payload:{sha:T}}):Promise.reject(new X("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>w({channel:P,v:Q,type:"open-surface",id:N(W),payload:{surfaceId:T}}),writeClipboard:(T)=>w({channel:P,v:Q,type:"clipboard-write",id:N(W),payload:{text:T}}),compose:(T)=>w({channel:P,v:Q,type:"compose",id:N(W),payload:T}),attach:(T)=>w({channel:P,v:Q,type:"attach",id:N(W),payload:V_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)o(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")o(O.directory);else{if(O.name!==void 0)o(O.name,200);if(O.baseBranch!==void 0)o(O.baseBranch,200)}let R=await q({channel:P,v:Q,type:"start-session",id:N(W),payload:ZT(T)},_.requestTimeoutMs??180000);if(!VT(R))throw new X("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>q({channel:P,v:Q,type:"prompt",id:N(W),payload:zT(T)}).then((O)=>{if(!WT(O))throw new X("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>w({channel:P,v:Q,type:"session-link",id:N(W),payload:V_(T)}),close:()=>w({channel:P,v:Q,type:"close",id:N(W)}),oauthStart:()=>w({channel:P,v:Q,type:"oauth-start",id:N(W)}),oauthDisconnect:()=>w({channel:P,v:Q,type:"oauth-disconnect",id:N(W)}),request:(T)=>(n_(T.path)?q({channel:P,v:Q,type:"request",id:N(W),payload:T}):vS()).then((O)=>{if(!a_(O))throw new X("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(n_(T.path)?q({channel:P,v:Q,type:"service-request",id:N(W),payload:T}):vS()).then((O)=>{if(!a_(O))throw new X("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>q({channel:P,v:Q,type:"service-status",id:N(W)}).then((T)=>{if(!JT(T))throw new X("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(W_(T)?q({channel:P,v:Q,type:"file-read",id:N(W),payload:{path:T}}):i_()).then((O)=>{if(!$T(O))throw new X("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!W_(T))return i_();if(O.length>d_)return Promise.reject(new X("FILE_TOO_LARGE",`Content is over ${d_} characters.`));return q({channel:P,v:Q,type:"file-write",id:N(W),payload:{path:T,content:O}}).then((R)=>{if(!LT(R))throw new X("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(W_(T)?q({channel:P,v:Q,type:"file-list",id:N(W),payload:{path:T}}):i_()).then((O)=>{if(!BT(O))throw new X("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(W_(T)?q({channel:P,v:Q,type:"file-stat",id:N(W),payload:{path:T}}):i_()).then((O)=>{if(!KT(O))throw new X("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),R=T.system?.trim();if(O.length===0||O.length>u_)return Promise.reject(new X("HOST_REJECTED",`Prompt must be 1 to ${u_} characters.`));if(R!==void 0&&(R.length===0||R.length>l_))return Promise.reject(new X("HOST_REJECTED",`System prompt must be 1 to ${l_} characters.`));let G=T.maxOutputTokens===void 0?void 0:Math.min(PT,Math.max(1,Math.floor(T.maxOutputTokens)));if(G!==void 0&&!Number.isFinite(G))return Promise.reject(new X("HOST_REJECTED","maxOutputTokens must be a number."));let J={prompt:O};if(R!==void 0)J.system=R;if(G!==void 0)J.maxOutputTokens=G;return q({channel:P,v:Q,type:"generate",id:N(W),payload:J},_.requestTimeoutMs??QT).then((F)=>{if(!fT(F))throw new X("HOST_REJECTED","Host did not return generated text.");return F})},onLateGenerateResult:(T)=>{a.add(T);for(let O of h.splice(0))f([T],O);return _S(),()=>{a.delete(T)}},setBadge:(T)=>w({channel:P,v:Q,type:"badge",id:N(W),payload:{count:kT(T)}}),setHeight:(T)=>w({channel:P,v:Q,type:"resize",id:N(W),payload:{height:FT(T)}}),onFileOpen:(T)=>{if(s.add(T),!F_)F_=!0,S.addEventListener("keydown",OS,!0);if(X_)T(X_);return()=>{s.delete(T)}},onFileSnapshot:(T)=>{return d=T,()=>{if(d===T)d=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>OT({...x,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:SS,reportFileUnsupported:()=>OT({...x,type:"file-unsupported"}),dispose:()=>{for(let T of D_.keys())u({...x,type:"workspace-unsubscribe",id:N(W),payload:{subscriptionId:T}});D_.clear();for(let T of I_.keys())u({...x,type:"shells-unsubscribe",id:N(W),payload:{subscriptionId:T}});if(I_.clear(),r=!0,O_=null,U_=null,d=null,s.clear(),k_.clear(),F_)S.removeEventListener("keydown",OS,!0);S.removeEventListener("message",TS),S.removeEventListener("keydown",US,!0),S.removeEventListener("pointerover",b_),S.removeEventListener("pointermove",b_),S.removeEventListener("pointerout",ES),S.removeEventListener("focus",AS),S.removeEventListener("blur",MS);for(let T of i.values())clearTimeout(T.timer),T.reject(new X("HOST_UNAVAILABLE","Host client was disposed."));i.clear(),M.clear(),I.clear(),C.clear(),V.clear(),z.clear(),A.clear(),k.clear(),n.clear(),v.clear(),a.clear(),h.length=0}}};var dS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var IU=new Set(dS);var uS=["none","agent","user"];var VU=new Set(uS);var NO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],YO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],lS=(_,S)=>{S.style.colorScheme=_.mode;for(let[U,E]of NO)S.style.setProperty(U,_.tokens[E]);for(let[U,E,M]of YO){let I=_.tokens[M]??"";S.style.setProperty(U,I),S.style.setProperty(E,I)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},wT=(_,S)=>{if(lS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var PO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(_,S)=>`var(--${_}, var(--oc-${PO[_]}, ${S}))`,__=$("surface-background","transparent"),s_=$("surface-elevated","transparent"),N_=$("surface-elevated-foreground","inherit"),l=$("surface-foreground","inherit"),L=$("surface-muted-foreground","gray"),QO=$("surface-muted","transparent"),E_=$("interactive-border","currentColor"),g=$("interactive-hover","transparent"),A_=$("interactive-active","transparent"),xT=$("interactive-selection","transparent"),bT=$("interactive-selection-foreground","inherit"),e=$("primary","currentColor"),qT=$("primary-text","inherit"),yT=$("error-text","inherit"),ZO=$("font-sans","inherit"),hT=$("font-mono","monospace"),oS=$("radius","9px"),gT=`calc(${oS} - 2px)`,nS=`calc(${oS} - 4px)`,B=(_,S,U="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${U})`,aS=`background-image: linear-gradient(${g}, ${g});`,mT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,cT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",iS="box-shadow: var(--oc-sdk-lit);",pT=`inset 0 0.5px 0 0 ${B(l,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,zO=`
:root {
  --oc-sdk-edge: ${B(l,16)};
  --oc-sdk-field-bg: ${s_};
  --oc-sdk-raised-bg: ${__};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${B(l,14)};
  --oc-sdk-field-bg: ${B(__,50,s_)};
  --oc-sdk-raised-bg: ${s_};
  --oc-sdk-field-lift: ${pT};
  --oc-sdk-raised-lift: ${pT};
  --oc-sdk-lit: ${pT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,r_=(_)=>{let S=$(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${$(`${_}-text`,"inherit")}; }`},kO=`
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
`,rS=`${zO}
.oc-sdk { color: ${l}; font-family: ${ZO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${aS} }
.oc-sdk-mono { font-family: ${hT}; }
.oc-sdk-muted { color: ${L}; }
${r_("success")}${r_("warning")}${r_("error")}${r_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${e}; --oc-sdk-tone-text: ${qT}; }

.oc-sdk-btn { border-radius: ${gT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${nS}; }
.oc-sdk-btn[data-variant="default"] { color: ${qT}; background: ${B(e,10,__)}; border-color: ${B(e,12)}; ${iS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${B(e,16,__)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${B(e,22,__)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${QO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${N_}; ${cT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${A_}, ${A_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${g}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${A_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${yT}; background: ${B("var(--oc-sdk-tone)",7,__)}; border-color: ${B("var(--oc-sdk-tone)",12)}; ${iS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${B("var(--oc-sdk-tone)",9,__)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${B("var(--oc-sdk-tone)",11,__)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${yT}; }
.oc-sdk-input { border-radius: ${gT}; background: var(--oc-sdk-field-bg); color: ${N_}; ${mT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${mT(B(l,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${mT($("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${hT}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${e}; }
.oc-sdk-search-clear { border-radius: ${nS}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${g}; color: ${l}; }

.oc-sdk-trigger { border-radius: ${gT}; background: var(--oc-sdk-raised-bg); color: ${N_}; ${cT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${g}, ${g}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${A_}, ${A_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${L}; }
.oc-sdk-trigger-chevron { color: ${L}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${N_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${s_}; background-clip: padding-box; color: ${N_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${g}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${xT}; color: ${bT}; }
.oc-sdk-option-check { color: ${l}; }
.oc-sdk-option[data-destructive="true"] { color: ${yT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${B($("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${L}; }
.oc-sdk-popup-empty { color: ${L}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${E_}; border-radius: 4px; color: ${l}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${B(l,60,E_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${E_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${__}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${aS} }
.oc-sdk-check-desc { color: ${L}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${B(l,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${L}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${l}; }
.oc-sdk-tab[aria-selected="true"] { color: ${bT}; background: ${xT}; border-color: ${E_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${N_}; background: var(--oc-sdk-raised-bg); ${cT} }
.oc-sdk-tab-count { color: ${L}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${B(l,6)}; color: ${L}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${B("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${g}; }
.oc-sdk-row[aria-selected="true"] { background: ${xT}; color: ${bT}; }
.oc-sdk-row-lead { font-family: ${hT}; color: ${L}; }
.oc-sdk-row-sub { color: ${L}; }
.oc-sdk-row-meta { color: ${L}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${L}; }

.oc-sdk-empty-body { color: ${L}; }

.oc-sdk-spinner { color: ${L}; }
.oc-sdk-spinner-ring { border-color: ${E_}; border-top-color: ${e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${B("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${L}; }

.oc-sdk-separator { color: ${L}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${B(E_,40)}; }

.oc-sdk-progress-label { color: ${L}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${B(l,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${e}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${$("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${$("success-text","inherit")}; }

.oc-sdk-text a { color: ${qT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${B(E_,60)}; }
`,y=`
${AT}
${kO}
${rS}`;var z_=HT(),eS=document.querySelector("#root");if(!eS)throw Error("Missing #root");eS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:15px/1.6 system-ui,sans-serif}
#root{padding:10px;display:flex;flex-direction:column;gap:10px;min-height:100%;max-width:100%;overflow-x:hidden}
.top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;max-width:100%}
.top select{min-width:0}
.top button{flex:none}
select#project{border:2px solid var(--primary,#3574f0);background:color-mix(in srgb,var(--primary,#3574f0) 12%,var(--oc-elevated,#fff));font-weight:700}
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
`;var Z=(_)=>document.querySelector(`#${_}`),P_=Z("project"),Q_=Z("branch"),K=Z("sync"),ST=Z("remote"),K_=Z("local"),H_=Z("msg"),p=Z("out"),BO=Z("topbar"),dT=Z("btn-pull-all"),S_=Z("proj-name"),_O=()=>{let _=(Y??"").split("/").filter(Boolean).pop()??"";S_.textContent=`● ${_}`,S_.style.color=j.green,S_.style.fontWeight="700",S_.style.maxWidth="120px",S_.style.overflow="hidden",S_.style.textOverflow="ellipsis",S_.style.whiteSpace="nowrap",S_.style.flex="none"},KO=Z("h-remote"),fO=Z("h-local"),jO=Z("nongit"),HO=Z("commitBox"),f_=Z("done"),nT=new Set,sT=Z("confirm"),wO=Z("confirm-msg"),w_=null,uT=(_)=>{return wO.textContent=_,sT.hidden=!1,new Promise((S)=>{w_=S})};Z("confirm-ok").onclick=()=>{sT.hidden=!0,w_?.(!0),w_=null};Z("confirm-cancel").onclick=()=>{sT.hidden=!0,w_?.(!1),w_=null};var TO=Z("conflict"),sS=Z("conflict-list"),xO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),lT="",SO=(_)=>{let S=xO(_);if(S.length===0){lT="";return}let U=S.join(`
`);if(U===lT)return;lT=U,sS.innerHTML="";for(let E of S.slice(0,20)){let M=document.createElement("tr"),I=document.createElement("td");I.className="mono ellipsis",I.textContent=E,M.appendChild(I),sS.appendChild(M)}TO.hidden=!1},aT=(_)=>{jO.hidden=!_,BO.style.display=_?"none":"",K.style.display=_?"none":"",KO.style.display=_?"none":"",ST.style.display=_?"none":"",fO.style.display=_?"none":"",K_.style.display=_?"none":"",HO.style.display=_?"none":""},Y=null,Z_=!1,iT=null,oT=new Map,H=(_,S,U)=>z_.serviceRequest({method:_,path:S,body:U===void 0?void 0:JSON.stringify(U)});var OO=async(_)=>{try{let S=await H("GET",`/projects?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||!U.projects)return;oT.clear(),P_.innerHTML="";for(let E of U.projects){oT.set(E.path,{name:E.name,branch:E.branch,ahead:E.ahead,behind:E.behind});let M=document.createElement("option");if(M.value=E.path,M.textContent=UO(E.name,E.path,E.branch,E.ahead,E.behind),E.path===Y)M.selected=!0;P_.appendChild(M)}}catch{}},tS="",UO=(_,S,U,E,M)=>{let I=M??0,C=E??0,V=Y!==null&&S===Y,z=iT!==null&&S===iT;return`${V?"● ":""}${_}${U?` ${U}`:""}${I>0?` ↓${I}`:""}${C>0?` ↑${C}`:""}${z?"（会话）":""}`},bO=async(_,S)=>{try{let U=await H("GET",`/branches?dir=${encodeURIComponent(_)}`),E=JSON.parse(U.body);if(!E.ok||!E.branches)return;let M=JSON.stringify([S,E.branches,E.remotes]);if(M===tS)return;tS=M,nT.clear();for(let C of E.remotes??[])nT.add(C.name);Q_.innerHTML="";let I=document.createElement("optgroup");I.label="本地分支";for(let C of E.branches){let V=document.createElement("option");if(V.value=C.name,V.textContent=`${C.current?"● ":""}${C.name}${(C.behind??0)>0?` ↓${C.behind}`:""}${!C.current&&(C.ahead??0)>0?` ↑${C.ahead}`:""}`,C.current)V.selected=!0;I.appendChild(V)}if(Q_.appendChild(I),E.remotes&&E.remotes.length>0){let C=document.createElement("optgroup");C.label="远程分支";for(let V of E.remotes){let z=document.createElement("option");z.value=V.name,z.textContent=V.name,C.appendChild(z)}Q_.appendChild(C)}}catch{}},rT=(_)=>{ST.innerHTML="";let U=(_.remoteLog??[]).slice(0,5);if(U.length===0){ST.innerHTML='<div class="mut">无远程分支记录</div>';return}let E=document.createElement("table");E.style.tableLayout="fixed";for(let M of U){let I=document.createElement("tr"),C=document.createElement("td");C.className="mono ellipsis",C.style.fontSize="12px";let V=M.downloaded!==!1,z=document.createElement("span");z.textContent=V?"● ":"○ ",z.style.color=V?j.green:j.amber;let A=document.createElement("span");A.className="mut",A.textContent=`${M.date} ${M.author} `;let k=document.createElement("span");if(k.textContent=M.subject,k.style.color=V?j.gray:"inherit",!V)k.style.fontWeight="700";C.title=`${M.subject} · ${M.author} ${M.date}（${V?"已下载":"未下载"}）`,C.append(z,A,k),I.appendChild(C),E.appendChild(I)}ST.appendChild(E)},j={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},qO=(_,S)=>{if(`${_}${S}`==="??")return j.purple;if(_==="U"||S==="U")return j.red;if(_==="D"||S==="D")return j.red;if(_==="A"||S==="A")return j.green;if(_==="R"||S==="R"||_==="C"||S==="C")return j.blue;if(_==="M"||S==="M")return j.amber;return j.gray},yO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let E="改动";if(_==="A"||S==="A")E="新增";else if(_==="D"||S==="D")E="删除";else if(_==="R"||S==="R")E="重命名";else if(_==="C"||S==="C")E="复制";else if(_==="T"||S==="T")E="类型变更";else if(_==="M"||S==="M")E="修改";return _!==" "&&_!=="?"&&_!=="!"?`${E}·已暂存`:E},EO=(_)=>{K_.innerHTML="";let S=_.files??[];if(S.length===0){let A=document.createElement("div");A.className="empty",A.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',K_.appendChild(A);return}let U=(A)=>A.trim()!==""&&A!=="?"&&A!==" ",E=S.every((A)=>U(A.staged)),M=document.createElement("div");M.className="selbar",M.onclick=(A)=>{if(A.target.tagName!=="INPUT")I.click()};let I=document.createElement("input");I.type="checkbox",I.checked=E,I.title=E?"全不选：取消全部暂存":"全选：暂存全部",I.onchange=async()=>{if(!Y){I.checked=!I.checked;return}if(I.checked){let A=S.filter((k)=>!U(k.staged)).map((k)=>k.path);if(A.length>0)await H("POST","/stage",{dir:Y,paths:A})}else{let A=S.filter((k)=>U(k.staged)).map((k)=>k.path);if(A.length>0)await H("POST","/unstage",{dir:Y,paths:A})}j_()};let C=document.createElement("span");C.className="mut";let V=S.filter((A)=>U(A.staged)).length;C.textContent=`全选 ${V}/${S.length}`,M.append(I,C),K_.appendChild(M);let z=document.createElement("table");for(let A of S){let k=document.createElement("tr"),n=document.createElement("td");n.style.width="28px";let v=document.createElement("input");v.type="checkbox",v.checked=A.staged.trim()!==""&&A.staged!=="?"&&A.staged!==" ",v.title=v.checked?"已暂存点取消":"未暂存点暂存",v.onchange=async()=>{if(!Y)return;await H("POST",v.checked?"/stage":"/unstage",{dir:Y,paths:[A.path]}),j_()},n.appendChild(v);let a=document.createElement("td");a.className="mono ellipsis",a.textContent=A.path,a.title=`${A.path}（点切换勾选）`,a.onclick=()=>v.click();let h=document.createElement("td");h.style.width="92px",h.style.minWidth="92px",h.style.textAlign="right",h.style.whiteSpace="nowrap",h.style.fontSize="13px",h.className="mut";let O_=A.binary?`<span style="color:${j.gray}">二进制</span>`:A.add!==void 0?`<span style="color:${j.green}">+${A.add}</span> <span style="color:${j.red}">-${A.del??0}</span> `:"",U_=yO(A.staged,A.unstaged);h.innerHTML=`${O_}<span style="color:${qO(A.staged,A.unstaged)}">${U_}</span>`,h.title=h.textContent??"";let s=document.createElement("td");if(s.style.width="30px",s.style.textAlign="right",!(A.staged==="U"||A.unstaged==="U")){let d=document.createElement("button");d.textContent="↩ 还原",d.title="还原：丢弃该文件本地改动",d.className="icon",d.onclick=async()=>{if(!Y)return;if(A.staged==="?"||A.staged==="A"){if(!await uT(`确定丢弃 ${A.path} 的本地内容吗？删除后不可恢复`))return;if(!await uT(`再次确认：真的删除 ${A.path} 吗？`))return}d.disabled=!0;let F_=await H("POST","/restore",{dir:Y,paths:[A.path],confirmed:!0}),i=JSON.parse(F_.body);if(!i.ok&&i.error==="need-confirm"){if(await uT(`确定删除未跟踪的 ${A.path} 吗？`))await H("POST","/restore",{dir:Y,paths:[A.path],confirmed:!0})}else if(!i.ok)p.textContent=i.error||"还原失败";d.disabled=!1,j_()},s.appendChild(d)}k.append(n,a,h,s),z.appendChild(k)}K_.appendChild(z)},hO=(_,S)=>{bO(S,_.branch??"")},gO=(_)=>{for(let S of[...P_.options]){let U=oT.get(S.value);if(!U)continue;if(S.value===Y)U.branch=_.branch??U.branch,U.ahead=_.ahead,U.behind=_.behind;S.textContent=UO(U.name,S.value,U.branch,U.ahead,U.behind)}},mO=(_)=>{let S=_.ahead??0,U=_.behind??0;if(U>0&&S>0)K.textContent=`远程 ${U} 个新，本地超前 ${S}`,K.style.color=j.amber;else if(U>0)K.textContent=`远程有 ${U} 个新提交，可下载`,K.style.color=j.amber;else if(S>0)K.textContent=`本地超前 ${S}可推送`,K.style.color=j.blue;else K.textContent="已是最新",K.style.color=j.green;z_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},G_=async()=>{if(!Y||Z_)return;Z_=!0;let _=Y;K.textContent="同步中…";try{await H("POST","/fetch",{dir:_}).catch(()=>{return});let S=await H("GET",`/status?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||U.branch===void 0){aT(!0);return}aT(!1),mO(U),gO(U),hO(U,_),rT(U),EO(U),SO(U)}catch(S){K.textContent=S instanceof X?`${S.code}`:"同步失败"}finally{Z_=!1}},j_=async()=>{if(!Y||Z_||document.hidden)return;Z_=!0;try{let _=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body);if(!S.ok)return;EO(S),SO(S),z_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{Z_=!1}};Z("btn-refresh").onclick=()=>void G_();Z("btn-pull-all").onclick=async()=>{if(!Y||dT.disabled)return;dT.disabled=!0;try{let _=await H("POST","/pull-all",{dir:Y}),S=JSON.parse(_.body);if(!S.ok||!S.jobId){K.textContent="全部拉取启动失败";return}for(;;){if(await new Promise((V)=>setTimeout(V,2000)),!Y)return;let U=await H("GET",`/pull-all-status?jobId=${encodeURIComponent(S.jobId)}`),E=JSON.parse(U.body);if(!E.ok){K.textContent="全部拉取查询失败";return}if(K.textContent=`全部拉取 ${E.finished}/${E.total}…`,K.style.color=j.amber,!E.done)continue;let M=E.results.filter((V)=>V.ok).length,I=E.results.filter((V)=>V.conflict).map((V)=>V.name),C=E.results.filter((V)=>!V.ok&&!V.conflict).map((V)=>V.name);K.textContent=`全部拉取完成：成功 ${M}/${E.total}${I.length>0?`，冲突 ${I.join("、")} 请自行处理`:""}${C.length>0?`，失败 ${C.join("、")}`:""}`,K.style.color=C.length>0||I.length>0?j.amber:j.green;break}}catch{K.textContent="全部拉取失败"}finally{if(dT.disabled=!1,Y)OO(Y);G_()}};Z("btn-pull").onclick=async()=>{if(!Y)return;K.textContent="下载中…";try{await H("POST","/pull",{dir:Y})}catch{}G_()};Q_.onchange=async()=>{if(!Y||!Q_.value)return;let _=Q_.value,S=nT.has(_),U=S?_.slice(_.indexOf("/")+1):_;K.textContent=S?`新建跟踪分支 ${U}…`:`切换到 ${_}…`;let E=await H("POST","/checkout",S?{dir:Y,branch:U,create:!0,base:_}:{dir:Y,branch:_}),M=JSON.parse(E.body);if(!M.ok)K.textContent=M.output||M.error||"切换失败";G_()};var M_=Z("btn-commit");M_.onclick=async()=>{if(!Y||M_.disabled)return;let _=H_.value.trim();if(!_){p.textContent="先写提交信息";return}M_.disabled=!0;let S=M_.textContent;M_.innerHTML='<span class="spin">↻</span> 提交中…';try{await H("POST","/fetch",{dir:Y}).catch(()=>{return});let U=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),E=JSON.parse(U.body),M=E.behind??0;if(M>0){p.textContent=`远程有 ${M} 个新提交，先点下载合并后再提交`,K.textContent=`远程有 ${M} 个新提交可下载`,rT(E);return}p.textContent="提交…";let I=await H("POST","/commit",{dir:Y,message:_,push:!0}),C=JSON.parse(I.body);if(!C.ok){p.textContent=C.error||"提交失败";return}p.textContent="跟远程核验中…",await H("POST","/fetch",{dir:Y}).catch(()=>{return});let V=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),z=JSON.parse(V.body),A=z.ahead??0;if(A>0){p.textContent=`已提交但远程核验本地仍超前 ${A}推送可能没完全成功请检查`,rT(z);return}H_.value="",p.textContent="已提交并推送远程核验一致",cO()}catch(U){p.textContent=U instanceof X?`${U.code}`:"提交失败"}finally{M_.disabled=!1,M_.textContent=S,G_()}};Z("btn-ai").onclick=async()=>{if(!Y)return;p.textContent="AI 生成中…";try{let _=await H("GET",`/status?dir=${encodeURIComponent(Y)}`),S=JSON.parse(_.body),U=(A)=>A.trim()!==""&&A!=="?"&&A!==" ",E=(S.files??[]).filter((A)=>U(A.staged));if(E.length===0){p.textContent="先勾选要提交的文件";return}let M="";for(let A of E.slice(0,3)){try{let k=await H("GET",`/diff?dir=${encodeURIComponent(Y)}&file=${encodeURIComponent(A.path)}&staged=1`),n=JSON.parse(k.body);if(n.ok&&n.diff)M+=`
--- ${A.path} ---
${n.diff.slice(0,2000)}`}catch{}if(M.length>6000)break}let I=E.map((A)=>`- ${A.staged}${A.unstaged} ${A.path}`).join(`
`).slice(0,1000),C=(S.recent??[]).slice(0,8).map((A)=>`- ${A.subject}`).join(`
`)||"- （无历史提交）",{text:V}=await z_.generate({system:"You are generating a Conventional Commits subject line from the diffs of the selected files.",prompt:`Return exactly one JSON object and nothing else. Do not include prose, markdown, explanations, or code fences.

The JSON object must have exactly this shape:
{"subject": string, "highlights": string[]}

Rules:
- match the style of the recent commits below: their language, capitalization, use or absence of a type prefix or scope, and typical length
- if the recent commits are written in a language other than English, write the subject and highlights in that language
- when the recent commits show no consistent style, use the format <type>: <summary> with one of: feat, fix, refactor, perf, docs, test, build, ci, chore, style, revert, and no scope
- keep subject concise and user-facing
- highlights: 0-3 concise user-facing points
- use double quotes for all JSON strings
- do not include trailing commas or comments

Recent commits on this branch (newest first):
${C}

Selected files:
${I}${M?`
Diffs:
${M.slice(0,6000)}`:""}`,maxOutputTokens:500}),z=V.trim().replace(/^```(?:json)?/i,"").replace(/```$/i,"").trim();try{let A=JSON.parse(z);if(!A.subject)throw Error("empty");H_.value=A.subject.trim();let k=(A.highlights??[]).filter(Boolean).slice(0,3);p.textContent=`已按 ${E.length} 个勾选文件生成${k.length>0?`：${k.join("；")}`:""}`}catch{H_.value=(z.split(`
`)[0]??"").slice(0,200),p.textContent=`已按 ${E.length} 个勾选文件生成（原文回填）`}}catch{p.textContent="无小模型或未授权 model"}};var R_=null;Z("btn-again").onclick=()=>{if(R_)clearTimeout(R_),R_=null;f_.hidden=!0};var cO=()=>{if(R_)clearTimeout(R_);f_.hidden=!1,R_=setTimeout(()=>{f_.hidden=!0,R_=null},2200),f_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let U=document.createElement("div");U.className="confetti",U.style.left=`${4+Math.random()*92}%`,U.style.background=_[S%_.length],U.style.animationDelay=`${Math.random()*0.5}s`,f_.appendChild(U)}};Z("btn-conflict-ok").onclick=()=>{TO.hidden=!0};z_.onResolve(async({args:_})=>{if(_.trim())H_.value=_.trim();return null});setInterval(()=>void j_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)j_()});P_.onchange=()=>{if(!P_.value)return;Y=P_.value,_O(),G_()};z_.onReady((_)=>{wT(_,document.documentElement);let S=_.directory??null;if(S!==Y){if(iT=S,Y=S,!Y){aT(!0);return}OO(Y),_O(),G_()}});})();
