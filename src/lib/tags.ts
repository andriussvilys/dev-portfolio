import {deleteByKey, upload as storageUpload} from './storage'

const upload = async (formData: FormData) => {
    try{
        await storageUpload(formData)
        try{
            const dbRes = await fetch('/api/data/tags', {
                method: 'POST',
                body: formData,
            })
            return await dbRes.json()
        }
        catch(e){
            deleteByKey(formData.get("key") as string)
            throw new Error("failed to upload to db ", e as Error)
        }
    }
    catch(e){
        throw e
    }
}

const listAll = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/data/tags', {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error((e as Error).message)
    }
}

const deleteById = async (id: string) => {
    try{
        const tag = await getById(id) 
        const dataRes = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'DELETE', cache: 'no-store'})
        const storageRes = await deleteByKey(tag.key)
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

export {upload, listAll, deleteById as deleteOne, getById, patchById}