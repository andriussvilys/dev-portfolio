import {deleteByKey, upload as storageUpload} from './storage'

const upload = async (formData: FormData) => {
    try{
        const storageRes = await storageUpload(formData)
        if(!storageRes.ok){
            throw new Error("failed to upload to storage")
        }
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
        throw new Error("failed to upload ", e as Error)
    }
}

const listAll = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/data/tags', {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get from db")
    }
}

const deleteOne = async (id: string) => {
    try{
        console.log("delete tag", id)
        const tag = await getById(id) 
        console.log("delete tag", tag)
        const dataRes = await fetch(`http://localhost:3000/api/data/tags/${id}`, {method: 'DELETE', cache: 'no-store'})
        console.log("dataRes", dataRes)
        const storageRes = await deleteByKey(tag.key)
        console.log("storageRes", storageRes)
        return await storageRes.json()
    }
    catch(e){
        throw new Error("failed to delete from db")
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

export {upload, listAll, deleteOne, getById}