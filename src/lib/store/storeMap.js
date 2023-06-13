import { writable } from 'svelte/store';
export let currentBaseLayer = writable(null)
export let facadeOL = writable(null)
export let selectedLayers = writable([]);

