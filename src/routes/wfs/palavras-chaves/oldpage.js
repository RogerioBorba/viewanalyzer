import {catalogos_servicos } from  '$lib/inde/CatalogoINDE';
import { fetchData } from '$lib/request/requestData';

/** @type {import('./$types').PageLoad} */

export async function load({ fetch }) {
    let wmsCapabilitiesUrl = catalogos_servicos.filter(catalogo => catalogo.wmsGetCapabilities != null).map(catalogo=> catalogo.wmsGetCapabilities)
    wmsCapabilitiesUrl.forEach(url => {
        console.log('inicio> ', url)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 60000)
        let res = await fetchData(url, { signal: controller.signal })
        const data = await res.json()        
        console.log('Fim> ', url)
    });
    return {urls: wmsCapabilitiesUrl}
}