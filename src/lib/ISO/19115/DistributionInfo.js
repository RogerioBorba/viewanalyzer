
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
        const onLINE = this.onLine();
        
        if (onLINE.length === 0) {
            if (
                this.metadataObject["gmd:onLine"] &&
                this.metadataObject["gmd:onLine"][0] &&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"] &&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"] &&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]&&
                this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"]
            ) {
                return this.metadataObject["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"];
            } else {
                return ' - ';
            }
        }

        return onLINE.map((online) => {
            if (
                online &&
                online["gmd:CI_OnlineResource"] &&
                online["gmd:CI_OnlineResource"]["gmd:protocol"] &&
                online["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]&&
                online["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"]
            ) {
                return online["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]["#text"];
            } else {
                return ' - ';
            }
        });
}

    getDistributors() {
        console.log("GET DISTRIBUTORS :" + JSON.stringify(this.metadataObject))
        console.log("typeOF " + typeof(this.metadataObject))
        
        let organizationName;
        let email;


        if (
            this.metadataObject &&
            this.metadataObject["gmd:distributor"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]["#text"]
          ) {
            email = this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]["#text"];
          }
          
          if (
            this.metadataObject &&
            this.metadataObject["gmd:distributor"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"] &&
            this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]["#text"]
          ) {
            organizationName = this.metadataObject["gmd:distributor"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]["#text"];
          }
          

        if (
            this.metadataObject &&
            this.metadataObject["gmd:distributor"] &&
            Array.isArray(this.metadataObject["gmd:distributor"]) &&
            this.metadataObject["gmd:distributor"].length > 1 && // Verifique se há mais de um item na matriz "gmd:distributor"
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:organisationName"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]["#text"]
          ) {
            organizationName = this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]["#text"];
          }
    
        if (
            this.metadataObject &&
            this.metadataObject["gmd:distributor"] &&
            Array.isArray(this.metadataObject["gmd:distributor"]) &&
            this.metadataObject["gmd:distributor"].length > 1 && // Verifique se há mais de um item na matriz "gmd:distributor"
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"] &&
            this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]["#text"]
          ) {
            email = this.metadataObject["gmd:distributor"][1]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]["#text"];
          }
      
        return { organizationName, email };
    }

    
    catchProtocols(){
            const onLINE = this.onLine();
            console.log("ONline", onLINE);
            
            if (onLINE.length === 0) {
                if (
                    this.metadataObject["gmd:onLine"] &&
                    this.metadataObject["gmd:onLine"][0] &&
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
                    const description = resource["gmd:description"] && resource["gmd:description"]["gco:CharacterString"] && resource["gmd:description"]["gco:CharacterString"]["#text"]
                        ? resource["gmd:description"]["gco:CharacterString"]["#text"]
                        : "";
                    return { url, protocol, name, description };
                }
                return null; // ou {} se quiser um objeto vazio
            }).filter(Boolean); // Filtra os resultados nulos (undefined)
        
            return result;
        
        /*
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
                const description = resource["gmd:description"]["gco:CharacterString"]["#text"]
                return { url, protocol, name, description};
            }
            return null; // ou {} se quiser um objeto vazio
        }).filter(Boolean); // Filtra os resultados nulos (undefined)

        return result;
        */

    }
    
    
    metadataFormat(){
        console.log("MD_Format " + JSON.stringify(this.metadataObject))
        let metadataFormat;
        if(this.metadataObject["gmd:distributionFormat"] &&
        this.metadataObject["gmd:distributionFormat"]["gmd:MD_Format"] &&
        this.metadataObject["gmd:distributionFormat"]["gmd:MD_Format"]["gmd:name"] &&
        this.metadataObject["gmd:distributionFormat"]["gmd:MD_Format"]["gmd:name"]["gco:CharacterString"] &&
        this.metadataObject["gmd:distributionFormat"]["gmd:MD_Format"]["gmd:name"]["gco:CharacterString"]["#text"]){
           metadataFormat = this.metadataObject["gmd:distributionFormat"]["gmd:MD_Format"]["gmd:name"]["gco:CharacterString"]["#text"];
        } 
        
        return metadataFormat;
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
    
