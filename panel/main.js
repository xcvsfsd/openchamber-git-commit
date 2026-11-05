(()=>{var I="openchamber.sdk",V=1;var t_=`
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
`;function oT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(A)=>{let X=A.target===_?E:A.target;if(!(X instanceof Element))return;if(!X.hasAttribute("data-oc-scrolling"))X.setAttribute("data-oc-scrolling","");let N=O.get(X);if(N!==void 0)clearTimeout(N);O.set(X,setTimeout(()=>{O.delete(X),X.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var gS=`(${oT.toString()})(document);`;var e_=128,_T=65536;var z_=128;var F_=65536;var eT=/^[a-z][a-z0-9-]{0,39}$/;var rT=(_)=>Object(_)===_&&!Array.isArray(_),TT=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),sT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,tT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,_S=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!rT(O)||!eT.test(O.id)||!sT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!TT(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!TT(O,["kind","id","label","value","options","disabled"]))return!1;if(!tT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let A=new Set;for(let X of O.options){if(!rT(X)||!TT(X,["value","label"])||!tT(X.value)||!sT(X.label)||A.has(X.value))return!1;A.add(X.value)}if(!A.has(O.value))return!1}return!0};var TS=["{id}","{segment}","{segments+}"];var zE=new Set(TS);var SS=["turn-finished","turn-failed","permission-asked","question-asked"];var JE=new Set(SS);var J_=20000000,B_=256;var ST=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,ES=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var OS=/^[A-Za-z0-9_-]{1,80}$/;var US=["left","right","top","bottom"];var AS=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let A=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let X of A)if(!AS(X,E+1,O))return!1;return!0},ET=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(ET);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(ET)}return String(_)===_||Number.isFinite(_)},OT=(_)=>{try{if(String(_.id)!==_.id||!OS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!US.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!AS(_.data)||!ET(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var RS=["file","directory","other","missing"],AT=(_)=>Boolean(_&&"sessionId"in _),MT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var CS=/^[0-9a-f]{7,64}$/i,RT=(_)=>CS.test(_),K_=500,f_=32000,GS=16000,DS=128,XS=200,IS=2000,VS=16000,NS=80,WS=200,PS=16000;var YS=2000;var CT=20000,j_=1024,H_=2000000;var w_=64000,x_=8000,GT=4000;var DT=960000;var QS=999,kS=1e4,V_=500,ZS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],LS=["stopped","starting","ready","failed"],dS=new Set(ZS),$S=(_)=>dS.has(_),zS=(_)=>_&&$S(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},FS=(_)=>__(_)&&JSON.stringify(_).length<=PS,MS=(_)=>_?.trim().slice(0,WS)??"",T_=(_)=>{let E=_.id.trim().slice(0,DS),O=_.title.trim().slice(0,XS),A=_.url.trim().slice(0,IS),X=_.text?.trim().slice(0,VS),N=_.author?.trim().slice(0,NS),B=_.kind==="pull"?"pull":"issue",W={providerId:_.providerId.trim(),id:E,title:O||E,url:A,kind:B};if(X)W.text=X;if(N)W.author=N;if(B==="pull"){let J=MS(_.branches?.head),h=MS(_.branches?.base);if(J&&h)W.branches={head:J,base:h}}if(FS(_.data))W.data=_.data;return W},XT=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},IT=(_)=>{let E={text:_.text.trim().slice(0,GS)};if(_.send)E.send=!0;return E},VT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(QS,Math.max(0,Math.round(_)))},NT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(kS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=j_&&!_.includes("\x00")&&!_.includes("\\");var b_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>YS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},pS=new Set(LS),WT=(_)=>Boolean(_&&"status"in _&&pS.has(String(_.status))&&!("body"in _)),q_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),PT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),YT=(_)=>Boolean(_&&"written"in _&&_.written===!0),QT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),vS=new Set(RS),kT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&vS.has(String(_.kind))&&Number.isFinite(_.size)),ZT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),uS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),lS=(_)=>Object(_)===_?_:null,UT=(_)=>String(_)===_&&_.length>0,nS=(_)=>{if(!UT(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&UT(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:zS(UT(_.code)?_.code:void 0)};return null},LT=(_)=>{let E=lS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return nS(E);if(!uS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var JS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),aS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class R extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var BS=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),y_=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${j_} characters without NUL or backslash.`)),h_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},D=(_)=>{return _.value+=1,`oc-${_.value}`},$T=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),A=_.requestTimeoutMs??CT,X=new Set,N=new Set,B=new Set,W=new Set,J=new Set,h=new Set,M_=new Set,P_=new Set,Y_=new Set,r=new Set,a_=[],R_=null,C_=null,Q_=new Set,k_=new Set,G_=null,D_=null,i_=!1,s=new Map,t=new Map,e=new Map,g=!1,G={value:0},C=null,p=null,X_=!1,I_=!1,hT=null,mT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},q=(T)=>{E.parent.postMessage(T,"*")},gT=()=>{if(g||E.parent===E||r.size===0||C?.features?.lateGenerateResults!==!0)return;q({channel:I,v:V,type:"generate-late-listen"})},L=(T,S)=>{for(let U of T)try{U(S)}catch(M){console.error(M)}},cT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=LT(T.data);if(!S)return;if(S.type==="workspace"){let M=t.get(S.payload.subscriptionId);if(M)L([M],S.payload.snapshot);return}if(S.type==="shells"){let M=e.get(S.payload.subscriptionId);if(M)L([M],S.payload.snapshot);return}if(S.type==="ready"){if(C=S.payload,p=mT(S.payload.session),L(X,S.payload),L(N,S.payload.directory),L(B,S.payload.session),p)L(W,p);L(J,S.payload.connection),L(h,S.payload.settings),L(M_,S.payload.item),gT();return}if(S.type==="generate-late"){if(r.size===0)a_.push(S.payload);else L(r,S.payload);return}if(S.type==="directory"){if(C)C={...C,directory:S.payload.directory};L(N,S.payload.directory);return}if(S.type==="session"){if(C)C={...C,session:S.payload.session};if(!S.payload.session)p=null;else if(p?.sessionId!==S.payload.session.id)p=mT(S.payload.session);L(B,S.payload.session);return}if(S.type==="session-lifecycle"){p=S.payload,L(W,S.payload);return}if(S.type==="connection"){if(C)C={...C,connection:S.payload.connection};L(J,S.payload.connection);return}if(S.type==="settings"){if(C)C={...C,settings:S.payload.settings};L(h,S.payload.settings);return}if(S.type==="item"){if(C)C={...C,item:S.payload.item};L(M_,S.payload.item);return}if(S.type==="status-control-event"){L(P_,S.payload);return}if(S.type==="popover-closed"){L(Y_,S.payload);return}if(S.type==="action"){let M=(P)=>{if(!g)q({channel:I,v:V,type:"action-result",id:S.id,payload:P})},Y=C_;if(!Y){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Y(S.payload)).then(()=>M({ok:!0}),(P)=>{let F=(P instanceof Error?P.message:String(P)).trim();M({ok:!1,error:(F||"Action failed.").slice(0,V_)})});return}if(S.type==="file-open"){let M=S.payload;if(D_&&ES(D_,M))return;D_=M,L(Q_,S.payload);return}if(S.type==="file-saved"){L(k_,S.payload.version);return}if(S.type==="file-snapshot"){let M=(F)=>{if(!g)q({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:F})},Y=(F)=>M({error:(F.trim()||"Could not read the edited file.").slice(0,V_)}),P=G_;if(!P){Y("This extension does not edit files.");return}Promise.resolve().then(()=>P(S.payload.purpose)).then((F)=>{if(ST(F)>J_){Y(`The file is over ${J_} ${"bytes"in F?"bytes":"characters"}.`);return}if(F.version.length>B_){Y(`The snapshot version is over ${B_} characters.`);return}M({snapshot:"bytes"in F?{bytes:F.bytes,version:F.version}:{content:F.content,version:F.version}})},(F)=>Y(F instanceof Error?F.message:String(F)));return}if(S.type==="resolve"){let M=(P)=>{q({channel:I,v:V,type:"resolve-result",id:S.id,payload:P})},Y=R_;if(!Y){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Y(S.payload)).then((P)=>M({item:P?T_(P):null}),(P)=>{let F=(P instanceof Error?P.message:String(P)).trim();M({error:(F||"Command failed.").slice(0,V_)})});return}let U=s.get(S.id);if(!U)return;if(clearTimeout(U.timer),s.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new R(S.code,S.error))};E.addEventListener("message",cT),q({channel:I,v:V,type:"hello"});let f=(T,S=A)=>{if(g||E.parent===E)return Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,M)=>{let Y=setTimeout(()=>{s.delete(T.id),M(new R("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:U,reject:M,timer:Y}),q(T)})},$=(T)=>f(T).then(()=>{return}),z={channel:I,v:V},o_=(T)=>{if(!g&&E.parent!==E)q(T)},dT=()=>o_({...z,type:"file-save"}),pT=(T)=>{if(!JS(T)||!aS(T))return;T.preventDefault(),dT()},vT=(T)=>{if(!JS(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),aT(C.popover.id,"escape").catch(()=>{return})},Z_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let S=X_||I_;if(hT===S)return;hT=S,iT(T.id,S).catch(()=>{return})},L_=()=>{if(C?.surface!=="popover"||X_)return;X_=!0,Z_()},uT=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!X_)return;X_=!1,Z_()},lT=()=>{if(C?.surface!=="popover"||I_)return;I_=!0,Z_()},nT=()=>{if(C?.surface!=="popover"||!I_)return;I_=!1,Z_()},m=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new R("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},r_=async(T)=>{if(T.kind!=="projects")m(T.projectId);let S=await f({...z,type:"workspace-read",id:D(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return S},s_=async(T,S)=>{if(T.kind!=="projects")m(T.projectId);let U=D(G);t.set(U,S);try{await $({...z,type:"workspace-subscribe",id:D(G),payload:{subscriptionId:U,query:T}})}catch(M){if(t.delete(U),!g)q({...z,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:U}});throw M}return()=>{if(!t.delete(U)||g)return;q({...z,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:U}})}},mS=async(T,S)=>{if(T.kind==="session")m(T.sessionId);if(T.kind==="project")m(T.projectId);let U=D(G);e.set(U,S);try{await $({...z,type:"shells-subscribe",id:D(G),payload:{subscriptionId:U,scope:T}})}catch(M){if(e.delete(U),!g)q({...z,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:U}});throw M}return()=>{if(!e.delete(U)||g)return;q({...z,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:U}})}},$_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>e_))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>_T)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let S=await f({...z,type:"storage",id:D(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new R("HOST_REJECTED","Host did not return storage data.");return S},aT=(T,S)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):$({...z,type:"popover-close",id:D(G),payload:S?{id:T,reason:S}:{id:T}}),iT=(T,S)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):$({...z,type:"popover-anchor",id:D(G),payload:{id:T,active:S}});return E.addEventListener("keydown",vT,!0),E.addEventListener("pointerover",L_),E.addEventListener("pointermove",L_),E.addEventListener("pointerout",uT),E.addEventListener("focus",lT),E.addEventListener("blur",nT),{onAction:(T)=>{return C_=T,()=>{if(C_===T)C_=null}},listProjects:async()=>{let T=await r_({kind:"projects"});if(T.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await r_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await r_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>s_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>s_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>s_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>mS(T,S),readShellOutput:async(T,S)=>{m(T,z_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=S?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>F_))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${F_}.`);let P=await f({...z,type:"shell-output",id:D(G),payload:{shellId:T,cursor:U,tailBytes:M}});if(!P||typeof P.output!=="string"||!Number.isFinite(P.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async(T)=>{if(m(T,z_),(await f({...z,type:"shell-stop",id:D(G),payload:{shellId:T}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{m(T),await $({...z,type:"open-session",id:D(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=h_(S),M={op:"get",key:T};if(U)M.scope=U;let Y=await $_(M);return Y.op==="get"&&Y.found?Y.value:void 0},set:async(T,S,U)=>{let M=h_(U),Y={op:"set",key:T,value:S};if(M)Y.scope=M;await $_(Y)},delete:async(T,S)=>{let U=h_(S),M={op:"delete",key:T};if(U)M.scope=U;await $_(M)},keys:async(T)=>{let S=h_(T),U={op:"keys"};if(S)U.scope=S;let M=await $_(U);if(M.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(T)=>{if(X.add(T),C)T(C);return()=>{X.delete(T)}},onDirectory:(T)=>{if(N.add(T),C)T(C.directory);return()=>{N.delete(T)}},onSession:(T)=>{if(B.add(T),C)T(C.session);return()=>{B.delete(T)}},onSessionLifecycle:(T)=>{if(W.add(T),p)T(p);return()=>{W.delete(T)}},onConnection:(T)=>{if(J.add(T),C)T(C.connection);return()=>{J.delete(T)}},onSettings:(T)=>{if(h.add(T),C)T(C.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(M_.add(T),C)T(C.item);return()=>{M_.delete(T)}},onStatusControl:(T)=>{return P_.add(T),()=>{P_.delete(T)}},onPopoverClosed:(T)=>{return Y_.add(T),()=>{Y_.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support status controls."));if(!_S(T))return Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return $({...z,type:"status-controls",id:D(G),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new R("UNSUPPORTED","This host does not support popovers."));if(!OT(T))return Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return $({...z,type:"popover-open",id:D(G),payload:T})},closePopover:aT,setPopoverAnchorActive:iT,onResolve:(T)=>{return R_=T,()=>{if(R_===T)R_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>K_)return Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${K_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>f_))return Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${f_} characters.`));return $({channel:I,v:V,type:"toast",id:D(G),payload:{...T,message:S}})},openUrl:(T)=>$({channel:I,v:V,type:"open-url",id:D(G),payload:{url:T}}),openCommit:(T)=>RT(T)?$({channel:I,v:V,type:"open-commit",id:D(G),payload:{sha:T}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>$({channel:I,v:V,type:"open-surface",id:D(G),payload:{surfaceId:T}}),writeClipboard:(T)=>$({channel:I,v:V,type:"clipboard-write",id:D(G),payload:{text:T}}),compose:(T)=>$({channel:I,v:V,type:"compose",id:D(G),payload:T}),attach:(T)=>$({channel:I,v:V,type:"attach",id:D(G),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)m(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")m(S.directory);else{if(S.name!==void 0)m(S.name,200);if(S.baseBranch!==void 0)m(S.baseBranch,200)}let U=await f({channel:I,v:V,type:"start-session",id:D(G),payload:XT(T)},_.requestTimeoutMs??180000);if(!AT(U))throw new R("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>f({channel:I,v:V,type:"prompt",id:D(G),payload:IT(T)}).then((S)=>{if(!MT(S))throw new R("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>$({channel:I,v:V,type:"session-link",id:D(G),payload:T_(T)}),close:()=>$({channel:I,v:V,type:"close",id:D(G)}),oauthStart:()=>$({channel:I,v:V,type:"oauth-start",id:D(G)}),oauthDisconnect:()=>$({channel:I,v:V,type:"oauth-disconnect",id:D(G)}),request:(T)=>(b_(T.path)?f({channel:I,v:V,type:"request",id:D(G),payload:T}):BS()).then((S)=>{if(!q_(S))throw new R("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(b_(T.path)?f({channel:I,v:V,type:"service-request",id:D(G),payload:T}):BS()).then((S)=>{if(!q_(S))throw new R("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>f({channel:I,v:V,type:"service-status",id:D(G)}).then((T)=>{if(!WT(T))throw new R("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?f({channel:I,v:V,type:"file-read",id:D(G),payload:{path:T}}):y_()).then((S)=>{if(!PT(S))throw new R("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return y_();if(S.length>H_)return Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${H_} characters.`));return f({channel:I,v:V,type:"file-write",id:D(G),payload:{path:T,content:S}}).then((U)=>{if(!YT(U))throw new R("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(S_(T)?f({channel:I,v:V,type:"file-list",id:D(G),payload:{path:T}}):y_()).then((S)=>{if(!QT(S))throw new R("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?f({channel:I,v:V,type:"file-stat",id:D(G),payload:{path:T}}):y_()).then((S)=>{if(!kT(S))throw new R("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>w_)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${w_} characters.`));if(U!==void 0&&(U.length===0||U.length>x_))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${x_} characters.`));let M=T.maxOutputTokens===void 0?void 0:Math.min(GT,Math.max(1,Math.floor(T.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let Y={prompt:S};if(U!==void 0)Y.system=U;if(M!==void 0)Y.maxOutputTokens=M;return f({channel:I,v:V,type:"generate",id:D(G),payload:Y},_.requestTimeoutMs??DT).then((P)=>{if(!ZT(P))throw new R("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:(T)=>{r.add(T);for(let S of a_.splice(0))L([T],S);return gT(),()=>{r.delete(T)}},setBadge:(T)=>$({channel:I,v:V,type:"badge",id:D(G),payload:{count:VT(T)}}),setHeight:(T)=>$({channel:I,v:V,type:"resize",id:D(G),payload:{height:NT(T)}}),onFileOpen:(T)=>{if(Q_.add(T),!i_)i_=!0,E.addEventListener("keydown",pT,!0);if(D_)T(D_);return()=>{Q_.delete(T)}},onFileSnapshot:(T)=>{return G_=T,()=>{if(G_===T)G_=null}},onFileSaved:(T)=>{return k_.add(T),()=>{k_.delete(T)}},reportFileChange:(T)=>o_({...z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:dT,reportFileUnsupported:()=>o_({...z,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())q({...z,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())q({...z,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:T}});if(e.clear(),g=!0,R_=null,C_=null,G_=null,Q_.clear(),k_.clear(),i_)E.removeEventListener("keydown",pT,!0);E.removeEventListener("message",cT),E.removeEventListener("keydown",vT,!0),E.removeEventListener("pointerover",L_),E.removeEventListener("pointermove",L_),E.removeEventListener("pointerout",uT),E.removeEventListener("focus",lT),E.removeEventListener("blur",nT);for(let T of s.values())clearTimeout(T.timer),T.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),X.clear(),N.clear(),B.clear(),W.clear(),J.clear(),h.clear(),M_.clear(),P_.clear(),Y_.clear(),r.clear(),a_.length=0}}};var KS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var cE=new Set(KS);var fS=["none","agent","user"];var pE=new Set(fS);var iS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],oS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],jS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,A]of iS)E.style.setProperty(O,_.tokens[A]);for(let[O,A,X]of oS){let N=_.tokens[X]??"";E.style.setProperty(O,N),E.style.setProperty(A,N)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},zT=(_,E)=>{if(jS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var rS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Q=(_,E)=>`var(--${_}, var(--oc-${rS[_]}, ${E}))`,u=Q("surface-background","transparent"),g_=Q("surface-elevated","transparent"),E_=Q("surface-elevated-foreground","inherit"),y=Q("surface-foreground","inherit"),k=Q("surface-muted-foreground","gray"),sS=Q("surface-muted","transparent"),a=Q("interactive-border","currentColor"),w=Q("interactive-hover","transparent"),i=Q("interactive-active","transparent"),FT=Q("interactive-selection","transparent"),JT=Q("interactive-selection-foreground","inherit"),v=Q("primary","currentColor"),BT=Q("primary-text","inherit"),KT=Q("error-text","inherit"),tS=Q("font-sans","inherit"),fT=Q("font-mono","monospace"),bS=Q("radius","9px"),jT=`calc(${bS} - 2px)`,HS=`calc(${bS} - 4px)`,Z=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,wS=`background-image: linear-gradient(${w}, ${w});`,HT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,wT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",xS="box-shadow: var(--oc-sdk-lit);",xT=`inset 0 0.5px 0 0 ${Z(y,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,eS=`
:root {
  --oc-sdk-edge: ${Z(y,16)};
  --oc-sdk-field-bg: ${g_};
  --oc-sdk-raised-bg: ${u};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(y,14)};
  --oc-sdk-field-bg: ${Z(u,50,g_)};
  --oc-sdk-raised-bg: ${g_};
  --oc-sdk-field-lift: ${xT};
  --oc-sdk-raised-lift: ${xT};
  --oc-sdk-lit: ${xT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,m_=(_)=>{let E=Q(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${Q(`${_}-text`,"inherit")}; }`},_E=`
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
`,qS=`${eS}
.oc-sdk { color: ${y}; font-family: ${tS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${wS} }
.oc-sdk-mono { font-family: ${fT}; }
.oc-sdk-muted { color: ${k}; }
${m_("success")}${m_("warning")}${m_("error")}${m_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${v}; --oc-sdk-tone-text: ${BT}; }

.oc-sdk-btn { border-radius: ${jT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${HS}; }
.oc-sdk-btn[data-variant="default"] { color: ${BT}; background: ${Z(v,10,u)}; border-color: ${Z(v,12)}; ${xS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(v,16,u)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(v,22,u)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${sS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${i}, ${i}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${wT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${i}, ${i}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${i}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Q("status-error","red")}; color: ${KT}; background: ${Z("var(--oc-sdk-tone)",7,u)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${xS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,u)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,u)}; box-shadow: none; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${KT}; }
.oc-sdk-input { border-radius: ${jT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${HT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${HT(Z(y,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${HT(Q("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${fT}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search-clear { border-radius: ${HS}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${y}; }

.oc-sdk-trigger { border-radius: ${jT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${wT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${i}, ${i}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${g_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${FT}; color: ${JT}; }
.oc-sdk-option-check { color: ${y}; }
.oc-sdk-option[data-destructive="true"] { color: ${KT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Z(Q("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${a}; border-radius: 4px; color: ${y}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(y,60,a)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${a}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${u}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${v}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${wS} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(y,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${y}; }
.oc-sdk-tab[aria-selected="true"] { color: ${JT}; background: ${FT}; border-color: ${a}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${wT} }
.oc-sdk-tab-count { color: ${k}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Z(y,6)}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${FT}; color: ${JT}; }
.oc-sdk-row-lead { font-family: ${fT}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${a}; border-top-color: ${v}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Z(a,40)}; }

.oc-sdk-progress-label { color: ${k}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(y,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${v}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Q("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Q("success-text","inherit")}; }

.oc-sdk-text a { color: ${BT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(a,60)}; }
`,j=`
${t_}
${_E}
${qS}`;var A_=$T(),yS=document.querySelector("#root");if(!yS)throw Error("Missing #root");yS.innerHTML=`
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
textarea{width:100%;min-height:64px;padding:8px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:12px;opacity:.65}
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
<div id="commitBox">
  <textarea id="msg" placeholder="提交信息，如 feat: xxx"></textarea>
  <div class="row" style="margin-top:8px">
    <button id="btn-ai" title="AI 生成提交信息">✨</button>
    <span style="flex:1"></span>
    <button id="btn-commit" class="primary">提交并推送</button>
  </div>
  <div id="out" class="mut"></div>
</div>
`;var H=(_)=>document.querySelector(`#${_}`),n=H("branch"),c=H("sync"),u_=H("remote"),l_=H("local"),n_=H("msg"),o=H("out"),UE=H("topbar"),AE=H("h-remote"),ME=H("h-local"),RE=H("nongit"),CE=H("commitBox"),qT=(_)=>{RE.hidden=!_,UE.style.display=_?"none":"",c.style.display=_?"none":"",AE.style.display=_?"none":"",u_.style.display=_?"none":"",ME.style.display=_?"none":"",l_.style.display=_?"none":"",CE.style.display=_?"none":""},K=null,U_=!1,d=(_,E,O)=>A_.serviceRequest({method:_,path:E,body:O===void 0?void 0:JSON.stringify(O)});var GE=async(_,E)=>{try{let O=await d("GET",`/branches?dir=${encodeURIComponent(_)}`),A=JSON.parse(O.body);if(!A.ok||!A.branches)return;if(n.value&&n.value===E&&n.options.length>0)return;n.innerHTML="";for(let X of A.branches){let N=document.createElement("option");if(N.value=X.name,N.textContent=X.name,X.current)N.selected=!0;n.appendChild(N)}}catch{}},DE=(_)=>{u_.innerHTML="";let E=_.incoming??[];if(E.length===0){u_.innerHTML='<div class="mut">无，远程与本地一致</div>';return}let O=document.createElement("table");for(let A of E){let X=document.createElement("tr"),N=document.createElement("td");N.className="mono ellipsis",N.textContent=`${A.sha} ${A.subject}`,N.title=`${A.sha} ${A.subject} · ${A.author} ${A.date}`,X.appendChild(N),O.appendChild(X)}u_.appendChild(O)},XE=(_,E)=>{if(`${_}${E}`==="??")return"未跟踪";if(_==="U"||E==="U")return"冲突";let A="改动";if(_==="A"||E==="A")A="新增";else if(_==="D"||E==="D")A="删除";else if(_==="R"||E==="R")A="重命名";else if(_==="C"||E==="C")A="复制";else if(_==="T"||E==="T")A="类型变更";else if(_==="M"||E==="M")A="修改";return _!==" "&&_!=="?"&&_!=="!"?`${A}·已暂存`:A},hS=(_)=>{l_.innerHTML="";let E=_.files??[];if(E.length===0){let A=document.createElement("div");A.className="empty",A.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',l_.appendChild(A);return}let O=document.createElement("table");for(let A of E){let X=document.createElement("tr"),N=document.createElement("td");N.style.width="28px";let B=document.createElement("input");B.type="checkbox",B.checked=A.staged.trim()!==""&&A.staged!=="?"&&A.staged!==" ",B.title=B.checked?"已暂存点取消":"未暂存点暂存",B.onchange=async()=>{if(!K)return;await d("POST",B.checked?"/stage":"/unstage",{dir:K,paths:[A.path]}),yT()},N.appendChild(B);let W=document.createElement("td");W.className="mono ellipsis",W.textContent=A.path,W.title=A.path;let J=document.createElement("td");J.style.width="92px",J.style.minWidth="92px",J.style.textAlign="right",J.style.whiteSpace="nowrap",J.style.fontSize="11px",J.className="mut",J.textContent=XE(A.staged,A.unstaged),X.append(N,W,J),O.appendChild(X)}l_.appendChild(O)},IE=(_,E)=>{GE(E,_.branch??"")},VE=(_)=>{let E=_.ahead??0,O=_.behind??0;if(O>0&&E>0)c.textContent=`远程 ${O} 个新，本地超前 ${E}`;else if(O>0)c.textContent=`远程有 ${O} 个新提交，可下载`;else if(E>0)c.textContent=`本地超前 ${E}可推送`;else c.textContent="已是最新";A_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},W_=async()=>{if(!K||U_)return;U_=!0;let _=K;c.textContent="同步中…";try{await d("POST","/fetch",{dir:_}).catch(()=>{return});let E=await d("GET",`/status?dir=${encodeURIComponent(_)}`),O=JSON.parse(E.body);if(!O.ok||O.branch===void 0){qT(!0);return}qT(!1),VE(O),IE(O,_),DE(O),hS(O)}catch(E){c.textContent=E instanceof R?`${E.code}`:"同步失败"}finally{U_=!1}},yT=async()=>{if(!K||U_||document.hidden)return;U_=!0;try{let _=await d("GET",`/status?dir=${encodeURIComponent(K)}`),E=JSON.parse(_.body);if(!E.ok)return;hS(E),A_.setBadge(E.files?.length?E.files.length:null).catch(()=>{return})}catch{}finally{U_=!1}};H("btn-refresh").onclick=()=>void W_();H("btn-pull").onclick=async()=>{if(!K)return;c.textContent="下载中…";try{await d("POST","/pull",{dir:K})}catch{}W_()};n.onchange=async()=>{if(!K||!n.value)return;c.textContent=`切换到 ${n.value}…`;let _=await d("POST","/checkout",{dir:K,branch:n.value}),E=JSON.parse(_.body);if(!E.ok)c.textContent=E.output||E.error||"切换失败";W_()};H("btn-commit").onclick=async()=>{if(!K)return;let _=n_.value.trim();if(!_){o.textContent="先写提交信息";return}o.textContent="提交…";let E=await d("POST","/commit",{dir:K,message:_,push:!0}),O=JSON.parse(E.body);if(o.textContent=O.ok?"已提交并推送":O.error||"提交失败",O.ok)n_.value="";W_()};H("btn-ai").onclick=async()=>{if(!K)return;o.textContent="AI 生成中…";try{let _=await d("GET",`/status?dir=${encodeURIComponent(K)}`),E=JSON.parse(_.body),O=(W)=>W.trim()!==""&&W!=="?"&&W!==" ",A=(E.files??[]).filter((W)=>O(W.staged));if(A.length===0){o.textContent="先勾选要提交的文件";return}let X="";for(let W of A.slice(0,3)){try{let J=await d("GET",`/diff?dir=${encodeURIComponent(K)}&file=${encodeURIComponent(W.path)}&staged=1`),h=JSON.parse(J.body);if(h.ok&&h.diff)X+=`
--- ${W.path} ---
${h.diff.slice(0,2000)}`}catch{}if(X.length>6000)break}let N=A.map((W)=>`${W.staged}${W.unstaged} ${W.path}`).join(`
`).slice(0,1000),{text:B}=await A_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${E.branch}
已选文件：
${N}${X.slice(0,6000)}`,maxOutputTokens:100});n_.value=B.trim(),o.textContent=`已按 ${A.length} 个勾选文件生成`}catch{o.textContent="无小模型或未授权 model"}};A_.onResolve(async({args:_})=>{if(_.trim())n_.value=_.trim();return null});setInterval(()=>void yT(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)yT()});A_.onReady((_)=>{zT(_,document.documentElement);let E=_.directory??null;if(E!==K){if(K=E,!K){qT(!0);return}W_()}});})();
