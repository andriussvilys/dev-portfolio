import { collections, ListCollectionRes } from './data/commons/definitions'
import { createItem, deleteItem, findItem, listCollection, updateItem } from './data/commons/utils'
import { PagingParams } from './definitions/pages'
import { Tag } from './definitions/tags'
import {deleteByKey, getURL, upload as storageUpload} from './storage'

const createTag = async (formData: FormData) => {
    try{
        const storageFormData = new FormData()
        storageFormData.append("file", formData.get("file") as File)
        const storageRes = await storageUpload(storageFormData)
            try{
                console.log("createTag", storageRes)
                formData.append("key", storageRes.key)
                const dbRes = await createItem({collection: collections.tags, formData})
                return await dbRes
            }
            catch(e){
                deleteByKey(storageRes.key)
                throw e
            }
    }
    catch(e){
        throw e
    }
}

const listTags = async (paging?: PagingParams|undefined):Promise<ListCollectionRes<Tag>> => {
    const res:ListCollectionRes<Tag> =  await listCollection({collection: collections.tags, paging})
    const tagsWithUrl = res.items.map(tag => {return {...tag, url: getURL(tag.key)}})
    return {items: tagsWithUrl, total: res.total}
}

const deleteTag = async (id: string) => {
    // delete storage object first; if data delete fails, the record will be visible without image
    //  in the front and user can try again to delete record
    try{
        const tag = await findTag(id) 
        const storageRes = await deleteByKey(tag.key)
        const dataRes = await deleteItem({collection: collections.tags, _id: id})
        return {storageRes, dataRes}
    }
    catch(e){
        throw new Error("failed to delete data: " + (e as Error).message)
    }
}

const findTag = async (id: string) => {
    return await findItem<Tag>({collection: collections.tags, _id: id})
}

const updateTag = async (formData: FormData, id: string, ) => {
    try{
        if(formData.get("file")!= null){
            await deleteByKey(formData.get("key") as string)
            const storageRes = await storageUpload(formData);
            formData.append("key", storageRes.key)
        }
        const res = await updateItem({collection: collections.tags, _id: id, body: formData})
        return await res
    }
    catch(e){
        throw new Error ("failed to patch: " + (e as Error).message)
    }

}

const listCategories = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/data/tags/categories', {method: 'GET', cache: 'no-store'})
        return await res.json()
    }
    catch(e){
        throw new Error("failed to get categories: " + (e as Error).message)
    }
}

export {createTag, listTags, deleteTag, findTag, updateTag, listCategories}