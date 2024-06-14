<script>
    import {catalogos_servicos} from '$lib/inde/CatalogoINDE'
    import {countTotalLayer, countWMSProcessado, keywordCountByName, allKeywords} from '$lib/store/storeWMS'
    import Navbar from '$lib/component/base/navbar.svelte'
    import WMSKeywordCard from '$lib/component/wms/WMSKeywordCard.svelte';
    import {dataToPdf} from '$lib/component/pdf/gerarPDF'
    import {keywordsToCSV} from '$lib/component/csv/gerarCSV'
  import { onDestroy, onMount } from 'svelte';
    
    let selectedItems = [] // {id: number, descricao: string, iri: string}[];
    let selectedCatalogs = []
     let checked = false
    let i = 1
    let instituicaoText = ''
    let nameCatalog = ''
    let adressCatalog =''
    let disableButtonAddNewCatalog = true
    $: qtdCatalog = selectedItems.length
    $:  disableButtonAddNewCatalog = (nameCatalog.length == 0 || adressCatalog.length == 0)? true: false
    const newObjIdDescricaoIRI = (obj) => {
        return { id: i++, descricao: obj.descricao, iri: obj.wmsGetCapabilities}
    }     

    //let objIdDescricaoIRIArray = catalogos_servicos.map( (obj) => newObjIdDescricaoIRI(obj))
    let objIdDescricaoIRIArray = [];

    const addNewCatalog = () => {
        let objIdDescricaoIRI = {id: objIdDescricaoIRIArray.length + 1, descricao: nameCatalog, iri: adressCatalog, noCentralCategoria: null}
        objIdDescricaoIRIArray = [...objIdDescricaoIRIArray, objIdDescricaoIRI]
        nameCatalog = ''
        adressCatalog = ''
    }
        
    const isChecking = () => {
        if (!checked) 
            selectedItems = [...objIdDescricaoIRIArray]
        else {
           
            i = 1
            selectedItems =[]
        }
        checked = !checked
    }

    
    $: items = [];
    let unsubscribe;
    
    async function btnSearchClicked() {
        if (selectedItems.length == 0)
            return alert( 'Escolha pelo menos uma instituição')
        $keywordCountByName= {} 
        $allKeywords=[]
        $countTotalLayer = 0 
        $countWMSProcessado = 0
        selectedCatalogs = selectedCatalogs.concat(selectedItems)
        
        unsubscribe = keywordCountByName.subscribe((value) => {
            items = Object.keys(value).map(key => {
                return { palavra_chave: key, quantidade: value[key] };
            });
        });

        onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
    }

    onMount(async() => {
            try{
                const response = await fetch("/api/inde/catalogos-servicos")
                const data = await response.json();
                objIdDescricaoIRIArray = data.map( (obj) => newObjIdDescricaoIRI(obj))
            } catch (error) {
                console.error('Failed to fetch catalogos_servicos:', error);
            }
        })
</script>
<Navbar brand="OGC/WMS Checker"></Navbar>
<form class="m-2">
    <div class="flex items-center flex-col sm:flex-row mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">
        <label for="instituicoes_multiple" class="mr-4">Escolha as instituições</label>
        <div>
            <input class="mr-1 rounded w-4 h-4 focus:outline-none border-gray-300" type="checkbox" {checked} on:click={isChecking}> 
            <span class="mr-2">selecione todos</span>
        </div>
        <button class="mr-4 focus:outline-none bg-grey-light hover:bg-grey font-bold rounded inline-flex items-center hover:bg-gray-100" on:click|preventDefault={btnSearchClicked} title="Realizar requisição">
            <svg  class="text-indigo-500 fill-current border rounded border-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" color='green' viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </button>
        <p class="mr-2"> Quantidade de catálogos processados: {$countWMSProcessado}/{qtdCatalog} </p>
        <p class="ml-auto text-sm ">Qtd de camadas: {$countTotalLayer}</p>
        <p class="ml-auto text-sm ">Qtd de palavras chaves: {$allKeywords.length}</p>
        
    </div>
    <select size=6 multiple id="instituicoes_multiple" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={selectedItems}>
        {#each objIdDescricaoIRIArray as obj}   
            <option value={obj}>
                {obj.descricao}
            </option>
        {/each}
    </select>
    <div class="mt-2 w-full p1 flex flex-col md:flex-row">
        <input class="border-gray-300 focus:outline-none w-full rounded md:w-2/5 mr-1" type="text"  bind:value={nameCatalog} placeholder="Informe o nome do catálogo"> 
        <input class="border-gray-300 focus:outline-none rounded w-full md:w-2/5 mr-1" type="text"  bind:value={adressCatalog} placeholder="Informe o endereço/link WMS do GetCapabilities"> 
        <button class=" md:w-1/5 shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 disabled:opacity-25" on:click|preventDefault={addNewCatalog} disabled={disableButtonAddNewCatalog}>Adicionar novo catálogo</button>
    
    
        <div class="flex h-full space-x-2 md:flex ml-4"> 
            <button class="w-1/2 h-full p-2  bg-blue-700 font-semibold text-white rounded-md flex items-center justify-center hover:bg-blue-800 disabled:opacity-25" disabled={items.length === 0}  on:click={() => dataToPdf(items)}>
                <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m6 4v5h1.4a1.6 1.6 0 0 0 1.6-1.6v-1.8a1.6 1.6 0 0 0-1.6-1.6H11Z"/>
                </svg>
                .PDF
            </button>

            <button class="w-1/2 h-full p-2  bg-blue-700 font-semibold text-white rounded-md flex items-center justify-center hover:bg-blue-800 disabled:opacity-25" disabled={items.length === 0} on:click={() => keywordsToCSV(items)}>
                <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m2.7 9h-1A1.6 1.6 0 0 1 5 15.4v-1.8A1.6 1.6 0 0 1 6.6 12h1m8.4 0 1.4 4.8L19 12m-6-.2h-1a1.3 1.3 0 0 0-1.4 1.2 1.3 1.3 0 0 0 1.2 1.5h.5a1.3 1.3 0 0 1 1.3 1.7c-.2.6-.7.8-1.4.8h-1"/>
                </svg>
                .CSV
            </button>
        </div>
    </div>
</form>
<div class = "">
       
        {#each selectedCatalogs as objIdDescricaoIri}
            <WMSKeywordCard objIdDescricaoIri={objIdDescricaoIri} ></WMSKeywordCard>
        {/each}
        <div class = "m-2 grid gap-2 md:grid-cols-4 grid-cols-2">
            {#each Object.entries($keywordCountByName) as keyCount, i (i)}
                <div class="p-2 bg-gray-200  text-gray-800 rounded-md shadow-sm hover:shadow-md flex flex-col break-words text-sm text-left">
                    <h2> <span class="font-semibold">{ keyCount[0]}:</span> {keyCount[1]}</h2>
                </div>
            {/each}   
        </div> 
</div>