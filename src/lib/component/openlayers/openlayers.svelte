
<script>
    import {FacadeOL} from '$lib/component/openlayers/facade_openlayers.js';
    import {facadeOL} from '$lib/store/storeMap';
    import { filteredCoordinate, drawnBoundingBox } from '$lib/store/storeWMS';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    
    let coordinates = [];
    let olFacade;

    //
    
    function enableDrawInteraction() {
        if (olFacade) {
            olFacade.addDrawInteraction((boundingBox) => {
                console.log("Bounding box drawn:", boundingBox);
                drawnBoundingBox.set(boundingBox);
                // Aqui você pode fazer o que quiser com o bounding box selecionado,
                // como enviar para o servidor, atualizar estado, etc.
            });
        } else {
            console.error("OpenLayers facade not initialized.");
        }
    }

    function handleDrawButtonClick() {
        enableDrawInteraction();
    }


    function updateMapWithCoordinates(coords) {
        console.log("coordinates upadas" + JSON.stringify(coords))
        // Lógica para atualizar o mapa usando coords
        // Exemplo hipotético:
        // facadeOL.getMap().updateCoordinates(coords);
        const olFacade = get(facadeOL);
        if (olFacade) {
            olFacade.addRectangles(coords);
        }
    }

    // Inscreva-se às coordenadas filtradas
    filteredCoordinate.subscribe(value => {
        coordinates = value;
        console.log("coordinates", coordinates);
        // Atualize o mapa com as novas coordenadas
        updateMapWithCoordinates(coordinates);
    });

    onMount(async () => {
        console.log("MONTEI");

        // Inicialize o OpenLayers se ainda não estiver inicializado
        if ($facadeOL === null) {
            facadeOL.set(new FacadeOL());
        } else {
            // Caso já esteja inicializado, atualize imediatamente com as coordenadas atuais
            updateMapWithCoordinates(coordinates);
        }

        olFacade = get(facadeOL);
    });

    /*
    onMount(async () => {
        if ($facadeOL === null) 
            facadeOL.set(new FacadeOL());  
    });


    
    */
    </script>
<div style="position: relative;">
    <div id="id_map" class="fixed w-full h-full z-0"></div>
    <button title="Desenhar retângulo para definir coordenadas" class="absolute top-4 right-4 z-10 bg-gray-200 border-solid border-black border-2 text-white py-2 px-4 rounded shadow-md mt-4 hover:bg-slate-400" on:click={handleDrawButtonClick}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm0 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Zm12 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Zm0-12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Z"/>
            <path fill-rule="evenodd" d="M10 6.5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM10 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-4-4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z" clip-rule="evenodd"/>
        </svg>
          
    </button>
</div>