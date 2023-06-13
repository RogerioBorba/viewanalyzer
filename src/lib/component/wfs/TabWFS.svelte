<script>
    import {  Tabs, TabItem} from 'flowbite-svelte';
    import BaseWFS from './BaseWFS.svelte'  
	
</script>
    
<Tabs style="underline" >
    <TabItem open title='Por instituição'>
        <BaseWFS></BaseWFS>
        
    </TabItem>
    <TabItem title='Por nome ou título'>
        
        
    </TabItem>
    <TabItem title='Por palavra chave'>
        
    </TabItem>
</Tabs>