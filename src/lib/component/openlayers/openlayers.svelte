
<script>
    import {FacadeOL} from '$lib/component/openlayers/facade_openlayers.js';
    import {facadeOL} from '$lib/store/storeMap';
    import { filteredCoordinate, /*drawnBoundingBox*/ } from '$lib/store/storeWMS';
    import {drawnBoundingBox, drawWasClickedOnWMS,drawWasClickedOnWFS, drawWasClicked} from '$lib/store/storeBoudingBox';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    
    let coordinates = [];
    let olFacade;
    let isDrawingEnabled = false;

    //
    
    function closeModal(){
        let modal = document.getElementById('static-modal');
        modal.style.display = 'none';
    }

   



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

    function disableDrawInteraction() {
        if (olFacade) {
            olFacade.removeDrawInteraction();
        } else {
            console.error("OpenLayers facade not initialized.");
        }
    }

    function handleDrawButtonClick() {
        isDrawingEnabled = !isDrawingEnabled;
        console.log("is Drawing enabled" +isDrawingEnabled)
        if(isDrawingEnabled){
            enableDrawInteraction();
        }
        else{
            disableDrawInteraction();
        }
    }


    function updateMapWithCoordinates(coords) {
        //console.log("coordinates upadas" + JSON.stringify(coords))
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
        //console.log("coordinates", coordinates);
        // Atualize o mapa com as novas coordenadas
        updateMapWithCoordinates(coordinates);
    });

    //ativar o desenho ao wms ser selecionado 
    drawWasClicked.subscribe(value => {
        if(value === true){
            handleDrawButtonClick()
        }}
    )
    
    //ativar o desenho para wfs selecionado
    drawWasClickedOnWFS.subscribe(value => {
        if(value === true){
            handleDrawButtonClick()
        }}
    )

    onMount(async () => {
        //console.log("MONTEI");

        // Inicialize o OpenLayers se ainda não estiver inicializado
        if ($facadeOL === null) {
            facadeOL.set(new FacadeOL());
        } else {
            // Caso já esteja inicializado, atualize imediatamente com as coordenadas atuais
            updateMapWithCoordinates(coordinates);
        }

        olFacade = get(facadeOL);

        olFacade.onClickMap();
    });

    /*
    onMount(async () => {
        if ($facadeOL === null) 
            facadeOL.set(new FacadeOL());  
    });

    
    
    */
    </script>
    
<div style="position: relative;">
    <div id="id_map" class="fixed w-full h-full z-0" style="background-color: rgba(255, 255, 255, 0.5)"></div>

    
    

    <!--
    <div id="popup" class="ol-popup bg-white" style="display: none;">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>
    --->

        <!-- Main modal -->
    <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" style="display:none">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-center text-xl font-semibold text-gray-900 dark:text-white">
                        Detalhes 
                    </h3>
                    <button type="button" id="close-modal-btn" on:click={closeModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div id="popup-content" class="p-4 md:p-5 space-y-4">   
                </div>
            </div>
        </div>
    </div>
    <!--
    <button title="Desenhar retângulo para definir coordenadas" class="absolute top-5 right-4 z-10 rounded-full p-4 transition ease-in-out delay-150 bg-gray-200 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-300" on:click={handleDrawButtonClick}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm0 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Zm12 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Zm0-12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Z"/>
            <path fill-rule="evenodd" d="M10 6.5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM10 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-4-4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z" clip-rule="evenodd"/>
        </svg>
          
    </button>
    --->
</div>