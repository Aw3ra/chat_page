<script> 
    import {
        WalletModal
    } from "@svelte-on-solana/wallet-adapter-ui";

    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

    import {
        isConnectingWallet,
        connectSelectedWallet,
        isSignedIn,
        hideConnectWallet,
    } from "$lib/wallet";

    import ChangingModal from "$lib/modals/modal.svelte";

    // @ts-ignore
    import Disconnect from "svelte-icons/fa/FaBan.svelte"

</script>

<style>
  #sentence {
      height: 40px; /* Adjust the height as needed */
      overflow: hidden;
      white-space: nowrap;
  }
  .btn{

      transition: all 0.3s;
  }
  .btn:hover{
      background-color: rgb(255 237 213);
      transform: scale(1.1);
  }
</style>
<div class="text-white text-2xl w-full p-4 fixed top-0 left-0 z-50">
    <ChangingModal />
    {#if $isConnectingWallet}
        <WalletModal
            maxNumberOfWallets="6"
            on:connect={connectSelectedWallet}
            on:close={hideConnectWallet}
        />
    {/if}
    <nav class="p-2 flex flex-wrap justify-between items-center mx-auto max-w-6xl text-black h-[60px]">
      {#if $walletStore.publicKey && $isSignedIn}
      <img src="/favicon.png" class="h-14 w-114" />
        <div class="flex">
          <button class="btn btn-sm text-sm flex flex-row items-center gap-1" on:click={$walletStore.disconnect}>
            <div class="h-4 w-4">
              <Disconnect />
            </div>
            {$walletStore.publicKey.toBase58().slice(0, 4)}...
          </button>  
        </div>
      {/if}
    </nav>
</div>
