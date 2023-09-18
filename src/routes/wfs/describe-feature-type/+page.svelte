<script>

    import { currentListComplexType } from "$lib/store/storeWFS";
    import WFSComplexTypeCard from '$lib/component/wfs/WFSComplexTypeCard.svelte';
    import Pdf from "$lib/component/pdf/pdf.svelte";   
        
</script>
    <Pdf elementHTML = {document.body}></Pdf>
    <div class = "m-2 p-1 grid gap-2 md:grid-cols-3 grid-cols-1">
        {#each $currentListComplexType as complexType}
            <WFSComplexTypeCard complexType={complexType} ></WFSComplexTypeCard>
        {/each}
          
    </div>
    
    

