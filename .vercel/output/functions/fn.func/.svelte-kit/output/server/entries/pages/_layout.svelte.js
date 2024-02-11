import { c as create_ssr_component, e as escape, a as add_attribute, b as compute_slots, d as subscribe, f as createEventDispatcher, g as each, v as validate_component, h as add_classes } from "../../chunks/ssr.js";
import { Connection } from "@solana/web3.js";
import { w as walletStore, i as initialize } from "../../chunks/walletStore.js";
import { i as isConnectingWallet, a as isSignedIn, l as localStorageKey, w as wallets, n as network } from "../../chunks/wallet.js";
import { M as Modal } from "../../chunks/modal.js";
import { w as writable } from "../../chunks/index2.js";
const workSpace = writable(void 0);
const ConnectionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { network: network2, config = "processed" } = $$props;
  const connection = new Connection(network2, config);
  workSpace.set({ connection });
  if ($$props.network === void 0 && $$bindings.network && network2 !== void 0)
    $$bindings.network(network2);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  return ``;
});
const WalletButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { disabled = false } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<button class="${"wallet-adapter-button " + escape(className, true)}"${add_attribute("style", `justify-content: space-between;`, 0)} ${disabled ? "disabled" : ""}>${$$slots["start-icon"] ? `<i class="wallet-adapter-button-start-icon">${slots["start-icon"] ? slots["start-icon"]({}) : ``}</i>` : ``} ${slots.default ? slots.default({}) : ``} <span>${slots.status ? slots.status({}) : ``}</span></button>`;
});
const WalletModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let numberOfWalletsShown;
  let walletsAvailable;
  let $walletStore, $$unsubscribe_walletStore;
  $$unsubscribe_walletStore = subscribe(walletStore, (value) => $walletStore = value);
  let { maxNumberOfWallets } = $$props;
  let backdrop, container;
  createEventDispatcher();
  if ($$props.maxNumberOfWallets === void 0 && $$bindings.maxNumberOfWallets && maxNumberOfWallets !== void 0)
    $$bindings.maxNumberOfWallets(maxNumberOfWallets);
  numberOfWalletsShown = maxNumberOfWallets;
  walletsAvailable = $walletStore.wallets.filter((wallet) => wallet.readyState === "Installed").length;
  $$unsubscribe_walletStore();
  return ` <div aria-labelledby="wallet-adapter-modal-title" aria-modal="true" class="wallet-adapter-modal wallet-adapter-modal-fade-in" role="dialog"${add_attribute("this", backdrop, 0)}><div class="wallet-adapter-modal-container"${add_attribute("this", container, 0)}><div class="wallet-adapter-modal-wrapper"><h1 class="wallet-adapter-modal-title">${escape(walletsAvailable ? "Connect a wallet on Solana to continue" : `You'll need a wallet on Solana to continue`)}</h1> <button class="wallet-adapter-modal-button-close" data-svelte-h="svelte-fottuo"><svg width="14" height="14"><path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path></svg></button> ${walletsAvailable ? `<ul class="wallet-adapter-modal-list">${each($walletStore.wallets.slice(0, numberOfWalletsShown), ({ adapter: { name, icon, url }, readyState }) => {
    return `<li>${validate_component(WalletButton, "WalletButton").$$render($$result, {}, {}, {
      status: () => {
        return `${escape(readyState === "Installed" ? "Detected" : "")} `;
      },
      "start-icon": () => {
        return `<img${add_attribute("src", icon, 0)}${add_attribute("alt", `${name} icon`, 0)}> `;
      },
      default: () => {
        return `${escape(name)} `;
      }
    })} </li>`;
  })}</ul> ${$walletStore.wallets.length > maxNumberOfWallets ? `<button class="${[
    "wallet-adapter-modal-list-more",
    ""
  ].join(" ").trim()}" style="justify-content: space-between;"><span>${escape("More")} options</span> <svg width="13" height="7" viewBox="0 0 13 7" xmlns="http://www.w3.org/2000/svg"${add_classes("".trim())}><path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"></path></svg></button>` : ``}` : `<div class="wallet-adapter-modal-middle"><svg width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="48.5" cy="48" r="48" fill="url(#paint0_linear_880_5115)" fill-opacity="0.1"></circle><circle cx="48.5" cy="48" r="47" stroke="url(#paint1_linear_880_5115)" stroke-opacity="0.4" stroke-width="2"></circle><g clip-path="url(#clip0_880_5115)"><path d="M65.5769 28.1523H31.4231C27.6057 28.1523 24.5 31.258 24.5 35.0754V60.9215C24.5 64.7389 27.6057 67.8446 31.4231 67.8446H65.5769C69.3943 67.8446 72.5 64.7389 72.5 60.9215V35.0754C72.5 31.258 69.3943 28.1523 65.5769 28.1523ZM69.7308 52.1523H59.5769C57.2865 52.1523 55.4231 50.289 55.4231 47.9985C55.4231 45.708 57.2864 43.8446 59.5769 43.8446H69.7308V52.1523ZM69.7308 41.0754H59.5769C55.7595 41.0754 52.6539 44.1811 52.6539 47.9985C52.6539 51.8159 55.7595 54.9215 59.5769 54.9215H69.7308V60.9215C69.7308 63.2119 67.8674 65.0754 65.5769 65.0754H31.4231C29.1327 65.0754 27.2692 63.212 27.2692 60.9215V35.0754C27.2692 32.785 29.1326 30.9215 31.4231 30.9215H65.5769C67.8673 30.9215 69.7308 32.7849 69.7308 35.0754V41.0754Z" fill="url(#paint2_linear_880_5115)"></path><path d="M61.4231 46.6172H59.577C58.8123 46.6172 58.1924 47.2371 58.1924 48.0018C58.1924 48.7665 58.8123 49.3863 59.577 49.3863H61.4231C62.1878 49.3863 62.8077 48.7664 62.8077 48.0018C62.8077 47.2371 62.1878 46.6172 61.4231 46.6172Z" fill="url(#paint3_linear_880_5115)"></path></g><defs><linearGradient id="paint0_linear_880_5115" x1="3.41664" y1="98.0933" x2="103.05" y2="8.42498" gradientUnits="userSpaceOnUse"><stop stop-color="#9945FF"></stop><stop offset="0.14" stop-color="#8A53F4"></stop><stop offset="0.42" stop-color="#6377D6"></stop><stop offset="0.79" stop-color="#24B0A7"></stop><stop offset="0.99" stop-color="#00D18C"></stop><stop offset="1" stop-color="#00D18C"></stop></linearGradient><linearGradient id="paint1_linear_880_5115" x1="3.41664" y1="98.0933" x2="103.05" y2="8.42498" gradientUnits="userSpaceOnUse"><stop stop-color="#9945FF"></stop><stop offset="0.14" stop-color="#8A53F4"></stop><stop offset="0.42" stop-color="#6377D6"></stop><stop offset="0.79" stop-color="#24B0A7"></stop><stop offset="0.99" stop-color="#00D18C"></stop><stop offset="1" stop-color="#00D18C"></stop></linearGradient><linearGradient id="paint2_linear_880_5115" x1="25.9583" y1="68.7101" x2="67.2337" y2="23.7879" gradientUnits="userSpaceOnUse"><stop stop-color="#9945FF"></stop><stop offset="0.14" stop-color="#8A53F4"></stop><stop offset="0.42" stop-color="#6377D6"></stop><stop offset="0.79" stop-color="#24B0A7"></stop><stop offset="0.99" stop-color="#00D18C"></stop><stop offset="1" stop-color="#00D18C"></stop></linearGradient><linearGradient id="paint3_linear_880_5115" x1="58.3326" y1="49.4467" x2="61.0002" y2="45.4453" gradientUnits="userSpaceOnUse"><stop stop-color="#9945FF"></stop><stop offset="0.14" stop-color="#8A53F4"></stop><stop offset="0.42" stop-color="#6377D6"></stop><stop offset="0.79" stop-color="#24B0A7"></stop><stop offset="0.99" stop-color="#00D18C"></stop><stop offset="1" stop-color="#00D18C"></stop></linearGradient><clip-path id="clip0_880_5115"><rect width="48" height="48" fill="white" transform="translate(24.5 24)"></rect></clip-path></defs></svg> <button type="button" class="wallet-adapter-modal-middle-button" data-svelte-h="svelte-l5mn6o">Get started</button></div> <button class="${[
    "wallet-adapter-modal-list-more",
    ""
  ].join(" ").trim()}" style="justify-content: space-between;"><span>${escape("Already have a wallet? View options")}</span> <svg width="13" height="7" viewBox="0 0 13 7" xmlns="http://www.w3.org/2000/svg"${add_classes("".trim())}><path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z"></path></svg></button> ${``}`}</div></div></div>`;
});
const WalletProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { localStorageKey: localStorageKey2, wallets: wallets2, autoConnect = false, onError = (error) => console.error(error) } = $$props;
  if ($$props.localStorageKey === void 0 && $$bindings.localStorageKey && localStorageKey2 !== void 0)
    $$bindings.localStorageKey(localStorageKey2);
  if ($$props.wallets === void 0 && $$bindings.wallets && wallets2 !== void 0)
    $$bindings.wallets(wallets2);
  if ($$props.autoConnect === void 0 && $$bindings.autoConnect && autoConnect !== void 0)
    $$bindings.autoConnect(autoConnect);
  if ($$props.onError === void 0 && $$bindings.onError && onError !== void 0)
    $$bindings.onError(onError);
  wallets2 && initialize({
    wallets: wallets2,
    autoConnect,
    localStorageKey: localStorageKey2,
    onError
  });
  return `${$$result.head += `<!-- HEAD_svelte-4kgl3m_START --><script data-svelte-h="svelte-10zd32q">window.global = window;<\/script><!-- HEAD_svelte-4kgl3m_END -->`, ""}`;
});
const css$1 = {
  code: "svg.svelte-3h8371{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}",
  map: null
};
const IconBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = null } = $$props;
  let { viewBox } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
    $$bindings.viewBox(viewBox);
  $$result.css.add(css$1);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("viewBox", viewBox, 0)} class="svelte-3h8371">${title ? `<title>${escape(title)}</title>` : ``}${slots.default ? slots.default({}) : ``}</svg>`;
});
const FaBan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({}, { viewBox: "0 0 512 512" }, $$props), {}, {
    default: () => {
      return `<path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path>`;
    }
  })}`;
});
const css = {
  code: ".btn.svelte-1eppdme{transition:all 0.3s}.btn.svelte-1eppdme:hover{background-color:rgb(255 237 213);transform:scale(1.1)}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isConnectingWallet, $$unsubscribe_isConnectingWallet;
  let $walletStore, $$unsubscribe_walletStore;
  let $isSignedIn, $$unsubscribe_isSignedIn;
  $$unsubscribe_isConnectingWallet = subscribe(isConnectingWallet, (value) => $isConnectingWallet = value);
  $$unsubscribe_walletStore = subscribe(walletStore, (value) => $walletStore = value);
  $$unsubscribe_isSignedIn = subscribe(isSignedIn, (value) => $isSignedIn = value);
  $$result.css.add(css);
  $$unsubscribe_isConnectingWallet();
  $$unsubscribe_walletStore();
  $$unsubscribe_isSignedIn();
  return `<div class="text-white text-2xl w-full p-4 fixed top-0 left-0 z-50">${validate_component(Modal, "ChangingModal").$$render($$result, {}, {}, {})} ${$isConnectingWallet ? `${validate_component(WalletModal, "WalletModal").$$render($$result, { maxNumberOfWallets: "6" }, {}, {})}` : ``} <nav class="p-2 flex flex-wrap justify-between items-center mx-auto max-w-6xl text-black h-[60px]">${$walletStore.publicKey && $isSignedIn ? `<img src="/favicon.png" class="h-14 w-114"> <div class="flex"><button class="btn btn-sm text-sm flex flex-row items-center gap-1 svelte-1eppdme"><div class="h-4 w-4">${validate_component(FaBan, "Disconnect").$$render($$result, {}, {}, {})}</div> ${escape($walletStore.publicKey.toBase58().slice(0, 4))}...</button></div>` : ``}</nav></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(WalletProvider, "WalletProvider").$$render(
    $$result,
    {
      localStorageKey,
      wallets,
      autoConnect: true
    },
    {},
    {}
  )} ${validate_component(ConnectionProvider, "ConnectionProvider").$$render($$result, { network }, {}, {})} <div class="flex flex-col gap-2 justify-top items-center bg-cover w-full" style="min-height: calc(100vh); background-image: url(background1.jpg);">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
