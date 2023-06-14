import { BaseLayer } from "$lib/component/base/BaseLayer";
import {MetadataURL} from '$lib/component/ogc_commom/metadataURL.js';

function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
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
            return metadataObjs.map(metadata => metadata['#text'] || metadata['cdata-section'] )
        else
            return [metadataObjs['#text'] || metadataObjs['cdata-section'] ]
        
        
    }

    metadataLink() {
        if(!this.metadataURLs())
            return null
        return this.layerCapability.MetadataURL["#text"]
    }

    metadataType() {
        if (!this.layerCapability.MetadataURL)
            return null

        return this.layerCapability.MetadataURL["@attributes"].type

    }

    defaultSRS() {
        return this.layerCapability.DefaultSRS["#text"]
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

}