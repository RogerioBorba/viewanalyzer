import {WFSCapabilities} from './WFSCapabilities'
import {textXml2Json} from '$lib/xml-json/xml2Json'

export async function getWFSCapabilitiesObject(objIdTextIRI) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 seconds timeout:
    try {
        
        let res = await fetch(objIdTextIRI.iri, { signal: controller.signal })
        if(res.ok) {
            let textXML = await res.text();
            let jsonObj = await textXml2Json(textXML);
            return new WFSCapabilities(jsonObj);
            
        } else {
            console.log(`Client Error in fetching ${objIdTextIRI.text}`);
            return null
        }
    } catch (error) {
        console.log('There has been a problem with your fetch operation in client browser: ' + error.message)
        try {
            console.log('Try fetching on server-proxy')
            let res = await fetch(`/api/get-xml/?url=${objIdTextIRI.iri}`, { signal: controller.signal })
            if(res.ok) {
                console.log('fetch ok')
                let textXML = await res.text()
                
                return new WFSCapabilities(await textXml2Json(textXML))
                
            } else {
                console.log(`Server Error in fetching ${objIdTextIRI.text}`);
                return null
            }
        } catch (error) {
            console.log(`Error in fetching ${objIdTextIRI.text}`);
            return null
        }
    }
}
let count = 0
export async function fetchAsWFSCapabilitiesObject(iri) {

    try {
        
        let res = await fetch(iri)
        if(res.ok) {
            let textXML = await res.text()
            return new WFSCapabilities(await textXml2Json(textXML))
            
        } else {
            console.log(`Client Error in fetching ${iri}`);
            return null
        }
    } catch (error) {
        console.log('There has been a problem with your fetch operation in client browser: ' + error.message)
        try {
            count++
            if (count > 1)
                return null
            
            return await fetchAsWFSCapabilitiesObject(iri)

        } catch (error) {
            console.log(`Error in fetching ${iri}`);
            return null
        }
    }
}