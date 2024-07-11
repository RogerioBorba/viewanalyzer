import { writable } from "svelte/store";

export let drawnBoundingBox = writable([]);
export let clickedButtonOnWFS = writable(false);
export let clickedButtonOnWMS = writable(false);