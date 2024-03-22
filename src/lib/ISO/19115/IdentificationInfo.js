
function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class MD_Identification {
    //metadataObject =["gmd:identificationInfo"]
    constructor(metadataObject) {
        this.metadataObject = metadataObject
    }

    title() {
        return this.metadataObject["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]["#text"]
        
    }

    status() {
        if(this.formatGMD())
            return this.metadataObject["gmd:citation"]["gmd:status"]["gco:CharacterString"]["#text"];
        

        if (this.metadataObject["gmd:status"] && this.metadataObject["gmd:status"]["gmd:MD_ProgressCode"]) 
            return this.metadataObject["gmd:status"]["gmd:MD_ProgressCode"]["@attributes"].codeListValue
        return ''
    }
    
    abstractInfo() {
        if(this.formatGMD())
            return this.metadataObject["gmd:citation"]["gmd:abstract"]["gco:CharacterString"]["#text"]

        if (this.metadataObject["gmd:abstract"])
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
                return [];
            } else {
                // Verifica se keywordsArray é um array
                if (Array.isArray(keywordsArray)) {
                    // Mapeia o array para retornar apenas os valores de "#text"
                    return keywordsArray.map(keyword => keyword["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]["#text"]);
                } else if (typeof keywordsArray === 'object') {
                    // Se keywordsArray for um objeto, retorna apenas o valor de "#text"
                    return keywordsArray["gmd:MD_Keywords"]["gmd:keyword"]["gco:CharacterString"]["#text"];
                } else {
                    return [];
                }
            }
        }
        

        if (this.descriptiveKeywords()== null)
            return []
        
        if (this.descriptiveKeywords() && this.descriptiveKeywords()["gmd:MD_Keywords"] == null)
            return []
        
       

        const keys = this.descriptiveKeywords()["gmd:MD_Keywords"]["gmd:keyword"]    
        if (keys == null)
            return []
        const arr = Array.isArray(keys)?keys:[keys]
        return arr.map((k)=> {return k["gco:CharacterString"]["#text"]})

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

    
