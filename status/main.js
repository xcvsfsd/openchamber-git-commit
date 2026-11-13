(()=>{var D="openchamber.sdk",X=1;var r_=`
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
`;function sT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let U=new WeakMap;_.addEventListener("scroll",(V)=>{let I=V.target===_?E:V.target;if(!(I instanceof Element))return;if(!I.hasAttribute("data-oc-scrolling"))I.setAttribute("data-oc-scrolling","");let z=U.get(I);if(z!==void 0)clearTimeout(z);U.set(I,setTimeout(()=>{U.delete(I),I.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var pS=`(${sT.toString()})(document);`;var s_=128,t_=65536;var k_=128;var z_=65536;var TS=/^[a-z][a-z0-9-]{0,39}$/;var tT=(_)=>Object(_)===_&&!Array.isArray(_),e_=(_,E)=>Object.keys(_).every((U)=>E.includes(U)),eT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,_S=(_)=>String(_)===_&&_.length>=1&&_.length<=80,SS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let U of _){if(!tT(U)||!TS.test(U.id)||!eT(U.label))return!1;if(U.disabled!==void 0&&U.disabled!==!0&&U.disabled!==!1)return!1;if(E.has(U.id))return!1;if(E.add(U.id),U.kind==="button"){if(!e_(U,["kind","id","label","disabled"]))return!1;continue}if(U.kind!=="select"||!e_(U,["kind","id","label","value","options","disabled"]))return!1;if(!_S(U.value)||!Array.isArray(U.options)||U.options.length<1||U.options.length>16)return!1;let V=new Set;for(let I of U.options){if(!tT(I)||!e_(I,["value","label"])||!_S(I.value)||!eT(I.label)||V.has(I.value))return!1;V.add(I.value)}if(!V.has(U.value))return!1}return!0};var ES=["{id}","{segment}","{segments+}"];var ZE=new Set(ES);var OS=["turn-finished","turn-failed","permission-asked","question-asked"];var kE=new Set(OS);var F_=20000000,J_=256;var _T=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,US=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let U=0;U<_.bytes.byteLength;U+=1)if(_.bytes[U]!==E.bytes[U])return!1;return!0};var AS=/^[A-Za-z0-9_-]{1,80}$/;var MS=["left","right","top","bottom"];var RS=(_,E=0,U={remaining:16000})=>{if(--U.remaining<0||E>=32)return!1;if(_===null)return!0;let V=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let I of V)if(!RS(I,E+1,U))return!1;return!0},TT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(TT);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(TT)}return String(_)===_||Number.isFinite(_)},ST=(_)=>{try{if(String(_.id)!==_.id||!AS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!MS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!RS(_.data)||!TT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var GS=["file","directory","other","missing"],OT=(_)=>Boolean(_&&"sessionId"in _),UT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var DS=/^[0-9a-f]{7,64}$/i,AT=(_)=>DS.test(_),B_=500,K_=32000,XS=16000,IS=128,VS=200,NS=2000,WS=16000,PS=80,$S=200,LS=16000;var YS=2000;var MT=20000,j_=1024,w_=2000000;var H_=64000,x_=8000,RT=4000;var CT=960000;var QS=999,ZS=1e4,I_=500,fS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],kS=["stopped","starting","ready","failed"],uS=new Set(fS),zS=(_)=>uS.has(_),FS=(_)=>_&&zS(_)?_:"HOST_REJECTED",__=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(__);if(Object(_)===_)return Object.values(_).every(__);return!1},JS=(_)=>__(_)&&JSON.stringify(_).length<=LS,CS=(_)=>_?.trim().slice(0,$S)??"",T_=(_)=>{let E=_.id.trim().slice(0,IS),U=_.title.trim().slice(0,VS),V=_.url.trim().slice(0,NS),I=_.text?.trim().slice(0,WS),z=_.author?.trim().slice(0,PS),b=_.kind==="pull"?"pull":"issue",w={providerId:_.providerId.trim(),id:E,title:U||E,url:V,kind:b};if(I)w.text=I;if(z)w.author=z;if(b==="pull"){let W=CS(_.branches?.head),u=CS(_.branches?.base);if(W&&u)w.branches={head:W,base:u}}if(JS(_.data))w.data=_.data;return w},GT=(_)=>{let E=T_(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},DT=(_)=>{let E={text:_.text.trim().slice(0,XS)};if(_.send)E.send=!0;return E},XT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(QS,Math.max(0,Math.round(_)))},IT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(ZS,Math.max(0,Math.ceil(_)))};var S_=(_)=>_.length>0&&_.length<=j_&&!_.includes("\x00")&&!_.includes("\\");var b_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>YS)return!1;return!_.split("/").some((U)=>U==="."||U==="..")},lS=new Set(kS),VT=(_)=>Boolean(_&&"status"in _&&lS.has(String(_.status))&&!("body"in _)),q_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),NT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),WT=(_)=>Boolean(_&&"written"in _&&_.written===!0),PT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),nS=new Set(GS),$T=(_)=>Boolean(_&&"kind"in _&&"size"in _&&nS.has(String(_.kind))&&Number.isFinite(_.size)),LT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),aS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),oS=(_)=>Object(_)===_?_:null,ET=(_)=>String(_)===_&&_.length>0,iS=(_)=>{if(!ET(_.id))return null;if(_.ok===!0){let E={channel:D,v:X,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&ET(_.error))return{channel:D,v:X,type:"result",id:_.id,ok:!1,error:_.error,code:FS(ET(_.code)?_.code:void 0)};return null},YT=(_)=>{let E=oS(_);if(!E||E.channel!==D||E.v!==X)return null;if(E.type==="result")return iS(E);if(!aS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var BS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),rS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var KS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),y_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${j_} characters without NUL or backslash.`)),h_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},QT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let U=_.acceptSource??((T)=>T===E.parent),V=_.requestTimeoutMs??MT,I=new Set,z=new Set,b=new Set,w=new Set,W=new Set,u=new Set,A_=new Set,P_=new Set,$_=new Set,r=new Set,l_=[],M_=null,R_=null,L_=new Set,Y_=new Set,C_=null,G_=null,n_=!1,s=new Map,t=new Map,e=new Map,m=!1,C={value:0},R=null,c=null,D_=!1,X_=!1,gT=null,cT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},H=(T)=>{E.parent.postMessage(T,"*")},dT=()=>{if(m||E.parent===E||r.size===0||R?.features?.lateGenerateResults!==!0)return;H({channel:D,v:X,type:"generate-late-listen"})},Q=(T,S)=>{for(let O of T)try{O(S)}catch(A){console.error(A)}},pT=(T)=>{if(!(T instanceof MessageEvent))return;if(!U(T.source))return;let S=YT(T.data);if(!S)return;if(S.type==="workspace"){let A=t.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="shells"){let A=e.get(S.payload.subscriptionId);if(A)Q([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,c=cT(S.payload.session),Q(I,S.payload),Q(z,S.payload.directory),Q(b,S.payload.session),c)Q(w,c);Q(W,S.payload.connection),Q(u,S.payload.settings),Q(A_,S.payload.item),dT();return}if(S.type==="generate-late"){if(r.size===0)l_.push(S.payload);else Q(r,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};Q(z,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)c=null;else if(c?.sessionId!==S.payload.session.id)c=cT(S.payload.session);Q(b,S.payload.session);return}if(S.type==="session-lifecycle"){c=S.payload,Q(w,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};Q(W,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};Q(u,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};Q(A_,S.payload.item);return}if(S.type==="status-control-event"){Q(P_,S.payload);return}if(S.type==="popover-closed"){Q($_,S.payload);return}if(S.type==="action"){let A=(N)=>{if(!m)H({channel:D,v:X,type:"action-result",id:S.id,payload:N})},P=R_;if(!P){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>P(S.payload)).then(()=>A({ok:!0}),(N)=>{let k=(N instanceof Error?N.message:String(N)).trim();A({ok:!1,error:(k||"Action failed.").slice(0,I_)})});return}if(S.type==="file-open"){let A=S.payload;if(G_&&US(G_,A))return;G_=A,Q(L_,S.payload);return}if(S.type==="file-saved"){Q(Y_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(k)=>{if(!m)H({channel:D,v:X,type:"file-snapshot-result",id:S.id,payload:k})},P=(k)=>A({error:(k.trim()||"Could not read the edited file.").slice(0,I_)}),N=C_;if(!N){P("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((k)=>{if(_T(k)>F_){P(`The file is over ${F_} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>J_){P(`The snapshot version is over ${J_} characters.`);return}A({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>P(k instanceof Error?k.message:String(k)));return}if(S.type==="resolve"){let A=(N)=>{H({channel:D,v:X,type:"resolve-result",id:S.id,payload:N})},P=M_;if(!P){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>P(S.payload)).then((N)=>A({item:N?T_(N):null}),(N)=>{let k=(N instanceof Error?N.message:String(N)).trim();A({error:(k||"Command failed.").slice(0,I_)})});return}let O=s.get(S.id);if(!O)return;if(clearTimeout(O.timer),s.delete(S.id),S.ok){O.resolve(S.payload);return}O.reject(new M(S.code,S.error))};E.addEventListener("message",pT),H({channel:D,v:X,type:"hello"});let F=(T,S=V)=>{if(m||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((O,A)=>{let P=setTimeout(()=>{s.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);s.set(T.id,{resolve:O,reject:A,timer:P}),H(T)})},Z=(T)=>F(T).then(()=>{return}),f={channel:D,v:X},a_=(T)=>{if(!m&&E.parent!==E)H(T)},vT=()=>a_({...f,type:"file-save"}),uT=(T)=>{if(!BS(T)||!rS(T))return;T.preventDefault(),vT()},lT=(T)=>{if(!BS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),iT(R.popover.id,"escape").catch(()=>{return})},Q_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=D_||X_;if(gT===S)return;gT=S,rT(T.id,S).catch(()=>{return})},Z_=()=>{if(R?.surface!=="popover"||D_)return;D_=!0,Q_()},nT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!D_)return;D_=!1,Q_()},aT=()=>{if(R?.surface!=="popover"||X_)return;X_=!0,Q_()},oT=()=>{if(R?.surface!=="popover"||!X_)return;X_=!1,Q_()},y=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},o_=async(T)=>{if(T.kind!=="projects")y(T.projectId);let S=await F({...f,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},i_=async(T,S)=>{if(T.kind!=="projects")y(T.projectId);let O=G(C);t.set(O,S);try{await Z({...f,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:O,query:T}})}catch(A){if(t.delete(O),!m)H({...f,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:O}});throw A}return()=>{if(!t.delete(O)||m)return;H({...f,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:O}})}},dS=async(T,S)=>{if(T.kind==="session")y(T.sessionId);if(T.kind==="project")y(T.projectId);let O=G(C);e.set(O,S);try{await Z({...f,type:"shells-subscribe",id:G(C),payload:{subscriptionId:O,scope:T}})}catch(A){if(e.delete(O),!m)H({...f,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:O}});throw A}return()=>{if(!e.delete(O)||m)return;H({...f,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:O}})}},f_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>s_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!__(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>t_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await F({...f,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},iT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...f,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),rT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Z({...f,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",lT,!0),E.addEventListener("pointerover",Z_),E.addEventListener("pointermove",Z_),E.addEventListener("pointerout",nT),E.addEventListener("focus",aT),E.addEventListener("blur",oT),{onAction:(T)=>{return R_=T,()=>{if(R_===T)R_=null}},listProjects:async()=>{let T=await o_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await o_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await o_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>i_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>i_({kind:"worktrees",projectId:T},(O)=>{if(O.kind==="worktrees")S(O)}),onSessions:(T,S)=>i_({kind:"sessions",projectId:T},(O)=>{if(O.kind==="sessions")S(O)}),onRunningShells:(T,S)=>dS(T,S),readShellOutput:async(T,S)=>{y(T,k_);let O=S?.cursor;if(O!==void 0&&(!Number.isInteger(O)||O<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>z_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${z_}.`);let N=await F({...f,type:"shell-output",id:G(C),payload:{shellId:T,cursor:O,tailBytes:A}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(y(T,k_),(await F({...f,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{y(T),await Z({...f,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let O=h_(S),A={op:"get",key:T};if(O)A.scope=O;let P=await f_(A);return P.op==="get"&&P.found?P.value:void 0},set:async(T,S,O)=>{let A=h_(O),P={op:"set",key:T,value:S};if(A)P.scope=A;await f_(P)},delete:async(T,S)=>{let O=h_(S),A={op:"delete",key:T};if(O)A.scope=O;await f_(A)},keys:async(T)=>{let S=h_(T),O={op:"keys"};if(S)O.scope=S;let A=await f_(O);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(I.add(T),R)T(R);return()=>{I.delete(T)}},onDirectory:(T)=>{if(z.add(T),R)T(R.directory);return()=>{z.delete(T)}},onSession:(T)=>{if(b.add(T),R)T(R.session);return()=>{b.delete(T)}},onSessionLifecycle:(T)=>{if(w.add(T),c)T(c);return()=>{w.delete(T)}},onConnection:(T)=>{if(W.add(T),R)T(R.connection);return()=>{W.delete(T)}},onSettings:(T)=>{if(u.add(T),R)T(R.settings);return()=>{u.delete(T)}},onItem:(T)=>{if(A_.add(T),R)T(R.item);return()=>{A_.delete(T)}},onStatusControl:(T)=>{return P_.add(T),()=>{P_.delete(T)}},onPopoverClosed:(T)=>{return $_.add(T),()=>{$_.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!SS(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Z({...f,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!ST(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Z({...f,type:"popover-open",id:G(C),payload:T})},closePopover:iT,setPopoverAnchorActive:rT,onResolve:(T)=>{return M_=T,()=>{if(M_===T)M_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>B_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${B_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>K_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${K_} characters.`));return Z({channel:D,v:X,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>Z({channel:D,v:X,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>AT(T)?Z({channel:D,v:X,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Z({channel:D,v:X,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>Z({channel:D,v:X,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>Z({channel:D,v:X,type:"compose",id:G(C),payload:T}),attach:(T)=>Z({channel:D,v:X,type:"attach",id:G(C),payload:T_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)y(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")y(S.directory);else{if(S.name!==void 0)y(S.name,200);if(S.baseBranch!==void 0)y(S.baseBranch,200)}let O=await F({channel:D,v:X,type:"start-session",id:G(C),payload:GT(T)},_.requestTimeoutMs??180000);if(!OT(O))throw new M("HOST_REJECTED","Host did not return a session.");return O},prompt:(T)=>F({channel:D,v:X,type:"prompt",id:G(C),payload:DT(T)}).then((S)=>{if(!UT(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Z({channel:D,v:X,type:"session-link",id:G(C),payload:T_(T)}),close:()=>Z({channel:D,v:X,type:"close",id:G(C)}),oauthStart:()=>Z({channel:D,v:X,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>Z({channel:D,v:X,type:"oauth-disconnect",id:G(C)}),request:(T)=>(b_(T.path)?F({channel:D,v:X,type:"request",id:G(C),payload:T}):KS()).then((S)=>{if(!q_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(b_(T.path)?F({channel:D,v:X,type:"service-request",id:G(C),payload:T}):KS()).then((S)=>{if(!q_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>F({channel:D,v:X,type:"service-status",id:G(C)}).then((T)=>{if(!VT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(S_(T)?F({channel:D,v:X,type:"file-read",id:G(C),payload:{path:T}}):y_()).then((S)=>{if(!NT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!S_(T))return y_();if(S.length>w_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${w_} characters.`));return F({channel:D,v:X,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((O)=>{if(!WT(O))throw new M("HOST_REJECTED","Host did not confirm the write.");return O})},listDir:(T)=>(S_(T)?F({channel:D,v:X,type:"file-list",id:G(C),payload:{path:T}}):y_()).then((S)=>{if(!PT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(S_(T)?F({channel:D,v:X,type:"file-stat",id:G(C),payload:{path:T}}):y_()).then((S)=>{if(!$T(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),O=T.system?.trim();if(S.length===0||S.length>H_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${H_} characters.`));if(O!==void 0&&(O.length===0||O.length>x_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${x_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(RT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let P={prompt:S};if(O!==void 0)P.system=O;if(A!==void 0)P.maxOutputTokens=A;return F({channel:D,v:X,type:"generate",id:G(C),payload:P},_.requestTimeoutMs??CT).then((N)=>{if(!LT(N))throw new M("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{r.add(T);for(let S of l_.splice(0))Q([T],S);return dT(),()=>{r.delete(T)}},setBadge:(T)=>Z({channel:D,v:X,type:"badge",id:G(C),payload:{count:XT(T)}}),setHeight:(T)=>Z({channel:D,v:X,type:"resize",id:G(C),payload:{height:IT(T)}}),onFileOpen:(T)=>{if(L_.add(T),!n_)n_=!0,E.addEventListener("keydown",uT,!0);if(G_)T(G_);return()=>{L_.delete(T)}},onFileSnapshot:(T)=>{return C_=T,()=>{if(C_===T)C_=null}},onFileSaved:(T)=>{return Y_.add(T),()=>{Y_.delete(T)}},reportFileChange:(T)=>a_({...f,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:vT,reportFileUnsupported:()=>a_({...f,type:"file-unsupported"}),dispose:()=>{for(let T of t.keys())H({...f,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});t.clear();for(let T of e.keys())H({...f,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(e.clear(),m=!0,M_=null,R_=null,C_=null,L_.clear(),Y_.clear(),n_)E.removeEventListener("keydown",uT,!0);E.removeEventListener("message",pT),E.removeEventListener("keydown",lT,!0),E.removeEventListener("pointerover",Z_),E.removeEventListener("pointermove",Z_),E.removeEventListener("pointerout",nT),E.removeEventListener("focus",aT),E.removeEventListener("blur",oT);for(let T of s.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));s.clear(),I.clear(),z.clear(),b.clear(),w.clear(),W.clear(),u.clear(),A_.clear(),P_.clear(),$_.clear(),r.clear(),l_.length=0}}};var jS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var mE=new Set(jS);var wS=["none","agent","user"];var cE=new Set(wS);var sS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],tS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],HS=(_,E)=>{E.style.colorScheme=_.mode;for(let[U,V]of sS)E.style.setProperty(U,_.tokens[V]);for(let[U,V,I]of tS){let z=_.tokens[I]??"";E.style.setProperty(U,z),E.style.setProperty(V,z)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},ZT=(_,E)=>{if(HS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var eS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(_,E)=>`var(--${_}, var(--oc-${eS[_]}, ${E}))`,p=$("surface-background","transparent"),g_=$("surface-elevated","transparent"),E_=$("surface-elevated-foreground","inherit"),x=$("surface-foreground","inherit"),L=$("surface-muted-foreground","gray"),_E=$("surface-muted","transparent"),n=$("interactive-border","currentColor"),B=$("interactive-hover","transparent"),a=$("interactive-active","transparent"),fT=$("interactive-selection","transparent"),kT=$("interactive-selection-foreground","inherit"),d=$("primary","currentColor"),zT=$("primary-text","inherit"),FT=$("error-text","inherit"),TE=$("font-sans","inherit"),JT=$("font-mono","monospace"),yS=$("radius","9px"),BT=`calc(${yS} - 2px)`,xS=`calc(${yS} - 4px)`,Y=(_,E,U="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${U})`,bS=`background-image: linear-gradient(${B}, ${B});`,KT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,jT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",qS="box-shadow: var(--oc-sdk-lit);",wT=`inset 0 0.5px 0 0 ${Y(x,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,SE=`
:root {
  --oc-sdk-edge: ${Y(x,16)};
  --oc-sdk-field-bg: ${g_};
  --oc-sdk-raised-bg: ${p};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(x,14)};
  --oc-sdk-field-bg: ${Y(p,50,g_)};
  --oc-sdk-raised-bg: ${g_};
  --oc-sdk-field-lift: ${wT};
  --oc-sdk-raised-lift: ${wT};
  --oc-sdk-lit: ${wT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,m_=(_)=>{let E=$(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${$(`${_}-text`,"inherit")}; }`},EE=`
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
`,hS=`${SE}
.oc-sdk { color: ${x}; font-family: ${TE}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${bS} }
.oc-sdk-mono { font-family: ${JT}; }
.oc-sdk-muted { color: ${L}; }
${m_("success")}${m_("warning")}${m_("error")}${m_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${d}; --oc-sdk-tone-text: ${zT}; }

.oc-sdk-btn { border-radius: ${BT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${xS}; }
.oc-sdk-btn[data-variant="default"] { color: ${zT}; background: ${Y(d,10,p)}; border-color: ${Y(d,12)}; ${qS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(d,16,p)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(d,22,p)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${_E}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${a}, ${a}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${E_}; ${jT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${a}, ${a}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${B}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${a}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${FT}; background: ${Y("var(--oc-sdk-tone)",7,p)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${qS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,p)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,p)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${FT}; }
.oc-sdk-input { border-radius: ${BT}; background: var(--oc-sdk-field-bg); color: ${E_}; ${KT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${KT(Y(x,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${KT($("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${JT}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${d}; }
.oc-sdk-search-clear { border-radius: ${xS}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${B}; color: ${x}; }

.oc-sdk-trigger { border-radius: ${BT}; background: var(--oc-sdk-raised-bg); color: ${E_}; ${jT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${a}, ${a}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${L}; }
.oc-sdk-trigger-chevron { color: ${L}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${E_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${g_}; background-clip: padding-box; color: ${E_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${B}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fT}; color: ${kT}; }
.oc-sdk-option-check { color: ${x}; }
.oc-sdk-option[data-destructive="true"] { color: ${FT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y($("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${L}; }
.oc-sdk-popup-empty { color: ${L}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${n}; border-radius: 4px; color: ${x}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(x,60,n)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${n}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${p}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${d}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${bS} }
.oc-sdk-check-desc { color: ${L}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(x,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${L}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${x}; }
.oc-sdk-tab[aria-selected="true"] { color: ${kT}; background: ${fT}; border-color: ${n}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${E_}; background: var(--oc-sdk-raised-bg); ${jT} }
.oc-sdk-tab-count { color: ${L}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(x,6)}; color: ${L}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${B}; }
.oc-sdk-row[aria-selected="true"] { background: ${fT}; color: ${kT}; }
.oc-sdk-row-lead { font-family: ${JT}; color: ${L}; }
.oc-sdk-row-sub { color: ${L}; }
.oc-sdk-row-meta { color: ${L}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${L}; }

.oc-sdk-empty-body { color: ${L}; }

.oc-sdk-spinner { color: ${L}; }
.oc-sdk-spinner-ring { border-color: ${n}; border-top-color: ${d}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${L}; }

.oc-sdk-separator { color: ${L}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Y(n,40)}; }

.oc-sdk-progress-label { color: ${L}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(x,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${d}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${$("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${$("success-text","inherit")}; }

.oc-sdk-text a { color: ${zT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y(n,60)}; }
`,J=`
${r_}
${EE}
${hS}`;var l=QT();l.onStatusControl((_)=>{if(_.id==="refresh")cS();else if(_.id==="stat")l.openSurface("git").catch(()=>{return})});var mT=document.querySelector("#root");if(!mT)throw Error("Missing #root");mT.innerHTML=`<style>
body{margin:0;font:12px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:2px}
.row{display:flex;gap:4px;align-items:center}
.m{opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;cursor:pointer}
.t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;opacity:.75;font-variant-numeric:tabular-nums}
button{flex:1;padding:1px 4px;font-size:11.5px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:6px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
button[hidden]{display:none}
.badge{font-size:11px;font-weight:700;line-height:16px;padding:0 5px;border-radius:999px;background:#f59e0b;color:#1c1c1e;flex:none}
.badge[hidden]{display:none}
.res{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;opacity:.75}
.res.bad{color:#f87171;opacity:1}
.res[hidden]{display:none}
</style>
<div class="row"><div class="m" id="m">项目：…</div></div>
<div class="row"><button id="b-all" title="逐个拉取上层目录下全部本地 git 项目（跳过 GitHub）">全部本地项目拉取</button><button id="b-sync" title="先拉取远程，再推送本地未推送" hidden>刷新同步</button><span class="badge" id="badge" hidden>0</span></div>
<div class="t" id="t"></div>
<div class="res" id="res" hidden></div>`;var N_=document.querySelector("#m"),U_=document.querySelector("#b-sync"),RE=document.querySelector("#b-all"),xT=document.querySelector("#badge"),bT=document.querySelector("#res"),CE=document.querySelector("#t");N_.onclick=()=>{l.openSurface("git").catch(()=>{return})};var mS=(_)=>{if(/not a git repository|not-a-repo|bad-dir/i.test(_))return"非git项目";if(/no-upstream/i.test(_))return"当前分支没有上游，无法同步";return _.slice(0,40)},q=(_,E=!1)=>{bT.textContent=_,bT.classList.toggle("bad",E),bT.hidden=!_,gS()},GE=()=>new Date().toTimeString().slice(0,8),gS=async()=>{let _=Math.ceil(mT.getBoundingClientRect().height);l.setHeight(_).catch(()=>{return})},h=null,u_=(_,E,U)=>l.serviceRequest({method:_,path:E,body:U===void 0?void 0:JSON.stringify(U)}),yT=(_)=>{xT.hidden=_<=0,xT.textContent=String(_),xT.title=_>0?`本地有 ${_} 条未推送`:""},g={files:0,ahead:0,behind:0,valid:!1},DE=async(_)=>{let E=(h?.split("/").pop()??"").trim();N_.textContent=`项目：${E||"?"}，分支：${_.branch||"?"}`,g.files=_.files?.length??0,g.ahead=_.ahead??0,g.behind=_.behind??0,g.valid=!0,yT(g.ahead),CE.textContent=`上次刷新 ${GE()}`,await i(),await gS()},hT=!1,qT=!1,o=!1,i=async()=>{let _=[];if(g.valid)_.push({kind:"button",id:"stat",label:`+${g.files} ↑${g.ahead} ↓${g.behind}`});_.push({kind:"button",id:"refresh",label:o?"↻…":"↻",disabled:o});try{await l.setStatusControls(_),hT=!0,U_.hidden=!0}catch{hT=!1,U_.hidden=!1,U_.disabled=o,U_.textContent=o?"同步中":"刷新同步"}};async function XE(){if(!h||qT)return;qT=!0,q(""),await i();try{let _=await u_("POST","/pull-all",{dir:h}),E=JSON.parse(_.body);if(!E.ok||!E.jobId){q("全部本地项目拉取启动失败",!0);return}for(;;){if(await new Promise((W)=>setTimeout(W,2000)),!h)return;let U=await u_("GET",`/pull-all-status?jobId=${encodeURIComponent(E.jobId)}`),V=JSON.parse(U.body);if(!V.ok){q("全部本地项目拉取查询失败",!0);return}if(q(`本地项目拉取 ${V.finished}/${V.total}…`),!V.done)continue;let I=V.results.filter((W)=>W.skipped).length,z=V.results.filter((W)=>W.conflict).map((W)=>W.name),b=V.results.filter((W)=>!W.ok&&!W.conflict).map((W)=>W.name),w=V.results.filter((W)=>W.ok&&!W.skipped).length;q(`本地项目拉取完成：成功 ${w}/${V.total-I}${I>0?`，跳过 GitHub ${I}`:""}${z.length>0?`，冲突 ${z.join("、")}`:""}${b.length>0?`，失败 ${b.join("、")}`:""}`,b.length>0||z.length>0);break}}catch(_){q(`全部本地项目拉取失败：${_.message?.slice(0,40)??"未知错误"}`,!0)}finally{qT=!1,await i(),await W_()}}RE.onclick=()=>void XE();async function cS(){if(!h||o)return;o=!0,q(""),await i();try{let _=await u_("POST","/sync",{dir:h}),E=JSON.parse(_.body);if(!E.ok)if(E.error==="diverged")q(`本地 ${E.ahead??0} 条未推送、远程 ${E.behind??0} 条新提交，先手动合并`,!0);else if(E.conflict)q(`冲突未解决：${(E.error??"").slice(0,60)}`,!0);else q(mS(E.error??"同步失败"),!0);else{let U=E.pulled??0,V=E.pushed??0;q(U===0&&V===0?"已是最新：拉取 0 条，推送 0 条":`已同步：拉取 ${U} 条，推送 ${V} 条`)}}catch(_){q(`同步失败：${_.message?.slice(0,40)??"未知错误"}`,!0)}finally{o=!1,await i(),await W_()}}U_.onclick=()=>void cS();var W_=async()=>{if(!h||document.hidden)return;try{let _=await u_("GET",`/status?dir=${encodeURIComponent(h)}`),E=JSON.parse(_.body);if(!E.ok){N_.textContent=mS(E.error??"不可用"),yT(0);return}await DE(E)}catch{N_.textContent="Git 服务未启用",g.valid=!1,yT(0)}};setInterval(()=>void W_(),60000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)W_()});l.onReady((_)=>{if(ZT(_,document.documentElement),h=_.directory??null,_.features?.statusControls===!0)i();else U_.hidden=!1;if(!h){N_.textContent="项目：无";return}W_()});l.onDirectory((_)=>{if(h=_,hT)i()});})();
