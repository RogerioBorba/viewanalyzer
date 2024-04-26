/**
 * As funções wmsObjToCSV e wmsListToCSV trabalham em conjunto. wmsObjToCSV pega cada elemento, um por vez,
 * e o coloca no padrão adequado para preencher o csv
 * @param {Object} obj - Obj é o elemento WMS a ser transformado 
 * @returns {String} - Retorna a String já padronizada para ser adicionada ao csv
 */

function wmsObjToCSV(obj) {
    let csvString = '';
    csvString += obj['Nome'] + ';' +
        obj['Título'] + ';' +
        obj['Palavras Chaves'] + ';' +
        obj['Estilo'] + ';' +
        obj['Crss'] + ';';
        if (Array.isArray(obj.Link_metadados) && obj.Link_metadados.length > 0) {
            csvString += obj.Link_metadados.join(' - ') + "\n";
        } else {
            csvString += "Sem metadado associado\n";
        }

    return csvString;
}

/**
 * wmsList recebe o array de objetos a serem transformados, adiciona o cabeçalho do csv e envia para wmsObjToCSV.
 * Após a padronização, os dados são enviados para csvDownload para realizar o download do CSV
 * 
 * @param {Object[]} elements - a lista de objetos WMS recebida 
 */

export function wmsListToCSV(elements) {
    let csvFile = 'nome;titulo;palavras_chave;estilo;crss;link_metadado\n';


    elements.forEach(complexType => {
        csvFile += wmsObjToCSV(complexType);
    })

    const filename = 'catalogo_wms.csv';
    csvDownload(csvFile, filename);

}


/**
 * Função geral responsável por fazer o download do csv
 * @param {String} csvFile - String já em formato csv
 * @param {String} fileName - O nome do arquivo desejado
 */
export function csvDownload(csvFile, fileName){
    const csvContent = '\uFEFF' + csvFile; // Adiciona BOM para compatibilidade com Excel
    const csvData = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

}


/**
 * As funções wfsObjToCSV e wfsToCSV trabalham em conjunto. wfsObjToCSV pega cada elemento, um por vez,
 * e o coloca no padrão adequado para preencher o csv
 * @param {Object} obj - Obj é o elemento WFS a ser transformado 
 * @returns {String} - Retorna a String já padronizada para ser adicionada ao csv
 */

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

/**
 * wfsToCSV recebe o array de objetos a serem transformados, adiciona o cabeçalho do csv e envia para wfsObjToCSV.
 * Após a padronização, os dados são enviados para csvDownload para realizar o download do CSV
 * 
 * @param {Object[]} elements - a lista de objetos WFS recebida 
 */
export function wfsToCSV(elements) {
    console.log(elements)
    let csvFile = 'nome;titulo;palavras_chave;default_srs;tipo_metadado;link_metadado\n';


    elements.forEach(complexType => {
        csvFile += wfsObjToCSV(complexType);
    })

    const filename = 'catalogo_wfs.csv';
    csvDownload(csvFile, filename);
}


/**
 * Adapta cada elemento para o formato csv
 * @param {*} keyword - objeto contendo palavra-chave e quantidade de vezes que elas aparecem
 * @returns {String} String pronta para ser adicionada ao arquivo no formato CSV 
 */

function keywordsToString(keyword){
    let csvString = '';
    csvString += keyword.palavra_chave + ";" +
    keyword.quantidade + "\n"

    return csvString
}

 /**
  * keyWordsToCSV é a função utilizada para as abas com palavras-chave. O cabeçalho do csv é adicionado 
  * e enviado keywordsToString para adaptar os objetos ao formato csv
  * @param {Object[]} elements - array de objetos contendo palavra-chave e quantidade 
  */

export function keywordsToCSV(elements) {
   
    let csvFile = 'palavra_chave;quantidade\n';
    elements.forEach(keywords => {
      csvFile += keywordsToString(keywords);
    })

    let fileName = "palavras_chave.csv";
    csvDownload(csvFile,fileName)
}


/**
 *  cswObjToCSV pega cada elemento, um por vez, e o coloca no padrão adequado para preencher o csv
 * @param {Object} obj - Obj é o elemento WFS a ser transformado 
 * @returns {String} - Retorna a String já padronizada para ser adicionada ao csv
 */
function cswObjToCSV(obj){
    let resumo = obj['Resumo'].replace(/\r\r\n/g, '\n').replace(/\r?\n/g, ' ');
    return `${obj['Título']};${obj['Status']};${resumo};${obj['Palavras-chaves']};${obj['Protocolos']};${obj['Padrão de Metadados']}\n`;
}


/**
 * cswToCSV recebe o array de objetos a serem transformados, adiciona o cabeçalho do csv e envia para cswObjToCSV.
 * Após a padronização, os dados são enviados para csvDownload para realizar o download do CSV
 * 
 * @param {Object[]} elements - a lista de objetos WFS recebida 
 */
export function cswToCSV(elements){
    let csvFile = "título;status;resumo;palavras_chaves;protocolos;padrao_de_metadados\n"
    elements.forEach(complexType => {
        csvFile += cswObjToCSV(complexType);
    });

    const fileName = 'catalogo_csw.csv';
    csvDownload(csvFile,fileName);

}


function metadataToString(metadata){
    console.log("metadata " + JSON.stringify(metadata))
    let csvString = '';
    csvString += metadata.nome + ";" + 
        metadata.url + ";" + 
        metadata.protocolo + ";" +
        metadata.erro + "\n"
    
    
        return csvString;
}


export function metadataToCSV(elements){
    let csvFile = "nome;url;protocolo;erro\n"
    elements.forEach(complexType => {
        csvFile+= metadataToString(complexType)
    })

    const fileName = 'links_quebrados.csv';
    csvDownload(csvFile,fileName);

}