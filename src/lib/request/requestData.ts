export async function fetchData(url: string, controllerSignal: object) {
    try {
        console.log(`fech local - ${url}`)
        const res = await fetch(url, controllerSignal)
        return res

    } catch (error) {
        try {
            let iri = `/api/get-xml/?url=${url}`
            console.log(`fech on server - ${url}`)
            const res = await fetch(iri, controllerSignal)
            if (!res.ok) throw res;
            return res
        } catch (error) {
            console.log("Erro na requisição")
            throw error
        }
    }

}

export async function fetchDataByType(url: string, aType: string, controllerSignal: object) {
    try {
        console.log(`fech local - ${url}`)
        const res = await fetch(url, controllerSignal)
        return res

    } catch (error) {
        try {
            let type = aType || 'json';
            let iri = `/api/get-by-type/?url=${url}&type=${type}`;
            console.log(`fech on server - ${url}`);
            const res = await fetch(iri, controllerSignal);
            if (!res.ok) throw res;
            return res
        } catch (error) {
            console.log("Erro na requisição")
            throw error
        }
    }

}
