import { collections, ListCollectionRes } from './data/commons/definitions';
import { findInCollection, listCollection } from './data/commons/utils';
import { PagingParams } from './definitions/pages';
import { Post } from './definitions/posts';
import {getURL, upload as storageUpload} from './storage'

const upload = async (formData: FormData) => {
    try{
        const files = formData.getAll("files")
        const metadata = formData.getAll("metadata")
        const uploadPromises = files.map((file:any, index:number) => {
          const fileFormData = new FormData()
          fileFormData.append("file", file)
          fileFormData.append("metadata", metadata[index])
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
     console.log("listPosts", res)
     return res
}

const findPost = async (_id:string) => {
    const post = await findInCollection<Post>({collection:collections.posts,_id})
    post.files = post.files.map(file => {return {...file, url: getURL(file.key)}})
    return post
}

export {upload, listPosts, findPost}