import { c as create_ssr_component, d as subscribe, g as each, e as escape, v as validate_component } from "./ssr.js";
import { Connection } from "@solana/web3.js";
import "buffer";
import { w as walletStore } from "./walletStore.js";
import { w as writable } from "./index2.js";
const userModal = writable(
  { type: "signin" }
);
const assistants = [
  {
    name: "GPT 3.5",
    id: "asst_JDuAOrAyViXMVwMPEFyGlfPp",
    priceMultiplier: 1
  },
  {
    name: "GPT 4",
    id: "asst_HuN786BrRzdGc5s7w7WGQLWe",
    priceMultiplier: 45
  }
];
const tiers = [
  {
    amount: 0.1,
    tokens: 1e6,
    price: 0.011
  },
  {
    amount: 0.2,
    tokens: 1e7,
    price: 0.11
  },
  {
    amount: 1,
    tokens: 1e8,
    price: 1.1
  }
];
const startingQuestions = [
  "What can I help you with?",
  "How can I help you?",
  "What can I do for you?",
  "What would you like to do?",
  "What would you like to talk about?",
  "What would you like to discuss?",
  "How can I be of service?"
];
function convertFromZerosToName(number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(0) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(0) + "M";
  } else {
    return number;
  }
}
const Pay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_walletStore;
  $$unsubscribe_walletStore = subscribe(walletStore, (value) => value);
  new Connection("https://api.devnet.solana.com");
  $$unsubscribe_walletStore();
  return `<dialog id="pay_modal" class="modal"><div class="modal-box"><div>${`<div class="flex flex-col gap-2 flex-wrap text-center"><div class="flex flex-row pb-2 justify-center" data-svelte-h="svelte-tml862"> <div class="text-center"> <h3 class="font-bold text-4xl inline-block">Buy credits</h3> </div></div> <div class="flex flex-row justify-center gap-2">${each(tiers, (tier) => {
    return `<button class="button"><div class="flex flex-col justify-center items-center rounded-2xl p-2"><h3 class="text-2xl font-semibold">+${escape(convertFromZerosToName(tier.tokens))} tokens</h3> <p class="text-sm">${escape(tier.price.toFixed(3))} SOL</p></div> </button>`;
  })}</div></div>`}</div></div></dialog>`;
});
const Signin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<dialog id="signin_modal" class="modal" data-svelte-h="svelte-16dt6j6"><div class="modal-box"><div class="flex gap-4 flex-wrap text-center"><div><div class="flex flex-row pb-2 justify-center"> <div class="text-center"> <h3 class="font-bold text-4xl inline-block">Sign here</h3> </div> <svg class="w-12 h-12 bounce" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg></div> <p class="text-sm font-semibold">Sign the following message to prove you own this wallet.</p></div></div></div></dialog>`;
});
const EditName = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<dialog id="signin_modal" class="modal bg-slate-100 rounded-2xl p-2" data-svelte-h="svelte-ae026x"><div class="modal-box"><div class="flex gap-4 flex-wrap"><div class=""><button class="btn btn-ghost loading"></button></div> <div><h3 class="font-bold text-lg">Signing In...</h3> <p class="text-sm">Sign the following message to prove you own this wallet.</p></div></div></div></dialog>`;
});
const Creating = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<dialog id="signin_modal" class="modal" data-svelte-h="svelte-1w7a9ez"><div class="modal-box"><div class="flex gap-4 flex-wrap text-center"><div><div class="flex flex-row pb-2 justify-center"> <div class="text-center"> <h3 class="font-bold text-4xl inline-block">Creating your account</h3> </div> <svg class="w-12 h-12 bounce" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg></div> <p class="text-sm font-semibold">Please wait a second.</p></div></div></div></dialog>`;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userModal, $$unsubscribe_userModal;
  $$unsubscribe_userModal = subscribe(userModal, (value) => $userModal = value);
  $$unsubscribe_userModal();
  return ` ${$userModal.type === "pay" ? `${validate_component(Pay, "Pay").$$render($$result, {}, {}, {})}` : `${$userModal.type === "signin" ? `${validate_component(Signin, "Signin").$$render($$result, {}, {}, {})}` : `${$userModal.type === "editName" ? `${validate_component(EditName, "EditName").$$render($$result, {}, {}, {})}` : `${$userModal.type === "creating" ? `${validate_component(Creating, "Creating").$$render($$result, {}, {}, {})}` : ``}`}`}`}`;
});
export {
  Modal as M,
  assistants as a,
  startingQuestions as s,
  userModal as u
};
