import { FileMetadata } from "./definitions/fileUpload"

const getMetadata = async (file:File):Promise<FileMetadata> => {
    const metadata:FileMetadata = {width: 0, height: 0}
    const image = new Image()
    image.src = URL.createObjectURL(file)
    await new Promise((resolve, reject) => {
        image.onload = () => {
            metadata.width = image.naturalWidth
            metadata.height = image.naturalHeight
            resolve(metadata)
        }
    })
    return metadata 
}

export {getMetadata}