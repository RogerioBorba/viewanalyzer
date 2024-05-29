<script>
    export let coverageSummary;

    let metadados = coverageSummary.getMetadata();
    console.log("metadados" + JSON.stringify(metadados))
</script>


 <div class="font-semibold p-2 bg-gray-200  text-gray-800 rounded-md shadow-sm hover:shadow-md flex flex-col break-words text-sm text-left">
        <h2> <span >Título:</span> {coverageSummary.getTitle()}</h2>
        <h2> <span >Resumo:</span> {coverageSummary.getAbstract()}</h2>
        <h2> <span >Palavras chaves: </span>{coverageSummary.getKeywords() || "Sem palavras chaves associadas"}</h2>
        <h2> <span >Identificador: </span>{coverageSummary.getIdentifier() || "Sem identificador associado"}</h2>

        {#if coverageSummary.getWGS84BoundingBox()}
            <h2> <span >WGS84: </span>{coverageSummary.getWGS84BoundingBox().lowerCorner + " e " + coverageSummary.getWGS84BoundingBox().upperCorner}</h2>
       
        {/if}

        {#if coverageSummary.getBoundingBox()}
            <h2> <span >Bounding Box: </span>{coverageSummary.getBoundingBox().lowerCorner + " e " + coverageSummary.getBoundingBox().upperCorner}</h2>
       
        {/if}
        
        {#if metadados !== null }
            {#each metadados.metadataHrefs as href, index}
                <p>
                <a class="text-xs text-blue-500 underline underline-offset-4 uppercase" href="{href}" target="_blank">Link metadado {index + 1}</a>
                <span> tipo: {metadados.types[index]}</span>
                </p>
            {/each}
        {:else}
            <a class="text-xs text-yellow-500 uppercase">Sem metadado associado</a>
         {/if}
            

       <!-- <h2><a class= "text-blue-500 underline underline-offset-4" href={wmsLayer.style().legendGraphic().link()}>Link legenda</a></h2> -->
       <!---
       {#if metadados }
            {#each metadados as metadata}
                <p>
                   <a class="text-xs text-blue-500 underline underline-offset-4 uppercase" href="{metadata.link()}" target="_blank">Link metadado</a>
                   <span> tipo: {metadata.type()}</span>
                </p>
            {/each}
        {:else}
            <a class="text-xs text-yellow-500 uppercase">Sem metadado associado</a>
        {/if}
    ---->
</div>