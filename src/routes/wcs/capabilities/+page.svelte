<script>
    import { WCSCoverageSummary } from '$lib/component/wcs/WCSCoverageSummary';
    import WCSCoverageCard  from '$lib/component/wcs/WCSCoverageCard.svelte';
    import {currentListWCSCapability} from '$lib/store/storeWCS'
    import { onMount } from 'svelte';
    import { NavLi, NavUl } from 'flowbite-svelte';
    import CsvWms from '$lib/component/csv/csvWMS.svelte';
    import PdfJsObject from '$lib/component/pdf/pdfJSObject.svelte';
    import {xmlToObject} from '$lib/component/wcs/WCSObject'
    import CsvWcs from '$lib/component/csv/CsvWCS.svelte';
   
   
    let filteredWCSCoverage = []
    let coverageSummaryObjects = [];
    let textEntered = null;
    let withMetadadaChecked = false
    let withoutMetadadaChecked = false
    let withoutKeywordChecked = false
    let withKeywordChecked = false

    onMount(async () => {
        let i = 1;
        let current = $currentListWCSCapability
        let wcsObjects = current.getCoverageSummary();
        coverageSummaryObjects = wcsObjects.map( each => {return new WCSCoverageSummary(each, i++)})
        console.log("COVERAGE SUMMARY OBJECTS" + JSON.stringify(coverageSummaryObjects))
        coverageSummaryObjects.map(element => console.log(element.getTitle() + "\n" +
        "Abstract " + element.getAbstract() + "\n" +
        "Metadata " + element.getMetadata().metadataHref + element.getMetadata().type + "\n" +
        "Keywords" + element.getKeywords() + "\n" +
        "84" + JSON.stringify(element.getWGS84BoundingBox()) + "\n" + 
        "getBoundingBox" + JSON.stringify(element.getBoundingBox()) + "\n" +
        "identifier" + element.getIdentifier() + "\n" +
        "id" + element.id
    ))


        if (!current)
            return
        console.log("current" + JSON.stringify(current))
        //let coverageSummarObjects = current.getCoverageSummary()
        //wmsLayers = layerObjects.map( each => {return new WMSLayer(each, i++ , null)})
    })


    $: {
        if (textEntered && textEntered.length >= 3) {
            console.log("COVERAGE" + JSON.stringify(coverageSummaryObjects))
            //filteredWCSCoverage = coverageSummaryObjects.filter(e => (e.title().toLowerCase().search(textEntered.toLowerCase()) > -1) || (e.name().toLowerCase().search(textEntered.toLowerCase()) > -1))
            filteredWCSCoverage = coverageSummaryObjects.filter(e => e.getTitle().toLowerCase().search(textEntered.toLowerCase()) > -1);
        }
        else {
            filteredWCSCoverage = [...coverageSummaryObjects]
        }    

        if (withoutMetadadaChecked) 
            filteredWCSCoverage = filteredWCSCoverage.filter(e => !e.getMetadata())
        
        if (withMetadadaChecked) 
            filteredWCSCoverage = filteredWCSCoverage.filter(e => e.getMetadata())
        
        if (withoutKeywordChecked)
            filteredWCSCoverage = filteredWCSCoverage.filter(e => !e.getKeywords())

        if (withKeywordChecked)
            filteredWCSCoverage = filteredWCSCoverage.filter(e => e.getKeywords())
    }     

    $: wcsToArray = xmlToObject(filteredWCSCoverage);
    $: console.log("WCSTOARRAY" + JSON.stringify(wcsToArray))
</script>

<div>
    <div id="hideDiv" class="flex items-center">
        <div class="flex md:flex-row justify-start">
            <NavUl class="order-1">
                <NavLi href="/" active={true}>Home</NavLi>
            </NavUl>
        </div>
        <input class="m-1 p-1 w-1/4 mr-2" type="text" bind:value={textEntered} placeholder="Digite para filtrar">
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withMetadadaChecked}>
            <span class="mr-2 whitespace-nowrap text-sm">Com metadado associado</span>
        </div>
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withoutMetadadaChecked}>
            <span class="mr-2 whitespace-nowrap text-sm">Sem metadado associado</span>
        </div>
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withoutKeywordChecked}>
            <span class="mr-2 whitespace-nowrap text-sm">Sem palavra chave</span>
        </div>
        <div class="flex items-center">
            <input class="mr-2" type="checkbox" bind:checked={withKeywordChecked}>
            <span class="mr-2 whitespace-nowrap text-sm">Com palavra chave</span>
        </div>
        <div>
            <p class="whitespace-nowrap text-sm">Qtd : {filteredWCSCoverage.length}</p>
        </div>
        
        <div class="flex ml-2 space-x-0">
            <PdfJsObject listJsonObject = {wcsToArray} header={""} ></PdfJsObject>
            <CsvWcs {wcsToArray}/>
            
        </div>
    </div>
</div>
<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
    {#each filteredWCSCoverage as coverageSummary (coverageSummary.id)}
        <WCSCoverageCard coverageSummary={coverageSummary}></WCSCoverageCard>
    {/each}    
</div>
