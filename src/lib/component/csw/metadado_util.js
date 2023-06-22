import { fetchDataByPost } from '$lib/request/requestDataByPost';
import { fetchData } from '$lib/request/requestData';
import { textXml2Json } from '$lib/xml-json/xml2Json';
import { MD_Metadata } from '$lib/ISO/19115/MdMetadata';

function getURL(iri) {
    //iri = https://metadados.snirh.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities
    const indexOfQuestionMark = iri.indexOf('?')
    if (indexOfQuestionMark == -1)
        return iri
    return iri.substring(0, indexOfQuestionMark );
}

export async function qtdMetadadosNoCentral(objIdDescricaoIriNoCentralCategoria) {
    try {
        let bodyWithParams = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" service="CSW" version="2.0.2" resultType="hits" startPosition="1" maxRecords="20" outputFormat="application/xml" outputSchema="http://www.isotc211.org/2005/gmd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName><csw:Constraint version="1.1.0"><csw:CqlText>_cat='${objIdDescricaoIriNoCentralCategoria.noCentralCategoria}'</csw:CqlText></csw:Constraint></csw:Query></csw:GetRecords>`;
        let url = getURL(objIdDescricaoIriNoCentralCategoria.iri);
        let res = await fetchDataByPost(url, bodyWithParams,'application/xml');
        let xmlText = await res.text()
        let xmlJsonObject = textXml2Json(xmlText)
        let qtdMetadados = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["@attributes"]["numberOfRecordsMatched"]
        return qtdMetadados
        
    } catch (error) {
        console.log("Erro na requisição - qtdMetadadosNoCentral")
        return 0
    }
}

export async function qtdMetadadosNoProprio(objIdDescricaoIriNoCentralCategoria) {
    try {
        let getRecordsParams = 'service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&ElementSetName=brief&resultType=hits&typeNames=gmd:MD_Metadata'
        let url = getURL(objIdDescricaoIriNoCentralCategoria.iri);
        let res = await fetchData(`${url}?${getRecordsParams}`);
        let xmlText = await res.text()
        let xmlJsonObject = textXml2Json(xmlText)
        let qtdMetadados = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["@attributes"]["numberOfRecordsMatched"]
        return qtdMetadados
        
    } catch (error) {
        console.log("Erro na requisição - qtdMetadadosNoProprio")
        return 0
    }
}

export async function qtdMetadados(objIdDescricaoIriNoCentralCategoria) {
    
    if (objIdDescricaoIriNoCentralCategoria.noCentralCategoria == null)
        return await qtdMetadadosNoProprio(objIdDescricaoIriNoCentralCategoria)
    return await qtdMetadadosNoCentral(objIdDescricaoIriNoCentralCategoria)
}

/*
objIdDescricaoIriNoCentralCategoria =
{
descricao: "ANM - Agência Nacional de Mineração"
id: 3,
iri: "https://metadados.inde.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities",
noCentralCategoria: "ANM"
}
*/
export async function arrayMDMetadata(objIdDescricaoIriNoCentralCategoria) {
    const qtd_metadados = await qtdMetadados(objIdDescricaoIriNoCentralCategoria);
    let startPosition = 1;
    let maxRecordsByRequest = 20;
    let bodyWithParams = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" service="CSW" version="2.0.2" resultType="results" startPosition="1" maxRecords="20" outputFormat="application/xml" outputSchema="http://www.isotc211.org/2005/gmd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName><csw:Constraint version="1.1.0"><csw:CqlText>_cat='${objIdDescricaoIriNoCentralCategoria.noCentralCategoria}'</csw:CqlText></csw:Constraint></csw:Query></csw:GetRecords>`;
    let arrMetadataObj = [];
    
    while (startPosition <= qtd_metadados) {
        try {
            let url = getURL(objIdDescricaoIriNoCentralCategoria.iri);
            let res = null;
            if (objIdDescricaoIriNoCentralCategoria.noCentralCategoria == null)
                res = await getXML({url: url, body: bodyWithParams, content_type: 'application/xml'})
            else
                res = await fetchDataByPost(url, bodyWithParams,'application/xml')  
            let xmlText = await res.text()
            let xmlJsonObject = textXml2Json(xmlText)
            let metadataObjOrArray = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
            if (Array.isArray(metadataObjOrArray))
                arrMetadataObj =  arrMetadataObj.concat(metadataObjOrArray);
            else
                arrMetadataObj = [...arrMetadataObj, metadataObjOrArray];
            
            let currentPositionStr = `startPosition="${startPosition}"`
            let newPositionStr = `startPosition="${startPosition + maxRecordsByRequest}"`
            bodyWithParams = bodyWithParams.replace(currentPositionStr, newPositionStr)
        } catch (error) {
             console.error(`Ocorreu na requisição: ${startPosition}`);
             return arrMetadataObj
            
        }
        // Atualizar a posição inicial para a próxima página de registros
        startPosition += maxRecordsByRequest;
    }
    return arrMetadataObj.map((obj) => {
        if (obj != null && obj != undefined)
            return new MD_Metadata(obj)
    })
}


//https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&constraintLanguage=CQL_TEXT&Constraint=%E2%80%9C%%E2%80%9D&ElementSetName=full&resultType=results&maxRecords=20&startPosition=19
//data = {url: url, body: body, content_type: content_type}
async function getXML(data) {
    try {
        const maxRecords = getParameterValueAsStr(data.body.toLowerCase(), 'maxRecords'.toLowerCase())
        const startPosition = getParameterValueAsStr(data.body.toLowerCase(), 'startPosition'.toLowerCase())
        const query = `request=GetRecords&service=CSW&outputSchema=http://www.isotc211.org/2005/gmd&version=2.0.2&ElementSetName=full&resultType=results&typeNames=gmd:MD_Metadata&startPosition=${startPosition}&maxRecords=${maxRecords}`
        const url = `${data['url']}?${query}`
        const controller = new AbortController();
        const signal = controller.signal;
        const res = await fetchData(url, signal)
        return  res
        
    } catch (error) {
        console.log('get-records-by-post>>getXML(data)')
        console.log(error)
        return new Response(`Erro na requisição de url: ${data["url"]} e body: ${data["body"]}`, { status: 500});
    }   
}

function getParameterValueAsStr(body, parameter) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(body, 'text/xml');
    const element = xmlDoc.documentElement;
    const value = element.getAttribute(parameter);

    return value || null;
}
