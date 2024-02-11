import { w as writable } from "./index2.js";
import "bs58";
import "./client.js";
import { p as public_env } from "./shared-server.js";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { w as walletStore } from "./walletStore.js";
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter()
];
const isConnectingWallet = writable(false);
const isSigningIn = writable(false);
const isSignedIn = writable(false);
const localStorageKey = "walletAdapter";
const network = public_env?.PUBLIC_RPC_URL.includes("devnet") ? clusterApiUrl("devnet") : clusterApiUrl("mainnet-beta");
walletStore.subscribe(async ($walletStore) => {
  return;
});
export {
  isSignedIn as a,
  isSigningIn as b,
  isConnectingWallet as i,
  localStorageKey as l,
  network as n,
  wallets as w
};
