<script>
    import GeoJSON from 'ol/format/GeoJSON.js';
    import Layer from 'ol/layer/Layer.js';
    import Map from 'ol/Map.js';
    import OSM from 'ol/source/OSM.js';
    
    import VectorSource from 'ol/source/Vector.js';
    import View from 'ol/View.js';
    import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';
    import TileLayer from 'ol/layer/WebGLTile.js';
    import { onMount } from 'svelte';
    
    onMount(async () => {
        /** @type {import('ol/style/literal.js').LiteralStyle} */
        const style = {
        'stroke-color': ['*', ['get', 'COLOR'], [220, 220, 220]],
        'stroke-width': 1.5,
        'fill-color': ['*', ['get', 'COLOR'], [255, 255, 255, 0.6]],
        };

        class WebGLLayer extends Layer {
        createRenderer() {
            return new WebGLVectorLayerRenderer(this, {
            style,
            });
        }
        }

        const osm = new TileLayer({
        source: new OSM(),
        });

        const vectorLayer = new WebGLLayer({
        source: new VectorSource({
            url: 'https://openlayers.org/data/vector/ecoregions.json',
            format: new GeoJSON(),
        }),
        });

        const map = new Map({
        layers: [osm, vectorLayer],
        target: 'map',
        controls:[],
        view: new View({
            center: [0, 0],
            zoom: 1,
        }),
        });    
    });
    
</script>
<div id="map" class="fixed w-full h-full z-0"></div>