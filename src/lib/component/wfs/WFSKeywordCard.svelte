<script>
    import {countTotalLayerWFS, countWFSProcessado, currentListWFSCapability, allWFSKeywords, keywordWFSCountByName} from '$lib/store/storeWFS'
    import { onMount } from 'svelte';
    import { fetchData } from "$lib/request/requestData";
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import {WFSCapabilities} from './WFSCapabilities';

    export let objIdDescricaoIri;
    let wfsCapabilities = null;
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
        if (!wfsCapabilities) {
            return 
        }
        qtdCamada = wfsCapabilities.lenFeatures() || 0
        qtdCamadaSemMetadadosAssociado = wfsCapabilities.lenFeaturesWithoutMetadata() || 0 
        qtdCamadaSemPalavraChave = wfsCapabilities.lenFeaturesWithoutKeyword() || 0 
        //keyCountByName(wfsCapabilities)
        
    }

    function keyCountByName(wfsCapabilities) {
        allKeys = wfsCapabilities.allKeywords()
        allKeysSemRepeticao = [...new Set(allKeys)];
        $allWFSKeywords = $allWFSKeywords.concat(allKeys)
        for (let i = 0; i < allKeys.length; i++) {
            let keyword = allKeys[i]
            let value = $keywordWFSCountByName[keyword]
            if (value) 
                $keywordWFSCountByName[keyword] = value + 1 
            else 
                $keywordWFSCountByName[keyword] = 1
            //$keywordCountByName = $keywordCountByName
        }
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
            wfsCapabilities = new WFSCapabilities(await textXml2Json(xmlText))
            initializeVariablesOnMount()
            keyCountByName(wfsCapabilities)
            $countTotalLayerWFS += qtdCamada
            tempoRequisicao = parseFloat(((new Date().getTime()) - tempo)/1000).toFixed(2)
            $countWFSProcessado = $countWFSProcessado + 1
        } catch (error) {
            console.log("Erro na chamada da requisição")
            console.log(error, error.statusText, error.status)
            requestGetRecordsTextOrError = `ERRO na requisição. ${error.status} - ${error.statusText}. Contate o responsável.`
            $countWFSProcessado = $countWFSProcessado + 1
        }
	});
    
</script>
