import { writable } from 'svelte/store';
export let countTotalLayerWFS = writable(0);
export let countTotalLayerWithoutMetadataWFS = writable(0);
export let countWFSProcessado = writable(0);
export let allWFSKeywords = writable([]);
export let keywordWFSCountByName = writable({});
export let currentListWFSCapability = writable([]);