(()=>{var a={};a.id=907,a.ids=[907],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},2795:(a,b,c)=>{"use strict";c.r(b),c.d(b,{GlobalError:()=>E.a,__next_app__:()=>K,handler:()=>M,pages:()=>J,routeModule:()=>L,tree:()=>I});var d=c(49754),e=c(9117),f=c(46595),g=c(32324),h=c(39326),i=c(38928),j=c(20175),k=c(12),l=c(54290),m=c(12696),n=c(52574),o=c(82802),p=c(77533),q=c(45229),r=c(32822),s=c(261),t=c(26453),u=c(52474),v=c(26713),w=c(51356),x=c(62685),y=c(36225),z=c(63446),A=c(2762),B=c(45742),C=c(86439),D=c(81170),E=c.n(D),F=c(62506),G=c(91203),H={};for(let a in F)0>["default","tree","pages","GlobalError","__next_app__","routeModule","handler"].indexOf(a)&&(H[a]=()=>F[a]);c.d(b,H);let I={children:["",{children:["pricing",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(c.bind(c,30700)),"/Users/hochenheng/Desktop/StreamIntergration/src/app/pricing/page.js"]}]},{}]},{layout:[()=>Promise.resolve().then(c.bind(c,97634)),"/Users/hochenheng/Desktop/StreamIntergration/src/app/layout.js"],"global-error":[()=>Promise.resolve().then(c.t.bind(c,81170,23)),"next/dist/client/components/builtin/global-error.js"],"not-found":[()=>Promise.resolve().then(c.t.bind(c,87028,23)),"next/dist/client/components/builtin/not-found.js"],forbidden:[()=>Promise.resolve().then(c.t.bind(c,90461,23)),"next/dist/client/components/builtin/forbidden.js"],unauthorized:[()=>Promise.resolve().then(c.t.bind(c,32768,23)),"next/dist/client/components/builtin/unauthorized.js"]}]}.children,J=["/Users/hochenheng/Desktop/StreamIntergration/src/app/pricing/page.js"],K={require:c,loadChunk:()=>Promise.resolve()},L=new d.AppPageRouteModule({definition:{kind:e.RouteKind.APP_PAGE,page:"/pricing/page",pathname:"/pricing",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:I},distDir:".next",relativeProjectDir:""});async function M(a,b,d){var D;let H="/pricing/page";"/index"===H&&(H="/");let N=(0,h.getRequestMeta)(a,"postponed"),O=(0,h.getRequestMeta)(a,"minimalMode"),P=await L.prepare(a,b,{srcPage:H,multiZoneDraftMode:!1});if(!P)return b.statusCode=400,b.end("Bad Request"),null==d.waitUntil||d.waitUntil.call(d,Promise.resolve()),null;let{buildId:Q,query:R,params:S,parsedUrl:T,pageIsDynamic:U,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,serverActionsManifest:Y,clientReferenceManifest:Z,subresourceIntegrityManifest:$,prerenderManifest:_,isDraftMode:aa,resolvedPathname:ab,revalidateOnlyGenerated:ac,routerServerContext:ad,nextConfig:ae,interceptionRoutePatterns:af}=P,ag=T.pathname||"/",ah=(0,s.normalizeAppPath)(H),{isOnDemandRevalidate:ai}=P,aj=L.match(ag,_),ak=!!_.routes[ab],al=!!(aj||ak||_.routes[ah]),am=a.headers["user-agent"]||"",an=(0,v.getBotType)(am),ao=(0,q.isHtmlBotRequest)(a),ap=(0,h.getRequestMeta)(a,"isPrefetchRSCRequest")??"1"===a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],aq=(0,h.getRequestMeta)(a,"isRSCRequest")??(0,n.f)(a.headers[u.RSC_HEADER]),ar=(0,t.getIsPossibleServerAction)(a),as=(0,m.checkIsAppPPREnabled)(ae.experimental.ppr)&&(null==(D=_.routes[ah]??_.dynamicRoutes[ah])?void 0:D.renderingMode)==="PARTIALLY_STATIC",at=!1,au=!1,av=as?N:void 0,aw=as&&aq&&!ap,ax=(0,h.getRequestMeta)(a,"segmentPrefetchRSCRequest"),ay=!am||(0,q.shouldServeStreamingMetadata)(am,ae.htmlLimitedBots);ao&&as&&(al=!1,ay=!1);let az=!0===L.isDev||!al||"string"==typeof N||aw,aA=ao&&as,aB=null;aa||!al||az||ar||av||aw||(aB=ab);let aC=aB;!aC&&L.isDev&&(aC=ab),L.isDev||aa||!al||!aq||aw||(0,k.d)(a.headers);let aD={...F,tree:I,pages:J,GlobalError:E(),handler:M,routeModule:L,__next_app__:K};Y&&Z&&(0,p.setReferenceManifestsSingleton)({page:H,clientReferenceManifest:Z,serverActionsManifest:Y,serverModuleMap:(0,r.createServerModuleMap)({serverActionsManifest:Y})});let aE=a.method||"GET",aF=(0,g.getTracer)(),aG=aF.getActiveScopeSpan();try{let f=L.getVaryHeader(ab,af);b.setHeader("Vary",f);let k=async(c,d)=>{let e=new l.NodeNextRequest(a),f=new l.NodeNextResponse(b);return L.render(e,f,d).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=aF.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==i.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${aE} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${aE} ${a.url}`)})},m=async({span:e,postponed:f,fallbackRouteParams:g})=>{let i={query:R,params:S,page:ah,sharedContext:{buildId:Q},serverComponentsHmrCache:(0,h.getRequestMeta)(a,"serverComponentsHmrCache"),fallbackRouteParams:g,renderOpts:{App:()=>null,Document:()=>null,pageConfig:{},ComponentMod:aD,Component:(0,j.T)(aD),params:S,routeModule:L,page:H,postponed:f,shouldWaitOnAllReady:aA,serveStreamingMetadata:ay,supportsDynamicResponse:"string"==typeof f||az,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,subresourceIntegrityManifest:$,serverActionsManifest:Y,clientReferenceManifest:Z,setIsrStatus:null==ad?void 0:ad.setIsrStatus,dir:c(33873).join(process.cwd(),L.relativeProjectDir),isDraftMode:aa,isRevalidate:al&&!f&&!aw,botType:an,isOnDemandRevalidate:ai,isPossibleServerAction:ar,assetPrefix:ae.assetPrefix,nextConfigOutput:ae.output,crossOrigin:ae.crossOrigin,trailingSlash:ae.trailingSlash,previewProps:_.preview,deploymentId:ae.deploymentId,enableTainting:ae.experimental.taint,htmlLimitedBots:ae.htmlLimitedBots,devtoolSegmentExplorer:ae.experimental.devtoolSegmentExplorer,reactMaxHeadersLength:ae.reactMaxHeadersLength,multiZoneDraftMode:!1,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:ae.experimental.cacheLife,basePath:ae.basePath,serverActions:ae.experimental.serverActions,...at?{nextExport:!0,supportsDynamicResponse:!1,isStaticGeneration:!0,isRevalidate:!0,isDebugDynamicAccesses:at}:{},experimental:{isRoutePPREnabled:as,expireTime:ae.expireTime,staleTimes:ae.experimental.staleTimes,cacheComponents:!!ae.experimental.cacheComponents,clientSegmentCache:!!ae.experimental.clientSegmentCache,clientParamParsing:!!ae.experimental.clientParamParsing,dynamicOnHover:!!ae.experimental.dynamicOnHover,inlineCss:!!ae.experimental.inlineCss,authInterrupts:!!ae.experimental.authInterrupts,clientTraceMetadata:ae.experimental.clientTraceMetadata||[]},waitUntil:d.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:()=>{},onInstrumentationRequestError:(b,c,d)=>L.onRequestError(a,b,d,ad),err:(0,h.getRequestMeta)(a,"invokeError"),dev:L.isDev}},l=await k(e,i),{metadata:m}=l,{cacheControl:n,headers:o={},fetchTags:p}=m;if(p&&(o[z.NEXT_CACHE_TAGS_HEADER]=p),a.fetchMetrics=m.fetchMetrics,al&&(null==n?void 0:n.revalidate)===0&&!L.isDev&&!as){let a=m.staticBailoutInfo,b=Object.defineProperty(Error(`Page changed from static to dynamic at runtime ${ab}${(null==a?void 0:a.description)?`, reason: ${a.description}`:""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),"__NEXT_ERROR_CODE",{value:"E132",enumerable:!1,configurable:!0});if(null==a?void 0:a.stack){let c=a.stack;b.stack=b.message+c.substring(c.indexOf("\n"))}throw b}return{value:{kind:w.CachedRouteKind.APP_PAGE,html:l,headers:o,rscData:m.flightData,postponed:m.postponed,status:m.statusCode,segmentData:m.segmentData},cacheControl:n}},n=async({hasResolved:c,previousCacheEntry:f,isRevalidating:g,span:i})=>{let j,k=!1===L.isDev,l=c||b.writableEnded;if(ai&&ac&&!f&&!O)return(null==ad?void 0:ad.render404)?await ad.render404(a,b):(b.statusCode=404,b.end("This page could not be found")),null;if(aj&&(j=(0,x.parseFallbackField)(aj.fallback)),j===x.FallbackMode.PRERENDER&&(0,v.isBot)(am)&&(!as||ao)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),(null==f?void 0:f.isStale)===-1&&(ai=!0),ai&&(j!==x.FallbackMode.NOT_FOUND||f)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),!O&&j!==x.FallbackMode.BLOCKING_STATIC_RENDER&&aC&&!l&&!aa&&U&&(k||!ak)){let b;if((k||aj)&&j===x.FallbackMode.NOT_FOUND)throw new C.NoFallbackError;if(as&&!aq){let c="string"==typeof(null==aj?void 0:aj.fallback)?aj.fallback:k?ah:null;if(b=await L.handleResponse({cacheKey:c,req:a,nextConfig:ae,routeKind:e.RouteKind.APP_PAGE,isFallback:!0,prerenderManifest:_,isRoutePPREnabled:as,responseGenerator:async()=>m({span:i,postponed:void 0,fallbackRouteParams:k||au?(0,o.u)(ah):null}),waitUntil:d.waitUntil}),null===b)return null;if(b)return delete b.cacheControl,b}}let n=ai||g||!av?void 0:av;if(at&&void 0!==n)return{cacheControl:{revalidate:1,expire:void 0},value:{kind:w.CachedRouteKind.PAGES,html:y.default.EMPTY,pageData:{},headers:void 0,status:void 0}};let p=U&&as&&((0,h.getRequestMeta)(a,"renderFallbackShell")||au)?(0,o.u)(ag):null;return m({span:i,postponed:n,fallbackRouteParams:p})},p=async c=>{var f,g,i,j,k;let l,o=await L.handleResponse({cacheKey:aB,responseGenerator:a=>n({span:c,...a}),routeKind:e.RouteKind.APP_PAGE,isOnDemandRevalidate:ai,isRoutePPREnabled:as,req:a,nextConfig:ae,prerenderManifest:_,waitUntil:d.waitUntil});if(aa&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate"),L.isDev&&b.setHeader("Cache-Control","no-store, must-revalidate"),!o){if(aB)throw Object.defineProperty(Error("invariant: cache entry required but not generated"),"__NEXT_ERROR_CODE",{value:"E62",enumerable:!1,configurable:!0});return null}if((null==(f=o.value)?void 0:f.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null==(i=o.value)?void 0:i.kind}`),"__NEXT_ERROR_CODE",{value:"E707",enumerable:!1,configurable:!0});let p="string"==typeof o.value.postponed;al&&!aw&&(!p||ap)&&(O||b.setHeader("x-nextjs-cache",ai?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),b.setHeader(u.NEXT_IS_PRERENDER_HEADER,"1"));let{value:q}=o;if(av)l={revalidate:0,expire:void 0};else if(O&&aq&&!ap&&as)l={revalidate:0,expire:void 0};else if(!L.isDev)if(aa)l={revalidate:0,expire:void 0};else if(al){if(o.cacheControl)if("number"==typeof o.cacheControl.revalidate){if(o.cacheControl.revalidate<1)throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`),"__NEXT_ERROR_CODE",{value:"E22",enumerable:!1,configurable:!0});l={revalidate:o.cacheControl.revalidate,expire:(null==(j=o.cacheControl)?void 0:j.expire)??ae.expireTime}}else l={revalidate:z.CACHE_ONE_YEAR,expire:void 0}}else b.getHeader("Cache-Control")||(l={revalidate:0,expire:void 0});if(o.cacheControl=l,"string"==typeof ax&&(null==q?void 0:q.kind)===w.CachedRouteKind.APP_PAGE&&q.segmentData){b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"2");let c=null==(k=q.headers)?void 0:k[z.NEXT_CACHE_TAGS_HEADER];O&&al&&c&&"string"==typeof c&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,c);let d=q.segmentData.get(ax);return void 0!==d?(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(d,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl}):(b.statusCode=204,(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.EMPTY,cacheControl:o.cacheControl}))}let r=(0,h.getRequestMeta)(a,"onCacheEntry");if(r&&await r({...o,value:{...o.value,kind:"PAGE"}},{url:(0,h.getRequestMeta)(a,"initURL")}))return null;if(p&&av)throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"),"__NEXT_ERROR_CODE",{value:"E396",enumerable:!1,configurable:!0});if(q.headers){let a={...q.headers};for(let[c,d]of(O&&al||delete a[z.NEXT_CACHE_TAGS_HEADER],Object.entries(a)))if(void 0!==d)if(Array.isArray(d))for(let a of d)b.appendHeader(c,a);else"number"==typeof d&&(d=d.toString()),b.appendHeader(c,d)}let s=null==(g=q.headers)?void 0:g[z.NEXT_CACHE_TAGS_HEADER];if(O&&al&&s&&"string"==typeof s&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,s),!q.status||aq&&as||(b.statusCode=q.status),!O&&q.status&&G.RedirectStatusCode[q.status]&&aq&&(b.statusCode=200),p&&b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"1"),aq&&!aa){if(void 0===q.rscData){if(q.postponed)throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"),"__NEXT_ERROR_CODE",{value:"E372",enumerable:!1,configurable:!0});return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:q.html,cacheControl:aw?{revalidate:0,expire:void 0}:o.cacheControl})}return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(q.rscData,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl})}let t=q.html;if(!p||O||aq)return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:o.cacheControl});if(at)return t.push(new ReadableStream({start(a){a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML),a.close()}})),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}});let v=new TransformStream;return t.push(v.readable),m({span:c,postponed:q.postponed,fallbackRouteParams:null}).then(async a=>{var b,c;if(!a)throw Object.defineProperty(Error("Invariant: expected a result to be returned"),"__NEXT_ERROR_CODE",{value:"E463",enumerable:!1,configurable:!0});if((null==(b=a.value)?void 0:b.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null==(c=a.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E305",enumerable:!1,configurable:!0});await a.value.html.pipeTo(v.writable)}).catch(a=>{v.writable.abort(a).catch(a=>{console.error("couldn't abort transformer",a)})}),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}})};if(!aG)return await aF.withPropagatedContext(a.headers,()=>aF.trace(i.BaseServerSpan.handleRequest,{spanName:`${aE} ${a.url}`,kind:g.SpanKind.SERVER,attributes:{"http.method":aE,"http.target":a.url}},p));await p(aG)}catch(b){throw b instanceof C.NoFallbackError||await L.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"render",revalidateReason:(0,f.c)({isRevalidate:al,isOnDemandRevalidate:ai})},ad),b}}},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},8262:(a,b,c)=>{Promise.resolve().then(c.bind(c,30700))},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},22121:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,81170,23)),Promise.resolve().then(c.t.bind(c,23597,23)),Promise.resolve().then(c.t.bind(c,36893,23)),Promise.resolve().then(c.t.bind(c,89748,23)),Promise.resolve().then(c.t.bind(c,6060,23)),Promise.resolve().then(c.t.bind(c,7184,23)),Promise.resolve().then(c.t.bind(c,69576,23)),Promise.resolve().then(c.t.bind(c,73041,23)),Promise.resolve().then(c.t.bind(c,51384,23))},26713:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/is-bot")},28354:a=>{"use strict";a.exports=require("util")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30700:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/hochenheng/Desktop/StreamIntergration/src/app/pricing/page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/hochenheng/Desktop/StreamIntergration/src/app/pricing/page.js","default")},33873:a=>{"use strict";a.exports=require("path")},41025:a=>{"use strict";a.exports=require("next/dist/server/app-render/dynamic-access-async-storage.external.js")},42378:(a,b,c)=>{"use strict";var d=c(91330);c.o(d,"useParams")&&c.d(b,{useParams:function(){return d.useParams}}),c.o(d,"useRouter")&&c.d(b,{useRouter:function(){return d.useRouter}})},46434:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>g});var d=c(21124),e=c(38301),f=c(42378);function g(){let a=(0,f.useRouter)(),[b,c]=(0,e.useState)(!1),[g,h]=(0,e.useState)(null),[i,j]=(0,e.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"bg-glow-top"}),(0,d.jsx)("div",{className:"bg-glow-bottom"}),(0,d.jsx)("header",{className:"navbar",children:(0,d.jsxs)("div",{className:"nav-container",children:[(0,d.jsxs)("div",{className:"nav-brand",onClick:()=>{a.push("/"),j(!1)},style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,d.jsxs)("svg",{width:"28",height:"28",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"brand-icon-svg",style:{filter:"drop-shadow(0 0 8px var(--primary-glow))"},children:[(0,d.jsx)("rect",{width:"32",height:"32",rx:"8",fill:"url(#logo-grad-pricing)"}),(0,d.jsx)("path",{d:"M11 21L19 11M19 11H13M19 11V17",stroke:"#ffffff",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,d.jsx)("circle",{cx:"16",cy:"16",r:"13",stroke:"url(#stroke-grad-pricing)",strokeWidth:"1.5"}),(0,d.jsxs)("defs",{children:[(0,d.jsxs)("linearGradient",{id:"logo-grad-pricing",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#8b5cf6"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffb84d"})]}),(0,d.jsxs)("linearGradient",{id:"stroke-grad-pricing",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#ffffff",stopOpacity:"0.8"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffffff",stopOpacity:"0.2"})]})]})]}),(0,d.jsx)("span",{className:"brand-text",children:"StreamPortal"})]}),(0,d.jsx)("button",{className:"menu-toggle",onClick:()=>j(!i),"aria-label":"Toggle Navigation",children:(0,d.jsx)("i",{className:i?"fa-solid fa-xmark":"fa-solid fa-bars"})}),(0,d.jsxs)("nav",{className:`nav-links ${i?"active":""}`,children:[(0,d.jsx)("span",{onClick:()=>{a.push("/#hero"),j(!1)},children:"Home"}),(0,d.jsx)("span",{onClick:()=>{a.push("/#features"),j(!1)},children:"Features"}),(0,d.jsx)("span",{onClick:()=>{a.push("/#how-it-works"),j(!1)},children:"How it Works"}),(0,d.jsx)("span",{className:"active",onClick:()=>{a.push("/pricing"),j(!1)},children:"Pricing"}),g?(0,d.jsxs)("button",{className:"nav-btn",onClick:()=>{a.push("/dashboard"),j(!1)},style:{borderColor:"var(--primary)",display:"flex",alignItems:"center",gap:"6px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-gauge"})," Dashboard"]}):(0,d.jsx)("button",{className:"nav-btn",onClick:()=>{window.location.href="/api/auth/google",j(!1)},children:"Login"})]})]})}),(0,d.jsx)("section",{className:"pricing-header-section",children:(0,d.jsxs)("div",{className:"header-container",children:[(0,d.jsx)("div",{className:"pricing-badge",children:"\uD83D\uDC8E SIMPLE, TRANSPARENT PRICING"}),(0,d.jsxs)("h1",{className:"pricing-title",children:["Flexible Plans for ",(0,d.jsx)("br",{}),(0,d.jsx)("span",{className:"gradient-text",children:"Streamers of All Sizes"})]}),(0,d.jsx)("p",{className:"pricing-subtitle",children:"Scale your stream with AI-generated text-to-speech voiceovers, bank-sync receipt automation, and custom overlays. Choose the plan that fits your community."}),(0,d.jsxs)("div",{className:"toggle-container",children:[(0,d.jsx)("span",{className:`toggle-label ${!b?"active":""}`,children:"Monthly"}),(0,d.jsx)("button",{className:"toggle-switch",onClick:()=>c(!b),children:(0,d.jsx)("span",{className:`toggle-dot ${b?"yearly":""}`})}),(0,d.jsxs)("span",{className:`toggle-label ${b?"active":""}`,children:["Yearly ",(0,d.jsx)("span",{className:"discount-badge",children:"Save 20%"})]})]})]})}),(0,d.jsx)("section",{className:"pricing-cards-section",children:(0,d.jsxs)("div",{className:"pricing-cards-grid",children:[(0,d.jsxs)("div",{className:"pricing-card",children:[(0,d.jsx)("div",{className:"plan-name",children:"Starter"}),(0,d.jsxs)("div",{className:"plan-price",children:[(0,d.jsx)("span",{className:"currency",children:"$"}),(0,d.jsx)("span",{className:"price-num",children:"0"}),(0,d.jsx)("span",{className:"billing-period",children:"/ forever"})]}),(0,d.jsx)("p",{className:"plan-description",children:"Essential features for new streamers starting their alert setups."}),(0,d.jsxs)("div",{className:"features-list",children:[(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsxs)("span",{children:[(0,d.jsx)("strong",{children:"100 tokens"})," per day"]})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Real-time Telegram sync"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Standard Web Speech TTS"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Standard OBS Overlays"})]})]}),(0,d.jsx)("button",{className:"plan-btn",onClick:function(){a.push("/#portal")},children:"Get Started"})]}),(0,d.jsxs)("div",{className:"pricing-card popular",children:[(0,d.jsx)("div",{className:"popular-badge",children:"⚡ MOST POPULAR"}),(0,d.jsx)("div",{className:"plan-name",children:"Pro"}),(0,d.jsxs)("div",{className:"plan-price",children:[(0,d.jsx)("span",{className:"currency",children:"$"}),(0,d.jsx)("span",{className:"price-num",children:b?"3.99":"4.99"}),(0,d.jsx)("span",{className:"billing-period",children:"/ month"})]}),(0,d.jsx)("p",{className:"plan-description",children:"Neural AI Speech readouts and enhanced token limits for daily streams."}),(0,d.jsxs)("div",{className:"features-list",children:[(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsxs)("span",{children:[(0,d.jsx)("strong",{children:"5,000 tokens"})," refreshed monthly"]})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Neural AI Khmer & English TTS"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Sequential sound & voice playback"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Custom alert audio uploads"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"No-code theme customizer"})]})]}),(0,d.jsx)("button",{className:"plan-btn primary",onClick:()=>window.location.href="/api/auth/google",children:"Upgrade to Pro"})]}),(0,d.jsxs)("div",{className:"pricing-card",children:[(0,d.jsx)("div",{className:"plan-name",children:"Streamer Pro"}),(0,d.jsxs)("div",{className:"plan-price",children:[(0,d.jsx)("span",{className:"currency",children:"$"}),(0,d.jsx)("span",{className:"price-num",children:b?"7.99":"9.99"}),(0,d.jsx)("span",{className:"billing-period",children:"/ month"})]}),(0,d.jsx)("p",{className:"plan-description",children:"Full access for professional streamers with massive active chat communities."}),(0,d.jsxs)("div",{className:"features-list",children:[(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsxs)("span",{children:[(0,d.jsx)("strong",{children:"Unlimited tokens"})," per month"]})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Neural AI speech engines"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Dedicated high-performance websocket sync"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"Priority custom layout design templates"})]}),(0,d.jsxs)("div",{className:"feature-item",children:[(0,d.jsx)("span",{className:"check-icon",children:"✓"}),(0,d.jsx)("span",{children:"24/7 dedicated local support channel"})]})]}),(0,d.jsx)("button",{className:"plan-btn",onClick:()=>window.location.href="/api/auth/google",children:"Go Unlimited"})]})]})}),(0,d.jsx)("footer",{className:"footer-bar",children:(0,d.jsx)("p",{children:"\xa9 2026 StreamPortal. Made for streamers on localhost."})}),(0,d.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        :root {
          --primary: #8b5cf6;
          --primary-glow: rgba(139, 92, 246, 0.4);
          --accent: #ffb84d;
          --accent-glow: rgba(255, 184, 77, 0.4);
          --bg: #07060b;
          --bg-gradient: radial-gradient(circle at center, #130f24 0%, #06050a 100%);
          --glass: rgba(18, 16, 26, 0.65);
          --border: rgba(255, 255, 255, 0.06);
          --text-muted: rgba(255, 255, 255, 0.5);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          background-image: var(--bg-gradient);
          color: #ffffff;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* GLOW BACKGROUND EFFECT */
        .bg-glow-top {
          position: absolute;
          width: 900px;
          height: 900px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, transparent 60%);
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .bg-glow-bottom {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 184, 77, 0.04) 0%, transparent 60%);
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

        /* HEADER SECTION */
        .pricing-header-section {
          padding-top: 170px;
          padding-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .header-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
        }

        .pricing-badge {
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

        .pricing-title {
          font-size: 52px;
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

        .pricing-subtitle {
          color: var(--text-muted);
          font-size: 19px;
          max-width: 680px;
          margin: 0 auto 40px auto;
        }

        /* TOGGLE BILLING SWITCH */
        .toggle-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .toggle-label {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-muted);
          transition: color 0.3s;
        }

        .toggle-label.active {
          color: #ffffff;
        }

        .toggle-switch {
          width: 54px;
          height: 30px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background 0.3s;
        }

        .toggle-dot {
          width: 22px;
          height: 22px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .toggle-dot.yearly {
          transform: translateX(24px);
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .discount-badge {
          font-size: 11px;
          font-weight: 900;
          color: #00e676;
          background: rgba(0, 230, 118, 0.1);
          padding: 2px 8px;
          border-radius: 50px;
          margin-left: 5px;
        }

        /* PRICING CARDS SECTION */
        .pricing-cards-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px 100px 20px;
          position: relative;
          z-index: 1;
        }

        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          align-items: stretch;
        }

        .pricing-card {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 45px 35px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .pricing-card.popular {
          border: 2px solid var(--primary);
          box-shadow: 0 25px 50px rgba(139, 92, 246, 0.15);
        }

        .pricing-card.popular:hover {
          box-shadow: 0 35px 70px rgba(139, 92, 246, 0.25);
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        .plan-name {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          margin-bottom: 20px;
        }

        .currency {
          font-size: 28px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          margin-right: 2px;
        }

        .price-num {
          font-size: 56px;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .billing-period {
          color: var(--text-muted);
          font-size: 15px;
          margin-left: 8px;
        }

        .plan-description {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 35px;
          line-height: 1.5;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 45px;
          flex-grow: 1;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
        }

        .check-icon {
          color: #00e676;
          font-weight: 900;
          font-size: 16px;
        }

        .plan-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 16px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .plan-btn:hover {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
        }

        .plan-btn.primary {
          background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
          border: none;
          color: #ffffff;
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        .plan-btn.primary:hover {
          box-shadow: 0 6px 20px var(--primary-glow);
          transform: translateY(-1px);
        }

        /* FOOTER BAR */
        .footer-bar {
          text-align: center;
          padding: 40px 20px;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 13px;
          position: relative;
          z-index: 1;
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

          .pricing-header-section {
            padding-top: 120px;
            padding-bottom: 30px;
          }

          .pricing-title {
            font-size: 32px;
            line-height: 1.2;
          }

          .pricing-subtitle {
            font-size: 15px;
            margin-bottom: 20px;
          }

          .pricing-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .pricing-card {
            padding: 30px 20px;
          }
        }
      `}})]})}},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77998:(a,b,c)=>{Promise.resolve().then(c.bind(c,46434))},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},87273:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,54160,23)),Promise.resolve().then(c.t.bind(c,31603,23)),Promise.resolve().then(c.t.bind(c,68495,23)),Promise.resolve().then(c.t.bind(c,75170,23)),Promise.resolve().then(c.t.bind(c,77526,23)),Promise.resolve().then(c.t.bind(c,78922,23)),Promise.resolve().then(c.t.bind(c,29234,23)),Promise.resolve().then(c.t.bind(c,12263,23)),Promise.resolve().then(c.bind(c,82146))},96487:()=>{},97634:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>f,metadata:()=>e});var d=c(75338);let e={title:"StreamPortal - Next-Gen Live Stream Alerts & ABA bank receipts Integration",description:"Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.",keywords:"ABA payment integration, Stream overlays, OBS alerts, live streaming donations, Telegram transaction parser, Khmer text-to-speech, donor widgets, stream automation",robots:"index, follow",icons:{icon:"/favicon.ico",shortcut:"/favicon.ico",apple:"/favicon.ico"},openGraph:{title:"StreamPortal - Live Stream Alerts & ABA Sync",description:"Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.",type:"website",url:"http://localhost:3000",siteName:"StreamPortal"}};function f({children:a}){return(0,d.jsxs)("html",{lang:"en",children:[(0,d.jsxs)("head",{children:[(0,d.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,d.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,d.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",rel:"stylesheet"}),(0,d.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"})]}),(0,d.jsx)("body",{children:a})]})}}};var b=require("../../webpack-runtime.js");b.C(a);var c=b.X(0,[331,792],()=>b(b.s=2795));module.exports=c})();