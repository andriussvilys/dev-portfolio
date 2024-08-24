import { FileMetadata } from "./definitions/fileUpload"

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

export {getFixedSize}