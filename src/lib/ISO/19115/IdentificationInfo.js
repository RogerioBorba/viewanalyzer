
function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class MD_Identification {
    //metadataObject =["gmd:identificationInfo"]
    constructor(metadataObject) {
        this.metadataObject = metadataObject
    }

    title() {
        // Verifica se o id existe na estrutura atual e retorna se encontrado
        const id = this.metadataObject["@attributes"]?.id;
        if (id) {
            return id;
        }

        // Verifica se o título existe na estrutura alternativa e retorna se encontrado
        const title = this.metadataObject["gmd:citation"]?.["gmd:CI_Citation"]?.["gmd:title"]?.["gco:CharacterString"]?.["#text"];
        if (title) {
            return title;
        }

        // Retorna uma mensagem padrão se nenhum dos dois valores foi encontrado

    }

    status() {
        if(this.formatGMD())
            
            return this.metadataObject["gmd:citation"]["gmd:status"]["gco:CharacterString"]["#text"];
        

        if (this.metadataObject["gmd:status"] && this.metadataObject["gmd:status"]["gmd:MD_ProgressCode"]) 
            return this.metadataObject["gmd:status"]["gmd:MD_ProgressCode"]["@attributes"].codeListValue
        
        
        return 'Sem status associado'
    }
    
    abstractInfo() {
        if(this.formatGMD())
            return this.metadataObject["gmd:citation"]["gmd:abstract"]["gco:CharacterString"]["#text"]

        
        if(this.metadataObject["gmd:abstract"]?.["@attributes"]?.["gco:nilReason"]?.["text"]){
            let text = this.metadataObject["gmd:abstract"]["@attributes"]["gco:nilReason"]["text"];
            if(text === "missing"){
                return ""
            }
            else{
                return text;
            }
        }
        

        if (this.metadataObject["gmd:abstract"]?.["gco:CharacterString"]?.["#text"])
            return this.metadataObject["gmd:abstract"]["gco:CharacterString"]["#text"]
        return ''
    }
    
    descriptiveKeywords() {
        return this.metadataObject["gmd:descriptiveKeywords"]
    }

    formatGMD(){
        return this.metadataObject["gmd:citation"]["gmd:descriptiveKeywords"];
    }

    keywords() {
        if (this.formatGMD()) {
            const keywordsArray = this.metadataObject["gmd:citation"]["gmd:descriptiveKeywords"];
            
            if (keywordsArray === null) {
                return 'Sem palavras-chaves associadas';
            } else {
                // Verifica se keywordsArray é um array
                if (Array.isArray(keywordsArray)) {
                    
                    // Mapeia o array para retornar apenas os valores de "#text"
                    return keywordsArray.map(keyword => keyword["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]["#text"]);
                } else if (typeof keywordsArray === 'object') {
                    
                    // Se keywordsArray for um objeto, retorna apenas o valor de "#text"
                    return keywordsArray["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]["#text"];
                } else {
                    return 'Sem palavras-chaves associadas';
                }
            }
        }
       
        if (this.metadataObject["gmd:descriptiveKeywords"] && Array.isArray(this.metadataObject["gmd:descriptiveKeywords"])) {
            let keywords = this.metadataObject["gmd:descriptiveKeywords"];
            if (keywords.length === 0) {
                return "Sem palavras-chaves associadas";
            } else {
                return keywords.map(keyword => {
                    if (keyword && keyword["gmd:MD_Keywords"] && keyword["gmd:MD_Keywords"]["gmd:keyword"] && keyword["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"] && keyword["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]["#text"]) {
                        return keyword["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]["#text"].trim();
                    } else {
                        return ""; 
                    }
                });
            }
        } 
            
                
            
            
    
        
        /*
        if (this.descriptiveKeywords() !== null) {
            const descriptiveKeywords = this.descriptiveKeywords()["gmd:MD_Keywords"];
            console.log("descriptive keywords " + JSON.stringify(descriptiveKeywords));
        
            if (descriptiveKeywords) {
                if (Array.isArray(descriptiveKeywords)) {
                    return descriptiveKeywords.map(keyword => keyword["gmd:keyword"]["gco:CharacterString"]["#text"].trim());
                } else if (typeof descriptiveKeywords === 'object') {
                    // Se descriptiveKeywords for um objeto, retorna apenas o valor de "#text"
                    return descriptiveKeywords["gmd:keyword"]["gco:CharacterString"]["#text"].trim();
                }
            } else {
                return 'Sem palavras-chaves associadas';
            }
        }
        */
       
        if (this.descriptiveKeywords()== null)
            return 'Sem palavras-chaves associadas'
        
        if (this.descriptiveKeywords() && this.descriptiveKeywords()["gmd:MD_Keywords"] == null)
            return 'Sem palavras-chaves associadas'
        
       

        const keys = this.descriptiveKeywords()["gmd:MD_Keywords"]["gmd:keyword"]    
        if (keys == null)
            return 'Sem palavras-chaves associadas'
        const arr = Array.isArray(keys)?keys:[keys]
        return arr.map((k)=> {return k["gco:CharacterString"]["#text"]})

    }

    
    spatialRepresentationType(){
        if(this.metadataObject["gmd:spatialRepresentationType"] &&
        this.metadataObject["gmd:spatialRepresentationType"]["gmd:MD_SpatialRepresentationTypeCode"]["#text"]){
            let representationSpatial = this.metadataObject["gmd:spatialRepresentationType"]["gmd:MD_SpatialRepresentationTypeCode"]["#text"];
            if(representationSpatial === "vector"){
                return "Vetor"
            }
            else{
                this.metadataObject["gmd:spatialRepresentationType"]["gmd:MD_SpatialRepresentationTypeCode"]["#text"];
            }
        }
        else{
            return ""
        }
    }
    
    scale(){
        if(this.metadataObject["gmd:spatialResolution"] &&
        this.metadataObject["gmd:spatialResolution"]["gmd:MD_Resolution"] &&
        this.metadataObject["gmd:spatialResolution"]["gmd:MD_Resolution"]["gmd:equivalentScale"] &&
        this.metadataObject["gmd:spatialResolution"]["gmd:MD_Resolution"]["gmd:equivalentScale"]["gmd:MD_RepresentativeFraction"] &&
        this.metadataObject["gmd:spatialResolution"]["gmd:MD_Resolution"]["gmd:equivalentScale"]["gmd:MD_RepresentativeFraction"]["gmd:denominator"] &&
        this.metadataObject["gmd:spatialResolution"]["gmd:MD_Resolution"]["gmd:equivalentScale"]["gmd:MD_RepresentativeFraction"]["gmd:denominator"]["gco:Integer"]["#text"]
        ){
            return this.metadataObject["gmd:spatialResolution"]["gmd:MD_Resolution"]["gmd:equivalentScale"]["gmd:MD_RepresentativeFraction"]["gmd:denominator"]["gco:Integer"]["#text"]
        }
        else{
            return ""
        }
    }
    
}

export class SV_ServiceIdentification extends MD_Identification {
    constructor(metadataObject) {
        super(metadataObject)       
    }
}

export class MD_DataIdentification extends MD_Identification {
    constructor(metadataObject) {
        super(metadataObject)       
    }
}

export function identificationInfo(metadataObject) {
    return new  MDIdentificationInfo(metadataObject["gmd:identificationInfo"])
}

    
