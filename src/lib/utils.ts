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
    const targetArea = defaultWidth*defaultHeight;
    const originalArea = width * height;
    const scaleFactor = Math.sqrt(targetArea / originalArea);
    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;
    if(scaledHeight > defaultHeight){
        const ratio = defaultHeight / scaledHeight
        return {width: scaledWidth * ratio, height: scaledHeight * ratio}
    }
  
    return { width: scaledWidth, height: scaledHeight };
}

export {getMetadata, getFixedSize}