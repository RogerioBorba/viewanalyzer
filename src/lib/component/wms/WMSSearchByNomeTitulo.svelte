<script>
    import {catalogos_servicos} from '$lib/inde/CatalogoINDE'
    import {getWMSCapabilitiesObject} from '$lib/component/wms/GetWMSCapabilities'
    import { Progressbar } from 'flowbite-svelte'
    import WMSCapabilityLayer from './WMSCapabilityLayer.svelte'
    let checked;
    let progress = 0;
    let selectedItems = [];
    let nameTile = '';
    let instituicaoText = '';
    let colorBtnSearch ="text-gray-100";
    let bgColorBtnSearch = "bg-gray-50";
    let disableButtonRealizarRequest = true;
    let arrWMSLayers = [];
    let qtdRequest = 0;
    let i = 1;
    let objIdTextIRIArray = catalogos_servicos.map( (obj) => newObjIdTextIRI(obj));
    function isChecking() {
        if (!checked) 
            selectedItems = [...objIdTextIRIArray];
        else {
            selectedItems =[]
        }
        checked = !checked
    }

    function newObjIdTextIRI(obj) {
        return { id: i++, text: obj.descricao, iri: obj.wmsGetCapabilities }
    }

    async function capabilityObject(idTextIRI) {
        let wmsCapabilities = await getWMSCapabilitiesObject(idTextIRI)
        //$currentListWMSCapability = [...$currentListWMSCapability, result]
        qtdRequest++;
        if (!wmsCapabilities)
            return console.log(`A requisição ${idTextIRI} falhou.`)
        let arrLayers = wmsCapabilities.wmsLayersFilteredByNameOrTitle(nameTile, idTextIRI.iri)
        arrWMSLayers  = arrWMSLayers.concat(arrLayers)
        //console.log(arrWMSLayers)
        
    }

    async function btnSearchClicked() {
        //console.log(selectedItems)
        //selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        let promisesCapabilityObject = selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        await Promise.all(promisesCapabilityObject).then().catch((error) => {console.error(error.message);});
    }

    $: if (selectedItems.length > 0) {
            colorBtnSearch ="black"
            bgColorBtnSearch = "bg-gray-300"
            disableButtonRealizarRequest = false
        } else {
            colorBtnSearch ="gray"
            bgColorBtnSearch = "bg-gray-50"
            disableButtonRealizarRequest = true
        }

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
        {#each objIdTextIRIArray as obj}
           <option value={obj} title="{obj.text}" alt={obj.text}>
                {obj.text}
            </option>
        {/each}
    </select>
    <div class="my-1 w-full items-center flex flex-col md:flex-row">
        <input class="appearance-none w-full h-8 shadow-sm border text-sm border-gray-200 p-2 mr-1 focus:outline-none focus:border-gray-500 rounded-lg"  type="text" placeholder="Informe nome ou título da camada" 
        bind:value={nameTile}>
        <button class="focus:outline-none hover:{bgColorBtnSearch} font-bold py-1 px-1 rounded inline-flex items-center" 
        on:click|preventDefault={btnSearchClicked} title="Realizar requisição" disabled={disableButtonRealizarRequest}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="{colorBtnSearch}" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </button>   
       <!-- <button class="focus:outline-none bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-100" 
        on:click|preventDefault={btnStopSearchClicked} title="Cancelar pesquisa">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="red" d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
            </svg>
        </button>
        <button class="focus:outline-none bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-100" 
        on:click|preventDefault={btnClearClicked} title="Limpar camadas">
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="red" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
            </svg>  
        </button>
        -->
    </div>    
    <Progressbar progress={progress} size="h-1.5" />
    <p class = "w-full text-sm text-center truncate text-blue-600 animate-pulse">{instituicaoText}</p>
    {#each arrWMSLayers as layer, index (index)}
        
        <WMSCapabilityLayer wmsLayer={layer} capabilitiesUrl= {layer.sourceLayer}></WMSCapabilityLayer>
    {/each}    
    
</form>