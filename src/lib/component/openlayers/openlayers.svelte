<script>
    import {FacadeOL} from '$lib/component/openlayers/facade_openlayers.js';
    import {facadeOL} from '$lib/store/storeMap';
    import { onMount } from 'svelte';
    
    onMount(async () => {
        if ($facadeOL === null) 
            facadeOL.set(new FacadeOL());  
    });
      
    </script>
    <div id="id_map" class="fixed w-full h-full z-0"></div>