<script>
    import {countMetadata, countProcessado, postURL, totalMetadata} from '$lib/store/storeMetadata'
    import { Spinner} from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { fetchData } from "$lib/request/requestData";
    import { textXml2Json } from '$lib/xml-json/xml2Json';
	import { fetchDataByPost } from '$lib/request/requestDataByPost';
    export let idDescricaoIriNoCentralCategoria
    let postBody = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" service="CSW" version="2.0.2" resultType="results" startPosition="1" maxRecords="1000000" outputFormat="application/xml" outputSchema="http://www.isotc211.org/2005/gmd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName></csw:Query></csw:GetRecords>`
    let postRecordsParams = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" service="CSW" version="2.0.2" resultType="results" startPosition="1" maxRecords="1000000" outputFormat="application/xml" outputSchema="http://www.isotc211.org/2005/gmd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName><csw:Constraint version="1.1.0"><csw:CqlText>_cat='${idDescricaoIriNoCentralCategoria.noCentralCategoria}'</csw:CqlText></csw:Constraint></csw:Query></csw:GetRecords>`
    let getRecordsParams = 'service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&constraintLanguage=CQL_TEXT&ElementSetName=brief&resultType=hits'
    let qtdSelectedItem = 0
    let qtdMetadados = 0
    let bgColor = 'bg-gray-200'  
    let spinHidden = ''
    let spinMessage = 'processando ...'
    let requestGetRecordsTextOrError = ''
    
    function getBody() {
        return idDescricaoIriNoCentralCategoria.noCentralCategoria?postRecordsParams:postBody 

    }
    
    function linkClicked() {
        let str = idDescricaoIriNoCentralCategoria.iri;
        let body = getBody()
        str = str.substring(0, str.indexOf('?'))
        $postURL = {url: str , body: body}
        totalMetadata.set(qtdMetadados)
        goto('/csw/metadados')
    }

    onMount(async () => {
        const index = idDescricaoIriNoCentralCategoria.iri.indexOf('?')
        let url = idDescricaoIriNoCentralCategoria.iri.substring(0, index)
		
        try {
            let res
            if(idDescricaoIriNoCentralCategoria.noCentralCategoria) {
                res = await fetchDataByPost(url, postRecordsParams,'application/xml')
                
            } else {
                const an_url = url + `?${getRecordsParams}`
                res = await fetchData(an_url)
            }
            let xmlText = await res.text()
            let xmlJsonObject = textXml2Json(xmlText)
            //console.log(xmlJsonObject)
            qtdMetadados = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["@attributes"]["numberOfRecordsMatched"]
            $countProcessado = $countProcessado + 1
            if(qtdMetadados && !isNaN(parseInt(qtdMetadados)))
                $countMetadata = $countMetadata + parseInt(qtdMetadados)
            spinHidden = 'hidden'
            spinMessage = 'processado com sucesso'
        } catch (error) {
            console.log("Erro na chamada da requisição")
            console.log(error, error.statusText, error.status)
            requestGetRecordsTextOrError = `ERRO na requisição. ${error.status} - ${error.statusText}. Contate o responsável.`
            bgColor =  'bg-red-200'
            spinHidden = 'hidden'
            spinMessage = 'processado com erro'
            $countProcessado = $countProcessado + 1
        }
		
	});
    
</script>
<div class= "p-2 {bgColor} text-sm text-left text-gray-800  rounded-md shadow-sm hover:shadow-md flex flex-col"  transition:fade>
        <h2 class="font-semibold"> {requestGetRecordsTextOrError}</h2>
        <h2 class="font-semibold"> {idDescricaoIriNoCentralCategoria.descricao}</h2>
        <h2> Quantidade de registros de metadados: {qtdMetadados}</h2>
        <button class="text-green-600 text-left font-semibold hover:bg-gray-200 hover:underline py-1"  
        on:click={linkClicked}>Mais detalhes</button>
        <!--<a class="text-xs text-blue-500 underline underline-offset-4 uppercase" href="{metadadoAssociado()}">{metadadoText}</a>-->
        <div class="bg-slate-300 text-slate-600 rounded-md text-center p-1">
            <Spinner class="{spinHidden} mr-3" size="4" color="white" />
            {spinMessage}
        </div>
</div>