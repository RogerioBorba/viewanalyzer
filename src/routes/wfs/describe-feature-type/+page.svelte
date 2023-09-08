<script>

    import { currentListComplexType } from "$lib/store/storeWFS";
    import WFSComplexTypeCard from '$lib/component/wfs/WFSComplexTypeCard.svelte';
    console.log("$currentListComplexType")
    console.log($currentListComplexType)
</script>


<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
    {#each $currentListComplexType as complexType}
        <WFSComplexTypeCard complexType={complexType} ></WFSComplexTypeCard>
    {/each}
      
</div>