function y(){}function k(t,n){for(const e in n)t[e]=n[e];return t}function w(t){return t()}function D(){return Object.create(null)}function E(t){t.forEach(w)}function j(t){return typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function M(t){return Object.keys(t).length===0}function v(t,...n){if(t==null){for(const o of n)o(void 0);return y}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(v(n,e))}function U(t,n,e,o){if(t){const r=m(t,n,e,o);return t[0](r)}}function m(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function A(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],d=Math.max(n.dirty.length,r.length);for(let a=0;a<d;a+=1)l[a]=n.dirty[a]|r[a];return l}return n.dirty|r}return n.dirty}function B(t,n,e,o,r,l){if(r){const d=m(n,e,o,l);t.p(d,r)}}function G(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function H(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function I(t,n){const e={};n=new Set(n);for(const o in t)!n.has(o)&&o[0]!=="$"&&(e[o]=t[o]);return e}function P(t){const n={};for(const e in t)n[e]=!0;return n}function J(t){return t&&j(t.destroy)?t.destroy:y}let f;function _(t){f=t}function u(){if(!f)throw new Error("Function called outside component initialization");return f}function K(t){u().$$.before_update.push(t)}function L(t){u().$$.on_mount.push(t)}function N(t){u().$$.after_update.push(t)}function Q(t){u().$$.on_destroy.push(t)}function R(t,n){return u().$$.context.set(t,n),n}function T(t){return u().$$.context.get(t)}function V(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(o=>o.call(this,n))}const i=[],g=[];let c=[];const p=[],x=Promise.resolve();let b=!1;function C(){b||(b=!0,x.then(q))}function W(){return C(),x}function O(t){c.push(t)}function X(t){p.push(t)}const h=new Set;let s=0;function q(){if(s!==0)return;const t=f;do{try{for(;s<i.length;){const n=i[s];s++,_(n),z(n.$$)}}catch(n){throw i.length=0,s=0,n}for(_(null),i.length=0,s=0;g.length;)g.pop()();for(let n=0;n<c.length;n+=1){const e=c[n];h.has(e)||(h.add(e),e())}c.length=0}while(i.length);for(;p.length;)p.pop()();b=!1,h.clear(),_(t)}function z(t){if(t.fragment!==null){t.update(),E(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function Y(t){const n=[],e=[];c.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),c=n}export{w as A,i as B,C,K as D,R as E,Q as F,P as G,V as H,T as I,U as a,A as b,S as c,N as d,g as e,I as f,G as g,u as h,k as i,H as j,J as k,j as l,X as m,y as n,L as o,D as p,q,E as r,F as s,W as t,B as u,M as v,O as w,Y as x,f as y,_ as z};
