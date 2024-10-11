<script>
  import { onMount } from "svelte";
  import { getAttributes, getFeatures } from "./WFSModalActions";
  import { add_attribute } from "svelte/internal";
  import { arrayMDMetadata } from "../csw/metadado_util";

    let visibility = 'invisible';
    export let isOpen = false;
    export let link;
    export let closeModal;
    export let wfsName;
    //export let attributes
    let attributes = [];
    
    //pegando os itens selecioandos pelo usuário
    let selectedAttribute;
    let searchAttributes = [];
    let selectedOperator;
    let searchOperators = []
    let selectedLogicalOperator;
    let searchLogicalOperators = [];
    let search = '';
    let consulta = ''
    let count = 1000;

    //resultado das propriedades
    let propiertiesResult = [];

    let operadoresLogicos = ["And", "Or"];
    //let operadores = ["=","!=",">","<",">=","<="]

    let operadores = [
    { name: "PropertyIsEqualTo", symbol: "=" }, 
    { name: "PropertyIsNotEqualTo", symbol: "!=" },
    { name: "PropertyIsGreaterThan", symbol: ">" },
    { name: "PropertyIsLessThan", symbol: "<" },
    { name: "PropertyIsGreaterThanOrEqualTo", symbol: ">=" },
    { name: "PropertyIsLessThanOrEqualTo", symbol: "<=" }
    ];


    onMount(async() => {
        //console.log("link" + link )
        //console.log("wfsName" + wfsName);
        let newAttributes = await getAttributes(wfsName,link);
        attributes = newAttributes;
        //console.log("Attributes" + attributes)

    })

    function addAtribute(selectedAttribute){
        if(selectedAttribute === "Atributo"){
            alert('Selecione um atributo')
            return;
        }
        search+= selectedAttribute + " ";
    }

    function addOperator(selected){
        if(selected === "Condição"){
            alert('Selecione uma condição');
            return;

        }
        search+= selectedOperator + " ";
    }


    function addLogicalOperator(selectedLogicalOperator) {
        if(selectedLogicalOperator === "Operador Lógico"){
            alert("Selecione um operador lógico");
            return;
        }

        search+= selectedLogicalOperator + " ";
    }


    function buildFilter(selectedByUser) {
        let filterXML = "<Filter>";
        let currentLogicalOperator = null;
        let currentComparisonOperator = null;
        let currentProperty = null;

        // Encontra o operador lógico para colocar logo após o <Filter>
        const logicalOperator = selectedByUser.find(el => operadoresLogicos.includes(el));

        if (logicalOperator) {
            filterXML += `<${logicalOperator}>`; // Adiciona o operador lógico logo após <Filter>
        }

        selectedByUser.forEach((element, index) => {
            // Verifica se o elemento é um operador de comparação (=, >=, etc.)
            if (operadores.some(op => op.symbol === element)) {
                currentComparisonOperator = operadores.find(op => op.symbol === element).name;
            } 
            // Verifica se é uma propriedade ou valor literal
            else if (!operadoresLogicos.includes(element)) {
                // Se já temos o operador de comparação, estamos processando a comparação
                if (currentComparisonOperator) {
                    let literalValue = element;

                    // Verifica se o próximo elemento deve ser um valor com múltiplas palavras
                    if (index + 1 < selectedByUser.length && 
                        !operadores.some(op => op.symbol === selectedByUser[index + 1]) && 
                        !operadoresLogicos.includes(selectedByUser[index + 1])) {
                        for (let i = index + 1; i < selectedByUser.length; i++) {
                            if (!operadores.some(op => op.symbol === selectedByUser[i]) && !operadoresLogicos.includes(selectedByUser[i])) {
                                literalValue += " " + selectedByUser[i];
                                index = i;
                            } else {
                                break;
                            }
                        }
                    }

                    filterXML += `<${currentComparisonOperator}><PropertyName>${currentProperty}</PropertyName><Literal>${literalValue}</Literal></${currentComparisonOperator}>`;
                    currentComparisonOperator = null; // Reseta o operador de comparação
                } else {
                    currentProperty = element; // Se não for operador, deve ser o nome da propriedade
                }
            }
    });

    // Fecha o operador lógico, se ele foi aberto
    if (logicalOperator) {
        filterXML += `</${logicalOperator}>`;
    }

    filterXML += "</Filter>";

    //const encodedFilter = encodeURIComponent(filterXML);
    console.log(filterXML);
    return filterXML;
}


    async function btnSearchClicked() {
        if(visibility === 'visible'){
            visibility = 'invisible'
        }

        let selectedByUser = search.split(' ');
        let filter = buildFilter(selectedByUser);
     
        console.log(count);
        let propierties = await getFeatures(wfsName,link,filter,count);
        

        propiertiesResult = propierties.map(info => {
            return attributes.map(atributo => {
                return info[atributo] !== null && info[atributo] !== undefined ? info[atributo] : "-";
            });
        })

        if(propiertiesResult.length === 0){
            visibility = 'visible'
        }
    }

    //Paginação

    let currentPage = 1;
    const rowsPerPage = 10;

    // Função para obter os dados da página atual
    $: paginatedData = propiertiesResult.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Função para calcular o número total de páginas
    $: total = Math.ceil(propiertiesResult.length / rowsPerPage);

    // Função para mudar de página
    function changePage(page) {
        if (page >= 1 && page <= total) {
            currentPage = page;
        }
    }
</script>

{#if isOpen}
    <div id="default-modal" tabindex="-1" aria-hidden={!isOpen} class="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed inset-0 z-50 w-full h-screen max-h-screen">
        <div class="relative p-4 w-full max-w-6xl max-h-screen">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Filtrar Feições
                    </h3>
                    <button on:click={closeModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 space-y-4">
                    <form on:submit|preventDefault={btnSearchClicked} class="flex items-center max-w-full mx-auto space-x-4">   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={search}  placeholder="Buscar" required />
                        </div>
                        <div class="flex items-center space-x-2">
                            <label for="records">Quantidade de registros:</label>
                            <input type="text" id="records" bind:value={count} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit"  class="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>

                    <div class="flex items-center space-x-4 justify-center">
                        <select bind:value={selectedAttribute} class="rounded-lg">
                            <option hidden>Atributo</option>
                            {#each attributes as attribute}
                                <option value={attribute}>{attribute}</option>
                            {/each}
                        </select>
                        <button type="button" on:click={() => addAtribute(selectedAttribute)} class="mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
                        
                        <select bind:value={selectedOperator} class="rounded-lg">
                            <option hidden>Condição</option>
                            {#each operadores as operador}
                                <option value={operador.symbol}>{operador.symbol}</option>
                            {/each}
                        </select>
                        <button type="button" on:click={() => addOperator(selectedOperator)} class="mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>

                        <select bind:value={selectedLogicalOperator} class="rounded-lg">
                            <option hidden>Operador Lógico</option>
                            {#each operadoresLogicos as operadorLogico}
                                <option value={operadorLogico}>{operadorLogico}</option>
                            {/each}
                        </select>
                        <button type="button" on:click={() => addLogicalOperator(selectedLogicalOperator)} class="mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
                    </div>
                

                    
                    {#if propiertiesResult.length > 0}
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-black uppercase dark:text-gray-400">
                                    <tr>
                                        {#each attributes as attribute}
                                            <th scope="col" class="px-6 py-3 bg-blue-600 dark:bg-gray-800 text-center text-xs text-white">
                                                {attribute}
                                            </th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each paginatedData as row}
                                        <tr class="border-b border-gray-200 dark:border-gray-700">
                                            {#each row as cel}
                                                <td class="whitespace-nowrap px-2 py-2 text-center text-black">
                                                    {cel} 
                                                </td>
                                            {/each}
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>

                        <!-- Botões de Paginação -->
                        <div class="flex justify-center mt-4">
                            <button 
                                class="text-white px-4 py-2 mx-1 bg-blue-700 rounded-md hover:bg-blue-800" 
                                on:click|preventDefault={() => changePage(currentPage - 1)} 
                                disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <p class="mt-3 text-sm ml-2 mr-2 ">{currentPage} de {total}</p>
                            <button 
                                class="text-white px-4 py-2 mx-1 bg-blue-700 rounded-md hover:bg-blue-800" 
                                on:click|preventDefault={() => changePage(currentPage + 1)} 
                                disabled={currentPage === total}>
                                Próximo
                            </button>
                        </div>
                    {/if}
                    <p class="{visibility} text-red-700 text-center text-xl">Não existem resultados para a busca</p>
                </div>
                <!-- Modal footer -->
                <!--
                <div class="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button on:click={closeModal} class="bg-blue-700 text-white px-5 py-2.5 rounded-lg">I accept</button>
                    <button on:click={closeModal} class="bg-white text-gray-900 px-5 py-2.5 ms-3 rounded-lg border hover:bg-gray-100">Decline</button>
                </div>
                -->
            </div>
        </div>
    </div>
{/if}