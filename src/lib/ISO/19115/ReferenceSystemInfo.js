function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class MD_ReferenceSystem {
    //metadataObject =["gmd:identificationInfo"]
    constructor(metadataObject) {
        this.metadataObject = metadataObject
    }


    getCoordinateReference(){
        let typeOfRepresentation;
        let codeSpace;

        if(this.metadataObject["gmd:referenceSystemIdentifier"] &&
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"] &&
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:code"] &&    
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:code"]["gco:CharacterString"] &&
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:code"]["gco:CharacterString"]["#text"]
        ){
            typeOfRepresentation = this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:code"]["gco:CharacterString"]["#text"]
        }

        if(this.metadataObject["gmd:referenceSystemIdentifier"] &&
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"] &&
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:codeSpace"] &&    
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:codeSpace"]["gco:CharacterString"] &&
        this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:codeSpace"]["gco:CharacterString"]["#text"]
        ){
            codeSpace = this.metadataObject["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:codeSpace"]["gco:CharacterString"]["#text"]
            return codeSpace + ":" + typeOfRepresentation;
        }

        return typeOfRepresentation;
    }

}