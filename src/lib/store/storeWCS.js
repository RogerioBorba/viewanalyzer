import { writable } from 'svelte/store';

export let countTotalLayerWithoutMetadataWCS = writable(0);
export let countTotalLayerWCS = writable(0);
export let countWCSProcessado = writable(0);
export let currentListWCSCapability = writable([]);
export let countTotalLayerWFS = writable(0);
export let countTotalLayer = writable(0);
export let countTotalLayerWithoutMetadata = writable(0);
