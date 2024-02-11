<script>
    import { onMount } from "svelte";
    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
    import { isConnectingWallet, isSigningIn } from "$lib/wallet";
    import Login from "$lib/components/login.svelte";
    onMount(async () => {
        // Wait for $walletStore to be set
        while (!$walletStore.publicKey) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
</script>

<div class="h-screen w-full flex">
    {#if $isConnectingWallet === false && $isSigningIn === false}
        <Login />
    {/if}
</div>




