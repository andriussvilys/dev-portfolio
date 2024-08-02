import { FileData, FileMetadata } from "@/src/lib/definitions/fileUpload";
import { useState } from "react";

const getMetadata = async (file: File) => {
    const url = URL.createObjectURL(file)
    const metadata = await new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
            })
        }
        img.src = url
    })
    return metadata as FileMetadata
}

export default function useMultiFileUpload(){
    const [fileDataList, setFileData] = useState<FileData[] | null>(null)
    const removeFile = (file: File) => {
        const newFiles:FileData[]|undefined = fileDataList?.filter((f) => f.data !== file)
        if(newFiles){
            setFileData(newFiles)
        }
    }
    const setFile = async (prev: FileData|null, file: File) => {
        const files = fileDataList?.map((f) => f.data)
        const metadata = await getMetadata(file)
        const newFileData = {
            data: file,
            metadata: metadata as FileMetadata
        }
        if(prev && files?.includes(prev.data)){
            const newFiles:FileData[]|undefined = fileDataList?.map((f) => {
                if(f.data === prev.data){
                    return newFileData
                }
                return f
            })
            if(newFiles){
                setFileData(newFiles)
            }
        }
        else{
            if(fileDataList){
                setFileData([...fileDataList, newFileData])
            }
            else{
                setFileData([newFileData])
            }
        }

    }
    return {fileDataList, setFile, removeFile}
}