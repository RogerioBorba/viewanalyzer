<script>
    import {catalogos_servicos} from '$lib/inde/CatalogoINDE'
    import { Radio } from 'flowbite-svelte'
    import {getWMSCapabilitiesObject} from '$lib/component/wms/GetWMSCapabilities'
    import { Progressbar } from 'flowbite-svelte'
    import WMSCapabilityLayer from './WMSCapabilityLayer.svelte'
	import { currentListWMSCapability } from '$lib/store/storeWMS';
    let checked;
    let progress = 0;
    let selectedItems = [];
    let keyword = '';
    let keywords = [];
    let logicalOperator = 'or';
    let instituicaoText = '';
    let colorBtnAdd ="text-gray-100";
    let bgColorBtnAdd = "bg-gray-50";
    let colorBtnSearch ="text-gray-100";
    let bgColorBtnSearch = "bg-gray-200";
    
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
            return console.log(`A requisição ${idTextIRI.iri} falhou.`);
        let arrLayers = wmsCapabilities.wmsLayersFilteredByKeywords(keywords, idTextIRI.iri)
       
        arrWMSLayers  = arrWMSLayers.concat(arrLayers)
        
    }

    function removeKeyword(id) {
        keywords = keywords.filter((key) => key.id != id );
    }

    async function addKeyword() {
        let obj = {keyword: keyword, logicalOperator: logicalOperator, id: (keywords.length + 1)}
        keywords = [...keywords, obj];
        keyword = ''
        
    }

    async function btnSearchClicked() {
        if(keywords.length == 0)
            return alert("Por favor, incluir pelo menos uma palavra chave esta pesquisa");
        if (selectedItems.length == 0)
        return alert("Por favor, escolha pelo menos uma instituição esta pesquisa");     
            //selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        let promisesCapabilityObject = selectedItems.map((idTextIRI) => {return capabilityObject(idTextIRI)})
        await Promise.all(promisesCapabilityObject).then( ).catch((error) => {console.error(error.message);});
        if (arrWMSLayers.length == 0)
            alert("Não há camadas para esta pesquisa");
        
    }

    $: if (keyword.length > 2 ) {
        colorBtnAdd ="green";
        bgColorBtnAdd = "bg-gray-300";

    } else {

        colorBtnAdd ="gray";
        bgColorBtnAdd = "bg-gray-50";
    }
    $: if (selectedItems.length > 0 && keywords.length > 0 ) {
            bgColorBtnSearch = "bg-gray-300";
            bgColorBtnSearch = "bg-gray-200";
            disableButtonRealizarRequest = false;
            colorBtnSearch = "#111827";
        } else {
            colorBtnSearch = "#E5E7EB";
            disableButtonRealizarRequest = true;
            bgColorBtnSearch = "bg-gray-50";
            
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
        {#each objIdTextIRIArray as obj }
           <option value={obj} title="{obj.text}" alt={obj.text}>
                {obj.text}
            </option>
        {/each}
    </select>
    <div class="my-1 w-full items-center flex flex-col md:flex-row">
        <input class="appearance-none w-full h-8 shadow-sm border text-sm border-gray-200 p-2 mr-1 focus:outline-none focus:border-gray-500 rounded-lg"  type="text" placeholder="Informe a palavra chave da camada" 
        bind:value={keyword}>
        <button class="focus:outline-none hover:{bgColorBtnAdd} font-bold pt-1 pl-1 rounded inline-flex items-center" 
        on:click|preventDefault={addKeyword} title="Adicionar palavra chave" disabled={false}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="{colorBtnAdd}" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" /></svg>
        </button>   
        <div class = "flex flex-col md:flex-row gap-0 border rounded-lg border-gray-200 ">
            <Radio name="hor-list" class="p-3" bind:group={logicalOperator} value="and">And</Radio>
            <Radio name="hor-list" class="p-3" bind:group={logicalOperator}  value="or">Or</Radio>
        </div>
        <button class="focus:outline-none hover:{bgColorBtnSearch} font-bold py-1 px-1 rounded inline-flex items-center" 
        on:click|preventDefault={btnSearchClicked} title="Realizar requisição" disabled={disableButtonRealizarRequest}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="{colorBtnSearch}" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </button>   
    </div>    
    <ul class="flex flex-col m-1">
        {#each keywords as obj (obj.id) }
            <li class="flex bg-slate-200 items-center">
               <span class="items-center"> {obj.keyword}  {obj.logicalOperator} </span>
               <button class="mx-1 focus:outline-none font-bold pt-1 pl-1 rounded hover:{bgColorBtnAdd}" 
               on:click={removeKeyword(obj.id)} title="Remover palavra chave" disabled={false}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="red" d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z" /></svg>
              </button>   
            </li>
        {/each}
    </ul>
    <Progressbar progress={progress} size="h-1.5" />
    <p class = "w-full text-sm text-center truncate text-blue-600 animate-pulse">{instituicaoText}</p>
    {#each arrWMSLayers as layer, index}
        
        <WMSCapabilityLayer wmsLayer={layer} capabilitiesUrl= {layer.sourceLayer}></WMSCapabilityLayer>
    {/each}    
    
</form>