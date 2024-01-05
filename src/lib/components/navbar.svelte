<script>
    import { signIn, signOut } from '@auth/sveltekit/client'
    import { page } from '$app/stores'  
</script>

<div class="text-white text-2xl items-left w-full p-4">
    {#if $page.data.session?.user}
    <div class="flex flex-row items-center gap-2">
        <img class="rounded-full w-16 h-16" src={$page.data.session.user.image} alt="profile picture">
        <div class="flex flex-col content-left">
            <p class="text-left">{$page.data.session.user.name}</p>
            <button class="text-xs underline"on:click={signOut}>Sign out</button>
        </div>
        
    </div>
    {/if}
</div>
