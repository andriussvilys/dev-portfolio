import { deleteFile } from '../app/api/storage/utils';
import { collections, ListCollectionRes } from './data/commons/definitions';
import { createItem, deleteItem, findItem, listCollection } from './data/commons/utils';
import { PagingParams } from './definitions/pages';
import { PostFormInput, PostInput, PostRecord, PostWithTags } from './definitions/posts';

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

const deletePost = async (id: string) => {
    const collection = collections.posts
    return await deleteItem({collection, _id: id})
}

const updatePost = async (formData: FormData, id: string, ) => {
    // try{
    //     const postsFormData = new FormData()
    //     postsFormData.append("name", formData.get("name") as string)
    //     postsFormData.append("description", formData.get("description") as string)
    //     postsFormData.append("liveSite", formData.get("liveSite") as string)
    //     postsFormData.append("github", formData.get("github") as string)
    //     postsFormData.append("tags", formData.get("tags") as string)
    //     postsFormData.append("order", formData.get("order") as string)
    //     // 1) delete removed files
    //     const storageFiles = formData.getAll("storageFile");
    //     const storageKeys:string[] = storageFiles.map((file) => (JSON.parse(file as string) as StorageFile).key);
    //     const previousKeys = (await findPost(id)).files.map(file => file.key)
    //     const filesToDelete = previousKeys.filter(key => {
    //         return !storageKeys.includes(key)
    //     })
    //     const newFiles = formData.getAll("file") as File[];

    //     const replaceManyRes = await replaceMany(filesToDelete, newFiles, collections.posts)
    //     replaceManyRes.uploads.forEach(upload => {
    //         const {key, metadata} = upload
    //         const fileData = JSON.stringify({key, metadata})
    //         postsFormData.append("storageFile", fileData)
    //     })
    //     storageFiles.forEach(file => postsFormData.append("storageFile", file))

    //     const res = await updateItem({collection: collections.posts, _id: id, body: postsFormData})
    //     return await res
    // }
    // catch(e){
    //     throw new Error ("failed to patch: " + (e as Error).message)
    // }
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