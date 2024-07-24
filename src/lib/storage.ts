const getURL = (key: string) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
    // return `https://asvil-dev-dashboard.s3.us-east-2.amazonaws.com/${key}`
}

const upload = async (formData: FormData) => {
    try{
        const res = await fetch('/api/storage', {
            method: 'POST',
            body: formData,
          })
        return await res.json()
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
        return await res.json()
    }
    catch(e){
        throw e
    }
}

export {getURL, upload, deleteByKey}