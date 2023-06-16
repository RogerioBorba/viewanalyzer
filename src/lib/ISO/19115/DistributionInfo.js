
function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class MD_Distribution {
    //metadataObject = ["gmd:MD_Distribution"]
    constructor(metadataObject) {
        this.metadataObject = metadataObject
        this.description = ''
        this.transferOptions = [];
    }

     getTransferOptions() {
        if(this.transferOptions == null)
            this.transferOptions = this.metadataObject["gmd:transferOptions"]
        return this.transferOptions    
    }

    onLine() {
        if (this.getTransferOptions() == null)
            return []
        if (this.getTransferOptions()["gmd:MD_DigitalTransferOptions"] == null)
            return []
        if (this.getTransferOptions()["gmd:MD_DigitalTransferOptions"]["gmd:onLine"] == null)
            return []
        let arrOnline = this.getTransferOptions()["gmd:MD_DigitalTransferOptions"]["gmd:onLine"]
        return arrOnline

    }
    
}


export function mdDistributionInfo(metadataObjectOrNull) {
    if (metadataObjectOrNull == null)
        return null
    //["gmd:MD_Metadata"][0]["gmd:distributionInfo"]
    //["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"][0]
    //["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
    return new MD_Distribution(metadataObjectOrNull)    
        
}
    
