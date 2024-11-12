import { writable } from "svelte/store";

export let drawnBoundingBox = writable([]);
export let clickedButtonOnWFS = writable(false);
export let clickedButtonOnWMS = writable(false);

export let drawWasClickedOnWMS = writable(false);
export let drawWasClickedOnWFS = writable(false);
export let drawWasClicked = writable(false);


//Desenho e get de dados para comparação
export let hiddenDraw = writable('hidden');
