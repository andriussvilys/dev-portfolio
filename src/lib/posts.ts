import { collections, ListCollectionRes } from './data/commons/definitions';
import { listCollection } from './data/commons/utils';
import { PagingParams } from './definitions/pages';
import { Post } from './definitions/posts';
import {upload as storageUpload} from './storage'

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
    return await listCollection({collection: collections.posts, paging})
}

const findById = async (params: {collection: collections, _id: string}) => {

}

export {upload, listPosts}