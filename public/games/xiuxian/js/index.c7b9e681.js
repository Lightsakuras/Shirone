import{g as pe,E as fe,k as me,l as ve,b as c,d as I,m as x,_ as p,j as t,V as s,n as he,H as ge,f as be,o as H,p as g,q as G,S as xe,u as ye,v as we,e as Ce,w as Ee,X as Ne,x as je,y as ke,z as Fe,A as j,B as b,D as Se,F as q,G as J,r as T,J as Be,K as Te,M as _e,N as Ae,O as He,P as Pe,Q as K,U as V}from"./vendors.78acc31e.js";import{c as h,P as De,t as $,T as Re}from"./common.edf4e9f7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();var ze=`
/* H5 端隐藏 TabBar 空图标（只隐藏没有 src 的图标） */
.weui-tabbar__icon:not([src]),
.weui-tabbar__icon[src=''] {
  display: none !important;
}

.weui-tabbar__item:has(.weui-tabbar__icon:not([src])) .weui-tabbar__label,
.weui-tabbar__item:has(.weui-tabbar__icon[src='']) .weui-tabbar__label {
  margin-top: 0 !important;
}

/* Vite 错误覆盖层无法选择文本的问题 */
vite-error-overlay {
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-user-select: text !important;
}

vite-error-overlay::part(window) {
  max-width: 90vw;
  padding: 10px;
}

.taro_page {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* H5 导航栏页面自动添加顶部间距 */
body.h5-navbar-visible .taro_page {
  padding-top: 44px;
}

body.h5-navbar-visible .toaster[data-position^="top"] {
  top: 44px !important;
}

/* Sheet 组件在 H5 导航栏下的位置修正 */
body.h5-navbar-visible .sheet-content:not([data-side="bottom"]) {
    top: 44px !important;
}

/*
 * H5 端 rem 适配：与小程序 rpx 缩放一致
 * 375px 屏幕：1rem = 16px，小程序 32rpx = 16px
 */
html {
    font-size: 4vw !important;
}

/* H5 端组件默认样式修复 */
taro-view-core {
    display: block;
}

taro-text-core {
    display: inline;
}

taro-input-core {
    display: block;
    width: 100%;
}

taro-input-core input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
}

taro-input-core.taro-otp-hidden-input input {
    color: transparent;
    caret-color: transparent;
    -webkit-text-fill-color: transparent;
}

/* 全局按钮样式重置 */
taro-button-core,
button {
    margin: 0 !important;
    padding: 0 !important;
    line-height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
}

taro-button-core::after,
button::after {
    border: none;
}

taro-textarea-core > textarea,
.taro-textarea,
textarea.taro-textarea {
    resize: none !important;
}
`,Oe=`
/* PC 宽屏适配 - 基础布局 */
@media (min-width: 769px) {
  html {
    font-size: 15px !important;
  }

  body {
    background-color: #f3f4f6 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100vh !important;
  }
}
`,Le=`
/* PC 宽屏适配 - 手机框样式（有 TabBar 页面） */
@media (min-width: 769px) {
  .taro-tabbar__container {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    transform: translateX(0) !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
  }

  .taro-tabbar__panel {
    height: 100% !important;
    overflow: auto !important;
  }
}

/* PC 宽屏适配 - Toast 定位到手机框范围内 */
@media (min-width: 769px) {
  body .toaster {
    left: 50% !important;
    right: auto !important;
    width: 375px !important;
    max-width: 375px !important;
    transform: translateX(-50%) !important;
    box-sizing: border-box !important;
  }
}

/* PC 宽屏适配 - 手机框样式（无 TabBar 页面，通过 JS 添加 no-tabbar 类） */
@media (min-width: 769px) {
  body.no-tabbar #app {
    width: 375px !important;
    max-width: 375px !important;
    height: calc(100vh - 40px) !important;
    max-height: 900px !important;
    background-color: #fff !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
    transform: translateX(0) !important;
  }

  body.no-tabbar #app .taro_router {
    height: 100% !important;
    overflow: auto !important;
  }
}
`;function Ie(){var a=document.createElement("style");a.innerHTML=ze+Oe+Le,document.head.appendChild(a)}function Ve(){var a=function(){var n=!!document.querySelector(".taro-tabbar__container");document.body.classList.toggle("no-tabbar",!n)};a();var e=new MutationObserver(a);e.observe(document.body,{childList:!0,subtree:!0})}function $e(){Ie(),Ve()}function Me(){var a=pe();if(a===fe.WEAPP)try{var e=me(),r=e.miniProgram.envVersion;console.log("[Debug] envVersion:",r),r!=="release"&&ve({enableDebug:!0})}catch(n){console.error("[Debug] 开启调试模式失败:",n)}}var Ue={visible:!1,title:"",bgColor:"#ffffff",textStyle:"black",navStyle:"default",transparent:"none",leftIcon:"none"},We=function(){var e,r=H();return(r==null||(e=r.config)===null||e===void 0?void 0:e.window)||{}},Xe=function(){var e,r,n=(e=H())===null||e===void 0||(e=e.config)===null||e===void 0?void 0:e.tabBar;return new Set((n==null||(r=n.list)===null||r===void 0?void 0:r.map(function(o){return o.pagePath}))||[])},M=function(){var e,r=H();return(r==null||(e=r.config)===null||e===void 0||(e=e.pages)===null||e===void 0?void 0:e[0])||"pages/index/index"},k=function(e){return e.replace(/^\//,"")},Ye=function(e,r,n,o){if(!e)return"none";var i=k(e),l=k(o),f=i===l,u=r.has(i)||r.has("/".concat(i)),m=n>1;return u||f?"none":m?"back":"home"},Ge=function(){var e=c.useState(Ue),r=I(e,2),n=r[0],o=r[1],i=c.useState(0),l=I(i,2),f=l[0],u=l[1],m=c.useCallback(function(){var d=x.getCurrentPages();if(d.length===0){o(function(de){return p(p({},de),{},{visible:!1})});return}var v=d[d.length-1],z=(v==null?void 0:v.route)||"";if(z){var y=(v==null?void 0:v.config)||{},w=We(),E=Xe(),le=M(),N=k(z),O=k(le),ue=N===O,ce=E.has(N)||E.has("/".concat(N)),L=E.size<=1&&d.length<=1&&(ue||ce);o({visible:!L,title:document.title||y.navigationBarTitleText||w.navigationBarTitleText||"",bgColor:y.navigationBarBackgroundColor||w.navigationBarBackgroundColor||"#ffffff",textStyle:y.navigationBarTextStyle||w.navigationBarTextStyle||"black",navStyle:y.navigationStyle||w.navigationStyle||"default",transparent:y.transparentTitle||w.transparentTitle||"none",leftIcon:L?"none":Ye(N,E,d.length,O)})}},[]);x.useDidShow(function(){m()}),x.usePageScroll(function(d){var v=d.scrollTop;n.transparent==="auto"&&u(Math.min(v/100,1))}),c.useEffect(function(){var d=null,v=new MutationObserver(function(){d&&clearTimeout(d),d=setTimeout(function(){m()},50)});return v.observe(document.head,{subtree:!0,childList:!0,characterData:!0}),m(),function(){v.disconnect(),d&&clearTimeout(d)}},[m]);var B=n.visible&&n.navStyle!=="custom";if(c.useEffect(function(){B?document.body.classList.add("h5-navbar-visible"):document.body.classList.remove("h5-navbar-visible")},[B]),!B)return t.jsx(t.Fragment,{});var R=n.textStyle==="white"?"#fff":"#333",ae=n.textStyle==="white"?"text-white":"text-gray-800",oe=function(){return n.transparent==="always"?{backgroundColor:"transparent"}:n.transparent==="auto"?{backgroundColor:n.bgColor,opacity:f}:{backgroundColor:n.bgColor}},ie=function(){return x.navigateBack()},se=function(){var v=M();x.reLaunch({url:"/".concat(v)})};return t.jsxs(t.Fragment,{children:[t.jsxs(s,{className:"fixed top-0 left-0 right-0 h-11 flex items-center justify-center z-1000",style:oe(),children:[n.leftIcon==="back"&&t.jsx(s,{className:"absolute left-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center",onClick:ie,children:t.jsx(he,{size:24,color:R})}),n.leftIcon==="home"&&t.jsx(s,{className:"absolute left-2 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center",onClick:se,children:t.jsx(ge,{size:22,color:R})}),t.jsx(be,{className:"text-base font-medium max-w-3/5 truncate ".concat(ae),children:n.title})]}),t.jsx(s,{className:"h-11 shrink-0"})]})},qe=function(e){var r=e.children;return t.jsxs(t.Fragment,{children:[t.jsx(Ge,{}),r]})},Je=["className","variant"],Ke=G("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary hover:bg-opacity-80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary hover:bg-opacity-80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive hover:bg-opacity-80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function _(a){var e=a.className,r=a.variant,n=g(a,Je);return t.jsx(s,p({className:h(Ke({variant:r}),e)},n))}var Qe=["className","variant","size","asChild","disabled"],Ze=G("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary hover:bg-opacity-90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive hover:bg-opacity-90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary hover:bg-opacity-80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),C=c.forwardRef(function(a,e){var r,n=a.className,o=a.variant,i=a.size;a.asChild;var l=a.disabled,f=g(a,Qe),u=(r=f.tabIndex)!==null&&r!==void 0?r:l?-1:0;return t.jsx(s,p(p({className:h(Ze({variant:o,size:i,className:n}),l&&"opacity-50 pointer-events-none"),ref:e},{tabIndex:u}),{},{hoverClass:l?void 0:"border-ring ring-2 ring-ring ring-offset-2 ring-offset-background"},f))});C.displayName="Button";var er=["className","children"],rr=["className"],nr=["className"],tr=["className"],ar=["className"],or=["className"],P=c.createContext({hasHeader:!1}),Q=c.forwardRef(function(a,e){var r=a.className,n=a.children,o=g(a,er),i=c.Children.toArray(n).some(function(l){return c.isValidElement(l)&&l.type.displayName==="CardHeader"});return t.jsx(P.Provider,{value:{hasHeader:i},children:t.jsx(s,p(p({ref:e,className:h("rounded-lg border bg-card text-card-foreground shadow-sm",r)},o),{},{children:n}))})});Q.displayName="Card";var Z=c.forwardRef(function(a,e){var r=a.className,n=g(a,rr);return t.jsx(s,p({ref:e,className:h("flex flex-col space-y-2 p-6",r)},n))});Z.displayName="CardHeader";var ee=c.forwardRef(function(a,e){var r=a.className,n=g(a,nr);return t.jsx(s,p({ref:e,className:h("text-2xl font-semibold leading-none tracking-tight",r)},n))});ee.displayName="CardTitle";var ir=c.forwardRef(function(a,e){var r=a.className,n=g(a,tr);return t.jsx(s,p({ref:e,className:h("text-sm text-muted-foreground",r)},n))});ir.displayName="CardDescription";var re=c.forwardRef(function(a,e){var r=a.className,n=g(a,ar),o=c.useContext(P),i=o.hasHeader;return t.jsx(s,p({ref:e,className:h("p-6",i&&"pt-0",r)},n))});re.displayName="CardContent";var sr=c.forwardRef(function(a,e){var r=a.className,n=g(a,or),o=c.useContext(P),i=o.hasHeader;return t.jsx(s,p({ref:e,className:h("flex items-center p-6",i&&"pt-0",r)},n))});sr.displayName="CardFooter";var lr=["className","children","orientation"],ne=c.forwardRef(function(a,e){var r=a.className,n=a.children,o=a.orientation,i=o===void 0?"vertical":o,l=g(a,lr),f=i==="horizontal"||i==="both",u=i==="vertical"||i==="both";return t.jsx(xe,p(p({ref:e,className:h("relative",r),scrollY:u,scrollX:f,style:{overflowX:f?"auto":"hidden",overflowY:u?"auto":"hidden"}},l),{},{children:n}))});ne.displayName="ScrollArea";var ur={error:null,report:"",source:"",visible:!1,open:!1,timestamp:""},U="hsl(360, 100%, 45%)",W=!1,F=ur,A=new Set,cr=function(){A.forEach(function(e){return e()})},dr=function(e){return A.add(e),function(){return A.delete(e)}},X=function(){return F},te=function(e){F=e,cr()},pr=(function(){var a=j(b().m(function e(r){var n,o,i,l,f;return b().w(function(u){for(;;)switch(u.p=u.n){case 0:if(typeof window!="undefined"){u.n=1;break}return u.a(2,!1);case 1:if(u.p=1,!((n=navigator.clipboard)!==null&&n!==void 0&&n.writeText)){u.n=3;break}return u.n=2,navigator.clipboard.writeText(r);case 2:return u.a(2,!0);case 3:u.n=5;break;case 4:u.p=4,l=u.v,console.warn("[H5ErrorBoundary] Clipboard API copy failed:",l);case 5:return u.p=5,o=document.createElement("textarea"),o.value=r,o.setAttribute("readonly","true"),o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),i=document.execCommand("copy"),document.body.removeChild(o),u.a(2,i);case 6:return u.p=6,f=u.v,console.warn("[H5ErrorBoundary] Fallback copy failed:",f),u.a(2,!1)}},e,null,[[5,6],[1,4]])}));return function(r){return a.apply(this,arguments)}})(),fr=function(e){if(e instanceof Error)return e;if(typeof e=="string")return new Error(e);try{return new Error(JSON.stringify(e))}catch(r){return new Error(String(e))}},mr=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=["[H5 Runtime Error]","Time: ".concat(new Date().toISOString()),r.source?"Source: ".concat(r.source):"","Name: ".concat(e.name),"Message: ".concat(e.message),e.stack?`Stack:
`.concat(e.stack):"",r.componentStack?`Component Stack:
`.concat(r.componentStack):"",typeof navigator!="undefined"?"User Agent: ".concat(navigator.userAgent):""].filter(Boolean);return n.join(`

`)},Y=function(e){F.visible&&te(p(p({},F),{},{open:e}))},D=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(typeof window!="undefined"){var n=fr(e),o=mr(n,r),i=new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",second:"2-digit"});te({error:n,report:o,source:r.source||"runtime",timestamp:i,visible:!0,open:!1}),console.error("[H5ErrorOverlay] Showing error overlay:",n,r)}},vr=function(e){var r=e.error||new Error(e.message||"Unknown H5 runtime error");D(r,{source:"window.error"})},hr=function(e){D(e.reason,{source:"window.unhandledrejection"})},gr=function(){typeof window=="undefined"||W||(W=!0,window.addEventListener("error",vr),window.addEventListener("unhandledrejection",hr))},br=function(){var e,r,n=c.useSyncExternalStore(dr,X,X);if(!n.visible)return null;var o=((e=n.error)===null||e===void 0?void 0:e.name)||"Error";return t.jsx(De,{children:t.jsxs(s,{className:"pointer-events-none fixed inset-0 z-[2147483646]",children:[t.jsx(s,{className:"pointer-events-auto fixed bottom-5 left-5",children:t.jsx(C,{variant:"outline",size:"icon",className:h("h-11 w-11 rounded-full shadow-md transition-transform"),style:{backgroundColor:"hsl(359, 100%, 97%)",borderColor:"hsl(359, 100%, 94%)",color:U},onClick:function(){return Y(!n.open)},children:t.jsx(Ce,{size:22,color:U})})}),n.open&&t.jsx(s,{className:"pointer-events-none fixed inset-0 bg-white bg-opacity-15 supports-[backdrop-filter]:backdrop-blur-md",children:t.jsx(s,{className:"absolute inset-0 flex items-center justify-center px-4 py-4",children:t.jsx(s,{className:"w-full max-w-md",style:{width:"min(calc(100vw - 32px), var(--h5-phone-width, 390px))",height:"min(calc(100vh - 32px), 900px)"},children:t.jsx(Q,{className:h("pointer-events-auto h-full rounded-2xl border border-border bg-background text-foreground shadow-2xl"),children:t.jsxs(s,{className:"relative flex h-full flex-col",children:[t.jsxs(Z,{className:"gap-2 p-4 pb-2",children:[t.jsxs(s,{className:"flex items-start justify-between gap-3",children:[t.jsxs(s,{className:"flex flex-wrap items-center gap-2",children:[t.jsx(_,{variant:"destructive",className:"border-none bg-red-500 px-3 py-1 text-xs font-medium text-white",children:"Runtime Error"}),t.jsx(_,{variant:"outline",className:"px-3 py-1 text-xs",children:n.source})]}),t.jsxs(s,{className:"flex shrink-0 items-center gap-1",children:[t.jsx(C,{variant:"ghost",size:"icon",className:"h-8 w-8 rounded-full",onClick:function(){return window.location.reload()},children:t.jsx(Ee,{size:15,color:"inherit"})}),t.jsx(C,{variant:"ghost",size:"icon",className:"h-8 w-8 rounded-full",onClick:function(){return Y(!1)},children:t.jsx(Ne,{size:17,color:"inherit"})})]})]}),t.jsxs(s,{className:"flex items-center justify-between gap-3",children:[t.jsx(ee,{className:"text-left text-lg",children:o}),t.jsxs(C,{variant:"outline",size:"sm",className:"shrink-0 rounded-lg",onClick:(function(){var i=j(b().m(function f(){var u;return b().w(function(m){for(;;)switch(m.n){case 0:return m.n=1,pr(n.report);case 1:if(u=m.v,!u){m.n=2;break}return $.success("已复制错误信息",{description:"可发送给 Agent 进行自动修复",position:"top-center"}),m.a(2);case 2:$.warning("复制失败",{description:"请直接选中文本后手动复制。",position:"top-center"});case 3:return m.a(2)}},f)}));function l(){return i.apply(this,arguments)}return l})(),children:[t.jsx(je,{size:15,color:"inherit"}),t.jsx(s,{children:"复制错误"})]})]})]}),t.jsx(re,{className:"min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-2",children:t.jsxs(s,{className:"flex h-full min-h-0 flex-col gap-2",children:[t.jsxs(s,{className:"flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border px-3 py-2 text-sm",children:[t.jsxs(s,{className:"flex items-center gap-2",children:[t.jsx(s,{className:"text-muted-foreground",children:"Error"}),t.jsx(s,{className:"font-medium text-foreground",children:((r=n.error)===null||r===void 0?void 0:r.name)||"Error"})]}),t.jsx(s,{className:"h-4 w-px bg-border"}),t.jsxs(s,{className:"flex items-center gap-2",children:[t.jsx(s,{className:"text-muted-foreground",children:"Source"}),t.jsx(s,{className:"font-medium text-foreground",children:n.source})]})]}),t.jsxs(s,{className:"min-h-0 flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-black text-white",children:[t.jsxs(s,{className:"flex items-center justify-between border-b border-white border-opacity-10 px-3 py-3",children:[t.jsx(s,{className:"text-xs font-medium uppercase tracking-wide text-zinc-400",children:"Full Report"}),t.jsx(_,{variant:"outline",className:"border-zinc-700 bg-transparent px-2 py-1 text-xs text-zinc-400",children:n.timestamp})]}),t.jsx(ne,{className:"min-h-0 flex-1 w-full",orientation:"both",children:t.jsx(s,{className:"inline-block min-w-full whitespace-pre px-3 py-3 pb-8 font-mono text-xs leading-6 text-zinc-200",children:n.report})})]})]})})]})})})})})]})})},xr=(function(a){function e(){var r;ke(this,e);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return r=Fe(this,e,[].concat(o)),r.state={error:null},r}return ye(e,a),we(e,[{key:"componentDidUpdate",value:function(n){this.state.error&&n.children!==this.props.children&&this.setState({error:null})}},{key:"componentDidCatch",value:function(n,o){D(n,{source:"React Error Boundary",componentStack:o.componentStack||""})}},{key:"render",value:function(){return t.jsxs(t.Fragment,{children:[t.jsx(br,{}),this.state.error?null:this.props.children]})}}],[{key:"getDerivedStateFromError",value:function(n){return{error:n}}}])})(c.Component),yr=function(e){var r=e.children;return t.jsx(xr,{children:r})},wr=function(e){var r=e.children;return gr(),x.useLaunch(function(){Me(),$e()}),t.jsx(yr,{children:t.jsx(qe,{children:r})})},Cr=function(e){var r=e.children;return t.jsxs(Se,{defaultColor:"#000",defaultSize:24,children:[t.jsx(wr,{children:r}),t.jsx(Re,{})]})},S=q.__taroAppConfig={router:{mode:"hash"},sitemapLocation:"sitemap.json",pages:["pages/index/index"],subPackages:[{root:"packageA/roster",name:"roster",pages:["index"]}],preloadRule:{"pages/index/index":{network:"all",packages:["roster"]}},window:{backgroundTextStyle:"dark",navigationBarBackgroundColor:"#0d0a16",navigationBarTitleText:"修仙命运录",navigationBarTextStyle:"white"}};S.routes=[Object.assign({path:"pages/index/index",load:(function(){var a=j(b().m(function r(n,o){var i;return b().w(function(l){for(;;)switch(l.n){case 0:return l.n=1,V(()=>import("./index.aa27fc12.js"),["./index.aa27fc12.js","./vendors.78acc31e.js","..\\css\\vendors.8886af03.css","./common.edf4e9f7.js","..\\css\\index.e0c3a7b1.css"],import.meta.url);case 1:return i=l.v,l.a(2,[i,n,o])}},r)}));function e(r,n){return a.apply(this,arguments)}return e})()},{navigationBarTitleText:"首页"}),Object.assign({path:"packageA/roster/index",load:(function(){var a=j(b().m(function r(n,o){var i;return b().w(function(l){for(;;)switch(l.n){case 0:return l.n=1,V(()=>import("./index.54aab5ed.js"),["./index.54aab5ed.js","./vendors.78acc31e.js","..\\css\\vendors.8886af03.css","./common.edf4e9f7.js","..\\css\\index.08c85bcd.css"],import.meta.url);case 1:return i=l.v,l.a(2,[i,n,o])}},r)}));function e(r,n){return a.apply(this,arguments)}return e})()},{navigationBarTitleText:"命途录 · 众生",backgroundColor:"#0d0a16"})];Object.assign(J,{findDOMNode:T.findDOMNode,render:T.render,unstable_batchedUpdates:T.unstable_batchedUpdates});Be();var Er=Te(Cr,K,J,S),Nr=_e({window:q});Ae(S);He(Nr,Er,S,K);Pe({designWidth:750,deviceRatio:{375:2,640:1.17,750:1,828:.905},baseFontSize:20,unitPrecision:void 0,targetUnit:void 0});
