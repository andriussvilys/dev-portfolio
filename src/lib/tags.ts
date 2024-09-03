import { collections, ListCollectionRes } from './data/commons/definitions'
import { createItem, deleteItem, findItem, listCollection, updateItem } from './data/commons/utils'
import { PagingParams } from './definitions/pages'
import { TagFormInput, TagRecord } from './definitions/tags'

const createTag = async (formData: FormData) => {
    return await createItem({collection: collections.tags, formData:formData})
}

const listTags = async (paging?: PagingParams|undefined):Promise<ListCollectionRes<TagRecord>> => {
    const res:ListCollectionRes<TagRecord> = await listCollection({collection: collections.tags, paging})
    return res
}

const deleteTag = async (_id: string) => {
    return await deleteItem({collection: collections.tags, _id})
}

const findTag = async (_id: string) => {
    return await findItem({collection: collections.tags, _id})
}

const updateTag = async (formData: FormData, _id: string, ) => {
    return await updateItem({collection: collections.tags, body:formData, _id})
}

const processInput = (inputs: TagFormInput):FormData => {
    const formData = new FormData()

    const name = inputs.name
    formData.append("name", name)

    const category = inputs.category
    formData.append("category", category)

    const file = inputs.file ?? null
    if(file){
        if(file instanceof File){
            formData.append("file", file)
        }
        else{
            formData.append("file", JSON.stringify(file))
        }
    }
    formData.append("categoryIndex", inputs.categoryIndex.toString())
    formData.append("background", inputs.background.toString())
    return formData
}

export {createTag, listTags, deleteTag, findTag, updateTag, processInput}