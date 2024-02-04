<script>
    import { postRequest } from "$lib/utility";
    import { user } from "$lib/stores/user";
    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
    import { assistants, startingQuestions, tiers } from "$lib";
    import { onMount } from "svelte";
    import editSvg from "$lib/svg/edit.svg";
    import deleteSvg from "$lib/svg/delete.svg";
    import sendSvg from "$lib/svg/send.svg";
    import Signin from "$lib/modals/signin.svelte";
    import Pay from "$lib/modals/pay.svelte";
    import { showSigninModal, hideSigninModal, showPayModal } from "$lib/modals";
    import { getEncoding, encodingForModel } from "js-tiktoken";


    /**
     * @type {any[]}
     */
    let currentConvo = []
    let currentThread = ""
    let ignoreFade = false
    let showLoading = false
    let text = ""
    let assistant = assistants[0].id
    async function createThread () {
        const thisThread = user.createThread(text, $walletStore.publicKey.toBase58(), assistant)
        return thisThread
    }

    function newChat(){
        currentConvo = []
        currentThread = ""
        localStorage.setItem("currentThread", "")
        ignoreFade = false
    }

    async function deleteThread (threadId) {
        currentConvo = []
        currentThread = ""
        localStorage.setItem("currentThread", "")
        ignoreFade = false
        await user.deleteThread(threadId, $walletStore.publicKey.toBase58())
        user.fetchUser($walletStore.publicKey.toBase58())
    }

    async function editThread (threadId) {
        showSigninModal()
    }

    async function fetchConvo (thread) {
        localStorage.setItem("currentThread", thread)
        currentConvo = await user.fetchConversation(thread);
        currentThread = thread;
        ignoreFade = false
    }
    async function sendMessage (message) {
        let price = assistants.find((assistant) => assistant.name === $user.data?.conversations.find((convo) => convo.id === currentThread)?.model)?.priceMultiplier
        let totalTokens = 0
        text = ""
        ignoreFade = true
        showLoading = true
        const enc = getEncoding("cl100k_base");
        let thisMessageTokens =  enc.encode(message).length * (price? price: 1)
        
        currentConvo = [{role: "user", content: [{text: {value: message}}]}, ...currentConvo]
        // For each message in the conversation, we need to encode it
        // If the user doesnt have enough credits, we need to prompt them to buy more
        if(thisMessageTokens < $user.data.credits) {
            if (currentThread === "") {
                currentThread = "new"
                currentThread = await createThread()
            }
            await postRequest(
            "/api/openai/sendMessage", 
            { 
                message:  message,
                threadId: currentThread,
                assistant: assistant
            });
            await fetchConvo(currentThread)

            for (let i = 0; i < currentConvo.length; i++) {
                totalTokens += enc.encode(currentConvo[i].content[0].text.value).length * (price? price: 1)
            }
            await user.spendCredits($walletStore, totalTokens)
        } else {
            currentConvo = [{role: "assistant", content: [{text: {value: "Looks like you don't currently have enough credits for this message, please use the buy button to purchase more."}}]}, ...currentConvo]
        }



    }

    async function buyCredits () {
        showPayModal()
    }

    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * startingQuestions.length);
        return startingQuestions[randomIndex];
    }

    // On mount fetch the conversation from local storage
    onMount(async () => {
        currentThread = localStorage.getItem("currentThread")
        if (currentThread && currentThread in $user.data?.conversations) {
            currentConvo = await user.fetchConversation(currentThread);
        } else {
            currentThread = ""
        }
    })


</script>


<Pay />
<Signin />
<div 
    class="flex flex-col justify-center items-center w-full text-gray-600 pt-[100px]">
    {#if $walletStore.publicKey && $user.data?.conversations}
        <div class="flex flex-row justify-between align-left border-gray-600/10 border-2 rounded-2xl mb-20 w-full max-w-4xl h-full  shadow-2xl"
        style="min-height: calc(100vh - 140px);">
            <div class="flex flex-col border-gray-600/10 border-r-2 p-2 gap-2 basis-1/4 bg-slate-100/40 rounded-l-2xl">
                <div class="rounded-2xl flex flex-col">
                    <button 
                        class="hover:bg-slate-200 font-bold text-lg uppercase text-left rounded-2xl p-2" on:click={newChat}>new chat
                    </button>
                    <div class= "flex flex-row justify-between">
                        <h class="text-sm italic p-2">Credits: <strong>{$user.data.credits}</strong></h>
                        <button 
                            on:click={buyCredits}
                                class="hover:bg-slate-200 font-semibold text-sm uppercase text-right rounded-2xl p-2">buy
                        </button>
                    </div>
                </div>
                <!-- A solid line spanning the width of the container -->
                <div class="border-b-2 border-gray-600/20 w-full"></div>
                {#each $user.data?.conversations.slice().reverse() as conversation, index}
                    <button on:click={() => fetchConvo((conversation.id))} class="flex flex-row justify-between items-center w-full gap-2 hover:bg-slate-200 p-2 rounded-2xl fade-in-left" style="animation-delay: {index * 0.2}s;">
                        <div class="overflow-hidden text-ellipsis whitespace-nowrap mr-4">
                            {conversation.name}
                        </div>
                        <button on:click={() => editThread(conversation.id)}>
                            <img src={editSvg} class="rounded-full w-6 h-6"/>
                        </button>
                        <button on:click={() => deleteThread(conversation.id)}>
                            <img src={deleteSvg} class="rounded-full w-6 h-6"/>
                        </button>

                    </button>
                {/each}
            </div>
            
            <div class="flex flex-col justify-end basis-3/4 bg-slate-100/40 rounded-r-2xl">
                {#if currentThread === ""}
                    <div class="flex flex-row justify-start align-left p-2  w-1/2 gap-2 ">
                        <select bind:value={assistant} class="rounded-2xl text-xl p-2 bg-slate-300/40">
                            {#each assistants as assistant}
                                <option value={assistant.id}>{assistant.name}</option>
                            {/each}
                        </select>
                    </div>
                    <!-- A block in the centre that says hell in h1 -->
                    <div class="flex flex-1 items-center justify-center h-full">
                        <h1 class="text-3xl font-light italic text-center">{getRandomMessage()}</h1>
                    </div>

                {/if}
                <div class="flex flex-col flex-col-reverse p-2 gap-3 overflow-auto font-lg">
                    {#each currentConvo as message, index}
                        {#if message.content[0].text.value !== ""}
                            {#if message.role == "assistant"}
                                {#if index === 0 && ignoreFade}
                                    <div class="message mr-auto fade-in-left bg-gray-50">
                                        {message.content[0].text.value}
                                    </div>
                                {:else}
                                    <div class="message bg-gray-50" style="margin-left: 0; max-width: calc(100% - 1rem);">
                                        {message.content[0].text.value}
                                    </div>
                                {/if}
                            {:else}
                                <div class="message ml-auto bg-[#0078FE]/75 text-slate-100 ">
                                    {message.content[0].text.value}
                                </div>
                            {/if}
                        {/if}
                    {/each}
                </div>
                <!-- Input box at the bottom -->
                <div class="flex flex-row justify-end align-center py-2 px-2  w-full gap-2">
                    <input 
                        bind:value={text}
                        on:keydown={(e) => {if (e.key === "Enter") sendMessage(text)}}
                        class="w-full rounded-2xl p-3 font-semibold" type="text" placeholder="Send message..."/>
                    <!-- Send button that does sendMessage on click -->
                    <button on:click={sendMessage(text)} class="bg-slate-100/60 rounded-2xl p-2">
                        <img src={sendSvg} class="rounded-full w-8 h-8"/>
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>




