<script lang="ts">
    
    const hidden = 'hidden'
    const block = 'block'
    let show_mobile_menu = 'hidden'
    
    function btnMenuClicked()  {
        show_mobile_menu = (show_mobile_menu == hidden)?block: hidden

    }

</script>

<nav class="flex items-center flex-wrap p-1 bg-gray-700 text-white">
    
        <!--brand-->
        <div class="flex items-center rounded hover:bg-blue-800 p-2">
            <a class="inline-flex items-center mr-3" href="#">
                <svg class=" h-6 w-6 ml-2  text-blue-300" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </a>
            <span class="font-bold uppercase tracking-wider">WMS checker</span>
        </div>
        <!--btn-->
        <button class="inline-flex p-2 text-white rounded hover:bg-blue-800 ml-auto md:hidden" on:click="{btnMenuClicked}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
        </button>
         <!--links-->
        <div class="{show_mobile_menu} w-full flex-grow md:inline-flex md:w-auto">
            <div class="flex flex-col md:inline-flex md:flex-row md:ml-auto">
                <a class="mx-1 p-2 font-bold text-white hover:bg-blue-800  hover:rounded transition duration-300" href="#">Dashboard 1</a>
                <a class="mx-1 p-2 font-bold text-white hover:bg-blue-800  hover:rounded transition duration-300" href="#">Dashboard 2</a>
                <a class="mx-1 p-2 font-bold text-white hover:bg-blue-800  hover:rounded transition duration-300" href="#">Dashboard 3</a>
                <a class="mx-1 p-2 font-bold text-white hover:bg-blue-800  hover:rounded transition duration-300" href="#">Dashboard 4</a>
            </div>
            
        </div>
</nav>