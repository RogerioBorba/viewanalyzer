<script>
    import {  Tabs, TabItem} from 'flowbite-svelte';
    import BaseWFS from './BaseWFS.svelte'  
    import WfsSearchByNomeTitulo from './WFSSearchByNomeTitulo.svelte';
	import WfsPesquisaEspacial from './WFSPesquisaEspacial.svelte';
</script>
    
<Tabs style="underline" >
    <TabItem open title='Por instituição'>
        <BaseWFS></BaseWFS>
        
    </TabItem>
    <TabItem title='Por nome ou título'>
        <WfsSearchByNomeTitulo/>
        
    </TabItem>
    <TabItem title='Por palavra chave'>
        
    </TabItem>

    <TabItem title='Pesquisa espacial'>
        <WfsPesquisaEspacial/>
    </TabItem>
</Tabs>