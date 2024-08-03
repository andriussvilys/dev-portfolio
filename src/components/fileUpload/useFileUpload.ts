import { FileData, FileMetadata } from "@/src/lib/definitions/fileUpload";
import { useEffect, useRef, useState } from "react";
import { UseFieldArrayAppend, UseFormSetValue } from "react-hook-form";

interface UseFileUploadProps{
    fieldName: string,
    setValue: UseFormSetValue<any>,
    append?: UseFieldArrayAppend<any>,

}

export default function useFileUpload({fieldName, setValue, append}: UseFileUploadProps){
    const [fileData, setFileData] = useState<FileData | null>(null)
    
    const dirty = useRef(false)
    useEffect(() => {
        console.log({dirty})
        if(!dirty.current && fileData && append){
            append({})
            dirty.current = true
        }
    }, [fileData, append])

    const setFile = async (file: File) => {
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
        const newFileData = {
            data: file,
            metadata: metadata as FileMetadata
        }
        setValue(fieldName, newFileData)
        setFileData(newFileData)
    }
    return {fileData, setFile}
}