<script>
    import "../app.css";
    import Navbar from "../lib/components/navbar.svelte";
    import {
        WalletProvider,
        ConnectionProvider,
    } from "@svelte-on-solana/wallet-adapter-ui";

    import {
        wallets,
        localStorageKey,
        network,
    } from "$lib/wallet";
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect={true} />
<ConnectionProvider {network} />
<div class="flex flex-col gap-2 justify-top items-center bg-cover w-full" 
style="min-height: calc(100vh); background-image: url(background1.jpg);">
    <Navbar />
    <slot />
</div>
