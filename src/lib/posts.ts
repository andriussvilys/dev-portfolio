import { collections, ListCollectionRes } from './data/commons/definitions';
import { createItem, deleteItem, findItem, listCollection, updateItem } from './data/commons/utils';
import { StorageFile } from './definitions/fileUpload';
import { PagingParams } from './definitions/pages';
import { Post, PostFormInput } from './definitions/posts';
import {deleteByKey, getURL, replaceMany, upload as storageUpload} from './storage'

const createPost = async (formData: FormData) => {
    try{
        const files = formData.getAll("file")
        const uploadPromises = files.map((file:any, index:number) => {
          const fileFormData = new FormData()
          return storageUpload(file, collections.posts)
        });
        const storageRes = await Promise.all(uploadPromises);
        storageRes.forEach((res) => {
            const {key, metadata} = res
            const fileData = JSON.stringify({key, metadata})
            formData.append("storageFile", fileData)
        })
        try{
            const dbRes = await createItem({collection: collections.posts, formData})
            return await dbRes
        }
        catch(e){
            const deletePromises = storageRes.map(res => deleteByKey(res.key))
            await Promise.all(deletePromises)
            throw e
        }
    }
    catch(e){
        throw e
    }
}

const listPosts = async (paging: PagingParams|undefined):Promise<ListCollectionRes<Post>> => {
    const res = await listCollection<Post>({collection: collections.posts, paging})
    res.items.forEach(post => {
        post.files = post.files.map(file => {return {...file, url: getURL(file.key)}}) 
     });
     return res
}

const findPost = async (_id:string):Promise<Post> => {
    const post = await findItem<Post>({collection:collections.posts,_id})
    post.files = post.files.map(file => {return {...file, url: getURL(file.key)}})
    return post
}

const deletePost = async (id: string) => {
    // delete storage object first; if data delete fails, the record will be visible without image
    //  in the front and user can try again to delete record
    try{
        const post = await findPost(id)
        const deleteObjectPromises = post.files.map((file:any) => {
            return deleteByKey(file.key)
          });
        const storageRes = await Promise.all(deleteObjectPromises);
        const dataRes = await deleteItem({collection: collections.posts, _id: id})
        return {storageRes, dataRes}
    }
    catch(e){
        throw new Error("failed to delete data: " + (e as Error).message)
    }
}

const updatePost = async (formData: FormData, id: string, ) => {
    try{
        const postsFormData = new FormData()
        postsFormData.append("name", formData.get("name") as string)
        postsFormData.append("description", formData.get("description") as string)
        postsFormData.append("liveSite", formData.get("liveSite") as string)
        postsFormData.append("github", formData.get("github") as string)
        postsFormData.append("tags", formData.get("tags") as string)
        // 1) delete removed files
        const storageFiles = formData.getAll("storageFile");
        const storageKeys:string[] = storageFiles.map((file) => (JSON.parse(file as string) as StorageFile).key);
        const previousKeys = (await findPost(id)).files.map(file => file.key)
        const filesToDelete = previousKeys.filter(key => {
            return !storageKeys.includes(key)
        })
        const newFiles = formData.getAll("file") as File[];

        const replaceManyRes = await replaceMany(filesToDelete, newFiles, collections.posts)
        replaceManyRes.uploads.forEach(upload => {
            const {key, metadata} = upload
            const fileData = JSON.stringify({key, metadata})
            postsFormData.append("storageFile", fileData)
        })
        storageFiles.forEach(file => postsFormData.append("storageFile", file))

        const res = await updateItem({collection: collections.posts, _id: id, body: postsFormData})
        return await res
    }
    catch(e){
        throw new Error ("failed to patch: " + (e as Error).message)
    }
}

const processInput = (inputs: PostFormInput):FormData => {
    inputs.files = inputs.files.filter(fileData => {
        return fileData instanceof File
    })
    const tags = !!inputs.tags ? JSON.stringify(inputs.tags) : JSON.stringify([])
    const {name, description, liveSite, github, storageFiles, files} = inputs
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("liveSite", liveSite ?? "")
    formData.append("github", github ?? "")
    formData.append("tags", tags)

    storageFiles?.forEach(file => {
        formData.append("storageFile", JSON.stringify(file))
    })

    files.forEach((file:Blob) => {
        formData.append("file", file)
    })

    return formData
}

export {createPost, listPosts, findPost, deletePost, updatePost, processInput}