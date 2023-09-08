<script>
    import { ComplexType } from "$lib/xml-json/describeFeatureType";
    import { fade } from 'svelte/transition'
    let bgColor = "red"
    
    /**
     * @type {ComplexType[]}
     */
    export let complexType;
    
    
    function formatProperty(elementProperty) {
        return `${elementProperty.name}: ${elementProperty.typeVar}[${elementProperty.minOcurrs}..${elementProperty.maxOccurs}]`
    }
</script>
<div class= "p-2 {bgColor} text-sm text-left text-gray-800  rounded-md shadow-sm hover:shadow-md flex flex-col"  transition:fade>
        <h2 class="font-semibold"> Nome do Tipo da Feição: {complexType.name}</h2>
       {#each complexType.elementProperties as elementProperty}
            <h2>{formatProperty(elementProperty)}</h2>
        {/each} 
</div>