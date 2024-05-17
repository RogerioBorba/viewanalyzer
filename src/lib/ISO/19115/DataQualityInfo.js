function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}

export class DQ_DataQuality  {
    constructor(metadataObject) {
        this.metadataObject = metadataObject
    }


    getLineage(){
        let lineage;
        if(this.metadataObject["gmd:lineage"] &&
        this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"] &&
        this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:statement"] &&    
        this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:statement"]["gco:CharacterString"] &&
        this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:statement"] ["gco:CharacterString"]["#text"]
        ){
            lineage = this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:statement"] ["gco:CharacterString"]["#text"]
        }

        if (lineage === undefined) {
            return null
        }

        return lineage;
    }


    getProcessStep(){
        let processSteps = [];
        if (
            this.metadataObject &&
            this.metadataObject["gmd:lineage"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:processStep"]
        ) {
            let steps = this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:processStep"];
            if (Array.isArray(steps)) {
                steps.forEach(step => {
                    if (
                        step &&
                        step["gmd:LI_ProcessStep"] &&
                        step["gmd:LI_ProcessStep"]["gmd:description"] &&
                        step["gmd:LI_ProcessStep"]["gmd:description"]["gco:CharacterString"] &&
                        step["gmd:LI_ProcessStep"]["gmd:description"]["gco:CharacterString"]["#text"]
                    ) {
                        processSteps.push(step["gmd:LI_ProcessStep"]["gmd:description"]["gco:CharacterString"]["#text"]);
                    }
                });
            } else {
                let step = steps["gmd:LI_ProcessStep"];
                if (
                    step &&
                    step["gmd:description"] &&
                    step["gmd:description"]["gco:CharacterString"] &&
                    step["gmd:description"]["gco:CharacterString"]["#text"]
                ) {
                    processSteps.push(step["gmd:description"]["gco:CharacterString"]["#text"]);
                }
            }
        }

            if(processSteps.length === 0){
                return null
            }
    
            return processSteps;
        }
    
    getSupplies(){
        if (
            this.metadataObject &&
            this.metadataObject["gmd:lineage"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"]["gmd:LI_Source"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"]["gmd:LI_Source"]["gmd:sourceCitation"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"]["gmd:LI_Source"]["gmd:sourceCitation"]["gmd:CI_Citation"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"]["gmd:LI_Source"]["gmd:sourceCitation"]["gmd:CI_Citation"]["gmd:title"] &&
            this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"]["gmd:LI_Source"]["gmd:sourceCitation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]["#text"]
        ) {
            return this.metadataObject["gmd:lineage"]["gmd:LI_Lineage"]["gmd:source"]["gmd:LI_Source"]["gmd:sourceCitation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]["#text"];
    
        }else {
            return null
        }
    }

    
        
        

        //console.log(descriptions);
        //return descriptions;
            
    
    
}

