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
        if (this.metadataObject["gmd:status"]) 
            return this.metadataObject["gmd:status"]["gmd:MD_ProgressCode"]["@attributes"].codeListValue
        return ''
    }
    
    abstractInfo() {
        if (this.metadataObject["gmd:abstract"])
            return this.metadataObject["gmd:abstract"]["gco:CharacterString"]["#text"]
        return ''
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

    
