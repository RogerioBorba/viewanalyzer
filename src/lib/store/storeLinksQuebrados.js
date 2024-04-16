import { writable } from "svelte/store";

export let orgName = writable('');
export let processed = writable(0);
export let ToProcess = writable(0);
