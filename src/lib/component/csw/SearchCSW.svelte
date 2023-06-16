<script lang="ts">
  import { query_selector_all } from "svelte/internal";
  
  let textEntered = ''
  let xml = ''
  let urlServerCSW = 'https://metadados.inde.gov.br/geonetwork/srv/por/csw'
  $: {
    if (textEntered) {
        xml =  `<csw:GetRecords maxRecords="10" outputFormat="application/xml"
    outputSchema="http://www.isotc211.org/2005/gmd" resultType="results" service="CSW"
    startPosition="1" version="2.0.2" xmlns="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:gmd="http://www.isotc211.org/2005/gmd"
    xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:rim="urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0">
    <csw:Query typeNames="csw:Record">
        <csw:ElementSetName>full</csw:ElementSetName>
        <csw:Constraint version="1.1.0">
            <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                <ogc:And>
                    <ogc:PropertyIsEqualTo>
                        <ogc:PropertyName>csw:AnyText</ogc:PropertyName>
                        <ogc:Literal>${textEntered}</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                    <PropertyIsEqualTo>
                    <PropertyName>linkProtocol</PropertyName>
                    <Literal>OGC:WMS</Literal>
                  </PropertyIsEqualTo>
                </ogc:And>
            </ogc:Filter>
        </csw:Constraint>
    </csw:Query>
</csw:GetRecords>`
      
  }
}
      async function fetchOnServerPostCSW() {
        console.log(xml)
        fetch(`/api/metadados?url=${urlServerCSW}`, { method: "POST",body: xml,
            headers: {"Content-type": "application/xml"}}).then( 
                     async function(response) {
                
                        if(response.ok) {
                            let res = await response.text()
                            console.log(res)
                        } else {
                          console.log('Network response was not ok.');
                        }
                    
                    }
            ) .catch(function(error) {
              console.log('There has been another but with your proxy-server fetch , but operation: ' + error.message);
            });       
      }
     
      async function btnSearchClicked()  {
          
           fetch(urlServerCSW, { method: "POST",body: xml,
            headers: {"Content-type": "application/xml"}}).then( 
                     async function(response) {
                
                        if(response.ok) {
                            let res = await response.text()
                            alert(res)
                        } else {
                          console.log('Network response was not ok.');
                        }
                    
                    }
            ) .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);}); 
              fetchOnServerPostCSW()      
        
    }
   
</script>
<form class="fixed  top-1 right-8 flex justify-end w-64">
    <input class="max-w-4xl focus:outline-gray-400 text-center" type="text"  bind:value={textEntered} placeholder="Buscar no catálogo de metadados">
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-100" on:click|preventDefault={btnSearchClicked} title="Buscar camadas">
        <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
    </button>
</form>