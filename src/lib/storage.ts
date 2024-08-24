import { collections } from "./data/commons/definitions"

const createKey = (file:File, collection:string) => {
    const extension = file.type.split('/')[1]
    const fixedExtension = extension === "svg+xml" ? "svg": extension
    const prefix = collection ? collection + "/" : ''
    const key = prefix + crypto.randomUUID() + "." + fixedExtension
    return key
}

const getURL = (key: string) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
}

const upload = async (file: File, collection: collections) => {
    // const form = new FormData();
    // form.append("file", file)
    // form.append("collection", collection)
    // try{
    //     const uploadRes = await fetch('/api/storage', {
    //         method: 'POST',
    //         body: form,
    //         cache: 'no-cache'
    //     })
    //     if(uploadRes.ok){
    //         const metadata = await getMetadata(file)
    //         const resJSON = await uploadRes.json()
    //         const res = {...resJSON, metadata}
    //         return await res
    //     }
    //     throw new Error("failed to upload to storage: " + uploadRes.statusText)
    // }
    // catch(e){
    //     throw e
    // }
}

const deleteByKey = async (key: string) => {
    try{
        const res = await fetch(`/api/storage/${encodeURIComponent(key)}`, {
            method: 'DELETE',
            cache: 'no-cache'
          })
        if(res.ok){
            return await res.json()
        }
        throw new Error(res.statusText)
    }
    catch(e){
        throw e
    }
}

const replaceMany = async (oldKeys:string[], newFiles: File[], collection:collections) => {
    try{
        const uploadPromises = newFiles.map(file => {
            return upload(file, collection)
        })
        const uploadPromisesRes = await Promise.all(uploadPromises)

        const deletePromises = oldKeys.map(key => {
            return deleteByKey(key)
        })
        const deletePromisesRes = await Promise.all(deletePromises)

        return({uploads: uploadPromisesRes, deletes: deletePromisesRes})

    }
    catch(e){
        throw e
    }
}

const replace = async (oldKey: string, newFile: File, collection:collections) => {
    try{
        const uploadRes = await upload(newFile, collection)
        const deleteRes = await deleteByKey(oldKey)
        return ({uploaded: uploadRes, deleted: deleteRes})
    }
    catch(e){
        throw e
    }
}

export {getURL, upload, deleteByKey, createKey, replace, replaceMany}