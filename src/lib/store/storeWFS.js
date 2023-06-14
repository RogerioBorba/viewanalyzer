import { writable } from 'svelte/store';
export let countTotalLayer = writable(0);
export let countTotalLayerWithoutMetadata = writable(0);
export let countProcessado = writable(0);
export let allKeywords = writable([]);
export let keywordCountByName = writable({});
export let currentListWFSCapability = writable([]);