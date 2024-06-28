import { writable } from 'svelte/store';
export let countTotalLayer = writable(0);
export let countTotalLayerWithoutMetadata = writable(0);
export let countWMSProcessado = writable(0);
export let allKeywords = writable([]);
export let keywordCountByName = writable({});
export let currentListWMSCapability = writable([]);
export let filteredCoordinate = writable([]);
export let drawnBoundingBox = writable([]);