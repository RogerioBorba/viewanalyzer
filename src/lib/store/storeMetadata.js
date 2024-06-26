import { writable } from 'svelte/store';
export let countMetadata = writable(0)
export let countAllMetadata = writable(0)
export let totalMetadata = writable(0)
export let totalAllMetadata = writable(0)
export let countCSWProcessado = writable(0)
export let countProcessado = writable(0)
export let keywordCSWCountByName = writable({})
export let allCSWKeywords = writable([])
export let postURL = writable({url: '', body: ''})
export let countWMS = writable(0);
export let countWFS = writable (0);