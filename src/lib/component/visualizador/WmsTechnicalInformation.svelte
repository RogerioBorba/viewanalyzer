<script>
    export let metadata
</script>

<div class="flex items-center mt-5 mb-2 ml-3">
    <p class="ml-2 mb-2 font-semibold text-lg">Informação técnica</p>
  </div>


  {#if metadata.getIdentificationInfo().spatialRepresentationType()}
     <div class=" flex p-3 w-2/3 ml-5 border-t-2 border-gray-400">
      <div class="flex-1">
        <p class="font-semibold ">Tipo de representação</p>
      </div>
      <div class="flex-1">
        <p>{metadata.getIdentificationInfo().spatialRepresentationType()}</p>
      </div>
    </div> 
  {/if}
  
  {#if metadata.getIdentificationInfo().scale()}
     <div class=" flex p-3 w-2/3 ml-5 border-t-2  border-gray-400">
      <div class="flex-1">
        <p class="font-semibold ">Escala</p>
      </div>
      <div class="flex-1">
        <p>{metadata.getIdentificationInfo().scale()}</p>
      </div>
    </div> 
  {/if}

  {#if metadata.getDistributionInfo() !== null && metadata.getDistributionInfo().metadataFormat()}
    <div class=" flex p-3 w-2/3 ml-5 border-t-2  border-gray-400">
      <div class="flex-1">
        <p class="font-semibold ">Formato</p>
      </div>
      <div class="flex-1">
        <p>{metadata.getDistributionInfo().metadataFormat()}</p>
      </div>
    </div>   
  {/if}

  {#if metadata.getReferenceSystemInfo() !== null && metadata.getReferenceSystemInfo().getCoordinateReference() !== null}
    <div class=" flex p-3 w-2/3 ml-5 border-t-2  border-gray-400">
      <div class="flex-1">
        <p class="font-semibold ">Sistema de referência de coordenadas</p>
      </div>
      <div class="flex-1">
        <p>{metadata.getReferenceSystemInfo().getCoordinateReference()}</p>
      </div>
    </div>   
  {/if}