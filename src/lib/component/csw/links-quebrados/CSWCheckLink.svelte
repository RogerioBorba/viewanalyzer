<script>
  import { MD_Metadata } from "$lib/ISO/19115/MdMetadata";
  import { catalogos_servicos } from "$lib/inde/CatalogoINDE";
  import { onDestroy, onMount } from "svelte";
  import { nodeValue } from "$lib/xml-json/utils";
  import { fetchData } from "$lib/request/requestData";
  import WMSCapabilities from "ol/format/WMSCapabilities";
  import { textXml2Json } from "$lib/xml-json/xml2Json";
  import { json } from "@sveltejs/kit";
  import { orgName, processed } from "$lib/store/storeLinksQuebrados";
  import { countTotalSchemaTypeFeatureWFS } from "$lib/store/storeWFS";
  import { each } from "svelte/internal";
  let wmsCapabilities = null;
  export let md_metadata; //
  let metaMetadata = null;
  let distribution = null;
  let status = "";
  let title = "";
  let standardName = "";
  let orgs = ["DNIT - Departamento Nacional de Infraestrutura de Transportes","EPE - Empresa de Pesquisa Energética"
    ,"ICA - Instituto de Cartografia Aeronáutica","ICMBIO - Instituto Chico Mendes de Conservação da Biodiversidade",
    "MB/COMPAAZ - Comando de Operações Marítimas e Proteção da Amazônia Azul ","MB/DPC- Diretoria de Portos e Costas"
    ,"MB/DPHDM - Diretoria do Patrimônio Histórico e Documentação da Marinha","MB/PEM - Planejamento Espacial Marinho","MDIC - Ministério do Desenvolvimento da Indústria e do Comércio ","MP - Ministério de Planejamento, Desenvolvimento e Gestão ","MTUR - Ministério do Turismo","PGGM - Programa de Geologia e Geofísica Marinha",
    "SPM - Secretaria Nacional de Políticas para as Mulheres ",]
  //let status = metadataJSON["gmd:identificationInfo"]["srv:SV_ServiceIdentification"]["gmd:status"]["gmd:MD_ProgressCode"]
  
  
  let linksQuebrados = [];
  let filteredResult = [];

  const catchWMS = async (element) => {
    try {
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);
        let tempo = new Date().getTime();
        let res = await fetchData(element.url, { signal: controller.signal });
        let xmlText = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const layers = xmlDoc.getElementsByTagName("Layer");
        
        
        const layerNames = Array.from(layers).map(layer => layer.querySelector("Name")?.textContent);
        const layerEncontrada = layerNames.includes(element.name);
        console.log(layerEncontrada)

        if(!layerEncontrada){
            const obj = {
                name: element.name,
                url: element.url,
                tipoErro: "Não encontrado"
            }
            linksQuebrados =  [...linksQuebrados, obj];
            $processed+= 1;
        }

       
    } catch (error) {
      
        const erroObj = {
            name: element.name,
            url: element.url,
            tipoErro: error.message
        };
      
        linksQuebrados =  [...linksQuebrados, erroObj];
        $processed+= 1;
    }
};


const catchWFS = async (element) => {
    try {
      console.log("entrei wfs")
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);
        let tempo = new Date().getTime();
        let res = await fetchData(element.url, { signal: controller.signal });
        let xmlText = await res.text();
        console.log(xmlText)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const featureType = xmlDoc.getElementsByTagName("FeatureType");
        
        
        const featureTypeNames = Array.from(featureType).map(layer => layer.querySelector("Name")?.textContent);
        const featureTypeEncontrada = featureTypeNames.includes(element.name);
        

        if(!featureTypeEncontrada){
            const obj = {
                name: element.name,
                url: element.url,
                tipoErro: "Não encontrado"
            }
            linksQuebrados = [...linksQuebrados, obj];
            
        }

        if(featureTypeEncontrada)
            console.log("Encontrei a " + element.name)
       
    } catch (error) {
      
        const erroObj = {
            name: element.name,
            url: element.url,
            tipoErro: error.message
        };
      
        linksQuebrados = [...linksQuebrados, erroObj];
        
    }
};

  onMount(async () => {
    if (!md_metadata) {
      return null;
    }
    

    console.log("md_metadata" +  JSON.stringify(md_metadata))
    

    let data = new MD_Metadata(md_metadata);
    if (data.getDistributionInfo()) {
      let result = data.getDistributionInfo()?.catchProtocols();
      if (result.length > 0) {
        filteredResult = result.filter(
          (arr) => arr.protocol === "OGC:WMS" || arr.protocol === "OGC:WFS"
        );
        
        filteredResult.map((element) => {
            if (element.protocol === "OGC:WMS"){
                catchWMS(element);
            }
            else{
                catchWFS(element)
            }
        

        });
      }
    }
  });


</script>


{#if linksQuebrados.length > 0} 
  {#each linksQuebrados as obj}
    <div class="p-2 text-sm text-left text-gray-800 bg-gray-200 rounded-md shadow-sm hover:shadow-md flex flex-col">
      <h2 class="font-bold text-blue-800"><span class="text-gray-950 font-bold">Nome:</span>{obj.name}</h2>
      <h2 class="font-semibold"><span class="font-bold">URL:</span><span class="break-all">{obj.url}</span></h2>
      <h2 class="font-semibold"><span class="font-bold">Resumo:</span>{obj.tipoErro}</h2>
    </div>
  {/each}
{/if}

