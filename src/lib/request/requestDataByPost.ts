export async function  fetchDataByPost(url: string, body: string, content_type: string = 'application/xml') {
    try {
        const res = await fetch( url, { method: "POST", body: body, headers: {"Content-type": content_type}})    
        if (!res.ok)
            throw res;
        return res 
    } catch (error) {
        try {
            let data = {url: url, body: body, content_type: content_type}
            
            let nBody = JSON.stringify(data)
            
            const res = await fetch( '/api/get-records-by-post', { method: "POST", body: nBody})    
            if (!res.ok)
                throw res;
            return res 
            
        } catch (error) {
            console.log("Erro na requisição")
            throw error
        }
    }
}
export async function  fetchDataByGet(url: string, content_type: string = 'application/xml') {
        try {
            const res = await fetch( url, { method: "GET", headers: {"Content-type": content_type}})    
            if (!res.ok)
                throw res;
            return res 
        } catch (error) {
            try {
                let data = {url: url,  content_type: content_type}
                const res = await fetch( '/api/request-data/', { method: "GET", headers: {"Content-type": content_type}})    
                if (!res.ok)
                    throw res;
                return res 
                
            } catch (error) {
                console.log("Erro na requisição")
                throw error
            }
        }
    
}