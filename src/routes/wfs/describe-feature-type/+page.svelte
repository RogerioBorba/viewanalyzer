<script>

    import { currentListComplexType } from "$lib/store/storeWFS";
    import WFSComplexTypeCard from '$lib/component/wfs/WFSComplexTypeCard.svelte';
    import { onMount } from 'svelte';
    import PdfJsObject from "$lib/component/pdf/pdfJSObject.svelte";
    import PdfHTML from "$lib/component/pdf/pdfHTML.svelte";

    let dom = null;
    /**
     * @type {[]}
     */
    let wfsLayersAsJson = [];
    onMount(async () => {
    
    });   
</script>

    <!--<PdfJsObject listJsonObject = {wfsLayersAsJson} header={""} ></PdfJsObject>-->
    <PdfHTML elementHTML = {dom?dom.body: null}></PdfHTML>
    <div class = "m-2 p-1 grid gap-2 md:grid-cols-3 grid-cols-1">
        {#each $currentListComplexType as complexType}
            <WFSComplexTypeCard complexType={complexType} ></WFSComplexTypeCard>
        {/each}
          
    </div>
    
    

