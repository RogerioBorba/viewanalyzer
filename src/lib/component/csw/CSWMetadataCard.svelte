<script>
    
    import {MD_Metadata} from '$lib/ISO/19115/MdMetadata'
    import { onMount } from 'svelte';
    import { nodeValue } from '$lib/xml-json/utils'
    export let  md_metadata; // 
    let metaMetadata = null;
    let distribution = null;
    let status = ''
    let title = ''    
    let standardName = ''
    //let status = metadataJSON["gmd:identificationInfo"]["srv:SV_ServiceIdentification"]["gmd:status"]["gmd:MD_ProgressCode"]
    onMount(async () => {
        
        if (!md_metadata) {
            console.log("md_metadata: ", md_metadata)
            return null
        }   
        metaMetadata = new MD_Metadata(md_metadata)
        console.log("metaMetadata.getIdentificationInfo(): ", metaMetadata.getIdentificationInfo())
        console.log("metaMetadata.getDistributionInfo()?.onLine(): ", metaMetadata.getDistributionInfo())
        standardName = metaMetadata.metadataStandardName() //["gco:CharacterString"]
        
        
    })

</script>
<div class= "p-2 text-sm text-left text-gray-800 bg-gray-200  rounded-md shadow-sm hover:shadow-md flex flex-col" >
    {#if metaMetadata}
        {#if metaMetadata.getIdentificationInfo()}
            <h2 class="font-bold text-blue-800"><span class="text-gray-950 font-bold">Título:</span> { metaMetadata.getIdentificationInfo().title() }</h2>
            <h2 class="font-semibold"> <span class="font-bold">Status:</span> {metaMetadata.getIdentificationInfo().status()} </h2>
            <h2 class="font-semibold"> <span class="font-bold">Resumo:</span> {metaMetadata.getIdentificationInfo().abstractInfo()} </h2>
        {/if}
        {#if metaMetadata.getDistributionInfo()}
        {/if}
        <h2 class="font-semibold"> Padrão de metadados: { standardName }</h2>
    {/if}
    
    
</div>