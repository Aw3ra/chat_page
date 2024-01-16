import { writable, get } from "svelte/store";

import bs58 from 'bs58';

import { goto } from "$app/navigation";
import { env } from "$env/dynamic/public";
import { browser } from "$app/environment";

// For some reason this needs to be imported
// even though not used.
import {
    workSpace,
} from "@svelte-on-solana/wallet-adapter-ui";

// @ts-ignore
import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

import { fetchUser, user } from "$lib/stores/user";

import {
    showSigninModal,
    hideSigninModal,
} from "$lib/modals"

import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { clusterApiUrl } from "@solana/web3.js";

export const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
];

// Is picking what wallet to connect
export const isConnectingWallet = writable(false);

// Has selected a wallet, now is signing in with that wallet
export const isSigningIn = writable(false);

// Is signed in
export const isSignedIn = writable(false);

// Call this to pop up the connect wallet modal
export const connectWallet = () => isConnectingWallet.set(true);

// hide connect wallet modal
export const hideConnectWallet = () => isConnectingWallet.set(false);

// Used by 
export const connectSelectedWallet = async (event: CustomEvent) => {    
    // @ts-ignore
    await get(walletStore).select(event.detail);
    // @ts-ignore
    await get(walletStore).connect();

    isConnectingWallet.set(false);
};

export const localStorageKey = "walletAdapter";
export const network = env?.PUBLIC_RPC_URL.includes("devnet") ? clusterApiUrl("devnet") : clusterApiUrl("mainnet-beta");

let debouceConnectTimer: NodeJS.Timeout | null = null;

// Have user prove their identity and holder status
// If holder -> /user/[wallet]
// If not holder -> /application
const signin = async ($walletStore: walletStore) => {
    isSignedIn.set(false);
    showSigninModal();

    try {
        const { data } = await fetch("/api/solana/create-message").then((res) => res.json());

        const encodedMessage = new TextEncoder().encode(data);

        if(!$walletStore?.signMessage) {
            throw new Error("Wallet not supported.");
        }

        const signedMessage = await $walletStore?.signMessage(encodedMessage, "utf8");

        const base58Signature = bs58.encode(signedMessage);
        
        if(!signedMessage) {
        throw new Error("Message not signed.");
        }

        const { data : holder } = await fetch(`/api/solana/verify-message`, {
            method : "POST",
            body : JSON.stringify({
                message   : data,
                signature : base58Signature,
                // @ts-ignore
                publicKey    : $walletStore.publicKey?.toBase58(),
            }),
        }).then((res) => res.json());

        isSignedIn.set(true);

        if(holder) {
            goto(`/user/${$walletStore.publicKey?.toBase58()}`);
        } else {
            goto("/application");
        }
    } catch (err) {
        console.error(err);
    } finally {
        isSigningIn.set(false);
        hideSigninModal();
    }
}

const debounce = ($walletStore: walletStore, timer: NodeJS.Timeout) => {
    if(timer) clearTimeout(timer);

    setTimeout(() => fetchUser($walletStore?.publicKey.toBase58()), 500);
}

walletStore.subscribe(($walletStore: walletStore) => {
    if(!browser) return;

    if($walletStore.connected) {
        isSignedIn.set(true);

        fetchUser($walletStore?.publicKey.toBase58());
    }

    if(!$walletStore.publicKey) {
        user.update(($user) => {
            return {
                ...$user,
                data: {
                    card: null,
                    nft: null,
                }
            }
        });
    }
})