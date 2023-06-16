import { SV_ServiceIdentification, MD_DataIdentification } from "./IdentificationInfo"
import { MD_Distribution } from "./DistributionInfo"

function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class MD_Metadata {
    constructor(metadataObject) { // metadataObject = gmd:MD_Metadata
        this.metadataObject = metadataObject
        this.identificationInfo = null
        this.distributionInfo = null
    }
    
    metadataStandardName() {
        let metadataStandard = this.metadataObject["gmd:metadataStandardName"] 
        if (!metadataStandard ) 
            return 'Padrão de metadados não definido'
        return metadataStandard["gco:CharacterString"]["#text"]
    }

    getDistributionInfo() { 
        if (!this.distributionInfo && this.metadataObject["gmd:distributionInfo"] && this.metadataObject["gmd:distributionInfo"]["gmd:MD_Distribution"])
            this.distributionInfo = new MD_Distribution(this.metadataObject["gmd:distributionInfo"]["gmd:MD_Distribution"])
        return this.distributionInfo
    }

    getIdentificationInfo() {
        //["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"][0]["gmd:identificationInfo"]["srv:SV_ServiceIdentification"]           
        if (!this.identificationInfo && this.metadataObject["gmd:identificationInfo"] && this.metadataObject["gmd:identificationInfo"]["gmd:MD_DataIdentification"])  {
            this.identificationInfo = new MD_DataIdentification(this.metadataObject["gmd:identificationInfo"]["gmd:MD_DataIdentification"])
        } else if  (!this.identificationInfo && this.metadataObject["gmd:identificationInfo"] && this.metadataObject["gmd:identificationInfo"]["srv:SV_ServiceIdentification"])
            this.identificationInfo = new SV_ServiceIdentification(this.metadataObject["gmd:identificationInfo"]["srv:SV_ServiceIdentification"])
        return this.identificationInfo
    }
}
    
