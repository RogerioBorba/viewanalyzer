<script>
    import {keywordCSWCountByName, allCSWKeywords, countCSWProcessado, countAllMetadata, totalAllMetadata} from '$lib/store/storeMetadata';
    import { onMount } from 'svelte';
    import { fetchDataByPost } from '$lib/request/requestDataByPost';
    import { fetchData } from '$lib/request/requestData';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    import { MD_Metadata } from '$lib/ISO/19115/MdMetadata';
    export let  objIdDescricaoIriNoCentralCategoria = {}
    
    function getURL(iri) {
        //iri = https://metadados.snirh.gov.br/geonetwork/srv/eng/csw?service=CSW&version=2.0.2&request=GetCapabilities
        const indexOfQuestionMark = iri.indexOf('?')
        if (indexOfQuestionMark == -1)
            return iri
        return iri.substring(0, indexOfQuestionMark );
    }

    /*export async function qtdMetadadosNoCentral() {
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
    }*/

    function getRecordsParameters() {
        if (objIdDescricaoIriNoCentralCategoria.noCentralCategoria == null)
            return 'service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&ElementSetName=brief&resultType=hits&typeNames=gmd:MD_Metadata'
        return `service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&constraintLanguage=FILTER&CONSTRAINT_LANGUAGE_VERSION=1.1.0&constraint=<Filter xmlns="http://www.opengis.net/ogc"><PropertyIsEqualTo><PropertyName>_cat</PropertyName><Literal>${objIdDescricaoIriNoCentralCategoria.noCentralCategoria}</Literal></PropertyIsEqualTo></Filter>`
    }

    export async function qtdMetadados() {
        try {
            let getRecordsParams = getRecordsParameters()
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

    function asArrayMDMetadata(arrMetadataObj) {
        return arrMetadataObj.map((obj) => {
            if (obj != null && obj != undefined)
                return new MD_Metadata(obj)
        })
    }
    export async function arrayMDMetadata() {
        const qtd_metadados = await qtdMetadados();
        
        let startPosition = 1;
        let maxRecordsByRequest = 20;
        let bodyWithParams = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:ogc="http://www.opengis.net/ogc" service="CSW" version="2.0.2" resultType="results" startPosition="1" maxRecords="20" outputFormat="application/xml" outputSchema="http://www.isotc211.org/2005/gmd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName><csw:Constraint version="1.1.0"><csw:CqlText>_cat='${objIdDescricaoIriNoCentralCategoria.noCentralCategoria}'</csw:CqlText></csw:Constraint></csw:Query></csw:GetRecords>`;
        let arrMetadataObj = [];
        $totalAllMetadata = $totalAllMetadata + parseInt(qtd_metadados)
        while (startPosition <= qtd_metadados) {
            
            try {
                let url = getURL(objIdDescricaoIriNoCentralCategoria.iri);
                let res = await fetchXML(startPosition, maxRecordsByRequest)  
                let xmlText = await res.text()
                let xmlJsonObject = textXml2Json(xmlText)
                let metadataObjOrArray = xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["gmd:MD_Metadata"]
                if (Array.isArray(metadataObjOrArray))
                    arrMetadataObj = asArrayMDMetadata(metadataObjOrArray);
                else
                    arrMetadataObj = [new MD_Metadata(metadataObjOrArray)];
            } catch (error) {
                console.error(`Ocorreu na requisição: ${startPosition}`);
                startPosition += maxRecordsByRequest;
                continue   
            }
            // Atualizar a posição inicial para a próxima página de registros
            startPosition += maxRecordsByRequest;
            
            countKeys(arrMetadataObj)
            
        }
        //$countAllMetadata = $countAllMetadata + parseInt(qtd_metadados)
        
    }

    function countKeys(arrMetadataObj) {
        for(let i = 0; i < arrMetadataObj.length; i++ ) {
            $countAllMetadata = $countAllMetadata + 1
            let metaMetadata = arrMetadataObj[i]
            if (metaMetadata == null || metaMetadata.getIdentificationInfo() == null)
                continue
            let allKeys = metaMetadata.getIdentificationInfo().keywords()  
            $allCSWKeywords = $allCSWKeywords.concat(allKeys)
            
            for (let j = 0; j < allKeys.length; j++) {
                let keyword = allKeys[j]
                let value = $keywordCSWCountByName[keyword]
                if (value) 
                    $keywordCSWCountByName[keyword] = value + 1 
                else 
                    $keywordCSWCountByName[keyword] = 1 
            }
        }  
    } 
    
    async function fetchXML(startPosition, maxRecords) {
        try {
            let query = null;
            if (objIdDescricaoIriNoCentralCategoria.noCentralCategoria == null)
                query = `request=GetRecords&service=CSW&outputSchema=http://www.isotc211.org/2005/gmd&version=2.0.2&ElementSetName=full&resultType=results&typeNames=gmd:MD_Metadata&startPosition=${startPosition}&maxRecords=${maxRecords}`
            else
                query = `request=GetRecords&service=CSW&outputSchema=http://www.isotc211.org/2005/gmd&version=2.0.2&ElementSetName=full&resultType=results&typeNames=gmd:MD_Metadata&startPosition=${startPosition}&maxRecords=${maxRecords}&constraintLanguage=FILTER&CONSTRAINT_LANGUAGE_VERSION=1.1.0&constraint=<Filter xmlns="http://www.opengis.net/ogc"><PropertyIsEqualTo><PropertyName>_cat</PropertyName><Literal>${objIdDescricaoIriNoCentralCategoria.noCentralCategoria}</Literal></PropertyIsEqualTo></Filter>`
            
            const url = `${getURL(objIdDescricaoIriNoCentralCategoria.iri)}?${query}`
            const res = await fetchData(url)
            return  res
        } catch (error) {
            console.log("Erro em CSWKeywordCard>>fetchXML")
            console.log(error)
        }
        
    }
    
    onMount(async () => {
        try {
            let arrMDMetadata = arrayMDMetadata(objIdDescricaoIriNoCentralCategoria);
            $countCSWProcessado = $countCSWProcessado + 1
                
        } catch (error) {
            console.log("Erro em CSWKeywordCard>>onMount")            
            console.log(error)            
        }  
    });
</script>

