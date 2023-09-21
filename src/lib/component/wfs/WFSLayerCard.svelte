<script>
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    export let wfsLayer
    //export let capabilitiesUrl
    let metadadoText = ""
    let metadados = wfsLayer.metadataURLs()
    
    onMount(async () => {
        //console.log(wfsLayer.metadataURLs())
    })

    
    function keywordsString() {
        
        return (wfsLayer.keywords())? wfsLayer.keywords(): 'Não há palavras chaves'
    }
    
    function defaultSRS() {
        if (!wfsLayer.defaultSRS())
            return ''
        return wfsLayer.defaultSRS().toString()
    }
   
    
</script>
    <div class="font-semibold p-2 bg-gray-200  text-gray-800 rounded-md shadow-sm hover:shadow-md flex flex-col break-words text-sm text-left">
        <h2> <span >Nome:</span> {wfsLayer.name()}</h2>
        <h2> <span >Título:</span> {wfsLayer.title()}</h2>
        <h2> <span >Palavras chaves: </span>{keywordsString()}</h2>
        <h2> <span >Default SRS:</span> {defaultSRS()}</h2>
       <!-- <h2><a class= "text-blue-500 underline underline-offset-4" href={wmsLayer.style().legendGraphic().link()}>Link legenda</a></h2> -->
       {#if metadados.length > 0 }
            {#each metadados as metadata}
                <p>
                   <a class="text-xs text-blue-500 underline underline-offset-4 uppercase" href="{metadata.link()}" target="_blank">Link metadado</a>
                   <span> tipo: {metadata.type()}</span>
                </p>
            {/each}
        {:else}
            <p class="text-xs text-yellow-500 uppercase">Sem metadado associado</p>
        {/if}
            
</div>
