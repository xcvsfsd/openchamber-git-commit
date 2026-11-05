(()=>{var X="openchamber.sdk",I=1;var r_=`
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
`;function aT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(V)=>{let C=V.target===_?E:V.target;if(!(C instanceof Element))return;if(!C.hasAttribute("data-oc-scrolling"))C.setAttribute("data-oc-scrolling","");let Y=O.get(C);if(Y!==void 0)clearTimeout(Y);O.set(C,setTimeout(()=>{O.delete(C),C.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var yS=`(${aT.toString()})(document);`;var s_=128,t_=65536;var k_=128;var z_=65536;var sT=/^[a-z][a-z0-9-]{0,39}$/;var oT=(_)=>Object(_)===_&&!Array.isArray(_),e_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),iT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,rT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,tT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!oT(O)||!sT.test(O.id)||!iT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!e_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!e_(O,["kind","id","label","value","options","disabled"]))return!1;if(!rT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let V=new Set;for(let C of O.options){if(!oT(C)||!e_(C,["value","label"])||!rT(C.value)||!iT(C.label)||V.has(C.value))return!1;V.add(C.value)}if(!V.has(O.value))return!1}return!0};var eT=["{id}","{segment}","{segments+}"];var XE=new Set(eT);var _S=["turn-finished","turn-failed","permission-asked","question-asked"];var VE=new Set(_S);var f_=20000000,F_=256;var _T=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,TS=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var SS=/^[A-Za-z0-9_-]{1,80}$/;var ES=["left","right","top","bottom"];var OS=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let V=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let C of V)if(!OS(C,E+1,O))return!1;return!0},TT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(TT);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(TT)}return String(_)===_||Number.isFinite(_)},ST=(_)=>{try{if(String(_.id)!==_.id||!SS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!ES.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!OS(_.data)||!TT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var AS=["file","directory","other","missing"],OT=(_)=>Boolean(_&&"sessionId"in _),UT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var MS=/^[0-9a-f]{7,64}$/i,AT=(_)=>MS.test(_),J_=500,B_=32000,RS=16000,CS=128,GS=200,DS=2000,XS=16000,IS=80,VS=200,NS=16000;var WS=2000;var MT=20000,K_=1024,j_=2000000;var x_=64000,H_=8000,RT=4000;var CT=960000;var PS=999,$S=1e4,X_=500,LS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],YS=["stopped","starting","ready","failed"],mS=new Set(LS),QS=(_)=>mS.has(_),ZS=(_)=>_&&QS(_)?_:"HOST_REJECTED",t=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(t);if(Object(_)===_)return Object.values(_).every(t);return!1},kS=(_)=>t(_)&&JSON.stringify(_).length<=NS,US=(_)=>_?.trim().slice(0,VS)??"",e=(_)=>{let E=_.id.trim().slice(0,CS),O=_.title.trim().slice(0,GS),V=_.url.trim().slice(0,DS),C=_.text?.trim().slice(0,XS),Y=_.author?.trim().slice(0,IS),f=_.kind==="pull"?"pull":"issue",F={providerId:_.providerId.trim(),id:E,title:O||E,url:V,kind:f};if(C)F.text=C;if(Y)F.author=Y;if(f==="pull"){let H=US(_.branches?.head),v=US(_.branches?.base);if(H&&v)F.branches={head:H,base:v}}if(kS(_.data))F.data=_.data;return F},GT=(_)=>{let E=e(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},DT=(_)=>{let E={text:_.text.trim().slice(0,RS)};if(_.send)E.send=!0;return E},XT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(PS,Math.max(0,Math.round(_)))},IT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min($S,Math.max(0,Math.ceil(_)))};var __=(_)=>_.length>0&&_.length<=K_&&!_.includes("\x00")&&!_.includes("\\");var w_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>WS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},gS=new Set(YS),VT=(_)=>Boolean(_&&"status"in _&&gS.has(String(_.status))&&!("body"in _)),b_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),NT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),WT=(_)=>Boolean(_&&"written"in _&&_.written===!0),PT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),cS=new Set(AS),$T=(_)=>Boolean(_&&"kind"in _&&"size"in _&&cS.has(String(_.kind))&&Number.isFinite(_.size)),LT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),dS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),pS=(_)=>Object(_)===_?_:null,ET=(_)=>String(_)===_&&_.length>0,vS=(_)=>{if(!ET(_.id))return null;if(_.ok===!0){let E={channel:X,v:I,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&ET(_.error))return{channel:X,v:I,type:"result",id:_.id,ok:!1,error:_.error,code:ZS(ET(_.code)?_.code:void 0)};return null},YT=(_)=>{let E=pS(_);if(!E||E.channel!==X||E.v!==I)return null;if(E.type==="result")return vS(E);if(!dS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var zS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),uS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var fS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),q_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${K_} characters without NUL or backslash.`)),y_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},D=(_)=>{return _.value+=1,`oc-${_.value}`},QT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),V=_.requestTimeoutMs??MT,C=new Set,Y=new Set,f=new Set,F=new Set,H=new Set,v=new Set,U_=new Set,W_=new Set,P_=new Set,o=new Set,l_=[],A_=null,M_=null,$_=new Set,L_=new Set,R_=null,C_=null,n_=!1,i=new Map,r=new Map,s=new Map,h=!1,G={value:0},R=null,g=null,G_=!1,D_=!1,qT=null,yT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},w=(T)=>{E.parent.postMessage(T,"*")},hT=()=>{if(h||E.parent===E||o.size===0||R?.features?.lateGenerateResults!==!0)return;w({channel:X,v:I,type:"generate-late-listen"})},Q=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},mT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=YT(T.data);if(!S)return;if(S.type==="workspace"){let A=r.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="shells"){let A=s.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,g=yT(S.payload.session),Q(C,S.payload),Q(Y,S.payload.directory),Q(f,S.payload.session),g)Q(F,g);Q(H,S.payload.connection),Q(v,S.payload.settings),Q(U_,S.payload.item),hT();return}if(S.type==="generate-late"){if(o.size===0)l_.push(S.payload);else Q(o,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};Q(Y,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)g=null;else if(g?.sessionId!==S.payload.session.id)g=yT(S.payload.session);Q(f,S.payload.session);return}if(S.type==="session-lifecycle"){g=S.payload,Q(F,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};Q(H,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};Q(v,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};Q(U_,S.payload.item);return}if(S.type==="status-control-event"){Q(W_,S.payload);return}if(S.type==="popover-closed"){Q(P_,S.payload);return}if(S.type==="action"){let A=(N)=>{if(!h)w({channel:X,v:I,type:"action-result",id:S.id,payload:N})},W=M_;if(!W){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(S.payload)).then(()=>A({ok:!0}),(N)=>{let z=(N instanceof Error?N.message:String(N)).trim();A({ok:!1,error:(z||"Action failed.").slice(0,X_)})});return}if(S.type==="file-open"){let A=S.payload;if(C_&&TS(C_,A))return;C_=A,Q($_,S.payload);return}if(S.type==="file-saved"){Q(L_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(z)=>{if(!h)w({channel:X,v:I,type:"file-snapshot-result",id:S.id,payload:z})},W=(z)=>A({error:(z.trim()||"Could not read the edited file.").slice(0,X_)}),N=R_;if(!N){W("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((z)=>{if(_T(z)>f_){W(`The file is over ${f_} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>F_){W(`The snapshot version is over ${F_} characters.`);return}A({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},(z)=>W(z instanceof Error?z.message:String(z)));return}if(S.type==="resolve"){let A=(N)=>{w({channel:X,v:I,type:"resolve-result",id:S.id,payload:N})},W=A_;if(!W){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(S.payload)).then((N)=>A({item:N?e(N):null}),(N)=>{let z=(N instanceof Error?N.message:String(N)).trim();A({error:(z||"Command failed.").slice(0,X_)})});return}let U=i.get(S.id);if(!U)return;if(clearTimeout(U.timer),i.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",mT),w({channel:X,v:I,type:"hello"});let J=(T,S=V)=>{if(h||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let W=setTimeout(()=>{i.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);i.set(T.id,{resolve:U,reject:A,timer:W}),w(T)})},Z=(T)=>J(T).then(()=>{return}),k={channel:X,v:I},a_=(T)=>{if(!h&&E.parent!==E)w(T)},gT=()=>a_({...k,type:"file-save"}),cT=(T)=>{if(!zS(T)||!uS(T))return;T.preventDefault(),gT()},dT=(T)=>{if(!zS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),lT(R.popover.id,"escape").catch(()=>{return})},Y_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=G_||D_;if(qT===S)return;qT=S,nT(T.id,S).catch(()=>{return})},Q_=()=>{if(R?.surface!=="popover"||G_)return;G_=!0,Y_()},pT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!G_)return;G_=!1,Y_()},vT=()=>{if(R?.surface!=="popover"||D_)return;D_=!0,Y_()},uT=()=>{if(R?.surface!=="popover"||!D_)return;D_=!1,Y_()},y=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},o_=async(T)=>{if(T.kind!=="projects")y(T.projectId);let S=await J({...k,type:"workspace-read",id:D(G),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},i_=async(T,S)=>{if(T.kind!=="projects")y(T.projectId);let U=D(G);r.set(U,S);try{await Z({...k,type:"workspace-subscribe",id:D(G),payload:{subscriptionId:U,query:T}})}catch(A){if(r.delete(U),!h)w({...k,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:U}});throw A}return()=>{if(!r.delete(U)||h)return;w({...k,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:U}})}},qS=async(T,S)=>{if(T.kind==="session")y(T.sessionId);if(T.kind==="project")y(T.projectId);let U=D(G);s.set(U,S);try{await Z({...k,type:"shells-subscribe",id:D(G),payload:{subscriptionId:U,scope:T}})}catch(A){if(s.delete(U),!h)w({...k,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:U}});throw A}return()=>{if(!s.delete(U)||h)return;w({...k,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:U}})}},Z_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>s_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!t(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>t_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await J({...k,type:"storage",id:D(G),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},lT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...k,type:"popover-close",id:D(G),payload:S?{id:T,reason:S}:{id:T}}),nT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...k,type:"popover-anchor",id:D(G),payload:{id:T,active:S}});return E.addEventListener("keydown",dT,!0),E.addEventListener("pointerover",Q_),E.addEventListener("pointermove",Q_),E.addEventListener("pointerout",pT),E.addEventListener("focus",vT),E.addEventListener("blur",uT),{onAction:(T)=>{return M_=T,()=>{if(M_===T)M_=null}},listProjects:async()=>{let T=await o_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await o_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await o_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>i_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>i_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>i_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>qS(T,S),readShellOutput:async(T,S)=>{y(T,k_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>z_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${z_}.`);let N=await J({...k,type:"shell-output",id:D(G),payload:{shellId:T,cursor:U,tailBytes:A}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(y(T,k_),(await J({...k,type:"shell-stop",id:D(G),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{y(T),await Z({...k,type:"open-session",id:D(G),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=y_(S),A={op:"get",key:T};if(U)A.scope=U;let W=await Z_(A);return W.op==="get"&&W.found?W.value:void 0},set:async(T,S,U)=>{let A=y_(U),W={op:"set",key:T,value:S};if(A)W.scope=A;await Z_(W)},delete:async(T,S)=>{let U=y_(S),A={op:"delete",key:T};if(U)A.scope=U;await Z_(A)},keys:async(T)=>{let S=y_(T),U={op:"keys"};if(S)U.scope=S;let A=await Z_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(C.add(T),R)T(R);return()=>{C.delete(T)}},onDirectory:(T)=>{if(Y.add(T),R)T(R.directory);return()=>{Y.delete(T)}},onSession:(T)=>{if(f.add(T),R)T(R.session);return()=>{f.delete(T)}},onSessionLifecycle:(T)=>{if(F.add(T),g)T(g);return()=>{F.delete(T)}},onConnection:(T)=>{if(H.add(T),R)T(R.connection);return()=>{H.delete(T)}},onSettings:(T)=>{if(v.add(T),R)T(R.settings);return()=>{v.delete(T)}},onItem:(T)=>{if(U_.add(T),R)T(R.item);return()=>{U_.delete(T)}},onStatusControl:(T)=>{return W_.add(T),()=>{W_.delete(T)}},onPopoverClosed:(T)=>{return P_.add(T),()=>{P_.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!tT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Z({...k,type:"status-controls",id:D(G),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!ST(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Z({...k,type:"popover-open",id:D(G),payload:T})},closePopover:lT,setPopoverAnchorActive:nT,onResolve:(T)=>{return A_=T,()=>{if(A_===T)A_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>J_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${J_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>B_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${B_} characters.`));return Z({channel:X,v:I,type:"toast",id:D(G),payload:{...T,message:S}})},openUrl:(T)=>Z({channel:X,v:I,type:"open-url",id:D(G),payload:{url:T}}),openCommit:(T)=>AT(T)?Z({channel:X,v:I,type:"open-commit",id:D(G),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Z({channel:X,v:I,type:"open-surface",id:D(G),payload:{surfaceId:T}}),writeClipboard:(T)=>Z({channel:X,v:I,type:"clipboard-write",id:D(G),payload:{text:T}}),compose:(T)=>Z({channel:X,v:I,type:"compose",id:D(G),payload:T}),attach:(T)=>Z({channel:X,v:I,type:"attach",id:D(G),payload:e(T)}),startSession:async(T)=>{if(T.projectId!==void 0)y(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")y(S.directory);else{if(S.name!==void 0)y(S.name,200);if(S.baseBranch!==void 0)y(S.baseBranch,200)}let U=await J({channel:X,v:I,type:"start-session",id:D(G),payload:GT(T)},_.requestTimeoutMs??180000);if(!OT(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>J({channel:X,v:I,type:"prompt",id:D(G),payload:DT(T)}).then((S)=>{if(!UT(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Z({channel:X,v:I,type:"session-link",id:D(G),payload:e(T)}),close:()=>Z({channel:X,v:I,type:"close",id:D(G)}),oauthStart:()=>Z({channel:X,v:I,type:"oauth-start",id:D(G)}),oauthDisconnect:()=>Z({channel:X,v:I,type:"oauth-disconnect",id:D(G)}),request:(T)=>(w_(T.path)?J({channel:X,v:I,type:"request",id:D(G),payload:T}):fS()).then((S)=>{if(!b_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(w_(T.path)?J({channel:X,v:I,type:"service-request",id:D(G),payload:T}):fS()).then((S)=>{if(!b_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>J({channel:X,v:I,type:"service-status",id:D(G)}).then((T)=>{if(!VT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(__(T)?J({channel:X,v:I,type:"file-read",id:D(G),payload:{path:T}}):q_()).then((S)=>{if(!NT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!__(T))return q_();if(S.length>j_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${j_} characters.`));return J({channel:X,v:I,type:"file-write",id:D(G),payload:{path:T,content:S}}).then((U)=>{if(!WT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(__(T)?J({channel:X,v:I,type:"file-list",id:D(G),payload:{path:T}}):q_()).then((S)=>{if(!PT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(__(T)?J({channel:X,v:I,type:"file-stat",id:D(G),payload:{path:T}}):q_()).then((S)=>{if(!$T(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>x_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${x_} characters.`));if(U!==void 0&&(U.length===0||U.length>H_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${H_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(RT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:S};if(U!==void 0)W.system=U;if(A!==void 0)W.maxOutputTokens=A;return J({channel:X,v:I,type:"generate",id:D(G),payload:W},_.requestTimeoutMs??CT).then((N)=>{if(!LT(N))throw new M("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{o.add(T);for(let S of l_.splice(0))Q([T],S);return hT(),()=>{o.delete(T)}},setBadge:(T)=>Z({channel:X,v:I,type:"badge",id:D(G),payload:{count:XT(T)}}),setHeight:(T)=>Z({channel:X,v:I,type:"resize",id:D(G),payload:{height:IT(T)}}),onFileOpen:(T)=>{if($_.add(T),!n_)n_=!0,E.addEventListener("keydown",cT,!0);if(C_)T(C_);return()=>{$_.delete(T)}},onFileSnapshot:(T)=>{return R_=T,()=>{if(R_===T)R_=null}},onFileSaved:(T)=>{return L_.add(T),()=>{L_.delete(T)}},reportFileChange:(T)=>a_({...k,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:gT,reportFileUnsupported:()=>a_({...k,type:"file-unsupported"}),dispose:()=>{for(let T of r.keys())w({...k,type:"workspace-unsubscribe",id:D(G),payload:{subscriptionId:T}});r.clear();for(let T of s.keys())w({...k,type:"shells-unsubscribe",id:D(G),payload:{subscriptionId:T}});if(s.clear(),h=!0,A_=null,M_=null,R_=null,$_.clear(),L_.clear(),n_)E.removeEventListener("keydown",cT,!0);E.removeEventListener("message",mT),E.removeEventListener("keydown",dT,!0),E.removeEventListener("pointerover",Q_),E.removeEventListener("pointermove",Q_),E.removeEventListener("pointerout",pT),E.removeEventListener("focus",vT),E.removeEventListener("blur",uT);for(let T of i.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));i.clear(),C.clear(),Y.clear(),f.clear(),F.clear(),H.clear(),v.clear(),U_.clear(),W_.clear(),P_.clear(),o.clear(),l_.length=0}}};var FS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var BE=new Set(FS);var JS=["none","agent","user"];var jE=new Set(JS);var lS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],nS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],BS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,V]of lS)E.style.setProperty(O,_.tokens[V]);for(let[O,V,C]of nS){let Y=_.tokens[C]??"";E.style.setProperty(O,Y),E.style.setProperty(V,Y)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},ZT=(_,E)=>{if(BS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var aS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(_,E)=>`var(--${_}, var(--oc-${aS[_]}, ${E}))`,d=P("surface-background","transparent"),m_=P("surface-elevated","transparent"),T_=P("surface-elevated-foreground","inherit"),b=P("surface-foreground","inherit"),$=P("surface-muted-foreground","gray"),oS=P("surface-muted","transparent"),l=P("interactive-border","currentColor"),K=P("interactive-hover","transparent"),n=P("interactive-active","transparent"),kT=P("interactive-selection","transparent"),zT=P("interactive-selection-foreground","inherit"),c=P("primary","currentColor"),fT=P("primary-text","inherit"),FT=P("error-text","inherit"),iS=P("font-sans","inherit"),JT=P("font-mono","monospace"),HS=P("radius","9px"),BT=`calc(${HS} - 2px)`,KS=`calc(${HS} - 4px)`,L=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,jS=`background-image: linear-gradient(${K}, ${K});`,KT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,jT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",xS="box-shadow: var(--oc-sdk-lit);",xT=`inset 0 0.5px 0 0 ${L(b,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,rS=`
:root {
  --oc-sdk-edge: ${L(b,16)};
  --oc-sdk-field-bg: ${m_};
  --oc-sdk-raised-bg: ${d};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(b,14)};
  --oc-sdk-field-bg: ${L(d,50,m_)};
  --oc-sdk-raised-bg: ${m_};
  --oc-sdk-field-lift: ${xT};
  --oc-sdk-raised-lift: ${xT};
  --oc-sdk-lit: ${xT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,h_=(_)=>{let E=P(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${P(`${_}-text`,"inherit")}; }`},sS=`
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
`,wS=`${rS}
.oc-sdk { color: ${b}; font-family: ${iS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${jS} }
.oc-sdk-mono { font-family: ${JT}; }
.oc-sdk-muted { color: ${$}; }
${h_("success")}${h_("warning")}${h_("error")}${h_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${c}; --oc-sdk-tone-text: ${fT}; }

.oc-sdk-btn { border-radius: ${BT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${KS}; }
.oc-sdk-btn[data-variant="default"] { color: ${fT}; background: ${L(c,10,d)}; border-color: ${L(c,12)}; ${xS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(c,16,d)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(c,22,d)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${oS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${n}, ${n}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${T_}; ${jT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${n}, ${n}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${K}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${n}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${FT}; background: ${L("var(--oc-sdk-tone)",7,d)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${xS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,d)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,d)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${FT}; }
.oc-sdk-input { border-radius: ${BT}; background: var(--oc-sdk-field-bg); color: ${T_}; ${KT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${KT(L(b,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${KT(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${JT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${c}; }
.oc-sdk-search-clear { border-radius: ${KS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${K}; color: ${b}; }

.oc-sdk-trigger { border-radius: ${BT}; background: var(--oc-sdk-raised-bg); color: ${T_}; ${jT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${n}, ${n}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${T_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${m_}; background-clip: padding-box; color: ${T_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${K}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${kT}; color: ${zT}; }
.oc-sdk-option-check { color: ${b}; }
.oc-sdk-option[data-destructive="true"] { color: ${FT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${l}; border-radius: 4px; color: ${b}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(b,60,l)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${l}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${d}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${c}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${jS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(b,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${b}; }
.oc-sdk-tab[aria-selected="true"] { color: ${zT}; background: ${kT}; border-color: ${l}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${T_}; background: var(--oc-sdk-raised-bg); ${jT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(b,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${K}; }
.oc-sdk-row[aria-selected="true"] { background: ${kT}; color: ${zT}; }
.oc-sdk-row-lead { font-family: ${JT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${l}; border-top-color: ${c}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(l,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(b,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${c}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${fT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(l,60)}; }
`,B=`
${r_}
${sS}
${wS}`;var V_=QT(),bS=document.querySelector("#root");if(!bS)throw Error("Missing #root");bS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:12px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.top{display:flex;gap:8px;align-items:center}
select{flex:1;padding:6px 8px;border:1px solid var(--border,#3333);border-radius:8px;background:inherit;color:inherit}
button{padding:6px 12px;border:1px solid var(--border,#3333);border-radius:8px;background:inherit;color:inherit;cursor:pointer;white-space:nowrap}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5}
.sync{font-size:12px;opacity:.75}
.empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:40px 0;opacity:.8}
.empty .ic{font-size:28px;opacity:.4}
.file{display:flex;gap:8px;align-items:center;padding:6px 4px;border-bottom:1px solid #8882;font-family:monospace;font-size:12px}
.file .p{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
textarea{width:100%;min-height:64px;padding:8px;border:1px solid var(--border,#3333);border-radius:8px;background:inherit;color:inherit;resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:12px;opacity:.65}
.err{font-size:12px;color:var(--error,#d33);white-space:pre-wrap}
</style>
<div class="top">
  <select id="branch" title="分支"></select>
  <button id="btn-sync" title="fetch 并对比远程">同步</button>
</div>
<div id="sync" class="sync">等待项目…</div>
<div id="body" style="flex:1;display:flex;flex-direction:column;gap:8px"></div>
<div id="commitBox">
  <textarea id="msg" placeholder="提交信息，如 feat: xxx"></textarea>
  <div class="row" style="margin-top:8px">
    <button id="btn-ai" title="AI 生成提交信息">✨</button>
    <span style="flex:1"></span>
    <button id="btn-commit" class="primary">提交并推送</button>
  </div>
  <div id="out" class="mut"></div>
</div>
`;var u=(_)=>document.querySelector(`#${_}`),E_=u("branch"),m=u("sync"),v_=u("body"),u_=u("msg"),O_=u("out"),q=null,wT=!1,a=(_,E,O)=>V_.serviceRequest({method:_,path:E,body:O===void 0?void 0:JSON.stringify(O)}),N_=async()=>{if(!q||wT)return;wT=!0;let _=q;m.textContent="同步中…";try{await a("POST","/fetch",{dir:_}).catch(()=>{return});let E=await a("GET",`/status?dir=${encodeURIComponent(_)}`),O=JSON.parse(E.body);if(!O.ok){m.textContent=O.error??"不是 git 仓库",bT("不是 git 仓库");return}try{let Y=await a("GET",`/branches?dir=${encodeURIComponent(_)}`),f=JSON.parse(Y.body);if(f.ok&&f.branches){E_.innerHTML="";for(let F of f.branches){let H=document.createElement("option");if(H.value=F.name,H.textContent=F.name,F.current)H.selected=!0;E_.appendChild(H)}}}catch{}let V=O.ahead??0,C=O.behind??0;if(C>0&&V>0)m.textContent=`远程有 ${C} 个新提交，本地超前 ${V}`;else if(C>0)m.textContent=`远程有 ${C} 个新提交，可 Pull`;else if(V>0)m.textContent=`本地超前 ${V}，可 Push`;else m.textContent="已是最新";SE(O),V_.setBadge(O.files?.length?O.files.length:null).catch(()=>{return})}catch(E){m.textContent=E instanceof M?`${E.code}`:"同步失败"}finally{wT=!1}},bT=(_)=>{v_.innerHTML="";let E=document.createElement("div");E.className="empty",E.innerHTML=`<div class="ic">—○—</div><div>工作区干净</div><div class="mut">${_}</div>`,v_.appendChild(E)},SE=(_)=>{v_.innerHTML="";let E=_.files??[];if(E.length===0){bT("来吧，写点代码，改动自然就来了。");return}for(let O of E){let V=document.createElement("div");V.className="file";let C=document.createElement("input");C.type="checkbox",C.checked=O.staged.trim()!==""&&O.staged!=="?"&&O.staged!==" ",C.title=C.checked?"已暂存，点取消":"未暂存，点暂存",C.onchange=async()=>{if(!q)return;await a("POST",C.checked?"/stage":"/unstage",{dir:q,paths:[O.path]}),N_()};let Y=document.createElement("span");Y.className="p",Y.textContent=O.path,Y.title=O.path;let f=document.createElement("span");f.className="mut",f.textContent=`${O.staged.trim()||"·"}${O.unstaged.trim()||"·"}`,V.append(C,Y,f),v_.appendChild(V)}};u("btn-sync").onclick=()=>void N_();E_.onchange=async()=>{if(!q||!E_.value)return;m.textContent=`切换到 ${E_.value}…`;let _=await a("POST","/checkout",{dir:q,branch:E_.value}),E=JSON.parse(_.body);if(!E.ok)m.textContent=E.output||E.error||"切换失败";N_()};u("btn-commit").onclick=async()=>{if(!q)return;let _=u_.value.trim();if(!_){O_.textContent="先写提交信息";return}O_.textContent="提交…";let E=await a("POST","/commit",{dir:q,message:_,push:!0}),O=JSON.parse(E.body);if(O_.textContent=O.ok?"已提交并推送":O.error||"提交失败",O.ok)u_.value="";N_()};u("btn-ai").onclick=async()=>{if(!q)return;O_.textContent="AI 生成中…";try{let _=await a("GET",`/status?dir=${encodeURIComponent(q)}`),E=JSON.parse(_.body),O=(E.files??[]).map((C)=>`${C.staged}${C.unstaged} ${C.path}`).join(`
`).slice(0,3000),{text:V}=await V_.generate({system:"只输出一行 Conventional Commits 短句，无解释。",prompt:`分支 ${E.branch}
${O}`,maxOutputTokens:100});u_.value=V.trim(),O_.textContent=""}catch{O_.textContent="无小模型或未授权 model"}};V_.onResolve(async({args:_})=>{if(_.trim())u_.value=_.trim();return null});V_.onReady((_)=>{ZT(_,document.documentElement);let E=_.directory??null;if(E!==q){if(q=E,!q){m.textContent="无项目",bT("先打开一个项目");return}N_()}});})();
