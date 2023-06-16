<script>
    import CSWMetadataCard from '$lib/component/csw/CSWMetadataCard.svelte';
    import {postURL, totalMetadata} from '$lib/store/storeMetadata';
    import { fetchDataByPost } from '$lib/request/requestDataByPost';
    import { fetchData } from '$lib/request/requestData';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import { onMount } from 'svelte';
    let  metadataObj  = {}
    let arrMetadataObj = []
    let totalRequests = 0
    let maxRecordsByRequest = 20
    const recordsPerPage = 20;

    //https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&constraintLanguage=CQL_TEXT&Constraint=%E2%80%9C%%E2%80%9D&ElementSetName=full&resultType=results&maxRecords=20&startPosition=19
    //data = {url: url, body: body, content_type: content_type}
    async function getXML(data) {
        try {
            const maxRecords = getParameterValueAsStr(data.body.toLowerCase(), 'maxRecords'.toLowerCase())
            const startPosition = getParameterValueAsStr(data.body.toLowerCase(), 'startPosition'.toLowerCase())
            const query = `request=GetRecords&service=CSW&outputSchema=http://www.isotc211.org/2005/gmd&version=2.0.2&ElementSetName=full&resultType=results&startPosition=${startPosition}&maxRecords=${maxRecords}`
            const url = `${data['url']}?${query}`
            const controller = new AbortController();
            const signal = controller.signal;
            const res = await fetchData(url, signal)
            return  res
            
        } catch (error) {
            console.log('get-records-by-post>>getXML(data)')
            console.log(error)
            return new Response(`Erro na requisição de url: ${data["url"]} e body: ${data["body"]}`, { status: 500});
        }   
    }

    function getParameterValueAsStr(body, parameter) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(body, 'text/xml');

        const element = xmlDoc.documentElement;
        const value = element.getAttribute(parameter);

        return value || null;
    }

    onMount(async () => {
       
        let startPosition = 1;
        let body = $postURL.body
        body = body.replace('maxRecords="1000000"', 'maxRecords="20"')
        totalRequests = $totalMetadata/ maxRecordsByRequest
        
        while (startPosition <= $totalMetadata) {
            try {
                //console.log("BODY: ", body)
                let res = await fetchDataByPost($postURL.url, body,'application/xml')  
                if (res.status == 403) 
                    res = await getXML({url: $postURL.url, body: body, content_type: 'application/xml'})
                let xmlText = await res.text()
                let xmlJsonObject = textXml2Json(xmlText)
                //["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
                console.log("xmlJsonObject:", xmlJsonObject)
                let metadataObjOrArray = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
                if (Array.isArray(metadataObjOrArray))
                    arrMetadataObj =  arrMetadataObj.concat(metadataObjOrArray);
                else
                    arrMetadataObj = [...arrMetadataObj, metadataObjOrArray];
                
                let currentPositionStr = `startPosition="${startPosition}"`
                let newPositionStr = `startPosition="${startPosition + recordsPerPage}"`
                body = body.replace(currentPositionStr, newPositionStr)
            } catch (error) {
                 console.error(`Ocorreu na requisição: ${startPosition}`);
                
            }
            // Atualizar a posição inicial para a próxima página de registros
            startPosition += maxRecordsByRequest;
        }
        arrMetadataObj = arrMetadataObj.filter(obj => obj != null && obj != undefined)
	});
</script>

<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
     
    {#each arrMetadataObj as md_metadata}
        {#if !(md_metadata == null)}
            <CSWMetadataCard md_metadata ={md_metadata} ></CSWMetadataCard>
        {/if}    
    {/each}
          

</div>