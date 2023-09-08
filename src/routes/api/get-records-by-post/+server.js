import { error } from '@sveltejs/kit';
import {DOMParser}  from 'xmldom';
import {Agent} from 'https'
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) =>  {
  let data  = await request.json() //data = {url: url, body: body, content_type: content_type}
  
  try {
    console.log("URL:", data["url"])
    console.log("BODY:", data["body"])
    console.log("content_type", data["content_type"])
    console.log("-----------------------------------------------------------")
    const res = await fetch( data["url"], { method: "POST", body: data["body"], headers: {"Content-type": data["content_type"], agent: new Agent({ rejectUnauthorized: false }), }})
    if (res.status == 403) {
      console.log("Servidor não aceita POST")
      return new Response(`Servidor não aceita POST: ${data["url"]} e body: ${data["body"]}`, { status: 403});
    }
    const body = await res.text();
    const headers = { 'Content-Type': 'application/xml' }; 
    return new Response(body, { status: 200, headers: {"Content-type": data["content_type"]} });  
  
  } catch (error) {
     console.log(error);
     return new Response(`Erro na requisição de url: ${data["url"]} e body: ${data["body"]}`, { status: 500});
  } 
}
