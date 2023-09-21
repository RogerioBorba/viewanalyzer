
<script>
    import {dataToPdf} from '$lib/component/pdf/gerarPDF'
    /**
     * @type {Array<object>}
     */
     export let listJsonObject;
     /**
     * @type {String}
     */
     export let header = '';

    function elementHTMLToPDF() {
        dataToPdf(listJsonObject, header)        
    }
</script>
<button class="fixed top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-full" on:click={elementHTMLToPDF}>
    Gerar PDF 
</button>