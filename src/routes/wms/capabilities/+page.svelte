<script lang="ts">
    import {currentListWMSCapability} from '$lib/store/storeWMS'
    import WMSLayerCard from '$lib/component/wms/WMSLayerCard.svelte'
    import {WMSLayer} from '$lib/component/wms/WMSLayer'
    import { onMount } from 'svelte';
    import { Navbar, NavBrand, Dropdown, DropdownHeader, Avatar, DropdownItem, DropdownDivider, NavUl, NavHamburger, NavLi } from 'flowbite-svelte';
    let wmsLayers = []
    let textEntered = null
    let filteredWMSLayers = []
    let withoutMetadadaChecked = false
    let withoutKeywordChecked = false
    let nameEqualTitleChecked = false

    let avatar = ''
    onMount(async () => {
        let current = await $currentListWMSCapability
        let i = 1
        if (!current)
            return
        console.log(current)
        let layerObjects = await current.layersFromTree()
        wmsLayers = layerObjects.map( each => {return new WMSLayer(each, i++ , null)})
    })
     
    function filterWMSLayers() {
        if (textEntered && textEntered.length >= 3) {
            wmsLayers.filter(e => (e.title().toLowerCase().search(textEntered.toLowerCase()) > -1) || 
                              (e.name().toLowerCase().search(textEntered.toLowerCase()) > -1))
        } else {

        }
    }

    $: {
        if (textEntered && textEntered.length >= 3) {
            filteredWMSLayers = wmsLayers.filter(e => (e.title().toLowerCase().search(textEntered.toLowerCase()) > -1) || (e.name().toLowerCase().search(textEntered.toLowerCase()) > -1))
            
        }
        else {
            filteredWMSLayers = [...wmsLayers]
        }    

        if (withoutMetadadaChecked) 
            filteredWMSLayers = filteredWMSLayers.filter(e => !e.metadataURLs())
        
        if (withoutKeywordChecked)
            filteredWMSLayers = filteredWMSLayers.filter(e => !e.keywords())
        
        if (nameEqualTitleChecked)
            filteredWMSLayers = filteredWMSLayers.filter(e => e.title()== e.name())    
    }     
    
</script>

<div class="m-2 flex md:flex-row flex-col justify-center md:justify-start md:items-center">
    <input class= "m-1 p-1 w-1/4" type="text" bind:value={textEntered} placeholder="Digite para filtrar">
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
        <p>Qtd : {filteredWMSLayers.length}</p>
        
    </div>
</div>
<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
    {#each filteredWMSLayers as wmsLayer (wmsLayer.oid)}
        <WMSLayerCard wmsLayer={wmsLayer}></WMSLayerCard>
    {/each}    


</div>
