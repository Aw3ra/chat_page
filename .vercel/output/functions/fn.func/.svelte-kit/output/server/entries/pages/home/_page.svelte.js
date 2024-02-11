import { c as create_ssr_component, d as subscribe, v as validate_component, e as escape, g as each, a as add_attribute } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index2.js";
import { a as assistants, u as userModal, M as Modal, s as startingQuestions } from "../../../chunks/modal.js";
import "js-tiktoken";
import { w as walletStore } from "../../../chunks/walletStore.js";
async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    return response.json();
  }
  return response.json();
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const initialUserState = {
  loading: false,
  error: false,
  data: null
};
function createUserStore() {
  const { subscribe: subscribe2, set, update } = writable(initialUserState);
  async function doFetchUser(publicKey) {
    update((state) => ({ ...state, loading: true }));
    try {
      let response = await postRequest("/api/database/user/find", { pubkey: publicKey });
      if (response.status !== 200) {
        userModal.set({ type: "creating" });
        response = await postRequest("/api/database/user/create", { pubkey: publicKey });
      }
      update((state) => ({ ...state, data: response.body }));
    } catch (error) {
      console.error("Error fetching/creating user:", error);
      update((state) => ({ ...state, error: true }));
    } finally {
      update((state) => ({ ...state, loading: false }));
    }
  }
  async function fetchUser(publicKey, retries = 2) {
    try {
      await doFetchUser(publicKey);
    } catch (error) {
      if (retries > 0) {
        await wait(1500);
        fetchUser(publicKey, retries - 1);
      } else {
        console.error("Final error after retries:", error);
      }
    }
  }
  async function createThread(content, publicKey, assistant) {
    try {
      const thread = await postRequest("/api/database/conversations/create", { content, assistant });
      const date = /* @__PURE__ */ new Date();
      const name = assistants.find((asst) => asst.id === assistant)?.name;
      update((state) => {
        if (state.data) {
          state.data.conversations.push(
            {
              id: thread.body,
              created: date,
              name: date.toLocaleString(),
              model: name ? name : "GPT 3.5"
            }
          );
        }
        return state;
      });
      await updateUserConversations(publicKey);
      return thread.body;
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  }
  async function deleteThread(threadId, publicKey) {
    update((state) => {
      if (state.data) {
        for (var i = 0; i < state.data.conversations.length; i++) {
          if (state.data.conversations[i].id === threadId) {
            state.data.conversations.splice(i, 1);
            break;
          }
        }
      }
      return state;
    });
    await updateUserConversations(publicKey);
  }
  async function editThread(threadId, publicKey, newName) {
    update((state) => {
      if (state.data) {
        for (var i = 0; i < state.data.conversations.length; i++) {
          if (state.data.conversations[i].id === threadId) {
            state.data.conversations[i].name = newName;
            break;
          }
        }
      }
      return state;
    });
    await updateUserConversations(publicKey);
  }
  async function updateUserConversations(publicKey) {
    try {
      await postRequest("/api/database/user/update", {
        pubkey: publicKey,
        data: get().data
      });
    } catch (error) {
      console.error("Error updating user conversations:", error);
    }
  }
  async function fetchConversation(threadId) {
    try {
      const thread = await postRequest("/api/openai/fetchConvo", { threadId });
      return thread.body;
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  }
  async function buyCredits($walletStore, credits) {
    try {
      update((state) => {
        if (state.data) {
          state.data.credits += credits;
        }
        return state;
      });
      if (typeof get().data?.credits !== "number") {
        update((state) => {
          if (state.data) {
            state.data.credits = 0;
          }
          return state;
        });
      }
      await postRequest("/api/database/user/update", {
        pubkey: $walletStore.publicKey?.toBase58(),
        data: get().data
      });
    } catch (error) {
      console.error("Error updating user conversations:", error);
    }
  }
  async function spendCredits($walletStore, credits) {
    try {
      update((state) => {
        if (state.data) {
          state.data.credits -= credits;
        }
        return state;
      });
      if (typeof get().data?.credits !== "number") {
        update((state) => {
          if (state.data) {
            state.data.credits = 0;
          }
          return state;
        });
      }
      await postRequest("/api/database/user/update", {
        pubkey: $walletStore.publicKey?.toBase58(),
        data: get().data
      });
    } catch (error) {
      console.error("Error updating user conversations:", error);
    }
  }
  function get() {
    let state;
    update((_) => state = _);
    return state;
  }
  return {
    subscribe: subscribe2,
    fetchUser,
    updateUserConversations,
    fetchConversation,
    buyCredits,
    spendCredits,
    createThread,
    deleteThread,
    editThread,
    get
  };
}
const user = createUserStore();
const editSvg = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21.2799%206.40005L11.7399%2015.94C10.7899%2016.89%207.96987%2017.33%207.33987%2016.7C6.70987%2016.07%207.13987%2013.25%208.08987%2012.3L17.6399%202.75002C17.8754%202.49308%2018.1605%202.28654%2018.4781%202.14284C18.7956%201.99914%2019.139%201.92124%2019.4875%201.9139C19.8359%201.90657%2020.1823%201.96991%2020.5056%202.10012C20.8289%202.23033%2021.1225%202.42473%2021.3686%202.67153C21.6147%202.91833%2021.8083%203.21243%2021.9376%203.53609C22.0669%203.85976%2022.1294%204.20626%2022.1211%204.55471C22.1128%204.90316%2022.0339%205.24635%2021.8894%205.5635C21.7448%205.88065%2021.5375%206.16524%2021.2799%206.40005V6.40005Z'%20stroke='%234B5563'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M11%204H6C4.93913%204%203.92178%204.42142%203.17163%205.17157C2.42149%205.92172%202%206.93913%202%208V18C2%2019.0609%202.42149%2020.0783%203.17163%2020.8284C3.92178%2021.5786%204.93913%2022%206%2022H17C19.21%2022%2020%2020.2%2020%2018V13'%20stroke='%234B5563'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const deleteSvg = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%20-0.5%2021%2021'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3edelete%20[%231487]%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3c/defs%3e%3cg%20id='Page-1'%20stroke='none'%20stroke-width='1'%20fill='%234B5563'%20fill-rule='evenodd'%3e%3cg%20id='Dribbble-Light-Preview'%20transform='translate(-179.000000,%20-360.000000)'%20fill='%234B5563'%3e%3cg%20id='icons'%20transform='translate(56.000000,%20160.000000)'%3e%3cpath%20d='M130.35,216%20L132.45,216%20L132.45,208%20L130.35,208%20L130.35,216%20Z%20M134.55,216%20L136.65,216%20L136.65,208%20L134.55,208%20L134.55,216%20Z%20M128.25,218%20L138.75,218%20L138.75,206%20L128.25,206%20L128.25,218%20Z%20M130.35,204%20L136.65,204%20L136.65,202%20L130.35,202%20L130.35,204%20Z%20M138.75,204%20L138.75,200%20L128.25,200%20L128.25,204%20L123,204%20L123,206%20L126.15,206%20L126.15,220%20L140.85,220%20L140.85,206%20L144,206%20L144,204%20L138.75,204%20Z'%20id='delete-[%231487]'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const sendSvg = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.0004%2018.5816V12.5M12.7976%2018.754L15.8103%2019.7625C17.4511%2020.3118%2018.2714%2020.5864%2018.7773%2020.3893C19.2166%2020.2182%2019.5499%2019.8505%2019.6771%2019.3965C19.8236%2018.8737%2019.4699%2018.0843%2018.7624%2016.5053L14.2198%206.36709C13.5279%204.82299%2013.182%204.05094%2012.7001%203.81172C12.2814%203.60388%2011.7898%203.60309%2011.3705%203.80958C10.8878%204.04726%2010.5394%204.8182%209.84259%206.36006L5.25633%2016.5082C4.54325%2018.086%204.18671%2018.875%204.33169%2019.3983C4.4576%2019.8528%204.78992%2020.2216%205.22888%2020.394C5.73435%2020.5926%206.55603%2020.3198%208.19939%2019.7744L11.2797%2018.752C11.5614%2018.6585%2011.7023%2018.6117%2011.8464%2018.5933C11.9742%2018.5769%2012.1036%2018.5771%2012.2314%2018.5938C12.3754%2018.6126%2012.5162%2018.6597%2012.7976%2018.754Z'%20stroke='%234B5563'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $walletStore, $$unsubscribe_walletStore;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_walletStore = subscribe(walletStore, (value) => $walletStore = value);
  let currentConvo = [];
  let ignoreFade = false;
  let text = "";
  assistants[0].id;
  function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * startingQuestions.length);
    return startingQuestions[randomIndex];
  }
  $$unsubscribe_user();
  $$unsubscribe_walletStore();
  return `${validate_component(Modal, "ChangingModal").$$render($$result, {}, {}, {})} <div class="flex flex-col justify-center items-center w-full text-gray-600 pt-[100px] h-screen">${$walletStore.publicKey && $user.data?.conversations ? `<div class="flex flex-row justify-between align-left border-gray-600/10 border-2 rounded-2xl mb-20 w-full max-w-4xl h-full shadow-2xl" style="min-height: calc(100vh - 140px);"><div class="flex flex-col border-gray-600/10 border-r-2 p-2 gap-2 basis-1/4 bg-slate-100/40 rounded-l-2xl"><div class="rounded-2xl flex flex-col"><button class="hover:bg-slate-200 font-bold text-lg uppercase text-left rounded-2xl p-2" data-svelte-h="svelte-1fnspml">new chat</button> <div class="flex flex-row justify-between"><h class="text-sm italic p-2">Credits: <strong>${escape($user.data.credits)}</strong></h> <button class="hover:bg-slate-200 font-semibold text-sm uppercase text-right rounded-2xl p-2" data-svelte-h="svelte-g49xv9">buy</button></div></div>  <div class="border-b-2 border-gray-600/20 w-full"></div> ${each($user.data?.conversations.slice().reverse(), (conversation, index) => {
    return `<button class="flex flex-row justify-between items-center w-full gap-2 hover:bg-slate-200 p-2 rounded-2xl fade-in-left" style="${"animation-delay: " + escape(index * 0.2, true) + "s;"}"><div class="overflow-hidden text-ellipsis whitespace-nowrap mr-4">${escape(conversation.name)}</div> <button data-svelte-h="svelte-z5bd7d"><img${add_attribute("src", editSvg, 0)} class="rounded-full w-6 h-6"></button> <button data-svelte-h="svelte-19m55yd"><img${add_attribute("src", deleteSvg, 0)} class="rounded-full w-6 h-6"></button> </button>`;
  })}</div> <div class="flex flex-col justify-end basis-3/4 bg-slate-100/40 rounded-r-2xl">${`<div class="flex flex-row justify-start align-left p-2 w-1/2 gap-2 "><select class="rounded-lg text-sm font-bold p-1 bg-slate-300/40 border-solid hover:border-gray-400 border-2">${each(assistants, (assistant) => {
    return `<option${add_attribute("value", assistant.id, 0)}>${escape(assistant.name)}</option>`;
  })}</select></div>  <div class="flex flex-1 items-center justify-center h-full"><h1 class="text-3xl font-light italic text-center">${escape(getRandomMessage())}</h1></div>`} <div class="flex flex-col flex-col-reverse p-2 gap-3 overflow-auto font-lg">${each(currentConvo, (message, index) => {
    return `${message.content[0].text.value !== "" ? `${message.role == "assistant" ? `${index === 0 && ignoreFade ? `<div class="message mr-auto fade-in-left bg-gray-50">${escape(message.content[0].text.value)} </div>` : `<div class="message bg-gray-50" style="margin-left: 0; max-width: calc(100% - 1rem);">${escape(message.content[0].text.value)} </div>`}` : `<div class="message ml-auto bg-[#0078FE]/75 text-slate-100 ">${escape(message.content[0].text.value)} </div>`}` : ``}`;
  })}</div>  <div class="flex flex-row justify-end align-center py-2 px-2 w-full gap-2"><input class="w-full rounded-2xl p-3 font-semibold" type="text" placeholder="Send message..."${add_attribute("value", text, 0)}>  <button class="bg-slate-100/60 rounded-2xl p-2" data-svelte-h="svelte-1lvfoyt"><img${add_attribute("src", sendSvg, 0)} class="rounded-full w-8 h-8"></button></div></div></div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_walletStore;
  $$unsubscribe_walletStore = subscribe(walletStore, (value) => value);
  $$unsubscribe_walletStore();
  return `${validate_component(Chat, "Chat").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
