<script>
    import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Chevron, MegaMenu, UserCircle } from 'flowbite-svelte'
    let menuWMS = [
      {name: 'Catálogos', href: '/wms/catalogos'},
      {name: 'Palavras Chaves', href: '/wms/palavras-chaves'}, 
    ];
    
    let menuWFS = [
      {name: 'Catálogos', href: '/wfs/catalogos'},
      {name: 'Palavras Chaves', href: '/wfs/palavras-chaves'}, 
      {name: 'Tipo de Feições', href: '/wfs/tipo-de-feicoes'}, 
    ];

    let menuCSW = [
      {name: 'Catálogos ', href: '/csw/catalogos'},
      {name: 'Palavras Chaves ', href: '/csw/palavras-chaves'}, 
      {name: ' Quantidade WMS ', href: '/csw/metadados/protocolo-wms/quantidade'}, 
      {name: ' Quantidade WFS ', href: '/csw/metadados/protocolo-wfs/quantidade'}, 
    ];
  </script>
  
  <Navbar let:hidden let:toggle>
    
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="/">Home</NavLi>
      <NavLi class="cursor-pointer"><Chevron aligned>WMS</Chevron></NavLi>
      <MegaMenu items={menuWMS} let:item>
          <a href={item.href} class="flex items-center hover:text-purple-600 dark:hover:text-primary-500">
            <span class="sr-only">{item.name}</span>
            <svelte:component this={item.icon} class="w-4 h-4 mr-2" />{item.name}
          </a>
      </MegaMenu>
      <NavLi class="cursor-pointer"><Chevron aligned>WFS</Chevron></NavLi>
      <MegaMenu class="flex items-center" items={menuWFS} let:item>
        <a href={item.href} class="hover:text-purple-600 dark:hover:text-primary-500 mr-2">
          <span class="sr-only"> {item.name} </span>
          <svelte:component this={item.icon} class="w-4 h-4 mr-2" /> {item.name} 
        </a>
        </MegaMenu>
        <NavLi class="cursor-pointer"><Chevron aligned>CSW</Chevron></NavLi>
        <MegaMenu items={menuCSW} let:item>
            <a href={item.href} class="flex items-center hover:text-purple-600 dark:hover:text-primary-500">
              <span class="sr-only">{item.name}</span>
              <svelte:component this={item.icon} class="w-4 h-4 mr-2" />{item.name}
            </a>
        </MegaMenu>
        <NavLi href="/visualizador">Visualizador</NavLi>
    </NavUl>
  </Navbar>
  
  <h1 class="text-2xl text-center font-bold underline text-blue-400">
      Gestão DBDG!
  </h1>