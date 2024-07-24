
const getURL = (key: string) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
}

const upload = async (formData: FormData) => {
    const res = await fetch('/api/storage', {
        method: 'POST',
        body: formData,
        cache: 'no-store'
        })
    console.log("storageUplead", res)
    return res
}

const createKey = (file:File) => {
    const extension = file.type.split('/')[1]
    const key = crypto.randomUUID() + "." + extension
    return key
}

const deleteByKey = async (key: string) => {
    try{
        const res = await fetch(`/api/storage/${key}`, {
            method: 'DELETE',
            cache: 'no-store'
          })
        return await res.json()
    }
    catch(e){
        throw e
    }
}

export {getURL, upload, deleteByKey, createKey}