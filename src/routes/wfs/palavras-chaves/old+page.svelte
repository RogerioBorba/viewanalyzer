<script>
	import {WMSCapabilities} from '$lib/component/wms/WMSCapabilities';
	import { fetchData } from '$lib/request/requestData';
	import { textXml2Json } from '$lib/xml-json/xml2Json';
    import {catalogos_servicos } from  '$lib/inde/CatalogoINDE';

    //import { TableData } from "flowbite-svelte";
    import { onMount } from 'svelte';
    //export let keywords_by_name;
    let countByName = {}
    let arr_key_value = []
    //export let total;
    let start = 1
    let end = 100
    let iri = `http://localhost:3000/api/wms/palavras-chaves/count-by-name/`
    let total = 0
    $: {
        helper = {start, end, total}
    }
    
    let helper = {start, end, total}
    async function previous() {
        start = start - 100
        end = end - 100
        if (start <= 0) 
            start = 1 
        if (end <= 0)
            end = 100
        console.log(start, end)
        await fetchData(iri + `${start}&${end}`)    
    }

    async function next() {
        start = start + 100
        end = end + 100
        if (start > total) 
            start = total 
            
        if (end > total)
            end = total
        console.log(start, end)
        iri = iri
        await fetchData(iri + `${start}&${end}`)    
    }

    
    async function keywordsFrom(url) {
        if (url == null)
            return
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 60000)
        const res = await fetchData(url, { signal: controller.signal })
        const textXML = await res.text()
        const xmlJsonObject = await textXml2Json(textXML)
        const wmsCapa =  new WMSCapabilities(xmlJsonObject)
        const keywords = wmsCapa.allKeywords()
        for (let i = 0; i < keywords.length; i++) {
            let keyword = keywords[i]
            let value = countByName[keyword]
            if (value) 
                countByName[keyword] = value + 1 
            else 
                countByName[keyword] = 1
            countByName = countByName
        }
    }
    onMount(async () => {
		
        const promises = await Promise.all(catalogos_servicos.map((catalogo) => { return keywordsFrom(catalogo.wmsGetCapabilities)}))
        promises.then( (values) => {alert("promises fim")})
        
		
	});
</script>
<!--<TableData on:next={next} on:previous={previous} {helper}/>-->
<div class = "m-2 grid gap-2 md:grid-cols-4 grid-cols-2">
    {#each Object.entries(countByName) as keyCount}
        <div class="p-2 bg-gray-200  text-gray-800 rounded-md shadow-sm hover:shadow-md flex flex-col break-words text-sm text-left">
            <h2> <span class="font-semibold">{keyCount[0]}:</span> {keyCount[1]}</h2>
        </div>
    {/each}    
</div>