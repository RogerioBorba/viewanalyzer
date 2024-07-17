<script>
    import {catalogos_servicos} from '$lib/inde/CatalogoINDE'
    import { Radio } from 'flowbite-svelte'
    import {getWFSCapabilitiesObject} from '$lib/component/wfs/WFSCapabilitiesObject'
    import { Progressbar } from 'flowbite-svelte'
    import WFSCapabilityLayer from './WFSCapabilityLayer.svelte'
	import { currentListWFSCapability } from '$lib/store/storeWFS';
    import {drawnBoundingBox, clickedButtonOnWFS, clickedButtonOnWMS, drawWasClickedOnWFS, drawWasClicked} from '$lib/store/storeBoudingBox'
    import { onMount } from 'svelte';

    let longitudeLowerCorner = '';
    let latitudeLowerCorner = '';
    let longitudeUpperCorner = '';
    let latitudeUpperCorner = '';
    let wgs84BoundingBox = [];
    let actions = ["Dentro de",""]
    let selectedAction = [];
    let checked;
    let progress = 0;
    let selectedItems = [];
    let keyword = '';
    let logicalOperator = 'or';
    let instituicaoText = '';
    let colorBtnAdd ="text-gray-100";
    let bgColorBtnAdd = "bg-gray-50";
    let colorBtnSearch ="text-gray-100";
    let bgColorBtnSearch = "bg-gray-200";
    let drawnCoordinates = [];
    let coordinates = []
    let loading = false;
    let disableButtonRealizarRequest = true;
    let arrWFSLayers = [];
    let qtdRequest = 0;
    let i = 1;
    let objIdTextIRIArray = [];


    //drawn openlayer
    // Função para atualizar um mapa com as coordenadas desenhadas
    function updateMapWithCoordinates(coords) {
        console.log("Atualizando mapa com coordenadas:", coords);
   
        longitudeLowerCorner = coords.westBoundLongitude || '';
        latitudeLowerCorner = coords.southBoundLatitude || '';
        longitudeUpperCorner = coords.eastBoundLongitude || '';
        latitudeUpperCorner = coords.northBoundLatitude || '';

  
    }


    drawnBoundingBox.subscribe(value => {
        drawnCoordinates = value; // Atualiza drawnCoordinates com o valor do store
        updateMapWithCoordinates(drawnCoordinates); // função para atualizar um mapa
    });

    clickedButtonOnWMS.subscribe(bool => {
        if(bool === true){
            longitudeLowerCorner = ''
            latitudeLowerCorner = ''
            longitudeUpperCorner = ''
            latitudeUpperCorner = ''
        }
    })

    function activateDrawButton(){
        drawWasClicked.set(true);
    
    }
    

    function newCoordinate(wfs){
        return {id: i++, longitudeLowerCorner: wfs.wgs84BoundingBox().longitudeLowerCorner(),
            latitudeLowerCorner: wfs.wgs84BoundingBox().latitudeLowerCorner(),
            longitudeUpperCorner: wfs.wgs84BoundingBox().longitudeUpperCorner(),
            latitudeUpperCorner: wfs.wgs84BoundingBox().latitudeUpperCorner()      
        }
    }
    
    function isChecking() {
        if (!checked) 
            selectedItems = [...objIdTextIRIArray];
        else {
            selectedItems =[]
        }
        checked = !checked
    }

    function newObjIdTextIRI(obj) {
        return { id: i++, text: obj.descricao, iri: obj.wfsGetCapabilities }
    }

    async function capabilityObject(idTextIRI) {
        console.log("idtextIri" + JSON.stringify(idTextIRI))
        let wfsCapabilities = await getWFSCapabilitiesObject(idTextIRI)
        //$currentListWFSCapability = [...$currentListWFSCapability, result]
        qtdRequest++;
        if (!wfsCapabilities)
            return console.log(`A requisição ${idTextIRI.iri} falhou.`);
        
        
       
        //console.log("WFSCapabilities" + JSON.stringify(WFSCapabilities));
        let arrLayers = wfsCapabilities.wfsLayersFilteredByWGS84BoundingBox(wgs84BoundingBox, idTextIRI.iri);
        
        arrLayers.forEach(wfs => {
            coordinates = [...coordinates, newCoordinate(wfs)]    
        })

        arrWFSLayers  = arrWFSLayers.concat(arrLayers)
        arrLayers = [];
        
    }

    function removeBoundingBox(id) {
        wgs84BoundingBox = wgs84BoundingBox.filter((key) => key.id != id );
    }

    async function addBoundingBox() {
        //let obj = {keyword: keyword, logicalOperator: logicalOperator, id: (WGS84BoundingBox.length + 1)}
        let obj = {longitudeLowerCorner: longitudeLowerCorner, latitudeLowerCorner: latitudeLowerCorner, longitudeUpperCorner: longitudeUpperCorner,
            latitudeUpperCorner: latitudeUpperCorner, logicalOperator: logicalOperator, id: (wgs84BoundingBox.length +1)
         }
        wgs84BoundingBox = [...wgs84BoundingBox, obj];
        longitudeLowerCorner = ''
        latitudeLowerCorner = ''
        longitudeUpperCorner = ''
        latitudeUpperCorner = ''
        
    }

    function reset(){
        arrWFSLayers = [];
        qtdRequest = 0;

    }

    async function btnSearchClicked() {

        reset();
        addBoundingBox()
        clickedButtonOnWFS.set(true);
        clickedButtonOnWFS.set(false);
        
        console.log("tamanho bouding box " + wgs84BoundingBox.length)
        console.log("bounding box" + JSON.stringify(wgs84BoundingBox))
        if(wgs84BoundingBox.length == 0)
            return alert("Por favor, incluir pelo menos coordenada completa para esta pesquisa");
        if (selectedItems.length == 0)
        return alert("Por favor, escolha pelo menos uma instituição esta pesquisa");     
            //selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        
        console.log("selectedItems" + JSON.stringify(selectedItems));
        loading = true;
        let promisesCapabilityObject = selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        await Promise.all(promisesCapabilityObject).then().catch((error) => {console.error(error.message);});
        loading = false;
        if (arrWFSLayers.length == 0)
            alert("Não há camadas para esta pesquisa");

        wgs84BoundingBox = [];
        drawnBoundingBox.set([]);
        
    }

    $: if (keyword.length > 2 ) {
        colorBtnAdd ="green";
        bgColorBtnAdd = "bg-gray-300";

    } else {

        colorBtnAdd ="gray";
        bgColorBtnAdd = "bg-gray-50";
    }
    $: if (selectedItems.length > 0 && wgs84BoundingBox.length > 0 ) {
            bgColorBtnSearch = "bg-gray-300";
            bgColorBtnSearch = "bg-gray-200";
            disableButtonRealizarRequest = false;
            colorBtnSearch = "#111827";
        } else {
            colorBtnSearch = "#E5E7EB";
            disableButtonRealizarRequest = true;
            bgColorBtnSearch = "bg-gray-50";
            
        }
    

    $: if(longitudeLowerCorner !== '' &&
        latitudeLowerCorner !== '' &&
        longitudeUpperCorner !== '' &&
        latitudeUpperCorner !== '' &&
        selectedItems.length > 0){
            //addBoundingBox()
            //console.log("bounding box " + WGS84BoundingBox.length)
            bgColorBtnSearch = "bg-gray-300";
            bgColorBtnSearch = "bg-gray-200";
            disableButtonRealizarRequest = false;
            colorBtnSearch = "#111827";
        }else{
            colorBtnSearch = "#E5E7EB";
            disableButtonRealizarRequest = true;
            bgColorBtnSearch = "bg-gray-50";
        }

    onMount(async() => {
        try{
            const response = await fetch("/api/inde/catalogos-servicos")
            const data = await response.json();
            objIdTextIRIArray = data.map((obj) => newObjIdTextIRI(obj));
        } catch (error) {
            console.error('Failed to fetch catalogos_servicos:', error);
        }
    })
</script>
<form class="">
    
    <div class="flex items-center flex-col sm:flex-row mb-1 text-sm font-normal text-gray-900 dark:text-gray-400">
        <label for="instituicoes_multiple" class="mr-2 font-semibold">Escolha as instituições ou </label>
        <div>
            <input class="mr-1 rounded border-gray-300" type="checkbox" {checked} on:click={isChecking}> 
            <span class="mr-2 font-semibold">marque todas</span>
            <span class="mr-2 font-semibold"> {qtdRequest}/{selectedItems.length} </span>
        </div>
        
    </div>
    <select size=6 multiple id="instituicoes_multiple" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    bind:value={selectedItems} >
        {#each objIdTextIRIArray as obj }
           <option value={obj} title="{obj.text}" alt={obj.text}>
                {obj.text}
            </option>
        {/each}
    </select>
    <div class="my-1 w-full items-center flex flex-col md:flex-row">
        <input class="appearance-none w-full h-8 shadow-sm border text-sm border-gray-200 p-2 mr-1 focus:outline-none focus:border-gray-500 rounded-lg"  type="text" placeholder="Menor longitude" 
        bind:value={longitudeLowerCorner}>
        <input class="appearance-none w-full h-8 shadow-sm border text-sm border-gray-200 p-2 mr-1 focus:outline-none focus:border-gray-500 rounded-lg"  type="text" placeholder="Menor latitude" 
        bind:value={latitudeLowerCorner}>
        <input class="appearance-none w-full h-8 shadow-sm border text-sm border-gray-200 p-2 mr-1 focus:outline-none focus:border-gray-500 rounded-lg"  type="text" placeholder="Maior longitude" 
        bind:value={longitudeUpperCorner}>
        <input class="appearance-none w-full h-8 shadow-sm border text-sm border-gray-200 p-2 mr-1 focus:outline-none focus:border-gray-500 rounded-lg"  type="text" placeholder="Maior latitude" 
        bind:value={latitudeUpperCorner}>

        <button class="focus:outline-none hover:{bgColorBtnSearch} font-bold py-1 px-1 rounded inline-flex items-center" 
        on:click|preventDefault={activateDrawButton} title="Desenhar retângulo para definir coordenadas">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm0 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Zm12 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Zm0-12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Z"/>
            <path fill-rule="evenodd" d="M10 6.5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM10 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-4-4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z" clip-rule="evenodd"/>
        </svg>
        </button> 
        
        <button class="focus:outline-none hover:{bgColorBtnSearch} font-bold py-1 px-1 rounded inline-flex items-center" 
        on:click|preventDefault={btnSearchClicked} title="Realizar requisição" disabled={disableButtonRealizarRequest}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="{colorBtnSearch}" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </button>   
    </div>
    <select class="shadow-sm p-2 text-sm w-full rounded-lg bg-white border-gray-300 focus:outline-none text-gray-500" bind:value={selectedAction}>
		{#each actions as action}
			<option value={action}>
				{action}
			</option>
		{/each}
	</select>

    <Progressbar progress={progress} size="h-1.5" />
    {#if loading === true}
        <p class = "text-xl text-center text-blue-600 animate-pulse">...aguarde</p>
    {/if}
    <p class = "w-full text-sm text-center truncate text-blue-600 animate-pulse">{instituicaoText}</p>
    {#each arrWFSLayers as layer, index}
        
        <WFSCapabilityLayer wfsLayer={layer} capabilitiesUrl= {layer.sourceLayer}></WFSCapabilityLayer>
    {/each}    

</form>
    
