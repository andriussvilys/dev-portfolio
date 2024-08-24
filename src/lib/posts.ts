import { collections, ListCollectionRes } from './data/commons/definitions';
import { createItem, deleteItem, findItem, listCollection, updateItem } from './data/commons/utils';
import { PagingParams } from './definitions/pages';
import { PostFormInput, PostRecord, PostWithTags } from './definitions/posts';

const createPost = async (formData: FormData) => {
    const res = await createItem({collection: collections.posts, formData})
    return res
}

const listPosts = async (paging?: PagingParams|undefined):Promise<ListCollectionRes<PostWithTags>> => {
    const res = await listCollection<PostWithTags>({collection: collections.posts, paging})
    return res
}

const findPost = async (_id:string):Promise<PostRecord> => {
    const collection = collections.posts
    const post = await findItem<PostRecord>({collection, _id})
    return post
}

const deletePost = async (_id: string) => {
    const collection = collections.posts
    return await deleteItem({collection, _id})
}

const updatePost = async (formData: FormData, _id: string, ) => {
    const collection = collections.posts
    return await updateItem({collection, body:formData, _id})
}

const processInput = (inputs: PostFormInput):FormData => {
    inputs.files = inputs.files.filter(fileData => {
        return fileData instanceof File
    })
    const tags = !!inputs.tags ? JSON.stringify(inputs.tags.filter(id => !!id)) : JSON.stringify([])
    const {name, description, liveSite, github, storageFiles, files} = inputs
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("liveSite", liveSite ?? "")
    formData.append("github", github ?? "")
    formData.append("tags", tags)
    formData.append("order", inputs.order.toString())

    storageFiles?.forEach(file => {
        formData.append("storageFile", JSON.stringify(file))
    })

    files.forEach((file:Blob) => {
        formData.append("file", file)
    })

    return formData
}

export {createPost, listPosts, findPost, deletePost, updatePost, processInput}