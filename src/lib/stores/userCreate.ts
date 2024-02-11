import { writable } from "svelte/store";

export const userModal = writable(
    { type : "signin" }
);