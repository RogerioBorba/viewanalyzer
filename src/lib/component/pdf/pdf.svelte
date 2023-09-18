
<script>
    import {bodyToPDF} from '$lib/component/pdf/gerarPDF'
    /**
     * @type {any}
     */
     export let elementHTML;

    function elementHTMLToPDF() {
        bodyToPDF(elementHTML)        
    }
</script>
<button class="fixed top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-full" on:click={elementHTMLToPDF}>
    PDF
</button>