<script>
    import { onMount } from "svelte";
    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

    import Chat from "$lib/components/chat.svelte";

    onMount(async () => {
        // Wait for $walletStore to be set
        while (!$walletStore.publicKey) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    });
</script>

<Chat />




