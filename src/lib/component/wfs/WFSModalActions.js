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
        console.log(JSON.stringify(attributes))
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
   
    
