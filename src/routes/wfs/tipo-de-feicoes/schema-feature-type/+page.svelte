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
    /*** @type {any[]}*/
    let listaComplexTypeAsJson = [];
    //variables to Progress component
    let progress_value  = 0;
    let progress_status = 'processando ...';
    let progress_blink = 'animate-pulse';
    let progress_color =  'text-gray-600';
    let progress_bin = 0.0;
    
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
                const arrCompleType = await complexTypeList(xml_text)
                updateProgress()
                listaComplexType = listaComplexType.concat(arrCompleType)
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
    <div class="flex md:order-2">
        <!--<Button class= "mx-2" size="sm" on:click={csvClicked}>CSV</Button>-->
        
        <Button size="sm" on:click={pdfClicked}>PDF</Button>
        <Button size="sm" on:click={csvClicked}>CSV</Button>

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
<div>
    <div class = "m-2 p-1 grid gap-2 md:grid-cols-3 grid-cols-1">
        {#each listaComplexType as complexType}
            <WFSComplexTypeCard complexType={complexType} ></WFSComplexTypeCard>
        {/each}
          
    </div>
</div>