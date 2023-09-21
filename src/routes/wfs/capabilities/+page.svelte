<script>
    import {currentListWFSCapability} from '$lib/store/storeWFS';
    import WFSLayerCard from '$lib/component/wfs/WFSLayerCard.svelte';
    import { WFSLayer } from '$lib/component/wfs/WFSLayer';
    import Pdf from "$lib/component/pdf/pdfHTML.svelte";   
    import { onMount } from 'svelte';
    import { Navbar, NavBrand, Dropdown, DropdownHeader, Avatar, DropdownItem, DropdownDivider, NavUl, NavHamburger, NavLi } from 'flowbite-svelte';
    import PdfJsObject from '$lib/component/pdf/pdfJSObject.svelte';
    let wfsLayers = []
    let wfsLayersAsJson = []
    let textEntered = null
    let filteredWFSLayers = []
    let withMetadadaChecked = false
    let withoutMetadadaChecked = false
    let withoutKeywordChecked = false
    let nameEqualTitleChecked = false
    let dom = null;
    let avatar = ''
    onMount(async () => {
        dom = document
        let current = await $currentListWFSCapability
        let i = 1
        if (!current)
            return
        
        let layerObjects = await current.features()
        wfsLayers = layerObjects.map( each => {return new WFSLayer(each, i++ , null)})
    })
     
    function filterWFSLayers() {
        if (textEntered && textEntered.length >= 3) {
            wfsLayers.filter(e => (e.title().toLowerCase().search(textEntered.toLowerCase()) > -1) || 
                              (e.name().toLowerCase().search(textEntered.toLowerCase()) > -1))
        } else {

        }
    }

    $: {
        if (textEntered && textEntered.length >= 3) {
            filteredWFSLayers = wfsLayers.filter(e => (e.title().toLowerCase().search(textEntered.toLowerCase()) > -1) || (e.name().toLowerCase().search(textEntered.toLowerCase()) > -1))
            
        }
        else {
            filteredWFSLayers = [...wfsLayers]
        }    

        if (withoutMetadadaChecked) {
            filteredWFSLayers = filteredWFSLayers.filter(e => !e.metadataURLs() || e.metadataURLs().length == 0 )
            withMetadadaChecked = false
        }
        
        if (withoutKeywordChecked)
            filteredWFSLayers = filteredWFSLayers.filter(e => !e.keywords())
        
        if (nameEqualTitleChecked)
            filteredWFSLayers = filteredWFSLayers.filter(e => e.title()== e.name())    

        if (withMetadadaChecked) {
            filteredWFSLayers = filteredWFSLayers.filter(e =>  e.metadataURLs().length > 0 )
            withoutMetadadaChecked = false
        }
        if (filteredWFSLayers.length > 0)
            wfsLayersAsJson = filteredWFSLayers.map(wfsLayer => { return toJsonObject(wfsLayer)})
    }     

    /**
     * @param {{ name: () => any; title: () => any; keywordsString: () => any; defaultSRSString: () => any; typeMetadataString: () => any; }} wfsLayer
     */
    function toJsonObject(wfsLayer) {
        return {
                "Nome": wfsLayer.name(), 
                "Título": wfsLayer.title(), 
                "Palavras chaves": wfsLayer.keywordsString(),
                "Default SRS": wfsLayer.defaultSRSString(),
                "Tipos de Metadados": wfsLayer.typeMetadataString()
            }

    }

</script>
<PdfJsObject listJsonObject = {wfsLayersAsJson} header={""} ></PdfJsObject>
<div class="m-2 flex md:flex-row flex-col justify-center md:justify-start md:items-center">
    <input class= "m-1 p-1 w-1/4" type="text" bind:value={textEntered} placeholder="Digite para filtrar">
    <div>
        <input type="checkbox" bind:checked={withMetadadaChecked}>
        <span class="mr-5">Com metadado associado</span>
    </div>
    <div>
        <input type="checkbox" bind:checked={withoutMetadadaChecked}>
        <span class="mr-5">Sem metadado associado</span>
    </div>
    <div>
        <input type="checkbox" bind:checked={withoutKeywordChecked}>
        <span class="mr-5">Sem palavra chave</span>
    </div>
    <div>
        <input type="checkbox" bind:checked={nameEqualTitleChecked}>
        <span class="mr-5">Nome igual ao título</span>
    </div>
    <div>
        <p>Qtd : {filteredWFSLayers.length}</p>
        
    </div>
</div>

<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
    {#each filteredWFSLayers as wfsLayer (wfsLayer.oid)}
        <WFSLayerCard wfsLayer={wfsLayer}></WFSLayerCard>
    {/each}    


</div>
