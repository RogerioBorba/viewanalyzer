<script>
    export let metadata;
    export let processSteps;
</script>

<div class="flex items-center mt-5 ml-3">
    <p class="ml-2 mb-2 font-semibold text-lg">Linhagem</p>
  </div>
  {#if metadata.getDataQualityInfo() !== null && metadata.getDataQualityInfo().getLineage() !== null }
  <div class=" flex p-3 w-2/3 ml-5 mb-1 border-t-2 border-gray-400">
    <div class="flex-1">
      <p class="font-semibold ">Declaração</p>
    </div>
    <div class="flex-1">
      <p class="text-justify">{metadata.getDataQualityInfo().getLineage()}</p>
    </div>
  </div>   
{/if}

{#if processSteps}
  <div class=" flex p-3 w-2/3 ml-5 mb-1 border-t-2 border-b-2 border-gray-400 bg-white">
      <div class="flex-1">
        <p class="font-semibold ">Etapas de produção</p>
      </div>
      <div class="flex-1">
            <ul>
              {#each processSteps as processStep}
                <li class="text-justify">{processStep}</li>
              {/each}
            </ul> 
      </div>
  </div>
{/if}

{#if metadata.getDataQualityInfo() !== null && metadata.getDataQualityInfo().getSupplies() !== null }
  <div class=" flex p-3 w-2/3 ml-5 mb-1 border-t-2 border-b-2 border-gray-400">
    <div class="flex-1">
      <p class="font-semibold ">Insumos</p>
    </div>
    <div class="flex-1">
      <p class="text-justify">{metadata.getDataQualityInfo().getSupplies()}</p>
    </div>
  </div>   
{/if}