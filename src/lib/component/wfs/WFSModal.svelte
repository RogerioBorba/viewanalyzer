<script>
  import { onMount } from "svelte";
  import { getAttributes } from "./WFSModalActions";
  import { add_attribute } from "svelte/internal";

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

    let operadoresLogicos = ["AND", "OR", "NOT"];
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
        console.log("link" + link )
        console.log("wfsName" + wfsName);
        let newAttributes = await getAttributes(wfsName,link);
        attributes = newAttributes;
        console.log("Attributes" + attributes)

    })

    function addAtribute(selectedAttribute){
        search+= selectedAttribute + " ";
    }

    function addOperator(selected){
        search+= selectedOperator + " ";
    }


    function addLogicalOperator(selectedLogicalOperator) {
        search+= selectedLogicalOperator + " ";
    }




    function buildFilter() {
        //const logicalOperators = getLogicalOperators(search)
        console.log("link" + link);
        console.log("wfsname" + wfsName)
        console.log("search " + search);
    }
</script>

{#if isOpen}
    <div id="default-modal" tabindex="-1" aria-hidden={!isOpen} class="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full max-h-full">
        <div class="relative p-4 w-full max-w-5xl max-h-5xl">
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
                    
                    

                    <form on:submit|preventDefault={buildFilter} class="flex items-center max-w-full mx-auto space-x-4">   
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
                            <input type="text" id="records" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="1000" required />
                        </div>
                        <button type="submit"  class="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>

                    <div class="content-start">
                        <select bind:value={selectedAttribute}>
                            <option hidden>Selecione um atributo</option>
                            {#each attributes as attribute}
                                <option value={attribute}>{attribute}</option>
                            {/each}
                        </select>
                        <button type="button" on:click={() => addAtribute(selectedAttribute)} class="mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Selecionar atributo</button>
                        
                        <select bind:value={selectedOperator}>
                            <option hidden>Selecione um operador</option>
                            {#each operadores as operador}
                                <option value={operador.symbol}>{operador.symbol}</option>
                            {/each}
                        </select>
                        <button type="button" on:click={() => addOperator(selectedOperator)} class="mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Selecionar operador</button>

                        <select bind:value={selectedLogicalOperator}>
                            <option hidden>Selecione um operador lógico</option>
                            {#each operadoresLogicos as operadorLogico}
                                <option value={operadorLogico}>{operadorLogico}</option>
                            {/each}
                        </select>
                        <button type="button" on:click={() => addLogicalOperator(selectedLogicalOperator)} class="mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Selecionar operador lógico</button>
                    </div>
                    
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button on:click={closeModal} class="bg-blue-700 text-white px-5 py-2.5 rounded-lg">I accept</button>
                    <button on:click={closeModal} class="bg-white text-gray-900 px-5 py-2.5 ms-3 rounded-lg border hover:bg-gray-100">Decline</button>
                </div>
            </div>
        </div>
    </div>
{/if}