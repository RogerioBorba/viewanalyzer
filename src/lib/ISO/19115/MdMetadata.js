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
        
        if(!this.distributionInfo && this.metadataObject["gmd:distributionInfo"] && this.metadataObject["gmd:distributionInfo"][0] && this.metadataObject["gmd:distributionInfo"][0]["gmd:MD_Distribution"])
            this.distributionInfo = new MD_Distribution(this.metadataObject["gmd:distributionInfo"][0]["gmd:MD_Distribution"])
        
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

    getCategories(){
        let categories = []
        if(this.metadataObject["gmd:identificationInfo"] && this.metadataObject["gmd:identificationInfo"]["gmd:MD_DataIdentification"]
        || this.metadataObject.hasOwnProperty("gmd:identificationInfo")){
            categories.push("Identificação");
        }

        if(this.metadataObject["gmd:distributionInfo"] && this.metadataObject["gmd:distributionInfo"]["gmd:MD_Distribution"]
        || this.metadataObject.hasOwnProperty("gmd:distributionInfo")){
            categories.push("Distribuição");
        }

        if(this.metadataObject["gmd:referenceSystemInfo"] && this.metadataObject["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]
        || this.metadataObject.hasOwnProperty("mdb:referenceSystemInfo")){
            categories.push("Sistema de Referência");
        }

        if(this.metadataObject["gmd:dataQualityInfo"] && this.metadataObject["gmd:dataQualityInfo"]["gmd:DQ_DataQuality"]){
            categories.push("Qualidade");
        }

        if(this.metadataObject["gmd:fileIdentifier"] || this.metadataObject.hasOwnProperty("mdb:metadataIdentifier")){
            categories.push("Metadado");
        }

        if(this.metadataObject["gmd:metadataIdentifier"] || this.metadataObject.hasOwnProperty("mdb:metadataIdentifier") ){
            categories.push("Metametadados")
        }

        if(this.metadataObject['gmd:resourceLineage'] || this.metadataObject.hasOwnProperty("mdb:resourceLineage")){
            categories.push("Linhagem")
        }

        if(this.metadataObject["gmd:spatialRepresentationInfo"]){
            categories.push("Representação Espacial")
        }

        if(this.metadataObject["gmd:contentInfo"]){
            categories.push("Conteúdo")
        }

        if(this.metadataObject["gmd:metadataConstraints"]){
            categories.push("Restrições de Metadado")
        }

        console.log("Categorias: " + categories)
        return categories;

    }
}
    
