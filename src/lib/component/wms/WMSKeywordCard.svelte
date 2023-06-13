<script>
    import {countTotalLayer, countWMSProcessado, currentListWMSCapability, allKeywords, keywordCountByName} from '$lib/store/storeWMS'
    import { goto } from '$app/navigation';
    import { Spinner} from 'flowbite-svelte';
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { fetchData } from "$lib/request/requestData";
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import {WMSCapabilities} from './WMSCapabilities';

    export let objIdDescricaoIri;
    let wmsCapabilities = null;
    let qtdSelectedItem = 0;
    let tempoRequisicao = 0;
    let qtdCamada = 0;
    let qtdCamadaSemMetadadosAssociado = 0;
    let qtdCamadaSemPalavraChave = 0;
    let palavrasChave = [];
    let requestGetRecordsTextOrError = '';
    let allKeys = []
    let allKeysSemRepeticao = []
    
    function initializeVariablesOnMount() {
        if (!wmsCapabilities) {
            return 
        }
        qtdCamada = wmsCapabilities.lenLayerObjects() || 0
        qtdCamadaSemMetadadosAssociado = wmsCapabilities.lenLayerObjectsWithoutMetadata() || 0 
        qtdCamadaSemPalavraChave = wmsCapabilities.lenLayerObjectsWithoutKeyword() || 0 
        
    }

    function keyCountByName(wmsCapabilities) {
        allKeys = wmsCapabilities.allKeywords()
        allKeysSemRepeticao = [...new Set(allKeys)];
        $allKeywords = $allKeywords.concat(allKeys)
        for (let i = 0; i < allKeys.length; i++) {
            let keyword = allKeys[i]
            let value = $keywordCountByName[keyword]
            if (value) 
                $keywordCountByName[keyword] = value + 1 
            else 
                $keywordCountByName[keyword] = 1
            //$keywordCountByName = $keywordCountByName
        }
        console.log($keywordCountByName)
    }
   
    onMount(async () => {
        try {
            if(!objIdDescricaoIri.iri) {
            
                return 
            }
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 60000)
            let tempo = new Date().getTime();
            let res = await fetchData(objIdDescricaoIri.iri, { signal: controller.signal })
            
            let xmlText = await res.text()
            wmsCapabilities = new WMSCapabilities(await textXml2Json(xmlText))
            initializeVariablesOnMount()
            keyCountByName(wmsCapabilities)
            $countTotalLayer += qtdCamada
            tempoRequisicao = parseFloat(((new Date().getTime()) - tempo)/1000).toFixed(2)
            $countWMSProcessado = $countWMSProcessado + 1
            
        } catch (error) {
            console.log("Erro na chamada da requisição")
            console.log(error, error.statusText, error.status)
            requestGetRecordsTextOrError = `ERRO na requisição. ${error.status} - ${error.statusText}. Contate o responsável.`
            $countWMSProcessado = $countWMSProcessado + 1
        }
	});
    
</script>
