import { each } from "svelte/internal";

export function xmlToObject(filteredWCS){
        //let metadataLink = 'Sem metadado associado';
        let metadataLink = [];
        let arrayToCSV = [];

        filteredWCS.forEach(element => {

            let metadata = null
            let wgs84 = null
            let boundingBox = null
            let title = element.getTitle();
            let resumo = element.getAbstract();
            let keywords = element.getKeywords()? element.getKeywords().toString(): 'Sem palavras chaves associadas';

            if (element.getWGS84BoundingBox()){
                wgs84 = element.getWGS84BoundingBox().lowerCorner + " e " + element.getWGS84BoundingBox().upperCorner;
            }
            
            if (element.getBoundingBox()){
                boundingBox = element.getBoundingBox().lowerCorner + " e " + element.getBoundingBox().upperCorner;
            }
      
            
            let identificador = element.getIdentifier() || "Sem identifcador associado"

            let metadados = element.getMetadata();
            if (metadados !== null){
                metadados.metadataHrefs.forEach((href, index) => {
                    metadataLink = [...metadataLink, href]
                })
            }
            
            console.log("METADATA LINK" + JSON.stringify(metadataLink))
            
            /*
            if(metadados){
                metadados.forEach(metadado => metadataLink = [...metadataLink, metadados.metadataHrefs || "Sem metadado associado"])//metadataLink = [...metadataLink,metadado.metadataObject.OnlineResource["@attributes"]["xlink:href"].toString()]);
                console.log("METADA LINK " + JSON.stringify(metadataLink));
                //metadataLink = metadados[0].metadataObject.OnlineResource["@attributes"]["xlink:href"].toString();
            }
            */
           

            
            let obj = {
            ['Título']: title,
            ["Resumo"]: resumo,
            ["Identificador"]: identificador,
            ["WGS84"] : '',
            ["Bounding Box"]: '',
            ['Palavras Chaves'] : keywords,
            ['Link dos Metadados'] : []
            }

            if(wgs84){
                obj["WGS84"] = wgs84;
            }
            else{
                delete obj["WGS84"];
            }

            if(boundingBox){
                obj['Bounding Box'] = boundingBox;
            }
            else{
                delete obj["Bounding Box"]
            }

            let link_metadados;
            if(metadataLink.length === 1){
                link_metadados = metadataLink;
            }else if(metadataLink.length > 1){
                link_metadados = metadataLink.map(link => link).join('\n')
            }else{
                link_metadados = 'Sem metadado associado'
            }
            
            obj['Link dos Metadados'] = link_metadados;
           
            arrayToCSV = [...arrayToCSV, obj]
            //console.log(JSON.stringify(obj))
            metadataLink = [];
        })
        
        return arrayToCSV;
        
    }



