/**
 * 
 * @param {string} url 
 * @param {string} aType) 
 * @returns  data (json | text | xml)
 */
export async function getData(url, aType ='json') {
    let content = null;
    let response = null;
    try {
        
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        const contentTypeObj = {'json': 'application/json', 'xml': 'application/xml', 'text': 'text'};
        const content_type = contentTypeObj[aType];
        const headers = {"Content-type": content_type};
        response = await fetch(url, { method: "GET",  headers: headers});
    } catch (error) {
        try {
            console.log("Trying to fetch on proxy-server")
            response = await fetch(`/api/get-data/?url=${url}&output=${aType}`)    
        } catch (error) {
            console.log("getData>>Não foi possível executar inicialmente no cliente e posteriormente no servidor: " + url)
            throw error
        }    
    }
    if (aType == 'text' || aType == 'xml')
            content = await response.text()
        else 
            content = await response.json()
    return content;
}
