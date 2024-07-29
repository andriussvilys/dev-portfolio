const upload = async (formData: FormData) => {
    try{
        const dbRes = await fetch('/api/data/posts', {
            method: 'POST',
            cache: 'no-store',
            body: formData,
        })
        return await dbRes.json()
    }
    catch(e){
        throw e
    }
}

const listAll = async ({page, limit}: {page:number|null, limit: number|null}) => {
    const query = page && limit ? `?page=${page}&limit=${limit}` : ''
    try{
        const res = await fetch(`http://localhost:3000/api/data/posts${query}`, {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

export {upload, listAll}