import { WMSCapabilities } from '$lib/component/wms/WMSCapabilities';
import { textXml2Json } from '$lib/xml-json/xml2Json';
import { error } from '@sveltejs/kit';
let countByName = {}
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    try {
        const iri = 'https://inde.gov.br/api/catalogo/get'
        const response = await fetch(iri)
        if(!response.ok) throw error(500, `O servidor não conseguiu responder adequadamente a requisição`);
        const catalogos_servicos = await response.json()
        console.log("Array.isArray(catalogos_servicos)")
        console.log(Array.isArray(catalogos_servicos))
        const promises = await Promise.all(catalogos_servicos.map((catalogo) => { return keywordsFrom(catalogo.wmsGetCapabilities)}))
        console.log("promises fim")
        return new Response(JSON.stringify(countByName), {status: 200, headers: {'content-type': 'application/json'}});  
        
    } catch (erro) {
        throw erro
    }
}
async function keywordsFrom(url) {
    console.log(url)
    if (url == null)
        return
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 60000)
        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) return null
        const textXML = await res.text()
        const xmlJsonObject = await textXml2Json(textXML)
        const wmsCapa =  new WMSCapabilities(xmlJsonObject)
        const keywords = wmsCapa.allKeywords()
        for (let i = 0; i < keywords.length; i++) {
            let keyword = keywords[i]
            let value = countByName[keyword]
            if (value)
                countByName[keyword] = value + 1
            else
                countByName[keyword] = 1
            countByName = countByName
        }
        
    } catch (error) {
        return null
    }
    
}