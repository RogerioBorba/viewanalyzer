/*
wfs:WFS_Capabilities
    ows:ServiceIdentification
    ows:ServiceProvider
    ows:OperationsMetadata
    FeatureTypeList
        Operations
        FeatureType
            Name
            Title
            Abstract
            ows:Keywords
                ows:Keyword
            DefaultSRS
            MetadataURL
            ows:WGS84BoundingBox
        ogc:Filter_Capabilities
            ...
            
*/
import { children } from 'svelte/internal'
//import {WFSLayer} from './WFSLayer'

export class WFSCapabilities {
    constructor(xmlObject) {
        this.xmlObject = xmlObject
    }
    
    nodeValue(node) {
        return node['#text'] || node['#cdata-section']
    }

    filterObject (obj, filterKey, filterValue) { 
        return Object.keys(obj).reduce((acc, val) => 
                (obj[val][filterKey] !== filterValue ? acc : {...acc,[val]: obj[val]}                                        
        ), {})
    }
     
    convertToXmlObject(xmlString) {
               
        if (!this.xmlObject['wfs:WFS_Capabilities']) {
            this.xmlObject = null
            throw Error("O xml lido não tem o formato do WFS getCapabilities!")
            return null
        }
        return this.xmlObject
    }
      
    isURL(anUrlOrFileNameWithPath){
        const urlOrFileNameWithPath = anUrlOrFileNameWithPath.toLowerCase()
        return urlOrFileNameWithPath.search(/(http:|https:)/) > -1
    }
    
    getXmlObject() {
        return this.xmlObject
    }
    
    wfsCapabilities() {
        const xmlObj = this.getXmlObject()
        if(!xmlObj)
            return null
        return xmlObj['wfs:WFS_Capabilities']
    }
    
    version() {
        const wfsCapabilitiesObj = this.wfsCapabilities()
        if(!wfsCapabilitiesObj)
            return null
        let obj = wfsCapabilitiesObj['@attributes']
        return obj['version']
    }
    
    //Service is a element providing general metadata for the server as a whole.
    service() {
        const xmlObj = this.getXmlObject()
        if (!xmlObj)
            return null
        return xmlObj['WFS_Capabilities']['ows:ServiceIdentification']
    }
    
    //Tthe Title is for the benefit of humans communication 
    serviceTitle() {
        const serv = this.service()
        return this.nodeValue(serv['ows:Title'])
    }
    
    //Optional service metadata
    serviceAbstract() {
        let serv = this.service()
        serv = serv['ows:Abstract']
        if (!serv)
            return null
        return this.nodeValue(serv)
    }
    
    //Optional service metadata
    serviceKeywords() {
        const serv = this.service()
        const keyWords = serv['ows:Keywords']
        if (keyWords) {
           const keys = keyWords['ows:Keyword']
           //return keys[0]['#text']
           return keys.map((element) => { return this.nodeValue(element)});
        }
        return null
    }
    serviceProvider() {
        const serv = this.service();
        return serv['ows:ServiceProvider'];

    }
    
    serviceContactInformation() {
        let serv = this.serviceProvider()
        if (!serv)
            return null;
        return serv['ows:ServiceContact'];    
    }
    
    //names the actual operations that are supported by the server
    
    featureTypeList() {
        const cap = this.wfsCapabilities()
        if (!cap)
            return null    
        return cap['FeatureTypeList']
    }
    features() {
        let featureTyoe = this.featureTypeList();
        if (!featureTyoe)
            return []
        return featureTyoe['FeatureType'];
    }

}
//module.exports=WMSCapabilities
