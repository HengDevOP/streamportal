(()=>{var a={};a.id=813,a.ids=[813],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},22121:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,81170,23)),Promise.resolve().then(c.t.bind(c,23597,23)),Promise.resolve().then(c.t.bind(c,36893,23)),Promise.resolve().then(c.t.bind(c,89748,23)),Promise.resolve().then(c.t.bind(c,6060,23)),Promise.resolve().then(c.t.bind(c,7184,23)),Promise.resolve().then(c.t.bind(c,69576,23)),Promise.resolve().then(c.t.bind(c,73041,23)),Promise.resolve().then(c.t.bind(c,51384,23))},26713:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/is-bot")},28354:a=>{"use strict";a.exports=require("util")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:a=>{"use strict";a.exports=require("path")},41025:a=>{"use strict";a.exports=require("next/dist/server/app-render/dynamic-access-async-storage.external.js")},42378:(a,b,c)=>{"use strict";var d=c(91330);c.o(d,"useParams")&&c.d(b,{useParams:function(){return d.useParams}}),c.o(d,"useRouter")&&c.d(b,{useRouter:function(){return d.useRouter}})},42456:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>g});var d=c(21124),e=c(38301),f=c(42378);function g(){let a=(0,f.useRouter)(),[b,c]=(0,e.useState)("Loading..."),[g,h]=(0,e.useState)("DISCONNECTED"),[i,j]=(0,e.useState)(""),[k,l]=(0,e.useState)(""),[m,n]=(0,e.useState)(""),[o,p]=(0,e.useState)(""),[q,r]=(0,e.useState)(""),[s,t]=(0,e.useState)(""),[u,v]=(0,e.useState)("#ffb84d"),[w,x]=(0,e.useState)("#00e676"),[y,z]=(0,e.useState)("✨ New Donation ✨"),[A,B]=(0,e.useState)("Thank You So Much! \uD83D\uDC96"),[C,D]=(0,e.useState)(10),[E,F]=(0,e.useState)("Outfit"),[G,H]=(0,e.useState)(!0),[I,J]=(0,e.useState)(.95),[K,L]=(0,e.useState)(1),[M,N]=(0,e.useState)(""),[O,P]=(0,e.useState)(""),[Q,R]=(0,e.useState)("{donator} donated {amount} through superchat."),[S,T]=(0,e.useState)("{donator} donated {amount} through super chat!"),[U,V]=(0,e.useState)(""),[W,X]=(0,e.useState)(""),[Y,Z]=(0,e.useState)(""),[$,_]=(0,e.useState)("about:blank"),[aa,ab]=(0,e.useState)([]),[ac,ad]=(0,e.useState)("Ninja Donor"),[ae,af]=(0,e.useState)("This is a test donation alert preview!"),[ag,ah]=(0,e.useState)(!1),[ai,aj]=(0,e.useState)(!1),[ak,al]=(0,e.useState)(!1),[am,an]=(0,e.useState)("7d"),[ao,ap]=(0,e.useState)("overview"),[aq,ar]=(0,e.useState)(!1),[as,at]=(0,e.useState)(""),[au,av]=(0,e.useState)("phone");async function aw(a){a&&a.preventDefault(),j("");try{let a=await fetch("/api/telegram/start-connect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phoneNumber:m.trim(),groupId:""})}),b=await a.json();a.ok?h(b.status):j(b.error||"Failed to connect.")}catch(a){console.error(a),j("Failed to make request.")}}async function ax(){j("");try{let a=await fetch("/api/telegram/submit-code",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:q.trim()})}),b=await a.json();a.ok?h(b.status):j(b.error||"Failed to submit code.")}catch(a){console.error(a),j("Request error.")}}async function ay(){j("");try{let a=await fetch("/api/telegram/submit-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:s.trim()})}),b=await a.json();a.ok?h(b.status):j(b.error||"Failed to submit 2FA password.")}catch(a){console.error(a),j("Request error.")}}async function az(a){a&&a.preventDefault(),j("");try{let a=await fetch("/api/telegram/set-group",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({groupId:o.trim()})}),b=await a.json();a.ok?(l(b.groupId),ah(!1),alert("✅ Connection finalized and listening to Group ID receipts!")):j(b.error||"Failed to save Group ID.")}catch(a){console.error(a),j("Request error.")}}async function aA(){if(confirm("Are you sure you want to disconnect the Telegram Client? This clears active connection links."))try{await fetch("/api/telegram/disconnect",{method:"POST"}),h("DISCONNECTED")}catch(a){console.error(a)}}async function aB(a){a&&a.preventDefault();let b={primaryColor:u,secondaryColor:w,titleTemplate:y,footerTemplate:A,duration:parseInt(C),ttsEnabled:G,ttsRate:parseFloat(I),ttsPitch:parseFloat(K),fontFamily:E,ttsVoiceName:O,ttsTemplate:Q,alertTemplate:S};try{let a=await fetch("/api/user/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alertConfig:b})}),c=await a.json();if(a.ok){alert("\uD83C\uDF89 Customizer settings saved successfully!"),aj(!1);let a=document.getElementById("overlayPreviewIframe");a&&(a.src=a.src)}else alert(c.error||"Failed to save settings.")}catch(a){console.error(a),alert("Network error saving settings.")}}async function aC(){if(!b)return;let a={primaryColor:u,secondaryColor:w,titleTemplate:y,footerTemplate:A,duration:parseInt(C),ttsEnabled:G,ttsRate:parseFloat(I),ttsPitch:parseFloat(K),fontFamily:E,ttsVoiceName:O,ttsTemplate:Q,alertTemplate:S};try{await fetch("/api/user/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({alertConfig:a})}),await new Promise(a=>setTimeout(a,500));let c=await fetch(`/api/overlay/preview/${b}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:ac,message:ae,amount:10,currency:"$"})}),d=await c.json();c.ok||alert(d.error||"Failed to trigger preview alert.")}catch(a){console.error(a),alert("Network error triggering preview.")}}async function aD(){try{await fetch("/api/auth/logout",{method:"POST"}),a.push("/")}catch(b){console.error("Logout failed:",b),a.push("/")}}function aE(a,b){navigator.clipboard.writeText(a);let c=document.getElementById(b);if(c){let a=c.innerText;c.innerText="Copied! ✓",c.style.background="#00e676",setTimeout(()=>{c.innerText=a,c.style.background=""},2e3)}}let aF=aa.filter(a=>{if(!a.time)return!1;let b=Date.now()-a.time;return"1h"===am?b<=36e5:"24h"===am?b<=864e5:"7d"===am?b<=6048e5:"30d"===am?b<=2592e6:"6m"!==am||b<=15552e6}),aG=aF.reduce((a,b)=>a+(b.amountUSD||0),0),aH=aF.length>0?aG/aF.length:0,aI=aF.reduce((a,b)=>(b.amountUSD||0)>(a.amountUSD||0)?b:a,{name:"—",amount:0,currency:"$",amountUSD:0}),aJ=aF.filter(a=>"$"===a.currency).length,aK=aF.filter(a=>"៛"===a.currency).length,aL=aF.length||1,aM=Math.round(aJ/aL*100),aN=Math.round(aK/aL*100),aO=aF.slice(-10),aP=0,aQ=aO.map(a=>aP+=a.amountUSD||0),aR=Math.max(...aQ,10),aS=aQ.map((a,b)=>({x:50+b*(500/Math.max(aO.length-1,1)),y:175-a/aR*135,val:a})),aT="";if(aS.length>0){aT=`M ${aS[0].x} ${aS[0].y}`;for(let a=0;a<aS.length-1;a++){let b=aS[a],c=aS[a+1],d=b.x+(c.x-b.x)/2,e=b.y,f=b.x+(c.x-b.x)/2,g=c.y;aT+=` C ${d} ${e}, ${f} ${g}, ${c.x} ${c.y}`}}let aU=aS.length>0?`${aT} L ${aS[aS.length-1].x} 175 L ${aS[0].x} 175 Z`:"",aV=aa.filter(a=>a.name.toLowerCase().includes(as.toLowerCase())||a.message&&a.message.toLowerCase().includes(as.toLowerCase()));function aW(){if(0===aa.length)return;let a=encodeURI("data:text/csv;charset=utf-8,"+["Timestamp,Donor Name,Amount,Currency,USD Equivalent,Message",...aa.map(a=>[new Date(a.time).toISOString(),a.name,a.amount,a.currency,a.amountUSD||("៛"===a.currency?a.amount/4e3:a.amount),a.message||""]).map(a=>a.map(a=>`"${a.toString().replace(/"/g,'""')}"`).join(","))].join("\n")),c=document.createElement("a");c.setAttribute("href",a),c.setAttribute("download",`${b}_stream_revenue.csv`),document.body.appendChild(c),c.click(),document.body.removeChild(c)}return(0,d.jsxs)("div",{className:"dashboard-wrapper",children:[(0,d.jsxs)("div",{className:"mobile-top-bar",children:[(0,d.jsx)("button",{className:"mobile-menu-toggle",onClick:()=>al(!0),"aria-label":"Open Menu",children:(0,d.jsx)("i",{className:"fa-solid fa-bars"})}),(0,d.jsxs)("div",{className:"app-branding",onClick:()=>a.push("/"),style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{filter:"drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"},children:[(0,d.jsx)("rect",{width:"32",height:"32",rx:"8",fill:"url(#logo-grad-dashboard-mob)"}),(0,d.jsx)("path",{d:"M11 21L19 11M19 11H13M19 11V17",stroke:"#ffffff",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,d.jsx)("circle",{cx:"16",cy:"16",r:"13",stroke:"url(#stroke-grad-dashboard-mob)",strokeWidth:"1.5"}),(0,d.jsxs)("defs",{children:[(0,d.jsxs)("linearGradient",{id:"logo-grad-dashboard-mob",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#8b5cf6"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffb84d"})]}),(0,d.jsxs)("linearGradient",{id:"stroke-grad-dashboard-mob",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#ffffff",stopOpacity:"0.8"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffffff",stopOpacity:"0.2"})]})]})]}),(0,d.jsx)("h1",{className:"branding-title",style:{fontSize:"18px",margin:0},children:"StreamPortal"})]})]}),ak&&(0,d.jsx)("div",{className:"sidebar-backdrop",onClick:()=>al(!1)}),(0,d.jsxs)("aside",{className:`sidebar ${ak?"menu-open":""}`,children:[(0,d.jsxs)("div",{style:{width:"100%"},children:[(0,d.jsxs)("div",{className:"sidebar-header",style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"40px",width:"100%"},children:[(0,d.jsxs)("div",{className:"app-branding",onClick:()=>a.push("/"),style:{marginBottom:0,display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsxs)("svg",{width:"28",height:"28",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{filter:"drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"},children:[(0,d.jsx)("rect",{width:"32",height:"32",rx:"8",fill:"url(#logo-grad-dashboard-sidebar)"}),(0,d.jsx)("path",{d:"M11 21L19 11M19 11H13M19 11V17",stroke:"#ffffff",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,d.jsx)("circle",{cx:"16",cy:"16",r:"13",stroke:"url(#stroke-grad-dashboard-sidebar)",strokeWidth:"1.5"}),(0,d.jsxs)("defs",{children:[(0,d.jsxs)("linearGradient",{id:"logo-grad-dashboard-sidebar",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#8b5cf6"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffb84d"})]}),(0,d.jsxs)("linearGradient",{id:"stroke-grad-dashboard-sidebar",x1:"0",y1:"0",x2:"32",y2:"32",gradientUnits:"userSpaceOnUse",children:[(0,d.jsx)("stop",{stopColor:"#ffffff",stopOpacity:"0.8"}),(0,d.jsx)("stop",{offset:"1",stopColor:"#ffffff",stopOpacity:"0.2"})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h1",{className:"branding-title",style:{margin:0},children:"StreamPortal"}),(0,d.jsx)("span",{className:"branding-subtitle",children:"Dashboard Console"})]})]}),(0,d.jsx)("button",{className:"drawer-close-btn",onClick:()=>al(!1),"aria-label":"Close Menu",children:(0,d.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,d.jsxs)("nav",{className:"nav-menu",children:[(0,d.jsxs)("div",{className:`nav-item ${"overview"===ao?"active":""}`,onClick:()=>{ap("overview"),al(!1)},children:[(0,d.jsx)("i",{className:"fa-solid fa-chart-simple nav-icon"})," ",(0,d.jsx)("span",{className:"nav-text",children:"Overview"})]}),(0,d.jsxs)("div",{className:`nav-item ${"overlay"===ao?"active":""}`,onClick:()=>{ap("overlay"),al(!1)},children:[(0,d.jsx)("i",{className:"fa-solid fa-layer-group nav-icon"})," ",(0,d.jsx)("span",{className:"nav-text",children:"Stream Overlay"})]}),(0,d.jsxs)("div",{className:`nav-item ${"revenue"===ao?"active":""}`,onClick:()=>{ap("revenue"),al(!1)},children:[(0,d.jsx)("i",{className:"fa-solid fa-wallet nav-icon"})," ",(0,d.jsx)("span",{className:"nav-text",children:"Revenue"})]})]})]}),(0,d.jsxs)("div",{className:"sidebar-footer",children:[(0,d.jsxs)("div",{className:"user-profile",children:[(0,d.jsx)("div",{className:"avatar-placeholder",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,d.jsx)("i",{className:"fa-solid fa-circle-user",style:{fontSize:"20px",color:"#ffb84d"}})}),(0,d.jsxs)("div",{className:"user-info",children:[(0,d.jsx)("h2",{id:"profile-name",children:"Streamer Active"}),(0,d.jsxs)("p",{id:"profile-email",children:["@",b]})]})]}),(0,d.jsx)("button",{className:"btn-logout",onClick:aD,children:"Logout"})]})]}),(0,d.jsx)("main",{className:"main-content",children:(0,d.jsxs)("div",{className:"dashboard-container",children:["overview"===ao&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"15px",marginBottom:"15px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h2",{style:{fontSize:"20px",fontWeight:"900",color:"#fff"},children:"Analytics Dashboard"}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"12.5px",marginTop:"3px"},children:"Monitor stream donations and supporter metrics."})]}),(0,d.jsxs)("div",{className:"timeframe-selector",children:[(0,d.jsx)("button",{className:`time-pill ${"1h"===am?"active":""}`,onClick:()=>an("1h"),children:"1 Hour"}),(0,d.jsx)("button",{className:`time-pill ${"24h"===am?"active":""}`,onClick:()=>an("24h"),children:"Yesterday"}),(0,d.jsx)("button",{className:`time-pill ${"7d"===am?"active":""}`,onClick:()=>an("7d"),children:"7 Days"}),(0,d.jsx)("button",{className:`time-pill ${"30d"===am?"active":""}`,onClick:()=>an("30d"),children:"30 Days"}),(0,d.jsx)("button",{className:`time-pill ${"6m"===am?"active":""}`,onClick:()=>an("6m"),children:"6 Months"}),(0,d.jsx)("button",{className:`time-pill ${"all"===am?"active":""}`,onClick:()=>an("all"),children:"All Time"})]})]}),(0,d.jsxs)("div",{className:"kpi-row kpi-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"20px",marginBottom:"30px"},children:[(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",background:"rgba(20, 18, 32, 0.45)",border:"1px solid var(--glass-border)",borderRadius:"14px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,d.jsx)("div",{className:"kpi-icon-wrap",style:{position:"absolute",right:"15px",top:"15px",opacity:.12,fontSize:"36px"},children:(0,d.jsx)("i",{className:"fa-solid fa-sack-dollar",style:{color:"#69f0ae"}})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px"},children:"Total Revenue"}),(0,d.jsxs)("div",{style:{fontSize:"26px",fontWeight:"900",color:"#69f0ae",marginTop:"6px",textShadow:"0 0 12px rgba(105,240,174,0.3)"},children:["$",aG.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]})]}),(0,d.jsxs)("div",{style:{marginTop:"8px",width:"100%"},children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"var(--text-muted)",marginBottom:"3px"},children:[(0,d.jsx)("span",{children:"Goal: $1k"}),(0,d.jsxs)("span",{style:{color:"var(--primary)",fontWeight:"bold"},children:[Math.min(Math.round(aG/1e3*100),100),"%"]})]}),(0,d.jsx)("div",{style:{width:"100%",height:"5px",background:"rgba(255,255,255,0.06)",borderRadius:"3px",overflow:"hidden"},children:(0,d.jsx)("div",{style:{width:`${Math.min(Math.round(aG/1e3*100),100)}%`,height:"100%",background:"linear-gradient(90deg, #ffd700, #ffb84d)",borderRadius:"3px"}})})]})]}),(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",background:"rgba(20, 18, 32, 0.45)",border:"1px solid var(--glass-border)",borderRadius:"14px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{className:"kpi-icon-wrap",style:{position:"absolute",right:"15px",bottom:"15px",opacity:.12,fontSize:"42px"},children:(0,d.jsx)("i",{className:"fa-solid fa-heart",style:{color:"#ff5252"}})}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px"},children:"Total Supporters"}),(0,d.jsx)("div",{style:{fontSize:"28px",fontWeight:"900",color:"#fff",marginTop:"8px"},children:aF.length})]}),(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",background:"rgba(20, 18, 32, 0.45)",border:"1px solid var(--glass-border)",borderRadius:"14px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{className:"kpi-icon-wrap",style:{position:"absolute",right:"15px",bottom:"15px",opacity:.12,fontSize:"42px"},children:(0,d.jsx)("i",{className:"fa-solid fa-chart-line",style:{color:"#ffb84d"}})}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px"},children:"Average Donation"}),(0,d.jsxs)("div",{style:{fontSize:"28px",fontWeight:"900",color:"#ffb84d",marginTop:"8px",textShadow:"0 0 12px rgba(255,184,77,0.3)"},children:["$",aH.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]})]}),(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",background:"rgba(20, 18, 32, 0.45)",border:"1px solid var(--glass-border)",borderRadius:"14px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{className:"kpi-icon-wrap",style:{position:"absolute",right:"15px",bottom:"15px",opacity:.12,fontSize:"42px"},children:(0,d.jsx)("i",{className:"fa-solid fa-trophy",style:{color:"#ffd700"}})}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px"},children:"Top Contributor"}),(0,d.jsx)("div",{style:{fontSize:"15px",fontWeight:"800",color:"#fff",marginTop:"8px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:aI.name}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#69f0ae",fontWeight:"700",marginTop:"2px"},children:[aI.currency,Number(aI.amount).toLocaleString(void 0,{minimumFractionDigits:2})]})]})]}),(0,d.jsxs)("div",{className:"analytics-charts-row",style:{display:"grid",gridTemplateColumns:"2.2fr 1fr",gap:"20px",marginBottom:"20px"},children:[(0,d.jsxs)("div",{className:"card",style:{padding:"20px",height:"260px",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,d.jsxs)("h3",{style:{fontSize:"14px",color:"#FFD700",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800"},children:[(0,d.jsx)("i",{className:"fa-solid fa-chart-line"})," Cumulative Revenue Trend"]}),(0,d.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"180px",width:"100%"},children:aF.length<2?(0,d.jsx)("div",{style:{color:"var(--text-muted)",fontSize:"13px"},children:"Need at least 2 tips inside this timeframe to compile trend history."}):(0,d.jsxs)("svg",{width:"100%",height:"100%",viewBox:"0 0 600 200",style:{display:"block",overflow:"visible"},children:[(0,d.jsxs)("defs",{children:[(0,d.jsxs)("linearGradient",{id:"chartGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,d.jsx)("stop",{offset:"0%",stopColor:"#ffb84d",stopOpacity:"0.25"}),(0,d.jsx)("stop",{offset:"100%",stopColor:"#ffb84d",stopOpacity:"0"})]}),(0,d.jsxs)("linearGradient",{id:"lineGrad",x1:"0",y1:"0",x2:"1",y2:"0",children:[(0,d.jsx)("stop",{offset:"0%",stopColor:"#ffb84d"}),(0,d.jsx)("stop",{offset:"50%",stopColor:"#ffd700"}),(0,d.jsx)("stop",{offset:"100%",stopColor:"#ffb84d"})]}),(0,d.jsxs)("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[(0,d.jsx)("feGaussianBlur",{stdDeviation:"4",result:"blur"}),(0,d.jsxs)("feMerge",{children:[(0,d.jsx)("feMergeNode",{in:"blur"}),(0,d.jsx)("feMergeNode",{in:"SourceGraphic"})]})]})]}),(0,d.jsx)("line",{x1:"50",y1:"20",x2:"550",y2:"20",stroke:"rgba(255,255,255,0.02)",strokeDasharray:"3,3"}),(0,d.jsx)("line",{x1:"50",y1:"71",x2:"550",y2:"71",stroke:"rgba(255,255,255,0.02)",strokeDasharray:"3,3"}),(0,d.jsx)("line",{x1:"50",y1:"123",x2:"550",y2:"123",stroke:"rgba(255,255,255,0.02)",strokeDasharray:"3,3"}),(0,d.jsx)("line",{x1:"50",y1:"175",x2:"550",y2:"175",stroke:"rgba(255,255,255,0.06)"}),(0,d.jsxs)("text",{x:"40",y:"24",fontSize:"8",fill:"#757288",textAnchor:"end",dominantBaseline:"central",children:["$",aR.toFixed(0)]}),(0,d.jsxs)("text",{x:"40",y:"75",fontSize:"8",fill:"#757288",textAnchor:"end",dominantBaseline:"central",children:["$",(.66*aR).toFixed(0)]}),(0,d.jsxs)("text",{x:"40",y:"127",fontSize:"8",fill:"#757288",textAnchor:"end",dominantBaseline:"central",children:["$",(.33*aR).toFixed(0)]}),(0,d.jsx)("text",{x:"40",y:"179",fontSize:"8",fill:"#757288",textAnchor:"end",dominantBaseline:"central",children:"$0"}),aU&&(0,d.jsx)("path",{d:aU,fill:"url(#chartGrad)"}),aS.map((a,b)=>(0,d.jsx)("line",{x1:a.x,y1:a.y,x2:a.x,y2:"175",stroke:"rgba(255, 255, 255, 0.04)",strokeDasharray:"3,3"},b)),aT&&(0,d.jsx)("path",{d:aT,fill:"none",stroke:"url(#lineGrad)",strokeWidth:"4",strokeLinecap:"round",filter:"url(#glow)"}),aS.map((a,b)=>(0,d.jsxs)("g",{children:[(0,d.jsx)("circle",{cx:a.x,cy:a.y,r:"7",fill:"#ffb84d",fillOpacity:"0.15"}),(0,d.jsx)("circle",{cx:a.x,cy:a.y,r:"3",fill:"#fff",stroke:"#ffb84d",strokeWidth:"2"}),(0,d.jsxs)("g",{transform:`translate(${a.x}, ${a.y-15})`,children:[(0,d.jsx)("rect",{x:"-20",y:"-10",width:"40",height:"13",rx:"3",fill:"#12101a",stroke:"rgba(255,184,77,0.4)",strokeWidth:"0.75",style:{filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"}}),(0,d.jsxs)("text",{y:"-3.5",fontSize:"8",fill:"#ffffff",fontWeight:"800",textAnchor:"middle",dominantBaseline:"central",children:["$",a.val.toFixed(0)]})]})]},b))]})})]}),(0,d.jsxs)("div",{className:"card",style:{padding:"20px",height:"260px",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,d.jsxs)("h3",{style:{fontSize:"14px",color:"#00e676",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800"},children:[(0,d.jsx)("i",{className:"fa-solid fa-chart-pie"})," Currency Split"]}),(0,d.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"180px",gap:"20px",flexWrap:"wrap"},children:0===aF.length?(0,d.jsx)("div",{style:{color:"var(--text-muted)",fontSize:"13px"},children:"No payment receipts."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("svg",{width:"120",height:"120",viewBox:"0 0 36 36",style:{overflow:"visible"},children:[(0,d.jsx)("circle",{cx:"18",cy:"18",r:"15.915",fill:"none",stroke:"rgba(255,255,255,0.03)",strokeWidth:"3.5"}),(0,d.jsx)("circle",{cx:"18",cy:"18",r:"15.915",fill:"none",stroke:"#00e676",strokeWidth:"3.5",strokeDasharray:aM+" "+(100-aM),strokeDashoffset:"25"}),(0,d.jsx)("circle",{cx:"18",cy:"18",r:"15.915",fill:"none",stroke:"#ffb84d",strokeWidth:"3.5",strokeDasharray:aN+" "+(100-aN),strokeDashoffset:25-aM}),(0,d.jsxs)("g",{transform:"translate(18, 18)",children:[(0,d.jsx)("text",{y:"-2",fontSize:"4.5",fontWeight:"bold",fill:"#a0aec0",textAnchor:"middle",dominantBaseline:"central",children:"Tips"}),(0,d.jsx)("text",{y:"4",fontSize:"6.5",fontWeight:"900",fill:"#ffffff",textAnchor:"middle",dominantBaseline:"central",children:aF.length})]})]}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"10px",minWidth:"130px"},children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{width:"10px",height:"10px",borderRadius:"3px",background:"#00e676",boxShadow:"0 0 5px rgba(0,230,118,0.4)"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontSize:"12px",fontWeight:"bold",color:"#fff"},children:["USD (",aM,"%)"]}),(0,d.jsxs)("div",{style:{fontSize:"10px",color:"var(--text-muted)"},children:[aJ," txs"]})]})]}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{width:"10px",height:"10px",borderRadius:"3px",background:"#ffb84d",boxShadow:"0 0 5px rgba(255,184,77,0.4)"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontSize:"12px",fontWeight:"bold",color:"#fff"},children:["KHR (",aN,"%)"]}),(0,d.jsxs)("div",{style:{fontSize:"10px",color:"var(--text-muted)"},children:[aK," txs"]})]})]})]})]})})]})]}),(0,d.jsxs)("div",{className:"card",id:"logs-card",style:{padding:"20px 24px",display:"flex",flexDirection:"column",flexGrow:1,minHeight:0},children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"15px",marginBottom:"15px",flexShrink:0},children:[(0,d.jsxs)("div",{children:[(0,d.jsxs)("h3",{style:{fontSize:"17px",color:"#fff",display:"flex",alignItems:"center",gap:"10px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-list-check",style:{color:"var(--primary)"}})," Live Transaction Records"]}),(0,d.jsx)("p",{style:{fontSize:"12.5px",color:"var(--text-muted)",marginTop:"4px"},children:"Real-time listener database synced with bank alerts."})]}),(0,d.jsxs)("div",{style:{position:"relative",width:"260px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-magnifying-glass",style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontSize:"13px"}}),(0,d.jsx)("input",{type:"text",placeholder:"Search donors or comments...",className:"input-control",value:as,onChange:a=>at(a.target.value),style:{padding:"8px 12px 8px 36px",fontSize:"13px",borderRadius:"10px"}})]})]}),(0,d.jsx)("div",{className:"table-responsive-wrapper",style:{flexGrow:1,overflowY:"auto",minHeight:0,borderRadius:"10px",border:"1px solid var(--glass-border)",background:"rgba(12, 10, 20, 0.4)"},children:(0,d.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"14px"},children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{style:{background:"rgba(255,255,255,0.02)",borderBottom:"1px solid var(--glass-border)"},children:[(0,d.jsx)("th",{style:{padding:"14px 16px",color:"var(--text-muted)",fontWeight:"700"},children:"Timestamp"}),(0,d.jsx)("th",{style:{padding:"14px 16px",color:"var(--text-muted)",fontWeight:"700"},children:"Donor Payer"}),(0,d.jsx)("th",{style:{padding:"14px 16px",color:"var(--text-muted)",fontWeight:"700"},children:"Original Amount"}),(0,d.jsx)("th",{style:{padding:"14px 16px",color:"var(--text-muted)",fontWeight:"700"},children:"USD Value"}),(0,d.jsx)("th",{style:{padding:"14px 16px",color:"var(--text-muted)",fontWeight:"700"},children:"Supporter Comment"})]})}),(0,d.jsx)("tbody",{children:0===aV.length?(0,d.jsx)("tr",{children:(0,d.jsx)("td",{colSpan:"5",style:{padding:"40px",textAlign:"center",color:"var(--text-muted)"},children:"No matching transaction receipts found."})}):aV.map((a,b)=>(0,d.jsxs)("tr",{style:{borderBottom:"1px solid rgba(255,255,255,0.03)",background:b%2==0?"transparent":"rgba(255,255,255,0.01)",transition:"background 0.2s"},className:"table-row-hover",children:[(0,d.jsx)("td",{style:{padding:"14px 16px",color:"var(--text-muted)",fontSize:"13px"},children:new Date(a.time).toLocaleString()}),(0,d.jsx)("td",{style:{padding:"14px 16px",fontWeight:"bold",color:"#fff"},children:a.name}),(0,d.jsxs)("td",{style:{padding:"14px 16px",color:"$"===a.currency?"#69f0ae":"#ffb84d",fontWeight:"800"},children:[a.currency,Number(a.amount).toLocaleString()]}),(0,d.jsxs)("td",{style:{padding:"14px 16px",color:"#69f0ae",fontWeight:"800"},children:["$",Number(a.amountUSD||("៛"===a.currency?a.amount/4e3:a.amount)).toFixed(2)]}),(0,d.jsx)("td",{style:{padding:"14px 16px",color:"var(--text-muted)",fontStyle:a.message?"italic":"normal"},children:a.message?`💬 "${a.message}"`:"—"})]},a.time||b))})]})})]})]}),"overlay"===ao&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"card",style:{padding:"18px 24px",marginBottom:"16px",flexShrink:0},children:[(0,d.jsxs)("h2",{style:{fontSize:"22px",fontWeight:"900",color:"#fff",display:"flex",alignItems:"center",gap:"10px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-layer-group",style:{color:"var(--primary)"}})," Stream Overlay Customizer"]}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"14px",marginTop:"6px",lineHeight:"1.5"},children:"Configure visual styling, colors, and AI voice settings for your live stream widgets. Copy the Browser Source links below and paste them into OBS Studio or Streamlabs."})]}),(0,d.jsxs)("div",{className:"workspace-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{className:"workspace-column",style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,d.jsxs)("div",{className:"card",style:{padding:"24px"},children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"15px",marginBottom:"22px"},children:[(0,d.jsxs)("div",{style:{flex:1,minWidth:"280px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800"},children:[(0,d.jsx)("i",{className:"fa-solid fa-bell",style:{color:"var(--primary)",fontSize:"14px"}})," OBS Browser Source Alert URL"]}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"12.5px",marginTop:"4px"},children:"Displays real-time donation alerts with sound notifications and triggers the Khmer & English speech reader."})]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"10px",width:"100%",marginTop:"5px"},children:[(0,d.jsx)("input",{type:"text",className:"input-control text-read",value:U,readOnly:!0,style:{padding:"8px 12px",fontSize:"13px"}}),(0,d.jsx)("button",{className:"btn btn-secondary",id:"btn-copy-obs",onClick:()=>aE(U,"btn-copy-obs"),style:{padding:"8px 16px",fontSize:"13px"},children:"Copy"})]})]}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"15px",marginBottom:"22px",borderTop:"1px solid var(--glass-border)",paddingTop:"20px"},children:[(0,d.jsxs)("div",{style:{flex:1,minWidth:"280px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800"},children:[(0,d.jsx)("i",{className:"fa-solid fa-trophy",style:{color:"#ffd700",fontSize:"14px"}})," OBS Top Donation Overlay URL"]}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"12.5px",marginTop:"4px"},children:"Displays a clean list of top stream financial contributors directly on your live broadcast layouts."})]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"10px",width:"100%",marginTop:"5px"},children:[(0,d.jsx)("input",{type:"text",className:"input-control text-read",value:Y,readOnly:!0,style:{padding:"8px 12px",fontSize:"13px"}}),(0,d.jsx)("button",{className:"btn btn-secondary",id:"btn-copy-top",onClick:()=>aE(Y,"btn-copy-top"),style:{padding:"8px 16px",fontSize:"13px"},children:"Copy"})]})]}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"15px",borderTop:"1px solid var(--glass-border)",paddingTop:"20px"},children:[(0,d.jsxs)("div",{style:{flex:1,minWidth:"280px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800"},children:[(0,d.jsx)("i",{className:"fa-solid fa-heart",style:{color:"#ff5252",fontSize:"14px"}})," Supporter Tip Page URL"]}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"12.5px",marginTop:"4px"},children:"Provide this page link to your viewers to display your payment QR receipt to let viewers send customized tips."})]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"10px",width:"100%",marginTop:"5px"},children:[(0,d.jsx)("input",{type:"text",className:"input-control text-read",value:W,readOnly:!0,style:{padding:"8px 12px",fontSize:"13px"}}),(0,d.jsx)("button",{className:"btn btn-secondary",id:"btn-copy-donate",onClick:()=>aE(W,"btn-copy-donate"),style:{padding:"8px 16px",fontSize:"13px"},children:"Copy"})]})]})]}),(0,d.jsxs)("div",{className:"card",style:{padding:"24px"},children:[(0,d.jsxs)("div",{className:"widget-header",style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",fontWeight:"800"},children:[(0,d.jsx)("i",{className:"fa-solid fa-circle-nodes",style:{marginRight:"8px",color:"var(--primary)"}})," Connection Status"]}),(0,d.jsx)("div",{className:`status-indicator-tag ${"CONNECTED"===g?"status-active":"CONNECTING"===g?"status-waiting":"status-inactive"}`,style:{fontSize:"11px",padding:"3px 8px",borderRadius:"20px",fontWeight:"700",background:"CONNECTED"===g?"rgba(0,230,118,0.15)":"CONNECTING"===g?"rgba(255,235,59,0.15)":"rgba(255,82,82,0.15)",color:"CONNECTED"===g?"#00e676":"CONNECTING"===g?"#ffeb3b":"#ff5252"},children:"CONNECTED"===g?"CONNECTED":"CONNECTING"===g?"SYNCING":"DISCONNECTED"})]}),(0,d.jsxs)("div",{className:"status-grid",style:{display:"flex",gap:"15px",marginBottom:"14px"},children:[(0,d.jsxs)("div",{className:"status-metric",style:{flex:1},children:[(0,d.jsx)("div",{className:"metric-label",style:{fontSize:"11px",color:"var(--text-muted)"},children:"Telegram Client"}),(0,d.jsx)("div",{className:"metric-val",style:{fontSize:"13.5px",fontWeight:"bold"},children:"CONNECTED"===g?"Active Listener":"Idle"})]}),(0,d.jsxs)("div",{className:"status-metric",style:{flex:1},children:[(0,d.jsx)("div",{className:"metric-label",style:{fontSize:"11px",color:"var(--text-muted)"},children:"Listening Group ID"}),(0,d.jsx)("div",{className:"metric-val",style:{fontSize:"13.5px",fontWeight:"bold",wordBreak:"break-all"},children:k||"None"})]})]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"10px",marginTop:"20px"},children:[(0,d.jsx)("button",{className:"btn btn-primary",style:{flex:1,padding:"10px",fontSize:"13px"},onClick:()=>ah(!0),children:"Configure Connection"}),"CONNECTED"===g&&(0,d.jsx)("button",{className:"btn btn-secondary",style:{borderColor:"rgba(255,82,82,0.3)",color:"#ff5252",padding:"10px"},onClick:aA,children:"Disconnect"})]})]}),(0,d.jsxs)("div",{className:"card",style:{padding:"24px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800",marginBottom:"20px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-sliders",style:{color:"var(--primary)"}})," Voice & Speech Customizer"]}),(0,d.jsxs)("form",{onSubmit:aB,children:[(0,d.jsxs)("div",{className:"form-group flex-align",style:{display:"flex",alignItems:"center",gap:"10px",padding:"15px",background:"rgba(255,255,255,0.03)",borderRadius:"12px",border:"1px solid var(--glass-border)",marginBottom:"20px"},children:[(0,d.jsx)("input",{type:"checkbox",id:"ttsEnabledCheck",className:"checkbox-control",checked:G,onChange:a=>H(a.target.checked)}),(0,d.jsx)("label",{htmlFor:"ttsEnabledCheck",style:{marginBottom:0,cursor:"pointer",userSelect:"none",fontSize:"13.5px",fontWeight:"600"},children:"Enable AI Khmer & English Text-to-Speech"})]}),(0,d.jsxs)("div",{className:"form-group",style:{marginBottom:"15px"},children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"TTS Read-out Speech Template"}),(0,d.jsx)("input",{type:"text",className:"input-control",placeholder:"e.g. {donator} donated {amount} through superchat.",value:Q,onChange:a=>R(a.target.value)}),(0,d.jsxs)("div",{className:"input-hint",style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px"},children:["Use ",(0,d.jsx)("strong",{children:"{donator}"})," and ",(0,d.jsx)("strong",{children:"{amount}"})," as placeholders."]})]}),(0,d.jsxs)("div",{className:"form-group",style:{marginBottom:"20px"},children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"TTS Reader Voice"}),(0,d.jsxs)("select",{className:"input-control select-control",value:O||"female",onChange:a=>P(a.target.value),style:{background:"#0a0910"},children:[(0,d.jsx)("option",{value:"female",children:"Default Female Voice"}),(0,d.jsx)("option",{value:"male",children:"Default Male Voice"})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"20px"},children:[(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsxs)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:["Speech Speed: ",(0,d.jsxs)("strong",{children:[I,"x"]})]}),(0,d.jsx)("input",{type:"range",min:"0.5",max:"2.0",step:"0.05",className:"slider-control",value:I,onChange:a=>J(parseFloat(a.target.value))})]}),(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsxs)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:["Voice Pitch: ",(0,d.jsx)("strong",{children:K})]}),(0,d.jsx)("input",{type:"range",min:"0.5",max:"2.0",step:"0.05",className:"slider-control",value:K,onChange:a=>L(parseFloat(a.target.value))})]})]}),(0,d.jsx)("button",{type:"submit",className:"btn btn-primary",style:{width:"100%",padding:"12px",fontSize:"13.5px"},children:"Save Voice Configurations"})]})]})]}),(0,d.jsxs)("div",{className:"workspace-column",style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,d.jsxs)("div",{className:"card monitor-widget",style:{padding:"20px"},children:[(0,d.jsxs)("div",{className:"monitor-badge",style:{fontSize:"11px",fontWeight:"bold",color:"var(--primary)",marginBottom:"12px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-tv",style:{marginRight:"6px"}})," WIDGET PREVIEW"]}),(0,d.jsx)("div",{className:"monitor-frame-container",style:{height:"220px",borderRadius:"12px",overflow:"hidden",border:"1px solid var(--glass-border)",background:"rgba(0,0,0,0.3)"},children:(0,d.jsx)("iframe",{id:"overlayPreviewIframe",className:"preview-iframe",src:$,allow:"autoplay",style:{width:"100%",height:"100%",border:"none"}})}),(0,d.jsx)("div",{style:{fontSize:"11.5px",color:"var(--text-muted)",marginTop:"8px",textAlign:"center"},children:"\uD83D\uDCA1 Click inside preview screen once to authorize browser media autoplay."})]}),(0,d.jsxs)("div",{className:"card simulator-widget",style:{padding:"24px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",fontWeight:"800",marginBottom:"14px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-flask",style:{marginRight:"8px",color:"#ea1e63"}})," Simulation Engine"]}),(0,d.jsxs)("div",{className:"form-group",style:{marginBottom:"15px"},children:[(0,d.jsx)("label",{htmlFor:"testDonorName",style:{fontSize:"12px",marginBottom:"6px",display:"block"},children:"Test Donor Name"}),(0,d.jsx)("input",{type:"text",id:"testDonorName",className:"input-control",value:ac,onChange:a=>ad(a.target.value),style:{padding:"8px 12px",fontSize:"13.5px"}})]}),(0,d.jsxs)("div",{className:"form-group",style:{marginBottom:"20px"},children:[(0,d.jsx)("label",{htmlFor:"testDonorMessage",style:{fontSize:"12px",marginBottom:"6px",display:"block"},children:"Test Supporter Comment"}),(0,d.jsx)("input",{type:"text",id:"testDonorMessage",className:"input-control",value:ae,onChange:a=>af(a.target.value),style:{padding:"8px 12px",fontSize:"13.5px"}})]}),(0,d.jsxs)("button",{className:"btn btn-primary",style:{width:"100%",padding:"10px",fontSize:"13.5px"},onClick:aC,children:[(0,d.jsx)("i",{className:"fa-solid fa-volume-high",style:{marginRight:"8px"}})," Trigger Preview Alert"]})]}),(0,d.jsxs)("div",{className:"card",style:{padding:"24px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",color:"#fff",display:"flex",alignItems:"center",gap:"8px",fontWeight:"800",marginBottom:"20px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-palette",style:{color:"var(--primary)"}})," Visual Alert Customizer"]}),(0,d.jsxs)("form",{onSubmit:aB,children:[(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"15px"},children:[(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"Primary Alert Color"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("input",{type:"color",value:u,onChange:a=>v(a.target.value),style:{width:"40px",height:"36px",border:"none",borderRadius:"8px",cursor:"pointer",padding:0}}),(0,d.jsx)("input",{type:"text",className:"input-control",value:u,onChange:a=>v(a.target.value),style:{fontSize:"13px",padding:"6px 8px"}})]})]}),(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"Secondary Alert Color"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("input",{type:"color",value:w,onChange:a=>x(a.target.value),style:{width:"40px",height:"36px",border:"none",borderRadius:"8px",cursor:"pointer",padding:0}}),(0,d.jsx)("input",{type:"text",className:"input-control",value:w,onChange:a=>x(a.target.value),style:{fontSize:"13px",padding:"6px 8px"}})]})]})]}),(0,d.jsxs)("div",{className:"form-group",style:{marginBottom:"15px"},children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"Alert Text Template"}),(0,d.jsx)("input",{type:"text",className:"input-control",placeholder:"e.g. {donator} donated {amount} through super chat!",value:S,onChange:a=>T(a.target.value)}),(0,d.jsxs)("div",{className:"input-hint",style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px"},children:["Placeholders: ",(0,d.jsx)("strong",{children:"{donator}"})," and ",(0,d.jsx)("strong",{children:"{amount}"}),"."]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px",marginBottom:"15px"},children:[(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"Header Template"}),(0,d.jsx)("input",{type:"text",className:"input-control",value:y,onChange:a=>z(a.target.value)})]}),(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"Footer Template"}),(0,d.jsx)("input",{type:"text",className:"input-control",value:A,onChange:a=>B(a.target.value)})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:"15px",marginBottom:"20px"},children:[(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:"Font Family"}),(0,d.jsxs)("select",{className:"input-control select-control",value:E,onChange:a=>F(a.target.value),style:{background:"#0a0910"},children:[(0,d.jsx)("option",{value:"Outfit",children:"Outfit"}),(0,d.jsx)("option",{value:"Inter",children:"Inter"}),(0,d.jsx)("option",{value:"Roboto",children:"Roboto"}),(0,d.jsx)("option",{value:"Poppins",children:"Poppins"}),(0,d.jsx)("option",{value:"Montserrat",children:"Montserrat"})]})]}),(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsxs)("label",{style:{fontSize:"12.5px",display:"block",marginBottom:"6px"},children:["Duration: ",(0,d.jsxs)("strong",{children:[C,"s"]})]}),(0,d.jsx)("input",{type:"range",min:"3",max:"30",step:"1",className:"slider-control",value:C,onChange:a=>D(parseInt(a.target.value))})]})]}),(0,d.jsx)("button",{type:"submit",className:"btn btn-primary",style:{width:"100%",padding:"12px",fontSize:"13.5px"},children:"Save Style Configurations"})]})]})]})]})]}),"revenue"===ao&&function(){let a=aa.filter(a=>"៛"===a.currency),c=aa.filter(a=>"$"===a.currency),e=a.reduce((a,b)=>a+b.amount,0),f=c.reduce((a,b)=>a+b.amount,0),g={};aa.forEach(a=>{let b=a.name||"Unknown",c=a.amountUSD||("៛"===a.currency?a.amount/4e3:a.amount);g[b]||(g[b]={name:b,total:0,count:0}),g[b].total+=c,g[b].count+=1});let h=Object.values(g).sort((a,b)=>b.total-a.total).slice(0,5);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"card",style:{padding:"20px 24px",marginBottom:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"15px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsxs)("h2",{style:{fontSize:"22px",fontWeight:"900",color:"#fff",display:"flex",alignItems:"center",gap:"10px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-sack-dollar",style:{color:"#69f0ae"}})," Stream Revenue Hub"]}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"13.5px",marginTop:"4px"},children:"Detailed financial metrics, currency breakdowns, and ABA bank synced transaction logs."})]}),(0,d.jsxs)("button",{className:"btn btn-primary",onClick:aW,disabled:0===aa.length,style:{display:"flex",alignItems:"center",gap:"8px",fontSize:"13px",padding:"10px 16px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-file-export"})," Export Financial Ledger (.CSV)"]})]}),(0,d.jsxs)("div",{className:"kpi-grid",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"20px",marginBottom:"25px"},children:[(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{style:{position:"absolute",right:"15px",top:"15px",opacity:.1,fontSize:"32px"},children:(0,d.jsx)("i",{className:"fa-solid fa-money-bill-trend-up",style:{color:"#00e676"}})}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.8px"},children:"Lifetime Earnings"}),(0,d.jsxs)("div",{style:{fontSize:"26px",fontWeight:"900",color:"#00e676",marginTop:"8px",textShadow:"0 0 10px rgba(0,230,118,0.2)"},children:["$",aG.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),(0,d.jsxs)("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"6px"},children:["Average tip value: $",(aH||0).toFixed(2)," USD"]})]}),(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{style:{position:"absolute",right:"15px",top:"15px",opacity:.1,fontSize:"32px"},children:(0,d.jsx)("i",{className:"fa-solid fa-vault",style:{color:"#ffb84d"}})}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.8px"},children:"ABA Synced Revenue"}),(0,d.jsxs)("div",{style:{fontSize:"26px",fontWeight:"900",color:"#ffffff",marginTop:"8px"},children:[aa.length," transactions"]}),(0,d.jsx)("div",{style:{fontSize:"11px",color:"#00e676",fontWeight:"700",marginTop:"6px"},children:"\uD83D\uDFE2 100% Sync match accuracy"})]}),(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{style:{position:"absolute",right:"15px",top:"15px",opacity:.1,fontSize:"32px"},children:(0,d.jsx)("i",{className:"fa-solid fa-coins",style:{color:"#ffd700"}})}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.8px"},children:"USD Total Split"}),(0,d.jsxs)("div",{style:{fontSize:"26px",fontWeight:"900",color:"#ffd700",marginTop:"8px"},children:["$",f.toLocaleString(void 0,{minimumFractionDigits:2})]}),(0,d.jsxs)("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"6px"},children:["USD deposits: ",c.length," tips"]})]}),(0,d.jsxs)("div",{className:"card kpi-card",style:{padding:"20px",position:"relative",overflow:"hidden"},children:[(0,d.jsx)("div",{style:{position:"absolute",right:"15px",top:"15px",opacity:.1,fontSize:"32px"},children:(0,d.jsx)("i",{className:"fa-solid fa-wallet",style:{color:"#a78bfa"}})}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.8px"},children:"KHR Total Split"}),(0,d.jsxs)("div",{style:{fontSize:"26px",fontWeight:"900",color:"#a78bfa",marginTop:"8px"},children:[e.toLocaleString()," ៛"]}),(0,d.jsxs)("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"6px"},children:["KHR deposits: ",a.length," tips"]})]})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"20px",minHeight:0},children:[(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,d.jsxs)("div",{className:"card",style:{padding:"24px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",fontWeight:"800",marginBottom:"14px",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-credit-card",style:{color:"var(--primary)"}})," Bank Settlement & Payouts"]}),(0,d.jsx)("p",{style:{color:"var(--text-muted)",fontSize:"12.5px",marginBottom:"20px",lineHeight:"1.4"},children:"Since StreamPortal operates in self-hosted listener mode, tips are deposited directly into your linked ABA/local bank accounts in real-time. No intermediary holdings or transaction payout delays exist."}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"12px",background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"12px",border:"1px solid var(--glass-border)"},children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px"},children:[(0,d.jsx)("span",{style:{color:"var(--text-muted)"},children:"Self-Custody Payout Speed"}),(0,d.jsx)("strong",{style:{color:"#00e676"},children:"⚡ INSTANT"})]}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",borderTop:"1px dashed var(--glass-border)",paddingTop:"10px"},children:[(0,d.jsx)("span",{style:{color:"var(--text-muted)"},children:"Commission Platform Fees"}),(0,d.jsx)("strong",{style:{color:"#00e676"},children:"0.00% (FREE)"})]}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",borderTop:"1px dashed var(--glass-border)",paddingTop:"10px"},children:[(0,d.jsx)("span",{style:{color:"var(--text-muted)"},children:"Linked ABA Bank Account"}),(0,d.jsx)("strong",{style:{color:"#ffffff"},children:b?`Synced (Group @${b})`:"—"})]})]})]}),(0,d.jsxs)("div",{className:"card",style:{padding:"24px"},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",fontWeight:"800",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-ranking-star",style:{color:"#ffd700"}})," Top Financial Supporters"]}),(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:0===h.length?(0,d.jsx)("div",{style:{color:"var(--text-muted)",textAlign:"center",padding:"20px",fontSize:"13px"},children:"Waiting for supporters..."}):h.map((a,b)=>(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"rgba(255,255,255,0.02)",border:"1px solid var(--glass-border)",borderRadius:"10px"},children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,d.jsx)("span",{style:{fontSize:"16px",filter:`drop-shadow(0 0 5px ${["#ffd700","#c0c0c0","#cd7f32","#90caf9","#90caf9"][b]})`},children:["\uD83E\uDD47","\uD83E\uDD48","\uD83E\uDD49","✨","✨"][b]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"13.5px",fontWeight:"bold",color:"#fff"},children:a.name}),(0,d.jsxs)("div",{style:{fontSize:"10px",color:"var(--text-muted)"},children:[a.count," donation receipts"]})]})]}),(0,d.jsxs)("div",{style:{textAlign:"right"},children:[(0,d.jsxs)("div",{style:{fontSize:"14.5px",fontWeight:"900",color:"#00e676"},children:["$",a.total.toFixed(2)]}),(0,d.jsx)("div",{style:{fontSize:"9px",color:"var(--text-muted)",textTransform:"uppercase"},children:"Total Support"})]})]},b))})]})]}),(0,d.jsxs)("div",{className:"card",style:{padding:"24px",display:"flex",flexDirection:"column",minHeight:0},children:[(0,d.jsxs)("h3",{style:{fontSize:"15px",fontWeight:"800",marginBottom:"14px",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("i",{className:"fa-solid fa-list-check",style:{color:"var(--primary)"}})," Synced Bank Receipts"]}),(0,d.jsx)("div",{style:{flexGrow:1,overflowY:"auto",borderRadius:"8px",border:"1px solid var(--glass-border)",background:"rgba(0,0,0,0.2)"},children:0===aa.length?(0,d.jsx)("div",{style:{color:"var(--text-muted)",padding:"40px 20px",textAlign:"center",fontSize:"13px"},children:"No payment ledger logs synchronized yet."}):aa.map((a,b)=>(0,d.jsxs)("div",{style:{padding:"12px 14px",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",flexDirection:"column",gap:"6px"},children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,d.jsx)("span",{style:{fontSize:"13px",fontWeight:"bold",color:"#fff"},children:a.name}),(0,d.jsxs)("span",{style:{fontSize:"13.5px",color:"#00e676",fontWeight:"900"},children:[a.currency,Number(a.amount).toLocaleString()]})]}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"var(--text-muted)"},children:[(0,d.jsx)("span",{children:new Date(a.time).toLocaleString()}),(0,d.jsxs)("span",{children:["Equiv. $",Number(a.amountUSD||("៛"===a.currency?a.amount/4e3:a.amount)).toFixed(2)]})]}),a.message&&(0,d.jsxs)("div",{style:{fontSize:"12px",fontStyle:"italic",color:"var(--primary)",background:"rgba(255,184,77,0.03)",padding:"6px 8px",borderRadius:"4px",borderLeft:"2px solid var(--primary)",marginTop:"3px"},children:["\uD83D\uDCAC “",a.message,"”"]})]},a.time||b))})]})]})]})}()]})}),(0,d.jsx)("div",{className:`modal-overlay ${ag?"active":""}`,onClick:()=>ah(!1),children:(0,d.jsxs)("div",{className:"modal-card",onClick:a=>a.stopPropagation(),children:[(0,d.jsxs)("div",{className:"modal-header",children:[(0,d.jsx)("h3",{children:"\uD83D\uDCF1 Telegram Client Connection"}),(0,d.jsx)("button",{className:"modal-close",onClick:()=>ah(!1),children:"✕"})]}),(0,d.jsxs)("div",{className:"modal-body",children:[(0,d.jsxs)("div",{className:"status-indicator-box",style:{marginBottom:"25px"},children:[(0,d.jsx)("div",{className:"status-dot",style:{backgroundColor:"CONNECTED"===g?"var(--status-connected)":"CONNECTING"===g?"var(--status-connecting)":g.startsWith("NEED")?"var(--status-action)":"var(--status-disconnected)"}}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{className:"status-label",children:"Telegram Status"}),(0,d.jsx)("div",{className:"status-value",children:g})]})]}),"DISCONNECTED"===g&&(0,d.jsxs)("form",{onSubmit:aw,children:[(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{children:"Phone Number (International format)"}),(0,d.jsx)("input",{type:"text",className:"input-control",placeholder:"e.g. +85512345678",value:m,onChange:a=>n(a.target.value),required:!0}),(0,d.jsx)("div",{className:"input-hint",children:"Include country code prefix (e.g. +855 for Cambodia)."})]}),i&&(0,d.jsx)("div",{className:"error-msg",style:{marginBottom:"15px"},children:i}),(0,d.jsx)("button",{type:"submit",className:"btn btn-primary",style:{width:"100%",marginTop:"10px"},children:"Connect Client"})]}),"CONNECTING"===g&&(0,d.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,d.jsx)("div",{className:"branding-icon animate-pulse",style:{fontSize:"40px",marginBottom:"15px"},children:"⚡"}),(0,d.jsx)("h4",{children:"Establishing Telegram Connection..."}),(0,d.jsx)("p",{style:{fontSize:"13px",color:"var(--text-muted)",marginTop:"5px"},children:"Checking session credentials and generating secure keys."})]}),"NEED_CODE"===g&&(0,d.jsxs)("div",{className:"action-panel",children:[(0,d.jsx)("h4",{children:"\uD83D\uDCE9 Step 2: Verification Code Required"}),(0,d.jsx)("p",{style:{fontSize:"13px",color:"var(--text-muted)",marginBottom:"15px"},children:"Check your official Telegram App messages on other active devices for a 6-digit verification code."}),(0,d.jsx)("div",{className:"form-group",children:(0,d.jsx)("input",{type:"text",className:"input-control",placeholder:"Enter code sent via Telegram",value:q,onChange:a=>r(a.target.value)})}),i&&(0,d.jsx)("div",{className:"error-msg",style:{marginBottom:"15px"},children:i}),(0,d.jsx)("button",{className:"btn btn-primary",style:{width:"100%",marginTop:"15px"},onClick:ax,children:"Verify Code"})]}),"NEED_PASSWORD"===g&&(0,d.jsxs)("div",{className:"action-panel",children:[(0,d.jsx)("h4",{children:"\uD83D\uDD10 Two-Factor (2FA) Password"}),(0,d.jsx)("p",{style:{fontSize:"13px",color:"var(--text-muted)",marginBottom:"15px"},children:"Your Telegram account has 2-Step Verification enabled. Enter your password below."}),(0,d.jsx)("div",{className:"form-group",children:(0,d.jsx)("input",{type:"password",className:"input-control",placeholder:"Enter 2FA password",value:s,onChange:a=>t(a.target.value)})}),i&&(0,d.jsx)("div",{className:"error-msg",style:{marginBottom:"15px"},children:i}),(0,d.jsx)("button",{className:"btn btn-primary",style:{width:"100%",marginTop:"15px"},onClick:ay,children:"Verify 2FA Password"})]}),"CONNECTED"===g&&(0,d.jsx)("div",{className:"action-panel",children:"group"===au?(0,d.jsxs)("form",{onSubmit:az,children:[(0,d.jsx)("h4",{children:"\uD83D\uDCE2 Step 3: Set Group ID"}),(0,d.jsx)("p",{style:{fontSize:"13px",color:"var(--text-muted)",marginBottom:"15px"},children:"Your Telegram client is connected! Now, enter the target Telegram Group ID containing the ABA transaction bot receipt messages."}),(0,d.jsxs)("div",{className:"form-group",children:[(0,d.jsx)("label",{children:"Telegram Group ID"}),(0,d.jsx)("input",{type:"text",className:"input-control",placeholder:"e.g. -5105279786",value:o,onChange:a=>p(a.target.value),required:!0})]}),i&&(0,d.jsx)("div",{className:"error-msg",style:{marginBottom:"15px"},children:i}),(0,d.jsxs)("div",{style:{display:"flex",gap:"10px",marginTop:"20px"},children:[(0,d.jsx)("button",{type:"submit",className:"btn btn-primary",style:{flex:2},children:"Save Group ID & Finalize"}),(0,d.jsx)("button",{type:"button",className:"btn btn-secondary",style:{flex:1},onClick:()=>av("active"),children:"Cancel"})]})]}):(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{marginBottom:"24px",padding:"15px",background:"rgba(0,230,118,0.06)",border:"1px solid rgba(0,230,118,0.15)",borderRadius:"12px",fontSize:"14px"},children:["✅ Active and listening to Telegram Group ID: ",(0,d.jsx)("strong",{children:k})]}),(0,d.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,d.jsx)("button",{className:"btn btn-secondary",style:{flex:1},onClick:()=>av("group"),children:"Update Group ID"}),(0,d.jsx)("button",{className:"btn btn-disconnect",style:{flex:1},onClick:aA,children:"Disconnect Client"})]})]})})]})]})}),(0,d.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        :root {
          --primary: #ffb84d;
          --primary-glow: rgba(255, 184, 77, 0.3);
          --bg-gradient: radial-gradient(circle at top, #141424 0%, #07070d 100%);
          --glass-bg: rgba(20, 18, 32, 0.7);
          --glass-border: rgba(255, 255, 255, 0.05);
          --text-muted: rgba(255, 255, 255, 0.45);

          --status-disconnected: #ff5252;
          --status-connecting: #ffeb3b;
          --status-action: #2196f3;
          --status-connected: #00e676;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--bg-gradient);
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background: transparent;
        }

        /* SIDEBAR STYLES */
        .sidebar {
          width: 290px;
          background: linear-gradient(180deg, rgba(12, 10, 24, 0.98) 0%, rgba(7, 7, 13, 0.99) 100%);
          box-shadow: 1px 0 0 0 var(--glass-border);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 10;
        }

        .app-branding {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 50px;
          cursor: pointer;
        }

        .branding-icon {
          font-size: 26px;
          color: var(--primary);
          filter: drop-shadow(0 0 10px var(--primary-glow));
        }

        .branding-title {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .branding-subtitle {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
          transform: translateX(3px);
        }

        .nav-item.active {
          color: #ffffff;
          background: rgba(255, 184, 77, 0.08);
          border-left-color: var(--primary);
          box-shadow: inset 4px 0 15px rgba(255, 184, 77, 0.08);
        }

        .nav-icon {
          font-size: 17px;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
        }

        .sidebar-footer {
          border-top: 1px solid var(--glass-border);
          padding-top: 25px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 184, 77, 0.1);
          border: 1px solid rgba(255, 184, 77, 0.25);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .user-info h2 {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff !important;
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-info p {
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .btn-logout {
          width: 100%;
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.15);
          color: #ff5252;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-logout:hover {
          background: #ff5252;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
        }

        /* MAIN CONTENT */
        .main-content {
          margin-left: 290px;
          flex-grow: 1;
          padding: 24px;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: transparent;
        }

        .dashboard-container {
          max-width: 100%;
          margin: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .card:hover {
          border-color: rgba(255, 184, 77, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .kpi-grid > div:nth-child(1) { animation-delay: 0.05s; }
        .kpi-grid > div:nth-child(2) { animation-delay: 0.1s; }
        .kpi-grid > div:nth-child(3) { animation-delay: 0.15s; }
        .kpi-grid > div:nth-child(4) { animation-delay: 0.2s; }
        
        .analytics-charts-row > div:nth-child(1) { animation-delay: 0.25s; }
        .analytics-charts-row > div:nth-child(2) { animation-delay: 0.3s; }
        
        .workspace-grid > div:nth-child(1) { animation-delay: 0.35s; }
        .workspace-grid > div:nth-child(2) { animation-delay: 0.4s; }

        /* WORKSPACE LAYOUT */
        .workspace-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        .mobile-menu-toggle {
          display: none;
        }

        .drawer-close-btn {
          display: none;
        }

        .dashboard-container .timeframe-selector {
          display: flex;
          background: rgba(20, 18, 30, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }

        .dashboard-container .timeframe-selector::-webkit-scrollbar {
          display: none;
        }

        .dashboard-container .time-pill {
          background: transparent !important;
          border: 0 !important;
          outline: none !important;
          margin: 0 !important;
          font-family: inherit !important;
          color: #a0aec0 !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
          white-space: nowrap !important;
        }

        .dashboard-container .time-pill:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .dashboard-container .time-pill:focus {
          outline: none !important;
        }

        .dashboard-container .time-pill.active {
          background: linear-gradient(135deg, #ffd700 0%, #ffb84d 100%) !important;
          color: #0c0a12 !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 12px rgba(255, 184, 77, 0.2) !important;
        }

        /* RESPONSIVE LAYOUT MEDIA QUERIES */
        @media (max-width: 991px) {
          .mobile-top-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            padding: 0 20px;
            background: rgba(10, 8, 18, 0.95);
            border-bottom: 1px solid var(--glass-border);
            z-index: 998;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .mobile-top-bar .app-branding {
            margin-bottom: 0 !important;
            gap: 8px;
          }

          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            color: #ffffff;
            font-size: 20px;
            cursor: pointer;
            padding: 6px;
            border-radius: 6px;
            transition: background 0.2s;
          }

          .mobile-menu-toggle:hover {
            background: rgba(255,255,255,0.05);
            color: var(--primary);
          }

          .sidebar-backdrop {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(4, 3, 6, 0.65);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 999;
            animation: drawerFadeIn 0.25s ease-out;
          }

          @keyframes drawerFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            z-index: 1000;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #0d0b16;
            border-right: 1px solid var(--glass-border);
            border-bottom: none;
            transform: translateX(-105%);
            visibility: hidden;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
            box-shadow: none;
          }

          .sidebar.menu-open {
            transform: translateX(0);
            visibility: visible;
            box-shadow: 15px 0 45px rgba(0,0,0,0.65);
          }

          .drawer-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 20px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            transition: all 0.2s;
          }

          .drawer-close-btn:hover {
            color: #ffffff;
            background: rgba(255,255,255,0.08);
          }

          .nav-menu {
            display: flex;
            flex-direction: column !important;
            width: 100%;
            gap: 8px !important;
          }

          .nav-item {
            width: 100% !important;
            height: auto !important;
            padding: 14px 20px !important;
            border-radius: 10px !important;
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
            border-left: 3px solid transparent !important;
            border-bottom: none !important;
          }

          .nav-item.active {
            border-left-color: var(--primary) !important;
            background: rgba(255, 184, 77, 0.08) !important;
          }

          .nav-text {
            display: inline !important;
            font-size: 15px;
          }

          .nav-icon {
            margin-right: 0 !important;
          }

          .sidebar-footer {
            display: flex;
            width: 100%;
            border-top: 1px solid var(--glass-border);
            padding-top: 20px;
            margin-top: 20px;
            flex-direction: column;
          }

          .user-profile {
            display: flex !important;
            margin-bottom: 15px;
          }

          .btn-logout {
            padding: 12px !important;
            font-size: 14px !important;
            width: 100%;
          }

          .main-content {
            margin-left: 0 !important;
            padding: 20px !important;
            padding-top: 85px !important;
            max-width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }

          .dashboard-container {
            height: auto !important;
          }

          .workspace-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .nav-menu {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 576px) {
          .sidebar {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .sidebar > div {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
            width: 100%;
          }
          .nav-menu {
            width: 100%;
          }
          .sidebar-footer {
            width: 100%;
            justify-content: flex-end;
          }
        }

        .workspace-column {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* CARDS AND PLATES */
        .card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
          position: relative;
        }

        .card h3 {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .card-desc {
          font-size: 14px;
          color: var(--text-muted);
        }

        /* LIVE STATUS WIDGET */
        .status-widget .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .status-indicator-tag {
          font-size: 12px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 50px;
        }

        .status-active {
          color: var(--status-connected);
          background: rgba(0, 230, 118, 0.08);
          border: 1px solid rgba(0, 230, 118, 0.15);
        }

        .status-waiting {
          color: var(--status-connecting);
          background: rgba(255, 235, 59, 0.08);
          border: 1px solid rgba(255, 235, 59, 0.15);
        }

        .status-inactive {
          color: var(--status-disconnected);
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.15);
        }

        .status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .status-metric {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 16px;
        }

        .metric-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .metric-val {
          font-size: 16px;
          font-weight: 800;
          margin-top: 5px;
        }

        .btn-action-primary {
          width: 100%;
          background: linear-gradient(135deg, #ffb84d 0%, #ff9800 100%);
          color: #000000;
          border: none;
          border-radius: 14px;
          padding: 16px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 184, 77, 0.2);
          transition: all 0.3s;
        }

        .btn-action-primary:hover {
          box-shadow: 0 6px 20px rgba(255, 184, 77, 0.35);
          transform: translateY(-1px);
        }

        /* CUSTOMIZATION WIDGET */
        .custom-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .summary-stat {
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 15px 18px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }

        .stat-val {
          font-size: 15px;
          font-weight: 800;
        }

        .color-swatch {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .btn-action-secondary {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          color: #ffffff;
          border-radius: 12px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-action-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .grid-gap-10 {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .gap-10 { gap: 10px; }
        .flex-center { display: flex; align-items: center; }

        /* INTEGRATION WIDGET */
        .integration-row {
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .integration-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--primary);
        }

        .integration-desc {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
          margin-bottom: 12px;
        }

        .copy-action-row {
          display: flex;
          gap: 12px;
        }

        .text-read {
          background: rgba(0,0,0,0.3) !important;
          border-color: rgba(255,255,255,0.04) !important;
          color: var(--text-muted) !important;
          cursor: not-allowed;
          font-family: monospace;
          font-size: 12px !important;
        }

        /* LIVE PREVIEW MONITOR */
        .monitor-widget {
          padding: 25px;
        }

        .monitor-badge {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 15px;
        }

        .monitor-frame-container {
          background: #000000;
          border: 2px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          aspect-ratio: 4 / 3;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }

        .preview-iframe {
          width: 800px;
          height: 600px;
          border: none;
          transform: scale(0.5);
          transform-origin: top left;
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
        }

        @media (max-width: 1400px) {
          .preview-iframe {
            transform: scale(0.42);
            width: 238%;
            height: 238%;
          }
        }

        .monitor-tip {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 15px;
          text-align: center;
        }

        /* INPUT CONTROLS */
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.85);
        }

        .input-control {
          width: 100%;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 12px 16px;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.3s;
        }

        .input-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .select-control {
          cursor: pointer;
          background: rgba(0,0,0,0.5);
        }

        .checkbox-control {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: var(--primary);
        }

        .slider-control {
          width: 100%;
          cursor: pointer;
          accent-color: var(--primary);
          height: 6px;
          border-radius: 10px;
          background: rgba(0,0,0,0.35);
        }

        .input-hint {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 5px;
        }

        .settings-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* BUTTONS */
        .btn {
          border-radius: 12px;
          padding: 14px 24px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, #ffa726 100%);
          color: #000000;
          border: none;
          box-shadow: 0 4px 15px rgba(255, 184, 77, 0.2);
        }

        .btn-primary:hover {
          box-shadow: 0 6px 20px rgba(255, 184, 77, 0.4);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: #ffffff;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .btn-disconnect {
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.2);
          color: #ff5252;
          border-radius: 12px;
          padding: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-disconnect:hover {
          background: #ff5252;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
        }

        .error-msg {
          background: rgba(255, 82, 82, 0.08);
          border: 1px solid rgba(255, 82, 82, 0.2);
          color: #ff5252;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }

        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-referrer: ellipsis;
        }

        /* STATUS DOT */
        .status-indicator-box {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 18px 22px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
        }

        .status-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }

        .status-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .status-value {
          font-size: 16px;
          font-weight: 800;
          margin-top: 2px;
        }

        /* TRANSACTION LOGS */
        .logs-container {
          max-height: 380px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 5px;
        }

        .log-entry {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          padding: 16px 20px;
          font-size: 14px;
          line-height: 1.5;
        }

        .log-entry.payment {
          border-left: 4px solid var(--status-connected);
        }

        .log-time {
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 5px;
          font-family: monospace;
        }

        .log-message {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          margin-top: 8px;
          background: rgba(0,0,0,0.15);
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.02);
        }

        .no-logs {
          color: var(--text-muted);
          text-align: center;
          padding: 40px;
          font-size: 14px;
        }

        /* MODAL OVERLAY STYLES */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 4, 8, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .modal-card {
          background: rgba(22, 20, 36, 0.85);
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05);
          transform: translateY(40px) scale(0.95);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15);
          overflow: hidden;
        }

        .modal-overlay.active .modal-card {
          transform: translateY(0) scale(1);
        }

        .modal-header {
          padding: 30px 35px 20px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
        }

        .modal-header h3 {
          font-size: 19px;
          font-weight: 800;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.3s;
        }

        .modal-close:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.1);
        }

        .modal-body {
          padding: 35px;
          max-height: 75vh;
          overflow-y: auto;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .color-picker {
          height: 50px;
          padding: 5px !important;
          cursor: pointer;
        }

        .kpi-card {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .kpi-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }

        /* SCROLLBAR CUSTOMIZATION */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* ANIMATIONS */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
      `}})]})}},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65381:(a,b,c)=>{"use strict";c.r(b),c.d(b,{GlobalError:()=>E.a,__next_app__:()=>K,handler:()=>M,pages:()=>J,routeModule:()=>L,tree:()=>I});var d=c(49754),e=c(9117),f=c(46595),g=c(32324),h=c(39326),i=c(38928),j=c(20175),k=c(12),l=c(54290),m=c(12696),n=c(52574),o=c(82802),p=c(77533),q=c(45229),r=c(32822),s=c(261),t=c(26453),u=c(52474),v=c(26713),w=c(51356),x=c(62685),y=c(36225),z=c(63446),A=c(2762),B=c(45742),C=c(86439),D=c(81170),E=c.n(D),F=c(62506),G=c(91203),H={};for(let a in F)0>["default","tree","pages","GlobalError","__next_app__","routeModule","handler"].indexOf(a)&&(H[a]=()=>F[a]);c.d(b,H);let I={children:["",{children:["dashboard",{children:["overview",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(c.bind(c,98990)),"/Users/hochenheng/Desktop/StreamIntergration/src/app/dashboard/overview/page.js"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(c.bind(c,97634)),"/Users/hochenheng/Desktop/StreamIntergration/src/app/layout.js"],"global-error":[()=>Promise.resolve().then(c.t.bind(c,81170,23)),"next/dist/client/components/builtin/global-error.js"],"not-found":[()=>Promise.resolve().then(c.t.bind(c,87028,23)),"next/dist/client/components/builtin/not-found.js"],forbidden:[()=>Promise.resolve().then(c.t.bind(c,90461,23)),"next/dist/client/components/builtin/forbidden.js"],unauthorized:[()=>Promise.resolve().then(c.t.bind(c,32768,23)),"next/dist/client/components/builtin/unauthorized.js"]}]}.children,J=["/Users/hochenheng/Desktop/StreamIntergration/src/app/dashboard/overview/page.js"],K={require:c,loadChunk:()=>Promise.resolve()},L=new d.AppPageRouteModule({definition:{kind:e.RouteKind.APP_PAGE,page:"/dashboard/overview/page",pathname:"/dashboard/overview",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:I},distDir:".next",relativeProjectDir:""});async function M(a,b,d){var D;let H="/dashboard/overview/page";"/index"===H&&(H="/");let N=(0,h.getRequestMeta)(a,"postponed"),O=(0,h.getRequestMeta)(a,"minimalMode"),P=await L.prepare(a,b,{srcPage:H,multiZoneDraftMode:!1});if(!P)return b.statusCode=400,b.end("Bad Request"),null==d.waitUntil||d.waitUntil.call(d,Promise.resolve()),null;let{buildId:Q,query:R,params:S,parsedUrl:T,pageIsDynamic:U,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,serverActionsManifest:Y,clientReferenceManifest:Z,subresourceIntegrityManifest:$,prerenderManifest:_,isDraftMode:aa,resolvedPathname:ab,revalidateOnlyGenerated:ac,routerServerContext:ad,nextConfig:ae,interceptionRoutePatterns:af}=P,ag=T.pathname||"/",ah=(0,s.normalizeAppPath)(H),{isOnDemandRevalidate:ai}=P,aj=L.match(ag,_),ak=!!_.routes[ab],al=!!(aj||ak||_.routes[ah]),am=a.headers["user-agent"]||"",an=(0,v.getBotType)(am),ao=(0,q.isHtmlBotRequest)(a),ap=(0,h.getRequestMeta)(a,"isPrefetchRSCRequest")??"1"===a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],aq=(0,h.getRequestMeta)(a,"isRSCRequest")??(0,n.f)(a.headers[u.RSC_HEADER]),ar=(0,t.getIsPossibleServerAction)(a),as=(0,m.checkIsAppPPREnabled)(ae.experimental.ppr)&&(null==(D=_.routes[ah]??_.dynamicRoutes[ah])?void 0:D.renderingMode)==="PARTIALLY_STATIC",at=!1,au=!1,av=as?N:void 0,aw=as&&aq&&!ap,ax=(0,h.getRequestMeta)(a,"segmentPrefetchRSCRequest"),ay=!am||(0,q.shouldServeStreamingMetadata)(am,ae.htmlLimitedBots);ao&&as&&(al=!1,ay=!1);let az=!0===L.isDev||!al||"string"==typeof N||aw,aA=ao&&as,aB=null;aa||!al||az||ar||av||aw||(aB=ab);let aC=aB;!aC&&L.isDev&&(aC=ab),L.isDev||aa||!al||!aq||aw||(0,k.d)(a.headers);let aD={...F,tree:I,pages:J,GlobalError:E(),handler:M,routeModule:L,__next_app__:K};Y&&Z&&(0,p.setReferenceManifestsSingleton)({page:H,clientReferenceManifest:Z,serverActionsManifest:Y,serverModuleMap:(0,r.createServerModuleMap)({serverActionsManifest:Y})});let aE=a.method||"GET",aF=(0,g.getTracer)(),aG=aF.getActiveScopeSpan();try{let f=L.getVaryHeader(ab,af);b.setHeader("Vary",f);let k=async(c,d)=>{let e=new l.NodeNextRequest(a),f=new l.NodeNextResponse(b);return L.render(e,f,d).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=aF.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==i.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${aE} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${aE} ${a.url}`)})},m=async({span:e,postponed:f,fallbackRouteParams:g})=>{let i={query:R,params:S,page:ah,sharedContext:{buildId:Q},serverComponentsHmrCache:(0,h.getRequestMeta)(a,"serverComponentsHmrCache"),fallbackRouteParams:g,renderOpts:{App:()=>null,Document:()=>null,pageConfig:{},ComponentMod:aD,Component:(0,j.T)(aD),params:S,routeModule:L,page:H,postponed:f,shouldWaitOnAllReady:aA,serveStreamingMetadata:ay,supportsDynamicResponse:"string"==typeof f||az,buildManifest:V,nextFontManifest:W,reactLoadableManifest:X,subresourceIntegrityManifest:$,serverActionsManifest:Y,clientReferenceManifest:Z,setIsrStatus:null==ad?void 0:ad.setIsrStatus,dir:c(33873).join(process.cwd(),L.relativeProjectDir),isDraftMode:aa,isRevalidate:al&&!f&&!aw,botType:an,isOnDemandRevalidate:ai,isPossibleServerAction:ar,assetPrefix:ae.assetPrefix,nextConfigOutput:ae.output,crossOrigin:ae.crossOrigin,trailingSlash:ae.trailingSlash,previewProps:_.preview,deploymentId:ae.deploymentId,enableTainting:ae.experimental.taint,htmlLimitedBots:ae.htmlLimitedBots,devtoolSegmentExplorer:ae.experimental.devtoolSegmentExplorer,reactMaxHeadersLength:ae.reactMaxHeadersLength,multiZoneDraftMode:!1,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:ae.experimental.cacheLife,basePath:ae.basePath,serverActions:ae.experimental.serverActions,...at?{nextExport:!0,supportsDynamicResponse:!1,isStaticGeneration:!0,isRevalidate:!0,isDebugDynamicAccesses:at}:{},experimental:{isRoutePPREnabled:as,expireTime:ae.expireTime,staleTimes:ae.experimental.staleTimes,cacheComponents:!!ae.experimental.cacheComponents,clientSegmentCache:!!ae.experimental.clientSegmentCache,clientParamParsing:!!ae.experimental.clientParamParsing,dynamicOnHover:!!ae.experimental.dynamicOnHover,inlineCss:!!ae.experimental.inlineCss,authInterrupts:!!ae.experimental.authInterrupts,clientTraceMetadata:ae.experimental.clientTraceMetadata||[]},waitUntil:d.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:()=>{},onInstrumentationRequestError:(b,c,d)=>L.onRequestError(a,b,d,ad),err:(0,h.getRequestMeta)(a,"invokeError"),dev:L.isDev}},l=await k(e,i),{metadata:m}=l,{cacheControl:n,headers:o={},fetchTags:p}=m;if(p&&(o[z.NEXT_CACHE_TAGS_HEADER]=p),a.fetchMetrics=m.fetchMetrics,al&&(null==n?void 0:n.revalidate)===0&&!L.isDev&&!as){let a=m.staticBailoutInfo,b=Object.defineProperty(Error(`Page changed from static to dynamic at runtime ${ab}${(null==a?void 0:a.description)?`, reason: ${a.description}`:""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),"__NEXT_ERROR_CODE",{value:"E132",enumerable:!1,configurable:!0});if(null==a?void 0:a.stack){let c=a.stack;b.stack=b.message+c.substring(c.indexOf("\n"))}throw b}return{value:{kind:w.CachedRouteKind.APP_PAGE,html:l,headers:o,rscData:m.flightData,postponed:m.postponed,status:m.statusCode,segmentData:m.segmentData},cacheControl:n}},n=async({hasResolved:c,previousCacheEntry:f,isRevalidating:g,span:i})=>{let j,k=!1===L.isDev,l=c||b.writableEnded;if(ai&&ac&&!f&&!O)return(null==ad?void 0:ad.render404)?await ad.render404(a,b):(b.statusCode=404,b.end("This page could not be found")),null;if(aj&&(j=(0,x.parseFallbackField)(aj.fallback)),j===x.FallbackMode.PRERENDER&&(0,v.isBot)(am)&&(!as||ao)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),(null==f?void 0:f.isStale)===-1&&(ai=!0),ai&&(j!==x.FallbackMode.NOT_FOUND||f)&&(j=x.FallbackMode.BLOCKING_STATIC_RENDER),!O&&j!==x.FallbackMode.BLOCKING_STATIC_RENDER&&aC&&!l&&!aa&&U&&(k||!ak)){let b;if((k||aj)&&j===x.FallbackMode.NOT_FOUND)throw new C.NoFallbackError;if(as&&!aq){let c="string"==typeof(null==aj?void 0:aj.fallback)?aj.fallback:k?ah:null;if(b=await L.handleResponse({cacheKey:c,req:a,nextConfig:ae,routeKind:e.RouteKind.APP_PAGE,isFallback:!0,prerenderManifest:_,isRoutePPREnabled:as,responseGenerator:async()=>m({span:i,postponed:void 0,fallbackRouteParams:k||au?(0,o.u)(ah):null}),waitUntil:d.waitUntil}),null===b)return null;if(b)return delete b.cacheControl,b}}let n=ai||g||!av?void 0:av;if(at&&void 0!==n)return{cacheControl:{revalidate:1,expire:void 0},value:{kind:w.CachedRouteKind.PAGES,html:y.default.EMPTY,pageData:{},headers:void 0,status:void 0}};let p=U&&as&&((0,h.getRequestMeta)(a,"renderFallbackShell")||au)?(0,o.u)(ag):null;return m({span:i,postponed:n,fallbackRouteParams:p})},p=async c=>{var f,g,i,j,k;let l,o=await L.handleResponse({cacheKey:aB,responseGenerator:a=>n({span:c,...a}),routeKind:e.RouteKind.APP_PAGE,isOnDemandRevalidate:ai,isRoutePPREnabled:as,req:a,nextConfig:ae,prerenderManifest:_,waitUntil:d.waitUntil});if(aa&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate"),L.isDev&&b.setHeader("Cache-Control","no-store, must-revalidate"),!o){if(aB)throw Object.defineProperty(Error("invariant: cache entry required but not generated"),"__NEXT_ERROR_CODE",{value:"E62",enumerable:!1,configurable:!0});return null}if((null==(f=o.value)?void 0:f.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null==(i=o.value)?void 0:i.kind}`),"__NEXT_ERROR_CODE",{value:"E707",enumerable:!1,configurable:!0});let p="string"==typeof o.value.postponed;al&&!aw&&(!p||ap)&&(O||b.setHeader("x-nextjs-cache",ai?"REVALIDATED":o.isMiss?"MISS":o.isStale?"STALE":"HIT"),b.setHeader(u.NEXT_IS_PRERENDER_HEADER,"1"));let{value:q}=o;if(av)l={revalidate:0,expire:void 0};else if(O&&aq&&!ap&&as)l={revalidate:0,expire:void 0};else if(!L.isDev)if(aa)l={revalidate:0,expire:void 0};else if(al){if(o.cacheControl)if("number"==typeof o.cacheControl.revalidate){if(o.cacheControl.revalidate<1)throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`),"__NEXT_ERROR_CODE",{value:"E22",enumerable:!1,configurable:!0});l={revalidate:o.cacheControl.revalidate,expire:(null==(j=o.cacheControl)?void 0:j.expire)??ae.expireTime}}else l={revalidate:z.CACHE_ONE_YEAR,expire:void 0}}else b.getHeader("Cache-Control")||(l={revalidate:0,expire:void 0});if(o.cacheControl=l,"string"==typeof ax&&(null==q?void 0:q.kind)===w.CachedRouteKind.APP_PAGE&&q.segmentData){b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"2");let c=null==(k=q.headers)?void 0:k[z.NEXT_CACHE_TAGS_HEADER];O&&al&&c&&"string"==typeof c&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,c);let d=q.segmentData.get(ax);return void 0!==d?(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(d,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl}):(b.statusCode=204,(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.EMPTY,cacheControl:o.cacheControl}))}let r=(0,h.getRequestMeta)(a,"onCacheEntry");if(r&&await r({...o,value:{...o.value,kind:"PAGE"}},{url:(0,h.getRequestMeta)(a,"initURL")}))return null;if(p&&av)throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"),"__NEXT_ERROR_CODE",{value:"E396",enumerable:!1,configurable:!0});if(q.headers){let a={...q.headers};for(let[c,d]of(O&&al||delete a[z.NEXT_CACHE_TAGS_HEADER],Object.entries(a)))if(void 0!==d)if(Array.isArray(d))for(let a of d)b.appendHeader(c,a);else"number"==typeof d&&(d=d.toString()),b.appendHeader(c,d)}let s=null==(g=q.headers)?void 0:g[z.NEXT_CACHE_TAGS_HEADER];if(O&&al&&s&&"string"==typeof s&&b.setHeader(z.NEXT_CACHE_TAGS_HEADER,s),!q.status||aq&&as||(b.statusCode=q.status),!O&&q.status&&G.RedirectStatusCode[q.status]&&aq&&(b.statusCode=200),p&&b.setHeader(u.NEXT_DID_POSTPONE_HEADER,"1"),aq&&!aa){if(void 0===q.rscData){if(q.postponed)throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"),"__NEXT_ERROR_CODE",{value:"E372",enumerable:!1,configurable:!0});return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:q.html,cacheControl:aw?{revalidate:0,expire:void 0}:o.cacheControl})}return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:y.default.fromStatic(q.rscData,u.RSC_CONTENT_TYPE_HEADER),cacheControl:o.cacheControl})}let t=q.html;if(!p||O||aq)return(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:o.cacheControl});if(at)return t.push(new ReadableStream({start(a){a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML),a.close()}})),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}});let v=new TransformStream;return t.push(v.readable),m({span:c,postponed:q.postponed,fallbackRouteParams:null}).then(async a=>{var b,c;if(!a)throw Object.defineProperty(Error("Invariant: expected a result to be returned"),"__NEXT_ERROR_CODE",{value:"E463",enumerable:!1,configurable:!0});if((null==(b=a.value)?void 0:b.kind)!==w.CachedRouteKind.APP_PAGE)throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null==(c=a.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E305",enumerable:!1,configurable:!0});await a.value.html.pipeTo(v.writable)}).catch(a=>{v.writable.abort(a).catch(a=>{console.error("couldn't abort transformer",a)})}),(0,B.sendRenderResult)({req:a,res:b,generateEtags:ae.generateEtags,poweredByHeader:ae.poweredByHeader,result:t,cacheControl:{revalidate:0,expire:void 0}})};if(!aG)return await aF.withPropagatedContext(a.headers,()=>aF.trace(i.BaseServerSpan.handleRequest,{spanName:`${aE} ${a.url}`,kind:g.SpanKind.SERVER,attributes:{"http.method":aE,"http.target":a.url}},p));await p(aG)}catch(b){throw b instanceof C.NoFallbackError||await L.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"render",revalidateReason:(0,f.c)({isRevalidate:al,isOnDemandRevalidate:ai})},ad),b}}},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},87273:(a,b,c)=>{Promise.resolve().then(c.t.bind(c,54160,23)),Promise.resolve().then(c.t.bind(c,31603,23)),Promise.resolve().then(c.t.bind(c,68495,23)),Promise.resolve().then(c.t.bind(c,75170,23)),Promise.resolve().then(c.t.bind(c,77526,23)),Promise.resolve().then(c.t.bind(c,78922,23)),Promise.resolve().then(c.t.bind(c,29234,23)),Promise.resolve().then(c.t.bind(c,12263,23)),Promise.resolve().then(c.bind(c,82146))},90936:(a,b,c)=>{Promise.resolve().then(c.bind(c,98990))},91608:(a,b,c)=>{Promise.resolve().then(c.bind(c,42456))},96487:()=>{},97634:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>f,metadata:()=>e});var d=c(75338);let e={title:"StreamPortal - Next-Gen Live Stream Alerts & ABA bank receipts Integration",description:"Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.",keywords:"ABA payment integration, Stream overlays, OBS alerts, live streaming donations, Telegram transaction parser, Khmer text-to-speech, donor widgets, stream automation",robots:"index, follow",icons:{icon:"/favicon.ico",shortcut:"/favicon.ico",apple:"/favicon.ico"},openGraph:{title:"StreamPortal - Live Stream Alerts & ABA Sync",description:"Synchronize your ABA bank transactions and Telegram receipts directly with OBS stream overlays in real-time. Setup live alert widgets, AI Khmer/English voiceovers, and customized supporter leaderboards.",type:"website",url:"http://localhost:3000",siteName:"StreamPortal"}};function f({children:a}){return(0,d.jsxs)("html",{lang:"en",children:[(0,d.jsxs)("head",{children:[(0,d.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,d.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,d.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",rel:"stylesheet"}),(0,d.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"})]}),(0,d.jsx)("body",{children:a})]})}},98990:(a,b,c)=>{"use strict";c.r(b),c.d(b,{default:()=>d});let d=(0,c(97954).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/hochenheng/Desktop/StreamIntergration/src/app/dashboard/overview/page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/hochenheng/Desktop/StreamIntergration/src/app/dashboard/overview/page.js","default")}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[331,792],()=>b(b.s=65381));module.exports=c})();