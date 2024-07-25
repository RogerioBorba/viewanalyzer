<script>
    import { Progressbar, Navbar,  NavLi, NavUl, NavHamburger, Button  } from 'flowbite-svelte';
    import { onMount } from "svelte";
    import { currentFeatureTypeElements, currentWFSGetCapabilities } from '$lib/store/storeWFS';
    import  WFSComplexTypeCard from '$lib/component/wfs/WFSComplexTypeCard.svelte'
    import { fetchData } from "$lib/request/requestData";
    import { complexTypeList } from '$lib/xml-json/describeFeatureType';
    import {dataToPdf} from '$lib/component/pdf/gerarPDF';
    import { json2csv } from 'json-2-csv';
    /*** @type {any[]}*/
    let listaComplexType = [];

    let originalListaComplexType = [];
    /*** @type {any[]}*/
    let listaComplexTypeAsJson = [];
    //variables to Progress component
    let progress_value  = 0;
    let progress_status = 'processando ...';
    let progress_blink = 'animate-pulse';
    let progress_color =  'text-gray-600';
    let progress_bin = 0.0;
    
    let withErrorChecked = false;

    function hasEspecialChar(aString) {
        const regex = /[^\w_]/;
        return regex.test(aString.trim());
    }

    $:{
        if(!withErrorChecked){
            listaComplexType = originalListaComplexType;
        }

        if(withErrorChecked){
            listaComplexType = listaComplexType.filter(element => element.elementProperties.some( property => hasEspecialChar(property.name)) )
        }
    }

    
    function complexTypeAsCsvString(complexType) {
        let csvString = ''
        complexType.elementProperties.forEach(elementProperty => {
            csvString += complexType.name + ';' + 
                         elementProperty.name + ';' + 
                         elementProperty.typeVar + ';' + 
                         `${elementProperty.minOccurs}..${elementProperty.maxOccurs}` + ';' + 
                         '\n';
        });
        return  csvString 
    }

    function listaComplexTypeAsCSV() {
        let csvFile = 'nome_feicao;atributo;tipo;multiplicidade\n';
        listaComplexType.forEach(complexType => {
            csvFile += complexTypeAsCsvString(complexType);
        });
        return csvFile
    }
    function csvClicked() {
        // Cria um Blob com o conteúdo CSV
        //const lista = listaComplexType //.map(complexType => toJsonObject(complexType))
        const csvFile = listaComplexTypeAsCSV()
        const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        const filename = 'tipo_feicao.csv'
        // Cria um link de download
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function pdfClicked() {
        
        const lista = listaComplexType.map(complexType => toJsonObject(complexType))
        dataToPdf(lista, '')
    }
    
    function toJsonObject(complexType) {
        const attributes = complexType.elementProperties
        let objToPdf = {}
        objToPdf["Tipo de feição"] = complexType.name
        for (let j = 0; j < attributes.length; j++) {
            const attribute = attributes[j];
            const attributeName = attribute.name;
            const attributeType = attribute.typeVar;
            const minOccurs = attribute.minOccurs;
            const maxOccurs = attribute.maxOccurs;
            objToPdf[`${attributeName}`] = (`${attributeType}[${minOccurs}..${maxOccurs}]`);
        }
        //console.log(JSON.stringify(objToPdf))
        return objToPdf
        //console.log(JSON.stringify(complexType, null, 2))
        return {"Tipo de feição": complexType.name}
    }
        
    function featureNameList() {
        /** @type {string[]}*/
        let names = []
        $currentFeatureTypeElements.forEach(ele =>  names.push(ele.querySelector('Name').textContent))
        return names
    }

    function createSublists(inputList, maxElements = 100) {
        const sublists = [];
        for (let i = 0; i < inputList.length; i += maxElements) {
            sublists.push(inputList.slice(i, i + maxElements));
        }
        return sublists;
    }

    function urlDescribeFeatureType(listaDeNome) {

        const partes_url = $currentWFSGetCapabilities.split('?');
        const parteAntesDaInterrogacao = partes_url[0];
        return decodeURI(`${parteAntesDaInterrogacao}?service=wfs&version=2.0.0&request=DescribeFeatureType&typeNames=${listaDeNome.toString()}`)
    }

    async function fetch_xml(url) {
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 60000)
        let res = await fetchData(url, { signal: controller.signal })
        return await res.text()

    }

    function updateProgress() {
        progress_value += progress_bin
        if (progress_value > 100)  progress_value = 100
    }

    onMount( async () => {
        try {
            const listaDeListaDeNome = createSublists(featureNameList())
            progress_bin = parseFloat((100/listaDeListaDeNome.length).toFixed(2))
            for (let index = 0; index < listaDeListaDeNome.length; index++) {
                
                const listaDeNome = listaDeListaDeNome[index]
                const url = urlDescribeFeatureType(listaDeNome)
                const xml_text = await fetch_xml(url)
                console.log("XML_TEXT" + JSON.stringify(xml_text));
                const arrCompleType = await complexTypeList(xml_text)
                updateProgress()
                listaComplexType = listaComplexType.concat(arrCompleType)
                originalListaComplexType = listaComplexType;
                
            }            
        } catch (error) {
            progress_value = 100
            progress_blink = ''
            progress_status = 'Erro durante processamento.';
            progress_color =  'text-red-500'
        } finally {
            progress_value = 100
            progress_blink = ''
            if (progress_color != 'text-red-500') progress_color =  'text-blue-700'
            progress_status = 'processado';
        }
        
    });

</script>
<Navbar>
    <div class="flex md:order-2 space-x-4">      
        <Button size="sm" on:click={pdfClicked}>
            <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m6 4v5h1.4a1.6 1.6 0 0 0 1.6-1.6v-1.8a1.6 1.6 0 0 0-1.6-1.6H11Z"/>
              </svg>
            .PDF 
        </Button>
        
        <Button size="sm" on:click={csvClicked}>
            <svg class="w-6 h-6 text-white dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1v6M5 19v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1M10 3v4c0 .6-.4 1-1 1H5m2.7 9h-1A1.6 1.6 0 0 1 5 15.4v-1.8A1.6 1.6 0 0 1 6.6 12h1m8.4 0 1.4 4.8L19 12m-6-.2h-1a1.3 1.3 0 0 0-1.4 1.2 1.3 1.3 0 0 0 1.2 1.5h.5a1.3 1.3 0 0 1 1.3 1.7c-.2.6-.7.8-1.4.8h-1"/>
            </svg>
             .CSV
           
        </Button>

        <NavHamburger />
    </div>
    <NavUl class="order-1">
      <NavLi href="/" active={true}>Home</NavLi>
    </NavUl>
</Navbar>
<div class="">
    <div class="{progress_blink} mb-1 text-base font-medium {progress_color}  dark:text-blue-500">{progress_status}</div>
    <Progressbar progress={progress_value.toFixed(2)} color="blue" size="h-4" labelInside/>
</div>
<div class="flex items-center mt-3 mr-2 justify-end text-base font-medium text-blue-500">
    <input class="mr-2" type="checkbox" bind:checked={withErrorChecked}>
    <span class="mr-2 whitespace-nowrap text-sm">Filtrar feições com erros</span>
</div>
<div>
    <div class = "m-2 p-1 grid gap-2 md:grid-cols-3 grid-cols-1">
        {#each listaComplexType as complexType}
            <WFSComplexTypeCard complexType={complexType} ></WFSComplexTypeCard>
        {/each}
          
    </div>
</div>