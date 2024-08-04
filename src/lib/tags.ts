import { collections } from './data/commons/definitions'
import { listCollection } from './data/commons/utils'
import { defaultPaging, PagingParams } from './definitions/pages'
import {deleteByKey, upload as storageUpload} from './storage'

const upload = async (formData: FormData) => {

    try{
        const storageRes = await storageUpload(formData)
            try{
                formData.append("key", storageRes.key)
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
    catch(e){
        throw e
    }
}

const listAll = async (paging: PagingParams|undefined) => {
    return await listCollection({collection: collections.tags, paging})
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
        throw new Error("failed to delete data: " + (e as Error).message)
    }
}

const getById = async (id: string) => {
    try{
        const res = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get from db" + (e as Error).message)
    }

}

const patchById = async (formData: FormData, id: string, ) => {
    try{
        if(formData.get("file")!= null){

            await deleteByKey(formData.get("key") as string)
            const storageRes = await storageUpload(formData);
            formData.append("key",storageRes.key)
        }
        const res = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'PATCH', cache: 'no-store', body: formData})
        return await res.json()
    }
    catch(e){
        throw new Error ("failed to patch: " + (e as Error).message)
    }

}

const getCategories = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/data/tags/categories', {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get categories: " + (e as Error).message)
    }
}

export {upload, listAll, deleteById, getById, patchById, getCategories}