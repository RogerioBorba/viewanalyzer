<!-- Modal.svelte -->
<script>
  import { currentModalLink } from "$lib/store/storeWFS";
  import { onMount } from "svelte";

    export let isOpen = false;
    export let attributes;
    export let closeModal;
    let link


    onMount(async() =>
        alert("OI")
    )
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