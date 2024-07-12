<script>
    import { fade } from 'svelte/transition'
    let bgColor = 'bg-gray-200';
    
    /**
     * @type {ComplexType[]}
     */
    export let complexType;
    
    
    function formatProperty(elementProperty) {
        return `${elementProperty.name} :  ${elementProperty.typeVar}[${elementProperty.minOccurs}..${elementProperty.maxOccurs}]`
    }
    
    
    function hasEspecialChar(aString) {
        const regex = /[^\w_]/;
        return regex.test(aString);
    }

</script>
<div class= "font-semibold p-2 {bgColor} text-sm text-left text-gray-800  rounded-md shadow-sm hover:shadow-md flex flex-col"  transition:fade>
        <h2 class="">Tipo da Feição: {complexType.name}</h2>
        <h2 class="font-thin">Quantidade de attributos: {complexType.elementProperties.length}</h2>
       {#each complexType.elementProperties as elementProperty}
            {#if hasEspecialChar (elementProperty.name)}
                <h2 class="text-red-600">{formatProperty(elementProperty)}</h2>
            {:else}
                <h2>{formatProperty(elementProperty)}</h2>
            {/if}
        {/each} 
</div>