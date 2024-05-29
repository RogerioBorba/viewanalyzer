export class WCSCoverageSummary{
    constructor(coverageSummary, id = null){
        this.coverageSummary = coverageSummary;
        this.id = id;
    }


    getTitle(){
        if(this.coverageSummary["ows:Title"]){
            return this.coverageSummary["ows:Title"]["#text"]
        }
        return "Sem título associado"
    }

    getAbstract(){
        if(this.coverageSummary["ows:Abstract"]){
            return this.coverageSummary["ows:Abstract"]["#text"]
        }
        return "Sem resumo associado"
    }
    

    getMetadata() {
      let metadataHrefs = [];
      let types = [];
      
      const metadata = this.coverageSummary["ows:Metadata"];
      
      if (Array.isArray(metadata)) {
        metadata.forEach(item => {
          if (item["@attributes"] && item["@attributes"]["xlink:href"]) {
            metadataHrefs.push(item["@attributes"]["xlink:href"]);
          }
          if (item["@attributes"] && item["@attributes"]["xlink:type"]) {
            types.push(item["@attributes"]["xlink:type"]);
          }
        });
      } else if (metadata && metadata["@attributes"]) {
        // Caso seja um único objeto
        if (metadata["@attributes"]["xlink:href"]) {
          metadataHrefs.push(metadata["@attributes"]["xlink:href"]);
        }
        if (metadata["@attributes"]["xlink:type"]) {
          types.push(metadata["@attributes"]["xlink:type"]);
        }
      }
      
      if (metadataHrefs.length > 0 && types.length > 0) {
        return { metadataHrefs, types };
      } else {
        return null;
      }
  }
    

    getKeywords() {
        if (this.coverageSummary["ows:Keywords"] && this.coverageSummary["ows:Keywords"]["ows:Keyword"]) {
          return this.coverageSummary["ows:Keywords"]["ows:Keyword"].map(keyword => keyword["#text"]);
        }
        return null;
      }

    getWGS84BoundingBox(){
        let lowerCorner;
        let upperCorner;
        if(this.coverageSummary["ows:WGS84BoundingBox"] && 
        this.coverageSummary["ows:WGS84BoundingBox"]["ows:LowerCorner"]){
            lowerCorner = this.coverageSummary["ows:WGS84BoundingBox"]["ows:LowerCorner"]["#text"]
        }
        
        if(this.coverageSummary["ows:WGS84BoundingBox"] && 
        this.coverageSummary["ows:WGS84BoundingBox"]["ows:UpperCorner"]){
            upperCorner = this.coverageSummary["ows:WGS84BoundingBox"]["ows:UpperCorner"]["#text"];
        }

        if (lowerCorner && upperCorner) {
            return { lowerCorner, upperCorner };
          } else {
            return null; 
          }
    }

    getBoundingBox(){
        let lowerCorner;
        let upperCorner;
        if(this.coverageSummary["ows:BoundingBox"] && 
        this.coverageSummary["ows:BoundingBox"]["ows:LowerCorner"]){
            lowerCorner = this.coverageSummary["ows:BoundingBox"]["ows:LowerCorner"]["#text"]
        }
        
        if(this.coverageSummary["ows:BoundingBox"] && 
        this.coverageSummary["ows:BoundingBox"]["ows:UpperCorner"]){
            upperCorner = this.coverageSummary["ows:BoundingBox"]["ows:UpperCorner"]["#text"];
        }

        if (lowerCorner && upperCorner) {
            return { lowerCorner, upperCorner };
          } else {
            return null; 
          }

    }

    getIdentifier(){
        
        if(this.coverageSummary["wcs:Identifier"]){
            return this.coverageSummary["wcs:Identifier"]["#text"]
        }
        return null
    }

}