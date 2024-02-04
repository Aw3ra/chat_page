<script lang='ts'>
  import { postRequest } from "$lib/utility";
  import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
  import { VersionedTransaction, Connection } from '@solana/web3.js';
  import { onMount } from "svelte";
  import { hidePayModal } from "$lib/modals";
  import { user } from "$lib/stores/user";
  import { tiers } from "$lib";

  let isLoading = false;

  const connection = new Connection("https://api.devnet.solana.com");

  async function selectTipAmount(amount: number, tokens: number = 0) {
    const tx = await postRequest("/api/solana/create-transaction", {amount: amount, from: $walletStore.publicKey.toBase58()});
    const transaction = VersionedTransaction.deserialize(Buffer.from(tx.serialized, 'base64'));
    try{
      let signature = await $walletStore.sendTransaction(transaction, connection);
      // Wait 15 seconds
      isLoading = true;
      await new Promise(resolve => setTimeout(resolve, 5000));
      await user.buyCredits($walletStore, tokens);
    } catch (e) {
      console.log(e);
    } finally {
      hidePayModal();
      isLoading = false;
    }

  }

  async function calcTokens (tokens: number, solPrice: number = 0) {
    const sol = tokens / 1000 * 0.0011 / solPrice;
    return sol;

  }

  onMount(async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";
    const response = await fetch(url);
    const data = await response.json();
    const solPrice = data.solana.usd;
    for (let i = 0; i < tiers.length; i++) {
      tiers[i].price = await calcTokens(tiers[i].tokens, solPrice);
    }
  });

  function convertFromZerosToName (number: number) {
    // If it is a million, billion, trillion, etc.
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(0) + "B";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(0) + "M";
    } else {
      return number;
    }
  }


</script>

<style>

</style>



<dialog id="pay_modal" class="modal">
    <div class="modal-box">
      <div>
        {#if isLoading}
          <div class="flex flex-col gap-2 flex-wrap text-center">
            <div class="flex flex-row pb-2 justify-center"> <!-- Updated classes here -->
              <div class="text-center"> <!-- Center the text -->
                <h3 class="font-bold text-4xl inline-block">Processing...</h3> <!-- Inline-block for text -->
              </div>
            </div>
            <div class="flex flex-row justify-center gap-2">
              <div class="flex flex-col justify-center items-center rounded-2xl p-2">
                <h3 class="text-2xl font-semibold">Please wait</h3>
                <p class="text-sm">Your transaction is being processed</p>
              </div>
            </div>
          </div>
        {:else}
          <div class="flex flex-col gap-2 flex-wrap text-center">
            <div class="flex flex-row pb-2 justify-center"> <!-- Updated classes here -->
              <div class="text-center"> <!-- Center the text -->
                <h3 class="font-bold text-4xl inline-block">Buy credits </h3> <!-- Inline-block for text -->
              </div>
            </div>
            <div class="flex flex-row justify-center gap-2">
              {#each tiers as tier}
              <button class="button" on:click={selectTipAmount(tier.price, tier.tokens)}>
                <div class="flex flex-col justify-center items-center rounded-2xl p-2">
                  <h3 class="text-2xl font-semibold">+{convertFromZerosToName(tier.tokens)} tokens</h3>
                  <p class="text-sm"> {tier.price.toFixed(3)} SOL</p>
                </div>
              </button>
              {/each}
            </div>
          </div>
        {/if}
        
      </div>
    </div>
  </dialog>
