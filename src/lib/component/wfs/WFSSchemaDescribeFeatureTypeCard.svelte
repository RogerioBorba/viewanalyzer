<script>
    import {countWFSSchemaProcessado, countTotalSchemaTypeFeatureWFS, currentFeatureTypeElements, currentWFSGetCapabilities} from '$lib/store/storeWFS';
    import { fetchData } from "$lib/request/requestData";
    import { onMount } from "svelte";

    import { goto } from '$app/navigation';
    import { Spinner} from 'flowbite-svelte';
    import { fade } from 'svelte/transition';
    import { xmlDocument } from '$lib/xml-json/utils'
    export let objIdDescricaoIri;

    let tempoRequisicao;
    let qtdTipoFeicao = 0;
    let bgColor = 'bg-gray-200';
    let errorInRequest = '';
    let spinHidden = '';
    let spinMessage = 'processando ...';
    let featureTypeElements;

    onMount( async () => {
        try {
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 60000)
            let tempo = new Date().getTime();
            let res = await fetchData(objIdDescricaoIri.iri, { signal: controller.signal })
            tempoRequisicao = parseFloat(((new Date().getTime()) - tempo)/1000).toFixed(2)
            let xmlText = await res.text()
            const xmlDoc = xmlDocument(xmlText)
            featureTypeElements = xmlDoc.querySelectorAll('FeatureType')
            qtdTipoFeicao = featureTypeElements.length;
            currentFeatureTypeElements.set(featureTypeElements)
            spinHidden = 'hidden'
            spinMessage = 'processado com sucesso'

        } catch (error) {
            errorInRequest = `ERRO na requisição. ${error.status} - ${error.statusText}. Contate o responsável.`
            bgColor =  'bg-red-200'
            spinHidden = 'hidden'
            spinMessage = 'processado com erro'
        } finally {
            $countWFSSchemaProcessado +=1
            $countTotalSchemaTypeFeatureWFS += qtdTipoFeicao
        }
        
    });
    function linkClicked() {
        //currentListComplexType.set(complexArray)
        currentFeatureTypeElements.set(featureTypeElements)
        currentWFSGetCapabilities.set(objIdDescricaoIri.iri)
        goto("\schema-feature-type")
    }
</script>
<div class= "p-2 {bgColor} text-sm text-left text-gray-800  rounded-md shadow-sm hover:shadow-md flex flex-col"  transition:fade>
        <h2 class="font-semibold"> {errorInRequest}</h2>
        <h2 class="font-semibold"> {objIdDescricaoIri.descricao}</h2>
        <h2> Tempo de requisição GetCapabilities: {tempoRequisicao} seg.</h2>
        <h2> Qtd de tipo de feições: {qtdTipoFeicao}</h2>
        <button class="text-green-600 text-left font-semibold hover:bg-gray-200 hover:underline py-1"  on:click={linkClicked}>Mais detalhes</button>
        <div class="bg-slate-300 text-slate-600 rounded-md text-center p-1">
            <Spinner class="{spinHidden} mr-3" size="4" color="white" />
            {spinMessage}
        </div>
</div>