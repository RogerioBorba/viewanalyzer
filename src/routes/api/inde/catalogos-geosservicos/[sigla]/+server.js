import { error, fail, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    try {
        //console.log(event)
        const iri = 'https://inde.gov.br/api/catalogo/get'
        const response = await fetch(iri)
        if(!response.ok) throw error(500, `O servidor não conseguiu responder adequadamente a requisição`);
        const content = await response.json()
        let arr = Object.entries(content).find((arr) => { return arr[1].descricao.toLowerCase().startsWith(event.params.sigla.toLowerCase())})
        //console.log(Object.entries(content)[1][1].descricao)
        if (arr)
            return json(arr[1])
        else
            throw error(404, "Recurso não encontrado")
        //return new Response(JSON.stringify(content), {status: 200, headers: {'content-type': 'application/json'}});   
    } catch (erro) {
        throw erro
    }
}