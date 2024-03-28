import { MD_Metadata } from "$lib/ISO/19115/MdMetadata";

export function cswToObject(array){
    let arrayCSW = [];
    array.forEach(element => {
        let obj = new MD_Metadata(element);
        let metadataObj = {
            'Título': obj.getIdentificationInfo().title(),
            'Status': obj.getIdentificationInfo().status(),
            'Resumo': obj.getIdentificationInfo().abstractInfo(),
            'Palavras-chaves': obj.getIdentificationInfo().keywords(),
            'Padrão de Metadados' : obj.metadataStandardName()
        }
        if(obj.getDistributionInfo())
            metadataObj['Protocolos'] = obj.getDistributionInfo().onLineProtocols();

        else{
            metadataObj['Protocolos'] = 'Sem protocolos associados'
        }
        arrayCSW = [...arrayCSW, metadataObj]
       

    })
    
    return arrayCSW;
    //dataToPdf(arrayCSW);
}