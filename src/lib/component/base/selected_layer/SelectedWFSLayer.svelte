<script>
    import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
    import { selectedLayers, removedLayers } from '$lib/store/storeMap';
    import { onMount } from 'svelte';
    export let dataLayer;
    let hidden = 'hidden';
    let linkLegenda = '';
    let colorInput;
    let selectedColor = dataLayer.color; 

   
    
    function hexToRGBA(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        console.log("MEU RGBA" + `rgba(${r}, ${g}, ${b}, 0.7`)
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }
    

    function btnClearClicked() {
        if (!dataLayer) return;
        $selectedLayers = $selectedLayers.filter(t => t.oid !== dataLayer.oid);
        console.log(dataLayer);
        dataLayer.layer.map.removeLayer(dataLayer.layer);
        $removedLayers = [...$removedLayers, dataLayer];        
    }

    function errorCallback() {
        alert(`O endereço da legenda não foi encontrado: ${linkLegenda}`);
    }
    
    function openColorPicker() {

        colorInput.click(); 
    }

    function dinamicStyle(newColor){
        let geometryType = dataLayer.geometria;
        if(geometryType === "LineString" || geometryType === "MultiLineString"){
                console.log("A geometria é LineString ou MultilineString")
                return new Style({
                    stroke: new Stroke({color: newColor, width: 2})
                })
            }
            return new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({ color: newColor}), 
                    stroke: new Stroke({ color: '#000', width: 1 })
                }),
                fill: new Fill({ color: newColor }),  
                stroke: new Stroke({ color: '#000', width: 1 })
            });

    }

    function updateLayerColor() {
        const newColorValue = hexToRGBA(selectedColor);
        selectedColor = newColorValue;
        let newStyle = dinamicStyle(newColorValue)
        dataLayer.layer.setStyle(newStyle);
        
        
    }


</script>

<div class="flex mt-1 relative text-gray-700">
    <p class="mt-1 flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" title="{`${dataLayer.title()} - ${dataLayer.feicoes} ${dataLayer.feicoes > 1 ? "feições" : "feição"}`}">
        {`${dataLayer.title()} - ${dataLayer.feicoes} ${dataLayer.feicoes > 1 ? 'feições' : 'feição'}`}
    </p>
  
    <input type="color" bind:value={selectedColor} bind:this={colorInput} on:input={(e) => updateLayerColor(e.target.value)} style="display: none;" />

    
    <button class="mb-4 focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200"
        on:click|preventDefault={openColorPicker} title="Cor">
        <svg class="w-5 h-5 text-{selectedColor ? dataLayer.color: selectedColor} dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={selectedColor} viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7h.01m3.486 1.513h.01m-6.978 0h.01M6.99 12H7m9 4h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 3.043 12.89 9.1 9.1 0 0 0 8.2 20.1a8.62 8.62 0 0 0 3.769.9 2.013 2.013 0 0 0 2.03-2v-.857A2.036 2.036 0 0 1 16 16Z"/>
        </svg>
    </button>

    <button class="mb-4 focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|stopPropagation={btnClearClicked} title="Remover camada">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
    </button>    
</div>



