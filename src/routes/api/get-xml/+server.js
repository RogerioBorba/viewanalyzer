import { catalogosWMSCapabilities } from '$lib/inde/CatalogoINDE';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    
    const an_url = url.search.substring(5);
    if (!an_url) throw error(400, 'O parâmetro url não consta na requisição');
    try {
        if (catalogosWMSCapabilities.includes(an_url))
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        const response = await fetch(an_url, { method: "GET",  headers: {"Content-type": 'application/xml'}})
        if(!response.ok) throw error(500, `O servidor não conseguiu responder adequadamente a requisição ${an_url}`);
        const content = await response.text()
        return new Response(content, {status: 200, headers: {'content-type': 'application/xml'}});
        
    } catch (erro) {
        throw erro
    }
   
    //return new Response(String(random));
  }