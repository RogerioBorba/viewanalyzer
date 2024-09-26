<script>
    import {facadeOL, selectedLayers, removedLayers} from '$lib/store/storeMap';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import { fetchData, fetchDataByType } from '$lib/request/requestData';
    import {metadataLink} from '$lib/store/storeVisualizadorMetadata'
    import { goto } from '$app/navigation';
    import { MetadataURL } from '../ogc_commom/metadataURL';
    import { Fill, Stroke, Style } from 'ol/style';
    import CircleStyle from 'ol/style/Circle';
    import { onDestroy } from 'svelte';
    import { onMount } from "svelte";
  


    export let wfsLayer = null;
    export let capabilitiesUrl;
    export let id;
    let source = null;
    let sourceLayer = null;
    let display = '';
    let visibilytMetadata ='visible'
    let featureCount = null;
    let color ;

    let removed = [];
    let unsubscribe;

    //Lógica para coletar cor selecionada pelo usuário
    export let selectedColor = '#FFFFFF'; // Agora é uma propriedade do componente
    let userColor;
    let colorInput;
    let aleatoryColor;
    
    function btnSelectColorClicked() {
        colorInput.click(); // Usa a referência direta ao input
    }

    
   
    /**Fim da lógica de cor selecionada pelo usuário/*/
 
    //Criado para que o título do WFS volte a ser renderizado após ser removido do camadas selecionadas 
    //$: console.log("display atual" + display)
    
    //$: console.log("removed layers" + $removedLayers);

    $: if($removedLayers){
        removed = $removedLayers;
        
        removed.forEach(element => {
            if (element.oid === wfsLayer.oid) {
               display = '';
            }
            removed = removed.filter(el => el.oid !== wfsLayer.oid);
            $removedLayers = removed; 
        });
	}
    
    /**-----------Fim------------------/*/

    $: if (!wfsLayer.metadataURLs()) visibilytMetadata ='invisible'
      
    async function btnMetadadoClicked() {
        if (!wfsLayer.metadataURLs()){
            return alert("A camada não está associada a metadados.")
        }
        //console.log("wfsLayer.metadataURLs()>", wfsLayer.metadataURLs());
        //let link = wfsLayer.metadataURLs()[0].link() //wmsLayer.metadataURL().link()
        wfsLayer.metadataURLs().forEach(metadataURL => {
            let link = metadataURL.link();
            console.log("LINK"  + link);
            if(link.includes("http://panorama.sipam.gov.br")){
				window.open(link, "_blank");
            }else{
				$metadataLink = link;
				goto("/visualizador/metadata")
			}

        })
    };

     // Função para buscar o número de feições
     async function fetchFeatureCount() {
        const baseURL = url();
        const service = 'WFS';
        const version = '2.0.0';
        const request = 'GetFeature';
        const typeName = wfsLayer.name();
        console.log("typeName " + typeName)
        const resultType = 'hits';  
        let featureCountUrl = `${baseURL}?service=${service}&version=${version}&request=${request}&typeName=${typeName}&resultType=${resultType}`;
        console.log("featureCountUrl" + featureCountUrl)
        
        try {
            let response = await fetchData(featureCountUrl);
            let data = await response.text();

        
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

         
            const featureCollection = xmlDoc.documentElement.getAttribute("numberMatched");

            //console.log("FEATURE colletction" + JSON.stringify(featureCollection));
           
           
            featureCount = featureCollection || 0;  
        } catch (error) {
            console.error("Erro ao buscar contagem de feições:", error);
            featureCount = 'N/A';
        }
    }

    $: if (wfsLayer) {
        fetchFeatureCount();  // Atualiza a contagem de feições quando a camada é carregada
    }

    
    function visibilyBtnMetadata() {
        let hasLink = false;
        wfsLayer.metadataURLs().forEach(metadataURL => {
            if(metadataURL.link())
               hasLink = true; 
        })
        
        return hasLink ? 'visible' : 'invisible'
		//return (wfsLayer.metadataURLs().link())?'visiable':'invisible';
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
        return `${baseURL}?service=WFS&version=${version}&request=GetFeature&typeName=${typeName}&outputFormat=application/json&maxFeatures=15000`
    }

   
    // Mapa de cores para armazenar as cores de cada grupo de feições
    const mapaDeCores = new Map();

    function hexToRGBA(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        console.log("MEU RGBA" + `rgba(${r}, ${g}, ${b}, 0.7`)
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    function getRandomColor() {
        const colorInput = userColor;

        if(colorInput){

            return hexToRGBA(colorInput)

        }

        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }

        // Convertendo a cor hexadecimal para RGB e adiciona o componente alpha para a transparência
        const r = parseInt(cor.slice(1, 3), 16);
        const g = parseInt(cor.slice(3, 5), 16);
        const b = parseInt(cor.slice(5, 7), 16);
        const alpha = 0.7; // A transparência deve estar entre 0 e 1    
        aleatoryColor = `rgba(${r},${g},${b},${alpha}`

        return `rgba(${r},${g},${b},${alpha})`;
    }

    function getColorForFeature(idDoGrupo) {
        if (!mapaDeCores.has(idDoGrupo)) {

            const novaCor = getRandomColor();
            // Gera uma nova cor para o grupo se ainda não estiver presente
            //mapaDeCores.set(idDoGrupo, gerarCorAleatoria());
            mapaDeCores.set(idDoGrupo, novaCor);
            
           
        }
        return mapaDeCores.get(idDoGrupo);
    }

   

    async function btnAddLayerClicked() {
        let z_index = $selectedLayers.length + 1;
        if (!wfsLayer.name()) {
            return alert("Esta é uma camada de agrupamento. Apenas as camadas interiores podem ser exibidas!");
        }

        let urlFeature = urlGetFeature();
        let dados = await fetchDataByType(urlFeature);
        let dadosJson = await dados.json();
        console.log("dados json" + JSON.stringify(dadosJson));
        let geometria = dadosJson.features[0].geometry.type;
        console.log("GEOMETRIA: " + geometria);
        
        
        // ID para feições do mesmo grupo 
        const novoIdDoGrupo = Date.now().toString(); 
    
        // Criando a cor da feição antes de definir o estilo padronizado
        color = getColorForFeature(novoIdDoGrupo);
        console.log("Cor gerada para o grupo: " + color);

        // Adicionando feições com o ID único e a cor gerada
        let estiloFeicao = (feicao) => {
            if(geometria === "LineString" || geometria === "MultiLineString"){
                console.log("A geometria é LineString ou MultilineString")
                return new Style({
                    stroke: new Stroke({color: color, width: 2})
                })
            }
            return new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({ color: color }), 
                    stroke: new Stroke({ color: '#000', width: 1 })
                }),
                fill: new Fill({ color: color }),  
                stroke: new Stroke({ color: '#000', width: 1 })
            });
        };

        let camada = await $facadeOL.addGeoJSONLayer(dadosJson, estiloFeicao);
        //let camada = await $facadeOL.addGeoJSONLayer(dadosJson);
        wfsLayer.color = color;
        wfsLayer.layer = camada;
        wfsLayer.feicoes = featureCount;
        console.log("feicoes" + wfsLayer.feicoes)
        $selectedLayers = [...$selectedLayers, wfsLayer];

        display = 'hidden';
       

    }
    

    function btnFilterLayerClicked() {

    }
       
</script>
<div class="flex mt-1 relative {display} text-gray-700 ">
    
    {#if featureCount}
        <p class=" mt-1 flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" 
        title="{`${wfsLayer.description()} - ${featureCount} ${featureCount > 1 ? 'feições' : 'feição'}`}">
        {`${wfsLayer.description()} - ${featureCount} ${featureCount > 1 ? 'feições' : 'feição'}`}</p>

        <button  class="{visibilyBtnMetadata()} focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" 
        on:click|preventDefault={btnMetadadoClicked} title="Metadados">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" class="h-6 w-6" fill="#FCF3CF" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke="#1C2833" stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        </button>


        
        <input type="color" bind:this={colorInput} bind:value={userColor} style="display: none;" />

        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnSelectColorClicked} title="Selecione a cor das feições a serem renderizadas">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={userColor ? userColor+'80' :  aleatoryColor ? aleatoryColor : '#FFFFFF'} viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7h.01m3.486 1.513h.01m-6.978 0h.01M6.99 12H7m9 4h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 3.043 12.89 9.1 9.1 0 0 0 8.2 20.1a8.62 8.62 0 0 0 3.769.9 2.013 2.013 0 0 0 2.03-2v-.857A2.036 2.036 0 0 1 16 16Z"/>
            </svg>
        </button>

      
        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnAddLayerClicked} title="Adicionar feições" id="addLayer">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="#FEF9E7">
                <path stroke="#1C2833" fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
            </svg>   
        </button>
        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" 
        on:click|preventDefault={btnFilterLayerClicked} title="Filtrar feições">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="#FFCC80">
                <path fill-rule="evenodd" d="M12 12l8-8V0H0v4l8 8v8l4-4v-4z" clip-rule="evenodd" />
            </svg>   
        </button>
    {:else}
        <div class="flex">
            <p class="flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" 
            title="{`${wfsLayer.description()} - ${featureCount} ${featureCount > 1 ? 'feições' : 'feição'}`}">
            {`${wfsLayer.description()} - `}</p>
            <div  role="status">
                <svg aria-hidden="true" class="inline w-5 h-5 mb-2 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
           
        </div>
    {/if}
</div>