import {jsPDF} from "jspdf"

/**
 * Connverte um array de objetos em um documento pdf. 
 * @param {Array<Object>} elements - O array é recebido  e os objetos que estão dentro dele que 
 * faram parte do pdf
 * @returns {void} 
 */

export function dataToPdf(elements) {
    /**
     * Gera um documento PDF com os elementos fornecidos.
     *
     * @param {Array<Object>} elements - Um array de objetos a serem incluídos no PDF.
     * @returns {jsPDF} - A instância jsPDF gerada.
     */

    let pdf = new jsPDF();


    /**
     * Posição vertical para adicionar uma nova linha
     * @type {number}
     * @description Valor inicial da posição Y no PDF
     */
    let y = 5;

    const pageHeight = pdf.internal.pageSize.height;

    pdf.setFont("courier", "bold");
    pdf.setFontSize(10);

    for (const objeto of elements) {
        // Iterando sobre as chaves e valores de cada objeto
        for (const [chave, valor] of Object.entries(objeto)) {
            // Obtendo a altura do texto
            const textHeight = pdf.getTextDimensions(`${chave}: ${valor}`).h;

            // Verifica se existe espaço para adicionar uma nova linha, se não, uma nova página e adicionada
            if (y + textHeight > pageHeight) {
                pdf.addPage();
                // Reinicia a posição Y na nova página
                y = 5; 
            }


            // Adiciona um retângulo colorido como background para cada linha
            pdf.setFillColor(240, 240, 240);

            // Ajuste as coordenadas e dimensões conforme necessário
            pdf.rect(10, y - 3, 190, textHeight + 3, 'F'); 

            // Adiciona o texto
            pdf.text(`${chave}: ${valor}`, 10, y);
            y+= textHeight+3
        }
        // Adciona uma "margem inferior" aos elementos que não pertecem ao mesmo bloco no laço for
        y+=10
    }

    pdf.save("relatorio.pdf");
}