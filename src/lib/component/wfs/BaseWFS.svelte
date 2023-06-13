<script>
    
    import {catalogos_servicos} from '$lib/inde/CatalogoINDE';
    import { getWFSCapabilitiesObject } from './WFSCapabilitiesObject.js';

	import { error } from '@sveltejs/kit';
    import { WFSLayer } from './WFSLayer.js';
    import WFSCapabilityLayer from './WFSCapabilityLayer.svelte';
    let promise = null;
    let firstIDTextIRIObj = { id: 1, text: "Escolha um catálogo", iri: '' };

    let selectedIDTextIRI =  firstIDTextIRIObj
	let i = 1
    function newIRI(obj) {
        if(!obj.wfsGetCapabilities)
            return null
        return { id: i++, text: obj.descricao, iri: obj.wfsGetCapabilities }
    }

    let iriArray = [selectedIDTextIRI ].concat(catalogos_servicos.map( (obj) =>  newIRI(obj)).filter((obj)=> obj != null ));
    let wfsLayers = [];
	let answer = '';
    let textEntered = "";
    let wfsLayersFiltered = [];
    $ : {
            if (textEntered && textEntered.length >= 3) {
                wfsLayersFiltered = wfsLayers.filter(
                    wfs_layer => wfs_layer.title().toLowerCase().includes(textEntered.toLowerCase()))
            }
            else {
                wfsLayersFiltered = [...wfsLayers]
            }
    }
    
    async function fetchListWFSLayer() {
        let wfs_capabilities =  await getWFSCapabilitiesObject(selectedIDTextIRI);
        
        if(!wfs_capabilities) throw error(500, `Não foi possível realizar a requisição: ${selectedIDTextIRI}`);
        let featuresFromCapability = wfs_capabilities.features();
        if (!featuresFromCapability)
            return -1;        
        wfsLayers = featuresFromCapability.map(layerCapability => new WFSLayer(layerCapability));
        return wfsLayers.length
    }

    async function btnSearchClicked() {
         if(!selectedIDTextIRI.iri) {
            let msg = "Escolha o endereço (URL) ou informe um CSW Capabilities de uma instituição."
            console.log(msg)
            return 
        }  
        try {
            promise = fetchListWFSLayer()   
                    
        } catch (error) {
            promise = 1
            throw error
        }  
        
    }

    function btnClearClicked() {
        selectedIDTextIRI = firstIDTextIRIObj;
        promise = 1;
        wfsLayers = [];
        wfsLayersFiltered = [];
        textEntered = ""   ;
    }

	function handleSubmit() {
		alert(`answered question ${selectedIDTextIRI.id} (${selectedIDTextIRI.text}) with "${answer}"`);
	}

    function onChange(value) {
        
    }

    function onClick(layer) {
        console.log("Nó clicado: ", layer);
    }
</script>


<form class="relative m-0" on:submit|preventDefault={handleSubmit}>
	<select class="shadow-sm p-2 text-sm w-full rounded-lg bg-white border-gray-300 focus:outline-none text-gray-500"
     bind:value={selectedIDTextIRI} on:change={onChange}>
		{#each iriArray as iri}
			<option value={iri}>
				{iri.text}
			</option>
		{/each}
	</select>
    <div class="flex mt-4 relative text-gray-700">
        <input class="w-full p-2 text-sm shadow-sm border-gray-300 rounded-lg focus:outline-none" placeholder="URL WMS GetCapabilities" type="text" bind:value={selectedIDTextIRI.iri} title={selectedIDTextIRI.iri}>
        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold px-1 rounded inline-flex items-center hover:bg-gray-200" 
                on:click|preventDefault={btnSearchClicked} title="Buscar camadas">
            <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </button>
        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold  px-1 rounded inline-flex items-center hover:bg-gray-200" 
                on:click|preventDefault={btnClearClicked} title="Limpar camadas">
            <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
            </svg>  
        </button>    
    </div> 
    {#await promise}
        <p class = "text-xl text-center text-blue-600 animate-pulse">...aguarde</p>
    {:then layersLenth}
       {#if layersLenth == 0}
            <p class="text-blue-800 text-lg p-1">Não há camadas!</p>
        {:else if layersLenth == -1}
        <p class="text-red-800 text-lg p-1">Problema no xml retornado do GetCapabilities</p>
        {/if}    
       <input class="w-full h-8 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus: outline-none" 
       hidden={wfsLayers.length == 0 ?true:false} type="text" placeholder="Digite para filtrar" 
       bind:value={textEntered} title="Filtro">
    {#each wfsLayersFiltered as layer}
        <!--<WMSCapabilityLayer wmsLayer={layer} capabilitiesUrl= {selectedIDTextIRI.iri}></WMSCapabilityLayer>-->
        <WFSCapabilityLayer wfsLayer={layer} capabilitiesUrl= {selectedIDTextIRI.iri}></WFSCapabilityLayer>
        
    {/each}    
    {:catch error}
        <p class="text-red-500 text-xl ">{error.message}</p>
    {/await} 
</form>
<style>
	
</style>