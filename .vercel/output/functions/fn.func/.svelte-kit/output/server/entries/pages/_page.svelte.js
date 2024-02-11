import { c as create_ssr_component, d as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { i as isConnectingWallet, b as isSigningIn } from "../../chunks/wallet.js";
import { w as walletStore } from "../../chunks/walletStore.js";
const css = {
  code: "#sentence.svelte-1nwj6ie{height:40px;overflow:hidden;white-space:nowrap}.btn.svelte-1nwj6ie{transition:all 0.3s}.btn.svelte-1nwj6ie:hover{background-color:rgb(255 237 213);transform:scale(1.1)}",
  map: null
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="w-full flex-grow flex flex-col gap-4 justify-center items-center"><img src="/favicon.png" class="w-32 h-32" alt="logo"> <h1 class="text-6xl font-bold" data-svelte-h="svelte-xlyn6b">Get Started</h1> <p id="sentence" class="text-2xl font-semibold svelte-1nwj6ie"></p> <button class="btn text-lg font-black bg-orange-100/70 hover: svelte-1nwj6ie" data-svelte-h="svelte-1drlp26">Connect</button></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_walletStore;
  let $isConnectingWallet, $$unsubscribe_isConnectingWallet;
  let $isSigningIn, $$unsubscribe_isSigningIn;
  $$unsubscribe_walletStore = subscribe(walletStore, (value) => value);
  $$unsubscribe_isConnectingWallet = subscribe(isConnectingWallet, (value) => $isConnectingWallet = value);
  $$unsubscribe_isSigningIn = subscribe(isSigningIn, (value) => $isSigningIn = value);
  $$unsubscribe_walletStore();
  $$unsubscribe_isConnectingWallet();
  $$unsubscribe_isSigningIn();
  return `<div class="h-screen w-full flex">${$isConnectingWallet === false && $isSigningIn === false ? `${validate_component(Login, "Login").$$render($$result, {}, {}, {})}` : ``}</div>`;
});
export {
  Page as default
};
