import{i as q,P as B,V as H}from"./modals.fz6RkjOm.js";import{S as G,b as J,d as Q,e as b}from"./wallet.LmsCVzPH.js";var R={exports:{}};(function(i){var t=Object.prototype.hasOwnProperty,e="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(e=!1));function s(h,a,r){this.fn=h,this.context=a,this.once=r||!1}function o(h,a,r,c,v){if(typeof r!="function")throw new TypeError("The listener must be a function");var p=new s(r,c||h,v),f=e?e+a:a;return h._events[f]?h._events[f].fn?h._events[f]=[h._events[f],p]:h._events[f].push(p):(h._events[f]=p,h._eventsCount++),h}function d(h,a){--h._eventsCount===0?h._events=new n:delete h._events[a]}function u(){this._events=new n,this._eventsCount=0}u.prototype.eventNames=function(){var a=[],r,c;if(this._eventsCount===0)return a;for(c in r=this._events)t.call(r,c)&&a.push(e?c.slice(1):c);return Object.getOwnPropertySymbols?a.concat(Object.getOwnPropertySymbols(r)):a},u.prototype.listeners=function(a){var r=e?e+a:a,c=this._events[r];if(!c)return[];if(c.fn)return[c.fn];for(var v=0,p=c.length,f=new Array(p);v<p;v++)f[v]=c[v].fn;return f},u.prototype.listenerCount=function(a){var r=e?e+a:a,c=this._events[r];return c?c.fn?1:c.length:0},u.prototype.emit=function(a,r,c,v,p,f){var y=e?e+a:a;if(!this._events[y])return!1;var l=this._events[y],w=arguments.length,S,_;if(l.fn){switch(l.once&&this.removeListener(a,l.fn,void 0,!0),w){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,r),!0;case 3:return l.fn.call(l.context,r,c),!0;case 4:return l.fn.call(l.context,r,c,v),!0;case 5:return l.fn.call(l.context,r,c,v,p),!0;case 6:return l.fn.call(l.context,r,c,v,p,f),!0}for(_=1,S=new Array(w-1);_<w;_++)S[_-1]=arguments[_];l.fn.apply(l.context,S)}else{var V=l.length,x;for(_=0;_<V;_++)switch(l[_].once&&this.removeListener(a,l[_].fn,void 0,!0),w){case 1:l[_].fn.call(l[_].context);break;case 2:l[_].fn.call(l[_].context,r);break;case 3:l[_].fn.call(l[_].context,r,c);break;case 4:l[_].fn.call(l[_].context,r,c,v);break;default:if(!S)for(x=1,S=new Array(w-1);x<w;x++)S[x-1]=arguments[x];l[_].fn.apply(l[_].context,S)}}return!0},u.prototype.on=function(a,r,c){return o(this,a,r,c,!1)},u.prototype.once=function(a,r,c){return o(this,a,r,c,!0)},u.prototype.removeListener=function(a,r,c,v){var p=e?e+a:a;if(!this._events[p])return this;if(!r)return d(this,p),this;var f=this._events[p];if(f.fn)f.fn===r&&(!v||f.once)&&(!c||f.context===c)&&d(this,p);else{for(var y=0,l=[],w=f.length;y<w;y++)(f[y].fn!==r||v&&!f[y].once||c&&f[y].context!==c)&&l.push(f[y]);l.length?this._events[p]=l.length===1?l[0]:l:d(this,p)}return this},u.prototype.removeAllListeners=function(a){var r;return a?(r=e?e+a:a,this._events[r]&&d(this,r)):(this._events=new n,this._eventsCount=0),this},u.prototype.off=u.prototype.removeListener,u.prototype.addListener=u.prototype.on,u.prefixed=e,u.EventEmitter=u,i.exports=u})(R);var X=R.exports;const Y=q(X);let M;const Z=new Uint8Array(16);function ee(){if(!M&&(M=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!M))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return M(Z)}const m=[];for(let i=0;i<256;++i)m.push((i+256).toString(16).slice(1));function te(i,t=0){return m[i[t+0]]+m[i[t+1]]+m[i[t+2]]+m[i[t+3]]+"-"+m[i[t+4]]+m[i[t+5]]+"-"+m[i[t+6]]+m[i[t+7]]+"-"+m[i[t+8]]+m[i[t+9]]+"-"+m[i[t+10]]+m[i[t+11]]+m[i[t+12]]+m[i[t+13]]+m[i[t+14]]+m[i[t+15]]}const ne=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),N={randomUUID:ne};function ie(i,t,e){if(N.randomUUID&&!t&&!i)return N.randomUUID();i=i||{};const n=i.random||(i.rng||ee)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){e=e||0;for(let s=0;s<16;++s)t[e+s]=n[s];return t}return te(n)}function P(i){return i.version===void 0}function se(i){return P(i)?i.serialize({verifySignatures:!1,requireAllSignatures:!1}):i.serialize()}function F(i){return P(i)?i.serializeMessage():i.message.serialize()}function U(i,t,e){if(P(i))i.addSignature(t,Buffer.from(e));else{const s=i.message.staticAccountKeys.slice(0,i.message.header.numRequiredSignatures).findIndex(o=>o.equals(t));s>=0&&(i.signatures[s]=e)}}var D=function(i,t,e,n){function s(o){return o instanceof e?o:new e(function(d){d(o)})}return new(e||(e=Promise))(function(o,d){function u(r){try{a(n.next(r))}catch(c){d(c)}}function h(r){try{a(n.throw(r))}catch(c){d(c)}}function a(r){r.done?o(r.value):s(r.value).then(u,h)}a((n=n.apply(i,t||[])).next())})};function O(i){return D(this,void 0,void 0,function*(){try{return yield i.request({method:"wallet_getSnaps"}),!0}catch{return!1}})}function re(){return D(this,void 0,void 0,function*(){try{const i=window.ethereum;if(!i)return null;if(i.providers&&Array.isArray(i.providers)){const t=i.providers;for(const e of t)if(yield O(e))return e}if(i.detected&&Array.isArray(i.detected)){const t=i.detected;for(const e of t)if(yield O(e))return e}return(yield O(i))?i:null}catch(i){return console.error(i),null}})}const oe="solana:mainnet",ae="solana:devnet",ce="solana:testnet",le="solana:localnet",$=[oe,ae,ce,le];function L(i){return $.includes(i)}var E=function(i,t,e,n){if(e==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?i!==t||!n:!t.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?n:e==="a"?n.call(i):n?n.value:t.get(i)},A=function(i,t,e,n,s){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?i!==t||!s:!t.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?s.call(i,e):s?s.value=e:t.set(i,e),e},T,C,I,K,k,z;const de=$,he=[G,J,Q];class j{get address(){return E(this,T,"f")}get publicKey(){return E(this,C,"f").slice()}get chains(){return E(this,I,"f").slice()}get features(){return E(this,K,"f").slice()}get label(){return E(this,k,"f")}get icon(){return E(this,z,"f")}constructor({address:t,publicKey:e,label:n,icon:s}){T.set(this,void 0),C.set(this,void 0),I.set(this,void 0),K.set(this,void 0),k.set(this,void 0),z.set(this,void 0),new.target===j&&Object.freeze(this),A(this,T,t,"f"),A(this,C,e,"f"),A(this,I,de,"f"),A(this,K,he,"f"),A(this,k,n,"f"),A(this,z,s,"f")}}T=new WeakMap,C=new WeakMap,I=new WeakMap,K=new WeakMap,k=new WeakMap,z=new WeakMap;var g=function(i,t,e,n){function s(o){return o instanceof e?o:new e(function(d){d(o)})}return new(e||(e=Promise))(function(o,d){function u(r){try{a(n.next(r))}catch(c){d(c)}}function h(r){try{a(n.throw(r))}catch(c){d(c)}}function a(r){r.done?o(r.value):s(r.value).then(u,h)}a((n=n.apply(i,t||[])).next())})};class W extends Y{constructor(t){super(),this._network="mainnet-beta",this._iframeParams={},this._element=null,this._iframe=null,this._publicKey=null,this._account=null,this._isConnected=!1,this._connectHandler=null,this._messageHandlers={},this._handleEvent=e=>{var n,s;switch(e.type){case"connect":{this._collapseIframe(),!((n=e.data)===null||n===void 0)&&n.publicKey?(this._publicKey=e.data.publicKey,this._isConnected=!0,this._connectHandler&&(this._connectHandler.resolve(),this._connectHandler=null),this._connected()):(this._connectHandler&&(this._connectHandler.reject(),this._connectHandler=null),this._disconnected());return}case"disconnect":{this._connectHandler&&(this._connectHandler.reject(),this._connectHandler=null),this._disconnected();return}case"accountChanged":{!((s=e.data)===null||s===void 0)&&s.publicKey?(this._publicKey=e.data.publicKey,this.emit("accountChanged",this.publicKey),this._standardConnected()):(this.emit("accountChanged",void 0),this._standardDisconnected());return}default:return}},this._handleResize=e=>{e.resizeMode==="full"?e.params.mode==="fullscreen"?this._expandIframe():e.params.mode==="hide"&&this._collapseIframe():e.resizeMode==="coordinates"&&this._resizeIframe(e.params)},this._handleMessage=e=>{var n;if(((n=e.data)===null||n===void 0?void 0:n.channel)!=="solflareIframeToWalletAdapter")return;const s=e.data.data||{};if(s.type==="event")this._handleEvent(s.event);else if(s.type==="resize")this._handleResize(s);else if(s.type==="response"&&this._messageHandlers[s.id]){const{resolve:o,reject:d}=this._messageHandlers[s.id];delete this._messageHandlers[s.id],s.error?d(s.error):o(s.result)}},this._removeElement=()=>{this._element&&(this._element.remove(),this._element=null)},this._removeDanglingElements=()=>{const e=document.getElementsByClassName("solflare-metamask-wallet-adapter-iframe");for(const n of e)n.parentElement&&n.remove()},this._injectElement=()=>{this._removeElement(),this._removeDanglingElements();const e=Object.assign(Object.assign({},this._iframeParams),{mm:!0,v:1,cluster:this._network||"mainnet-beta",origin:window.location.origin||"",title:document.title||""}),n=Object.keys(e).map(o=>`${o}=${encodeURIComponent(e[o])}`).join("&"),s=`${W.IFRAME_URL}?${n}`;this._element=document.createElement("div"),this._element.className="solflare-metamask-wallet-adapter-iframe",this._element.innerHTML=`
      <iframe src='${s}' style='position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; border: none; border-radius: 0; z-index: 99999; color-scheme: auto;' allowtransparency='true'></iframe>
    `,document.body.appendChild(this._element),this._iframe=this._element.querySelector("iframe"),window.addEventListener("message",this._handleMessage,!1)},this._collapseIframe=()=>{this._iframe&&(this._iframe.style.top="",this._iframe.style.right="",this._iframe.style.height="2px",this._iframe.style.width="2px")},this._expandIframe=()=>{this._iframe&&(this._iframe.style.top="0px",this._iframe.style.bottom="0px",this._iframe.style.left="0px",this._iframe.style.right="0px",this._iframe.style.width="100%",this._iframe.style.height="100%")},this._resizeIframe=e=>{this._iframe&&(this._iframe.style.top=isFinite(e.top)?`${e.top}px`:"",this._iframe.style.bottom=isFinite(e.bottom)?`${e.bottom}px`:"",this._iframe.style.left=isFinite(e.left)?`${e.left}px`:"",this._iframe.style.right=isFinite(e.right)?`${e.right}px`:"",this._iframe.style.width=isFinite(e.width)?`${e.width}px`:e.width,this._iframe.style.height=isFinite(e.height)?`${e.height}px`:e.height)},this._sendIframeMessage=e=>{if(!this.connected||!this.publicKey)throw new Error("Wallet not connected");return new Promise((n,s)=>{var o,d;const u=ie();this._messageHandlers[u]={resolve:n,reject:s},(d=(o=this._iframe)===null||o===void 0?void 0:o.contentWindow)===null||d===void 0||d.postMessage({channel:"solflareWalletAdapterToIframe",data:Object.assign({id:u},e)},"*")})},this._connected=()=>{this._isConnected=!0,this.emit("connect",this.publicKey),this._standardConnected()},this._disconnected=()=>{this._publicKey=null,this._isConnected=!1,window.removeEventListener("message",this._handleMessage,!1),this._removeElement(),this.emit("disconnect"),this._standardDisconnected()},this._standardConnected=()=>{if(!this.publicKey)return;const e=this.publicKey.toString();(!this._account||this._account.address!==e)&&(this._account=new j({address:e,publicKey:this.publicKey.toBytes()}),this.emit("standard_change",{accounts:this.standardAccounts}))},this._standardDisconnected=()=>{this._account&&(this._account=null,this.emit("standard_change",{accounts:this.standardAccounts}))},t!=null&&t.network&&(this._network=t==null?void 0:t.network),window.SolflareMetaMaskParams&&(this._iframeParams=Object.assign(Object.assign({},this._iframeParams),window.SolflareMetaMaskParams)),t!=null&&t.params&&(this._iframeParams=Object.assign(Object.assign({},this._iframeParams),t==null?void 0:t.params))}get publicKey(){return this._publicKey?new B(this._publicKey):null}get standardAccount(){return this._account}get standardAccounts(){return this._account?[this._account]:[]}get isConnected(){return this._isConnected}get connected(){return this.isConnected}get autoApprove(){return!1}connect(){return g(this,void 0,void 0,function*(){this.connected||(this._injectElement(),yield new Promise((t,e)=>{this._connectHandler={resolve:t,reject:e}}))})}disconnect(){return g(this,void 0,void 0,function*(){yield this._sendIframeMessage({method:"disconnect"}),this._disconnected()})}signTransaction(t){var e;return g(this,void 0,void 0,function*(){if(!this.connected||!this.publicKey)throw new Error("Wallet not connected");try{const n=F(t),{signature:s}=yield this._sendIframeMessage({method:"signTransaction",params:{message:b.encode(n)}});return U(t,this.publicKey,b.decode(s)),t}catch(n){throw new Error(((e=n==null?void 0:n.toString)===null||e===void 0?void 0:e.call(n))||"Failed to sign transaction")}})}signAllTransactions(t){var e;return g(this,void 0,void 0,function*(){if(!this.connected||!this.publicKey)throw new Error("Wallet not connected");try{const n=t.map(o=>F(o)),{signatures:s}=yield this._sendIframeMessage({method:"signAllTransactions",params:{messages:n.map(o=>b.encode(o))}});for(let o=0;o<t.length;o++)U(t[o],this.publicKey,b.decode(s[o]));return t}catch(n){throw new Error(((e=n==null?void 0:n.toString)===null||e===void 0?void 0:e.call(n))||"Failed to sign transactions")}})}signAndSendTransaction(t,e){var n;return g(this,void 0,void 0,function*(){if(!this.connected||!this.publicKey)throw new Error("Wallet not connected");try{const s=se(t),{signature:o}=yield this._sendIframeMessage({method:"signAndSendTransaction",params:{transaction:b.encode(s),options:e}});return o}catch(s){throw new Error(((n=s==null?void 0:s.toString)===null||n===void 0?void 0:n.call(s))||"Failed to sign and send transaction")}})}signMessage(t,e="utf8"){var n;return g(this,void 0,void 0,function*(){if(!this.connected||!this.publicKey)throw new Error("Wallet not connected");try{const{signature:s}=yield this._sendIframeMessage({method:"signMessage",params:{data:b.encode(t),display:e}});return Uint8Array.from(b.decode(s))}catch(s){throw new Error(((n=s==null?void 0:s.toString)===null||n===void 0?void 0:n.call(s))||"Failed to sign message")}})}sign(t,e="utf8"){return g(this,void 0,void 0,function*(){return yield this.signMessage(t,e)})}static isSupported(){return g(this,void 0,void 0,function*(){return!!(yield re())})}standardSignAndSendTransaction(...t){return g(this,void 0,void 0,function*(){if(!this.connected)throw new Error("not connected");const e=[];if(t.length===1){const{transaction:n,account:s,chain:o,options:d}=t[0],{minContextSlot:u,preflightCommitment:h,skipPreflight:a,maxRetries:r}=d||{};if(s!==this._account)throw new Error("invalid account");if(!L(o))throw new Error("invalid chain");const c=yield this.signAndSendTransaction(H.deserialize(n),{preflightCommitment:h,minContextSlot:u,maxRetries:r,skipPreflight:a});e.push({signature:b.decode(c)})}else if(t.length>1)for(const n of t)e.push(...yield this.standardSignAndSendTransaction(n));return e})}standardSignTransaction(...t){return g(this,void 0,void 0,function*(){if(!this.connected)throw new Error("not connected");const e=[];if(t.length===1){const{transaction:n,account:s,chain:o}=t[0];if(s!==this._account)throw new Error("invalid account");if(o&&!L(o))throw new Error("invalid chain");const d=yield this.signTransaction(H.deserialize(n));e.push({signedTransaction:d.serialize()})}else if(t.length>1){let n;for(const d of t){if(d.account!==this._account)throw new Error("invalid account");if(d.chain){if(!L(d.chain))throw new Error("invalid chain");if(n){if(d.chain!==n)throw new Error("conflicting chain")}else n=d.chain}}const s=t.map(({transaction:d})=>H.deserialize(d)),o=yield this.signAllTransactions(s);e.push(...o.map(d=>({signedTransaction:d.serialize()})))}return e})}standardSignMessage(...t){return g(this,void 0,void 0,function*(){if(!this.connected)throw new Error("not connected");const e=[];if(t.length===1){const{message:n,account:s}=t[0];if(s!==this._account)throw new Error("invalid account");const o=yield this.signMessage(n);e.push({signedMessage:n,signature:o})}else if(t.length>1)for(const n of t)e.push(...yield this.standardSignMessage(n));return e})}}W.IFRAME_URL="https://widget.solflare.com/";export{j as StandardSolflareMetaMaskWalletAccount,W as default};
