import { writable } from "svelte/store";

export let file = writable(new ArrayBuffer(0));
export let duration = writable(0);
export let loopStart = writable(0);
export let loopEnd = writable(0);