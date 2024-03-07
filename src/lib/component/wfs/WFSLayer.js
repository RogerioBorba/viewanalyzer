import { BaseLayer } from "$lib/component/base/BaseLayer";

function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}
class MetadataURL {
    // metadataObject is json object from WxS capabilities['MetadataURL']
    constructor(metadataObject) {
        this.metadataObject = metadataObject
    }
    
    type() {
        return this.metadataObject['@attributes']?.['type'] || 'Sem informação'
    }

    contentType() {
        return nodeValue(this.metadataObject['Format'])
    }

    link() {
        let lnk = this.metadataObject['#text']
        if(!lnk)
            return this.metadataObject['@attributes']['xlink:href']
        return lnk
    }

    linkType() {
        return this.metadataObject['@attributes']['xlink:type'] 
    }

}
export class WFSLayer extends BaseLayer {
    
    constructor(aLayerCapability = null, oid = null, sourceLayer = null, layer=null) {
        super(layer);
        this.layerCapability = aLayerCapability;
        this.sourceLayer = sourceLayer;
        WFSLayer.inc = WFSLayer.inc + 1;
        this.oid = oid?oid:WFSLayer.inc;
        
    }
    objCapability(propertyName) {
        let obj = this.layerCapability[propertyName];
        if (obj)
            return nodeValue(obj);
        return null    
    }
    name(){
        return this.objCapability('Name');   
    }
    
    title(){
        return this.objCapability('Title')
    }
    
    description() {
        return this.title() || this.name() || 'sem título e nome';
    }
    
    metadataURLs() {
        let metadataObjs = this.layerCapability['MetadataURL'];
        if (!metadataObjs)
            return []

        if (Array.isArray(metadataObjs))
            return metadataObjs.map(metadata => new MetadataURL(metadata))
        else
            return [new MetadataURL(metadataObjs) ]
        
        
    }

    metadataLink() {
        if(!this.layerCapability.MetadataURL)
            return 'Sem metadado associado'
        
        return this.layerCapability.MetadataURL["#text"]
    }
    /*
    metadataLink() {
        if(!this.layerCapability.MetadataURL["#text"])
            return 'Sem metadado associado'
        return this.layerCapability.MetadataURL["#text"]
    }
    */

    metadataType() {
        if (!this.layerCapability.MetadataURL)
            return null

        return this.layerCapability.MetadataURL["@attributes"].type || 'Não informado'

    }

    defaultSRS() {
        let srs = this.layerCapability.DefaultSRS?.["#text"]
        if (!srs)
            srs = this.layerCapability.DefaultCRS?.["#text"]
        return srs
    }

    keywords() {
        let keywordList = this.layerCapability["ows:Keywords"];
        if (!keywordList)
            return null
        let keywords = keywordList["ows:Keyword"]
        if (keywords)
            if (Array.isArray(keywords))
                return keywords.map(keyword => keyword['#text'] || keyword['cdata-section'] )
            else
                return keywords['#text'] || keywords['cdata-section']
        return null
    }

    keywordsString() {
        
        return (this.keywords())? this.keywords(): 'Não há palavras chaves'
    }
    
    defaultSRSString() {
        if (!this.defaultSRS())
            return ''
        return this.defaultSRS().toString()
    }
    
    typeMetadataString() {
        if (this.metadataURLs().length == 0)
            return "Sem metadado associado"
        const list_meta = this.metadataURLs().map(metada => metada.type())
        return list_meta
    }

}