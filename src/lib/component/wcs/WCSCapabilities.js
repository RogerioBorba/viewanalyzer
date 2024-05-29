/*
WMS_Capabilities
    Service
        Name
        Title
        Abstract
        KeywordList
    Capability
*/
import { children } from 'svelte/internal'
import {WMSLayer} from '$lib/component/wms/WMSLayer'


export class WCSCapabilities {
    constructor(xmlObject) {
        this.xmlObject = xmlObject
        
    }
    
    getCoverageSummary(){
        if(this.xmlObject["wcs:Capabilities"] &&
        this.xmlObject["wcs:Capabilities"]["wcs:Contents"] &&
        this.xmlObject["wcs:Capabilities"]["wcs:Contents"]["wcs:CoverageSummary"]
        ){
            let coverageSummaryArray = this.xmlObject["wcs:Capabilities"]["wcs:Contents"]["wcs:CoverageSummary"];
            return coverageSummaryArray;
        }

    }

    
    countCoverageSummary() {
        if(this.xmlObject["wcs:Capabilities"] &&
        this.xmlObject["wcs:Capabilities"]["wcs:Contents"] &&
        this.xmlObject["wcs:Capabilities"]["wcs:Contents"]["wcs:CoverageSummary"]
        ){
            let coverageSummaryArray = this.xmlObject["wcs:Capabilities"]["wcs:Contents"]["wcs:CoverageSummary"];
            let coverageCount = coverageSummaryArray.length;
            return coverageCount;
        }else{
            return 0;
        }
      }

    
    withouKeywords(){
        if(this.xmlObject["wcs:Capabilities"]["wcs:Contents"]["wcs:CoverageSummary"]){
            let coverageSummaryArray = this.xmlObject["wcs:Capabilities"]["wcs:Contents"]["wcs:CoverageSummary"];
            let result = coverageSummaryArray.filter(element => !element["ows:Keywords"])
            return result.length;
        }
        else{
            return 0;
        }
        
    }


    
}


