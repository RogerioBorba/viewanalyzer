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
import { WFSLayer } from './WFSLayer'
import { json } from '@sveltejs/kit'
import { nullBaseTile } from '../openlayers/facade_openlayers'
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


    featuresObject(){
        
            const ft = this.features()
            console.log("FT" + JSON.stringify(ft))
            if (!ft)
                return null
            let features =  ft['FeatureType']
            if (!features)
                return []
            if (!Array.isArray(features))
                return [features]        
            return features
    }

    lenFeatures() {
        return this.features().length;    
    }

    featuresWithoutMetadata() {
        const layers =  this.features();
        if (!layers)
            return null
        
        const layerObjects =  layers.filter((layerObj) => {
           return !layerObj['MetadataURL']
        })
        return layerObjects
    }
    
    lenFeaturesWithoutMetadata(){
        return this.featuresWithoutMetadata().length
    }

    allKeywords() {
        const layers =  this.features()
        let arr = []
        if (!layers)
            return []
        const layerObjects =  layers.filter((layerObj) => {
           return layerObj && layerObj["ows:Keywords"] && layerObj["ows:Keywords"]["ows:Keyword"]
        })
        
        for(let i =0; i < layerObjects.length; i++) {
            
            let innerArr = layerObjects[i]["ows:Keywords"]
            innerArr = Array.isArray(innerArr)?innerArr: [innerArr]
            innerArr.forEach(element => {
                if (!element["ows:Keyword"])
                    return
                let lkeys    = element["ows:Keyword"]
                let innerInnerArray = Array.isArray(lkeys)? lkeys: [lkeys]
                innerInnerArray.forEach(ele => arr.push(this.nodeValue(ele)))
            });
        }
        return arr
    }

    featuresWithoutKeyword() {
        const layers =  this.features();
        if (!layers)
            return []
        
        const layerObjects =  layers.filter((layerObj) => {
           return !layerObj['KeywordList']
        })
        return layerObjects
    }

    lenFeaturesWithoutKeyword() {
        return this.featuresWithoutKeyword().length;
    }


    wfsLayersFilteredByWGS84BoundingBox(wgs84BoundingBox, sourceLayer=null) {
        let i = 1;
        let layers = this.features();
        if (!layers)
            return [];
        const wfsLayers = layers.map(layerObj => new WFSLayer(layerObj, i++, sourceLayer));

        const bboxLongitudeLowerCorner = parseFloat(wgs84BoundingBox[0].longitudeLowerCorner);
        const bboxLatitudeLowerCorner = parseFloat(wgs84BoundingBox[0].latitudeLowerCorner);
        const bboxLongitudeUpperCorner = parseFloat(wgs84BoundingBox[0].longitudeUpperCorner);
        const bboxLatitudeUpperCorner = parseFloat(wgs84BoundingBox[0].latitudeUpperCorner);

        return wfsLayers.filter(wfs => { 
            return (bboxLongitudeLowerCorner < wfs.wgs84BoundingBox().longitudeLowerCorner() &&
                bboxLatitudeLowerCorner <  wfs.wgs84BoundingBox().latitudeLowerCorner() &&
                bboxLongitudeUpperCorner < wfs.wgs84BoundingBox().longitudeUpperCorner() &&
                bboxLatitudeUpperCorner <  wfs.wgs84BoundingBox().latitudeUpperCorner())
        })
    }

    wfsLayersFilteredByNameOrTitle(nameOrTitle, sourceLayer=null) {
        let i = 1
        let layers = this.features()
        console.log("LAYERS" + JSON.stringify(layers))
        if (!layers)
            return []
        const wfsLayers =  layers.map(layerObj => new WFSLayer(layerObj, i++, sourceLayer))
        return wfsLayers.filter(wfsLayer => 
            (wfsLayer.title() && wfsLayer.title().toLowerCase().includes(nameOrTitle.toLowerCase())) ||
            (wfsLayer.name() && wfsLayer.name().toLowerCase().includes(nameOrTitle.toLowerCase()))
        )
    }


    includesAny(array1, array2) {
        if (array2.length == 0)
            return true
        let keywordListString = array1.toString().toLowerCase()  ;
        
        for (let i = 0; i < array2.length; i++) {
            if (keywordListString.includes(array2[i].toLowerCase())) 
                return true;
        }
        return false;
    }

    includesAll(array1, array2) {
        if (array2.length == 0)
            return true
        
        let keywordListString = array1.toString().toLowerCase();
        for (let i = 0; i < array2.length; i++) {
            if (!keywordListString.includes(array2[i].toLowerCase()))
                return false;
        }
        return true;
    }

    wfsLayersFilteredByKeywords(keywordsArray, sourceLayer=null) {
        let i = 1
        let ors = keywordsArray.filter((ikl) => ikl.logicalOperator == 'or').map((ikl) => { return ikl.keyword})
        let ands = keywordsArray.filter((ikl) => ikl.logicalOperator == 'and').map((ikl) => { return ikl.keyword})
        let layers = this.features()
        if (!layers)
            return []
        const wfsLayers =  layers.map(layerObj => new WFSLayer(layerObj, i++, sourceLayer))
        
        let wfsLayersFiltered = wfsLayers.filter(wfsLayer =>   
            (wfsLayer.keywords() &&
              this.includesAny(wfsLayer.keywords(), ors) &&
              this.includesAll(wfsLayer.keywords(), ands)
              ));
              
        return wfsLayersFiltered
        
    }

}
//module.exports=WMSCapabilities
