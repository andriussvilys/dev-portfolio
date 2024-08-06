import { collections, ListCollectionRes } from './data/commons/definitions';
import { deleteItem, findItem, listCollection } from './data/commons/utils';
import { PagingParams } from './definitions/pages';
import { Post, PostFormInput } from './definitions/posts';
import {deleteByKey, getURL, upload as storageUpload} from './storage'

const createPost = async (formData: FormData) => {
    try{
        const files = formData.getAll("files")
        const metadata = formData.getAll("metadata")
        const uploadPromises = files.map((file:any, index:number) => {
          const fileFormData = new FormData()
          fileFormData.append("file", file)
          fileFormData.append("metadata", metadata[index]) //append metadata so its doesnt get mixed up in case promises are fulfilled out of order
          return storageUpload(fileFormData)
        });
        const storageRes = await Promise.all(uploadPromises);
        formData.delete("files")
        formData.delete("metadata")
        storageRes.forEach(({key, metadata}, index) => {
            const fileData = JSON.stringify({key, metadata})
            formData.append("files", fileData)
        })
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
    console.log("updatePost", formData)
    try{
        throw new Error ("wip")
        // const formDataFiles = formData.getAll("files")
        // const newFiles = (formDataFiles).filter(elem => !.key)
        // const currentFiles = 
        // if(formData.get("files")!= null){
        //     const initialData = await findPost(id)
        //     await deleteByKey(formData.get("key") as string)
        //     const storageRes = await storageUpload(formData);
        //     formData.append("key",storageRes.key)
        // }
        // const res = await updateItem({collection: collections.posts, _id: id, body: formData})
        // return await res.json()
    }
    catch(e){
        throw new Error ("failed to patch: " + (e as Error).message)
    }
}

const processInput = (inputs: PostFormInput):FormData => {
    inputs.fileDataList = inputs.fileDataList.filter(fileData => {
        return !!fileData.data
    })
    const tags = !!inputs.tags ? JSON.stringify(inputs.tags) : JSON.stringify([])
    const formData = new FormData()
    formData.append("name", inputs.name)
    formData.append("description", inputs.description)
    formData.append("liveSite", inputs?.liveSite ?? "")
    formData.append("github", inputs?.github ?? "")
    formData.append("tags", tags)
    inputs.fileDataList.forEach((fileData) => {
        formData.append("files", fileData.data)
    })
    inputs.fileDataList.forEach((fileData) => {
        formData.append("metadata", JSON.stringify(fileData.metadata))
    })
    return formData
}

export {createPost, listPosts, findPost, deletePost, updatePost, processInput}