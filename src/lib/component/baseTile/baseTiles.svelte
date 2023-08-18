<script>
    import {facadeOL } from '$lib/store/storeMap';   
    import {FacadeOL, osmBaseTile, googleBaseTile, nullBaseTile} from '$lib/component/openlayers/facade_openlayers.js';
    import { onMount } from 'svelte';
    let camadaEscolhida = 'osm';

    function onChangeBaseLayer(event) {
        const baseLayerNameOrNull = event.currentTarget.value
        console.log("baseLayerNameOrNull: ", baseLayerNameOrNull  )
        $facadeOL.setBaseLayer(baseLayerNameOrNull)
    }

    onMount(async () => {
        if ($facadeOL === null) 
         facadeOL.set(new FacadeOL());  
    });

</script>
<div class="flex flex-col text-justify text-sm pl-4 text-sm whitespace-nowrap" >
    <div class="mt-1">
        <input  type=radio bind:group={camadaEscolhida} value='none' on:change={onChangeBaseLayer}>
        Sem camada base
    </div>
    <div class="mt-1">
        <input type=radio bind:group={camadaEscolhida} value='osm' on:change={onChangeBaseLayer}>
        Camada base Openstreetmap
    </div>
    <div class="mt-1">
        <input type=radio bind:group={camadaEscolhida} value='google' on:change={onChangeBaseLayer}>
        Camada base Google Maps
    </div>
    
</div>