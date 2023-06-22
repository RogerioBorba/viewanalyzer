<script>
    import { preventDefault } from "ol/events/Event";
    import Navbar from '$lib/component/base/navbar.svelte'
    import {fetchDataByPost} from '$lib/request/requestDataByPost';
    import { textXml2Json } from '$lib/xml-json/xml2Json';
    const texto = 'Link de metadados'
    let qtd = 0
    let simple_qtd = 0
    let urlCatalogo = 'https://metadados.inde.gov.br/geonetwork/srv/eng/csw'
    const body = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" service="CSW" 
    version="2.0.2" resultType="hits">
  <csw:Query typeNames="csw:Record">
    <csw:Constraint version="1.1.0">
      <Filter xmlns="http://www.opengis.net/ogc">
        <PropertyIsEqualTo>
          <PropertyName>protocol</PropertyName>
          <Literal>OGC:WFS</Literal>
        </PropertyIsEqualTo>
      </Filter>
    </csw:Constraint>
  </csw:Query>
</csw:GetRecords>`
    const simpleBody = `<csw:GetRecords xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" service="CSW" 
    version="2.0.2" resultType="hits">
  <csw:Query typeNames="csw:Record"> 
  </csw:Query>
</csw:GetRecords>`

    async function getResultPost(res) {
        let xmlText = await res.text();
        let xmlJsonObject = textXml2Json(xmlText);
        return xmlJsonObject["csw:GetRecordsResponse"]["csw:SearchResults"]["@attributes"].numberOfRecordsMatched
    }
    async function btnCatalogoClicked() {
        
        try {
            let res = await fetchDataByPost(urlCatalogo, simpleBody, 'application/xml') 
            simple_qtd = await getResultPost(res)
            res = await fetchDataByPost(urlCatalogo, body, 'application/xml') 
            qtd = await await getResultPost(res)

        } catch (error) {
            console.log("Erro na requisição em protocolo-wfs-quantidade")
            console.log(error)
        }
    }
</script>
<Navbar brand="OGC/CSW Checker"></Navbar>
<div class="flex mt-4 relative text-gray-700">
    <input class="w-full p-2 text-sm shadow-sm border-gray-300 rounded-lg focus:outline-none" placeholder="URL WMS GetCapabilities" type="text" bind:value={urlCatalogo} title={texto}>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold px-1 rounded inline-flex items-center hover:bg-gray-200" 
            on:click|preventDefault={btnCatalogoClicked} title="Buscar quantidade">
        <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
    </button>
</div>
<p class="mt-2 text-lg text-blue-600"><span class="">Quantidade de metadados:</span> {simple_qtd}</p>
<p class="mt-2 text-lg text-blue-600"><span class="">Quantidade de metadados com o protocolo WFS:</span> {qtd}</p>
