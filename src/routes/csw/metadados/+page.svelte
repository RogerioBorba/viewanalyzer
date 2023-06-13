<script>
    import CSWMetadataCard from '$lib/ogc/csw/CSWMetadataCard.svelte';
    import {postURL} from '$lib/store/storeMetadata';
    import { fetchDataByPost } from '$lib/request/requestDataByPost';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import { onMount } from 'svelte';
    let  metadataObj  = {}
    let arrMetadataObj = []

    async function fetchDataByPost1(body) {
       // let res = await fetchDataByPost($postURL.url, body,'application/xml')       
        //let xmlText = await res.text()
       // let xmlJsonObject = textXml2Json(xmlText)    

    }
    async function metadataObjects() {
        let body = $postURL.body.replace('maxRecords="1000000"', 'maxRecords="300"');
        //body = body.replace('maxRecords="1000000"', 'maxRecords="20"')
        let res = await fetchDataByPost($postURL.url, body,'application/xml')       
        let xmlText = await res.text()
        let xmlJsonObject = textXml2Json(xmlText)    
        let numberOfRecordsMatched = parseInt(xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["@attributes"].numberOfRecordsMatched);
        let nextRecord = 21;
        let strStartPosition = 'startPosition="1"'
        while( nextRecord < numberOfRecordsMatched) {
            let strNewPosition = `startPosition="${nextRecord}"`;
            body = body.replace(strStartPosition, strNewPosition);
        }
        
    }
    onMount(async () => {
       
        try {
            console.log("$postURL: ", $postURL);
            let body = $postURL.body
            body = body.replace('maxRecords="1000000"', 'maxRecords="20"')
            let res = await fetchDataByPost($postURL.url, body,'application/xml')       
            let xmlText = await res.text()
            let xmlJsonObject = textXml2Json(xmlText)
            console.log(xmlJsonObject)
            let metadataObjOrArray = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
            if (Array.isArray(metadataObjOrArray))
                arrMetadataObj =  arrMetadataObj.concat(metadataObjOrArray);
            else
                arrMetadataObj = [...arrMetadataObj, metadataObjOrArray];
            //qtdMetadados = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["@attributes"]["numberOfRecordsMatched"]
            //console.log("metadataObj: ", metadataObj);
            
        } catch (error) {
            console.log("Erro na chamada da requisição")
            console.log(error, error.statusText, error.status)
        
        }
		
	});
</script>

<div class = "m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
     
    {#each arrMetadataObj as metadata}
        <CSWMetadataCard metadataJSON ={metadata} ></CSWMetadataCard>
    {/each}
          

</div>