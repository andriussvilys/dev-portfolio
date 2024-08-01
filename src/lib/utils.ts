import { FileMetadata } from "./definitions/fileUpload"
import { overviewPageLimit, OverviewPageParams } from "./definitions/pages"

const parseParams = (params:any):OverviewPageParams => {
    const parsed:OverviewPageParams = {
        page: 1,
        limit: overviewPageLimit
    }
    const pageParam = params.page
    const limitParam = params.limit
    if(pageParam){
        parsed.page = parseInt(pageParam)
    }
    if(limitParam){
        parsed.limit = parseInt(limitParam)
    }
    return parsed
}

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

export {parseParams, getMetadata}