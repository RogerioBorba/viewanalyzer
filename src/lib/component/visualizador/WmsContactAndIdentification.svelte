<script>
    export let email;
    export let metadata;
    export let keywords;
</script>

<div class="flex items-center mt-5 ml-3">
    <p class="ml-2 mb-2 font-semibold text-lg">Informação de contato e identificação</p>
  </div>
  <div class=" flex p-3 w-2/3 mt-4 ml-5 border-t-2 border-b-2 border-gray-400 bg-slate-200">
    <div class="flex-1">
      <p class="font-semibold ">Email</p>
    </div>
    <div class="flex-1">
      {#if email}
          <p>{email}</p>
      {:else if metadata.getDistributionInfo().getDistributors().email}
        <p>{metadata.getDistributionInfo().getDistributors().email}</p>
      {:else}
        <p>Sem email associado</p>
      {/if}
    </div>
  </div>

  <div class=" flex p-3 w-2/3 ml-5 border-t-2 border-b-2 border-gray-400 bg-white">
    <div class="flex-1">
      <p class="font-semibold ">Palavras Chaves</p>
    </div>
    <div class="flex-1">
      {#if keywords !== "Sem palavras-chaves associadas"}
          <ul>
            {#each keywords as keyword}
              <li>{keyword}</li>
            {/each}
          </ul> 
      {:else}
        <p>Sem palavras chaves associadas</p>
      {/if}
    </div>
  </div>

  <div class=" flex p-3 w-2/3 ml-5 border-t-2 border-b-2 border-gray-400 bg-slate-200">
    <div class="flex-1">
      <p class="font-semibold ">Estado</p>
    </div>
    <div class="flex-1">
      {#if metadata.getIdentificationInfo && metadata.getIdentificationInfo().status && typeof metadata.getIdentificationInfo().status === 'function'}
        {#if metadata.getIdentificationInfo().status() === "completed" }
          <p>Completo</p>
        {:else if metadata.getIdentificationInfo().status() === "onGoing"}
          <p>Em andamento</p>
        {:else}
          <p>{metadata.getIdentificationInfo().status()}</p>
        {/if}
      {:else}
        <p>Sem status associado</p>
      {/if}
    </div>
  </div>