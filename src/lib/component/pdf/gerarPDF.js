import {jsPDF} from "jspdf"

/**
 * @param {HTMLElement} anElementHTML
 */
export function bodyToPDF(anElementHTML) {
    const doc = new jsPDF('p', 'pt', 'letter');
       
    console.log("Gerando pdf...");
    const elementHTML = anElementHTML || document.body;
    
    doc.html(elementHTML, {
        callback: function(doc) {
            // Save the PDF
            
            doc.save('doc.pdf');
        },
        
        margin: [10, 10, 10, 10],
        autoPaging: 'html',
        x: 0,
        y: 0,
        width: 550, //target width in the PDF document
        windowWidth: 900 //window width in CSS pixels
        
    });
};


/**
 * @param {Array<object>} jsonList
 * @param {String} header
 */
export function dataToPdf(jsonList, header = '', itemsPerPage = 30) {
    const doc = new jsPDF('p', 'pt', 'letter');
    doc.setFont("courier", "bold");

    let currentPage = 1;
    let line = 20;

    function createNewPage() {
        doc.addPage();
        doc.setFont("courier", "bold");
        if (header.length > 0) {
            doc.text(header, 20, 0);
        }
        line = 20;
        currentPage++;
    }

    console.log("Gerando pdf...");

    if (jsonList.length === 0) {
        return console.log("Array is empty");
    }

    for (let i = 0; i < jsonList.length; i++) {
        if (line > doc.internal.pageSize.height - 20) {
            createNewPage();
        }

        doc.setFont("courier", "bold");
        for (const [key, value] of Object.entries(jsonList[i])) {
            doc.setFontSize(10); // Defina o tamanho da fonte desejado aqui (por exemplo, 12)
            const maxWidth = doc.internal.pageSize.width - 40; // Largura máxima da linha
            const lines = doc.splitTextToSize(`${key}: ${value}`, maxWidth);

            // Adicionar um retângulo de fundo cinza claro
            const lineHeight = lines.length * 10;
            doc.setFillColor(240, 240, 240); // Cor cinza claro
            doc.rect(18, line - 6, maxWidth + 6, lineHeight + 10, 'F'); // 'F' indica que é um retângulo preenchido
            
            // Adicionar o texto acima do retângulo
            doc.setTextColor(0, 0, 0); // Definir a cor do texto para preto
            doc.text(lines, 20, line);

            // Atualizar a linha com base no número de linhas de texto adicionadas
            line += lineHeight;
        }

        line += 22;

        // Verifica se é necessário criar uma nova página a cada "itemsPerPage" itens
        if (i > 0 && i % itemsPerPage === 0) {
            createNewPage();
        }
    }

    doc.save("relatorio.pdf");
}
