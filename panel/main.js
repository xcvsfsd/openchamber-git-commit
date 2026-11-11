(()=>{var Q="openchamber.sdk",Z=1;var GT=`
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
`;function IS(_){let S=_.documentElement;if(S.hasAttribute("data-oc-scrollbar-activity"))return;S.setAttribute("data-oc-scrollbar-activity","");let U=new WeakMap;_.addEventListener("scroll",(E)=>{let M=E.target===_?S:E.target;if(!(M instanceof Element))return;if(!M.hasAttribute("data-oc-scrolling"))M.setAttribute("data-oc-scrolling","");let G=U.get(M);if(G!==void 0)clearTimeout(G);U.set(M,setTimeout(()=>{U.delete(M),M.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var XO=`(${IS.toString()})(document);`;var XT=128,DT=65536;var h_=128;var g_=65536;var NS=/^[a-z][a-z0-9-]{0,39}$/;var VS=(_)=>Object(_)===_&&!Array.isArray(_),IT=(_,S)=>Object.keys(_).every((U)=>S.includes(U)),CS=(_)=>String(_)===_&&_.length>=1&&_.length<=60,WS=(_)=>String(_)===_&&_.length>=1&&_.length<=80,YS=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let S=new Set;for(let U of _){if(!VS(U)||!NS.test(U.id)||!CS(U.label))return!1;if(U.disabled!==void 0&&U.disabled!==!0&&U.disabled!==!1)return!1;if(S.has(U.id))return!1;if(S.add(U.id),U.kind==="button"){if(!IT(U,["kind","id","label","disabled"]))return!1;continue}if(U.kind!=="select"||!IT(U,["kind","id","label","value","options","disabled"]))return!1;if(!WS(U.value)||!Array.isArray(U.options)||U.options.length<1||U.options.length>16)return!1;let E=new Set;for(let M of U.options){if(!VS(M)||!IT(M,["value","label"])||!WS(M.value)||!CS(M.label)||E.has(M.value))return!1;E.add(M.value)}if(!E.has(U.value))return!1}return!0};var PS=["{id}","{segment}","{segments+}"];var TU=new Set(PS);var QS=["turn-finished","turn-failed","permission-asked","question-asked"];var OU=new Set(QS);var m_=20000000,c_=256;var VT=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,ZS=(_,S)=>{if(_.path!==S.path||_.readOnly!==S.readOnly)return!1;if(_.encoding==="text"||S.encoding==="text")return _.encoding==="text"&&S.encoding==="text"&&_.content===S.content;if(_.bytes.byteLength!==S.bytes.byteLength)return!1;for(let U=0;U<_.bytes.byteLength;U+=1)if(_.bytes[U]!==S.bytes[U])return!1;return!0};var zS=/^[A-Za-z0-9_-]{1,80}$/;var kS=["left","right","top","bottom"];var FS=(_,S=0,U={remaining:16000})=>{if(--U.remaining<0||S>=32)return!1;if(_===null)return!0;let E=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let M of E)if(!FS(M,S+1,U))return!1;return!0},CT=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((S)=>/^(0|[1-9]\d*)$/.test(S)&&Number(S)<_.length)&&_.every(CT);if(Object(_)===_){let S=Object.getPrototypeOf(_);return(S===null||S===Object.prototype)&&Object.values(_).every(CT)}return String(_)===_||Number.isFinite(_)},WT=(_)=>{try{if(String(_.id)!==_.id||!zS.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!kS.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!FS(_.data)||!CT(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var LS=["file","directory","other","missing"],YT=(_)=>Boolean(_&&"sessionId"in _),PT=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var $S=/^[0-9a-f]{7,64}$/i,QT=(_)=>$S.test(_),p_=500,v_=32000,BS=16000,KS=128,fS=200,jS=2000,HS=16000,wS=80,xS=200,bS=16000;var qS=2000;var ZT=20000,d_=1024,u_=2000000;var l_=64000,n_=8000,zT=4000;var kT=960000;var yS=999,hS=1e4,B_=500,gS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],mS=["stopped","starting","ready","failed"],IO=new Set(gS),cS=(_)=>IO.has(_),pS=(_)=>_&&cS(_)?_:"HOST_REJECTED",C_=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(C_);if(Object(_)===_)return Object.values(_).every(C_);return!1},vS=(_)=>C_(_)&&JSON.stringify(_).length<=bS,JS=(_)=>_?.trim().slice(0,xS)??"",W_=(_)=>{let S=_.id.trim().slice(0,KS),U=_.title.trim().slice(0,fS),E=_.url.trim().slice(0,jS),M=_.text?.trim().slice(0,HS),G=_.author?.trim().slice(0,wS),X=_.kind==="pull"?"pull":"issue",V={providerId:_.providerId.trim(),id:S,title:U||S,url:E,kind:X};if(M)V.text=M;if(G)V.author=G;if(X==="pull"){let P=JS(_.branches?.head),A=JS(_.branches?.base);if(P&&A)V.branches={head:P,base:A}}if(vS(_.data))V.data=_.data;return V},FT=(_)=>{let S=W_(_);if(_.projectId)S.projectId=_.projectId;if(_.navigation)S.navigation=_.navigation;if(_.worktree)S.worktree=_.worktree;return S},JT=(_)=>{let S={text:_.text.trim().slice(0,BS)};if(_.send)S.send=!0;return S},LT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(yS,Math.max(0,Math.round(_)))},$T=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(hS,Math.max(0,Math.ceil(_)))};var N_=(_)=>_.length>0&&_.length<=d_&&!_.includes("\x00")&&!_.includes("\\");var a_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>qS)return!1;return!_.split("/").some((U)=>U==="."||U==="..")},VO=new Set(mS),BT=(_)=>Boolean(_&&"status"in _&&VO.has(String(_.status))&&!("body"in _)),i_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),KT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),fT=(_)=>Boolean(_&&"written"in _&&_.written===!0),jT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),CO=new Set(LS),HT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&CO.has(String(_.kind))&&Number.isFinite(_.size)),wT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),WO=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),NO=(_)=>Object(_)===_?_:null,NT=(_)=>String(_)===_&&_.length>0,YO=(_)=>{if(!NT(_.id))return null;if(_.ok===!0){let S={channel:Q,v:Z,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)S.payload=_.payload;return S}if(_.ok===!1&&NT(_.error))return{channel:Q,v:Z,type:"result",id:_.id,ok:!1,error:_.error,code:pS(NT(_.code)?_.code:void 0)};return null},xT=(_)=>{let S=NO(_);if(!S||S.channel!==Q||S.v!==Z)return null;if(S.type==="result")return YO(S);if(!WO.has(String(S.type))||Object(S.payload)!==S.payload)return null;return S};var dS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),PO=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class I extends Error{code;constructor(_,S){super(S);this.name="HostRequestError",this.code=_}}var uS=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),o_=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${d_} characters without NUL or backslash.`)),r_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},Y=(_)=>{return _.value+=1,`oc-${_.value}`},bT=(_={})=>{let S=_.target??("window"in globalThis?window:null);if(!S)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let U=_.acceptSource??((T)=>T===S.parent),E=_.requestTimeoutMs??ZT,M=new Set,G=new Set,X=new Set,V=new Set,P=new Set,A=new Set,F=new Set,n=new Set,v=new Set,a=new Set,g=[],U_=null,E_=null,s=new Set,F_=new Set,d=null,D_=null,J_=!1,i=new Map,I_=new Map,V_=new Map,r=!1,N={value:0},C=null,t=null,L_=!1,$_=!1,_S=null,TS=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},u=(T)=>{S.parent.postMessage(T,"*")},SS=()=>{if(r||S.parent===S||a.size===0||C?.features?.lateGenerateResults!==!0)return;u({channel:Q,v:Z,type:"generate-late-listen"})},H=(T,O)=>{for(let R of T)try{R(O)}catch(D){console.error(D)}},OS=(T)=>{if(!(T instanceof MessageEvent))return;if(!U(T.source))return;let O=xT(T.data);if(!O)return;if(O.type==="workspace"){let D=I_.get(O.payload.subscriptionId);if(D)H([D],O.payload.snapshot);return}if(O.type==="shells"){let D=V_.get(O.payload.subscriptionId);if(D)H([D],O.payload.snapshot);return}if(O.type==="ready"){if(C=O.payload,t=TS(O.payload.session),H(M,O.payload),H(G,O.payload.directory),H(X,O.payload.session),t)H(V,t);H(P,O.payload.connection),H(A,O.payload.settings),H(F,O.payload.item),SS();return}if(O.type==="generate-late"){if(a.size===0)g.push(O.payload);else H(a,O.payload);return}if(O.type==="directory"){if(C)C={...C,directory:O.payload.directory};H(G,O.payload.directory);return}if(O.type==="session"){if(C)C={...C,session:O.payload.session};if(!O.payload.session)t=null;else if(t?.sessionId!==O.payload.session.id)t=TS(O.payload.session);H(X,O.payload.session);return}if(O.type==="session-lifecycle"){t=O.payload,H(V,O.payload);return}if(O.type==="connection"){if(C)C={...C,connection:O.payload.connection};H(P,O.payload.connection);return}if(O.type==="settings"){if(C)C={...C,settings:O.payload.settings};H(A,O.payload.settings);return}if(O.type==="item"){if(C)C={...C,item:O.payload.item};H(F,O.payload.item);return}if(O.type==="status-control-event"){H(n,O.payload);return}if(O.type==="popover-closed"){H(v,O.payload);return}if(O.type==="action"){let D=(J)=>{if(!r)u({channel:Q,v:Z,type:"action-result",id:O.id,payload:J})},$=E_;if(!$){D({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>$(O.payload)).then(()=>D({ok:!0}),(J)=>{let b=(J instanceof Error?J.message:String(J)).trim();D({ok:!1,error:(b||"Action failed.").slice(0,B_)})});return}if(O.type==="file-open"){let D=O.payload;if(D_&&ZS(D_,D))return;D_=D,H(s,O.payload);return}if(O.type==="file-saved"){H(F_,O.payload.version);return}if(O.type==="file-snapshot"){let D=(b)=>{if(!r)u({channel:Q,v:Z,type:"file-snapshot-result",id:O.id,payload:b})},$=(b)=>D({error:(b.trim()||"Could not read the edited file.").slice(0,B_)}),J=d;if(!J){$("This extension does not edit files.");return}Promise.resolve().then(()=>J(O.payload.purpose)).then((b)=>{if(VT(b)>m_){$(`The file is over ${m_} ${"bytes"in b?"bytes":"characters"}.`);return}if(b.version.length>c_){$(`The snapshot version is over ${c_} characters.`);return}D({snapshot:"bytes"in b?{bytes:b.bytes,version:b.version}:{content:b.content,version:b.version}})},(b)=>$(b instanceof Error?b.message:String(b)));return}if(O.type==="resolve"){let D=(J)=>{u({channel:Q,v:Z,type:"resolve-result",id:O.id,payload:J})},$=U_;if(!$){D({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>$(O.payload)).then((J)=>D({item:J?W_(J):null}),(J)=>{let b=(J instanceof Error?J.message:String(J)).trim();D({error:(b||"Command failed.").slice(0,B_)})});return}let R=i.get(O.id);if(!R)return;if(clearTimeout(R.timer),i.delete(O.id),O.ok){R.resolve(O.payload);return}R.reject(new I(O.code,O.error))};S.addEventListener("message",OS),u({channel:Q,v:Z,type:"hello"});let y=(T,O=E)=>{if(r||S.parent===S)return Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,D)=>{let $=setTimeout(()=>{i.delete(T.id),D(new I("HOST_TIMEOUT","Host did not answer in time."))},O);i.set(T.id,{resolve:R,reject:D,timer:$}),u(T)})},w=(T)=>y(T).then(()=>{return}),x={channel:Q,v:Z},AT=(T)=>{if(!r&&S.parent!==S)u(T)},US=()=>AT({...x,type:"file-save"}),ES=(T)=>{if(!dS(T)||!PO(T))return;T.preventDefault(),US()},AS=(T)=>{if(!dS(T)||T.key!=="Escape"||C?.surface!=="popover"||!C.popover)return;T.preventDefault(),XS(C.popover.id,"escape").catch(()=>{return})},b_=()=>{let T=C?.surface==="popover"?C.popover:void 0;if(!T)return;let O=L_||$_;if(_S===O)return;_S=O,DS(T.id,O).catch(()=>{return})},q_=()=>{if(C?.surface!=="popover"||L_)return;L_=!0,b_()},MS=(T)=>{if(C?.surface!=="popover"||T.relatedTarget!==null||!L_)return;L_=!1,b_()},RS=()=>{if(C?.surface!=="popover"||$_)return;$_=!0,b_()},GS=()=>{if(C?.surface!=="popover"||!$_)return;$_=!1,b_()},o=(T,O=1024)=>{if(!T.trim()||T.length>O)throw new I("HOST_REJECTED",`Identity must contain 1 to ${O} characters.`)},MT=async(T)=>{if(T.kind!=="projects")o(T.projectId);let O=await y({...x,type:"workspace-read",id:Y(N),payload:T});if(!O||!("kind"in O)||!("state"in O)||O.kind!==T.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return O},RT=async(T,O)=>{if(T.kind!=="projects")o(T.projectId);let R=Y(N);I_.set(R,O);try{await w({...x,type:"workspace-subscribe",id:Y(N),payload:{subscriptionId:R,query:T}})}catch(D){if(I_.delete(R),!r)u({...x,type:"workspace-unsubscribe",id:Y(N),payload:{subscriptionId:R}});throw D}return()=>{if(!I_.delete(R)||r)return;u({...x,type:"workspace-unsubscribe",id:Y(N),payload:{subscriptionId:R}})}},GO=async(T,O)=>{if(T.kind==="session")o(T.sessionId);if(T.kind==="project")o(T.projectId);let R=Y(N);V_.set(R,O);try{await w({...x,type:"shells-subscribe",id:Y(N),payload:{subscriptionId:R,scope:T}})}catch(D){if(V_.delete(R),!r)u({...x,type:"shells-unsubscribe",id:Y(N),payload:{subscriptionId:R}});throw D}return()=>{if(!V_.delete(R)||r)return;u({...x,type:"shells-unsubscribe",id:Y(N),payload:{subscriptionId:R}})}},y_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>XT))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!C_(T.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>DT)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&C?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let O=await y({...x,type:"storage",id:Y(N),payload:T});if(!O||!("storage"in O)||O.op!==T.op)throw new I("HOST_REJECTED","Host did not return storage data.");return O},XS=(T,O)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):w({...x,type:"popover-close",id:Y(N),payload:O?{id:T,reason:O}:{id:T}}),DS=(T,O)=>C?.features?.popovers!==!0&&!(C?.surface==="popover"&&C.popover?.id===T)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):w({...x,type:"popover-anchor",id:Y(N),payload:{id:T,active:O}});return S.addEventListener("keydown",AS,!0),S.addEventListener("pointerover",q_),S.addEventListener("pointermove",q_),S.addEventListener("pointerout",MS),S.addEventListener("focus",RS),S.addEventListener("blur",GS),{onAction:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},listProjects:async()=>{let T=await MT({kind:"projects"});if(T.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let O=await MT({kind:"worktrees",projectId:T});if(O.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return O},listSessions:async(T)=>{let O=await MT({kind:"sessions",projectId:T});if(O.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return O},onProjects:(T)=>RT({kind:"projects"},(O)=>{if(O.kind==="projects")T(O)}),onWorktrees:(T,O)=>RT({kind:"worktrees",projectId:T},(R)=>{if(R.kind==="worktrees")O(R)}),onSessions:(T,O)=>RT({kind:"sessions",projectId:T},(R)=>{if(R.kind==="sessions")O(R)}),onRunningShells:(T,O)=>GO(T,O),readShellOutput:async(T,O)=>{o(T,h_);let R=O?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let D=O?.tailBytes;if(D!==void 0&&(!Number.isInteger(D)||D<1||D>g_))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${g_}.`);let J=await y({...x,type:"shell-output",id:Y(N),payload:{shellId:T,cursor:R,tailBytes:D}});if(!J||typeof J.output!=="string"||!Number.isFinite(J.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return J},stopShell:async(T)=>{if(o(T,h_),(await y({...x,type:"shell-stop",id:Y(N),payload:{shellId:T}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{o(T),await w({...x,type:"open-session",id:Y(N),payload:{sessionId:T}})},storage:{get:async(T,O)=>{let R=r_(O),D={op:"get",key:T};if(R)D.scope=R;let $=await y_(D);return $.op==="get"&&$.found?$.value:void 0},set:async(T,O,R)=>{let D=r_(R),$={op:"set",key:T,value:O};if(D)$.scope=D;await y_($)},delete:async(T,O)=>{let R=r_(O),D={op:"delete",key:T};if(R)D.scope=R;await y_(D)},keys:async(T)=>{let O=r_(T),R={op:"keys"};if(O)R.scope=O;let D=await y_(R);if(D.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return D.keys}},onReady:(T)=>{if(M.add(T),C)T(C);return()=>{M.delete(T)}},onDirectory:(T)=>{if(G.add(T),C)T(C.directory);return()=>{G.delete(T)}},onSession:(T)=>{if(X.add(T),C)T(C.session);return()=>{X.delete(T)}},onSessionLifecycle:(T)=>{if(V.add(T),t)T(t);return()=>{V.delete(T)}},onConnection:(T)=>{if(P.add(T),C)T(C.connection);return()=>{P.delete(T)}},onSettings:(T)=>{if(A.add(T),C)T(C.settings);return()=>{A.delete(T)}},onItem:(T)=>{if(F.add(T),C)T(C.item);return()=>{F.delete(T)}},onStatusControl:(T)=>{return n.add(T),()=>{n.delete(T)}},onPopoverClosed:(T)=>{return v.add(T),()=>{v.delete(T)}},setStatusControls:(T)=>{if(C?.features?.statusControls!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support status controls."));if(!YS(T))return Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...x,type:"status-controls",id:Y(N),payload:{controls:T}})},openPopover:(T)=>{if(C?.features?.popovers!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support popovers."));if(!WT(T))return Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...x,type:"popover-open",id:Y(N),payload:T})},closePopover:XS,setPopoverAnchorActive:DS,onResolve:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},toast:(T)=>{let O=T.message.trim();if(!O||O.length>p_)return Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${p_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>v_))return Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${v_} characters.`));return w({channel:Q,v:Z,type:"toast",id:Y(N),payload:{...T,message:O}})},openUrl:(T)=>w({channel:Q,v:Z,type:"open-url",id:Y(N),payload:{url:T}}),openCommit:(T)=>QT(T)?w({channel:Q,v:Z,type:"open-commit",id:Y(N),payload:{sha:T}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>w({channel:Q,v:Z,type:"open-surface",id:Y(N),payload:{surfaceId:T}}),writeClipboard:(T)=>w({channel:Q,v:Z,type:"clipboard-write",id:Y(N),payload:{text:T}}),compose:(T)=>w({channel:Q,v:Z,type:"compose",id:Y(N),payload:T}),attach:(T)=>w({channel:Q,v:Z,type:"attach",id:Y(N),payload:W_(T)}),startSession:async(T)=>{if(T.projectId!==void 0)o(T.projectId);let O=T.worktree;if(O&&O!==!0)if(O.kind==="existing")o(O.directory);else{if(O.name!==void 0)o(O.name,200);if(O.baseBranch!==void 0)o(O.baseBranch,200)}let R=await y({channel:Q,v:Z,type:"start-session",id:Y(N),payload:FT(T)},_.requestTimeoutMs??180000);if(!YT(R))throw new I("HOST_REJECTED","Host did not return a session.");return R},prompt:(T)=>y({channel:Q,v:Z,type:"prompt",id:Y(N),payload:JT(T)}).then((O)=>{if(!PT(O))throw new I("HOST_REJECTED","Host did not return a prompt result.");return O}),sessionLink:(T)=>w({channel:Q,v:Z,type:"session-link",id:Y(N),payload:W_(T)}),close:()=>w({channel:Q,v:Z,type:"close",id:Y(N)}),oauthStart:()=>w({channel:Q,v:Z,type:"oauth-start",id:Y(N)}),oauthDisconnect:()=>w({channel:Q,v:Z,type:"oauth-disconnect",id:Y(N)}),request:(T)=>(a_(T.path)?y({channel:Q,v:Z,type:"request",id:Y(N),payload:T}):uS()).then((O)=>{if(!i_(O))throw new I("HOST_REJECTED","Host request result was empty.");return O}),serviceRequest:(T)=>(a_(T.path)?y({channel:Q,v:Z,type:"service-request",id:Y(N),payload:T}):uS()).then((O)=>{if(!i_(O))throw new I("HOST_REJECTED","Host service request result was empty.");return O}),serviceStatus:()=>y({channel:Q,v:Z,type:"service-status",id:Y(N)}).then((T)=>{if(!BT(T))throw new I("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(N_(T)?y({channel:Q,v:Z,type:"file-read",id:Y(N),payload:{path:T}}):o_()).then((O)=>{if(!KT(O))throw new I("HOST_REJECTED","Host did not return file content.");return O}),writeFile:(T,O)=>{if(!N_(T))return o_();if(O.length>u_)return Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${u_} characters.`));return y({channel:Q,v:Z,type:"file-write",id:Y(N),payload:{path:T,content:O}}).then((R)=>{if(!fT(R))throw new I("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(T)=>(N_(T)?y({channel:Q,v:Z,type:"file-list",id:Y(N),payload:{path:T}}):o_()).then((O)=>{if(!jT(O))throw new I("HOST_REJECTED","Host did not return directory entries.");return O}),stat:(T)=>(N_(T)?y({channel:Q,v:Z,type:"file-stat",id:Y(N),payload:{path:T}}):o_()).then((O)=>{if(!HT(O))throw new I("HOST_REJECTED","Host did not return file status.");return O}),generate:(T)=>{let O=T.prompt.trim(),R=T.system?.trim();if(O.length===0||O.length>l_)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${l_} characters.`));if(R!==void 0&&(R.length===0||R.length>n_))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${n_} characters.`));let D=T.maxOutputTokens===void 0?void 0:Math.min(zT,Math.max(1,Math.floor(T.maxOutputTokens)));if(D!==void 0&&!Number.isFinite(D))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let $={prompt:O};if(R!==void 0)$.system=R;if(D!==void 0)$.maxOutputTokens=D;return y({channel:Q,v:Z,type:"generate",id:Y(N),payload:$},_.requestTimeoutMs??kT).then((J)=>{if(!wT(J))throw new I("HOST_REJECTED","Host did not return generated text.");return J})},onLateGenerateResult:(T)=>{a.add(T);for(let O of g.splice(0))H([T],O);return SS(),()=>{a.delete(T)}},setBadge:(T)=>w({channel:Q,v:Z,type:"badge",id:Y(N),payload:{count:LT(T)}}),setHeight:(T)=>w({channel:Q,v:Z,type:"resize",id:Y(N),payload:{height:$T(T)}}),onFileOpen:(T)=>{if(s.add(T),!J_)J_=!0,S.addEventListener("keydown",ES,!0);if(D_)T(D_);return()=>{s.delete(T)}},onFileSnapshot:(T)=>{return d=T,()=>{if(d===T)d=null}},onFileSaved:(T)=>{return F_.add(T),()=>{F_.delete(T)}},reportFileChange:(T)=>AT({...x,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:US,reportFileUnsupported:()=>AT({...x,type:"file-unsupported"}),dispose:()=>{for(let T of I_.keys())u({...x,type:"workspace-unsubscribe",id:Y(N),payload:{subscriptionId:T}});I_.clear();for(let T of V_.keys())u({...x,type:"shells-unsubscribe",id:Y(N),payload:{subscriptionId:T}});if(V_.clear(),r=!0,U_=null,E_=null,d=null,s.clear(),F_.clear(),J_)S.removeEventListener("keydown",ES,!0);S.removeEventListener("message",OS),S.removeEventListener("keydown",AS,!0),S.removeEventListener("pointerover",q_),S.removeEventListener("pointermove",q_),S.removeEventListener("pointerout",MS),S.removeEventListener("focus",RS),S.removeEventListener("blur",GS);for(let T of i.values())clearTimeout(T.timer),T.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));i.clear(),M.clear(),G.clear(),X.clear(),V.clear(),P.clear(),A.clear(),F.clear(),n.clear(),v.clear(),a.clear(),g.length=0}}};var lS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var YU=new Set(lS);var nS=["none","agent","user"];var QU=new Set(nS);var QO=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],ZO=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],aS=(_,S)=>{S.style.colorScheme=_.mode;for(let[U,E]of QO)S.style.setProperty(U,_.tokens[E]);for(let[U,E,M]of ZO){let G=_.tokens[M]??"";S.style.setProperty(U,G),S.style.setProperty(E,G)}S.style.setProperty("font-family",_.tokens.font),S.style.setProperty("font-size","0.875rem"),S.style.setProperty("line-height","1.45"),S.style.setProperty("color",_.tokens.foreground)},qT=(_,S)=>{if(aS(_.theme,S),S.dataset)S.dataset.ocSurface=_.surface,S.dataset.ocTheme=_.theme.mode};var zO={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},B=(_,S)=>`var(--${_}, var(--oc-${zO[_]}, ${S}))`,__=B("surface-background","transparent"),t_=B("surface-elevated","transparent"),Y_=B("surface-elevated-foreground","inherit"),l=B("surface-foreground","inherit"),f=B("surface-muted-foreground","gray"),kO=B("surface-muted","transparent"),A_=B("interactive-border","currentColor"),m=B("interactive-hover","transparent"),M_=B("interactive-active","transparent"),yT=B("interactive-selection","transparent"),hT=B("interactive-selection-foreground","inherit"),e=B("primary","currentColor"),gT=B("primary-text","inherit"),mT=B("error-text","inherit"),FO=B("font-sans","inherit"),cT=B("font-mono","monospace"),sS=B("radius","9px"),pT=`calc(${sS} - 2px)`,iS=`calc(${sS} - 4px)`,j=(_,S,U="transparent")=>`color-mix(in srgb, ${_} ${S}%, ${U})`,oS=`background-image: linear-gradient(${m}, ${m});`,vT=(_,S="0.5px")=>`box-shadow: inset 0 0 0 ${S} ${_}, var(--oc-sdk-field-lift);`,dT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",rS="box-shadow: var(--oc-sdk-lit);",uT=`inset 0 0.5px 0 0 ${j(l,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,JO=`
:root {
  --oc-sdk-edge: ${j(l,16)};
  --oc-sdk-field-bg: ${t_};
  --oc-sdk-raised-bg: ${__};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${j(l,14)};
  --oc-sdk-field-bg: ${j(__,50,t_)};
  --oc-sdk-raised-bg: ${t_};
  --oc-sdk-field-lift: ${uT};
  --oc-sdk-raised-lift: ${uT};
  --oc-sdk-lit: ${uT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,s_=(_)=>{let S=B(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${S}; --oc-sdk-tone-text: ${B(`${_}-text`,"inherit")}; }`},LO=`
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
`,tS=`${JO}
.oc-sdk { color: ${l}; font-family: ${FO}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${oS} }
.oc-sdk-mono { font-family: ${cT}; }
.oc-sdk-muted { color: ${f}; }
${s_("success")}${s_("warning")}${s_("error")}${s_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${e}; --oc-sdk-tone-text: ${gT}; }

.oc-sdk-btn { border-radius: ${pT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${iS}; }
.oc-sdk-btn[data-variant="default"] { color: ${gT}; background: ${j(e,10,__)}; border-color: ${j(e,12)}; ${rS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${j(e,16,__)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${j(e,22,__)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${kO}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${m}, ${m}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Y_}; ${dT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${m}, ${m}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${M_}, ${M_}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${m}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${M_}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${B("status-error","red")}; color: ${mT}; background: ${j("var(--oc-sdk-tone)",7,__)}; border-color: ${j("var(--oc-sdk-tone)",12)}; ${rS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${j("var(--oc-sdk-tone)",9,__)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${j("var(--oc-sdk-tone)",11,__)}; box-shadow: none; }

.oc-sdk-field-note { color: ${f}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${mT}; }
.oc-sdk-input { border-radius: ${pT}; background: var(--oc-sdk-field-bg); color: ${Y_}; ${vT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${f}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${m}, ${m}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${vT(j(l,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${vT(B("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${cT}; }

.oc-sdk-search-icon { color: ${f}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${e}; }
.oc-sdk-search-clear { border-radius: ${iS}; color: ${f}; }
.oc-sdk-search-clear:hover { background: ${m}; color: ${l}; }

.oc-sdk-trigger { border-radius: ${pT}; background: var(--oc-sdk-raised-bg); color: ${Y_}; ${dT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${m}, ${m}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${M_}, ${M_}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${f}; }
.oc-sdk-trigger-chevron { color: ${f}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Y_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${t_}; background-clip: padding-box; color: ${Y_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${m}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${yT}; color: ${hT}; }
.oc-sdk-option-check { color: ${l}; }
.oc-sdk-option[data-destructive="true"] { color: ${mT}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${j(B("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${f}; }
.oc-sdk-popup-empty { color: ${f}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${A_}; border-radius: 4px; color: ${l}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${j(l,60,A_)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${A_}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${__}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${oS} }
.oc-sdk-check-desc { color: ${f}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${j(l,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${f}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${l}; }
.oc-sdk-tab[aria-selected="true"] { color: ${hT}; background: ${yT}; border-color: ${A_}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Y_}; background: var(--oc-sdk-raised-bg); ${dT} }
.oc-sdk-tab-count { color: ${f}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${j(l,6)}; color: ${f}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${j("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${m}; }
.oc-sdk-row[aria-selected="true"] { background: ${yT}; color: ${hT}; }
.oc-sdk-row-lead { font-family: ${cT}; color: ${f}; }
.oc-sdk-row-sub { color: ${f}; }
.oc-sdk-row-meta { color: ${f}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${f}; }

.oc-sdk-empty-body { color: ${f}; }

.oc-sdk-spinner { color: ${f}; }
.oc-sdk-spinner-ring { border-color: ${A_}; border-top-color: ${e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${j("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${f}; }

.oc-sdk-separator { color: ${f}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${j(A_,40)}; }

.oc-sdk-progress-label { color: ${f}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${j(l,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${e}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${B("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${B("success-text","inherit")}; }

.oc-sdk-text a { color: ${gT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${j(A_,60)}; }
`,h=`
${GT}
${LO}
${tS}`;var k_=bT(),TO=document.querySelector("#root");if(!TO)throw Error("Missing #root");TO.innerHTML=`
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
  <button id="btn-push" title="推送本地提交 git push">推送</button>
  <button id="btn-refresh" title="重新对比远程与本地">↻</button>
</div>
<div id="sync" class="sync">等待项目…</div>
<div id="nongit" class="empty" hidden>
  <div class="ic">—○—</div><div>非git项目</div><div class="mut">先打开一个 git 仓库项目</div>
</div>
<h3 id="h-remote">远程新提交</h3>
<div id="remote"><div class="mut">—</div></div>
<h3 id="h-outgoing">待推送</h3>
<div id="outgoing"><div class="mut">—</div></div>
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
`;var z=(_)=>document.querySelector(`#${_}`),Q_=z("project"),Z_=z("branch"),k=z("sync"),OT=z("remote"),f_=z("outgoing"),j_=z("local"),X_=z("msg"),q=z("out"),jO=z("topbar"),nT=z("btn-pull-all"),S_=z("proj-name"),SO=()=>{let _=(W??"").split("/").filter(Boolean).pop()??"";S_.textContent=`● ${_}`,S_.style.color=L.green,S_.style.fontWeight="700",S_.style.maxWidth="120px",S_.style.overflow="hidden",S_.style.textOverflow="ellipsis",S_.style.whiteSpace="nowrap",S_.style.flex="none"},HO=z("h-remote"),wO=z("h-outgoing"),xO=z("h-local"),bO=z("nongit"),qO=z("commitBox"),H_=z("done"),oT=new Set,eT=z("confirm"),yO=z("confirm-msg"),x_=null,aT=(_)=>{return yO.textContent=_,eT.hidden=!1,new Promise((S)=>{x_=S})};z("confirm-ok").onclick=()=>{eT.hidden=!0,x_?.(!0),x_=null};z("confirm-cancel").onclick=()=>{eT.hidden=!0,x_?.(!1),x_=null};var OO=z("conflict"),eS=z("conflict-list"),hO=(_)=>(_.files??[]).filter((S)=>S.staged==="U"||S.unstaged==="U"||S.staged==="A"&&S.unstaged==="A"||S.staged==="D"&&S.unstaged==="D").map((S)=>S.path),iT="",UO=(_)=>{let S=hO(_);if(S.length===0){iT="";return}let U=S.join(`
`);if(U===iT)return;iT=U,eS.innerHTML="";for(let E of S.slice(0,20)){let M=document.createElement("tr"),G=document.createElement("td");G.className="mono ellipsis",G.textContent=E,M.appendChild(G),eS.appendChild(M)}OO.hidden=!1},rT=(_)=>{bO.hidden=!_,jO.style.display=_?"none":"",k.style.display=_?"none":"",HO.style.display=_?"none":"",OT.style.display=_?"none":"",wO.style.display=_?"none":"",f_.style.display=_?"none":"",xO.style.display=_?"none":"",j_.style.display=_?"none":"",qO.style.display=_?"none":""},W=null,z_=!1,sT=null,tT=new Map,K=(_,S,U)=>k_.serviceRequest({method:_,path:S,body:U===void 0?void 0:JSON.stringify(U)}),gO=(_)=>{if(/not a git repository|not-a-repo|bad-dir/i.test(_))return"非git项目";return _.slice(0,60)},EO=async(_)=>{try{let S=await K("GET",`/projects?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||!U.projects)return;tT.clear(),Q_.innerHTML="";for(let E of U.projects){tT.set(E.path,{name:E.name,branch:E.branch,ahead:E.ahead,behind:E.behind});let M=document.createElement("option");if(M.value=E.path,M.textContent=AO(E.name,E.path,E.branch,E.ahead,E.behind),E.path===W)M.selected=!0;Q_.appendChild(M)}}catch{}},_O="",AO=(_,S,U,E,M)=>{let G=M??0,X=E??0,V=W!==null&&S===W,P=sT!==null&&S===sT;return`${V?"● ":""}${_}${U?` ${U}`:""}${G>0?` ↓${G}`:""}${X>0?` ↑${X}`:""}${P?"（会话）":""}`},mO=async(_,S)=>{try{let U=await K("GET",`/branches?dir=${encodeURIComponent(_)}`),E=JSON.parse(U.body);if(!E.ok||!E.branches)return;let M=JSON.stringify([S,E.branches,E.remotes]);if(M===_O)return;_O=M,oT.clear();for(let X of E.remotes??[])oT.add(X.name);Z_.innerHTML="";let G=document.createElement("optgroup");G.label="本地分支";for(let X of E.branches){let V=document.createElement("option");V.value=X.name;let P=X.dirty??0;if(V.textContent=`${X.current?"● ":""}${X.name}${(X.behind??0)>0?` ↓${X.behind}`:""}${X.current&&P>0?` ↑${P}`:""}`,X.current)V.selected=!0;G.appendChild(V)}if(Z_.appendChild(G),E.remotes&&E.remotes.length>0){let X=document.createElement("optgroup");X.label="远程分支";for(let V of E.remotes){let P=document.createElement("option");P.value=V.name,P.textContent=V.name,X.appendChild(P)}Z_.appendChild(X)}}catch{}},UT=(_)=>{OT.innerHTML="";let U=(_.remoteLog??[]).slice(0,5);if(U.length===0){OT.innerHTML='<div class="mut">无远程分支记录</div>';return}let E=document.createElement("table");E.style.tableLayout="fixed";for(let M of U){let G=document.createElement("tr"),X=document.createElement("td");X.className="mono ellipsis",X.style.fontSize="12px";let V=M.downloaded!==!1,P=document.createElement("span");P.textContent=V?"● ":"○ ",P.style.color=V?L.green:L.amber;let A=document.createElement("span");A.className="mut",A.textContent=`${M.date} ${M.author} `;let F=document.createElement("span");if(F.textContent=M.subject,F.style.color=V?L.gray:"inherit",!V)F.style.fontWeight="700";X.title=`${M.subject} · ${M.author} ${M.date}（${V?"已下载":"未下载"}）`,X.append(P,A,F),G.appendChild(X),E.appendChild(G)}OT.appendChild(E)},ET=(_)=>{if(f_.innerHTML="",!_.upstream){f_.innerHTML='<div class="mut">未设上游，推送时需先建跟踪</div>';return}let S=(_.outgoing??[]).slice(0,20),U=_.ahead??0;if(S.length===0){f_.innerHTML=`<div class="mut">${U>0?`超前 ${U}，明细取失败`:"无待推送"}</div>`;return}let E=document.createElement("table");E.style.tableLayout="fixed";for(let M of S){let G=document.createElement("tr"),X=document.createElement("td");X.className="mono ellipsis",X.style.fontSize="12px";let V=document.createElement("span");V.textContent="● ",V.style.color=L.blue;let P=document.createElement("span");P.className="mut",P.textContent=`${M.date} ${M.author} `;let A=document.createElement("span");A.textContent=M.subject,X.title=`${M.subject} · ${M.author} ${M.date}`,X.append(V,P,A),G.appendChild(X),E.appendChild(G)}f_.appendChild(E)},L={green:"#4ade80",red:"#f87171",amber:"#fbbf24",blue:"#60a5fa",purple:"#c084fc",gray:"#9ca3af"},cO=(_,S)=>{if(`${_}${S}`==="??")return L.purple;if(_==="U"||S==="U")return L.red;if(_==="D"||S==="D")return L.red;if(_==="A"||S==="A")return L.green;if(_==="R"||S==="R"||_==="C"||S==="C")return L.blue;if(_==="M"||S==="M")return L.amber;return L.gray},pO=(_,S)=>{if(`${_}${S}`==="??")return"未跟踪";if(_==="U"||S==="U")return"冲突";let E="改动";if(_==="A"||S==="A")E="新增";else if(_==="D"||S==="D")E="删除";else if(_==="R"||S==="R")E="重命名";else if(_==="C"||S==="C")E="复制";else if(_==="T"||S==="T")E="类型变更";else if(_==="M"||S==="M")E="修改";return _!==" "&&_!=="?"&&_!=="!"?`${E}·已暂存`:E},MO=(_)=>{j_.innerHTML="";let S=_.files??[];if(S.length===0){let A=document.createElement("div");A.className="empty",A.innerHTML='<div class="ic">—○—</div><div>工作区干净</div>',j_.appendChild(A);return}let U=(A)=>A.trim()!==""&&A!=="?"&&A!==" ",E=S.every((A)=>U(A.staged)),M=document.createElement("div");M.className="selbar",M.onclick=(A)=>{if(A.target.tagName!=="INPUT")G.click()};let G=document.createElement("input");G.type="checkbox",G.checked=E,G.title=E?"全不选：取消全部暂存":"全选：暂存全部",G.onchange=async()=>{if(!W){G.checked=!G.checked;return}if(G.checked){let A=S.filter((F)=>!U(F.staged)).map((F)=>F.path);if(A.length>0)await K("POST","/stage",{dir:W,paths:A})}else{let A=S.filter((F)=>U(F.staged)).map((F)=>F.path);if(A.length>0)await K("POST","/unstage",{dir:W,paths:A})}w_()};let X=document.createElement("span");X.className="mut";let V=S.filter((A)=>U(A.staged)).length;X.textContent=`全选 ${V}/${S.length}`,M.append(G,X),j_.appendChild(M);let P=document.createElement("table");for(let A of S){let F=document.createElement("tr"),n=document.createElement("td");n.style.width="28px";let v=document.createElement("input");v.type="checkbox",v.checked=A.staged.trim()!==""&&A.staged!=="?"&&A.staged!==" ",v.title=v.checked?"已暂存点取消":"未暂存点暂存",v.onchange=async()=>{if(!W)return;await K("POST",v.checked?"/stage":"/unstage",{dir:W,paths:[A.path]}),w_()},n.appendChild(v);let a=document.createElement("td");a.className="mono ellipsis",a.textContent=A.path,a.title=`${A.path}（点切换勾选）`,a.onclick=()=>v.click();let g=document.createElement("td");g.style.width="92px",g.style.minWidth="92px",g.style.textAlign="right",g.style.whiteSpace="nowrap",g.style.fontSize="13px",g.className="mut";let U_=A.binary?`<span style="color:${L.gray}">二进制</span>`:A.add!==void 0?`<span style="color:${L.green}">+${A.add}</span> <span style="color:${L.red}">-${A.del??0}</span> `:"",E_=pO(A.staged,A.unstaged);g.innerHTML=`${U_}<span style="color:${cO(A.staged,A.unstaged)}">${E_}</span>`,g.title=g.textContent??"";let s=document.createElement("td");if(s.style.width="30px",s.style.textAlign="right",!(A.staged==="U"||A.unstaged==="U")){let d=document.createElement("button");d.textContent="↩ 还原",d.title="还原：丢弃该文件本地改动",d.className="icon",d.onclick=async()=>{if(!W)return;if(A.staged==="?"||A.staged==="A"){if(!await aT(`确定丢弃 ${A.path} 的本地内容吗？删除后不可恢复`))return;if(!await aT(`再次确认：真的删除 ${A.path} 吗？`))return}d.disabled=!0;let J_=await K("POST","/restore",{dir:W,paths:[A.path],confirmed:!0}),i=JSON.parse(J_.body);if(!i.ok&&i.error==="need-confirm"){if(await aT(`确定删除未跟踪的 ${A.path} 吗？`))await K("POST","/restore",{dir:W,paths:[A.path],confirmed:!0})}else if(!i.ok)q.textContent=i.error||"还原失败";d.disabled=!1,w_()},s.appendChild(d)}F.append(n,a,g,s),P.appendChild(F)}j_.appendChild(P)},vO=(_,S)=>{mO(S,_.branch??"")},dO=(_)=>{for(let S of[...Q_.options]){let U=tT.get(S.value);if(!U)continue;if(S.value===W)U.branch=_.branch??U.branch,U.ahead=_.ahead,U.behind=_.behind;S.textContent=AO(U.name,S.value,U.branch,U.ahead,U.behind)}},uO=(_)=>{let S=_.ahead??0,U=_.behind??0;if(U>0&&S>0)k.textContent=`远程 ${U} 个新，本地超前 ${S}`,k.style.color=L.amber;else if(U>0)k.textContent=`远程有 ${U} 个新提交，可下载`,k.style.color=L.amber;else if(S>0)k.textContent=`本地超前 ${S}可推送`,k.style.color=L.blue;else k.textContent="已是最新",k.style.color=L.green;k_.setBadge(_.files?.length?_.files.length:null).catch(()=>{return})},O_=async()=>{if(!W||z_)return;z_=!0;let _=W;k.textContent="同步中…";try{await K("POST","/fetch",{dir:_}).catch(()=>{return});let S=await K("GET",`/status?dir=${encodeURIComponent(_)}`),U=JSON.parse(S.body);if(!U.ok||U.branch===void 0){rT(!0);return}rT(!1),uO(U),dO(U),vO(U,_),UT(U),ET(U),MO(U),UO(U)}catch(S){k.textContent=S instanceof I?`${S.code}`:"同步失败"}finally{z_=!1}},w_=async()=>{if(!W||z_||document.hidden)return;z_=!0;try{let _=await K("GET",`/status?dir=${encodeURIComponent(W)}`),S=JSON.parse(_.body);if(!S.ok)return;MO(S),UO(S),k_.setBadge(S.files?.length?S.files.length:null).catch(()=>{return})}catch{}finally{z_=!1}};z("btn-refresh").onclick=()=>void O_();z("btn-pull-all").onclick=async()=>{if(!W||nT.disabled)return;nT.disabled=!0;try{let _=await K("POST","/pull-all",{dir:W}),S=JSON.parse(_.body);if(!S.ok||!S.jobId){k.textContent="全部拉取启动失败";return}for(;;){if(await new Promise((V)=>setTimeout(V,2000)),!W)return;let U=await K("GET",`/pull-all-status?jobId=${encodeURIComponent(S.jobId)}`),E=JSON.parse(U.body);if(!E.ok){k.textContent="全部拉取查询失败";return}if(k.textContent=`全部拉取 ${E.finished}/${E.total}…`,k.style.color=L.amber,!E.done)continue;let M=E.results.filter((V)=>V.ok).length,G=E.results.filter((V)=>V.conflict).map((V)=>V.name),X=E.results.filter((V)=>!V.ok&&!V.conflict).map((V)=>V.name);k.textContent=`全部拉取完成：成功 ${M}/${E.total}${G.length>0?`，冲突 ${G.join("、")} 请自行处理`:""}${X.length>0?`，失败 ${X.join("、")}`:""}`,k.style.color=X.length>0||G.length>0?L.amber:L.green;break}}catch{k.textContent="全部拉取失败"}finally{if(nT.disabled=!1,W)EO(W);O_()}};z("btn-pull").onclick=async()=>{if(!W)return;k.textContent="下载中…";try{await K("POST","/pull",{dir:W})}catch{}O_()};z("btn-push").onclick=async()=>{if(!W)return;let _=z("btn-push");if(_.disabled)return;_.disabled=!0;let S=_.textContent;_.innerHTML='<span class="spin">↻</span> 推送中…';try{await K("POST","/fetch",{dir:W}).catch(()=>{return});let U=await K("GET",`/status?dir=${encodeURIComponent(W)}`),E=JSON.parse(U.body);if(!E.ok){q.textContent="状态获取失败，稍后重试";return}if((E.behind??0)>0){k.textContent=`远程有 ${E.behind} 个新提交，先点下载再推送`,k.style.color=L.amber,q.textContent=`远程有 ${E.behind} 个新提交，先点下载合并后再推送`,UT(E),ET(E);return}if((E.ahead??0)<=0){k.textContent="已是最新，无需推送",k.style.color=L.green,q.textContent="本地与远程一致，无需推送";return}k.textContent=`推送中…（超前 ${E.ahead}）`;let M=await K("POST","/push",{dir:W}),G=JSON.parse(M.body);if(!G.ok){q.textContent=gO(G.output||G.error||"推送失败"),k.textContent="推送失败，看下方提示",k.style.color=L.amber;return}q.textContent="已推送"}catch{q.textContent="推送失败"}finally{_.disabled=!1,_.textContent=S,O_()}};Z_.onchange=async()=>{if(!W||!Z_.value)return;let _=Z_.value,S=oT.has(_),U=S?_.slice(_.indexOf("/")+1):_;k.textContent=S?`新建跟踪分支 ${U}…`:`切换到 ${_}…`;let E=await K("POST","/checkout",S?{dir:W,branch:U,create:!0,base:_}:{dir:W,branch:_}),M=JSON.parse(E.body);if(!M.ok)k.textContent=M.output||M.error||"切换失败";O_()};var R_=z("btn-commit");R_.onclick=async()=>{if(!W||R_.disabled)return;let _=X_.value.trim();if(!_){if(!await RO())return;if(_=X_.value.trim(),!_)return;q.textContent=`已自动生成：${_}，继续提交…`}R_.disabled=!0;let S=R_.textContent;R_.innerHTML='<span class="spin">↻</span> 提交中…';try{await K("POST","/fetch",{dir:W}).catch(()=>{return});let U=await K("GET",`/status?dir=${encodeURIComponent(W)}`),E=JSON.parse(U.body),M=E.behind??0;if(M>0){q.textContent=`远程有 ${M} 个新提交，先点下载合并后再提交`,k.textContent=`远程有 ${M} 个新提交可下载`,UT(E),ET(E);return}q.textContent="提交…";let G=await K("POST","/commit",{dir:W,message:_,push:!0}),X=JSON.parse(G.body);if(!X.ok){q.textContent=X.error||"提交失败";return}q.textContent="跟远程核验中…",await K("POST","/fetch",{dir:W}).catch(()=>{return});let V=await K("GET",`/status?dir=${encodeURIComponent(W)}`),P=JSON.parse(V.body),A=P.ahead??0;if(A>0){q.textContent=`已提交但远程核验本地仍超前 ${A}推送可能没完全成功请检查`,UT(P),ET(P);return}X_.value="",q.textContent="已提交并推送远程核验一致",lO()}catch(U){q.textContent=U instanceof I?`${U.code}`:"提交失败"}finally{R_.disabled=!1,R_.textContent=S,O_()}};var RO=async()=>{if(!W)return!1;q.textContent="AI 生成中…";try{let _=await K("GET",`/status?dir=${encodeURIComponent(W)}`),S=JSON.parse(_.body),U=(A)=>A.trim()!==""&&A!=="?"&&A!==" ",E=(S.files??[]).filter((A)=>U(A.staged));if(E.length===0)return q.textContent="先勾选要提交的文件",!1;let M="";for(let A of E.slice(0,3)){try{let F=await K("GET",`/diff?dir=${encodeURIComponent(W)}&file=${encodeURIComponent(A.path)}&staged=1`),n=JSON.parse(F.body);if(n.ok&&n.diff)M+=`
--- ${A.path} ---
${n.diff.slice(0,2000)}`}catch{}if(M.length>6000)break}let G=E.map((A)=>`- ${A.staged}${A.unstaged} ${A.path}`).join(`
`).slice(0,1000),X=(S.recent??[]).slice(0,8).map((A)=>`- ${A.subject}`).join(`
`)||"- （无历史提交）",{text:V}=await k_.generate({system:"You are generating a Conventional Commits subject line from the diffs of the selected files.",prompt:`Return exactly one JSON object and nothing else. Do not include prose, markdown, explanations, or code fences.

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
${X}

Selected files:
${G}${M?`
Diffs:
${M.slice(0,6000)}`:""}`,maxOutputTokens:500}),P=V.trim().replace(/^```(?:json)?/i,"").replace(/```$/i,"").trim();try{let A=JSON.parse(P);if(!A.subject)throw Error("empty");X_.value=A.subject.trim();let F=(A.highlights??[]).filter(Boolean).slice(0,3);q.textContent=`已按 ${E.length} 个勾选文件生成${F.length>0?`：${F.join("；")}`:""}`}catch{X_.value=(P.split(`
`)[0]??"").slice(0,200),q.textContent=`已按 ${E.length} 个勾选文件生成（原文回填）`}return X_.value.trim().length>0}catch{return q.textContent="无小模型或未授权 model",!1}};z("btn-ai").onclick=()=>void RO();var G_=null;z("btn-again").onclick=()=>{if(G_)clearTimeout(G_),G_=null;H_.hidden=!0};var lO=()=>{if(G_)clearTimeout(G_);H_.hidden=!1,G_=setTimeout(()=>{H_.hidden=!0,G_=null},2200),H_.querySelectorAll(".confetti").forEach((S)=>S.remove());let _=["#f43f5e","#f59e0b","#10b981","#3b82f6","#a855f7"];for(let S=0;S<24;S++){let U=document.createElement("div");U.className="confetti",U.style.left=`${4+Math.random()*92}%`,U.style.background=_[S%_.length],U.style.animationDelay=`${Math.random()*0.5}s`,H_.appendChild(U)}};z("btn-conflict-ok").onclick=()=>{OO.hidden=!0};k_.onResolve(async({args:_})=>{if(_.trim())X_.value=_.trim();return null});setInterval(()=>void w_(),5000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)w_()});Q_.onchange=()=>{if(!Q_.value)return;W=Q_.value,SO(),O_()};k_.onReady((_)=>{qT(_,document.documentElement);let S=_.directory??null;if(S!==W){if(sT=S,W=S,!W){rT(!0);return}EO(W),SO(),O_()}});})();
