<script>
    import { page } from '$app/stores'  
    import {
        WalletProvider,
        ConnectionProvider,
        WalletModal
    } from "@svelte-on-solana/wallet-adapter-ui";

    import {
        isConnectingWallet,
        connectSelectedWallet,
        connectWallet,
        wallets,
        localStorageKey,
        network,
        isSignedIn,
        hideConnectWallet
    } from "$lib/wallet";

</script>

<div class="text-white text-2xl items-left w-full p-4">
    <WalletProvider {localStorageKey} {wallets} autoConnect={true} />
    <ConnectionProvider {network} />
</div>
