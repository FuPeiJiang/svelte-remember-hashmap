import{H as d,s as E}from"./index.59413039.js";const c=[];function b(e,t=d){let s;const n=new Set;function o(a){if(E(e,a)&&(e=a,s)){const u=!c.length;for(const l of n)l[1](),c.push(l,e);if(u){for(let l=0;l<c.length;l+=2)c[l][0](c[l+1]);c.length=0}}}function r(a){o(a(e))}function i(a,u=d){const l=[a,u];return n.add(l),n.size===1&&(s=t(o)||d),a(e),()=>{n.delete(l),n.size===0&&(s(),s=null)}}return{set:o,update:r,subscribe:i}}var g;const m=((g=globalThis.__sveltekit_z7u2es)==null?void 0:g.base)??"/svelte-github-pages";var v;const w=((v=globalThis.__sveltekit_z7u2es)==null?void 0:v.assets)??m,A="1677876386121",I="sveltekit:snapshot",y="sveltekit:scroll",x="sveltekit:index",p={tap:1,hover:2,viewport:3,eager:4,off:-1};function O(e){let t=e.baseURI;if(!t){const s=e.getElementsByTagName("base");t=s.length?s[0].href:e.URL}return t}function U(){return{x:pageXOffset,y:pageYOffset}}function f(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const h={...p,"":p.hover};function k(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function L(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=k(e)}}function N(e,t){let s;try{s=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const n=e instanceof SVGAElement?e.target.baseVal:e.target,o=!s||!!n||S(s,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external")||e.hasAttribute("download");return{url:s,external:o,target:n}}function V(e){let t=null,s=null,n=null,o=null,r=e;for(;r&&r!==document.documentElement;)s===null&&(s=f(r,"preload-code")),n===null&&(n=f(r,"preload-data")),t===null&&(t=f(r,"noscroll")),o===null&&(o=f(r,"reload")),r=k(r);return{preload_code:h[s??"off"],preload_data:h[n??"off"],noscroll:t==="off"?!1:t===""?!0:null,reload:o==="off"?!1:o===""?!0:null}}function _(e){const t=b(e);let s=!0;function n(){s=!0,t.update(i=>i)}function o(i){s=!1,t.set(i)}function r(i){let a;return t.subscribe(u=>{(a===void 0||s&&u!==a)&&i(a=u)})}return{notify:n,set:o,subscribe:r}}function R(){const{set:e,subscribe:t}=b(!1);let s;async function n(){clearTimeout(s);const o=await fetch(`${w}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(o.ok){const i=(await o.json()).version!==A;return i&&(e(!0),clearTimeout(s)),i}else throw new Error(`Version check failed: ${o.status}`)}return{subscribe:t,check:n}}function S(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}function z(e){e.client}const P={url:_({}),page:_({}),navigating:b(null),updated:R()};export{x as I,p as P,y as S,I as a,N as b,V as c,U as d,m as e,L as f,O as g,z as h,S as i,P as s};
