

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.ZNJiF1x5.js","_app/immutable/chunks/scheduler.BnSwxYe-.js","_app/immutable/chunks/index.ikIDff96.js","_app/immutable/chunks/wallet.fO7XGQ37.js","_app/immutable/chunks/index.Ua9e-3Rz.js","_app/immutable/chunks/modals.fz6RkjOm.js","_app/immutable/chunks/entry.5E1Jt8en.js","_app/immutable/chunks/preload-helper.0HuHagjb.js"];
export const stylesheets = ["_app/immutable/assets/2.y0iO030a.css","_app/immutable/assets/wallet.-p4ILrfH.css"];
export const fonts = [];
