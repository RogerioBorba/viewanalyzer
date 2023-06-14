<script>
    import { fade } from 'svelte/transition'
    export let wmsLayer
    //export let capabilitiesUrl
    let metadadoText = ""
    let metadados = wmsLayer.metadataURLs()
    
    function stylesAsString() {
        console.log("wmsLayer: ", wmsLayer  )
        if (!wmsLayer.styles())
            return ''
        return wmsLayer.styles().map( st => st.title).toString()
    }
    function keywordsString() {
        return (wmsLayer.keywords())? wmsLayer.keywords().toString(): 'Não há palavras chaves'
    }
    
    function crssAsString() {
        if (!wmsLayer.crss())
            return ''
        return wmsLayer.crss().toString()
    }
    
</script>
    <div class="p-2 bg-gray-200  text-gray-800 rounded-md shadow-sm hover:shadow-md flex flex-col break-words text-sm text-left">
        <h2> <span class="font-semibold">Nome:</span> {wmsLayer.name()}</h2>
        <h2> <span class="font-semibold">Título:</span> {wmsLayer.title()}</h2>
        <h2> <span class="font-semibold">Palavras chaves: </span>{keywordsString()}</h2>
        <h2> <span class="font-semibold">Estilo:</span> {stylesAsString()}</h2>
        <h2> <span class="font-semibold">CRSs:</span> {crssAsString()}</h2>
       <!-- <h2><a class= "text-blue-500 underline underline-offset-4" href={wmsLayer.style().legendGraphic().link()}>Link legenda</a></h2> -->
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
</div>
