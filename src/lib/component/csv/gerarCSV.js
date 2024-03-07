/*Operações para criar csv de wms */
function wmsObjToCSV(obj) {
    let csvString = '';
    csvString += obj['Nome'] + ';' +
        obj['Título'] + ';' +
        obj['Palavras Chave'] + ';' +
        obj['Estilo'] + ';' +
        obj['Crss'] + ';';
        if (Array.isArray(obj.Link_metadados) && obj.Link_metadados.length > 0) {
            csvString += obj.Link_metadados.join(' - ') + "\n";
        } else {
            csvString += "Sem metadado associado\n";
        }

    return csvString;
}

export function wmsListToCSV(elements) {
    let csvFile = 'nome;titulo;palavras_chave;estilo;crss;link_metadado\n';


    elements.forEach(complexType => {
        csvFile += wmsObjToCSV(complexType);
    })

    const filename = 'tipo_feicao.csv';
    csvDownload(csvFile, filename);

}

export function csvDownload(csvFile, filename){
        // Cria um Blob com o conteúdo CSV
        //const lista = listaComplexType //.map(complexType => toJsonObject(complexType))
        //const csvFile = listOfWmsToCsv(elements)
        const blob = new Blob([csvFile], { type: "text/html; charset=utf-8;" });
        //const filename = 'tipo_feicao.csv'
        // Cria um link de download
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


//Inicio de criação de CSV para WFS
function wfsObjToCSV(obj) {
    let csvString = '';
    csvString += obj["Nome"] + ';' +
    obj["Título"] + ';' +
    obj["Palavras-chaves"] + ';' +
    obj['Default SRS'] + ';' +
    obj['Tipo do Metadado'] + ';' +
    obj['Link do Metadado'] + '\n'

    return csvString
}


export function wfsToCSV(elements) {
    console.log(elements)
    let csvFile = 'nome;titulo;palavras_chave;default_srs;tipo_metadado;link_metadado\n';


    elements.forEach(complexType => {
        csvFile += wfsObjToCSV(complexType);
    })

    const filename = 'catalogo_wfs.csv';
    csvDownload(csvFile, filename);
}


//CSV - Keywords - WFS 
function keywordsToString(keyword){
    let csvString = '';
    csvString += keyword.palavra_chave + ";" +
    keyword.quantidade + "\n"

    return csvString
}

export function keywordsToCSV(elements) {
   
    let csvFile = 'palavra_chave;quantidade\n';
    elements.forEach(keywords => {
      csvFile += keywordsToString(keywords);
    })

    let fileName = "palavras_chave.csv";
    csvDownload(csvFile,fileName)
}