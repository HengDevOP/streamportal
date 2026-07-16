(()=>{var a={};a.id=974,a.ids=[974],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4615:(a,b,c)=>{Promise.resolve().then(c.bind(c,47617))},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21487:(a,b,c)=>{Promise.resolve().then(c.bind(c,51303))},22121:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,81170,23)),Promise.resolve().then(c.t.bind(c,23597,23)),Promise.resolve().then(c.t.bind(c,36893,23)),Promise.resolve().then(c.t.bind(c,89748,23)),Promise.resolve().then(c.t.bind(c,6060,23)),Promise.resolve().then(c.t.bind(c,7184,23)),Promise.resolve().then(c.t.bind(c,69576,23)),Promise.resolve().then(c.t.bind(c,73041,23)),Promise.resolve().then(c.t.bind(c,51384,23))},26713:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/is-bot")},27035:(a,b,c)=>{"use strict";c.r(b),c.d(b,{GlobalError:()=>E.a,__next_app__:()=>K,handler:()=>M,pages:()=>J,routeModule:()=>L,tree:()=>I});var d=c(49754),e=c(9117),f=c(46595),g=c(32324),h=c(39326),i=c(38928),j=c(20175),k=c(12),l=c(54290),m=c(12696),n=c(52574),o=c(82802),p=c(77533),q=c(45229),r=c(32822),s=c(261),t=c(26453),u=c(52474),v=c(26713),w=c(51356),x=c(62685),y=c(36225),z=c(63446),A=c(2762),B=c(45742),C=c(86439),D=c(81170),E=c.n(D),F=c(62506),G=c(91203),H={};for(let a in F)0>["default","tree","pages","GlobalError","__next_app__","routeModule","handler"].indexOf(a)&&(H[a]=()=>F[a]);c.d(b,H);let I=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(c.bind(c,51303)),"/Users/hochenheng/Desktop/StreamIntergration/src/app/page.js"]}]},{layout:[()=>Promise.resolve().then(c.bind(c,97634)),"/Users/hochenheng/Desktop/StreamIntergration/src/app/layout.js"],"global-error":[()=>Promise.resolve().then(c.t.bind(c,81170,23)),"next/dist/client/components/builtin/global-error.js"],"not-found":[()=>Promise.resolve().then(c.t.bind(c,87028,23)),"next/dist/client/components/builtin/not-found.js"],forbidden:[()=>Promise.resolve().then(c.t.bind(c,90461,23)),"next/dist/client/components/builtin/forbidden.js"],unauthorized:[()=>Promise.resolve().then(c.t.bind(c,32768,23)),"next/dist/client/components/builtin/unauthorized.js"]}],J=["/Users/hochenheng/Desktop/StreamIntergration/src/app/page.js"],K={require:c,loadChunk:()=>Promise.resolve()},L=new d.AppPageRouteModule({definition:{kind:e.RouteKind.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:I},distDir:".next",relativeProjectDir:""});async function M(a,b,d){var D;let H="/page";"/index"===H&&(H="/");let N=(0,h.getRequestMeta)(a,"postponed"),O=(0,h.getRequestMeta)(a,"minimalMode"),P=await L.prepare(a,b,{srcPage:H,multiZoneDraftMode:!1});if(!P)return b.statusCode=400,b.end("Bad Request"),null==d.waitUntil||d.waitUntil.call(d,Promise.resolve()),null;let{buildId:Q,query:R,params:S,parsedUrl:T,pageIsDynamic:U,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,serverActionsManifest:Y,clientReferenceManifest:Z,subresourceIntegrityManifest:$,prerenderManifest:_,isDraftMode:aa,resolvedPathname:ab,revalidateOnlyGenerated:ac,routerServerContext:ad,nextConfig:ae,interceptionRoutePatterns:af}=P,ag=T.pathname||"/",ah=(0,s.normalizeAppPath)(H),{isOnDemandRevalidate:ai}=P,aj=L.match(ag,_),ak=!!_.routes[ab],al=!!(aj||ak||_.routes[ah]),am=a.headers["user-agent"]||"",an=(0,v.getBotType)(am),ao=(0,q.isHtmlBotRequest)(a),ap=(0,h.getRequestMeta)(a,"isPrefetchRSCRequest")??"1"===a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],aq=(0,h.getRequestMeta)(a,"isRSCRequest")??(0,n.f)(a.headers[u.RSC_HEADER]),ar=(0,t.getIsPossibleServerAction)(a),as=(0,m.checkIsAppPPREnabled)(ae.experimental.ppr)&&(null==(D=_.routes[ah]??_.dynamicRoutes[ah])?void 0:D.renderingMode)==="PARTIALLY_STATIC",at=!1,au=!1,av=as?N:void 0,aw=as&&aq&&!ap,ax=(0,h.getRequestMeta)(a,"segmentPrefetchRSCRequest"),ay=!am||(0,q.shouldServeStreamingMetadata)(am,ae.htmlLimitedBots);ao&&as&&(al=!1,ay=!1);let az=!0===L.isDev||!al||"string"==typeof N||aw,aA=ao&&as,aB=null;aa||!al||az||ar||av||aw||(aB=ab);let aC=aB;!aC&&L.isDev&&(aC=ab),L.isDev||aa||!al||!aq||aw||(0,k.d)(a.headers);let aD={...F,tree:I,pages:J,GlobalError:E(),handler:M,routeModule:L,__next_app__:K};Y&&Z&&(0,p.setReferenceManifestsSingleton)({page:H,clientReferenceManifest:Z,serverActionsManifest:Y,serverModuleMap:(0,r.createServerModuleMap)({serverActionsManifest:Y})});let aE=a.method||"GET",aF=(0,g.getTracer)(),aG=aF.getActiveScopeSpan();try{let f=L.getVaryHeader(ab,af);b.setHeader("Vary",f);let k=async(c,d)=>{let e=new l.NodeNextRequest(a),f=new l.NodeNextResponse(b);return L.render(e,f,d).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=aF.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==i.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${aE} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${aE} ${a.url}`)})},m=async({span:e,postponed:f,fallbackRouteParams:g})=>{let i={query:R,params:S,page:ah,sharedContext:{buildId:Q},serverComponentsHmrCache:(0,h.getRequestMeta)(a,"serverComponentsHmrCache"),fallbackRouteParams:g,renderOpts:{App:()=>null,Document:()=>null,pageConfig:{},ComponentMod:aD,Component:(0,j.T)(aD),params:S,routeModule:L,page:H,postponed:f,shouldWaitOnAllReady:aA,serveStreamingMetadata:ay,supportsDynamicResponse:"string"==typeof f||az,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,subresourceIntegrityManifest:$,serverActionsManifest:Y,clientReferenceManifest:Z,setIsrStatus:null==ad?void 0:ad.setIsrStatus,dir:c(33873).join(process.cwd(),L.relativeProjectDir),isDraftMode:aa,isRevalidate:al&&!f&&!aw,botType:an,isOnDemandRevalidate:ai,isPossibleServerAction:ar,assetPrefix:ae.assetPrefix,nextConfigOutput:ae.output,crossOrigin:ae.crossOrigin,trailingSlash:ae.trailingSlash,previewProps:_.preview,deploymentId:ae.deploymentId,enableTainting:ae.experimental.taint,htmlLimitedBots:ae.htmlLimitedBots,devtoolSegmentExplorer:ae.experimental.devtoolSegmentExplorer,reactMaxHeadersLength:ae.reactMaxHeadersLength,multiZoneDraftMode:!1,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:ae.experimental.cacheLife,basePath:ae.basePath,serverActions:ae.experimental.serverActions,...at?{nextExport:!0,supportsDynamicResponse:!1,isStaticGeneration:!0,isRevalidate:!0,isDebugDynamicAccesses:at}:{},experimental:{isRoutePPREnabled:as,expireTime:ae.expireTime,staleTimes:ae.experimental.staleTimes,cacheComponents:!!ae.experimental.cacheComponents,clientSegmentCache:!!ae.experimental.clientSegmentCache,clientParamParsing:!!ae.experimental.clientParamParsing,dynamicOnHover:!!ae.experimental.dynamicOnHover,inlineCss:!!ae.experimental.inlineCss,authInterrupts:!!ae.experimental.authInterrupts,clientTraceMetadata:ae.experimental.clientTraceMetadata||[]},waitUntil:d.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:()=>{},onInstrumentationRequestError:(b,c,d)=>L.onRequestError(a,b,d,ad),err:(0,h.getRequestMeta)(a,"invokeError"),dev:L.isDev}},l=await k(e,i),{metadata:m}=l,{cacheControl:n,headers:o={},fetchTags:p}=m;if(p&&(o[z.NEXT_CACHE_TAGS_HEADER]=p),a.fetchMetrics=m.fetchMetrics,al&&(null==n?void 0:n.revalidate)===0&&!L.isDev&&!as){let a=m.staticBailoutInfo,b=Object.defineProperty(Error(`Page changed from static to dynamic at runtime ${ab}${(null==a?void 0:a.description)?`, reason: ${a.description}`:""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),"__NEXT_ERROR_CODE",{value:"E132",enumerable:!1,configurable:!0});if(null==a?void 0:a.stack){let c=a.stack;b.stack=b.message+c.substring(c.indexOf("\n"))}throw b}return{value:{kind:w.CachedRouteKind.APP_PAGE,html:l,headers:o,rscData:m.flightData,postponed:m.postponed,status:m.statusCode,segmentData:m.segmentData},cacheControl:n}},n=async({hasResolved:c,previousCacheEntry:f,isRevalidating:g,span:i})=>{let j,k=!1===L.isDev,l=c||b.writableEnded;if(ai&&ac&&!f&&!O)return(null==ad?void 0:ad.render404)?await ad.render404(a,b):(b.statusCode=404,b.end("This page could not be found")),null;if(aj&&(j=(0,x.parseFallbackField)(aj.fallback)),j===x.FallbackMode.PRERENDER&&(0,v.isBot)(am)&&(!as||ao)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),(null==f?void 0:f.isStale)===-1&&(ai=!0),ai&&(j!==x.FallbackMode.NOT_FOUND||f)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),!O&&j!==x.FallbackMode.BLOCKING_STATIC_RENDER&&aC&&!l&&!aa&&U&&(k||!ak)){let b;if((k||aj)&&j===x.FallbackMode.NOT_FOUND)throw new C.NoFallbackError;if(as&&!aq){let c="string"==typeof(null==aj?void 0:aj.fallback)?aj.fallback:k?ah:null;if(b=await L.handleResponse({cacheKey:c,req:a,nextConfig:ae,routeKind:e.RouteKind.APP_PAGE,isFallback:!0,prerenderManifest:_,isRoutePPREnabled:as,responseGenerator:async()=>m({span:i,postponed:void 0,fallbackRouteParams:k||au?(0,o.u)(ah):null}),waitUntil:d.waitUntil}),null===b)return null;if(b)return delete b.cacheControl,b}}let n=ai||g||!av?void 0:av;if(at&&void 0!==n)return{cacheControl:{revalidate:1,expire:void 0},value:{kind:w.CachedRouteKind.PAGES,html:y.default.EMPTY,pageData:{},headers:void 0,status:void 0}};let p=U&&as&&((0,h.getRequestMeta)(a,"renderFallbackShell")||au)?(0,o.u)(ag):null;return m({span:i,postponed:n,fallbackRouteParams:p})},p=async c=>{var f,g,i,j,k;let l,o=await L.handleResponse({cacheKey:aB,responseGenerator:a=>n({span:c,...a}),routeKind:e.RouteKind.APP_PAGE,isOnDemandRevalidate:ai,isRoutePPREnabled:as,req:a,nextConfig:ae,prerenderManifest:_,waitUntil:d.waitUntil});if(aa&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate"),L.isDev&&b.setHeader("Cache-Control","no-store, must-revalidate"),!o){if(aB)throw Object.defineProperty(Error("invariant: cache entry required but not generated"),"__NEXT_ERROR_CODE",{value:"E62",enumerable:!1,configurable:!0});return null}if((null==(f=o.value)?void 0:f.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null==(i=o.value)?void 0:i.kind}`),"__NEXT_ERROR_CODE",{value:"E707",enumerable:!1,configurable:!0});let p="string"==typeof o.value.postponed;al&&!aw&&(!p||ap)&&(O||b.setHeader("x-nextjs-cache",ai?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),b.setHeader(u.NEXT_IS_PRERENDER_HEADER,"1"));let{value:q}=o;if(av)l={revalidate:0,expire:void 0};else if(O&&aq&&!ap&&as)l={revalidate:0,expire:void 0};else if(!L.isDev)if(aa)l={revalidate:0,expire:void 0};else if(al){if(o.cacheControl)if("number"==typeof o.cacheControl.revalidate){if(o.cacheControl.revalidate<1)throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`),"__NEXT_ERROR_CODE",{value:"E22",enumerable:!1,configurable:!0});l={revalidate:o.cacheControl.revalidate,expire:(null==(j=o.cacheControl)?void 0:j.expire)??ae.expireTime}}else l={revalidate:z.CACHE_ONE_YEAR,expire:void 0}}else b.getHeader("Cache-Control")||(l={revalidate:0,expire:void 0});if(o.cacheControl=l,"string"==typeof ax&&(null==q?void 0:q.kind)===w.CachedRouteKind.APP_PAGE&&q.segmentData){b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"2");let c=null==(k=q.headers)?void 0:k[z.NEXT_CACHE_TAGS_HEADER];O&&al&&c&&"string"==typeof c&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,c);let d=q.segmentData.get(ax);return void 0!==d?(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(d,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl}):(b.statusCode=204,(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.EMPTY,cacheControl:o.cacheControl}))}let r=(0,h.getRequestMeta)(a,"onCacheEntry");if(r&&await r({...o,value:{...o.value,kind:"PAGE"}},{url:(0,h.getRequestMeta)(a,"initURL")}))return null;if(p&&av)throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"),"__NEXT_ERROR_CODE",{value:"E396",enumerable:!1,configurable:!0});if(q.headers){let a={...q.headers};for(let[c,d]of(O&&al||delete a[z.NEXT_CACHE_TAGS_HEADER],Object.entries(a)))if(void 0!==d)if(Array.isArray(d))for(let a of d)b.appendHeader(c,a);else"number"==typeof d&&(d=d.toString()),b.appendHeader(c,d)}let s=null==(g=q.headers)?void 0:g[z.NEXT_CACHE_TAGS_HEADER];if(O&&al&&s&&"string"==typeof s&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,s),!q.status||aq&&as||(b.statusCode=q.status),!O&&q.status&&G.RedirectStatusCode[q.status]&&aq&&(b.statusCode=200),p&&b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"1"),aq&&!aa){if(void 0===q.rscData){if(q.postponed)throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"),"__NEXT_ERROR_CODE",{value:"E372",enumerable:!1,configurable:!0});return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:q.html,cacheControl:aw?{revalidate:0,expire:void 0}:o.cacheControl})}return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(q.rscData,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl})}let t=q.html;if(!p||O||aq)return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:o.cacheControl});if(at)return t.push(new ReadableStream({start(a){a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML),a.close()}})),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}});let v=new TransformStream;return t.push(v.readable),m({span:c,postponed:q.postponed,fallbackRouteParams:null}).then(async a=>{var b,c;if(!a)throw Object.defineProperty(Error("Invariant: expected a result to be returned"),"__NEXT_ERROR_CODE",{value:"E463",enumerable:!1,configurable:!0});if((null==(b=a.value)?void 0:b.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null==(c=a.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E305",enumerable:!1,configurable:!0});await a.value.html.pipeTo(v.writable)}).catch(a=>{v.writable.abort(a).catch(a=>{console.error("couldn't abort transformer",a)})}),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}})};if(!aG)return await aF.withPropagatedContext(a.headers,()=>aF.trace(i.BaseServerSpan.handleRequest,{spanName:`${aE} ${a.url}`,kind:g.SpanKind.SERVER,attributes:{"http.method":aE,"http.target":a.url}},p));await p(aG)}catch(b){throw b instanceof C.NoFallbackError||await L.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"render",revalidateReason:(0,f.c)({isRevalidate:al,isOnDemandRevalidate:ai})},ad),b}}},28354:a=>{"use strict";a.exports=require("util")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},41025:a=>{"use strict";a.exports=require("next/dist/server/app-render/dynamic-access-async-storage.external.js")},42378:(a,b,c)=>{"use strict";var d=c(91330);c.o(d,"useParams")&&c.d(b,{useParams:function(){return d.useParams}}),c.o(d,"useRouter")&&c.d(b,{useRouter:function(){return d.useRouter}})},47617:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>g});var d=c(21124),e=c(38301),f=c(42378);function g(){let a=(0,f.useRouter)(),[b,c]=(0,e.useState)(""),[g,h]=(0,e.useState)(""),[i,j]=(0,e.useState)(!1),[k,l]=(0,e.useState)(null),[m,n]=(0,e.useState)(!1),[o,p]=(0,e.useState)("hero"),[q,r]=(0,e.useState)(!0),[s,t]=(0,e.useState)({name:"Sok Mean",amount:"25.00",currency:"$",message:"Keep up the amazing work! Love the stream! \uD83D\uDC96"});async function u(c){if(c.preventDefault(),h(""),!b.trim())return void h("Username is required.");let d=b.trim().toLowerCase();if(!/^[a-zA-Z0-9_]{3,20}$/.test(d))return void h("Username must be 3-20 characters (letters, numbers, underscores).");j(!0);try{let b=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:d})}),c=await b.json();b.ok&&c.success?a.push("/dashboard"):h(c.error||"Access failed.")}catch(a){console.error(a),h("Failed to connect to local authentication server.")}finally{j(!1)}}function v(a){let b=document.getElementById(a);b&&b.scrollIntoView({behavior:"smooth"})}return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"bg-glow-top"}),(0,d.jsx)("div",{className:"bg-glow-bottom"}),(0,d.jsx)("header",{className:"navbar",children:(0,d.jsxs)("div",{className:"nav-container",children:[(0,d.jsxs)("div",{className:"nav-brand",onClick:()=>{v("hero"),n(!1)},style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,d.jsxs)("svg",{width:"28",height:"28",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"brand-icon-svg",style:{filter:"drop-shadow(0 0 8px var(--primary-glow))"},children:[(0,d.jsx)("rect",{width:"32",height:"32",rx:"8",fill:"url(#logo-grad-home)"}),(0,d.jsx)("path",{d:"M11 21L19 11M19 11H13M19 11V17",stroke:"#ffffff",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,d.jsx)("circle",{cx:"16",cy:"16",r:"13",stroke:"url(#stroke-grad-home)",strokeWidth:"1.5"}),(0,d.jsxs)("defs",{children:[(0,d.jsxs)("linearGradient",{id:"logo-grad-home",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#8b5cf6"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffb84d"})]}),(0,d.jsxs)("linearGradient",{id:"stroke-grad-home",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#ffffff",stopOpacity:"0.8"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffffff",stopOpacity:"0.2"})]})]})]}),(0,d.jsx)("span",{className:"brand-text",children:"StreamPortal"})]}),(0,d.jsx)("button",{className:"menu-toggle",onClick:()=>n(!m),"aria-label":"Toggle Navigation",children:(0,d.jsx)("i",{className:m?"fa-solid fa-xmark":"fa-solid fa-bars"})}),(0,d.jsxs)("nav",{className:`nav-links ${m?"active":""}`,children:[(0,d.jsx)("span",{className:"hero"===o?"active":"",onClick:()=>{v("hero"),n(!1)},children:"Home"}),(0,d.jsx)("span",{className:"features"===o?"active":"",onClick:()=>{v("features"),n(!1)},children:"Features"}),(0,d.jsx)("span",{className:"how-it-works"===o?"active":"",onClick:()=>{v("how-it-works"),n(!1)},children:"How it Works"}),(0,d.jsx)("span",{onClick:()=>{a.push("/pricing"),n(!1)},children:"Pricing"}),k?(0,d.jsxs)("button",{className:"nav-btn",onClick:()=>{a.push("/dashboard"),n(!1)},style:{borderColor:"var(--primary)",display:"flex",alignItems:"center",gap:"6px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-gauge"})," Dashboard"]}):(0,d.jsx)("button",{className:"nav-btn",onClick:()=>{window.location.href="/api/auth/google",n(!1)},children:"Login"})]})]})}),(0,d.jsx)("section",{className:"hero-section",id:"hero",children:(0,d.jsxs)("div",{className:"hero-container",children:[(0,d.jsxs)("div",{className:"hero-badge",children:[(0,d.jsx)("i",{className:"fa-solid fa-rocket",style:{marginRight:"6px",color:"var(--primary)"}})," Next-Gen Live Stream Integration"]}),(0,d.jsxs)("h1",{className:"hero-title",children:["Automate Alerts & ",(0,d.jsx)("br",{}),(0,d.jsx)("span",{className:"gradient-text",children:"Streamline Donations"})]}),(0,d.jsx)("p",{className:"hero-subtitle",children:"The ultimate self-hosted overlay suite for streamers. Link your Telegram bank receipts directly to custom OBS alerts, read comments with high-fidelity Khmer & English AI voiceovers, and engage supporters in real-time."}),(0,d.jsxs)("div",{className:"hero-ctas",children:[(0,d.jsx)("button",{className:"btn-primary",onClick:()=>v("portal"),children:"Access Streamer Portal"}),(0,d.jsx)("button",{className:"btn-secondary",onClick:()=>v("features"),children:"Explore Features"})]}),(0,d.jsx)("div",{className:"alert-mockup-wrapper",children:(0,d.jsxs)("div",{className:`alert-mockup ${q?"active":""}`,style:{transition:"all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"},children:[(0,d.jsxs)("div",{className:"mockup-header",children:[(0,d.jsx)("span",{className:"dot dot-r"}),(0,d.jsx)("span",{className:"dot dot-y"}),(0,d.jsx)("span",{className:"dot dot-g"}),(0,d.jsx)("span",{className:"mockup-title",children:"OBS overlay live preview"})]}),(0,d.jsxs)("div",{className:"mockup-body",style:{padding:"30px",minHeight:"180px",display:"flex",flexDirection:"column",justifyContent:"center"},children:[(0,d.jsx)("div",{className:"alert-text-line",style:{fontSize:"20px",fontWeight:"900",lineHeight:"1.4",marginBottom:"12px",color:"#ffffff",textShadow:"0 2px 10px rgba(0, 0, 0, 0.95)"},dangerouslySetInnerHTML:{__html:`<strong>${s.name}</strong> donated <strong style="color: #69f0ae; text-shadow: 0 0 12px rgba(105,240,174,0.6);">${s.currency}${s.amount}</strong> through super chat!`}}),s.message&&(0,d.jsxs)("div",{className:"message-box",style:{fontSize:"15px",fontWeight:"700",color:"#ffb84d",padding:"8px 0",lineHeight:"1.4",textAlign:"center",wordBreak:"break-word",textShadow:"0 2px 8px rgba(0,0,0,0.95)"},children:["\uD83D\uDCAC ",(0,d.jsx)("span",{children:s.message})]})]})]})})]})}),(0,d.jsxs)("section",{className:"features-section",id:"features",children:[(0,d.jsxs)("div",{className:"section-header",children:[(0,d.jsx)("h2",{className:"section-title",children:"Fully Integrated Streaming Toolkit"}),(0,d.jsx)("p",{className:"section-subtitle",children:"Everything you need to configure premium overlay experiences out of the box."})]}),(0,d.jsxs)("div",{className:"features-grid",children:[(0,d.jsxs)("div",{className:"feature-card",children:[(0,d.jsx)("div",{className:"feature-icon",children:(0,d.jsx)("i",{className:"fa-solid fa-plug",style:{color:"var(--primary)"}})}),(0,d.jsx)("h3",{className:"feature-card-title",children:"Telegram & ABA Link"}),(0,d.jsx)("p",{className:"feature-card-desc",children:"Connect your GramJS client securely to monitor chat receipts. Automate verification and parse incoming payments in real-time."})]}),(0,d.jsxs)("div",{className:"feature-card",children:[(0,d.jsx)("div",{className:"feature-icon",children:(0,d.jsx)("i",{className:"fa-solid fa-palette",style:{color:"var(--primary)"}})}),(0,d.jsx)("h3",{className:"feature-card-title",children:"No-Code Theme Engine"}),(0,d.jsx)("p",{className:"feature-card-desc",children:"Customize colors, presets, and Google Font templates. Upload custom alert notification MP3 sounds and set target timeouts."})]}),(0,d.jsxs)("div",{className:"feature-card",children:[(0,d.jsx)("div",{className:"feature-icon",children:(0,d.jsx)("i",{className:"fa-solid fa-volume-high",style:{color:"var(--primary)"}})}),(0,d.jsx)("h3",{className:"feature-card-title",children:"Khmer & English AI TTS"}),(0,d.jsx)("p",{className:"feature-card-desc",children:"Automated Khmer Unicode character detection that reads support comments sequentially using Google's Neural AI voiceovers."})]}),(0,d.jsxs)("div",{className:"feature-card",children:[(0,d.jsx)("div",{className:"feature-icon",children:(0,d.jsx)("i",{className:"fa-solid fa-trophy",style:{color:"var(--primary)"}})}),(0,d.jsx)("h3",{className:"feature-card-title",children:"Top Donors Widget"}),(0,d.jsx)("p",{className:"feature-card-desc",children:"Generate dynamic top-5 supporter ranking widgets to include on stream layouts and motivate higher community engagement."})]})]})]}),(0,d.jsxs)("section",{className:"how-it-works",id:"how-it-works",children:[(0,d.jsxs)("div",{className:"section-header",children:[(0,d.jsx)("h2",{className:"section-title",children:"Get Live In Three Easy Steps"}),(0,d.jsx)("p",{className:"section-subtitle",children:"No complicated configurations or complex API keys needed."})]}),(0,d.jsxs)("div",{className:"steps-container",children:[(0,d.jsxs)("div",{className:"step-item",children:[(0,d.jsx)("div",{className:"step-num",children:"1"}),(0,d.jsx)("h4",{children:"Sign In Locally"}),(0,d.jsx)("p",{children:"Pick a custom streamer username. If it's your first time, the platform automatically initializes your profile."})]}),(0,d.jsx)("div",{className:"step-arrow",children:(0,d.jsx)("i",{className:"fa-solid fa-arrow-right",style:{color:"var(--primary)",opacity:.8}})}),(0,d.jsxs)("div",{className:"step-item",children:[(0,d.jsx)("div",{className:"step-num",children:"2"}),(0,d.jsx)("h4",{children:"Sync & Style"}),(0,d.jsx)("p",{children:"Connect your Telegram client, select your layout fonts, colors, and configure your preferred speech engine parameters."})]}),(0,d.jsx)("div",{className:"step-arrow",children:(0,d.jsx)("i",{className:"fa-solid fa-arrow-right",style:{color:"var(--primary)",opacity:.8}})}),(0,d.jsxs)("div",{className:"step-item",children:[(0,d.jsx)("div",{className:"step-num",children:"3"}),(0,d.jsx)("h4",{children:"Add to OBS"}),(0,d.jsx)("p",{children:"Copy your unique overlay link into a Browser Source in OBS Studio or Streamlabs. You are ready to go live!"})]})]})]}),(0,d.jsx)("section",{className:"portal-section",id:"portal",children:(0,d.jsxs)("div",{className:"portal-container",children:[(0,d.jsx)("div",{className:"portal-logo",children:(0,d.jsx)("i",{className:"fa-solid fa-bolt",style:{color:"var(--primary)"}})}),(0,d.jsx)("h2",{children:"Streamer Dashboard Portal"}),(0,d.jsx)("p",{children:"Enter your local account credentials or choose a new handle to register."}),g&&(0,d.jsx)("div",{className:"error-alert",children:g}),(0,d.jsxs)("button",{type:"button",className:"btn-google",onClick:()=>window.location.href="/api/auth/google",style:{width:"100%",background:"#ffffff",color:"#000000",border:"none",borderRadius:"12px",padding:"14px",fontWeight:"800",fontSize:"15px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",marginBottom:"20px",boxShadow:"0 4px 15px rgba(255, 255, 255, 0.1)",transition:"transform 0.2s"},onMouseOver:a=>a.currentTarget.style.transform="translateY(-1px)",onMouseOut:a=>a.currentTarget.style.transform="translateY(0)",children:[(0,d.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[(0,d.jsx)("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),(0,d.jsx)("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),(0,d.jsx)("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),(0,d.jsx)("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}),"Continue with Google"]}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"15px",color:"var(--text-muted)",fontSize:"13px",margin:"25px 0"},children:[(0,d.jsx)("div",{style:{flex:1,height:"1px",background:"var(--border)"}}),(0,d.jsx)("span",{children:"OR DEV BYPASS"}),(0,d.jsx)("div",{style:{flex:1,height:"1px",background:"var(--border)"}})]}),(0,d.jsxs)("form",{onSubmit:u,children:[(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{htmlFor:"username",children:"Streamer Username"}),(0,d.jsx)("input",{type:"text",id:"username",className:"input-control",placeholder:"e.g. ninja_streamer",value:b,onChange:a=>c(a.target.value),required:!0,autoComplete:"off"})]}),(0,d.jsx)("button",{type:"submit",className:"btn-submit",disabled:i,children:i?"Accessing Dashboard...":"Go to Dashboard"})]})]})}),(0,d.jsx)("footer",{className:"footer-bar",children:(0,d.jsx)("p",{children:"\xa9 2026 StreamPortal. Made for streamers on localhost."})}),(0,d.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        :root {
          --primary: #8b5cf6;
          --primary-glow: rgba(139, 92, 246, 0.4);
          --accent: #ffb84d;
          --accent-glow: rgba(255, 184, 77, 0.4);
          --bg: #07060b;
          --bg-gradient: radial-gradient(circle at center, #130f24 0%, #06050a 100%);
          --glass: rgba(18, 16, 26, 0.6);
          --border: rgba(255, 255, 255, 0.06);
          --text-muted: rgba(255, 255, 255, 0.5);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatMockup {
          0% { transform: translateY(0px) rotateX(8deg); }
          50% { transform: translateY(-12px) rotateX(10deg); }
          100% { transform: translateY(0px) rotateX(8deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.08; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.12; transform: translateX(-50%) scale(1.05); }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          background-image: var(--bg-gradient);
          color: #ffffff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* GLOW EFFECT DECORATIONS */
        .bg-glow-top {
          position: absolute;
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%);
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
          animation: pulseGlow 8s ease-in-out infinite;
        }

        .bg-glow-bottom {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 184, 77, 0.05) 0%, transparent 60%);
          bottom: 100px;
          right: -200px;
          z-index: 0;
          pointer-events: none;
        }

        /* NAVBAR */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          background: rgba(7, 6, 11, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .brand-icon {
          font-size: 24px;
          color: var(--accent);
          filter: drop-shadow(0 0 10px var(--accent-glow));
        }

        .brand-text {
          font-size: 21px;
          font-weight: 900;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #ffffff 40%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Menu Toggle Button */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 22px;
          cursor: pointer;
          transition: color 0.2s;
          z-index: 102;
        }

        .menu-toggle:hover {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links span {
          position: relative;
          cursor: pointer;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 15px;
          transition: color 0.3s;
          padding: 4px 0;
        }

        .nav-links span:hover,
        .nav-links span.active {
          color: #ffffff;
        }

        .nav-links span::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
          box-shadow: 0 0 8px var(--primary-glow);
        }

        .nav-links span:hover::after,
        .nav-links span.active::after {
          width: 100%;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
        }

        /* HERO SECTION */
        .hero-section {
          padding-top: 170px;
          padding-bottom: 90px;
          position: relative;
          z-index: 1;
        }

        .hero-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
        }

        .hero-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          color: var(--accent);
          background: rgba(255, 184, 77, 0.08);
          border: 1px solid rgba(255, 184, 77, 0.15);
          padding: 6px 14px;
          border-radius: 50px;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 25px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #ffb84d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 19px;
          max-width: 680px;
          margin: 0 auto 40px auto;
          line-height: 1.6;
        }

        .hero-ctas {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 70px;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
          color: #ffffff;
          border: none;
          padding: 16px 32px;
          font-weight: 800;
          font-size: 16px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 10px 25px var(--primary-glow);
          transition: all 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px var(--primary-glow);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: #ffffff;
          padding: 16px 32px;
          font-weight: 800;
          font-size: 16px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* ALERT MOCKUP PREVIEW */
        .alert-mockup-wrapper {
          perspective: 1000px;
          margin-top: 30px;
        }

        .alert-mockup {
          max-width: 500px;
          margin: 0 auto;
          background: rgba(18, 16, 26, 0.85);
          border: 2px solid var(--accent);
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 184, 77, 0.1);
          transform: translateY(20px) rotateX(8deg) scale(0.95);
          opacity: 0;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
        }

        .alert-mockup.active {
          opacity: 1;
          transform: translateY(0) rotateX(8deg) scale(1);
          animation: floatMockup 4s ease-in-out infinite;
        }

        .alert-mockup.active:hover {
          transform: translateY(0) rotateX(0deg) scale(1.02);
          animation: none;
        }

        .mockup-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid var(--border);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-r { background: #ff5f56; }
        .dot-y { background: #ffbd2e; }
        .dot-g { background: #27c93f; }

        .mockup-title {
          font-size: 11px;
          font-family: monospace;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          margin-left: 10px;
          letter-spacing: 1px;
        }

        .mockup-body {
          padding: 35px;
        }

        .alert-badge-preview {
          display: inline-block;
          font-size: 10px;
          font-weight: 900;
          color: #ffffff;
          background: var(--accent);
          padding: 4px 10px;
          border-radius: 50px;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .alert-preview-title {
          font-size: 16px;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .alert-preview-donor {
          font-size: 26px;
          font-weight: 800;
        }

        .alert-preview-amount {
          font-size: 34px;
          font-weight: 900;
          color: #00e676;
          margin-bottom: 15px;
          text-shadow: 0 0 10px rgba(0, 230, 118, 0.2);
        }

        .alert-preview-msg {
          font-size: 14px;
          background: rgba(0,0,0,0.3);
          padding: 12px;
          border-radius: 10px;
          color: rgba(255,255,255,0.85);
        }

        /* FEATURES SECTION */
        .features-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin-bottom: 15px;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 17px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 25px;
        }

        .feature-card {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 35px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.1);
        }

        .feature-icon {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .feature-card-title {
          font-size: 19px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .feature-card-desc {
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.5;
        }

        /* HOW IT WORKS */
        .how-it-works {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .steps-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav-links {
            position: fixed;
            top: -100%;
            left: 0;
            width: 100%;
            height: auto;
            max-height: 85vh;
            background: rgba(12, 10, 22, 0.98);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-bottom: 1px solid var(--border);
            border-left: none;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 25px;
            padding: 90px 40px 40px 40px;
            opacity: 0;
            visibility: hidden;
            transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, visibility 0.3s ease;
            z-index: 100;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }

          .nav-links.active {
            top: 0;
            opacity: 1;
            visibility: visible;
          }

          .nav-links span {
            font-size: 18px;
            width: 100%;
            text-align: center;
            padding: 10px 0;
          }

          .nav-links span::after {
            bottom: 0;
          }

          .nav-btn {
            width: 100%;
            justify-content: center;
            padding: 12px 24px;
            font-size: 16px;
          }

          .hero-section {
            padding-top: 120px;
            padding-bottom: 60px;
          }

          .hero-title {
            font-size: 34px;
            line-height: 1.2;
          }

          .hero-subtitle {
            font-size: 15px;
            margin-bottom: 30px;
          }

          .hero-ctas {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
            padding: 0 10px;
          }

          .btn-primary, .btn-secondary {
            padding: 14px 24px;
            font-size: 15px;
            width: 100%;
          }

          .alert-mockup {
            transform: none !important;
          }

          .section-title {
            font-size: 28px;
          }

          .portal-container {
            padding: 30px 20px;
          }

          .steps-container {
            flex-direction: column;
          }
          .step-arrow {
            transform: rotate(90deg);
            margin: 10px 0;
          }
        }

        .step-item {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 30px 20px;
          text-align: center;
        }

        .step-num {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 900;
          font-size: 18px;
          margin: 0 auto 20px auto;
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        .step-item h4 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .step-item p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .step-arrow {
          font-size: 24px;
          color: var(--primary);
          font-weight: bold;
        }

        /* ACCESS PORTAL SECTION (LOGIN CARD) */
        .portal-section {
          padding: 100px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .portal-container {
          width: 100%;
          max-width: 450px;
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 50px 40px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .portal-logo {
          font-size: 40px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.1);
          border: 2px solid var(--primary);
          box-shadow: 0 0 15px var(--primary-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }

        .portal-container h2 {
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .portal-container p {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 35px;
        }

        .form-group {
          margin-bottom: 25px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-control {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 16px;
          color: #ffffff;
          font-family: inherit;
          font-size: 15px;
          transition: all 0.3s;
        }

        .input-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
          border: none;
          border-radius: 12px;
          padding: 15px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 15px var(--primary-glow);
          transition: all 0.2s;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px var(--primary-glow);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error-alert {
          background: rgba(255, 82, 82, 0.12);
          border: 1px solid rgba(255, 82, 82, 0.25);
          color: #ff5252;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 25px;
          text-align: left;
        }

        /* FOOTER BAR */
        .footer-bar {
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 13px;
        }
      `}})]})}},51303:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/hochenheng/Desktop/StreamIntergration/src/app/page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/hochenheng/Desktop/StreamIntergration/src/app/page.js","default")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},87273:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,54160,23)),Promise.resolve().then(c.t.bind(c,31603,23)),Promise.resolve().then(c.t.bind(c,68495,23)),Promise.resolve().then(c.t.bind(c,75170,23)),Promise.resolve().then(c.t.bind(c,77526,23)),Promise.resolve().then(c.t.bind(c,78922,23)),Promise.resolve().then(c.t.bind(c,29234,23)),Promise.resolve().then(c.t.bind(c,12263,23)),Promise.resolve().then(c.bind(c,82146))},96487:()=>{},97634:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>f,metadata:()=>e});var d=c(75338);let e={title:"StreamPortal - Next-Gen Live Stream Alerts & ABA bank receipts Integration",description:"Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.",keywords:"ABA payment integration, Stream overlays, OBS alerts, live streaming donations, Telegram transaction parser, Khmer text-to-speech, donor widgets, stream automation",robots:"index, follow",icons:{icon:"/favicon.ico",shortcut:"/favicon.ico",apple:"/favicon.ico"},openGraph:{title:"StreamPortal - Live Stream Alerts & ABA Sync",description:"Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.",type:"website",url:"http://localhost:3000",siteName:"StreamPortal"}};function f({children:a}){return(0,d.jsxs)("html",{lang:"en",children:[(0,d.jsxs)("head",{children:[(0,d.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,d.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,d.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",rel:"stylesheet"}),(0,d.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"})]}),(0,d.jsx)("body",{children:a})]})}}};var b=require("../webpack-runtime.js");b.C(a);var c=b.X(0,[331,792],()=>b(b.s=27035));module.exports=c})();