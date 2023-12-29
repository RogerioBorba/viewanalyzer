<script>
    import { Progressbar, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input  } from 'flowbite-svelte';
    import { onMount } from "svelte";
    import { currentFeatureTypeElements, currentWFSGetCapabilities } from '$lib/store/storeWFS';
    import  WFSComplexTypeCard from '$lib/component/wfs/WFSComplexTypeCard.svelte'
    import { fetchData } from "$lib/request/requestData";
    import { complexTypeList } from '$lib/xml-json/describeFeatureType';
    import {dataToPdf} from '$lib/component/pdf/gerarPDF'
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
    
    function pdfClicked() {
        alert("asaosajsaosa")
        const lista = listaComplexType.map(complexType => toJsonObject(complexType))
        dataToPdf(lista, '')
    }
    
    function toJsonObject(complexType) {
        const attributes = complexType.elementProperties
        /*let objToPdf = {}
        objToPdf["Tipo de feição"] = complexType.name
        for (let j = 0; j < attributes.length; j++) {
            const attribute = attributes[j];
            const attributeName = attribute.getAttribute('name');
            const attributeType = attribute.getAttribute('type');
            const minOccurs = attribute.getAttribute('minOccurs');
            const maxOccurs = attribute.getAttribute('maxOccurs');
            objToPdf.attributeName = (`${attributeName} : ${attributeType}[${minOccurs}..${maxOccurs}]`);
        }
        return objToPdf*/
        console.log(JSON.stringify(complexType, null, 2))
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
      
        <Button size="sm" on:click={pdfClicked}>PDF</Button>

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