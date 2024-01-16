Button that makes a post request to /database/user/create
<script>
    import { postRequest } from "$lib/utility";
    import { page } from '$app/stores'
    import { user, getUser } from "$lib/stores/user";
    import { onMount } from "svelte";
    import { signIn } from '@auth/sveltekit/client'
    let currentConvo = []
    let currentThread = ""
    let text = ""
    async function createThread () {
        await postRequest(
            "/api/database/conversations/create", 
            { 
                content: "test", 
                user:  $page.data.session?.user,
            });
        const email = $page.data.session?.user?.email || "";
        getUser(email);
    }

    async function fetchConvo (thread) {
        const response = await postRequest(
            "/api/openai/fetchConvo", 
            { 
                threadId:  thread,
            });
        currentConvo = response.body;
        currentThread = thread;
    }
    async function sendMessage (message) {
        await postRequest(
            "/api/openai/sendMessage", 
            { 
                message:  message,
                threadId: currentThread,
            });
        text = ""
        fetchConvo(currentThread)
    }
    // On mount

    // If $page changes, fetch the user. Make sure we have mounted the page first
    

</script>

<style>
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translatey(10px);
      }
      to {
        opacity: 1;
        transform: translatey(0);
      }
    }
  
    .fade-in-left {
      opacity: 0;
      transform: translatey(-20px);
      animation: fadeInLeft 0.5s ease-out forwards;
    }
  </style>


<!-- List all the conversation threads -->
{#if $page.data.session}
    <div class="flex flex-row justify-between align-center border-white border-2 h-screen rounded-2xl mb-20">
        <!-- Box for list of conversations -->
        <div class="flex flex-col w-fit border-white border-r-2 p-2 gap-2">
            <button class="text-white font-bold" on:click={createThread}>Create Thread</button>
            {#each $user.conversations as conversation, index}
                <button on:click={() => fetchConvo(conversation?.threadId)} class="text-white fade-in-left"
                    style="animation-delay: {index * 0.2}s;">
                    Conversation {index}
                </button>
            {/each}
        </div>
        <div class="flex flex-col justify-end">
            <div class="flex flex-col flex-col-reverse w-96 p-2 gap-3">
                {#each currentConvo as message, index}
                    {#if message.role == "assistant"}
                        <div class="text-white mr-auto border-white border-2 rounded-2xl py-2 px-3 w-fit mr-6 fade-in-left"
                        style="animation-delay: {index * 0.2}s;">
                            {message.content[0].text.value}
                        </div>
                    {:else}
                        <div class="text-white ml-auto border-white border-2 rounded-2xl py-2 px-3 w-fit fade-in-left"
                        style="animation-delay: {index * 0.2}s;">
                            {message.content[0].text.value}
                        </div>
                    {/if}
                {/each}
            </div>
            <!-- Input box at the bottom -->
            <div class="flex flex-row justify-end align-center py-2 px-2  w-full gap-2">
                <input bind:value={text}
                    on:input={e => text = e.target.value}
                    class="text-black w-full rounded-2xl p-2" type="text" placeholder="Type your message here..."/>
                <!-- Send button that does sendMessage on click -->
                <button on:click={sendMessage(text)} class="text-white">Send</button>

            </div>

        </div>
    </div>
{:else}
    <button class="rounded-lg p-2 text-xl text-white mt-2 hover:text-blue-100" on:click={() => signIn('github')}>Sign in with github</button>  
{/if}




