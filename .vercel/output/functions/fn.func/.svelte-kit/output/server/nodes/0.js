

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.6nzyLFU0.js","_app/immutable/chunks/scheduler.BnSwxYe-.js","_app/immutable/chunks/index.ikIDff96.js","_app/immutable/chunks/modals.fz6RkjOm.js","_app/immutable/chunks/index.Ua9e-3Rz.js","_app/immutable/chunks/modal.hjkXbcbB.js","_app/immutable/chunks/wallet.LmsCVzPH.js","_app/immutable/chunks/entry.W-CZ1GPE.js","_app/immutable/chunks/preload-helper.0HuHagjb.js"];
export const stylesheets = ["_app/immutable/assets/0.FaDlWbYX.css","_app/immutable/assets/wallet.-p4ILrfH.css"];
export const fonts = [];