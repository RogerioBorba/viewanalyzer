
function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class MD_Distribution {
    //metadataObject = ["gmd:MD_Distribution"]
    constructor(metadataObject) {
        this.metadataObject = metadataObject
        this.description = ''
        this.transferOptions = null;
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
        

        let arrOnline =  this.getTransferOptions()["gmd:MD_DigitalTransferOptions"]["gmd:onLine"] 
        if (arrOnline == null ){
            return []
        }
        return Array.isArray(arrOnline )? arrOnline: [arrOnline]
        

    }
    onLineProtocols() {
        const onLINE =  this.onLine()
       
        
        if(onLINE.length === 0){
            if (
                this.metadataObject["gmd:onLine"] &&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"] &&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"] &&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]
            ) {
        
                return this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"];
            }
        }
          
        return onLINE.map((online)=> {
            if (online["gmd:CI_OnlineResource"]  && online["gmd:CI_OnlineResource"]["gmd:protocol"] && online["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"])
                return online["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"]})

            
            return ' - '
    }

    catchProtocols(){
            const onLINE =  this.onLine()
            console.log("ONline" + onLINE)
           
            
            if(onLINE.length === 0){
                if (
                    this.metadataObject["gmd:onLine"] &&
                    this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"] &&
                    this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"] &&
                    this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]
                ) {
            
                    return this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"];
                }
            }
            

            const result = onLINE.map(online => {
            const resource = online["gmd:CI_OnlineResource"];
            if (
                resource &&
                resource["gmd:protocol"] &&
                resource["gmd:protocol"]["gco:CharacterString"] &&
                resource["gmd:linkage"] &&
                resource["gmd:linkage"]["gmd:URL"] &&
                resource["gmd:linkage"]["gmd:URL"]["#text"] &&
                resource["gmd:name"] &&
                resource["gmd:name"]["gco:CharacterString"] &&
                resource["gmd:name"]["gco:CharacterString"]["#text"]
            ) {
                const url = resource["gmd:linkage"]["gmd:URL"]["#text"];
                const protocol = resource["gmd:protocol"]["gco:CharacterString"]["#text"];
                const name = resource["gmd:name"]["gco:CharacterString"]["#text"];
                return { url, protocol, name };
            }
            return null; // ou {} se quiser um objeto vazio
        }).filter(Boolean); // Filtra os resultados nulos (undefined)

        return result;
    


            /*
            const onlineResources = onLINE.filter(item => item["gmd:CI_OnlineResource"])
           
            const mappedData = onlineResources.map(item => {
                const onlineResource = item["gmd:CI_OnlineResource"];
                const url = onlineResource["gmd:linkage"]["gmd:URL"]["#text"];
                const protocol = onlineResource["gmd:protocol"]["gco:CharacterString"]["#text"];
                const name = onlineResource["gmd:name"]["gco:CharacterString"]["#text"];
                return { url, protocol, name };
        });
            
            return mappedData;
        */
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
    
