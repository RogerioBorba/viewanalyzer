<script>
    import {  Tabs, TabItem} from 'flowbite-svelte';
    import WMSSearchByNomeTitulo from './WMSSearchByNomeTitulo.svelte'
    import BaseWMS from './BaseWMS.svelte'  
	import WmsSearchByPalavraChave from './WMSSearchByPalavraChave.svelte';
</script>
    
<Tabs style="underline" >
    <TabItem open title='Por instituição'>
        <BaseWMS></BaseWMS>
        
    </TabItem>
    <TabItem title='Por nome ou título'>
        <WMSSearchByNomeTitulo></WMSSearchByNomeTitulo>
        
    </TabItem>
    <TabItem title='Por palavra chave'>
        <WmsSearchByPalavraChave></WmsSearchByPalavraChave>
    </TabItem>
</Tabs>