import { MD_Metadata } from "$lib/ISO/19115/MdMetadata";
import { fetchData } from "$lib/request/requestData";
import { ToProcess, processed } from "$lib/store/storeLinksQuebrados";
let countAll = 0;
let countProcessed = 0;
let count = 0;

export class MetadataErrorOrNotFound{
    constructor(nome, url, protocolo, erro){
        this.nome = nome;
        this.url = url;
        this.protocolo = protocolo;
        this.erro = erro;
    }
}

const getWmsOrWfs = async (element) => {
    countProcessed+= 1;
    console.log("countProcessed!!!!!!!!!!" + countProcessed)
    console.log("entrou o elemento:" + JSON.stringify(element) + count);
    let obj = {}; // Defina como um objeto vazio inicialmente
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);
        let tempo = new Date().getTime();
        let res = await fetchData(element.url, { signal: controller.signal });
        let xmlText = await res.text();
        console.log(xmlText);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");


        let layerXML;
        let listOfObjects;
        let result;
        
        if(element.protocol === "OGC:WFS"){
            layerXML = xmlDoc.getElementsByTagName("FeatureType");
            listOfObjects = Array.from(layerXML).map(layer => layer.querySelector("Name")?.textContent);
            result= listOfObjects.includes(element.name);
            console.log("MONTEI WMS" + result);
        }
        else{
            layerXML = xmlDoc.getElementsByTagName("Layer");
            listOfObjects = Array.from(layerXML).map(layer => layer.querySelector("Name")?.textContent);
            result = listOfObjects.includes(element.name);
            console.log("MONTEI WFS" + result)
        }
        
        if(!result){
            obj = new MetadataErrorOrNotFound(element.name,element.url,element.protocol,"Não encontrado")
            return obj;
        }else{
            return {}
        }

    } catch (error) {
        obj = new MetadataErrorOrNotFound(element.name,element.url,element.protocol, error.status || "Erro desconhecido")
        return obj;
    }
};

export async function createData(element) {
    //Aqui entra cada objeto xml
    let linksQuebrados = [];
    let data = new MD_Metadata(element);
    console.log("DATA" + JSON.stringify(data))
    

    if (data.getDistributionInfo()) {
        let result = data.getDistributionInfo()?.catchProtocols();
        
        //console.log("result protocol " + JSON.stringify(result))
        if (result.length > 0) {
            let filteredResult = result.filter((arr) => arr.protocol === "OGC:WMS" || arr.protocol === "OGC:WFS");
            countAll+= filteredResult.length
          
            await Promise.all(filteredResult.map(async (element) => {
                let newItem;
                newItem = await getWmsOrWfs(element);
                console.log("newItem " + JSON.stringify(newItem));
                if (Object.keys(newItem).length > 0) {
                    linksQuebrados = [...linksQuebrados, newItem];
                }
                
            }));
           
            
        }
    }

    console.log("total de WMS e WFS" + countAll);
    console.log("count processed" + countProcessed)
    return linksQuebrados;
    
}