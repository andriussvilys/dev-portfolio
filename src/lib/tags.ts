import {deleteByKey, upload as storageUpload} from './storage'

const upload = async (formData: FormData) => {
    try{
        const storageRes = await storageUpload(formData)
        if(storageRes.ok){
            try{
                console.log("try db upload")
                const dbRes = await fetch('/api/data/tags', {
                    method: 'POST',
                    cache: 'no-store',
                    body: formData,
                })
                return await dbRes.json()
            }
            catch(e){
                deleteByKey(formData.get("key") as string)
                throw e
            }
        }
        else{
            throw new Error(storageRes.statusText)
        }
    }
    catch(e){
        throw e
    }
}

const listAll = async ({page, limit}: {page:number|null, limit: number|null}) => {
    const query = page && limit ? `?page=${page}&limit=${limit}` : ''
    try{
        const res = await fetch(`http://localhost:3000/api/data/tags${query}`, {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

const deleteById = async (id: string) => {
    // delete storage object first; if data delete fails, the record will be visible without image
    //  in the front and user can try again to delete record
    try{
        const tag = await getById(id) 
        const storageRes = await deleteByKey(tag.key)
        const dataRes = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'DELETE', cache: 'no-store'})
        return {storageRes, dataRes}
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

const getById = async (id: string) => {
    try{
        const res = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get from db")
    }

}

const patchById = async (formData: FormData, id: string, ) => {
    try{
        if(formData.get("file")!= null){
            await storageUpload(formData);
        }
        const res = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'PATCH', cache: 'no-store', body: formData})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to patch db")
    }

}

const getCategories = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/data/tags/categories', {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get categories")
    }
}

export {upload, listAll, deleteById, getById, patchById, getCategories}