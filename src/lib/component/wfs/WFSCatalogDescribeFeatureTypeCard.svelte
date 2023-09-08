<script>
    import {countWFSProcessado, currentListComplexType} from '$lib/store/storeWFS'
    import { goto } from '$app/navigation';
    import { Spinner} from 'flowbite-svelte';
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { fetchData } from "$lib/request/requestData";
    import {complexTypeList} from '$lib/xml-json/describeFeatureType';
    export let objIdDescricaoIri;
    let complexArray = []
    let tempoRequisicao = 0;
    let bgColor = 'bg-gray-200'  ;
    let spinHidden = '';
    let spinMessage = 'processando ...';
    let requestGetRecordsTextOrError = '';
    
    function linkClicked() {
        currentListComplexType.set(complexArray)
        goto("\describe-feature-type")
    }
   
    onMount(async () => {
        try {
            if(!objIdDescricaoIri.iri) {
                spinHidden = 'hidden'
                spinMessage = 'Sem catálogo WFS para processamento'
                return 
            }
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 6000000)
            let tempo = new Date().getTime();
            let res = await fetchData(objIdDescricaoIri.iri)
            let xmlText = await res.text()
            complexArray = complexTypeList(xmlText)
            currentListComplexType.set(complexArray)
            console.log(complexArray)
            tempoRequisicao = parseFloat(((new Date().getTime()) - tempo)/1000).toFixed(2)
            $countWFSProcessado = $countWFSProcessado + 1
            spinHidden = 'hidden'
            spinMessage = 'processado com sucesso'
        } catch (error) {
            console.log("Erro na chamada da requisição")
            console.log(error, error.statusText, error.status)
            requestGetRecordsTextOrError = `ERRO na requisição. ${error.status} - ${error.statusText}. Contate o responsável.`
            bgColor =  'bg-red-200'
            spinHidden = 'hidden'
            spinMessage = 'processado com erro'
            $countWFSProcessado = $countWFSProcessado + 1
        }
		
	});
    
</script>
<div class= "p-2 {bgColor} text-sm text-left text-gray-800  rounded-md shadow-sm hover:shadow-md flex flex-col"  transition:fade>
        <h2 class="font-semibold"> {requestGetRecordsTextOrError}</h2>
        <h2 class="font-semibold"> {objIdDescricaoIri.descricao}</h2>
        <h2> Tempo de requisição DescribeFeatureType: {tempoRequisicao} seg.</h2>
        <h2> Qtd de Tipo de Feições: {complexArray.length}</h2>
        <button class="text-green-600 text-left font-semibold hover:bg-gray-200 hover:underline py-1"  on:click={linkClicked}>Mais detalhes</button>
        <!--<a class="text-xs text-blue-500 underline underline-offset-4 uppercase" href="{metadadoAssociado()}">{metadadoText}</a>-->
        <div class="bg-slate-300 text-slate-600 rounded-md text-center p-1">
            <Spinner class="{spinHidden} mr-3" size="4" color="white" />
            {spinMessage}
        </div>
</div>