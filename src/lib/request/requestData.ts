
export async function fetchData(url: string, controllerSignal: object ) {
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


/*
export async function fetchData(url: string, controllerSignal: object) {
    try {
        // Verificar se a URL contém "DescribeFeatureType" para aplicar a lógica de quebrar os typeNames
        if (url.includes("DescribeFeatureType")) {
            // Quebrando o parâmetro typeNames na URL em uma lista de valores
            const urlObj = new URL(url);
            const typeNames = urlObj.searchParams.get('typeNames');
            const typeNamesArray = typeNames.split(',');

            // Fazendo as requisições uma por uma e armazenando as promessas
            const fetchPromises = typeNamesArray.map(async (typeName) => {
                // Criando a URL modificada para cada tipo
                urlObj.searchParams.set('typeNames', typeName);
                const modifiedUrl = urlObj.toString();

                // Fazendo a requisição para o tipo atual
                const res = await fetch(modifiedUrl, controllerSignal);
                if (!res.ok) {
                    throw new Error(`Erro na requisição para o tipo: ${typeName}`);
                }

                return res.json(); // ou res.text(), dependendo do formato desejado
            });

            // Aguardando todas as requisições e combinando os resultados
            const results = await Promise.all(fetchPromises);

            // Retornando os resultados combinados
            return results;

        } else {
            // Se não for um caso de DescribeFeatureType, faz a requisição normalmente
            console.log(`fech local - ${url}`);
            const res = await fetch(url, controllerSignal);
            return res;
        }
    } catch (error) {
        try {
            let iri = `/api/get-xml/?url=${url}`;
            console.log(`fech on server - ${url}`);
            const res = await fetch(iri, controllerSignal);
            if (!res.ok) throw res;
            return res;
        } catch (error) {
            console.log("Erro na requisição");
            throw error;
        }
    }
}
*/

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
