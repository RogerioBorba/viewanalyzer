<script lang="ts">
    import {currentListWFSCapability} from '$lib/store/storeWFS';
    import WFSLayerCard from '$lib/component/wfs/WFSLayerCard.svelte';
    import { WFSLayer } from '$lib/component/wfs/WFSLayer';
    import { onMount } from 'svelte';
    import { Navbar, NavBrand, Dropdown, DropdownHeader, Avatar, DropdownItem, DropdownDivider, NavUl, NavHamburger, NavLi } from 'flowbite-svelte';
    let wfsLayers = []
    let textEntered = null
    let filteredWFSLayers = []
    let withMetadadaChecked = false
    let withoutMetadadaChecked = false
    let withoutKeywordChecked = false
    let nameEqualTitleChecked = false

    let avatar = ''
    onMount(async () => {
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

    }     
    
</script>

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
