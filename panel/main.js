(()=>{var I="openchamber.sdk",V=1;var i_=`
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
`;function nT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(D)=>{let C=D.target===_?E:D.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let N=O.get(C);if(N!==void 0)clearTimeout(N);O.set(C,setTimeout(()=>{O.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var hS=`(${nT.toString()})(document);`;var r_=128,s_=65536;var Z_=128;var z_=65536;var rT=/^[a-z][a-z0-9-]{0,39}$/;var aT=(_)=>Object(_)===_&&!Array.isArray(_),t_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),oT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,iT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,sT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!aT(O)||!rT.test(O.id)||!oT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!t_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!t_(O,["kind","id","label","value","options","disabled"]))return!1;if(!iT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let D=new Set;for(let C of O.options){if(!aT(C)||!t_(C,["value","label"])||!iT(C.value)||!oT(C.label)||D.has(C.value))return!1;D.add(C.value)}if(!D.has(O.value))return!1}return!0};var tT=["{id}","{segment}","{segments+}"];var NE=new Set(tT);var eT=["turn-finished","turn-failed","permission-asked","question-asked"];var PE=new Set(eT);var $_=20000000,F_=256;var e_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,_S=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var TS=/^[A-Za-z0-9_-]{1,80}$/;var SS=["left","right","top","bottom"];var ES=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let D=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of D)if(!ES(C,E+1,O))return!1;return!0},_T=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(_T);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(_T)}return String(_)===_||Number.isFinite(_)},TT=(_)=>{try{if(String(_.id)!==_.id||!TS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!SS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!ES(_.data)||!_T(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var US=["file","directory","other","missing"],ET=(_)=>Boolean(_&&"sessionId"in _),OT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var AS=/^[0-9a-f]{7,64}$/i,UT=(_)=>AS.test(_),J_=500,B_=32000,MS=16000,RS=128,CS=200,GS=2000,XS=16000,DS=80,IS=200,VS=16000;var NS=2000;var AT=20000,K_=1024,f_=2000000;var j_=64000,w_=8000,MT=4000;var RT=960000;var WS=999,PS=1e4,D_=500,LS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],YS=["stopped","starting","ready","failed"],gS=new Set(LS),QS=(_)=>gS.has(_),kS=(_)=>_&&QS(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},ZS=(_)=>__(_)&&JSON.stringify(_).length<=VS,OS=(_)=>_?.trim().slice(0,IS)??"",T_=(_)=>{let E=_.id.trim().slice(0,RS),O=_.title.trim().slice(0,CS),D=_.url.trim().slice(0,GS),C=_.text?.trim().slice(0,XS),N=_.author?.trim().slice(0,DS),Z=_.kind==="pull"?"pull":"issue",z={providerId:_.providerId.trim(),id:E,title:O||E,url:D,kind:Z};if(C)z.text=C;if(N)z.author=N;if(Z==="pull"){let y=OS(_.branches?.head),h=OS(_.branches?.base);if(y&&h)z.branches={head:y,base:h}}if(ZS(_.data))z.data=_.data;return z},CT=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},GT=(_)=>{let E={text:_.text.trim().slice(0,MS)};if(_.send)E.send=!0;return E},XT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(WS,Math.max(0,Math.round(_)))},DT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(PS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=K_&&!_.includes("\x00")&&!_.includes("\\");var x_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>NS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},cS=new Set(YS),IT=(_)=>Boolean(_&&"status"in _&&cS.has(String(_.status))&&!("body"in _)),H_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),VT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),NT=(_)=>Boolean(_&&"written"in _&&_.written===!0),WT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),dS=new Set(US),PT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&dS.has(String(_.kind))&&Number.isFinite(_.size)),LT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),pS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),vS=(_)=>Object(_)===_?_:null,ST=(_)=>String(_)===_&&_.length>0,uS=(_)=>{if(!ST(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&ST(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:kS(ST(_.code)?_.code:void 0)};return null},YT=(_)=>{let E=vS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return uS(E);if(!pS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var zS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),lS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var $S=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),b_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${K_} characters without NUL or backslash.`)),q_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},X=(_)=>{return _.value+=1,`oc-${_.value}`},QT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),D=_.requestTimeoutMs??AT,C=new Set,N=new Set,Z=new Set,z=new Set,y=new Set,h=new Set,a=new Set,N_=new Set,W_=new Set,r=new Set,u_=[],A_=null,M_=null,P_=new Set,L_=new Set,R_=null,C_=null,l_=!1,s=new Map,t=new Map,e=new Map,c=!1,G={value:0},R=null,p=null,G_=!1,X_=!1,bT=null,qT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},b=(T)=>{E.parent.postMessage(T,"*")},yT=()=>{if(c||E.parent===E||r.size===0||R?.features?.lateGenerateResults!==!0)return;b({channel:I,v:V,type:"generate-late-listen"})},$=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},hT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=YT(T.data);if(!S)return;if(S.type==="workspace"){let A=t.get(S.payload.subscriptionId);if(A)$([A],S.payload.snapshot);return}if(S.type==="shells"){let A=e.get(S.payload.subscriptionId);if(A)$([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,p=qT(S.payload.session),$(C,S.payload),$(N,S.payload.directory),$(Z,S.payload.session),p)$(z,p);$(y,S.payload.connection),$(h,S.payload.settings),$(a,S.payload.item),yT();return}if(S.type==="generate-late"){if(r.size===0)u_.push(S.payload);else $(r,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};$(N,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)p=null;else if(p?.sessionId!==S.payload.session.id)p=qT(S.payload.session);$(Z,S.payload.session);return}if(S.type==="session-lifecycle"){p=S.payload,$(z,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};$(y,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};$(h,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};$(a,S.payload.item);return}if(S.type==="status-control-event"){$(N_,S.payload);return}if(S.type==="popover-closed"){$(W_,S.payload);return}if(S.type==="action"){let A=(W)=>{if(!c)b({channel:I,v:V,type:"action-result",id:S.id,payload:W})},P=M_;if(!P){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>P(S.payload)).then(()=>A({ok:!0}),(W)=>{let B=(W instanceof Error?W.message:String(W)).trim();A({ok:!1,error:(B||"Action failed.").slice(0,D_)})});return}if(S.type==="file-open"){let A=S.payload;if(C_&&_S(C_,A))return;C_=A,$(P_,S.payload);return}if(S.type==="file-saved"){$(L_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(B)=>{if(!c)b({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:B})},P=(B)=>A({error:(B.trim()||"Could not read the edited file.").slice(0,D_)}),W=R_;if(!W){P("This extension does not edit files.");return}Promise.resolve().then(()=>W(S.payload.purpose)).then((B)=>{if(e_(B)>$_){P(`The file is over ${$_} ${"bytes"in B?"bytes":"characters"}.`);return}if(B.version.length>F_){P(`The snapshot version is over ${F_} characters.`);return}A({snapshot:"bytes"in B?{bytes:B.bytes,version:B.version}:{content:B.content,version:B.version}})},(B)=>P(B instanceof Error?B.message:String(B)));return}if(S.type==="resolve"){let A=(W)=>{b({channel:I,v:V,type:"resolve-result",id:S.id,payload:W})},P=A_;if(!P){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>P(S.payload)).then((W)=>A({item:W?T_(W):null}),(W)=>{let B=(W instanceof Error?W.message:String(W)).trim();A({error:(B||"Command failed.").slice(0,D_)})});return}let U=s.get(S.id);if(!U)return;if(clearTimeout(U.timer),s.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",hT),b({channel:I,v:V,type:"hello"});let f=(T,S=D)=>{if(c||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let P=setTimeout(()=>{s.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:U,reject:A,timer:P}),b(T)})},F=(T)=>f(T).then(()=>{return}),J={channel:I,v:V},n_=(T)=>{if(!c&&E.parent!==E)b(T)},mT=()=>n_({...J,type:"file-save"}),gT=(T)=>{if(!zS(T)||!lS(T))return;T.preventDefault(),mT()},cT=(T)=>{if(!zS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),uT(R.popover.id,"escape").catch(()=>{return})},Y_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=G_||X_;if(bT===S)return;bT=S,lT(T.id,S).catch(()=>{return})},Q_=()=>{if(R?.surface!=="popover"||G_)return;G_=!0,Y_()},dT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!G_)return;G_=!1,Y_()},pT=()=>{if(R?.surface!=="popover"||X_)return;X_=!0,Y_()},vT=()=>{if(R?.surface!=="popover"||!X_)return;X_=!1,Y_()},m=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},a_=async(T)=>{if(T.kind!=="projects")m(T.projectId);let S=await f({...J,type:"workspace-read",id:X(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},o_=async(T,S)=>{if(T.kind!=="projects")m(T.projectId);let U=X(G);t.set(U,S);try{await F({...J,type:"workspace-subscribe",id:X(G),payload:{subscriptionId:U,query:T}})}catch(A){if(t.delete(U),!c)b({...J,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!t.delete(U)||c)return;b({...J,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},yS=async(T,S)=>{if(T.kind==="session")m(T.sessionId);if(T.kind==="project")m(T.projectId);let U=X(G);e.set(U,S);try{await F({...J,type:"shells-subscribe",id:X(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(e.delete(U),!c)b({...J,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}});throw A}return()=>{if(!e.delete(U)||c)return;b({...J,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:U}})}},k_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>r_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>s_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await f({...J,type:"storage",id:X(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},uT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):F({...J,type:"popover-close",id:X(G),payload:S?{id:T,reason:S}:{id:T}}),lT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):F({...J,type:"popover-anchor",id:X(G),payload:{id:T,active:S}});return E.addEventListener("keydown",cT,!0),E.addEventListener("pointerover",Q_),E.addEventListener("pointermove",Q_),E.addEventListener("pointerout",dT),E.addEventListener("focus",pT),E.addEventListener("blur",vT),{onAction:(T)=>{return M_=T,()=>{if(M_===T)M_=null}},listProjects:async()=>{let T=await a_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await a_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await a_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>o_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>o_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>o_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>yS(T,S),readShellOutput:async(T,S)=>{m(T,Z_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>z_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${z_}.`);let W=await f({...J,type:"shell-output",id:X(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!W||typeof W.output!=="string"||!Number.isFinite(W.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async(T)=>{if(m(T,Z_),(await f({...J,type:"shell-stop",id:X(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{m(T),await F({...J,type:"open-session",id:X(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=q_(S),A={op:"get",key:T};if(U)A.scope=U;let P=await k_(A);return P.op==="get"&&P.found?P.value:void 0},set:async(T,S,U)=>{let A=q_(U),P={op:"set",key:T,value:S};if(A)P.scope=A;await k_(P)},delete:async(T,S)=>{let U=q_(S),A={op:"delete",key:T};if(U)A.scope=U;await k_(A)},keys:async(T)=>{let S=q_(T),U={op:"keys"};if(S)U.scope=S;let A=await k_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(C.add(T),R)T(R);return()=>{C.delete(T)}},onDirectory:(T)=>{if(N.add(T),R)T(R.directory);return()=>{N.delete(T)}},onSession:(T)=>{if(Z.add(T),R)T(R.session);return()=>{Z.delete(T)}},onSessionLifecycle:(T)=>{if(z.add(T),p)T(p);return()=>{z.delete(T)}},onConnection:(T)=>{if(y.add(T),R)T(R.connection);return()=>{y.delete(T)}},onSettings:(T)=>{if(h.add(T),R)T(R.settings);return()=>{h.delete(T)}},onItem:(T)=>{if(a.add(T),R)T(R.item);return()=>{a.delete(T)}},onStatusControl:(T)=>{return N_.add(T),()=>{N_.delete(T)}},onPopoverClosed:(T)=>{return W_.add(T),()=>{W_.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!sT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return F({...J,type:"status-controls",id:X(G),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!TT(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return F({...J,type:"popover-open",id:X(G),payload:T})},closePopover:uT,setPopoverAnchorActive:lT,onResolve:(T)=>{return A_=T,()=>{if(A_===T)A_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>J_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${J_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>B_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${B_} characters.`));return F({channel:I,v:V,type:"toast",id:X(G),payload:{...T,message:S}})},openUrl:(T)=>F({channel:I,v:V,type:"open-url",id:X(G),payload:{url:T}}),openCommit:(T)=>UT(T)?F({channel:I,v:V,type:"open-commit",id:X(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>F({channel:I,v:V,type:"open-surface",id:X(G),payload:{surfaceId:T}}),writeClipboard:(T)=>F({channel:I,v:V,type:"clipboard-write",id:X(G),payload:{text:T}}),compose:(T)=>F({channel:I,v:V,type:"compose",id:X(G),payload:T}),attach:(T)=>F({channel:I,v:V,type:"attach",id:X(G),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)m(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")m(S.directory);else{if(S.name!==void 0)m(S.name,200);if(S.baseBranch!==void 0)m(S.baseBranch,200)}let U=await f({channel:I,v:V,type:"start-session",id:X(G),payload:CT(T)},_.requestTimeoutMs??180000);if(!ET(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>f({channel:I,v:V,type:"prompt",id:X(G),payload:GT(T)}).then((S)=>{if(!OT(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>F({channel:I,v:V,type:"session-link",id:X(G),payload:T_(T)}),close:()=>F({channel:I,v:V,type:"close",id:X(G)}),oauthStart:()=>F({channel:I,v:V,type:"oauth-start",id:X(G)}),oauthDisconnect:()=>F({channel:I,v:V,type:"oauth-disconnect",id:X(G)}),request:(T)=>(x_(T.path)?f({channel:I,v:V,type:"request",id:X(G),payload:T}):$S()).then((S)=>{if(!H_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(x_(T.path)?f({channel:I,v:V,type:"service-request",id:X(G),payload:T}):$S()).then((S)=>{if(!H_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>f({channel:I,v:V,type:"service-status",id:X(G)}).then((T)=>{if(!IT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?f({channel:I,v:V,type:"file-read",id:X(G),payload:{path:T}}):b_()).then((S)=>{if(!VT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return b_();if(S.length>f_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${f_} characters.`));return f({channel:I,v:V,type:"file-write",id:X(G),payload:{path:T,content:S}}).then((U)=>{if(!NT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(S_(T)?f({channel:I,v:V,type:"file-list",id:X(G),payload:{path:T}}):b_()).then((S)=>{if(!WT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?f({channel:I,v:V,type:"file-stat",id:X(G),payload:{path:T}}):b_()).then((S)=>{if(!PT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>j_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${j_} characters.`));if(U!==void 0&&(U.length===0||U.length>w_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${w_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(MT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let P={prompt:S};if(U!==void 0)P.system=U;if(A!==void 0)P.maxOutputTokens=A;return f({channel:I,v:V,type:"generate",id:X(G),payload:P},_.requestTimeoutMs??RT).then((W)=>{if(!LT(W))throw new M("HOST_REJECTED","Host did not return generated text.");return W})},onLateGenerateResult:(T)=>{r.add(T);for(let S of u_.splice(0))$([T],S);return yT(),()=>{r.delete(T)}},setBadge:(T)=>F({channel:I,v:V,type:"badge",id:X(G),payload:{count:XT(T)}}),setHeight:(T)=>F({channel:I,v:V,type:"resize",id:X(G),payload:{height:DT(T)}}),onFileOpen:(T)=>{if(P_.add(T),!l_)l_=!0,E.addEventListener("keydown",gT,!0);if(C_)T(C_);return()=>{P_.delete(T)}},onFileSnapshot:(T)=>{return R_=T,()=>{if(R_===T)R_=null}},onFileSaved:(T)=>{return L_.add(T),()=>{L_.delete(T)}},reportFileChange:(T)=>n_({...J,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:mT,reportFileUnsupported:()=>n_({...J,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())b({...J,type:"workspace-unsubscribe",id:X(G),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())b({...J,type:"shells-unsubscribe",id:X(G),payload:{subscriptionId:T}});if(e.clear(),c=!0,A_=null,M_=null,R_=null,P_.clear(),L_.clear(),l_)E.removeEventListener("keydown",gT,!0);E.removeEventListener("message",hT),E.removeEventListener("keydown",cT,!0),E.removeEventListener("pointerover",Q_),E.removeEventListener("pointermove",Q_),E.removeEventListener("pointerout",dT),E.removeEventListener("focus",pT),E.removeEventListener("blur",vT);for(let T of s.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),C.clear(),N.clear(),Z.clear(),z.clear(),y.clear(),h.clear(),a.clear(),N_.clear(),W_.clear(),r.clear(),u_.length=0}}};var FS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var wE=new Set(FS);var JS=["none","agent","user"];var HE=new Set(JS);var nS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],aS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],BS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,D]of nS)E.style.setProperty(O,_.tokens[D]);for(let[O,D,C]of aS){let N=_.tokens[C]??"";E.style.setProperty(O,N),E.style.setProperty(D,N)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},kT=(_,E)=>{if(BS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var oS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},L=(_,E)=>`var(--${_}, var(--oc-${oS[_]}, ${E}))`,u=L("surface-background","transparent"),h_=L("surface-elevated","transparent"),E_=L("surface-elevated-foreground","inherit"),q=L("surface-foreground","inherit"),Q=L("surface-muted-foreground","gray"),iS=L("surface-muted","transparent"),o=L("interactive-border","currentColor"),w=L("interactive-hover","transparent"),i=L("interactive-active","transparent"),ZT=L("interactive-selection","transparent"),zT=L("interactive-selection-foreground","inherit"),v=L("primary","currentColor"),$T=L("primary-text","inherit"),FT=L("error-text","inherit"),rS=L("font-sans","inherit"),JT=L("font-mono","monospace"),wS=L("radius","9px"),BT=`calc(${wS} - 2px)`,KS=`calc(${wS} - 4px)`,k=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,fS=`background-image: linear-gradient(${w}, ${w});`,KT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,fT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",jS="box-shadow: var(--oc-sdk-lit);",jT=`inset 0 0.5px 0 0 ${k(q,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,sS=`
:root {
  --oc-sdk-edge: ${k(q,16)};
  --oc-sdk-field-bg: ${h_};
  --oc-sdk-raised-bg: ${u};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${k(q,14)};
  --oc-sdk-field-bg: ${k(u,50,h_)};
  --oc-sdk-raised-bg: ${h_};
  --oc-sdk-field-lift: ${jT};
  --oc-sdk-raised-lift: ${jT};
  --oc-sdk-lit: ${jT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,y_=(_)=>{let E=L(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${L(`${_}-text`,"inherit")}; }`},tS=`
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
`,xS=`${sS}
.oc-sdk { color: ${q}; font-family: ${rS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${fS} }
.oc-sdk-mono { font-family: ${JT}; }
.oc-sdk-muted { color: ${Q}; }
${y_("success")}${y_("warning")}${y_("error")}${y_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${v}; --oc-sdk-tone-text: ${$T}; }

.oc-sdk-btn { border-radius: ${BT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${KS}; }
.oc-sdk-btn[data-variant="default"] { color: ${$T}; background: ${k(v,10,u)}; border-color: ${k(v,12)}; ${jS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${k(v,16,u)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${k(v,22,u)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${iS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${i}, ${i}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${fT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${i}, ${i}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${w}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${i}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${L("status-error","red")}; color: ${FT}; background: ${k("var(--oc-sdk-tone)",7,u)}; border-color: ${k("var(--oc-sdk-tone)",12)}; ${jS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${k("var(--oc-sdk-tone)",9,u)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${k("var(--oc-sdk-tone)",11,u)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${FT}; }
.oc-sdk-input { border-radius: ${BT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${KT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${KT(k(q,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${KT(L("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${JT}; }

.oc-sdk-search-icon { color: ${Q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search-clear { border-radius: ${KS}; color: ${Q}; }
.oc-sdk-search-clear:hover { background: ${w}; color: ${q}; }

.oc-sdk-trigger { border-radius: ${BT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${fT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${w}, ${w}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${i}, ${i}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Q}; }
.oc-sdk-trigger-chevron { color: ${Q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${h_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${w}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ZT}; color: ${zT}; }
.oc-sdk-option-check { color: ${q}; }
.oc-sdk-option[data-destructive="true"] { color: ${FT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${k(L("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Q}; }
.oc-sdk-popup-empty { color: ${Q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${q}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${k(q,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${u}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${v}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${fS} }
.oc-sdk-check-desc { color: ${Q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${k(q,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${q}; }
.oc-sdk-tab[aria-selected="true"] { color: ${zT}; background: ${ZT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${fT} }
.oc-sdk-tab-count { color: ${Q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${k(q,6)}; color: ${Q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${k("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${w}; }
.oc-sdk-row[aria-selected="true"] { background: ${ZT}; color: ${zT}; }
.oc-sdk-row-lead { font-family: ${JT}; color: ${Q}; }
.oc-sdk-row-sub { color: ${Q}; }
.oc-sdk-row-meta { color: ${Q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Q}; }

.oc-sdk-empty-body { color: ${Q}; }

.oc-sdk-spinner { color: ${Q}; }
.oc-sdk-spinner-ring { border-color: ${o}; border-top-color: ${v}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${k("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Q}; }

.oc-sdk-separator { color: ${Q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${k(o,40)}; }

.oc-sdk-progress-label { color: ${Q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${k(q,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${v}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${L("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${L("success-text","inherit")}; }

.oc-sdk-text a { color: ${$T}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${k(o,60)}; }
`,j=`
${i_}
${tS}
${xS}`;var U_=QT(),qS=document.querySelector("#root");if(!qS)throw Error("Missing #root");qS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:10px;display:flex;flex-direction:column;gap:10px}
.row{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
select,input[type=text],textarea{width:100%;padding:6px 8px;border:1px solid var(--border,#3333);border-radius:8px;background:var(--card,#0000);color:inherit}
textarea{min-height:76px;resize:vertical}
button{padding:6px 10px;border:1px solid var(--border,#3333);border-radius:8px;background:var(--card,#0001);color:inherit;cursor:pointer}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5;cursor:default}
.file{display:flex;gap:6px;align-items:center;padding:4px 6px;border-radius:6px}
.file:hover{background:#8881}
.file .p{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace;font-size:12px}
.badge{font-size:11px;opacity:.75}
pre.diff{max-height:220px;overflow:auto;font-size:11px;background:#8881;padding:8px;border-radius:8px;white-space:pre-wrap}
.err{color:var(--error,#d33);font-size:12px;white-space:pre-wrap}
.muted{opacity:.65;font-size:12px}
h3{margin:4px 0;font-size:12px;opacity:.7}
</style>
<div class="row">
  <select id="branch" title="当前分支"></select>
  <button id="btn-refresh" title="刷新">↻</button>
</div>
<div class="row">
  <button id="btn-pull">⬇ Pull</button>
  <button id="btn-push">⬆ Push</button>
  <button id="btn-sw">⇄ 切分支</button>
  <button id="btn-diff">Diff</button>
</div>
<div id="meta" class="muted">等待项目…</div>
<h3>变更</h3>
<div id="files"><span class="muted">加载中…</span></div>
<pre id="diff" class="diff" hidden></pre>
<h3>提交信息</h3>
<textarea id="msg" placeholder="feat: 一句话说清变更"></textarea>
<div class="row">
  <label><input type="checkbox" id="amend" /> amend</label>
  <label><input type="checkbox" id="pushAfter" checked /> 提交后 push</label>
</div>
<div class="row">
  <button id="btn-ai">✨ AI 信息</button>
  <button id="btn-stage-all">全暂存</button>
  <button id="btn-commit" class="primary">✓ 提交</button>
</div>
<div id="out" class="muted"></div>
<div class="row">
  <button id="btn-new-branch">＋ 新分支</button>
  <button id="btn-open-git">内置 Git 面板</button>
</div>
`;var K=(_)=>document.querySelector(`#${_}`),xT=K("branch"),EE=K("meta"),V_=K("files"),HT=K("diff"),p_=K("msg"),OE=K("out"),UE=K("amend"),HS=K("pushAfter"),v_=null,bS=new Set,Y=(_)=>{OE.textContent=_},g=async(_,E,O)=>{return U_.serviceRequest({method:_,path:E,body:O===void 0?void 0:JSON.stringify(O)})},d=()=>{if(!v_)Y("先在 OpenChamber 打开一个项目（git 仓库）。");return v_},n=async()=>{let _=d();if(!_)return;Y("刷新…");try{let E=await g("GET",`/status?dir=${encodeURIComponent(_)}`),O=JSON.parse(E.body);if(!O.ok){Y(O.error??"不是 git 仓库");return}EE.textContent=`${O.branch??"?"}${O.upstream?` → ${O.upstream}`:""} · ↑${O.ahead??0} ↓${O.behind??0} · ${O.files?.length??0} 个变更`;try{let C=await g("GET",`/branches?dir=${encodeURIComponent(_)}`),N=JSON.parse(C.body);if(N.ok&&N.branches){xT.innerHTML="";for(let Z of N.branches){let z=document.createElement("option");if(z.value=Z.name,z.textContent=`${Z.current?"● ":""}${Z.name}`,Z.current)z.selected=!0;xT.appendChild(z)}}}catch{}if(V_.innerHTML="",bS=new Set((O.files??[]).filter((C)=>C.staged.trim()!==""&&C.staged!=="?"&&C.staged!==" ").map((C)=>C.path)),!O.files||O.files.length===0)V_.innerHTML='<span class="muted">干净，无变更</span>';for(let C of O.files??[]){let N=document.createElement("div");N.className="file";let Z=document.createElement("input");Z.type="checkbox",Z.checked=bS.has(C.path),Z.onchange=async()=>{let h=d();if(!h){Z.checked=!Z.checked;return}let a=Z.checked?"/stage":"/unstage";await g("POST",a,{dir:h,paths:[C.path]}),n()};let z=document.createElement("span");z.className="p",z.textContent=C.path,z.title=C.path;let y=document.createElement("span");y.className="badge",y.textContent=`${C.staged.trim()||"·"}${C.unstaged.trim()||"·"}`,N.append(Z,z,y),V_.appendChild(N)}U_.setBadge(O.files&&O.files.length>0?O.files.length:null).catch(()=>{return});let D=(O.recent??[]).map((C)=>`${C.sha} ${C.subject}`).join(`
`);Y(D?`最近：
${D}`:"就绪")}catch(E){Y(E instanceof M?`${E.code}: ${E.message}`:String(E))}};K("btn-refresh").onclick=()=>void n();K("btn-pull").onclick=async()=>{let _=d();if(!_)return;Y("pull…");try{let E=await g("POST","/pull",{dir:_});Y(JSON.parse(E.body).output??JSON.parse(E.body).error??"完成"),n()}catch(E){Y(String(E))}};K("btn-push").onclick=async()=>{let _=d();if(!_)return;Y("push…");try{let E=await g("POST","/push",{dir:_}),O=JSON.parse(E.body);Y(O.ok?O.output||"已推送":O.output||O.error||"推送失败"),n()}catch(E){Y(String(E))}};K("btn-sw").onclick=async()=>{let _=d();if(!_)return;let E=xT.value||prompt("切换到分支：")||"";if(!E)return;Y(`切换到 ${E}…`);let O=await g("POST","/checkout",{dir:_,branch:E}),D=JSON.parse(O.body);Y(D.ok?`已切换到 ${E}`:D.output||D.error||"切换失败"),n()};K("btn-new-branch").onclick=async()=>{let _=d();if(!_)return;let E=prompt("新分支名：")||"";if(!E)return;let O=await g("POST","/checkout",{dir:_,branch:E,create:!0}),D=JSON.parse(O.body);Y(D.ok?`已创建并切换到 ${E}`:D.output||D.error||"创建失败"),n()};K("btn-diff").onclick=async()=>{let _=d();if(!_)return;let E=V_.querySelector(".file .p")?.textContent;if(!E){Y("无可 diff 文件");return}let O=await g("GET",`/diff?dir=${encodeURIComponent(_)}&file=${encodeURIComponent(E)}`),D=JSON.parse(O.body);HT.hidden=!1,HT.textContent=(D.diff||"").slice(0,8000)||"(空)"};K("btn-stage-all").onclick=async()=>{let _=d();if(!_)return;let E=[...V_.querySelectorAll(".file .p")].map((O)=>O.textContent??"").filter(Boolean);if(E.length===0)return;await g("POST","/stage",{dir:_,paths:E}),n()};K("btn-commit").onclick=async()=>{let _=d();if(!_)return;let E=p_.value.trim();if(!E){Y("先写提交信息");return}Y("提交…");let O=await g("POST","/commit",{dir:_,message:E,amend:UE.checked,push:HS.checked}),D=JSON.parse(O.body);if(Y(D.ok?"已提交"+(HS.checked?"并推送":""):D.error||"提交失败"),D.ok)p_.value="";n()};K("btn-ai").onclick=async()=>{let _=d();if(!_)return;Y("AI 生成中…");try{let E=await g("GET",`/status?dir=${encodeURIComponent(_)}`),O=JSON.parse(E.body),D=(O.files??[]).map((N)=>`${N.staged}${N.unstaged} ${N.path}`).join(`
`).slice(0,4000),{text:C}=await U_.generate({system:"你是提交信息助手。只输出一行 Conventional Commits 中文/英文短句，如 feat: xxx。无多余解释。",prompt:`分支 ${O.branch}
变更：
${D}`,maxOutputTokens:200});p_.value=C.trim(),Y("已填入，可改后提交")}catch(E){Y(E instanceof M?`${E.code}: 无小模型或未授权 model 能力`:String(E))}};K("btn-open-git").onclick=()=>{U_.openSurface("git").catch(()=>Y("内置 Git 面板打不开"))};U_.onResolve(async({args:_})=>{if(_.trim())p_.value=_.trim();return Y("已从 /commit 填入信息"),null});U_.onReady((_)=>{kT(_,document.documentElement);let E=_.directory??null;if(E!==v_)v_=E,HT.hidden=!0,n()});})();
