var G=Object.defineProperty;var H=(t,e,n)=>e in t?G(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var R=(t,e,n)=>(H(t,typeof e!="symbol"?e+"":e,n),n);import{n as x,G as J,H as K,f as L,B as v,F as j,C as N,I as Q,J as T,K as A,b as V,L as q,M as W,N as X,O as Y,P as B,Q as Z,R as tt,S as et,T as nt,U as st}from"./scheduler.BnSwxYe-.js";const U=typeof window<"u";let it=U?()=>window.performance.now():()=>Date.now(),z=U?t=>requestAnimationFrame(t):x;const y=new Set;function k(t){y.forEach(e=>{e.c(t)||(y.delete(e),e.f())}),y.size!==0&&z(k)}function rt(t){let e;return y.size===0&&z(k),{promise:new Promise(n=>{y.add(e={c:t,f:n})}),abort(){y.delete(e)}}}const E=new Map;let O=0;function at(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function ot(t,e){const n={stylesheet:K(e),rules:{}};return E.set(t,n),n}function F(t,e,n,r,c,f,l,s=0){const u=16.666/r;let i=`{
`;for(let d=0;d<=1;d+=u){const g=e+(n-e)*f(d);i+=d*100+`%{${l(g,1-g)}}
`}const $=i+`100% {${l(n,1-n)}}
}`,o=`__svelte_${at($)}_${s}`,m=J(t),{stylesheet:p,rules:a}=E.get(m)||ot(m,t);a[o]||(a[o]=!0,p.insertRule(`@keyframes ${o} ${$}`,p.cssRules.length));const _=t.style.animation||"";return t.style.animation=`${_?`${_}, `:""}${o} ${r}ms linear ${c}ms 1 both`,O+=1,o}function ft(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?f=>f.indexOf(e)<0:f=>f.indexOf("__svelte")===-1),c=n.length-r.length;c&&(t.style.animation=r.join(", "),O-=c,O||ut())}function ut(){z(()=>{O||(E.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&L(e)}),E.clear())})}let w;function lt(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function I(t,e,n){t.dispatchEvent(Q(`${e?"intro":"outro"}${n}`))}const S=new Set;let h;function yt(){h={r:0,c:[],p:h}}function wt(){h.r||v(h.c),h=h.p}function ct(t,e){t&&t.i&&(S.delete(t),t.i(e))}function xt(t,e,n,r){if(t&&t.o){if(S.has(t))return;S.add(t),h.c.push(()=>{S.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const dt={duration:0};function vt(t,e,n,r){let f=e(t,n,{direction:"both"}),l=r?0:1,s=null,u=null,i=null,$;function o(){i&&ft(t,i)}function m(a,_){const d=a.b-l;return _*=Math.abs(d),{a:l,b:a.b,d,duration:_,start:a.start,end:a.start+_,group:a.group}}function p(a){const{delay:_=0,duration:d=300,easing:g=T,tick:C=x,css:M}=f||dt,P={start:it()+_,b:a};a||(P.group=h,h.r+=1),"inert"in t&&(a?$!==void 0&&(t.inert=$):($=t.inert,t.inert=!0)),s||u?u=P:(M&&(o(),i=F(t,l,a,d,_,g,M)),a&&C(0,1),s=m(P,d),N(()=>I(t,a,"start")),rt(b=>{if(u&&b>u.start&&(s=m(u,d),u=null,I(t,s.b,"start"),M&&(o(),i=F(t,l,s.b,s.duration,0,g,f.css))),s){if(b>=s.end)C(l=s.b,1-l),I(t,s.b,"end"),u||(s.b?o():--s.group.r||v(s.group.c)),s=null;else if(b>=s.start){const D=b-s.start;l=s.a+s.d*g(D/s.duration),C(l,1-l)}}return!!(s||u)}))}return{run(a){j(f)?lt().then(()=>{f=f({direction:a?"in":"out"}),p(a)}):p(a)},end(){o(),s=u=null}}}function bt(t){t&&t.c()}function St(t,e){t&&t.l(e)}function _t(t,e,n){const{fragment:r,after_update:c}=t.$$;r&&r.m(e,n),N(()=>{const f=t.$$.on_mount.map(Z).filter(j);t.$$.on_destroy?t.$$.on_destroy.push(...f):v(f),t.$$.on_mount=[]}),c.forEach(N)}function $t(t,e){const n=t.$$;n.fragment!==null&&(X(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ht(t,e){t.$$.dirty[0]===-1&&(tt.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Et(t,e,n,r,c,f,l=null,s=[-1]){const u=Y;B(t);const i=t.$$={fragment:null,ctx:[],props:f,update:x,not_equal:c,bound:A(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:A(),dirty:s,skip_bound:!1,root:e.target||u.$$.root};l&&l(i.root);let $=!1;if(i.ctx=n?n(t,e.props||{},(o,m,...p)=>{const a=p.length?p[0]:m;return i.ctx&&c(i.ctx[o],i.ctx[o]=a)&&(!i.skip_bound&&i.bound[o]&&i.bound[o](a),$&&ht(t,o)),m}):[],i.update(),$=!0,v(i.before_update),i.fragment=r?r(i.ctx):!1,e.target){if(e.hydrate){nt();const o=V(e.target);i.fragment&&i.fragment.l(o),o.forEach(L)}else i.fragment&&i.fragment.c();e.intro&&ct(t.$$.fragment),_t(t,e.target,e.anchor),st(),q()}B(u)}class Ot{constructor(){R(this,"$$");R(this,"$$set")}$destroy(){$t(this,1),this.$destroy=x}$on(e,n){if(!j(n))return x;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const mt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(mt);export{Ot as S,ct as a,bt as b,wt as c,St as d,$t as e,vt as f,yt as g,Et as i,_t as m,xt as t};
