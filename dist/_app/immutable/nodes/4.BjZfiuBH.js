import{s as ne,e as y,a as I,t as F,c as w,b as E,g as C,d as M,f as d,l as D,i as q,h as $,j as N,m as ee,k as J,o as ae,p as oe,n as T,q as K,r as se}from"../chunks/scheduler.C25rSTt5.js";import{S as ie,i as fe,c as L,a as P,m as S,t as b,b as v,e as H,d as V,g as R}from"../chunks/index.CiCksDGq.js";import{e as z}from"../chunks/each.D6YF6ztN.js";import{g as O}from"../chunks/entry.-gmNHL0Z.js";import{p as ce}from"../chunks/stores.Xb1PqaOM.js";import{d as U}from"../chunks/stores.Dsg8gpKN.js";import{U as ue,F as te,b as pe,c as he,d as me}from"../chunks/fa-layers-text.svelte_svelte_type_style_lang.BHyglE-l.js";import{b as de}from"../chunks/index.Bt-Xh7oU.js";import{L as _e,B as re}from"../chunks/Text.1a_6ePl2.js";import{D as ge}from"../chunks/Divider.Cfmx9mgf.js";function Q(s,e,t){const r=s.slice();return r[6]=e[t],r}function W(s,e,t){const r=s.slice();return r[9]=e[t],r}function $e(s){let e,t;return e=new te({props:{icon:pe,size:"1.2x"}}),{c(){L(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,n){S(e,r,n),t=!0},p:T,i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){V(e,r)}}}function X(s){let e,t,r;return t=new _e({props:{color:"gray"}}),{c(){e=y("div"),L(t.$$.fragment),this.h()},l(n){e=w(n,"DIV",{class:!0});var a=E(e);P(t.$$.fragment,a),a.forEach(d),this.h()},h(){D(e,"class","loader svelte-13b0dqh")},m(n,a){q(n,e,a),S(t,e,null),r=!0},i(n){r||(b(t.$$.fragment,n),r=!0)},o(n){v(t.$$.fragment,n),r=!1},d(n){n&&d(e),V(t)}}}function be(s){let e,t,r=z(s[6].textItems),n=[];for(let a=0;a<r.length;a+=1)n[a]=Y(W(s,r,a));return{c(){e=y("div");for(let a=0;a<n.length;a+=1)n[a].c();t=I(),this.h()},l(a){e=w(a,"DIV",{class:!0});var l=E(e);for(let o=0;o<n.length;o+=1)n[o].l(l);t=C(l),l.forEach(d),this.h()},h(){D(e,"class","textContainer svelte-13b0dqh")},m(a,l){q(a,e,l);for(let o=0;o<n.length;o+=1)n[o]&&n[o].m(e,null);$(e,t)},p(a,l){if(l&2){r=z(a[6].textItems);let o;for(o=0;o<r.length;o+=1){const i=W(a,r,o);n[o]?n[o].p(i,l):(n[o]=Y(i),n[o].c(),n[o].m(e,t))}for(;o<n.length;o+=1)n[o].d(1);n.length=r.length}},i:T,o:T,d(a){a&&d(e),ee(n,a)}}}function ve(s){let e,t,r,n;return t=new re({props:{ripple:!0,override:{background:"transparent !important",color:s[6].color?s[6].color:"inherit",padding:"5px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left",gap:"10px","&:hover":{background:"transparent"}},$$slots:{default:[we]},$$scope:{ctx:s}}}),t.$on("click",function(){se(s[6].on.click)&&s[6].on.click.apply(this,arguments)}),{c(){e=y("div"),L(t.$$.fragment),r=I(),this.h()},l(a){e=w(a,"DIV",{class:!0});var l=E(e);P(t.$$.fragment,l),r=C(l),l.forEach(d),this.h()},h(){D(e,"class","buttonContainer")},m(a,l){q(a,e,l),S(t,e,null),$(e,r),n=!0},p(a,l){s=a;const o={};l&2&&(o.override={background:"transparent !important",color:s[6].color?s[6].color:"inherit",padding:"5px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left",gap:"10px","&:hover":{background:"transparent"}}),l&4098&&(o.$$scope={dirty:l,ctx:s}),t.$set(o)},i(a){n||(b(t.$$.fragment,a),n=!0)},o(a){v(t.$$.fragment,a),n=!1},d(a){a&&d(e),V(t)}}}function ke(s){let e,t;return e=new ge({props:{color:"grey"}}),{c(){L(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,n){S(e,r,n),t=!0},p:T,i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){V(e,r)}}}function ye(s){let e,t;return e=new re({props:{ripple:!0,override:{background:"transparent !important",color:"inherit",padding:"5px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left","&:hover":{background:"transparent"}},$$slots:{default:[Ee]},$$scope:{ctx:s}}}),{c(){L(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,n){S(e,r,n),t=!0},p(r,n){const a={};n&4098&&(a.$$scope={dirty:n,ctx:r}),e.$set(a)},i(r){t||(b(e.$$.fragment,r),t=!0)},o(r){v(e.$$.fragment,r),t=!1},d(r){V(e,r)}}}function Y(s){let e,t=s[9]+"",r;return{c(){e=y("p"),r=F(t),this.h()},l(n){e=w(n,"P",{class:!0});var a=E(e);r=M(a,t),a.forEach(d),this.h()},h(){D(e,"class","svelte-13b0dqh")},m(n,a){q(n,e,a),$(e,r)},p(n,a){a&2&&t!==(t=n[9]+"")&&N(r,t)},d(n){n&&d(e)}}}function we(s){let e,t,r=s[6].label+"",n,a;return e=new te({props:{icon:s[6].icon,size:"1.2x"}}),{c(){L(e.$$.fragment),t=I(),n=F(r)},l(l){P(e.$$.fragment,l),t=C(l),n=M(l,r)},m(l,o){S(e,l,o),q(l,t,o),q(l,n,o),a=!0},p(l,o){const i={};o&2&&(i.icon=l[6].icon),e.$set(i),(!a||o&2)&&r!==(r=l[6].label+"")&&N(n,r)},i(l){a||(b(e.$$.fragment,l),a=!0)},o(l){v(e.$$.fragment,l),a=!1},d(l){l&&(d(t),d(n)),V(e,l)}}}function Ee(s){let e,t,r=s[6].label+"",n,a,l,o=s[6].value+"",i,c;return{c(){e=y("div"),t=y("label"),n=F(r),a=I(),l=y("p"),i=F(o),c=I(),this.h()},l(p){e=w(p,"DIV",{class:!0});var _=E(e);t=w(_,"LABEL",{class:!0});var x=E(t);n=M(x,r),x.forEach(d),a=C(_),l=w(_,"P",{class:!0});var m=E(l);i=M(m,o),m.forEach(d),_.forEach(d),c=C(p),this.h()},h(){D(t,"class","svelte-13b0dqh"),D(l,"class","svelte-13b0dqh"),D(e,"class","inputContainer svelte-13b0dqh")},m(p,_){q(p,e,_),$(e,t),$(t,n),$(e,a),$(e,l),$(l,i),q(p,c,_)},p(p,_){_&2&&r!==(r=p[6].label+"")&&N(n,r),_&2&&o!==(o=p[6].value+"")&&N(i,o)},d(p){p&&(d(e),d(c))}}}function Z(s){let e,t,r,n;const a=[ye,ke,ve,be],l=[];function o(i,c){return i[6].type==="input"?0:i[6].type==="divider"?1:i[6].type==="button"?2:i[6].type==="text"?3:-1}return~(e=o(s))&&(t=l[e]=a[e](s)),{c(){t&&t.c(),r=K()},l(i){t&&t.l(i),r=K()},m(i,c){~e&&l[e].m(i,c),q(i,r,c),n=!0},p(i,c){let p=e;e=o(i),e===p?~e&&l[e].p(i,c):(t&&(R(),v(l[p],1,1,()=>{l[p]=null}),H()),~e?(t=l[e],t?t.p(i,c):(t=l[e]=a[e](i),t.c()),b(t,1),t.m(r.parentNode,r)):t=null)},i(i){n||(b(t),n=!0)},o(i){v(t),n=!1},d(i){i&&d(r),~e&&l[e].d(i)}}}function De(s){var G;let e,t,r,n,a,l,o=((G=s[0])==null?void 0:G.name)+"",i,c,p,_,x;r=new ue({props:{$$slots:{default:[$e]},$$scope:{ctx:s}}}),r.$on("click",s[2]);let m=s[1][0].type=="loading"&&X(),B=z(s[1]),u=[];for(let f=0;f<B.length;f+=1)u[f]=Z(Q(s,B,f));const le=f=>v(u[f],1,1,()=>{u[f]=null});return{c(){e=y("main"),t=y("div"),L(r.$$.fragment),n=I(),a=y("p"),l=F("Settings for "),i=F(o),c=I(),m&&m.c(),p=I(),_=y("div");for(let f=0;f<u.length;f+=1)u[f].c();this.h()},l(f){e=w(f,"MAIN",{});var h=E(e);t=w(h,"DIV",{class:!0});var k=E(t);P(r.$$.fragment,k),n=C(k),a=w(k,"P",{class:!0});var A=E(a);l=M(A,"Settings for "),i=M(A,o),A.forEach(d),k.forEach(d),c=C(h),m&&m.l(h),p=C(h),_=w(h,"DIV",{class:!0});var g=E(_);for(let j=0;j<u.length;j+=1)u[j].l(g);g.forEach(d),h.forEach(d),this.h()},h(){D(a,"class","svelte-13b0dqh"),D(t,"class","header svelte-13b0dqh"),D(_,"class","settingsContainer svelte-13b0dqh")},m(f,h){q(f,e,h),$(e,t),S(r,t,null),$(t,n),$(t,a),$(a,l),$(a,i),$(e,c),m&&m.m(e,null),$(e,p),$(e,_);for(let k=0;k<u.length;k+=1)u[k]&&u[k].m(_,null);x=!0},p(f,[h]){var A;const k={};if(h&4096&&(k.$$scope={dirty:h,ctx:f}),r.$set(k),(!x||h&1)&&o!==(o=((A=f[0])==null?void 0:A.name)+"")&&N(i,o),f[1][0].type=="loading"?m?h&2&&b(m,1):(m=X(),m.c(),b(m,1),m.m(e,p)):m&&(R(),v(m,1,1,()=>{m=null}),H()),h&2){B=z(f[1]);let g;for(g=0;g<B.length;g+=1){const j=Q(f,B,g);u[g]?(u[g].p(j,h),b(u[g],1)):(u[g]=Z(j),u[g].c(),b(u[g],1),u[g].m(_,null))}for(R(),g=B.length;g<u.length;g+=1)le(g);H()}},i(f){if(!x){b(r.$$.fragment,f),b(m);for(let h=0;h<B.length;h+=1)b(u[h]);x=!0}},o(f){v(r.$$.fragment,f),v(m),u=u.filter(Boolean);for(let h=0;h<u.length;h+=1)v(u[h]);x=!1},d(f){f&&d(e),V(r),m&&m.d(),ee(u,f)}}}function qe(s,e,t){let r,n;J(s,U,c=>t(4,r=c)),J(s,ce,c=>t(5,n=c));let a,l="loading",o=[{type:"loading"}];ae(async()=>{a=n.url.searchParams.get("id"),t(0,l=r.find(c=>c.id===a)),U.subscribe(c=>{t(0,l=c.find(p=>p.id===a))}),await new Promise(c=>{setTimeout(()=>{c()},1e3)}),t(1,o=[{type:"input",label:"Name",hex:"0x06",value:l==null?void 0:l.name},{type:"input",label:"Serial Packet Delay",hex:"0x05",value:(l==null?void 0:l.serialDelay)||10},{type:"input",label:"BLE Tx Power Level",hex:"0x07",value:(l==null?void 0:l.bleStrength)||"9 dBm"},{type:"divider"},{type:"button",label:"Disconnect",color:"#f78385",icon:he},{type:"button",label:"Remove device",color:"#f78385",icon:me,on:{click:()=>{U.update(c=>c.filter(p=>p.id!==a)),O("/")}}},{type:"divider"},{type:"text",textItems:[`Mac: ${l==null?void 0:l.id}`,"Firmware: 1.0.0","Hardware: 1.0.0",`Status: ${l==null?void 0:l.status}`,`Batch: ${(l==null?void 0:l.batch)||1}`]}])}),oe(()=>{t(1,o=[{type:"loading"}])});const i=()=>{history.back()};return s.$$.update=()=>{s.$$.dirty&1&&(!l||(l==null?void 0:l.status)!=="connected")&&de&&l!=="loading"&&O("/")},[l,o,i]}class Fe extends ie{constructor(e){super(),fe(this,e,qe,De,ne,{})}}export{Fe as component};