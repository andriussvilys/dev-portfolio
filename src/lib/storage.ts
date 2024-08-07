import { getMetadata } from "./utils"

const createKey = (file:File) => {
    const extension = file.type.split('/')[1]
    const key = crypto.randomUUID() + "." + extension
    return key
}

const getURL = (key: string) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
}

const upload = async (formData: FormData) => {
    const file = formData.get("file") as File
    try{
        const uploadRes = await fetch('/api/storage', {
            method: 'POST',
            body: formData,
            cache: 'no-store'
        })
        if(uploadRes.ok){
            const metadata = await getMetadata(file)
            const resJSON = await uploadRes.json()
            const res = {...resJSON, metadata}
            return await res
        }
        throw new Error("failed to upload to storage: " + uploadRes.statusText)
    }
    catch(e){
        throw e
    }
}

const deleteByKey = async (key: string) => {
    try{
        const res = await fetch(`/api/storage/${key}`, {
            method: 'DELETE',
            cache: 'no-store'
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

export {getURL, upload, deleteByKey, createKey}