import { catalogosWMSCapabilities } from '$lib/inde/CatalogoINDE';
import { error } from '@sveltejs/kit';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';

const JSON_TYPE = 'application/json';
const XML_TYPE = 'application/xml';
const TEXT_PLAIN = 'text/plain';

/**
 * @type {import('./$types').RequestHandler}
 * @param {any} event
 */
export async function GET(event) {
   
    try {
        let urlObj = event.url;
        let urlandType = splitUrlAtType(urlObj.search.substring(5));
        let url = urlandType[0];
        let type = urlandType[1];
        if(!url)
            return new Response('O parâmetro url na requisição é obrigatório.', {status: 400});
        if(!isValidUrl(url))    
            return new Response('O parâmetro url não está no formato de um URL.', {status: 422});
        let content_type = contentType(type);
        let data = null;
        const result = await fetch(url, {method: 'GET', headers: {'Accept': content_type}});
        const res_content_type = result.headers.get('content-type');
        if (res_content_type == JSON_TYPE) {
            content_type = JSON_TYPE;
            data =  await result.json();
            data = JSON.stringify(data);
        } else if ( [TEXT_PLAIN, XML_TYPE].includes(content_type) ) {
            data = await result.text();
            
        } else 
            data = await result.text();

        const response = new Response(data, {status: 200});
        response.headers.set("Content-Type", content_type);
        return response;

    } catch (erro) {
        console.log(erro);
        throw erro;
    }
   
    //return new Response(String(random));
  }
  
  function isValidUrl(url = '') {
    const urlRegex = /^(ftp|http|https):\/\/[^]+$/;
    return urlRegex.test(url);
  }
  

  function splitUrlAtType(url) {
    const urlArray = url.split("&");
    let typeIndex = -1;
    for (let i = 0; i < urlArray.length; i++) {
      if (urlArray[i].startsWith("type=")) {
        typeIndex = i;
        break;
      }
    }
    let result = [];
    if (typeIndex === -1) {
      result.push(url);
      result.push("json");
    } else {
      const beforeType = urlArray.slice(0, typeIndex).join("&");
      const afterType = urlArray[typeIndex].slice(5);
      result.push(beforeType);
      result.push(afterType || "json");
    }
    return result;
  }
  function contentType(type = 'json') {
    const content_type = type.trim().toLowerCase();
    if (['application/xml', 'text/xml', 'xml'].includes(content_type))
        return XML_TYPE;
    else if (['application/json', 'json'].includes(content_type))
        return JSON_TYPE;
    else
        return TEXT_PLAIN;

  }
  function isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }