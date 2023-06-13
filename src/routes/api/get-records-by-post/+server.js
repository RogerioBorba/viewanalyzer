import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) =>  {
  let data  = await request.json() //data = {url: url, body: body, content_type: content_type}
  console.log(data["content_type"])
  const res = await fetch( data["url"], { method: "POST", body: data["body"], headers: {"Content-type": data["content_type"]}})
  const body = await res.text();
  //console.log(data.content_type)
  const headers = { 'Content-Type': 'application/xml' }; 
  return new Response(body, { status: 200, headers });
  
}