<script>
    import CSWMetadataCard from '$lib/component/csw/CSWMetadataCard.svelte';
    import {dataToPdf} from '$lib/component/pdf/gerarPDF';
    import {cswToCSV} from '$lib/component/csv/gerarCSV';
    import { Progressbar, Navbar,  NavLi, NavUl, NavHamburger, Button  } from 'flowbite-svelte';
    import {postURL, totalMetadata} from '$lib/store/storeMetadata';
    import { fetchDataByPost } from '$lib/request/requestDataByPost';
    import { fetchData } from '$lib/request/requestData';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import { onMount, beforeUpdate } from 'svelte';
    import {MD_Metadata} from '$lib/ISO/19115/MdMetadata'
    import {cswToObject} from '$lib/component/csw/cswFunctions'

    import CswMetadataCard from '$lib/component/csw/CSWMetadataCard.svelte';
    import { each, element, onDestroy } from 'svelte/internal';
    import { add } from 'ol/coordinate';
    let  metadataObj  = {}
    let arrMetadataObj = []
    let totalRequests = 0
    let maxRecordsByRequest = 20
    const recordsPerPage = 20;
    let filteredCsw = [];
    let status = ["Com status associado", "Sem status associado"];
    let wichStatus = '';
    let keywords = ["Com palavras-chave", "Sem palavras-chave"];
    let wichKeywords = '';
    //https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&constraintLanguage=CQL_TEXT&Constraint=%E2%80%9C%%E2%80%9D&ElementSetName=full&resultType=results&maxRecords=20&startPosition=19
    //data = {url: url, body: body, content_type: content_type}

    $: TotalDeItensProcessados = itemsProcessed;
    
    $: {

        if(arrMetadataObj.length > 0){
            filteredCsw = addId(arrMetadataObj);
        }

        if(wichStatus === "Com status associado"){
            
            filteredCsw = filteredCsw.filter(
                element => {
                    let obj = new MD_Metadata(element)
                    return obj.getIdentificationInfo().status() !== 'Sem status associado';
                }
            )
        }
       
            
        if(wichStatus === "Sem status associado"){
            filteredCsw = filteredCsw.filter(
                element => {
                    let obj = new MD_Metadata(element)
                    return obj.getIdentificationInfo().status() === 'Sem status associado';
                }
            )
        }

        if(wichKeywords === "Com palavras-chave"){
            
            filteredCsw = filteredCsw.filter(
                element => {
                    let obj = new MD_Metadata(element)
                    return obj.getIdentificationInfo()?.keywords() !== 'Sem palavras-chaves associadas';
                }
            )
        }

        if(wichKeywords === "Sem palavras-chave"){
           
            filteredCsw = filteredCsw.filter(
                element => {
                    let obj = new MD_Metadata(element)
                    return obj.getIdentificationInfo()?.keywords() === 'Sem palavras-chaves associadas';
                }
            )
        }
        
       
        
        
    }
    
    function addId(array){
        array.forEach(obj => {
                obj.id = uuid(); // Adiciona um ID único ao objeto
        })
        return array;
    }


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

    function uuid() {
        return Math.random().toString(36).substr(2, 9);
    }

    let itemsProcessed = 0
    onMount(async () => {
       
        let startPosition = 1;
        let body = $postURL.body
        body = body.replace('maxRecords="1000000"', 'maxRecords="20"')
        totalRequests = $totalMetadata/ maxRecordsByRequest
        
        while (startPosition <= $totalMetadata) {
            try {
                itemsProcessed += Math.min($totalMetadata - itemsProcessed, maxRecordsByRequest);
                //console.log("BODY: ", body)
                console.log("URL" + $postURL  + "BODY" + body )
                let res = await fetchDataByPost($postURL.url, body,'application/xml')  
                if (res.status == 403) 
                    res = await getXML({url: $postURL.url, body: body, content_type: 'application/xml'})
                let xmlText = await res.text()
                let xmlJsonObject = textXml2Json(xmlText)
                //console.log("Texto em JSON: " + JSON.stringify(xmlJsonObject))
                //["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
                //console.log("xmlJsonObject:", xmlJsonObject)
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

<div id="hideDiv" class="m-2 flex md:flex-row flex-col justify-center md:justify-start md:items-center">
    <div class="mt-1 flex md:flex-row justify-start">
        <NavUl class="order-1">
            <NavLi href="/" active={true}>Home</NavLi>
        </NavUl>
    </div>
    <div class="mt-1 flex justify-center ml-auto"> 
        <div class="flex items-center">
            {#each status as select}
                <label>
                    <input type="radio" bind:group={wichStatus} name="status" value={select}/>
                    <span class="mr-2 text-sm">{select}</span>
                </label>
            {/each}
        </div>
        <div class="flex items-center">
            {#each keywords as key}
                <label>
                    <input type="radio" bind:group={wichKeywords} name="keywords" value={key}/>
                    <span class="mr-2 text-sm">{key}</span>
                </label>
            {/each}
        </div>
      
        
    </div>
    <div class="flex ml-auto space-x-2"> 

        <p class="mt-3 mr-5 text-md text-blue-700 font-semibold whitespace-nowrap text-sm">Quantidade de registros processados:<span class="ml-2">{TotalDeItensProcessados}/{$totalMetadata}</span></p>

        <Button size="sm" on:click={() => dataToPdf(cswToObject(filteredCsw))}>
            <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m6 4v5h1.4a1.6 1.6 0 0 0 1.6-1.6v-1.8a1.6 1.6 0 0 0-1.6-1.6H11Z"/>
            </svg>
            .PDF 
        </Button>
        
        <Button size="sm" on:click={() => cswToCSV(cswToObject(filteredCsw))}>
            <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m2.7 9h-1A1.6 1.6 0 0 1 5 15.4v-1.8A1.6 1.6 0 0 1 6.6 12h1m8.4 0 1.4 4.8L19 12m-6-.2h-1a1.3 1.3 0 0 0-1.4 1.2 1.3 1.3 0 0 0 1.2 1.5h.5a1.3 1.3 0 0 1 1.3 1.7c-.2.6-.7.8-1.4.8h-1"/>
            </svg>
             .CSV
        </Button>
    </div>
</div>

    
    

<div class="m-2 grid gap-2 md:grid-cols-3 grid-cols-1">
    {#each filteredCsw as md_metadata (md_metadata.id)}
        {#if !(md_metadata == null)}
            <CSWMetadataCard md_metadata={md_metadata}></CSWMetadataCard>
        {/if}
    {/each}
</div>