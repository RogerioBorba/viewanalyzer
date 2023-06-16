import { writable } from 'svelte/store';
export let countMetadata = writable(0)
export let totalMetadata = writable(0)
export let countProcessado = writable(0)
export let postURL = writable({url: '', body: ''})