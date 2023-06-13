import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    try {
        //console.log(event)
        const iri = 'https://inde.gov.br/api/catalogo/get'
        const response = await fetch(iri)
        if(!response.ok) throw error(500, `O servidor não conseguiu responder adequadamente a requisição`);
        const content = await response.json()
        return json(content)
        //return new Response(JSON.stringify(content), {status: 200, headers: {'content-type': 'application/json'}});   
    } catch (erro) {
        throw erro
    }
}