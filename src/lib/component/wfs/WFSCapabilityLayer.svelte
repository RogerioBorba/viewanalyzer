<script>
    import {facadeOL, selectedLayers } from '$lib/store/storeMap';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import { fetchData, fetchDataByType } from '$lib/request/requestData';
    export let wfsLayer = null;
    export let capabilitiesUrl;
    let source = null;
    let sourceLayer = null;
    let display = ''
    let visibilytMetadata ='visible'

    $: if (!wfsLayer.metadataURLs()) visibilytMetadata ='invisible'
      
    async function btnMetadadoClicked() {
        if (!wfsLayer.metadataURLs())
            return alert("A camada não está associada a metadados.")
        console.log("wfsLayer.metadataURLs()>", wfsLayer.metadataURLs());
        let link = wfsLayer.metadataURLs()[0].link() //wmsLayer.metadataURL().link()
        window.open(link, "_blank");

        const res = await fetchData(link);
        if (!res.ok) 
		    throw new Error('Falha na requisição do endereço.')
        const text = await res.text()
        //console.log(text)
        const textJson = textXml2Json(text)
        // alert(textJson)   
    }
    
    function url() {
        let size = capabilitiesUrl.indexOf('?') 
        if (size == -1)
            size = capabilitiesUrl.length
        return capabilitiesUrl.substring(0, size)
    }
    function urlGetFeature() {
        const baseURL = url();
        const service='WFS';
        const version='2.0.0'
        const request='GetFeature'
        const typeName= wfsLayer.name();
        return `${baseURL}?service=WFS&version=${version}&request=GetFeature&typeName=${typeName}&outputFormat=application/json&maxFeatures=10000`
    }

    async function  btnAddLayerClicked() {
        let z_index = $selectedLayers.length + 1;
        if(!wfsLayer.name())
            return alert("Esta é uma camada de agrupamento. Apenas as camadas interiores podem ser exibidas!");
        
        let urlFeature = urlGetFeature();
        let data = await fetchDataByType(urlFeature);
        let dataJson = await data.json();
        //console.log(dataJson);
        //$facadeOL.add(wfsLayer);
        let layer = await $facadeOL.addGeoJSONLayer(dataJson);
        wfsLayer.layer = layer;
        $selectedLayers = [...$selectedLayers, wfsLayer];
        display='hidden';
    }
    function btnFilterLayerClicked() {

    }
       
</script>
<div class="flex mt-1 relative {display} text-gray-700">
    <p class="flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" 
    title="{wfsLayer.description()}">{wfsLayer.description()}</p>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200 {visibilytMetadata}" 
    on:click|preventDefault={btnMetadadoClicked} title="Metadados">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
    </button>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnAddLayerClicked} title="Adicionar feições">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="gray">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
        </svg>   
    </button>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" 
    on:click|preventDefault={btnFilterLayerClicked} title="Filtrar feições">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="#FFCC80">
            <path fill-rule="evenodd" d="M12 12l8-8V0H0v4l8 8v8l4-4v-4z" clip-rule="evenodd" />
        </svg>   
    </button>
</div>

