<script lang="ts">
    import {currentListWMSCapability} from '$lib/store/storeWMS'
    import WMSLayerCard from '$lib/component/wms/WMSLayerCard.svelte'
    import {WMSLayer} from '$lib/component/wms/WMSLayer'
    import { onMount } from 'svelte';
    import PdfHTML from "$lib/component/pdf/pdfHTML.svelte";   

    import { Navbar, NavBrand, Dropdown, DropdownHeader, Avatar, DropdownItem, DropdownDivider, NavUl, NavHamburger, NavLi } from 'flowbite-svelte';
  import CsvHtml from '$lib/component/csv/csvWMS.svelte';
  import CsvWms from '$lib/component/csv/csvWMS.svelte';
  import PdfJsObject from '$lib/component/pdf/pdfJSObject.svelte';
    let wmsLayers = []
    let textEntered = null
    let filteredWMSLayers = []
    let withMetadadaChecked = false
    let withoutMetadadaChecked = false
    let withoutKeywordChecked = false
    let nameEqualTitleChecked = false
    let dom = null;
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
        
        if (withMetadadaChecked) 
            filteredWMSLayers = filteredWMSLayers.filter(e => e.metadataURLs() && e.metadataURLs().length > 0)
        
        if (withoutKeywordChecked)
            filteredWMSLayers = filteredWMSLayers.filter(e => !e.keywords())
        
        if (nameEqualTitleChecked)
            filteredWMSLayers = filteredWMSLayers.filter(e => e.title()== e.name())    
    }     
    


    //XML está em filteredWMS e eu estou criando objetos com as informações contidas nele 
    const xmlToArray = (filteredWMSLayers) => {
        let arrayToCSV = []

        //let metadataLink = 'Sem metadado associado';
        let metadataLink = [];

        filteredWMSLayers.forEach(element => {
            
            let name = element.name();
            let title = element.title();

            let style = element.styles()? element.styles().map( st => st.title).toString() : '';
            
            let keywords = element.keywords()? element.keywords().toString(): 'Não há palavras chaves';
   
            let crss = element.crss()? element.crss().toString() : '';

            let metadados = element.metadataURLs();
            

            if(metadados){
                metadados.forEach(metadado => metadataLink = [...metadataLink,metadado.metadataObject.OnlineResource["@attributes"]["xlink:href"].toString()]);
               //metadataLink = metadados[0].metadataObject.OnlineResource["@attributes"]["xlink:href"].toString();
            }


            let obj = {['Nome'] : name,
            ['Título']: title,
            ['Palavras Chaves'] : keywords,
            ['Estilo'] : style,
            ['Crss'] : crss
            }

            let link_metadados;
            if(metadataLink.length === 1){
                link_metadados = metadataLink;
            }else if(metadataLink.length > 1){
                link_metadados = metadataLink.map(link => link).join('\n')
            }else{
                link_metadados = 'Sem metadado associado'
            }
            
            obj.Link_metadados = link_metadados;
           
            arrayToCSV = [...arrayToCSV, obj]
            //console.log(JSON.stringify(obj))
            metadataLink = [];
        })

        
        return arrayToCSV;
    }

    $: wmsArrayToCSV = xmlToArray(filteredWMSLayers);

    

</script>

<div>
    <div id="hideDiv" class="m-2 flex md:flex-row flex-col justify-center md:justify-start md:items-center">
        <div class="flex md:flex-row justify-start">
            <NavUl class="order-1">
                <NavLi href="/" active={true}>Home</NavLi>
            </NavUl>
        </div>
        <input class="m-1 p-1 w-1/4 mr-2" type="text" bind:value={textEntered} placeholder="Digite para filtrar">
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withMetadadaChecked}>
            <span class="mr-2">Com metadado associado</span>
        </div>
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withoutMetadadaChecked}>
            <span class="mr-2">Sem metadado associado</span>
        </div>
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withoutKeywordChecked}>
            <span class="mr-2">Sem palavra chave</span>
        </div>
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={nameEqualTitleChecked}>
            <span class="mr-4">Nome igual ao título</span>
        </div>
        <div class="mr-10">
            <p>Qtd : {filteredWMSLayers.length}</p>
        </div>
        
        <div class="flex ml-12 space-x-0">
            <PdfJsObject listJsonObject = {wmsArrayToCSV} header={""} ></PdfJsObject>
            <CsvWms {wmsArrayToCSV}></CsvWms>
            
        </div>
    </div>
</div>
<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
    {#each filteredWMSLayers as wmsLayer (wmsLayer.oid)}
        <WMSLayerCard wmsLayer={wmsLayer}></WMSLayerCard>
    {/each}    


</div>
