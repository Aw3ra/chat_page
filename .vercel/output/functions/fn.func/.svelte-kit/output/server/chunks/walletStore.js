import { WalletError, WalletReadyState, WalletNotConnectedError, WalletNotReadyError } from "@solana/wallet-adapter-base";
import { w as writable } from "./index2.js";
import { j as get_store_value } from "./ssr.js";
class WalletNotSelectedError extends WalletError {
  constructor() {
    super(...arguments);
    this.name = "WalletNotSelectedError";
  }
}
function getLocalStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    if (value)
      return JSON.parse(value);
  } catch (error) {
    if (typeof window !== "undefined") {
      console.error(error);
    }
  }
  return defaultValue;
}
function setLocalStorage(key, value = null) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    if (typeof window !== "undefined") {
      console.error(error);
    }
  }
}
const walletStore = createWalletStore();
function addAdapterEventListeners(adapter) {
  const { onError, wallets } = get_store_value(walletStore);
  wallets.forEach(({ adapter: adapter2 }) => {
    adapter2.on("readyStateChange", onReadyStateChange, adapter2);
  });
  adapter.on("connect", onConnect);
  adapter.on("disconnect", onDisconnect);
  adapter.on("error", onError);
}
async function autoConnect() {
  const { adapter } = get_store_value(walletStore);
  try {
    walletStore.setConnecting(true);
    await (adapter === null || adapter === void 0 ? void 0 : adapter.connect());
  } catch (error) {
    walletStore.resetWallet();
  } finally {
    walletStore.setConnecting(false);
  }
}
async function connect() {
  const { connected, connecting, disconnecting, ready, adapter } = get_store_value(walletStore);
  if (connected || connecting || disconnecting)
    return;
  if (!adapter)
    throw newError(new WalletNotSelectedError());
  if (!(ready === WalletReadyState.Installed || ready === WalletReadyState.Loadable)) {
    walletStore.resetWallet();
    if (typeof window !== "undefined") {
      window.open(adapter.url, "_blank");
    }
    throw newError(new WalletNotReadyError());
  }
  try {
    walletStore.setConnecting(true);
    await adapter.connect();
  } catch (error) {
    walletStore.resetWallet();
    throw error;
  } finally {
    walletStore.setConnecting(false);
  }
}
function createWalletStore() {
  const { subscribe, update } = writable({
    autoConnect: false,
    wallets: [],
    adapter: null,
    connected: false,
    connecting: false,
    disconnecting: false,
    localStorageKey: "walletAdapter",
    onError: (error) => console.error(error),
    publicKey: null,
    ready: "Unsupported",
    wallet: null,
    name: null,
    walletsByName: {},
    connect,
    disconnect,
    select,
    sendTransaction,
    signTransaction: void 0,
    signAllTransactions: void 0,
    signMessage: void 0
  });
  function updateWalletState(adapter) {
    updateAdapter(adapter);
    update((store) => ({
      ...store,
      name: (adapter === null || adapter === void 0 ? void 0 : adapter.name) || null,
      wallet: adapter,
      ready: (adapter === null || adapter === void 0 ? void 0 : adapter.readyState) || "Unsupported",
      publicKey: (adapter === null || adapter === void 0 ? void 0 : adapter.publicKey) || null,
      connected: (adapter === null || adapter === void 0 ? void 0 : adapter.connected) || false
    }));
    if (!adapter)
      return;
    if (shouldAutoConnect()) {
      autoConnect();
    }
  }
  function updateWalletName(name) {
    var _a;
    const { localStorageKey, walletsByName } = get_store_value(walletStore);
    const adapter = (_a = walletsByName === null || walletsByName === void 0 ? void 0 : walletsByName[name]) !== null && _a !== void 0 ? _a : null;
    setLocalStorage(localStorageKey, name);
    updateWalletState(adapter);
  }
  function updateAdapter(adapter) {
    removeAdapterEventListeners();
    let signTransaction = void 0;
    let signAllTransactions = void 0;
    let signMessage = void 0;
    if (adapter) {
      if ("signTransaction" in adapter) {
        signTransaction = async function(transaction) {
          const { connected } = get_store_value(walletStore);
          if (!connected)
            throw newError(new WalletNotConnectedError());
          return await adapter.signTransaction(transaction);
        };
      }
      if ("signAllTransactions" in adapter) {
        signAllTransactions = async function(transactions) {
          const { connected } = get_store_value(walletStore);
          if (!connected)
            throw newError(new WalletNotConnectedError());
          return await adapter.signAllTransactions(transactions);
        };
      }
      if ("signMessage" in adapter) {
        signMessage = async function(message) {
          const { connected } = get_store_value(walletStore);
          if (!connected)
            throw newError(new WalletNotConnectedError());
          return await adapter.signMessage(message);
        };
      }
      addAdapterEventListeners(adapter);
    }
    update((store) => ({ ...store, adapter, signTransaction, signAllTransactions, signMessage }));
  }
  return {
    resetWallet: () => updateWalletName(null),
    setConnecting: (connecting) => update((store) => ({ ...store, connecting })),
    setDisconnecting: (disconnecting) => update((store) => ({ ...store, disconnecting })),
    setReady: (ready) => update((store) => ({ ...store, ready })),
    subscribe,
    updateConfig: (walletConfig) => update((store) => ({
      ...store,
      ...walletConfig
    })),
    updateWallets: (wallets) => update((store) => ({ ...store, ...wallets })),
    updateStatus: (walletStatus) => update((store) => ({ ...store, ...walletStatus })),
    updateWallet: (walletName) => updateWalletName(walletName)
  };
}
async function disconnect() {
  const { disconnecting, adapter } = get_store_value(walletStore);
  if (disconnecting)
    return;
  if (!adapter)
    return walletStore.resetWallet();
  try {
    walletStore.setDisconnecting(true);
    await adapter.disconnect();
  } finally {
    walletStore.resetWallet();
    walletStore.setDisconnecting(false);
  }
}
async function initialize({ wallets, autoConnect: autoConnect2 = false, localStorageKey = "walletAdapter", onError = (error) => console.error(error) }) {
  const walletsByName = wallets.reduce((walletsByName2, wallet) => {
    walletsByName2[wallet.name] = wallet;
    return walletsByName2;
  }, {});
  const mapWallets = wallets.map((adapter) => ({
    adapter,
    readyState: adapter.readyState
  }));
  walletStore.updateConfig({
    wallets: mapWallets,
    walletsByName,
    autoConnect: autoConnect2,
    localStorageKey,
    onError
  });
  const walletName = getLocalStorage(localStorageKey);
  if (walletName) {
    walletStore.updateWallet(walletName);
  }
}
function newError(error) {
  const { onError } = get_store_value(walletStore);
  onError(error);
  return error;
}
function onConnect() {
  const { adapter } = get_store_value(walletStore);
  if (!adapter)
    return;
  walletStore.updateStatus({
    publicKey: adapter.publicKey,
    connected: adapter.connected
  });
}
function onDisconnect() {
  walletStore.resetWallet();
}
function onReadyStateChange(readyState) {
  const { adapter, wallets } = get_store_value(walletStore);
  if (!adapter)
    return;
  walletStore.setReady(adapter.readyState);
  const walletIndex = wallets.findIndex(({ adapter: adapter2 }) => adapter2.name === this.name);
  if (walletIndex === -1) {
    return;
  } else {
    walletStore.updateWallets([
      ...wallets.slice(0, walletIndex),
      { ...wallets[walletIndex], readyState },
      ...wallets.slice(walletIndex + 1)
    ]);
  }
}
function removeAdapterEventListeners() {
  const { adapter, onError, wallets } = get_store_value(walletStore);
  if (!adapter)
    return;
  wallets.forEach(({ adapter: adapter2 }) => {
    adapter2.off("readyStateChange", onReadyStateChange, adapter2);
  });
  adapter.off("connect", onConnect);
  adapter.off("disconnect", onDisconnect);
  adapter.off("error", onError);
}
async function select(walletName) {
  const { name, adapter } = get_store_value(walletStore);
  if (name === walletName)
    return;
  if (adapter)
    await disconnect();
  walletStore.updateWallet(walletName);
}
async function sendTransaction(transaction, connection, options) {
  const { connected, adapter } = get_store_value(walletStore);
  if (!connected)
    throw newError(new WalletNotConnectedError());
  if (!adapter)
    throw newError(new WalletNotSelectedError());
  return await adapter.sendTransaction(transaction, connection, options);
}
function shouldAutoConnect() {
  const { adapter, autoConnect: autoConnect2, ready, connected, connecting } = get_store_value(walletStore);
  return !(!autoConnect2 || !adapter || !(ready === WalletReadyState.Installed || ready === WalletReadyState.Loadable) || connected || connecting);
}
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", removeAdapterEventListeners);
}
export {
  initialize as i,
  walletStore as w
};
