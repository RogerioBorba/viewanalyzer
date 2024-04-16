<script>
    export let metadata


</script>
    {#if !(metadata == null)}
        <div class="p-2 text-sm text-left text-gray-800 bg-gray-200 rounded-md shadow-sm hover:shadow-md flex flex-col">
        <h2 class="font-bold text-blue-800"><span class="text-gray-950 font-bold">Nome: </span>{metadata.nome}</h2>
        <h2 class="font-semibold"><span class="font-bold">URL: </span><span class="break-all">{metadata.url}</span></h2>
        <h2 class="font-semibold"><span class="font-bold">Protocolo: </span>{metadata.protocolo}</h2>
        <h2 class="font-semibold"><span class="font-bold">Tipo de erro: </span>{metadata.erro}</h2>
        </div>
    {/if}
