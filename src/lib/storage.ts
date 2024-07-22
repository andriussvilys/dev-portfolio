const getURL = (key: string) => {
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${key}`
    // return `https://asvil-dev-dashboard.s3.us-east-2.amazonaws.com/${key}`
}

const upload = async (formData: FormData) => {
    return fetch('/api/storage', {
        method: 'POST',
        body: formData,
      })
}

const deleteByKey = async (key: string) => {
    return fetch(`/api/storage/${key}`, {
        method: 'DELETE',
        cache: 'no-store'
      })
}

export {getURL, upload, deleteByKey}