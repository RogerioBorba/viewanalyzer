<script>
    import {catalogos_servicos} from '$lib/inde/CatalogoINDE'
    import { Radio } from 'flowbite-svelte'
    import {getWFSCapabilitiesObject} from '$lib/component/wfs/WFSCapabilitiesObject'
    import { Progressbar } from 'flowbite-svelte'
    import WFSCapabilityLayer from './WFSCapabilityLayer.svelte'
	import { currentListWFSCapability } from '$lib/store/storeWFS';
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
    
    let disableButtonRealizarRequest = true;
    let arrWFSLayers = [];
    let qtdRequest = 0;
    let i = 1;
    let objIdTextIRIArray = [];
    
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
       
        arrWFSLayers  = arrWFSLayers.concat(arrLayers)
        
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

    async function btnSearchClicked() {
        addBoundingBox()
        console.log("tamanho bouding box " + wgs84BoundingBox.length)
        console.log("bounding box" + JSON.stringify(wgs84BoundingBox))
        if(wgs84BoundingBox.length == 0)
            return alert("Por favor, incluir pelo menos coordenada completa para esta pesquisa");
        if (selectedItems.length == 0)
        return alert("Por favor, escolha pelo menos uma instituição esta pesquisa");     
            //selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        
        console.log("selectedItems" + JSON.stringify(selectedItems));
        let promisesCapabilityObject = selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        await Promise.all(promisesCapabilityObject).then().catch((error) => {console.error(error.message);});
        
        if (arrWFSLayers.length == 0)
            alert("Não há camadas para esta pesquisa");

        wgs84BoundingBox = [];
        
        
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

         <!---
        <button class="focus:outline-none hover:{bgColorBtnAdd} font-bold pt-1 pl-1 rounded inline-flex items-center" 
        on:click|preventDefault={addBoundingBox} title="Adicionar dimensões" disabled={false}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="{colorBtnAdd}" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" /></svg>
        </button>   
        
        <div class = "flex flex-col md:flex-row gap-0 border rounded-lg border-gray-200 ">
            <Radio name="hor-list" class="p-3" bind:group={logicalOperator} value="and">And</Radio>
            <Radio name="hor-list" class="p-3" bind:group={logicalOperator}  value="or">Or</Radio>
        </div>
        ----->
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
    <p class = "w-full text-sm text-center truncate text-blue-600 animate-pulse">{instituicaoText}</p>
    {#each arrWFSLayers as layer, index}
        
        <WFSCapabilityLayer wfsLayer={layer} capabilitiesUrl= {layer.sourceLayer}></WFSCapabilityLayer>
    {/each}    

</form>
    
