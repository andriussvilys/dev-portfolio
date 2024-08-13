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

type Size = {width:number, height:number}

const getFixedSize = (size: FileMetadata, defaultSize:{width:number, height:number}):Size => {
    const {width, height} = size
    const {width:defaultWidth, height:defaultHeight} = defaultSize
    if(width === 0 || height === 0){
        return {width: defaultWidth, height: defaultHeight}
    }
    if(width > height){
        const ratio = defaultWidth / width
        return {width: defaultWidth, height: height * ratio}
    }
    else{
        const ratio = defaultHeight / height
        return {height: defaultHeight, width: width * ratio}
    }
}

export {getMetadata, getFixedSize}