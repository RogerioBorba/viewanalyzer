<script>
  import { goto } from '$app/navigation';
    import {facadeOL, selectedLayers } from '$lib/store/storeMap'
    import {metadataLink} from '$lib/store/storeVisualizadorMetadata'
    
    export let wmsLayer;
    export let capabilitiesUrl;
    let display = '';
    let visibilytMetadata ='visible';

    $: if (!wmsLayer.metadataURLs()) visibilytMetadata ='invisible'
      
    async function btnMetadadoClicked() {

        /*
        if (!wmsLayer.metadataURLs())
            return alert("A camada não está associada a metadados.")
            wmsLayer.metadataURLs().forEach(metadataURL => {
                let link = metadataURL.link() //wmsLayer.metadataURL().link()
                window.open(link, "_blank");
            });          
        */
       
        if (!wmsLayer.metadataURLs())
            return alert("A camada não está associada a metadados.")

		wmsLayer.metadataURLs().forEach(metadataURL => {
			let link = metadataURL.link() //wmsLayer.metadataURL().link()
			console.log("O link que esta vindo é esse: " + link);

			//Censipam não abre - condição para não quebrar o programa
			if(link.includes("http://panorama.sipam.gov.br")){
				window.open(link, "_blank");
			}else{
				$metadataLink = link;
				//goto("/visualizador/metadata")
                window.open(`/visualizador/metadata?link=${encodeURIComponent(link)}`, '_blank');
			}
		});          
    }
    
    function url() {
        let size = capabilitiesUrl.indexOf('?') 
        if (size == -1)
            size = capabilitiesUrl.length
        return capabilitiesUrl.substring(0, size)
    }

    function btnAddLayerClicked() {
        let z_index = $selectedLayers.length + 1;
        if(!wmsLayer.name())
            return alert("Esta é uma camada de agrupamento. Apenas as camadas interiores podem ser exibidas!")
        wmsLayer.sourceLayer = url();
        console.log("source: ",wmsLayer );
        $facadeOL.addWMSLayer(wmsLayer);


        $selectedLayers = [...$selectedLayers, wmsLayer];
        display='hidden';
    }
       
</script>
<div class="flex mt-1 relative {display} text-gray-700">
    <p class="flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" title="{wmsLayer.description()}">{wmsLayer.description()}</p>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200 {visibilytMetadata}" on:click|preventDefault={btnMetadadoClicked} title="Metadados">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
    </button>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnAddLayerClicked} title="Adicionar camada">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="gray">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
        </svg>   
    </button>
</div>

