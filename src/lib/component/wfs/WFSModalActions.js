import { fetchDataByType } from "$lib/request/requestData";



function urlGetDescribeFeatureType(wfsLayerName, urlBase) {
    const baseURL = urlBase
    const service='WFS';
    const version='2.0.0'
    const request='DescribeFeatureType'
    const typeName= wfsLayerName;
    return `${baseURL}?service=${service}&version=${version}&request=${request}&typeName=${typeName}&outputFormat=application/json`
}


export async function getAttributes(wfsLayerName, urlBase) {

        if (!wfsLayerName) {
            return alert("Esta é uma camada de agrupamento. Apenas as camadas interiores podem ser exibidas!");
        }

        let urlDescribeFeatureType = urlGetDescribeFeatureType(wfsLayerName, urlBase);
        let data = await fetchDataByType(urlDescribeFeatureType);
        let dataJson = await data.json();
        console.log("DATA JSON: " + JSON.stringify(dataJson))
        let attributes = dataJson["featureTypes"].map(element => element["properties"].map(property => property["name"])).flat();
        console.log(attributes);
        return attributes;

        /*let z_index = $selectedLayers.length + 1;
        if (!wfsLayer.name()) {
            return alert("Esta é uma camada de agrupamento. Apenas as camadas interiores podem ser exibidas!");
        }

        let urlFeature = urlGetFeature();
        let dados = await fetchDataByType(urlFeature);
        let dadosJson = await dados.json();
        console.log("dados json" + JSON.stringify(dadosJson));
        let geometria = dadosJson.features[0].geometry.type;
        console.log("GEOMETRIA: " + geometria);
 */
    }
   

function urlGetFeatures(wfsLayerName,urlBase,filter,maxFeatures){
    const baseURL = urlBase
    const service='WFS';
    const version='2.0.0'
    const request='GetFeature'
    const typeName= wfsLayerName;
    const result = `${baseURL}?service=${service}&version=${version}&count=${maxFeatures}&request=${request}&typeName=${typeName}&filter=${filter}&outputFormat=application/json`
    console.log("RESULT" +  result)
    return result;
}
    

export async function getFeatures(wfsLayerName, urlBase,filter, maxFeatures = 1000) {

    if (!wfsLayerName) {
        return alert("Esta é uma camada de agrupamento. Apenas as camadas interiores podem ser exibidas!");
    }

    let urlDescribeFeatureType = urlGetFeatures(wfsLayerName, urlBase, filter,maxFeatures);
    console.log(urlDescribeFeatureType)
    let data = await fetchDataByType(urlDescribeFeatureType);
    let dataJson = await data.json();
    console.log("DATA JSON: " + JSON.stringify(dataJson))
    
    let features = dataJson.features;
    let properties = features.map(element => element.properties)

    console.log(JSON.stringify(properties));
    //features.map(element => properties = [...properties, element.properties ])
    //console.log("properties" + JSON.stringify(properties));
    return properties;
    //let attributes = dataJson["featureTypes"].map(element => element["properties"].map(property => property["name"])).flat();
    //console.log(attributes);
    //return attributes;

  
}