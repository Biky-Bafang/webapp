import{s as ie,e as E,a as C,t as I,c as D,b as q,g as L,d as S,f as d,l as P,i as w,h as b,j as R,m as ne,k as W,o as se,p as fe,n as z,q as M,r as ce}from"../chunks/scheduler.fYnF1vvb.js";import{S as ue,i as pe,c as A,a as N,m as V,t as k,b as y,d as T,e as x,g as U}from"../chunks/index.DJT61aYF.js";import{e as H,d as G}from"../chunks/stores.Db1ftiGr.js";import{g as J}from"../chunks/entry.C-lMzAXr.js";import{p as me}from"../chunks/stores.Cvy8b0xV.js";import{U as _e,F as O,f as de,a as he,b as ge,c as $e,d as be}from"../chunks/fa-layers-text.svelte_svelte_type_style_lang.BBHNjSsf.js";import{b as ve}from"../chunks/index.Bt-Xh7oU.js";import{s as K,r as X,f as ke}from"../chunks/general.DoX4PpbT.js";import{L as ye,B as oe}from"../chunks/Text.DtU0wkto.js";import{D as we}from"../chunks/Divider.CEdhS-gi.js";function Y(i,e,t){const l=i.slice();return l[7]=e[t],l}function Z(i,e,t){const l=i.slice();return l[10]=e[t],l}function Be(i){let e,t;return e=new O({props:{icon:de,size:"1.2x"}}),{c(){A(e.$$.fragment)},l(l){N(e.$$.fragment,l)},m(l,r){V(e,l,r),t=!0},p:z,i(l){t||(k(e.$$.fragment,l),t=!0)},o(l){y(e.$$.fragment,l),t=!1},d(l){x(e,l)}}}function ee(i){let e,t,l;return t=new ye({props:{color:"gray"}}),{c(){e=E("div"),A(t.$$.fragment),this.h()},l(r){e=D(r,"DIV",{class:!0});var o=q(e);N(t.$$.fragment,o),o.forEach(d),this.h()},h(){P(e,"class","loader svelte-10pq0i6")},m(r,o){w(r,e,o),V(t,e,null),l=!0},i(r){l||(k(t.$$.fragment,r),l=!0)},o(r){y(t.$$.fragment,r),l=!1},d(r){r&&d(e),x(t)}}}function Ee(i){let e,t,l=H(i[7].textItems),r=[];for(let o=0;o<l.length;o+=1)r[o]=te(Z(i,l,o));return{c(){e=E("div");for(let o=0;o<r.length;o+=1)r[o].c();t=C(),this.h()},l(o){e=D(o,"DIV",{class:!0});var n=q(e);for(let a=0;a<r.length;a+=1)r[a].l(n);t=L(n),n.forEach(d),this.h()},h(){P(e,"class","textContainer svelte-10pq0i6")},m(o,n){w(o,e,n);for(let a=0;a<r.length;a+=1)r[a]&&r[a].m(e,null);b(e,t)},p(o,n){if(n&2){l=H(o[7].textItems);let a;for(a=0;a<l.length;a+=1){const c=Z(o,l,a);r[a]?r[a].p(c,n):(r[a]=te(c),r[a].c(),r[a].m(e,t))}for(;a<r.length;a+=1)r[a].d(1);r.length=l.length}},i:z,o:z,d(o){o&&d(e),ne(r,o)}}}function De(i){let e,t,l,r;return t=new oe({props:{ripple:!0,override:{background:"transparent !important",color:i[7].color?i[7].color:"inherit",padding:"5px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left",gap:"10px","&:hover":{background:"transparent"}},$$slots:{default:[Le]},$$scope:{ctx:i}}}),t.$on("click",function(){ce(i[7].on.click)&&i[7].on.click.apply(this,arguments)}),{c(){e=E("div"),A(t.$$.fragment),l=C(),this.h()},l(o){e=D(o,"DIV",{class:!0});var n=q(e);N(t.$$.fragment,n),l=L(n),n.forEach(d),this.h()},h(){P(e,"class","buttonContainer")},m(o,n){w(o,e,n),V(t,e,null),b(e,l),r=!0},p(o,n){i=o;const a={};n&2&&(a.override={background:"transparent !important",color:i[7].color?i[7].color:"inherit",padding:"5px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left",gap:"10px","&:hover":{background:"transparent"}}),n&8194&&(a.$$scope={dirty:n,ctx:i}),t.$set(a)},i(o){r||(k(t.$$.fragment,o),r=!0)},o(o){y(t.$$.fragment,o),r=!1},d(o){o&&d(e),x(t)}}}function qe(i){let e,t;return e=new we({props:{color:"grey"}}),{c(){A(e.$$.fragment)},l(l){N(e.$$.fragment,l)},m(l,r){V(e,l,r),t=!0},p:z,i(l){t||(k(e.$$.fragment,l),t=!0)},o(l){y(e.$$.fragment,l),t=!1},d(l){x(e,l)}}}function Pe(i){let e,t;function l(){return i[4](i[7])}return e=new oe({props:{ripple:!0,override:{background:"transparent !important",color:"inherit",padding:"5px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left","&:hover":{background:"transparent"}},$$slots:{default:[Se]},$$scope:{ctx:i}}}),e.$on("click",l),{c(){A(e.$$.fragment)},l(r){N(e.$$.fragment,r)},m(r,o){V(e,r,o),t=!0},p(r,o){i=r;const n={};o&8194&&(n.$$scope={dirty:o,ctx:i}),e.$set(n)},i(r){t||(k(e.$$.fragment,r),t=!0)},o(r){y(e.$$.fragment,r),t=!1},d(r){x(e,r)}}}function te(i){let e,t=i[10]+"",l;return{c(){e=E("p"),l=I(t),this.h()},l(r){e=D(r,"P",{class:!0});var o=q(e);l=S(o,t),o.forEach(d),this.h()},h(){P(e,"class","svelte-10pq0i6")},m(r,o){w(r,e,o),b(e,l)},p(r,o){o&2&&t!==(t=r[10]+"")&&R(l,t)},d(r){r&&d(e)}}}function Ce(i){let e,t;return e=new O({props:{icon:i[7].icon,size:"1.2x"}}),{c(){A(e.$$.fragment)},l(l){N(e.$$.fragment,l)},m(l,r){V(e,l,r),t=!0},p(l,r){const o={};r&2&&(o.icon=l[7].icon),e.$set(o)},i(l){t||(k(e.$$.fragment,l),t=!0)},o(l){y(e.$$.fragment,l),t=!1},d(l){x(e,l)}}}function Ie(i){let e,t;return e=new O({props:{icon:be,pulse:!0,size:"1.2x"}}),{c(){A(e.$$.fragment)},l(l){N(e.$$.fragment,l)},m(l,r){V(e,l,r),t=!0},p:z,i(l){t||(k(e.$$.fragment,l),t=!0)},o(l){y(e.$$.fragment,l),t=!1},d(l){x(e,l)}}}function le(i){let e,t,l=i[7].information+"",r,o;return{c(){e=E("span"),t=I("("),r=I(l),o=I(")"),this.h()},l(n){e=D(n,"SPAN",{class:!0});var a=q(e);t=S(a,"("),r=S(a,l),o=S(a,")"),a.forEach(d),this.h()},h(){P(e,"class","info svelte-10pq0i6")},m(n,a){w(n,e,a),b(e,t),b(e,r),b(e,o)},p(n,a){a&2&&l!==(l=n[7].information+"")&&R(r,l)},d(n){n&&d(e)}}}function Le(i){let e,t,l,r=i[7].label+"",o,n,a,c;const g=[Ie,Ce],s=[];function m(f,$){return f[7].loading?0:1}e=m(i),t=s[e]=g[e](i);let _=i[7].information&&le(i);return{c(){t.c(),l=C(),o=I(r),n=C(),_&&_.c(),a=M()},l(f){t.l(f),l=L(f),o=S(f,r),n=L(f),_&&_.l(f),a=M()},m(f,$){s[e].m(f,$),w(f,l,$),w(f,o,$),w(f,n,$),_&&_.m(f,$),w(f,a,$),c=!0},p(f,$){let u=e;e=m(f),e===u?s[e].p(f,$):(U(),y(s[u],1,1,()=>{s[u]=null}),T(),t=s[e],t?t.p(f,$):(t=s[e]=g[e](f),t.c()),k(t,1),t.m(l.parentNode,l)),(!c||$&2)&&r!==(r=f[7].label+"")&&R(o,r),f[7].information?_?_.p(f,$):(_=le(f),_.c(),_.m(a.parentNode,a)):_&&(_.d(1),_=null)},i(f){c||(k(t),c=!0)},o(f){y(t),c=!1},d(f){f&&(d(l),d(o),d(n),d(a)),s[e].d(f),_&&_.d(f)}}}function Se(i){let e,t,l=i[7].label+"",r,o,n,a=i[7].value+"",c,g;return{c(){e=E("div"),t=E("label"),r=I(l),o=C(),n=E("p"),c=I(a),g=C(),this.h()},l(s){e=D(s,"DIV",{class:!0});var m=q(e);t=D(m,"LABEL",{class:!0});var _=q(t);r=S(_,l),_.forEach(d),o=L(m),n=D(m,"P",{class:!0});var f=q(n);c=S(f,a),f.forEach(d),m.forEach(d),g=L(s),this.h()},h(){P(t,"class","svelte-10pq0i6"),P(n,"class","svelte-10pq0i6"),P(e,"class","inputContainer svelte-10pq0i6")},m(s,m){w(s,e,m),b(e,t),b(t,r),b(e,o),b(e,n),b(n,c),w(s,g,m)},p(s,m){m&2&&l!==(l=s[7].label+"")&&R(r,l),m&2&&a!==(a=s[7].value+"")&&R(c,a)},d(s){s&&(d(e),d(g))}}}function re(i){let e,t,l,r;const o=[Pe,qe,De,Ee],n=[];function a(c,g){return c[7].type==="input"?0:c[7].type==="divider"?1:c[7].type==="button"?2:c[7].type==="text"?3:-1}return~(e=a(i))&&(t=n[e]=o[e](i)),{c(){t&&t.c(),l=M()},l(c){t&&t.l(c),l=M()},m(c,g){~e&&n[e].m(c,g),w(c,l,g),r=!0},p(c,g){let s=e;e=a(c),e===s?~e&&n[e].p(c,g):(t&&(U(),y(n[s],1,1,()=>{n[s]=null}),T()),~e?(t=n[e],t?t.p(c,g):(t=n[e]=o[e](c),t.c()),k(t,1),t.m(l.parentNode,l)):t=null)},i(c){r||(k(t),r=!0)},o(c){y(t),r=!1},d(c){c&&d(l),~e&&n[e].d(c)}}}function Ae(i){var Q;let e,t,l,r,o,n,a=((Q=i[0])==null?void 0:Q.name)+"",c,g,s,m,_;l=new _e({props:{$$slots:{default:[Be]},$$scope:{ctx:i}}}),l.$on("click",i[3]);let f=i[1][0].type=="loading"&&ee(),$=H(i[1]),u=[];for(let p=0;p<$.length;p+=1)u[p]=re(Y(i,$,p));const ae=p=>y(u[p],1,1,()=>{u[p]=null});return{c(){e=E("main"),t=E("div"),A(l.$$.fragment),r=C(),o=E("p"),n=I("Settings for "),c=I(a),g=C(),f&&f.c(),s=C(),m=E("div");for(let p=0;p<u.length;p+=1)u[p].c();this.h()},l(p){e=D(p,"MAIN",{});var h=q(e);t=D(h,"DIV",{class:!0});var B=q(t);N(l.$$.fragment,B),r=L(B),o=D(B,"P",{class:!0});var j=q(o);n=S(j,"Settings for "),c=S(j,a),j.forEach(d),B.forEach(d),g=L(h),f&&f.l(h),s=L(h),m=D(h,"DIV",{class:!0});var v=q(m);for(let F=0;F<u.length;F+=1)u[F].l(v);v.forEach(d),h.forEach(d),this.h()},h(){P(o,"class","svelte-10pq0i6"),P(t,"class","header svelte-10pq0i6"),P(m,"class","settingsContainer svelte-10pq0i6")},m(p,h){w(p,e,h),b(e,t),V(l,t,null),b(t,r),b(t,o),b(o,n),b(o,c),b(e,g),f&&f.m(e,null),b(e,s),b(e,m);for(let B=0;B<u.length;B+=1)u[B]&&u[B].m(m,null);_=!0},p(p,[h]){var j;const B={};if(h&8192&&(B.$$scope={dirty:h,ctx:p}),l.$set(B),(!_||h&1)&&a!==(a=((j=p[0])==null?void 0:j.name)+"")&&R(c,a),p[1][0].type=="loading"?f?h&2&&k(f,1):(f=ee(),f.c(),k(f,1),f.m(e,s)):f&&(U(),y(f,1,1,()=>{f=null}),T()),h&6){$=H(p[1]);let v;for(v=0;v<$.length;v+=1){const F=Y(p,$,v);u[v]?(u[v].p(F,h),k(u[v],1)):(u[v]=re(F),u[v].c(),k(u[v],1),u[v].m(m,null))}for(U(),v=$.length;v<u.length;v+=1)ae(v);T()}},i(p){if(!_){k(l.$$.fragment,p),k(f);for(let h=0;h<$.length;h+=1)k(u[h]);_=!0}},o(p){y(l.$$.fragment,p),y(f),u=u.filter(Boolean);for(let h=0;h<u.length;h+=1)y(u[h]);_=!1},d(p){p&&d(e),x(l),f&&f.d(),ne(u,p)}}}function Ne(i,e,t){let l,r;W(i,G,s=>t(5,l=s)),W(i,me,s=>t(6,r=s));let o,n="loading",a=[{type:"loading"}];se(async()=>{t(2,o=r.url.searchParams.get("id")),t(0,n=l.find(s=>s.id===o)),G.subscribe(s=>{t(0,n=s.find(m=>m.id===o))}),await K(o),t(1,a=[{type:"input",label:"Name",hex:1,value:n.name},{type:"input",label:"Serial Packet Delay",hex:3,options:["1 ms","2 ms","3 ms","4 ms","5 ms","10 ms","15 ms","20 ms","25 ms","30 ms","35 ms","40 ms","45 ms","50 ms","60 ms","70 ms","80 ms","90 ms","100 ms"],value:(n==null?void 0:n.packetDelay)+" ms"},{type:"input",label:"BLE Tx Power Level",hex:4,options:["3 dBm","6 dBm","9 dBm","12 dBm","15 dBm","18 dBm","21 dBm"],value:(n==null?void 0:n.txPower)+" dBm"},{type:"divider"},{type:"button",label:"Reboot device",color:"#f78385",icon:he,on:{click:async()=>{try{t(1,a[4].loading=!0,a),await X(n.id),K(n.id),t(1,a[4].loading=!1,a)}catch(s){alert(s)}}}},{type:"button",label:"Factory reset",color:"#f78385",icon:ge,on:{click:async()=>{try{t(1,a[5].loading=!0,a),await ke(n.id),await new Promise(s=>{setTimeout(()=>{s()},500)}),t(1,a[5].loading=!1,a),t(1,a[4].loading=!0,a),await X(n.id),await K(n.id)}catch(s){alert(s)}}}},{type:"button",label:"Remove device",color:"#f78385",icon:$e,on:{click:()=>{G.update(s=>s.filter(m=>m.id!==o)),J("/")}}},{type:"divider"},{type:"text",textItems:[`Mac: ${n==null?void 0:n.id}`,"Firmware: 1.0.0","Hardware: 1.0.0",`Status: ${n==null?void 0:n.status}`,`Batch: ${(n==null?void 0:n.batch)||1}`]}])}),fe(()=>{t(1,a=[{type:"loading"}])});const c=()=>{history.back()},g=s=>{J(`/device/settings/edit?id=${o}&name=${s.label}&value=${s.value}&hex=${s.hex}${s.options?"&options="+s.options:""}`)};return i.$$.update=()=>{var s;i.$$.dirty&3&&(!n||(n==null?void 0:n.status)!=="connected")&&ve&&n!=="loading"&&((s=a==null?void 0:a[4])!=null&&s.loading||J("/"))},[n,a,o,c,g]}class Ge extends ue{constructor(e){super(),pe(this,e,Ne,Ae,ie,{})}}export{Ge as component};
