<script>
    import {keywordCSWCountByName, allCSWKeywords, countCSWProcessado} from '$lib/store/storeMetadata';
    import { onMount } from 'svelte';
    import { arrayMDMetadata} from './metadado_util';
    export let  objIdDescricaoIriNoCentralCategoria = {}
    
    function countKeys(arrMetadataObj) {
        for(let i = 0; i < arrMetadataObj.length; i++ ) {
            let metaMetadata = arrMetadataObj[i]
            if (metaMetadata == null || metaMetadata.getIdentificationInfo() == null)
                continue
            let allKeys = metaMetadata.getIdentificationInfo().keywords()  
            $allCSWKeywords = $allCSWKeywords.concat(allKeys)
            
            for (let j = 0; j < allKeys.length; j++) {
                let keyword = allKeys[j]
                let value = $keywordCSWCountByName[keyword]
                if (value) 
                    $keywordCSWCountByName[keyword] = value + 1 
                else 
                    $keywordCSWCountByName[keyword] = 1 
            }
        }  
    } 
    
    onMount(async () => {
        try {
            let arrMDMetadata = await arrayMDMetadata(objIdDescricaoIriNoCentralCategoria);
            countKeys(arrMDMetadata)
            $countCSWProcessado = $countCSWProcessado + 1
                
        } catch (error) {
            console.log("Erro em CSWKeywordCard>>onMount")            
            console.log(error)            
        }  
    });
</script>

