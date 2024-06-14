import{s as pe,n as oe,o as ve}from"./scheduler.BEdpU-Bp.js";import{S as we,i as be,e as U,s as I,t as W,c as j,B as ee,f as M,a as z,b as q,d as C,r as ae,g as B,h as p,j as te}from"./index.DIK9U9iT.js";import{_ as de}from"./preload-helper.D6kgxu3v.js";/*! Capacitor: https://capacitorjs.com/ - MIT License */const Pe=t=>{const e=new Map;e.set("web",{name:"web"});const r=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},a=(n,l)=>{r.platforms.set(n,l)},o=n=>{r.platforms.has(n)&&(r.currentPlatform=r.platforms.get(n))};return r.addPlatform=a,r.setPlatform=o,r},ye=t=>t.CapacitorPlatforms=Pe(t),ue=ye(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});ue.addPlatform;ue.setPlatform;var R;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(R||(R={}));class re extends Error{constructor(e,r,a){super(e),this.message=e,this.code=r,this.data=a}}const Ce=t=>{var e,r;return t!=null&&t.androidBridge?"android":!((r=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},Ee=t=>{var e,r,a,o,n;const l=t.CapacitorCustomPlatform||null,s=t.Capacitor||{},u=s.Plugins=s.Plugins||{},d=t.CapacitorPlatforms,E=()=>l!==null?l.name:Ce(t),g=((e=d==null?void 0:d.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||E,S=()=>g()!=="web",H=((r=d==null?void 0:d.currentPlatform)===null||r===void 0?void 0:r.isNativePlatform)||S,L=i=>{const c=$.get(i);return!!(c!=null&&c.platforms.has(g())||O(i))},D=((a=d==null?void 0:d.currentPlatform)===null||a===void 0?void 0:a.isPluginAvailable)||L,x=i=>{var c;return(c=s.PluginHeaders)===null||c===void 0?void 0:c.find(m=>m.name===i)},O=((o=d==null?void 0:d.currentPlatform)===null||o===void 0?void 0:o.getPluginHeader)||x,G=i=>t.console.error(i),_=(i,c,m)=>Promise.reject(`${m} does not have an implementation of "${c}".`),$=new Map,T=(i,c={})=>{const m=$.get(i);if(m)return console.warn(`Capacitor plugin "${i}" already registered. Cannot register plugins twice.`),m.proxy;const v=g(),b=O(i);let y;const me=async()=>(!y&&v in c?y=typeof c[v]=="function"?y=await c[v]():y=c[v]:l!==null&&!y&&"web"in c&&(y=typeof c.web=="function"?y=await c.web():y=c.web),y),he=(f,h)=>{var P,k;if(b){const A=b==null?void 0:b.methods.find(w=>h===w.name);if(A)return A.rtype==="promise"?w=>s.nativePromise(i,h.toString(),w):(w,K)=>s.nativeCallback(i,h.toString(),w,K);if(f)return(P=f[h])===null||P===void 0?void 0:P.bind(f)}else{if(f)return(k=f[h])===null||k===void 0?void 0:k.bind(f);throw new re(`"${i}" plugin is not implemented on ${v}`,R.Unimplemented)}},Z=f=>{let h;const P=(...k)=>{const A=me().then(w=>{const K=he(w,f);if(K){const V=K(...k);return h=V==null?void 0:V.remove,V}else throw new re(`"${i}.${f}()" is not implemented on ${v}`,R.Unimplemented)});return f==="addListener"&&(A.remove=async()=>h()),A};return P.toString=()=>`${f.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:f,writable:!1,configurable:!1}),P},ne=Z("addListener"),se=Z("removeListener"),ge=(f,h)=>{const P=ne({eventName:f},h),k=async()=>{const w=await P;se({eventName:f,callbackId:w},h)},A=new Promise(w=>P.then(()=>w({remove:k})));return A.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await k()},A},N=new Proxy({},{get(f,h){switch(h){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return b?ge:ne;case"removeListener":return se;default:return Z(h)}}});return u[i]=N,$.set(i,{name:i,proxy:N,platforms:new Set([...Object.keys(c),...b?[v]:[]])}),N},F=((n=d==null?void 0:d.currentPlatform)===null||n===void 0?void 0:n.registerPlugin)||T;return s.convertFileSrc||(s.convertFileSrc=i=>i),s.getPlatform=g,s.handleError=G,s.isNativePlatform=H,s.isPluginAvailable=D,s.pluginMethodNoop=_,s.registerPlugin=F,s.Exception=re,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},Le=t=>t.Capacitor=Ee(t),J=Le(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Q=J.registerPlugin;J.Plugins;class fe{constructor(e){this.listeners={},this.retainedEventArguments={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,r){let a=!1;this.listeners[e]||(this.listeners[e]=[],a=!0),this.listeners[e].push(r);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n),a&&this.sendRetainedArgumentsForEvent(e);const l=async()=>this.removeListener(e,r);return Promise.resolve({remove:l})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,r,a){const o=this.listeners[e];if(!o){if(a){let n=this.retainedEventArguments[e];n||(n=[]),n.push(r),this.retainedEventArguments[e]=n}return}o.forEach(n=>n(r))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,r){this.windowListeners[r]={registered:!1,windowEventName:e,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(e="not implemented"){return new J.Exception(e,R.Unimplemented)}unavailable(e="not available"){return new J.Exception(e,R.Unavailable)}async removeListener(e,r){const a=this.listeners[e];if(!a)return;const o=a.indexOf(r);this.listeners[e].splice(o,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const r=this.retainedEventArguments[e];r&&(delete this.retainedEventArguments[e],r.forEach(a=>{this.notifyListeners(e,a)}))}}const ie=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),le=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class _e extends fe{async getCookies(){const e=document.cookie,r={};return e.split(";").forEach(a=>{if(a.length<=0)return;let[o,n]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");o=le(o).trim(),n=le(n).trim(),r[o]=n}),r}async setCookie(e){try{const r=ie(e.key),a=ie(e.value),o=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),l=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${r}=${a||""}${o}; path=${n}; ${l};`}catch(r){return Promise.reject(r)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(r){return Promise.reject(r)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const r of e)document.cookie=r.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Q("CapacitorCookies",{web:()=>new _e});const ke=async t=>new Promise((e,r)=>{const a=new FileReader;a.onload=()=>{const o=a.result;e(o.indexOf(",")>=0?o.split(",")[1]:o)},a.onerror=o=>r(o),a.readAsDataURL(t)}),Ae=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(o=>o.toLocaleLowerCase()).reduce((o,n,l)=>(o[n]=t[e[l]],o),{})},xe=(t,e=!0)=>t?Object.entries(t).reduce((a,o)=>{const[n,l]=o;let s,u;return Array.isArray(l)?(u="",l.forEach(d=>{s=e?encodeURIComponent(d):d,u+=`${n}=${s}&`}),u.slice(0,-1)):(s=e?encodeURIComponent(l):l,u=`${n}=${s}`),`${a}&${u}`},"").substr(1):null,Oe=(t,e={})=>{const r=Object.assign({method:t.method||"GET",headers:t.headers},e),o=Ae(t.headers)["content-type"]||"";if(typeof t.data=="string")r.body=t.data;else if(o.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[l,s]of Object.entries(t.data||{}))n.set(l,s);r.body=n.toString()}else if(o.includes("multipart/form-data")||t.data instanceof FormData){const n=new FormData;if(t.data instanceof FormData)t.data.forEach((s,u)=>{n.append(u,s)});else for(const s of Object.keys(t.data))n.append(s,t.data[s]);r.body=n;const l=new Headers(r.headers);l.delete("content-type"),r.headers=l}else(o.includes("application/json")||typeof t.data=="object")&&(r.body=JSON.stringify(t.data));return r};class $e extends fe{async request(e){const r=Oe(e,e.webFetchExtra),a=xe(e.params,e.shouldEncodeUrlParams),o=a?`${e.url}?${a}`:e.url,n=await fetch(o,r),l=n.headers.get("content-type")||"";let{responseType:s="text"}=n.ok?e:{};l.includes("application/json")&&(s="json");let u,d;switch(s){case"arraybuffer":case"blob":d=await n.blob(),u=await ke(d);break;case"json":u=await n.json();break;case"document":case"text":default:u=await n.text()}const E={};return n.headers.forEach((g,S)=>{E[S]=g}),{data:u,headers:E,status:n.status,url:n.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Q("CapacitorHttp",{web:()=>new $e});const Te=Q("Geolocation",{web:()=>de(()=>import("./web.yaIi1pG0.js"),[],import.meta.url).then(t=>new t.GeolocationWeb)});var X;(function(t){t.Documents="DOCUMENTS",t.Data="DATA",t.Library="LIBRARY",t.Cache="CACHE",t.External="EXTERNAL",t.ExternalStorage="EXTERNAL_STORAGE"})(X||(X={}));var Y;(function(t){t.UTF8="utf8",t.ASCII="ascii",t.UTF16="utf16"})(Y||(Y={}));const ce=Q("Filesystem",{web:()=>de(()=>import("./web.CyDRByJT.js"),[],import.meta.url).then(t=>new t.FilesystemWeb)});function Ue(t){let e,r="capacitor é lindo e maravilhoso",a,o,n,l,s,u,d="Geolocation",E,g,S="Your location is:",H,L,D,x=(t[1]?t[1].coords.latitude:"Getting location...")+"",O,G,_,$,T=(t[1]?t[1].coords.longitude:"Getting location...")+"",F;return{c(){e=U("h1"),e.textContent=r,a=I(),o=U("h1"),n=W(t[0]),l=I(),s=U("div"),u=U("h2"),u.textContent=d,E=I(),g=U("p"),g.textContent=S,H=I(),L=U("p"),D=W("Latitude: "),O=W(x),G=I(),_=U("p"),$=W("Longitude: "),F=W(T),this.h()},l(i){e=j(i,"H1",{class:!0,"data-svelte-h":!0}),ee(e)!=="svelte-ikdkvf"&&(e.textContent=r),a=M(i),o=j(i,"H1",{class:!0});var c=z(o);n=q(c,t[0]),c.forEach(C),l=M(i),s=j(i,"DIV",{});var m=z(s);u=j(m,"H2",{"data-svelte-h":!0}),ee(u)!=="svelte-ek87pk"&&(u.textContent=d),E=M(m),g=j(m,"P",{"data-svelte-h":!0}),ee(g)!=="svelte-1pbtnpc"&&(g.textContent=S),H=M(m),L=j(m,"P",{});var v=z(L);D=q(v,"Latitude: "),O=q(v,x),v.forEach(C),G=M(m),_=j(m,"P",{});var b=z(_);$=q(b,"Longitude: "),F=q(b,T),b.forEach(C),m.forEach(C),this.h()},h(){ae(e,"class","svelte-riunkd"),ae(o,"class","svelte-riunkd")},m(i,c){B(i,e,c),B(i,a,c),B(i,o,c),p(o,n),B(i,l,c),B(i,s,c),p(s,u),p(s,E),p(s,g),p(s,H),p(s,L),p(L,D),p(L,O),p(s,G),p(s,_),p(_,$),p(_,F)},p(i,[c]){c&1&&te(n,i[0]),c&2&&x!==(x=(i[1]?i[1].coords.latitude:"Getting location...")+"")&&te(O,x),c&2&&T!==(T=(i[1]?i[1].coords.longitude:"Getting location...")+"")&&te(F,T)},i:oe,o:oe,d(i){i&&(C(e),C(a),C(o),C(l),C(s))}}}function je(t,e,r){let a,o;async function n(){let l;try{return l=await ce.readFile({path:"dummy.txt",directory:X.Data,encoding:Y.UTF8}),r(0,a=l.data),l}catch{await ce.writeFile({path:"dummy.txt",data:"This is a dummy text file.",directory:X.Data,encoding:Y.UTF8}),n()}}return ve(async()=>{n(),Te.watchPosition({},l=>r(1,o=l))}),[a,o]}class He extends we{constructor(e){super(),be(this,e,je,Ue,pe,{})}}export{Y as E,He as P,fe as W,Oe as b};
