<script>
    import {countTotalLayer, countTotalLayerWithoutMetadata ,countWCSProcessado, currentListWCSCapability} from '$lib/store/storeWCS'
    import { goto } from '$app/navigation';

    import { Spinner} from 'flowbite-svelte';
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { fetchData } from "$lib/request/requestData";
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import {WCSCapabilities} from '$lib/component/wcs/WCSCapabilities';

    export let objIdDescricaoIri;
    let wcsCapabilities = null;
    let qtdSelectedItem = 0;
    let tempoRequisicao = 0;
    let qtdCamada = 0;
    let qtdCamadaSemMetadadosAssociado = 0;
    let qtdCamadaSemPalavraChave = 0;
    let bgColor = 'bg-gray-200'  ;
    let spinHidden = '';
    let spinMessage = 'processando ...';
    let requestGetRecordsTextOrError = '';
    
    function linkClicked() {
        currentListWCSCapability.set(wcsCapabilities)
        goto("/wcs/capabilities")
    }
    function initializeVariablesOnMount() {
        console.log("WCSCapabilities " + JSON.stringify(wcsCapabilities))
        if (!wcsCapabilities) {
            return 
        }
        qtdCamada = wcsCapabilities.countCoverageSummary();
        //qtdCamadaSemMetadadosAssociado = wcsCapabilities.lenTreeLayerObjectsWithoutMetadata() || 0 ;
        qtdCamadaSemPalavraChave = wcsCapabilities.withouKeywords() ;
        
    }
   
    onMount(async () => {
        try {
            if(!objIdDescricaoIri.iri) {
                spinHidden = 'hidden'
                spinMessage = 'Sem catálogo WCS para processamento'
                return 
            }
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 60000)
            let tempo = new Date().getTime();
            console.log("link wms: " + objIdDescricaoIri.iri)
            let res = await fetchData(objIdDescricaoIri.iri, { signal: controller.signal })
            let xmlText = await res.text()
            wcsCapabilities = new WCSCapabilities(await textXml2Json(xmlText))
            initializeVariablesOnMount()
            $countTotalLayer += qtdCamada
            $countTotalLayerWithoutMetadata += qtdCamadaSemMetadadosAssociado

            tempoRequisicao = parseFloat(((new Date().getTime()) - tempo)/1000).toFixed(2)
            $countWCSProcessado = $countWCSProcessado + 1
            spinHidden = 'hidden'
            spinMessage = 'processado com sucesso'
        } catch (error) {
            console.log("Erro na chamada da requisição")
            console.log(error, error.statusText, error.status)
            requestGetRecordsTextOrError = `ERRO na requisição. ${error.status} - ${error.statusText}. Contate o responsável.`
            bgColor =  'bg-red-200'
            spinHidden = 'hidden'
            spinMessage = 'processado com erro'
            $countWCSProcessado = $countWCSProcessado + 1
        }
		
	});
    
</script>
<div class= "p-2 {bgColor} text-sm text-left text-gray-800  rounded-md shadow-sm hover:shadow-md flex flex-col"  transition:fade>
        <h2 class="font-semibold"> {requestGetRecordsTextOrError}</h2>
        <h2 class="font-semibold"> {objIdDescricaoIri.descricao}</h2>
        <h2> Tempo de requisição GetCapabilities: {tempoRequisicao} seg.</h2>
        <h2> Qtd de camadas: {qtdCamada}</h2>
        <h2> Qtd de camadas sem palavras chaves: {qtdCamadaSemPalavraChave}</h2>

        <button class="text-green-600 text-left font-semibold hover:bg-gray-200 hover:underline py-1"  on:click={linkClicked}>Mais detalhes</button>
        <!--<a class="text-xs text-blue-500 underline underline-offset-4 uppercase" href="{metadadoAssociado()}">{metadadoText}</a>-->
        <div class="bg-slate-300 text-slate-600 rounded-md text-center p-1">
            <Spinner class="{spinHidden} mr-3" size="4" color="white" />
            {spinMessage}
        </div>
</div>