import {jsPDF} from "jspdf"

/**
 * @param {HTMLElement} anElementHTML
 */
export function bodyToPDF(anElementHTML) {
    const doc = new jsPDF();
    console.log("Gerando pdf...");
    const elementHTML = anElementHTML || document.body;
    
    doc.html(elementHTML, {
        callback: function(doc) {
            // Save the PDF
            
            doc.save('doc.pdf');
        },
        
        margin: [10, 10, 10, 10],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 190, //target width in the PDF document
        windowWidth: 860 //window width in CSS pixels
    });
}