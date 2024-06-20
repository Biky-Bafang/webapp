import{s as ae,e as S,a as U,c as x,b as P,g as A,f as b,l as k,i as C,h as d,u as O,v as V,w as se,m as le,x as Z,k as z,y as ee,t as I,d as y,j as W}from"../chunks/scheduler.fYnF1vvb.js";import{S as re,i as oe,c as F,a as M,m as j,t as D,b as R,e as T}from"../chunks/index.DJT61aYF.js";import{e as G,c as H,d as ie}from"../chunks/stores.Db1ftiGr.js";import{B as J,a as K,c as L}from"../chunks/general.DoX4PpbT.js";import{F as ue}from"../chunks/Flex.Ca18Yx06.js";import{N as te}from"../chunks/NativeSelect.DV63uslY.js";import{B as ne}from"../chunks/Text.DtU0wkto.js";function Q(s,e,t){const a=s.slice();return a[12]=e[t],a}function ce(s){let e;return{c(){e=I("Clear")},l(t){e=y(t,"Clear")},m(t,a){C(t,e,a)},d(t){t&&b(e)}}}function me(s){let e,t,a,c,i,m,r,p;return e=new ne({props:{color:"gray",variant:"subtle",$$slots:{default:[ce]},$$scope:{ctx:s}}}),e.$on("click",s[5]),i=new te({props:{data:[...s[3].map(Y),""]}}),i.$on("change",s[8]),{c(){F(e.$$.fragment),t=U(),a=S("input"),c=U(),F(i.$$.fragment),this.h()},l(n){M(e.$$.fragment,n),t=A(n),a=x(n,"INPUT",{type:!0,class:!0}),c=A(n),M(i.$$.fragment,n),this.h()},h(){k(a,"type","number"),k(a,"class","delayInput svelte-158mxph")},m(n,u){j(e,n,u),C(n,t,u),C(n,a,u),O(a,s[1]),C(n,c,u),j(i,n,u),m=!0,r||(p=[V(a,"input",s[6]),V(a,"change",s[7])],r=!0)},p(n,u){const _={};u&32768&&(_.$$scope={dirty:u,ctx:n}),e.$set(_),u&2&&ee(a.value)!==n[1]&&O(a,n[1]);const o={};u&8&&(o.data=[...n[3].map(Y),""]),i.$set(o)},i(n){m||(D(e.$$.fragment,n),D(i.$$.fragment,n),m=!0)},o(n){R(e.$$.fragment,n),R(i.$$.fragment,n),m=!1},d(n){n&&(b(t),b(a),b(c)),T(e,n),T(i,n),r=!1,Z(p)}}}function X(s){let e,t,a=s[12].time+"",c,i,m=s[12].name+"",r,p,n=s[12].message+"",u;return{c(){e=S("p"),t=I("["),c=I(a),i=I("] - "),r=I(m),p=I(": "),u=I(n)},l(_){e=x(_,"P",{});var o=P(e);t=y(o,"["),c=y(o,a),i=y(o,"] - "),r=y(o,m),p=y(o,": "),u=y(o,n),o.forEach(b)},m(_,o){C(_,e,o),d(e,t),d(e,c),d(e,i),d(e,r),d(e,p),d(e,u)},p(_,o){o&16&&a!==(a=_[12].time+"")&&W(c,a),o&16&&m!==(m=_[12].name+"")&&W(r,m),o&16&&n!==(n=_[12].message+"")&&W(u,n)},d(_){_&&b(e)}}}function fe(s){let e;return{c(){e=I("Send")},l(t){e=y(t,"Send")},m(t,a){C(t,e,a)},d(t){t&&b(e)}}}function pe(s){let e,t,a,c,i,m,r,p,n,u,_,o,B,q,$;t=new ue({props:{override:{gap:"10px",justifyContent:"space-between",alignItems:"center",margin:"10px 0"},$$slots:{default:[me]},$$scope:{ctx:s}}});let v=G(s[4]),h=[];for(let l=0;l<v.length;l+=1)h[l]=X(Q(s,v,l));return u=new te({props:{override:{minWidth:"90px"},data:["Serial1","Serial2"]}}),u.$on("change",s[10]),o=new ne({props:{color:"gray",variant:"outline",$$slots:{default:[fe]},$$scope:{ctx:s}}}),{c(){e=S("main"),F(t.$$.fragment),a=U(),c=S("div"),i=S("pre");for(let l=0;l<h.length;l+=1)h[l].c();m=U(),r=S("form"),p=S("input"),n=U(),F(u.$$.fragment),_=U(),F(o.$$.fragment),this.h()},l(l){e=x(l,"MAIN",{class:!0});var g=P(e);M(t.$$.fragment,g),a=A(g),c=x(g,"DIV",{class:!0});var w=P(c);i=x(w,"PRE",{});var N=P(i);for(let E=0;E<h.length;E+=1)h[E].l(N);N.forEach(b),w.forEach(b),m=A(g),r=x(g,"FORM",{class:!0});var f=P(r);p=x(f,"INPUT",{type:!0,class:!0}),n=A(f),M(u.$$.fragment,f),_=A(f),M(o.$$.fragment,f),f.forEach(b),g.forEach(b),this.h()},h(){k(c,"class","consoleBox svelte-158mxph"),k(p,"type","text"),k(p,"class","hexInput svelte-158mxph"),k(r,"class","hexInputContainer svelte-158mxph"),k(e,"class","svelte-158mxph")},m(l,g){C(l,e,g),j(t,e,null),d(e,a),d(e,c),d(c,i);for(let w=0;w<h.length;w+=1)h[w]&&h[w].m(i,null);d(e,m),d(e,r),d(r,p),O(p,s[0]),d(r,n),j(u,r,null),d(r,_),j(o,r,null),B=!0,q||($=[V(p,"input",s[9]),V(r,"submit",se(s[11]))],q=!0)},p(l,[g]){const w={};if(g&32782&&(w.$$scope={dirty:g,ctx:l}),t.$set(w),g&16){v=G(l[4]);let f;for(f=0;f<v.length;f+=1){const E=Q(l,v,f);h[f]?h[f].p(E,g):(h[f]=X(E),h[f].c(),h[f].m(i,null))}for(;f<h.length;f+=1)h[f].d(1);h.length=v.length}g&1&&p.value!==l[0]&&O(p,l[0]);const N={};g&32768&&(N.$$scope={dirty:g,ctx:l}),o.$set(N)},i(l){B||(D(t.$$.fragment,l),D(u.$$.fragment,l),D(o.$$.fragment,l),B=!0)},o(l){R(t.$$.fragment,l),R(u.$$.fragment,l),R(o.$$.fragment,l),B=!1},d(l){l&&b(e),T(t),le(h,l),T(u),T(o),q=!1,Z($)}}}const Y=s=>s.name;function _e(s,e,t){let a,c;z(s,ie,$=>t(3,a=$)),z(s,H,$=>t(4,c=$));let i="",m=10,r;const p=()=>{H.set([])};function n(){m=ee(this.value),t(1,m)}const u=async()=>{try{await J.write(r.id,K,L,new Uint8Array([4,m]))}catch($){alert($)}},_=$=>{t(2,r=a.find(v=>v.name===$.target.value))};function o(){i=this.value,t(0,i)}return[i,m,r,a,c,p,n,u,_,o,$=>{t(2,r=a.find(v=>v.name===$.target.value))},async()=>{try{if(!i.match(/^(0x[0-9a-fA-F]{2}\s*)+$/)){alert("Invalid hex input");return}const $=i.split(" ").map(v=>parseInt(v,16));await J.write(r.id,K,L,new Uint8Array([r.name==="Serial1"?2:3,...$]))}catch($){alert($)}}]}class Ie extends re{constructor(e){super(),oe(this,e,_e,pe,ae,{})}}export{Ie as component};
