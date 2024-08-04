import { collections } from './data/commons/definitions';
import { listCollection } from './data/commons/utils';
import { PagingParams } from './definitions/pages';
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

const listAll = async (paging: PagingParams|undefined) => {
    return await listCollection({collection: collections.posts, paging})
    // const query = page && limit ? `?page=${page}&limit=${limit}` : ''
    // try{
    //     const res = await fetch(`http://localhost:3000/api/data/posts${query}`, {method: 'GET', cache: 'no-store'})
    //     return await res.json()
    // }
    // catch(e){
    //     throw new Error((e as Error).message)
    // }
}

export {upload, listAll}