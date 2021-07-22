import { writable } from "svelte/store";

export let file = writable("");
export let currentTime = writable(0);
export let duration = writable(0);