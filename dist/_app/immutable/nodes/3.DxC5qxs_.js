import{s as se,v as ke,e as O,a as X,c as j,b as W,f as g,g as M,z as y,M as te,T as Xe,a5 as q,i as I,h as C,a6 as Ue,G as F,w as $e,x as Ee,y as Ie,I as Ke,a7 as Ye,B as Me,C as Je,l as Se,t as Z,d as x,j as ue,A as Re,k as De,n as ge,D as oe,O as ae}from"../chunks/scheduler.Cabs2qPT.js";import{S as ce,i as de,t as w,d as $,c as A,a as P,m as T,e as z,g as ne,f as le}from"../chunks/index.CisEW8ZJ.js";import{r as Qe,e as fe,d as ye}from"../chunks/stores.DfX1f76V.js";import{g as he}from"../chunks/entry.CvBM6Ofv.js";import{p as Ze}from"../chunks/stores.DJTZAdvF.js";import{U as Ce,F as Fe,e as xe,g as et}from"../chunks/fa-layers-text.svelte_svelte_type_style_lang.C6VoKrzD.js";import{b as tt}from"../chunks/index.Bt-Xh7oU.js";import{g as nt}from"../chunks/globals.D0QH3NT1.js";import{B as _e,T as Oe}from"../chunks/Text.CdW7TBh3.js";import{F as lt}from"../chunks/Flex.B88W1OFr.js";const{window:Q}=nt,st=l=>({}),je=l=>({}),rt=l=>({sliderWidth:l[0]&1,shown:l[0]&16,currentIndex:l[0]&8,currentScrollPosition:l[0]&2,maxWidth:l[0]&4,reachedEnd:l[0]&32,distanceToEnd:l[0]&64}),We=l=>({sliderWidth:l[0],shown:l[4],currentIndex:l[3],setIndex:l[9],currentScrollPosition:l[1],maxWidth:l[2],reachedEnd:l[5],distanceToEnd:l[6]});function it(l){let e,t,n=`translateX(${l[1]*-1}px)`,s=`${l[11]?0:l[8]}ms`,i,r,o,f,u;const _=l[22].default,m=ke(_,l,l[21],We),v=l[22].controls,d=ke(v,l,l[21],je);return{c(){e=O("div"),t=O("div"),m&&m.c(),r=X(),d&&d.c(),this.h()},l(c){e=j(c,"DIV",{class:!0,tabindex:!0});var k=W(e);t=j(k,"DIV",{"aria-hidden":!0,tabindex:!0,class:!0});var E=W(t);m&&m.l(E),E.forEach(g),k.forEach(g),r=M(c),d&&d.l(c),this.h()},h(){y(t,"aria-hidden",""),y(t,"tabindex","0"),y(t,"class","slider-content svelte-1aekifv"),te(t,"transform",n),te(t,"transition-duration",s),te(t,"--gap",l[7]),y(e,"class","slider svelte-1aekifv"),y(e,"tabindex","-1"),Xe(()=>l[25].call(e)),q(e,"dragging",l[11]),q(e,"passed-threshold",l[12])},m(c,k){I(c,e,k),C(e,t),m&&m.m(t,null),l[23](t),l[24](e),i=Ue(e,l[25].bind(e)),I(c,r,k),d&&d.m(c,k),o=!0,f||(u=[F(Q,"mousedown",l[14]),F(Q,"mouseup",l[15]),F(Q,"mousemove",l[16]),F(Q,"touchstart",l[14]),F(Q,"touchend",l[15]),F(Q,"touchmove",l[16]),F(Q,"keydown",l[17])],f=!0)},p(c,k){m&&m.p&&(!o||k[0]&2097279)&&$e(m,_,c,c[21],o?Ie(_,c[21],k,rt):Ee(c[21]),We),k[0]&2&&n!==(n=`translateX(${c[1]*-1}px)`)&&te(t,"transform",n),k[0]&2304&&s!==(s=`${c[11]?0:c[8]}ms`)&&te(t,"transition-duration",s),k[0]&128&&te(t,"--gap",c[7]),(!o||k[0]&2048)&&q(e,"dragging",c[11]),(!o||k[0]&4096)&&q(e,"passed-threshold",c[12]),d&&d.p&&(!o||k[0]&2097152)&&$e(d,v,c,c[21],o?Ie(v,c[21],k,st):Ee(c[21]),je)},i(c){o||(w(m,c),w(d,c),o=!0)},o(c){$(m,c),$(d,c),o=!1},d(c){c&&(g(e),g(r)),m&&m.d(c),l[23](null),l[24](null),i(),d&&d.d(c),f=!1,Ke(u)}}}function ot(l,e,t){let{$$slots:n={},$$scope:s}=e,{gap:i=0}=e,{snap:r=!0}=e,{fill:o=!0}=e,{transitionDuration:f=300}=e,{threshold:u=30}=e,{currentIndex:_=0}=e,{shown:m=[]}=e,{sliderWidth:v=0}=e,{currentScrollPosition:d=0}=e,{maxWidth:c=0}=e,{reachedEnd:k=!1}=e,{distanceToEnd:E=0}=e,L=!1,B=!1,G=0,H=0,S,p,U;const h=Ye();Me(Ne),Je(()=>{U&&U.disconnect(p)});function b(a){const D=p.children.length;a<0&&(a=0),a>D-1&&(a=D-1),ee({setIndex:a}),me()}function K(a){a.preventDefault(),we(a.target)&&(G=a.pageX||a.touches[0].pageX,t(11,L=!0))}function N(){if(L){if(!B)ee({setIndex:_});else{const a=d-H,D=a>0?1:-1;a!=0&&r&&ee({direction:D})}t(11,L=!1),t(12,B=!1)}}function R(a){var D;if(L){if(t(12,B=Math.abs(d-H)>u),(D=a.touches)!=null&&D.length&&(a.pageX=a.touches[0].pageX,a.movementX=a.touches[0].pageX-G),a.pageX+a.movementX<0||a.pageX+a.movementX>window.innerWidth){N();return}pe(H+(G-a.pageX)),me()}}function Y(a){we(document.activeElement)&&(a.key!="ArrowLeft"&&a.key!="ArrowRight"||(a.key=="ArrowLeft"&&b(_-1),a.key=="ArrowRight"&&b(_+1)))}function ee({setIndex:a=-1,direction:D=1}={}){const V=be();t(3,_=0);let J;for(J=0;J<V.length;J++)if(a!=-1){if(J>=a)break}else if(D>0&&V[J]>d||D<0&&V[J+1]>d)break;t(3,_=Math.min(J,ve().length-1)),pe(V[_],!0),H=d}function pe(a,D=!1){t(1,d=a);const V=c-v;t(5,k=d>=V),k&&(h("end"),o&&D&&t(1,d=V))}function me(){const a=be();Array.from(a).forEach((D,V)=>{d+v<D||m.includes(V)||t(4,m=[...m,V])})}function be(){return ve().map(a=>a.offsetLeft)}function ve(){return Array.from(p.children).filter(a=>a.src!="about:blank")}function Ne(){U=new ResizeObserver(a=>{for(const D of a){const V=Array.isArray(D.contentBoxSize)?D.contentBoxSize[0]:D.contentBoxSize;t(2,c=V.inlineSize)}}),U.observe(p)}function we(a){return a==S||a.closest(".slider")==S}function qe(a){Se[a?"unshift":"push"](()=>{p=a,t(10,p)})}function Ge(a){Se[a?"unshift":"push"](()=>{S=a,t(13,S)})}function He(){v=this.clientWidth,t(0,v)}return l.$$set=a=>{"gap"in a&&t(7,i=a.gap),"snap"in a&&t(18,r=a.snap),"fill"in a&&t(19,o=a.fill),"transitionDuration"in a&&t(8,f=a.transitionDuration),"threshold"in a&&t(20,u=a.threshold),"currentIndex"in a&&t(3,_=a.currentIndex),"shown"in a&&t(4,m=a.shown),"sliderWidth"in a&&t(0,v=a.sliderWidth),"currentScrollPosition"in a&&t(1,d=a.currentScrollPosition),"maxWidth"in a&&t(2,c=a.maxWidth),"reachedEnd"in a&&t(5,k=a.reachedEnd),"distanceToEnd"in a&&t(6,E=a.distanceToEnd),"$$scope"in a&&t(21,s=a.$$scope)},l.$$.update=()=>{l.$$.dirty[0]&1024&&p&&me(),l.$$.dirty[0]&1031&&p&&t(6,E=c-d-v)},[v,d,c,_,m,k,E,i,f,b,p,L,B,S,K,N,R,Y,r,o,u,s,n,qe,Ge,He]}class at extends ce{constructor(e){super(),de(this,e,ot,it,se,{gap:7,snap:18,fill:19,transitionDuration:8,threshold:20,currentIndex:3,shown:4,sliderWidth:0,currentScrollPosition:1,maxWidth:2,reachedEnd:5,distanceToEnd:6,setIndex:9},null,[-1,-1])}get setIndex(){return this.$$.ctx[9]}}function ft(l){let e;return{c(){e=Z("Read")},l(t){e=x(t,"Read")},m(t,n){I(t,e,n)},d(t){t&&g(e)}}}function ut(l){let e;return{c(){e=Z("Write")},l(t){e=x(t,"Write")},m(t,n){I(t,e,n)},d(t){t&&g(e)}}}function ct(l){let e,t,n,s,i,r=(l[0]||"")+"",o,f,u,_;return n=new _e({props:{variant:"outline",color:"green",$$slots:{default:[ft]},$$scope:{ctx:l}}}),n.$on("click",l[3]),u=new _e({props:{variant:"outline",color:"red",$$slots:{default:[ut]},$$scope:{ctx:l}}}),{c(){e=O("main"),t=O("div"),A(n.$$.fragment),s=X(),i=O("h3"),o=Z(r),f=X(),A(u.$$.fragment),this.h()},l(m){e=j(m,"MAIN",{});var v=W(e);t=j(v,"DIV",{class:!0});var d=W(t);P(n.$$.fragment,d),s=M(d),i=j(d,"H3",{class:!0});var c=W(i);o=x(c,r),c.forEach(g),f=M(d),P(u.$$.fragment,d),d.forEach(g),v.forEach(g),this.h()},h(){y(i,"class","name svelte-3q7flo"),y(t,"class","controllerContainer svelte-3q7flo")},m(m,v){I(m,e,v),C(e,t),T(n,t,null),C(t,s),C(t,i),C(i,o),C(t,f),T(u,t,null),_=!0},p(m,[v]){const d={};v&16&&(d.$$scope={dirty:v,ctx:m}),n.$set(d),(!_||v&1)&&r!==(r=(m[0]||"")+"")&&ue(o,r);const c={};v&16&&(c.$$scope={dirty:v,ctx:m}),u.$set(c)},i(m){_||(w(n.$$.fragment,m),w(u.$$.fragment,m),_=!0)},o(m){$(n.$$.fragment,m),$(u.$$.fragment,m),_=!1},d(m){m&&g(e),z(n),z(u)}}}function dt(l,e,t){let{title:n}=e,{hex:s}=e,{deviceId:i}=e;const r=()=>{Qe(i,s)};return l.$$set=o=>{"title"in o&&t(0,n=o.title),"hex"in o&&t(1,s=o.hex),"deviceId"in o&&t(2,i=o.deviceId)},[n,s,i,r]}class re extends ce{constructor(e){super(),de(this,e,dt,ct,se,{title:0,hex:1,deviceId:2})}}function Ae(l,e,t){const n=l.slice();return n[1]=e[t],n}function mt(l){let e=l[1].label+"",t;return{c(){t=Z(e)},l(n){t=x(n,e)},m(n,s){I(n,t,s)},p(n,s){s&1&&e!==(e=n[1].label+"")&&ue(t,e)},d(n){n&&g(t)}}}function ht(l){let e=l[1].value+"",t;return{c(){t=Z(e)},l(n){t=x(n,e)},m(n,s){I(n,t,s)},p(n,s){s&1&&e!==(e=n[1].value+"")&&ue(t,e)},d(n){n&&g(t)}}}function _t(l){let e,t,n,s;return e=new Oe({props:{size:15,color:"white",$$slots:{default:[mt]},$$scope:{ctx:l}}}),n=new Oe({props:{size:15,color:"#d4d4d4",weight:"bold",$$slots:{default:[ht]},$$scope:{ctx:l}}}),{c(){A(e.$$.fragment),t=X(),A(n.$$.fragment)},l(i){P(e.$$.fragment,i),t=M(i),P(n.$$.fragment,i)},m(i,r){T(e,i,r),I(i,t,r),T(n,i,r),s=!0},p(i,r){const o={};r&17&&(o.$$scope={dirty:r,ctx:i}),e.$set(o);const f={};r&17&&(f.$$scope={dirty:r,ctx:i}),n.$set(f)},i(i){s||(w(e.$$.fragment,i),w(n.$$.fragment,i),s=!0)},o(i){$(e.$$.fragment,i),$(n.$$.fragment,i),s=!1},d(i){i&&g(t),z(e,i),z(n,i)}}}function gt(l){let e,t,n;return e=new lt({props:{justify:"space-between",align:"center",override:{width:"100%"},$$slots:{default:[_t]},$$scope:{ctx:l}}}),{c(){A(e.$$.fragment),t=X()},l(s){P(e.$$.fragment,s),t=M(s)},m(s,i){T(e,s,i),I(s,t,i),n=!0},p(s,i){const r={};i&17&&(r.$$scope={dirty:i,ctx:s}),e.$set(r)},i(s){n||(w(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){s&&g(t),z(e,s)}}}function Te(l){let e,t;return e=new _e({props:{ripple:!0,override:{background:"transparent !important",color:"inherit",padding:"15px 20px",margin:"0",height:"100%",width:"100%",justifyContent:"flex-start",textAlign:"left","&:hover":{background:"transparent"}},$$slots:{default:[gt]},$$scope:{ctx:l}}}),{c(){A(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,s){T(e,n,s),t=!0},p(n,s){const i={};s&17&&(i.$$scope={dirty:s,ctx:n}),e.$set(i)},i(n){t||(w(e.$$.fragment,n),t=!0)},o(n){$(e.$$.fragment,n),t=!1},d(n){z(e,n)}}}function pt(l){let e,t,n,s=fe(l[0]),i=[];for(let o=0;o<s.length;o+=1)i[o]=Te(Ae(l,s,o));const r=o=>$(i[o],1,1,()=>{i[o]=null});return{c(){e=O("main"),t=O("div");for(let o=0;o<i.length;o+=1)i[o].c();this.h()},l(o){e=j(o,"MAIN",{});var f=W(e);t=j(f,"DIV",{class:!0});var u=W(t);for(let _=0;_<i.length;_+=1)i[_].l(u);u.forEach(g),f.forEach(g),this.h()},h(){y(t,"class","buttonsContainer svelte-1p9fyrm")},m(o,f){I(o,e,f),C(e,t);for(let u=0;u<i.length;u+=1)i[u]&&i[u].m(t,null);n=!0},p(o,[f]){if(f&1){s=fe(o[0]);let u;for(u=0;u<s.length;u+=1){const _=Ae(o,s,u);i[u]?(i[u].p(_,f),w(i[u],1)):(i[u]=Te(_),i[u].c(),w(i[u],1),i[u].m(t,null))}for(ne(),u=s.length;u<i.length;u+=1)r(u);le()}},i(o){if(!n){for(let f=0;f<s.length;f+=1)w(i[f]);n=!0}},o(o){i=i.filter(Boolean);for(let f=0;f<i.length;f+=1)$(i[f]);n=!1},d(o){o&&g(e),Re(i,o)}}}function bt(l,e,t){let{inputs:n=[]}=e;return l.$$set=s=>{"inputs"in s&&t(0,n=s.inputs)},[n]}class ie extends ce{constructor(e){super(),de(this,e,bt,pt,se,{inputs:0})}}function ze(l,e,t){const n=l.slice();return n[14]=e[t],n[16]=t,n}function vt(l){let e,t;return e=new Fe({props:{icon:xe,rotate:45,size:"1.3x"}}),{c(){A(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,s){T(e,n,s),t=!0},p:ge,i(n){t||(w(e.$$.fragment,n),t=!0)},o(n){$(e.$$.fragment,n),t=!1},d(n){z(e,n)}}}function wt(l){let e,t;return e=new Fe({props:{icon:et,rotate:45,size:"1.3x"}}),{c(){A(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,s){T(e,n,s),t=!0},p:ge,i(n){t||(w(e.$$.fragment,n),t=!0)},o(n){$(e.$$.fragment,n),t=!1},d(n){z(e,n)}}}function Le(l){let e,t=l[14]+"",n,s,i,r;function o(){return l[9](l[16],l[13])}return{c(){e=O("div"),n=Z(t),s=X(),this.h()},l(f){e=j(f,"DIV",{class:!0,"aria-hidden":!0});var u=W(e);n=x(u,t),s=M(u),u.forEach(g),this.h()},h(){y(e,"class","tab svelte-h1w8ik"),y(e,"aria-hidden",""),q(e,"active",l[16]===l[2])},m(f,u){I(f,e,u),C(e,n),C(e,s),i||(r=F(e,"click",o),i=!0)},p(f,u){l=f,u&4&&q(e,"active",l[16]===l[2])},d(f){f&&g(e),i=!1,r()}}}function kt(l){let e,t=fe(Object.keys(l[5])),n=[];for(let s=0;s<t.length;s+=1)n[s]=Le(ze(l,t,s));return{c(){for(let s=0;s<n.length;s+=1)n[s].c();e=oe()},l(s){for(let i=0;i<n.length;i+=1)n[i].l(s);e=oe()},m(s,i){for(let r=0;r<n.length;r+=1)n[r]&&n[r].m(s,i);I(s,e,i)},p(s,i){if(i&8228){t=fe(Object.keys(s[5]));let r;for(r=0;r<t.length;r+=1){const o=ze(s,t,r);n[r]?n[r].p(o,i):(n[r]=Le(o),n[r].c(),n[r].m(e.parentNode,e))}for(;r<n.length;r+=1)n[r].d(1);n.length=t.length}},d(s){s&&g(e),Re(n,s)}}}function Pe(l){let e,t,n;var s=l[5][Object.keys(l[5])[l[2]]].component;function i(r,o){return{props:{inputs:r[5][Object.keys(r[5])[r[2]]].settings}}}return s&&(e=ae(s,i(l))),{c(){e&&A(e.$$.fragment),t=oe()},l(r){e&&P(e.$$.fragment,r),t=oe()},m(r,o){e&&T(e,r,o),I(r,t,o),n=!0},p(r,o){if(o&4&&s!==(s=r[5][Object.keys(r[5])[r[2]]].component)){if(e){ne();const f=e;$(f.$$.fragment,1,0,()=>{z(f,1)}),le()}s?(e=ae(s,i(r)),A(e.$$.fragment),w(e.$$.fragment,1),T(e,t.parentNode,t)):e=null}else if(s){const f={};o&4&&(f.inputs=r[5][Object.keys(r[5])[r[2]]].settings),e.$set(f)}},i(r){n||(e&&w(e.$$.fragment,r),n=!0)},o(r){e&&$(e.$$.fragment,r),n=!1},d(r){r&&g(t),e&&z(e,r)}}}function Ve(l){let e,t=l[5][Object.keys(l[5])[l[2]]],n,s=t&&Pe(l);return{c(){e=O("div"),s&&s.c(),this.h()},l(i){e=j(i,"DIV",{class:!0});var r=W(e);s&&s.l(r),r.forEach(g),this.h()},h(){y(e,"class","svelte-h1w8ik")},m(i,r){I(i,e,r),s&&s.m(e,null),n=!0},p(i,r){r&4&&(t=i[5][Object.keys(i[5])[i[2]]]),t?s?(s.p(i,r),r&4&&w(s,1)):(s=Pe(i),s.c(),w(s,1),s.m(e,null)):s&&(ne(),$(s,1,1,()=>{s=null}),le())},i(i){n||(w(s),n=!0)},o(i){$(s),n=!1},d(i){i&&g(e),s&&s.d()}}}function Be(l){let e,t,n;var s=l[5][Object.keys(l[5])[l[2]]].bottomComponent;function i(r,o){return{props:{title:Object.keys(r[5])[r[2]],deviceId:r[1],hex:r[5][Object.keys(r[5])[r[2]]].hex}}}return s&&(t=ae(s,i(l))),{c(){e=O("div"),t&&A(t.$$.fragment),this.h()},l(r){e=j(r,"DIV",{class:!0});var o=W(e);t&&P(t.$$.fragment,o),o.forEach(g),this.h()},h(){y(e,"class","bottomContainer")},m(r,o){I(r,e,o),t&&T(t,e,null),n=!0},p(r,o){if(o&4&&s!==(s=r[5][Object.keys(r[5])[r[2]]].bottomComponent)){if(t){ne();const f=t;$(f.$$.fragment,1,0,()=>{z(f,1)}),le()}s?(t=ae(s,i(r)),A(t.$$.fragment),w(t.$$.fragment,1),T(t,e,null)):t=null}else if(s){const f={};o&4&&(f.title=Object.keys(r[5])[r[2]]),o&2&&(f.deviceId=r[1]),o&4&&(f.hex=r[5][Object.keys(r[5])[r[2]]].hex),t.$set(f)}},i(r){n||(t&&w(t.$$.fragment,r),n=!0)},o(r){t&&$(t.$$.fragment,r),n=!1},d(r){r&&g(e),t&&z(t)}}}function $t(l){var U;let e,t,n,s,i=((U=l[0])==null?void 0:U.name)+"",r,o,f,u,_,m,v,d,c,k=l[2],E,L=l[5][Object.keys(l[5])[l[2]]],B,G,H;Xe(l[6]),t=new Ce({props:{$$slots:{default:[vt]},$$scope:{ctx:l}}}),t.$on("click",l[7]),f=new Ce({props:{$$slots:{default:[wt]},$$scope:{ctx:l}}}),f.$on("click",l[8]),m=new at({props:{$$slots:{default:[kt,({setIndex:h})=>({13:h}),({setIndex:h})=>h?8192:0]},$$scope:{ctx:l}}}),m.$on("change",l[10]);let S=Ve(l),p=L&&Be(l);return{c(){e=O("div"),A(t.$$.fragment),n=X(),s=O("p"),r=Z(i),o=X(),A(f.$$.fragment),u=X(),_=O("div"),A(m.$$.fragment),v=X(),d=O("div"),c=O("div"),S.c(),E=X(),p&&p.c(),this.h()},l(h){e=j(h,"DIV",{class:!0});var b=W(e);P(t.$$.fragment,b),n=M(b),s=j(b,"P",{class:!0});var K=W(s);r=x(K,i),K.forEach(g),o=M(b),P(f.$$.fragment,b),b.forEach(g),u=M(h),_=j(h,"DIV",{class:!0});var N=W(_);P(m.$$.fragment,N),N.forEach(g),v=M(h),d=j(h,"DIV",{class:!0});var R=W(d);c=j(R,"DIV",{class:!0});var Y=W(c);S.l(Y),Y.forEach(g),E=M(R),p&&p.l(R),R.forEach(g),this.h()},h(){var h;y(s,"class","svelte-h1w8ik"),y(e,"class","header svelte-h1w8ik"),y(_,"class","selectorContainer"),y(c,"class","transition tabContainer svelte-h1w8ik"),y(d,"class","tabContent svelte-h1w8ik"),q(d,"fullscreen",(h=l[5][Object.keys(l[5])[l[2]]])==null?void 0:h.fullscreen)},m(h,b){I(h,e,b),T(t,e,null),C(e,n),C(e,s),C(s,r),C(e,o),T(f,e,null),I(h,u,b),I(h,_,b),T(m,_,null),I(h,v,b),I(h,d,b),C(d,c),S.m(c,null),C(d,E),p&&p.m(d,null),B=!0,G||(H=F(window,"resize",l[6]),G=!0)},p(h,[b]){var Y,ee;const K={};b&131072&&(K.$$scope={dirty:b,ctx:h}),t.$set(K),(!B||b&1)&&i!==(i=((Y=h[0])==null?void 0:Y.name)+"")&&ue(r,i);const N={};b&131072&&(N.$$scope={dirty:b,ctx:h}),f.$set(N);const R={};b&139268&&(R.$$scope={dirty:b,ctx:h}),m.$set(R),b&4&&se(k,k=h[2])?(ne(),$(S,1,1,ge),le(),S=Ve(h),S.c(),w(S,1),S.m(c,null)):S.p(h,b),b&4&&(L=h[5][Object.keys(h[5])[h[2]]]),L?p?(p.p(h,b),b&4&&w(p,1)):(p=Be(h),p.c(),w(p,1),p.m(d,null)):p&&(ne(),$(p,1,1,()=>{p=null}),le()),(!B||b&36)&&q(d,"fullscreen",(ee=h[5][Object.keys(h[5])[h[2]]])==null?void 0:ee.fullscreen)},i(h){B||(w(t.$$.fragment,h),w(f.$$.fragment,h),w(m.$$.fragment,h),w(S),w(p),B=!0)},o(h){$(t.$$.fragment,h),$(f.$$.fragment,h),$(m.$$.fragment,h),$(S),$(p),B=!1},d(h){h&&(g(e),g(u),g(_),g(v),g(d)),z(t),z(f),z(m),S.d(h),p&&p.d(),G=!1,H()}}}function Et(l,e,t){let n,s;De(l,ye,E=>t(11,n=E)),De(l,Ze,E=>t(12,s=E));let i,r="loading",o=0,f={DISPLAY:{fullscreen:!0},FLOWS:{},GENERAL:{component:ie,hex:1,settings:[{label:"Low Battery Protection",value:"40V"},{label:"Current Limit",value:"24A"},{label:"Speed Limit Type",value:"External, Wheel Meter"},{label:"Speed Meter Signals",value:"1"},{label:"Wheel Diameter",value:"26 inch"}],bottomComponent:re},LEVELS:{hex:2,component:ie,bottomComponent:re},PEDAL:{hex:3,component:ie,bottomComponent:re,settings:[{label:"Pedal Sensor Type",value:"DoubleSignal-24"},{label:"Designated Assist Level",value:"By Display Command"},{label:"Speed Limit",value:"By Display Command"},{label:"Start Current",value:"20%"},{label:"Slow Start Mode",value:"4"},{label:"Work Mode",value:"Undetermined"},{label:"Current Decay",value:"5"},{label:"Stop Decay",value:"10ms"},{label:"Keep Current",value:"60%"}]},THROTTLE:{hex:4,component:ie,bottomComponent:re,settings:[{label:"Start Voltage",value:"1.1V"},{label:"End Voltage",value:"4.2V"},{label:"Mode",value:"Speed"},{label:"Designated Assist Level",value:"By Display Command"},{label:"Speed Limit",value:"By Display Command"},{label:"Start Current",value:"10%"}]}},u,_;Me(()=>{t(1,i=s.url.searchParams.get("id")),t(0,r=n.list.find(E=>E.id===i)),ye.subscribe(E=>{t(0,r=E.list.find(L=>L.id===i))})});function m(){t(3,u=window.innerWidth),t(4,_=window.innerHeight)}const v=()=>{he("/")},d=()=>{he("/device/settings?id="+i)},c=(E,L)=>{t(2,o=E),L(E-1<0?0:E-1)},k=()=>alert("test");return l.$$.update=()=>{l.$$.dirty&1&&(!r||(r==null?void 0:r.status)!=="connected")&&tt&&r!=="loading"&&he("/")},[r,i,o,u,_,f,m,v,d,c,k]}class zt extends ce{constructor(e){super(),de(this,e,Et,$t,se,{})}}export{zt as component};
